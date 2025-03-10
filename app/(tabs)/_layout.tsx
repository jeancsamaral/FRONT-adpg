import { Stack } from 'expo-router';
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRouter, usePathname } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function Layout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  const isLoginScreen = pathname === '/login';

  return (
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false }} />
      
      {!isLoginScreen && (
        <View style={styles.bottomNav}>
          <TouchableOpacity 
            style={[styles.navItem, isActive('/(tabs)') && styles.activeNavItem]}
            onPress={() => router.push('/(tabs)')}
          >
            <Ionicons 
              name="home-outline" 
              size={24} 
              color={isActive('/(tabs)') ? "#007AFF" : "#000"} 
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.navItem, isActive('/(tabs)/clientes') && styles.activeNavItem]}
            onPress={() => router.push('/(tabs)/clientes')}
          >
            <Ionicons 
              name="people-outline" 
              size={24} 
              color={isActive('/(tabs)/clientes') ? "#007AFF" : "#000"} 
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.navItem, isActive('/(tabs)/estoque') && styles.activeNavItem]}
            onPress={() => router.push('/(tabs)/estoque')}
          >
            <Ionicons 
              name="cube-outline" 
              size={24} 
              color={isActive('/(tabs)/estoque') ? "#007AFF" : "#000"} 
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.navItem, isActive('/(tabs)/precos') && styles.activeNavItem]}
            onPress={() => router.push('/(tabs)/precos')}
          >
            <Ionicons 
              name="pricetag-outline" 
              size={24} 
              color={isActive('/(tabs)/precos') ? "#007AFF" : "#000"} 
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.navItem, isActive('/(tabs)/arquivos') && styles.activeNavItem]}
            onPress={() => router.push('/(tabs)/arquivos')}
          >
            <Ionicons 
              name="folder-outline" 
              size={24} 
              color={isActive('/(tabs)/arquivos') ? "#007AFF" : "#000"} 
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.navItem, isActive('/(tabs)/perfil') && styles.activeNavItem]}
            onPress={() => router.push('/(tabs)/perfil')}
          >
            <Ionicons 
              name="settings-outline" 
              size={24} 
              color={isActive('/(tabs)/info') ? "#007AFF" : "#000"} 
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingBottom: 5,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  activeNavItem: {
    borderTopWidth: 2,
    borderTopColor: '#007AFF',
  },
});