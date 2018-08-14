<template>
  <div class="container">
    <div class="row board">
      <opponent-board></opponent-board>
    </div>
    <div class="row board">
      <player-board></player-board>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from "vuex";

export default {
  mounted () {
    //this.setBoard();
  },
  methods: Object.assign(
    {},
    mapActions('boards', {
      //setBoard: 'setBoard',
      //setPlayerBoard: 'setPlayerBoard',
      setShips: 'setShips'
    })
  ),
  computed: Object.assign(
    {},
    mapGetters('boards', {
      board: 'getBoard',
      ships: 'getShips',
      occupied: 'getOccupied'
    })
  ) 
}
</script>
<style>
.board {
  margin-bottom: 5%;
}
</style>

