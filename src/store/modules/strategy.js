export default {
    state: () => ({
        current: null,
        strategies: [
            {
                "id": 0,
                "name": "grow",
                "selected": false
            },
            {
                "id": 1,
                "name": "travel",
                "selected": false
            },
        ]
    }),
    mutations: {
        set(state, strategy){

            state.strategies = state.strategies.map((s) => {
                s.selected = false;
                return s;
            });
            let current = state.strategies.filter((s)=>{
                return s.id === strategy.id;
            })[0];

            current.selected = true;
            state.current = current;
        },
    },
    actions: {
        setStrategy (context, payload) {
            context.commit('set', payload);
        },
    },
    getters: {
        currentStrategy (state) {
            return state.current;
        },
        strategies (state) {
            return state.strategies;
        }
    }
}