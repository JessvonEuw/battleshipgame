<template>
  <div class="container">
    <div class="row justify-content-center align-items-center no-gutters" 
      :key="rIndex"
      v-for="(row, rIndex) in rows">
      <div class="col"> {{ row }} </div>
      <space
        :key="cIndex"
        v-for="(col, cIndex) in cols"
        :row="row"
        :col="col">
      </space>  
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data () {
    return {
      rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
      cols: [1, 2, 3, 4, 5, 6, 7, 8]
    }
  },
  mounted () {
    this.setBoard("BOARD");
  },
  methods: Object.assign(
    {
      drawCanvas() {
      }
    },
    mapActions('boards', {
      setBoard: 'setBoard'
    })
  ),
  computed: Object.assign(
    {},
    mapGetters('boards', {
      board: 'getBoard'
    })
  )
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  background-color: red;
}
</style>
