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
  isAdmin?: boolean; // Add isAdmin property
}

// Define a new type for display purposes - excluding login and isAdmin from the original types
interface DisplayUser extends Omit<UsuariosApp & Omit<UsuarioAuth, 'login' | 'isAdmin'>, 'login'> {
  login?: string; // login as a string for display
  isAdmin?: boolean; // isAdmin property for admin status
}

export default function UsuariosScreen() {
  const router = useRouter();
  const { token, loading: authLoading } = useAuthCheck();
  const [users, setUsers] = useState<DisplayUser[]>([]);
  const [authUsers, setAuthUsers] = useState<UsuarioAuth[]>([]);
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
  const [activeTab, setActiveTab] = useState<'regular' | 'new'>('regular');
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState<{id: number, name: string, codusr?: number} | null>(null);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
    fetchAuthUsers();
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

      console.log('Fetched users!!!:', response.users);

      if (Array.isArray(response.users)) {
         // Filter duplicates just in case backend sends them
         const uniqueUsers = response.users.filter((user: UsuariosApp, index: number, self: UsuariosApp[]) =>
           index === self.findIndex((t: UsuariosApp) => t.codusr === user.codusr)
         );
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

  const fetchAuthUsers = async () => {
    if (!token || !user) {
      return;
    }

    if (!user.isAdmin) {
      return;
    }

    try {
      const response = await apiCaller.authMethods.getAllAuthUsers(token);
      console.log('Fetched auth users!!!:', response);
      if (Array.isArray(response)) {
        setAuthUsers(response);
      } else {
        console.error("Expected an array of auth users but got:", response.users);
        setAuthUsers([]);
      }
    } catch (error) {
      console.error('Error fetching auth users:', error);
      setAuthUsers([]);
    }
  };

  const handleCreateUser = async (userData: any) => {
    setIsEditing(false);
    // setPage(1);
    const payloadData ={
      nome: userData.nome,
      login: userData.login,
      password: userData.senha,
      isAdmin: userData.isAdmin,
      inativo: 'N',
      excluido: 'N',
    }
    try {
      await apiCaller.authMethods.registerUser(payloadData as Partial<UsuarioAuth>, token || '');
      fetchUsers(); // Refetch the full list after creation
      fetchAuthUsers(); // Fetch the auth users too
      setIsEditing(false);
    } catch (error) { 
      console.error('Error creating user:', error);
      Alert.alert('Erro', 'Não foi possível criar o usuário.');
    }
  };

  const handleUpdateUser = async (formData: { codusr: number, nome: string; senha?: string; login: string; isAdmin?: boolean; /* add other relevant fields */ }) => {
    console.log('handleUpdateUser called with formData:', formData);
    
    // Prepare the update payload
    const updatePayload = {
      codusr: formData.codusr,
      nome: formData.nome,
      login: formData.login,
      isAdmin: formData.isAdmin,
      ...(formData.senha && { password: formData.senha }), // Note: API might expect 'password' instead of 'senha'
    };
    
    console.log('Update payload:', updatePayload);
    
    await apiCaller.userMethods.updateUserAuth(formData.codusr.toString(), updatePayload, token || '');
    // setPage(1);
    fetchUsers(); // Refetch the full list after update
    fetchAuthUsers(); // Also refresh auth users in case the user appears there
    setIsEditing(false);
    setSelectedUser(undefined);
  };

  const handleDeleteUser = async (id: number) => {
    console.log('handleDeleteUser called with id:', id);
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
              console.log('Attempting to delete user with id:', id);
              await apiCaller.authMethods.deleteUser(id, token || '');
              Alert.alert('Sucesso', 'Usuário excluído.');
              // setPage(1);
              fetchUsers(); // Refetch the full list after deletion
              fetchAuthUsers(); // Also refresh the auth users list
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
    if (!user?.isAdmin) {
      Alert.alert('Acesso Negado', 'Apenas administradores podem criar ou editar usuários.');
      return;
    }
    
    console.log('handleSubmit called with formData:', formData);
    
    if (selectedUser) {
      if (formData.nome && formData.login && selectedUser.codusr) {
        await handleUpdateUser({
          codusr: selectedUser.codusr,
          nome: formData.nome,
          login: formData.login,
          isAdmin: formData.isAdmin,
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

  const handleConfirmDelete = async () => {
    if (userToDelete) {
      try {
        // Create a timeout promise that rejects after 2 seconds
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => {
            reject(new Error('Request timeout'));
          }, 2000);
        });

        let deletePromise;
        
        if (activeTab === 'regular') {
          // For regular users, use deleteUserByCoduser method with codusr
          if (userToDelete.codusr) {
            deletePromise = apiCaller.authMethods.deleteUserByCoduser(userToDelete.codusr.toString(), token || '');
          } else {
            Alert.alert('Erro', 'Código de usuário não encontrado.');
            return;
          }
        } else {
          // For auth users, use deleteUser method with id
          deletePromise = apiCaller.authMethods.deleteUser(userToDelete.id, token || '');
        }

        // Race between the delete request and the timeout
        await Promise.race([deletePromise, timeoutPromise]);
        
        fetchUsers();
        fetchAuthUsers();
        setIsDeleteModalVisible(false);
        setUserToDelete(null);
        setErrorMessage('Usuário excluído com sucesso.');
        setIsErrorModalVisible(true);
      } catch (error) {
        console.error('Error deleting user:', error);
        setIsDeleteModalVisible(false);
        setUserToDelete(null);
        
        // Show error modal for any request failure (timeout, network error, server error, etc.)
        setErrorMessage('Erro ao apagar - cheque se o usuário já foi deletado');
        setIsErrorModalVisible(true);
      }
    }
  };

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

              {/* User Tabs */}
              <View style={styles.tabContainer}>
                <TouchableOpacity 
                  style={[styles.tab, activeTab === 'regular' && styles.activeTab]}
                  onPress={() => setActiveTab('regular')}
                >
                  <ThemedText style={[styles.tabText, activeTab === 'regular' && styles.activeTabText]}>
                    Usuários Registrados
                  </ThemedText>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.tab, activeTab === 'new' && styles.activeTab]}
                  onPress={() => setActiveTab('new')}
                >
                  <View style={styles.tabContent}>
                    <ThemedText style={[styles.tabText, activeTab === 'new' && styles.activeTabText]}>
                      Usuário não vendedores
                    </ThemedText>
                  </View>
                </TouchableOpacity>
              </View>

              {user?.isAdmin && activeTab === 'regular' && (
                <TouchableOpacity 
                  style={styles.createButton}
                  onPress={() => setIsEditing(true)}
                >
                  <MaterialCommunityIcons name="plus-circle" size={24} color="#fff" />
                  <ThemedText style={styles.buttonText}>Novo Usuário</ThemedText>
                </TouchableOpacity>
              )}

              {/* Regular Users Section */}
              {activeTab === 'regular' && (
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
                            <ThemedText style={styles.value}>
                              {item.supervisor === 'true' || item.supervisor === 'S' ? 'Sim' : 'Não'}
                            </ThemedText>
                          </ThemedView>
                          <ThemedView style={styles.cell}>
                            <ThemedText style={styles.label}>Status</ThemedText>
                            <ThemedText style={[
                              styles.value,
                              (item.inativo === 'N' || item.inativo === 'NAO' || item.inativo === 'NÃO') ? styles.activeStatus : styles.inactiveStatus
                            ]}>
                              {(item.inativo === 'N' || item.inativo === 'NAO' || item.inativo === 'NÃO') ? 'Ativo' : 'Inativo'}
                            </ThemedText>
                          </ThemedView>
                        </ThemedView>

                        <ThemedView style={styles.actionIcons}>
                          {user?.isAdmin && (
                            <>
                              <TouchableOpacity onPress={() => {
                                const foundUser = users.find(u => u.codusr === item.codusr);
                                if (foundUser) {
                                  // Extract isAdmin from the nested login object if it exists
                                  const userToEdit = {
                                    ...foundUser,
                                    login: (foundUser.login as any)?.login || '', // Extract login string from UsuarioAuth
                                    isAdmin: (foundUser.login as any)?.isAdmin || false, // Extract isAdmin from UsuarioAuth
                                  };
                                  console.log('Setting selectedUser for edit:', userToEdit);
                                  setSelectedUser(userToEdit);
                                }
                                setIsEditing(true);
                              }}>
                                <Ionicons name="create-outline" size={20} color="#075eec" />
                              </TouchableOpacity>
                              <TouchableOpacity 
                                onPress={() => {
                                  console.log('Delete button pressed for user:', item.id);
                                  setIsDeleteModalVisible(true);
                                  setUserToDelete({id: item.id, name: item.nome, codusr: item.codusr});
                                }}
                                style={styles.deleteButton}
                              >
                                <Ionicons name="trash-outline" size={20} color="#FF3B30" />
                              </TouchableOpacity>
                            </>
                          )}
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
              )}

              {/* Auth Users Section */}
              {activeTab === 'new' && (
                <View>
                  <View style={styles.sectionHeader}>
                    <ThemedText style={styles.sectionTitle}>Usuário não vendedores</ThemedText>
                    <TouchableOpacity onPress={fetchAuthUsers} style={styles.refreshButton}>
                      <MaterialCommunityIcons name="refresh" size={20} color="#229dc9" />
                    </TouchableOpacity>
                  </View>
                  
                  <ThemedView style={styles.table}>
                    {authUsers.length > 0 ? (
                      authUsers.map((authUser) => (
                        <ThemedView key={authUser.id} style={[styles.tableRow, styles.authUserRow]}>
                          <ThemedView style={styles.rowHeader}>
                            <MaterialCommunityIcons name="account-plus" size={20} color="#229dc9" />
                            <ThemedText style={styles.nome}>{authUser.nome}</ThemedText>
                            {authUser.isAdmin && (
                              <View style={styles.adminBadge}>
                                <ThemedText style={styles.adminBadgeText}>Admin</ThemedText>
                              </View>
                            )}
                          </ThemedView>

                          <ThemedView style={styles.rowContent}>
                            <ThemedView style={styles.cell}>
                              <ThemedText style={styles.label}>Login</ThemedText>
                              <ThemedText style={styles.value}>{authUser.login}</ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.cell}>
                              <ThemedText style={styles.label}>Data de Criação</ThemedText>
                              <ThemedText style={styles.value}>
                                {authUser.createdAt ? new Date(authUser.createdAt).toLocaleDateString('pt-BR') : 'N/A'}
                              </ThemedText>
                            </ThemedView>
                          </ThemedView>

                          <ThemedView style={styles.actionIcons}>
                            {user?.isAdmin && (
                              <TouchableOpacity 
                                onPress={() => {
                                  console.log('Delete button pressed for user:', authUser.id);
                                  setIsDeleteModalVisible(true);
                                  setUserToDelete({id: authUser.id, name: authUser.nome});
                                }}
                                style={styles.deleteButton}
                              >
                                <Ionicons name="trash-outline" size={20} color="#FF3B30" />
                              </TouchableOpacity>
                            )}
                          </ThemedView>
                        </ThemedView>
                      ))
                    ) : (
                      <View style={styles.emptyContainer}>
                        <MaterialCommunityIcons name="account-plus" size={48} color="#ccc" />
                        <ThemedText style={styles.emptyText}>Nenhum usuário não vendedor encontrado.</ThemedText>
                      </View>
                    )}
                  </ThemedView>
                </View>
              )}
            </>
          ) : (
            <UserForm
              user={selectedUser}
              onSubmit={handleSubmit}
              onCancel={() => {
                setIsEditing(false);
                setSelectedUser(undefined);
              }}
            />
          )}
        </ThemedView>
      </ScrollView>

      {/* Error/Success Modal */}
      {isErrorModalVisible && (
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <ThemedText style={styles.modalTitle}>
              {errorMessage.includes('Sucesso') || errorMessage.includes('sucesso') ? 'Sucesso' : 'Erro'}
            </ThemedText>
            <ThemedText style={styles.modalText}>
              {errorMessage}
            </ThemedText>
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.submitModalButton]} 
                onPress={() => {
                  setIsErrorModalVisible(false);
                  setErrorMessage('');
                }}
              >
                <ThemedText style={styles.modalButtonText}>OK</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalVisible && userToDelete && (
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <ThemedText style={styles.modalTitle}>Confirmar Exclusão</ThemedText>
            <ThemedText style={styles.modalText}>
              Tem certeza que deseja excluir o usuário {userToDelete.name}?
            </ThemedText>
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelModalButton]} 
                onPress={() => {
                  setIsDeleteModalVisible(false);
                  setUserToDelete(null);
                }}
              >
                <ThemedText style={styles.cancelButtonText}>Cancelar</ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.deleteModalButton]} 
                onPress={() => {
                  console.log('Delete button in modal pressed');
                  handleConfirmDelete();
                }}
              >
                <ThemedText style={styles.modalButtonText}>Excluir</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
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
  authUsersSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  refreshButton: {
    padding: 8,
  },
  authUserRow: {
    backgroundColor: '#f0f7fa',
    borderLeftWidth: 3,
    borderLeftColor: '#229dc9',
  },
  adminBadge: {
    backgroundColor: '#229dc9',
    padding: 4,
    borderRadius: 4,
    marginLeft: 8,
  },
  adminBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  activeTab: {
    backgroundColor: '#229dc9',
  },
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  activeTabText: {
    color: '#fff',
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    backgroundColor: '#ff3b30',
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  cancelModalButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  deleteModalButton: {
    backgroundColor: '#FF3B30',
  },
  submitModalButton: {
    backgroundColor: '#229dc9',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});
