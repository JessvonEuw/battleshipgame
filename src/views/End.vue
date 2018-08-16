<template>
  <div class="container">
    <h2>{{ winPerson }} Won!</h2>
    <div class="row">
      <div class="col player-title">
        Player 1 Ships Lost
      </div>
      <div class="col player-title">
        Player 2 Ships Lost
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div
          :key="sIndex"
          v-for="(pShip, sIndex) in playerSunk">
          {{ pShip }}
        </div>
      </div>
      <div class="col">
        <div
          :key="sIndex"
          v-for="(oShip, sIndex) in opponentSunk">
          {{ oShip }}
        </div>
      </div>
    </div>
    <reset :text="'PLAY AGAIN?'"></reset>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  mounted () {
    this.setCurrentBoard('opponent');
    this.setCurrentPlayer('Player 1');
  },

  methods: Object.assign(
    {},
    mapActions('boards', {
      setCurrentBoard: 'setCurrentBoard',
      setCurrentPlayer: 'setCurrentPlayer'
    })
  ),
  computed: Object.assign(
    {},
    mapGetters('boards', {
      playerSunk: 'getPlayerSunk',
      opponentSunk: 'getOpponentSunk',
      winPerson: 'getWinPerson',
    })
  ) 
}
</script>
<style>
.board {
  margin-bottom: 5%;
}
.player-title {
  font-size: 18px;
  font-weight: 700;
  text-decoration: underline;
}
</style>