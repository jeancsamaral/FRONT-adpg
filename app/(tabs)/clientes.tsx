import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemedText } from "../components/ThemedText";
import { ThemedView } from "../components/ThemedView";
import { useRouter } from "expo-router";
import { ClientesApp } from "../../backEnd/interfaces";
import ApiCaller from "../../backEnd/apiCaller";
import { useAuthCheck } from "../hooks/useAuthCheck";

const apiCaller = new ApiCaller();

// Sample data for fallback
const clientData: ClientesApp[] = [
  {
    id: 1,
    codcli: 2,
    razao: "MEYERMAN BRASIL IND COM LTDA",
    fantasia: "MEYERMAN",
    cidade: "SAO BERNARDO DO CAMPO",
    estado: "SP",
    fone: "11 4178-7444",
    contato: "-",
    email: "meyerman@meyerman.com.br",
    pessoa: "J",
    cnpj_cpf: "12.345.678/0001-90",
    ie_rg: "123.456.789.000",
    endereco: "Rua Example, 123",
    bairro: "Centro",
    cep: "12345-678",
    pais: "Brasil",
    inativo: "N",
    excluido: "N",
    registro: 1,
    abertura: new Date(),
    clidesde: new Date(),
    transporta: "",
    icms: 0,
    itens: [],
    memo: undefined,
    notas: [],
    recebidosApp: [],
    receberApp: [],
  },
  {
    id: 2,
    codcli: 3,
    razao: "INDUSTRIA QUIMICA LTDA",
    fantasia: "QUIMICA",
    cidade: "GUARULHOS",
    estado: "SP",
    fone: "11 2222-3333",
    contato: "João Silva",
    email: "contato@quimica.com.br",
    pessoa: "J",
    cnpj_cpf: "23.456.789/0001-01",
    ie_rg: "234.567.890.001",
    endereco: "Av Industrial, 456",
    bairro: "Distrito Industrial",
    cep: "07123-456",
    pais: "Brasil",
    inativo: "N",
    excluido: "N",
    registro: 2,
    abertura: new Date(),
    clidesde: new Date(),
    transporta: "",
    icms: 0,
    itens: [],
    memo: undefined,
    notas: [],
    recebidosApp: [],
    receberApp: [],
  },
];

// Interface for filters
// interface Filters {
//   codigo: boolean;
//   razaoSocial: boolean;
//   cidade: boolean;
//   uf: boolean;
//   telefone: boolean;
//   email: boolean;
// }

