import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { Image } from 'react-native';
import priceIcon from '@/assets/images/price.png';
import filterIcon from '@/assets/images/filter.png';

const regioesICMS = [
    { uf: 'SP', aliquota: '18%' },
    { uf: 'MG, PR, RS, RJ, SC', aliquota: '12%' },
    { uf: 'AC, AL, AM, AP, BA, CE, DF, GO, MA, MT, MS, PA, PB, PE, PI, RN, RO, RR, SE, TO', aliquota: '7%' },
    { uf: 'Importados', aliquota: '4%' },
];

const precosData = [
    {
        codigo: 'PA00001',
        descricao: 'IRGASURF SR 100',
        st: '300,00',
        ipi: '3,25',
        moeda: 'US$',
        precoCompra: '0,00',
        mc1_18: '0,00',
        mc2_18: '0,00',
        mc3_18: '0,00',
        mc1_12: '-',
        mc2_12: '-',
        mc3_12: '-',
        mc1_7: '-',
        mc2_7: '-',
        mc3_7: '-',
        mc1_4: '-',
        mc2_4: '-',
        mc3_4: '-',
    },
    {
        codigo: 'PA00002',
        descricao: 'IRGASURF HL 560',
        st: '450,00',
        ipi: '4,50',
        moeda: 'US$',
        precoCompra: '2,50',
        mc1_18: '3,00',
        mc2_18: '3,50',
        mc3_18: '4,00',
        mc1_12: '2,80',
        mc2_12: '3,30',
        mc3_12: '3,80',
        mc1_7: '2,60',
        mc2_7: '3,10',
        mc3_7: '3,60',
        mc1_4: '2,40',
        mc2_4: '2,90',
        mc3_4: '3,40',
    },
    {
        codigo: 'PA00003',
        descricao: 'POLÍMERO XR-750',
        st: '275,50',
        ipi: '2,75',
        moeda: 'R$',
        precoCompra: '1,80',
        mc1_18: '2,20',
        mc2_18: '2,70',
        mc3_18: '3,20',
        mc1_12: '2,00',
        mc2_12: '2,50',
        mc3_12: '3,00',
        mc1_7: '-',
        mc2_7: '-',
        mc3_7: '-',
        mc1_4: '-',
        mc2_4: '-',
        mc3_4: '-',
    },
    {
        codigo: 'PA00004',
        descricao: 'ADITIVO KP-200',
        st: '180,00',
        ipi: '3,00',
        moeda: 'US$',
        precoCompra: '1,20',
        mc1_18: '1,50',
        mc2_18: '2,00',
        mc3_18: '2,50',
        mc1_12: '1,30',
        mc2_12: '1,80',
        mc3_12: '2,30',
        mc1_7: '1,10',
        mc2_7: '1,60',
        mc3_7: '2,10',
        mc1_4: '1,00',
        mc2_4: '1,50',
        mc3_4: '2,00',
    },
];

export default function PrecosScreen() {
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

            <ScrollView style={styles.scrollContainer}>
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

                    <ThemedView style={styles.filterContainer}>
                        <ThemedText style={styles.filterText}>
                            <Image source={filterIcon} style={styles.iconSmall} /> Filtro
                        </ThemedText>
                        <ThemedText style={styles.filterSubtext}>
                            (Clique aqui para expandir/esconder os campos de filtro)
                        </ThemedText>
                    </ThemedView>

                    <ThemedView style={styles.table}>
                        {precosData.map((item, index) => (
                            <ThemedView key={index} style={styles.tableRow}>
                                <View style={styles.rowHeader}>
                                    <ThemedText style={styles.codigo}>{item.codigo}</ThemedText>
                                    <ThemedText style={styles.descricao}>{item.descricao}</ThemedText>
                                </View>

                                <View style={styles.rowContent}>
                                    <View style={styles.column}>
                                        <View style={styles.cell}>
                                            <ThemedText style={styles.label}>ST</ThemedText>
                                            <ThemedText style={styles.value}>{item.st}</ThemedText>
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
                                            <ThemedText style={styles.value}>{item.precoCompra}</ThemedText>
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
        backgroundColor: '#f5f5f5',
        borderRadius: 4,
        marginBottom: 20,
    },
    filterText: {
        fontSize: 16,
        fontWeight: '600',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 0,
        alignContent: 'center',
        color: '#000',
    },
    filterSubtext: {
        fontSize: 12,
        color: '#666',
    },
    iconSmall: {
        width: 20,
        height: 20,
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
}); 