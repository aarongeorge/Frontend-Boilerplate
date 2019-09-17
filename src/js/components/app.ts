import Vue from 'vue';
import router from './router';
import store from '../store';
import './loader';

export default new Vue({
    router,
    store,
    'template':

        /* html */
        `<div id="app" class="h-full">
            <transition mode="out-in"
                enter-active-class="transition-all transition-fastest ease-out"
                leave-active-class="transition-all transition-faster ease-in"
                enter-class="opacity-0"
                enter-to-class="opacity-100"
                leave-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <router-view></router-view>
            </transition>
        </div>`
});
