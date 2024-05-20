<template>
    <div class="container">
        <table id="cart" class="table table-hover table-condensed">
            <thead>
            <tr>
                <th style="width: 70%" colspan="2">Product</th>
                <th style="width: 10%">Price</th>
                <th style="width: 8%">Quantity</th>
                <th style="width: 22%" class="text-center">Subtotal</th>
            </tr>
            </thead>
            <tbody>

            <tr v-for="(cartItem, index) in getOrderProducts" :key="index" style="vertical-align:middle;">
                <td>
                    <img :src="cartItem.image_urls && cartItem.image_urls.length > 0 ? `http://localhost:8080${cartItem.image_urls[0]}` : 'https://vuejs.org/images/logo.png'"
                        :alt="cartItem.name + ' Image'"
                        class="checkout-image"/>         
                </td>
                <td>
                    <h4>{{cartItem.name}}</h4>
                </td>
                <td data-th="Price">${{cartItem.price}}</td>
                <td data-th="Quantity">{{ cartItem.quantity }}</td>
                <td data-th="Subtotal" class="text-center">{{calculateSubtotal(cartItem)}}$</td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
                <td colspan="4" class="hidden-xs"></td>
                <td class="hidden-xs text-center"><strong>Total {{totalPrice()}}</strong>
                </td>
            </tr>
            </tfoot>
        </table>
    </div>

</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import {OrderAction} from "@/store/types.actions";

    export default {
        name: 'OrderDetails',
        computed: {
            ...mapGetters('orders', [
                'getOrderProducts',
            ]),
        },
        mounted() {
            this.fetchProducts(this.$route.params.id);
        },
        methods: {
            ...mapActions('orders',
                {
                    fetchProducts: OrderAction.remote.FETCH_BY_ID,
                }),
            totalPrice() {
                var price = this.getOrderProducts.reduce((accumulator, cartItem) =>
                    accumulator + cartItem.quantity * cartItem.price, 0);
                if (price)
                    return price.toFixed(2);
                else {
                    // this may occur when you delete all cart items
                    return 0
                }

            },

            calculateSubtotal(cartItem) {
                const price = (cartItem.price * cartItem.quantity);
                if (price)
                    return price.toFixed(2);
                else {
                    // this may occur when you delete all cart items
                    return 0
                }
            }
        },
    };
</script>

<style scoped>
    .checkout-box {
        width: 100%;
        max-width: 900px;
        display: flex;
        flex-direction: column;
        margin: 50px auto;
        box-sizing: border-box;
        padding: 1em;
    }

    .checkout-list {
        padding: 0;
    }

    .checkout-product {
        display: grid;
        grid-template-columns: 1fr 3fr 2fr .5fr;
        background-color: #fff;
        box-shadow: 0px 0px 10px rgba(73, 74, 78, 0.1);
        border-radius: 5px;
        list-style: none;
        box-sizing: border-box;
        padding: .8em;
        margin: 1em 0;
    }

    .checkout-product * {
        place-self: center;
    }

    .remove-product {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        border: 0;
        background-color: #E0E0E0;
        color: #fff;
        cursor: pointer;
    }

    .remove-product:hover {
        background-color: #e02820;
    }

    .checkout-image {
        object-fit: contain;
        height: 150px;
        width: 150px;
    }

</style>
