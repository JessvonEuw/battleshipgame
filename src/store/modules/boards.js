import _ from "lodash";

const state = {
  winner: false,
  winPerson: '',
  playerBoard: [],
  opponentBoard: [],
  currentBoard: '',
  currentShip: {},
  collisionFlag: false,
  hitCounter: 0,
  playerSunk: [],
  opponentSunk: [],
  sunkShip: "",
  playerShips: [
    {
      'name': 'L-Ship',
      'index': 1,
      'hitIndex': 5,
      'hitCount': 0,
      'sunk': false,
      'height': 3,
      'width': 2,
      'points': []
    },
    {
      'name': 'Dinghy',
      'index': 2,
      'hitIndex': 6,
      'hitCount': 0,
      'sunk': false,
      'height': 2,
      'width': 2,
      'points': []
    },
    {
      'name': 'Carrier 1',
      'index': 3,
      'hitIndex': 7,
      'hitCount': 0,
      'sunk': false,
      'height': 4,
      'width': 1,
      'points': []
    },
    {
      'name': 'Carrier 2',
      'index': 4,
      'hitIndex': 8,
      'hitCount': 0,
      'height': 4,
      'sunk': false,
      'width': 1,
      'points': []
    }
  ],
  opponentShips: [
    {
      'name': 'L-Ship',
      'index': 1,
      'hitIndex': 5,
      'hitCount': 0,
      'sunk': false,
      'height': 3,
      'width': 2,
      'points': []
    },
    {
      'name': 'Dinghy',
      'index': 2,
      'hitIndex': 6,
      'hitCount': 0,
      'sunk': false,
      'height': 2,
      'width': 2,
      'points': []
    },
    {
      'name': 'Carrier 1',
      'index': 3,
      'hitIndex': 7,
      'hitCount': 0,
      'sunk': false,
      'height': 4,
      'width': 1,
      'points': []
    },
    {
      'name': 'Carrier 2',
      'index': 4,
      'hitIndex': 8,
      'hitCount': 0,
      'height': 4,
      'sunk': false,
      'width': 1,
      'points': []
    }
  ],
  orientation: ['up', 'left', 'right', 'down']
}
const getters = {
  getPlayerBoard: (state) => state.playerBoard,
  getOpponentBoard: (state) => state.opponentBoard,
  getCurrentBoard: (state) => state.currentBoard,
  getPlayerSunk: (state) => state.playerSunk,
  getOpponentSunk: (state) => state.opponentSunk,
  getWinPerson: (state) => state.winPerson,
  getWinner: (state) => state.winner,
  getSunkShip: () => state.sunkShip
}
/* ---------------------- */ 
/* Initial Ship Placement */ 
/* ---------------------- */
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

function setShips() {
  var shuffleShips = [];

  if(state.currentBoard === 'player') {
    shuffleShips = randomizeArr(state.playerShips);
    state.playerBoard = boardCreate();
  } else if(state.currentBoard === 'opponent') {
    shuffleShips = randomizeArr(state.opponentShips);
    state.opponentBoard = boardCreate();
  }
  for(var i = 0; i < shuffleShips.length; i++) {
    state.currentShip = shuffleShips[i];
    do {
      // only move to next ship if no collisions on current ship
      shipPlacement(state.currentShip);
    } while(state.collisionFlag);
  }
  if(state.currentBoard === 'player')
    return state.playerBoard;
  else if(state.currentBoard === 'opponent')
    return state.opponentBoard;
}

