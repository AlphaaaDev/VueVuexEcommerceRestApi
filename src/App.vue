<template>
    <div>
        <app-header></app-header>
        <app-notifications></app-notifications>
        <div class="container-fluid">
            <transition name="fade">
                <router-view></router-view>
            </transition>
            <div class="darken-background" v-if="shouldShowCartDialog" @click="this.togglePopupCart"/>
        </div>
        <app-footer></app-footer>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import {NotificationAction} from "@/store/types.actions";

    import popupcart from './components/shared/PopupCart';

    import Notifications from "@/components/shared/Notifications";
    import Header from "@/components/shared/Header";
    import Footer from "@/components/shared/Footer";
    import GridLoader from 'vue-spinner/src/GridLoader.vue';

    export default {
        components: {
            appNotifications: Notifications,
            appHeader: Header,
            appFooter: Footer,

            popupcart,
            GridLoader,
        },

        data() {
            return {
                loaderColor: "#5cb85c",
                loaderSize: "50px",
                displayList: false
            }
        },

        methods: {
            ...mapActions('notifications', {togglePopupCart: NotificationAction.TOGGLE_POPUP_CART}),
            hasProduct() {
                return this.getProductsInCart.length > 0;
            },
        },
        computed: {
            ...mapGetters('cart', [
                'getProductsInCart',
            ]),
            ...mapGetters('notifications', [
                'shouldShowCartDialog'
            ])
        },
    };
</script>

<style>
    @import './assets/css/normalize.css';
    @import '~font-awesome/css/font-awesome.min.css';
    @import '~bootstrap/dist/css/bootstrap.min.css';
    @import '~bootstrap-icons/font/bootstrap-icons.css';

    body {
        font-family: 'Roboto', sans-serif;
        background-color: #FAFAFA;
    }

    a {
        color: #000;
        text-decoration: none;
    }

    .cart {
        position: absolute;
        top: 75px;
        right: 300px;
    }

    .leave-enter-active, .leave-leave-active {
        transition: all 1.2s;
    }

    .leave-enter, .leave-leave-to {
        opacity: 0;
        transform: translateX(-50%);
    }

    .appear-enter-active {
        animation: appear-animation .5s;
    }

    .appear-leave-active {
        animation: appear-animation .5s reverse;
    }

    @keyframes appear-animation {
        0% {
            transform: translateY(-50%);
            opacity: 0;
        }
        100% {
            transform: translateY(0%);
            opacity: 1;
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }


    /* Sticky footer styles
    -------------------------------------------------- */
    html {
        position: relative;
        min-height: 100%;
    }

    body {
        /* Margin bottom by footer height */
        margin-bottom: 60px;
        padding-top: 100px;
    }

    .footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        /* Set the fixed height of the footer here */
        height: 60px;
        line-height: 60px; /* Vertically center the text there */
        background-color: #f5f5f5;
    }

    /* Custom page CSS
    -------------------------------------------------- */
    /* Not required for template or sticky footer method. */

    body > .container {
        padding: 60px 15px 0;
    }

    .footer > .container {
        padding-right: 15px;
        padding-left: 15px;
    }

    code {
        font-size: 80%;
    }

    .darken-background {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.5);
    }

</style>
