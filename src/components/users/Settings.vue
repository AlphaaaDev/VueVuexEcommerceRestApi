<template>
    <div class="container-fluid">
        <h1><b>Settings</b></h1>

        <h3>Username <button type="button" class="btn btn-link" data-bs-toggle="modal" data-bs-target="#editUsername"><span class="bi bi-pencil"></span></button></h3>
        <h5>{{ this.currentUser.username }}</h5>


        <h3>First name <button type="button" class="btn btn-link" data-bs-toggle="modal" data-bs-target="#editFirstName"><span class="bi bi-pencil"></span></button></h3>
        <h5>{{ this.currentUser.first_name }}</h5>

        <h3>Last name <button type="button" class="btn btn-link" data-bs-toggle="modal" data-bs-target="#editLastName"><span class="bi bi-pencil"></span></button></h3>
        <h5>{{ this.currentUser.last_name }}</h5>

        <h3>Email <button type="button" class="btn btn-link" data-bs-toggle="modal" data-bs-target="#editEmail"><span class="bi bi-pencil"></span></button></h3>
        <h5>{{ this.currentUser.email }}</h5>

        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editPassword">
            Change password
        </button>

        <form v-on:submit.prevent class="modal fade" id="editUsername" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">Edit username</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <input type="text" class="form-control" required name="username" v-model="user.username"/>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary" v-on:click="editUsername()">Save changes</button>
                    </div>
                </div>
            </div>
        </form>

        <form v-on:submit.prevent class="modal fade" id="editFirstName" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">Edit first name</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <input type="text" class="form-control" required name="first_name" v-model="user.first_name"/>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary" v-on:click="editFirstName()">Save changes</button>
                    </div>
                </div>
            </div>
        </form>

        <form v-on:submit.prevent class="modal fade" id="editLastName" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">Edit last name</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <input type="text" class="form-control" required name="last_name" v-model="user.last_name"/>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary" v-on:click="editLastName()">Save changes</button>
                    </div>
                </div>
            </div>
        </form>

        <form v-on:submit.prevent class="modal fade" id="editEmail" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">Edit email</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <input type="email" class="form-control" required name="email" v-model="user.email"/>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary" v-on:click="editEmail()">Save changes</button>
                    </div>
                </div>
            </div>
        </form>

        <form v-on:submit.prevent class="modal fade" id="editPassword" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">Edit password</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <input type="password" class="form-control" required name="password" v-model="user.password"/>
                        <input type="password" class="form-control" required name="password_confirmation" v-model="user.password_confirmation"/>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary" v-on:click="editPassword()">Save changes</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import { SettingsAction } from '@/store/types.actions';

    export default {
        name: 'Settings',
        props: ['settings'],
        computed: {
            ...mapGetters('auth', ['currentUser'])
        },
        methods: {
            ...mapActions('settings', { updateField: SettingsAction.remote.UPDATE_FIELD }),

            editUsername() { this.editField({username: this.user.username}) },
            editFirstName() { this.editField({first_name: this.user.first_name}) },
            editLastName() { this.editField({last_name: this.user.last_name}) },
            editEmail() { this.editField({email: this.user.email}) },
            editPassword() { this.editField({password: this.user.password, password_confirmation: this.user.password_confirmation}) },

            editField(data) {
                this.updateField(data).then(res => {
                    this.$router.go();
                }).catch(err => {
                    console.error(err);
                });
            }
        },
        data() {
            return {
                user: {
                    username: '', first_name: '', last_name: '', email: '', password: '', password_confirmation: ''
                }
            }
        }
    }
</script>