import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, SafeAreaView, Alert, Clipboard, TextInput, Modal, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { useRouter } from 'expo-router';
import ApiCaller from '../../backEnd/apiCaller';
import { useAuth } from '../context/AuthContext';
import { useAuthCheck } from "../hooks/useAuthCheck";

// Initialize ApiCaller
const apiCaller = new ApiCaller();

// Interface for product type
interface Product {
  codigo: string;
  descricao: string;
  un: string;
  moeda: string;
  venda: string;
  estoque: string;
  grupo: string;
}

// Interface for group type
interface Group {
  codgru: string;
  grupo: string;
}

// Atualize a interface de filtros
interface Filters {
  grupo: string;
  codigo: string;
  descricao: string;
}

export default function EstoqueScreen() {
  const router = useRouter();
  const { token, loading: authLoading } = useAuthCheck();
  const [products, setProducts] = useState<Product[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [showGrupoSelect, setShowGrupoSelect] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    grupo: '',
    codigo: '',
    descricao: ''
  });
  const [debouncedFilters, setDebouncedFilters] = useState<Filters>(filters);

  // Debounced filter effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 500);

    return () => clearTimeout(timer);
  }, [filters]);

  // Effect to fetch data when debounced filters change
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setIsUpdating(true);
    setProducts([]); // Reset products array before fetching with new filters
    fetchProducts(1, debouncedFilters);
  }, [debouncedFilters]);

  const fetchProducts = async (pageNumber: number, filterParams?: Filters) => {
    if (!token) {
      Alert.alert('Erro', 'Token de autenticação não encontrado.');
      return;
    }

    try {
      const filterObject = filterParams && (filterParams.codigo || filterParams.descricao || filterParams.grupo)
        ? {
            codproduto: filterParams.codigo,
            descricao: filterParams.descricao,
            codgru: filterParams.grupo
          }
        : {};

      const response = await apiCaller.productMethods.getProducts(
        filterObject,
        pageNumber,
        10,
        token
      );

      console.log(`fetchProducts page ${pageNumber} response length:`, response.products?.length);

      if (response.groups) {
        setGroups(response.groups);
      }

      const receivedProducts = response.products;
      const limit = 10; // Define limit for clarity

      if (Array.isArray(receivedProducts)) {
        if (pageNumber === 1) {
          setProducts(receivedProducts);
        } else {
          setProducts(prev => [...prev, ...receivedProducts]);
        }

        // Update hasMore based on the number of items received
        if (receivedProducts.length < limit) {
          setHasMore(false);
        } else {
          setHasMore(true); // Explicitly set to true if a full page was received
        }

      } else {
        // Handle cases where response.products is not an array (e.g., error or unexpected format)
        console.warn('Received non-array products:', receivedProducts);
        setHasMore(false);
        if (pageNumber === 1) {
          setProducts([]); // Clear products if page 1 response is invalid
        }
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      Alert.alert('Erro', 'Não foi possível carregar os produtos.');
      setHasMore(false);
    } finally {
      setInitialLoading(false);
      setIsUpdating(false);
    }
  };

  // Handle filter changes
  const handleFilterChange = (field: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  // Handle filter clear
  const handleClearFilters = () => {
    setFilters({ grupo: '', codigo: '', descricao: '' });
    setShowGrupoSelect(false);
  };

  const handleLoadMore = () => {
    console.log('handleLoadMore called. isUpdating:', isUpdating, 'hasMore:', hasMore);
    if (!isUpdating && hasMore) {
      setIsUpdating(true);
      const nextPage = page + 1;
      setPage(nextPage);
      console.log('handleLoadMore: Fetching page', nextPage);
      fetchProducts(nextPage, debouncedFilters);
    }
  };

  const handleProductPress = (product: any) => {
    router.push({
      pathname: "/produto-detalhes",
      params: { 
        codprod: product.codprod,
      },
    });
  };

  if (initialLoading) {
    return <ActivityIndicator size="large" color="#229dc9" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#229dc9", "#1a7fa3"]}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <MaterialCommunityIcons name="cube" size={32} color="#fff" />
            <ThemedText style={styles.title}>Estoque de Produtos</ThemedText>
          </View>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => router.push("/(tabs)/perfil")}
          >
            <MaterialCommunityIcons
              name="account-circle"
              size={32}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollContainer}
      >
        <ThemedView style={styles.contentContainer}>
          {/* Container para os botões */}
          <View style={styles.headerButtons}>
            <TouchableOpacity 
              style={styles.filterButton}
              onPress={() => setShowFilters(!showFilters)}
            >
              <MaterialCommunityIcons name="filter-variant" size={24} color="#229dc9" />
              <ThemedText style={styles.filterButtonText}>
                Filtrar {isUpdating && '(Atualizando...)'}
              </ThemedText>
            </TouchableOpacity>
          </View>

          {/* Área de Filtros */}
          {showFilters && (
            <View style={styles.filterArea}>
              {/* Select de Grupos */}
              <View style={styles.filterField}>
                <ThemedText style={styles.filterLabel}>Grupo</ThemedText>
                <TouchableOpacity
                  style={styles.select}
                  onPress={() => setShowGrupoSelect(true)}
                >
                  <ThemedText style={styles.selectText}>
                    {filters.grupo 
                      ? groups.find(g => g.codgru === filters.grupo)?.grupo 
                      : 'Selecione um grupo'}
                  </ThemedText>
                  <MaterialCommunityIcons 
                    name="chevron-down"
                    size={20} 
                    color="#666" 
                  />
                </TouchableOpacity>
              </View>

              <Modal
                visible={showGrupoSelect}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowGrupoSelect(false)}
              >
                <TouchableWithoutFeedback onPress={() => setShowGrupoSelect(false)}>
                  <View style={styles.modalOverlay}>
                    <TouchableWithoutFeedback>
                      <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                          <ThemedText style={styles.modalTitle}>Selecione um grupo</ThemedText>
                          <TouchableOpacity onPress={() => setShowGrupoSelect(false)}>
                            <MaterialCommunityIcons name="close" size={24} color="#666" />
                          </TouchableOpacity>
                        </View>
                        <ScrollView style={styles.modalScroll}>
                          <TouchableOpacity
                            style={styles.modalItem}
                            onPress={() => {
                              handleFilterChange('grupo', '');
                              setShowGrupoSelect(false);
                            }}
                          >
                            <ThemedText style={styles.modalItemText}>Todos os grupos</ThemedText>
                          </TouchableOpacity>
                          {groups.map((grupo) => (
                            <TouchableOpacity
                              key={grupo.codgru}
                              style={styles.modalItem}
                              onPress={() => {
                                handleFilterChange('grupo', grupo.codgru);
                                setShowGrupoSelect(false);
                              }}
                            >
                              <ThemedText style={styles.modalItemText}>{grupo.grupo}</ThemedText>
                            </TouchableOpacity>
                          ))}
                        </ScrollView>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>

              {/* Filtro por Código */}
              <View style={styles.filterField}>
                <ThemedText style={styles.filterLabel}>Código</ThemedText>
                <TextInput
                  style={styles.input}
                  value={filters.codigo}
                  onChangeText={(text) => handleFilterChange('codigo', text)}
                  placeholder="Digite o código"
                />
              </View>

              {/* Filtro por Descrição */}
              <View style={styles.filterField}>
                <ThemedText style={styles.filterLabel}>Descrição</ThemedText>
                <TextInput
                  style={styles.input}
                  value={filters.descricao}
                  onChangeText={(text) => handleFilterChange('descricao', text)}
                  placeholder="Digite a descrição"
                />
              </View>

              {/* Botões de Ação */}
              <View style={styles.filterActions}>
                <TouchableOpacity 
                  style={styles.clearButton}
                  onPress={handleClearFilters}
                >
                  <ThemedText style={styles.clearButtonText}>Limpar</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <ThemedView style={[styles.table, isUpdating && styles.updatingTable]}>
            {products.map((item: any) => (
              <TouchableOpacity
                key={item.codigo}
                onPress={() => handleProductPress(item)}
              >
                <ThemedView style={styles.tableRow}>
                  <View style={styles.rowHeader}>
                    <ThemedText style={styles.codigo}>
                      {item.codigo}
                    </ThemedText>
                    <ThemedText style={styles.descricao}>
                      {item.descricao}
                    </ThemedText>
                  </View>

                  <View style={styles.rowContent}>
                    <View style={styles.column}>
                      <View style={styles.cell}>
                        <ThemedText style={styles.label}>Un.</ThemedText>
                        <ThemedText style={styles.value}>
                          {item.un}
                        </ThemedText>
                      </View>
                      <View style={styles.cell}>
                        <ThemedText style={styles.label}>Moeda</ThemedText>
                        <ThemedText style={styles.value}>
                          {item.moeda}
                        </ThemedText>
                      </View>
                    </View>
                    <View style={styles.column}>
                      <View style={styles.cell}>
                        <ThemedText style={styles.label}>Venda</ThemedText>
                        <ThemedText style={styles.value}>
                          {item.venda}
                        </ThemedText>
                      </View>
                      <View style={styles.cell}>
                        <ThemedText style={styles.label}>Estoque</ThemedText>
                        <ThemedText style={styles.value}>
                          {item.estoque}
                        </ThemedText>
                      </View>
                    </View>
                  </View>
                </ThemedView>
              </TouchableOpacity>
            ))}
          </ThemedView>

          {/* "Load More" Button Area */}
          {hasMore && (
            <View style={styles.loadMoreContainer}>
              <TouchableOpacity
                style={styles.loadMoreButton}
                onPress={handleLoadMore}
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <ThemedText style={styles.loadMoreButtonText}>Carregar mais</ThemedText>
                )}
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
    backgroundColor: "#f5f5f5",
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  profileButton: {
    padding: 8,
  },
  scrollContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  contentContainer: {
    padding: 20,
  },
  headerButtons: {
    marginBottom: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterButtonText: {
    fontSize: 16,
    color: '#229dc9',
    marginLeft: 8,
  },
  table: {
    gap: 16,
  },
  tableRow: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rowHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  codigo: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#229dc9",
  },
  descricao: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
    marginLeft: 8,
  },
  rowContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  column: {
    flex: 1,
  },
  cell: {
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    color: "#666",
  },
  value: {
    fontSize: 14,
    color: "#333",
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  redText: {
    color: "#FF3B30",
  },
  greenText: {
    color: "#34C759",
  },
  blueText: {
    color: "#007AFF",
  },
  filterArea: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    gap: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  filterField: {
    gap: 8,
    position: 'relative',
    zIndex: 1000,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  select: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1000,
  },
  selectText: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    fontSize: 16,
  },
  filterActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  clearButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#666',
    fontSize: 16,
  },
  updatingTable: {
    opacity: 0.7,
  },
  loadMoreContainer: {
    marginTop: 20,
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
  },
  loadMoreButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  } as const,
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '100%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  } as const,
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  } as const,
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  } as const,
  modalScroll: {
    maxHeight: 300,
  } as const,
  modalItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  } as const,
  modalItemText: {
    fontSize: 16,
    color: '#333',
  } as const,
});
