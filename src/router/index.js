import { createRouter, createWebHashHistory } from 'vue-router';
import Comics from '../views/Comics/index.vue';
import ComicDetail from '../views/ComicDetail/index.vue';
import ComicChapter from '../views/ComicChapter/index.vue';

const routes = [
    {
        path: '/comics',
        name: 'Comics',
        component: Comics
    },
    {
        path: '/comics/:id',
        name: 'ComicDetail',
        component: ComicDetail
    },
    {
        path: '/comics/:id/chapter/:cid',
        name: 'ComicChapter',
        component: ComicChapter
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/comics'
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
