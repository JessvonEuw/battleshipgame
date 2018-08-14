import Vue from "vue";

import PlayerBoard from './components/PlayerBoard.vue'
import OpponentBoard from './components/OpponentBoard.vue'
import Space from './components/board/Space.vue'

Vue.component('player-board', PlayerBoard);
Vue.component('opponent-board', OpponentBoard);
Vue.component('space', Space);