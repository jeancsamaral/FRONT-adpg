import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { useLocalSearchParams, useRouter } from 'expo-router';

// Dados de exemplo
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
  const [expandedNota, setExpandedNota] = useState<string | null>(null);

  const toggleExpand = (nota: string) => {
    setExpandedNota(expandedNota === nota ? null : nota);
  };

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
            <MaterialCommunityIcons name="cart-outline" size={24} color="#fff" />
            <ThemedText style={styles.title}>Vendas</ThemedText>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollContainer}>
        <ThemedView style={styles.contentContainer}>
          {vendasData.map((venda, index) => (
            <ThemedView key={index} style={styles.vendaCard}>
              <TouchableOpacity 
                style={styles.vendaHeader}
                onPress={() => toggleExpand(venda.nota)}
              >
                <View style={styles.vendaInfo}>
                  <ThemedText style={styles.notaText}>Nota {venda.nota}</ThemedText>
                  <View style={styles.vendaDetails}>
                    <ThemedText style={styles.dataText}>{venda.dataEmissao}</ThemedText>
                    <ThemedText style={styles.valorText}>{venda.valor}</ThemedText>
                  </View>
                </View>
                <MaterialCommunityIcons 
                  name={expandedNota === venda.nota ? "chevron-up" : "chevron-down"} 
                  size={24} 
                  color="#229dc9" 
                />
              </TouchableOpacity>

              {expandedNota === venda.nota && (
                <View style={styles.produtosContainer}>
                  <ThemedText style={styles.produtosTitle}>Produtos</ThemedText>
                  {venda.produtos.map((produto, prodIndex) => (
                    <View key={prodIndex} style={styles.produtoItem}>
                      <View style={styles.produtoHeader}>
                        <ThemedText style={styles.produtoCodigo}>{produto.codigo}</ThemedText>
                        <ThemedText style={styles.produtoDescricao}>{produto.descricao}</ThemedText>
                      </View>
                      <View style={styles.produtoDetails}>
                        <View style={styles.detailColumn}>
                          <ThemedText style={styles.detailLabel}>Quantidade</ThemedText>
                          <ThemedText style={styles.detailValue}>{produto.quantidade}</ThemedText>
                        </View>
                        <View style={styles.detailColumn}>
                          <ThemedText style={styles.detailLabel}>Preço</ThemedText>
                          <ThemedText style={styles.detailValue}>{produto.preco}</ThemedText>
                        </View>
                        <View style={styles.detailColumn}>
                          <ThemedText style={styles.detailLabel}>Total</ThemedText>
                          <ThemedText style={styles.detailValue}>{produto.total}</ThemedText>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </ThemedView>
          ))}
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
    gap: 16,
  },
  vendaCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  vendaHeader: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vendaInfo: {
    flex: 1,
  },
  notaText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#229dc9',
    marginBottom: 4,
  },
  vendaDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  dataText: {
    fontSize: 14,
    color: '#666',
  },
  valorText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  produtosContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    padding: 16,
  },
  produtosTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  produtoItem: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  produtoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  produtoCodigo: {
    fontSize: 14,
    fontWeight: '500',
    color: '#229dc9',
    marginRight: 8,
  },
  produtoDescricao: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  produtoDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailColumn: {
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