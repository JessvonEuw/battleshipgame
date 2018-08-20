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
    if(this.$parent.$options._componentTag === 'opponent-board') {
      this.setCurrentBoard('opponent');
    } else {
      this.setCurrentBoard('player');
    }
  },
  methods: Object.assign(
    {
      handleFire: function() {
        if (this.$parent.$options._componentTag === 'opponent-board' 
          && this.point !== 9 && this.point !== 10) {
          this.attackOpponent({'row': this.row, 'col': this.col, 'point': this.point});
        
          setTimeout(() => {
            if(this.winner) {
              this.$router.push('end');
            }
            if(this.$router.currentRoute.path === '/player1') {
              this.$router.push('wait2');
            } else if(this.$router.currentRoute.path === '/player2') {
              this.$router.push('wait1');
            }
          }, 1500);
        }
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
      currentBoard: 'getCurrentBoard',
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
