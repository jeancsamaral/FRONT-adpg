import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, SafeAreaView, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';

const fisqpData = [
  {
    id: 1,
    nome: 'FISQP - IRGASURF SR 100.pdf',
    tipo: 'PDF',
    tamanho: '2.4 MB',
    data: '15/01/2024',
  },
  {
    id: 2,
    nome: 'FISQP - IRGASURF HL 560.pdf',
    tipo: 'PDF',
    tamanho: '1.8 MB',
    data: '10/01/2024',
  },
];

const tdsData = [
  {
    id: 1,
    nome: 'TDS - IRGASURF SR 100_EN.pdf',
    tipo: 'PDF',
    tamanho: '1.5 MB',
    data: '15/01/2024',
  },
  {
    id: 2,
    nome: 'TDS - IRGASURF HL 560_EN.pdf',
    tipo: 'PDF',
    tamanho: '1.2 MB',
    data: '10/01/2024',
  },
];

// Adicione essa interface para tipar os filtros
interface Filters {
  nome: boolean;
  tipo: boolean;
  tamanho: boolean;
  data: boolean;
}

export default function ArquivosScreen() {
  const [activeTab, setActiveTab] = useState<'FISQP' | 'TDS'>('FISQP');
  const [searchText, setSearchText] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    nome: true,
    tipo: true,
    tamanho: true,
    data: true,
  });

  // Função para filtrar os documentos baseado na busca e filtros
  const filteredData = React.useMemo(() => {
    const currentData = activeTab === 'FISQP' ? fisqpData : tdsData;
    if (!searchText) return currentData;

    return currentData.filter(doc => {
      const searchLower = searchText.toLowerCase();
      const fieldsToSearch = Object.keys(filters).filter(key => filters[key as keyof Filters]);

      return fieldsToSearch.some(field => {
        const value = doc[field as keyof typeof doc];
        return value && value.toString().toLowerCase().includes(searchLower);
      });
    });
  }, [activeTab, searchText, filters]);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#229dc9', '#1a7fa3']}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <MaterialCommunityIcons name="folder-multiple" size={32} color="#fff" />
            <ThemedText style={styles.title}>Documentos</ThemedText>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <MaterialCommunityIcons name="account-circle" size={32} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'FISQP' && styles.activeTab]}
          onPress={() => setActiveTab('FISQP')}
        >
          <ThemedText style={[styles.tabText, activeTab === 'FISQP' && styles.activeTabText]}>
            FISQP
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'TDS' && styles.activeTab]}
          onPress={() => setActiveTab('TDS')}
        >
          <ThemedText style={[styles.tabText, activeTab === 'TDS' && styles.activeTabText]}>
            TDS
          </ThemedText>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <ThemedView style={styles.contentContainer}>
          {/* Barra de busca */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar documentos..."
              value={searchText}
              onChangeText={setSearchText}
            />
            <TouchableOpacity 
              style={styles.filterButton}
              onPress={() => setShowFilters(!showFilters)}
            >
              <MaterialCommunityIcons 
                name="filter-variant" 
                size={24} 
                color="#229dc9" 
              />
            </TouchableOpacity>
          </View>

          {/* Filtros */}
          {showFilters && (
            <View style={styles.filtersContainer}>
              <ThemedText style={styles.filtersTitle}>Buscar em:</ThemedText>
              <View style={styles.filterOptions}>
                {Object.entries(filters).map(([key, value]) => (
                  <TouchableOpacity
                    key={key}
                    style={[styles.filterOption, value && styles.filterOptionActive]}
                    onPress={() => setFilters(prev => ({
                      ...prev,
                      [key]: !prev[key as keyof Filters]
                    }))}
                  >
                    <ThemedText style={[
                      styles.filterOptionText,
                      value && styles.filterOptionTextActive
                    ]}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          <ThemedView style={styles.table}>
            {filteredData.map((item) => (
              <ThemedView key={item.id} style={styles.tableRow}>
                <View style={styles.rowHeader}>
                  <MaterialCommunityIcons 
                    name="file-pdf-box"
                    size={24} 
                    color="#229dc9" 
                  />
                  <ThemedText style={styles.fileName}>{item.nome}</ThemedText>
                </View>

                <View style={styles.rowContent}>
                  <View style={styles.column}>
                    <View style={styles.cell}>
                      <ThemedText style={styles.label}>Tipo</ThemedText>
                      <ThemedText style={styles.value}>{item.tipo}</ThemedText>
                    </View>
                  </View>
                  <View style={styles.column}>
                    <View style={styles.cell}>
                      <ThemedText style={styles.label}>Tamanho</ThemedText>
                      <ThemedText style={styles.value}>{item.tamanho}</ThemedText>
                    </View>
                  </View>
                  <View style={styles.column}>
                    <View style={styles.cell}>
                      <ThemedText style={styles.label}>Data</ThemedText>
                      <ThemedText style={styles.value}>{item.data}</ThemedText>
                    </View>
                  </View>
                </View>

                <View style={styles.actionIcons}>
                  <TouchableOpacity>
                    <MaterialCommunityIcons name="download" size={20} color="#229dc9" />
                  </TouchableOpacity>
                </View>
              </ThemedView>
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
  fileName: {
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
    justifyContent: 'flex-end',
    gap: 20,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginTop: -20,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  activeTab: {
    backgroundColor: '#229dc9',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filtersContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filtersTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterOptionActive: {
    backgroundColor: '#229dc9',
    borderColor: '#229dc9',
  },
  filterOptionText: {
    fontSize: 14,
    color: '#666',
  },
  filterOptionTextActive: {
    color: '#fff',
  },
}); 