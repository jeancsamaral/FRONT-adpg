import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useRouter, Href } from 'expo-router'
import { UsuariosApp, UsuarioAuth } from '../../backEnd/interfaces'
import ApiCaller from '../../backEnd/apiCaller'
import { useAuth } from '../context/AuthContext'
import { useAuthCheck } from "../hooks/useAuthCheck";

const apiCaller = new ApiCaller();

// Definir interface para os itens do menu
interface MenuItem {
  icon: string;
  title: string;
  subtitle: string;
  route: Href<string>;
  color?: string;
}

const menuItems: MenuItem[] = [
  {
    icon: "person-outline",
    title: "Dados do Usuário",
    subtitle: "Informações da conta",
    route: "/(tabs)/usuario-dados" as Href<string>
  },
  {
    icon: "people-outline",
    title: "Gerenciar Usuários",
    subtitle: "Adicionar e gerenciar usuários do sistema",
    route: "/(tabs)/usuarios" as Href<string>
  },
  // {
  //   icon: "shield-outline",
  //   title: "Perfis de Acesso",
  //   subtitle: "Gerenciar permissões de usuários",
  //   route: "/(tabs)/perfis-acesso" as Href<string>
  // },
  // {
  //   icon: "grid-outline",
  //   title: "Configurar Colunas",
  //   subtitle: "Visibilidade de dados por perfil",
  //   route: "/(tabs)/config-colunas" as Href<string>
  // },
  {
    icon: "log-out-outline",
    title: "Sair",
    subtitle: "Encerrar sessão",
    route: "/login" as Href<string>,
    color: "#FF3B30"
  }
];

export default function PerfilScreen() {
  const router = useRouter()
  const { token, loading: authLoading } = useAuthCheck();
  const { logout } = useAuth();
  const [userData, setUserData] = useState<UsuariosApp | null>(null);
  const [loading, setLoading] = useState(true);

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
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    // Use the logout function from AuthContext
    logout();
    router.replace('/login');
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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/(tabs)/' as Href<string>)}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configurações</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Profile Info */}
        <View style={styles.profileInfo}>
          <View>
            <Text style={styles.name}>{userData?.nome || 'Usuário'}</Text>
            <Text style={styles.role}>
              {userData?.login?.isAdmin ? 'Administrador' : 'Usuário'}
            </Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.menuItem}
              onPress={() => {
                if (item.title === "Sair") {
                  handleLogout();
                } else {
                  router.push(item.route);
                }
              }}
            >
              <Ionicons 
                name={item.icon as any} 
                size={24} 
                color={item.color || "#333"} 
              />
              <View style={styles.menuItemText}>
                <Text style={[
                  styles.menuTitle,
                  item.color ? { color: item.color } : undefined
                ]}>
                  {item.title}
                </Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <Ionicons 
                name="chevron-forward" 
                size={24} 
                color={item.color || "#666"} 
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/(tabs)' as Href<string>)}
        >
          <Ionicons name="home-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/(tabs)/clientes' as Href<string>)}
        >
          <Ionicons name="people-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/(tabs)/estoque' as Href<string>)}
        >
          <Ionicons name="cube-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/(tabs)/info' as Href<string>)}
        >
          <Ionicons name="settings-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginTop:10,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  profileInfo: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  role: {
    fontSize: 16,
    color: '#666',
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemText: {
    flex: 1,
    marginLeft: 12,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#fff',
  },
  navItem: {
    padding: 8,
  },
})

