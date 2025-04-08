import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, SafeAreaView, TextInput, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { getAllFiles } from '../../backEnd/methods/ArquivosMethods';
import { Arquivos_Generico } from '../../backEnd/interfaces';
import { useAuth } from '../context/AuthContext';
// Adicione essa interface para tipar os filtros
interface Filters {
  nome: boolean;
  tipo: boolean;
  tamanho: boolean;
  data: boolean;
}

export default function ArquivosScreen() {
  const [activeTab, setActiveTab] = useState<'FISPQ' | 'TDS'>('FISPQ');
  const [searchText, setSearchText] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    nome: true,
    tipo: true,
    tamanho: true,
    data: true,
  });
  const { token } = useAuth();
  // New states for API integration
  const [files, setFiles] = useState<Arquivos_Generico[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalFiles, setTotalFiles] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch files from the API
  const fetchFiles = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllFiles(page, limit, token || '');
      console.log(response);
      setFiles(response.data);
      setTotalFiles(response.total);
    } catch (err) {
      console.error('Error fetching files:', err);
      setError('Erro ao carregar os arquivos. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch files when component mounts or when page/limit changes
  useEffect(() => {
    fetchFiles();
  }, [page, limit]);

  // Function to handle tab change
  const handleTabChange = (tab: 'FISPQ' | 'TDS') => {
    setActiveTab(tab);
    setPage(1); // Reset to first page when changing tabs
  };

  // Function to handle load more
  const handleLoadMore = () => {
    if (files.length < totalFiles) {
      setPage(prevPage => prevPage + 1);
    }
  };

  // Função para filtrar os documentos baseado na busca e filtros
  const filteredData = React.useMemo(() => {
    // First filter by file type based on active tab
    const typeFilteredFiles = files.filter(file => file.type === activeTab);
    
    if (!searchText) return typeFilteredFiles;

    return typeFilteredFiles.filter(doc => {
      const searchLower = searchText.toLowerCase();
      const fieldsToSearch = Object.keys(filters).filter(key => filters[key as keyof Filters]);

      return fieldsToSearch.some(field => {
        const value = doc[field as keyof typeof doc];
        return value && value.toString().toLowerCase().includes(searchLower);
      });
    });
  }, [files, searchText, filters, activeTab]);

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
          style={[styles.tab, activeTab === 'FISPQ' && styles.activeTab]}
          onPress={() => handleTabChange('FISPQ')}
        >
          <ThemedText style={[styles.tabText, activeTab === 'FISPQ' && styles.activeTabText]}>
            FISPQ
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'TDS' && styles.activeTab]}
          onPress={() => handleTabChange('TDS')}
        >
          <ThemedText style={[styles.tabText, activeTab === 'TDS' && styles.activeTabText]}>
            TDS
          </ThemedText>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        onScroll={({ nativeEvent }) => {
          const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
          const paddingToBottom = 20;
          const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
          
          if (isCloseToBottom && !loading && files?.length < totalFiles) {
            handleLoadMore();
          }
        }}
        scrollEventThrottle={400}
      >
        <ThemedView style={styles.contentContainer}>
          {/* Barra de busca */}
          <View style={styles.searchContainer}>
            {/* <TextInput
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
            </TouchableOpacity> */}
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

          {/* Error message */}
          {error && (
            <View style={styles.errorContainer}>
              <ThemedText style={styles.errorText}>{error}</ThemedText>
              <TouchableOpacity 
                style={styles.retryButton}
                onPress={fetchFiles}
              >
                <ThemedText style={styles.retryButtonText}>Tentar Novamente</ThemedText>
              </TouchableOpacity>
            </View>
          )}

          {/* Loading indicator */}
          {loading && files?.length === 0 && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#229dc9" />
              <ThemedText style={styles.loadingText}>Carregando arquivos...</ThemedText>
            </View>
          )}

          <ThemedView style={styles.table}>
            {filteredData?.length > 0 ? (
              filteredData.map((item) => (
                <TouchableOpacity 
                  key={item.id} 
                  style={styles.tableRow}
                  onPress={() => {
                    // Ensure we're using the complete URL
                    const fullUrl = item.linkftp.startsWith('http') 
                      ? item.linkftp 
                      : `https://${item.linkftp}`;
                    window.open(fullUrl, '_blank');
                  }}
                >
                  <View style={styles.rowHeader}>
                    <MaterialCommunityIcons 
                      name="file-pdf-box"
                      size={24} 
                      color="#229dc9" 
                    />
                    <ThemedText style={styles.fileName}>{item.arquivo}</ThemedText>
                  </View>

                  <View style={styles.rowContent}>
                    <View style={styles.column}>
                      <View style={styles.cell}>
                        <ThemedText style={styles.label}>Tipo</ThemedText>
                        <ThemedText style={styles.value}>{item.type}</ThemedText>
                      </View>
                    </View>
                    <View style={styles.column}>
                      <View style={styles.cell}>
                        <ThemedText style={styles.label}>Data</ThemedText>
                        <ThemedText style={styles.value}>
                          {new Date(item.dtaltera).toLocaleDateString('pt-BR')}
                        </ThemedText>
                      </View>
                    </View>
                  </View>

                  <View style={styles.actionIcons}>
                    <MaterialCommunityIcons name="download" size={20} color="#229dc9" />
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              !loading && (
                <View style={styles.emptyContainer}>
                  <MaterialCommunityIcons name="file-search" size={48} color="#ccc" />
                  <ThemedText style={styles.emptyText}>
                    Nenhum documento encontrado
                  </ThemedText>
                </View>
              )
            )}
          </ThemedView>

          {/* Loading more indicator */}
          {loading && files?.length > 0 && (
            <View style={styles.loadingMoreContainer}>
              <ActivityIndicator size="small" color="#229dc9" />
              <ThemedText style={styles.loadingMoreText}>Carregando mais...</ThemedText>
            </View>
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
  // New styles for API integration
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  loadingMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    gap: 10,
  },
  loadingMoreText: {
    fontSize: 14,
    color: '#666',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  errorText: {
    color: '#d32f2f',
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: '#d32f2f',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
}); 