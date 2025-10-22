import axios from "axios";
import type {CreatePostResponse, GetAllPostsResponse, PostCreateDTO, Post} from "../types/post.ts";
import {getCurrentUser, getSuperUser} from "./user-auth.ts";

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

export const createPost = async (dto: PostCreateDTO): Promise<CreatePostResponse> => {
    const { data } = await api.post<CreatePostResponse>("/", dto);
    return data;
};

export const getMyPosts = async (): Promise<Post[]> => {
    const { data } = await api.get<Post[]>("/user"); // hits GET /api/posts/user
    return data;
};

export const deletePost = async (id: number): Promise<void> => {
    const user = getCurrentUser();
    if (!user) {
       throw new Error("Unauthorized: You are not allowed to perform this action.");
    }
    
    await api.delete(`/${id}`);
}

export default api;
