import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';

// Dados de exemplo
const inventoryData = [
  {
    codigo: 'PA00001',
    descricao: 'IRGASURF SR 100',
    un: 'KG',
    moeda: 'US$',
    venda: '0.00',
    estoque: '0.00',
    reservado: '0.00',
    comprado: '0.00',
    disponivel: '0.00',
  },
  {
    codigo: 'PA00002',
    descricao: 'IRGASURF HL 560',
    un: 'KG',
    moeda: 'US$',
    venda: '0.00',
    estoque: '0.00',
    reservado: '0.00',
    comprado: '0.00',
    disponivel: '0.00',
  },
];

export default function EstoqueScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#229dc9', '#1a7fa3']}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <MaterialCommunityIcons name="cube" size={32} color="#fff" />
            <ThemedText style={styles.title}>Estoque de Produtos</ThemedText>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <MaterialCommunityIcons name="account-circle" size={32} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollContainer}>
        <ThemedView style={styles.contentContainer}>
          <TouchableOpacity style={styles.createButton}>
            <MaterialCommunityIcons name="plus-circle" size={24} color="#fff" />
            <ThemedText style={styles.buttonText}>Novo Produto</ThemedText>
          </TouchableOpacity>

          <ThemedView style={styles.table}>
            {inventoryData.map((item, index) => (
              <ThemedView key={item.codigo} style={styles.tableRow}>
                <View style={styles.rowHeader}>
                  <ThemedText style={styles.codigo}>{item.codigo}</ThemedText>
                  <ThemedText style={styles.descricao}>{item.descricao}</ThemedText>
                </View>

                <View style={styles.rowContent}>
                  <View style={styles.column}>
                    <View style={styles.cell}>
                      <ThemedText style={styles.label}>Un.</ThemedText>
                      <ThemedText style={styles.value}>{item.un}</ThemedText>
                    </View>
                    <View style={styles.cell}>
                      <ThemedText style={styles.label}>Moeda</ThemedText>
                      <ThemedText style={styles.value}>{item.moeda}</ThemedText>
                    </View>
                  </View>
                  <View style={styles.column}>
                    <View style={styles.cell}>
                      <ThemedText style={styles.label}>Venda</ThemedText>
                      <ThemedText style={styles.value}>{item.venda}</ThemedText>
                    </View>
                    <View style={styles.cell}>
                      <ThemedText style={styles.label}>Estoque</ThemedText>
                      <ThemedText style={styles.value}>{item.estoque}</ThemedText>
                    </View>
                  </View>
                </View>

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

                <View style={styles.actionIcons}>
                  <TouchableOpacity>
                    <MaterialCommunityIcons name="pencil" size={20} color="#229dc9" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <MaterialCommunityIcons name="delete" size={20} color="#229dc9" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <MaterialCommunityIcons name="content-copy" size={20} color="#229dc9" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <MaterialCommunityIcons name="file-document" size={20} color="#229dc9" />
                  </TouchableOpacity>
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
    paddingBottom: 20,
  },
  contentContainer: {
    padding: 20,
  },
  createButton: {
    backgroundColor: '#229dc9',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
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
    color: '#666',
  },
  value: {
    fontSize: 14,
    color: '#333',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  redText: {
    color: '#FF3B30',
  },
  greenText: {
    color: '#34C759',
  },
  blueText: {
    color: '#007AFF',
  },
  actionIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
});
