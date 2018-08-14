import Vue from "vue";

import Board from './components/board/Board.vue'
import PlayerBoard from './components/board/PlayerBoard.vue'
import OpponentBoard from './components/board/OpponentBoard.vue'
import Space from './components/board/Space.vue'

Vue.component('board', Board);
Vue.component('player-board', PlayerBoard);
Vue.component('opponent-board', OpponentBoard);
Vue.component('space', Space);