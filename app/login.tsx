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

export default function LoginScreen() {
    const [form, setForm] = useState({
        login: '',
        password: '',
    });
    const [error, setError] = useState('');
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
                console.log("Login failed");
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
                    source={require('../assets/images/pc.png')}
                    style={styles.backgroundImage}
                />
                <Text style={styles.greeting}>Adpg</Text>
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
                <TextInput
                    style={styles.input}
                    autoCorrect={false}
                    clearButtonMode="while-editing"
                    placeholder="********"
                    placeholderTextColor="#6b7280"
                    secureTextEntry={true}
                    value={form.password}
                    onChangeText={password => setForm({ ...form, password })}
                    editable={!loading}
                />

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

                <View style={styles.footer}>
                    <TouchableOpacity>
                        <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 24,
    },
    header: {
        height: 300,
        position: 'relative',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    greeting: {
        color: '#229dc9',
        textShadowColor: 'white',
        textShadowOffset: {width: 1, height: 2},
        textShadowRadius: 20,
        fontSize: 32,
        fontWeight: 'bold',
        position: 'absolute',
        textAlign: 'left',
        bottom: 20,
        left: 20,
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
    orText: {
        color: '#666',
        textAlign: 'center',
        marginVertical: 10,
    },
    socialButton: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    socialIcon: {
        width: 24,
        height: 24,
    },
    socialButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '500',
    },
    footer: {
        marginTop: 20,
        gap: 10,
    },
    footerText: {
        color: '#000',
        textAlign: 'center',
    },
    footerLink: {
        color: '#229dc9',
    },
    forgotPassword: {
        color: '#229dc9',
        textAlign: 'center',
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
});