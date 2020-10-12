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
                // bots: [],
                name: 'unset',
                resources: 0,
                maxResources: 0,
                selected: false,
                played: false
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
            "Sculptor",
            "Sextans",
            "Canes Venatici",
            "Cygnus and Cepheus",
            "Canes Venatici",
            "Serpens Caput",
            "Dorado/Mensa",
            "Volans",
            "Pegasus",
            "Tucana",
            "Sagittarius (centre)",
            "Cetus",
            "Hydra",
            "Draco",
            "Triangulum",
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
                    hex.resources = store.getters.constants.resourcesPerGalaxy;
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
            store.dispatch('spawn', {location: seeded});
            let seededHex = store.getters.hex({id: seeded});
            store.dispatch('info', "seeding hex: " + seededHex.id);
        },
        openHex (state, payload) {
            for(let row of state.board){
                for(let hex of row){
                    if(payload.id !== hex.id){
                        hex.selected = false;
                    }else{
                        hex.selected = true;
                    }
                }
            }
        },
        playOn (state, payload) {
            for(let row of state.board){
                for(let hex of row){
                    if(payload.location === hex.id){
                        hex.played = true;
                    }
                }
            }
        },
        resetPlayedHexes(state) {
            for(let row of state.board){
                for(let hex of row){
                    hex.played = false;
                }
            }
        }
    },
    actions: {
        resetBoard (context) {
            context.commit('resetBoard');
            context.commit('resetBots');
            context.commit('create');
            context.commit('seed');
        },
        openHex (context, payload) {
            context.commit('openHex', payload);
        },
        playOn (context, payload) {
            context.commit('playOn', payload);
        },
        resetPlayedHexes (context) {
            context.commit('resetPlayedHexes');
        }
    },
    getters: {
        board (state) {
            return state.board;
        },
        hexList (state) {
            return _.flatten(state.board);
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
        },
        playableHexes () {
            let infestedHexes = store.getters.hexList.filter((h) => {
                let bots = store.getters.botsOnHex(h.id);
                let infested = bots.length;
                return infested > 0;
            });

            let playedHexes = store.getters.hexList.filter((h) => {
                return h.played === true;
            });

            return infestedHexes.length - playedHexes.length;
        }
    }
}