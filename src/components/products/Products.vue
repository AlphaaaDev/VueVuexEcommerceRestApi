<template>
    <div class="container-fluid d-flex flex-row flex-wrap justify-content-center" style="gap: 30px;">
        <template v-if="this.getProducts.length > 0">
            <div v-for="(product, index) in this.getProducts"
                :key="index"
                :id="product.id">
                <router-link :to="`/products/${product.slug}`">
                    <div class="card" style="width: 250px;">
                        <img class="card-img-top d-block" style="height: 250px; object-fit: contain;"
                            :src="product.image_urls && product.image_urls.length > 0 ? `http://localhost:8080${product.image_urls[0]}` : 'https://vuejs.org/images/logo.png'"
                            alt=""/>
                        <div class="card-body">
                            <h4 class="card-title">{{ product.name }}</h4>
                        </div>
                        <div class="card-footer">
                            <p>Price: <b>{{ product.price }} $</b></p>
                            <p>Stock: <b>{{ product.stock }}</b></p>
                        </div>
                    </div>
                </router-link>
            </div>
        </template>
        <template v-else>
            No products available
        </template>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from "vuex";
    import { ProductAction } from "@/store/types.actions";

    export default {
        name: 'Products',
        computed: {
            ...mapGetters("products", ['getProducts']),
        },
        props: ['products'],
        mounted() {
            this.fetchProducts();
        },
        methods: {
            ...mapActions('cart', [
                'addProduct',
                'currentProduct',
            ]),
            ...mapActions('products', { fetchProducts: ProductAction.remote.FETCH_ALL }),

            addProductToCart(product) {
                this.addProduct({product, quantity: 1});
            }
        }
    };
</script>
