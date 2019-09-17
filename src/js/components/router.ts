import Vue from 'vue';
import VueRouter from 'vue-router';
import about from '../pages/about';
import homepage from '../pages/homepage';
import notFound from '../pages/not-found';
import networkIssue from '../pages/network-issue';

Vue.use(VueRouter);

const router = new VueRouter({
    'mode': 'history',
    'routes': [
        {
            'component': homepage,
            'name': 'homepage',
            'path': '/'
        },
        {
            'component': about,
            'name': 'about',
            'path': '/about'
        },
        {
            'component': notFound,
            'name': '404',
            'path': '/404',
            'props': true
        },
        {
            'component': networkIssue,
            'name': 'network-issue',
            'path': '/network-issue'
        },
        {
            'path': '*',
            'redirect': {
                'name': '404',
                'params': {'resource': 'page'}
            }
        }
    ]
});

export default router;
