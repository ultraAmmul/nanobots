<template>
    <div class="wrapper">
        <v-tooltip top class="text-center d-flex align-center justify-space-around hex">
            <template v-slot:activator="{ on, attrs }">
                <div
                    class="hexagon"
                    v-bind="attrs"
                    v-on="on"
                >
                    <div
                        :class="infested ? 'infested' : '' + ' infestation'"
                    >
                        <v-icon
                            large
                            color="green darken-2"
                            :v-show="infested"
                        >
                            mdi-bug
                        </v-icon>
                    </div>
                </div>
            </template>
            <v-container>
                <v-row>
                    <b>{{ storeHex.name }}</b>
                </v-row>
                <v-row>
                    <v-col>
                        <v-progress-circular
                            :rotate="360"
                            :size="100"
                            :width="15"
                            :value="botsPercentual"
                            color="teal"
                        >
                            {{ bots.length }}
                        </v-progress-circular>
                    </v-col>
                    <v-col>
                        <v-progress-circular
                            :rotate="360"
                            :size="100"
                            :width="15"
                            :value="resourcesPercentual"
                            color="red"
                        >
                            {{ storeHex.resources }}
                        </v-progress-circular>
                    </v-col>
                </v-row>
                <v-row>
                    <span class="hex-footer">id: {{ hex.id }}</span>
                </v-row>
            </v-container>
        </v-tooltip>
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
        botsPercentual () {
            return ((this.bots.length / this.$store.getters.constants.botsPerGalaxy) * 100).toFixed(2);
        },
        resourcesPercentual () {
            return ((this.storeHex.resources / this.storeHex.maxResources) * 100).toFixed(2);
        }
    },
}
</script>

<style>

    .wrapper{
        /*width: 130px;*/
    }.hexagon {
         position: relative;
         width: 100px;
         height: 57.74px;
         background-color: #202020;
         margin: 28.87px 0;
         border-left: solid 5px #272727;
         border-right: solid 5px #272727;
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
        left: 25px;
        top: 10px;
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
</style>