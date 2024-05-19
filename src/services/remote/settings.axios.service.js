import { AxiosService } from "./base/axios.service";

export const SettingsAxiosService = {
    fetchUser() {
        return AxiosService.get(`/users`);
    },

    updateField(data) {
        return AxiosService.patch(`/users`, data);
    }
}