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
    shipPlacement(state.shipInfo[0]);
  //}
}

function shipPlacement(ship) {
  //var orientation = randomizeArr(state.orientation);
  var orientation = state.orientation[Math.floor(Math.random() * state.orientation.length)];

  var boardSize   = 7,
      randRow     = 0, 
      randCol     = 0,
      point       = 0;

  if(orientation === 'up') {
    // range vert: ship.height to boardSize
    // range horiz: 0 to (boardSize - ship.width)
    randRow = Math.floor(Math.random() * (boardSize - ship.height + 1)) + ship.height;
    randCol = Math.floor(Math.random() * ((boardSize - ship.width) + 1));
  } else if(orientation === 'down') {
    // range vert: 0 to (boardSize - ship.height)
    // range horiz: ship.width to boardSize
    randRow = Math.floor(Math.random() * ((boardSize - ship.height) + 1));
    randCol = Math.floor(Math.random() * (boardSize - ship.width + 1)) + ship.width;
  } else if (orientation === 'right') {
    // range vert: 0 to (boardSize - ship.width)
    // range horiz: 0 to (boardSize - ship.height)
    randRow = Math.floor(Math.random() * (boardSize - ship.width) + 1);    
    randCol = Math.floor(Math.random() * ((boardSize - ship.height)+ 1));
  } else if(orientation === 'left') {
    // range vert: ship.width to boardSize
    // range horiz: ship.height to boardSize 
    // randRow = Math.floor(Math.random() * (boardSize - ship.width)) + ship.width;
    randRow = Math.floor(Math.random() * (boardSize - ship.width + 1)) + ship.width;    
    randCol = Math.floor(Math.random() * (boardSize - ship.height + 1)) + ship.height;
  }

  point = { 'row': randRow, 'col': randCol};
  checkOrientation(ship, point, orientation);
}

function checkOrientation(ship, point, orientation) {
  var minRowHeight = point.row - ship.height; // 3
  var maxRowHeight = point.row + ship.height;
  var maxRowWidth = point.row + ship.width;
  var minRowWidth = point.row - ship.width;

  var maxColHeight = point.col + ship.height;
  var minColWidth = point.col - ship.width; // 2
  var maxColWidth = point.col + ship.width;
  var minColHeight = point.col - ship.height;


  checkCollision(point);

  if(orientation === 'up') {
    console.log("Width: ", point.col + ship.width);
    traverseUp(point, minRowHeight);
    traverseRight(point, maxColWidth);
  } 
  if(orientation === 'down') {
    traverseDown(point, maxRowHeight);
    traverseLeft(point, minColWidth);
  } 
  if(orientation === 'right') {
    traverseDown(point, maxRowWidth);
    traverseRight(point, maxColHeight);
  } 
  else if(orientation === 'left') {
    traverseUp(point, minRowWidth);
    traverseLeft(point, minColHeight);
  }

  shipOnBoard(ship);
}

function traverseUp(point, end) {
  for(var row = point.row - 1; row > end; row--) {
    // reassigning point row and col did not work b/c it is an observable
    checkCollision({'row': row, 'col': point.col});
  }
}
function traverseDown(point, end) {
  for(var row = point.row + 1; row < end; row++) {
    checkCollision({'row': row, 'col': point.col});
  }
}
function traverseLeft(point, end) {
  for(var col = point.col - 1; col > end; col--) {
    checkCollision({'row': point.row, 'col': col});
  }
}
function traverseRight(point, end) {
  for(var col = point.col + 1; col < end; col++) {
    checkCollision({'row': point.row, 'col': col});
  }
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