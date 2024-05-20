<template>
    <div class="box">
        <span v-if="!hasProduct()">No products added yet</span>
        <div v-for="(product, index) in getProductsInCart" :key="index" class="box-item">
            <img :src="product.image_urls && product.image_urls.length > 0 ? `http://localhost:8080${product.image_urls[0]}` : 'https://img.business.com/rc/816x500/aHR0cHM6Ly93d3cuYnVzaW5lc3NuZXdzZGFpbHkuY29tL2ltYWdlcy9pLzAwMC8wMTcvMDg0L29yaWdpbmFsL21hY2Jvb2stcHJvLTE4LnBuZw==?_ga=2.200130154.557404650.1551883694-765115885.1551883694'"
                 alt="" class="item-thumb">
            <h3 class="item-name">{{ product.name }}</h3>
            <span class="item-amount">Quantity: {{product.quantity}}</span>
            <span class="item-price">{{product.quantity}} * {{ product.price }}$</span>
        </div>
        <div class="cart-info" v-if="hasProduct()">
            <span>Total: $ {{ totalPrice().toFixed(2) }}, 00</span>
            <router-link to="/cart">
                <button class="btn btn-small btn-info"
                        @click="this.togglePopupCart">
                    View cart
                </button>
            </router-link>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import {NotificationAction} from "@/store/types.actions";

    export default {

        methods: {
            ...mapActions('notifications', {togglePopupCart: NotificationAction.TOGGLE_POPUP_CART}),
            hasProduct() {
                return this.getProductsInCart.length > 0;
            },
            totalPrice() {
                return this.getProductsInCart.reduce((accumulator, cartItem) => accumulator + cartItem.quantity * cartItem.price,
                    0 /* initial value*/);
            },
        },
        computed: {
            ...mapGetters('cart', [
                'getProductsInCart',
            ]),
        },
    };
</script>

<style scoped>
    .box {
        width: 400px;
        height: auto;
        background-color: #FAFAFA;
        box-shadow: 0px 0px 10px rgba(73, 74, 78, 0.1);
        border-radius: 5px;
        box-sizing: border-box;
        padding: 1em .5em;
        position: absolute;
        z-index: 1;
    }

    .box:after {
        content: '';
        width: 30px;
        height: 30px;
        transform: rotate(45deg);
        background: inherit;
        position: absolute;
        top: -15px;
        right: 15px;
    }

    .box-item {
        width: 100%;
        height: 130px;
        background-color: #fff;
        box-sizing: border-box;
        border-radius: 3px;
        padding: 0 .5em;
        margin-top: .3em;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
    }

    .item-thumb {
        max-width: 70%;
        grid-column: 1/2;
        grid-row: 1/4;
        align-self: center;
    }

    .item-name {
        grid-column: 2/4;
        grid-row: 1/2;
        font-weight: normal;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        height: 3.6em;
        white-space: normal;
    }

    .item-amount {
        margin-top: -0.4em;
        grid-column: 2/3;
        grid-row: 2/4;
        color: #ddd;
    }

    .item-price {
        margin-top: -0.4em;
    }

    .cart-info {
        margin-top: 1em;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

</style>
