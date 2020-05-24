<template>
  <div class="container">
    <h1>Welcome to the Wonderful World of BattleShip!</h1>
    <h3>Grab a partner and begin!</h3>
    <div>
      <img src="../assets/ship.jpg" />
    </div>
    <router-link to="/player1">
      <button type="button" class="btn btn-dark btn-lg">
        <strong>START</strong>
      </button>
    </router-link>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  mounted() {
    this.setOpponentBoard();
  },
  methods: Object.assign(
    {},
    mapActions("boards", {
      setOpponentBoard: "setOpponentBoard",
    })
  ),
};
</script>
<style>
img {
  width: 40%;
  height: auto;
  border-radius: 3%;
  border: 3px solid black;
  margin: 5%;
}
</style>
