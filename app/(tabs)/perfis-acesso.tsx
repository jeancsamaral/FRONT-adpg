import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Switch,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter, Href } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { UsuariosApp, UsuarioAuth } from '../../backEnd/interfaces';
import ApiCaller from '../../backEnd/apiCaller';
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';
import { useAuth } from '../context/AuthContext';

const apiCaller = new ApiCaller();

interface Permission {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

interface PermissionGroup {
  name: string;
  permissions: Permission[];
}

export default function AccessProfilesScreen() {
  const router = useRouter();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UsuariosApp | null>(null);
  const [permissionGroups, setPermissionGroups] = useState<PermissionGroup[]>([
    {
      name: 'Clientes',
      permissions: [
        { id: 'client_view', name: 'Visualizar', description: 'Visualizar clientes', enabled: true },
        { id: 'client_create', name: 'Criar', description: 'Criar novos clientes', enabled: false },
        { id: 'client_edit', name: 'Editar', description: 'Editar clientes existentes', enabled: true },
        { id: 'client_delete', name: 'Excluir', description: 'Excluir clientes', enabled: false },
      ]
    },
    {
      name: 'Produtos',
      permissions: [
        { id: 'product_view', name: 'Visualizar', description: 'Visualizar produtos', enabled: true },
        { id: 'product_create', name: 'Criar', description: 'Criar novos produtos', enabled: false },
        { id: 'product_edit', name: 'Editar', description: 'Editar produtos existentes', enabled: false },
        { id: 'product_delete', name: 'Excluir', description: 'Excluir produtos', enabled: false },
      ]
    },
    {
      name: 'Usuários',
      permissions: [
        { id: 'user_view', name: 'Visualizar', description: 'Visualizar usuários', enabled: true },
        { id: 'user_create', name: 'Criar', description: 'Criar novos usuários', enabled: false },
        { id: 'user_edit', name: 'Editar', description: 'Editar usuários existentes', enabled: false },
        { id: 'user_delete', name: 'Excluir', description: 'Excluir usuários', enabled: false },
      ]
    }
  ]);

  useEffect(() => {
    if (token) {
      fetchUserData();
    } else {
      router.replace('/login');
    }
  }, [token]);

  const fetchUserData = async () => {
    if (!token) {
      return;
    }

    try {
      setLoading(true);
      // Assuming we're getting the current user's data
      // In a real app, you might get the user ID from params or context
      const users = await apiCaller.userMethods.getAllUsers(1, 10, token);
      if (users && users.length > 0) {
        setUserData(users[0]); // For demo, just using the first user
        
        // If the user has profileAccess data, update the permission groups
        if (users[0].login && users[0].login.profileAccess) {
          updatePermissionsFromProfile(users[0].login.profileAccess);
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
      setLoading(false);
    }
  };

  const updatePermissionsFromProfile = (profileAccess: string[]) => {
    // Update the permission groups based on the user's profile access
    const updatedGroups = [...permissionGroups];
    
    updatedGroups.forEach(group => {
      group.permissions.forEach(permission => {
        permission.enabled = profileAccess.includes(permission.id);
      });
    });
    
    setPermissionGroups(updatedGroups);
  };

  const togglePermission = (groupIndex: number, permissionId: string) => {
    const updatedGroups = [...permissionGroups];
    const permissionIndex = updatedGroups[groupIndex].permissions.findIndex(p => p.id === permissionId);
    
    if (permissionIndex !== -1) {
      updatedGroups[groupIndex].permissions[permissionIndex].enabled = 
        !updatedGroups[groupIndex].permissions[permissionIndex].enabled;
      
      setPermissionGroups(updatedGroups);
      
      // In a real app, you would update the user's profile access on the server
      savePermissions(updatedGroups);
    }
  };

  const savePermissions = async (groups: PermissionGroup[]) => {
    if (!token || !userData || !userData.login) return;
    
    try {
      // Extract all enabled permission IDs
      const profileAccess = groups.flatMap(group => 
        group.permissions.filter(p => p.enabled).map(p => p.id)
      );
      
      // Create updated user auth data
      const updatedAuth: Partial<UsuarioAuth> = {
        ...userData.login,
        profileAccess
      };
      
      // In a real implementation, you would call an API to update the user's permissions
      console.log('Saving updated permissions:', profileAccess);
      
      // This is a placeholder for the actual API call
      // await apiCaller.authMethods.updateUserPermissions(userData.id.toString(), updatedAuth, token);
      
      Alert.alert('Sucesso', 'Permissões atualizadas com sucesso!');
    } catch (error) {
      console.error('Error saving permissions:', error);
      Alert.alert('Erro', 'Não foi possível salvar as permissões.');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#229dc9" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#229dc9', '#1a7fa3']}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/(tabs)/usuario-dados' as Href<string>)}>
              <MaterialCommunityIcons name="account-outline" size={24} color="#fff" />
            </TouchableOpacity>
            <ThemedText style={styles.title}>Perfis de Acesso</ThemedText>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollContainer}>
        <ThemedView style={styles.contentContainer}>
          {userData && userData.login ? (
            <>
              <View style={styles.userInfoSection}>
                <ThemedText style={styles.userName}>{userData.nome}</ThemedText>
                <ThemedText style={styles.userRole}>
                  {userData.login && userData.login.isAdmin ? 'Administrador' : 'Usuário'}
                </ThemedText>
              </View>

              {permissionGroups.map((group, groupIndex) => (
                <View key={group.name} style={styles.permissionGroup}>
                  <ThemedText style={styles.groupTitle}>{group.name}</ThemedText>
                  
                  {group.permissions.map((permission) => (
                    <View key={permission.id} style={styles.permissionItem}>
                      <View style={styles.permissionInfo}>
                        <ThemedText style={styles.permissionName}>{permission.name}</ThemedText>
                        <ThemedText style={styles.permissionDescription}>{permission.description}</ThemedText>
                      </View>
                      <Switch
                        value={permission.enabled}
                        onValueChange={() => togglePermission(groupIndex, permission.id)}
                        trackColor={{ false: '#d1d1d1', true: '#a3d9ec' }}
                        thumbColor={permission.enabled ? '#229dc9' : '#f4f3f4'}
                        disabled={userData.login ? !userData.login.isAdmin : true} // Only admins can change permissions
                      />
                    </View>
                  ))}
                </View>
              ))}

              {!userData.login.isAdmin && (
                <ThemedText style={styles.adminNote}>
                  Apenas administradores podem alterar permissões.
                </ThemedText>
              )}
            </>
          ) : (
            <ThemedText style={styles.noDataText}>
              Nenhum dado de perfil de acesso encontrado.
            </ThemedText>
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
  },
  headerGradient: {
    paddingTop: 40,
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    borderRadius: 10,
    margin: 15,
  },
  userInfoSection: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userRole: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  permissionGroup: {
    marginBottom: 20,
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  permissionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  permissionInfo: {
    flex: 1,
  },
  permissionName: {
    fontSize: 15,
    fontWeight: '600',
  },
  permissionDescription: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  adminNote: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 20,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
}); 