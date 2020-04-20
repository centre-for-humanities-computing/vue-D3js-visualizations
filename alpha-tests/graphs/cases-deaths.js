/**
 * REQUIRES THE FOLLOWING SCRIPTS:
 * <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js"></script>
 * <script src="https://cdn.plot.ly/plotly-latest.min.js" charset="utf-8"></script>
 * <script src="https://cdnjs.cloudflare.com/ajax/libs/regression/1.4.0/regression.min.js"></script>
 * <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
 *
 * The cases and deaths graph
 */

/**
 * These colors are chosen in accordance with the Color Universal Design (CUD)
 * for figures and graphs friendly for color blind people (M. Okabe, K. Ito, 2008)
 * https://jfly.uni-koeln.de/color/
 */
let graphColors = [
  "#242424",
  "#FAA200",
  "#00B7EC",
  "#00A077",
  "#F5E636",
  "#0077B8",
  "#F3640D",
  "#E47EAD"
]

// Manually inserted cases and deaths data
// This graph generally serves as a test bed for the
// automated setup in the MakeGraph function later.
parseDate = Plotly.d3.time.format("%Y-%m-%d").parse
cases = [
  [parseDate("2020-03-15"), 150],
  [parseDate("2020-03-23"), 75],
  [parseDate("2020-03-30"), 150],
  [parseDate("2020-04-15"), 250]
]
cases_points = regression('polynomial', cases, 3).points
deaths = [
  [parseDate("2020-03-15"), 0],
  [parseDate("2020-03-23"), 1],
  [parseDate("2020-03-30"), 8],
  [parseDate("2020-04-15"), 15]
]
deaths_points = regression('polynomial', deaths, 3).points

// The cases and deaths graph
var data = [{
  x: ["2020-03-15", "2020-03-23", "2020-03-30", "2020-04-15"],
  y: [150, 75, 150, 250],
  type: 'scatter',
  mode: 'markers',
  name: 'Cases',
  xaxis: 'x1',
  yaxis: 'y1',
  marker: {
    color: graphColors[0]
  }
  //        line: {shape: 'spline', smoothing: 1.3}
}, {
  x: ["2020-03-15", "2020-03-23", "2020-03-30", "2020-04-15"],
  y: [0, 1, 8, 15],
  name: 'Deaths',
  xaxis: 'x2',
  yaxis: 'y2',
  type: 'scatter',
  mode: 'markers',
  marker: {
    color: graphColors[1]
  }
  //        line: {shape: 'spline', smoothing: 1.3}
}, {
  x: SelectColumn(cases_points, 0),
  y: SelectColumn(cases_points, 1),
  type: 'scatter',
  mode: 'lines',
  name: 'Regression',
  xaxis: 'x1',
  yaxis: 'y1',
  line: {
    shape: 'spline',
    smoothing: 1.3,
    color: graphColors[0]
  },
  showlegend: false,
  hovermode: false
}, {
  x: SelectColumn(deaths_points, 0),
  y: SelectColumn(deaths_points, 1),
  type: 'scatter',
  mode: 'lines',
  name: 'Regression',
  xaxis: 'x2',
  yaxis: 'y2',
  line: {
    shape: 'spline',
    smoothing: 1.3,
    color: graphColors[1]
  },
  showlegend: false,
  hovermode: false
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
    anchor: 'y2'
  },
  type: 'scatter',
  line: {
    enabled: false,
    shape: 'spline',
    smoothing: 1.3
  },
  legend: {
    orientation: 'h',
    x: 0.5,
    y: -0.15,
    xanchor: 'center'
  },
  hovermode: 'closest',
  hoverlabel: {},
  title: "Cases and Deaths in Denmark"
};

var config = {
  displayModeBar: false
}

Plotly.newPlot('graph-cases-deaths', data, layout, config);