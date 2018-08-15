import Vue from "vue";

//import Start from './components/transitions/Start.vue'

import Board from './components/board/Board.vue'
import PlayerBoard from './components/board/PlayerBoard.vue'
import OpponentBoard from './components/board/OpponentBoard.vue'
import Space from './components/board/Space.vue'

// Page Components
//Vue.component('start', Start);

// Board Components
Vue.component('board', Board);
Vue.component('player-board', PlayerBoard);
Vue.component('opponent-board', OpponentBoard);
Vue.component('space', Space);