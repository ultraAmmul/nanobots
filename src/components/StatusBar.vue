<template>
    <v-system-bar
        dark
    >
        <v-spacer></v-spacer>
        <span
            class="pr-5"
        >
            <v-icon
                medium
            >mdi-av-timer</v-icon>
            <span>Round: {{ beat }}</span>
        </span>
        <span
            class="pr-5"
        >
            <v-icon
                medium
            >mdi-robot</v-icon>
            <span>Bots: {{ count }}</span>
        </span>
        <span>
            <v-icon
                medium
            >mdi-terrain</v-icon>
            <span>Resources: {{ resources }}</span>
        </span>
    </v-system-bar>
</template>

<script>
export default {
    name: "StatusBar",
    props: ["beat", "count", "resources"]
}
</script>

<style scoped>

</style>