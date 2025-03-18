import React, { useState, useEffect, useCallback } from "react";
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
import { router, useRouter } from "expo-router";
import ApiCaller from "../../backEnd/apiCaller";
import { useAuth } from "../context/AuthContext";
import { ProdutosApp_PrecosRegiao } from "../../backEnd/interfaces";
import { Image } from "react-native";
// import filterIcon from "@/assets/images/filter.png";

// Initialize ApiCaller
const apiCaller = new ApiCaller();

// apiCaller.regionalPricesMethods.getAllRegionalPrices(1, 10, token)

const regioesICMS = [
  { uf: "SP", aliquota: "18%" },
  { uf: "MG, PR, RS, RJ, SC", aliquota: "12%" },
  {
    uf: "AC, AL, AM, AP, BA, CE, DF, GO, MA, MT, MS, PA, PB, PE, PI, RN, RO, RR, SE, TO",
    aliquota: "7%",
  },
  { uf: "Importados", aliquota: "4%" },
];

// Define the Filters interface
interface Filters {
  codigo: string;
  descricao: string;
}

// Define the handlePricePress function
const handlePricePress = (item: ProdutosApp_PrecosRegiao) => {
  // Implement the logic for handling the price press
  // For example, navigate to a details page or show an alert
  Alert.alert('Price Details', `Description: ${item.descricao}\nPrice: ${item.precompra}`);
};

