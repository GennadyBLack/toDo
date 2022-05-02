import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";
import {isLoged, setCurrentUser} from "@/store/me";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {requiresAuth: false},
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/About.vue"),
        meta: {requiresAuth: false},
    },
    {
        path: "/test",
        name: "Test",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/Test.vue"),
        meta: {requiresAuth: false},
    },
    {
        path: "/register",
        name: "Register",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/Auth/Register.vue"),
        meta: {mustBeUnAuth: true},
    },
    {
        path: "/login",
        name: "Login",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/Auth/Login.vue"),
        meta: {mustBeUnAuth: true},
    },
    {
        path: "/todos/",
        name: "TodoList",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/Todos/TodoList"),
        meta: {requiresAuth: true},
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach(async (to, from, next) => {
    try {
        console.log(isLoged.value, "isLoged")
        if (to.meta.requiresAuth && isLoged.value) {
            console.log("go to next or Next")
            next();
        } else if (to.meta.mustBeUnAuth && !isLoged.value) {
            console.log("go to TodoList or Next")
            await setCurrentUser()
            isLoged.value ? next({name: "TodoList"}) : next();
        } else if (to.meta.mustBeUnAuth && isLoged.value) {
            console.log("go to Todo right now")
            next({name: "TodoList"})
        } else if (to.meta.requiresAuth && !isLoged.value) {
            console.log("go to Login right now")
            await setCurrentUser()
            isLoged.value ? next() : next({name: "Login"});
        } else {
            console.log("go to next right now")
            next();
        }
    } catch (error) {
        console.log(error);
    }
});

export default router;
