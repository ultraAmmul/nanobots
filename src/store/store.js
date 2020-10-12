import Vue from 'vue'
import Vuex from 'vuex'

import beat from "./modules/beat";
import bots from "./modules/bots";
import log from "./modules/log";
import strategy from "./modules/strategy";
import board from "./modules/board";
import rules from "./modules/rules";
import hand from "./modules/hand";
import cards from "./modules/cards";
import resources from "./modules/resources";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        beat,
        log,
        strategy,
        board,
        rules,
        bots,
        hand,
        cards,
        resources
    },
})