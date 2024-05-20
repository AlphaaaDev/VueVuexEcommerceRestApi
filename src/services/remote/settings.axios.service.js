import { AxiosService } from "./base/axios.service";

export const SettingsAxiosService = {
    updateField(data) {
        return AxiosService.patch(`/users`, data);
    }
}