<template>
    <kinesis-container
        class="board"
    >
        <kinesis-element
            type="depth"
            :strength="10"
        >
            <div
                class="background"
            >
                <div
                    v-for="star in stars"
                    v-bind:key="star.id"
                    class="star"
                    v-bind:style="{ top: star.y + 'px', left: star.x + 'px' }"
                ></div>
            </div>
        </kinesis-element>
        <div class="board-wrapper">
            <v-row
                v-for="(row, index) in board"
                v-bind:key="index"
                justify="center"
                no-gutters
                :class="'bord-row ' + ((index === 0) ? 'first' : '')"
            >
                <v-col
                    class="pa-0"
                    v-for="hex in row"
                    v-bind:key="hex.id"
                    :cols="index === 0 ? 2 : index === 2 ? 2 : 2"
                    justify="center"
                    align="center"
                >
                    <Hex
                        :hex="hex"
                    ></Hex>
                </v-col>
            </v-row>
        </div>
    </kinesis-container>
</template>

<script>
import Hex from "@/components/Hex";
import _ from "lodash";

export default {
    name: "Board",
    components: {Hex},
    computed: {
        board () {
            return this.$store.getters.board;
        },
        cols (index) {
            return this.colCount(index);
        },
        stars () {
            let stars = [];
            let count = 100;
            for(let s = 0; s < count; s++){
                let star = {
                    id: s,
                    x: _.random(0, 600),
                    y: _.random(0, 490)
                }
                stars.push(star);
            }

            return stars;
        }
    },
    methods: {
        colCount(index) {
            if(index === 0) return 4;
            return 5;
        }
    }
}
</script>

<style scoped>
    .board{
        height: 490px;
        padding-left: 20px;
        padding-top: 10px;
        width: 630px!important;
    }

    .bord-row{
        margin-top: -30px;
    }

    .bord-row.first{
        margin-top: 0px;
    }

    .background{
        height: 470px;
        background: black;
    }

    .board-wrapper{

        position: absolute;
        top: 0px;
        left: 0px;
        width: 600px;
        height: 490px;
    }

    .star{
        width: 1px;
        height: 1px;
        background-color: white;
        position: absolute;
    }
</style>