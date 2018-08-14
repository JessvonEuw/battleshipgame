<template>
  <div class="container">
    <h3>Player 2 Board</h3>
   <board :board="opponentBoard"></board>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  mounted () {
    //this.setBoard();
    this.setOpponentBoard();
  },
  methods: Object.assign(
    {},
    mapActions('boards', {
      setBoard: 'setBoard',
      setOpponentBoard: 'setOpponentBoard',
    })
  ),
  computed: Object.assign(
    {},
    mapGetters('boards', {
      opponentBoard: 'getOpponentBoard',
      ships: 'getShips',
      occupied: 'getOccupied'
    })
  )
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.simple-cell { background-color: #A499B3; }
.l-boat { background-color: #18314F; }
.dinghy { background-color: #820263; }
.carrier1 { background-color: #F75C03; }
.carrier2 { background-color: #6DAEDB; }
.hit { background-color: red; }
.miss { background-color: white; }
</style>