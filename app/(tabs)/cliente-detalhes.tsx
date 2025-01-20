import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function ClienteDetalhesScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const client = {
    codigo: params.codigo,
    razaoSocial: params.razaoSocial,
    cidade: params.cidade,
    uf: params.uf,
    telefone: params.telefone,
    contato: params.contato,
    email: params.email,
    // Informações complementares
    cnpj: params.cnpj || '12.345.678/0001-90',
    inscricaoEstadual: params.inscricaoEstadual || '123.456.789.000',
    endereco: params.endereco || 'Rua Example, 123',
    bairro: params.bairro || 'Centro',
    cep: params.cep || '12345-678',
    celular: params.celular || '(11) 98765-4321',
    website: params.website || 'www.example.com',
    observacoes: params.observacoes || 'Cliente preferencial',
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
            <MaterialCommunityIcons name="account-details" size={32} color="#fff" />
            <ThemedText style={styles.title}>Detalhes do Cliente</ThemedText>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollContainer}>
        <ThemedView style={styles.contentContainer}>
          <ThemedView style={styles.card}>
            <View style={styles.cardHeader}>
              <ThemedText style={styles.codigo}>{client.codigo}</ThemedText>
              <ThemedText style={styles.razaoSocial}>{client.razaoSocial}</ThemedText>
            </View>

            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle}>Informações Principais</ThemedText>
              <View style={styles.infoGrid}>
                <InfoItem label="CNPJ" value={client.cnpj} />
                <InfoItem label="Inscrição Estadual" value={client.inscricaoEstadual} />
                <InfoItem label="Cidade" value={client.cidade} />
                <InfoItem label="UF" value={client.uf} />
              </View>
            </View>

            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle}>Endereço</ThemedText>
              <View style={styles.infoGrid}>
                <InfoItem label="Logradouro" value={client.endereco} />
                <InfoItem label="Bairro" value={client.bairro} />
                <InfoItem label="CEP" value={client.cep} />
              </View>
            </View>

            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle}>Contato</ThemedText>
              <View style={styles.infoGrid}>
                <InfoItem label="Telefone" value={client.telefone} />
                <InfoItem label="Celular" value={client.celular} />
                <InfoItem label="Contato" value={client.contato} />
                <InfoItem label="E-mail" value={client.email} />
                <InfoItem label="Website" value={client.website} />
              </View>
            </View>

            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle}>Observações</ThemedText>
              <ThemedText style={styles.observacoes}>{client.observacoes}</ThemedText>
            </View>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.infoItem}>
    <ThemedText style={styles.label}>{label}</ThemedText>
    <ThemedText style={styles.value}>{value}</ThemedText>
  </View>
);

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
    marginRight: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 20,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    marginBottom: 20,
  },
  codigo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#229dc9',
  },
  razaoSocial: {
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
  label: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    color: '#333',
  },
  observacoes: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
}); 