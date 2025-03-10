import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { useLocalSearchParams, useRouter } from 'expo-router';

// Dados de exemplo
const produtosData = [
  {
    codigo: 'PA00730',
    descricao: 'IRGASURF SR 100',
    estoque: '523,80',
    moeda: 'US$',
    precoVenda: '67,28'
  },
  {
    codigo: 'PA00731',
    descricao: 'IRGASURF HL 560',
    estoque: '892,45',
    moeda: 'US$',
    precoVenda: '89,90'
  },
  {
    codigo: 'PA00732',
    descricao: 'POLÍMERO XR-750',
    estoque: '156,20',
    moeda: 'R$',
    precoVenda: '145,60'
  },
  {
    codigo: 'PA00733',
    descricao: 'ADITIVO KP-200',
    estoque: '278,35',
    moeda: 'US$',
    precoVenda: '52,75'
  }
];

export default function ClienteProdutosScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

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
            <MaterialCommunityIcons name="package-variant" size={24} color="#fff" />
            <ThemedText style={styles.title}>Produtos</ThemedText>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollContainer}>
        <ThemedView style={styles.contentContainer}>
          {produtosData.map((produto, index) => (
            <ThemedView key={index} style={styles.produtoCard}>
              <View style={styles.cardHeader}>
                <ThemedText style={styles.codigo}>{produto.codigo}</ThemedText>
                <ThemedText style={styles.descricao}>{produto.descricao}</ThemedText>
              </View>

              <View style={styles.cardContent}>
                <View style={styles.infoRow}>
                  <View style={styles.infoItem}>
                    <ThemedText style={styles.label}>Estoque</ThemedText>
                    <ThemedText style={styles.value}>{produto.estoque}</ThemedText>
                  </View>
                  <View style={styles.infoItem}>
                    <ThemedText style={styles.label}>Moeda</ThemedText>
                    <ThemedText style={styles.value}>{produto.moeda}</ThemedText>
                  </View>
                  <View style={styles.infoItem}>
                    <ThemedText style={styles.label}>Preço Venda</ThemedText>
                    <ThemedText style={[styles.value, styles.precoVenda]}>
                      {produto.moeda} {produto.precoVenda}
                    </ThemedText>
                  </View>
                </View>
              </View>
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
  produtoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    marginBottom: 12,
  },
  codigo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#229dc9',
    marginBottom: 4,
  },
  descricao: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardContent: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  infoItem: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  precoVenda: {
    color: '#229dc9',
    fontWeight: 'bold',
  },
}); 