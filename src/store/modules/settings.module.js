import { NotificationAction, SettingsAction } from '@/store/types.actions';
import { SettingsAxiosService } from "@/services/remote/settings.axios.service";

const actions = {
    [SettingsAction.remote.UPDATE_FIELD](context, data) {
        return new Promise((resolve, reject) => {
            return SettingsAxiosService.updateField(data).then(response => {
                context.commit(AuthAction.local.SET_USER, response.data);
                resolve(response.data);
            }).catch(err => {
                context.commit(`notifications/${NotificationAction.SHOW_DIALOG_ERROR}`, err, { root: true });
                reject(err);
            });
        })
    }
}

export const settings = {
    namespaced: true,
    actions
}