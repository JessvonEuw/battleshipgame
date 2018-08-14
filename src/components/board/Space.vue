<template>
  <div class="col" @click="handleFire">
    <p class="cell"></p>
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
        //console.log("Row: " + this.row);
        //console.log("Col: " + this.col);
      }
    },
    mapActions('boards', {
    })
  ),
  computed: Object.assign(
    {},
    mapGetters('boards', {
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
