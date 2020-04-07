const Highcharts = require('highcharts')

Highcharts.chart(graphID, {
  title: {
    text: graphTitle
  },
  subtitle: {
    text: graphSubtitle
  },
  yAxis: {
    title: {
      text: graphY
    }
  },
  xAxis: {
    accessibility: {
      rangeDescription: 'Dates'
    }
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle'
  },

  plotOptions: {
    series: {
      marker: {
        enabled: false
      }
    }
  },

  data: {
    csvURL: graphDataURL
  },

  series: [{
    regression: true,
    regressionSettings: {
      type: 'polynomial',
      color: 'rgba(223, 183, 83, .9)',
      dashStyle: 'dash'
    },
    name: 'Test input',
    color: 'rgba(223, 83, 83, .5)'
  }],

  responsive: {
    rules: [{
      condition: {
        maxWidth: 500
      },
      chartOptions: {
        legend: {
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'bottom'
        }
      }
    }]
  }
});