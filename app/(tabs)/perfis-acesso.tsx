import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface Permission {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

interface PermissionGroup {
  name: string;
  permissions: Permission[];
}

export default function AccessProfilesScreen() {
  const router = useRouter();
  const [permissionGroups, setPermissionGroups] = useState<PermissionGroup[]>([
    {
      name: 'Clientes',
      permissions: [
        { id: 'client_view', name: 'Visualizar', description: 'Ver lista de clientes', enabled: true },
        { id: 'client_create', name: 'Criar', description: 'Adicionar novos clientes', enabled: true },
        { id: 'client_edit', name: 'Editar', description: 'Modificar dados de clientes', enabled: false },
        { id: 'client_delete', name: 'Excluir', description: 'Remover clientes', enabled: false },
      ],
    },
    {
      name: 'Produtos',
      permissions: [
        { id: 'product_view', name: 'Visualizar', description: 'Ver lista de produtos', enabled: true },
        { id: 'product_create', name: 'Criar', description: 'Adicionar novos produtos', enabled: true },
        { id: 'product_edit', name: 'Editar', description: 'Modificar dados de produtos', enabled: false },
        { id: 'product_delete', name: 'Excluir', description: 'Remover produtos', enabled: false },
      ],
    },
  ]);

  const togglePermission = (groupIndex: number, permissionId: string) => {
    const newGroups = [...permissionGroups];
    const group = newGroups[groupIndex];
    const permission = group.permissions.find(p => p.id === permissionId);
    if (permission) {
      permission.enabled = !permission.enabled;
    }
    setPermissionGroups(newGroups);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#229dc9', '#1a7fa3']}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Perfis de Acesso</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        {permissionGroups.map((group, groupIndex) => (
          <View key={group.name} style={styles.group}>
            <Text style={styles.groupTitle}>{group.name}</Text>
            {group.permissions.map((permission) => (
              <View key={permission.id} style={styles.permissionItem}>
                <View style={styles.permissionInfo}>
                  <Text style={styles.permissionName}>{permission.name}</Text>
                  <Text style={styles.permissionDescription}>
                    {permission.description}
                  </Text>
                </View>
                <Switch
                  value={permission.enabled}
                  onValueChange={() => togglePermission(groupIndex, permission.id)}
                  trackColor={{ false: '#ddd', true: '#229dc9' }}
                  thumbColor={permission.enabled ? '#fff' : '#f4f3f4'}
                />
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={() => router.back()}>
          <Text style={styles.saveButtonText}>Salvar Alterações</Text>
        </TouchableOpacity>
      </View>
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
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  group: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  permissionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  permissionInfo: {
    flex: 1,
    marginRight: 15,
  },
  permissionName: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  permissionDescription: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  saveButton: {
    backgroundColor: '#229dc9',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 