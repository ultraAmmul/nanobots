export default {
    state: () => ({
        constants: {
            botsPerGalaxy: 100,
            minResourcesPerGalaxy: 50,
            maxResourcesPerGalaxy: 200,
        },
        rules: {
            'duplicationCost': {
                id: 0,
                name: 'duplicationCost',
                label: 'duplication cost',
                min: 0.1,
                max: 1.0,
                step: 0.001,
                disabled: false,
                value: 0.5
            },
            // {
            //     id: 1,
            //     name: 'travelSpeed',
            //     label: 'travel speed',
            //     min: 1,
            //     max: 1,
            //     step: 1,
            //     disabled: true,
            //     value: 1
            // },
            // {
            //     id: 2,
            //     name: 'travelCost',
            //     label: 'travel cost',
            //     min: 0.5,
            //     max: 1,
            //     step: 0.05,
            //     disabled: false,
            //     value: 0.75
            // }
        }
    }),
    mutations: {
        setRule (state, payload){
            let rule = state.rules[payload.name];
            rule.value = payload.value;
        }
    },
    actions: {
        setRule (context, payload) {
            context.commit('setRule', payload);
        }
    },
    getters: {
        // growthRate (state) {
        //     return state.rules.growthRate;
        // },
        // travelSpeed (state) {
        //     return state.rules.travelSpeed;
        // },
        // travelCost (state) {
        //     return state.rules.travelCost;
        // },
        duplicationCost (state) {
            return state.rules['duplicationCost'].value;
        },
        rules (state) {
            return state.rules;
        },
        constants (state) {
            return state.constants;
        }
    }
}