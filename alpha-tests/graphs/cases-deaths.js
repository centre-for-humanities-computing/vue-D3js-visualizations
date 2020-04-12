/**
 * REQUIRES THE FOLLOWING SCRIPTS:
 * <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js"></script>
 * <script src="https://cdn.plot.ly/plotly-latest.min.js" charset="utf-8"></script>
 *
 * The cases and deaths graph
 */

var data = [{
  x: ["2020-03-15", "2020-03-23", "2020-03-30", "2020-04-15"],
  y: [150, 75, 150, 250],
  type: 'scatter',
  name: 'Cases',
  xaxis: 'x1',
  yaxis: 'y1',
  line: {
    shape: 'spline',
    smoothing: 1.3
  }
}, {
  x: ["2020-03-15", "2020-03-23", "2020-03-30", "2020-04-15"],
  y: [0, 1, 8, 15],
  name: 'Deaths',
  xaxis: 'x2',
  yaxis: 'y2',
  type: 'scatter',
  line: {
    shape: 'spline',
    smoothing: 1.3
  }
}];
var layout = {
  yaxis2: {
    domain: [0, 0.5],
    anchor: 'x1'
  },
  xaxis2: {
    domain: [0, 1],
    anchor: 'y1',
    visible: false
  },
  yaxis1: {
    domain: [0.5, 1],
    anchor: 'x2'
  },
  xaxis1: {
    domain: [0, 1],
    anchor: 'y2',
    title: 'Date'
  },
  type: 'scatter',
  line: {
    enabled: false,
    shape: 'spline',
    smoothing: 1.3
  },
  legend: {
    orientation: 'h'
  }
};
Plotly.newPlot('graph-cases-deaths', data, layout);