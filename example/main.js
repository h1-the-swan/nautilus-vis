function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0; i<vars.length; i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable) {return pair[1];}
    }
    return(false);
}

var citationVis = nautilus_vis.citationVis;
var egoGraphVis = nautilus_vis.egoGraphVis;
var lineChartByYear = nautilus_vis.lineChartByYear;

d3.json(citationvis_data, function(error, graph) {
	if (error) {
		throw error;
	}
	// main(graph);
	console.log(citationVis);
	main(graph);
});

function main(graph) {
if (citationvis_data === 'ABORT') {
	return;
}

d3.select('#mainDiv').append('p')
	.attr("class", "loadingText")
	.text('Loading...');


// d3.json(citationvis_data, function(error, graph) {
	console.log(graph);

	// Get the most common Domain IDs for the ego author's papers
	var domainsNest = d3.nest()
		.key(function(d) { return d.DomainID; }).sortValues(d3.descending)
		.rollup(function(leaves) { return leaves.length; })
		.entries(graph.nodes[0].papers);
	domainsNest.sort(function(a,b) { return d3.descending(a.values, b.values); });
	// store as a node property
	graph.nodes[0].DomainCounts = domainsNest;
	// d3.select('#infoDiv').append('p').text(graph.nodes[0].AuthorName);

	var default_options = citationVis.default_options, 
		summaryStatistics = citationVis.summaryStatistics,
		egoGraphData = citationVis.egoGraphData,
	    lineChartData = citationVis.lineChartData,
		eventListeners = citationVis.eventListeners;

	console.log(default_options);
	var options = default_options.defaults;

	graph = summaryStatistics.addSummaryStatistics(graph);
	citationVis.graph_data = egoGraphData.prepare_egoGraphData(graph);
	citationVis.publications_data = lineChartData.prepareData_egoAuthorPublications(graph);
	citationVis.all_citations_data = lineChartData.prepareData_allCitations(graph);
	citationVis.eigenfactor_sum_data = lineChartData.prepareData_authorEigenfactorSum(graph);

	// Visualization objects go here
	citationVis.egoGraphVis = new egoGraphVis(citationVis.graph_data);
	// citationVis.publicationsLineChart = new lineChartByYear(citationVis.publications_data);
	// citationVis.citationsLineChart = new lineChartByYear(citationVis.all_citations_data);
	// citationVis.eigenfactorSumLineChart = new lineChartByYear(citationVis.eigenfactor_sum_data);
	citationVis.lineCharts = [];
	citationVis.lineCharts.push(new lineChartByYear(citationVis.publications_data));
	citationVis.lineCharts.push(new lineChartByYear(citationVis.all_citations_data));
	citationVis.lineCharts.push(new lineChartByYear(citationVis.eigenfactor_sum_data));

	options.transitionTimePerYear = citationVis.getTransitionTimePerYear(graph);

	citationVis.egoGraphVis.importDefaultOptions(options);
	for (var i=0; i<citationVis.lineCharts.length; i++) {
		citationVis.lineCharts[i].importDefaultOptions(options);
	}

	citationVis.egoGraphVis.init();
	for (var i=0; i<citationVis.lineCharts.length; i++) {
		citationVis.lineCharts[i].init();
	}
	$.event.trigger({
		type: "initComplete",
	});

	citationVis.lineCharts[0].addTitle("Number of publications");
	citationVis.lineCharts[1].addTitle("Number of citations received");
	var ctrtype = getQueryVariable("ctrtype");
	if (!ctrtype) {
		ctrtype = "author";
	}
	console.log(ctrtype);
	// citationVis.lineCharts[2].addTitle("Sum of eigenfactor for this author's publications by year");
	citationVis.lineCharts[2].addTitle("Sum of eigenfactor for this " + ctrtype + "'s publications by year");


	$( document ).on( "yearChange", function() {
		var currYear = citationVis.egoGraphVis.currYear;
		for (var i=0; i<citationVis.lineCharts.length; i++) {
			citationVis.lineCharts[i].moveYearIndicator(currYear);
		}
	});

	// Hack to label the publications line chart. TODO: Fix this later
	// var pubs = d3.select(citationVis.publicationsLineChart.chartDiv[0][0]);
	// var pubs = d3.select(citationVis.lineCharts[0].chartDiv[0][0]);
	// var pubsAxisLabel = pubs.select('.y.axis').select('.axisLabel');
	// pubsAxisLabel.text('Num publications');

	// Hack to alter eigenfactor line chart. TODO: Fix this later
	// citationVis.eigenfactorSumLineChart.yAxis.tickFormat(d3.format('e'));
	citationVis.lineCharts[2].yAxis.tickFormat(d3.format('e'));
	// var EFChart = d3.select(citationVis.eigenfactorSumLineChart.chartDiv[0][0]);
	// var EFChart = d3.select(citationVis.lineCharts[2].chartDiv[0][0]);
	// EFChart.select('.y.axis')
	// 	// .call(citationVis.eigenfactorSumLineChart.yAxis)
	// 	.call(citationVis.lineCharts[2].yAxis)
	// 	.select('.axisLabel').text('Sum of Eigenfactor');


	// Event listeners
	// Event listeners that act across different visualization objects go here
	citationVis.yearTickClickEventListener();
	
	d3.select(".loadingText").remove();
// })(citationvis_data);
}
