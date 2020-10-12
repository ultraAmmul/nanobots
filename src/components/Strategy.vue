<template>
    <v-card
        :class="'strategy ' + selected"
        v-on:click="select"
    >
        <v-card-title>{{ strategy.name }}</v-card-title>
        <v-card-text>
        </v-card-text>
        <v-card-actions>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: "Strategy",
    props: ["strategy"],
    methods: {
        select () {
            this.$store.dispatch('info', 'set strategy: ' + this.strategy.name)
            this.$store.dispatch('setStrategy', this.strategy);
        }
    },
    computed: {
        selected () {
            return this.strategy.selected ? 'selected' : '';
        }
    }
}
</script>

<style>
    .strategy {
        cursor: pointer;
    }

    .selected {
        background-color: #291525!important;
    }
</style>