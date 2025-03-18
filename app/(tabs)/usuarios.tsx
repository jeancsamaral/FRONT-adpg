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
  const { token, user } = useAuth();
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
  const [isUpdating, setIsUpdating] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const router = useRouter();

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);

  // Effect to fetch data when debounced search or filters change
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchUsers();
  }, [debouncedSearchText, filters]);

  const fetchUsers = async () => {
    if (!token || !user) {
      Alert.alert('Erro', 'Você precisa estar logado para acessar esta página.');
      return;
    }

    if (!user.isAdmin) {
      Alert.alert('Acesso Negado', 'Você não tem permissão para visualizar todos os usuários.');
      return;
    }

    try {
      setIsUpdating(true);
      const filterObject = {
        search: debouncedSearchText,
        filters: Object.keys(filters).filter(key => filters[key as keyof Filters])
      };

      const response = await apiCaller.userMethods.getAllUsers(
        page,
        10,
        token
      );

      if (Array.isArray(response.users)) {
        if (response.users.length === 0) {
          setHasMore(false);
        } else {
          setUsers(prev => page === 1 ? response.users : [...prev, ...response.users]);
        }
      } else {
        console.error("Expected an array but got:", response.users);
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      Alert.alert('Erro', 'Não foi possível carregar os usuários.');
      setHasMore(false);
    } finally {
      setInitialLoading(false);
      setIsUpdating(false);
    }
  };

  const handleLoadMore = () => {
    if (!isUpdating && hasMore) {
      setIsUpdating(true);
      const nextPage = page + 1;
      setPage(nextPage);
      fetchUsers();
    }
  };

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: any) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  };

  const handleCreateUser = async (userData: Partial<UsuarioAuth>) => {
    // Aqui você implementaria a lógica para criar um usuário
    console.log('Criar usuário:', userData);
    setIsEditing(false);
  };

  const handleUpdateUser = async (formData:{nome:string,senha:string,login:string}) => {
    const userData = selectedUser;
    if (!token || !selectedUser || !userData) return;
    console.log("selectedUser",userData);
    try {
      console.log("SFI",formData)
        // Use the updateUserAuth method to update the user
        await apiCaller.userMethods.updateUserAuth(selectedUser.codusr.toString(), {
          codusr: userData.codusr,
          isAdmin: userData.isAdmin,
          login: formData.login,
          nome: formData.nome,
          password: formData.senha,
          profileAccess: [],
        }, token);
        Alert.alert('Sucesso', 'Usuário atualizado com sucesso!');
        fetchUsers(); // Refresh the user list
    } catch (error) {
        console.error('Error updating user:', error);
        Alert.alert('Erro', 'Não foi possível atualizar o usuário.');
    } finally {
        setIsEditing(false);
        setSelectedUser(undefined);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    // Implement the logic to delete a user
    console.log('Deletar usuário:', userId);
  };

  const handleDeleteClient = (clientToDelete: any) => {
    Alert.alert(
      "Confirmar Exclusão",
      `Deseja realmente excluir o cliente ${clientToDelete.razaoSocial}?`,
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Excluir",
          style: 'destructive',
          onPress: () => {
            // Aqui você implementaria a chamada à API para excluir o cliente
            // Por enquanto, vamos apenas remover do estado local
            setUsers(users.filter(user => user.id !== clientToDelete.id));
          }
        }
      ]
    );
  };

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

      <ScrollView 
        style={styles.scrollContainer}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            handleLoadMore();
          }
        }}
        scrollEventThrottle={400}
      >
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
                {users.map((item) => (
                  <ThemedView key={item.id} style={styles.tableRow}>
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
                      <TouchableOpacity onPress={() => handleDeleteUser(item.id)}>
                        <Ionicons name="trash-outline" size={20} color="#dc2626" />
                      </TouchableOpacity>
                    </ThemedView>
                  </ThemedView>
                ))}
              </ThemedView>
            </>
          ) : (
            <UserForm
              user={selectedUser as User}
              onSubmit={selectedUser ? handleUpdateUser : handleCreateUser}
              onCancel={() => {
                setIsEditing(false);
                setSelectedUser(undefined);
              }}
            />
          )}
          

          {isUpdating && page > 1 && (
            <View style={styles.loadingMore}>
              <ActivityIndicator size="small" color="#229dc9" />
            </View>
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
  loadingMore: {
    padding: 16,
    alignItems: 'center',
  },
});
