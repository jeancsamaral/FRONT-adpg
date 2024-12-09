import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
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
        <ThemedView style={styles.container}>
            <ThemedView style={styles.headerMain}>
                <Image source={priceIcon} style={styles.icon} />
                <ThemedText style={styles.title}>Preços por Região</ThemedText>
            </ThemedView>
            <ScrollView style={styles.scrollContainer}>
                <ThemedView style={styles.icmsContainer}>
                    <ThemedText style={styles.icmsTitle}>Regiões ICMS</ThemedText>
                    {regioesICMS.map((regiao, index) => (
                        <ThemedView key={index} style={styles.icmsRow}>
                            <ThemedText style={[styles.icmsAliquota, { color: '#FF0000' }]}>{regiao.aliquota}</ThemedText>
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
                            <ThemedView style={styles.cell}>
                                <ThemedText style={styles.label}>Código</ThemedText>
                                <ThemedText style={styles.value}>{item.codigo}</ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.cell}>
                                <ThemedText style={styles.label}>Descrição</ThemedText>
                                <ThemedText style={styles.value}>{item.descricao}</ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.cell}>
                                <ThemedText style={styles.label}>ST</ThemedText>
                                <ThemedText style={styles.value}>{item.st}</ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.cell}>
                                <ThemedText style={styles.label}>IPI %</ThemedText>
                                <ThemedText style={styles.value}>{item.ipi}</ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.cell}>
                                <ThemedText style={styles.label}>Moeda</ThemedText>
                                <ThemedText style={styles.value}>{item.moeda}</ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.cell}>
                                <ThemedText style={styles.label}>Preço Compra</ThemedText>
                                <ThemedText style={styles.value}>{item.precoCompra}</ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.cell}>
                                <ThemedText style={styles.label}>MC1 18%</ThemedText>
                                <ThemedText style={styles.value}>{item.mc1_18}</ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.cell}>
                                <ThemedText style={styles.label}>MC2 18%</ThemedText>
                                <ThemedText style={styles.value}>{item.mc2_18}</ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.cell}>
                                <ThemedText style={styles.label}>MC3 18%</ThemedText>
                                <ThemedText style={styles.value}>{item.mc3_18}</ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.cell}>
                                <ThemedText style={styles.label}>MC1 12%</ThemedText>
                                <ThemedText style={styles.value}>{item.mc1_12}</ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.cell}>
                                <ThemedText style={styles.label}>MC2 12%</ThemedText>
                                <ThemedText style={styles.value}>{item.mc2_12}</ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.cell}>
                                <ThemedText style={styles.label}>MC3 12%</ThemedText>
                                <ThemedText style={styles.value}>{item.mc3_12}</ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.cell}>
                                <ThemedText style={styles.label}>MC1 7%</ThemedText>
                                <ThemedText style={styles.value}>{item.mc1_7}</ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.cell}>
                                <ThemedText style={styles.label}>MC2 7%</ThemedText>
                                <ThemedText style={styles.value}>{item.mc2_7}</ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.cell}>
                                <ThemedText style={styles.label}>MC3 7%</ThemedText>
                                <ThemedText style={styles.value}>{item.mc3_7}</ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.cell}>
                                <ThemedText style={styles.label}>MC1 4%</ThemedText>
                                <ThemedText style={styles.value}>{item.mc1_4}</ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.cell}>
                                <ThemedText style={styles.label}>MC2 4%</ThemedText>
                                <ThemedText style={styles.value}>{item.mc2_4}</ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.cellLast}>
                                <ThemedText style={styles.label}>MC3 4%</ThemedText>
                                <ThemedText style={styles.value}>{item.mc3_4}</ThemedText>
                            </ThemedView>
                        </ThemedView>
                    ))}
                </ThemedView>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginTop: 60,
        backgroundColor: 'white',
    },

    headerMain: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#c9c9c9',
        paddingBottom: 20,
        backgroundColor: 'white',
        marginTop: 40,
        paddingRight: 20,
        flexWrap: 'wrap',
    },

    icon: {
        width: 35,
        height: 35,
    },

    iconSmall: {
        width: 20,
        height: 20,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        flex: 1,
    },

    icmsContainer: {
        backgroundColor: '#fff',
        borderRadius: 4,
        padding: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#eee',
    },

    icmsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#000',
    },

    icmsRow: {
        flexDirection: 'row',
        marginBottom: 8,
        alignItems: 'center',
    },

    icmsAliquota: {
        width: 40,
        fontSize: 14,
        fontWeight: '500',
    },

    icmsUF: {
        fontSize: 14,
        color: '#666',
        flex: 1,
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

    scrollContainer: {
        flex: 1,
    },

    table: {
        gap: 16,
        backgroundColor: 'white',
        paddingBottom: 20,
    },

    tableRow: {
        backgroundColor: '#f5f5f5',
        padding: 12,
        borderRadius: 4,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 2,
    },

    cell: {
        marginBottom: 8,
        backgroundColor: '#F5F5F5',
        borderBottomColor: '#c9c9c9',
        borderBottomWidth: 0.5,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    cellLast: {
        marginBottom: 8,
        backgroundColor: '#F5F5F5',
        borderBottomColor: '#c9c9c9',
        borderBottomWidth: 0,
        paddingBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    label: {
        fontSize: 12,
        color: '#666',
        marginBottom: 2,
    },

    value: {
        color: '#000',
        fontSize: 14,
    },
}); 