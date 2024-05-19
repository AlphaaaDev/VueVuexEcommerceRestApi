<template>
    <div class="container-fluid d-flex flex-row flex-wrap justify-content-center" style="gap: 30px;">
        <template v-if="this.getOrders.length > 0">
            <div v-for="(order, index) in this.getOrders"
                :key="index"
                :id="order.id">
                <router-link :to="`/users/orders/${order.id}`">
                    <div class="card" style="width: 250px">
                        <div class="card-body">
                            <h4 class="card-title">{{ order.created_at }}</h4>
                            <p class="card-text">Order: {{ order.id }}</p>
                            <p class="card-text">Tracking: {{ order.tracking_number }}</p>
                        </div>
                        <div class="card-footer">
                            <p class="card-text">Status: {{ order.order_status }}</p>
                        </div>
                    </div>
                </router-link>
            </div>
        </template>
        <template v-else>
            No orders available
        </template>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import { OrderAction } from '@/store/types.actions';

    export default {
        name: 'Orders',
        props: ['orders'],
        computed: {
            ...mapGetters('orders', ['getOrders'])
        },
        methods: {
            ...mapActions('orders', { fetchOrders: OrderAction.remote.FETCH_ALL })
        },
        mounted() {
            this.fetchOrders();
        }
    }
</script>