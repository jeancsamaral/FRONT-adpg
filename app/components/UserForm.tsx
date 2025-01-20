import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';
import { User } from '../types';

interface UserFormProps {
  user?: User;
  onSubmit: (userData: Partial<User>) => Promise<void>;
  onCancel: () => void;
}

export function UserForm({ user, onSubmit, onCancel }: UserFormProps) {
  const [formData, setFormData] = useState<Partial<User>>({
    nome: user?.nome || '',
    login: user?.login || '',
    senha: '',
    supervisor: user?.supervisor || '',
    inativo: user?.inativo || 'N',
  });

  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <ThemedText style={styles.label}>Nome completo</ThemedText>
        <TextInput
          style={styles.input}
          value={formData.nome}
          onChangeText={(text) => setFormData({ ...formData, nome: text })}
          placeholder="Digite o nome do usuário"
          placeholderTextColor="#666"
        />
      </View>

      <View style={styles.inputGroup}>
        <ThemedText style={styles.label}>Login</ThemedText>
        <TextInput
          style={styles.input}
          value={formData.login}
          onChangeText={(text) => setFormData({ ...formData, login: text })}
          placeholder="Digite o login"
          placeholderTextColor="#666"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputGroup}>
        <ThemedText style={styles.label}>Senha</ThemedText>
        <TextInput
          style={styles.input}
          value={formData.senha}
          onChangeText={(text) => setFormData({ ...formData, senha: text })}
          placeholder="Digite a senha"
          placeholderTextColor="#666"
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.submitButton]}
          onPress={() => onSubmit(formData)}
        >
          <ThemedText style={styles.buttonText}>
            {user ? 'Atualizar' : 'Criar'}
          </ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.cancelButton]}
          onPress={onCancel}
        >
          <ThemedText style={styles.buttonText}>Cancelar</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#229dc9',
  },
  cancelButton: {
    backgroundColor: '#dc2626',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 