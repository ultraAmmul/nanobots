import _ from "lodash";
// import store from "@/store/store";

export default {
    state: {
        bots: [],
        botHexLimit: 3,
        blueprint: {
            id: null,
            location: null
        }
    },
    mutations: {
        travel (state, payload){
            console.log("travel", payload);
        },
        spawn (state, payload) {
            return new Promise((resolve) => {
                let bot = _.clone(state.blueprint);
                bot.id = state.bots.length;
                bot.location = payload.location;
                state.bots.push(bot);
                resolve(bot);
            })
        },
        resetBots (state) {
            state.bots = [];
        }
    },
    actions: {
        travel (context, payload) {
            context.commit('travel', payload);
        },
        spawn (context, payload) {
            return new Promise((resolve) => {
                context.commit('spawn', payload);
                resolve();
            })
        },
        resetBots (context) {
            context.commit('resetBots');
        }
    },
    getters: {
        count (context) {
            return context.bots.length;
        },
        bots (context) {
            return context.bots;
        },
        botsOnHex: (context) => (hexId) => {
            return context.bots.filter((b)=>{
                return b.location === hexId;
            })
        }
    }
}