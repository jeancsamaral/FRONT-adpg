import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { UserForm } from '../components/UserForm';
import { User } from '../types';

// Dados de exemplo
const usersData = [
  {
    id: 1,
    codusr: 1,
    nome: 'Administrador',
    supervisor: 'Admin',
    inativo: 'N',
    excluido: 'N',
    registro: 1,
  },
  {
    id: 2,
    codusr: 2,
    nome: 'João Silva',
    supervisor: 'Administrador',
    inativo: 'N',
    excluido: 'N',
    registro: 2,
  },
];

export default function UsuariosScreen() {
  const [users, setUsers] = useState(usersData);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleCreateUser = async (userData: Partial<User>) => {
    // Aqui você implementaria a lógica para criar um usuário
    console.log('Criar usuário:', userData);
    setIsEditing(false);
  };

  const handleUpdateUser = async (userData: Partial<User>) => {
    // Aqui você implementaria a lógica para atualizar um usuário
    console.log('Atualizar usuário:', userData);
    setIsEditing(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = async (userId: number) => {
    // Aqui você implementaria a lógica para deletar um usuário
    console.log('Deletar usuário:', userId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#229dc9', '#1a7fa3']}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <MaterialCommunityIcons name="account-cog" size={32} color="#fff" />
            <ThemedText style={styles.title}>Gerenciar Usuários</ThemedText>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollContainer}>
        <ThemedView style={styles.contentContainer}>
          {!isEditing ? (
            <>
              <TouchableOpacity 
                style={styles.createButton}
                onPress={() => setIsEditing(true)}
              >
                <MaterialCommunityIcons name="plus-circle" size={24} color="#fff" />
                <ThemedText style={styles.buttonText}>Novo Usuário</ThemedText>
              </TouchableOpacity>

              <ThemedView style={styles.table}>
                {users.map((item) => (
                  <ThemedView key={item.id} style={styles.tableRow}>
                    <ThemedView style={styles.rowHeader}>
                      <ThemedText style={styles.codigo}>{item.codusr}</ThemedText>
                      <ThemedText style={styles.nome}>{item.nome}</ThemedText>
                    </ThemedView>

                    <ThemedView style={styles.rowContent}>
                      <ThemedView style={styles.cell}>
                        <ThemedText style={styles.label}>Supervisor</ThemedText>
                        <ThemedText style={styles.value}>{item.supervisor}</ThemedText>
                      </ThemedView>
                      <ThemedView style={styles.cell}>
                        <ThemedText style={styles.label}>Status</ThemedText>
                        <ThemedText style={styles.value}>
                          {item.inativo === 'N' ? 'Ativo' : 'Inativo'}
                        </ThemedText>
                      </ThemedView>
                    </ThemedView>

                    <ThemedView style={styles.actionIcons}>
                      <TouchableOpacity onPress={() => {
                        setSelectedUser(item);
                        setIsEditing(true);
                      }}>
                        <Ionicons name="create-outline" size={20} color="#075eec" />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleDeleteUser(item.id)}>
                        <Ionicons name="trash-outline" size={20} color="#dc2626" />
                      </TouchableOpacity>
                    </ThemedView>
                  </ThemedView>
                ))}
              </ThemedView>
            </>
          ) : (
            <UserForm
              user={selectedUser}
              onSubmit={selectedUser ? handleUpdateUser : handleCreateUser}
              onCancel={() => {
                setIsEditing(false);
                setSelectedUser(null);
              }}
            />
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
    alignItems: 'center',
    marginBottom: 12,
  },
  codigo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#229dc9',
  },
  nome: {
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
  cell: {
    flex: 1,
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
    justifyContent: 'flex-end',
    gap: 20,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
});
