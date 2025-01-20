import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, SafeAreaView, Alert, Clipboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { useRouter } from 'expo-router';

const clientData = [
  {
    codigo: '00002',
    razaoSocial: 'MEYERMAN BRASIL IND COM LTDA',
    cidade: 'SAO BERNARDO DO CAMPO',
    uf: 'SP',
    telefone: '11 4178-7444',
    contato: '-',
    email: 'meyerman@meyerman.com.br',
  },
  {
    codigo: '00003',
    razaoSocial: 'INDUSTRIA QUIMICA LTDA',
    cidade: 'GUARULHOS',
    uf: 'SP',
    telefone: '11 2222-3333',
    contato: 'João Silva',
    email: 'contato@quimica.com.br',
  },
  {
    codigo: '00004',
    razaoSocial: 'PRODUTOS QUÍMICOS SA',
    cidade: 'CAMPINAS',
    uf: 'SP',
    telefone: '19 3333-4444',
    contato: 'Maria Santos',
    email: 'maria@pquimicos.com.br',
  }
];

export default function ClientesScreen() {
  const router = useRouter();
  const [clients, setClients] = useState(clientData);

  const handleClientPress = (client: any) => {
    router.push({
      pathname: '/(tabs)/cliente-detalhes',
      params: client
    });
  };

  const handleEditClient = (client: any) => {
    // Impede que o card seja clicado ao clicar no ícone de editar
    router.push({
      pathname: '/(tabs)/cliente-form',
      params: { ...client, isEditing: true }
    });
  };

  const handleDeleteClient = (clientToDelete: any) => {
    Alert.alert(
      "Confirmar Exclusão",
      `Deseja realmente excluir o cliente ${clientToDelete.razaoSocial}?`,
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Excluir",
          style: 'destructive',
          onPress: () => {
            setClients(clients.filter(client => client.codigo !== clientToDelete.codigo));
          }
        }
      ]
    );
  };

  const handleCopyClient = async (client: any) => {
    const clientInfo = `
Código: ${client.codigo}
Razão Social: ${client.razaoSocial}
Cidade: ${client.cidade}
UF: ${client.uf}
Telefone: ${client.telefone}
Contato: ${client.contato}
Email: ${client.email}
    `.trim();

    await Clipboard.setString(clientInfo);
    Alert.alert("Sucesso", "Informações do cliente copiadas para a área de transferência!");
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#229dc9', '#1a7fa3']}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <MaterialCommunityIcons name="account-group" size={32} color="#fff" />
            <ThemedText style={styles.title}>Clientes</ThemedText>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <MaterialCommunityIcons name="account-circle" size={32} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollContainer}>
        <ThemedView style={styles.contentContainer}>
          <TouchableOpacity 
            style={styles.createButton} 
            onPress={() => router.push('/(tabs)/cliente-form')}
          >
            <MaterialCommunityIcons name="plus-circle" size={24} color="#fff" />
            <ThemedText style={styles.buttonText}>Criar Cliente</ThemedText>
          </TouchableOpacity>

          <ThemedView style={styles.table}>
            {clients.map((item, index) => (
              <View key={index}>
                <TouchableOpacity 
                  onPress={() => handleClientPress(item)}
                >
                  <ThemedView style={styles.tableRow}>
                    <View style={styles.rowHeader}>
                      <ThemedText style={styles.codigo}>{item.codigo}</ThemedText>
                      <ThemedText style={styles.razaoSocial}>{item.razaoSocial}</ThemedText>
                    </View>
                    <View style={styles.rowContent}>
                      <View style={styles.column}>
                        <View style={styles.cell}>
                          <ThemedText style={styles.label}>Cidade</ThemedText>
                          <ThemedText style={styles.value}>{item.cidade}</ThemedText>
                        </View>
                        <View style={styles.cell}>
                          <ThemedText style={styles.label}>UF</ThemedText>
                          <ThemedText style={styles.value}>{item.uf}</ThemedText>
                        </View>
                      </View>
                      <View style={styles.column}>
                        <View style={styles.cell}>
                          <ThemedText style={styles.label}>Telefone</ThemedText>
                          <ThemedText style={styles.value}>{item.telefone}</ThemedText>
                        </View>
                        <View style={styles.cell}>
                          <ThemedText style={styles.label}>Contato</ThemedText>
                          <ThemedText style={styles.value}>{item.contato}</ThemedText>
                        </View>
                      </View>
                    </View>
                    <View style={styles.cell}>
                      <ThemedText style={styles.label}>Email</ThemedText>
                      <ThemedText style={styles.value}>{item.email}</ThemedText>
                    </View>
                    <View style={styles.actionIcons}>
                      <TouchableOpacity 
                        onPress={() => handleEditClient(item)}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      >
                        <MaterialCommunityIcons 
                          name="pencil" 
                          size={20} 
                          color="#229dc9" 
                        />
                      </TouchableOpacity>
                      <TouchableOpacity 
                        onPress={() => handleDeleteClient(item)}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      >
                        <MaterialCommunityIcons 
                          name="delete" 
                          size={20} 
                          color="#dc2626" 
                        />
                      </TouchableOpacity>
                      <TouchableOpacity 
                        onPress={() => handleCopyClient(item)}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      >
                        <MaterialCommunityIcons 
                          name="content-copy" 
                          size={20} 
                          color="#229dc9" 
                        />
                      </TouchableOpacity>
                    </View>
                  </ThemedView>
                </TouchableOpacity>
              </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileButton: {
    padding: 8,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  createButton: {
    backgroundColor: '#229dc9',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
  table: {
    gap: 16,
  },
  tableRow: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  codigo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#229dc9',
  },
  razaoSocial: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginLeft: 8,
  },
  rowContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
  },
  cell: {
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    color: '#666',
  },
  value: {
    fontSize: 14,
    color: '#333',
  },
  actionIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
});

