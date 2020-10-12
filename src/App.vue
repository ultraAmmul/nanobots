<template>
    <v-app>
        <v-app>
            <v-navigation-drawer
                v-model="drawer"
                app
                clipped
            >
                <v-list dense>
                    <v-list-item
                        link
                        to="/"
                    >
                        <v-list-item-action>
                            <v-icon>mdi-view-dashboard</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Dashboard</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                        link
                        to="/simulator"
                    >
                        <v-list-item-action>
                            <v-icon>mdi-cog</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Simulator</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>

            <v-app-bar
                app
                clipped-left
            >
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                <v-toolbar-title>Nanobots</v-toolbar-title>
            </v-app-bar>

            <v-main>
                <v-container
                    style="padding:25px!important"
                >
                    <router-view></router-view>
                </v-container>
            </v-main>

            <v-footer app>
                <span>&copy; {{ new Date().getFullYear() }}</span>
            </v-footer>
        </v-app>
    </v-app>
</template>

<script>

export default {
    name: 'App',
    props: {
        source: String,
    },

    data: () => ({
        drawer: null,
    }),

    created () {
        this.$vuetify.theme.dark = true;
    },
};
</script>
