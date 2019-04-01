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
