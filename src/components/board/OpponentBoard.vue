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
  mounted: function() {
    this.setCurrentBoard('opponent');
  },
  methods: Object.assign(
    {},
    mapActions('boards', {
      setCurrentBoard: 'setCurrentBoard'
    })
  ),
  computed: Object.assign({}, mapGetters('boards', {}))
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.simple-cell {
  background-color: #98B9F2; 
  cursor: grab;
}
/* .l-boat { background-color: #141B41; }
.dinghy { background-color: #7A306C; }
.carrier1 { background-color: #4C2A85; }
.carrier2 { background-color: #1481BA; } */
.hit { background-color: red; }
.miss { background-color: white; }
</style>