// https://css-tricks.com/snippets/javascript/get-url-variables/
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


// citationvis_data is a variable defined in the flask template that includes this js file (e.g. vismain.html)

var citationVis = citationVis || {};

citationVis.getTransitionTimePerYear= function(graph, longestYearTransitionTime) {
	console.log(graph);
	// This will let us vary the transition time per year
	var transitionTimePerYear = {};
	var emptyYearTransitionTime = 300;
	// var longestYearTransitionTime = 4000;
	// Set default value:
	// http://stackoverflow.com/questions/894860/set-a-default-parameter-value-for-a-javascript-function
	var longestYearTransitionTime = typeof longestYearTransitionTime !== 'undefined' ? longestYearTransitionTime : 4000;
	// This scale takes the number of nodes for a given year as input
	// and outputs the transition time, based on a threshold mapping
	var thresholdScale = d3.scale.threshold()
		.domain([1, 3, 10, 20, 30])
		.range([
				emptyYearTransitionTime,  // zero nodes
				longestYearTransitionTime * .2,  // one or two nodes
				longestYearTransitionTime * .5, // 3 to 9
				longestYearTransitionTime * .7,  // 10 to 19
				longestYearTransitionTime * .85,  // 20 to 29
				longestYearTransitionTime  // 30+
				]);
	var yearRange = graph.graph.yearRange;
	
	// Put the transition time for each year into an object
	for (var i=yearRange[0]; i<=yearRange[1]; i++) {
		// transitionTimePerYear[i] = 1000;
		transitionTimePerYear[i] = thresholdScale(graph.graph.nodeCountsPerYear[i]);
	}
	return transitionTimePerYear;
};

citationVis.yearTickClickEventListener = function() {
    // Add click listeners to line chart axis tick labels (years).
    // On click, a new destination node will be set.
    d3.selectAll('.yearTick')
        .on('click', function(d) {
            // Get the year (as integer)
            var destinationYear = this.getAttribute('data-year');
            // Stop all transitions on nodes and links
            d3.selectAll('.node, .link').transition().duration(0);

			citationVis.egoGraphVis.newDestinationNode(destinationYear);
        });
};

function main() {

if (citationvis_data === 'ABORT') {
	return;
}

d3.select('#mainDiv').append('p')
	.attr("class", "loadingText")
	.text('Loading...');

d3.json('/_get_vis_json/'+ citationvis_data, function(error, graph) {
	console.log(error);
	if (error) {
		var contactEmail = 'jporteno@uw.edu';
		var errHtml = 'There was an error generating the visualization, or else data processing is still in progress. Try reloading the page later, or generating the visualization again. If the problem persists, <a href="mailto:' + contactEmail + '">contact the administrator</a>.'
		$( '.loadingText' ).html( errHtml )
			.css( {'color': 'red'} );
		throw error;
	}

	// Get the most common Domain IDs for the ego author's papers
	var domainsNest = d3.nest()
		.key(function(d) { return d.DomainID; }).sortValues(d3.descending)
		.rollup(function(leaves) { return leaves.length; })
		.entries(graph.nodes[0].papers);
	domainsNest.sort(function(a,b) { return d3.descending(a.values, b.values); });
	// store as a node property
	graph.nodes[0].DomainCounts = domainsNest;
	console.log(graph);
	// d3.select('#infoDiv').append('p').text(graph.nodes[0].AuthorName);

	var default_options = citationVis.default_options, 
		summaryStatistics = citationVis.summaryStatistics,
		egoGraphData = citationVis.egoGraphData,
	    lineChartData = citationVis.lineChartData,
		eventListeners = citationVis.eventListeners;

	var options = default_options.defaults;
	console.log(options);

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
	var pubs = d3.select(citationVis.lineCharts[0].chartDiv[0][0]);
	var pubsAxisLabel = pubs.select('.y.axis').select('.axisLabel');
	pubsAxisLabel.text('Num publications');
	// Hack to alter eigenfactor line chart. TODO: Fix this later
	// citationVis.eigenfactorSumLineChart.yAxis.tickFormat(d3.format('e'));
	citationVis.lineCharts[2].yAxis.tickFormat(d3.format('e'));
	// var EFChart = d3.select(citationVis.eigenfactorSumLineChart.chartDiv[0][0]);
	var EFChart = d3.select(citationVis.lineCharts[2].chartDiv[0][0]);
	EFChart.select('.y.axis')
		// .call(citationVis.eigenfactorSumLineChart.yAxis)
		.call(citationVis.lineCharts[2].yAxis)
		.select('.axisLabel').text('Sum of Eigenfactor');


	// Event listeners
	// Event listeners that act across different visualization objects go here
	citationVis.yearTickClickEventListener();
	
	d3.select(".loadingText").remove();
});
// })(citationvis_data);
}

main();
