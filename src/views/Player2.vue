<template>
  <div class="container">
    <div class="row justify-content-center">
      <h5 class="text-danger">Click your Opponent's Board to Attack!</h5>
    </div>
    <div v-if="sunkShip !== ''" class="alert alert-success" role="alert">
      You have sunk your opponent's <strong>{{ sunkShip }}</strong>!
    </div>
    <div class="row">
      <div class="col-6">
        <player-board :board="opponentBoard" :currentPlayer="'Player 2'"></player-board>
      </div>
      <div class="col-6">
        <opponent-board :board="playerBoard" :currentPlayer="'Player 1'"></opponent-board>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from "vuex";

export default {
  mounted () {
    this.setCurrentBoard('player');
  },
  methods: Object.assign(
    {},
    mapActions('boards', {
      setCurrentBoard: 'setCurrentBoard',
    })
  ),
  computed: Object.assign(
    {},
    mapGetters('boards', {
      opponentBoard: 'getOpponentBoard',
      playerBoard: 'getPlayerBoard',
      sunkShip: 'getSunkShip'
    })
  ) 
}
</script>
<style>
.board { margin-bottom: 5%; }
</style>
