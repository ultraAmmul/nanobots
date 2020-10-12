import store from "@/store/store";
export default {
    state: () => ({
        current: 0,
        delay: 0,
        interval: null
    }),
    mutations: {
        finishTurn(state){
            state.current++;
            store.dispatch('info', 'round: ' + state.current);
        },
        stop(state){
            clearInterval(state.interval);
        },
        resetRound(state){
            clearInterval(state.interval);
            state.current = 0;
        },
    },
    actions: {
        finishTurn (context) {
            context.commit('finishTurn');
        },
        stop (context) {
            context.commit('stop');
        },
        resetRound (context) {
            context.commit('resetRound', location);
        },
    },
    getters: {
        beat (state) {
            return state.current;
        }
    }
}