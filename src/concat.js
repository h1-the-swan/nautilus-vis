// http://codereview.stackexchange.com/questions/77614/capitalize-the-first-character-of-all-words-even-when-following-a
String.prototype.capitalize = function() {
    return this.toLowerCase().replace( /\b\w/g, function(m) {
        return m.toUpperCase();
    });
};


var citationVis = citationVis || {};

function makeHtml(year, papers, numDisplay, callback) {
	if (papers[0].hasOwnProperty('citation')) {
		var tooltipHtml = '<h3 style="font-size: 100%">Top papers in this collection in ' + year +':</h3>';
		tooltipHtml = tooltipHtml + '<ol>';
		var numPapersAdded = 0;
		for (var i = 0, len = papers.length; i < len; i++) {
			var paper = papers[i];
			if (paper.hasOwnProperty('citation')) {
				tooltipHtml = tooltipHtml + '<li>' + paper['citation'] + '</li>';
				numPapersAdded++;
				if (numPapersAdded === numDisplay) {
					break;
				}
			}
		}
		tooltipHtml = tooltipHtml + '</ol>';

		citationVis.egoGraphVis.tooltip = citationVis.egoGraphVis.tooltip.html(tooltipHtml);
		if (callback != null) {
			callback(tooltipHtml);
		}
		return tooltipHtml;

	} else {
		var pids = [];
		for (var i = 0, len = numDisplay; i < len; i++) {
			if (i < papers.length) {
				pids.push(papers[i].PaperID);
			}
		}
		$.ajax({
			dataType: 'json',
			url: $SCRIPT_ROOT + '/_vis_get_more_paperinfo',
			data: {paperid: JSON.stringify(pids)},
			success: function(result) {
				console.log(result);
				var db_papers = result['papers'];
				var tooltipHtml = '<h3 style="font-size: 100%">Top papers in this collection in ' + year +':</h3>';
				tooltipHtml = tooltipHtml + '<ol>';
				for (var i = 0, len = db_papers.length; i < len; i++) {
					papers[i]['citation'] = db_papers[i]['citation'];
					tooltipHtml = tooltipHtml + '<li>' + papers[i]['citation'] + '</li>';
				}
				tooltipHtml = tooltipHtml + '</ol>';

				citationVis.egoGraphVis.tooltip = citationVis.egoGraphVis.tooltip.html(tooltipHtml);
				if (callback != null) {
					callback(tooltipHtml);
				}
				return tooltipHtml;

				/*
				d.Title = result['title'];
				d.doi = result['doi'];
				d.citation = result['citation'];
				d.updatedProps = true;
				d.tooltipHtml = '<p>' + d.citation + '</p>';
				d.tooltipHtml = d.tooltipHtml + '<br>';
				d.tooltipHtml = d.tooltipHtml + '<p>Category: ' + d.DomainName + '</p>';
				if (d.hovered) {
					self.tip.show(d, hoveredItem.node());
					// self.tip.show(d);
				}
				*/

			}
		});
	}  // end else


}

/*
$( document ).on( "initComplete", function() {
	var lineCharts = citationVis.lineCharts;
	var egoGraphVis = citationVis.egoGraphVis;
	var egoPapers = citationVis.egoGraphVis.egoNode.papers;
	for (var i = 0, len = lineCharts.length; i < len; i++) {
		var yearArea = lineCharts[i].yearArea;
		yearArea.style('pointer-events', 'all')
			.on('mouseover', function(d) {
				var thisYearPapers = egoPapers.filter(function(dd) {
					return dd.Year==d.year;}
					)
					.sort(function(a, b) { return d3.descending(a.EF, b.EF); });
				console.log(thisYearPapers);
				if (thisYearPapers.length === 0) {
					return;
				}
				citationVis.egoGraphVis.tooltip = citationVis.egoGraphVis.tooltip
					.html('<p>Loading...</p>')
					.style('visibility', 'visible')
					.style('border-style', 'solid')
					.style('border-color', citationVis.egoGraphVis.colorScheme[0])
					.style('top', (d3.event.pageY-200)+'px')
					.style('left', (d3.event.pageX+10)+'px');
				var tooltipHtml = makeHtml(d.year, thisYearPapers, 3);
				})
			.on('mouseout', function() {
				citationVis.egoGraphVis.tooltip = citationVis.egoGraphVis.tooltip
					.style('visibility', 'hidden');
			});
	}

});
*/


// tooltipster method
$( document ).on( 'initComplete', function() {
	var windowWidth = $(window).width();

	nodeTooltips();
	legendTooltips();

	$('.yearArea, .yearTick').css('pointer-events', 'all')
		.tooltipster({
			theme: 'tooltipster-noir',
			maxWidth: windowWidth * .5,
			animation: null,
			animationduration: 0,
			delay: 0,
			updateAnimation: null,
			content: '<p>Loading...</p>',
			contentAsHTML: true,
			functionInit: function() {console.log('tooltipster init');},
			functionBefore: function(instance, helper) {
				var $origin = $(helper.origin);
				var year = $origin.data('year');
				var egoPapers = citationVis.egoGraphVis.egoNode.papers;
				var thisYearPapers = egoPapers.filter(function(dd) {
					return dd.Year==year;}
					)
					.sort(function(a, b) { return d3.descending(a.EF, b.EF); });
				if (thisYearPapers.length === 0) {
					return false;
				}
				var tooltipHtml = makeHtml(year, thisYearPapers, 3, function(html) {
					instance.content(html); 
				});
				// instance.content(tooltipHtml);
			}
	});
} );

function nodeTooltips() {
	// $('.d3-tip').remove();
	$('.node').addClass('tooltipster');
	// $('.node').first().addClass('center-node');
	var windowWidth = $(window).width();
	$('.tooltipster').tooltipster({
		theme: 'tooltipster-noir',
		maxWidth: windowWidth * .5,
		animation: null,
		animationduration: 0,
		delay: 0,
		updateAnimation: null,
		content: '<p>Loading...</p>',
		contentAsHTML: true,
		functionBefore: function(instance, helper) {
			var tooltipHtml = ajaxPaperInfo(helper.origin, function(html) {
				instance.content(html); 
			});
		}
	});

	function ajaxPaperInfo(node, callback) {
		// node is the DOM element for a node
		var html = '';
		d3.select(node).each(function(d) {
			if ( (d.nodeType === 'paper') && (!d.updatedProps) ) {
				if ( (typeof d.citation != "undefined") && (d.citation.length>0) ) {
					html = bypassAjax(d);
					if (callback != null) {
						callback(html);
					}
					return html
				}
				$.ajax({
					dataType: 'json',
					url: $SCRIPT_ROOT + '/_vis_get_more_paperinfo',
					data: {paperid: d.id},
					success: function(result) {
						console.log(result);
						d.Title = result['title'];
						d.doi = result['doi'];
						d.citation = result['citation'];
						d.author_str = result['author_str'];
						d.venue = result['venue'];
						d.updatedProps = true;
						// d.tooltipHtml = '<p>' + d.citation + '</p>';
						// d.tooltipHtml = d.tooltipHtml + '<br>';
						// d.tooltipHtml = d.tooltipHtml + '<p>Category: ' + d.DomainName + '</p>';
						// if (d.hovered) {
						// 	self.tip.show(d, hoveredItem.node());
						// 	// self.tip.show(d);
						// }
						
						html = makeNodeTooltipHtml(d);
						if (callback != null) {
							callback(html);
						}
						return html


					}
				});
			} else if ( d.idx == 0 ) {
				d.tooltipHtml = '<p>';
				if (d.nodeType) {
					d.tooltipHtml = d.tooltipHtml + d.nodeType.capitalize() + ': ';
				}
				d.tooltipHtml = d.tooltipHtml + d.name;
				d.tooltipHtml = d.tooltipHtml + '</p>';
				var numberOfPubs = d.papers.length;
				d.tooltipHtml = d.tooltipHtml + '<p>Number of Publications: ' + numberOfPubs + '</p>';
				html = d.tooltipHtml;
				if (callback != null) {
					callback(html);
				}
				
				return html;
			}

		});
		return html;
	}

	function bypassAjax(d) {
		d.updatedProps = true;
		var html = makeNodeTooltipHtml(d);
		return html
	}

	function makeNodeTooltipHtml(d) {
		var span = $( '<span>' );
		span.append( $( '<p class="tooltip title">' ).text(d.Title) );
		span.append( $( '<p class="tooltip authors">' ).text(d.author_str) );
		span.append( $( '<p class="tooltip venue">' ).text(d.venue) );
		span.append( $( '<p class="tooltip year">' ).text(d.Year) );
		// span.append( $( '<p class="tooltip domain">' ).text("Category: " + d.DomainName) );
		span.append( $( '<p class="tooltip domain">' ).text("Categories: " + d.Field_of_study_names) );
		// span.append( $( '<p class="tooltip js_div">' ).text("JS Divergence: " + d.js_div) );
		// span.append( $( '<p class="tooltip avg_distance">' ).text("Average cluster distance: " + d.average_cluster_distance_to_center) );
		// span.append( $( '<p class="tooltip fos_kmeans_category">' ).text("FOS Kmeans category: " + d.fos_kmeans_category) );
		d.tooltipHtml = span.html();
		var html = d.tooltipHtml;
		return html;
		
	}
}

function legendTooltips() {
	var windowWidth = $(window).width();
	var otherHtml = '<p>These are papers in categories other than the ones above. Point your mouse at a specific paper to see the name of the category.</p>';
	$('.legendItem.other').tooltipster({
		theme: 'tooltipster-noir',
		maxWidth: windowWidth * .5,
		animation: null,
		animationduration: 0,
		delay: 0,
		updateAnimation: null,
		content: otherHtml,
		contentAsHTML: true
	});

	var headerHtml = "<p>The data underlying this visualization comes from the Microsoft Academic Graph. Each document has multiple associated Fields of Study. Here, these Fields are combined with the document's title, weighted using TF-IDF, and assigned a category using K-Means clustering. Mouse over the categories to highlight its papers, and to see more important terms.</p>";
	$('.egoGraphVisLegendHeader').tooltipster({
		theme: 'tooltipster-noir',
		maxWidth: windowWidth * .5,
		animation: null,
		animationduration: 0,
		delay: 0,
		updateAnimation: null,
		content: headerHtml,
		contentAsHTML: true
	});

	$('.legendItem').tooltipster({
		theme: 'tooltipster-noir',
		maxWidth: windowWidth * .5,
		animation: null,
		animationduration: 0,
		delay: 0,
		updateAnimation: null,
		content: '<p>Loading...</p>',
		contentAsHTML: true,
		functionBefore: function(instance, helper) {
			var legendItem = d3.select(helper.origin);
			legendItem.each(function(d) {
				var html = "<h3>Top terms in category " + d.DomainID + ":</h3>";
				html = html + "<ul>"
				for (var i = 0, len = d.DomainName.length; i < len; i++) {
					html = html + "<li>" + d.DomainName[i] + "</li>";
				}
				html = html + "</ul>"
				instance.content(html);
				return;
			});
		},
	});
}

// $( document ).on( "initComplete", function() {
// 	var egoGraphVis = citationVis.egoGraphVis;
//
// 	var $legendToggleButton = $('<input type="button" value="Toggle Legend" />');
// 	$legendToggleButton.data('val', 0);
// 	var maxVal = 3;
//
// 	$('#mainDiv').prepend($legendToggleButton);
//
// 	$legendToggleButton.on('click', function() {
// 		var curVal = $legendToggleButton.data('val');
// 		curVal++;
// 		if (curVal > maxVal) {
// 			curVal = 0;
// 		}
// 		$legendToggleButton.data('val', curVal);
// 		switch (curVal) {
// 			case 0:
// 				egoGraphVis.legend.remove();
// 				egoGraphVis.legendInit()
// 				
// 				break;
// 			
// 			case 1:
// 				egoGraphVis.legendText
// 					.text(function(d) {
// 						var idx = +d.key;
// 						var newText = egoGraphVis.data.graph.fos_kmeans_categories_topfosnames_tfidf[idx];
// 						return newText;
// 					});
//
// 				break;
//
// 			case 2:
// 				egoGraphVis.legendText
// 					.text(function(d) {
// 						var idx = +d.key;
// 						var newText = egoGraphVis.data.graph.fos_kmeans_categories_toptitlewords_tfidf[idx];
// 						return newText;
// 					});
//
// 				break;
//
// 			case 3:
// 				egoGraphVis.legendText
// 					.text(function(d) {
// 						var idx = +d.key;
// 						var newText = egoGraphVis.data.graph.fos_kmeans_categories_toptitlewords_tfidf_restricted[idx];
// 						return newText;
// 					});
//
// 				break;
// 		}
// 	});
// 	// egoGraphVis.legendText
// 	// 	.text('ddd');
// });
//
//
var citationVis = citationVis || {};

