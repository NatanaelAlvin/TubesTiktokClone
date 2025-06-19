import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

fetch('/api/auth/login', {})

export async function register(username: string, email: string, password: string) {
  return axios.post(`${API_BASE_URL}/auth/register`, { username, email, password });
}

export async function login(username: string, password: string) {
  return axios.post(`${API_BASE_URL}/auth/login`, { username, password });
}