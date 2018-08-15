<template>
  <div class="container">
    <h1>Welcome to the Wonderful World of BattleShip!</h1>
    <h3>Grab a partner and begin!</h3>
    <img src="src/assets/ship.jpg" alt="">
    <router-link to="/player1">
     <button type="button" class="btn btn-dark">Start</button>
    </router-link> 
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  methods: Object.assign(
    {},
    mapActions('boards', {
      setOpponentBoard: 'setOpponentBoard'
    })
  ),
  computed: Object.assign({}, mapGetters('boards', {})
  ) 
}
</script>