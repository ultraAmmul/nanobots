import _ from 'lodash';
import store from "@/store/store";

export default {
    state: () => ({
        board: [],
        rows: 5,
        cols: 5,
        blueprints: {
            hex: {
                id: null,
                bots: [],
                name: 'unset',
                resources: 0,
                maxResources: 0
            }
        },
        botCount: 0,
        hexCount: 0,
        galaxyNamesCurrent: null,
        galaxyNames: [
            "Andromeda",
            "Corvus",
            "Centaurus",
            "Coma Berenices",
            "Ursa Major",
            "Virgo",
            "Sculptor",
            "Ursa Major",
            "Circinus",
            "Coma Benerices",
            "Sculptor",
            "Sextans",
            "Canes Venatici",
            "Cygnus and Cepheus",
            "Canes Venatici",
            "Serpens Caput",
            "Dorado/Mensa",
            "Volans",
            "Pegasus",
            "Coma Berenices",
            "Ursa Major",
            "Sculptor",
            "Coma Berenices",
            "Tucana",
            "Ursa Major",
            "Sagittarius (centre)",
            "Coma Berenices",
            "Cetus",
            "Ursa Major",
            "Sculptor",
            "Virgo",
            "Hydra",
            "Canes Venatici",
            "Draco",
            "Triangulum",
            "Canes Venatici",
        ]
    }),
    mutations: {
        create (state) {

            state.galaxyNameCurrent = _.clone(state.galaxyNames);

            for(let r = 0; r < state.rows; r++){
                let row = [];
                let cols = (r === 0) ? 2 : 3;
                if(r === 4) cols = 2;
                if(r === 2) {
                    cols = 4;
                }
                for(let c = 0; c < cols; c++){
                    let hex = _.clone(state.blueprints.hex);
                    let shuffled = _.shuffle(state.galaxyNameCurrent);
                    hex.name = shuffled.pop();
                    hex.id = state.hexCount;
                    hex.resources = _.random(store.getters.constants.minResourcesPerGalaxy, store.getters.constants.maxResourcesPerGalaxy);
                    hex.maxResources = store.getters.constants.maxResourcesPerGalaxy;
                    row.push(hex);
                    state.hexCount++;
                }
                state.board.push(row);
            }
        },
        resetBoard (state) {
            state.board = [];
            state.hexCount = 0;
        },
        seed () {
            let seeded = _.random(0, 13);
            // let seeded = 0;
            store.dispatch('spawn', seeded);
            let seededHex = store.getters.hex({id: seeded});
            store.dispatch('info', "seeding hex: " + seededHex.id);
        }
    },
    actions: {
        resetAll (context) {
            context.commit('resetBoard');
            context.commit('resetBots');
            context.commit('create');
            context.commit('seed');
            context.dispatch('setStrategy', {id: 0}); // 0 = grow
        },
    },
    getters: {
        board (state) {
            return state.board;
        },
        hex: (state) => (hex) => {
            for(let row of state.board){
                for(let rowHex of row){
                    if(hex.id === rowHex.id){
                        return rowHex;
                    }
                }
            }
            store.dispatch('error', 'could not resolve hex: ' + hex.id);
            return null;
        }
    }
}