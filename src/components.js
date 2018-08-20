import Vue from "vue"

import PlayerBoard from './components/board/PlayerBoard.vue'
import OpponentBoard from './components/board/OpponentBoard.vue'
import Space from './components/board/Space.vue'
import Reset from './components/Reset.vue'


// Board Components
Vue.component('player-board', PlayerBoard);
Vue.component('opponent-board', OpponentBoard);
Vue.component('space', Space);

// Other Components
Vue.component('reset', Reset);