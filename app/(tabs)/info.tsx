import React, { useState, useEffect } from 'react';
import { StyleSheet, Linking, View, ActivityIndicator, Alert } from 'react-native';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import ApiCaller from '../../backEnd/apiCaller';
import { useRouter } from 'expo-router';
import { useAuthCheck } from '../hooks/useAuthCheck';

const apiCaller = new ApiCaller();

export default function InfoScreen() {
  const router = useRouter();
  const { token, loading: authLoading } = useAuthCheck();
  const [loading, setLoading] = useState(false);
  const [appInfo, setAppInfo] = useState({
    version: '1.0.0',
    buildNumber: '1',
    lastUpdate: new Date().toLocaleDateString(),
    developer: 'Isaac Façanha de Carvalho',
    email: 'isaacicarvalho@gmail.com',
    company: 'ADPG Sistemas',
    website: 'https://adpgsistemas.com.br'
  });

  useEffect(() => {
    if (token) {
      fetchAppInfo();
    }
  }, [token]);

  const fetchAppInfo = async () => {
    if (!token) {
      return;
    }

    try {
      setLoading(true);
      // In a real implementation, you would fetch app info from the backend
      // For now, we're just using the default values
      
      // Example of how you might fetch app info in a real implementation:
      // const info = await apiCaller.appInfoMethods.getAppInfo(token);
      // setAppInfo(info);
      
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching app info:', error);
      Alert.alert('Erro', 'Não foi possível carregar as informações do aplicativo.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#229dc9" />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.headerMain}>
        <Ionicons name="information-circle-outline" size={35} color="#666" />
        <ThemedText style={styles.title}>Informações</ThemedText>
      </ThemedView>

      <ThemedView style={styles.infoContainer}>
        <ThemedView style={styles.infoRow}>
          <ThemedText style={styles.label}>Versão:</ThemedText>
          <ThemedText style={styles.value}>{appInfo.version} (Build {appInfo.buildNumber})</ThemedText>
        </ThemedView>

        <ThemedView style={styles.infoRow}>
          <ThemedText style={styles.label}>Última atualização:</ThemedText>
          <ThemedText style={styles.value}>{appInfo.lastUpdate}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.infoRow}>
          <ThemedText style={styles.label}>Desenvolvido por:</ThemedText>
          <ThemedText style={styles.value}>{appInfo.developer}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.infoRow}>
          <ThemedText style={styles.label}>Empresa:</ThemedText>
          <ThemedText style={styles.value}>{appInfo.company}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.infoRow}>
          <ThemedText style={styles.label}>E-mail:</ThemedText>
          <ThemedText 
            style={[styles.value, styles.link]}
            onPress={() => Linking.openURL(`mailto:${appInfo.email}`)}
          >
            {appInfo.email}
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.infoRow}>
          <ThemedText style={styles.label}>Website:</ThemedText>
          <ThemedText 
            style={[styles.value, styles.link]}
            onPress={() => Linking.openURL(appInfo.website)}
          >
            {appInfo.website}
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.socialContainer}>
          <Ionicons 
            name="logo-linkedin" 
            size={24} 
            color="#0077B5"
            onPress={() => Linking.openURL('https://linkedin.com/in/isaac-carvalho')}
            style={styles.socialIcon}
          />
          <Ionicons 
            name="logo-facebook" 
            size={24} 
            color="#4267B2"
            onPress={() => Linking.openURL('https://facebook.com/isaac.carvalho')}
            style={styles.socialIcon}
          />
          <Ionicons 
            name="logo-github" 
            size={24} 
            color="#333"
            onPress={() => Linking.openURL('https://github.com/isaaccarvalho')}
            style={styles.socialIcon}
          />
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerMain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  label: {
    flex: 1,
    fontWeight: 'bold',
    color: '#666',
  },
  value: {
    flex: 2,
  },
  link: {
    color: '#229dc9',
    textDecorationLine: 'underline',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  socialIcon: {
    marginHorizontal: 15,
  },
}); 