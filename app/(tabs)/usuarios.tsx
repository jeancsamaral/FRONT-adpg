import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, SafeAreaView, Alert, TextInput, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { UserForm } from '../components/UserForm';
import { UsuariosApp, UsuarioAuth } from '../../backEnd/interfaces';
import { useRouter } from 'expo-router';  
import { useAuth } from '../context/AuthContext';
import ApiCaller from '../../backEnd/apiCaller';
import { useAuthCheck } from "../hooks/useAuthCheck";

const apiCaller = new ApiCaller();

// Dados de exemplo
const usersData: UsuariosApp[] = [
  {
    id: 1,
    codusr: 1,
    nome: 'Administrador',
    supervisor: 'Admin',
    inativo: 'N',
    excluido: 'N',
    registro: 1,
  },
  {
    id: 2,
    codusr: 2,
    nome: 'João Silva',
    supervisor: 'Administrador',
    inativo: 'N',
    excluido: 'N',
    registro: 2,
  },
];

// Adicione essa interface para tipar os filtros
interface Filters {
  codusr: boolean;
  nome: boolean;
  supervisor: boolean;
  inativo: boolean;
}

// Define User type to match UsuariosApp
interface User {
  id: number;
  codusr: number;
  nome: string;
  supervisor: string;
  inativo: string;
  excluido: string;
  registro: number;
  login?: string; // Ensure login is a string
}

// Define a new type for display purposes
interface DisplayUser extends Omit<UsuariosApp & UsuarioAuth, 'login'> {
  login?: string; // login as a string for display
}

