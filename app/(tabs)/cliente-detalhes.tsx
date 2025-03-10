import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ClientesApp } from '../../backEnd/interfaces';
import ApiCaller from '../../backEnd/apiCaller';
import { useAuth } from '../context/AuthContext';

const apiCaller = new ApiCaller();

export default function ClienteDetalhesScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState<ClientesApp | null>(null);

  useEffect(() => {
    fetchClientDetails();
  }, []);

  const fetchClientDetails = async () => {
    if (!token || !params.codcli) {
      Alert.alert('Erro', 'Informações do cliente não encontradas.');
      router.back();
      return;
    }

    try {
      setLoading(true);
      
      // If we have all the client data in params, use it directly
      if (params.id && params.razao && params.cidade) {
        // Create a client object from params
        const clientFromParams: ClientesApp = {
          id: parseInt(params.id as string),
          codcli: parseInt(params.codcli as string),
          razao: params.razao as string,
          fantasia: params.fantasia as string,
          cidade: params.cidade as string,
          estado: params.estado as string,
          fone: params.fone as string,
          contato: params.contato as string,
          email: params.email as string,
          pessoa: params.pessoa as string,
          cnpj_cpf: params.cnpj_cpf as string,
          ie_rg: params.ie_rg as string,
          endereco: params.endereco as string,
          bairro: params.bairro as string,
          cep: params.cep as string,
          pais: params.pais as string,
          inativo: 'N',
          excluido: 'N',
          registro: 0,
          // Default values for required properties
          abertura: new Date(),
          clidesde: new Date(),
          transporta: '',
          icms: 0,
          itens: [],
          notas: [],
          recebidosApp: [],
          receberApp: []
        };
        setClient(clientFromParams);
      } else {
        // Fetch client details from API
        const clients = await apiCaller.clientMethods.getClientWithFilter(1, 10, token);
        const foundClient = clients.find((c: ClientesApp) => c.codcli === parseInt(params.codcli as string));
        
        if (foundClient) {
          setClient(foundClient);
        } else {
          Alert.alert('Erro', 'Cliente não encontrado.');
          router.back();
        }
      }
    } catch (error) {
      console.error('Error fetching client details:', error);
      Alert.alert('Erro', 'Não foi possível carregar os detalhes do cliente.');
    } finally {
      setLoading(false);
    }
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
              <MaterialCommunityIcons name="account-details" size={32} color="#fff" />
              <ThemedText style={styles.title}>Detalhes do Cliente</ThemedText>
            </View>
          </View>
        </LinearGradient>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#229dc9" />
        </View>
      </SafeAreaView>
    );
  }

  if (!client) {
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
        <ThemedView style={styles.errorContainer}>
          <MaterialCommunityIcons name="alert-circle-outline" size={48} color="#ccc" />
          <ThemedText style={styles.errorText}>Cliente não encontrado</ThemedText>
        </ThemedView>
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
            <MaterialCommunityIcons name="account-details" size={32} color="#fff" />
            <ThemedText style={styles.title}>Detalhes do Cliente</ThemedText>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollContainer}>
        <ThemedView style={styles.contentContainer}>
          <ThemedView style={styles.card}>
            <ThemedText style={styles.cardTitle}>Informações Gerais</ThemedText>
            <InfoItem label="Código" value={client.codcli.toString()} />
            <InfoItem label="Razão Social" value={client.razao || '-'} />
            <InfoItem label="Nome Fantasia" value={client.fantasia || '-'} />
            <InfoItem label="Tipo de Pessoa" value={client.pessoa === 'J' ? 'Jurídica' : 'Física'} />
            <InfoItem label="CNPJ/CPF" value={client.cnpj_cpf || '-'} />
            <InfoItem label="Inscrição Estadual" value={client.ie_rg || '-'} />
          </ThemedView>

          <ThemedView style={styles.card}>
            <ThemedText style={styles.cardTitle}>Endereço</ThemedText>
            <InfoItem label="Logradouro" value={client.endereco || '-'} />
            <InfoItem label="Bairro" value={client.bairro || '-'} />
            <InfoItem label="Cidade" value={client.cidade || '-'} />
            <InfoItem label="UF" value={client.estado || '-'} />
            <InfoItem label="CEP" value={client.cep || '-'} />
            <InfoItem label="País" value={client.pais || '-'} />
          </ThemedView>

          <ThemedView style={styles.card}>
            <ThemedText style={styles.cardTitle}>Contato</ThemedText>
            <InfoItem label="Contato" value={client.contato || '-'} />
            <InfoItem label="Telefone" value={client.fone || '-'} />
            <InfoItem label="E-mail" value={client.email || '-'} />
          </ThemedView>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push({
                pathname: '/(tabs)/cliente-vendas',
                params: { 
                  codcli: client.codcli.toString(),
                  razao: client.razao || client.fantasia || ''
                }
              })}
            >
              <MaterialCommunityIcons name="file-document-outline" size={24} color="#fff" />
              <ThemedText style={styles.actionButtonText}>Vendas</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push({
                pathname: '/(tabs)/cliente-produtos',
                params: { 
                  codcli: client.codcli.toString(),
                  razao: client.razao || client.fantasia || ''
                }
              })}
            >
              <MaterialCommunityIcons name="package-variant" size={24} color="#fff" />
              <ThemedText style={styles.actionButtonText}>Produtos</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push({
                pathname: '/(tabs)/cliente-titulos',
                params: { 
                  codcli: client.codcli.toString(),
                  razao: client.razao || client.fantasia || ''
                }
              })}
            >
              <MaterialCommunityIcons name="cash-multiple" size={24} color="#fff" />
              <ThemedText style={styles.actionButtonText}>Títulos</ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.infoItem}>
    <ThemedText style={styles.infoLabel}>{label}</ThemedText>
    <ThemedText style={styles.infoValue}>{value}</ThemedText>
  </View>
);

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
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoItem: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    flex: 2,
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#229dc9',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  actionButtonText: {
    color: '#fff',
    marginTop: 5,
    fontSize: 14,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
}); 