import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';

export default function ProdutoForm() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const isEditing = params.isEditing === 'true';

  const [formData, setFormData] = useState({
    codigo: '',
    descricao: '',
    un: '',
    moeda: '',
    venda: '',
    estoque: '',
    reservado: '',
    comprado: '',
    disponivel: '',
  });

  useEffect(() => {
    if (isEditing && params) {
      setFormData({
        codigo: params.codigo as string || '',
        descricao: params.descricao as string || '',
        un: params.un as string || '',
        moeda: params.moeda as string || '',
        venda: params.venda as string || '',
        estoque: params.estoque as string || '',
        reservado: params.reservado as string || '',
        comprado: params.comprado as string || '',
        disponivel: params.disponivel as string || '',
      });
    }
  }, [params, isEditing]);

  const handleSubmit = () => {
    // Aqui você implementaria a lógica para salvar os dados
    console.log('Dados do formulário:', formData);
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#229dc9" />
        </TouchableOpacity>
        <ThemedText style={styles.title}>
          {isEditing ? 'Editar Produto' : 'Novo Produto'}
        </ThemedText>
      </View>

      <ThemedView style={styles.form}>
        <View style={styles.inputGroup}>
          <ThemedText style={styles.label}>Código</ThemedText>
          <TextInput
            style={styles.input}
            value={formData.codigo}
            onChangeText={(text) => setFormData({ ...formData, codigo: text })}
            placeholder="Digite o código"
          />
        </View>

        <View style={styles.inputGroup}>
          <ThemedText style={styles.label}>Descrição</ThemedText>
          <TextInput
            style={styles.input}
            value={formData.descricao}
            onChangeText={(text) => setFormData({ ...formData, descricao: text })}
            placeholder="Digite a descrição"
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
            <ThemedText style={styles.label}>Unidade</ThemedText>
            <TextInput
              style={styles.input}
              value={formData.un}
              onChangeText={(text) => setFormData({ ...formData, un: text })}
              placeholder="UN"
            />
          </View>

          <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
            <ThemedText style={styles.label}>Moeda</ThemedText>
            <TextInput
              style={styles.input}
              value={formData.moeda}
              onChangeText={(text) => setFormData({ ...formData, moeda: text })}
              placeholder="US$"
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
            <ThemedText style={styles.label}>Venda</ThemedText>
            <TextInput
              style={styles.input}
              value={formData.venda}
              onChangeText={(text) => setFormData({ ...formData, venda: text })}
              placeholder="0.00"
              keyboardType="numeric"
            />
          </View>

          <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
            <ThemedText style={styles.label}>Estoque</ThemedText>
            <TextInput
              style={styles.input}
              value={formData.estoque}
              onChangeText={(text) => setFormData({ ...formData, estoque: text })}
              placeholder="0.00"
              keyboardType="numeric"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <ThemedText style={styles.submitButtonText}>
            {isEditing ? 'Salvar Alterações' : 'Criar Produto'}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  form: {
    padding: 16,
    margin: 16,
    borderRadius: 12,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#666',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#229dc9',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 