function shipPlacement(ship) {
  var orientation = state.orientation[Math.floor(Math.random() * state.orientation.length)];

  var boardSize = 7,
      randRow   = 0, 
      randCol   = 0,
      point     = 0,
      upEnd     = 0,
      leftEnd   = 0,
      rightEnd  = 0,
      downEnd   = 0;

  if(ship.height === ship.width) {
    // range vert: 0 to (boardSize - ship.height)
    // range horiz: 0 to (boardSize - ship.width)
    orientation = '';
    randRow = Math.floor(Math.random() * ((boardSize - ship.width) + 1));    
    randCol = Math.floor(Math.random() * ((boardSize - ship.height) + 1));
    point   = { 'row': randRow, 'col': randCol};

    rightEnd = point.col + ship.height;

    traverseRight(point, rightEnd);
    traverseRight({ 'row': point.row + 1, 'col': point.col}, rightEnd);
    checkOverlap();

  }

  if(orientation === 'up') {
    // range vert: ship.height to boardSize
    // range horiz: 0 to (boardSize - ship.width)
    randRow = Math.floor(Math.random() * (boardSize - ship.height + 1)) + ship.height;
    randCol = Math.floor(Math.random() * ((boardSize - ship.width) + 1));
    point   = { 'row': randRow, 'col': randCol};

    upEnd    = point.row - ship.height;
    rightEnd = point.col + ship.width; 
    
    traverseUp(point, upEnd);
    traverseRight(point, rightEnd);
    checkOverlap();

  } else if(orientation === 'down') {
    // range vert: 0 to (boardSize - ship.height)
    // range horiz: ship.width to boardSize
    randRow = Math.floor(Math.random() * ((boardSize - ship.height) + 1));
    randCol = Math.floor(Math.random() * (boardSize - ship.width + 1)) + ship.width;
    
    point = { 'row': randRow, 'col': randCol};
    downEnd = point.row + ship.height;
    leftEnd = point.col - ship.width;
    
    traverseDown(point, downEnd);
    traverseLeft(point, leftEnd);
    checkOverlap();

  } else if (orientation === 'right') {
    // range vert: 0 to (boardSize - ship.width)
    // range horiz: 0 to (boardSize - ship.height)
    randRow = Math.floor(Math.random() * (boardSize - ship.width) + 1);    
    randCol = Math.floor(Math.random() * ((boardSize - ship.height)+ 1));
    point = { 'row': randRow, 'col': randCol};

    downEnd = point.row + ship.width;
    rightEnd = point.col + ship.height;

    traverseDown(point, downEnd);
    traverseRight(point, rightEnd);
    checkOverlap();

  } else if(orientation === 'left') {
    // range vert: ship.width to boardSize
    // range horiz: ship.height to boardSize 
    randRow = Math.floor(Math.random() * (boardSize - ship.width + 1)) + ship.width;    
    randCol = Math.floor(Math.random() * (boardSize - ship.height + 1)) + ship.height;
    point = { 'row': randRow, 'col': randCol};
    
    upEnd = point.row - ship.width;
    leftEnd = point.col - ship.height;

    traverseUp(point, upEnd);
    traverseLeft(point, leftEnd);
    checkOverlap();
  }
}

function traverseUp(point, end) {
  for(var row = point.row - 1; row > end; row--) {
    // each ship will keep track of its own places on the board
    state.currentShip.points.push({'row': row, 'col': point.col});
  }
}
function traverseDown(point, end) {
  for(var row = point.row + 1; row < end; row++) {
    state.currentShip.points.push({'row': row, 'col': point.col});
  }
}
function traverseLeft(point, end) {
  for(var col = point.col; col > end; col--) {
    state.currentShip.points.push({'row': point.row, 'col': col});
  }
}
function traverseRight(point, end) {
  for(var col = point.col; col < end; col++) {
    state.currentShip.points.push({'row': point.row, 'col': col});
  }
}

function checkOverlap() {
  // check if the current ship is being placed on top of another ship
  var matchIndex = -1,
      occupiedPoints = [];

  if(state.currentBoard === 'player') {
    for(var j in state.playerShips) {
      if(state.playerShips[j].index !== state.currentShip.index)
        occupiedPoints = occupiedPoints.concat(state.playerShips[j].points);
    }
  } else if(state.currentBoard === 'opponent') {
    for(var m in state.opponentShips) {
      if(state.opponentShips[m].index !== state.currentShip.index)
        occupiedPoints = occupiedPoints.concat(state.opponentShips[m].points);
    }
  }

  
  for(var i in state.currentShip.points) {
    matchIndex = _.findIndex(occupiedPoints, state.currentShip.points[i]);

    if(matchIndex > -1) {
      // there is another ship in the way, try placing again 
      state.collisionFlag = true;
      state.currentShip.points = [];
      break;
    } else {
      state.collisionFlag = false;
    }
  }

  // only put ships on board if no collisions
  if(!state.collisionFlag)
    shipOnBoard(state.currentShip);
}

function shipOnBoard(ship) {
  if(state.currentBoard === 'player') {
    for(var ind in ship.points) {
      state.playerBoard[ship.points[ind].row][ship.points[ind].col] = ship.index;
    }
  } else if(state.currentBoard === 'opponent') {
    for(var k in ship.points) {
      state.opponentBoard[ship.points[k].row][ship.points[k].col] = ship.index;
    }
  }
}
/* ------------------- */ 
/*   Attack Opponent   */ 
/* ------------------- */

