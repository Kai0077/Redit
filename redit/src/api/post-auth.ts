import axios from "axios";
import type { CreatePostResponse, GetAllPostsResponse, PostCreateDTO, Post } from "../types/post";
import { getSuperUser } from "./user-auth";

const API_BASE_URL =
    import.meta.env.VITE_LOCAL_API_BASE_URL || import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: `${API_BASE_URL}/posts`, // <-- include /api
    headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// GET /api/posts (super_user only)
export const getAllPosts = async (): Promise<GetAllPostsResponse> => {
    const superUser = getSuperUser();
    if (!superUser) throw new Error("Unauthorized: Super user access required.");
    const { data } = await api.get<GetAllPostsResponse>("/");
    return data;
};

// POST /api/posts  (create)
export const createPost = async (dto: PostCreateDTO): Promise<CreatePostResponse> => {
    // dto should be { title, descriptionHtml }
    const { data } = await api.post<CreatePostResponse>("/", dto);
    return data;
};

// GET /api/posts/user  (current user's posts)
export const getMyPosts = async (): Promise<Post[]> => {
    const { data } = await api.get<Post[]>("/user");
    return data;
};

export default api;
