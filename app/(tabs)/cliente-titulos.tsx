import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { useLocalSearchParams, useRouter } from 'expo-router';

// Dados de exemplo
const titulosData = {
  ultimaCompra: {
    data: '15/03/2024',
    valor: 'R$ 25.000,00'
  },
  recebidos: {
    total: 'R$ 150.000,00',
    quantidade: 12
  },
  aReceber: {
    total: 'R$ 75.000,00',
    quantidade: 5
  },
  titulosRecebidos: [
    {
      previsto: '10/02/2024',
      realizado: '10/02/2024',
      valor: 'R$ 12.500,00',
      numeroNota: '001234',
      titulo: 'NF-001234/1'
    },
    {
      previsto: '15/02/2024',
      realizado: '16/02/2024',
      valor: 'R$ 12.500,00',
      numeroNota: '001235',
      titulo: 'NF-001235/1'
    }
  ],
  titulosAReceber: [
    {
      previsto: '15/04/2024',
      realizado: '-',
      valor: 'R$ 15.000,00',
      numeroNota: '001236',
      titulo: 'NF-001236/1'
    },
    {
      previsto: '30/04/2024',
      realizado: '-',
      valor: 'R$ 15.000,00',
      numeroNota: '001237',
      titulo: 'NF-001237/1'
    }
  ]
};

export default function ClienteTitulosScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState<'recebidos' | 'aReceber'>('recebidos');

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
            <MaterialCommunityIcons name="file-document-outline" size={24} color="#fff" />
            <ThemedText style={styles.title}>Títulos</ThemedText>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollContainer}>
        <ThemedView style={styles.contentContainer}>
          <ThemedView style={styles.summaryContainer}>
            <View style={styles.summaryCard}>
              <ThemedText style={styles.summaryTitle}>Última Compra</ThemedText>
              <ThemedText style={styles.summaryValue}>{titulosData.ultimaCompra.valor}</ThemedText>
              <ThemedText style={styles.summarySubtext}>{titulosData.ultimaCompra.data}</ThemedText>
            </View>

            <View style={styles.summaryCard}>
              <ThemedText style={styles.summaryTitle}>Recebidos</ThemedText>
              <ThemedText style={styles.summaryValue}>{titulosData.recebidos.total}</ThemedText>
              <ThemedText style={styles.summarySubtext}>{titulosData.recebidos.quantidade} títulos</ThemedText>
            </View>

            <View style={styles.summaryCard}>
              <ThemedText style={styles.summaryTitle}>A Receber</ThemedText>
              <ThemedText style={styles.summaryValue}>{titulosData.aReceber.total}</ThemedText>
              <ThemedText style={styles.summarySubtext}>{titulosData.aReceber.quantidade} títulos</ThemedText>
            </View>
          </ThemedView>

          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'recebidos' && styles.activeTab]}
              onPress={() => setActiveTab('recebidos')}
            >
              <ThemedText style={[styles.tabText, activeTab === 'recebidos' && styles.activeTabText]}>
                Recebidos
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'aReceber' && styles.activeTab]}
              onPress={() => setActiveTab('aReceber')}
            >
              <ThemedText style={[styles.tabText, activeTab === 'aReceber' && styles.activeTabText]}>
                A Receber
              </ThemedText>
            </TouchableOpacity>
          </View>

          <ThemedView style={styles.titulosContainer}>
            {(activeTab === 'recebidos' ? titulosData.titulosRecebidos : titulosData.titulosAReceber).map((titulo, index) => (
              <ThemedView key={index} style={styles.tituloCard}>
                <View style={styles.tituloHeader}>
                  <ThemedText style={styles.tituloNumero}>{titulo.titulo}</ThemedText>
                  <ThemedText style={styles.tituloValor}>{titulo.valor}</ThemedText>
                </View>
                
                <View style={styles.tituloDetails}>
                  <View style={styles.detailRow}>
                    <View style={styles.detailItem}>
                      <ThemedText style={styles.detailLabel}>Previsto</ThemedText>
                      <ThemedText style={styles.detailValue}>{titulo.previsto}</ThemedText>
                    </View>
                    <View style={styles.detailItem}>
                      <ThemedText style={styles.detailLabel}>Realizado</ThemedText>
                      <ThemedText style={styles.detailValue}>{titulo.realizado}</ThemedText>
                    </View>
                  </View>
                  
                  <View style={styles.detailRow}>
                    <View style={styles.detailItem}>
                      <ThemedText style={styles.detailLabel}>Nota Fiscal</ThemedText>
                      <ThemedText style={styles.detailValue}>{titulo.numeroNota}</ThemedText>
                    </View>
                  </View>
                </View>
              </ThemedView>
            ))}
          </ThemedView>
        </ThemedView>
      </ScrollView>
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
  backButton: {
    padding: 8,
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
  summaryContainer: {
    marginBottom: 20,
  },
  summaryCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 12,
  },
  summaryTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#229dc9',
    marginBottom: 4,
  },
  summarySubtext: {
    fontSize: 12,
    color: '#666',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#229dc9',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  titulosContainer: {
    gap: 16,
  },
  tituloCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tituloHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tituloNumero: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#229dc9',
  },
  tituloValor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  tituloDetails: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
  },
}); 