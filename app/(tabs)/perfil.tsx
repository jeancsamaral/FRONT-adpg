import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useRouter } from 'expo-router'

export default function ProfileScreen() {
  const router = useRouter()

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/(tabs)/')}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meu Perfil</Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)/info')}>
          <Ionicons name="information-circle-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Profile Info */}
        <View style={styles.profileInfo}>
          <View>
            <Text style={styles.name}>João Silva</Text>
            <Text style={styles.location}>Administrador</Text>
          </View>
          <View style={styles.followSection}>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Editar Perfil</Text>
            </TouchableOpacity>
            <View style={styles.followStats}>
              <Text style={styles.followCount}>127</Text>
              <Text style={styles.followLabel}>Vendas</Text>
            </View>
            <View style={styles.followStats}>
              <Text style={styles.followCount}>45</Text>
              <Text style={styles.followLabel}>Clientes</Text>
            </View>
          </View>
        </View>

        {/* Metrics Cards */}
        <View style={styles.metricsContainer}>
          <View style={[styles.metricCard, { backgroundColor: '#9dd6eb' }]}>
            <Text style={styles.metricValue}>R$ 15.430</Text>
            <Text style={styles.metricLabel}>Vendas do Mês</Text>
          </View>
          <View style={[styles.metricCard, { backgroundColor: '#FFFFFF' }]}>
            <Text style={styles.metricValue}>R$ 20.000</Text>
            <Text style={styles.metricLabel}>Meta Mensal</Text>
          </View>
          <View style={[styles.metricCard, { backgroundColor: '#FFE0B2' }]}>
            <Text style={styles.metricValue}>85%</Text>
            <Text style={styles.metricLabel}>Desempenho</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="person-outline" size={24} color="#000" />
            <View style={styles.menuItemText}>
              <Text style={styles.menuTitle}>Dados Pessoais</Text>
              <Text style={styles.menuSubtitle}>Informações da conta</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="notifications-outline" size={24} color="#000" />
            <View style={styles.menuItemText}>
              <Text style={styles.menuTitle}>Notificações</Text>
              <Text style={styles.menuSubtitle}>Configurar alertas</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="lock-closed-outline" size={24} color="#000" />
            <View style={styles.menuItemText}>
              <Text style={styles.menuTitle}>Segurança</Text>
              <Text style={styles.menuSubtitle}>Senha e autenticação</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="help-circle-outline" size={24} color="#000" />
            <View style={styles.menuItemText}>
              <Text style={styles.menuTitle}>Ajuda</Text>
              <Text style={styles.menuSubtitle}>Suporte e FAQ</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => router.replace('/login')}>
            <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
            <View style={styles.menuItemText}>
              <Text style={[styles.menuTitle, { color: '#FF3B30' }]}>Sair</Text>
              <Text style={styles.menuSubtitle}>Encerrar sessão</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/(tabs)')}
        >
          <Ionicons name="home-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/(tabs)/clientes')}
        >
          <Ionicons name="people-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/(tabs)/estoque')}
        >
          <Ionicons name="cube-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/(tabs)/info')}
        >
          <Ionicons name="settings-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginTop:10,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  profileInfo: {
    padding: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
  followSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: 16,
  },
  followButton: {
    backgroundColor: '#000',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  followButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  followStats: {
    alignItems: 'center',
  },
  followCount: {
    fontSize: 16,
    fontWeight: '600',
  },
  followLabel: {
    fontSize: 12,
    color: '#666',
  },
  metricsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  metricCard: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  menuContainer: {
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  menuItemText: {
    flex: 1,
    marginLeft: 16,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#fff',
  },
  navItem: {
    padding: 8,
  },
})