export default function UsuariosScreen() {
  const router = useRouter();
  const { token, loading: authLoading } = useAuthCheck();
  const [users, setUsers] = useState<DisplayUser[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState<DisplayUser | undefined>(undefined);
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    codusr: true,
    nome: true,
    supervisor: true,
    inativo: true,
  });
  const [initialLoading, setInitialLoading] = useState(true);

  const { user } = useAuth();

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);

  // Effect to fetch data on initial load or token change
  useEffect(() => {
    fetchUsers();
  }, [token]); // Fetch only when token changes (initial load)

  const fetchUsers = async () => {
    if (!token || !user) {
      Alert.alert('Erro', 'Você precisa estar logado para acessar esta página.');
      setInitialLoading(false); // Stop loading if no token/user
      return;
    }

    if (!user.isAdmin) {
      Alert.alert('Acesso Negado', 'Você não tem permissão para visualizar todos os usuários.');
      setInitialLoading(false); // Stop loading if not admin
      return;
    }

    console.log('Fetching all users...');
    setInitialLoading(true); // Use initialLoading for the single fetch
    try {
      // Fetch all users (API might ignore pagination params)
      // const page = 1;
      // const limit = 1000; // Or a very large number if API requires it

      // console.log('Fetching users with filter:', [page, 10, token]);

      // Assuming getAllUsers fetches all despite page/limit
      const response = await apiCaller.userMethods.getAllUsers(
        1, // Page 1
        9999, // Large limit
        token
      );

      if (Array.isArray(response.users)) {
         // Filter duplicates just in case backend sends them
         const uniqueUsers = response.users.filter((user: UsuariosApp, index: number, self: UsuariosApp[]) =>
           index === self.findIndex((t: UsuariosApp) => t.codusr === user.codusr)
         );
         console.log('Fetched unique users:', uniqueUsers.length);
         setUsers(uniqueUsers); // Set the full list
      } else {
        console.error("Expected an array but got:", response.users);
        setUsers([]); // Set empty array on error
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      Alert.alert('Erro', 'Não foi possível carregar os usuários.');
      setUsers([]); // Set empty array on error
    } finally {
      setInitialLoading(false); // Done loading
      // setIsUpdating(false); // Remove isUpdating logic
    }
  };

  const handleCreateUser = async (userData: Partial<UsuarioAuth>) => {
    setIsEditing(false);
    // setPage(1);
    fetchUsers(); // Refetch the full list after creation
    setIsEditing(false);
  };

  const handleUpdateUser = async (formData: { codusr: number, nome: string; senha?: string; login: string; /* add other relevant fields */ }) => {
    console.log('Updating user:', formData);
    await apiCaller.userMethods.updateUserAuth(formData.codusr.toString(), formData, token || '');
    // setPage(1);
    fetchUsers(); // Refetch the full list after update
    setIsEditing(false);
    setSelectedUser(undefined);
  };

  const handleDeleteUser = async (codusr: number) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir este usuário?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              Alert.alert('Sucesso', 'Usuário excluído.');
              // setPage(1);
              fetchUsers(); // Refetch the full list after deletion
            } catch (error) {
              console.error('Error deleting user:', error);
              Alert.alert('Erro', 'Não foi possível excluir o usuário.');
            }
          },
        },
      ]
    );
  };

  // Unified submit handler for UserForm
  const handleSubmit = async (formData: Partial<User & { senha?: string }>) => {
    if (selectedUser) {
      if (formData.nome && formData.login && selectedUser.codusr) {
        await handleUpdateUser({
          codusr: selectedUser.codusr,
          nome: formData.nome,
          login: formData.login,
          ...(formData.senha && { senha: formData.senha }),
        });
      } else {
        console.error("Update form data is incomplete:", formData);
        Alert.alert("Erro", "Dados incompletos para atualização.");
      }
    } else {
      // Ensure create logic uses compatible types if needed
      await handleCreateUser(formData as Partial<UsuarioAuth>); // Cast if necessary
    }
  };

  // Implement frontend filtering
  const filteredUsers = React.useMemo(() => {
    let usersToFilter = users;

    if (debouncedSearchText) {
      const searchLower = debouncedSearchText.toLowerCase();
      const fieldsToSearch = Object.entries(filters)
                                .filter(([, isActive]) => isActive)
                                .map(([key]) => key);

      usersToFilter = usersToFilter.filter(user => {
        return fieldsToSearch.some(field => {
          const value = user[field as keyof typeof user];
          // Handle potential non-string values and nulls/undefined
          return value != null && value.toString().toLowerCase().includes(searchLower);
        });
      });
    }

    // Add other frontend filters here if needed (e.g., filter by status)
    // Example: if (someStatusFilter !== 'all') {
    //   usersToFilter = usersToFilter.filter(user => user.inativo === someStatusFilter);
    // }

    return usersToFilter;
  }, [users, debouncedSearchText, filters]);

  if (initialLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#229dc9', '#1a7fa3']}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity 
              onPress={() => router.back()} 
              style={styles.backButton}
            >
              <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>
            <MaterialCommunityIcons name="account-cog" size={32} color="#fff" />
            <ThemedText style={styles.title}>Gerenciar Usuários</ThemedText>
          </View>
        </View>
      </LinearGradient>

      <ScrollView>
        <ThemedView style={styles.contentContainer}>
          {!isEditing ? (
            <>
              {/* Barra de busca */}
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Buscar usuários..."
                  value={searchText}
                  onChangeText={setSearchText}
                />
                <TouchableOpacity 
                  style={styles.filterButton}
                  onPress={() => setShowFilters(!showFilters)}
                >
                  <MaterialCommunityIcons 
                    name="filter-variant" 
                    size={24} 
                    color="#229dc9" 
                  />
                </TouchableOpacity>
              </View>

              {/* Filtros */}
              {showFilters && (
                <View style={styles.filtersContainer}>
                  <ThemedText style={styles.filtersTitle}>Buscar em:</ThemedText>
                  <View style={styles.filterOptions}>
                    {Object.entries(filters).map(([key, value]) => (
                      <TouchableOpacity
                        key={key}
                        style={[styles.filterOption, value && styles.filterOptionActive]}
                        onPress={() => setFilters(prev => ({
                          ...prev,
                          [key]: !prev[key as keyof Filters]
                        }))}
                      >
                        <ThemedText style={[
                          styles.filterOptionText,
                          value && styles.filterOptionTextActive
                        ]}>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </ThemedText>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              <TouchableOpacity 
                style={styles.createButton}
                onPress={() => setIsEditing(true)}
              >
                <MaterialCommunityIcons name="plus-circle" size={24} color="#fff" />
                <ThemedText style={styles.buttonText}>Novo Usuário</ThemedText>
              </TouchableOpacity>

              <ThemedView style={styles.table}>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((item) => (
                    <ThemedView key={item.codusr} style={styles.tableRow}>
                      <ThemedView style={styles.rowHeader}>
                        <ThemedText style={styles.codigo}>{item.codusr}</ThemedText>
                        <ThemedText style={styles.nome}>{item.nome}</ThemedText>
                      </ThemedView>

                      <ThemedView style={styles.rowContent}>
                        <ThemedView style={styles.cell}>
                          <ThemedText style={styles.label}>Supervisor</ThemedText>
                          <ThemedText style={styles.value}>{item.supervisor}</ThemedText>
                        </ThemedView>
                        <ThemedView style={styles.cell}>
                          <ThemedText style={styles.label}>Status</ThemedText>
                          <ThemedText style={styles.value}>
                            {item.inativo === 'N' ? 'Ativo' : 'Inativo'}
                          </ThemedText>
                        </ThemedView>
                      </ThemedView>

                      <ThemedView style={styles.actionIcons}>
                        <TouchableOpacity onPress={() => {
                          setSelectedUser(users.find(u => u.codusr === item.codusr));
                          setIsEditing(true);
                        }}>
                          <Ionicons name="create-outline" size={20} color="#075eec" />
                        </TouchableOpacity>
                        <TouchableOpacity 
                          onPress={() => handleDeleteUser(item.codusr)}
                          style={styles.deleteButton}
                        >
                          <Ionicons name="trash-outline" size={20} color="#FF3B30" />
                        </TouchableOpacity>
                      </ThemedView>
                    </ThemedView>
                  ))
                ) : (
                  <View style={styles.emptyContainer}>
                     <MaterialCommunityIcons name="account-search-outline" size={48} color="#ccc" />
                     <ThemedText style={styles.emptyText}>Nenhum usuário encontrado com os filtros atuais.</ThemedText>
                  </View>
                )}
              </ThemedView>
            </>
          ) : (
            <UserForm
              user={selectedUser as User}
              onSubmit={handleSubmit}
              onCancel={() => {
                setIsEditing(false);
                setSelectedUser(undefined);
              }}
            />
          )}
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingBottom: 60,
  },
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  createButton: {
    backgroundColor: '#229dc9',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
  table: {
    gap: 16,
  },
  tableRow: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  codigo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#229dc9',
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginLeft: 8,
  },
  rowContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cell: {
    flex: 1,
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    color: '#666',
  },
  value: {
    fontSize: 14,
    color: '#333',
  },
  actionIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 20,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filtersContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filtersTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterOptionActive: {
    backgroundColor: '#229dc9',
    borderColor: '#229dc9',
  },
  filterOptionText: {
    fontSize: 14,
    color: '#666',
  },
  filterOptionTextActive: {
    color: '#fff',
  },
  backButton: {
    marginRight: 10,
    padding: 8,
  },
  userCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  userInfo: {
    gap: 4,
  },
  userCode: {
    fontSize: 14,
    color: '#666',
  },
  userSupervisor: {
    fontSize: 14,
    color: '#666',
  },
  userStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  activeStatus: {
    color: '#34C759',
  },
  inactiveStatus: {
    color: '#FF3B30',
  },
  deleteButton: {
    padding: 8,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
