<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">E-Commerce</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Home</router-link>
                    </li>

                    <li class="nav-item">
                        <router-link class="nav-link" to="/products">Products</router-link>
                    </li>

                    <li class="nav-item" v-if="!isLoggedIn">
                        <router-link class="nav-link" to="/users/login">Login</router-link>
                    </li>
                    
                    <li class="nav-item" v-if="!isLoggedIn">
                        <router-link class="nav-link" to="/users/register">Register</router-link>
                    </li>

                    <div class="dropdown" v-if="isLoggedIn">
                        <li class="nav-item nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            Profile
                        </li>
                        <ul class="dropdown-menu">
                            <li>
                                <router-link class="dropdown-item" to="/users/settings">Settings</router-link>
                            </li>
                            <li>
                                <router-link class="dropdown-item" to="/users/addresses">Addresses</router-link>
                            </li>
                            <li>
                                <router-link class="dropdown-item" to="/users/orders">Orders</router-link>
                            </li>

                            <div v-if="isAdmin">
                            <div class="dropdown-divider"></div>
                            <li>
                                <router-link class="dropdown-item" to="/admin/products">Edit products</router-link>
                            </li>
                            <li>
                                <router-link class="dropdown-item" to="/admin/categories">Edit categories</router-link>
                            </li>
                            </div>

                            <div class="dropdown-divider"></div>
                            <li>
                                <span class="dropdown-item" @click="logoutUser">Logout</span>
                            </li>
                        </ul>
                    </div>

                    <li>
                        <button class="btn btn-success navbar-btn btn-small" @click="this.togglePopupCart">
                            <span class="badge">{{ numItems }} Items ({{ getTotalPrice.toFixed(2) }} $)</span>
                            <i class="fa fa-shopping-cart"></i>
                        </button>
                        <transition name="appear">
                            <popupcart class="cart" v-if="shouldShowCartDialog"/>
                        </transition>
                    </li>

                </ul>
            </div>
        </div>
    </nav>

</template>

<script>

    import {mapActions, mapGetters} from 'vuex';
    import popupcart from '../shared/PopupCart';
    import {AuthAction, NotificationAction} from "@/store/types.actions";

    export default {
        name: "Header",
        components: {
            popupcart
        },
        computed: {
            ...mapGetters('auth', ['isLoggedIn', 'isAdmin', 'currentUser']),
            ...mapGetters('cart', ['getTotalPrice', 'getProductsInCart']),
            ...mapGetters('notifications', [
                'shouldShowCartDialog',
            ]),
            numItems() {
                return this.getProductsInCart.reduce((total, item) => {
                    total += item.quantity;
                    return total
                }, 0);
            },
            userEmail() {
                return this.isLoggedIn ? this.currentUser.username : ''
            }
        },
        methods: {
            ...mapActions('auth', {logout: AuthAction.local.LOGOUT}),
            ...mapActions('notifications', {togglePopupCart: NotificationAction.TOGGLE_POPUP_CART}),
            hasProduct() {
                return this.getProductsInCart.length > 0;
            },
            logoutUser() {
                this.logout().then(() => {
                    if (this.$router.currentRoute.matched.some((route) => route.meta.isAuthenticated)) 
                        this.$router.push('/');
                });
            }
        }
    }
</script>

<style scoped>

</style>
