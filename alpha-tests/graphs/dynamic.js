/**
 * REQUIRES THE FOLLOWING SCRIPTS:
 * <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js"></script>
 * <script src="https://cdn.plot.ly/plotly-latest.min.js" charset="utf-8"></script>
 *
 * The cases and deaths graph
 */

let settings = {
  type: 'scatter',
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
    title: 'Date'
  },
  legend: {
    orientation: 'h'
  },
  split: false,
  layout: {}
}

function MakeGraph(graphObject, settingsObject, url) {
  Plotly.d3.csv(url, function (csv) {
    ProcessCSV(csv, graphObject, settingsObject)
  });
}

function ProcessCSV(allRows, graphObject, settingsObject) {
  let columnNames = Object.keys(allRows[0])
  let dataArray = [
    []
  ]
  let dataObject = {}

  for (column in columnNames) {
    dataArray.push([])
    for (var i = 0; i < allRows.length; i++)
      dataArray[column].push(allRows[i][columnNames[column]]);
    dataObject[columnNames[column]] = dataArray[column]
  }
  PlotGraph(graphObject, settingsObject, dataObject)
}

function PlotGraph(graphObject, settingsObject, dataObject) {
  var data = [{}]
  for (const key of Object.keys(dataObject)) {
    console.log(key)
    if (key != 'Date') {
      data.push({
        x: dataObject['Date'],
        y: dataObject[key],
        name: key,
        type: settingsObject.type,
        line: settingsObject.line
      })
    }
  }

  Plotly.newPlot(graphObject.id, data, {
    title: graphObject.title,
    subtitle: graphObject.subtitle,
    yaxis: settingsObject.yaxis,
    legend: settingsObject.legend
  });
};

// Symptoms
MakeGraph({
    id: 'graph-symptoms',
    title: 'Symptoms in Denmark'
  },
  settings,
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRFNPoScuWNEmYshjNUyVrmEKTnTlMnrSh7hLUivm2gRrjKjMYQurcuYy5LyC6vWnlc1HmxkcOTncgb/pub?gid=807408432&single=true&output=csv"
)

// Habits
MakeGraph({
    id: 'graph-habits',
    title: 'Habits in Denmark'
  },
  settings,
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRFNPoScuWNEmYshjNUyVrmEKTnTlMnrSh7hLUivm2gRrjKjMYQurcuYy5LyC6vWnlc1HmxkcOTncgb/pub?gid=85087002&single=true&output=csv"
)

// Anxiety optimism
MakeGraph({
    id: 'graph-anxiety-optimism',
    title: 'Anxiety and Optimism in Denmark'
  },
  settings,
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRFNPoScuWNEmYshjNUyVrmEKTnTlMnrSh7hLUivm2gRrjKjMYQurcuYy5LyC6vWnlc1HmxkcOTncgb/pub?gid=922944771&single=true&output=csv"
)

// Compliance 1
MakeGraph({
    id: 'graph-compliance-1',
    title: 'Compliance in Denmark'
  },
  settings,
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRFNPoScuWNEmYshjNUyVrmEKTnTlMnrSh7hLUivm2gRrjKjMYQurcuYy5LyC6vWnlc1HmxkcOTncgb/pub?gid=274738500&single=true&output=csv"
)

// Compliance 2
MakeGraph({
    id: 'graph-compliance-2',
    title: 'Compliance in Denmark continued'
  },
  settings,
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRFNPoScuWNEmYshjNUyVrmEKTnTlMnrSh7hLUivm2gRrjKjMYQurcuYy5LyC6vWnlc1HmxkcOTncgb/pub?gid=740358026&single=true&output=csv"
)