citationVis.default_options = (function() {
	// Dimensions of the largest part of the visualization (the graph)
	var dimensions = {
		width: 960,
		height: 500
	};
	// Dimensions of the line charts:
	dimensions.lineChart = {
		margin: {top: 30, right: 20, bottom: 30, left: 50}
	};
	dimensions.lineChart.width = dimensions.width * 3/4 - dimensions.lineChart.margin.left - dimensions.lineChart.margin.right;
	dimensions.lineChart.height = 110 - dimensions.lineChart.margin.top - dimensions.lineChart.margin.bottom;


	// Colors:
	// See http://colorbrewer2.org/?type=qualitative&scheme=Set1&n=8
	var colorScheme = ['rgb(228,26,28)','rgb(55,126,184)','rgb(77,175,74)',
			'rgb(152,78,163)','rgb(255,127,0)','rgb(255,255,51)',
			'rgb(166,86,40)','rgb(247,129,191)'];
	// I liked the blue better for the main color, so the next line just moves
	// the blue color (originally self.colorScheme[1]) to the front (self.colorScheme[0])
	colorScheme.splice(0, 0, colorScheme.splice(1, 1)[0]);

	var DEFAULT_OPTIONS = {
		colorScheme: colorScheme,
		dimensions: dimensions
	};

	return {
		defaults: DEFAULT_OPTIONS
	};
}());
var citationVis = citationVis || {};

citationVis.egoGraphData = (function(maxNodes) {
	function prepare_egoGraphData(graph) {
		for (i=0; i<graph.nodes.length; i++) {
			graph.nodes[i].oldIdx = i;
		}
		var newGraph = {};
		// Copy properties to newGraph that won't change:
		var propsToCopy = ['graph', 'directed', 'multigraph'];
		for (i=0; i<propsToCopy.length; i++) {
			var prop = propsToCopy[i];
			if (graph.hasOwnProperty(prop)) { newGraph[prop] = graph[prop]; }
		}

		newGraph.nodes = [];
		newGraph.nodes.push(graph.nodes[0]);
		newGraph.nodes[0].idx = 0;
		// // this is a test:
		// for (i=10; i<20; i++) {
		// 	var newNode = graph.nodes[i];
		// 	newNode.idx = newGraph.nodes.length;
		// 	newGraph.nodes.push(newNode);
		// }
		var notEgoNodes = [];
		// Filter out nodes that have year of 0
		for (var i=1; i<graph.nodes.length; i++) {
			// if ( (graph.nodes[i].EF > 0) && (graph.nodes[i].Year>0) ) {
			if (graph.nodes[i].Year>0) {
				notEgoNodes.push(graph.nodes[i]);
			}
		}
		// Start by randomizing the order of all the nodes
		d3.shuffle(notEgoNodes);
		// order descending by Eigenfactor
		// notEgoNodes.sort(function(a,b) { return b.EF - a.EF; });
		notEgoNodes.sort(function(a,b) { return d3.descending(a.EF, b.EF); });
		// // I don't want to remove any nodes that have a different DomainID than the ego,
		// // so I'll move those to the front to protect them.
		// // ACTUALLY there are too many to do this
		// var egoDomain = graph.nodes[0].DomainCounts[0].key;  // This is the most common domain id for the ego author's papers
		// var c = [];
		// for (var i=0; i<notEgoNodes.length; i++) {
		// 	if ( notEgoNodes[i].DomainID != egoDomain ) {
		// 		c.push(notEgoNodes[i].DomainID);
		// 		notEgoNodes.splice(0, 0, notEgoNodes.splice(i, 1)[0]);
		// 	}
		// }
		// Move papers that have a DomainID to the front
		function DomainIDToFront(arr) {
			var hasDomainID = [];
			var noDomainID = [];
			for (var i = 0, len = arr.length; i < len; i++) {
				if ( arr[i].DomainID != 0 ) {
					hasDomainID.push(arr[i]);
				} else {
					noDomainID.push(arr[i]);
				}
			}
			console.log(arr);
			var newArr = hasDomainID.concat(noDomainID);
			console.log(newArr);
			return newArr;
		}
		notEgoNodes = DomainIDToFront(notEgoNodes);
		// for (var i = notEgoNodes.length-1; i>=0; i--) {
		// 	if ( notEgoNodes[i].DomainID != 0 ) {
		// 		notEgoNodes.splice(0, 0, notEgoNodes.splice(i, 1)[0]);
		// 	}
		// }
		// console.log(c);
		// Take the first n items, where n = maxNodes
		// console.log(maxNodes);
		if (typeof maxNodes == 'undefined') {
			var maxNodes = 274;  // TODO: implement this better (so it's not hard coded here)
		}
		// var maxNodes = 5000;  // TODO: implement this better (so it's not hard coded here)
		if (notEgoNodes.length > maxNodes) {
			// self.allNodes = self.allNodes.slice(0, self.graphParams.maxNodes.value);
			notEgoNodes = notEgoNodes.slice(0, maxNodes);
		}
        // sort by Year
        // then sort by EF (size) so that larger nodes tend to appear first.
        // (this somewhat reduces the problem of sending out 
        // links to nodes that haven't appeared yet.
        // maybe try a better solution later.)
		notEgoNodes.sort(function(a,b) {
			return d3.ascending(a.Year, b.Year) || d3.descending(a.EF, b.EF);
		});

		// Append these to newGraph.nodes
		for (i=0; i<notEgoNodes.length; i++) {
			var newNode = notEgoNodes[i];
			newNode.idx = newGraph.nodes.length;
			newGraph.nodes.push(newNode);
		}

		newGraph.links = recalculateLinks(newGraph.nodes, graph.links);

		function recalculateLinks(nodes, links) {
			var newLinks = [];
			for (i=0; i<links.length; i++) {
				var thisSource = nodes.filter(function(d) { return d.oldIdx === links[i].source; });
				var thisTarget = nodes.filter(function(d) { return d.oldIdx === links[i].target; });
				if ( thisSource.length>0 && thisTarget.length>0 ) {
					if ( (thisTarget[0].nodeType === 'paper') && (thisSource[0].Year < thisTarget[0].Year) ) {
						// exclude the link in this case (i.e. if the source year is less than the target year
					} else {
						var newLink = links[i];
						newLink.source = thisSource[0].idx;
						newLink.target = thisTarget[0].idx;
						newLinks.push(links[i]);
					}
				}
			}
			newLinks.forEach(function(d) {
				if ( typeof d.target != 'number' ) console.log(d);
			});

			return newLinks;
		}

		var yearRange = newGraph.graph.yearRange;
		function getNodeCountsPerYear(nodes, yearRange) {
			var yearsNest = d3.nest()
				.key(function(d) { return d.Year; }).sortKeys(d3.ascending)
				.rollup(function(leaves) { return leaves.length; })
				// .entries(nodes.slice(1));  // all except ego node (node[0])
				.map(nodes.slice(1));

			var nodeCountsPerYear = {};
			for (var i=yearRange[0]; i<=yearRange[1]; i++) {
				var countThisYear = yearsNest[i];
				if (typeof countThisYear === 'undefined') {
					nodeCountsPerYear[i] = 0;
				} else {
					nodeCountsPerYear[i] = countThisYear;
				}
			}
			return nodeCountsPerYear;
		}
		newGraph.graph.nodeCountsPerYear = getNodeCountsPerYear(newGraph.nodes, yearRange);


		return newGraph;
	}

	return {
		prepare_egoGraphData: prepare_egoGraphData
	};
}());

var citationVis = citationVis || {};

citationVis.eventListeners = (function() {
	// Event listeners that act across different visualization objects go here
	
	// function tooltipListener() {
	// 	// Add event listener to nodes for tooltip:
	// 	d3.selectAll('.node')
	// 		.on('mouseover', function(d) {
	// 			var tooltipHtml = self.makeTooltip(d);
	// 			self.tooltip = self.tooltip
	// 				.html(tooltipHtml)
	// 				.style('visibility', 'visible')
	// 				.style('border-style', 'solid')
	// 				.style('border-color', d.color);
	// 		})
	// 		.on('mousemove', function() {
	// 			self.tooltip = self.tooltip
	// 				.style('visibility', 'visible')
	// 				.style('top', (d3.event.pageY-10)+'px')
	// 				.style('left', (d3.event.pageX+10)+'px');
	// 		})
	// 		.on('mouseout', function() {
	// 			self.tooltip = self.tooltip.style('visibility', 'hidden'); });
	// }

	return {
		// tooltipListener: tooltipListener
	};
}());
var citationVis = citationVis || {};

citationVis.lineChartData = (function() {
	// Take in graph data and prepare it for line charts
	
	function getPewClassYear(graph) {
		var egoNode = graph.nodes[0];
		return egoNode.pew_Class;
	}

	function getFunding(graph) {
		var egoNode = graph.nodes[0];
		return egoNode.funding;
	}

	function cleanLinks(links) {
		var cleanedLinks = [];
		links.forEach(function(d) {
			if ( (typeof d.linkToEgo != 'undefined') && (d.linkToEgo === true) ) {
				var sourceYear = +d.sourceYear;
				var targetYear = +d.targetYear;
				if ( (sourceYear > 0) && (targetYear > 0) && (sourceYear >= targetYear) ) {
					cleanedLinks.push(d);
				}
			}
		});
		return cleanedLinks;
	}

	function getYearRange(cleanedLinks) {
		// Make sure all our data fall within the appropriate time span.
		// The minimum year is the earliest publication by the ego author (there will likely be no citations within this year, but this chart needs to line up with the other charts).
		// The maximum year is the last year that a paper cited one of the ego author's paper (checking to make sure it is not in the future, which would mean bad data).
		var minYear = d3.min(cleanedLinks, function(d) { return d.targetYear>0 ? d.targetYear : null; });
		// Get current year (using today's date):
		var todayYear = new Date().getFullYear();
		var maxYear = d3.max(cleanedLinks, function(d) { return d.sourceYear<=todayYear ? d.sourceYear : null; });

		// cutoff at 2015
		maxYear = Math.min(maxYear, 2015);

		return [minYear, maxYear];
	}

	function getEmptyCountData(yearRange) {
		var emptyCountData = [];
		for (var i=yearRange[0]; i<=yearRange[1]; i++) {
			emptyCountData.push({year: i, count: 0});
		}
		return emptyCountData;
	}

	function prepareData_allCitations(graph) {
		// var data = {};
		var data = {};
		data['pew_Class'] = getPewClassYear(graph);
		data['funding'] = getFunding(graph);
		data['values'] = [];

		var cleanedLinks = cleanLinks(graph.links);
		var yearRange = getYearRange(cleanedLinks);
		cleanedLinks = cleanedLinks.filter(function(d) {
			return d.sourceYear <= yearRange[1] && d.targetYear <= yearRange[1];
		});

		// for (var i=yearRange[0]; i<=yearRange[1]; i++) {
		// 	// data[i] = 0;
		// 	data.push({year: i, count: 0});
		// }
		// cleanedLinks.forEach(function(d) {
		// 	data[d.sourceYear]++;
		// });
		data.values = getEmptyCountData(yearRange);
		cleanedLinks.forEach(function(d) {
			var thisSourceYear = d.sourceYear;
			var dataThisYear = data.values.filter(function(dd) { return dd.year===thisSourceYear; })[0];
			dataThisYear.count++;
		});

		return data;
	}

	function prepareData_egoAuthorPublications(graph) {
		var data = {};
		data['pew_Class'] = getPewClassYear(graph);
		data['funding'] = getFunding(graph);
		data['values'] = [];

		var cleanedLinks = cleanLinks(graph.links);
		var yearRange = getYearRange(cleanedLinks);
		data.values = getEmptyCountData(yearRange);
		var egoPapers = graph.nodes[0].papers;
		egoPapers = egoPapers.filter(function(d) {
			return ( (d.Year >= yearRange[0]) && (d.Year <= yearRange[1]) );
		})
		egoPapers.forEach(function(d) {
			var dataThisYear = data.values.filter(function(dd) { return dd.year==d.Year; })[0];
			dataThisYear.count++;
		});

		return data;
	}

	function prepareData_authorEigenfactorSum(graph) {
		// For each year, sum the eigenfactor (EF) of the ego author's paper's
		var data = {};
		data['pew_Class'] = getPewClassYear(graph);
		data['funding'] = getFunding(graph);
		data['values'] = [];

		var cleanedLinks = cleanLinks(graph.links);
		var yearRange = getYearRange(cleanedLinks);
		data.values = getEmptyCountData(yearRange);
		var egoPapers = graph.nodes[0].papers;
		egoPapers = egoPapers.filter(function(d) {
			return ( (d.Year >= yearRange[0]) && (d.Year <= yearRange[1]) );
		})
		egoPapers.forEach(function(d) {
			var dataThisYear = data.values.filter(function(dd) { return dd.year==d.Year; })[0];
			dataThisYear.count = dataThisYear.count + d.EF;
		});

		return data;
	}

	return {
		prepareData_allCitations: prepareData_allCitations,
		prepareData_egoAuthorPublications: prepareData_egoAuthorPublications,
		prepareData_authorEigenfactorSum: prepareData_authorEigenfactorSum
	};
}());


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


