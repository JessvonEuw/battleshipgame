import Vue from "vue";

import Board from './components/Board.vue'
import OpponentBoard from './components/OpponentBoard.vue'
import Space from './components/board/Space.vue'

Vue.component('board', Board);
Vue.component('opponent-board', OpponentBoard);
Vue.component('space', Space);