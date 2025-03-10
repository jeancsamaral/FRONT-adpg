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
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const quickActions = [
    { icon: 'account-group', title: 'Clientes', count: '143', route: '/(tabs)/clientes' },
    { icon: 'chart-line', title: 'Estoque', count: '32', route: '/(tabs)/estoque' },
    { icon: 'cash-multiple', title: 'Preços', route: '/(tabs)/precos', count: '10' },
    { icon: 'file-document', title: 'Documentos', route: '/(tabs)/arquivos', count: '25' },
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
    width: '100%',
    paddingHorizontal: 16,
    gap: 10,
    marginTop: -30,
  },
  statCard: {
    width: '100%',
    marginBottom: 8,
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