var citationVis = citationVis || {};

citationVis.summaryStatistics = (function() {

	function addSummaryStatistics(graph) {

		function cleanLinks(links) {
			var cleanedLinks = [];
			links.forEach(function(d) {
				if ( (typeof d.linkToEgo != 'undefined') && (d.linkToEgo === true) ) {
					var sourceYear = +d.sourceYear;
					var targetYear = +d.targetYear;
					if ( (sourceYear > 0) && (targetYear > 0) && (sourceYear >= targetYear) ) {
						cleanedLinks.push(d);
					}
				}
			});
			return cleanedLinks;
		}

		function getYearRange(links) {
			// A lot of this code was copied from lineChartData
			// May need to clean this up (TODO)

			// Make sure all our data fall within the appropriate time span.
			// The minimum year is the earliest publication by the ego author (there will likely be no citations within this year, but this chart needs to line up with the other charts).
			// The maximum year is the last year that a paper cited one of the ego author's paper (checking to make sure it is not in the future, which would mean bad data).
			var cleanedLinks = cleanLinks(links);
			var minYear = d3.min(cleanedLinks, function(d) { return d.targetYear>0 ? d.targetYear : null; });
			// Get current year (using today's date):
			var todayYear = new Date().getFullYear();
			var maxYear = d3.max(cleanedLinks, function(d) { return d.sourceYear<=todayYear ? d.sourceYear : null; });
			return [minYear, maxYear];
		}


		function getEmptyCountData(yearRange) {
			var emptyCountData = [];
			for (var i=yearRange[0]; i<=yearRange[1]; i++) {
				emptyCountData.push({year: i, count: 0});
			}
			return emptyCountData;
		}

		function getCitationCountsPerYear(graph) {
			var citationCountsPerYear = getEmptyCountData(graph.graph.yearRange);
			var cleanedLinks = cleanLinks(graph.links);
			cleanedLinks.forEach(function(d, i) {
				var thisSourceYear = d.sourceYear;
				var dataThisYear = citationCountsPerYear.filter(function(dd) { return dd.year===thisSourceYear; })[0];
				dataThisYear.count++;
			});

			return citationCountsPerYear;
		}

		graph.graph.yearRange = getYearRange(graph.links);
		graph.graph.citationCountsPerYear = getCitationCountsPerYear(graph);
		return graph;
	}

	return {
		addSummaryStatistics: addSummaryStatistics
	};
}());



// This will add the ability to change the type of domain (e.g. from category to venue) that the nodes are colored by
// The JSON data must have the right properties (i.e. `graph.DomainsMult` and node property `DomainMult`
// and the URL must have the query parameter "domainsMult"

// http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var citationVis = citationVis || {};

$( document ).on( "initComplete", function() {
	var egoGraphVis = citationVis.egoGraphVis;
	var domainsMult = egoGraphVis.data.graph.DomainsMult
	if ( (!domainsMult) || (!getParameterByName('domainsMult')) ) {
		// in this case, exit without doing anything
		return;
	}
	var $domainDropdown = $( '<div>' );
	$domainDropdown.append( $( '<label>' ).text('Color by: ').css( 'display', 'inline' ) );
	var domain_select = $domainDropdown.append( $( '<select>' ).attr( 'id', 'domain_select' ) );
	$( '#mainDiv' ).prepend( $domainDropdown );
	$.each(domainsMult, function(k, v) {
		$( '#domain_select' ).append( $( '<option>' ).text(k) );
		d3.select("#mainDiv").append("p")
			.text(k)
			.on("click", function() {switchDomain(k);});
	});
	$( '#domain_select' ).val("category_from_keyword");
	$( '#domain_select' ).on( 'change', function() { switchDomain($(this).val()); });

	function switchDomain(domainType) {
		var dur = 200;
		egoGraphVis.data.graph.Domains = domainsMult[domainType];
		for (var i = 0, len = egoGraphVis.notEgoNodes.length; i < len; i++) {
			var thisNode = egoGraphVis.notEgoNodes[i];
			thisNode.DomainID = thisNode.DomainMult[domainType];
		}
		egoGraphVis.getDomainsThisGraph();
		d3.selectAll(".legendItem").remove();
		egoGraphVis.legendInit();
		d3.selectAll(".node")
			.each(function(d) {
				d.DomainName = egoGraphVis.data.graph.Domains[d.DomainID];
				for (var i=0; i<egoGraphVis.domainsThisGraph.length; i++) {
					var thisDomain = egoGraphVis.domainsThisGraph[i].key
					if (thisDomain==d.DomainID) {
						// var thisColor = self.colorScheme[i];
						var thisColor = egoGraphVis.domainsThisGraph[i].color;
						d.color = thisColor;
					}
				}
			})
			.transition().duration(dur)
			.attr('fill', 'white')
			.each('end', function() {
				d3.select(this)
					.transition().duration(dur)
					.attr('fill', function(d) {
						// color the nodes based on DomainID
						return d.color
					})
			})
		d3.transition().duration(dur*2).each('end', function() {
			egoGraphVis.revealFinalState();
		});
	}
});


// http://codereview.stackexchange.com/questions/77614/capitalize-the-first-character-of-all-words-even-when-following-a
String.prototype.capitalize = function() {
    return this.toLowerCase().replace( /\b\w/g, function(m) {
        return m.toUpperCase();
    });
};


function egoGraphVis(data) {
	var self = this;
	self.data = data;
	self.notEgoNodes = self.data.nodes.slice(1);
	console.log(self.data);

	// Defaults
	// Graph SVG Dimensions
    // self.graphDimensions = {
    //     width: 960,
    //     height: 500
    // };
	self.graphDimensions;  // imported in self.importDefaultOptions below
	
	self.colorScheme;

    // Node placement options:
    // "force1": nodes placed by running the force layout and then freezing
    // "spiral" places the nodes in a spiral formation with the ego node at the center
	// "spiral2": alternate spiral algorithm
    // ADD MORE
    self.nodePlacementOptions = ["force1",
                                 "spiral",
								 "spiral2"];
	self.nodePlacement = self.nodePlacementOptions[1];
	
	self.zoomable = false;

	self.svg;
    self.group;
	self.node;
	self.link;
	self.egoNode;

	self.eigenFactorScale;

	// self.loadingText;

	self.domainsThisGraph;
    self.legend;

    self.yearTextDisplay;

    self.authorImageDiv;

    self.tooltip;
	self.tip;

	self.tick;
	self.force;

    // See http://colorbrewer2.org/?type=qualitative&scheme=Set1&n=8
    // self.colorScheme = ['rgb(228,26,28)','rgb(55,126,184)','rgb(77,175,74)',
	// 	'rgb(152,78,163)','rgb(255,127,0)','rgb(255,255,51)',
	// 	'rgb(166,86,40)','rgb(247,129,191)']
    // // I liked the blue better for the main color, so the next line just moves
    // // the blue color (originally self.colorScheme[1]) to the front (self.colorScheme[0])
    // self.colorScheme.splice(0, 0, self.colorScheme.splice(1, 1)[0])
	self.colorScheme;  // imported in importDefaultOptions below

    // Opacity values
    self.opacityVals = {
		node: 1, 
		nodePrevYear: .6,
		linkToEgo: .12,
		linkNotToEgo: .12,
		linkPrevYear: .04
	};

	self.doAnnotations = false;

    self.animationState;  // "forward", "rewind", "stopped"
	self.transitionTimePerYear; // imported in importDefaultOptions below
	// self.transitionTimePerNode = 100;  // TEST
	self.transitionTimePerNode; // calculated in calculateTransitionTime()
    // self.nodeAppearDuration = self.transitionTimePerNode * 4;
	// I haven't actually gotten it to work having different transitionTimePerNode and nodeAppearDuration
	self.linkAppearDuration = 500;
    self.currNodeIndex;  // Index of node currently being annotated
    self.destinationNodeIndex;  // Index of node to which the animation is currently moving
    self.destinationYear;
    self.currYear;

	// self.destinationNodeIndex = 200;  // TEST
	self.destinationNodeIndex = self.data.nodes.length-1;  // TEST

	//testing
	self.c = 0;
	self.tt = 0;

	// self.init();

	return self;

}

