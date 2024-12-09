import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import { useAuth } from './context/AuthContext';

export default function LoginScreen() {
    const [form, setForm] = useState({
        login: '',
        password: '',
    });
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleLogin = async () => {
        const success = await login(form.login, form.password);
        
        if (success) {
            setError('');
            router.replace('/(tabs)');
        } else {
            setError('Login ou senha inválidos');
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
                />

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <TouchableOpacity style={styles.continueButton} onPress={handleLogin}>
                    <Text style={styles.continueButtonText}>Entrar</Text>
                </TouchableOpacity>

                <Text style={styles.orText}>ou</Text>

                <TouchableOpacity style={styles.socialButton}>
                    <Image
                        source={{ uri: 'https://cdn.cdnlogo.com/logos/f/91/facebook-icon.svg' }}
                        style={styles.socialIcon}
                    />
                    <Text style={styles.socialButtonText}>Continue com Facebook</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.socialButton}>
                    <Image
                        source={{ uri: 'https://cdn.cdnlogo.com/logos/g/35/google-icon.svg' }}
                        style={styles.socialIcon}
                    />
                    <Text style={styles.socialButtonText}>Continue com Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.socialButton}>
                    <Image
                        source={{ uri: 'https://cdn.cdnlogo.com/logos/a/12/apple.svg' }}
                        style={styles.socialIcon}
                    />
                    <Text style={styles.socialButtonText}>Continue com Apple</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Não possui uma conta?{' '}
                        <Text style={styles.footerLink}>Registrar</Text>
                    </Text>
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
});