<template>
  <div class="container">
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
  data () {
    return {
      rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    }
  },
  props: {
    board: Array
  },
  mounted () {
  },
  methods: Object.assign(
    {},
    mapActions('boards', {
      //setBoard: 'setBoard',
      //setShips: 'setShips'
    })
  ),
  computed: Object.assign(
    {},
    mapGetters('boards', {
      //board: 'getBoard',
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
