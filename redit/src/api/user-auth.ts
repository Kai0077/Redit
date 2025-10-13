import axios from "axios";
import type {
    SignupRequest,
    SignupResponse,
    LoginRequest,
    LoginResponse
} from "../types/user.ts";

const API_BASE_URL = import.meta.env.VITE_LOCAL_API_BASE_URL || import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: `${API_BASE_URL}/auth`,
    headers: { 
        "Content-Type": "application/json", 
    },
});

export const signup = async (data: SignupRequest): Promise<SignupResponse> => {
    const response = await api.post<SignupResponse>("/signup", data);
    return response.data;
};

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/login", data);
    return response.data;
};

export default api;