<template>
  <div id="app">
    <Header :msg="msg" />
    <CasesDeaths />
  </div>
</template>

<script>
// make a web form where you can generate graphs that
// are able to be deleted again. Use .csv URL, settings,
// config, and layout options. Jesus, epic.
// Include .csv upload and epic processing.

// Get a bit of the architecture from here:
// https://www.youtube.com/watch?v=Wy9q22isx3U
// https://vuejsexamples.net/vue-form-generator/
// https://github.com/vue-generators/vue-form-generator

// <div class="graph">
// <button @click="$deleteGraph(
// </div>
// methods: {
// deleteGraph(id) {
//  this.graphs = this.graphs.filter(graph => graph.id !== id);
//  }
// }
import Header from "./components/Header.vue";
import CasesDeaths from "./components/CasesDeaths.vue";

export default {
  name: "App",
  components: {
    Header,
    CasesDeaths,
  },
  data() {
    return {
      graphColors: [
        "#242424",
        "#FAA200",
        "#00B7EC",
        "#00A077",
        "#F5E636",
        "#0077B8",
        "#F3640D",
        "#E47EAD",
      ],
      msg: "HOPE Dashboard",
      urls: [
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vRFNPoScuWNEmYshjNUyVrmEKTnTlMnrSh7hLUivm2gRrjKjMYQurcuYy5LyC6vWnlc1HmxkcOTncgb/pub?gid=807408432&single=true&output=csv",
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vRFNPoScuWNEmYshjNUyVrmEKTnTlMnrSh7hLUivm2gRrjKjMYQurcuYy5LyC6vWnlc1HmxkcOTncgb/pub?gid=85087002&single=true&output=csv",
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vRFNPoScuWNEmYshjNUyVrmEKTnTlMnrSh7hLUivm2gRrjKjMYQurcuYy5LyC6vWnlc1HmxkcOTncgb/pub?gid=922944771&single=true&output=csv",
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vRFNPoScuWNEmYshjNUyVrmEKTnTlMnrSh7hLUivm2gRrjKjMYQurcuYy5LyC6vWnlc1HmxkcOTncgb/pub?gid=274738500&single=true&output=csv",
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vRFNPoScuWNEmYshjNUyVrmEKTnTlMnrSh7hLUivm2gRrjKjMYQurcuYy5LyC6vWnlc1HmxkcOTncgb/pub?gid=740358026&single=true&output=csv",
      ],
      layout: {
        yaxis2: {
          domain: [0, 0.5],
          anchor: "x1",
        },
        xaxis2: {
          domain: [0, 1],
          anchor: "y1",
          visible: false,
        },
        yaxis1: {
          domain: [0.5, 1],
          anchor: "x2",
        },
        xaxis1: {
          domain: [0, 1],
          anchor: "y2",
        },
        type: "scatter",
        line: { enabled: false, shape: "spline", smoothing: 1.3 },
        legend: {
          orientation: "h",
          x: 0.5,
          y: -0.15,
          xanchor: "center",
        },
        hovermode: "closest",
        hoverlabel: {},
        title: "Cases and Deaths in Denmark",
      },
      config: {
        displayModeBar: false,
      },
      settings: {
        type: "scatter",
        mode: "markers",
        line: {
          enabled: false,
          shape: "spline",
          smoothing: 1.3,
        },
        yaxis: {
          ticksuffix: "%",
          title: "Share of the public",
          range: [0, 100],
          zeroline: false,
        },
        xaxis: {
          title: "Date",
        },
        legend: {
          orientation: "h",
          x: 0.5,
          y: -0.15,
          xanchor: "center",
        },
        split: false,
        layout: {
          hovermode: "closest",
        },
      },
    };
  },
  methods: {
    deleteGraph(id) {
      this.graphs = this.graphs.filter((graph) => graph.id !== id);
    },
  },
};
</script>

<style>
#logo {
  max-width: 150px;
}
#app {
  font-family: Open Sans, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
body,
html,
template,
div {
  margin: 0;
}
a {
  color: #1900ff;
}
</style>