egoGraphVis.prototype.init = function() {
	var self = this;

    self.tick = self.makeTick();
    self.force = self.makeForce();
	if (self.zoomable === true) {
		self.zoom = self.makeZoom();
	}
    // self.drag = self.makeDrag();
	
	self.animationState = 'init';

	self.getDomainsThisGraph();

	self.svg = d3.select('#graphDiv').append('svg')
		.attr('id', 'graphSvg')
		.attr('width', self.graphDimensions.width)
		.attr('height', self.graphDimensions.height);

	// self.tip = d3.tip()
	// 	.attr('class', 'd3-tip')
	// 	.style('cursor', 'default')
	// 	.style('border-style', 'solid')
	// 	// .style('border-color', function(d) { return d.color; })
	// 	.style('pointer-events', 'none');
	// // self.svg.call(self.tip);

    self.group = self.svg.append('g')
		            .attr('class', 'graphContainer')
    self.link = self.group.append('svg:g')
                    .attr('class', 'links')
                    .selectAll('.link');
    self.node = self.group.append('svg:g')
                    .attr('class', 'nodes')
                    .selectAll('.node');
	
    // Initialize tooltip for nodes (which will be visible on mouseover of nodes)
    self.tooltip = d3.select('body')
                    .append('div')
                    .attr('class', 'nodeTooltip')
                    .style('position', 'absolute')
                    .style('width', self.graphDimensions.width / 4 + 'px')
                    .style('z-index', '10')
                    .style('visibility', 'hidden');

	// Add special properties to the ego node:
	self.data.nodes[0].fixed = true;
	// position in center
	self.data.nodes[0].x = self.graphDimensions.width/2;
	self.data.nodes[0].y = self.graphDimensions.height/2;
	self.data.nodes[0].color = self.colorScheme[0];
	self.egoNode = self.data.nodes[0];
	
	// Set up a scale for Eigenfactor in order to encode size of nodes by Eigenfactor (influence)
	var eigenFactorMax = d3.max(self.data.nodes, function(d) { return d.EF; });
	self.eigenFactorScale = d3.scale.linear()
		.domain([0, eigenFactorMax])
		.range([0, 1]);
	self.data.nodes.forEach(function(d) {
		if (d.nodeType === 'paper') {
			d.radius = 4.5 + (self.eigenFactorScale(d.EF) * 10);
		} else {
			d.radius = 10;
		}
	});

    // add graph properties
	self.force.nodes(self.data.nodes);
	
    // update node elements
    self.node = self.node.data(self.data.nodes);
    //self.node.exit().remove();
    var newNode = self.node.enter();

    newNode = newNode.append('svg:circle')
		//test
		.attr('class', 'node')
		// add class for the center node
		.classed('centerNode', function(d) { return d.id === self.egoNode.id; })
		.attr('r', function(d) { return d.radius; })
        // .attr('class', 'node hidden')
        // "T" attribute will keep track of the transition time elapsed
        .attr('T', 0)
        // Start with the node invisible
        .attr('r',1e-9)
		.each(function(d) {
			d.DomainName = self.data.graph.Domains[d.DomainID];
			for (var i=0; i<self.domainsThisGraph.length; i++) {
				var thisDomain = self.domainsThisGraph[i].key
				if (thisDomain==d.DomainID) {
					// var thisColor = self.colorScheme[i];
					var thisColor = self.domainsThisGraph[i].color;
					d.color = thisColor;
				}
			}
		})
        // Color by different categories of how similar the node's cluster is to the ego node
        .attr('fill', function(d) {
            // color the nodes based on DomainID
			return d.color
        })
        .style('opacity', self.opacityVals.node);

    newNode.call(self.force.drag);

	// self.egoNode = self.node.filter(function(d) { return d.idx === 0; });
	
    // update link elements
	self.force.links(self.data.links);

    self.link = self.link.data(self.data.links);
    //self.link.exit().remove();
	var newLink = self.link
		.enter()
		.append('svg:line')
		.attr('class', function(d) {
			// if (d.target === 0) { return 'link toEgo linkToEgo'; }
			// else { return 'link notToEgo linkNotToEgo'; }
			if (d.target === 0) { return 'link hidden toEgo linkToEgo'; }
			else { return 'link hidden notToEgo linkNotToEgo'; }
		})
		// "T" attribute will keep track of the transition time elapsed
		.attr('T', 0)
		// Links to the ego node are darker than links between the others
		.style('opacity', function(d) {
			var opVals = self.opacityVals;
			if (d.linkToEgo) {
				return opVals.linkToEgo;
			} else {
				return opVals.linkNotToEgo;
			}
			// return .5;
			// if (d.target === 0) { return self.graphParams.opacityVals.value.linkToEgo; }
			// else { return self.graphParams.opacityVals.value.linkNotToEgo; }
		});

	function placeNodes() {
		// This function will determine the final spatial placement of all of the nodes.

		switch (self.nodePlacement) {
			case self.nodePlacementOptions[0]:
				// Place the nodes using the force layout.
				// Uses the force layout parameters in self.makeForce
				self.force.start();
				// Execute force a bit, then stop
				for (var i = 0; i<100000; ++i) self.force.tick();
				self.force.stop();
				newNode.each(function(d) { d.fixed = true; });
				break;

			case self.nodePlacementOptions[1]:
				// Place the nodes in spiral formation.
				var cx = self.egoNode.x,
			        cy = self.egoNode.y,
			        // initialRad = 60;
			        initialRad = 20;
				var numNodes = self.data.nodes.length;
				// console.log(numNodes);
				newNode.each(function(d, i) {
					if (d.idx != 0) {
						d.fixed = true;
						// var thisRad = i * 2 + initialRad;
						// var thisSpacing = i * (Math.PI/(8.5+.1*i));

						var thisRad = Math.pow(i, 1) * .95 + initialRad;
						var thisSpacing = i * (Math.PI/(8.5+.05*i));
						d.x = cx + (thisRad * Math.cos(thisSpacing));
						d.y = cy + (thisRad * Math.sin(thisSpacing));
						// var angle = 0.1 * i;
						// d.x = cx + thisRad * Math.cos(angle);
						// d.y = cy + thisRad * Math.sin(angle);

					}
				});
				self.force.start();
				self.force.tick();
				self.force.stop();
				break;

			case self.nodePlacementOptions[2]:
				// Alternate spiral algorithm
				//
				// http://gamedev.stackexchange.com/questions/16745/moving-a-particle-around-an-archimedean-spiral-at-a-constant-speed
				function computeAngle(alpha, arcLength, epsilon) {
					// alpha: distance between successive turnings
					// arcLength: desired arcLength
					// epsilon: (value >0) indicates the precision of the approximation
					// returns: angle at which the desired arcLength is achieved
					var angleRad = Math.PI + Math.PI;
					while (true) {
						var d = computeArcLength(alpha, angleRad) - arcLength;
						if (Math.abs(d) <= epsilon) {
							return angleRad;
						}
						var da = alpha * Math.sqrt(angleRad * angleRad + 1);
						angleRad = angleRad - (d / da);
					}
				}
				function computeArcLength(alpha, angleRad) {
					var u = Math.sqrt(1 + angleRad * angleRad);
					var v = Math.log(angleRad + u);
					return 0.5 * alpha * (angleRad * u + v);
				}
				function computePoint(alpha, angleRad) {
					var distance = angleRad * alpha;
					var x = Math.sin(angleRad) * distance;
					var y = Math.cos(angleRad) * distance;
					return [x, y];
				}
				function getAngles(numNodes, alpha) {
					var pointArcDistance = 5;
					var epsilon = .00005;
					var totalArcLength = 0.0;
					var previousAngleRad = 0.0;
					var angles = [];
					for (var i = 0, len = numNodes; i < len; i++) {
						var angleRad = computeAngle(alpha, totalArcLength, epsilon);
						angles.push(angleRad);
						totalArcLength = totalArcLength + pointArcDistance;
						previousAngleRad = angleRad;
						if (i>10) { pointArcDistance = 10;}
						if (i>50) { pointArcDistance = 15;}
					}
					return angles;
				}
				var numNodes = self.data.nodes.length;
				var angles = getAngles(numNodes, 7);
				// console.log(angles);
				var cx = self.egoNode.x,
			        cy = self.egoNode.y,
			        // initialRad = 60;
			        initialRad = 20;
				var numNodes = self.data.nodes.length;
				console.log(numNodes);
				newNode.each(function(d, i) {
					if (d.idx != 0) {
						d.fixed = true;
						var thisRad = i * 2 + initialRad;
						var thisSpacing = i * (Math.PI/(8.5+.1*i));

						// var thisRad = Math.pow(i, 1) * .95 + initialRad;
						// var thisSpacing = i * (Math.PI/(8.5+.05*i));
						// d.x = cx + (thisRad * Math.cos(thisSpacing));
						// d.y = cy + (thisRad * Math.sin(thisSpacing));
						// var angle = 0.1 * i;
						// d.x = cx + thisRad * Math.cos(angle);
						// d.y = cy + thisRad * Math.sin(angle);
						var powScale = d3.scale.pow().exponent(.7).domain([1,numNodes]).range([0,60]);
						var powScale = d3.scale.linear().domain([1,Math.pow(numNodes, .3)]).range([0,60]);
						var powScale = d3.scale.log().domain([100, numNodes+100]).range([0,60]);
						// var thisPos = Math.pow(i+1, .7) * 1;
						// console.log(thisPos);
						var newi = Math.pow(i+1, .3);
						var newi = (i)+100;
						var thisPos = powScale(newi);
						// console.log(thisPos)
						var b = 7;
						var thisPos = angles[i];
						d.x = cx + (initialRad + b * thisPos) * Math.cos(thisPos);
						d.y = cy + (initialRad + b * thisPos) * Math.sin(thisPos);

					}
				});
				self.force.start();
				self.force.tick();
				self.force.stop();
				break;
		}
	}
    placeNodes();

	self.legendInit();
	self.addAuthorImage();
	self.addEventListeners();

    self.yearTextDisplay = self.svg.append('svg:text')
                    .attr('x', self.graphDimensions.width * 8/9)
                    .attr('y', self.graphDimensions.height * 12/13)
                    .attr('dy', '-.3em')
                    .attr('font-size', '10em')
                    .attr('text-anchor', 'end')
                    .style('pointer-events', 'none')
                    .style('opacity', 1e-9)
					.text(self.data.graph.yearRange[0]);

	self.revealEgoNode();

};

egoGraphVis.prototype.makeZoom = function () {
	var self = this;
	return d3.behavior.zoom()
		.center([self.graphDimensions.width/2, self.graphDimensions.height/2])
		.scaleExtent([0.2, 10])
		.on('zoom', function() {
			self.group.attr(
				'transform',
				'translate(' + d3.event.translate + ')' +
					'scale(' + d3.event.scale + ')'
			);
		});
};

egoGraphVis.prototype.makeTick = function () {
    var self = this;
    // cache function creation for tiny optimization
    function x1(d) { return d.source.x; }
    function y1(d) { return d.source.y; }
    function x2(d) { return d.target.x; }
    function y2(d) { return d.target.y; }
    // function transform(d) {
    //     d.x = Math.max(4.5, Math.min(self.graphDimensions.width - 4.5, d.x));
    //     d.y = Math.max(4.5, Math.min(self.graphDimensions.height - 4.5, d.y));
    //     return 'translate(' + d.x + ',' + d.y + ')';
    // }
    function transform(d) {
		// The below lines constrain the nodes to stay within the bounds of the original display.
		if (self.zoomable === false) {
			d.x = Math.max(4.5, Math.min(self.graphDimensions.width - 4.5, d.x));
			d.y = Math.max(4.5, Math.min(self.graphDimensions.height - 4.5, d.y));
		}
        return 'translate(' + d.x + ',' + d.y + ')';
    }
    return function () {
        self.link
            .attr('x1', x1)
            .attr('y1', y1)
            .attr('x2', x2)
            .attr('y2', y2);
        self.node
            .attr('transform', transform);
    };
};

egoGraphVis.prototype.makeForce = function () {
    var self = this;
    return d3.layout.force()
        .size([self.graphDimensions.width, self.graphDimensions.height])
        .linkDistance(225)
        //.linkDistance(function(d) { console.log(self.ldScl(d.source.Year)); return self.ldScl(d.source.Year) ? 75 + self.ldScl(d.source.Year) : 0;})
        //.linkStrength(function(d) { return self.lsScl(d.source.Year) ? self.lsScl(d.source.Year) : 0;})
        // .charge(-15)
        // .gravity(0.03)
        // .friction(0.8)
        // .theta(0.9)
        // .alpha(0.1)
        .on('tick', this.tick);
};

egoGraphVis.prototype.importDefaultOptions = function(options) {
	var self = this;

	self.colorScheme = options.colorScheme;

	self.graphDimensions = options.dimensions;

	self.transitionTimePerYear = options.transitionTimePerYear;

	console.log(options);

};

egoGraphVis.prototype.getDomainsThisGraph = function() {
	var self = this;

	var domains = self.data.graph.Domains;
	console.log(domains);

	var maxDomains = self.colorScheme.length;
	
	// self.domainsThisGraph will be an array of {key: "DomainID", values: count}
	self.domainsThisGraph = d3.nest()
		.key(function(d) { return d.DomainID; })
		.rollup(function(leaves) { return leaves.length; })
		.entries(self.notEgoNodes);
	self.domainsThisGraph.sort(function(a,b) { return d3.descending(a.values, b.values); });
	// Add a few more variables to the domainsThisGraph data:
	for (var i=0; i<self.domainsThisGraph.length; i++) {
		// var key = +self.domainsThisGraph[i].key;
		var key = self.domainsThisGraph[i].key;
		self.domainsThisGraph[i].DomainID = key;
		if (i<maxDomains-1) {
			self.domainsThisGraph[i].DomainName = domains[key];
			self.domainsThisGraph[i].color = self.colorScheme[i];
		} else {
			self.domainsThisGraph[i].DomainName = "Other";
			self.domainsThisGraph[i].color = self.colorScheme[maxDomains-1];
		}
	}
	console.log(self.domainsThisGraph);
};

egoGraphVis.prototype.legendInit = function() {
	var self = this;

	var squareSize = self.graphDimensions.width / 70;
    var padding = squareSize / 3;
    var sqrPlusPadding = squareSize + padding;

    self.legend = self.svg.append('g')
        .attr('class', 'legend')
        .attr('transform', 'translate('+padding+','+padding+')');
        // .style('opacity', 1e-9);
	console.log(self.domainsThisGraph);

    var legendItem = self.legend.selectAll('g')
        .data(self.domainsThisGraph)
        .enter()
        .append('g')
        .attr('class', 'legendItem')
		// add "other" class to last legend item
		.classed('other', function(d) { 
			return (d.DomainID != 0 && d.DomainName.toLowerCase()=="other") ? true : false;
		})
        .attr('id', function(d) {
            // return 'legendCluster' + d.cluster; })
            // Use Domain instead of cluster
            return 'legendDomain' + d.DomainID.replace(" ", ""); })
		.on("mouseover", function(d) {
			d3.selectAll(".node")
				.filter(function(dd) {
					return d.color==dd.color;
				})
				.classed("legendHover", true);

		})
		.on("mouseout", function(d) {
			d3.selectAll(".node").classed("legendHover", false);
		})
		.attr("display", function(d, i) {
				// hide all "other" domain objects except the first one
				if (i<self.colorScheme.length) {
					return "";
				} else {
					return "none";
				}
			});
        // // start off hidden if not the same domain as the ego node
        // .style('opacity', function(d) {
        //     // var thisTopCluster = d.cluster.split(':')[0];
        //     // if (thisTopCluster === egoNodeTopCluster) return 1; else return 0;
        //     if (d.DomainID===self.egoNode.DomainID) return 1; else return 0;
        // });
    // // Don't hide the legend if annotations are turned off
    // // maybe try a different approach later
    // if ( !self.graphParams.doAnnotations.value ) legendItem.style('opacity', 1);

    legendItem.append('svg:rect')
        .attr('width', squareSize)
        .attr('height', squareSize)
        .attr('transform', function(d, i) {
            return 'translate(0,' + (sqrPlusPadding * i) + ')';
        })
        .attr('fill', function(d) {
            return d.color; });
    legendItem.append('svg:text')
        .attr('transform', function(d, i) {
                return 'translate(' + (sqrPlusPadding) + ',' + (sqrPlusPadding * i) + ')';
        })
        .attr('dy', '1em')
        .text(function(d) {
                // return 'Papers in category "' + d.DomainName + '" (domain ' + d.DomainID + ')';
				if (d.DomainID != 0 && d.DomainName.toLowerCase()=="other") {
					return "Papers in other categories";
				} else {
					return 'Papers in category "' + d.DomainName + '"';
				}
        })
		.style('font-size', '.9em');


};

