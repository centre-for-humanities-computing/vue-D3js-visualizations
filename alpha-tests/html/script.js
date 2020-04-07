$(document).ready(function () {
	HighChartsWrapper('graph-cases-deaths',
		`Date,Cases,Deaths
	2020-03-15,150,0
	2020-03-23,75,1
	2020-03-30,150,8
	2020-04-15,250,15`,
		'Cases and Deaths in Denmark', 'Data from the surveys performed')
	HighChartsWrapper('graph-symptoms',
		`Date,Fever,Sore throat,Cough,Sore muscles,Breathlessness,Headache
		2020-03-15,7,15,27,12,4,25
		2020-03-23,5,17,25,13,5,26
		2020-03-30,6,12,20,9,3,23
		2020-04-15,3,11,19,11,2,26`,
		'Symptoms', '', 'Percentage share of population')
	HighChartsWrapper('graph-habits',
		`Date,Contact,Eaten healthy,Excercise,Feeling alone
		2020-03-15,50,77,49,18
		2020-03-23,23,76,54,22
		2020-03-30,24,75,55,24
		2020-04-15,23,74,53,23`,
		'Habits')
	HighChartsWrapper('graph-anxiety-optimism',
		`Date,Anxiety,Optimism
		2020-03-15,75,80
		2020-03-23,82,79
		2020-03-30,85,82
		2020-04-15,82,88`,
		'Anxiety and optimism')
	HighChartsWrapper('graph-compliance',
		`Date,Sneezing in sleeve,Do not handshake,Hug and kiss only family,Do not stockpile,Do not use public transport,Avoid 10+ crowds,Keep distance to strangers,Keep distance to weak and sick
		2020-03-15,69,94,90,97,93,61,91,85
		2020-03-23,72,96,94,95,95,86,95,93
		2020-03-30,73,97,95,94,94,85,94,92
		2020-04-15,69,96,93,93,93,84,95,95`,
		'Compliance')
});

function HighChartsWrapper(graphID, graphDataURL, graphTitle = '', graphSubtitle = '', graphY = '') {
	Highcharts.chart(graphID, {
		title: {
			text: 'graphTitle'
		},
		subtitle: {
			text: 'graphSubtitle'
		},
		yAxis: {
			title: {
				text: 'graphY'
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
					enabled: true
				}
			}
		},

		data: {
			csv: graphDataURL
			// csvURL: graphDataURL
		},

		series: [{
			regression: true,
			regressionSettings: {
				type: 'polynomial',
				color: 'rgba(223, 183, 83, .9)',
				dashStyle: 'dash'
			},
			name: 'Test input',
			color: 'rgba(223, 83, 83, .5)',
			data: [
				[1, 3],
				[2, 4],
				[3.4, 5]
			]
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
}