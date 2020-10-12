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
            <span>Time: {{ beat }}</span>
        </span>
        <span
            class="pr-5"
        >
            <v-icon
                medium
            >mdi-robot</v-icon>
            <span>Bots: {{ count }}</span>
        </span>
        <span
        >
            <v-icon
                medium
            >mdi-cog</v-icon>
            <span>Strategy: <span style="color: white">{{ strategyName }}</span></span>
        </span>
    </v-system-bar>
</template>

<script>
export default {
    name: "StatusBar",
    props: ["beat", "count", "strategyName"]
}
</script>

<style scoped>

</style>