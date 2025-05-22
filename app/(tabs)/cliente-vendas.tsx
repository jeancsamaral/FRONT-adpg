import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { NotasApp, NotasApp_Itens } from '../../backEnd/interfaces';
import ApiCaller from '../../backEnd/apiCaller';
import { useAuth } from '../context/AuthContext';

const apiCaller = new ApiCaller();

// Sample data for fallback
const vendasData = [
  {
    nota: '1407',
    dataEmissao: '15/03/2024',
    valor: 'R$ 25.000,00',
    produtos: [
      {
        codigo: 'PA00001',
        descricao: 'IRGASURF SR 100',
        quantidade: '100,00',
        preco: 'R$ 150,00',
        total: 'R$ 15.000,00'
      },
      {
        codigo: 'PA00002',
        descricao: 'IRGASURF HL 560',
        quantidade: '50,00',
        preco: 'R$ 200,00',
        total: 'R$ 10.000,00'
      }
    ]
  },
  {
    nota: '1406',
    dataEmissao: '10/03/2024',
    valor: 'R$ 18.500,00',
    produtos: [
      {
        codigo: 'PA00003',
        descricao: 'POLÍMERO XR-750',
        quantidade: '75,00',
        preco: 'R$ 180,00',
        total: 'R$ 13.500,00'
      },
      {
        codigo: 'PA00004',
        descricao: 'ADITIVO KP-200',
        quantidade: '25,00',
        preco: 'R$ 200,00',
        total: 'R$ 5.000,00'
      }
    ]
  }
];

export default function ClienteVendasScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { token } = useAuth();
  const [expandedNota, setExpandedNota] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [notas, setNotas] = useState<NotasApp[]>([]);

  useEffect(() => {
    fetchClienteVendas();
  }, []);

  const fetchClienteVendas = async () => {
    if (!token || !params.codcli) {
      Alert.alert('Erro', 'Informações do cliente não encontradas.');
      router.back();
      return;
    }

    try {
      setLoading(true);
      // Get all notes and filter by client code
      const allNotas = await apiCaller.notasMethods.getAllNotas(
        null, // page
        null, // limit
        token,
        { codcli: params.codcli as string }
      );

      // Filter notes for the current client
      const clienteNotas = allNotas.filter((nota: NotasApp) => 
        nota.cliente && nota.codcli === parseInt(params.codcli as string)
      ).sort((a: NotasApp, b: NotasApp) => new Date(b.emissao).getTime() - new Date(a.emissao).getTime());
      
      setNotas(clienteNotas);
    } catch (error) {
      console.error('Error fetching client sales:', error);
      Alert.alert('Erro', 'Não foi possível carregar as vendas do cliente.');
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (nota: string) => {
    setExpandedNota(expandedNota === nota ? null : nota);
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    }).format(value);
  };

  // Format quantity with comma as decimal separator
  const formatQuantity = (value: number) => {
    return value.toString().replace('.', ',');
  };

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR');
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
              <MaterialCommunityIcons name="file-document-multiple" size={32} color="#fff" />
              <ThemedText style={styles.title}>Vendas do Cliente</ThemedText>
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
            <MaterialCommunityIcons name="file-document-multiple" size={32} color="#fff" />
            <ThemedText style={styles.title}>Vendas do Cliente</ThemedText>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollContainer}>
        <ThemedView style={styles.contentContainer}>
          <ThemedText style={styles.clientName}>{params.razao || 'Cliente'}</ThemedText>
          
          {notas.length > 0 ? (
            notas.map((notaItem) => (
              <ThemedView key={notaItem.codvenda.toString()} style={styles.notaCard}>
                <TouchableOpacity 
                  style={styles.notaHeader}
                  onPress={() => toggleExpand(notaItem.codvenda.toString())}
                >
                  <View style={styles.notaInfo}>
                    <ThemedText style={styles.notaNumber}>Nota: {notaItem.nota || notaItem.codvenda}</ThemedText>
                    <ThemedText style={styles.notaDate}>Emissão: {formatDate(notaItem.emissao)}</ThemedText>
                  </View>
                  <View style={styles.notaValue}>
                    <ThemedText style={styles.notaValueText}>{formatCurrency(notaItem.totalnota)}</ThemedText>
                    <MaterialCommunityIcons 
                      name={expandedNota === notaItem.codvenda.toString() ? "chevron-up" : "chevron-down"} 
                      size={24} 
                      color="#229dc9" 
                    />
                  </View>
                </TouchableOpacity>
                
                {expandedNota === notaItem.codvenda.toString() && (
                  <View style={styles.produtosContainer}>
                    <ThemedText style={styles.produtosTitle}>Produtos</ThemedText>
                    
                    {notaItem.itens && notaItem.itens.length > 0 ? (
                      notaItem.itens.map((item, index) => (
                        <View key={index} style={styles.produtoItem}>
                          <View style={styles.produtoHeader}>
                            <ThemedText style={styles.produtoCodigo}>{item.codproduto}</ThemedText>
                            <ThemedText style={styles.produtoDescricao}>{item.descricao}</ThemedText>
                          </View>
                          <View style={styles.produtoDetails}>
                            <View style={styles.produtoDetail}>
                              <ThemedText style={styles.detailLabel}>Qtd:</ThemedText>
                              <ThemedText style={styles.detailValue}>{formatQuantity(item.quantidade)}</ThemedText>
                            </View>
                            <View style={styles.produtoDetail}>
                              <ThemedText style={styles.detailLabel}>Valor:</ThemedText>
                              <ThemedText style={styles.detailValue}>{formatCurrency(parseFloat(item.valor))}</ThemedText>
                            </View>
                            <View style={styles.produtoDetail}>
                              <ThemedText style={styles.detailLabel}>Total:</ThemedText>
                              <ThemedText style={styles.detailValue}>{formatCurrency(parseFloat(item.total))}</ThemedText>
                            </View>
                          </View>
                        </View>
                      ))
                    ) : (
                      <ThemedText style={styles.noProdutos}>Nenhum produto encontrado</ThemedText>
                    )}
                  </View>
                )}
              </ThemedView>
            ))
          ) : (
            <ThemedView style={styles.emptyState}>
              <MaterialCommunityIcons name="file-document-outline" size={48} color="#ccc" />
              <ThemedText style={styles.emptyStateText}>Nenhuma venda encontrada</ThemedText>
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
    paddingBottom: 80,
  },
  clientName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  notaCard: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  notaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  notaInfo: {
    flex: 1,
  },
  notaNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  notaDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  notaValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notaValueText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#229dc9',
    marginRight: 5,
  },
  produtosContainer: {
    padding: 15,
    backgroundColor: '#f9f9f9',
  },
  produtosTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  produtoItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderLeftWidth: 3,
    borderLeftColor: '#229dc9',
  },
  produtoHeader: {
    marginBottom: 10,
  },
  produtoCodigo: {
    fontSize: 14,
    color: '#666',
  },
  produtoDescricao: {
    fontSize: 16,
    fontWeight: '500',
  },
  produtoDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  produtoDetail: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  noProdutos: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
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