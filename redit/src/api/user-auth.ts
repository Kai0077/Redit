import axios from "axios";
import {
    type SignupRequest,
    type SignupResponse,
    type LoginRequest,
    type LoginResponse, type LogoutRequest, type LogoutResponse, AccountRole, type User
} from "../types/user.ts";

const API_BASE_URL = import.meta.env.VITE_LOCAL_API_BASE_URL || import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: `${API_BASE_URL}/auth`,
    headers: { 
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const signup = async (data: SignupRequest): Promise<SignupResponse> => {
    const response = await api.post<SignupResponse>("/signup", data);
    return response.data;
};

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/login", data);
    return response.data;
};

export const getCurrentUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

export const getSuperUser = () => {
    const user = getCurrentUser();
    if (user?.role === AccountRole.SuperUser) {
        return user;
    }
    return null;
};

export const logout = async (data?: LogoutRequest): Promise<LogoutResponse | void> => {
    try {
        const response = await api.post<LogoutResponse>("/logout", data);
        return response.data;
    } finally {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.dispatchEvent(new Event("auth:changed"));
    }
};

export const getAllUsers = async (): Promise<User[]> => {
    const superUser = getSuperUser();
    if (!superUser) {
        throw new Error("Unauthorized: Super user access required.");
    }
    
    const response = await api.get<User[]>("/users");
    return response.data;
};

export default api;