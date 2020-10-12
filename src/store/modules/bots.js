import _ from "lodash";
import store from "@/store/store";

export default {
    state: {
        bots: [],
        blueprint: {
            id: null,
            location: null
        }
    },
    mutations: {
        grow (state) {
            let originalBotCount = state.bots.length;
            let current = 0;
            for(let bot of state.bots){
                if(current >= originalBotCount){
                    return;
                }
                let hex = store.getters.hex({id: bot.location});
                let duplicationCost = store.getters.duplicationCost;
                if(hex.resources < duplicationCost){
                    return;
                }
                store.dispatch('spawn', bot.location);
                hex.resources -= duplicationCost;
                current++;
            }
        },
        travel (state, from, to){
            console.log("travel", from, to);
        },
        spawn (state, location) {
            return new Promise((resolve) => {
                let bot = _.clone(state.blueprint);
                bot.id = state.bots.length;
                bot.location = location;
                state.bots.push(bot);
                resolve(bot);
            })
        },
        resetBots (state) {
            state.bots = [];
        }
    },
    actions: {
        grow (context) {
            context.commit('grow');
        },
        travel (context, from, to) {
            context.commit('grow', from, to);
        },
        spawn (context, location) {
            return new Promise((resolve) => {
                context.commit('spawn', location);
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
        }
    }
}