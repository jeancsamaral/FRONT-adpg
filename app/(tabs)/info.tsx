import { StyleSheet } from 'react-native';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Linking } from 'react-native';

export default function InfoScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.headerMain}>
        <Ionicons name="information-circle-outline" size={35} color="#666" />
        <ThemedText style={styles.title}>Informações</ThemedText>
      </ThemedView>

      <ThemedView style={styles.infoContainer}>
        <ThemedView style={styles.infoRow}>
          <ThemedText style={styles.label}>Desenvolvido por:</ThemedText>
          <ThemedText style={styles.value}>Isaac Façanha de Carvalho</ThemedText>
        </ThemedView>

        <ThemedView style={styles.infoRow}>
          <ThemedText style={styles.label}>Formação:</ThemedText>
          <ThemedText style={styles.value}>Análise e Desenvolvimento de Sistemas (UNICAMP)</ThemedText>
        </ThemedView>

        <ThemedView style={styles.infoRow}>
          <ThemedText style={styles.label}>E-mail:</ThemedText>
          <ThemedText 
            style={[styles.value, styles.link]}
            onPress={() => Linking.openURL('mailto:isaacicarvalho@gmail.com')}
          >
            isaacicarvalho@gmail.com
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.socialContainer}>
          <Ionicons 
            name="logo-linkedin" 
            size={24} 
            color="#0077B5"
            onPress={() => Linking.openURL('https://linkedin.com/in/isaac-carvalho')}
            style={styles.socialIcon}
          />
          <Ionicons 
            name="logo-facebook" 
            size={24} 
            color="#4267B2"
            onPress={() => Linking.openURL('https://facebook.com/isaac.carvalho')}
            style={styles.socialIcon}
          />
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 0,
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
    marginTop: 10,
    paddingRight: 20,
    flexWrap: 'wrap',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
  },

  infoContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    padding: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },

  infoRow: {
    marginBottom: 16,
    backgroundColor:'#f5f5f5'
  },

  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },

  value: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },

  link: {
    color: '#0a7ea4',
    textDecorationLine: 'underline',
  },

  socialContainer: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 16,
    backgroundColor:'#f5f5f5'
  },

  socialIcon: {
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
}); 