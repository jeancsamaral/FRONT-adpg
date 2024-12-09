import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { Image } from 'react-native';
import groupIcon from '@/assets/images/group.png';
import Ionicons from '@expo/vector-icons/Ionicons';
import { userService } from '../services/userService';
import { User } from '../types/index';

export default function UsuariosScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getUsers(page);
      setUsers(data.users);
    } catch (err) {
      setError('Erro ao carregar usuários');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (userData: Partial<User>) => {
    try {
      setLoading(true);
      await userService.createUser(userData);
      loadUsers(); // Recarrega a lista
    } catch (err) {
      setError('Erro ao criar usuário');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (id: number, userData: Partial<User>) => {
    try {
      setLoading(true);
      await userService.updateUser(id, userData);
      loadUsers(); // Recarrega a lista
      setIsEditing(false);
      setSelectedUser(null);
    } catch (err) {
      setError('Erro ao atualizar usuário');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      setLoading(true);
      await userService.deleteUser(id);
      loadUsers(); // Recarrega a lista
    } catch (err) {
      setError('Erro ao deletar usuário');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ThemedView style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#0a7ea4" />
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={[styles.container, styles.centered]}>
        <ThemedText style={styles.errorText}>{error}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.headerMain}>
        <Image source={groupIcon} style={styles.icon} />
        <ThemedText style={styles.title}>Usuários</ThemedText>
      </ThemedView>

      <ThemedView style={styles.buttonContainer}>
        <TouchableOpacity style={styles.createButton} onPress={() => {/* Adicione sua função aqui */}}>
          <Ionicons name="add-outline" size={20} color="white" />
          <ThemedText style={styles.buttonText}>Criar Usuário</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ScrollView style={styles.scrollContainer}>
        <ThemedView style={styles.table}>
          {users.map((item, index) => (
            <ThemedView key={index} style={styles.tableRow}>
              <ThemedView style={styles.cell}>
                <ThemedText style={styles.label}>Usuário</ThemedText>
                <ThemedText style={styles.value}>{item.nome}</ThemedText>
              </ThemedView>
              <ThemedView style={styles.cell}>
                <ThemedText style={styles.label}>Login</ThemedText>
                <ThemedText style={styles.value}>{item.codusr}</ThemedText>
              </ThemedView>
              <ThemedView style={styles.cell}>
                <ThemedText style={styles.label}>Dt. Inclusão</ThemedText>
                <ThemedText style={styles.value}>{item.registro}</ThemedText>
              </ThemedView>
              <ThemedView style={styles.cell}>
                <ThemedText style={styles.label}>Status</ThemedText>
                <ThemedText style={[
                  styles.value,
                  item.inativo === 'N' ? styles.statusAtivo : styles.statusInativo
                ]}>
                  {item.inativo === 'N' ? 'Ativo' : 'Inativo'}
                </ThemedText>
              </ThemedView>
              <ThemedView style={styles.cellLast}>
                <ThemedText style={styles.label}>Ações</ThemedText>
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
            </ThemedView>
          ))}
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 60,
    backgroundColor: 'white',
  },

  headerMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#c9c9c9',
    paddingBottom: 20,
    backgroundColor: 'white',
    marginTop: 40,
    paddingRight: 20,
    flexWrap: 'wrap',
  },

  icon: {
    width: 35,
    height: 35,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
  },

  buttonContainer: {
    marginBottom: 20,
    backgroundColor:'white'
  },

  createButton: {
    backgroundColor: '#0a7ea4',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 4,
    gap: 8,
    width: 'auto',
    alignSelf: 'flex-start',
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },

  scrollContainer: {
    flex: 1,
  },

  table: {
    gap: 16,
    backgroundColor: 'white',
    paddingBottom: 20,
  },

  tableRow: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 4,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 2,
  },

  cell: {
    marginBottom: 8,
    backgroundColor: '#F5F5F5',
    borderBottomColor: '#c9c9c9',
    borderBottomWidth: 0.5,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  cellLast: {
    marginBottom: 8,
    backgroundColor: '#F5F5F5',
    borderBottomColor: '#c9c9c9',
    borderBottomWidth: 0,
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  label: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },

  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
    backgroundColor: '#F5F5F5',
  },

  actionIcons: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    justifyContent: 'flex-end',
  },

  value: {
    color: '#000',
    fontSize: 14,
  },

  statusAtivo: {
    color: '#008000', // verde
    fontWeight: '500',
  },

  statusInativo: {
    color: '#FF0000', // vermelho
    fontWeight: '500',
  },

  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  }
});
