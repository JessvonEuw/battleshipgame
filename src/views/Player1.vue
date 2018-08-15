<template>
  <div class="container">
    <div class="row board">
      <opponent-board :board="opponentBoard" :currentPlayer="'Player 2'"></opponent-board>
    </div>
    <div class="row board">
      <player-board :board="playerBoard" :currentPlayer="'Player 1'"></player-board>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from "vuex";

export default {
  mounted () {
    //this.setOpponentBoard();
  },
  methods: Object.assign(
    {},
    mapActions('boards', {
      setOpponentBoard: 'setOpponentBoard'
    })
  ),
  computed: Object.assign(
    {},
    mapGetters('boards', {
      opponentBoard: 'getOpponentBoard',
      playerBoard: 'getPlayerBoard'
    })
  ) 
}
</script>
<style>
.board {
  margin-bottom: 5%;
}
</style>

