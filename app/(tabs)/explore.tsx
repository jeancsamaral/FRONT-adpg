import React, { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, ActivityIndicator, Alert, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthCheck } from '../hooks/useAuthCheck';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import ApiCaller from '../../backEnd/apiCaller';
import { ClientesApp, ProdutosApp, GruposApp } from '../../backEnd/interfaces';

const apiCaller = new ApiCaller();

export default function ExploreScreen() {
  const router = useRouter();
  const { token, loading: authLoading } = useAuthCheck();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    clientCount: 0,
    productCount: 0,
    groupCount: 0,
  });

  useEffect(() => {
    if (token) {
      fetchStats();
    }
  }, [token]);

  const fetchStats = async () => {
    if (!token) {
      return;
    }

    try {
      setLoading(true);
      
      // In a real implementation, you would fetch these stats from the backend
      // For now, we're simulating API calls
      
      // Example of how you might fetch stats in a real implementation:
      // const clients = await apiCaller.clientMethods.getClientWithFilter(1, 100, token);
      // const products = await apiCaller.productMethods.getProducts(0, token, 1, 100);
      // const groups = await apiCaller.groupMethods.getAllGroups(1, 100, token);
      
      // setStats({
      //   clientCount: clients.length,
      //   productCount: products.length,
      //   groupCount: groups.length,
      // });
      
      // Simulate API call
      setTimeout(() => {
        setStats({
          clientCount: 156,
          productCount: 423,
          groupCount: 18,
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching stats:', error);
      Alert.alert('Erro', 'Não foi possível carregar as estatísticas.');
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
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#229dc9', dark: '#1a7fa3' }}
      headerImage={<Ionicons size={310} name="analytics" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText style={styles.title}>Explorar Dados</ThemedText>
      </ThemedView>
      
      <ThemedText style={styles.description}>
        Explore os dados da sua empresa e obtenha insights valiosos para o seu negócio.
      </ThemedText>
      
      <ThemedView style={styles.statsContainer}>
        <ThemedView style={styles.statCard}>
          <Ionicons name="people" size={32} color="#229dc9" />
          <ThemedText style={styles.statValue}>{stats.clientCount}</ThemedText>
          <ThemedText style={styles.statLabel}>Clientes</ThemedText>
          <TouchableOpacity 
            style={styles.viewButton}
            onPress={() => router.push('/(tabs)/clientes')}
          >
            <ThemedText style={styles.viewButtonText}>Ver Clientes</ThemedText>
          </TouchableOpacity>
        </ThemedView>
        
        <ThemedView style={styles.statCard}>
          <Ionicons name="cube" size={32} color="#229dc9" />
          <ThemedText style={styles.statValue}>{stats.productCount}</ThemedText>
          <ThemedText style={styles.statLabel}>Produtos</ThemedText>
          <TouchableOpacity 
            style={styles.viewButton}
            onPress={() => router.push('/(tabs)/estoque')}
          >
            <ThemedText style={styles.viewButtonText}>Ver Produtos</ThemedText>
          </TouchableOpacity>
        </ThemedView>
        
        <ThemedView style={styles.statCard}>
          <Ionicons name="folder" size={32} color="#229dc9" />
          <ThemedText style={styles.statValue}>{stats.groupCount}</ThemedText>
          <ThemedText style={styles.statLabel}>Grupos</ThemedText>
          <TouchableOpacity 
            style={styles.viewButton}
            onPress={() => router.push('/(tabs)/grupos' as any)}
          >
            <ThemedText style={styles.viewButtonText}>Ver Grupos</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
      
      <Collapsible title="Relatórios Disponíveis">
        <ThemedText>
          Acesse relatórios detalhados sobre vendas, estoque, clientes e muito mais.
        </ThemedText>
        <TouchableOpacity 
          style={styles.reportButton}
          onPress={() => Alert.alert('Relatórios', 'Funcionalidade em desenvolvimento.')}
        >
          <Ionicons name="document-text" size={20} color="#fff" />
          <ThemedText style={styles.reportButtonText}>Gerar Relatórios</ThemedText>
        </TouchableOpacity>
      </Collapsible>
      
      <Collapsible title="Análise de Dados">
        <ThemedText>
          Visualize gráficos e análises para entender melhor o desempenho do seu negócio.
        </ThemedText>
        <TouchableOpacity 
          style={styles.reportButton}
          onPress={() => Alert.alert('Análise', 'Funcionalidade em desenvolvimento.')}
        >
          <Ionicons name="bar-chart" size={20} color="#fff" />
          <ThemedText style={styles.reportButtonText}>Ver Análises</ThemedText>
        </TouchableOpacity>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    color: '#fff',
    opacity: 0.3,
    alignSelf: 'center',
  },
  titleContainer: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    marginBottom: 20,
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    margin: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  viewButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  viewButtonText: {
    fontSize: 12,
    color: '#333',
  },
  reportButton: {
    backgroundColor: '#229dc9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 15,
  },
  reportButtonText: {
    color: '#fff',
    marginLeft: 10,
    fontWeight: '500',
  },
});
