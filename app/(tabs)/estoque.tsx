import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  SafeAreaView,
  Alert,
  Clipboard,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemedText } from "../components/ThemedText";
import { ThemedView } from "../components/ThemedView";
import { useRouter } from "expo-router";
import ApiCaller from "../../backEnd/apiCaller";
import { useAuth } from "../context/AuthContext";
import { ProdutosApp } from "../../backEnd/interfaces";

// Initialize ApiCaller
const apiCaller = new ApiCaller();

// Dados de exemplo
const productData = [
  {
    codigo: "PA00001",
    descricao: "IRGASURF SR 100",
    un: "KG",
    moeda: "US$",
    venda: "0.00",
    estoque: "0.00",
    reservado: "0.00",
    comprado: "0.00",
    disponivel: "0.00",
  },
  {
    codigo: "PA00002",
    descricao: "IRGASURF HL 560",
    un: "KG",
    moeda: "US$",
    venda: "0.00",
    estoque: "0.00",
    reservado: "0.00",
    comprado: "0.00",
    disponivel: "0.00",
  },
];

// Adicione essa interface para tipar os filtros
interface Filters {
  codigo: boolean;
  descricao: boolean;
  un: boolean;
  moeda: boolean;
  venda: boolean;
  estoque: boolean;
}

export default function EstoqueScreen() {
  const router = useRouter();
  const { token } = useAuth();
  const [products, setProducts] = useState<ProdutosApp[]>([]);
  const [searchText, setSearchText] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    codigo: true,
    descricao: true,
    un: true,
    moeda: true,
    venda: true,
    estoque: true,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    if (!token) {
      router.replace("/login");
      return;
    }

    try {
      setLoading(true);
      const response = await apiCaller.productMethods.getProducts(
        {},
        1,
        100,
        token
      );
      setProducts(response);
    } catch (error) {
      console.error("Error fetching products:", error);
      Alert.alert("Erro", "Não foi possível carregar os produtos.");
    } finally {
      setLoading(false);
    }
  };

  // Função para filtrar os produtos baseado na busca e filtros
  const filteredProducts = React.useMemo(() => {
    if (!searchText) return products;

    return products.filter((product) => {
      const searchLower = searchText.toLowerCase();
      const fieldsToSearch = Object.keys(filters).filter(
        (key) => filters[key as keyof Filters]
      );

      return fieldsToSearch.some((field) => {
        const value = product[field as keyof typeof product];
        return value && value.toString().toLowerCase().includes(searchLower);
      });
    });
  }, [products, searchText, filters]);

  const handleProductPress = (product: any) => {
    router.push({
      pathname: "/produto-detalhes",
      params: product,
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
          {/* Barra de busca */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar produtos..."
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
                    style={[
                      styles.filterOption,
                      value && styles.filterOptionActive,
                    ]}
                    onPress={() =>
                      setFilters((prev) => ({
                        ...prev,
                        [key]: !prev[key as keyof Filters],
                      }))
                    }
                  >
                    <ThemedText
                      style={[
                        styles.filterOptionText,
                        value && styles.filterOptionTextActive,
                      ]}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          <TouchableOpacity
            style={styles.createButton}
            onPress={() => router.push("/produto-form")}
          >
            <MaterialCommunityIcons name="plus-circle" size={24} color="#fff" />
            <ThemedText style={styles.buttonText}>Novo Produto</ThemedText>
          </TouchableOpacity>

          {loading ? (
            <ActivityIndicator size="large" color="#229dc9" />
          ) : (
            <ThemedView style={styles.table}>
              {filteredProducts.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleProductPress(item)}
                >
                  <ThemedView style={styles.tableRow}>
                    <View style={styles.rowHeader}>
                      <ThemedText style={styles.codigo}>
                        {item.codprod}
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
                            {item.unidadeDePeso}
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
                            {item.preco}
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

                    <View style={styles.statusContainer}>
                      <View style={styles.cell}>
                        <ThemedText style={[styles.label, styles.redText]}>
                          Reservado
                        </ThemedText>
                        <ThemedText style={styles.redText}>
                          {item.reservado}
                        </ThemedText>
                      </View>
                      <View style={styles.cell}>
                        <ThemedText style={[styles.label, styles.greenText]}>
                          Comprado
                        </ThemedText>
                        <ThemedText style={styles.greenText}>
                          {item.comprado}
                        </ThemedText>
                      </View>
                      <View style={styles.cell}>
                        <ThemedText style={[styles.label, styles.blueText]}>
                          Disponível
                        </ThemedText>
                        <ThemedText style={styles.blueText}>
                          {item.disponivel}
                        </ThemedText>
                      </View>
                    </View>
                  </ThemedView>
                </TouchableOpacity>
              ))}
            </ThemedView>
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
  createButton: {
    backgroundColor: "#229dc9",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
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
  actionIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  filterButton: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  filtersContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  filtersTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  filterOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  filterOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  filterOptionActive: {
    backgroundColor: "#229dc9",
    borderColor: "#229dc9",
  },
  filterOptionText: {
    fontSize: 14,
    color: "#666",
  },
  filterOptionTextActive: {
    color: "#fff",
  },
});
