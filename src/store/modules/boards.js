import _ from "lodash";

const state = {
  board: [],
  occupied: [],
  ships: [1, 2, 3, 4],
  boatSpaces: 4,
  shipInfo: [
    {
      'name': 'L-Ship',
      'color': 'purple',
      'index': 1,
      'height': 3,
      'width': 2,
      'points': []
    },
    {
      'name': 'Dinghy',
      'color': 'green',
      'index': 2,
      'height': 2,
      'width': 2,
      'points': []
    },
    {
      'name': 'Carrier 1',
      'color': 'yellow',
      'index': 3,
      'height': 4,
      'width': 1,
      'points': []
    },
    {
      'name': 'Carrier 2',
      'color': 'blue',
      'index': 4,
      'height': 4,
      'width': 1,
      'points': []
    }
  ],
  orientation: ['up', 'left', 'right', 'down']
}
const getters = {
  getBoard: (state) => state.board,
  getOccupied: (state) => state.occupied
}

function boardCreate() {
  // create blank board
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

function randomizeArr(arr) {
  // random array shuffle
  for(let i = arr.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  
  return arr;
}

function placeShips() {
  // var shuffleShips = randomizeArr(state.shipInfo);

  //for(var i = 0; i < shuffleShips.length; i++) {
    shipPlace(state.shipInfo[0]);
  //}
}

function shipPlace(ship) {
  //var orientation = randomizeArr(state.orientation);
  var orientation = state.orientation[Math.floor(Math.random() * state.orientation.length)];
  var boardSize = 7,
      randRow = 0, 
      randCol = 0,
      point = 0;

  if(orientation === 'up' || orientation === 'down') {
    //vertical
    randRow = Math.floor(Math.random() * (boardSize - ship.height)) + ship.height;
    randCol = Math.floor(Math.random() * (boardSize - ship.width)) + ship.width;
  } else {
    //horizontal
    randRow = Math.floor(Math.random() * (boardSize - ship.width)) + ship.width;
    randCol = Math.floor(Math.random() * (boardSize - ship.height)) + ship.height;
  }

  point = { 'row': randRow, 'col': randCol};
  checkOrientation(ship, point, orientation);
}

function checkCollision(point, orientation) {
  // if point does not exist in occupied, it is a valid place 
  // for the current ship point

  var match = _.find(state.occupied, point);

  if(match === undefined || _.isEmpty(match)) {
    state.occupied.push(point);
    state.shipInfo[0].points.push(point);
  } else {
    console.log("ship can't go here");
  }
}

function checkOrientation(ship, point, orientation) {
  var maxShipRow = point.row - ship.height;
  var maxShipCol = point.col + ship.width;

  checkCollision(point);
  //if(orientation === "up") {
    for(var row = point.row - 1; row > maxShipRow; row--) {
      // reassigning point row and col did not work b/c it is an observable
      checkCollision({'row': row, 'col': point.col});
    }

    for(var col = point.col + 1; col < maxShipCol; col++) {
      checkCollision({'row': point.row, 'col': col});
    }
  //}

  shipOnBoard(ship);
}

function shipOnBoard(ship) {
  for(var ind in ship.points) {
    state.board[ship.points[ind].row][ship.points[ind].col] = ship.index;
  }
}

const mutations = {
  setBoard: (state) => {
    randomizeArr(state.orientation);
    state.board = boardCreate(); 
    placeShips();
  }
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