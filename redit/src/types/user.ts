export enum AccountStatus {
    Offline = "Offline",
    Online = "Online",
    DoNotDisturb = "DoNotDisturb",
    Idle = "Idle",
    Invisible = "Invisible"
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
    
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: SignupResponse;
}