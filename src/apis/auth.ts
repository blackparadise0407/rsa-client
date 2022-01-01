import request from './request';

const PATH = '/auth';

export interface Token {
    access_token: string;
    token_type: string;
}

export interface LoginDto {
    username: string;
    password: string;
}

export interface RegisterDto {
    username: string;
    password: string;
}

export function getCurrentUser() {
    return request<IUser>('GET', PATH);
}

export function login(data: LoginDto) {
    return request<Token>('POST', PATH + '/login', data);
}

export function register(data: RegisterDto) {
    return request<string>('POST', PATH + '/register', data);
}
