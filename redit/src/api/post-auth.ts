import axios from "axios";
import type { GetAllPostsResponse } from "../types/post.ts";
import {getSuperUser} from "./user-auth.ts";

const API_BASE_URL = import.meta.env.VITE_LOCAL_API_BASE_URL || import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: `${API_BASE_URL}/posts`,
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

export const getAllPosts = async (): Promise<GetAllPostsResponse> => {
    const superUser = getSuperUser();
    if (!superUser) {
        throw new Error("Unauthorized: Super user access required.");
    }
    
    const response = await api.get<GetAllPostsResponse>("/");
    return response.data;
}

export default api;