<template>
    <v-card id="logstream" class="pa-5">
        <v-row
            v-for="message in messages"
            v-bind:key="message.id"
        >
            <span>[ {{ message.id }} ]</span>
            <v-spacer></v-spacer>
            <span
                :class="'logstream-' + message.level"
            >{{ message.message }}</span>
        </v-row>
    </v-card>
</template>

<script>
export default {
    name: "LogStream",
    computed: {
        messages () {
            return this.$store.getters.messages;
        }
    },
    watch: {
        messages () {
            let stream = document.getElementById("logstream");
            stream.scrollTop = stream.scrollHeight + 60;
        }
    }
}
</script>

<style>
    .logstream-info{
        color: white;
    }

    .logstream-warning{
        color: yellow;
    }

    .logstream-error{
        color: red;
    }

    #logstream{
        max-height: 490px;
        height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
    }
</style>