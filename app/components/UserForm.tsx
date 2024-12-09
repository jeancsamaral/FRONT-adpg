import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { User } from '../types';
import { TouchableOpacity } from 'react-native';
interface UserFormProps {
  user?: User;
  onSubmit: (userData: Partial<User>) => Promise<void>;
  onCancel: () => void;
}

export function UserForm({ user, onSubmit, onCancel }: UserFormProps) {
  const [formData, setFormData] = useState<Partial<User>>({
    nome: '',
    supervisor: '',
    inativo: 'N',
    ...user,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={formData.nome}
        onChangeText={(text) => setFormData({ ...formData, nome: text })}
        placeholder="Nome"
      />
      <TextInput
        style={styles.input}
        value={formData.supervisor}
        onChangeText={(text) => setFormData({ ...formData, supervisor: text })}
        placeholder="Supervisor"
      />
      {/* Adicione mais campos conforme necessário */}
      
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
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    padding: 12,
    borderRadius: 4,
    flex: 1,
    marginHorizontal: 4,
  },
  submitButton: {
    backgroundColor: '#075eec',
  },
  cancelButton: {
    backgroundColor: '#dc2626',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
}); 