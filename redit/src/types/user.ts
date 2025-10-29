export enum AccountStatus {
    Offline = "Offline",
    Online = "Online",
    DoNotDisturb = "DoNotDisturb",
    Idle = "Idle",
    Invisible = "Invisible"
}

export enum AccountRole {
    SuperUser = "SuperUser",
    User = "User"
}

export interface SignupRequest {
    username: string;
    name: string;
    age: number;
    email: string;
    password: string;
}

export interface SignupResponse {
    username: string;
    name: string;
    email: string;
    age: number;
    aura: number;
    bio: string;
    profilePicture: string;
    accountStatus: AccountStatus;
    role: AccountRole;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: SignupResponse;
}

export interface LogoutRequest {
    username: string;
}

export interface LogoutResponse {
    message: string;
}

export interface User {
    username: string;
    name: string;
    email: string;
    age: number;
    aura: number;
    bio: string;
    profilePicture: string;
    accountStatus: AccountStatus;
    role: AccountRole;
}