import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const quickActions = [
    { icon: 'account-group', title: 'Clientes', count: '143', route: '/(tabs)/clientes' },
    { icon: 'package-variant', title: 'Produtos', count: '567', route: '/(tabs)/estoque' },
    { icon: 'chart-line', title: 'Vendas', count: '32', route: '/(tabs)/vendas' },
    { icon: 'cog', title: 'Configurações', route: '/(tabs)/perfil' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header Section */}
        <LinearGradient
          colors={['#229dc9', '#1a7fa3']}
          style={styles.headerGradient}
        >
          <View style={styles.header}>
            <View>
              <Text style={styles.welcomeText}>Bem-vindo ao</Text>
              <Text style={styles.titleText}>ADPG</Text>
            </View>
            <TouchableOpacity 
              style={styles.profileButton}
              onPress={() => router.push('/(tabs)/perfil')}
            >
              <MaterialCommunityIcons name="account-circle" size={32} color="#fff" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          {quickActions.map((action, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.statCard}
              onPress={() => action.route && router.push(action.route as any)}
            >
              <LinearGradient
                colors={['#2eb0e0', '#229dc9']}
                style={styles.gradientCard}
              >
                <MaterialCommunityIcons 
                  name={action.icon as any} 
                  size={24} 
                  color="#fff" 
                />
                <Text style={styles.statTitle}>{action.title}</Text>
                {action.count && (
                  <Text style={styles.statCount}>{action.count}</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Activity */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Atividades Recentes</Text>
          <TouchableOpacity 
            style={styles.activityCard}
            onPress={() => router.push('/(tabs)/')}
          >
            <MaterialCommunityIcons name="clock-outline" size={20} color="#229dc9" />
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Nova venda registrada</Text>
              <Text style={styles.activityTime}>Há 5 minutos</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.activityCard}
            onPress={() => router.push('/(tabs)/clientes')}
          >
            <MaterialCommunityIcons name="account-plus" size={20} color="#229dc9" />
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Cliente adicionado</Text>
              <Text style={styles.activityTime}>Há 2 horas</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Ações Rápidas</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/(tabs)/')}
            >
              <MaterialCommunityIcons name="plus-circle" size={24} color="#229dc9" />
              <Text style={styles.actionButtonText}>Nova Venda</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/(tabs)/clientes')}
            >
              <MaterialCommunityIcons name="account-plus" size={24} color="#229dc9" />
              <Text style={styles.actionButtonText}>Novo Cliente</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/(tabs)/estoque')}
            >
              <MaterialCommunityIcons name="cube-outline" size={24} color="#229dc9" />
              <Text style={styles.actionButtonText}>Novo Produto</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  welcomeText: {
    color: '#fff',
    fontSize: 16,
    opacity: 0.9,
  },
  titleText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  profileButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    marginTop: -30,
  },
  statCard: {
    width: (width - 50) / 2,
    margin: 5,
    borderRadius: 15,
    overflow: 'hidden',
  },
  gradientCard: {
    padding: 20,
    height: 120,
    justifyContent: 'space-between',
  },
  statTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  statCount: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  activityCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activityContent: {
    marginLeft: 15,
  },
  activityTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  activityTime: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    width: (width - 80) / 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionButtonText: {
    color: '#333',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
});