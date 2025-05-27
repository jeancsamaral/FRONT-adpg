import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ClientesApp_Itens, ProdutosApp_PrecosRegiao } from '../../backEnd/interfaces';
import ApiCaller from '../../backEnd/apiCaller';
import { useAuth } from '../context/AuthContext';

const apiCaller = new ApiCaller();

type ClientesApp_Itens_IPI = ClientesApp_Itens & { IPI: number | string };

export default function ClienteProdutosScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [clienteItens, setClienteItens] = useState<ClientesApp_Itens_IPI[]>([]);
  const [expandedItems, setExpandedItems] = useState<{[key: string]: boolean}>({});

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
        token
      );

      let regionInfo = await apiCaller.regionalPricesMethods.getAllRegionalPrices(null,null,token);
      regionInfo = regionInfo.regionalPrices;
      console.log({regionInfo});

      itens.forEach((item: ClientesApp_Itens_IPI) => {
        const regionInfoItem = regionInfo.find((region: ProdutosApp_PrecosRegiao) => region.codprod == item.codprod);
        if (regionInfoItem) {
          item.IPI = regionInfoItem.ipi;
        }
      });

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
    console.log({value});
    return `${value.toFixed(5).replace('.', ',')} ${currency}`;
  };

  const toggleItemExpand = (id: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const isItemExpanded = (id: number) => {
    return expandedItems[id] || false;
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

      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}
      >
        <ThemedView style={styles.contentContainer}>
          <ThemedText style={styles.clientName}>{params.razao || 'Cliente'}</ThemedText>
          
          {clienteItens.length > 0 ? (
            <ThemedView style={styles.productsContainer}>
              {clienteItens.map((item) => (
                <TouchableOpacity 
                  key={item.id} 
                  style={styles.productCard}
                  onPress={() => toggleItemExpand(item.id)}
                >
                  <View style={styles.productHeader}>
                    <View style={styles.productTopInfo}>
                      <ThemedText style={styles.productCode}>{item.codproduto}</ThemedText>
                      <ThemedText 
                        style={styles.productName}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {item.descricao.length > 20 && !isItemExpanded(item.id) 
                          ? `${item.descricao.substring(0, 20)}...` 
                          : item.descricao}
                      </ThemedText>
                    </View>
                    <MaterialCommunityIcons 
                      name={isItemExpanded(item.id) ? "chevron-up" : "chevron-down"} 
                      size={18} 
                      color="#666" 
                    />
                  </View>
                  
                  {isItemExpanded(item.id) && item.descricao.length > 20 && (
                    <ThemedText style={styles.expandedDescription}>
                      {item.descricao}
                    </ThemedText>
                  )}
                  
                  <View style={styles.productDetails}>
                    <View style={styles.detailItem}>
                      <ThemedText style={styles.detailLabel}>Preço:</ThemedText>
                      <ThemedText style={styles.detailValue}>
                        {formatCurrency(item.preco, item.moeda)}
                      </ThemedText>
                    </View>
                    <View style={styles.detailItem}>
                      <ThemedText style={styles.detailLabel}>IPI:</ThemedText>
                      <ThemedText style={styles.detailValue}>
                        {`${item.IPI || 'N/A'} ${item.IPI ? '%' : ''}`}
                      </ThemedText>
                    </View>
                  </View>
                </TouchableOpacity>
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
  scrollContentContainer: {
    flexGrow: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  clientName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productsContainer: {
    gap: 12,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  productTopInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  productCode: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#229dc9',
    marginRight: 8,
  },
  productName: {
    fontSize: 14,
    flex: 1,
  },
  expandedDescription: {
    fontSize: 14,
    marginBottom: 12,
    color: '#333',
    lineHeight: 20,
  },
  productNameExpanded: {
    marginBottom: 12,
  },
  productDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 8,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 11,
    color: '#666',
  },
  detailValue: {
    fontSize: 13,
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