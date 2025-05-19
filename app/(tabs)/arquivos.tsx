import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, SafeAreaView, TextInput, ActivityIndicator, Linking, Alert, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { getAllFiles } from '../../backEnd/methods/ArquivosMethods';
import { Arquivos_Generico } from '../../backEnd/interfaces';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
// Adicione essa interface para tipar os filtros
interface Filters {
  nome: boolean;
  tipo: boolean;
  tamanho: boolean;
  data: boolean;
}

export default function ArquivosScreen() {
  const [activeTab, setActiveTab] = useState<string>('FDS');
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState('');
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
  const [overlayLoading, setOverlayLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalFiles, setTotalFiles] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Debounce search text updates
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchText]);

  // Function to fetch files from the API
  const fetchFiles = async () => {
    try {
      setLoading(true);
      // Show overlay loading only when loading first page or changing tab/search
      if (page === 1) {
        setOverlayLoading(true);
      }
      setError(null);
      const response = await getAllFiles(page, limit, debouncedSearchText, token || '');
      console.log({page, limit, search: debouncedSearchText, token});
      console.log(response);
      
      // Update files array based on page number
      if (page === 1) {
        // If it's the first page, replace the files array
        setFiles(response.data);
      } else {
        // If it's a subsequent page, append to the existing files array
        setFiles(prevFiles => [...prevFiles, ...response.data]);
      }
      
      setTotalFiles(response.total);
    } catch (err) {
      console.error('Error fetching files:', err);
      setError('Erro ao carregar os arquivos. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
      setOverlayLoading(false);
    }
  };

  // Fetch files when relevant params change
  useEffect(() => {
    fetchFiles();
  }, [page, limit, token, activeTab, debouncedSearchText]);
  
  // Reset to page 1 when search text changes
  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    }
  }, [debouncedSearchText, activeTab]);

  // Function to handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setPage(1);
    setFiles([]);
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
    const typeFilteredFiles = files.filter(file => 
      (file.type?.toUpperCase() === activeTab.toUpperCase()) || 
      (activeTab.toUpperCase() === 'FDS' && !file.type)
    );
    
    if (!debouncedSearchText) return typeFilteredFiles;

    return typeFilteredFiles.filter(doc => {
      const searchLower = debouncedSearchText.toLowerCase();
      
      // Check if the file name (arquivo) contains the search text
      if (doc.arquivo && doc.arquivo.toLowerCase().includes(searchLower)) {
        return true;
      }
      
      // Also check other fields based on active filters
      const fieldsToSearch = Object.keys(filters).filter(key => filters[key as keyof Filters]);

      return fieldsToSearch.some(field => {
        const value = doc[field as keyof typeof doc];
        return value && value.toString().toLowerCase().includes(searchLower);
      });
    });
  }, [files, debouncedSearchText, filters, activeTab]);

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
          style={[styles.tab, activeTab === 'FDS' && styles.activeTab]}
          onPress={() => handleTabChange('FDS')}
        >
          <ThemedText style={[styles.tabText, activeTab === 'FDS' && styles.activeTabText]}>
            FDS
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

      <ScrollView>
        <ThemedView style={styles.contentContainer}>
          {/* Barra de busca */}
          <View style={styles.searchContainer}>
            <MaterialCommunityIcons 
              name="magnify" 
              size={20} 
              color={loading && debouncedSearchText ? "#229dc9" : "#999"} 
              style={styles.searchIcon}
            />
            <TextInput
              style={[
                styles.searchInput,
                debouncedSearchText !== '' && styles.searchInputActive
              ]}
              placeholder="Buscar por nome de arquivo..."
              value={searchText}
              onChangeText={setSearchText}
            />
            {searchText !== '' && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => setSearchText('')}
              >
                <MaterialCommunityIcons name="close-circle" size={20} color="#999" />
              </TouchableOpacity>
            )}
            {loading && debouncedSearchText !== '' && (
              <ActivityIndicator 
                size="small" 
                color="#229dc9" 
                style={styles.searchLoading} 
              />
            )}
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

          {/* Loading indicator for initial load */}
          {loading && files.length === 0 && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#229dc9" />
              <ThemedText style={styles.loadingText}>Carregando arquivos...</ThemedText>
            </View>
          )}

          {/* Loading overlay */}
          {overlayLoading && files.length > 0 && (
            <View style={styles.loadingOverlay}>
              <View style={styles.loadingOverlayContent}>
                <ActivityIndicator size="large" color="#229dc9" />
                <ThemedText style={styles.loadingText}>Atualizando...</ThemedText>
              </View>
            </View>
          )}

          <ThemedView style={styles.table}>
            {filteredData?.length > 0 ? (
              filteredData.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.tableRow}
                  onPress={async () => {
                    try {
                      // Get the full URL with protocol
                      const fullUrl = `https://${item.linkftp}`;

                      // Get the file name from the URL and garantir extensão .pdf
                      let fileName = item.arquivo || fullUrl.split('/').pop() || 'downloaded_file.pdf';
                      if (!fileName.toLowerCase().endsWith('.pdf')) {
                        fileName = fileName.replace(/\.[^/.]+$/, '') + '.pdf';
                      }

                      // Definir caminho para downloads com extensão PDF garantida
                      const downloadDir = FileSystem.documentDirectory || FileSystem.cacheDirectory;
                      const fileUri = `${downloadDir}${fileName}`;

                      // Mostrar indicador de loading
                      Alert.alert(
                        "Download em andamento",
                        "Baixando o arquivo, por favor aguarde..."
                      );

                      // Download the file using the full URL with explicit PDF mime type
                      const downloadResult = await FileSystem.downloadAsync(
                        fullUrl,
                        fileUri,
                        {
                          headers: {
                            'Accept': 'application/pdf',
                            'Content-Type': 'application/pdf'
                          },
                          cache: false
                        }
                      );

                      if (downloadResult.status === 200) {
                        // Verificar se o arquivo existe e não está vazio
                        const fileInfo = await FileSystem.getInfoAsync(fileUri);
                        
                        if (!fileInfo.exists) {
                          throw new Error('Arquivo não encontrado após download');
                        }
                        
                        if (Platform.OS === 'ios') {
                          // No iOS, compartilhar o arquivo
                          if (await Sharing.isAvailableAsync()) {
                            await Sharing.shareAsync(fileUri, {
                              UTI: 'com.adobe.pdf',
                              mimeType: 'application/pdf'
                            });
                          } else {
                            // Tentar abrir diretamente se compartilhamento não estiver disponível
                            await Linking.openURL(fileUri);
                          }
                        } else {
                          // No Android, abrir o arquivo com app padrão de PDF
                          const contentUri = await FileSystem.getContentUriAsync(fileUri);
                          await Linking.openURL(contentUri);
                        }
                      } else {
                        Alert.alert(
                          "Erro no Download",
                          `Falha ao baixar o arquivo. Status: ${downloadResult.status}`,
                          [{ text: "Ok" }]
                        );
                      }
                    } catch (error) {
                      console.error('Error handling file:', error);
                      Alert.alert(
                        "Erro",
                        "Ocorreu um erro ao processar o arquivo. Certifique-se que o arquivo está disponível e é um PDF válido.",
                        [
                          { text: "Ok", style: "cancel" }
                        ]
                      );
                    }
                  }}
                >
                  <View style={styles.rowHeader}>
                    <MaterialCommunityIcons
                      name="file-pdf-box" // Consider making icon dynamic based on file type
                      size={24}
                      color="#229dc9"
                    />
                    <ThemedText style={styles.fileName}>{item.arquivo || 'Nome Indisponível'}</ThemedText>
                  </View>

                  <View style={styles.rowContent}>
                    <View style={styles.column}>
                      <View style={styles.cell}>
                        <ThemedText style={styles.label}>Tipo</ThemedText>
                        <ThemedText style={styles.value}>{item.type === 'FISPQ' ? 'FDS' : item.type}</ThemedText>
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

          {/* "Load More" Button Area */}
          {!loading && files.length < totalFiles && files.length > 0 && (
            <View style={styles.loadMoreContainer}>
              <TouchableOpacity
                style={styles.loadMoreButton}
                onPress={handleLoadMore}
                disabled={loading} // Disable button while loading new page
              >
                <ThemedText style={styles.loadMoreButtonText}>Carregar mais</ThemedText>
              </TouchableOpacity>
            </View>
          )}

          {/* Loading indicator shown when loading the next page */}
          {loading && page > 1 && (
             <View style={styles.loadMoreContainer}>
                <TouchableOpacity
                  style={[styles.loadMoreButton, styles.loadMoreButtonLoading]}
                  disabled={true}
                >
                  <View style={styles.loadMoreButtonContent}>
                    <ActivityIndicator size="small" color="#fff" style={styles.loadMoreButtonIcon} />
                    <ThemedText style={styles.loadMoreButtonText}>Carregando...</ThemedText>
                  </View>
                </TouchableOpacity>
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
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    paddingLeft: 40, // Space for search icon
    paddingRight: 40, // Space for the clear button
  },
  searchInputActive: {
    borderColor: '#229dc9',
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  clearButton: {
    position: 'absolute',
    right: 8,
    padding: 8,
    zIndex: 1,
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
  // Add styles for the new button (copied from estoque.tsx)
  loadMoreContainer: {
    marginTop: 24,
    marginBottom: 20,
    alignItems: 'center',
  },
  loadMoreButton: {
    backgroundColor: '#229dc9',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 150,
    height: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  loadMoreButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadMoreButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
  searchLoading: {
    position: 'absolute',
    right: 8,
    padding: 8,
    zIndex: 1,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  loadingOverlayContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loadMoreButtonLoading: {
    backgroundColor: '#1a7fa3',
  },
  loadMoreButtonIcon: {
    marginRight: 8,
  },
}); 