import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [{
        path: '/',
        name: 'Index',
        component: () =>
            import ('../components/HelloWorld.vue')
    },
    {
        path: '/Test',
        name: 'test',
        component: () =>
            import ('../components/test.vue')
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;