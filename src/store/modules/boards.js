const state = {
  board: []
}
const getters = {
  getBoard: (state) => state.board,
}

function boardCreate() {
  var boardSize = 8,
      board     = [],
      row       = [];

 for(var i = 0; i < boardSize; i++) {
   for(var j = 0; j < boardSize; j++) {
     row[j] = 0;
   }
   board.push(row);
   row = [];
  } 
  return board;
}
const mutations = {
  setBoard: (state) => { 
    var blankBoard = boardCreate();
    console.log(blankBoard);
    state.board = boardCreate(); 
  },
}
const actions = {
  setBoard: ({commit}) => {
    commit('setBoard');
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}