export default function ClientesScreen() {
  const router = useRouter();
  const { token, loading: authLoading } = useAuthCheck();
  const [clients, setClients] = useState<ClientesApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  // const [showFilters, setShowFilters] = useState(false);
  // const [filters, setFilters] = useState<Filters>({
  //   codigo: true,
  //   razaoSocial: true,
  //   cidade: true,
  //   uf: true,
  //   telefone: true,
  //   email: true,
  // });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 20;

  // Add debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);

  // Effect to fetch data when debounced search changes
  useEffect(() => {
    if (token) {
      setPage(1);
      setHasMore(true);
      fetchClients();
    }
  }, [debouncedSearchText, token]);

  // Effect to fetch data when page changes
  useEffect(() => {
    if (page > 1 && token) {
      fetchClients();
    }
  }, [page, token]);

  const fetchClients = async () => {
    if (!token) {
      return;
    }

    try {
      setLoading(true);
      const response = await apiCaller.clientMethods.getClientWithFilter(
        page,
        limit,
        token,
        debouncedSearchText
      );

      if (response.length === 0) {
        setHasMore(false);
      }

      if (page === 1) {
        setClients(response);
      } else {
        setClients((prev) => [...prev, ...response]);
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
      Alert.alert("Erro", "Não foi possível carregar os clientes.");
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  // Function to filter clients based on search and filters
  const filteredClients = React.useMemo(() => {
    if (!searchText) return clients;

    return clients.filter((client) => {
      const searchLower = searchText.toLowerCase();

      // Map filter keys to client properties
      // const fieldMap: Record<keyof Filters, keyof ClientesApp> = {
      //   codigo: 'codcli',
      //   razaoSocial: 'razao',
      //   cidade: 'cidade',
      //   uf: 'estado',
      //   telefone: 'fone',
      //   email: 'email'
      // };

      // const fieldsToSearch = Object.keys(filters)
      //   .filter(key => filters[key as keyof Filters])
      //   .map(key => fieldMap[key as keyof Filters]);

      // return fieldsToSearch.some(field => {
      //   const value = client[field];
      //   return value && value.toString().toLowerCase().includes(searchLower);
      // });

      // Simplified search across all fields
      return (
        client.codcli.toString().toLowerCase().includes(searchLower) ||
        client.razao?.toLowerCase().includes(searchLower) ||
        client.cidade?.toLowerCase().includes(searchLower) ||
        client.estado?.toLowerCase().includes(searchLower) ||
        client.fone?.toLowerCase().includes(searchLower) ||
        client.email?.toLowerCase().includes(searchLower)
      );
    });
  }, [clients, searchText]);

  const handleClientPress = (client: ClientesApp) => {
    router.push({
      pathname: "/(tabs)/cliente-detalhes",
      params: {
        id: client.id.toString(),
        codcli: client.codcli.toString(),
        razao: client.razao || "",
        fantasia: client.fantasia || "",
        cidade: client.cidade || "",
        estado: client.estado || "",
        fone: client.fone || "",
        contato: client.contato || "",
        email: client.email || "",
        pessoa: client.pessoa || "",
        cnpj_cpf: client.cnpj_cpf || "",
        ie_rg: client.ie_rg || "",
        endereco: client.endereco || "",
        bairro: client.bairro || "",
        cep: client.cep || "",
        pais: client.pais || "",
      },
    });
  };

  if (authLoading && clients.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={["#229dc9", "#1a7fa3"]}
          style={styles.headerGradient}
        >
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <ThemedText style={styles.title}>Clientes</ThemedText>
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
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#229dc9" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#229dc9", "#1a7fa3"]}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              source={require("../../assets/images/LogoADPG.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <ThemedText style={styles.title}>Clientes</ThemedText>
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

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <MaterialCommunityIcons name="magnify" size={24} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar clientes..."
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText ? (
            <TouchableOpacity onPress={() => setSearchText("")}>
              <MaterialCommunityIcons name="close" size={24} color="#666" />
            </TouchableOpacity>
          ) : null}
        </View>
        {/* <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <MaterialCommunityIcons name="filter" size={24} color="#fff" />
        </TouchableOpacity> */}
      </View>

      {/* {showFilters && (
        <ThemedView style={styles.filtersContainer}>
          <ThemedText style={styles.filtersTitle}>Filtrar por:</ThemedText>
          <View style={styles.filterOptions}>
            <TouchableOpacity
              style={[styles.filterOption, filters.codigo && styles.filterOptionActive]}
              onPress={() => setFilters({ ...filters, codigo: !filters.codigo })}
            >
              <ThemedText style={[styles.filterText, filters.codigo && styles.filterTextActive]}>
                Código
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterOption, filters.razaoSocial && styles.filterOptionActive]}
              onPress={() => setFilters({ ...filters, razaoSocial: !filters.razaoSocial })}
            >
              <ThemedText style={[styles.filterText, filters.razaoSocial && styles.filterTextActive]}>
                Razão Social
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterOption, filters.cidade && styles.filterOptionActive]}
              onPress={() => setFilters({ ...filters, cidade: !filters.cidade })}
            >
              <ThemedText style={[styles.filterText, filters.cidade && styles.filterTextActive]}>
                Cidade
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterOption, filters.uf && styles.filterOptionActive]}
              onPress={() => setFilters({ ...filters, uf: !filters.uf })}
            >
              <ThemedText style={[styles.filterText, filters.uf && styles.filterTextActive]}>
                UF
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterOption, filters.telefone && styles.filterOptionActive]}
              onPress={() => setFilters({ ...filters, telefone: !filters.telefone })}
            >
              <ThemedText style={[styles.filterText, filters.telefone && styles.filterTextActive]}>
                Telefone
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterOption, filters.email && styles.filterOptionActive]}
              onPress={() => setFilters({ ...filters, email: !filters.email })}
            >
              <ThemedText style={[styles.filterText, filters.email && styles.filterTextActive]}>
                Email
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>
      )} */}

      <ScrollView
        style={styles.scrollContainer}
      >
        <ThemedView style={styles.contentContainer}>
          {/* Loading indicator */}
          {loading && clients.length === 0 && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#229dc9" />
              <ThemedText style={styles.loadingText}>Carregando clientes...</ThemedText>
            </View>
          )}

          {filteredClients.length > 0 ? (
            filteredClients.map((client) => (
              <TouchableOpacity
                key={client.id}
                style={styles.clientCard}
                onPress={() => handleClientPress(client)}
              >
                <View style={styles.clientHeader}>
                  <ThemedText style={styles.clientCode}>
                    {client.codcli}
                  </ThemedText>
                  <ThemedText style={styles.clientName}>
                    {client.razao || client.fantasia}
                  </ThemedText>
                </View>
                <View style={styles.clientDetails}>
                  <View style={styles.detailItem}>
                    <MaterialCommunityIcons
                      name="map-marker"
                      size={16}
                      color="#666"
                    />
                    <ThemedText style={styles.detailText}>
                      {client.cidade}
                      {client.estado ? `, ${client.estado}` : ""}
                    </ThemedText>
                  </View>
                  <View style={styles.detailItem}>
                    <MaterialCommunityIcons
                      name="phone"
                      size={16}
                      color="#666"
                    />
                    <ThemedText style={styles.detailText}>
                      {client.fone || "-"}
                    </ThemedText>
                  </View>
                  <View style={styles.detailItem}>
                    <MaterialCommunityIcons
                      name="account"
                      size={16}
                      color="#666"
                    />
                    <ThemedText style={styles.detailText}>
                      {client.contato || "-"}
                    </ThemedText>
                  </View>
                  <View style={styles.detailItem}>
                    <MaterialCommunityIcons
                      name="email"
                      size={16}
                      color="#666"
                    />
                    <ThemedText style={styles.detailText}>
                      {client.email || "-"}
                    </ThemedText>
                  </View>
                </View>
                <View style={styles.clientActions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      router.push({
                        pathname: "/(tabs)/cliente-vendas",
                        params: {
                          codcli: client.codcli.toString(),
                          razao: client.razao || client.fantasia || "",
                        },
                      });
                    }}
                  >
                    <MaterialCommunityIcons
                      name="file-document-outline"
                      size={20}
                      color="#229dc9"
                    />
                    <ThemedText style={styles.actionText}>Vendas</ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      router.push({
                        pathname: "/(tabs)/cliente-produtos",
                        params: {
                          codcli: client.codcli.toString(),
                          razao: client.razao || client.fantasia || "",
                        },
                      });
                    }}
                  >
                    <MaterialCommunityIcons
                      name="package-variant"
                      size={20}
                      color="#229dc9"
                    />
                    <ThemedText style={styles.actionText}>Produtos</ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      router.push({
                        pathname: "/(tabs)/cliente-titulos",
                        params: {
                          codcli: client.codcli.toString(),
                          razao: client.razao || client.fantasia || "",
                        },
                      });
                    }}
                  >
                    <MaterialCommunityIcons
                      name="cash-multiple"
                      size={20}
                      color="#229dc9"
                    />
                    <ThemedText style={styles.actionText}>Títulos</ThemedText>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="account-search-outline" size={48} color="#ccc" />
              <ThemedText style={styles.emptyStateText}>Nenhum cliente encontrado.</ThemedText>
            </View>
          )}

          {hasMore && filteredClients.length > 0 && (
             <View style={styles.loadMoreContainer}>
               <TouchableOpacity
                 style={styles.loadMoreButton}
                 onPress={loadMore}
                 disabled={loading}
               >
                 {loading && page > 1 ? (
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
  },
  headerGradient: {
    paddingTop: 40,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
  },
  profileButton: {
    padding: 5,
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  filterButton: {
    backgroundColor: "#229dc9",
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  filtersContainer: {
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  filtersTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  filterOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -5,
  },
  filterOption: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    margin: 5,
  },
  filterOptionActive: {
    backgroundColor: "#229dc9",
  },
  filterText: {
    fontSize: 14,
    color: "#666",
  },
  filterTextActive: {
    color: "#fff",
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  clientCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  clientHeader: {
    marginBottom: 10,
  },
  clientCode: {
    fontSize: 14,
    color: "#666",
  },
  clientName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  clientDetails: {
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 5,
  },
  clientActions: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
  },
  actionText: {
    fontSize: 14,
    color: "#229dc9",
    marginLeft: 5,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  emptyStateText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
  loadMoreButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
});
