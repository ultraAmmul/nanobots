import store from "@/store/store";

export default {
    state: () => ({
        resources: 0
    }),
    mutations: {
        resetResources(context){
            context.resources = 0;
        },
        mine(context){
            let bots = store.getters.bots;
            for (let b = 0; b < bots.length; b++) {
                context.resources++;
            }
        },
    },
    actions: {
        resetResources (context) {
            context.commit('resetResources');
        },
        mine (context) {
            context.commit('mine');
        }
    },
    getters: {
        resources (state) {
            return state.resources;
        }
    }
}