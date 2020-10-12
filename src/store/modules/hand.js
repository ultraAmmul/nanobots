import store from "@/store/store";

export default {
    state: () => ({
        constantsHand: {
            maxHand: 5,
        },
        hand: [],
        played: []
    }),
    mutations: {
        add(context, payload){
            let position = payload.position;
            let card = payload.card;
            context.hand.splice(position, 0, card);
        },
        remove(context, payload){
            let position = payload.position;
            context.hand.splice(position, 1);
        },
        resetHand(context){
            context.hand = [];
            context.hand.push(store.getters.card(0));
            context.hand.push(store.getters.card(1));
            context.hand.map((c) => {
                c.played = false;
                return c;
            })
        },
        play(context, payload){
            store.dispatch('playOn', payload);
            let card = store.getters.handCard(payload.card);
            card.callback(payload);
            card.played = true;
            context.played.push(payload.card);
        },
        resetPlayed(context){
            for(let card of context.hand){
                card.played = false;
            }
            context.played = [];
        }
    },
    actions: {
        add (context, payload) {
            context.commit('add', payload);
        },
        remove (context, payload) {
            context.commit('remove', payload);
        },
        resetHand (context, payload) {
            context.commit('resetHand', payload);
        },
        play(context, payload) {
            context.commit('play', payload);
        },
        resetPlayed(context) {
            context.commit('resetPlayed');
        },
    },
    getters: {
        hand (state) {
            return state.hand;
        },
        handCard: (state) => (card) => {
            return state.hand.filter((c) => {
                return card.id === c.id;
            })[0];
        },
        constantsHand (state) {
            return state.constants;
        },
        maxHandSize (state) {
            return state.constantsHand.maxHand;
        },
        played (state) {
            return state.played;
        }
    }
}