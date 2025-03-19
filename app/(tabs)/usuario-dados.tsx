import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet, 
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams, Href } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { UsuariosApp, UsuarioAuth } from '../../backEnd/interfaces';
import ApiCaller from '../../backEnd/apiCaller';
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';
import { useAuth } from '../context/AuthContext';
 
const apiCaller = new ApiCaller();

export default function UserDataScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { token, user } = useAuth();
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
      const {user:userData,userAuth:userAuthData} = await apiCaller.userMethods.getUser(user?.id.toString() ?? '', token);

      // Find the current user by ID
      const currentUser = userAuthData;
      if (currentUser) {
        setUserData(currentUser);
      } else {
        setUserData(userData); // Fallback to the first user
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (updatedData: Partial<UsuariosApp>) => {
    if (!token || !userData) return;

    try {
      await apiCaller.userMethods.updateUser(userData.id.toString(), updatedData, token);
      Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
      fetchUserData(); // Refresh data
    } catch (error) {
      console.error('Error updating user data:', error);
      Alert.alert('Erro', 'Não foi possível atualizar os dados do usuário.');
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
            <MaterialCommunityIcons name="account" size={32} color="#fff" />
            <ThemedText style={styles.title}>Meus Dados</ThemedText>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollContainer}>
        <ThemedView style={styles.contentContainer}>
          {userData ? (
            <>
              <View style={styles.userInfoSection}>
                <ThemedText style={styles.sectionTitle}>Informações Pessoais</ThemedText>
                <View style={styles.infoRow}>
                  <ThemedText style={styles.label}>Nome:</ThemedText>
                  <ThemedText style={styles.value}>{userData.nome}</ThemedText>
                </View>
                <View style={styles.infoRow}>
                  <ThemedText style={styles.label}>Código:</ThemedText>
                  <ThemedText style={styles.value}>{userData.codusr}</ThemedText>
                </View>
                <View style={styles.infoRow}>
                  <ThemedText style={styles.label}>Supervisor:</ThemedText>
                  <ThemedText style={styles.value}>{userData.supervisor}</ThemedText>
                </View>
                {userData.login && (
                  <View style={styles.infoRow}>
                    <ThemedText style={styles.label}>Login:</ThemedText>
                    <ThemedText style={styles.value}>{userData.login.login}</ThemedText>
                  </View>
                )}
              </View>

              <TouchableOpacity 
                style={styles.editButton}
                onPress={() => {
                  Alert.alert('Editar', 'Funcionalidade de edição será implementada em breve.');
                }}
              >
                <MaterialCommunityIcons name="pencil" size={20} color="#fff" />
                <ThemedText style={styles.buttonText}>Editar Perfil</ThemedText>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.accessButton}
                onPress={() => router.push('/(tabs)/perfis-acesso' as Href<string>)}
              >
                <MaterialCommunityIcons name="shield-account" size={20} color="#fff" />
                <ThemedText style={styles.buttonText}>Perfis de Acesso</ThemedText>
              </TouchableOpacity>
            </>
          ) : (
            <ThemedText style={styles.noDataText}>Nenhum dado de usuário encontrado.</ThemedText>
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
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    flex: 1,
    fontWeight: '600',
  },
  value: {
    flex: 2,
  },
  editButton: {
    backgroundColor: '#229dc9',
    padding: 15,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  accessButton: {
    backgroundColor: '#1a7fa3',
    padding: 15,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
}); 