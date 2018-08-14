<template>
  <div class="container">
    <h3>Player 1 Board</h3>
    <board :board="playerBoard"></board>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data () {
    return {
      //playerBoard: []
    }
  },
  mounted () {
   // this.setPlayerBoard();
    //this.setBoard();
    //this.setShips();
  },
  methods: Object.assign(
    {},
    mapActions('boards', {
      setBoard: 'setBoard',
      setPlayerBoard: 'setPlayerBoard',
      setCurrentBoard: 'setCurrentBoard',
      //setShips: 'setShips'
    })
  ),
  computed: Object.assign(
    {},
    mapGetters('boards', {
      playerBoard: 'getPlayerBoard',
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
