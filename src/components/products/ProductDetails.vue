<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <img class="card-img-top" v-if="this.getProduct.image_urls && this.getProduct.image_urls.length > 0"
                     :src="this.getProduct.image_urls && this.getProduct.image_urls.length > 0 ? `http://localhost:8080${this.getProduct.image_urls[0]}` : 'https://vuejs.org/images/logo.png'"
                     alt="">
            </div>

            <div class="col-md-6" v-if="this.getProduct && this.getProduct.slug">
                <hr/>
                <h1>{{ this.getProduct.name }}</h1>
                <hr/>
                <div v-html="this.getProduct.description"></div>
                <hr/>
                <h4>Quantity</h4>
                <input class="form-control col-md-2 mb-4" type="number" name="quantity" min="1"
                       value={this.state.quantity}
                       v-model="quantity"/>

                <h4 class="mb-4">Price: $<strong>{{ this.getProduct.price.toFixed(2) }}</strong></h4>

                <button v-if="isProductInCart" class="btn btn-danger" @click="removeFromCart">
                    Remove from cart
                </button>
                <button class="btn btn-warning mr-3" @click="addProductToCart">
                    {{ isProductInCart ? 'Update quantity' : 'Add to cart' }}
                </button>
                <router-link class="btn btn-success" to='/checkout'>
                    <i class="fa fa-shopping-cart"></i> Checkout
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import { ProductAction, CartAction } from "@/store/types.actions";

    export default {
        name: 'ProductDetails',
        data() {
            return {
                product: {},
                quantity: 1
            }
        },
        mounted() {
            this.quantity = this.$store.getters['cart/getCartItemQuantity'](this.$route.params.slug) || 1;
            this.fetchProduct(this.$route.params.slug)
        },
        computed: {
            ...mapGetters('products', ['getProduct']),
            isProductInCart: function () {
                const index = this.$store.state.cart.cartItems.findIndex(ci => {
                    if (ci.slug === this.$route.params.slug)
                        return true;
                });

                return index !== -1;
            },
            cartItemQuantity: function () {
                return this.$store.getters['cart/getCartItemQuantity'](this.$route.params.slug);
            }
        },
        watch: {
            cartItemQuantity() {
                this.quantity = this.$store.getters['cart/getCartItemQuantity'](this.$route.params.slug) || 1;
            }
        },
        methods: {
            ...mapActions('cart',
                {
                    addProduct: CartAction.ADD_PRODUCT_TO_CART,
                    removeProductFromCart: CartAction.REMOVE_FROM_CART
                }),
            ...mapActions('products', {
                fetchProduct: ProductAction.remote.FETCH_BY_SLUG
            }),
            addProductToCart() {
                this.addProduct({product: this.getProduct, quantity: parseInt(this.quantity)});
            },
            removeFromCart() {
                this.$store.dispatch(`cart/${CartAction.REMOVE_FROM_CART}`, this.getProducts)
            },
            rated(rate) {
                return `${rate * 20}%`;
            },

        },

    };
</script>

<style scoped>
    .product-box {
        width: 800px;
        height: 400px;
        margin: 50px auto;
        box-sizing: border-box;
        padding: 1.5em;
        background-color: #fff;
        border-radius: 7px;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .product-image {
        width: 300px;
    }

    .product-info {
        width: 400px;
        align-self: flex-start;
    }

    .product-title {
        font-weight: normal;
    }

    .product-price {
        font-size: 2em;
        font-weight: bolder;
    }

    .product-box button {
        width: 300px;
        margin: .3em 0;
    }
</style>