export default function PrecosScreen() {
    const [precosData, setPrecosData] = useState<ProdutosApp_PrecosRegiao[]>([]);
    const [initialLoading, setInitialLoading] = useState<boolean>(true);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState<Filters>({
        codigo: '',
        descricao: ''
    });
    const [debouncedFilters, setDebouncedFilters] = useState<Filters>(filters);
    const { token } = useAuth();
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
        fetchPrecosData(1, debouncedFilters);
    }, [debouncedFilters]);

    const fetchPrecosData = async (pageNumber: number, filterParams?: Filters) => {
        try {
            let response;
            if (!token) {
                Alert.alert('Erro', 'Informações do cliente não encontradas.');
                router.back();
                return;
            }
            
            if (filterParams && (filterParams.codigo || filterParams.descricao)) {
                const filterObject = {
                    codproduto: filterParams.codigo,
                    descricao: filterParams.descricao
                };
                response = await apiCaller.regionalPricesMethods.getFilteredRegionalPrices(
                    filterObject,
                    pageNumber,
                    10,
                    token
                );
            } else {
                response = await apiCaller.regionalPricesMethods.getAllRegionalPrices(pageNumber, 10, token);
                response = response.regionalPrices;
            }
            
            
            if (Array.isArray(response)) {
                if (response.length === 0) {
                    setHasMore(false);
                } else {
                    if (pageNumber === 1) {
                        setPrecosData(response);
                    } else {
                        setPrecosData(prev => [...prev, ...response]);
                    }
                }
            } else {
                console.error("Expected an array but got:", response);
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching prices data:", error);
            setHasMore(false);
        } finally {
            setInitialLoading(false);
            setIsUpdating(false);
        }
    };

    // Initial data fetch
    useEffect(() => {
        fetchPrecosData(1);
    }, []);

    // Handle filter changes
    const handleFilterChange = (field: keyof Filters, value: string) => {
        setFilters(prev => ({ ...prev, [field]: value }));
    };

    // Handle filter clear
    const handleClearFilters = () => {
        setFilters({ codigo: '', descricao: '' });
    };

    const handleLoadMore = () => {
        if (!isUpdating && hasMore) {
            setIsUpdating(true);
            const nextPage = page + 1;
            setPage(nextPage);
            fetchPrecosData(nextPage, debouncedFilters);
        }
    };

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: any) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    };

    if (initialLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#229dc9', '#1a7fa3']}
                style={styles.headerGradient}
            >
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <MaterialCommunityIcons name="cash-multiple" size={32} color="#fff" />
                        <ThemedText style={styles.title}>Preços por Região</ThemedText>
                    </View>
                    <TouchableOpacity style={styles.profileButton}>
                        <MaterialCommunityIcons name="account-circle" size={32} color="#fff" />
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            <ScrollView 
                style={styles.scrollContainer}
                onScroll={({ nativeEvent }) => {
                    if (isCloseToBottom(nativeEvent)) {
                        handleLoadMore();
                    }
                }}
                scrollEventThrottle={400}
            >
                <ThemedView style={styles.contentContainer}>
                    <ThemedView style={styles.icmsContainer}>
                        <ThemedText style={styles.sectionTitle}>Regiões ICMS</ThemedText>
                        {regioesICMS.map((regiao, index) => (
                            <ThemedView key={index} style={styles.icmsRow}>
                                <ThemedText style={styles.icmsAliquota}>{regiao.aliquota}</ThemedText>
                                <ThemedText style={styles.icmsUF}>{regiao.uf}</ThemedText>
                            </ThemedView>
                        ))}
                    </ThemedView>

                    <TouchableOpacity 
                        style={styles.filterContainer}
                        onPress={() => setShowFilters(!showFilters)}
                    >
                        <View style={styles.filterHeader}>
                            <MaterialCommunityIcons name="filter-variant" size={24} color="#229dc9" />
                            <ThemedText style={styles.filterText}>
                                Filtros {isUpdating && '(Atualizando...)'}
                            </ThemedText>
                        </View>
                    </TouchableOpacity>

                    {showFilters && (
                        <View style={styles.filterArea}>
                            <View style={styles.filterField}>
                                <ThemedText style={styles.filterLabel}>Código</ThemedText>
                                <TextInput
                                    style={styles.input}
                                    value={filters.codigo}
                                    onChangeText={(text) => handleFilterChange('codigo', text)}
                                    placeholder="Digite o código"
                                />
                            </View>

                            <View style={styles.filterField}>
                                <ThemedText style={styles.filterLabel}>Descrição</ThemedText>
                                <TextInput
                                    style={styles.input}
                                    value={filters.descricao}
                                    onChangeText={(text) => handleFilterChange('descricao', text)}
                                    placeholder="Digite a descrição"
                                />
                            </View>

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
                        {precosData.map((item, index) => (
                            <ThemedView key={index} style={styles.tableRow}>
                                <View style={styles.rowHeader}>
                                    <ThemedText style={styles.codigo}>{item.codproduto}</ThemedText>
                                    <ThemedText style={styles.descricao}>{item.descricao}</ThemedText>
                                </View>

                                <View style={styles.rowContent}>
                                    <View style={styles.column}>
                                        <View style={styles.cell}>
                                            <ThemedText style={styles.label}>ST</ThemedText>
                                            <ThemedText style={styles.value}>{item.cod_st}</ThemedText>
                                        </View>
                                        <View style={styles.cell}>
                                            <ThemedText style={styles.label}>IPI %</ThemedText>
                                            <ThemedText style={styles.value}>{item.ipi}</ThemedText>
                                        </View>
                                    </View>
                                    <View style={styles.column}>
                                        <View style={styles.cell}>
                                            <ThemedText style={styles.label}>Moeda</ThemedText>
                                            <ThemedText style={styles.value}>{item.moeda}</ThemedText>
                                        </View>
                                        <View style={styles.cell}>
                                            <ThemedText style={styles.label}>Preço Compra</ThemedText>
                                            <ThemedText style={styles.value}>{item.precompra}</ThemedText>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.mcContainer}>
                                    <View style={styles.mcSection}>
                                        <ThemedText style={styles.mcTitle}>ICMS 18%</ThemedText>
                                        <View style={styles.mcRow}>
                                            <ThemedText style={styles.mcLabel}>MC1:</ThemedText>
                                            <ThemedText style={styles.mcValue}>{item.mc1_18}</ThemedText>
                                            <ThemedText style={styles.mcLabel}>MC2:</ThemedText>
                                            <ThemedText style={styles.mcValue}>{item.mc2_18}</ThemedText>
                                            <ThemedText style={styles.mcLabel}>MC3:</ThemedText>
                                            <ThemedText style={styles.mcValue}>{item.mc3_18}</ThemedText>
                                        </View>
                                    </View>

                                    <View style={styles.mcSection}>
                                        <ThemedText style={styles.mcTitle}>ICMS 12%</ThemedText>
                                        <View style={styles.mcRow}>
                                            <ThemedText style={styles.mcLabel}>MC1:</ThemedText>
                                            <ThemedText style={styles.mcValue}>{item.mc1_12}</ThemedText>
                                            <ThemedText style={styles.mcLabel}>MC2:</ThemedText>
                                            <ThemedText style={styles.mcValue}>{item.mc2_12}</ThemedText>
                                            <ThemedText style={styles.mcLabel}>MC3:</ThemedText>
                                            <ThemedText style={styles.mcValue}>{item.mc3_12}</ThemedText>
                                        </View>
                                    </View>

                                    <View style={styles.mcSection}>
                                        <ThemedText style={styles.mcTitle}>ICMS 7%</ThemedText>
                                        <View style={styles.mcRow}>
                                            <ThemedText style={styles.mcLabel}>MC1:</ThemedText>
                                            <ThemedText style={styles.mcValue}>{item.mc1_7}</ThemedText>
                                            <ThemedText style={styles.mcLabel}>MC2:</ThemedText>
                                            <ThemedText style={styles.mcValue}>{item.mc2_7}</ThemedText>
                                            <ThemedText style={styles.mcLabel}>MC3:</ThemedText>
                                            <ThemedText style={styles.mcValue}>{item.mc3_7}</ThemedText>
                                        </View>
                                    </View>

                                    <View style={styles.mcSection}>
                                        <ThemedText style={styles.mcTitle}>ICMS 4%</ThemedText>
                                        <View style={styles.mcRow}>
                                            <ThemedText style={styles.mcLabel}>MC1:</ThemedText>
                                            <ThemedText style={styles.mcValue}>{item.mc1_4}</ThemedText>
                                            <ThemedText style={styles.mcLabel}>MC2:</ThemedText>
                                            <ThemedText style={styles.mcValue}>{item.mc2_4}</ThemedText>
                                            <ThemedText style={styles.mcLabel}>MC3:</ThemedText>
                                            <ThemedText style={styles.mcValue}>{item.mc3_4}</ThemedText>
                                        </View>
                                    </View>
                                </View>
                            </ThemedView>
                        ))}
                    </ThemedView>
                    
                    {isUpdating && page > 1 && (
                        <View style={styles.loadingMore}>
                            <ActivityIndicator size="small" color="#229dc9" />
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
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
        color: '#333',
    },
    icmsContainer: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    icmsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    icmsAliquota: {
        width: 50,
        fontSize: 14,
        fontWeight: '500',
        color: '#FF0000',
    },
    icmsUF: {
        flex: 1,
        fontSize: 14,
        color: '#666',
    },
    filterContainer: {
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    filterHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    filterText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    filterArea: {
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    filterField: {
        marginBottom: 12,
    },
    filterLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
    },
    input: {
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
    },
    filterActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    clearButton: {
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
    },
    clearButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#229dc9',
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
    codigo: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#229dc9',
    },
    descricao: {
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
    mcContainer: {
        marginTop: 16,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 12,
    },
    mcSection: {
        marginBottom: 12,
    },
    mcTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#229dc9',
        marginBottom: 4,
    },
    mcRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 8,
    },
    mcLabel: {
        fontSize: 12,
        color: '#666',
    },
    mcValue: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
        marginRight: 12,
    },
    loadingMore: {
        padding: 16,
        alignItems: 'center',
    },
    updatingTable: {
        opacity: 0.7,
    },
}); 