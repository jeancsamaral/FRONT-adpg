import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface ColumnConfig {
  id: string;
  name: string;
  visible: boolean;
}

interface TableConfig {
  name: string;
  columns: ColumnConfig[];
}

export default function ColumnConfigScreen() {
  const router = useRouter();
  const [tables, setTables] = useState<TableConfig[]>([
    {
      name: 'Clientes',
      columns: [
        { id: 'codigo', name: 'Código', visible: true },
        { id: 'razaoSocial', name: 'Razão Social', visible: true },
        { id: 'cnpj', name: 'CNPJ', visible: true },
        { id: 'telefone', name: 'Telefone', visible: true },
        { id: 'email', name: 'E-mail', visible: false },
        { id: 'endereco', name: 'Endereço', visible: false },
      ],
    },
    {
      name: 'Produtos',
      columns: [
        { id: 'codigo', name: 'Código', visible: true },
        { id: 'descricao', name: 'Descrição', visible: true },
        { id: 'preco', name: 'Preço', visible: true },
        { id: 'estoque', name: 'Estoque', visible: true },
        { id: 'fornecedor', name: 'Fornecedor', visible: false },
        { id: 'categoria', name: 'Categoria', visible: false },
      ],
    },
  ]);

  const toggleColumn = (tableIndex: number, columnId: string) => {
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
        {tables.map((table, tableIndex) => (
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
        ))}
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