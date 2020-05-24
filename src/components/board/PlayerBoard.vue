<template>
  <div class="container">
    <div class="row justify-content-center">
      <h3>{{currentPlayer}} (Your) Board</h3>
    </div>
    <div
      class="row justify-content-center align-items-center no-gutters"
      :key="rIndex"
      v-for="(row, rIndex) in board"
    >
      <div class="col-1">{{ rows[rIndex] }}</div>
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
          'hit' : (col === 10) }"
      ></space>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    board: Array,
    currentPlayer: String
  },
  data() {
    return {
      rows: ["A", "B", "C", "D", "E", "F", "G", "H"]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.simple-cell {
  background-color: #98b9f2;
  cursor: grab;
}
.l-boat {
  background-color: #141b41;
}
.dinghy {
  background-color: #7a306c;
}
.carrier1 {
  background-color: #4c2a85;
}
.carrier2 {
  background-color: #1481ba;
}
.hit {
  background-color: red;
}
.miss {
  background-color: white;
}
</style>
