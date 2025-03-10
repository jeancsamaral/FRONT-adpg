import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';
import { useAuth } from '../context/AuthContext';
import ApiCaller from '../../backEnd/apiCaller';

const apiCaller = new ApiCaller();

// Define interfaces for column configuration
interface ColumnConfig {
  id: number;
  name: string;
  visible: boolean;
  table: string;
}

interface TableConfig {
  id: number;
  name: string;
  columns: ColumnConfig[];
}

export default function ConfigColumnasScreen() {
  const router = useRouter();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [tables, setTables] = useState<TableConfig[]>([]);
  const [selectedTable, setSelectedTable] = useState<TableConfig | null>(null);

  useEffect(() => {
    if (token) {
      fetchTableConfigurations();
    } else {
      router.replace('/login');
    }
  }, [token]);

  const fetchTableConfigurations = async () => {
    if (!token) {
      return;
    }

    try {
      setLoading(true);
      // In a real app, you would fetch this from an API
      // For now, using mock data
      setTimeout(() => {
        const mockTables: TableConfig[] = [
          {
            id: 1,
            name: 'Clientes',
            columns: [
              { id: 1, name: 'Código', visible: true, table: 'clientes' },
              { id: 2, name: 'Razão Social', visible: true, table: 'clientes' },
              { id: 3, name: 'Nome Fantasia', visible: true, table: 'clientes' },
              { id: 4, name: 'CNPJ/CPF', visible: true, table: 'clientes' },
              { id: 5, name: 'Cidade', visible: true, table: 'clientes' },
              { id: 6, name: 'Estado', visible: true, table: 'clientes' },
              { id: 7, name: 'Telefone', visible: true, table: 'clientes' },
              { id: 8, name: 'Email', visible: true, table: 'clientes' },
            ],
          },
          {
            id: 2,
            name: 'Produtos',
            columns: [
              { id: 9, name: 'Código', visible: true, table: 'produtos' },
              { id: 10, name: 'Descrição', visible: true, table: 'produtos' },
              { id: 11, name: 'Preço', visible: true, table: 'produtos' },
              { id: 12, name: 'Estoque', visible: true, table: 'produtos' },
              { id: 13, name: 'Unidade', visible: true, table: 'produtos' },
              { id: 14, name: 'Grupo', visible: true, table: 'produtos' },
              { id: 15, name: 'Fornecedor', visible: false, table: 'produtos' },
            ],
          },
        ];
        setTables(mockTables);
        setSelectedTable(mockTables[0]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching table configurations:', error);
      Alert.alert('Erro', 'Não foi possível carregar as configurações de colunas.');
      setLoading(false);
    }
  };

  const toggleColumn = (tableIndex: number, columnId: number) => {
    const newTables = [...tables];
    const table = newTables[tableIndex];
    const column = table.columns.find(c => c.id === columnId);
    if (column) {
      column.visible = !column.visible;
    }
    setTables(newTables);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#229dc9', '#1a7fa3']}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Configurar Colunas</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          tables.map((table, tableIndex) => (
            <View key={table.name} style={styles.tableSection}>
              <Text style={styles.tableTitle}>{table.name}</Text>
              {table.columns.map((column) => (
                <View key={column.id} style={styles.columnItem}>
                  <Text style={styles.columnName}>{column.name}</Text>
                  <Switch
                    value={column.visible}
                    onValueChange={() => toggleColumn(tableIndex, column.id)}
                    trackColor={{ false: '#ddd', true: '#229dc9' }}
                    thumbColor={column.visible ? '#fff' : '#f4f3f4'}
                  />
                </View>
              ))}
            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={() => router.back()}>
          <Text style={styles.saveButtonText}>Salvar Configurações</Text>
        </TouchableOpacity>
      </View>
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
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  tableSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  columnItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  columnName: {
    fontSize: 16,
    color: '#333',
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  saveButton: {
    backgroundColor: '#229dc9',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 