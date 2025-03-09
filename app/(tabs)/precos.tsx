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
  TextStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemedText } from "../components/ThemedText";
import { ThemedView } from "../components/ThemedView";
import { useRouter } from "expo-router";
import ApiCaller from "../../backEnd/apiCaller";
import { useAuth } from "../context/AuthContext";
import { ProdutosApp_PrecosRegiao } from "../../backEnd/interfaces";
import { Image } from "react-native";
// import filterIcon from "@/assets/images/filter.png";

// Initialize ApiCaller
const apiCaller = new ApiCaller();

const regioesICMS = [
  { uf: "SP", aliquota: "18%" },
  { uf: "MG, PR, RS, RJ, SC", aliquota: "12%" },
  {
    uf: "AC, AL, AM, AP, BA, CE, DF, GO, MA, MT, MS, PA, PB, PE, PI, RN, RO, RR, SE, TO",
    aliquota: "7%",
  },
  { uf: "Importados", aliquota: "4%" },
];

const precosData = [
  {
    codigo: "PA00001",
    descricao: "IRGASURF SR 100",
    st: "300,00",
    ipi: "3,25",
    moeda: "US$",
    precoCompra: "0,00",
    mc1_18: "0,00",
    mc2_18: "0,00",
    mc3_18: "0,00",
    mc1_12: "-",
    mc2_12: "-",
    mc3_12: "-",
    mc1_7: "-",
    mc2_7: "-",
    mc3_7: "-",
    mc1_4: "-",
    mc2_4: "-",
    mc3_4: "-",
  },
  {
    codigo: "PA00002",
    descricao: "IRGASURF HL 560",
    st: "450,00",
    ipi: "4,50",
    moeda: "US$",
    precoCompra: "2,50",
    mc1_18: "3,00",
    mc2_18: "3,50",
    mc3_18: "4,00",
    mc1_12: "2,80",
    mc2_12: "3,30",
    mc3_12: "3,80",
    mc1_7: "2,60",
    mc2_7: "3,10",
    mc3_7: "3,60",
    mc1_4: "2,40",
    mc2_4: "2,90",
    mc3_4: "3,40",
  },
  {
    codigo: "PA00003",
    descricao: "POLÍMERO XR-750",
    st: "275,50",
    ipi: "2,75",
    moeda: "R$",
    precoCompra: "1,80",
    mc1_18: "2,20",
    mc2_18: "2,70",
    mc3_18: "3,20",
    mc1_12: "2,00",
    mc2_12: "2,50",
    mc3_12: "3,00",
    mc1_7: "-",
    mc2_7: "-",
    mc3_7: "-",
    mc1_4: "-",
    mc2_4: "-",
    mc3_4: "-",
  },
  {
    codigo: "PA00004",
    descricao: "ADITIVO KP-200",
    st: "180,00",
    ipi: "3,00",
    moeda: "US$",
    precoCompra: "1,20",
    mc1_18: "1,50",
    mc2_18: "2,00",
    mc3_18: "2,50",
    mc1_12: "1,30",
    mc2_12: "1,80",
    mc3_12: "2,30",
    mc1_7: "1,10",
    mc2_7: "1,60",
    mc3_7: "2,10",
    mc1_4: "1,00",
    mc2_4: "1,50",
    mc3_4: "2,00",
  },
];

// Define the Filters interface
interface Filters {
  codigo: boolean;
  descricao: boolean;
  moeda: boolean;
  ipi: boolean;
}

// Define the handlePricePress function
const handlePricePress = (item: ProdutosApp_PrecosRegiao) => {
  // Implement the logic for handling the price press
  // For example, navigate to a details page or show an alert
  Alert.alert('Price Details', `Description: ${item.descricao}\nPrice: ${item.precompra}`);
};

export default function PrecosScreen() {
  const router = useRouter();
  const { token } = useAuth();
  const [prices, setPrices] = useState<ProdutosApp_PrecosRegiao[]>([]);
  const [searchText, setSearchText] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    codigo: true,
    descricao: true,
    moeda: true,
    ipi: true,
  });

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    if (!token) {
      router.replace("/login");
      return;
    }

    try {
      setLoading(true);
      const response =
        await apiCaller.regionalPricesMethods.getAllRegionalPrices(
          1,
          100,
          token
        );
      setPrices(response);
    } catch (error) {
      console.error("Error fetching prices:", error);
      Alert.alert("Erro", "Não foi possível carregar os preços.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#229dc9', '#1a7fa3']}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <MaterialCommunityIcons name="currency-usd" size={32} color="#fff" />
            <ThemedText style={styles.title}>Preços Regionais</ThemedText>
          </View>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => router.push('/(tabs)/perfil')}
          >
            <MaterialCommunityIcons name="account-circle" size={32} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
  
      <ScrollView style={styles.scrollContainer}>
        <ThemedView style={styles.contentContainer}>
          {/* Barra de busca */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar preços..."
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
                    <ThemedText style={StyleSheet.flatten<TextStyle>([
                      styles.filterOptionText,
                      value && styles.filterOptionTextActive
                    ])}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
  
          {loading ? (
            <ActivityIndicator size="large" color="#229dc9" />
          ) : (
            <ThemedView style={styles.table}>
              {prices.map((item) => (
                <TouchableOpacity 
                  key={item.id}
                  onPress={() => handlePricePress(item)}
                >
                  <ThemedView style={styles.tableRow}>
                    <View style={styles.rowHeader}>
                      <ThemedText style={styles.codigo}>{item.codprod}</ThemedText>
                      <ThemedText style={styles.descricao}>{item.descricao}</ThemedText>
                    </View>
  
                    <View style={styles.rowContent}>
                      <View style={styles.column}>
                        <View style={styles.cell}>
                          <ThemedText style={styles.label}>Moeda</ThemedText>
                          <ThemedText style={styles.value}>{item.moeda}</ThemedText>
                        </View>
                        <View style={styles.cell}>
                          <ThemedText style={styles.label}>IPI</ThemedText>
                          <ThemedText style={styles.value}>{item.ipi}</ThemedText>
                        </View>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  icmsContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icmsRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  icmsAliquota: {
    width: 50,
    fontSize: 14,
    fontWeight: "500",
    color: "#FF0000",
  },
  icmsUF: {
    flex: 1,
    fontSize: 14,
    color: "#666",
  },
  filterContainer: {
    padding: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
    marginBottom: 20,
  },
  filterText: {
    fontSize: 16,
    fontWeight: "600",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 0,
    alignContent: "center",
    color: "#000",
  },
  filterSubtext: {
    fontSize: 12,
    color: "#666",
  },
  iconSmall: {
    width: 20,
    height: 20,
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
  actionIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  mcContainer: {
    marginTop: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 12,
  },
  mcSection: {
    marginBottom: 12,
  },
  mcTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#229dc9",
    marginBottom: 4,
  },
  mcRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 8,
  },
  mcLabel: {
    fontSize: 12,
    color: "#666",
  },
  mcValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    marginRight: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginRight: 10,
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#229dc9',
    borderRadius: 8,
  },
  filtersContainer: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  filtersTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterOption: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    marginBottom: 5,
    marginRight: 5,
  },
  filterOptionActive: {
    backgroundColor: '#229dc9',
  },
  filterOptionText: {
    fontSize: 14,
    color: '#333',
  },
  filterOptionTextActive: {
    color: '#fff',
  },
});
