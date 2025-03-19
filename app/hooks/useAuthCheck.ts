import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';

export const useAuthCheck = () => {
  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !token) {
      Alert.alert(
        "Atenção",
        "Você precisa estar logado para acessar esta página.",
        [
          {
            text: "OK",
            onPress: () => router.replace("/login")
          }
        ]
      );
    }
  }, [token, loading]);

  return { token, loading };
}; 