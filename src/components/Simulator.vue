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
                        :strategy-name="strategyName"
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
                <v-card-title>
                    Controls & Settings
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col>
                            <Rules></Rules>
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row
                        align="center"
                        justify="end"
                        class="pb-5 pt-5"
                    >
                        <v-btn
                            v-on:click="createUniverse"
                            class="mr-3 ml-3"
                            :disabled="created"
                        >
                            Create Space
                            <v-icon
                                dark
                                right
                                color="info"
                            >
                                mdi-eye-settings
                            </v-icon>
                        </v-btn>
                        <v-btn
                            v-on:click="start"
                            class="mr-3 ml-3"
                            :disabled="!created"
                        >
                            Start Time
                            <v-icon
                                dark
                                right
                                color="success"
                            >
                                mdi-play-circle
                            </v-icon>
                        </v-btn>
                        <v-btn
                            v-on:click="stop"
                            class="mr-3 ml-3"
                            :disabled="!created"
                        >
                            Stop Time
                            <v-icon
                                dark
                                right
                                color="warning"
                            >
                                mdi-pause-circle
                            </v-icon>
                        </v-btn>
                        <v-btn
                            v-on:click="reset"
                            class="mr-3 ml-3"
                            :disabled="!created"
                        >
                            Reset Space & Time
                            <v-icon
                                dark
                                right
                                color="error"
                            >
                                mdi-delete-forever
                            </v-icon>
                        </v-btn>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row class="pt-5 pb-0">
                        <v-col
                            v-for="strategy in strategies"
                            v-bind:key="strategy.id"
                            class="pt-0 pb-0"
                        >
                            <Strategy
                                :strategy="strategy">
                            </Strategy>
                        </v-col>
                    </v-row>

                </v-card-text>

        </v-card>
        </v-row>
    </v-container>
</template>

<script>
import LogStream from "@/components/LogStream";
import Strategy from "@/components/Strategy";
import StatusBar from "@/components/StatusBar";
import Board from "@/components/Board";
import Rules from "@/components/Rules";

export default {
    name: "Simulator",
    components: {Rules, Board, StatusBar, Strategy, LogStream},
    data: () => {
        return {
            state: 0,
            created: false
        }
    },
    computed: {
        beat () {
            return this.$store.getters.beat;
        },
        strategies () {
            return this.$store.getters.strategies;
        },
        currentStrategy () {
            return this.$store.getters.currentStrategy;
        },
        strategyName() {
            return this.currentStrategy ? this.currentStrategy.name : 'unset';
        },
        count () {
            return this.$store.getters.count;
        }
    },
    methods: {
        start () {
            if(this.currentStrategy === null){
                this.$store.dispatch('warn', 'no strategy defined');
                return;
            }
            if(this.state === 1){
                this.$store.dispatch('info', "continue time")
            }else{
                this.$store.dispatch('info', "start time")
            }
            this.state = 1;
            this.$store.dispatch('start');
        },
        stop () {
            this.$store.dispatch('info', "stop time")
            this.$store.dispatch('stop');
        },
        reset () {
            this.state = 0;
            this.$store.dispatch('stop');
            this.$store.dispatch('warn', "reset space & time")
            this.$store.dispatch('resetAll');
        },
        createUniverse () {
            this.$store.dispatch('info', "create space")
            this.$store.dispatch('resetAll')
            this.created = true;
        }
    }
}
</script>

<style scoped>

</style>