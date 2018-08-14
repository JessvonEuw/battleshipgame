<template>
  <div class="col" @click="handleFire">
    <p class="cell d-flex justify-content-center align-items-center">
        {{point}}
        <!-- <i v-if="point === 10" class="fas fa-2x fa-times"></i> -->

    </p>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

  export default {
  props: {
    row: Number,
    col: Number,
    point: Number
  },
  mounted () {
  },
  methods: Object.assign(
    {
      handleFire: function() {
        this.attackOpponent({'row': this.row, 'col': this.col});
      }
    },
    mapActions('boards', {
      attackOpponent: 'attackOpponent'
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

<style scoped>
.cell {
  height: 55px;
  margin: 0;
  border: 1px solid black;
}
</style>
