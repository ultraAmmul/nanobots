<template>
    <v-container class="fill-height pa-0">
        <v-row
            align="start"
            class="pa-5"
        >
            Simulator
        </v-row>
        <v-row
            class="pa-5"
        >
            <v-divider></v-divider>
        </v-row>
        <v-row
            class="pa-5"
        >
            <v-card
                style="width: 100%;background-color: black;"
            >
                <v-card-title></v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="8" style="padding-left: 20px; padding-top: 10px;">
                            <Board></Board>
                        </v-col>
                        <v-col cols="4">
                            <LogStream></LogStream>
                        </v-col>
                    </v-row>
                    <StatusBar
                        :count="count"
                        :beat="beat"
                        :resources="resources"
                    ></StatusBar>
                </v-card-text>
            </v-card>
        </v-row>
        <v-row
            class="pa-5"
        >
            <v-divider></v-divider>
            <v-card
                class="mt-5"
                style="background-color: #363636; width: 100%;"
            >
                <v-card-text>
                    <v-row
                        align="center"
                        justify="end"
                        class="pb-5 pt-5"
                    >
                        <v-btn
                            disabled
                            class="ml-3"
                        >
                            Actions remaining : {{ plays }}
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                            v-on:click="createUniverse"
                            class="mr-3 ml-3"
                        >
                            <span v-if="state === 0">Start Game</span>
                            <span v-if="state === 1">Restart Game</span>
                            <v-icon
                                dark
                                right
                                color="info"
                            >
                                mdi-eye-settings
                            </v-icon>
                        </v-btn>
                        <v-btn
                            v-on:click="finishTurn"
                            class="mr-3 ml-3"
                            :disabled="!created || (plays > 0 && playsHexes > 0)"
                        >
                            Finish Turn {{ playsHexes }}
                            <v-icon
                                dark
                                right
                                color="success"
                            >
                                mdi-play-circle
                            </v-icon>
                        </v-btn>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row class="pt-5 pb-0">
                        <v-col
                            v-for="card in hand"
                            v-bind:key="card.id"
                            class="pt-0 pb-0"
                            cols="3"
                        >
                            <Card
                                :card="card">
                            </Card>
                        </v-col>
                    </v-row>

                </v-card-text>

        </v-card>
        </v-row>
    </v-container>
</template>

<script>
import LogStream from "@/components/LogStream";
import Card from "@/components/Card";
import StatusBar from "@/components/StatusBar";
import Board from "@/components/Board";

export default {
    name: "Simulator",
    components: {
        Board,
        StatusBar,
        Card,
        LogStream
    },
    data: () => {
        return {
            state: 0,
            created: false,
        }
    },
    computed: {
        beat () {
            return this.$store.getters.beat;
        },
        hand () {
            return this.$store.getters.hand;
        },
        count () {
            return this.$store.getters.count;
        },
        resources () {
            return this.$store.getters.resources;
        },
        plays () {
            return this.hand.length - this.$store.getters.played.length ;
        },
        playsHexes () {
            return this.$store.getters.playableHexes;
        }
    },
    methods: {
        finishTurn () {
            this.$store.dispatch('finishTurn');
            this.$store.dispatch('resetPlayed');
            this.$store.dispatch('resetPlayedHexes');
        },
        createUniverse () {
            let start = this.state === 0 ? 'start' : 'restart';
            this.$store.dispatch('info', start + " game");
            this.$store.dispatch('resetBoard');
            this.$store.dispatch('resetRound');
            this.$store.dispatch('resetHand');
            this.created = true;
            this.state = 1;
        }
    }
}
</script>

<style scoped>

</style>