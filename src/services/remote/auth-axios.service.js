import { AxiosService } from "@/services/remote/base/axios.service";

export const AuthAxiosService = {
    login(loginDto) {
        return AxiosService.post('/users/login', loginDto);
    },

    register(user) {
        return AxiosService.post('/users', user);
    }
};