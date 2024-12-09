export interface User {
  id: number;
  codusr: number;
  nome: string;
  supervisor: string;
  inativo: string;
  codven?: string;
  codger?: string;
  coddir?: string;
  excluido: string;
  registro: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiError {
  error: string;
  details?: string;
} 