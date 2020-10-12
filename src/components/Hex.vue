<template>
    <div class="wrapper">
        <v-speed-dial>
            <template v-slot:activator>
                <div
                    v-on:click="openHexMenu"
                    class="hexagon"
                    v-bind:class="{ 'hexagon-selected': storeHex.selected}"
                >
                    <div
                        :class="infested ? 'infested' : '' + ' infestation'"
                    >
                        <v-row align="center">
                            <v-icon
                                small
                                class="hex-icon"
                            >mdi-robot</v-icon>
                            <div> {{ bots.length}}</div>
                        </v-row><v-row align="center">
                        <v-icon
                            small
                            class="hex-icon"
                        >mdi-terrain</v-icon>
                        <div> {{ storeHex.resources }}</div>
                    </v-row>
                        <v-row>
                            <v-icon
                                color="error"
                                v-if="storeHex.played"
                            >
                                mdi-close-octagon-outline
                            </v-icon>
                        </v-row>
                    </div>
                </div>
            </template>
            <v-btn
                dark
                class="dial-btn"
                v-for="card in hand"
                v-bind:key="card.id"
                :disabled="card.played"
                v-on:click="play(card)"
                v-show="infested && !storeHex.played"
            >
                {{ card.label }}
            </v-btn>
        </v-speed-dial>
    </div>
</template>

<script>
export default {
    name: "Hex",
    props: ["hex"],
    computed: {
        storeHex () {
            return this.$store.getters.hex(this.hex);
        },
        bots () {
            return this.$store.getters.bots.filter((b) => {
                return b.location === this.hex.id;
            });
        },
        infested () {
            return this.bots.length > 0;
        },
        hand () {
            return this.$store.getters.hand;
        }
    },
    methods: {
        openHexMenu(){
            if(this.infested){
                this.$store.dispatch('openHex', this.storeHex);
            }
        },
        play(card){
            this.$store.dispatch('play', {card: card, location: this.storeHex.id});
            this.$store.dispatch('playOn', { location: this.storeHex.id });
        }
    }
}
</script>

<style>

    .hexagon {
         position: relative;
         width: 100px;
         height: 57.74px;
         background-color: #202020;
         margin: 28.87px 0;
         border-left: solid 5px #272727;
         border-right: solid 5px #272727;
        cursor: pointer;
     }

    .hexagon:hover,
    .hexagon-selected {
        background-color: #303030;
    }

    .hexagon:before,
    .hexagon:after {
        content: "";
        position: absolute;
        z-index: 1;
        width: 70.71px;
        height: 70.71px;
        -webkit-transform: scaleY(0.5774) rotate(-45deg);
        -ms-transform: scaleY(0.5774) rotate(-45deg);
        transform: scaleY(0.5774) rotate(-45deg);
        background-color: inherit;
        left: 9.6447px;
    }

    .hexagon:before {
        top: -35.3553px;
        border-top: solid 7.0711px #272727;
        border-right: solid 7.0711px #272727;
    }

    .hexagon:after {
        bottom: -35.3553px;
        border-bottom: solid 7.0711px #272727;
        border-left: solid 7.0711px #272727;
    }



    .hexagon .inner{
        position: absolute;
        left: 0px;
        top: 0px;
        text-align: center;
        width: 100%;
    }

    .infested{
        display: block;
        height: 30px;
        width: 30px;
        z-index: 3;
        position: absolute;
        left: 40px;
        top: -10px;
    }

    .infestation{
        display: none;
        z-index: 2;
    }

    .hex-footer{
        color: purple;
        font-size: 13px;
        font-weight: bold;
    }
    
    .dial-btn{
        z-index: 5;
    }

    .hex-icon{
        margin-top: -4px;
        margin-right: 5px;
    }
</style>