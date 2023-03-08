import { transformRequest } from "./base.service";
import { tokenDto } from "./dto/auth/token.dto";
import UserInfomationDto from "./dto/auth/userInfo.dto";

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

export async function logout(): Promise<void> {
    localStorage.clear();
    sessionStorage.clear();
    // clear more store bla bla ...
}