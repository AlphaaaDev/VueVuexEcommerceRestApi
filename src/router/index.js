import Vue from 'vue';
import Router from 'vue-router';
import { UsersService } from "@/services/local/users.service";

import Home from "../components/pages/Home";
import AllProducts from '../components/products/ProductList';
import ProductDetails from '../components/products/ProductDetails';
import Category from '../components/categories/Category';

import MyCart from '../components/cart/MyCart';
import Checkout from '../components/orders/Checkout';

import Settings from '../components/users/Settings';
import Orders from '../components/users/Orders';
import Addresses from '../components/users/Addresses';

import EditProducts from '../components/admin/EditProducts';
import EditCategories from '../components/admin/EditCategories';

import Login from '../components/users/Login';
import Register from '../components/users/Register';

Vue.use(Router);

let router = new Router({
    mode: 'history',
    history: true,
    hash: false,
    routes: [{
            path: '/',
            component: Home
        },
        {
            path: '/products',
            component: AllProducts
        },
        {
            path: '/products/:slug',
            component: ProductDetails,
        },
        {
            path: '/categories/:slug',
            component: Category
        },
        {
            path: '/cart',
            component: MyCart
        },
        {
            path: '/checkout',
            component: Checkout,
        },
        {
            path: '/users/settings',
            component: Settings,
            meta: {
                isAuthenticated: true
            }
        },
        {
            path: '/users/orders',
            component: Orders,
            meta: {
                isAuthenticated: true
            }
        },
        {
            path: '/users/addresses',
            component: Addresses,
            meta: {
                isAuthenticated: true
            }
        },
        {
            path: '/admin/products',
            component: EditProducts,
            meta: {
                isAuthenticated: true,
                isAdmin: true
            }
        },
        {
            path: '/admin/categories',
            component: EditCategories,
            meta: {
                isAuthenticated: true,
                isAdmin: true
            }
        },
        {
            path: '/login',
            component: Login,
            meta: {
                isAuthenticated: false
            }
        },
        {
            path: '/register',
            component: Register,
            meta: {
                isAuthenticated: false
            }
        },
        { path: '*', redirect: '/' }
    ],
});

router.beforeEach((to, from, next) => {
    const user = UsersService.getUser();
    if (to.matched.some((routeRecord) => routeRecord.meta.isAuthenticated)) {
        // User should be authenticated
        if (user == null) {
            return next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            });
        } else {
            if (to.matched.some((routeRecord2) => routeRecord2.meta.isAdmin)) {
                // Must be admin
                if (user.roles && user.roles.findIndex(r => r === 'ROLE_ADMIN') !== -1) {
                    return next();
                } else {
                    return next({
                        name: '/'
                    });
                }
            } else {
                return next();
            }
        }
    } else if (to.matched.some((routeRecord) => routeRecord.meta.isAuthenticated === false)) {
        // User should NOT be authenticated
        if (user) {
            // If he is redirect it to profile from there he should logout
            return next({
                name: 'profile'
            });
        } else {
            return next();
        }
    } else {
        return next();
    }
});

export default router;