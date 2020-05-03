<template>
  <div class="header">
    <img
      class="flex-item"
      id="logo"
      alt="Center for Humanities Computing Aarhus"
      src="../assets/logo.jpg"
    />
    <h1 class="flex-item">{{ msg }}</h1>
    <p class="flex-item">
      This dashboard visualizes data on population responses to COVID-19.
      <br />
      <a href="https://hope-project.dk/dashboard" target="_blank" rel="noopener">Old dashboard.</a>.
    </p>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  display: flex;
  flex-direction: horizontal;
  background-color: #e0e0e0;
  color: #0e0e0e;
  text-align: center;
}
.flex-item {
  margin: 10px 10px;
}
h1 {
  font-weight: 1000;
}
</style>
