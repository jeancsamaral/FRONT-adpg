import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { ProdutosApp } from '../../backEnd/interfaces';
import ApiCaller from '../../backEnd/apiCaller';
import { useAuthCheck } from '../hooks/useAuthCheck';

const apiCaller = new ApiCaller();

export default function ProdutoForm() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { token, loading: authLoading } = useAuthCheck();
  const isEditing = params.isEditing === 'true';
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<Partial<ProdutosApp>>({
    codproduto: '',
    descricao: '',
    unidadeDePeso: '',
    moeda: '',
    preco: 0,
    estoque: 0,
    reservado: 0,
    comprado: 0,
    disponivel: 0,
  });

  useEffect(() => {
    if (token && isEditing && params.id) {
      fetchProductDetails(params.id as string);
    }
  }, [params, isEditing, token]);

  const fetchProductDetails = async (productId: string) => {
    if (!token) {
      return;
    }

    try {
      setLoading(true);
      const product = await apiCaller.productMethods.getProducts(parseInt(productId), 1, 10000, token);
      if (product) {
        setFormData({
          codproduto: product.codproduto,
          descricao: product.descricao,
          unidadeDePeso: product.unidadeDePeso,
          moeda: product.moeda,
          preco: product.preco,
          estoque: product.estoque,
          reservado: product.reservado,
          comprado: product.comprado,
          disponivel: product.disponivel,
        });
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
      Alert.alert('Erro', 'Não foi possível carregar os detalhes do produto.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!token) {
      router.replace('/login');
      return;
    }

    try {
      setLoading(true);
      
      if (isEditing && params.id) {
        Alert.alert('Sucesso', 'Produto atualizado com sucesso!');
      } else {
        Alert.alert('Sucesso', 'Produto criado com sucesso!');
      }
      
      router.back();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o produto.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#229dc9" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>
          {isEditing ? 'Editar Produto' : 'Novo Produto'}
        </ThemedText>
      </View>

      <ThemedView style={styles.formContainer}>
        <View style={styles.formGroup}>
          <ThemedText style={styles.label}>Código</ThemedText>
          <TextInput
            style={styles.input}
            value={formData.codproduto}
            onChangeText={(text) => setFormData({ ...formData, codproduto: text })}
            placeholder="Código do produto"
          />
        </View>

        <View style={styles.formGroup}>
          <ThemedText style={styles.label}>Descrição</ThemedText>
          <TextInput
            style={styles.input}
            value={formData.descricao}
            onChangeText={(text) => setFormData({ ...formData, descricao: text })}
            placeholder="Descrição do produto"
          />
        </View>

        <View style={styles.formGroup}>
          <ThemedText style={styles.label}>Unidade</ThemedText>
          <TextInput
            style={styles.input}
            value={formData.unidadeDePeso}
            onChangeText={(text) => setFormData({ ...formData, unidadeDePeso: text })}
            placeholder="Unidade de medida"
          />
        </View>

        <View style={styles.formGroup}>
          <ThemedText style={styles.label}>Moeda</ThemedText>
          <TextInput
            style={styles.input}
            value={formData.moeda}
            onChangeText={(text) => setFormData({ ...formData, moeda: text })}
            placeholder="Moeda"
          />
        </View>

        <View style={styles.formGroup}>
          <ThemedText style={styles.label}>Preço</ThemedText>
          <TextInput
            style={styles.input}
            value={formData.preco?.toString()}
            onChangeText={(text) => setFormData({ ...formData, preco: parseFloat(text) || 0 })}
            placeholder="Preço"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.formGroup}>
          <ThemedText style={styles.label}>Estoque</ThemedText>
          <TextInput
            style={styles.input}
            value={formData.estoque?.toString()}
            onChangeText={(text) => setFormData({ ...formData, estoque: parseFloat(text) || 0 })}
            placeholder="Estoque"
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <ThemedText style={styles.submitButtonText}>
            {isEditing ? 'Atualizar' : 'Cadastrar'}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  submitButton: {
    backgroundColor: '#229dc9',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 