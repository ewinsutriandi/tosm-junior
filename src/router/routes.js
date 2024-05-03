import InstructionScreen from '../pages/InstructionScreen.vue';
import GameScreen from '../pages/GameScreen.vue';
import HomeScreen from '../pages/HomeScreen.vue';
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
];

export const routes = routes_objs;