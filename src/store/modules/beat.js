import store from "@/store/store";
export default {
    state: () => ({
        current: 0,
        delay: 1000,
        interval: null
    }),
    mutations: {
        start(state){
            state.interval = setInterval( () => {
                state.current++;
                store.dispatch('info', 'time: ' + state.current);
                store.dispatch('grow');
            }, state.delay);
        },
        stop(state){
            clearInterval(state.interval);
        },
        reset(state){
            clearInterval(state.interval);
            state.current = 0;
        },
    },
    actions: {
        start (context) {
            context.commit('start');
        },
        stop (context) {
            context.commit('stop');
        },
        reset (context) {
            context.commit('reset', location);
        },
    },
    getters: {
        beat (state) {
            return state.current;
        }
    }
}