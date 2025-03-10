import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, SafeAreaView, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import ApiCaller from '../../backEnd/apiCaller';
import { useAuth } from '../context/AuthContext';
import { ProdutosApp } from '../../backEnd/interfaces';

// Initialize ApiCaller
const apiCaller = new ApiCaller();

export default function ProdutoDetalhesScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { token } = useAuth();
  const [product, setProduct] = useState<ProdutosApp | null>(null);

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    // Check if we already have the product data in params
    if (params.codigo && params.descricao) {
      // If we have the product data in params, use it directly
      setProduct({
        id: parseInt(params.id as string) || 0,
        codprod: parseInt(params.codigo as string) || 0,
        codproduto: params.codigo as string || '',
        descricao: params.descricao as string || '',
        unidadeDePeso: params.un as string || '',
        moeda: params.moeda as string || '',
        preco: parseFloat(params.venda as string) || 0,
        estoque: parseFloat(params.estoque as string) || 0,
        reservado: parseFloat(params.reservado as string) || 0,
        comprado: parseFloat(params.comprado as string) || 0,
        disponivel: parseFloat(params.disponivel as string) || 0,
        codgru: 0, // Default value
        GruposApp: null as any, // Default value
        ClientesApp_Itens: [], // Default value
        Lote: [], // Default value
      });
      return;
    }

    // If we don't have the product data in params, fetch it from the API
    if (!token || !params.id) {
      router.replace('/login');
      return;
    }

    try {
      // Fix the order of parameters to match the API method signature
      const productId = parseInt(params.id as string);
      if (isNaN(productId)) {
        Alert.alert('Erro', 'ID do produto inválido.');
        router.back();
        return;
      }
      
      // Use the actual API call
      const response = await apiCaller.productMethods.getProducts(
        productId,
        1,
        10,
        token
      );
      setProduct(response);
    } catch (error) {
      console.error('Error fetching product details:', error);
      Alert.alert('Erro', 'Não foi possível carregar os detalhes do produto.');
    }
  };

  if (!product) {
    return <ActivityIndicator size="large" color="#229dc9" />;
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
            <MaterialCommunityIcons name="cube" size={32} color="#fff" />
            <ThemedText style={styles.title}>Detalhes do Produto</ThemedText>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollContainer}>
        <ThemedView style={styles.contentContainer}>
          <View style={styles.cardHeader}>
            <ThemedText style={styles.codigo}>{product.codproduto}</ThemedText>
            <ThemedText style={styles.descricao}>{product.descricao}</ThemedText>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Informações Básicas</ThemedText>
            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <ThemedText style={styles.label}>Unidade</ThemedText>
                <ThemedText style={styles.value}>{product.unidadeDePeso}</ThemedText>
              </View>
              <View style={styles.infoItem}>
                <ThemedText style={styles.label}>Moeda</ThemedText>
                <ThemedText style={styles.value}>{product.moeda}</ThemedText>
              </View>
              <View style={styles.infoItem}>
                <ThemedText style={styles.label}>Preço de Venda</ThemedText>
                <ThemedText style={styles.value}>{product.preco}</ThemedText>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Status do Estoque</ThemedText>
            <View style={styles.statusContainer}>
              <View style={styles.statusItem}>
                <ThemedText style={styles.label}>Estoque Atual</ThemedText>
                <ThemedText style={styles.value}>{product.estoque}</ThemedText>
              </View>
              <View style={styles.statusItem}>
                <ThemedText style={[styles.label, styles.redText]}>Reservado</ThemedText>
                <ThemedText style={styles.redText}>{product.reservado}</ThemedText>
              </View>
              <View style={styles.statusItem}>
                <ThemedText style={[styles.label, styles.greenText]}>Comprado</ThemedText>
                <ThemedText style={styles.greenText}>{product.comprado}</ThemedText>
              </View>
              <View style={styles.statusItem}>
                <ThemedText style={[styles.label, styles.blueText]}>Disponível</ThemedText>
                <ThemedText style={styles.blueText}>{product.disponivel}</ThemedText>
              </View>
            </View>
          </View>
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
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  backButton: {
    marginRight: 10,
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
  cardHeader: {
    marginBottom: 20,
  },
  codigo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#229dc9',
  },
  descricao: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#229dc9',
    marginBottom: 12,
  },
  infoGrid: {
    gap: 12,
  },
  infoItem: {
    marginBottom: 8,
  },
  statusContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  statusItem: {
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    color: '#333',
  },
  redText: {
    color: '#FF3B30',
  },
  greenText: {
    color: '#34C759',
  },
  blueText: {
    color: '#007AFF',
  },
}); 