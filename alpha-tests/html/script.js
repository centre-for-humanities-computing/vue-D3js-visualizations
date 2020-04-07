/*################################################################################
##################################################################################
##########                                                             ###########
##########                                                             ###########
##########        Windows Template by                                  ###########
##########            https://html5-templates.com/                      ###########
##########                                                             ###########
##########        All rights reserved.                                 ###########
##########                                                             ###########
##################################################################################
################################################################################*/

var i = 0,
	minimizedWidth = new Array,
	minimizedHeight = new Array,
	windowTopPos = new Array,
	windowLeftPos = new Array,
	panel,
	id;

function adjustFullScreenSize() {
	$(".fullSizeWindow .wincontent").css("width", (window.innerWidth - 32));
	$(".fullSizeWindow .wincontent").css("height", (window.innerHeight - 98));
}

function makeWindowActive(thisid) {
	$(".window").each(function () {
		$(this).css('z-index', $(this).css('z-index') - 1);
	});
	$("#window" + thisid).css('z-index', 1000);
	$(".window").removeClass("activeWindow");
	$("#window" + thisid).addClass("activeWindow");

	$(".taskbarPanel").removeClass('activeTab');

	$("#minimPanel" + thisid).addClass("activeTab");
}

function minimizeWindow(id) {
	windowTopPos[id] = $("#window" + id).css("top");
	windowLeftPos[id] = $("#window" + id).css("left");

	$("#window" + id).animate({
		top: 800,
		left: 0
	}, 200, function () { //animation complete
		$("#window" + id).addClass('minimizedWindow');
		$("#minimPanel" + id).addClass('minimizedTab');
		$("#minimPanel" + id).removeClass('activeTab');
	});
}

function openWindow(id) {
	if ($('#window' + id).hasClass("minimizedWindow")) {
		openMinimized(id);
	} else {
		makeWindowActive(id);
		$("#window" + id).removeClass("closed");
		$("#minimPanel" + id).removeClass("closed");
	}
}

function closeWindwow(id) {
	$("#window" + id).addClass("closed");
	$("#minimPanel" + id).addClass("closed");
}

function openMinimized(id) {
	$('#window' + id).removeClass("minimizedWindow");
	$('#minimPanel' + id).removeClass("minimizedTab");
	makeWindowActive(id);

	$('#window' + id).animate({
		top: windowTopPos[id],
		left: windowLeftPos[id]
	}, 200, function () {});
}

$(document).ready(function () {
	$(".window").each(function () { // window template
		$(this).css('z-index', 1000)
		$(this).attr('data-id', i);
		minimizedWidth[i] = $(this).width();
		minimizedHeight[i] = $(this).height();
		windowTopPos[i] = $(this).css("top");
		windowLeftPos[i] = $(this).css("left");
		$("#taskbar").append('<div class="taskbarPanel" id="minimPanel' + i + '" data-id="' + i + '">' + $(this).attr("data-title") + '</div>');
		if ($(this).hasClass("closed")) {
			$("#minimPanel" + i).addClass('closed');
		}
		$(this).attr('id', 'window' + (i++));
		$(this).wrapInner('<div class="wincontent"></div>');
		$(this).prepend('<div class="windowHeader"><strong>' + $(this).attr("data-title") + '</strong><span title="Minimize" class="winminimize"><span></span></span><span title="Maximize" class="winmaximize"><span></span><span></span></span><span title="Close" class="winclose">x</span></div>');
	});

	$("#minimPanel" + (i - 1)).addClass('activeTab');
	$("#window" + (i - 1)).addClass('activeWindow');

	$(".wincontent").resizable(); // resizable
	$(".window").draggable({
		cancel: ".wincontent"
	}); // draggable


	$(".window").mousedown(function () { // active window on top (z-index 1000)
		makeWindowActive($(this).attr("data-id"));
	});

	$(".winclose").click(function () { // close window
		closeWindwow($(this).parent().parent().attr("data-id"));
	});

	$(".winminimize").click(function () { // minimize window
		minimizeWindow($(this).parent().parent().attr("data-id"));
	});

	$(".taskbarPanel").click(function () { // taskbar click
		id = $(this).attr("data-id");
		if ($(this).hasClass("activeTab")) { // minimize if active
			minimizeWindow($(this).attr("data-id"));
		} else {
			if ($(this).hasClass("minimizedTab")) { // open if minimized
				openMinimized(id);
			} else { // activate if inactive
				makeWindowActive(id);
			}
		}
	});

	$(".openWindow").click(function () { // open closed window
		openWindow($(this).attr("data-id"));
	});

	$(".winmaximize").click(function () {
		if ($(this).parent().parent().hasClass('fullSizeWindow')) { // minimize

			$(this).parent().parent().removeClass('fullSizeWindow');
			$(this).parent().parent().children(".wincontent").height(minimizedHeight[$(this).parent().parent().attr("data-id")]);
			$(this).parent().parent().children(".wincontent").width(minimizedWidth[$(this).parent().parent().attr("data-id")]);
		} else { // maximize
			$(this).parent().parent().addClass('fullSizeWindow');

			minimizedHeight[$(this).parent().parent().attr('data-id')] = $(this).parent().parent().children(".wincontent").height();
			minimizedWidth[$(this).parent().parent().attr('data-id')] = $(this).parent().parent().children(".wincontent").width();

			adjustFullScreenSize();
		}
	});
	adjustFullScreenSize();

	HighChartsWrapper('graph-cases-deaths',
		"https://docs.google.com/spreadsheets/d/e/2PACX-1vRFNPoScuWNEmYshjNUyVrmEKTnTlMnrSh7hLUivm2gRrjKjMYQurcuYy5LyC6vWnlc1HmxkcOTncgb/pub?gid=0&single=true&output=csv",
		'Cases and Deaths in Denmark', 'Data from the surveys performed')
	HighChartsWrapper('graph-symptoms',
		"https://docs.google.com/spreadsheets/d/e/2PACX-1vRFNPoScuWNEmYshjNUyVrmEKTnTlMnrSh7hLUivm2gRrjKjMYQurcuYy5LyC6vWnlc1HmxkcOTncgb/pub?gid=807408432&single=true&output=csv",
		'Symptoms', '', 'Percentage share of population')
	HighChartsWrapper('graph-habits',
		"https://docs.google.com/spreadsheets/d/e/2PACX-1vRFNPoScuWNEmYshjNUyVrmEKTnTlMnrSh7hLUivm2gRrjKjMYQurcuYy5LyC6vWnlc1HmxkcOTncgb/pub?gid=85087002&single=true&output=csv",
		'Habits')
	HighChartsWrapper('graph-anxiety-optimism',
		"https://docs.google.com/spreadsheets/d/e/2PACX-1vRFNPoScuWNEmYshjNUyVrmEKTnTlMnrSh7hLUivm2gRrjKjMYQurcuYy5LyC6vWnlc1HmxkcOTncgb/pub?gid=922944771&single=true&output=csv",
		'Anxiety and optimism')
	HighChartsWrapper('graph-compliance',
		"https://docs.google.com/spreadsheets/d/e/2PACX-1vRFNPoScuWNEmYshjNUyVrmEKTnTlMnrSh7hLUivm2gRrjKjMYQurcuYy5LyC6vWnlc1HmxkcOTncgb/pub?gid=274738500&single=true&output=csv",
		'Compliance')
});

function HighChartsWrapper(graphID, graphDataURL, graphTitle = '', graphSubtitle = '', graphY = '') {
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
}