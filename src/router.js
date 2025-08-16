import {createRouter, createWebHistory} from 'vue-router';
import HomePage from './HomePage.vue';
import {authenticationManager} from "./authentication.js";
import Login from "./Login.vue";
import Signup from "./Signup.vue";
import VerifyPin from "@/VerifyPin.vue";
import Private from "@/Private.vue";



const routes = [
    {path: '/', component: HomePage, name: 'home'},
    {path: '/private', component: Private, name: 'private', meta: {requiresAuth: true}},
    {path: '/login', component: Login, name: 'login'},
    {path: '/signup', component: Signup, name: 'signup'},
    {path: '/verify-pin', component: VerifyPin, name: 'verify-pin'},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

authenticationManager.init(router);

export default router;
