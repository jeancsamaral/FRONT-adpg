import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, SafeAreaView, Alert, Clipboard, TextInput, Modal, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { useRouter } from 'expo-router';
import ApiCaller from '../../backEnd/apiCaller';
import { useAuth } from '../context/AuthContext';

// Initialize ApiCaller
const apiCaller = new ApiCaller();

// Adicione os dados de exemplo para grupos
const gruposData = [
  { id: '1', nome: 'Aditivos' },
  { id: '2', nome: 'Polímeros' },
  { id: '3', nome: 'Solventes' },
  { id: '4', nome: 'Catalisadores' },
  { id: '5', nome: 'Resinas' }
];

// Atualize a interface de filtros
interface Filters {
  grupo: string;
  codigo: string;
  descricao: string;
}

export default function EstoqueScreen() {
  const router = useRouter();
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showGrupoSelect, setShowGrupoSelect] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    grupo: '',
    codigo: '',
    descricao: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    if (!token) {
      Alert.alert('Erro', 'Token de autenticação não encontrado.');
      return;
    }

    try {
      setLoading(true);
      const response = await apiCaller.productMethods.getProducts({}, 1, 100, token);
      setProducts(response);
    } catch (error) {
      console.error('Error fetching products:', error);
      Alert.alert('Erro', 'Não foi possível carregar os produtos.');
    } finally {
      setLoading(false);
    }
  };

  // Função para filtrar os produtos
  const filteredProducts = React.useMemo(() => {
    let filtered = products;

    if (filters.grupo) {
      filtered = filtered.filter((product: any) => product.grupo === filters.grupo);
    }
    if (filters.codigo) {
      filtered = filtered.filter((product: any) => 
        product.codigo.toLowerCase().includes(filters.codigo.toLowerCase())
      );
    }
    if (filters.descricao) {
      filtered = filtered.filter((product: any) => 
        product.descricao.toLowerCase().includes(filters.descricao.toLowerCase())
      );
    }

    return filtered;
  }, [products, filters]);

  const handleFilter = () => {
    // Aqui você pode adicionar lógica adicional antes de aplicar os filtros
    // Como validações ou chamadas à API
  };

  const handleProductPress = (product: any) => {
    router.push({
      pathname: "/produto-detalhes",
      params: { 
        id: product.codigo,
        ...product 
      },
    });
  };

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

      <ScrollView style={styles.scrollContainer}>
        <ThemedView style={styles.contentContainer}>
          {/* Container para os botões */}
          <View style={styles.headerButtons}>
            <TouchableOpacity 
              style={styles.filterButton}
              onPress={() => setShowFilters(!showFilters)}
            >
              <MaterialCommunityIcons name="filter-variant" size={24} color="#229dc9" />
              <ThemedText style={styles.filterButtonText}>Filtrar</ThemedText>
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
                  onPress={() => setShowGrupoSelect(!showGrupoSelect)}
                >
                  <ThemedText style={styles.selectText}>
                    {filters.grupo 
                      ? gruposData.find(g => g.id === filters.grupo)?.nome 
                      : 'Selecione um grupo'}
                  </ThemedText>
                  <MaterialCommunityIcons 
                    name={showGrupoSelect ? "chevron-up" : "chevron-down"} 
                    size={20} 
                    color="#666" 
                  />
                </TouchableOpacity>
              </View>

              {/* Filtro por Código */}
              <View style={styles.filterField}>
                <ThemedText style={styles.filterLabel}>Código</ThemedText>
                <TextInput
                  style={styles.input}
                  value={filters.codigo}
                  onChangeText={(text) => setFilters(prev => ({ ...prev, codigo: text }))}
                  placeholder="Digite o código"
                />
              </View>

              {/* Filtro por Descrição */}
              <View style={styles.filterField}>
                <ThemedText style={styles.filterLabel}>Descrição</ThemedText>
                <TextInput
                  style={styles.input}
                  value={filters.descricao}
                  onChangeText={(text) => setFilters(prev => ({ ...prev, descricao: text }))}
                  placeholder="Digite a descrição"
                />
              </View>

              {/* Botões de Ação */}
              <View style={styles.filterActions}>
                <TouchableOpacity 
                  style={styles.clearButton}
                  onPress={() => {
                    setFilters({ grupo: '', codigo: '', descricao: '' });
                    setShowGrupoSelect(false);
                  }}
                >
                  <ThemedText style={styles.clearButtonText}>Limpar</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.searchButton}
                  onPress={handleFilter}
                >
                  <MaterialCommunityIcons name="magnify" size={20} color="#fff" />
                  <ThemedText style={styles.searchButtonText}>Buscar</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {loading ? (
            <ActivityIndicator size="large" color="#229dc9" />
          ) : (
            <ThemedView style={styles.table}>
              {filteredProducts.map((item: any) => (
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
                  <View style={styles.statusContainer}>
                    <View style={styles.cell}>
                      <ThemedText style={[styles.label, styles.redText]}>Reservado</ThemedText>
                      <ThemedText style={styles.redText}>{item.reservado}</ThemedText>
                    </View>
                    <View style={styles.cell}>
                      <ThemedText style={[styles.label, styles.greenText]}>Comprado</ThemedText>
                      <ThemedText style={styles.greenText}>{item.comprado}</ThemedText>
                    </View>
                    <View style={styles.cell}>
                      <ThemedText style={[styles.label, styles.blueText]}>Disponível</ThemedText>
                      <ThemedText style={styles.blueText}>{item.disponivel}</ThemedText>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ThemedView>
          )}
        </ThemedView>
      </ScrollView>

      <Modal
        visible={showGrupoSelect}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowGrupoSelect(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowGrupoSelect(false)}
        >
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
                  setFilters(prev => ({ ...prev, grupo: '' }));
                  setShowGrupoSelect(false);
                }}
              >
                <ThemedText style={styles.modalItemText}>Todos os grupos</ThemedText>
              </TouchableOpacity>
              {gruposData.map((grupo) => (
                <TouchableOpacity
                  key={grupo.id}
                  style={styles.modalItem}
                  onPress={() => {
                    setFilters(prev => ({ ...prev, grupo: grupo.id }));
                    setShowGrupoSelect(false);
                  }}
                >
                  <ThemedText style={styles.modalItemText}>{grupo.nome}</ThemedText>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
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
  searchButton: {
    flex: 1,
    backgroundColor: '#229dc9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
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
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalScroll: {
    maxHeight: 300,
  },
  modalItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
});
