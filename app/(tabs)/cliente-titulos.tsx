import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ReceberApp, RecebidosApp, NotasApp } from '../../backEnd/interfaces';
import ApiCaller from '../../backEnd/apiCaller';
import { useAuth } from '../context/AuthContext';

const apiCaller = new ApiCaller();

// Sample data structure for the financial summary
interface FinancialSummary {
  ultimaCompra: {
    data: Date | null;
    valor: number;
  };
  recebidos: {
    total: number;
    quantidade: number;
  };
  aReceber: {
    total: number;
    quantidade: number;
  };
}

export default function ClienteTitulosScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState<'recebidos' | 'aReceber'>('recebidos');
  const [loading, setLoading] = useState(true);
  const [titulosRecebidos, setTitulosRecebidos] = useState<RecebidosApp[]>([]);
  const [titulosAReceber, setTitulosAReceber] = useState<ReceberApp[]>([]);
  const [summary, setSummary] = useState<FinancialSummary>({
    ultimaCompra: {
      data: null,
      valor: 0
    },
    recebidos: {
      total: 0,
      quantidade: 0
    },
    aReceber: {
      total: 0,
      quantidade: 0
    }
  });

  useEffect(() => {
    fetchClienteTitulos();
  }, []);

  const fetchClienteTitulos = async () => {
    if (!token || !params.codcli) {
      Alert.alert('Erro', 'Informações do cliente não encontradas.');
      router.back();
      return;
    }

    try {
      setLoading(true);
      
      // Get received payments
      const recebidos = await apiCaller.recebidosAppMethods.getRecebidosAppByCodcli(
        params.codcli as string,
        1, // page
        100, // limit
        token
      );
      
      // Get pending payments
      const aReceber = await apiCaller.receberAppMethods.getReceberAppByCodcli(
        params.codcli as string,
        1, // page
        100, // limit
        token
      );
      
      // Get latest purchase (note)
      const allNotas = await apiCaller.notasMethods.getAllNotas(
        1, // page
        100, // limit
        token
      );
      
      // Filter notes for the current client and sort by emission date (descending)
      const clienteNotas = allNotas
        .filter((nota: NotasApp) => nota.cliente && nota.codcli === parseInt(params.codcli as string))
        .sort((a: NotasApp, b: NotasApp) => new Date(b.emissao).getTime() - new Date(a.emissao).getTime());
      
      // Calculate summary
      const recebidosTotal = recebidos.reduce((sum: number, item: RecebidosApp) => sum + item.valor, 0);
      const aReceberTotal = aReceber.reduce((sum: number, item: ReceberApp) => sum + item.valor, 0);
      
      // Update state
      setTitulosRecebidos(recebidos);
      setTitulosAReceber(aReceber);
      setSummary({
        ultimaCompra: {
          data: clienteNotas.length > 0 ? new Date(clienteNotas[0].emissao) : null,
          valor: clienteNotas.length > 0 ? clienteNotas[0].totalnota : 0
        },
        recebidos: {
          total: recebidosTotal,
          quantidade: recebidos.length
        },
        aReceber: {
          total: aReceberTotal,
          quantidade: aReceber.length
        }
      });
    } catch (error) {
      console.error('Error fetching client financial data:', error);
      Alert.alert('Erro', 'Não foi possível carregar os dados financeiros do cliente.');
    } finally {
      setLoading(false);
    }
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Format date
  const formatDate = (date: Date | null) => {
    if (!date) return '-';
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
              <MaterialCommunityIcons name="cash-multiple" size={32} color="#fff" />
              <ThemedText style={styles.title}>Títulos do Cliente</ThemedText>
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
            <MaterialCommunityIcons name="cash-multiple" size={32} color="#fff" />
            <ThemedText style={styles.title}>Títulos do Cliente</ThemedText>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollContainer}>
        <ThemedView style={styles.contentContainer}>
          <ThemedText style={styles.clientName}>{params.razao || 'Cliente'}</ThemedText>
          
          <ThemedView style={styles.summaryContainer}>
            <ThemedView style={styles.summaryCard}>
              <ThemedText style={styles.summaryTitle}>Última Compra</ThemedText>
              <ThemedText style={styles.summaryValue}>{formatCurrency(summary.ultimaCompra.valor)}</ThemedText>
              <ThemedText style={styles.summarySubtitle}>{formatDate(summary.ultimaCompra.data)}</ThemedText>
            </ThemedView>
            
            <ThemedView style={styles.summaryCard}>
              <ThemedText style={styles.summaryTitle}>Recebidos</ThemedText>
              <ThemedText style={styles.summaryValue}>{formatCurrency(summary.recebidos.total)}</ThemedText>
              <ThemedText style={styles.summarySubtitle}>{summary.recebidos.quantidade} título(s)</ThemedText>
            </ThemedView>
            
            <ThemedView style={styles.summaryCard}>
              <ThemedText style={styles.summaryTitle}>A Receber</ThemedText>
              <ThemedText style={styles.summaryValue}>{formatCurrency(summary.aReceber.total)}</ThemedText>
              <ThemedText style={styles.summarySubtitle}>{summary.aReceber.quantidade} título(s)</ThemedText>
            </ThemedView>
          </ThemedView>
          
          <ThemedView style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tabButton, activeTab === 'recebidos' && styles.activeTabButton]}
              onPress={() => setActiveTab('recebidos')}
            >
              <ThemedText style={[styles.tabText, activeTab === 'recebidos' && styles.activeTabText]}>
                Recebidos
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tabButton, activeTab === 'aReceber' && styles.activeTabButton]}
              onPress={() => setActiveTab('aReceber')}
            >
              <ThemedText style={[styles.tabText, activeTab === 'aReceber' && styles.activeTabText]}>
                A Receber
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
          
          {activeTab === 'recebidos' ? (
            <ThemedView style={styles.titulosContainer}>
              {titulosRecebidos.length > 0 ? (
                titulosRecebidos.map((titulo, index) => (
                  <ThemedView key={index} style={styles.tituloCard}>
                    <View style={styles.tituloHeader}>
                      <ThemedText style={styles.tituloTitle}>{titulo.titulo}</ThemedText>
                      <ThemedText style={styles.tituloValue}>{formatCurrency(titulo.valor)}</ThemedText>
                    </View>
                    <View style={styles.tituloDetails}>
                      <View style={styles.tituloDetail}>
                        <ThemedText style={styles.detailLabel}>Nota</ThemedText>
                        <ThemedText style={styles.detailValue}>{titulo.nota}</ThemedText>
                      </View>
                      <View style={styles.tituloDetail}>
                        <ThemedText style={styles.detailLabel}>Previsto</ThemedText>
                        <ThemedText style={styles.detailValue}>{formatDate(titulo.previsto)}</ThemedText>
                      </View>
                      <View style={styles.tituloDetail}>
                        <ThemedText style={styles.detailLabel}>Realizado</ThemedText>
                        <ThemedText style={styles.detailValue}>{formatDate(titulo.realizado)}</ThemedText>
                      </View>
                    </View>
                  </ThemedView>
                ))
              ) : (
                <ThemedView style={styles.emptyState}>
                  <MaterialCommunityIcons name="cash-remove" size={48} color="#ccc" />
                  <ThemedText style={styles.emptyStateText}>Nenhum título recebido</ThemedText>
                </ThemedView>
              )}
            </ThemedView>
          ) : (
            <ThemedView style={styles.titulosContainer}>
              {titulosAReceber.length > 0 ? (
                titulosAReceber.map((titulo, index) => (
                  <ThemedView key={index} style={styles.tituloCard}>
                    <View style={styles.tituloHeader}>
                      <ThemedText style={styles.tituloTitle}>{titulo.titulo}</ThemedText>
                      <ThemedText style={styles.tituloValue}>{formatCurrency(titulo.valor)}</ThemedText>
                    </View>
                    <View style={styles.tituloDetails}>
                      <View style={styles.tituloDetail}>
                        <ThemedText style={styles.detailLabel}>Nota</ThemedText>
                        <ThemedText style={styles.detailValue}>{titulo.nota}</ThemedText>
                      </View>
                      <View style={styles.tituloDetail}>
                        <ThemedText style={styles.detailLabel}>Previsto</ThemedText>
                        <ThemedText style={styles.detailValue}>{formatDate(titulo.previsto)}</ThemedText>
                      </View>
                    </View>
                  </ThemedView>
                ))
              ) : (
                <ThemedView style={styles.emptyState}>
                  <MaterialCommunityIcons name="cash-lock" size={48} color="#ccc" />
                  <ThemedText style={styles.emptyStateText}>Nenhum título a receber</ThemedText>
                </ThemedView>
              )}
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
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#229dc9',
  },
  summarySubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  activeTabButton: {
    backgroundColor: '#229dc9',
  },
  tabText: {
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
  },
  titulosContainer: {
    marginBottom: 20,
  },
  tituloCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  tituloHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tituloTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tituloValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#229dc9',
  },
  tituloDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tituloDetail: {
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