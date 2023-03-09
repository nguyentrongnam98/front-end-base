import { transformRequest } from "./base.service";
import { tokenDto } from "./dto/auth/token.dto";
import UserInfomationDto from "./dto/auth/userInfo.dto";
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from "axios";

export async function login(username: string, password: string): Promise<UserInfomationDto | undefined> {
    try {
        const data = {
            username,
            password
        }
        const [error, res] = await transformRequest<UserInfomationDto>({
            url: '/login',
            method: 'post',
            data
        })
        if (error || !res) {
            return undefined;
        }
        const userInfo = {
            id: '123',
            username: 'Nam',
            email: 'Nam123@gmail.com',
            gender: 'male',
            age: '25',
            phone: '0123456789',
        }
        return userInfo
    } catch (error) {
        return undefined
    }
}

// register service similar
// ...
//
export async function refreshToken(oldToken: string): Promise<tokenDto | undefined> {
    try {
        const data = {
            oldToken
        }
        const [error, res] = await transformRequest<tokenDto>({
            url: '/refreshToken',
            method: 'post',
            data
        })
        if (error || !res) {
            return undefined;
        }
        const response = {
            token: ''
        }
        return response
    } catch (error) {
        return undefined
    }
}

export function logout() {
    localStorage.clear();
    sessionStorage.clear();
    // clear more store bla bla ...
}

interface ITodo {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}
export function useFetchData(queryKey: string[]) {
    return useQuery({
        queryKey,
        queryFn: async () => {
            try {
                const [error, res] = await transformRequest<ITodo[]>({
                    url: '/todos',
                    method: 'get'
                })
                if (error || !res) {
                    return undefined;
                }
                return res;
            } catch (error) {
                return error
            }
        }
    })
}

export function useFetchDataDetail(todoId:number) {
    return useQuery({
        queryKey:['todoDetail',todoId],
        queryFn: async (): Promise<ITodo | undefined | AxiosResponse> => {
            try {
                const [error, res] = await transformRequest<ITodo>({
                    url: `/todos/${todoId}`,
                    method: 'get'
                })
                if (error || !res) {
                    return undefined;
                }
                return res;
            } catch (error) {
                return error as AxiosResponse
            }
        }
    })
}

export function useLogin() {
    return useMutation(async (account) => {
       try {
        const [error, res] = await transformRequest<UserInfomationDto>({
            url: '/login',
            method: 'post',
            data:account
        })
        if (error || !res) {
            return undefined;
        }
        return res
       } catch (err) {
        const error = err as AxiosResponse;
        throw error.data;
       }
    })
}
