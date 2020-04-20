/**
 * REQUIRES THE FOLLOWING SCRIPTS:
 * <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js"></script>
 * <script src="https://cdn.plot.ly/plotly-latest.min.js" charset="utf-8"></script>
 * <script src="https://cdnjs.cloudflare.com/ajax/libs/regression/1.4.0/regression.min.js"></script>
 * <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
 *
 * The dynamic graphs input
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

var config = {
  displayModeBar: false
}

// At the moment only supports the shown settings (except "split"):
let settings = {
  type: 'scatter',
  mode: 'markers',
  line: {
    enabled: false,
    shape: 'spline',
    smoothing: 1.3
  },
  yaxis: {
    ticksuffix: "%",
    title: 'Share of the public',
    range: [0, 100],
    zeroline: false
  },
  xaxis: {
    title: "Date"
  },
  legend: {
    orientation: 'h',
    x: 0.5,
    y: -0.15,
    xanchor: 'center'
  },
  split: false,
  layout: {
    hovermode: 'closest'
  }
}

/**
 * Creates a graph with specified settings
 * and graph visualization settings
 * Assumes a .csv structure of Date,vars[1],vars[2],...,vars[n]
 * @params graphObject, settingsObject, csv url, config settings
 */
function MakeGraph(graphObject, settingsObject, url, config) {
  Plotly.d3.csv(url, function (csv) {
    ProcessAndShow(csv, graphObject, settingsObject, config)
  });
}

function ProcessAndShow(allRows, graphObject, settingsObject, config) {
  let columnNames = Object.keys(allRows[0])
  let dataArray = [
    []
  ]
  let regressionPoints
  let dataObject = {}
  let data = [{}]

  // Loops through the column names (as proxy of variable amount)
  $.map(columnNames, function (name, column) {
    dataArray.push([])
    // Creates a data array instead of the object returned
    // automatically so it can be used in the series objects
    $.map(allRows, function (row) {
      dataArray[column].push(row[name])
    });
    dataObject[name] = dataArray[column]
    if (column != 0) {
      // Pushes to the series object a list of points for it to
      // plot in the specified manner
      data.push({
        x: dataObject['Date'],
        y: dataObject[name],
        name: name,
        type: settingsObject.type,
        line: settingsObject.line,
        mode: settingsObject.mode,
        marker: {
          color: graphColors[column - 1]
        }
      })
      // Checks if the graphObject settings says to put regressions in
      if (graphObject.regression) {
        regressionPoints = Regression(dataArray, column)
        data.push({
          x: SelectColumn(regressionPoints, 0),
          y: SelectColumn(regressionPoints, 1),
          name: "Regression: " + name,
          mode: "lines",
          line: {
            shape: 'spline',
            smoothing: 1.3,
            color: graphColors[column - 1]
          },
          hovermode: false,
          showlegend: false
        })
      }
    }
  });

  // Creates the plot in the specified id with the specified data
  // with the specified graph object and settings object
  Plotly.newPlot(graphObject.id, data, {
      title: graphObject.title,
      subtitle: graphObject.subtitle,
      yaxis: settingsObject.yaxis,
      legend: settingsObject.legend,
      hovermode: settingsObject.layout.hovermode
    },
    config
  );
}

/**
 * Selects the column indices from the data.
 * @params data = [[]], indices = []
 * @returns columns = [[]]
 */
function SelectColumn(data, index) {
  // Assuming data style [[,],[,],...]
  column = []
  selected = []
  for (row in data) {
    column.push(data[row][index])
  }
  return column
}

/**
 * Returns regression points for the data
 * @params data = [[Date,],[,],...], index = column,
 *    taylorLevel = 4 (describes the polynomial fitting)
 * @returns regressionPoints = [[,]]
 */
function Regression(data, index, taylorLevel = 4) {
  parseDate = Plotly.d3.time.format("%Y-%m-%d").parse
  let regressionArray2D = []
  // Input is rows = [[]]
  for (i = 0; i < data[0].length; i++) {
    regressionArray2D.push([parseDate(data[0][i]), data[index][i]])
  }
  regressionArray2D = regression('polynomial', regressionArray2D, taylorLevel).points
  return regressionArray2D
}

// Symptoms
MakeGraph({
    id: 'graph-symptoms',
    title: 'Symptoms in Denmark',
    subtitle: 'Danes with signs of symptoms',
    regression: true
  },
  settings,
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRFNPoScuWNEmYshjNUyVrmEKTnTlMnrSh7hLUivm2gRrjKjMYQurcuYy5LyC6vWnlc1HmxkcOTncgb/pub?gid=807408432&single=true&output=csv",
  config
)

// Habits
MakeGraph({
    id: 'graph-habits',
    title: 'Habits in Denmark',
    regression: true
  },
  settings,
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRFNPoScuWNEmYshjNUyVrmEKTnTlMnrSh7hLUivm2gRrjKjMYQurcuYy5LyC6vWnlc1HmxkcOTncgb/pub?gid=85087002&single=true&output=csv",
  config
)

// Anxiety optimism
MakeGraph({
    id: 'graph-anxiety-optimism',
    title: 'Anxiety and Optimism in Denmark',
    regression: true
  },
  settings,
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRFNPoScuWNEmYshjNUyVrmEKTnTlMnrSh7hLUivm2gRrjKjMYQurcuYy5LyC6vWnlc1HmxkcOTncgb/pub?gid=922944771&single=true&output=csv",
  config
)

// Compliance 1
MakeGraph({
    id: 'graph-compliance-1',
    title: 'Compliance in Denmark',
    regression: true
  },
  settings,
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRFNPoScuWNEmYshjNUyVrmEKTnTlMnrSh7hLUivm2gRrjKjMYQurcuYy5LyC6vWnlc1HmxkcOTncgb/pub?gid=274738500&single=true&output=csv",
  config
)

// Compliance 2
MakeGraph({
    id: 'graph-compliance-2',
    title: 'Compliance in Denmark continued',
    regression: true
  },
  settings,
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRFNPoScuWNEmYshjNUyVrmEKTnTlMnrSh7hLUivm2gRrjKjMYQurcuYy5LyC6vWnlc1HmxkcOTncgb/pub?gid=740358026&single=true&output=csv",
  config
)