<template>
  <div class="col">
    <p class="cell">{{ row }} {{ col }}</p>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

  export default {
  props: {
    row: String,
    col: Number
  },
  mounted () {
  },
  methods: Object.assign(
    {
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
  height: 40px;
  margin: 0;
  border: 1px solid black;
}
</style>