egoGraphVis.prototype.addAuthorImage = function() {
	var self = this;
	if (self.egoNode.hasOwnProperty('name')) {
		self.egoNode.AuthorName = self.egoNode.name;
	}
	if (self.egoNode.hasOwnProperty('AuthorName')) {
		
		self.authorImageDiv = self.svg.append('foreignObject').attr('class', 'externalObject')
			.attr('x', 0)
			.attr('y', self.graphDimensions.height/2 - 50)
			// .attr('height', self.graphDimensions.height/5)
			.attr('height', '100%')
			.attr('width', self.graphDimensions.height/5)
			.append('xhtml:div')
			.attr('id', 'authorImageDiv');
		self.authorImageDiv
			.append('xhtml:p')
			.html('<p>' + self.data.nodes[0].AuthorName.capitalize() + '</p>');

		var authorImageContainer = self.authorImageDiv
			.append('xhtml')
			.attr('id', 'authorImageContainer');

		// Add content for HRA authors
		var authorOrg = self.data.nodes[0].organization;
		console.log(authorOrg);
		if (typeof authorOrg != 'undefined') {
			d3.tsv("static/healthra/orgs_with_links.tsv", function(error, org_data) {
				if (error) throw error;
				var pstyle = 'style="margin: 0; padding: 0; font-size: .85em"'
				console.log(org_data);
				for (var i = 0, len = org_data.length; i < len; i++) {
					if (org_data[i]['org_name'] == authorOrg) {
						var nameFromTSV = org_data[i]['match_name'];
						if ( (typeof nameFromTSV != 'undefined') && (nameFromTSV != '') ) {
							var orgLink = org_data[i]['link'];
							var orgImgUrl = org_data[i]['img_url'];
							self.authorImageDiv
								.append('xhtml:p')
								.html('<a href="' + orgLink + '" target="_blank"><p ' + pstyle + '>' + nameFromTSV + '</p>');
							var authorImage = addImage(orgImgUrl);
							authorImage.style('cursor', 'pointer');
							authorImage.on('click', function() { console.log(orgLink); window.open(orgLink, '_blank')});
						} else {
							self.authorImageDiv
								.append('xhtml:p')
								.html('<p style="margin: 0; padding: 0; font-size: .85em">' + authorOrg + '</p>');
						}
					}
				}
			});
	}
	}

	function addImage(authorImageSrc) {
		var authorImage = authorImageContainer
			.append('xhtml:img')
			.attr('src', authorImageSrc)
			.attr('id', 'authorImage')
			.attr('width', '85px');
		return authorImage;
	}

	// If an image URL is included in the data:
	var AuthorImgUrl = self.data.nodes[0].AuthorImgUrl || self.data.nodes[0].ImgURL;
	console.log(AuthorImgUrl);
	if (typeof AuthorImgUrl != 'undefined') {
		addImage(AuthorImgUrl);
		return;
	}

	// Pew method of getting author image:
	// Try some filename extensions and attempt to insert the image
	var pewid_str = self.data.nodes[0].PewScholarID;
	if (typeof pewid_str === 'undefined') {
		return;
	}
	var pewid_str = pewid_str.toString();
	// zero-pad the pew id
	pewid_str = ('000' + pewid_str);
	pewid_str = pewid_str.substr(pewid_str.length-3);
	var fname_root = "static/img/pew_photos/" + pewid_str;
	var possibleExtensions = ['.png', '.jpg', '.jpeg', '.JPG', '.JPEG', '.PNG'];
	
	// recursive function that loops through the different possible file extensions above
	function tryImageFilenames(fname_root, possibleExtensions, iter) {
		var authorImageFilename = fname_root + possibleExtensions[iter];
		if (iter >= possibleExtensions.length) {
			return false;
		}
		$.get(authorImageFilename)
			.done(function() {
				addImage(authorImageFilename);
			}).fail(function() {
				// recurse
				var c = iter + 1;
				tryImageFilenames(fname_root, possibleExtensions, c);
			});
	}
	tryImageFilenames(fname_root, possibleExtensions, 0);


	var pewClass = self.data.nodes[0].pew_Class;
	if (typeof pewClass != 'undefined') {
		self.authorImageDiv
			.append('xhtml:p')
			.html('<p style="margin: 0; padding: 0; font-size: .85em">Pew Scholar ' + pewClass + '</p>');
	}


};

egoGraphVis.prototype.addEventListeners = function() {
	// Only add event listeners here that don't act across different vis objects
	// Otherwise they need to be added to (e.g.) citationVis_Main.js
	
	var self = this;

	if (self.zoomable === true) {
		self.group.call(self.zoom);
	}

    // Add event listener to nodes for tooltip:
    d3.selectAll('.node')
		.each(function(d) { 
			d.updatedProps = false;
	        d.tooltipHtml = '<p>Loading...</p>'	});
	// self.tip.html(function(d) { return d.tooltipHtml; });
	d3.selectAll('.node')
        .on('mouseover', function(d) {
			d.hovered = true;
			var hoveredItem = d3.select(this);
			// self.tooltip = self.tooltip
			// 	.html(d.tooltipHtml)
			// 	.style('visibility', 'visible')
			// 	.style('border-style', 'solid')
			// 	.style('border-color', d.color);
			// the first time a node is moused over, retrieve additional properties if it is a paper node
			// if ( (d.nodeType === 'paper') && (!d.updatedProps) ) {
			// 	$.ajax({
			// 		dataType: 'json',
			// 		url: $SCRIPT_ROOT + '/_vis_get_more_paperinfo',
			// 		data: {paperid: d.id},
			// 		success: function(result) {
			// 			d.Title = result['title'];
			// 			d.doi = result['doi'];
			// 			d.citation = result['citation'];
			// 			d.updatedProps = true;
			// 			// d.tooltipHtml = '<p>' + d.citation + '</p>';
			// 			// d.tooltipHtml = d.tooltipHtml + '<br>';
			// 			// d.tooltipHtml = d.tooltipHtml + '<p>Category: ' + d.DomainName + '</p>';
			// 			// if (d.hovered) {
			// 			// 	self.tip.show(d, hoveredItem.node());
			// 			// 	// self.tip.show(d);
			// 			// }
            //
			// 		}
			// 	});
			// } else if ( d.idx == 0 ) {
			// 	d.tooltipHtml = '<p>';
			// 	if (d.nodeType) {
			// 		d.tooltipHtml = d.tooltipHtml + d.nodeType.capitalize() + ': ';
			// 	}
			// 	d.tooltipHtml = d.tooltipHtml + d.name;
			// 	d.tooltipHtml = d.tooltipHtml + '</p>';
			// 	var numberOfPubs = d.papers.length;
			// 	d.tooltipHtml = d.tooltipHtml + '<p>Number of Publications: ' + numberOfPubs + '</p>';
			// 	
			// }
			// self.tip.style('border-color', d.color)
			// 	.show(d, hoveredItem.node());
				// .show(d);
			// self.makeTooltip(d, function(tooltipHtml) {
			// 	self.tooltip = self.tooltip
			// 		.html(tooltipHtml)
			// 		.style('visibility', 'visible')
			// 		.style('border-style', 'solid')
			// 		.style('border-color', d.color);
			// });
			// going to try to use the method of getting the citation text. but not working yet
			// getCitation(d.PaperID, this);
        })
        .on('mousemove', function(d) {
			// self.tip.show(d);
            // self.tooltip = self.tooltip
			// 	.html(d.tooltipHtml)
            //     .style('visibility', 'visible')
            //     .style('top', (d3.event.pageY-10)+'px')
            //     .style('left', (d3.event.pageX+10)+'px');
        })
        .on('mouseout', function(d) {
			d.hovered = false;
			// self.tip.hide(d);
            self.tooltip = self.tooltip.style('visibility', 'hidden'); })
		.on('click', function(d) {
			// var doi = getDOI(d.PaperID, this);
			if ( (d.nodeType === 'paper') ) {
				if ( (d.hasOwnProperty('doi')) && (d.doi !== '') ) {
					var url = 'https://doi.org/' + d.doi;
				} else {
					var url = 'https://academic.microsoft.com/#/detail/' + d.id;
				}
				window.open(url, '_blank');
				
			}
		})

	function getDOI(paperid, nodeObj) {
		var thisNode = d3.select(nodeObj);
		$.ajax({
			dataType: 'json',
			url: $SCRIPT_ROOT + '/_vis_get_doi',
			data: {paperid: paperid},
			success: function(result) {
				console.log(result['doi']);
				var doi = result['doi'];
				if (doi) {
					var url = 'https://doi.org/' + doi;
					window.open(url, '_blank');
				}

			}
		});
		
	}
	function getCitation(paperid, nodeObj) {
		//
		var thisNode = d3.select(nodeObj);
		$.ajax({
			dataType: 'json',
			url: $SCRIPT_ROOT + '/_vis_get_citation',
			data: {paperid: paperid},
			success: function(result) {
				console.log(result['citation']);
				thisNode.attr('title', result['citation']);
			}
		});
	}

};

egoGraphVis.prototype.makeTooltip = function(d, callback) {
    var self = this;

	// Account for author node:
	if (d.nodeType === 'author' || d.nodeType === '' || d.nodeType === 'venue') {
		var tooltipHtml = '<p class="authorName">Author: ' + d.AuthorName + '</p>';
		if (d.pew_Class) {
			tooltipHtml = tooltipHtml + '<p class="pewClass">Pew Class: ' + d.pew_Class + '</p>';
		}
		var numberOfPubs = d.papers.length;
		tooltipHtml = tooltipHtml + '<p class="numberOfPubs">Number of Publications: ' + numberOfPubs + '</p>';
		// return tooltipHtml;
		callback(tooltipHtml);
	}

	// Otherwise: make a tooltip for a paper node
	function getAuthorList(authors) {
		var authorList = [];
		authors.forEach(function(a) {
			var thisAuthorStrList = a[1].split(' ');
			// thisAuthorStrList = thisAuthorStrList.map(function(x) { return x.charAt(0).toUpperCase() + x.slice(1).toLowerCase(); });
			// thisAuthorStrList = thisAuthorStrList.map(function(x) { if (x === x.toUpperCase()) return x.capitalize(); else return x;});
			thisAuthorStrList = thisAuthorStrList.map(function(x) { if (x != x.toUpperCase()) return x.capitalize(); else return x;});
			// var thisAuthor = a.Name.charAt(0).toUpperCase() + a.Name.slice(1).toLowerCase();
			var thisAuthor = thisAuthorStrList.join(' ');
			authorList.push(thisAuthor);
		});
		return authorList;
	}
	function getTitle(paperid, callback) {
		//
		$.ajax({
			dataType: 'json',
			url: $SCRIPT_ROOT + '/_vis_get_title',
			data: {paperid: paperid},
			success: function(result) {
				callback(result['title']);
			}
		});
	}
	function makeHtml() {
		// var tooltipHtml = '<p class="paperID">pID: ' + d.id + '</p>';
		var tooltipHtml = '';
		tooltipHtml = tooltipHtml + '<p class="paperTitle">';
		tooltipHtml = tooltipHtml + d.Title;
		tooltipHtml = tooltipHtml + '</p>';
		tooltipHtml = tooltipHtml + '<p class="paperYear">' + d.Year + '</p>';
		var authorStrList = [];
		d.authorList.forEach(function(a) {
			authorStrList.push(a)
		});
		var authorList = authorStrList.join(', ');
		tooltipHtml = tooltipHtml + '<p class="paperAuthor">Authors: ' + authorList + '</p>';
		return tooltipHtml;
	}
	if ( d.hasOwnProperty('authors') ) {
		var authorList = getAuthorList(d.authors);
		d.authorList = authorList;
		if ( d.hasOwnProperty('Title') ){
			var tooltipHtml = makeHtml();
			callback(tooltipHtml);
		} else {
			getTitle(d.id, function(title) {
				d.Title = title;
				var tooltipHtml = makeHtml();
				callback(tooltipHtml);
			});
		}
	} else {
		$.ajax({
			dataType: 'json',
			url: $SCRIPT_ROOT + '/_vis_get_authorinfo',
			data: {authorids: JSON.stringify(d.AuthorIDList)},
			success: function(result) {
				d.authors = result['authors'];
				var authorList = getAuthorList(d.authors)
				d.authorList = authorList;
				if ( d.hasOwnProperty('Title') ){
					var tooltipHtml = makeHtml();
					callback(tooltipHtml);
				} else {
					getTitle(d.id, function(title) {
						d.Title = title;
						var tooltipHtml = makeHtml();
						callback(tooltipHtml);
					});
				}
			}
		});

	}
    
};

