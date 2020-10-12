import store from "@/store/store";

export default {
    state: () => ({
        cards: [
            {
                id: 0,
                label: "construct",
                description: "Construct 1 bot at selected location.",
                played: false,
                callback(payload){
                    store.dispatch('player', "executing construct at hex " + payload.location);
                    store.dispatch('spawn', payload);
                }
            },
            {
                id: 1,
                label: "travel",
                description: "Move 1 bot from one location to another.",
                played: false,
                callback(payload){
                    store.dispatch('player', "executing travel");
                    store.dispatch('travel', payload);
                }
            },
            {
                id: 1,
                label: "consume",
                description: "1 Bot at selected location consumes 1 resource.",
                played: false,
                callback(){
                    store.dispatch('player', "executing consume");
                    store.dispatch('mine');
                }
            }
        ]
    }),
    getters: {
        cards (state) {
            return state.cards;
        },
        card: (state) => (id) => {
            let card = state.cards.filter((c) => {
                return c.id === id;
            })[0];

            return card;
        }
    }
}