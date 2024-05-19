<template>
    <div class="container-fluid d-flex flex-row flex-wrap justify-content-center" style="gap: 30px;">
        <template v-if="this.getAddresses.length > 0">
            <div v-for="(address, index) in this.getAddresses"
                :key="index"
                :id="address.id">
                <div class="card" style="width: 250px">
                    <div class="card-body">
                        <p class="card-text">First name: {{ address.first_name }}</p>
                        <p class="card-text">Last name: {{ address.last_name }}</p>
                        <p class="card-text">Country: {{ address.country }}</p>
                        <p class="card-text">City: {{ address.city }}</p>
                        <p class="card-text">Street address: {{ address.street_address }}</p>
                        <p class="card-text">Zip code: {{ address.zip_code }}</p>
                    </div>
                    <div class="card-footer">
                        <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteAddress" @click="saveAddressId(address.id)">Delete</button>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="deleteAddress" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5">Are you sure you want to delete this address?</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-danger" @click="onDeleteAddress()">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            No addresses available
        </template>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import { AddressAction } from '@/store/types.actions';

    export default {
        name: 'Addresses',
        props: ['addresses'],
        computed: {
            ...mapGetters('addresses', ['getAddresses'])
        },
        methods: {
            ...mapActions('addresses', {
                fetchAddresses: AddressAction.remote.FETCH_ALL,
                deleteAddress: AddressAction.remote.DELETE
            }),

            saveAddressId(id) {
                this.address.id = id;
            },

            onDeleteAddress() {
                this.deleteAddress(this.address.id).then(res => {
                    this.$router.go();
                }).catch(err => {
                    console.error(err);
                });
            }
        },
        mounted() {
            this.fetchAddresses();
        },
        data() {
            return {
                address: { id: 0 }
            }
        }
    }
</script>