egoGraphVis.prototype.revealEgoNode = function() {
    var self = this;

    self.currNodeIndex = 0;  // Index of current node (ego node)
	self.currYear = self.data.graph.yearRange[0];

    // Reveal ego node
	d3.selectAll('.node').filter(function(d) { return d.id === self.egoNode.id; })
        .classed('hidden', false)
        .classed('visible', true)
        .transition()
        // .delay(self.graphParams.transitionTimePerYear.value/4)
        .duration(2000)
        .attr('r', function(d) {
                //return 4.5 + (self.eigenFactorScale(d.EF) * 10);
                return d.radius;
        })
        .attr('T', 1)
		.each('start', function() {
			self.yearTextDisplay.transition()
			    .delay(1000)
			    .duration(1000)
			    .style('opacity', .15);
		})
        .each('end', function() {
            // reveal legend
            // self.legend.transition()
            //     .delay(4000)
            //     .duration(1000)
            //     .style('opacity', 1);

            // reveal the display of current year
            // self.yearTextDisplay.transition()
            //     .duration(1000)
            //     .style('opacity', .15);

			// notify everyone (i.e. the Main.js and the line charts)
			$.event.trigger({
				type: "yearChange",
			});
            self.animateToDestinationNode();
        });
};

egoGraphVis.prototype.animateToDestinationNode = function() {
    var self = this;



    // Check if we're moving forward or backward
        // if currNodeIndex < destinationNodeIndex:
        //     currNodeIndex++;
        //     check for year
        //     drawNode();
    if (self.currNodeIndex === self.destinationNodeIndex) {
        console.log('goto finish');
        self.finishAnimation();
    } else if (self.currNodeIndex < self.destinationNodeIndex) {
		self.animationState = 'forward';
        self.currNodeIndex++;
        self.checkYear();
        // self.drawNode();
    } else if (self.currNodeIndex > self.destinationNodeIndex) {
		self.animationState = 'rewind';
        self.currNodeIndex--;
        self.checkYear();
        // self.removeNode();
    }
};

egoGraphVis.prototype.continue = function() {
	var self = this;

    // if (self.currNodeIndex === self.destinationNodeIndex) {
    //     console.log('goto finish');
    //     self.finishAnimation();
    // if (self.currNodeIndex < self.destinationNodeIndex) {
    //     self.drawNode();
    // } else if (self.currNodeIndex > self.destinationNodeIndex) {
    //     self.removeNode();
    // }

	// if the year of the first nonEgo node is the same as the year of the center
	// node's first publication, transitionTimePerNode will be undefined and there
	// will be errors.
	// So let's calculate it:
	if (typeof self.transitionTimePerNode === 'undefined') {
		self.calculateTransitionTime();
	}
	if (self.animationState === 'forward') {
		self.drawNode();
	} else if (self.animationState === 'rewind') {
		self.removeNode();
	}
};

egoGraphVis.prototype.checkYear = function() {
	var self = this;
	
	// if we are on the last node, just max out the year.
	if (self.currNodeIndex == self.data.nodes.length-1) {
		self.currYear = self.data.graph.yearRange[1];
		// cutoff at 2015
		self.currYear = Math.min(self.currYear, 2015);

		self.yearTextDisplay.text(self.currYear);

		// jQuery custom event, so that Main.js can listen for it and advance the year on the line charts
		$.event.trigger({
			type: "yearChange",
		});
		self.continue();
		return;
	}

	var currNode = self.data.nodes.filter(function(d) { return d.idx === self.currNodeIndex; });
	var oldYear = self.currYear;
	var newYear = currNode[0].Year;
	// if the year is the same as it was, do nothing
	if (newYear == oldYear) {
		self.continue();
	} else if (newYear > oldYear) {
		// trying to debug timing issues
		// looks like timing is just inherently inconsistent. there seems to be a delay with this method (calling the next node drawing in transition.each('end') )
		// console.log(self.currYear);
		// console.log('c '+self.c);
		// console.log('tt '+self.tt);
		// console.log('tt over c '+self.tt/self.c);
		// console.log('transitionTimePerNode '+self.transitionTimePerNode);
		// console.log('error '+(self.transitionTimePerNode)/(self.tt/self.c));
		self.c=0;
		self.tt=0;
		self.currYear++;
		self.beginNewYear();
	} else if (newYear < oldYear) {
		self.currYear--;
		self.beginNewYear();
	}
	// self.currYear = currNode[0].Year;

	// TODO: come back to this
	//
    // // Check the year of the current node, and if it is different than currYear:
    // //     update currYear;
    // //     update yearTextDisplay;
    // //     fade nodes and links from previous year;
    // //     recalculate transition times;
    //
    // var self = this;
    //
    // var yearOfCurrNode = self.allNodes[self.currNodeIndex].Year
    // if ( yearOfCurrNode != self.currYear ) {
    //     self.currYear = yearOfCurrNode;
    //
    //     self.updateLineChart();
    //
    //     // Update the year display
    //     self.yearTextDisplay.text(self.currYear);
    //     // I may need to do something about this (that the year text display starts off hidden):
    //     // if (self.currYear == self.egoNode.Year) 
    //     //         {self.yearTextDisplay.transition()
    //     //                 .duration(1000)
    //     //                 .style('opacity', .15);
    //
    //     // Only fade previous year if going forward in time
    //     if (self.currNodeIndex < self.destinationNodeIndex) self.fadeNodesAndLinksPrevYear();
    //
    //     self.calculateTransitionTime();
    // }
	return self.currYear;
};

egoGraphVis.prototype.beginNewYear = function() {
	var self = this;

	
	self.yearTextDisplay.text(self.currYear);

	// jQuery custom event, so that Main.js can listen for it and advance the year on the line charts
	$.event.trigger({
		type: "yearChange",
	});

	self.calculateTransitionTime();
	var nodesThisYear = self.notEgoNodes.filter(function(d) { return d.Year == self.currYear; });

	// If this year has no nodes, delay, then continue
	if ( nodesThisYear.length === 0 ) {
		setTimeout(function() {
			self.checkYear();
		}, self.transitionTimePerYear[self.currYear])
	} else {
		self.continue();
	}


};

egoGraphVis.prototype.drawNode = function() {
    var self = this;

    // self.animationState = 'forward';

    // self.fadeNodesAndLinksPrevYear();

    var currNode = d3.selectAll('.node').filter(function(d) { return d.idx === self.currNodeIndex; });

    function drawLinks(nodeObj) {
        // This function will draw the link out from the source to the target.
        // We'll call it after each node appears.
        nodeObj.linksThisNodeIsSource = d3.selectAll('.link').filter(function(l) { return l.source === nodeObj; });
        nodeObj.linksThisNodeIsSource.classed('hidden', false)
            .classed('visible', true)
            .each(function(d) { d.inTransition = true; })
            .attr('x2', function(d) { return d.source.x; })
            .attr('y2', function(d) { return d.source.y; })
            .style('visibility', 'visible')
            .transition()
            .ease('linear')
            .delay(0)
            .duration(self.linkAppearDuration)
            .attr('x2', function(d) { return d.target.x; })
            .attr('y2', function(d) { return d.target.y; })
            // .attr('x2', 0)
            // .attr('y2', 0)
            .attr('T', 1)
            .each('end', function(d) { d.inTransition = false; });
    }
    // Make the nodes appear:
	// var t0 = performance.now();
    currNode.classed('hidden', false)
        .classed('visible', true)
        .transition()
        .ease('linear')
        //.delay(function(d, i) { return (i-currIndex) * timePerNode; })
        // .delay(function(d, i) { return i * self.transitionTimePerNode; })
        .duration(self.transitionTimePerNode)
        .attr('r', function(d) {
            //return 4.5 + (self.eigenFactorScale(d.EF) * 10);
            return d.radius;
        })
        .attr('T', 1)
		.each('end', function(d) {
			// var t1 = performance.now();
			// self.tt = self.tt + (t1-t0);
			self.c++;
			if (self.zoomable === true) {
				self.checkZoom(d);
			}
			// console.log(t1-t0 + "milliseconds");
			self.animateToDestinationNode();
			drawLinks(d);
        // .each(function(d) {
            // Put up annotation if a node comes from a new domain.
            // Must satisfy the conditions:
            // -graph paramater doAnnotations is true
            // -the domain has not already been annotated
            // -the domain is different than the ego node's domain
            var thisDomain = self.domainsThisGraph.filter(function(domain) {return domain.DomainID==d.DomainID;});
            // The above returned an array. Take the first element to get the object representing the Domain.
            thisDomain = thisDomain[0]
            if ( (self.doAnnotations) && (!thisDomain.alreadyAnnotated) && (thisDomain.DomainID != self.egoNode.DomainID) ) {
                self.annotationNewCluster(d);
                d3.select('#legendDomain' + d.DomainID)
                    .transition().delay(1000).duration(2000)
                    .style('opacity', 1);
                thisDomain.alreadyAnnotated = true;
            } // else {

            // I can use else if statements for the other annotations.
            // (or other if statements? what if one node trips two annotations?)

            // var clusterSplit = d.cluster.split(':');
            // // Put up annotation if a node comes from a new cluster
            // // Also reveal this cluster in the legend
            // var clusterIndex = self.clustersToAnnotate.indexOf(clusterSplit[0])
            // if (clusterIndex > -1)
            //         { if ( (self.graphParams.doAnnotations.value ) && ( !self.clusters[clusterIndex].alreadyAnnotated ))
            //                 { self.annotationNewCluster(d);
            //                 d3.select('#legendCluster' + clusterSplit[0])
            //                         .transition().delay(1000).duration(2000)
            //                         .style('opacity', 1);
            //                 self.clusters[clusterIndex].alreadyAnnotated = true; } }

            // Put up annotation when the highest Eigenfactor node appears
            // Commented out because it happens too early for this paper and interferes with flow
            //if (d.EF === d3.max(self.allNodes, function(dd) { return dd.EF; }))
                    //{ console.log('highest EF'); self.annotationHighestEF(d); }

            // else self.animateToDestinationNode();

        });
};

egoGraphVis.prototype.removeNode = function() {
    var self = this;

    self.animationState = 'rewind';

    // self.calculateTransitionTime();

    var currNode = d3.selectAll('.node').filter(function(d) { return d.index === self.currNodeIndex; });
    var currLinks = d3.selectAll('.link').filter(function(d) { return d.source.index === self.currNodeIndex; });

    // var retractDuration = self.linkAppearDuration;
    var retractDuration = self.transitionTimePerNode;
    currLinks.transition()
        .each('start', function(d) { d.inTransition=true; })
        .duration(retractDuration)
        .ease('quad')
        .attr('x2', function(d) { return d.source.x; })
        .attr('y2', function(d) { return d.source.y; })
        .call(function(d) {
		// .each('end', function(d) {
            d.inTransition=false;
            var currNode = d3.selectAll('.node').filter(function(d) { return d.idx === self.currNodeIndex; });
            currNode.transition()
                .duration(self.transitionTimePerNode)
                .ease('quad')
                .attr('r',0)
                .attr('T',1)
                .each('end', function(dd) {
                    d3.select(this).classed('hidden', true)
                        .classed('visible', false);
                    self.animateToDestinationNode();
                });
        });
};

egoGraphVis.prototype.finishAnimation = function() {
	var self = this;

	self.animationState = 'stopped';
	$.event.trigger({
		type: "animationFinished",
	});
	console.log('finished');
	console.log(self.currNodeIndex);
};

egoGraphVis.prototype.newDestinationNode = function(destinationYear) {
	var self = this;

	self.destinationYear = destinationYear;
	console.log(self.destinationYear);
	self.getDestinationNode();
	
	// make sure the current node is included:
	if ( !(self.currNodeIndex === self.destinationNodeIndex) ) {  // don't do anything if this is true
		if (self.currNodeIndex < self.destinationNodeIndex) {
			self.animationState = 'forward';
			self.drawNode();
		} else {
			self.animationState = 'rewind';
			self.removeNode();
		}
	}
};

egoGraphVis.prototype.getDestinationNode = function() {
	var self = this;

	// Get the destination node index from the destination year
	var maxYear = self.data.graph.yearRange[1];
	function getNodesThisYear() {
		var nodesThisYear = self.notEgoNodes.filter(function(d) { return d.Year == self.destinationYear; });
		return nodesThisYear;
	}
	var nodesThisYear = getNodesThisYear();
	if (nodesThisYear.length > 0) {
		var lastNodeThisYear = nodesThisYear[nodesThisYear.length-1];
		self.destinationNodeIndex = lastNodeThisYear.idx;
	} else {
		if (self.destinationYear == maxYear) {
			rewindSearch();
		} else {
			self.destinationYear++;
			self.getDestinationNode();  // recurse
		}
	}

	function rewindSearch() {
		self.destinationYear--;
		var nodesThisYear = getNodesThisYear();
		if (nodesThisYear.length > 0) {
			self.getDestinationNode();
		} else {
			rewindSearch();  // recurse
		}
	}

};

