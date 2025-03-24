import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    SafeAreaView,
    ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { useAuth } from './context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
    const [form, setForm] = useState({
        login: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login, loading } = useAuth();

    const handleLogin = async () => {
        if (!form.login || !form.password) {
            setError('Por favor, preencha todos os campos');
            return;
        }

        try {
            const success = await login(form);
            
            if (success) {
                setError('');
                router.replace('/(tabs)');
            } else {
                setError('Login ou senha inválidos');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Erro ao fazer login. Tente novamente.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../assets/images/LogoADPG.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.form}>
                <Text style={styles.formTitle}>Seja bem-vindo!</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Login"
                    placeholderTextColor="#666"
                    autoCapitalize="none"
                    value={form.login}
                    onChangeText={login => setForm({ ...form, login })}
                    editable={!loading}
                />
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={[styles.input, styles.passwordInput]}
                        autoCorrect={false}
                        clearButtonMode="while-editing"
                        placeholder="********"
                        placeholderTextColor="#6b7280"
                        secureTextEntry={!showPassword}
                        value={form.password}
                        onChangeText={password => setForm({ ...form, password })}
                        editable={!loading}
                    />
                    <TouchableOpacity 
                        style={styles.eyeIcon}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Ionicons 
                            name={showPassword ? "eye-off-outline" : "eye-outline"} 
                            size={24} 
                            color="#666" 
                        />
                    </TouchableOpacity>
                </View>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <TouchableOpacity 
                    style={[styles.continueButton, loading && styles.disabledButton]} 
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.continueButtonText}>Entrar</Text>
                    )}
                </TouchableOpacity>

                {/* <View style={styles.footer}>
                    <TouchableOpacity>
                        <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
                    </TouchableOpacity>
                </View> */}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    logo: {
        width: 200,
        height: 200,
    },
    form: {
        flex: 1,
        padding: 20,
        gap: 15,
    },
    formTitle: {
        color: 'grey',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        fontSize: 16,
    },
    errorText: {
        color: '#FF0000',
        textAlign: 'center',
    },
    continueButton: {
        backgroundColor: '#229dc9',
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    footer: {
        marginTop: 20,
        gap: 10,
    },
    forgotPassword: {
        color: '#229dc9',
        textAlign: 'center',
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    passwordContainer: {
        position: 'relative',
    },
    passwordInput: {
        paddingRight: 50,
    },
    eyeIcon: {
        position: 'absolute',
        right: 15,
        top: '50%',
        transform: [{ translateY: -12 }],
    },
});