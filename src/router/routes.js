import InstructionScreen from '../pages/InstructionScreen.vue';
import GameScreen from '../pages/GameScreen.vue';
import HomeScreen from '../pages/HomeScreen.vue';
import SwitchUserScreen from '../pages/SwitchUserScreen.vue'

export const routes_objs = [
    {
        path : '/',
        name : 'home',
        component: HomeScreen,
    },
    {
        path : '/instruction',
        name : 'instruction',
        component: InstructionScreen,
    },
    {
        path : '/play',
        name : 'play',
        component: GameScreen,
    },
    {
        path : '/switchusr',
        name : 'switch user',
        component: SwitchUserScreen,
    },
];

export const routes = routes_objs;