egoGraphVis.prototype.calculateTransitionTime = function() {
	// Method to calculate the transition time for each node based on the number of nodes in the current year
	
	var self = this;

	// SPEED UP FOR TESTING PURPOSES
	// KEEP THIS COMMENTED OUT
	// self.transitionTimePerYear[self.currYear] = 100;

	var countThisYear = self.data.graph.nodeCountsPerYear[self.currYear];
	self.transitionTimePerNode = countThisYear ? self.transitionTimePerYear[self.currYear] / countThisYear : 0;
	self.transitionTimePerNode = self.transitionTimePerNode - 10;


};

egoGraphVis.prototype.revealFinalState = function() {
	// cancel all transitions and reveal the final state of the vis

	var self = this;
	
	d3.selectAll('.node, .link').transition().duration(0);

	self.node
		.classed('hidden', false)
		.attr('r', function(d) {
			return d.radius;
		})
		.each(function(d) {
			if (self.zoomable === true) {
				self.checkZoom(d)
			}
		});

	self.link
		.classed('hidden', false)
		.classed('visible', true)
		.style('visibility', 'visible')
		.attr('x2', function(d) { return d.target.x; })
		.attr('y2', function(d) { return d.target.y; })
		.each(function(d) { d.inTransition = false; });

	self.currNodeIndex = self.data.nodes.length-1;
	self.currYear = self.data.graph.yearRange[1];
	self.yearTextDisplay.text(self.currYear);
	$.event.trigger({
		type: "yearChange",
	})

	self.finishAnimation();

	return
}

		

function lineChartByYear(data) {
	var self = this;
	self.data = data.values;
	self.pew_Class = data.pew_Class;
	self.hra_funding = data.funding;
	// if there is only one funding record:
	// if (self.hra_funding.length == 1) {
	// 	self.hra_funding = self.hra_funding[0];
	// }
	
	// testing:
	// self.hra_funding = self.hra_funding[0];
	// console.log(self.hra_funding);

	// Defaults
	// Graph SVG Dimensions
    // self.lineChartDimensions = {
	// 	margin: {top: 30, right: 20, bottom: 30, left: 50}
	// };
	// self.lineChartDimensions.width = 960 * 3/4 - self.lineChartDimensions.margin.left - self.lineChartDimensions.margin.right;
	// self.lineChartDimensions.height = 110 - self.lineChartDimensions.margin.top - self.lineChartDimensions.margin.bottom;
	self.lineChartDimensions;  // imported in self.importDefaultOptions below
	
	self.colorScheme;
	// // Colors:
    // // See http://colorbrewer2.org/?type=qualitative&scheme=Set1&n=8
    // self.colorScheme = ['rgb(228,26,28)','rgb(55,126,184)','rgb(77,175,74)',
    //         'rgb(152,78,163)','rgb(255,127,0)','rgb(255,255,51)',
    //         'rgb(166,86,40)','rgb(247,129,191)']
    // // I liked the blue better for the main color, so the next line just moves
    // // the blue color (originally self.colorScheme[1]) to the front (self.colorScheme[0])
    // self.colorScheme.splice(0, 0, self.colorScheme.splice(1, 1)[0])

    // self.x = d3.time.scale().range([0, self.lineChartDimensions.width]);

	self.x;
	self.y;
	self.chartDiv;
    self.svg;
    self.svgDefs;
	self.title;
    self.clipPath;
    self.currYearIndicator;
	self.yearArea;
	self.yearAreaOpacity = .1;
    self.xAxis;
    self.yAxis;
    self.line;  // line drawing function
    self.area;  // area drawing function
	self.chartLine;  // actual line element
	self.chartArea;  // actual area element
	self.linearGradient;

	self.animationState;
	self.currYear;
	self.transitionTimePerYear;
	self.yearRange = d3.extent(self.data, function(d) { return d.year; });
	// cut off at 2015
	self.yearRange[1] = Math.min(self.yearRange[1], 2015);
	
	self.fundingTime;
	if (typeof self.pew_Class != 'undefined') {
		self.fundingTime = 4;  // funding period for Pew
	}
	if (typeof self.hra_funding != 'undefined') {
		self.hra_funding = self.hra_funding[0];
		self.fundingTime = self.hra_funding.duration_in_years;
		// this is a hack that will work for now
		// TODO: fix this
		self.pew_Class = self.hra_funding.start_date;
	}

	// self.init();

	return self;

}

lineChartByYear.prototype.init = function() {
	var self = this;


	self.animationState = 'init';
	self.currYear = self.yearRange[0];  // Initialize year

    self.x = d3.scale.linear().range([0, self.lineChartDimensions.width]);
    self.y = d3.scale.linear().range([self.lineChartDimensions.height, 0]);

	self.chartDiv = d3.select('#chartsDiv').append('div')
		.attr('class', 'chartDiv');

	self.svg = self.chartDiv.append('svg')
	    .attr('width', self.lineChartDimensions.width + self.lineChartDimensions.margin.left + self.lineChartDimensions.margin.right)
	    .attr('height', self.lineChartDimensions.height + self.lineChartDimensions.margin.top + self.lineChartDimensions.margin.bottom)
	    // .attr('id', 'chart2Svg')
	    .attr('class', 'lineChart')
	    .append('g')
	    .attr('transform', 'translate(' + self.lineChartDimensions.margin.left + ',' + self.lineChartDimensions.margin.top + ')');
	self.svgDefs = self.svg.append('defs');
	
	// The strategy is to draw the entire line, but use a clip path to only
	// display up to the current year.
	// var chart2ClipPath = self.svgDefs
	// 	.append('clipPath')
	// 	.attr('class', 'clip')
	// 	.append('rect')
	// 	.attr('width', 0)
	// 	.attr('height', self.lineChartDimensions.height);

    // self.x.domain([self.strToYear("1968"), self.strToYear("2013")]);
	self.x.domain(self.yearRange);
	// Hack to cut off x axis at 2010:
	// self.x.domain([self.yearRange[0], 2010]);
	// self.y.domain([0, d3.max(self.data, function(d) { return d.count+5; })]);
	self.y.domain([0, d3.max(self.data, function(d) { return d.count; })]);

	self.xAxis = d3.svg.axis().scale(self.x)
		.orient('bottom')
		.tickFormat(d3.format("d"))
		// .ticks(16);
		.ticks(Math.min(self.data.length, 20));
	
	self.yAxis = d3.svg.axis().scale(self.y)
		.orient('left')
		.ticks(2)
		.tickSize(0);
	
    // Define line drawing function
    self.line = d3.svg.line()
		.x(function(d) { return self.x(d.year); })
		.y(function(d) { return self.y(d.count); });
    
    // Define the area drawing function
    self.area = d3.svg.area()
		.x(function(d) { return self.x(d.year); })
		.y0(self.lineChartDimensions.height)
		.y1(function(d) { return self.y(d.count); });

	// Draw x axis
    self.svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + self.lineChartDimensions.height + ')')
            .call(self.xAxis);

    // Put the year for each axis tick label into a data attribute
    // to be able to get it more easily later
    var yearLabels = self.svg.select('.x.axis')
        .selectAll('.tick')
        .attr('class','yearTick')
        // .attr("data-year", function(d) {return self.yearToStr(d); })
        .attr("data-year", function(d) {return d; })
		.style('font-size', '.75em');
	
    // Add a rect for each year label so we can highlight it later
	var yearLabel = self.svg.selectAll('.yearTick')
		.append('svg:rect')
		.attr('fill', self.colorScheme[4])
		.style('opacity', 0)
		.attr('class', 'highlightRect')
		.each(function(d) {
			var bbox = this.parentNode.getBBox();
			var padding = bbox.width/4;
			d3.select(this)
				.attr('x', bbox.x - padding)
			.attr('y', bbox.y)
			.attr('width', bbox.width + padding*2)
			.attr('height', bbox.height);
		});

	// Draw y axis
	self.svg.append('g')
		.attr('class', 'y axis')
		.call(self.yAxis)
		.append('text')
		.attr('transform', 'rotate(-90)')
		.attr('y', -self.lineChartDimensions.margin.left/2)
		.attr('x', -(self.lineChartDimensions.height + self.lineChartDimensions.margin.top + self.lineChartDimensions.margin.bottom)/2)
		.attr('class', 'axisLabel')
		.text('Num citations')
		.attr('font-size', '.5em');

	// var maxX = self.x(self.yearRange[1]);
	// console.log(self.yearRange[0]);
	// self.linearGradient = self.svg.append('linearGradient')
	//     .attr('id', 'line-gradient')
	//     .attr('gradientUnits', 'userSpaceOnUse')
	//     .attr('x1', 0).attr('y1', self.x(self.yearRange[0]))
	//     .attr('x2', maxX)
	//     .attr('y2', 0)
	//     .selectAll('stop')
	//     .data([
	// 	{offset: self.x(self.yearRange[0])/maxX, color: d3.rgb(self.colorScheme[7]).darker()},
	// 	{offset: self.x(1985)/maxX, color: d3.rgb(self.colorScheme[7]).darker()},
	// 	{offset: self.x(1987)/maxX, color: self.colorScheme[2]},
	// 	{offset: self.x(1989)/maxX, color: self.colorScheme[2]},
	// 	{offset: self.x(1991)/maxX, color: self.colorScheme[0]},
	// 	{offset: 1, color: self.colorScheme[0]}
	//     ])
	//     .enter().append('stop')
	//     .attr('offset', function(d) { return d.offset; })
	//     .attr('stop-color', function(d) { return d.color; });
	// console.log(self.linearGradient);
	self.linearGradient = d3.select('#line-gradient');
	// if (self.linearGradient.empty()) {
	// 	// self.linearGradient = self.makeColorGradient(1989);
	// 	self.linearGradient = self.makeColorGradient(self.pew_Class);
	// }
	// self.linearGradient = self.makeColorGradient(self.pew_Class);

	self.chartArea = self.svg.append('g')
		// .attr('clip-path', 'url(#clip)')
		.append('path')
		.datum(self.data)
		.attr('class', 'area')
		// .style('fill', self.graphParams.colorScheme.value[0])
		.style('fill', 'url(#line-gradient)')
		.attr('d', self.area);

	self.chartLine = self.svg.append('g')
		// .attr('clip-path', 'url(#clip)')
		.append('path')
		.datum(self.data)
		.attr('class', 'line')
		// .style('stroke', self.graphParams.colorScheme.value[0])
		.style('stroke', 'url(#line-gradient)')
		.attr('d', self.line);

	self.currYearIndicator = self.svg.append('svg:line')
		// .attr('class', 'verticalLine yearIndicator')
		.attr('class', 'verticalLine yearIndicator hidden') // turn it off for now (testing other things)
		// Keep track of transition timing:
		.attr('T', 0)
		.attr('x1', self.x(self.currYear))
		.attr('x2', self.x(self.currYear))
		.attr('y1', self.lineChartDimensions.height)
		// .attr('y2', self.lineChartYScale(currVal))
		.attr('y2', 0)
		.attr('stroke-width', 2)
		.attr('stroke', 'black')
		.attr('stroke-dasharray', ('5, 2'))
		.style('opacity', .25);

	// self.svg.select('.yearTick').select('.highlightRect')
	// 	.attr('class', 'currYear')
	// 	.transition()
	// 	.duration(500)
	// 	.style('opacity', .1);

	self.yearArea = self.svg.selectAll('.yearArea')
		.data(self.data)
		.enter().append('svg:rect')
		.attr('class', 'yearArea hidden')
		.attr('data-year', function(d) { return d.year; })
		.attr('x', function(d) { return self.x(d.year); })
		.attr('y', 0)
		.attr('width', function(d) { return self.x(d.year+1)-self.x(d.year); })
		.attr('height', self.lineChartDimensions.height)
		.attr('fill', self.colorScheme[4])
		.style('opacity', 0);


	if (typeof self.pew_Class != 'undefined') {
		self.makeFundingLines(self.pew_Class);
	}

};

lineChartByYear.prototype.importDefaultOptions = function(options) {
	var self = this;

	self.colorScheme = options.colorScheme;

	self.lineChartDimensions = options.dimensions.lineChart;

	self.transitionTimePerYear = options.transitionTimePerYear;

};

