<template>
  <div class="col" @click="handleFire">
    <div class="cell d-flex justify-content-center align-items-center">
        <i v-if="point === 10" class="fas fa-2x fa-exclamation"></i>
        <i v-if="point === 9" class="fas fa-2x fa-times"></i>
    </div>
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
        this.attackOpponent({'row': this.row, 'col': this.col, 'point': this.point});
        if(this.winner) {
          this.$router.push('end');
        }
        //determine if player 1 or player 2 is next
        // if(this.$router.currentRoute.path === '/player1') {
        //   this.$router.push('wait2');
        // } else if(this.$router.currentRoute.path === '/player2') {
        //   this.$router.push('wait1');
        // }
      }
    },
    mapActions('boards', {
      setCurrentBoard: 'setCurrentBoard',
      attackOpponent: 'attackOpponent'
    })
  ),
  computed: Object.assign(
    {},
    mapGetters('boards', {
      board: 'getPlayerBoard',
      winner: 'getWinner'
    })
  ),

  // watch: {
  //   winner: {
  //     handler: function(winVal) {
  //       console.log(winVal);
  //     },
  //     deep:true
  //   }
  // }
}
</script>

<style scoped>
.cell {
  height: 55px;
  margin: 0;
  border: 1px solid black;
}
</style>
