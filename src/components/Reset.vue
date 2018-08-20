<template>
  <div class="container">
    <router-link to="/">
      <button @click="resetState" type="button" class="btn btn-info btn-lg">{{text}}</button>
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

  methods: Object.assign(
    {
      resetState: function() {
        this.resetState();
      }
    },
    mapActions('boards', {
      resetState: 'resetState'
    })
  )
}
</script>
<style>
.board {
  margin-bottom: 5%;
}
</style>