lineChartByYear.prototype.makeColorGradient = function(fundingYear) {
	var self = this;
	console.log(fundingYear);

	// This method should be called by the main app (e.g. Main.js)
	// It makes a linear gradient for the line charts based on funding period
	// fundingYear is the Pew Scholar's class year
	// The Pew funding lasts for five years
	// Maybe this method should be modified at some point to be able to have different lengths of funding
	
	// THIS DIDN'T WORK because the width depends on self.init, but this needs to be called before self.init
	//
	// instead call it in self.init()
	

	var maxX = self.x(self.yearRange[1]);
	var linearGradient = self.svg.append('linearGradient')
	    .attr('id', 'line-gradient')
	    .attr('gradientUnits', 'userSpaceOnUse')
	    .attr('x1', 0).attr('y1', self.x(self.yearRange[0]))
	    .attr('x2', maxX)
	    .attr('y2', 0)
	    .selectAll('stop')
	    .data([
		{offset: self.x(self.yearRange[0])/maxX, color: d3.rgb(self.colorScheme[7]).darker()},
		{offset: self.x(fundingYear-1)/maxX, color: d3.rgb(self.colorScheme[7]).darker()},
		{offset: self.x(fundingYear+1)/maxX, color: self.colorScheme[2]},
		{offset: self.x(fundingYear + (self.fundingTime)-1)/maxX, color: self.colorScheme[2]},
		{offset: self.x(fundingYear + (self.fundingTime)+1)/maxX, color: self.colorScheme[0]},
		{offset: 1, color: self.colorScheme[0]}
	    ])
	    .enter().append('stop')
	    .attr('offset', function(d) { return d.offset; })
	    .attr('stop-color', function(d) { return d.color; });

	return linearGradient;

};

lineChartByYear.prototype.makeFundingLines = function(fundingYear) {
	var self = this;

	// Make the vertical lines that show funding period


	self.svg.append('svg:line')
		.attr('class', 'verticalLineStatic verticalLineFundingBegin')
		.attr('x1', self.x(fundingYear))
		.attr('x2', self.x(fundingYear))
		.attr('y1', self.lineChartDimensions.height)
		.attr('y2', 0)
		.attr('stroke-width', 2)
		.attr('stroke', self.colorScheme[2])
		.style('stroke-dasharray', ('5, 2'))
		.style('opacity', .8);
	self.svg.append('svg:line')
		.attr('class', 'verticalLineStatic verticalLineFundingEnd')
		.attr('x1', self.x(fundingYear + self.fundingTime))
		.attr('x2', self.x(fundingYear + self.fundingTime))
		.attr('y1', self.lineChartDimensions.height)
		.attr('y2', 0)
		.attr('stroke-width', 2)
		.attr('stroke', self.colorScheme[0])
		.style('stroke-dasharray', ('5, 2'))
		.style('opacity', .8);
};

lineChartByYear.prototype.changeAnimationState = function(animationState) {
	var self = this;

	self.animationState = animationState;
	console.log(self.animationState);
	function advanceLine() {
		var timeElapsed = self.currYearIndicator.attr('T');
		self.currYearIndicator
			.attr('data-state', 'forward')
			// .attr('T', 0)
			.classed('hidden', false)
			.transition()
			// .duration(self.transitionTimePerYear[self.currYear] - timeElapsed)
			.duration(self.transitionTimePerYear[self.currYear])
			.ease('linear')
			.attr('x1', self.x(self.currYear))
			.attr('x2', self.x(self.currYear))
			// .attr('y2', self.lineChartYScale(currVal))
			.attr('data-state', 'stopped')
			.attr('T', 1)
			.each('end', function() {
				d3.select(this).attr('T', 0);
				self.currYear++;
				// advanceLine()
			});
		// // Update the clip path to show the part of the line we want (with transition)
		// self.lineChartClipPath
		// 	.attr('data-state', 'forward')
		// 	// .attr('T', 0)
		// 	.transition()
		// 	.duration(self.graphParams.transitionTimePerYear.value - timeElapsed)
		// 	.ease('linear')
		// 	.attr('width', self.lineChartXScale(currYearDateFormat))
		// 	.attr('data-state', 'stopped')
		// 	.attr('T', 1)
		// 	.each('end', function() { d3.select(this).attr('T', 0); });
	}
	if (self.animationState === 'forward') {
		advanceLine();
	}
};

lineChartByYear.prototype.correctYear = function(currYear) {
	var self = this;
	if (currYear != self.currYear) {
		self.currYear = currYear;
		self.currYearIndicator
			.attr('x1', self.x(self.currYear))
			.attr('x2', self.x(self.currYear));
		self.changeAnimationState();
	}
};

lineChartByYear.prototype.moveYearIndicator = function(currYear) {
	var self = this;

	self.currYear = currYear;
	self.currYearIndicator
		.attr('T', 0)
		.transition()
		.duration(self.transitionTimePerYear[self.currYear])
		.ease('linear')
		.attr('x1', self.x(self.currYear))
		.attr('x2', self.x(self.currYear))
		// .attr('y2', self.lineChartYScale(currVal))
		// .attr('data-state', 'stopped')
		.attr('T', 1)
		.each('end', function() {
			d3.select(this).attr('T', 0);
		});
	function highlightCurrYearTick() {
		self.svg.selectAll('.yearTick').selectAll('.highlightRect')
			.filter(function(d) { return d == self.currYear; })
			.attr('class', 'currYear')
			.transition()
			.duration(self.transitionTimePerYear[self.currYear]/4)
			.style('opacity', .1);
	}
	self.svg.selectAll('.yearTick').selectAll('.currYear')
		.classed('.currYear', false)
		.transition()
		.duration(self.transitionTimePerYear[self.currYear]/4)
		.style('opacity', 0);
	// highlightCurrYearTick();

	self.svg.selectAll('.yearArea.currYear')
		.classed('currYear', false)
		.transition()
		.duration(self.transitionTimePerYear[self.currYear]/4)
		// .style('opacity', self.yearAreaOpacity/2);
		.style('opacity', function(d) {
			if (d.year < self.currYear) {
				return self.yearAreaOpacity/2;
			} else {
				return 0;
			}
		});
	self.yearArea.filter(function(d) { return d.year == self.currYear; })
		.classed('currYear', true)
		.classed('hidden', false)
		.style('opacity', self.yearAreaOpacity*2)
		.transition()
		.duration(self.transitionTimePerYear[self.currYear]/2)
		.style('opacity', self.yearAreaOpacity);

	// make sure that everything is in order... i.e. that years before currYear are highlighted
	// and years after currYear are not
	self.yearArea.filter(function(d) { return d.year < self.currYear; })
		.classed('hidden', false)
		.style('opacity', self.yearAreaOpacity/2);
	self.yearArea.filter(function(d) { return d.year > self.currYear; })
		.style('opacity', 0);
	console.log(self.currYear);

};

lineChartByYear.prototype.addTitle = function(title) {
	var self = this;

	self.title = self.svg.append('text')
	    .attr('class', 'lineChartTitle')
	    .attr('x', self.lineChartDimensions.width/2)
	    .attr('y', 0 - (self.lineChartDimensions.margin.top / 2) )
	    .attr('text-anchor', 'middle')
	    .text(title);

};
// var citationVis = citationVis || {};
//
// $( document ).on( "initComplete", {focus_id: focus_id}, function(event) {
// 	// pass focus_id through the event data
// 	var focus_id = event.data.focus_id;
// 	focus_id = parseInt(focus_id)
// 	// http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
// 	function getParameterByName(name, url) {
// 		if (!url) url = window.location.href;
// 		name = name.replace(/[\[\]]/g, "\\$&");
// 		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
// 			results = regex.exec(url);
// 		if (!results) return null;
// 		if (!results[2]) return '';
// 		return decodeURIComponent(results[2].replace(/\+/g, " "));
// 	}
// 	// if (getParameterByName('rcvmsg') === null) return; // add "rcvmsg=1" to the URL query parameters to enable this, otherwise do nothing
//
// 	var egoGraphVis = citationVis.egoGraphVis;
//
// 	// open the timelineVis when center node is clicked
// 	if (typeof focus_id == 'undefined' || !focus_id) {
// 		var focus_id = getParameterByName('focusid');
// 	}
// 	if (focus_id) {
// 		$( '.centerNode' ).click( function() {
// 			var url = Flask.url_for('generate_colldata_from_collection', {'focus_id': focus_id});
// 			window.open(url, '_blank', 'location=0');
// 		});
// 	}
//
// 	$(window).on('storage', message_receive);
//
// 	// https://stackoverflow.com/questions/28230845/communication-between-tabs-or-windows
// 	// receive message
// 	//
// 	function message_receive(ev) 
// 	{
// 		if (ev.originalEvent.key!='message') return; // ignore other keys
// 		var message = JSON.parse(ev.originalEvent.newValue);
// 		if (!message) return; // ignore empty message or message reset
//
// 		// act on the message
// 		if (message.command == 'timelineVis:paperItem:mouseover') highlightLinkedPapers(message.data.pid);
// 		if (message.command == 'timelineVis:paperItem:mouseout') linkedPapersMouseout(message.data.pid);
// 	}
//
// 	function highlightLinkedPapers(paper_id) {
// 		var highlightedNodes = [];
//
// 		d3.selectAll(".node").filter(function(d) {
// 			// return d.targetPaperIDs && d.targetPaperIDs.indexOf(paper_id) != -1;
// 			if (d.targetPaperIDs && d.targetPaperIDs.indexOf(paper_id) != -1) {
// 				highlightedNodes.push(d);
// 				return true;
// 			}
// 		})
// 		.classed("linkedToTimeline", true);
//
// 		// d3.selectAll(".link.toEgo").filter(function(d) {
// 		d3.selectAll(".link").filter(function(d) {
// 			return highlightedNodes.indexOf(d.source) != -1;
// 		})
// 		.classed("linkedToTimeline", true);
// 	}
//
// 	function linkedPapersMouseout(paper_id) {
// 		// d3.selectAll(".node").filter(function(d) {
// 		// 	return d.targetPaperIDs && d.targetPaperIDs.indexOf(paper_id) != -1;
// 		// })
// 		// .classed("linkedToTimeline", false);
// 		d3.selectAll(".linkedToTimeline").classed("linkedToTimeline", false);
// 	}
// });



var citationVis = citationVis || {};

$( document ).on( "initComplete", function() {
	var egoGraphVis = citationVis.egoGraphVis;
	if (egoGraphVis.zoomable == false) {
		return;
	}
	var zoom = egoGraphVis.zoom;
	egoGraphVis.zoomTranslate = zoom.translate();

	egoGraphVis.checkZoom = function(d) {
		var zoomThresholdMin = coordinates([0, 0])[1];  // minimum y value
		var zoomThresholdMax = coordinates([egoGraphVis.graphDimensions.width, egoGraphVis.graphDimensions.height])[1];  // maximum y value
		if (d.y < zoomThresholdMin || d.y > zoomThresholdMax) {
			console.log(zoom.translate());
			console.log(zoom.scale());
			console.log(coordinates([d.x, d.y]));
	console.log(coordinates([egoGraphVis.graphDimensions.width, egoGraphVis.graphDimensions.height]));
	console.log(coordinates([0,0]));
			// http://bl.ocks.org/mbostock/7ec977c95910dd026812
			egoGraphVis.group.call(zoom.event);

			// Record the coordinates (in data space) of the center (in screen space).
			var center0 = zoom.center();
			var translate0 = zoom.translate();
			var coordinates0 = coordinates(center0);
			zoom.scale(zoom.scale() * .9);

			// Translate back to the center.
			var center1 = point(coordinates0);
			zoom.translate([translate0[0] + center0[0] - center1[0], translate0[1] + center0[1] - center1[1]]);

			egoGraphVis.group.transition().duration(500).call(zoom.event);
			// egoGraphVis.group.call(zoom.event);
		}
	};

	function coordinates(point) {
		var scale = zoom.scale();
		var translate = zoom.translate();
		return [(point[0] - translate[0]) / scale, (point[1] - translate[1]) / scale];
	}

	function point(coordinates) {
		var scale = zoom.scale();
		var translate = zoom.translate();
		return [coordinates[0] * scale + translate[0], coordinates[1] * scale + translate[1]];
	}

	function testrecord() {
		var t = [300, 501];
		console.log('coordinates');
		console.log(t);
		console.log(coordinates(t));
	console.log(coordinates([egoGraphVis.graphDimensions.width, egoGraphVis.graphDimensions.height]));
	}

	$( document ).on( "animationFinished", function() {
		testrecord();
		console.log(zoom.translate());
		console.log(zoom.scale());
	});
	testrecord();
			// // Record the coordinates (in data space) of the center (in screen space).
			// var center0 = zoom.center();
			// var translate0 = zoom.translate();
			// var coordinates0 = coordinates(center0);
			// zoom.scale(zoom.scale() * .5);
            //
			// // Translate back to the center.
			// var center1 = point(coordinates0);
			// zoom.translate([translate0[0] + center0[0] - center1[0], translate0[1] + center0[1] - center1[1]]);
            //
			// // egoGraphVis.group.transition().duration(200).call(zoom.event);
			// egoGraphVis.group.call(zoom.event);
			// testrecord();
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
// })(citationvis_data);
}

// main();
//
export { citationVis, egoGraphVis, lineChartByYear };
