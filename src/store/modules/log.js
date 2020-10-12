export default {
    state: {
        messages: []
    },
    mutations: {
        write(state, message){
            setTimeout(()=> {
                state.messages.push({
                    id: state.messages.length,
                    level: message.level,
                    message: message.text,
                });

            },100)
        }
    },
    actions: {
        info (context, payload) {
            let message = {
                level: 'info',
                text: payload
            }
            context.commit('write', message);
        },
        warn (context, payload) {
            let message = {
                level: 'warning',
                text: payload
            }
            context.commit('write', message)
        },
        error (context, payload) {
            let message = {
                level: 'error',
                text: payload
            }
            context.commit('write', message)
        }
    },
    getters: {
        messages: state => {
            return state.messages;
        }
    }
}