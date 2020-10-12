<template>
    <v-card
        :disabled="storeCard.played"
    >
        <v-card-title>{{ storeCard.label }}</v-card-title>
        <v-card-text>
            {{ storeCard.description }}
        </v-card-text>
        <v-card-actions>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    props: ["card"],
    computed: {
        storeCard () {
            return this.$store.getters.handCard(this.card);
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