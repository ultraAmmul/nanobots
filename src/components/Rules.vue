<template>
    <v-container>
        <v-row
            v-for="rule in rules"
            v-bind:key="rule.id"
        >
            <v-slider
                v-model="rule.value"
                :color="rule.color"
                :label="rule.label"
                :disabled="rule.disabled"
                v-on:mouseup="set(rule)"
                :thumb-size="24"
                thumb-label="always"
                :min="rule.min"
                :max="rule.max"
                :step="rule.step"
                dense
                hide-details
            ></v-slider>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "Rules",
    computed: {
        rules () {
            return this.$store.getters.rules;
        }
    },
    methods: {
        set (rule) {
            this.$store.dispatch('setRule', rule);
        }
    }
}
</script>

<style scoped>

</style>