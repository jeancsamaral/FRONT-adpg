import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { TextInput } from 'react-native-gesture-handler';

export default function ClienteFormScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const isEditing = params.isEditing === 'true';

  const [formData, setFormData] = useState({
    codigo: params.codigo || '',
    razaoSocial: params.razaoSocial || '',
    cidade: params.cidade || '',
    uf: params.uf || '',
    telefone: params.telefone || '',
    contato: params.contato || '',
    email: params.email || '',
    cnpj: params.cnpj || '',
    inscricaoEstadual: params.inscricaoEstadual || '',
    endereco: params.endereco || '',
    bairro: params.bairro || '',
    cep: params.cep || '',
    celular: params.celular || '',
    website: params.website || '',
    observacoes: params.observacoes || '',
  });

  const handleSave = async () => {
    // Aqui você implementaria a lógica para salvar no backend
    console.log('Salvando cliente:', formData);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#229dc9', '#1a7fa3']}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>
            <MaterialCommunityIcons name="account-edit" size={32} color="#fff" />
            <ThemedText style={styles.title}>
              {isEditing ? 'Editar Cliente' : 'Novo Cliente'}
            </ThemedText>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollContainer}>
        <ThemedView style={styles.contentContainer}>
          <ThemedView style={styles.card}>
            <FormSection title="Informações Principais">
              <FormInput
                label="Razão Social"
                value={formData.razaoSocial}
                onChangeText={(text) => setFormData({...formData, razaoSocial: text})}
                placeholder="Digite a razão social"
              />
              <View style={styles.row}>
                <FormInput
                  label="CNPJ"
                  value={formData.cnpj}
                  onChangeText={(text) => setFormData({...formData, cnpj: text})}
                  placeholder="00.000.000/0000-00"
                  style={styles.flex2}
                />
                <FormInput
                  label="Inscrição Estadual"
                  value={formData.inscricaoEstadual}
                  onChangeText={(text) => setFormData({...formData, inscricaoEstadual: text})}
                  placeholder="000.000.000.000"
                  style={styles.flex2}
                />
              </View>
            </FormSection>

            <FormSection title="Endereço">
              <FormInput
                label="Logradouro"
                value={formData.endereco}
                onChangeText={(text) => setFormData({...formData, endereco: text})}
                placeholder="Digite o endereço completo"
              />
              <View style={styles.row}>
                <FormInput
                  label="Bairro"
                  value={formData.bairro}
                  onChangeText={(text) => setFormData({...formData, bairro: text})}
                  placeholder="Digite o bairro"
                  style={styles.flex2}
                />
                <FormInput
                  label="CEP"
                  value={formData.cep}
                  onChangeText={(text) => setFormData({...formData, cep: text})}
                  placeholder="00000-000"
                  style={styles.flex1}
                />
              </View>
              <View style={styles.row}>
                <FormInput
                  label="Cidade"
                  value={formData.cidade}
                  onChangeText={(text) => setFormData({...formData, cidade: text})}
                  placeholder="Digite a cidade"
                  style={styles.flex2}
                />
                <FormInput
                  label="UF"
                  value={formData.uf}
                  onChangeText={(text) => setFormData({...formData, uf: text})}
                  placeholder="UF"
                  style={styles.flex1}
                />
              </View>
            </FormSection>

            <FormSection title="Contato">
              <View style={styles.row}>
                <FormInput
                  label="Telefone"
                  value={formData.telefone}
                  onChangeText={(text) => setFormData({...formData, telefone: text})}
                  placeholder="(00) 0000-0000"
                  style={styles.flex1}
                />
                <FormInput
                  label="Celular"
                  value={formData.celular}
                  onChangeText={(text) => setFormData({...formData, celular: text})}
                  placeholder="(00) 00000-0000"
                  style={styles.flex1}
                />
              </View>
              <FormInput
                label="Contato"
                value={formData.contato}
                onChangeText={(text) => setFormData({...formData, contato: text})}
                placeholder="Nome do contato"
              />
              <FormInput
                label="E-mail"
                value={formData.email}
                onChangeText={(text) => setFormData({...formData, email: text})}
                placeholder="email@exemplo.com"
              />
              <FormInput
                label="Website"
                value={formData.website}
                onChangeText={(text) => setFormData({...formData, website: text})}
                placeholder="www.exemplo.com.br"
              />
            </FormSection>

            <FormSection title="Observações">
              <FormInput
                label="Observações"
                value={formData.observacoes}
                onChangeText={(text) => setFormData({...formData, observacoes: text})}
                placeholder="Digite observações adicionais"
                multiline
                numberOfLines={4}
                style={styles.textArea}
              />
            </FormSection>

            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.button, styles.cancelButton]}
                onPress={() => router.back()}
              >
                <ThemedText style={styles.buttonText}>Cancelar</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, styles.saveButton]}
                onPress={handleSave}
              >
                <ThemedText style={styles.buttonText}>Salvar</ThemedText>
              </TouchableOpacity>
            </View>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const FormSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <View style={styles.section}>
    <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
    <View style={styles.sectionContent}>{children}</View>
  </View>
);

const FormInput = ({ 
  label, 
  value, 
  onChangeText, 
  placeholder,
  style,
  multiline,
  numberOfLines
}: { 
  label: string, 
  value: string, 
  onChangeText: (text: string) => void,
  placeholder?: string,
  style?: any,
  multiline?: boolean,
  numberOfLines?: number
}) => (
  <View style={[styles.inputContainer, style]}>
    <ThemedText style={styles.label}>{label}</ThemedText>
    <TextInput
      style={[
        styles.input,
        multiline && { height: numberOfLines ? numberOfLines * 40 : 100, textAlignVertical: 'top' }
      ]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#999"
      multiline={multiline}
      numberOfLines={numberOfLines}
    />
  </View>
);

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
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 20,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 80,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#229dc9',
    marginBottom: 16,
  },
  sectionContent: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333',
  },
  textArea: {
    height: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 24,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#229dc9',
  },
  cancelButton: {
    backgroundColor: '#dc2626',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 