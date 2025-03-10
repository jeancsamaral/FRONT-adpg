import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ClientesApp_Itens } from '../../backEnd/interfaces';
import ApiCaller from '../../backEnd/apiCaller';
import { useAuth } from '../context/AuthContext';

const apiCaller = new ApiCaller();

export default function ClienteProdutosScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [clienteItens, setClienteItens] = useState<ClientesApp_Itens[]>([]);

  useEffect(() => {
    fetchClienteProdutos();
  }, []);

  const fetchClienteProdutos = async () => {
    if (!token || !params.codcli) {
      Alert.alert('Erro', 'Informações do cliente não encontradas.');
      router.back();
      return;
    }

    try {
      setLoading(true);
      // Get the client's products
      const itens = await apiCaller.clientItemsMethods.getClientItemsByCodcli(
        params.codcli as string,
        1, // page
        100, // limit
        token
      );
      
      setClienteItens(itens);
    } catch (error) {
      console.error('Error fetching client products:', error);
      Alert.alert('Erro', 'Não foi possível carregar os produtos do cliente.');
    } finally {
      setLoading(false);
    }
  };

  // Format currency
  const formatCurrency = (value: number, currency: string) => {
    return `${currency} ${value.toFixed(2)}`;
  };

  if (loading) {
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
              <MaterialCommunityIcons name="package-variant" size={32} color="#fff" />
              <ThemedText style={styles.title}>Produtos do Cliente</ThemedText>
            </View>
          </View>
        </LinearGradient>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#229dc9" />
        </View>
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
            <MaterialCommunityIcons name="package-variant" size={32} color="#fff" />
            <ThemedText style={styles.title}>Produtos do Cliente</ThemedText>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollContainer}>
        <ThemedView style={styles.contentContainer}>
          <ThemedText style={styles.clientName}>{params.razao || 'Cliente'}</ThemedText>
          
          {clienteItens.length > 0 ? (
            <ThemedView style={styles.tableContainer}>
              <View style={styles.tableHeader}>
                <ThemedText style={styles.headerCodigo}>Código</ThemedText>
                <ThemedText style={styles.headerDescricao}>Descrição</ThemedText>
                <ThemedText style={styles.headerPreco}>Preço</ThemedText>
              </View>
              
              {clienteItens.map((item) => (
                <ThemedView key={item.id} style={styles.tableRow}>
                  <ThemedText style={styles.codigo}>{item.codproduto}</ThemedText>
                  <ThemedText style={styles.descricao}>{item.descricao}</ThemedText>
                  <ThemedText style={styles.preco}>
                    {formatCurrency(item.preco, item.moeda)}
                  </ThemedText>
                </ThemedView>
              ))}
            </ThemedView>
          ) : (
            <ThemedView style={styles.emptyState}>
              <MaterialCommunityIcons name="package-variant-closed" size={48} color="#ccc" />
              <ThemedText style={styles.emptyStateText}>Nenhum produto encontrado</ThemedText>
            </ThemedView>
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
  },
  clientName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerCodigo: {
    flex: 1,
    fontWeight: 'bold',
  },
  headerDescricao: {
    flex: 2,
    fontWeight: 'bold',
  },
  headerPreco: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  codigo: {
    flex: 1,
    color: '#666',
  },
  descricao: {
    flex: 2,
  },
  preco: {
    flex: 1,
    textAlign: 'right',
    fontWeight: '500',
    color: '#229dc9',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  emptyStateText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 