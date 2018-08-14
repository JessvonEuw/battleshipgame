<template>
  <div class="container">
    <div class="row justify-content-center align-items-center no-gutters" 
      :key="rIndex"
      v-for="(row, rIndex) in board">
      <div class="col"> {{ rows[rIndex] }} </div>
      <space
        :key="cIndex"
        v-for="(col, cIndex) in row"
        :row="rIndex"
        :col="cIndex"
        :point="col"
        :class="{ 'l-boat' : (shipColor(col) === 1) }">
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
  mounted () {
    this.setBoard();
  },
  methods: Object.assign(
    {
      shipColor: function(shipIndex) {
        if(shipIndex === 1)
          return 1;
      }
    },
    mapActions('boards', {
      setBoard: 'setBoard'
    })
  ),
  computed: Object.assign(
    {},
    mapGetters('boards', {
      board: 'getBoard',
      occupied: 'getOccupied'
    })
  )
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.l-boat {
  background-color: red;
}
</style>
