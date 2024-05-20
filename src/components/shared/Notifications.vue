<template>
</template>

<script>
    import { mapMutations } from 'vuex';
    import { NotificationAction } from "../../store/types.actions";

    export default {
        name: "Notifications",
        methods: {
            ...mapMutations('notifications', { clearDialog: NotificationAction.CLEAR_ALERT })
        },
        computed: {
            alert() {

                return this.$store.getters['notifications/getAlert'];
            }
        },
        watch: {
            // WARNING: if you plan using this keyword, the functions should not be implemented with () =>{} but as below:
            alert: function () {
                if (this.$store.state.notifications.alert.message !== "") {
                    this.$toasted.show(this.$store.getters['notifications/getAlertMessage'], {
                        duration: 5000,
                        className: this.$store.state.notifications.alert.class_name
                    });
                    setTimeout(this.clearDialog, 3000);
                }
            }
        }
    }
</script>

<style scoped>

</style>
