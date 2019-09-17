import store from '../store';
import NProgress from 'nprogress';

NProgress.configure({
    'easing': 'ease',
    'showSpinner': false,
    'speed': 500
});

store.watch(state =>
    state.loader.loading,
    (newVal, oldVal) => {
    if (newVal === 0) { return NProgress.done(); }
    if (oldVal === 0) { return NProgress.start(); }
    NProgress.set(1 / Math.max(oldVal, newVal));
});
