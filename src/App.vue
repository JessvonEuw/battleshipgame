<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
      integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
      crossorigin="anonymous"
    />
    <div id="nav">
      <reset :text="'RESET'"></reset>
      <!-- <router-link to="/">Start</router-link> |
      <router-link to="/wait1">Transition1</router-link> |
      <router-link to="/player1">Player1</router-link> |
      <router-link to="/wait2">Transition2</router-link> |
      <router-link to="/player2">Player2</router-link> |
      <router-link to="/end">End</router-link> -->
    </div>
    <router-view />
  </div>
</template>
<script>
// @ is an alias to /src
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
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
