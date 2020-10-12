import VueRouter from 'vue-router';
import Simulator from "@/components/Simulator";
const Dashboard = { template: '<div>Dashboard</div>' }


const routes = [
    {
        path: '/', component: Dashboard
    },
    {
        path: '/simulator', component: Simulator
    }
]

export default new VueRouter({
    mode: 'history',
    routes: routes
})