function checkPoint(ships, pointInfo) {
  var missIndex = 9;
  if(pointInfo.point > 0 && pointInfo.point < 5) {
    // check if point contains a ship
    for(var i in ships) {
      if(ships[i].index === pointInfo.point) {
        hitCondition(ships[i], pointInfo);
      }
    }
  } else {
    // place a miss marker on the board
    // splice to automatically update the array
    if(state.currentBoard === 'player')
      state.playerBoard[pointInfo.row].splice(pointInfo.col, 1, missIndex);
    else if(state.currentBoard === 'opponent')
      state.opponentBoard[pointInfo.row].splice(pointInfo.col, 1, missIndex);
  }
}

function hitCondition(ship, pointInfo) {
  // check if boats have sunk
  // check if all boats have sunk (win condition)
  var totalHits = 4;

  state.hitCounter++;
  ship.hitCount++;

  if(ship.hitCount === totalHits) {
    if(!ship.sunk) {
      state.sunkShip = ship.name;
      ship.sunk = true;
      setTimeout(() => {
        state.sunkShip = "";
      }, 2500);
    }
  }
  // place hit marker on proper board
  if(state.currentBoard === 'player') {
    state.playerBoard[pointInfo.row].splice(pointInfo.col, 1, 10);
    if(ship.sunk) state.playerSunk.push(ship.name);

  } else if(state.currentBoard === 'opponent') {
    state.opponentBoard[pointInfo.row].splice(pointInfo.col, 1, 10);
    if(ship.sunk) state.opponentSunk.push(ship.name);
  }

  if(state.playerSunk.length === 4) {
    //trigger win condition
    state.winPerson = "Player 2";
    state.winner = true;
  } else if (state.opponentSunk.length === 4) {
    state.winPerson = "Player 1";
    state.winner = true;
  }
}

const mutations = {
  setCurrentBoard: (state, boardType) => {
    state.currentBoard = boardType;
  },
  setPlayerBoard: (state) => {
    state.currentBoard = 'player';
    setShips(state.playerShips);
  },
  setOpponentBoard: (state) => {
    state.currentBoard = 'opponent';
    setShips(state.opponentShips);
  },

  attackOpponent: (state, pointInfo) => {
    if(state.currentBoard === 'player')
      checkPoint(state.playerShips, pointInfo);
    else if(state.currentBoard === 'opponent')
      checkPoint(state.opponentShips, pointInfo);
  },

  resetState: (state) => {
    Object.assign(state, {
      winner: false,
      winPerson: '',
      board: [],
      playerBoard: [],
      opponentBoard: [],
      currentBoard: '',
      currentShip: {},
      collisionFlag: false,
      hitCounter: 0,
      playerSunk: [],
      opponentSunk: [],
      sunkShip: "",
      playerShips: [
        {
          'name': 'L-Ship',
          'index': 1,
          'hitIndex': 5,
          'hitCount': 0,
          'sunk': false,
          'height': 3,
          'width': 2,
          'points': []
        },
        {
          'name': 'Dinghy',
          'index': 2,
          'hitIndex': 6,
          'hitCount': 0,
          'sunk': false,
          'height': 2,
          'width': 2,
          'points': []
        },
        {
          'name': 'Carrier 1',
          'index': 3,
          'hitIndex': 7,
          'hitCount': 0,
          'sunk': false,
          'height': 4,
          'width': 1,
          'points': []
        },
        {
          'name': 'Carrier 2',
          'index': 4,
          'hitIndex': 8,
          'hitCount': 0,
          'height': 4,
          'sunk': false,
          'width': 1,
          'points': []
        }
      ],
      opponentShips: [
        {
          'name': 'L-Ship',
          'index': 1,
          'hitIndex': 5,
          'hitCount': 0,
          'sunk': false,
          'height': 3,
          'width': 2,
          'points': []
        },
        {
          'name': 'Dinghy',
          'index': 2,
          'hitIndex': 6,
          'hitCount': 0,
          'sunk': false,
          'height': 2,
          'width': 2,
          'points': []
        },
        {
          'name': 'Carrier 1',
          'index': 3,
          'hitIndex': 7,
          'hitCount': 0,
          'sunk': false,
          'height': 4,
          'width': 1,
          'points': []
        },
        {
          'name': 'Carrier 2',
          'index': 4,
          'hitIndex': 8,
          'hitCount': 0,
          'height': 4,
          'sunk': false,
          'width': 1,
          'points': []
        }
      ],
    });
  }
}
const actions = {
  setOpponentBoard: async ({commit}) => {
    await commit('setPlayerBoard');
    commit('setOpponentBoard');
  },

  setCurrentBoard: ({commit}, boardType) => {
    commit('setCurrentBoard', boardType);
  },

  attackOpponent: ({commit}, pointInfo) => {
    commit('attackOpponent', pointInfo);
  },

  resetState: ({commit}) => {
    commit('resetState');
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}