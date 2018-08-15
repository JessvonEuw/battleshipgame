<template>
  <div class="container">
    <router-link to="/">
      <button @click="resetState" type="button" class="btn btn-dark">{{text}}</button>
    </router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    text: String
  },
  mounted () {
    this.setCurrentBoard('opponent');
  },

  methods: Object.assign(
    {
      resetState: function() {
        
      }
    },
    mapActions('boards', {
      setCurrentBoard: 'setCurrentBoard'
    })
  ),
  computed: Object.assign(
    {},
    mapGetters('boards', {
      opponentBoard: 'getOpponentBoard',
      playerBoard: 'getPlayerBoard'
    })
  ) 
}
</script>
<style>
.board {
  margin-bottom: 5%;
}
</style>