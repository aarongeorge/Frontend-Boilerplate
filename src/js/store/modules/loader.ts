export default {
    'actions': {
        FINISH_LOADING (context) {
            context.commit('FINISH_LOADING');
        },
        START_LOADING (context) {
            context.commit('START_LOADING');
        }
    },
    'getters': {'loading': state => state.loading},
    'mutations': {
        FINISH_LOADING (state) {
            state.loading -= 1;
        },
        START_LOADING (state) {
            state.loading += 1;
        }
    },
    'namespaced': true,
    'state': {'loading': 0}
};
