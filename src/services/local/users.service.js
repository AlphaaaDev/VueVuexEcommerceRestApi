import { AxiosService } from "@/services/remote/base/axios.service";
import { AuthAxiosService } from "@/services/remote/auth-axios.service";
import { JwtService } from "@/services/local/jwt.service";

export const UsersService = {
    login(loginDto) {
        return AuthAxiosService.login(loginDto)
    },

    register(userObject) {
        return AuthAxiosService.register(userObject);
    },

    init() {
        const user = JwtService.getUser();
        if (user && user.username) {
            AxiosService.setUser(user);
        }
    },

    getUser() {
        return JwtService.getUser();
    }
}