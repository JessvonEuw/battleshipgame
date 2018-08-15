<template>
  <div class="container">
    <h5 class="text-danger">Click your Opponent's Board to Attack!</h5>
    <h3>{{currentPlayer}} (Your Opponent's) Board</h3>
    <div class="row justify-content-center align-items-center no-gutters" 
      :key="rIndex"
      v-for="(row, rIndex) in board">
      <div class="col-1"> {{ rows[rIndex] }} </div>
      <space
        :key="cIndex"
        v-for="(col, cIndex) in row"
        :row="rIndex"
        :col="cIndex"
        :point="col"
        class="simple-cell"
        :class="{ 
          'l-boat' : (col === 1), 
          'dinghy' : (col === 2), 
          'carrier1' : (col === 3), 
          'carrier2' : (col === 4),
          'miss' : (col === 9),
          'hit' : (col === 10) }">
      </space>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    board: Array,
    currentPlayer: String
  },
  data () {
    return {
      rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    }
  },
  methods: Object.assign(
    {},
    mapActions('boards', {})
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