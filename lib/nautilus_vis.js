(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("nautilus_vis", [], factory);
	else if(typeof exports === 'object')
		exports["nautilus_vis"] = factory();
	else
		root["nautilus_vis"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/concat.js":
/*!***********************!*\
  !*** ./src/concat.js ***!
  \***********************/
/*! exports provided: citationVis, egoGraphVis, lineChartByYear */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "citationVis", function() { return citationVis; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "egoGraphVis", function() { return egoGraphVis; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lineChartByYear", function() { return lineChartByYear; });
// http://codereview.stackexchange.com/questions/77614/capitalize-the-first-character-of-all-words-even-when-following-a
String.prototype.capitalize = function () {
  return this.toLowerCase().replace(/\b\w/g, function (m) {
    return m.toUpperCase();
  });
};

var citationVis = citationVis || {};

function makeHtml(year, papers, numDisplay, callback) {
  if (papers[0].hasOwnProperty('citation')) {
    var tooltipHtml = '<h3 style="font-size: 100%">Top papers in this collection in ' + year + ':</h3>';
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
      data: {
        paperid: JSON.stringify(pids)
      },
      success: function (result) {
        console.log(result);
        var db_papers = result['papers'];
        var tooltipHtml = '<h3 style="font-size: 100%">Top papers in this collection in ' + year + ':</h3>';
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
  } // end else

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


$(document).on('initComplete', function () {
  var windowWidth = $(window).width();
  nodeTooltips();
  legendTooltips();
  $('.yearArea, .yearTick').css('pointer-events', 'all').tooltipster({
    theme: 'tooltipster-noir',
    maxWidth: windowWidth * .5,
    animation: null,
    animationduration: 0,
    delay: 0,
    updateAnimation: null,
    content: '<p>Loading...</p>',
    contentAsHTML: true,
    functionInit: function () {
      console.log('tooltipster init');
    },
    functionBefore: function (instance, helper) {
      var $origin = $(helper.origin);
      var year = $origin.data('year');
      var egoPapers = citationVis.egoGraphVis.egoNode.papers;
      var thisYearPapers = egoPapers.filter(function (dd) {
        return dd.Year == year;
      }).sort(function (a, b) {
        return d3.descending(a.EF, b.EF);
      });

      if (thisYearPapers.length === 0) {
        return false;
      }

      var tooltipHtml = makeHtml(year, thisYearPapers, 3, function (html) {
        instance.content(html);
      }); // instance.content(tooltipHtml);
    }
  });
});

function nodeTooltips() {
  // $('.d3-tip').remove();
  $('.node').addClass('tooltipster'); // $('.node').first().addClass('center-node');

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
    functionBefore: function (instance, helper) {
      var tooltipHtml = ajaxPaperInfo(helper.origin, function (html) {
        instance.content(html);
      });
    }
  });

  function ajaxPaperInfo(node, callback) {
    // node is the DOM element for a node
    var html = '';
    d3.select(node).each(function (d) {
      if (d.nodeType === 'paper' && !d.updatedProps) {
        if (typeof d.citation != "undefined" && d.citation.length > 0) {
          html = bypassAjax(d);

          if (callback != null) {
            callback(html);
          }

          return html;
        }

        $.ajax({
          dataType: 'json',
          url: $SCRIPT_ROOT + '/_vis_get_more_paperinfo',
          data: {
            paperid: d.id
          },
          success: function (result) {
            console.log(result);
            d.Title = result['title'];
            d.doi = result['doi'];
            d.citation = result['citation'];
            d.author_str = result['author_str'];
            d.venue = result['venue'];
            d.updatedProps = true; // d.tooltipHtml = '<p>' + d.citation + '</p>';
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

            return html;
          }
        });
      } else if (d.idx == 0) {
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
    return html;
  }

  function makeNodeTooltipHtml(d) {
    var span = $('<span>');
    span.append($('<p class="tooltip title">').text(d.Title));
    span.append($('<p class="tooltip authors">').text(d.author_str));
    span.append($('<p class="tooltip venue">').text(d.venue));
    span.append($('<p class="tooltip year">').text(d.Year)); // span.append( $( '<p class="tooltip domain">' ).text("Category: " + d.DomainName) );

    span.append($('<p class="tooltip domain">').text("Categories: " + d.Field_of_study_names)); // span.append( $( '<p class="tooltip js_div">' ).text("JS Divergence: " + d.js_div) );
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
    functionBefore: function (instance, helper) {
      var legendItem = d3.select(helper.origin);
      legendItem.each(function (d) {
        var html = "<h3>Top terms in category " + d.DomainID + ":</h3>";
        html = html + "<ul>";

        for (var i = 0, len = d.DomainName.length; i < len; i++) {
          html = html + "<li>" + d.DomainName[i] + "</li>";
        }

        html = html + "</ul>";
        instance.content(html);
        return;
      });
    }
  });
} // $( document ).on( "initComplete", function() {
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

citationVis.default_options = function () {
  // Dimensions of the largest part of the visualization (the graph)
  var dimensions = {
    width: 960,
    height: 500
  }; // Dimensions of the line charts:

  dimensions.lineChart = {
    margin: {
      top: 30,
      right: 20,
      bottom: 30,
      left: 50
    }
  };
  dimensions.lineChart.width = dimensions.width * 3 / 4 - dimensions.lineChart.margin.left - dimensions.lineChart.margin.right;
  dimensions.lineChart.height = 110 - dimensions.lineChart.margin.top - dimensions.lineChart.margin.bottom; // Colors:
  // See http://colorbrewer2.org/?type=qualitative&scheme=Set1&n=8

  var colorScheme = ['rgb(228,26,28)', 'rgb(55,126,184)', 'rgb(77,175,74)', 'rgb(152,78,163)', 'rgb(255,127,0)', 'rgb(255,255,51)', 'rgb(166,86,40)', 'rgb(247,129,191)']; // I liked the blue better for the main color, so the next line just moves
  // the blue color (originally self.colorScheme[1]) to the front (self.colorScheme[0])

  colorScheme.splice(0, 0, colorScheme.splice(1, 1)[0]);
  var DEFAULT_OPTIONS = {
    colorScheme: colorScheme,
    dimensions: dimensions
  };
  return {
    defaults: DEFAULT_OPTIONS
  };
}();

var citationVis = citationVis || {};

citationVis.egoGraphData = function (maxNodes) {
  function prepare_egoGraphData(graph) {
    for (i = 0; i < graph.nodes.length; i++) {
      graph.nodes[i].oldIdx = i;
    }

    var newGraph = {}; // Copy properties to newGraph that won't change:

    var propsToCopy = ['graph', 'directed', 'multigraph'];

    for (i = 0; i < propsToCopy.length; i++) {
      var prop = propsToCopy[i];

      if (graph.hasOwnProperty(prop)) {
        newGraph[prop] = graph[prop];
      }
    }

    newGraph.nodes = [];
    newGraph.nodes.push(graph.nodes[0]);
    newGraph.nodes[0].idx = 0; // // this is a test:
    // for (i=10; i<20; i++) {
    // 	var newNode = graph.nodes[i];
    // 	newNode.idx = newGraph.nodes.length;
    // 	newGraph.nodes.push(newNode);
    // }

    var notEgoNodes = []; // Filter out nodes that have year of 0

    for (var i = 1; i < graph.nodes.length; i++) {
      // if ( (graph.nodes[i].EF > 0) && (graph.nodes[i].Year>0) ) {
      if (graph.nodes[i].Year > 0) {
        notEgoNodes.push(graph.nodes[i]);
      }
    } // Start by randomizing the order of all the nodes


    d3.shuffle(notEgoNodes); // order descending by Eigenfactor
    // notEgoNodes.sort(function(a,b) { return b.EF - a.EF; });

    notEgoNodes.sort(function (a, b) {
      return d3.descending(a.EF, b.EF);
    }); // // I don't want to remove any nodes that have a different DomainID than the ego,
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
        if (arr[i].DomainID != 0) {
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

    notEgoNodes = DomainIDToFront(notEgoNodes); // for (var i = notEgoNodes.length-1; i>=0; i--) {
    // 	if ( notEgoNodes[i].DomainID != 0 ) {
    // 		notEgoNodes.splice(0, 0, notEgoNodes.splice(i, 1)[0]);
    // 	}
    // }
    // console.log(c);
    // Take the first n items, where n = maxNodes
    // console.log(maxNodes);

    if (typeof maxNodes == 'undefined') {
      var maxNodes = 274; // TODO: implement this better (so it's not hard coded here)
    } // var maxNodes = 5000;  // TODO: implement this better (so it's not hard coded here)


    if (notEgoNodes.length > maxNodes) {
      // self.allNodes = self.allNodes.slice(0, self.graphParams.maxNodes.value);
      notEgoNodes = notEgoNodes.slice(0, maxNodes);
    } // sort by Year
    // then sort by EF (size) so that larger nodes tend to appear first.
    // (this somewhat reduces the problem of sending out 
    // links to nodes that haven't appeared yet.
    // maybe try a better solution later.)


    notEgoNodes.sort(function (a, b) {
      return d3.ascending(a.Year, b.Year) || d3.descending(a.EF, b.EF);
    }); // Append these to newGraph.nodes

    for (i = 0; i < notEgoNodes.length; i++) {
      var newNode = notEgoNodes[i];
      newNode.idx = newGraph.nodes.length;
      newGraph.nodes.push(newNode);
    }

    newGraph.links = recalculateLinks(newGraph.nodes, graph.links);

    function recalculateLinks(nodes, links) {
      var newLinks = [];

      for (i = 0; i < links.length; i++) {
        var thisSource = nodes.filter(function (d) {
          return d.oldIdx === links[i].source;
        });
        var thisTarget = nodes.filter(function (d) {
          return d.oldIdx === links[i].target;
        });

        if (thisSource.length > 0 && thisTarget.length > 0) {
          if (thisTarget[0].nodeType === 'paper' && thisSource[0].Year < thisTarget[0].Year) {// exclude the link in this case (i.e. if the source year is less than the target year
          } else {
            var newLink = links[i];
            newLink.source = thisSource[0].idx;
            newLink.target = thisTarget[0].idx;
            newLinks.push(links[i]);
          }
        }
      }

      newLinks.forEach(function (d) {
        if (typeof d.target != 'number') console.log(d);
      });
      return newLinks;
    }

    var yearRange = newGraph.graph.yearRange;

    function getNodeCountsPerYear(nodes, yearRange) {
      var yearsNest = d3.nest().key(function (d) {
        return d.Year;
      }).sortKeys(d3.ascending).rollup(function (leaves) {
        return leaves.length;
      }) // .entries(nodes.slice(1));  // all except ego node (node[0])
      .map(nodes.slice(1));
      var nodeCountsPerYear = {};

      for (var i = yearRange[0]; i <= yearRange[1]; i++) {
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
}();

var citationVis = citationVis || {};

citationVis.eventListeners = function () {
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
  return {// tooltipListener: tooltipListener
  };
}();

var citationVis = citationVis || {};

citationVis.lineChartData = function () {
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
    links.forEach(function (d) {
      if (typeof d.linkToEgo != 'undefined' && d.linkToEgo === true) {
        var sourceYear = +d.sourceYear;
        var targetYear = +d.targetYear;

        if (sourceYear > 0 && targetYear > 0 && sourceYear >= targetYear) {
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
    var minYear = d3.min(cleanedLinks, function (d) {
      return d.targetYear > 0 ? d.targetYear : null;
    }); // Get current year (using today's date):

    var todayYear = new Date().getFullYear();
    var maxYear = d3.max(cleanedLinks, function (d) {
      return d.sourceYear <= todayYear ? d.sourceYear : null;
    }); // cutoff at 2015

    maxYear = Math.min(maxYear, 2015);
    return [minYear, maxYear];
  }

  function getEmptyCountData(yearRange) {
    var emptyCountData = [];

    for (var i = yearRange[0]; i <= yearRange[1]; i++) {
      emptyCountData.push({
        year: i,
        count: 0
      });
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
    cleanedLinks = cleanedLinks.filter(function (d) {
      return d.sourceYear <= yearRange[1] && d.targetYear <= yearRange[1];
    }); // for (var i=yearRange[0]; i<=yearRange[1]; i++) {
    // 	// data[i] = 0;
    // 	data.push({year: i, count: 0});
    // }
    // cleanedLinks.forEach(function(d) {
    // 	data[d.sourceYear]++;
    // });

    data.values = getEmptyCountData(yearRange);
    cleanedLinks.forEach(function (d) {
      var thisSourceYear = d.sourceYear;
      var dataThisYear = data.values.filter(function (dd) {
        return dd.year === thisSourceYear;
      })[0];
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
    egoPapers = egoPapers.filter(function (d) {
      return d.Year >= yearRange[0] && d.Year <= yearRange[1];
    });
    egoPapers.forEach(function (d) {
      var dataThisYear = data.values.filter(function (dd) {
        return dd.year == d.Year;
      })[0];
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
    egoPapers = egoPapers.filter(function (d) {
      return d.Year >= yearRange[0] && d.Year <= yearRange[1];
    });
    egoPapers.forEach(function (d) {
      var dataThisYear = data.values.filter(function (dd) {
        return dd.year == d.Year;
      })[0];
      dataThisYear.count = dataThisYear.count + d.EF;
    });
    return data;
  }

  return {
    prepareData_allCitations: prepareData_allCitations,
    prepareData_egoAuthorPublications: prepareData_egoAuthorPublications,
    prepareData_authorEigenfactorSum: prepareData_authorEigenfactorSum
  };
}(); // https://css-tricks.com/snippets/javascript/get-url-variables/


function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");

  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");

    if (pair[0] == variable) {
      return pair[1];
    }
  }

  return false;
}

var citationVis = citationVis || {};

citationVis.getTransitionTimePerYear = function (graph, longestYearTransitionTime) {
  console.log(graph); // This will let us vary the transition time per year

  var transitionTimePerYear = {};
  var emptyYearTransitionTime = 300; // var longestYearTransitionTime = 4000;
  // Set default value:
  // http://stackoverflow.com/questions/894860/set-a-default-parameter-value-for-a-javascript-function

  var longestYearTransitionTime = typeof longestYearTransitionTime !== 'undefined' ? longestYearTransitionTime : 4000; // This scale takes the number of nodes for a given year as input
  // and outputs the transition time, based on a threshold mapping

  var thresholdScale = d3.scale.threshold().domain([1, 3, 10, 20, 30]).range([emptyYearTransitionTime, // zero nodes
  longestYearTransitionTime * .2, // one or two nodes
  longestYearTransitionTime * .5, // 3 to 9
  longestYearTransitionTime * .7, // 10 to 19
  longestYearTransitionTime * .85, // 20 to 29
  longestYearTransitionTime // 30+
  ]);
  var yearRange = graph.graph.yearRange; // Put the transition time for each year into an object

  for (var i = yearRange[0]; i <= yearRange[1]; i++) {
    // transitionTimePerYear[i] = 1000;
    transitionTimePerYear[i] = thresholdScale(graph.graph.nodeCountsPerYear[i]);
  }

  return transitionTimePerYear;
};

citationVis.yearTickClickEventListener = function () {
  // Add click listeners to line chart axis tick labels (years).
  // On click, a new destination node will be set.
  d3.selectAll('.yearTick').on('click', function (d) {
    // Get the year (as integer)
    var destinationYear = this.getAttribute('data-year'); // Stop all transitions on nodes and links

    d3.selectAll('.node, .link').transition().duration(0);
    citationVis.egoGraphVis.newDestinationNode(destinationYear);
  });
};

var citationVis = citationVis || {};

citationVis.summaryStatistics = function () {
  function addSummaryStatistics(graph) {
    function cleanLinks(links) {
      var cleanedLinks = [];
      links.forEach(function (d) {
        if (typeof d.linkToEgo != 'undefined' && d.linkToEgo === true) {
          var sourceYear = +d.sourceYear;
          var targetYear = +d.targetYear;

          if (sourceYear > 0 && targetYear > 0 && sourceYear >= targetYear) {
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
      var minYear = d3.min(cleanedLinks, function (d) {
        return d.targetYear > 0 ? d.targetYear : null;
      }); // Get current year (using today's date):

      var todayYear = new Date().getFullYear();
      var maxYear = d3.max(cleanedLinks, function (d) {
        return d.sourceYear <= todayYear ? d.sourceYear : null;
      });
      return [minYear, maxYear];
    }

    function getEmptyCountData(yearRange) {
      var emptyCountData = [];

      for (var i = yearRange[0]; i <= yearRange[1]; i++) {
        emptyCountData.push({
          year: i,
          count: 0
        });
      }

      return emptyCountData;
    }

    function getCitationCountsPerYear(graph) {
      var citationCountsPerYear = getEmptyCountData(graph.graph.yearRange);
      var cleanedLinks = cleanLinks(graph.links);
      cleanedLinks.forEach(function (d, i) {
        var thisSourceYear = d.sourceYear;
        var dataThisYear = citationCountsPerYear.filter(function (dd) {
          return dd.year === thisSourceYear;
        })[0];
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
}(); // This will add the ability to change the type of domain (e.g. from category to venue) that the nodes are colored by
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
$(document).on("initComplete", function () {
  var egoGraphVis = citationVis.egoGraphVis;
  var domainsMult = egoGraphVis.data.graph.DomainsMult;

  if (!domainsMult || !getParameterByName('domainsMult')) {
    // in this case, exit without doing anything
    return;
  }

  var $domainDropdown = $('<div>');
  $domainDropdown.append($('<label>').text('Color by: ').css('display', 'inline'));
  var domain_select = $domainDropdown.append($('<select>').attr('id', 'domain_select'));
  $('#mainDiv').prepend($domainDropdown);
  $.each(domainsMult, function (k, v) {
    $('#domain_select').append($('<option>').text(k));
    d3.select("#mainDiv").append("p").text(k).on("click", function () {
      switchDomain(k);
    });
  });
  $('#domain_select').val("category_from_keyword");
  $('#domain_select').on('change', function () {
    switchDomain($(this).val());
  });

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
    d3.selectAll(".node").each(function (d) {
      d.DomainName = egoGraphVis.data.graph.Domains[d.DomainID];

      for (var i = 0; i < egoGraphVis.domainsThisGraph.length; i++) {
        var thisDomain = egoGraphVis.domainsThisGraph[i].key;

        if (thisDomain == d.DomainID) {
          // var thisColor = self.colorScheme[i];
          var thisColor = egoGraphVis.domainsThisGraph[i].color;
          d.color = thisColor;
        }
      }
    }).transition().duration(dur).attr('fill', 'white').each('end', function () {
      d3.select(this).transition().duration(dur).attr('fill', function (d) {
        // color the nodes based on DomainID
        return d.color;
      });
    });
    d3.transition().duration(dur * 2).each('end', function () {
      egoGraphVis.revealFinalState();
    });
  }
}); // http://codereview.stackexchange.com/questions/77614/capitalize-the-first-character-of-all-words-even-when-following-a

String.prototype.capitalize = function () {
  return this.toLowerCase().replace(/\b\w/g, function (m) {
    return m.toUpperCase();
  });
};

function egoGraphVis(data) {
  var self = this;
  self.data = data;
  self.notEgoNodes = self.data.nodes.slice(1);
  console.log(self.data); // Defaults
  // Graph SVG Dimensions
  // self.graphDimensions = {
  //     width: 960,
  //     height: 500
  // };

  self.graphDimensions; // imported in self.importDefaultOptions below

  self.colorScheme; // Node placement options:
  // "force1": nodes placed by running the force layout and then freezing
  // "spiral" places the nodes in a spiral formation with the ego node at the center
  // "spiral2": alternate spiral algorithm
  // ADD MORE

  self.nodePlacementOptions = ["force1", "spiral", "spiral2"];
  self.nodePlacement = self.nodePlacementOptions[1];
  self.zoomable = false;
  self.svg;
  self.group;
  self.node;
  self.link;
  self.egoNode;
  self.eigenFactorScale; // self.loadingText;

  self.domainsThisGraph;
  self.legend;
  self.yearTextDisplay;
  self.authorImageDiv;
  self.tooltip;
  self.tip;
  self.tick;
  self.force; // See http://colorbrewer2.org/?type=qualitative&scheme=Set1&n=8
  // self.colorScheme = ['rgb(228,26,28)','rgb(55,126,184)','rgb(77,175,74)',
  // 	'rgb(152,78,163)','rgb(255,127,0)','rgb(255,255,51)',
  // 	'rgb(166,86,40)','rgb(247,129,191)']
  // // I liked the blue better for the main color, so the next line just moves
  // // the blue color (originally self.colorScheme[1]) to the front (self.colorScheme[0])
  // self.colorScheme.splice(0, 0, self.colorScheme.splice(1, 1)[0])

  self.colorScheme; // imported in importDefaultOptions below
  // Opacity values

  self.opacityVals = {
    node: 1,
    nodePrevYear: .6,
    linkToEgo: .12,
    linkNotToEgo: .12,
    linkPrevYear: .04
  };
  self.doAnnotations = false;
  self.animationState; // "forward", "rewind", "stopped"

  self.transitionTimePerYear; // imported in importDefaultOptions below
  // self.transitionTimePerNode = 100;  // TEST

  self.transitionTimePerNode; // calculated in calculateTransitionTime()
  // self.nodeAppearDuration = self.transitionTimePerNode * 4;
  // I haven't actually gotten it to work having different transitionTimePerNode and nodeAppearDuration

  self.linkAppearDuration = 500;
  self.currNodeIndex; // Index of node currently being annotated

  self.destinationNodeIndex; // Index of node to which the animation is currently moving

  self.destinationYear;
  self.currYear; // self.destinationNodeIndex = 200;  // TEST

  self.destinationNodeIndex = self.data.nodes.length - 1; // TEST
  //testing

  self.c = 0;
  self.tt = 0; // self.init();

  return self;
}

egoGraphVis.prototype.init = function () {
  var self = this;
  self.tick = self.makeTick();
  self.force = self.makeForce();

  if (self.zoomable === true) {
    self.zoom = self.makeZoom();
  } // self.drag = self.makeDrag();


  self.animationState = 'init';
  self.getDomainsThisGraph();
  self.svg = d3.select('#graphDiv').append('svg').attr('id', 'graphSvg').attr('width', self.graphDimensions.width).attr('height', self.graphDimensions.height); // self.tip = d3.tip()
  // 	.attr('class', 'd3-tip')
  // 	.style('cursor', 'default')
  // 	.style('border-style', 'solid')
  // 	// .style('border-color', function(d) { return d.color; })
  // 	.style('pointer-events', 'none');
  // // self.svg.call(self.tip);

  self.group = self.svg.append('g').attr('class', 'graphContainer');
  self.link = self.group.append('svg:g').attr('class', 'links').selectAll('.link');
  self.node = self.group.append('svg:g').attr('class', 'nodes').selectAll('.node'); // Initialize tooltip for nodes (which will be visible on mouseover of nodes)

  self.tooltip = d3.select('body').append('div').attr('class', 'nodeTooltip').style('position', 'absolute').style('width', self.graphDimensions.width / 4 + 'px').style('z-index', '10').style('visibility', 'hidden'); // Add special properties to the ego node:

  self.data.nodes[0].fixed = true; // position in center

  self.data.nodes[0].x = self.graphDimensions.width / 2;
  self.data.nodes[0].y = self.graphDimensions.height / 2;
  self.data.nodes[0].color = self.colorScheme[0];
  self.egoNode = self.data.nodes[0]; // Set up a scale for Eigenfactor in order to encode size of nodes by Eigenfactor (influence)

  var eigenFactorMax = d3.max(self.data.nodes, function (d) {
    return d.EF;
  });
  self.eigenFactorScale = d3.scale.linear().domain([0, eigenFactorMax]).range([0, 1]);
  self.data.nodes.forEach(function (d) {
    if (d.nodeType === 'paper') {
      d.radius = 4.5 + self.eigenFactorScale(d.EF) * 10;
    } else {
      d.radius = 10;
    }
  }); // add graph properties

  self.force.nodes(self.data.nodes); // update node elements

  self.node = self.node.data(self.data.nodes); //self.node.exit().remove();

  var newNode = self.node.enter();
  newNode = newNode.append('svg:circle') //test
  .attr('class', 'node') // add class for the center node
  .classed('centerNode', function (d) {
    return d.id === self.egoNode.id;
  }).attr('r', function (d) {
    return d.radius;
  }) // .attr('class', 'node hidden')
  // "T" attribute will keep track of the transition time elapsed
  .attr('T', 0) // Start with the node invisible
  .attr('r', 1e-9).each(function (d) {
    d.DomainName = self.data.graph.Domains[d.DomainID];

    for (var i = 0; i < self.domainsThisGraph.length; i++) {
      var thisDomain = self.domainsThisGraph[i].key;

      if (thisDomain == d.DomainID) {
        // var thisColor = self.colorScheme[i];
        var thisColor = self.domainsThisGraph[i].color;
        d.color = thisColor;
      }
    }
  }) // Color by different categories of how similar the node's cluster is to the ego node
  .attr('fill', function (d) {
    // color the nodes based on DomainID
    return d.color;
  }).style('opacity', self.opacityVals.node);
  newNode.call(self.force.drag); // self.egoNode = self.node.filter(function(d) { return d.idx === 0; });
  // update link elements

  self.force.links(self.data.links);
  self.link = self.link.data(self.data.links); //self.link.exit().remove();

  var newLink = self.link.enter().append('svg:line').attr('class', function (d) {
    // if (d.target === 0) { return 'link toEgo linkToEgo'; }
    // else { return 'link notToEgo linkNotToEgo'; }
    if (d.target === 0) {
      return 'link hidden toEgo linkToEgo';
    } else {
      return 'link hidden notToEgo linkNotToEgo';
    }
  }) // "T" attribute will keep track of the transition time elapsed
  .attr('T', 0) // Links to the ego node are darker than links between the others
  .style('opacity', function (d) {
    var opVals = self.opacityVals;

    if (d.linkToEgo) {
      return opVals.linkToEgo;
    } else {
      return opVals.linkNotToEgo;
    } // return .5;
    // if (d.target === 0) { return self.graphParams.opacityVals.value.linkToEgo; }
    // else { return self.graphParams.opacityVals.value.linkNotToEgo; }

  });

  function placeNodes() {
    // This function will determine the final spatial placement of all of the nodes.
    switch (self.nodePlacement) {
      case self.nodePlacementOptions[0]:
        // Place the nodes using the force layout.
        // Uses the force layout parameters in self.makeForce
        self.force.start(); // Execute force a bit, then stop

        for (var i = 0; i < 100000; ++i) self.force.tick();

        self.force.stop();
        newNode.each(function (d) {
          d.fixed = true;
        });
        break;

      case self.nodePlacementOptions[1]:
        // Place the nodes in spiral formation.
        var cx = self.egoNode.x,
            cy = self.egoNode.y,
            // initialRad = 60;
        initialRad = 20;
        var numNodes = self.data.nodes.length; // console.log(numNodes);

        newNode.each(function (d, i) {
          if (d.idx != 0) {
            d.fixed = true; // var thisRad = i * 2 + initialRad;
            // var thisSpacing = i * (Math.PI/(8.5+.1*i));

            var thisRad = Math.pow(i, 1) * .95 + initialRad;
            var thisSpacing = i * (Math.PI / (8.5 + .05 * i));
            d.x = cx + thisRad * Math.cos(thisSpacing);
            d.y = cy + thisRad * Math.sin(thisSpacing); // var angle = 0.1 * i;
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
            angleRad = angleRad - d / da;
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

            if (i > 10) {
              pointArcDistance = 10;
            }

            if (i > 50) {
              pointArcDistance = 15;
            }
          }

          return angles;
        }

        var numNodes = self.data.nodes.length;
        var angles = getAngles(numNodes, 7); // console.log(angles);

        var cx = self.egoNode.x,
            cy = self.egoNode.y,
            // initialRad = 60;
        initialRad = 20;
        var numNodes = self.data.nodes.length;
        console.log(numNodes);
        newNode.each(function (d, i) {
          if (d.idx != 0) {
            d.fixed = true;
            var thisRad = i * 2 + initialRad;
            var thisSpacing = i * (Math.PI / (8.5 + .1 * i)); // var thisRad = Math.pow(i, 1) * .95 + initialRad;
            // var thisSpacing = i * (Math.PI/(8.5+.05*i));
            // d.x = cx + (thisRad * Math.cos(thisSpacing));
            // d.y = cy + (thisRad * Math.sin(thisSpacing));
            // var angle = 0.1 * i;
            // d.x = cx + thisRad * Math.cos(angle);
            // d.y = cy + thisRad * Math.sin(angle);

            var powScale = d3.scale.pow().exponent(.7).domain([1, numNodes]).range([0, 60]);
            var powScale = d3.scale.linear().domain([1, Math.pow(numNodes, .3)]).range([0, 60]);
            var powScale = d3.scale.log().domain([100, numNodes + 100]).range([0, 60]); // var thisPos = Math.pow(i+1, .7) * 1;
            // console.log(thisPos);

            var newi = Math.pow(i + 1, .3);
            var newi = i + 100;
            var thisPos = powScale(newi); // console.log(thisPos)

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
  self.yearTextDisplay = self.svg.append('svg:text').attr('x', self.graphDimensions.width * 8 / 9).attr('y', self.graphDimensions.height * 12 / 13).attr('dy', '-.3em').attr('font-size', '10em').attr('text-anchor', 'end').style('pointer-events', 'none').style('opacity', 1e-9).text(self.data.graph.yearRange[0]);
  self.revealEgoNode();
};

egoGraphVis.prototype.makeZoom = function () {
  var self = this;
  return d3.behavior.zoom().center([self.graphDimensions.width / 2, self.graphDimensions.height / 2]).scaleExtent([0.2, 10]).on('zoom', function () {
    self.group.attr('transform', 'translate(' + d3.event.translate + ')' + 'scale(' + d3.event.scale + ')');
  });
};

egoGraphVis.prototype.makeTick = function () {
  var self = this; // cache function creation for tiny optimization

  function x1(d) {
    return d.source.x;
  }

  function y1(d) {
    return d.source.y;
  }

  function x2(d) {
    return d.target.x;
  }

  function y2(d) {
    return d.target.y;
  } // function transform(d) {
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
    self.link.attr('x1', x1).attr('y1', y1).attr('x2', x2).attr('y2', y2);
    self.node.attr('transform', transform);
  };
};

egoGraphVis.prototype.makeForce = function () {
  var self = this;
  return d3.layout.force().size([self.graphDimensions.width, self.graphDimensions.height]).linkDistance(225) //.linkDistance(function(d) { console.log(self.ldScl(d.source.Year)); return self.ldScl(d.source.Year) ? 75 + self.ldScl(d.source.Year) : 0;})
  //.linkStrength(function(d) { return self.lsScl(d.source.Year) ? self.lsScl(d.source.Year) : 0;})
  // .charge(-15)
  // .gravity(0.03)
  // .friction(0.8)
  // .theta(0.9)
  // .alpha(0.1)
  .on('tick', this.tick);
};

egoGraphVis.prototype.importDefaultOptions = function (options) {
  var self = this;
  self.colorScheme = options.colorScheme;
  self.graphDimensions = options.dimensions;
  self.transitionTimePerYear = options.transitionTimePerYear;
  console.log(options);
};

egoGraphVis.prototype.getDomainsThisGraph = function () {
  var self = this;
  var domains = self.data.graph.Domains;
  console.log(domains);
  var maxDomains = self.colorScheme.length; // self.domainsThisGraph will be an array of {key: "DomainID", values: count}

  self.domainsThisGraph = d3.nest().key(function (d) {
    return d.DomainID;
  }).rollup(function (leaves) {
    return leaves.length;
  }).entries(self.notEgoNodes);
  self.domainsThisGraph.sort(function (a, b) {
    return d3.descending(a.values, b.values);
  }); // Add a few more variables to the domainsThisGraph data:

  for (var i = 0; i < self.domainsThisGraph.length; i++) {
    // var key = +self.domainsThisGraph[i].key;
    var key = self.domainsThisGraph[i].key;
    self.domainsThisGraph[i].DomainID = key;

    if (i < maxDomains - 1) {
      self.domainsThisGraph[i].DomainName = domains[key];
      self.domainsThisGraph[i].color = self.colorScheme[i];
    } else {
      self.domainsThisGraph[i].DomainName = "Other";
      self.domainsThisGraph[i].color = self.colorScheme[maxDomains - 1];
    }
  }

  console.log(self.domainsThisGraph);
};

egoGraphVis.prototype.legendInit = function () {
  var self = this;
  var squareSize = self.graphDimensions.width / 70;
  var padding = squareSize / 3;
  var sqrPlusPadding = squareSize + padding;
  self.legend = self.svg.append('g').attr('class', 'legend').attr('transform', 'translate(' + padding + ',' + padding + ')'); // .style('opacity', 1e-9);

  console.log(self.domainsThisGraph);
  var legendItem = self.legend.selectAll('g').data(self.domainsThisGraph).enter().append('g').attr('class', 'legendItem') // add "other" class to last legend item
  .classed('other', function (d) {
    return d.DomainID != 0 && d.DomainName.toLowerCase() == "other" ? true : false;
  }).attr('id', function (d) {
    // return 'legendCluster' + d.cluster; })
    // Use Domain instead of cluster
    return 'legendDomain' + d.DomainID.replace(" ", "");
  }).on("mouseover", function (d) {
    d3.selectAll(".node").filter(function (dd) {
      return d.color == dd.color;
    }).classed("legendHover", true);
  }).on("mouseout", function (d) {
    d3.selectAll(".node").classed("legendHover", false);
  }).attr("display", function (d, i) {
    // hide all "other" domain objects except the first one
    if (i < self.colorScheme.length) {
      return "";
    } else {
      return "none";
    }
  }); // // start off hidden if not the same domain as the ego node
  // .style('opacity', function(d) {
  //     // var thisTopCluster = d.cluster.split(':')[0];
  //     // if (thisTopCluster === egoNodeTopCluster) return 1; else return 0;
  //     if (d.DomainID===self.egoNode.DomainID) return 1; else return 0;
  // });
  // // Don't hide the legend if annotations are turned off
  // // maybe try a different approach later
  // if ( !self.graphParams.doAnnotations.value ) legendItem.style('opacity', 1);

  legendItem.append('svg:rect').attr('width', squareSize).attr('height', squareSize).attr('transform', function (d, i) {
    return 'translate(0,' + sqrPlusPadding * i + ')';
  }).attr('fill', function (d) {
    return d.color;
  });
  legendItem.append('svg:text').attr('transform', function (d, i) {
    return 'translate(' + sqrPlusPadding + ',' + sqrPlusPadding * i + ')';
  }).attr('dy', '1em').text(function (d) {
    // return 'Papers in category "' + d.DomainName + '" (domain ' + d.DomainID + ')';
    if (d.DomainID != 0 && d.DomainName.toLowerCase() == "other") {
      return "Papers in other categories";
    } else {
      return 'Papers in category "' + d.DomainName + '"';
    }
  }).style('font-size', '.9em');
};

egoGraphVis.prototype.addAuthorImage = function () {
  var self = this;

  if (self.egoNode.hasOwnProperty('name')) {
    self.egoNode.AuthorName = self.egoNode.name;
  }

  if (self.egoNode.hasOwnProperty('AuthorName')) {
    self.authorImageDiv = self.svg.append('foreignObject').attr('class', 'externalObject').attr('x', 0).attr('y', self.graphDimensions.height / 2 - 50) // .attr('height', self.graphDimensions.height/5)
    .attr('height', '100%').attr('width', self.graphDimensions.height / 5).append('xhtml:div').attr('id', 'authorImageDiv');
    self.authorImageDiv.append('xhtml:p').html('<p>' + self.data.nodes[0].AuthorName.capitalize() + '</p>');
    var authorImageContainer = self.authorImageDiv.append('xhtml').attr('id', 'authorImageContainer'); // Add content for HRA authors

    var authorOrg = self.data.nodes[0].organization;
    console.log(authorOrg);

    if (typeof authorOrg != 'undefined') {
      d3.tsv("static/healthra/orgs_with_links.tsv", function (error, org_data) {
        if (error) throw error;
        var pstyle = 'style="margin: 0; padding: 0; font-size: .85em"';
        console.log(org_data);

        for (var i = 0, len = org_data.length; i < len; i++) {
          if (org_data[i]['org_name'] == authorOrg) {
            var nameFromTSV = org_data[i]['match_name'];

            if (typeof nameFromTSV != 'undefined' && nameFromTSV != '') {
              var orgLink = org_data[i]['link'];
              var orgImgUrl = org_data[i]['img_url'];
              self.authorImageDiv.append('xhtml:p').html('<a href="' + orgLink + '" target="_blank"><p ' + pstyle + '>' + nameFromTSV + '</p>');
              var authorImage = addImage(orgImgUrl);
              authorImage.style('cursor', 'pointer');
              authorImage.on('click', function () {
                console.log(orgLink);
                window.open(orgLink, '_blank');
              });
            } else {
              self.authorImageDiv.append('xhtml:p').html('<p style="margin: 0; padding: 0; font-size: .85em">' + authorOrg + '</p>');
            }
          }
        }
      });
    }
  }

  function addImage(authorImageSrc) {
    var authorImage = authorImageContainer.append('xhtml:img').attr('src', authorImageSrc).attr('id', 'authorImage').attr('width', '85px');
    return authorImage;
  } // If an image URL is included in the data:


  var AuthorImgUrl = self.data.nodes[0].AuthorImgUrl || self.data.nodes[0].ImgURL;
  console.log(AuthorImgUrl);

  if (typeof AuthorImgUrl != 'undefined') {
    addImage(AuthorImgUrl);
    return;
  } // Pew method of getting author image:
  // Try some filename extensions and attempt to insert the image


  var pewid_str = self.data.nodes[0].PewScholarID;

  if (typeof pewid_str === 'undefined') {
    return;
  }

  var pewid_str = pewid_str.toString(); // zero-pad the pew id

  pewid_str = '000' + pewid_str;
  pewid_str = pewid_str.substr(pewid_str.length - 3);
  var fname_root = "static/img/pew_photos/" + pewid_str;
  var possibleExtensions = ['.png', '.jpg', '.jpeg', '.JPG', '.JPEG', '.PNG']; // recursive function that loops through the different possible file extensions above

  function tryImageFilenames(fname_root, possibleExtensions, iter) {
    var authorImageFilename = fname_root + possibleExtensions[iter];

    if (iter >= possibleExtensions.length) {
      return false;
    }

    $.get(authorImageFilename).done(function () {
      addImage(authorImageFilename);
    }).fail(function () {
      // recurse
      var c = iter + 1;
      tryImageFilenames(fname_root, possibleExtensions, c);
    });
  }

  tryImageFilenames(fname_root, possibleExtensions, 0);
  var pewClass = self.data.nodes[0].pew_Class;

  if (typeof pewClass != 'undefined') {
    self.authorImageDiv.append('xhtml:p').html('<p style="margin: 0; padding: 0; font-size: .85em">Pew Scholar ' + pewClass + '</p>');
  }
};

egoGraphVis.prototype.addEventListeners = function () {
  // Only add event listeners here that don't act across different vis objects
  // Otherwise they need to be added to (e.g.) citationVis_Main.js
  var self = this;

  if (self.zoomable === true) {
    self.group.call(self.zoom);
  } // Add event listener to nodes for tooltip:


  d3.selectAll('.node').each(function (d) {
    d.updatedProps = false;
    d.tooltipHtml = '<p>Loading...</p>';
  }); // self.tip.html(function(d) { return d.tooltipHtml; });

  d3.selectAll('.node').on('mouseover', function (d) {
    d.hovered = true;
    var hoveredItem = d3.select(this); // self.tooltip = self.tooltip
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
  }).on('mousemove', function (d) {// self.tip.show(d);
    // self.tooltip = self.tooltip
    // 	.html(d.tooltipHtml)
    //     .style('visibility', 'visible')
    //     .style('top', (d3.event.pageY-10)+'px')
    //     .style('left', (d3.event.pageX+10)+'px');
  }).on('mouseout', function (d) {
    d.hovered = false; // self.tip.hide(d);

    self.tooltip = self.tooltip.style('visibility', 'hidden');
  }).on('click', function (d) {
    // var doi = getDOI(d.PaperID, this);
    if (d.nodeType === 'paper') {
      if (d.hasOwnProperty('doi') && d.doi !== '') {
        var url = 'https://doi.org/' + d.doi;
      } else {
        var url = 'https://academic.microsoft.com/#/detail/' + d.id;
      }

      window.open(url, '_blank');
    }
  });

  function getDOI(paperid, nodeObj) {
    var thisNode = d3.select(nodeObj);
    $.ajax({
      dataType: 'json',
      url: $SCRIPT_ROOT + '/_vis_get_doi',
      data: {
        paperid: paperid
      },
      success: function (result) {
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
      data: {
        paperid: paperid
      },
      success: function (result) {
        console.log(result['citation']);
        thisNode.attr('title', result['citation']);
      }
    });
  }
};

egoGraphVis.prototype.makeTooltip = function (d, callback) {
  var self = this; // Account for author node:

  if (d.nodeType === 'author' || d.nodeType === '' || d.nodeType === 'venue') {
    var tooltipHtml = '<p class="authorName">Author: ' + d.AuthorName + '</p>';

    if (d.pew_Class) {
      tooltipHtml = tooltipHtml + '<p class="pewClass">Pew Class: ' + d.pew_Class + '</p>';
    }

    var numberOfPubs = d.papers.length;
    tooltipHtml = tooltipHtml + '<p class="numberOfPubs">Number of Publications: ' + numberOfPubs + '</p>'; // return tooltipHtml;

    callback(tooltipHtml);
  } // Otherwise: make a tooltip for a paper node


  function getAuthorList(authors) {
    var authorList = [];
    authors.forEach(function (a) {
      var thisAuthorStrList = a[1].split(' '); // thisAuthorStrList = thisAuthorStrList.map(function(x) { return x.charAt(0).toUpperCase() + x.slice(1).toLowerCase(); });
      // thisAuthorStrList = thisAuthorStrList.map(function(x) { if (x === x.toUpperCase()) return x.capitalize(); else return x;});

      thisAuthorStrList = thisAuthorStrList.map(function (x) {
        if (x != x.toUpperCase()) return x.capitalize();else return x;
      }); // var thisAuthor = a.Name.charAt(0).toUpperCase() + a.Name.slice(1).toLowerCase();

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
      data: {
        paperid: paperid
      },
      success: function (result) {
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
    d.authorList.forEach(function (a) {
      authorStrList.push(a);
    });
    var authorList = authorStrList.join(', ');
    tooltipHtml = tooltipHtml + '<p class="paperAuthor">Authors: ' + authorList + '</p>';
    return tooltipHtml;
  }

  if (d.hasOwnProperty('authors')) {
    var authorList = getAuthorList(d.authors);
    d.authorList = authorList;

    if (d.hasOwnProperty('Title')) {
      var tooltipHtml = makeHtml();
      callback(tooltipHtml);
    } else {
      getTitle(d.id, function (title) {
        d.Title = title;
        var tooltipHtml = makeHtml();
        callback(tooltipHtml);
      });
    }
  } else {
    $.ajax({
      dataType: 'json',
      url: $SCRIPT_ROOT + '/_vis_get_authorinfo',
      data: {
        authorids: JSON.stringify(d.AuthorIDList)
      },
      success: function (result) {
        d.authors = result['authors'];
        var authorList = getAuthorList(d.authors);
        d.authorList = authorList;

        if (d.hasOwnProperty('Title')) {
          var tooltipHtml = makeHtml();
          callback(tooltipHtml);
        } else {
          getTitle(d.id, function (title) {
            d.Title = title;
            var tooltipHtml = makeHtml();
            callback(tooltipHtml);
          });
        }
      }
    });
  }
};

egoGraphVis.prototype.revealEgoNode = function () {
  var self = this;
  self.currNodeIndex = 0; // Index of current node (ego node)

  self.currYear = self.data.graph.yearRange[0]; // Reveal ego node

  d3.selectAll('.node').filter(function (d) {
    return d.id === self.egoNode.id;
  }).classed('hidden', false).classed('visible', true).transition() // .delay(self.graphParams.transitionTimePerYear.value/4)
  .duration(2000).attr('r', function (d) {
    //return 4.5 + (self.eigenFactorScale(d.EF) * 10);
    return d.radius;
  }).attr('T', 1).each('start', function () {
    self.yearTextDisplay.transition().delay(1000).duration(1000).style('opacity', .15);
  }).each('end', function () {
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
      type: "yearChange"
    });
    self.animateToDestinationNode();
  });
};

egoGraphVis.prototype.animateToDestinationNode = function () {
  var self = this; // Check if we're moving forward or backward
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
    self.checkYear(); // self.drawNode();
  } else if (self.currNodeIndex > self.destinationNodeIndex) {
    self.animationState = 'rewind';
    self.currNodeIndex--;
    self.checkYear(); // self.removeNode();
  }
};

egoGraphVis.prototype.continue = function () {
  var self = this; // if (self.currNodeIndex === self.destinationNodeIndex) {
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

egoGraphVis.prototype.checkYear = function () {
  var self = this; // if we are on the last node, just max out the year.

  if (self.currNodeIndex == self.data.nodes.length - 1) {
    self.currYear = self.data.graph.yearRange[1]; // cutoff at 2015

    self.currYear = Math.min(self.currYear, 2015);
    self.yearTextDisplay.text(self.currYear); // jQuery custom event, so that Main.js can listen for it and advance the year on the line charts

    $.event.trigger({
      type: "yearChange"
    });
    self.continue();
    return;
  }

  var currNode = self.data.nodes.filter(function (d) {
    return d.idx === self.currNodeIndex;
  });
  var oldYear = self.currYear;
  var newYear = currNode[0].Year; // if the year is the same as it was, do nothing

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
    self.c = 0;
    self.tt = 0;
    self.currYear++;
    self.beginNewYear();
  } else if (newYear < oldYear) {
    self.currYear--;
    self.beginNewYear();
  } // self.currYear = currNode[0].Year;
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

egoGraphVis.prototype.beginNewYear = function () {
  var self = this;
  self.yearTextDisplay.text(self.currYear); // jQuery custom event, so that Main.js can listen for it and advance the year on the line charts

  $.event.trigger({
    type: "yearChange"
  });
  self.calculateTransitionTime();
  var nodesThisYear = self.notEgoNodes.filter(function (d) {
    return d.Year == self.currYear;
  }); // If this year has no nodes, delay, then continue

  if (nodesThisYear.length === 0) {
    setTimeout(function () {
      self.checkYear();
    }, self.transitionTimePerYear[self.currYear]);
  } else {
    self.continue();
  }
};

egoGraphVis.prototype.drawNode = function () {
  var self = this; // self.animationState = 'forward';
  // self.fadeNodesAndLinksPrevYear();

  var currNode = d3.selectAll('.node').filter(function (d) {
    return d.idx === self.currNodeIndex;
  });

  function drawLinks(nodeObj) {
    // This function will draw the link out from the source to the target.
    // We'll call it after each node appears.
    nodeObj.linksThisNodeIsSource = d3.selectAll('.link').filter(function (l) {
      return l.source === nodeObj;
    });
    nodeObj.linksThisNodeIsSource.classed('hidden', false).classed('visible', true).each(function (d) {
      d.inTransition = true;
    }).attr('x2', function (d) {
      return d.source.x;
    }).attr('y2', function (d) {
      return d.source.y;
    }).style('visibility', 'visible').transition().ease('linear').delay(0).duration(self.linkAppearDuration).attr('x2', function (d) {
      return d.target.x;
    }).attr('y2', function (d) {
      return d.target.y;
    }) // .attr('x2', 0)
    // .attr('y2', 0)
    .attr('T', 1).each('end', function (d) {
      d.inTransition = false;
    });
  } // Make the nodes appear:
  // var t0 = performance.now();


  currNode.classed('hidden', false).classed('visible', true).transition().ease('linear') //.delay(function(d, i) { return (i-currIndex) * timePerNode; })
  // .delay(function(d, i) { return i * self.transitionTimePerNode; })
  .duration(self.transitionTimePerNode).attr('r', function (d) {
    //return 4.5 + (self.eigenFactorScale(d.EF) * 10);
    return d.radius;
  }).attr('T', 1).each('end', function (d) {
    // var t1 = performance.now();
    // self.tt = self.tt + (t1-t0);
    self.c++;

    if (self.zoomable === true) {
      self.checkZoom(d);
    } // console.log(t1-t0 + "milliseconds");


    self.animateToDestinationNode();
    drawLinks(d); // .each(function(d) {
    // Put up annotation if a node comes from a new domain.
    // Must satisfy the conditions:
    // -graph paramater doAnnotations is true
    // -the domain has not already been annotated
    // -the domain is different than the ego node's domain

    var thisDomain = self.domainsThisGraph.filter(function (domain) {
      return domain.DomainID == d.DomainID;
    }); // The above returned an array. Take the first element to get the object representing the Domain.

    thisDomain = thisDomain[0];

    if (self.doAnnotations && !thisDomain.alreadyAnnotated && thisDomain.DomainID != self.egoNode.DomainID) {
      self.annotationNewCluster(d);
      d3.select('#legendDomain' + d.DomainID).transition().delay(1000).duration(2000).style('opacity', 1);
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

egoGraphVis.prototype.removeNode = function () {
  var self = this;
  self.animationState = 'rewind'; // self.calculateTransitionTime();

  var currNode = d3.selectAll('.node').filter(function (d) {
    return d.index === self.currNodeIndex;
  });
  var currLinks = d3.selectAll('.link').filter(function (d) {
    return d.source.index === self.currNodeIndex;
  }); // var retractDuration = self.linkAppearDuration;

  var retractDuration = self.transitionTimePerNode;
  currLinks.transition().each('start', function (d) {
    d.inTransition = true;
  }).duration(retractDuration).ease('quad').attr('x2', function (d) {
    return d.source.x;
  }).attr('y2', function (d) {
    return d.source.y;
  }).call(function (d) {
    // .each('end', function(d) {
    d.inTransition = false;
    var currNode = d3.selectAll('.node').filter(function (d) {
      return d.idx === self.currNodeIndex;
    });
    currNode.transition().duration(self.transitionTimePerNode).ease('quad').attr('r', 0).attr('T', 1).each('end', function (dd) {
      d3.select(this).classed('hidden', true).classed('visible', false);
      self.animateToDestinationNode();
    });
  });
};

egoGraphVis.prototype.finishAnimation = function () {
  var self = this;
  self.animationState = 'stopped';
  $.event.trigger({
    type: "animationFinished"
  });
  console.log('finished');
  console.log(self.currNodeIndex);
};

egoGraphVis.prototype.newDestinationNode = function (destinationYear) {
  var self = this;
  self.destinationYear = destinationYear;
  console.log(self.destinationYear);
  self.getDestinationNode(); // make sure the current node is included:

  if (!(self.currNodeIndex === self.destinationNodeIndex)) {
    // don't do anything if this is true
    if (self.currNodeIndex < self.destinationNodeIndex) {
      self.animationState = 'forward';
      self.drawNode();
    } else {
      self.animationState = 'rewind';
      self.removeNode();
    }
  }
};

egoGraphVis.prototype.getDestinationNode = function () {
  var self = this; // Get the destination node index from the destination year

  var maxYear = self.data.graph.yearRange[1];

  function getNodesThisYear() {
    var nodesThisYear = self.notEgoNodes.filter(function (d) {
      return d.Year == self.destinationYear;
    });
    return nodesThisYear;
  }

  var nodesThisYear = getNodesThisYear();

  if (nodesThisYear.length > 0) {
    var lastNodeThisYear = nodesThisYear[nodesThisYear.length - 1];
    self.destinationNodeIndex = lastNodeThisYear.idx;
  } else {
    if (self.destinationYear == maxYear) {
      rewindSearch();
    } else {
      self.destinationYear++;
      self.getDestinationNode(); // recurse
    }
  }

  function rewindSearch() {
    self.destinationYear--;
    var nodesThisYear = getNodesThisYear();

    if (nodesThisYear.length > 0) {
      self.getDestinationNode();
    } else {
      rewindSearch(); // recurse
    }
  }
};

egoGraphVis.prototype.calculateTransitionTime = function () {
  // Method to calculate the transition time for each node based on the number of nodes in the current year
  var self = this; // SPEED UP FOR TESTING PURPOSES
  // KEEP THIS COMMENTED OUT
  // self.transitionTimePerYear[self.currYear] = 100;

  var countThisYear = self.data.graph.nodeCountsPerYear[self.currYear];
  self.transitionTimePerNode = countThisYear ? self.transitionTimePerYear[self.currYear] / countThisYear : 0;
  self.transitionTimePerNode = self.transitionTimePerNode - 10;
};

egoGraphVis.prototype.revealFinalState = function () {
  // cancel all transitions and reveal the final state of the vis
  var self = this;
  d3.selectAll('.node, .link').transition().duration(0);
  self.node.classed('hidden', false).attr('r', function (d) {
    return d.radius;
  }).each(function (d) {
    if (self.zoomable === true) {
      self.checkZoom(d);
    }
  });
  self.link.classed('hidden', false).classed('visible', true).style('visibility', 'visible').attr('x2', function (d) {
    return d.target.x;
  }).attr('y2', function (d) {
    return d.target.y;
  }).each(function (d) {
    d.inTransition = false;
  });
  self.currNodeIndex = self.data.nodes.length - 1;
  self.currYear = self.data.graph.yearRange[1];
  self.yearTextDisplay.text(self.currYear);
  $.event.trigger({
    type: "yearChange"
  });
  self.finishAnimation();
  return;
};

function lineChartByYear(data) {
  var self = this;
  self.data = data.values;
  self.pew_Class = data.pew_Class;
  self.hra_funding = data.funding; // if there is only one funding record:
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

  self.lineChartDimensions; // imported in self.importDefaultOptions below

  self.colorScheme; // // Colors:
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
  self.line; // line drawing function

  self.area; // area drawing function

  self.chartLine; // actual line element

  self.chartArea; // actual area element

  self.linearGradient;
  self.animationState;
  self.currYear;
  self.transitionTimePerYear;
  self.yearRange = d3.extent(self.data, function (d) {
    return d.year;
  }); // cut off at 2015

  self.yearRange[1] = Math.min(self.yearRange[1], 2015);
  self.fundingTime;

  if (typeof self.pew_Class != 'undefined') {
    self.fundingTime = 4; // funding period for Pew
  }

  if (typeof self.hra_funding != 'undefined') {
    self.hra_funding = self.hra_funding[0];
    self.fundingTime = self.hra_funding.duration_in_years; // this is a hack that will work for now
    // TODO: fix this

    self.pew_Class = self.hra_funding.start_date;
  } // self.init();


  return self;
}

lineChartByYear.prototype.init = function () {
  var self = this;
  self.animationState = 'init';
  self.currYear = self.yearRange[0]; // Initialize year

  self.x = d3.scale.linear().range([0, self.lineChartDimensions.width]);
  self.y = d3.scale.linear().range([self.lineChartDimensions.height, 0]);
  self.chartDiv = d3.select('#chartsDiv').append('div').attr('class', 'chartDiv');
  self.svg = self.chartDiv.append('svg').attr('width', self.lineChartDimensions.width + self.lineChartDimensions.margin.left + self.lineChartDimensions.margin.right).attr('height', self.lineChartDimensions.height + self.lineChartDimensions.margin.top + self.lineChartDimensions.margin.bottom) // .attr('id', 'chart2Svg')
  .attr('class', 'lineChart').append('g').attr('transform', 'translate(' + self.lineChartDimensions.margin.left + ',' + self.lineChartDimensions.margin.top + ')');
  self.svgDefs = self.svg.append('defs'); // The strategy is to draw the entire line, but use a clip path to only
  // display up to the current year.
  // var chart2ClipPath = self.svgDefs
  // 	.append('clipPath')
  // 	.attr('class', 'clip')
  // 	.append('rect')
  // 	.attr('width', 0)
  // 	.attr('height', self.lineChartDimensions.height);
  // self.x.domain([self.strToYear("1968"), self.strToYear("2013")]);

  self.x.domain(self.yearRange); // Hack to cut off x axis at 2010:
  // self.x.domain([self.yearRange[0], 2010]);
  // self.y.domain([0, d3.max(self.data, function(d) { return d.count+5; })]);

  self.y.domain([0, d3.max(self.data, function (d) {
    return d.count;
  })]);
  self.xAxis = d3.svg.axis().scale(self.x).orient('bottom').tickFormat(d3.format("d")) // .ticks(16);
  .ticks(Math.min(self.data.length, 20));
  self.yAxis = d3.svg.axis().scale(self.y).orient('left').ticks(2).tickSize(0); // Define line drawing function

  self.line = d3.svg.line().x(function (d) {
    return self.x(d.year);
  }).y(function (d) {
    return self.y(d.count);
  }); // Define the area drawing function

  self.area = d3.svg.area().x(function (d) {
    return self.x(d.year);
  }).y0(self.lineChartDimensions.height).y1(function (d) {
    return self.y(d.count);
  }); // Draw x axis

  self.svg.append('g').attr('class', 'x axis').attr('transform', 'translate(0,' + self.lineChartDimensions.height + ')').call(self.xAxis); // Put the year for each axis tick label into a data attribute
  // to be able to get it more easily later

  var yearLabels = self.svg.select('.x.axis').selectAll('.tick').attr('class', 'yearTick') // .attr("data-year", function(d) {return self.yearToStr(d); })
  .attr("data-year", function (d) {
    return d;
  }).style('font-size', '.75em'); // Add a rect for each year label so we can highlight it later

  var yearLabel = self.svg.selectAll('.yearTick').append('svg:rect').attr('fill', self.colorScheme[4]).style('opacity', 0).attr('class', 'highlightRect').each(function (d) {
    var bbox = this.parentNode.getBBox();
    var padding = bbox.width / 4;
    d3.select(this).attr('x', bbox.x - padding).attr('y', bbox.y).attr('width', bbox.width + padding * 2).attr('height', bbox.height);
  }); // Draw y axis

  self.svg.append('g').attr('class', 'y axis').call(self.yAxis).append('text').attr('transform', 'rotate(-90)').attr('y', -self.lineChartDimensions.margin.left / 2).attr('x', -(self.lineChartDimensions.height + self.lineChartDimensions.margin.top + self.lineChartDimensions.margin.bottom) / 2).attr('class', 'axisLabel').text('Num citations').attr('font-size', '.5em'); // var maxX = self.x(self.yearRange[1]);
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

  self.linearGradient = d3.select('#line-gradient'); // if (self.linearGradient.empty()) {
  // 	// self.linearGradient = self.makeColorGradient(1989);
  // 	self.linearGradient = self.makeColorGradient(self.pew_Class);
  // }
  // self.linearGradient = self.makeColorGradient(self.pew_Class);

  self.chartArea = self.svg.append('g') // .attr('clip-path', 'url(#clip)')
  .append('path').datum(self.data).attr('class', 'area') // .style('fill', self.graphParams.colorScheme.value[0])
  .style('fill', 'url(#line-gradient)').attr('d', self.area);
  self.chartLine = self.svg.append('g') // .attr('clip-path', 'url(#clip)')
  .append('path').datum(self.data).attr('class', 'line') // .style('stroke', self.graphParams.colorScheme.value[0])
  .style('stroke', 'url(#line-gradient)').attr('d', self.line);
  self.currYearIndicator = self.svg.append('svg:line') // .attr('class', 'verticalLine yearIndicator')
  .attr('class', 'verticalLine yearIndicator hidden') // turn it off for now (testing other things)
  // Keep track of transition timing:
  .attr('T', 0).attr('x1', self.x(self.currYear)).attr('x2', self.x(self.currYear)).attr('y1', self.lineChartDimensions.height) // .attr('y2', self.lineChartYScale(currVal))
  .attr('y2', 0).attr('stroke-width', 2).attr('stroke', 'black').attr('stroke-dasharray', '5, 2').style('opacity', .25); // self.svg.select('.yearTick').select('.highlightRect')
  // 	.attr('class', 'currYear')
  // 	.transition()
  // 	.duration(500)
  // 	.style('opacity', .1);

  self.yearArea = self.svg.selectAll('.yearArea').data(self.data).enter().append('svg:rect').attr('class', 'yearArea hidden').attr('data-year', function (d) {
    return d.year;
  }).attr('x', function (d) {
    return self.x(d.year);
  }).attr('y', 0).attr('width', function (d) {
    return self.x(d.year + 1) - self.x(d.year);
  }).attr('height', self.lineChartDimensions.height).attr('fill', self.colorScheme[4]).style('opacity', 0);

  if (typeof self.pew_Class != 'undefined') {
    self.makeFundingLines(self.pew_Class);
  }
};

lineChartByYear.prototype.importDefaultOptions = function (options) {
  var self = this;
  self.colorScheme = options.colorScheme;
  self.lineChartDimensions = options.dimensions.lineChart;
  self.transitionTimePerYear = options.transitionTimePerYear;
};

lineChartByYear.prototype.makeColorGradient = function (fundingYear) {
  var self = this;
  console.log(fundingYear); // This method should be called by the main app (e.g. Main.js)
  // It makes a linear gradient for the line charts based on funding period
  // fundingYear is the Pew Scholar's class year
  // The Pew funding lasts for five years
  // Maybe this method should be modified at some point to be able to have different lengths of funding
  // THIS DIDN'T WORK because the width depends on self.init, but this needs to be called before self.init
  //
  // instead call it in self.init()

  var maxX = self.x(self.yearRange[1]);
  var linearGradient = self.svg.append('linearGradient').attr('id', 'line-gradient').attr('gradientUnits', 'userSpaceOnUse').attr('x1', 0).attr('y1', self.x(self.yearRange[0])).attr('x2', maxX).attr('y2', 0).selectAll('stop').data([{
    offset: self.x(self.yearRange[0]) / maxX,
    color: d3.rgb(self.colorScheme[7]).darker()
  }, {
    offset: self.x(fundingYear - 1) / maxX,
    color: d3.rgb(self.colorScheme[7]).darker()
  }, {
    offset: self.x(fundingYear + 1) / maxX,
    color: self.colorScheme[2]
  }, {
    offset: self.x(fundingYear + self.fundingTime - 1) / maxX,
    color: self.colorScheme[2]
  }, {
    offset: self.x(fundingYear + self.fundingTime + 1) / maxX,
    color: self.colorScheme[0]
  }, {
    offset: 1,
    color: self.colorScheme[0]
  }]).enter().append('stop').attr('offset', function (d) {
    return d.offset;
  }).attr('stop-color', function (d) {
    return d.color;
  });
  return linearGradient;
};

lineChartByYear.prototype.makeFundingLines = function (fundingYear) {
  var self = this; // Make the vertical lines that show funding period

  self.svg.append('svg:line').attr('class', 'verticalLineStatic verticalLineFundingBegin').attr('x1', self.x(fundingYear)).attr('x2', self.x(fundingYear)).attr('y1', self.lineChartDimensions.height).attr('y2', 0).attr('stroke-width', 2).attr('stroke', self.colorScheme[2]).style('stroke-dasharray', '5, 2').style('opacity', .8);
  self.svg.append('svg:line').attr('class', 'verticalLineStatic verticalLineFundingEnd').attr('x1', self.x(fundingYear + self.fundingTime)).attr('x2', self.x(fundingYear + self.fundingTime)).attr('y1', self.lineChartDimensions.height).attr('y2', 0).attr('stroke-width', 2).attr('stroke', self.colorScheme[0]).style('stroke-dasharray', '5, 2').style('opacity', .8);
};

lineChartByYear.prototype.changeAnimationState = function (animationState) {
  var self = this;
  self.animationState = animationState;
  console.log(self.animationState);

  function advanceLine() {
    var timeElapsed = self.currYearIndicator.attr('T');
    self.currYearIndicator.attr('data-state', 'forward') // .attr('T', 0)
    .classed('hidden', false).transition() // .duration(self.transitionTimePerYear[self.currYear] - timeElapsed)
    .duration(self.transitionTimePerYear[self.currYear]).ease('linear').attr('x1', self.x(self.currYear)).attr('x2', self.x(self.currYear)) // .attr('y2', self.lineChartYScale(currVal))
    .attr('data-state', 'stopped').attr('T', 1).each('end', function () {
      d3.select(this).attr('T', 0);
      self.currYear++; // advanceLine()
    }); // // Update the clip path to show the part of the line we want (with transition)
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

lineChartByYear.prototype.correctYear = function (currYear) {
  var self = this;

  if (currYear != self.currYear) {
    self.currYear = currYear;
    self.currYearIndicator.attr('x1', self.x(self.currYear)).attr('x2', self.x(self.currYear));
    self.changeAnimationState();
  }
};

lineChartByYear.prototype.moveYearIndicator = function (currYear) {
  var self = this;
  self.currYear = currYear;
  self.currYearIndicator.attr('T', 0).transition().duration(self.transitionTimePerYear[self.currYear]).ease('linear').attr('x1', self.x(self.currYear)).attr('x2', self.x(self.currYear)) // .attr('y2', self.lineChartYScale(currVal))
  // .attr('data-state', 'stopped')
  .attr('T', 1).each('end', function () {
    d3.select(this).attr('T', 0);
  });

  function highlightCurrYearTick() {
    self.svg.selectAll('.yearTick').selectAll('.highlightRect').filter(function (d) {
      return d == self.currYear;
    }).attr('class', 'currYear').transition().duration(self.transitionTimePerYear[self.currYear] / 4).style('opacity', .1);
  }

  self.svg.selectAll('.yearTick').selectAll('.currYear').classed('.currYear', false).transition().duration(self.transitionTimePerYear[self.currYear] / 4).style('opacity', 0); // highlightCurrYearTick();

  self.svg.selectAll('.yearArea.currYear').classed('currYear', false).transition().duration(self.transitionTimePerYear[self.currYear] / 4) // .style('opacity', self.yearAreaOpacity/2);
  .style('opacity', function (d) {
    if (d.year < self.currYear) {
      return self.yearAreaOpacity / 2;
    } else {
      return 0;
    }
  });
  self.yearArea.filter(function (d) {
    return d.year == self.currYear;
  }).classed('currYear', true).classed('hidden', false).style('opacity', self.yearAreaOpacity * 2).transition().duration(self.transitionTimePerYear[self.currYear] / 2).style('opacity', self.yearAreaOpacity); // make sure that everything is in order... i.e. that years before currYear are highlighted
  // and years after currYear are not

  self.yearArea.filter(function (d) {
    return d.year < self.currYear;
  }).classed('hidden', false).style('opacity', self.yearAreaOpacity / 2);
  self.yearArea.filter(function (d) {
    return d.year > self.currYear;
  }).style('opacity', 0);
  console.log(self.currYear);
};

lineChartByYear.prototype.addTitle = function (title) {
  var self = this;
  self.title = self.svg.append('text').attr('class', 'lineChartTitle').attr('x', self.lineChartDimensions.width / 2).attr('y', 0 - self.lineChartDimensions.margin.top / 2).attr('text-anchor', 'middle').text(title);
}; // var citationVis = citationVis || {};
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
$(document).on("initComplete", function () {
  var egoGraphVis = citationVis.egoGraphVis;

  if (egoGraphVis.zoomable == false) {
    return;
  }

  var zoom = egoGraphVis.zoom;
  egoGraphVis.zoomTranslate = zoom.translate();

  egoGraphVis.checkZoom = function (d) {
    var zoomThresholdMin = coordinates([0, 0])[1]; // minimum y value

    var zoomThresholdMax = coordinates([egoGraphVis.graphDimensions.width, egoGraphVis.graphDimensions.height])[1]; // maximum y value

    if (d.y < zoomThresholdMin || d.y > zoomThresholdMax) {
      console.log(zoom.translate());
      console.log(zoom.scale());
      console.log(coordinates([d.x, d.y]));
      console.log(coordinates([egoGraphVis.graphDimensions.width, egoGraphVis.graphDimensions.height]));
      console.log(coordinates([0, 0])); // http://bl.ocks.org/mbostock/7ec977c95910dd026812

      egoGraphVis.group.call(zoom.event); // Record the coordinates (in data space) of the center (in screen space).

      var center0 = zoom.center();
      var translate0 = zoom.translate();
      var coordinates0 = coordinates(center0);
      zoom.scale(zoom.scale() * .9); // Translate back to the center.

      var center1 = point(coordinates0);
      zoom.translate([translate0[0] + center0[0] - center1[0], translate0[1] + center0[1] - center1[1]]);
      egoGraphVis.group.transition().duration(500).call(zoom.event); // egoGraphVis.group.call(zoom.event);
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

  $(document).on("animationFinished", function () {
    testrecord();
    console.log(zoom.translate());
    console.log(zoom.scale());
  });
  testrecord(); // // Record the coordinates (in data space) of the center (in screen space).
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

  d3.select('#mainDiv').append('p').attr("class", "loadingText").text('Loading...'); // d3.json(citationvis_data, function(error, graph) {

  console.log(graph); // Get the most common Domain IDs for the ego author's papers

  var domainsNest = d3.nest().key(function (d) {
    return d.DomainID;
  }).sortValues(d3.descending).rollup(function (leaves) {
    return leaves.length;
  }).entries(graph.nodes[0].papers);
  domainsNest.sort(function (a, b) {
    return d3.descending(a.values, b.values);
  }); // store as a node property

  graph.nodes[0].DomainCounts = domainsNest; // d3.select('#infoDiv').append('p').text(graph.nodes[0].AuthorName);

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
  citationVis.eigenfactor_sum_data = lineChartData.prepareData_authorEigenfactorSum(graph); // Visualization objects go here

  citationVis.egoGraphVis = new egoGraphVis(citationVis.graph_data); // citationVis.publicationsLineChart = new lineChartByYear(citationVis.publications_data);
  // citationVis.citationsLineChart = new lineChartByYear(citationVis.all_citations_data);
  // citationVis.eigenfactorSumLineChart = new lineChartByYear(citationVis.eigenfactor_sum_data);

  citationVis.lineCharts = [];
  citationVis.lineCharts.push(new lineChartByYear(citationVis.publications_data));
  citationVis.lineCharts.push(new lineChartByYear(citationVis.all_citations_data));
  citationVis.lineCharts.push(new lineChartByYear(citationVis.eigenfactor_sum_data));
  options.transitionTimePerYear = citationVis.getTransitionTimePerYear(graph);
  citationVis.egoGraphVis.importDefaultOptions(options);

  for (var i = 0; i < citationVis.lineCharts.length; i++) {
    citationVis.lineCharts[i].importDefaultOptions(options);
  }

  citationVis.egoGraphVis.init();

  for (var i = 0; i < citationVis.lineCharts.length; i++) {
    citationVis.lineCharts[i].init();
  }

  $.event.trigger({
    type: "initComplete"
  });
  citationVis.lineCharts[0].addTitle("Number of publications");
  citationVis.lineCharts[1].addTitle("Number of citations received");
  var ctrtype = getQueryVariable("ctrtype");

  if (!ctrtype) {
    ctrtype = "author";
  }

  console.log(ctrtype); // citationVis.lineCharts[2].addTitle("Sum of eigenfactor for this author's publications by year");

  citationVis.lineCharts[2].addTitle("Sum of eigenfactor for this " + ctrtype + "'s publications by year");
  $(document).on("yearChange", function () {
    var currYear = citationVis.egoGraphVis.currYear;

    for (var i = 0; i < citationVis.lineCharts.length; i++) {
      citationVis.lineCharts[i].moveYearIndicator(currYear);
    }
  }); // Hack to label the publications line chart. TODO: Fix this later
  // var pubs = d3.select(citationVis.publicationsLineChart.chartDiv[0][0]);

  var pubs = d3.select(citationVis.lineCharts[0].chartDiv[0][0]);
  var pubsAxisLabel = pubs.select('.y.axis').select('.axisLabel');
  pubsAxisLabel.text('Num publications'); // Hack to alter eigenfactor line chart. TODO: Fix this later
  // citationVis.eigenfactorSumLineChart.yAxis.tickFormat(d3.format('e'));

  citationVis.lineCharts[2].yAxis.tickFormat(d3.format('e')); // var EFChart = d3.select(citationVis.eigenfactorSumLineChart.chartDiv[0][0]);

  var EFChart = d3.select(citationVis.lineCharts[2].chartDiv[0][0]);
  EFChart.select('.y.axis') // .call(citationVis.eigenfactorSumLineChart.yAxis)
  .call(citationVis.lineCharts[2].yAxis).select('.axisLabel').text('Sum of Eigenfactor'); // Event listeners
  // Event listeners that act across different visualization objects go here

  citationVis.yearTickClickEventListener();
  d3.select(".loadingText").remove(); // })(citationvis_data);
} // main();
//




/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: citationVis, egoGraphVis, lineChartByYear */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _concat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./concat.js */ "./src/concat.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "citationVis", function() { return _concat_js__WEBPACK_IMPORTED_MODULE_0__["citationVis"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "egoGraphVis", function() { return _concat_js__WEBPACK_IMPORTED_MODULE_0__["egoGraphVis"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "lineChartByYear", function() { return _concat_js__WEBPACK_IMPORTED_MODULE_0__["lineChartByYear"]; });




/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uYXV0aWx1c192aXMvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL25hdXRpbHVzX3Zpcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uYXV0aWx1c192aXMvLi9zcmMvY29uY2F0LmpzIiwid2VicGFjazovL25hdXRpbHVzX3Zpcy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJTdHJpbmciLCJwcm90b3R5cGUiLCJjYXBpdGFsaXplIiwidG9Mb3dlckNhc2UiLCJyZXBsYWNlIiwibSIsInRvVXBwZXJDYXNlIiwiY2l0YXRpb25WaXMiLCJtYWtlSHRtbCIsInllYXIiLCJwYXBlcnMiLCJudW1EaXNwbGF5IiwiY2FsbGJhY2siLCJoYXNPd25Qcm9wZXJ0eSIsInRvb2x0aXBIdG1sIiwibnVtUGFwZXJzQWRkZWQiLCJpIiwibGVuIiwibGVuZ3RoIiwicGFwZXIiLCJlZ29HcmFwaFZpcyIsInRvb2x0aXAiLCJodG1sIiwicGlkcyIsInB1c2giLCJQYXBlcklEIiwiJCIsImFqYXgiLCJkYXRhVHlwZSIsInVybCIsIiRTQ1JJUFRfUk9PVCIsImRhdGEiLCJwYXBlcmlkIiwiSlNPTiIsInN0cmluZ2lmeSIsInN1Y2Nlc3MiLCJyZXN1bHQiLCJjb25zb2xlIiwibG9nIiwiZGJfcGFwZXJzIiwiZG9jdW1lbnQiLCJvbiIsIndpbmRvd1dpZHRoIiwid2luZG93Iiwid2lkdGgiLCJub2RlVG9vbHRpcHMiLCJsZWdlbmRUb29sdGlwcyIsImNzcyIsInRvb2x0aXBzdGVyIiwidGhlbWUiLCJtYXhXaWR0aCIsImFuaW1hdGlvbiIsImFuaW1hdGlvbmR1cmF0aW9uIiwiZGVsYXkiLCJ1cGRhdGVBbmltYXRpb24iLCJjb250ZW50IiwiY29udGVudEFzSFRNTCIsImZ1bmN0aW9uSW5pdCIsImZ1bmN0aW9uQmVmb3JlIiwiaW5zdGFuY2UiLCJoZWxwZXIiLCIkb3JpZ2luIiwib3JpZ2luIiwiZWdvUGFwZXJzIiwiZWdvTm9kZSIsInRoaXNZZWFyUGFwZXJzIiwiZmlsdGVyIiwiZGQiLCJZZWFyIiwic29ydCIsImEiLCJiIiwiZDMiLCJkZXNjZW5kaW5nIiwiRUYiLCJhZGRDbGFzcyIsImFqYXhQYXBlckluZm8iLCJub2RlIiwic2VsZWN0IiwiZWFjaCIsImQiLCJub2RlVHlwZSIsInVwZGF0ZWRQcm9wcyIsImNpdGF0aW9uIiwiYnlwYXNzQWpheCIsImlkIiwiVGl0bGUiLCJkb2kiLCJhdXRob3Jfc3RyIiwidmVudWUiLCJtYWtlTm9kZVRvb2x0aXBIdG1sIiwiaWR4IiwibmFtZSIsIm51bWJlck9mUHVicyIsInNwYW4iLCJhcHBlbmQiLCJ0ZXh0IiwiRmllbGRfb2Zfc3R1ZHlfbmFtZXMiLCJvdGhlckh0bWwiLCJoZWFkZXJIdG1sIiwibGVnZW5kSXRlbSIsIkRvbWFpbklEIiwiRG9tYWluTmFtZSIsImRlZmF1bHRfb3B0aW9ucyIsImRpbWVuc2lvbnMiLCJoZWlnaHQiLCJsaW5lQ2hhcnQiLCJtYXJnaW4iLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsImxlZnQiLCJjb2xvclNjaGVtZSIsInNwbGljZSIsIkRFRkFVTFRfT1BUSU9OUyIsImRlZmF1bHRzIiwiZWdvR3JhcGhEYXRhIiwibWF4Tm9kZXMiLCJwcmVwYXJlX2Vnb0dyYXBoRGF0YSIsImdyYXBoIiwibm9kZXMiLCJvbGRJZHgiLCJuZXdHcmFwaCIsInByb3BzVG9Db3B5IiwicHJvcCIsIm5vdEVnb05vZGVzIiwic2h1ZmZsZSIsIkRvbWFpbklEVG9Gcm9udCIsImFyciIsImhhc0RvbWFpbklEIiwibm9Eb21haW5JRCIsIm5ld0FyciIsImNvbmNhdCIsInNsaWNlIiwiYXNjZW5kaW5nIiwibmV3Tm9kZSIsImxpbmtzIiwicmVjYWxjdWxhdGVMaW5rcyIsIm5ld0xpbmtzIiwidGhpc1NvdXJjZSIsInNvdXJjZSIsInRoaXNUYXJnZXQiLCJ0YXJnZXQiLCJuZXdMaW5rIiwiZm9yRWFjaCIsInllYXJSYW5nZSIsImdldE5vZGVDb3VudHNQZXJZZWFyIiwieWVhcnNOZXN0IiwibmVzdCIsImtleSIsInNvcnRLZXlzIiwicm9sbHVwIiwibGVhdmVzIiwibWFwIiwibm9kZUNvdW50c1BlclllYXIiLCJjb3VudFRoaXNZZWFyIiwiZXZlbnRMaXN0ZW5lcnMiLCJsaW5lQ2hhcnREYXRhIiwiZ2V0UGV3Q2xhc3NZZWFyIiwicGV3X0NsYXNzIiwiZ2V0RnVuZGluZyIsImZ1bmRpbmciLCJjbGVhbkxpbmtzIiwiY2xlYW5lZExpbmtzIiwibGlua1RvRWdvIiwic291cmNlWWVhciIsInRhcmdldFllYXIiLCJnZXRZZWFyUmFuZ2UiLCJtaW5ZZWFyIiwibWluIiwidG9kYXlZZWFyIiwiRGF0ZSIsImdldEZ1bGxZZWFyIiwibWF4WWVhciIsIm1heCIsIk1hdGgiLCJnZXRFbXB0eUNvdW50RGF0YSIsImVtcHR5Q291bnREYXRhIiwiY291bnQiLCJwcmVwYXJlRGF0YV9hbGxDaXRhdGlvbnMiLCJ2YWx1ZXMiLCJ0aGlzU291cmNlWWVhciIsImRhdGFUaGlzWWVhciIsInByZXBhcmVEYXRhX2Vnb0F1dGhvclB1YmxpY2F0aW9ucyIsInByZXBhcmVEYXRhX2F1dGhvckVpZ2VuZmFjdG9yU3VtIiwiZ2V0UXVlcnlWYXJpYWJsZSIsInZhcmlhYmxlIiwicXVlcnkiLCJsb2NhdGlvbiIsInNlYXJjaCIsInN1YnN0cmluZyIsInZhcnMiLCJzcGxpdCIsInBhaXIiLCJnZXRUcmFuc2l0aW9uVGltZVBlclllYXIiLCJsb25nZXN0WWVhclRyYW5zaXRpb25UaW1lIiwidHJhbnNpdGlvblRpbWVQZXJZZWFyIiwiZW1wdHlZZWFyVHJhbnNpdGlvblRpbWUiLCJ0aHJlc2hvbGRTY2FsZSIsInNjYWxlIiwidGhyZXNob2xkIiwiZG9tYWluIiwicmFuZ2UiLCJ5ZWFyVGlja0NsaWNrRXZlbnRMaXN0ZW5lciIsInNlbGVjdEFsbCIsImRlc3RpbmF0aW9uWWVhciIsImdldEF0dHJpYnV0ZSIsInRyYW5zaXRpb24iLCJkdXJhdGlvbiIsIm5ld0Rlc3RpbmF0aW9uTm9kZSIsInN1bW1hcnlTdGF0aXN0aWNzIiwiYWRkU3VtbWFyeVN0YXRpc3RpY3MiLCJnZXRDaXRhdGlvbkNvdW50c1BlclllYXIiLCJjaXRhdGlvbkNvdW50c1BlclllYXIiLCJnZXRQYXJhbWV0ZXJCeU5hbWUiLCJocmVmIiwicmVnZXgiLCJSZWdFeHAiLCJyZXN1bHRzIiwiZXhlYyIsImRlY29kZVVSSUNvbXBvbmVudCIsImRvbWFpbnNNdWx0IiwiRG9tYWluc011bHQiLCIkZG9tYWluRHJvcGRvd24iLCJkb21haW5fc2VsZWN0IiwiYXR0ciIsInByZXBlbmQiLCJrIiwidiIsInN3aXRjaERvbWFpbiIsInZhbCIsImRvbWFpblR5cGUiLCJkdXIiLCJEb21haW5zIiwidGhpc05vZGUiLCJEb21haW5NdWx0IiwiZ2V0RG9tYWluc1RoaXNHcmFwaCIsInJlbW92ZSIsImxlZ2VuZEluaXQiLCJkb21haW5zVGhpc0dyYXBoIiwidGhpc0RvbWFpbiIsInRoaXNDb2xvciIsImNvbG9yIiwicmV2ZWFsRmluYWxTdGF0ZSIsInNlbGYiLCJncmFwaERpbWVuc2lvbnMiLCJub2RlUGxhY2VtZW50T3B0aW9ucyIsIm5vZGVQbGFjZW1lbnQiLCJ6b29tYWJsZSIsInN2ZyIsImdyb3VwIiwibGluayIsImVpZ2VuRmFjdG9yU2NhbGUiLCJsZWdlbmQiLCJ5ZWFyVGV4dERpc3BsYXkiLCJhdXRob3JJbWFnZURpdiIsInRpcCIsInRpY2siLCJmb3JjZSIsIm9wYWNpdHlWYWxzIiwibm9kZVByZXZZZWFyIiwibGlua05vdFRvRWdvIiwibGlua1ByZXZZZWFyIiwiZG9Bbm5vdGF0aW9ucyIsImFuaW1hdGlvblN0YXRlIiwidHJhbnNpdGlvblRpbWVQZXJOb2RlIiwibGlua0FwcGVhckR1cmF0aW9uIiwiY3Vyck5vZGVJbmRleCIsImRlc3RpbmF0aW9uTm9kZUluZGV4IiwiY3VyclllYXIiLCJjIiwidHQiLCJpbml0IiwibWFrZVRpY2siLCJtYWtlRm9yY2UiLCJ6b29tIiwibWFrZVpvb20iLCJzdHlsZSIsImZpeGVkIiwieCIsInkiLCJlaWdlbkZhY3Rvck1heCIsImxpbmVhciIsInJhZGl1cyIsImVudGVyIiwiY2xhc3NlZCIsImNhbGwiLCJkcmFnIiwib3BWYWxzIiwicGxhY2VOb2RlcyIsInN0YXJ0Iiwic3RvcCIsImN4IiwiY3kiLCJpbml0aWFsUmFkIiwibnVtTm9kZXMiLCJ0aGlzUmFkIiwicG93IiwidGhpc1NwYWNpbmciLCJQSSIsImNvcyIsInNpbiIsImNvbXB1dGVBbmdsZSIsImFscGhhIiwiYXJjTGVuZ3RoIiwiZXBzaWxvbiIsImFuZ2xlUmFkIiwiY29tcHV0ZUFyY0xlbmd0aCIsImFicyIsImRhIiwic3FydCIsInUiLCJjb21wdXRlUG9pbnQiLCJkaXN0YW5jZSIsImdldEFuZ2xlcyIsInBvaW50QXJjRGlzdGFuY2UiLCJ0b3RhbEFyY0xlbmd0aCIsInByZXZpb3VzQW5nbGVSYWQiLCJhbmdsZXMiLCJwb3dTY2FsZSIsImV4cG9uZW50IiwibmV3aSIsInRoaXNQb3MiLCJhZGRBdXRob3JJbWFnZSIsImFkZEV2ZW50TGlzdGVuZXJzIiwicmV2ZWFsRWdvTm9kZSIsImJlaGF2aW9yIiwiY2VudGVyIiwic2NhbGVFeHRlbnQiLCJldmVudCIsInRyYW5zbGF0ZSIsIngxIiwieTEiLCJ4MiIsInkyIiwidHJhbnNmb3JtIiwibGF5b3V0Iiwic2l6ZSIsImxpbmtEaXN0YW5jZSIsImltcG9ydERlZmF1bHRPcHRpb25zIiwib3B0aW9ucyIsImRvbWFpbnMiLCJtYXhEb21haW5zIiwiZW50cmllcyIsInNxdWFyZVNpemUiLCJwYWRkaW5nIiwic3FyUGx1c1BhZGRpbmciLCJBdXRob3JOYW1lIiwiYXV0aG9ySW1hZ2VDb250YWluZXIiLCJhdXRob3JPcmciLCJvcmdhbml6YXRpb24iLCJ0c3YiLCJlcnJvciIsIm9yZ19kYXRhIiwicHN0eWxlIiwibmFtZUZyb21UU1YiLCJvcmdMaW5rIiwib3JnSW1nVXJsIiwiYXV0aG9ySW1hZ2UiLCJhZGRJbWFnZSIsIm9wZW4iLCJhdXRob3JJbWFnZVNyYyIsIkF1dGhvckltZ1VybCIsIkltZ1VSTCIsInBld2lkX3N0ciIsIlBld1NjaG9sYXJJRCIsInRvU3RyaW5nIiwic3Vic3RyIiwiZm5hbWVfcm9vdCIsInBvc3NpYmxlRXh0ZW5zaW9ucyIsInRyeUltYWdlRmlsZW5hbWVzIiwiaXRlciIsImF1dGhvckltYWdlRmlsZW5hbWUiLCJnZXQiLCJkb25lIiwiZmFpbCIsInBld0NsYXNzIiwiaG92ZXJlZCIsImhvdmVyZWRJdGVtIiwiZ2V0RE9JIiwibm9kZU9iaiIsImdldENpdGF0aW9uIiwibWFrZVRvb2x0aXAiLCJnZXRBdXRob3JMaXN0IiwiYXV0aG9ycyIsImF1dGhvckxpc3QiLCJ0aGlzQXV0aG9yU3RyTGlzdCIsInRoaXNBdXRob3IiLCJqb2luIiwiZ2V0VGl0bGUiLCJhdXRob3JTdHJMaXN0IiwidGl0bGUiLCJhdXRob3JpZHMiLCJBdXRob3JJRExpc3QiLCJ0cmlnZ2VyIiwidHlwZSIsImFuaW1hdGVUb0Rlc3RpbmF0aW9uTm9kZSIsImZpbmlzaEFuaW1hdGlvbiIsImNoZWNrWWVhciIsImNvbnRpbnVlIiwiY2FsY3VsYXRlVHJhbnNpdGlvblRpbWUiLCJkcmF3Tm9kZSIsInJlbW92ZU5vZGUiLCJjdXJyTm9kZSIsIm9sZFllYXIiLCJuZXdZZWFyIiwiYmVnaW5OZXdZZWFyIiwibm9kZXNUaGlzWWVhciIsInNldFRpbWVvdXQiLCJkcmF3TGlua3MiLCJsaW5rc1RoaXNOb2RlSXNTb3VyY2UiLCJsIiwiaW5UcmFuc2l0aW9uIiwiZWFzZSIsImNoZWNrWm9vbSIsImFscmVhZHlBbm5vdGF0ZWQiLCJhbm5vdGF0aW9uTmV3Q2x1c3RlciIsImluZGV4IiwiY3VyckxpbmtzIiwicmV0cmFjdER1cmF0aW9uIiwiZ2V0RGVzdGluYXRpb25Ob2RlIiwiZ2V0Tm9kZXNUaGlzWWVhciIsImxhc3ROb2RlVGhpc1llYXIiLCJyZXdpbmRTZWFyY2giLCJsaW5lQ2hhcnRCeVllYXIiLCJocmFfZnVuZGluZyIsImxpbmVDaGFydERpbWVuc2lvbnMiLCJjaGFydERpdiIsInN2Z0RlZnMiLCJjbGlwUGF0aCIsImN1cnJZZWFySW5kaWNhdG9yIiwieWVhckFyZWEiLCJ5ZWFyQXJlYU9wYWNpdHkiLCJ4QXhpcyIsInlBeGlzIiwibGluZSIsImFyZWEiLCJjaGFydExpbmUiLCJjaGFydEFyZWEiLCJsaW5lYXJHcmFkaWVudCIsImV4dGVudCIsImZ1bmRpbmdUaW1lIiwiZHVyYXRpb25faW5feWVhcnMiLCJzdGFydF9kYXRlIiwiYXhpcyIsIm9yaWVudCIsInRpY2tGb3JtYXQiLCJmb3JtYXQiLCJ0aWNrcyIsInRpY2tTaXplIiwieTAiLCJ5ZWFyTGFiZWxzIiwieWVhckxhYmVsIiwiYmJveCIsInBhcmVudE5vZGUiLCJnZXRCQm94IiwiZGF0dW0iLCJtYWtlRnVuZGluZ0xpbmVzIiwibWFrZUNvbG9yR3JhZGllbnQiLCJmdW5kaW5nWWVhciIsIm1heFgiLCJvZmZzZXQiLCJyZ2IiLCJkYXJrZXIiLCJjaGFuZ2VBbmltYXRpb25TdGF0ZSIsImFkdmFuY2VMaW5lIiwidGltZUVsYXBzZWQiLCJjb3JyZWN0WWVhciIsIm1vdmVZZWFySW5kaWNhdG9yIiwiaGlnaGxpZ2h0Q3VyclllYXJUaWNrIiwiYWRkVGl0bGUiLCJ6b29tVHJhbnNsYXRlIiwiem9vbVRocmVzaG9sZE1pbiIsImNvb3JkaW5hdGVzIiwiem9vbVRocmVzaG9sZE1heCIsImNlbnRlcjAiLCJ0cmFuc2xhdGUwIiwiY29vcmRpbmF0ZXMwIiwiY2VudGVyMSIsInBvaW50IiwidGVzdHJlY29yZCIsInQiLCJtYWluIiwiY2l0YXRpb252aXNfZGF0YSIsImRvbWFpbnNOZXN0Iiwic29ydFZhbHVlcyIsIkRvbWFpbkNvdW50cyIsImdyYXBoX2RhdGEiLCJwdWJsaWNhdGlvbnNfZGF0YSIsImFsbF9jaXRhdGlvbnNfZGF0YSIsImVpZ2VuZmFjdG9yX3N1bV9kYXRhIiwibGluZUNoYXJ0cyIsImN0cnR5cGUiLCJwdWJzIiwicHVic0F4aXNMYWJlbCIsIkVGQ2hhcnQiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENB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cFcsTUFIRixDQUdTLFlBSFQsRUFHdUJrQixJQUh2QixDQUc0QixvQkFINUIsRUE1Rm9CLENBa0dwQjtBQUNBOztBQUNBekYsYUFBVyxDQUFDb00sMEJBQVo7QUFFQW5JLElBQUUsQ0FBQ00sTUFBSCxDQUFVLGNBQVYsRUFBMEIrSixNQUExQixHQXRHb0IsQ0F1R3JCO0FBQ0MsQyxDQUVEO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzU4RkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6Im5hdXRpbHVzX3Zpcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwibmF1dGlsdXNfdmlzXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIm5hdXRpbHVzX3Zpc1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJuYXV0aWx1c192aXNcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIvLyBodHRwOi8vY29kZXJldmlldy5zdGFja2V4Y2hhbmdlLmNvbS9xdWVzdGlvbnMvNzc2MTQvY2FwaXRhbGl6ZS10aGUtZmlyc3QtY2hhcmFjdGVyLW9mLWFsbC13b3Jkcy1ldmVuLXdoZW4tZm9sbG93aW5nLWFcblN0cmluZy5wcm90b3R5cGUuY2FwaXRhbGl6ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnRvTG93ZXJDYXNlKCkucmVwbGFjZSggL1xcYlxcdy9nLCBmdW5jdGlvbihtKSB7XG4gICAgICAgIHJldHVybiBtLnRvVXBwZXJDYXNlKCk7XG4gICAgfSk7XG59O1xuXG5cbnZhciBjaXRhdGlvblZpcyA9IGNpdGF0aW9uVmlzIHx8IHt9O1xuXG5mdW5jdGlvbiBtYWtlSHRtbCh5ZWFyLCBwYXBlcnMsIG51bURpc3BsYXksIGNhbGxiYWNrKSB7XG5cdGlmIChwYXBlcnNbMF0uaGFzT3duUHJvcGVydHkoJ2NpdGF0aW9uJykpIHtcblx0XHR2YXIgdG9vbHRpcEh0bWwgPSAnPGgzIHN0eWxlPVwiZm9udC1zaXplOiAxMDAlXCI+VG9wIHBhcGVycyBpbiB0aGlzIGNvbGxlY3Rpb24gaW4gJyArIHllYXIgKyc6PC9oMz4nO1xuXHRcdHRvb2x0aXBIdG1sID0gdG9vbHRpcEh0bWwgKyAnPG9sPic7XG5cdFx0dmFyIG51bVBhcGVyc0FkZGVkID0gMDtcblx0XHRmb3IgKHZhciBpID0gMCwgbGVuID0gcGFwZXJzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHR2YXIgcGFwZXIgPSBwYXBlcnNbaV07XG5cdFx0XHRpZiAocGFwZXIuaGFzT3duUHJvcGVydHkoJ2NpdGF0aW9uJykpIHtcblx0XHRcdFx0dG9vbHRpcEh0bWwgPSB0b29sdGlwSHRtbCArICc8bGk+JyArIHBhcGVyWydjaXRhdGlvbiddICsgJzwvbGk+Jztcblx0XHRcdFx0bnVtUGFwZXJzQWRkZWQrKztcblx0XHRcdFx0aWYgKG51bVBhcGVyc0FkZGVkID09PSBudW1EaXNwbGF5KSB7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0dG9vbHRpcEh0bWwgPSB0b29sdGlwSHRtbCArICc8L29sPic7XG5cblx0XHRjaXRhdGlvblZpcy5lZ29HcmFwaFZpcy50b29sdGlwID0gY2l0YXRpb25WaXMuZWdvR3JhcGhWaXMudG9vbHRpcC5odG1sKHRvb2x0aXBIdG1sKTtcblx0XHRpZiAoY2FsbGJhY2sgIT0gbnVsbCkge1xuXHRcdFx0Y2FsbGJhY2sodG9vbHRpcEh0bWwpO1xuXHRcdH1cblx0XHRyZXR1cm4gdG9vbHRpcEh0bWw7XG5cblx0fSBlbHNlIHtcblx0XHR2YXIgcGlkcyA9IFtdO1xuXHRcdGZvciAodmFyIGkgPSAwLCBsZW4gPSBudW1EaXNwbGF5OyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdGlmIChpIDwgcGFwZXJzLmxlbmd0aCkge1xuXHRcdFx0XHRwaWRzLnB1c2gocGFwZXJzW2ldLlBhcGVySUQpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHQkLmFqYXgoe1xuXHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcblx0XHRcdHVybDogJFNDUklQVF9ST09UICsgJy9fdmlzX2dldF9tb3JlX3BhcGVyaW5mbycsXG5cdFx0XHRkYXRhOiB7cGFwZXJpZDogSlNPTi5zdHJpbmdpZnkocGlkcyl9LFxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24ocmVzdWx0KSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKHJlc3VsdCk7XG5cdFx0XHRcdHZhciBkYl9wYXBlcnMgPSByZXN1bHRbJ3BhcGVycyddO1xuXHRcdFx0XHR2YXIgdG9vbHRpcEh0bWwgPSAnPGgzIHN0eWxlPVwiZm9udC1zaXplOiAxMDAlXCI+VG9wIHBhcGVycyBpbiB0aGlzIGNvbGxlY3Rpb24gaW4gJyArIHllYXIgKyc6PC9oMz4nO1xuXHRcdFx0XHR0b29sdGlwSHRtbCA9IHRvb2x0aXBIdG1sICsgJzxvbD4nO1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMCwgbGVuID0gZGJfcGFwZXJzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRcdFx0cGFwZXJzW2ldWydjaXRhdGlvbiddID0gZGJfcGFwZXJzW2ldWydjaXRhdGlvbiddO1xuXHRcdFx0XHRcdHRvb2x0aXBIdG1sID0gdG9vbHRpcEh0bWwgKyAnPGxpPicgKyBwYXBlcnNbaV1bJ2NpdGF0aW9uJ10gKyAnPC9saT4nO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRvb2x0aXBIdG1sID0gdG9vbHRpcEh0bWwgKyAnPC9vbD4nO1xuXG5cdFx0XHRcdGNpdGF0aW9uVmlzLmVnb0dyYXBoVmlzLnRvb2x0aXAgPSBjaXRhdGlvblZpcy5lZ29HcmFwaFZpcy50b29sdGlwLmh0bWwodG9vbHRpcEh0bWwpO1xuXHRcdFx0XHRpZiAoY2FsbGJhY2sgIT0gbnVsbCkge1xuXHRcdFx0XHRcdGNhbGxiYWNrKHRvb2x0aXBIdG1sKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdG9vbHRpcEh0bWw7XG5cblx0XHRcdFx0Lypcblx0XHRcdFx0ZC5UaXRsZSA9IHJlc3VsdFsndGl0bGUnXTtcblx0XHRcdFx0ZC5kb2kgPSByZXN1bHRbJ2RvaSddO1xuXHRcdFx0XHRkLmNpdGF0aW9uID0gcmVzdWx0WydjaXRhdGlvbiddO1xuXHRcdFx0XHRkLnVwZGF0ZWRQcm9wcyA9IHRydWU7XG5cdFx0XHRcdGQudG9vbHRpcEh0bWwgPSAnPHA+JyArIGQuY2l0YXRpb24gKyAnPC9wPic7XG5cdFx0XHRcdGQudG9vbHRpcEh0bWwgPSBkLnRvb2x0aXBIdG1sICsgJzxicj4nO1xuXHRcdFx0XHRkLnRvb2x0aXBIdG1sID0gZC50b29sdGlwSHRtbCArICc8cD5DYXRlZ29yeTogJyArIGQuRG9tYWluTmFtZSArICc8L3A+Jztcblx0XHRcdFx0aWYgKGQuaG92ZXJlZCkge1xuXHRcdFx0XHRcdHNlbGYudGlwLnNob3coZCwgaG92ZXJlZEl0ZW0ubm9kZSgpKTtcblx0XHRcdFx0XHQvLyBzZWxmLnRpcC5zaG93KGQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdCovXG5cblx0XHRcdH1cblx0XHR9KTtcblx0fSAgLy8gZW5kIGVsc2VcblxuXG59XG5cbi8qXG4kKCBkb2N1bWVudCApLm9uKCBcImluaXRDb21wbGV0ZVwiLCBmdW5jdGlvbigpIHtcblx0dmFyIGxpbmVDaGFydHMgPSBjaXRhdGlvblZpcy5saW5lQ2hhcnRzO1xuXHR2YXIgZWdvR3JhcGhWaXMgPSBjaXRhdGlvblZpcy5lZ29HcmFwaFZpcztcblx0dmFyIGVnb1BhcGVycyA9IGNpdGF0aW9uVmlzLmVnb0dyYXBoVmlzLmVnb05vZGUucGFwZXJzO1xuXHRmb3IgKHZhciBpID0gMCwgbGVuID0gbGluZUNoYXJ0cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHRcdHZhciB5ZWFyQXJlYSA9IGxpbmVDaGFydHNbaV0ueWVhckFyZWE7XG5cdFx0eWVhckFyZWEuc3R5bGUoJ3BvaW50ZXItZXZlbnRzJywgJ2FsbCcpXG5cdFx0XHQub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKGQpIHtcblx0XHRcdFx0dmFyIHRoaXNZZWFyUGFwZXJzID0gZWdvUGFwZXJzLmZpbHRlcihmdW5jdGlvbihkZCkge1xuXHRcdFx0XHRcdHJldHVybiBkZC5ZZWFyPT1kLnllYXI7fVxuXHRcdFx0XHRcdClcblx0XHRcdFx0XHQuc29ydChmdW5jdGlvbihhLCBiKSB7IHJldHVybiBkMy5kZXNjZW5kaW5nKGEuRUYsIGIuRUYpOyB9KTtcblx0XHRcdFx0Y29uc29sZS5sb2codGhpc1llYXJQYXBlcnMpO1xuXHRcdFx0XHRpZiAodGhpc1llYXJQYXBlcnMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNpdGF0aW9uVmlzLmVnb0dyYXBoVmlzLnRvb2x0aXAgPSBjaXRhdGlvblZpcy5lZ29HcmFwaFZpcy50b29sdGlwXG5cdFx0XHRcdFx0Lmh0bWwoJzxwPkxvYWRpbmcuLi48L3A+Jylcblx0XHRcdFx0XHQuc3R5bGUoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpXG5cdFx0XHRcdFx0LnN0eWxlKCdib3JkZXItc3R5bGUnLCAnc29saWQnKVxuXHRcdFx0XHRcdC5zdHlsZSgnYm9yZGVyLWNvbG9yJywgY2l0YXRpb25WaXMuZWdvR3JhcGhWaXMuY29sb3JTY2hlbWVbMF0pXG5cdFx0XHRcdFx0LnN0eWxlKCd0b3AnLCAoZDMuZXZlbnQucGFnZVktMjAwKSsncHgnKVxuXHRcdFx0XHRcdC5zdHlsZSgnbGVmdCcsIChkMy5ldmVudC5wYWdlWCsxMCkrJ3B4Jyk7XG5cdFx0XHRcdHZhciB0b29sdGlwSHRtbCA9IG1ha2VIdG1sKGQueWVhciwgdGhpc1llYXJQYXBlcnMsIDMpO1xuXHRcdFx0XHR9KVxuXHRcdFx0Lm9uKCdtb3VzZW91dCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRjaXRhdGlvblZpcy5lZ29HcmFwaFZpcy50b29sdGlwID0gY2l0YXRpb25WaXMuZWdvR3JhcGhWaXMudG9vbHRpcFxuXHRcdFx0XHRcdC5zdHlsZSgndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcblx0XHRcdH0pO1xuXHR9XG5cbn0pO1xuKi9cblxuXG4vLyB0b29sdGlwc3RlciBtZXRob2RcbiQoIGRvY3VtZW50ICkub24oICdpbml0Q29tcGxldGUnLCBmdW5jdGlvbigpIHtcblx0dmFyIHdpbmRvd1dpZHRoID0gJCh3aW5kb3cpLndpZHRoKCk7XG5cblx0bm9kZVRvb2x0aXBzKCk7XG5cdGxlZ2VuZFRvb2x0aXBzKCk7XG5cblx0JCgnLnllYXJBcmVhLCAueWVhclRpY2snKS5jc3MoJ3BvaW50ZXItZXZlbnRzJywgJ2FsbCcpXG5cdFx0LnRvb2x0aXBzdGVyKHtcblx0XHRcdHRoZW1lOiAndG9vbHRpcHN0ZXItbm9pcicsXG5cdFx0XHRtYXhXaWR0aDogd2luZG93V2lkdGggKiAuNSxcblx0XHRcdGFuaW1hdGlvbjogbnVsbCxcblx0XHRcdGFuaW1hdGlvbmR1cmF0aW9uOiAwLFxuXHRcdFx0ZGVsYXk6IDAsXG5cdFx0XHR1cGRhdGVBbmltYXRpb246IG51bGwsXG5cdFx0XHRjb250ZW50OiAnPHA+TG9hZGluZy4uLjwvcD4nLFxuXHRcdFx0Y29udGVudEFzSFRNTDogdHJ1ZSxcblx0XHRcdGZ1bmN0aW9uSW5pdDogZnVuY3Rpb24oKSB7Y29uc29sZS5sb2coJ3Rvb2x0aXBzdGVyIGluaXQnKTt9LFxuXHRcdFx0ZnVuY3Rpb25CZWZvcmU6IGZ1bmN0aW9uKGluc3RhbmNlLCBoZWxwZXIpIHtcblx0XHRcdFx0dmFyICRvcmlnaW4gPSAkKGhlbHBlci5vcmlnaW4pO1xuXHRcdFx0XHR2YXIgeWVhciA9ICRvcmlnaW4uZGF0YSgneWVhcicpO1xuXHRcdFx0XHR2YXIgZWdvUGFwZXJzID0gY2l0YXRpb25WaXMuZWdvR3JhcGhWaXMuZWdvTm9kZS5wYXBlcnM7XG5cdFx0XHRcdHZhciB0aGlzWWVhclBhcGVycyA9IGVnb1BhcGVycy5maWx0ZXIoZnVuY3Rpb24oZGQpIHtcblx0XHRcdFx0XHRyZXR1cm4gZGQuWWVhcj09eWVhcjt9XG5cdFx0XHRcdFx0KVxuXHRcdFx0XHRcdC5zb3J0KGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGQzLmRlc2NlbmRpbmcoYS5FRiwgYi5FRik7IH0pO1xuXHRcdFx0XHRpZiAodGhpc1llYXJQYXBlcnMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHZhciB0b29sdGlwSHRtbCA9IG1ha2VIdG1sKHllYXIsIHRoaXNZZWFyUGFwZXJzLCAzLCBmdW5jdGlvbihodG1sKSB7XG5cdFx0XHRcdFx0aW5zdGFuY2UuY29udGVudChodG1sKTsgXG5cdFx0XHRcdH0pO1xuXHRcdFx0XHQvLyBpbnN0YW5jZS5jb250ZW50KHRvb2x0aXBIdG1sKTtcblx0XHRcdH1cblx0fSk7XG59ICk7XG5cbmZ1bmN0aW9uIG5vZGVUb29sdGlwcygpIHtcblx0Ly8gJCgnLmQzLXRpcCcpLnJlbW92ZSgpO1xuXHQkKCcubm9kZScpLmFkZENsYXNzKCd0b29sdGlwc3RlcicpO1xuXHQvLyAkKCcubm9kZScpLmZpcnN0KCkuYWRkQ2xhc3MoJ2NlbnRlci1ub2RlJyk7XG5cdHZhciB3aW5kb3dXaWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xuXHQkKCcudG9vbHRpcHN0ZXInKS50b29sdGlwc3Rlcih7XG5cdFx0dGhlbWU6ICd0b29sdGlwc3Rlci1ub2lyJyxcblx0XHRtYXhXaWR0aDogd2luZG93V2lkdGggKiAuNSxcblx0XHRhbmltYXRpb246IG51bGwsXG5cdFx0YW5pbWF0aW9uZHVyYXRpb246IDAsXG5cdFx0ZGVsYXk6IDAsXG5cdFx0dXBkYXRlQW5pbWF0aW9uOiBudWxsLFxuXHRcdGNvbnRlbnQ6ICc8cD5Mb2FkaW5nLi4uPC9wPicsXG5cdFx0Y29udGVudEFzSFRNTDogdHJ1ZSxcblx0XHRmdW5jdGlvbkJlZm9yZTogZnVuY3Rpb24oaW5zdGFuY2UsIGhlbHBlcikge1xuXHRcdFx0dmFyIHRvb2x0aXBIdG1sID0gYWpheFBhcGVySW5mbyhoZWxwZXIub3JpZ2luLCBmdW5jdGlvbihodG1sKSB7XG5cdFx0XHRcdGluc3RhbmNlLmNvbnRlbnQoaHRtbCk7IFxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9KTtcblxuXHRmdW5jdGlvbiBhamF4UGFwZXJJbmZvKG5vZGUsIGNhbGxiYWNrKSB7XG5cdFx0Ly8gbm9kZSBpcyB0aGUgRE9NIGVsZW1lbnQgZm9yIGEgbm9kZVxuXHRcdHZhciBodG1sID0gJyc7XG5cdFx0ZDMuc2VsZWN0KG5vZGUpLmVhY2goZnVuY3Rpb24oZCkge1xuXHRcdFx0aWYgKCAoZC5ub2RlVHlwZSA9PT0gJ3BhcGVyJykgJiYgKCFkLnVwZGF0ZWRQcm9wcykgKSB7XG5cdFx0XHRcdGlmICggKHR5cGVvZiBkLmNpdGF0aW9uICE9IFwidW5kZWZpbmVkXCIpICYmIChkLmNpdGF0aW9uLmxlbmd0aD4wKSApIHtcblx0XHRcdFx0XHRodG1sID0gYnlwYXNzQWpheChkKTtcblx0XHRcdFx0XHRpZiAoY2FsbGJhY2sgIT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0Y2FsbGJhY2soaHRtbCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBodG1sXG5cdFx0XHRcdH1cblx0XHRcdFx0JC5hamF4KHtcblx0XHRcdFx0XHRkYXRhVHlwZTogJ2pzb24nLFxuXHRcdFx0XHRcdHVybDogJFNDUklQVF9ST09UICsgJy9fdmlzX2dldF9tb3JlX3BhcGVyaW5mbycsXG5cdFx0XHRcdFx0ZGF0YToge3BhcGVyaWQ6IGQuaWR9LFxuXHRcdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3VsdCkge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2cocmVzdWx0KTtcblx0XHRcdFx0XHRcdGQuVGl0bGUgPSByZXN1bHRbJ3RpdGxlJ107XG5cdFx0XHRcdFx0XHRkLmRvaSA9IHJlc3VsdFsnZG9pJ107XG5cdFx0XHRcdFx0XHRkLmNpdGF0aW9uID0gcmVzdWx0WydjaXRhdGlvbiddO1xuXHRcdFx0XHRcdFx0ZC5hdXRob3Jfc3RyID0gcmVzdWx0WydhdXRob3Jfc3RyJ107XG5cdFx0XHRcdFx0XHRkLnZlbnVlID0gcmVzdWx0Wyd2ZW51ZSddO1xuXHRcdFx0XHRcdFx0ZC51cGRhdGVkUHJvcHMgPSB0cnVlO1xuXHRcdFx0XHRcdFx0Ly8gZC50b29sdGlwSHRtbCA9ICc8cD4nICsgZC5jaXRhdGlvbiArICc8L3A+Jztcblx0XHRcdFx0XHRcdC8vIGQudG9vbHRpcEh0bWwgPSBkLnRvb2x0aXBIdG1sICsgJzxicj4nO1xuXHRcdFx0XHRcdFx0Ly8gZC50b29sdGlwSHRtbCA9IGQudG9vbHRpcEh0bWwgKyAnPHA+Q2F0ZWdvcnk6ICcgKyBkLkRvbWFpbk5hbWUgKyAnPC9wPic7XG5cdFx0XHRcdFx0XHQvLyBpZiAoZC5ob3ZlcmVkKSB7XG5cdFx0XHRcdFx0XHQvLyBcdHNlbGYudGlwLnNob3coZCwgaG92ZXJlZEl0ZW0ubm9kZSgpKTtcblx0XHRcdFx0XHRcdC8vIFx0Ly8gc2VsZi50aXAuc2hvdyhkKTtcblx0XHRcdFx0XHRcdC8vIH1cblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0aHRtbCA9IG1ha2VOb2RlVG9vbHRpcEh0bWwoZCk7XG5cdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2sgIT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0XHRjYWxsYmFjayhodG1sKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJldHVybiBodG1sXG5cblxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2UgaWYgKCBkLmlkeCA9PSAwICkge1xuXHRcdFx0XHRkLnRvb2x0aXBIdG1sID0gJzxwPic7XG5cdFx0XHRcdGlmIChkLm5vZGVUeXBlKSB7XG5cdFx0XHRcdFx0ZC50b29sdGlwSHRtbCA9IGQudG9vbHRpcEh0bWwgKyBkLm5vZGVUeXBlLmNhcGl0YWxpemUoKSArICc6ICc7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZC50b29sdGlwSHRtbCA9IGQudG9vbHRpcEh0bWwgKyBkLm5hbWU7XG5cdFx0XHRcdGQudG9vbHRpcEh0bWwgPSBkLnRvb2x0aXBIdG1sICsgJzwvcD4nO1xuXHRcdFx0XHR2YXIgbnVtYmVyT2ZQdWJzID0gZC5wYXBlcnMubGVuZ3RoO1xuXHRcdFx0XHRkLnRvb2x0aXBIdG1sID0gZC50b29sdGlwSHRtbCArICc8cD5OdW1iZXIgb2YgUHVibGljYXRpb25zOiAnICsgbnVtYmVyT2ZQdWJzICsgJzwvcD4nO1xuXHRcdFx0XHRodG1sID0gZC50b29sdGlwSHRtbDtcblx0XHRcdFx0aWYgKGNhbGxiYWNrICE9IG51bGwpIHtcblx0XHRcdFx0XHRjYWxsYmFjayhodG1sKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0cmV0dXJuIGh0bWw7XG5cdFx0XHR9XG5cblx0XHR9KTtcblx0XHRyZXR1cm4gaHRtbDtcblx0fVxuXG5cdGZ1bmN0aW9uIGJ5cGFzc0FqYXgoZCkge1xuXHRcdGQudXBkYXRlZFByb3BzID0gdHJ1ZTtcblx0XHR2YXIgaHRtbCA9IG1ha2VOb2RlVG9vbHRpcEh0bWwoZCk7XG5cdFx0cmV0dXJuIGh0bWxcblx0fVxuXG5cdGZ1bmN0aW9uIG1ha2VOb2RlVG9vbHRpcEh0bWwoZCkge1xuXHRcdHZhciBzcGFuID0gJCggJzxzcGFuPicgKTtcblx0XHRzcGFuLmFwcGVuZCggJCggJzxwIGNsYXNzPVwidG9vbHRpcCB0aXRsZVwiPicgKS50ZXh0KGQuVGl0bGUpICk7XG5cdFx0c3Bhbi5hcHBlbmQoICQoICc8cCBjbGFzcz1cInRvb2x0aXAgYXV0aG9yc1wiPicgKS50ZXh0KGQuYXV0aG9yX3N0cikgKTtcblx0XHRzcGFuLmFwcGVuZCggJCggJzxwIGNsYXNzPVwidG9vbHRpcCB2ZW51ZVwiPicgKS50ZXh0KGQudmVudWUpICk7XG5cdFx0c3Bhbi5hcHBlbmQoICQoICc8cCBjbGFzcz1cInRvb2x0aXAgeWVhclwiPicgKS50ZXh0KGQuWWVhcikgKTtcblx0XHQvLyBzcGFuLmFwcGVuZCggJCggJzxwIGNsYXNzPVwidG9vbHRpcCBkb21haW5cIj4nICkudGV4dChcIkNhdGVnb3J5OiBcIiArIGQuRG9tYWluTmFtZSkgKTtcblx0XHRzcGFuLmFwcGVuZCggJCggJzxwIGNsYXNzPVwidG9vbHRpcCBkb21haW5cIj4nICkudGV4dChcIkNhdGVnb3JpZXM6IFwiICsgZC5GaWVsZF9vZl9zdHVkeV9uYW1lcykgKTtcblx0XHQvLyBzcGFuLmFwcGVuZCggJCggJzxwIGNsYXNzPVwidG9vbHRpcCBqc19kaXZcIj4nICkudGV4dChcIkpTIERpdmVyZ2VuY2U6IFwiICsgZC5qc19kaXYpICk7XG5cdFx0Ly8gc3Bhbi5hcHBlbmQoICQoICc8cCBjbGFzcz1cInRvb2x0aXAgYXZnX2Rpc3RhbmNlXCI+JyApLnRleHQoXCJBdmVyYWdlIGNsdXN0ZXIgZGlzdGFuY2U6IFwiICsgZC5hdmVyYWdlX2NsdXN0ZXJfZGlzdGFuY2VfdG9fY2VudGVyKSApO1xuXHRcdC8vIHNwYW4uYXBwZW5kKCAkKCAnPHAgY2xhc3M9XCJ0b29sdGlwIGZvc19rbWVhbnNfY2F0ZWdvcnlcIj4nICkudGV4dChcIkZPUyBLbWVhbnMgY2F0ZWdvcnk6IFwiICsgZC5mb3Nfa21lYW5zX2NhdGVnb3J5KSApO1xuXHRcdGQudG9vbHRpcEh0bWwgPSBzcGFuLmh0bWwoKTtcblx0XHR2YXIgaHRtbCA9IGQudG9vbHRpcEh0bWw7XG5cdFx0cmV0dXJuIGh0bWw7XG5cdFx0XG5cdH1cbn1cblxuZnVuY3Rpb24gbGVnZW5kVG9vbHRpcHMoKSB7XG5cdHZhciB3aW5kb3dXaWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xuXHR2YXIgb3RoZXJIdG1sID0gJzxwPlRoZXNlIGFyZSBwYXBlcnMgaW4gY2F0ZWdvcmllcyBvdGhlciB0aGFuIHRoZSBvbmVzIGFib3ZlLiBQb2ludCB5b3VyIG1vdXNlIGF0IGEgc3BlY2lmaWMgcGFwZXIgdG8gc2VlIHRoZSBuYW1lIG9mIHRoZSBjYXRlZ29yeS48L3A+Jztcblx0JCgnLmxlZ2VuZEl0ZW0ub3RoZXInKS50b29sdGlwc3Rlcih7XG5cdFx0dGhlbWU6ICd0b29sdGlwc3Rlci1ub2lyJyxcblx0XHRtYXhXaWR0aDogd2luZG93V2lkdGggKiAuNSxcblx0XHRhbmltYXRpb246IG51bGwsXG5cdFx0YW5pbWF0aW9uZHVyYXRpb246IDAsXG5cdFx0ZGVsYXk6IDAsXG5cdFx0dXBkYXRlQW5pbWF0aW9uOiBudWxsLFxuXHRcdGNvbnRlbnQ6IG90aGVySHRtbCxcblx0XHRjb250ZW50QXNIVE1MOiB0cnVlXG5cdH0pO1xuXG5cdHZhciBoZWFkZXJIdG1sID0gXCI8cD5UaGUgZGF0YSB1bmRlcmx5aW5nIHRoaXMgdmlzdWFsaXphdGlvbiBjb21lcyBmcm9tIHRoZSBNaWNyb3NvZnQgQWNhZGVtaWMgR3JhcGguIEVhY2ggZG9jdW1lbnQgaGFzIG11bHRpcGxlIGFzc29jaWF0ZWQgRmllbGRzIG9mIFN0dWR5LiBIZXJlLCB0aGVzZSBGaWVsZHMgYXJlIGNvbWJpbmVkIHdpdGggdGhlIGRvY3VtZW50J3MgdGl0bGUsIHdlaWdodGVkIHVzaW5nIFRGLUlERiwgYW5kIGFzc2lnbmVkIGEgY2F0ZWdvcnkgdXNpbmcgSy1NZWFucyBjbHVzdGVyaW5nLiBNb3VzZSBvdmVyIHRoZSBjYXRlZ29yaWVzIHRvIGhpZ2hsaWdodCBpdHMgcGFwZXJzLCBhbmQgdG8gc2VlIG1vcmUgaW1wb3J0YW50IHRlcm1zLjwvcD5cIjtcblx0JCgnLmVnb0dyYXBoVmlzTGVnZW5kSGVhZGVyJykudG9vbHRpcHN0ZXIoe1xuXHRcdHRoZW1lOiAndG9vbHRpcHN0ZXItbm9pcicsXG5cdFx0bWF4V2lkdGg6IHdpbmRvd1dpZHRoICogLjUsXG5cdFx0YW5pbWF0aW9uOiBudWxsLFxuXHRcdGFuaW1hdGlvbmR1cmF0aW9uOiAwLFxuXHRcdGRlbGF5OiAwLFxuXHRcdHVwZGF0ZUFuaW1hdGlvbjogbnVsbCxcblx0XHRjb250ZW50OiBoZWFkZXJIdG1sLFxuXHRcdGNvbnRlbnRBc0hUTUw6IHRydWVcblx0fSk7XG5cblx0JCgnLmxlZ2VuZEl0ZW0nKS50b29sdGlwc3Rlcih7XG5cdFx0dGhlbWU6ICd0b29sdGlwc3Rlci1ub2lyJyxcblx0XHRtYXhXaWR0aDogd2luZG93V2lkdGggKiAuNSxcblx0XHRhbmltYXRpb246IG51bGwsXG5cdFx0YW5pbWF0aW9uZHVyYXRpb246IDAsXG5cdFx0ZGVsYXk6IDAsXG5cdFx0dXBkYXRlQW5pbWF0aW9uOiBudWxsLFxuXHRcdGNvbnRlbnQ6ICc8cD5Mb2FkaW5nLi4uPC9wPicsXG5cdFx0Y29udGVudEFzSFRNTDogdHJ1ZSxcblx0XHRmdW5jdGlvbkJlZm9yZTogZnVuY3Rpb24oaW5zdGFuY2UsIGhlbHBlcikge1xuXHRcdFx0dmFyIGxlZ2VuZEl0ZW0gPSBkMy5zZWxlY3QoaGVscGVyLm9yaWdpbik7XG5cdFx0XHRsZWdlbmRJdGVtLmVhY2goZnVuY3Rpb24oZCkge1xuXHRcdFx0XHR2YXIgaHRtbCA9IFwiPGgzPlRvcCB0ZXJtcyBpbiBjYXRlZ29yeSBcIiArIGQuRG9tYWluSUQgKyBcIjo8L2gzPlwiO1xuXHRcdFx0XHRodG1sID0gaHRtbCArIFwiPHVsPlwiXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwLCBsZW4gPSBkLkRvbWFpbk5hbWUubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdFx0XHRodG1sID0gaHRtbCArIFwiPGxpPlwiICsgZC5Eb21haW5OYW1lW2ldICsgXCI8L2xpPlwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGh0bWwgPSBodG1sICsgXCI8L3VsPlwiXG5cdFx0XHRcdGluc3RhbmNlLmNvbnRlbnQoaHRtbCk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH0pO1xuXHRcdH0sXG5cdH0pO1xufVxuXG4vLyAkKCBkb2N1bWVudCApLm9uKCBcImluaXRDb21wbGV0ZVwiLCBmdW5jdGlvbigpIHtcbi8vIFx0dmFyIGVnb0dyYXBoVmlzID0gY2l0YXRpb25WaXMuZWdvR3JhcGhWaXM7XG4vL1xuLy8gXHR2YXIgJGxlZ2VuZFRvZ2dsZUJ1dHRvbiA9ICQoJzxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCJUb2dnbGUgTGVnZW5kXCIgLz4nKTtcbi8vIFx0JGxlZ2VuZFRvZ2dsZUJ1dHRvbi5kYXRhKCd2YWwnLCAwKTtcbi8vIFx0dmFyIG1heFZhbCA9IDM7XG4vL1xuLy8gXHQkKCcjbWFpbkRpdicpLnByZXBlbmQoJGxlZ2VuZFRvZ2dsZUJ1dHRvbik7XG4vL1xuLy8gXHQkbGVnZW5kVG9nZ2xlQnV0dG9uLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuLy8gXHRcdHZhciBjdXJWYWwgPSAkbGVnZW5kVG9nZ2xlQnV0dG9uLmRhdGEoJ3ZhbCcpO1xuLy8gXHRcdGN1clZhbCsrO1xuLy8gXHRcdGlmIChjdXJWYWwgPiBtYXhWYWwpIHtcbi8vIFx0XHRcdGN1clZhbCA9IDA7XG4vLyBcdFx0fVxuLy8gXHRcdCRsZWdlbmRUb2dnbGVCdXR0b24uZGF0YSgndmFsJywgY3VyVmFsKTtcbi8vIFx0XHRzd2l0Y2ggKGN1clZhbCkge1xuLy8gXHRcdFx0Y2FzZSAwOlxuLy8gXHRcdFx0XHRlZ29HcmFwaFZpcy5sZWdlbmQucmVtb3ZlKCk7XG4vLyBcdFx0XHRcdGVnb0dyYXBoVmlzLmxlZ2VuZEluaXQoKVxuLy8gXHRcdFx0XHRcbi8vIFx0XHRcdFx0YnJlYWs7XG4vLyBcdFx0XHRcbi8vIFx0XHRcdGNhc2UgMTpcbi8vIFx0XHRcdFx0ZWdvR3JhcGhWaXMubGVnZW5kVGV4dFxuLy8gXHRcdFx0XHRcdC50ZXh0KGZ1bmN0aW9uKGQpIHtcbi8vIFx0XHRcdFx0XHRcdHZhciBpZHggPSArZC5rZXk7XG4vLyBcdFx0XHRcdFx0XHR2YXIgbmV3VGV4dCA9IGVnb0dyYXBoVmlzLmRhdGEuZ3JhcGguZm9zX2ttZWFuc19jYXRlZ29yaWVzX3RvcGZvc25hbWVzX3RmaWRmW2lkeF07XG4vLyBcdFx0XHRcdFx0XHRyZXR1cm4gbmV3VGV4dDtcbi8vIFx0XHRcdFx0XHR9KTtcbi8vXG4vLyBcdFx0XHRcdGJyZWFrO1xuLy9cbi8vIFx0XHRcdGNhc2UgMjpcbi8vIFx0XHRcdFx0ZWdvR3JhcGhWaXMubGVnZW5kVGV4dFxuLy8gXHRcdFx0XHRcdC50ZXh0KGZ1bmN0aW9uKGQpIHtcbi8vIFx0XHRcdFx0XHRcdHZhciBpZHggPSArZC5rZXk7XG4vLyBcdFx0XHRcdFx0XHR2YXIgbmV3VGV4dCA9IGVnb0dyYXBoVmlzLmRhdGEuZ3JhcGguZm9zX2ttZWFuc19jYXRlZ29yaWVzX3RvcHRpdGxld29yZHNfdGZpZGZbaWR4XTtcbi8vIFx0XHRcdFx0XHRcdHJldHVybiBuZXdUZXh0O1xuLy8gXHRcdFx0XHRcdH0pO1xuLy9cbi8vIFx0XHRcdFx0YnJlYWs7XG4vL1xuLy8gXHRcdFx0Y2FzZSAzOlxuLy8gXHRcdFx0XHRlZ29HcmFwaFZpcy5sZWdlbmRUZXh0XG4vLyBcdFx0XHRcdFx0LnRleHQoZnVuY3Rpb24oZCkge1xuLy8gXHRcdFx0XHRcdFx0dmFyIGlkeCA9ICtkLmtleTtcbi8vIFx0XHRcdFx0XHRcdHZhciBuZXdUZXh0ID0gZWdvR3JhcGhWaXMuZGF0YS5ncmFwaC5mb3Nfa21lYW5zX2NhdGVnb3JpZXNfdG9wdGl0bGV3b3Jkc190ZmlkZl9yZXN0cmljdGVkW2lkeF07XG4vLyBcdFx0XHRcdFx0XHRyZXR1cm4gbmV3VGV4dDtcbi8vIFx0XHRcdFx0XHR9KTtcbi8vXG4vLyBcdFx0XHRcdGJyZWFrO1xuLy8gXHRcdH1cbi8vIFx0fSk7XG4vLyBcdC8vIGVnb0dyYXBoVmlzLmxlZ2VuZFRleHRcbi8vIFx0Ly8gXHQudGV4dCgnZGRkJyk7XG4vLyB9KTtcbi8vXG4vL1xudmFyIGNpdGF0aW9uVmlzID0gY2l0YXRpb25WaXMgfHwge307XG5cbmNpdGF0aW9uVmlzLmRlZmF1bHRfb3B0aW9ucyA9IChmdW5jdGlvbigpIHtcblx0Ly8gRGltZW5zaW9ucyBvZiB0aGUgbGFyZ2VzdCBwYXJ0IG9mIHRoZSB2aXN1YWxpemF0aW9uICh0aGUgZ3JhcGgpXG5cdHZhciBkaW1lbnNpb25zID0ge1xuXHRcdHdpZHRoOiA5NjAsXG5cdFx0aGVpZ2h0OiA1MDBcblx0fTtcblx0Ly8gRGltZW5zaW9ucyBvZiB0aGUgbGluZSBjaGFydHM6XG5cdGRpbWVuc2lvbnMubGluZUNoYXJ0ID0ge1xuXHRcdG1hcmdpbjoge3RvcDogMzAsIHJpZ2h0OiAyMCwgYm90dG9tOiAzMCwgbGVmdDogNTB9XG5cdH07XG5cdGRpbWVuc2lvbnMubGluZUNoYXJ0LndpZHRoID0gZGltZW5zaW9ucy53aWR0aCAqIDMvNCAtIGRpbWVuc2lvbnMubGluZUNoYXJ0Lm1hcmdpbi5sZWZ0IC0gZGltZW5zaW9ucy5saW5lQ2hhcnQubWFyZ2luLnJpZ2h0O1xuXHRkaW1lbnNpb25zLmxpbmVDaGFydC5oZWlnaHQgPSAxMTAgLSBkaW1lbnNpb25zLmxpbmVDaGFydC5tYXJnaW4udG9wIC0gZGltZW5zaW9ucy5saW5lQ2hhcnQubWFyZ2luLmJvdHRvbTtcblxuXG5cdC8vIENvbG9yczpcblx0Ly8gU2VlIGh0dHA6Ly9jb2xvcmJyZXdlcjIub3JnLz90eXBlPXF1YWxpdGF0aXZlJnNjaGVtZT1TZXQxJm49OFxuXHR2YXIgY29sb3JTY2hlbWUgPSBbJ3JnYigyMjgsMjYsMjgpJywncmdiKDU1LDEyNiwxODQpJywncmdiKDc3LDE3NSw3NCknLFxuXHRcdFx0J3JnYigxNTIsNzgsMTYzKScsJ3JnYigyNTUsMTI3LDApJywncmdiKDI1NSwyNTUsNTEpJyxcblx0XHRcdCdyZ2IoMTY2LDg2LDQwKScsJ3JnYigyNDcsMTI5LDE5MSknXTtcblx0Ly8gSSBsaWtlZCB0aGUgYmx1ZSBiZXR0ZXIgZm9yIHRoZSBtYWluIGNvbG9yLCBzbyB0aGUgbmV4dCBsaW5lIGp1c3QgbW92ZXNcblx0Ly8gdGhlIGJsdWUgY29sb3IgKG9yaWdpbmFsbHkgc2VsZi5jb2xvclNjaGVtZVsxXSkgdG8gdGhlIGZyb250IChzZWxmLmNvbG9yU2NoZW1lWzBdKVxuXHRjb2xvclNjaGVtZS5zcGxpY2UoMCwgMCwgY29sb3JTY2hlbWUuc3BsaWNlKDEsIDEpWzBdKTtcblxuXHR2YXIgREVGQVVMVF9PUFRJT05TID0ge1xuXHRcdGNvbG9yU2NoZW1lOiBjb2xvclNjaGVtZSxcblx0XHRkaW1lbnNpb25zOiBkaW1lbnNpb25zXG5cdH07XG5cblx0cmV0dXJuIHtcblx0XHRkZWZhdWx0czogREVGQVVMVF9PUFRJT05TXG5cdH07XG59KCkpO1xudmFyIGNpdGF0aW9uVmlzID0gY2l0YXRpb25WaXMgfHwge307XG5cbmNpdGF0aW9uVmlzLmVnb0dyYXBoRGF0YSA9IChmdW5jdGlvbihtYXhOb2Rlcykge1xuXHRmdW5jdGlvbiBwcmVwYXJlX2Vnb0dyYXBoRGF0YShncmFwaCkge1xuXHRcdGZvciAoaT0wOyBpPGdyYXBoLm5vZGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRncmFwaC5ub2Rlc1tpXS5vbGRJZHggPSBpO1xuXHRcdH1cblx0XHR2YXIgbmV3R3JhcGggPSB7fTtcblx0XHQvLyBDb3B5IHByb3BlcnRpZXMgdG8gbmV3R3JhcGggdGhhdCB3b24ndCBjaGFuZ2U6XG5cdFx0dmFyIHByb3BzVG9Db3B5ID0gWydncmFwaCcsICdkaXJlY3RlZCcsICdtdWx0aWdyYXBoJ107XG5cdFx0Zm9yIChpPTA7IGk8cHJvcHNUb0NvcHkubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBwcm9wID0gcHJvcHNUb0NvcHlbaV07XG5cdFx0XHRpZiAoZ3JhcGguaGFzT3duUHJvcGVydHkocHJvcCkpIHsgbmV3R3JhcGhbcHJvcF0gPSBncmFwaFtwcm9wXTsgfVxuXHRcdH1cblxuXHRcdG5ld0dyYXBoLm5vZGVzID0gW107XG5cdFx0bmV3R3JhcGgubm9kZXMucHVzaChncmFwaC5ub2Rlc1swXSk7XG5cdFx0bmV3R3JhcGgubm9kZXNbMF0uaWR4ID0gMDtcblx0XHQvLyAvLyB0aGlzIGlzIGEgdGVzdDpcblx0XHQvLyBmb3IgKGk9MTA7IGk8MjA7IGkrKykge1xuXHRcdC8vIFx0dmFyIG5ld05vZGUgPSBncmFwaC5ub2Rlc1tpXTtcblx0XHQvLyBcdG5ld05vZGUuaWR4ID0gbmV3R3JhcGgubm9kZXMubGVuZ3RoO1xuXHRcdC8vIFx0bmV3R3JhcGgubm9kZXMucHVzaChuZXdOb2RlKTtcblx0XHQvLyB9XG5cdFx0dmFyIG5vdEVnb05vZGVzID0gW107XG5cdFx0Ly8gRmlsdGVyIG91dCBub2RlcyB0aGF0IGhhdmUgeWVhciBvZiAwXG5cdFx0Zm9yICh2YXIgaT0xOyBpPGdyYXBoLm5vZGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHQvLyBpZiAoIChncmFwaC5ub2Rlc1tpXS5FRiA+IDApICYmIChncmFwaC5ub2Rlc1tpXS5ZZWFyPjApICkge1xuXHRcdFx0aWYgKGdyYXBoLm5vZGVzW2ldLlllYXI+MCkge1xuXHRcdFx0XHRub3RFZ29Ob2Rlcy5wdXNoKGdyYXBoLm5vZGVzW2ldKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Ly8gU3RhcnQgYnkgcmFuZG9taXppbmcgdGhlIG9yZGVyIG9mIGFsbCB0aGUgbm9kZXNcblx0XHRkMy5zaHVmZmxlKG5vdEVnb05vZGVzKTtcblx0XHQvLyBvcmRlciBkZXNjZW5kaW5nIGJ5IEVpZ2VuZmFjdG9yXG5cdFx0Ly8gbm90RWdvTm9kZXMuc29ydChmdW5jdGlvbihhLGIpIHsgcmV0dXJuIGIuRUYgLSBhLkVGOyB9KTtcblx0XHRub3RFZ29Ob2Rlcy5zb3J0KGZ1bmN0aW9uKGEsYikgeyByZXR1cm4gZDMuZGVzY2VuZGluZyhhLkVGLCBiLkVGKTsgfSk7XG5cdFx0Ly8gLy8gSSBkb24ndCB3YW50IHRvIHJlbW92ZSBhbnkgbm9kZXMgdGhhdCBoYXZlIGEgZGlmZmVyZW50IERvbWFpbklEIHRoYW4gdGhlIGVnbyxcblx0XHQvLyAvLyBzbyBJJ2xsIG1vdmUgdGhvc2UgdG8gdGhlIGZyb250IHRvIHByb3RlY3QgdGhlbS5cblx0XHQvLyAvLyBBQ1RVQUxMWSB0aGVyZSBhcmUgdG9vIG1hbnkgdG8gZG8gdGhpc1xuXHRcdC8vIHZhciBlZ29Eb21haW4gPSBncmFwaC5ub2Rlc1swXS5Eb21haW5Db3VudHNbMF0ua2V5OyAgLy8gVGhpcyBpcyB0aGUgbW9zdCBjb21tb24gZG9tYWluIGlkIGZvciB0aGUgZWdvIGF1dGhvcidzIHBhcGVyc1xuXHRcdC8vIHZhciBjID0gW107XG5cdFx0Ly8gZm9yICh2YXIgaT0wOyBpPG5vdEVnb05vZGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Ly8gXHRpZiAoIG5vdEVnb05vZGVzW2ldLkRvbWFpbklEICE9IGVnb0RvbWFpbiApIHtcblx0XHQvLyBcdFx0Yy5wdXNoKG5vdEVnb05vZGVzW2ldLkRvbWFpbklEKTtcblx0XHQvLyBcdFx0bm90RWdvTm9kZXMuc3BsaWNlKDAsIDAsIG5vdEVnb05vZGVzLnNwbGljZShpLCAxKVswXSk7XG5cdFx0Ly8gXHR9XG5cdFx0Ly8gfVxuXHRcdC8vIE1vdmUgcGFwZXJzIHRoYXQgaGF2ZSBhIERvbWFpbklEIHRvIHRoZSBmcm9udFxuXHRcdGZ1bmN0aW9uIERvbWFpbklEVG9Gcm9udChhcnIpIHtcblx0XHRcdHZhciBoYXNEb21haW5JRCA9IFtdO1xuXHRcdFx0dmFyIG5vRG9tYWluSUQgPSBbXTtcblx0XHRcdGZvciAodmFyIGkgPSAwLCBsZW4gPSBhcnIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdFx0aWYgKCBhcnJbaV0uRG9tYWluSUQgIT0gMCApIHtcblx0XHRcdFx0XHRoYXNEb21haW5JRC5wdXNoKGFycltpXSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0bm9Eb21haW5JRC5wdXNoKGFycltpXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGNvbnNvbGUubG9nKGFycik7XG5cdFx0XHR2YXIgbmV3QXJyID0gaGFzRG9tYWluSUQuY29uY2F0KG5vRG9tYWluSUQpO1xuXHRcdFx0Y29uc29sZS5sb2cobmV3QXJyKTtcblx0XHRcdHJldHVybiBuZXdBcnI7XG5cdFx0fVxuXHRcdG5vdEVnb05vZGVzID0gRG9tYWluSURUb0Zyb250KG5vdEVnb05vZGVzKTtcblx0XHQvLyBmb3IgKHZhciBpID0gbm90RWdvTm9kZXMubGVuZ3RoLTE7IGk+PTA7IGktLSkge1xuXHRcdC8vIFx0aWYgKCBub3RFZ29Ob2Rlc1tpXS5Eb21haW5JRCAhPSAwICkge1xuXHRcdC8vIFx0XHRub3RFZ29Ob2Rlcy5zcGxpY2UoMCwgMCwgbm90RWdvTm9kZXMuc3BsaWNlKGksIDEpWzBdKTtcblx0XHQvLyBcdH1cblx0XHQvLyB9XG5cdFx0Ly8gY29uc29sZS5sb2coYyk7XG5cdFx0Ly8gVGFrZSB0aGUgZmlyc3QgbiBpdGVtcywgd2hlcmUgbiA9IG1heE5vZGVzXG5cdFx0Ly8gY29uc29sZS5sb2cobWF4Tm9kZXMpO1xuXHRcdGlmICh0eXBlb2YgbWF4Tm9kZXMgPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHZhciBtYXhOb2RlcyA9IDI3NDsgIC8vIFRPRE86IGltcGxlbWVudCB0aGlzIGJldHRlciAoc28gaXQncyBub3QgaGFyZCBjb2RlZCBoZXJlKVxuXHRcdH1cblx0XHQvLyB2YXIgbWF4Tm9kZXMgPSA1MDAwOyAgLy8gVE9ETzogaW1wbGVtZW50IHRoaXMgYmV0dGVyIChzbyBpdCdzIG5vdCBoYXJkIGNvZGVkIGhlcmUpXG5cdFx0aWYgKG5vdEVnb05vZGVzLmxlbmd0aCA+IG1heE5vZGVzKSB7XG5cdFx0XHQvLyBzZWxmLmFsbE5vZGVzID0gc2VsZi5hbGxOb2Rlcy5zbGljZSgwLCBzZWxmLmdyYXBoUGFyYW1zLm1heE5vZGVzLnZhbHVlKTtcblx0XHRcdG5vdEVnb05vZGVzID0gbm90RWdvTm9kZXMuc2xpY2UoMCwgbWF4Tm9kZXMpO1xuXHRcdH1cbiAgICAgICAgLy8gc29ydCBieSBZZWFyXG4gICAgICAgIC8vIHRoZW4gc29ydCBieSBFRiAoc2l6ZSkgc28gdGhhdCBsYXJnZXIgbm9kZXMgdGVuZCB0byBhcHBlYXIgZmlyc3QuXG4gICAgICAgIC8vICh0aGlzIHNvbWV3aGF0IHJlZHVjZXMgdGhlIHByb2JsZW0gb2Ygc2VuZGluZyBvdXQgXG4gICAgICAgIC8vIGxpbmtzIHRvIG5vZGVzIHRoYXQgaGF2ZW4ndCBhcHBlYXJlZCB5ZXQuXG4gICAgICAgIC8vIG1heWJlIHRyeSBhIGJldHRlciBzb2x1dGlvbiBsYXRlci4pXG5cdFx0bm90RWdvTm9kZXMuc29ydChmdW5jdGlvbihhLGIpIHtcblx0XHRcdHJldHVybiBkMy5hc2NlbmRpbmcoYS5ZZWFyLCBiLlllYXIpIHx8IGQzLmRlc2NlbmRpbmcoYS5FRiwgYi5FRik7XG5cdFx0fSk7XG5cblx0XHQvLyBBcHBlbmQgdGhlc2UgdG8gbmV3R3JhcGgubm9kZXNcblx0XHRmb3IgKGk9MDsgaTxub3RFZ29Ob2Rlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIG5ld05vZGUgPSBub3RFZ29Ob2Rlc1tpXTtcblx0XHRcdG5ld05vZGUuaWR4ID0gbmV3R3JhcGgubm9kZXMubGVuZ3RoO1xuXHRcdFx0bmV3R3JhcGgubm9kZXMucHVzaChuZXdOb2RlKTtcblx0XHR9XG5cblx0XHRuZXdHcmFwaC5saW5rcyA9IHJlY2FsY3VsYXRlTGlua3MobmV3R3JhcGgubm9kZXMsIGdyYXBoLmxpbmtzKTtcblxuXHRcdGZ1bmN0aW9uIHJlY2FsY3VsYXRlTGlua3Mobm9kZXMsIGxpbmtzKSB7XG5cdFx0XHR2YXIgbmV3TGlua3MgPSBbXTtcblx0XHRcdGZvciAoaT0wOyBpPGxpbmtzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHZhciB0aGlzU291cmNlID0gbm9kZXMuZmlsdGVyKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQub2xkSWR4ID09PSBsaW5rc1tpXS5zb3VyY2U7IH0pO1xuXHRcdFx0XHR2YXIgdGhpc1RhcmdldCA9IG5vZGVzLmZpbHRlcihmdW5jdGlvbihkKSB7IHJldHVybiBkLm9sZElkeCA9PT0gbGlua3NbaV0udGFyZ2V0OyB9KTtcblx0XHRcdFx0aWYgKCB0aGlzU291cmNlLmxlbmd0aD4wICYmIHRoaXNUYXJnZXQubGVuZ3RoPjAgKSB7XG5cdFx0XHRcdFx0aWYgKCAodGhpc1RhcmdldFswXS5ub2RlVHlwZSA9PT0gJ3BhcGVyJykgJiYgKHRoaXNTb3VyY2VbMF0uWWVhciA8IHRoaXNUYXJnZXRbMF0uWWVhcikgKSB7XG5cdFx0XHRcdFx0XHQvLyBleGNsdWRlIHRoZSBsaW5rIGluIHRoaXMgY2FzZSAoaS5lLiBpZiB0aGUgc291cmNlIHllYXIgaXMgbGVzcyB0aGFuIHRoZSB0YXJnZXQgeWVhclxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR2YXIgbmV3TGluayA9IGxpbmtzW2ldO1xuXHRcdFx0XHRcdFx0bmV3TGluay5zb3VyY2UgPSB0aGlzU291cmNlWzBdLmlkeDtcblx0XHRcdFx0XHRcdG5ld0xpbmsudGFyZ2V0ID0gdGhpc1RhcmdldFswXS5pZHg7XG5cdFx0XHRcdFx0XHRuZXdMaW5rcy5wdXNoKGxpbmtzW2ldKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG5ld0xpbmtzLmZvckVhY2goZnVuY3Rpb24oZCkge1xuXHRcdFx0XHRpZiAoIHR5cGVvZiBkLnRhcmdldCAhPSAnbnVtYmVyJyApIGNvbnNvbGUubG9nKGQpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybiBuZXdMaW5rcztcblx0XHR9XG5cblx0XHR2YXIgeWVhclJhbmdlID0gbmV3R3JhcGguZ3JhcGgueWVhclJhbmdlO1xuXHRcdGZ1bmN0aW9uIGdldE5vZGVDb3VudHNQZXJZZWFyKG5vZGVzLCB5ZWFyUmFuZ2UpIHtcblx0XHRcdHZhciB5ZWFyc05lc3QgPSBkMy5uZXN0KClcblx0XHRcdFx0LmtleShmdW5jdGlvbihkKSB7IHJldHVybiBkLlllYXI7IH0pLnNvcnRLZXlzKGQzLmFzY2VuZGluZylcblx0XHRcdFx0LnJvbGx1cChmdW5jdGlvbihsZWF2ZXMpIHsgcmV0dXJuIGxlYXZlcy5sZW5ndGg7IH0pXG5cdFx0XHRcdC8vIC5lbnRyaWVzKG5vZGVzLnNsaWNlKDEpKTsgIC8vIGFsbCBleGNlcHQgZWdvIG5vZGUgKG5vZGVbMF0pXG5cdFx0XHRcdC5tYXAobm9kZXMuc2xpY2UoMSkpO1xuXG5cdFx0XHR2YXIgbm9kZUNvdW50c1BlclllYXIgPSB7fTtcblx0XHRcdGZvciAodmFyIGk9eWVhclJhbmdlWzBdOyBpPD15ZWFyUmFuZ2VbMV07IGkrKykge1xuXHRcdFx0XHR2YXIgY291bnRUaGlzWWVhciA9IHllYXJzTmVzdFtpXTtcblx0XHRcdFx0aWYgKHR5cGVvZiBjb3VudFRoaXNZZWFyID09PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdG5vZGVDb3VudHNQZXJZZWFyW2ldID0gMDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRub2RlQ291bnRzUGVyWWVhcltpXSA9IGNvdW50VGhpc1llYXI7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBub2RlQ291bnRzUGVyWWVhcjtcblx0XHR9XG5cdFx0bmV3R3JhcGguZ3JhcGgubm9kZUNvdW50c1BlclllYXIgPSBnZXROb2RlQ291bnRzUGVyWWVhcihuZXdHcmFwaC5ub2RlcywgeWVhclJhbmdlKTtcblxuXG5cdFx0cmV0dXJuIG5ld0dyYXBoO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRwcmVwYXJlX2Vnb0dyYXBoRGF0YTogcHJlcGFyZV9lZ29HcmFwaERhdGFcblx0fTtcbn0oKSk7XG5cbnZhciBjaXRhdGlvblZpcyA9IGNpdGF0aW9uVmlzIHx8IHt9O1xuXG5jaXRhdGlvblZpcy5ldmVudExpc3RlbmVycyA9IChmdW5jdGlvbigpIHtcblx0Ly8gRXZlbnQgbGlzdGVuZXJzIHRoYXQgYWN0IGFjcm9zcyBkaWZmZXJlbnQgdmlzdWFsaXphdGlvbiBvYmplY3RzIGdvIGhlcmVcblx0XG5cdC8vIGZ1bmN0aW9uIHRvb2x0aXBMaXN0ZW5lcigpIHtcblx0Ly8gXHQvLyBBZGQgZXZlbnQgbGlzdGVuZXIgdG8gbm9kZXMgZm9yIHRvb2x0aXA6XG5cdC8vIFx0ZDMuc2VsZWN0QWxsKCcubm9kZScpXG5cdC8vIFx0XHQub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKGQpIHtcblx0Ly8gXHRcdFx0dmFyIHRvb2x0aXBIdG1sID0gc2VsZi5tYWtlVG9vbHRpcChkKTtcblx0Ly8gXHRcdFx0c2VsZi50b29sdGlwID0gc2VsZi50b29sdGlwXG5cdC8vIFx0XHRcdFx0Lmh0bWwodG9vbHRpcEh0bWwpXG5cdC8vIFx0XHRcdFx0LnN0eWxlKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKVxuXHQvLyBcdFx0XHRcdC5zdHlsZSgnYm9yZGVyLXN0eWxlJywgJ3NvbGlkJylcblx0Ly8gXHRcdFx0XHQuc3R5bGUoJ2JvcmRlci1jb2xvcicsIGQuY29sb3IpO1xuXHQvLyBcdFx0fSlcblx0Ly8gXHRcdC5vbignbW91c2Vtb3ZlJywgZnVuY3Rpb24oKSB7XG5cdC8vIFx0XHRcdHNlbGYudG9vbHRpcCA9IHNlbGYudG9vbHRpcFxuXHQvLyBcdFx0XHRcdC5zdHlsZSgndmlzaWJpbGl0eScsICd2aXNpYmxlJylcblx0Ly8gXHRcdFx0XHQuc3R5bGUoJ3RvcCcsIChkMy5ldmVudC5wYWdlWS0xMCkrJ3B4Jylcblx0Ly8gXHRcdFx0XHQuc3R5bGUoJ2xlZnQnLCAoZDMuZXZlbnQucGFnZVgrMTApKydweCcpO1xuXHQvLyBcdFx0fSlcblx0Ly8gXHRcdC5vbignbW91c2VvdXQnLCBmdW5jdGlvbigpIHtcblx0Ly8gXHRcdFx0c2VsZi50b29sdGlwID0gc2VsZi50b29sdGlwLnN0eWxlKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpOyB9KTtcblx0Ly8gfVxuXG5cdHJldHVybiB7XG5cdFx0Ly8gdG9vbHRpcExpc3RlbmVyOiB0b29sdGlwTGlzdGVuZXJcblx0fTtcbn0oKSk7XG52YXIgY2l0YXRpb25WaXMgPSBjaXRhdGlvblZpcyB8fCB7fTtcblxuY2l0YXRpb25WaXMubGluZUNoYXJ0RGF0YSA9IChmdW5jdGlvbigpIHtcblx0Ly8gVGFrZSBpbiBncmFwaCBkYXRhIGFuZCBwcmVwYXJlIGl0IGZvciBsaW5lIGNoYXJ0c1xuXHRcblx0ZnVuY3Rpb24gZ2V0UGV3Q2xhc3NZZWFyKGdyYXBoKSB7XG5cdFx0dmFyIGVnb05vZGUgPSBncmFwaC5ub2Rlc1swXTtcblx0XHRyZXR1cm4gZWdvTm9kZS5wZXdfQ2xhc3M7XG5cdH1cblxuXHRmdW5jdGlvbiBnZXRGdW5kaW5nKGdyYXBoKSB7XG5cdFx0dmFyIGVnb05vZGUgPSBncmFwaC5ub2Rlc1swXTtcblx0XHRyZXR1cm4gZWdvTm9kZS5mdW5kaW5nO1xuXHR9XG5cblx0ZnVuY3Rpb24gY2xlYW5MaW5rcyhsaW5rcykge1xuXHRcdHZhciBjbGVhbmVkTGlua3MgPSBbXTtcblx0XHRsaW5rcy5mb3JFYWNoKGZ1bmN0aW9uKGQpIHtcblx0XHRcdGlmICggKHR5cGVvZiBkLmxpbmtUb0VnbyAhPSAndW5kZWZpbmVkJykgJiYgKGQubGlua1RvRWdvID09PSB0cnVlKSApIHtcblx0XHRcdFx0dmFyIHNvdXJjZVllYXIgPSArZC5zb3VyY2VZZWFyO1xuXHRcdFx0XHR2YXIgdGFyZ2V0WWVhciA9ICtkLnRhcmdldFllYXI7XG5cdFx0XHRcdGlmICggKHNvdXJjZVllYXIgPiAwKSAmJiAodGFyZ2V0WWVhciA+IDApICYmIChzb3VyY2VZZWFyID49IHRhcmdldFllYXIpICkge1xuXHRcdFx0XHRcdGNsZWFuZWRMaW5rcy5wdXNoKGQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIGNsZWFuZWRMaW5rcztcblx0fVxuXG5cdGZ1bmN0aW9uIGdldFllYXJSYW5nZShjbGVhbmVkTGlua3MpIHtcblx0XHQvLyBNYWtlIHN1cmUgYWxsIG91ciBkYXRhIGZhbGwgd2l0aGluIHRoZSBhcHByb3ByaWF0ZSB0aW1lIHNwYW4uXG5cdFx0Ly8gVGhlIG1pbmltdW0geWVhciBpcyB0aGUgZWFybGllc3QgcHVibGljYXRpb24gYnkgdGhlIGVnbyBhdXRob3IgKHRoZXJlIHdpbGwgbGlrZWx5IGJlIG5vIGNpdGF0aW9ucyB3aXRoaW4gdGhpcyB5ZWFyLCBidXQgdGhpcyBjaGFydCBuZWVkcyB0byBsaW5lIHVwIHdpdGggdGhlIG90aGVyIGNoYXJ0cykuXG5cdFx0Ly8gVGhlIG1heGltdW0geWVhciBpcyB0aGUgbGFzdCB5ZWFyIHRoYXQgYSBwYXBlciBjaXRlZCBvbmUgb2YgdGhlIGVnbyBhdXRob3IncyBwYXBlciAoY2hlY2tpbmcgdG8gbWFrZSBzdXJlIGl0IGlzIG5vdCBpbiB0aGUgZnV0dXJlLCB3aGljaCB3b3VsZCBtZWFuIGJhZCBkYXRhKS5cblx0XHR2YXIgbWluWWVhciA9IGQzLm1pbihjbGVhbmVkTGlua3MsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQudGFyZ2V0WWVhcj4wID8gZC50YXJnZXRZZWFyIDogbnVsbDsgfSk7XG5cdFx0Ly8gR2V0IGN1cnJlbnQgeWVhciAodXNpbmcgdG9kYXkncyBkYXRlKTpcblx0XHR2YXIgdG9kYXlZZWFyID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xuXHRcdHZhciBtYXhZZWFyID0gZDMubWF4KGNsZWFuZWRMaW5rcywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5zb3VyY2VZZWFyPD10b2RheVllYXIgPyBkLnNvdXJjZVllYXIgOiBudWxsOyB9KTtcblxuXHRcdC8vIGN1dG9mZiBhdCAyMDE1XG5cdFx0bWF4WWVhciA9IE1hdGgubWluKG1heFllYXIsIDIwMTUpO1xuXG5cdFx0cmV0dXJuIFttaW5ZZWFyLCBtYXhZZWFyXTtcblx0fVxuXG5cdGZ1bmN0aW9uIGdldEVtcHR5Q291bnREYXRhKHllYXJSYW5nZSkge1xuXHRcdHZhciBlbXB0eUNvdW50RGF0YSA9IFtdO1xuXHRcdGZvciAodmFyIGk9eWVhclJhbmdlWzBdOyBpPD15ZWFyUmFuZ2VbMV07IGkrKykge1xuXHRcdFx0ZW1wdHlDb3VudERhdGEucHVzaCh7eWVhcjogaSwgY291bnQ6IDB9KTtcblx0XHR9XG5cdFx0cmV0dXJuIGVtcHR5Q291bnREYXRhO1xuXHR9XG5cblx0ZnVuY3Rpb24gcHJlcGFyZURhdGFfYWxsQ2l0YXRpb25zKGdyYXBoKSB7XG5cdFx0Ly8gdmFyIGRhdGEgPSB7fTtcblx0XHR2YXIgZGF0YSA9IHt9O1xuXHRcdGRhdGFbJ3Bld19DbGFzcyddID0gZ2V0UGV3Q2xhc3NZZWFyKGdyYXBoKTtcblx0XHRkYXRhWydmdW5kaW5nJ10gPSBnZXRGdW5kaW5nKGdyYXBoKTtcblx0XHRkYXRhWyd2YWx1ZXMnXSA9IFtdO1xuXG5cdFx0dmFyIGNsZWFuZWRMaW5rcyA9IGNsZWFuTGlua3MoZ3JhcGgubGlua3MpO1xuXHRcdHZhciB5ZWFyUmFuZ2UgPSBnZXRZZWFyUmFuZ2UoY2xlYW5lZExpbmtzKTtcblx0XHRjbGVhbmVkTGlua3MgPSBjbGVhbmVkTGlua3MuZmlsdGVyKGZ1bmN0aW9uKGQpIHtcblx0XHRcdHJldHVybiBkLnNvdXJjZVllYXIgPD0geWVhclJhbmdlWzFdICYmIGQudGFyZ2V0WWVhciA8PSB5ZWFyUmFuZ2VbMV07XG5cdFx0fSk7XG5cblx0XHQvLyBmb3IgKHZhciBpPXllYXJSYW5nZVswXTsgaTw9eWVhclJhbmdlWzFdOyBpKyspIHtcblx0XHQvLyBcdC8vIGRhdGFbaV0gPSAwO1xuXHRcdC8vIFx0ZGF0YS5wdXNoKHt5ZWFyOiBpLCBjb3VudDogMH0pO1xuXHRcdC8vIH1cblx0XHQvLyBjbGVhbmVkTGlua3MuZm9yRWFjaChmdW5jdGlvbihkKSB7XG5cdFx0Ly8gXHRkYXRhW2Quc291cmNlWWVhcl0rKztcblx0XHQvLyB9KTtcblx0XHRkYXRhLnZhbHVlcyA9IGdldEVtcHR5Q291bnREYXRhKHllYXJSYW5nZSk7XG5cdFx0Y2xlYW5lZExpbmtzLmZvckVhY2goZnVuY3Rpb24oZCkge1xuXHRcdFx0dmFyIHRoaXNTb3VyY2VZZWFyID0gZC5zb3VyY2VZZWFyO1xuXHRcdFx0dmFyIGRhdGFUaGlzWWVhciA9IGRhdGEudmFsdWVzLmZpbHRlcihmdW5jdGlvbihkZCkgeyByZXR1cm4gZGQueWVhcj09PXRoaXNTb3VyY2VZZWFyOyB9KVswXTtcblx0XHRcdGRhdGFUaGlzWWVhci5jb3VudCsrO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIGRhdGE7XG5cdH1cblxuXHRmdW5jdGlvbiBwcmVwYXJlRGF0YV9lZ29BdXRob3JQdWJsaWNhdGlvbnMoZ3JhcGgpIHtcblx0XHR2YXIgZGF0YSA9IHt9O1xuXHRcdGRhdGFbJ3Bld19DbGFzcyddID0gZ2V0UGV3Q2xhc3NZZWFyKGdyYXBoKTtcblx0XHRkYXRhWydmdW5kaW5nJ10gPSBnZXRGdW5kaW5nKGdyYXBoKTtcblx0XHRkYXRhWyd2YWx1ZXMnXSA9IFtdO1xuXG5cdFx0dmFyIGNsZWFuZWRMaW5rcyA9IGNsZWFuTGlua3MoZ3JhcGgubGlua3MpO1xuXHRcdHZhciB5ZWFyUmFuZ2UgPSBnZXRZZWFyUmFuZ2UoY2xlYW5lZExpbmtzKTtcblx0XHRkYXRhLnZhbHVlcyA9IGdldEVtcHR5Q291bnREYXRhKHllYXJSYW5nZSk7XG5cdFx0dmFyIGVnb1BhcGVycyA9IGdyYXBoLm5vZGVzWzBdLnBhcGVycztcblx0XHRlZ29QYXBlcnMgPSBlZ29QYXBlcnMuZmlsdGVyKGZ1bmN0aW9uKGQpIHtcblx0XHRcdHJldHVybiAoIChkLlllYXIgPj0geWVhclJhbmdlWzBdKSAmJiAoZC5ZZWFyIDw9IHllYXJSYW5nZVsxXSkgKTtcblx0XHR9KVxuXHRcdGVnb1BhcGVycy5mb3JFYWNoKGZ1bmN0aW9uKGQpIHtcblx0XHRcdHZhciBkYXRhVGhpc1llYXIgPSBkYXRhLnZhbHVlcy5maWx0ZXIoZnVuY3Rpb24oZGQpIHsgcmV0dXJuIGRkLnllYXI9PWQuWWVhcjsgfSlbMF07XG5cdFx0XHRkYXRhVGhpc1llYXIuY291bnQrKztcblx0XHR9KTtcblxuXHRcdHJldHVybiBkYXRhO1xuXHR9XG5cblx0ZnVuY3Rpb24gcHJlcGFyZURhdGFfYXV0aG9yRWlnZW5mYWN0b3JTdW0oZ3JhcGgpIHtcblx0XHQvLyBGb3IgZWFjaCB5ZWFyLCBzdW0gdGhlIGVpZ2VuZmFjdG9yIChFRikgb2YgdGhlIGVnbyBhdXRob3IncyBwYXBlcidzXG5cdFx0dmFyIGRhdGEgPSB7fTtcblx0XHRkYXRhWydwZXdfQ2xhc3MnXSA9IGdldFBld0NsYXNzWWVhcihncmFwaCk7XG5cdFx0ZGF0YVsnZnVuZGluZyddID0gZ2V0RnVuZGluZyhncmFwaCk7XG5cdFx0ZGF0YVsndmFsdWVzJ10gPSBbXTtcblxuXHRcdHZhciBjbGVhbmVkTGlua3MgPSBjbGVhbkxpbmtzKGdyYXBoLmxpbmtzKTtcblx0XHR2YXIgeWVhclJhbmdlID0gZ2V0WWVhclJhbmdlKGNsZWFuZWRMaW5rcyk7XG5cdFx0ZGF0YS52YWx1ZXMgPSBnZXRFbXB0eUNvdW50RGF0YSh5ZWFyUmFuZ2UpO1xuXHRcdHZhciBlZ29QYXBlcnMgPSBncmFwaC5ub2Rlc1swXS5wYXBlcnM7XG5cdFx0ZWdvUGFwZXJzID0gZWdvUGFwZXJzLmZpbHRlcihmdW5jdGlvbihkKSB7XG5cdFx0XHRyZXR1cm4gKCAoZC5ZZWFyID49IHllYXJSYW5nZVswXSkgJiYgKGQuWWVhciA8PSB5ZWFyUmFuZ2VbMV0pICk7XG5cdFx0fSlcblx0XHRlZ29QYXBlcnMuZm9yRWFjaChmdW5jdGlvbihkKSB7XG5cdFx0XHR2YXIgZGF0YVRoaXNZZWFyID0gZGF0YS52YWx1ZXMuZmlsdGVyKGZ1bmN0aW9uKGRkKSB7IHJldHVybiBkZC55ZWFyPT1kLlllYXI7IH0pWzBdO1xuXHRcdFx0ZGF0YVRoaXNZZWFyLmNvdW50ID0gZGF0YVRoaXNZZWFyLmNvdW50ICsgZC5FRjtcblx0XHR9KTtcblxuXHRcdHJldHVybiBkYXRhO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRwcmVwYXJlRGF0YV9hbGxDaXRhdGlvbnM6IHByZXBhcmVEYXRhX2FsbENpdGF0aW9ucyxcblx0XHRwcmVwYXJlRGF0YV9lZ29BdXRob3JQdWJsaWNhdGlvbnM6IHByZXBhcmVEYXRhX2Vnb0F1dGhvclB1YmxpY2F0aW9ucyxcblx0XHRwcmVwYXJlRGF0YV9hdXRob3JFaWdlbmZhY3RvclN1bTogcHJlcGFyZURhdGFfYXV0aG9yRWlnZW5mYWN0b3JTdW1cblx0fTtcbn0oKSk7XG5cblxuLy8gaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9zbmlwcGV0cy9qYXZhc2NyaXB0L2dldC11cmwtdmFyaWFibGVzL1xuZnVuY3Rpb24gZ2V0UXVlcnlWYXJpYWJsZSh2YXJpYWJsZSlcbntcbiAgICB2YXIgcXVlcnkgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKTtcbiAgICB2YXIgdmFycyA9IHF1ZXJ5LnNwbGl0KFwiJlwiKTtcbiAgICBmb3IgKHZhciBpPTA7IGk8dmFycy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcGFpciA9IHZhcnNbaV0uc3BsaXQoXCI9XCIpO1xuICAgICAgICBpZihwYWlyWzBdID09IHZhcmlhYmxlKSB7cmV0dXJuIHBhaXJbMV07fVxuICAgIH1cbiAgICByZXR1cm4oZmFsc2UpO1xufVxuXG52YXIgY2l0YXRpb25WaXMgPSBjaXRhdGlvblZpcyB8fCB7fTtcblxuY2l0YXRpb25WaXMuZ2V0VHJhbnNpdGlvblRpbWVQZXJZZWFyPSBmdW5jdGlvbihncmFwaCwgbG9uZ2VzdFllYXJUcmFuc2l0aW9uVGltZSkge1xuXHRjb25zb2xlLmxvZyhncmFwaCk7XG5cdC8vIFRoaXMgd2lsbCBsZXQgdXMgdmFyeSB0aGUgdHJhbnNpdGlvbiB0aW1lIHBlciB5ZWFyXG5cdHZhciB0cmFuc2l0aW9uVGltZVBlclllYXIgPSB7fTtcblx0dmFyIGVtcHR5WWVhclRyYW5zaXRpb25UaW1lID0gMzAwO1xuXHQvLyB2YXIgbG9uZ2VzdFllYXJUcmFuc2l0aW9uVGltZSA9IDQwMDA7XG5cdC8vIFNldCBkZWZhdWx0IHZhbHVlOlxuXHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzg5NDg2MC9zZXQtYS1kZWZhdWx0LXBhcmFtZXRlci12YWx1ZS1mb3ItYS1qYXZhc2NyaXB0LWZ1bmN0aW9uXG5cdHZhciBsb25nZXN0WWVhclRyYW5zaXRpb25UaW1lID0gdHlwZW9mIGxvbmdlc3RZZWFyVHJhbnNpdGlvblRpbWUgIT09ICd1bmRlZmluZWQnID8gbG9uZ2VzdFllYXJUcmFuc2l0aW9uVGltZSA6IDQwMDA7XG5cdC8vIFRoaXMgc2NhbGUgdGFrZXMgdGhlIG51bWJlciBvZiBub2RlcyBmb3IgYSBnaXZlbiB5ZWFyIGFzIGlucHV0XG5cdC8vIGFuZCBvdXRwdXRzIHRoZSB0cmFuc2l0aW9uIHRpbWUsIGJhc2VkIG9uIGEgdGhyZXNob2xkIG1hcHBpbmdcblx0dmFyIHRocmVzaG9sZFNjYWxlID0gZDMuc2NhbGUudGhyZXNob2xkKClcblx0XHQuZG9tYWluKFsxLCAzLCAxMCwgMjAsIDMwXSlcblx0XHQucmFuZ2UoW1xuXHRcdFx0XHRlbXB0eVllYXJUcmFuc2l0aW9uVGltZSwgIC8vIHplcm8gbm9kZXNcblx0XHRcdFx0bG9uZ2VzdFllYXJUcmFuc2l0aW9uVGltZSAqIC4yLCAgLy8gb25lIG9yIHR3byBub2Rlc1xuXHRcdFx0XHRsb25nZXN0WWVhclRyYW5zaXRpb25UaW1lICogLjUsIC8vIDMgdG8gOVxuXHRcdFx0XHRsb25nZXN0WWVhclRyYW5zaXRpb25UaW1lICogLjcsICAvLyAxMCB0byAxOVxuXHRcdFx0XHRsb25nZXN0WWVhclRyYW5zaXRpb25UaW1lICogLjg1LCAgLy8gMjAgdG8gMjlcblx0XHRcdFx0bG9uZ2VzdFllYXJUcmFuc2l0aW9uVGltZSAgLy8gMzArXG5cdFx0XHRcdF0pO1xuXHR2YXIgeWVhclJhbmdlID0gZ3JhcGguZ3JhcGgueWVhclJhbmdlO1xuXHRcblx0Ly8gUHV0IHRoZSB0cmFuc2l0aW9uIHRpbWUgZm9yIGVhY2ggeWVhciBpbnRvIGFuIG9iamVjdFxuXHRmb3IgKHZhciBpPXllYXJSYW5nZVswXTsgaTw9eWVhclJhbmdlWzFdOyBpKyspIHtcblx0XHQvLyB0cmFuc2l0aW9uVGltZVBlclllYXJbaV0gPSAxMDAwO1xuXHRcdHRyYW5zaXRpb25UaW1lUGVyWWVhcltpXSA9IHRocmVzaG9sZFNjYWxlKGdyYXBoLmdyYXBoLm5vZGVDb3VudHNQZXJZZWFyW2ldKTtcblx0fVxuXHRyZXR1cm4gdHJhbnNpdGlvblRpbWVQZXJZZWFyO1xufTtcblxuY2l0YXRpb25WaXMueWVhclRpY2tDbGlja0V2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbigpIHtcbiAgICAvLyBBZGQgY2xpY2sgbGlzdGVuZXJzIHRvIGxpbmUgY2hhcnQgYXhpcyB0aWNrIGxhYmVscyAoeWVhcnMpLlxuICAgIC8vIE9uIGNsaWNrLCBhIG5ldyBkZXN0aW5hdGlvbiBub2RlIHdpbGwgYmUgc2V0LlxuICAgIGQzLnNlbGVjdEFsbCgnLnllYXJUaWNrJylcbiAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIC8vIEdldCB0aGUgeWVhciAoYXMgaW50ZWdlcilcbiAgICAgICAgICAgIHZhciBkZXN0aW5hdGlvblllYXIgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS15ZWFyJyk7XG4gICAgICAgICAgICAvLyBTdG9wIGFsbCB0cmFuc2l0aW9ucyBvbiBub2RlcyBhbmQgbGlua3NcbiAgICAgICAgICAgIGQzLnNlbGVjdEFsbCgnLm5vZGUsIC5saW5rJykudHJhbnNpdGlvbigpLmR1cmF0aW9uKDApO1xuXG5cdFx0XHRjaXRhdGlvblZpcy5lZ29HcmFwaFZpcy5uZXdEZXN0aW5hdGlvbk5vZGUoZGVzdGluYXRpb25ZZWFyKTtcbiAgICAgICAgfSk7XG59O1xuXG5cbnZhciBjaXRhdGlvblZpcyA9IGNpdGF0aW9uVmlzIHx8IHt9O1xuXG5jaXRhdGlvblZpcy5zdW1tYXJ5U3RhdGlzdGljcyA9IChmdW5jdGlvbigpIHtcblxuXHRmdW5jdGlvbiBhZGRTdW1tYXJ5U3RhdGlzdGljcyhncmFwaCkge1xuXG5cdFx0ZnVuY3Rpb24gY2xlYW5MaW5rcyhsaW5rcykge1xuXHRcdFx0dmFyIGNsZWFuZWRMaW5rcyA9IFtdO1xuXHRcdFx0bGlua3MuZm9yRWFjaChmdW5jdGlvbihkKSB7XG5cdFx0XHRcdGlmICggKHR5cGVvZiBkLmxpbmtUb0VnbyAhPSAndW5kZWZpbmVkJykgJiYgKGQubGlua1RvRWdvID09PSB0cnVlKSApIHtcblx0XHRcdFx0XHR2YXIgc291cmNlWWVhciA9ICtkLnNvdXJjZVllYXI7XG5cdFx0XHRcdFx0dmFyIHRhcmdldFllYXIgPSArZC50YXJnZXRZZWFyO1xuXHRcdFx0XHRcdGlmICggKHNvdXJjZVllYXIgPiAwKSAmJiAodGFyZ2V0WWVhciA+IDApICYmIChzb3VyY2VZZWFyID49IHRhcmdldFllYXIpICkge1xuXHRcdFx0XHRcdFx0Y2xlYW5lZExpbmtzLnB1c2goZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBjbGVhbmVkTGlua3M7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gZ2V0WWVhclJhbmdlKGxpbmtzKSB7XG5cdFx0XHQvLyBBIGxvdCBvZiB0aGlzIGNvZGUgd2FzIGNvcGllZCBmcm9tIGxpbmVDaGFydERhdGFcblx0XHRcdC8vIE1heSBuZWVkIHRvIGNsZWFuIHRoaXMgdXAgKFRPRE8pXG5cblx0XHRcdC8vIE1ha2Ugc3VyZSBhbGwgb3VyIGRhdGEgZmFsbCB3aXRoaW4gdGhlIGFwcHJvcHJpYXRlIHRpbWUgc3Bhbi5cblx0XHRcdC8vIFRoZSBtaW5pbXVtIHllYXIgaXMgdGhlIGVhcmxpZXN0IHB1YmxpY2F0aW9uIGJ5IHRoZSBlZ28gYXV0aG9yICh0aGVyZSB3aWxsIGxpa2VseSBiZSBubyBjaXRhdGlvbnMgd2l0aGluIHRoaXMgeWVhciwgYnV0IHRoaXMgY2hhcnQgbmVlZHMgdG8gbGluZSB1cCB3aXRoIHRoZSBvdGhlciBjaGFydHMpLlxuXHRcdFx0Ly8gVGhlIG1heGltdW0geWVhciBpcyB0aGUgbGFzdCB5ZWFyIHRoYXQgYSBwYXBlciBjaXRlZCBvbmUgb2YgdGhlIGVnbyBhdXRob3IncyBwYXBlciAoY2hlY2tpbmcgdG8gbWFrZSBzdXJlIGl0IGlzIG5vdCBpbiB0aGUgZnV0dXJlLCB3aGljaCB3b3VsZCBtZWFuIGJhZCBkYXRhKS5cblx0XHRcdHZhciBjbGVhbmVkTGlua3MgPSBjbGVhbkxpbmtzKGxpbmtzKTtcblx0XHRcdHZhciBtaW5ZZWFyID0gZDMubWluKGNsZWFuZWRMaW5rcywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC50YXJnZXRZZWFyPjAgPyBkLnRhcmdldFllYXIgOiBudWxsOyB9KTtcblx0XHRcdC8vIEdldCBjdXJyZW50IHllYXIgKHVzaW5nIHRvZGF5J3MgZGF0ZSk6XG5cdFx0XHR2YXIgdG9kYXlZZWFyID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xuXHRcdFx0dmFyIG1heFllYXIgPSBkMy5tYXgoY2xlYW5lZExpbmtzLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLnNvdXJjZVllYXI8PXRvZGF5WWVhciA/IGQuc291cmNlWWVhciA6IG51bGw7IH0pO1xuXHRcdFx0cmV0dXJuIFttaW5ZZWFyLCBtYXhZZWFyXTtcblx0XHR9XG5cblxuXHRcdGZ1bmN0aW9uIGdldEVtcHR5Q291bnREYXRhKHllYXJSYW5nZSkge1xuXHRcdFx0dmFyIGVtcHR5Q291bnREYXRhID0gW107XG5cdFx0XHRmb3IgKHZhciBpPXllYXJSYW5nZVswXTsgaTw9eWVhclJhbmdlWzFdOyBpKyspIHtcblx0XHRcdFx0ZW1wdHlDb3VudERhdGEucHVzaCh7eWVhcjogaSwgY291bnQ6IDB9KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBlbXB0eUNvdW50RGF0YTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBnZXRDaXRhdGlvbkNvdW50c1BlclllYXIoZ3JhcGgpIHtcblx0XHRcdHZhciBjaXRhdGlvbkNvdW50c1BlclllYXIgPSBnZXRFbXB0eUNvdW50RGF0YShncmFwaC5ncmFwaC55ZWFyUmFuZ2UpO1xuXHRcdFx0dmFyIGNsZWFuZWRMaW5rcyA9IGNsZWFuTGlua3MoZ3JhcGgubGlua3MpO1xuXHRcdFx0Y2xlYW5lZExpbmtzLmZvckVhY2goZnVuY3Rpb24oZCwgaSkge1xuXHRcdFx0XHR2YXIgdGhpc1NvdXJjZVllYXIgPSBkLnNvdXJjZVllYXI7XG5cdFx0XHRcdHZhciBkYXRhVGhpc1llYXIgPSBjaXRhdGlvbkNvdW50c1BlclllYXIuZmlsdGVyKGZ1bmN0aW9uKGRkKSB7IHJldHVybiBkZC55ZWFyPT09dGhpc1NvdXJjZVllYXI7IH0pWzBdO1xuXHRcdFx0XHRkYXRhVGhpc1llYXIuY291bnQrKztcblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gY2l0YXRpb25Db3VudHNQZXJZZWFyO1xuXHRcdH1cblxuXHRcdGdyYXBoLmdyYXBoLnllYXJSYW5nZSA9IGdldFllYXJSYW5nZShncmFwaC5saW5rcyk7XG5cdFx0Z3JhcGguZ3JhcGguY2l0YXRpb25Db3VudHNQZXJZZWFyID0gZ2V0Q2l0YXRpb25Db3VudHNQZXJZZWFyKGdyYXBoKTtcblx0XHRyZXR1cm4gZ3JhcGg7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGFkZFN1bW1hcnlTdGF0aXN0aWNzOiBhZGRTdW1tYXJ5U3RhdGlzdGljc1xuXHR9O1xufSgpKTtcblxuXG5cbi8vIFRoaXMgd2lsbCBhZGQgdGhlIGFiaWxpdHkgdG8gY2hhbmdlIHRoZSB0eXBlIG9mIGRvbWFpbiAoZS5nLiBmcm9tIGNhdGVnb3J5IHRvIHZlbnVlKSB0aGF0IHRoZSBub2RlcyBhcmUgY29sb3JlZCBieVxuLy8gVGhlIEpTT04gZGF0YSBtdXN0IGhhdmUgdGhlIHJpZ2h0IHByb3BlcnRpZXMgKGkuZS4gYGdyYXBoLkRvbWFpbnNNdWx0YCBhbmQgbm9kZSBwcm9wZXJ0eSBgRG9tYWluTXVsdGBcbi8vIGFuZCB0aGUgVVJMIG11c3QgaGF2ZSB0aGUgcXVlcnkgcGFyYW1ldGVyIFwiZG9tYWluc011bHRcIlxuXG4vLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzkwMTExNS9ob3ctY2FuLWktZ2V0LXF1ZXJ5LXN0cmluZy12YWx1ZXMtaW4tamF2YXNjcmlwdFxuZnVuY3Rpb24gZ2V0UGFyYW1ldGVyQnlOYW1lKG5hbWUsIHVybCkge1xuXHRpZiAoIXVybCkgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG5cdG5hbWUgPSBuYW1lLnJlcGxhY2UoL1tcXFtcXF1dL2csIFwiXFxcXCQmXCIpO1xuICAgIHZhciByZWdleCA9IG5ldyBSZWdFeHAoXCJbPyZdXCIgKyBuYW1lICsgXCIoPShbXiYjXSopfCZ8I3wkKVwiKSxcblx0XHRyZXN1bHRzID0gcmVnZXguZXhlYyh1cmwpO1xuXHRpZiAoIXJlc3VsdHMpIHJldHVybiBudWxsO1xuXHRpZiAoIXJlc3VsdHNbMl0pIHJldHVybiAnJztcblx0cmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChyZXN1bHRzWzJdLnJlcGxhY2UoL1xcKy9nLCBcIiBcIikpO1xufVxuXG52YXIgY2l0YXRpb25WaXMgPSBjaXRhdGlvblZpcyB8fCB7fTtcblxuJCggZG9jdW1lbnQgKS5vbiggXCJpbml0Q29tcGxldGVcIiwgZnVuY3Rpb24oKSB7XG5cdHZhciBlZ29HcmFwaFZpcyA9IGNpdGF0aW9uVmlzLmVnb0dyYXBoVmlzO1xuXHR2YXIgZG9tYWluc011bHQgPSBlZ29HcmFwaFZpcy5kYXRhLmdyYXBoLkRvbWFpbnNNdWx0XG5cdGlmICggKCFkb21haW5zTXVsdCkgfHwgKCFnZXRQYXJhbWV0ZXJCeU5hbWUoJ2RvbWFpbnNNdWx0JykpICkge1xuXHRcdC8vIGluIHRoaXMgY2FzZSwgZXhpdCB3aXRob3V0IGRvaW5nIGFueXRoaW5nXG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciAkZG9tYWluRHJvcGRvd24gPSAkKCAnPGRpdj4nICk7XG5cdCRkb21haW5Ecm9wZG93bi5hcHBlbmQoICQoICc8bGFiZWw+JyApLnRleHQoJ0NvbG9yIGJ5OiAnKS5jc3MoICdkaXNwbGF5JywgJ2lubGluZScgKSApO1xuXHR2YXIgZG9tYWluX3NlbGVjdCA9ICRkb21haW5Ecm9wZG93bi5hcHBlbmQoICQoICc8c2VsZWN0PicgKS5hdHRyKCAnaWQnLCAnZG9tYWluX3NlbGVjdCcgKSApO1xuXHQkKCAnI21haW5EaXYnICkucHJlcGVuZCggJGRvbWFpbkRyb3Bkb3duICk7XG5cdCQuZWFjaChkb21haW5zTXVsdCwgZnVuY3Rpb24oaywgdikge1xuXHRcdCQoICcjZG9tYWluX3NlbGVjdCcgKS5hcHBlbmQoICQoICc8b3B0aW9uPicgKS50ZXh0KGspICk7XG5cdFx0ZDMuc2VsZWN0KFwiI21haW5EaXZcIikuYXBwZW5kKFwicFwiKVxuXHRcdFx0LnRleHQoaylcblx0XHRcdC5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge3N3aXRjaERvbWFpbihrKTt9KTtcblx0fSk7XG5cdCQoICcjZG9tYWluX3NlbGVjdCcgKS52YWwoXCJjYXRlZ29yeV9mcm9tX2tleXdvcmRcIik7XG5cdCQoICcjZG9tYWluX3NlbGVjdCcgKS5vbiggJ2NoYW5nZScsIGZ1bmN0aW9uKCkgeyBzd2l0Y2hEb21haW4oJCh0aGlzKS52YWwoKSk7IH0pO1xuXG5cdGZ1bmN0aW9uIHN3aXRjaERvbWFpbihkb21haW5UeXBlKSB7XG5cdFx0dmFyIGR1ciA9IDIwMDtcblx0XHRlZ29HcmFwaFZpcy5kYXRhLmdyYXBoLkRvbWFpbnMgPSBkb21haW5zTXVsdFtkb21haW5UeXBlXTtcblx0XHRmb3IgKHZhciBpID0gMCwgbGVuID0gZWdvR3JhcGhWaXMubm90RWdvTm9kZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdHZhciB0aGlzTm9kZSA9IGVnb0dyYXBoVmlzLm5vdEVnb05vZGVzW2ldO1xuXHRcdFx0dGhpc05vZGUuRG9tYWluSUQgPSB0aGlzTm9kZS5Eb21haW5NdWx0W2RvbWFpblR5cGVdO1xuXHRcdH1cblx0XHRlZ29HcmFwaFZpcy5nZXREb21haW5zVGhpc0dyYXBoKCk7XG5cdFx0ZDMuc2VsZWN0QWxsKFwiLmxlZ2VuZEl0ZW1cIikucmVtb3ZlKCk7XG5cdFx0ZWdvR3JhcGhWaXMubGVnZW5kSW5pdCgpO1xuXHRcdGQzLnNlbGVjdEFsbChcIi5ub2RlXCIpXG5cdFx0XHQuZWFjaChmdW5jdGlvbihkKSB7XG5cdFx0XHRcdGQuRG9tYWluTmFtZSA9IGVnb0dyYXBoVmlzLmRhdGEuZ3JhcGguRG9tYWluc1tkLkRvbWFpbklEXTtcblx0XHRcdFx0Zm9yICh2YXIgaT0wOyBpPGVnb0dyYXBoVmlzLmRvbWFpbnNUaGlzR3JhcGgubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHR2YXIgdGhpc0RvbWFpbiA9IGVnb0dyYXBoVmlzLmRvbWFpbnNUaGlzR3JhcGhbaV0ua2V5XG5cdFx0XHRcdFx0aWYgKHRoaXNEb21haW49PWQuRG9tYWluSUQpIHtcblx0XHRcdFx0XHRcdC8vIHZhciB0aGlzQ29sb3IgPSBzZWxmLmNvbG9yU2NoZW1lW2ldO1xuXHRcdFx0XHRcdFx0dmFyIHRoaXNDb2xvciA9IGVnb0dyYXBoVmlzLmRvbWFpbnNUaGlzR3JhcGhbaV0uY29sb3I7XG5cdFx0XHRcdFx0XHRkLmNvbG9yID0gdGhpc0NvbG9yO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHRcdC50cmFuc2l0aW9uKCkuZHVyYXRpb24oZHVyKVxuXHRcdFx0LmF0dHIoJ2ZpbGwnLCAnd2hpdGUnKVxuXHRcdFx0LmVhY2goJ2VuZCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRkMy5zZWxlY3QodGhpcylcblx0XHRcdFx0XHQudHJhbnNpdGlvbigpLmR1cmF0aW9uKGR1cilcblx0XHRcdFx0XHQuYXR0cignZmlsbCcsIGZ1bmN0aW9uKGQpIHtcblx0XHRcdFx0XHRcdC8vIGNvbG9yIHRoZSBub2RlcyBiYXNlZCBvbiBEb21haW5JRFxuXHRcdFx0XHRcdFx0cmV0dXJuIGQuY29sb3Jcblx0XHRcdFx0XHR9KVxuXHRcdFx0fSlcblx0XHRkMy50cmFuc2l0aW9uKCkuZHVyYXRpb24oZHVyKjIpLmVhY2goJ2VuZCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0ZWdvR3JhcGhWaXMucmV2ZWFsRmluYWxTdGF0ZSgpO1xuXHRcdH0pO1xuXHR9XG59KTtcblxuXG4vLyBodHRwOi8vY29kZXJldmlldy5zdGFja2V4Y2hhbmdlLmNvbS9xdWVzdGlvbnMvNzc2MTQvY2FwaXRhbGl6ZS10aGUtZmlyc3QtY2hhcmFjdGVyLW9mLWFsbC13b3Jkcy1ldmVuLXdoZW4tZm9sbG93aW5nLWFcblN0cmluZy5wcm90b3R5cGUuY2FwaXRhbGl6ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnRvTG93ZXJDYXNlKCkucmVwbGFjZSggL1xcYlxcdy9nLCBmdW5jdGlvbihtKSB7XG4gICAgICAgIHJldHVybiBtLnRvVXBwZXJDYXNlKCk7XG4gICAgfSk7XG59O1xuXG5cbmZ1bmN0aW9uIGVnb0dyYXBoVmlzKGRhdGEpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXHRzZWxmLmRhdGEgPSBkYXRhO1xuXHRzZWxmLm5vdEVnb05vZGVzID0gc2VsZi5kYXRhLm5vZGVzLnNsaWNlKDEpO1xuXHRjb25zb2xlLmxvZyhzZWxmLmRhdGEpO1xuXG5cdC8vIERlZmF1bHRzXG5cdC8vIEdyYXBoIFNWRyBEaW1lbnNpb25zXG4gICAgLy8gc2VsZi5ncmFwaERpbWVuc2lvbnMgPSB7XG4gICAgLy8gICAgIHdpZHRoOiA5NjAsXG4gICAgLy8gICAgIGhlaWdodDogNTAwXG4gICAgLy8gfTtcblx0c2VsZi5ncmFwaERpbWVuc2lvbnM7ICAvLyBpbXBvcnRlZCBpbiBzZWxmLmltcG9ydERlZmF1bHRPcHRpb25zIGJlbG93XG5cdFxuXHRzZWxmLmNvbG9yU2NoZW1lO1xuXG4gICAgLy8gTm9kZSBwbGFjZW1lbnQgb3B0aW9uczpcbiAgICAvLyBcImZvcmNlMVwiOiBub2RlcyBwbGFjZWQgYnkgcnVubmluZyB0aGUgZm9yY2UgbGF5b3V0IGFuZCB0aGVuIGZyZWV6aW5nXG4gICAgLy8gXCJzcGlyYWxcIiBwbGFjZXMgdGhlIG5vZGVzIGluIGEgc3BpcmFsIGZvcm1hdGlvbiB3aXRoIHRoZSBlZ28gbm9kZSBhdCB0aGUgY2VudGVyXG5cdC8vIFwic3BpcmFsMlwiOiBhbHRlcm5hdGUgc3BpcmFsIGFsZ29yaXRobVxuICAgIC8vIEFERCBNT1JFXG4gICAgc2VsZi5ub2RlUGxhY2VtZW50T3B0aW9ucyA9IFtcImZvcmNlMVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzcGlyYWxcIixcblx0XHRcdFx0XHRcdFx0XHQgXCJzcGlyYWwyXCJdO1xuXHRzZWxmLm5vZGVQbGFjZW1lbnQgPSBzZWxmLm5vZGVQbGFjZW1lbnRPcHRpb25zWzFdO1xuXHRcblx0c2VsZi56b29tYWJsZSA9IGZhbHNlO1xuXG5cdHNlbGYuc3ZnO1xuICAgIHNlbGYuZ3JvdXA7XG5cdHNlbGYubm9kZTtcblx0c2VsZi5saW5rO1xuXHRzZWxmLmVnb05vZGU7XG5cblx0c2VsZi5laWdlbkZhY3RvclNjYWxlO1xuXG5cdC8vIHNlbGYubG9hZGluZ1RleHQ7XG5cblx0c2VsZi5kb21haW5zVGhpc0dyYXBoO1xuICAgIHNlbGYubGVnZW5kO1xuXG4gICAgc2VsZi55ZWFyVGV4dERpc3BsYXk7XG5cbiAgICBzZWxmLmF1dGhvckltYWdlRGl2O1xuXG4gICAgc2VsZi50b29sdGlwO1xuXHRzZWxmLnRpcDtcblxuXHRzZWxmLnRpY2s7XG5cdHNlbGYuZm9yY2U7XG5cbiAgICAvLyBTZWUgaHR0cDovL2NvbG9yYnJld2VyMi5vcmcvP3R5cGU9cXVhbGl0YXRpdmUmc2NoZW1lPVNldDEmbj04XG4gICAgLy8gc2VsZi5jb2xvclNjaGVtZSA9IFsncmdiKDIyOCwyNiwyOCknLCdyZ2IoNTUsMTI2LDE4NCknLCdyZ2IoNzcsMTc1LDc0KScsXG5cdC8vIFx0J3JnYigxNTIsNzgsMTYzKScsJ3JnYigyNTUsMTI3LDApJywncmdiKDI1NSwyNTUsNTEpJyxcblx0Ly8gXHQncmdiKDE2Niw4Niw0MCknLCdyZ2IoMjQ3LDEyOSwxOTEpJ11cbiAgICAvLyAvLyBJIGxpa2VkIHRoZSBibHVlIGJldHRlciBmb3IgdGhlIG1haW4gY29sb3IsIHNvIHRoZSBuZXh0IGxpbmUganVzdCBtb3Zlc1xuICAgIC8vIC8vIHRoZSBibHVlIGNvbG9yIChvcmlnaW5hbGx5IHNlbGYuY29sb3JTY2hlbWVbMV0pIHRvIHRoZSBmcm9udCAoc2VsZi5jb2xvclNjaGVtZVswXSlcbiAgICAvLyBzZWxmLmNvbG9yU2NoZW1lLnNwbGljZSgwLCAwLCBzZWxmLmNvbG9yU2NoZW1lLnNwbGljZSgxLCAxKVswXSlcblx0c2VsZi5jb2xvclNjaGVtZTsgIC8vIGltcG9ydGVkIGluIGltcG9ydERlZmF1bHRPcHRpb25zIGJlbG93XG5cbiAgICAvLyBPcGFjaXR5IHZhbHVlc1xuICAgIHNlbGYub3BhY2l0eVZhbHMgPSB7XG5cdFx0bm9kZTogMSwgXG5cdFx0bm9kZVByZXZZZWFyOiAuNixcblx0XHRsaW5rVG9FZ286IC4xMixcblx0XHRsaW5rTm90VG9FZ286IC4xMixcblx0XHRsaW5rUHJldlllYXI6IC4wNFxuXHR9O1xuXG5cdHNlbGYuZG9Bbm5vdGF0aW9ucyA9IGZhbHNlO1xuXG4gICAgc2VsZi5hbmltYXRpb25TdGF0ZTsgIC8vIFwiZm9yd2FyZFwiLCBcInJld2luZFwiLCBcInN0b3BwZWRcIlxuXHRzZWxmLnRyYW5zaXRpb25UaW1lUGVyWWVhcjsgLy8gaW1wb3J0ZWQgaW4gaW1wb3J0RGVmYXVsdE9wdGlvbnMgYmVsb3dcblx0Ly8gc2VsZi50cmFuc2l0aW9uVGltZVBlck5vZGUgPSAxMDA7ICAvLyBURVNUXG5cdHNlbGYudHJhbnNpdGlvblRpbWVQZXJOb2RlOyAvLyBjYWxjdWxhdGVkIGluIGNhbGN1bGF0ZVRyYW5zaXRpb25UaW1lKClcbiAgICAvLyBzZWxmLm5vZGVBcHBlYXJEdXJhdGlvbiA9IHNlbGYudHJhbnNpdGlvblRpbWVQZXJOb2RlICogNDtcblx0Ly8gSSBoYXZlbid0IGFjdHVhbGx5IGdvdHRlbiBpdCB0byB3b3JrIGhhdmluZyBkaWZmZXJlbnQgdHJhbnNpdGlvblRpbWVQZXJOb2RlIGFuZCBub2RlQXBwZWFyRHVyYXRpb25cblx0c2VsZi5saW5rQXBwZWFyRHVyYXRpb24gPSA1MDA7XG4gICAgc2VsZi5jdXJyTm9kZUluZGV4OyAgLy8gSW5kZXggb2Ygbm9kZSBjdXJyZW50bHkgYmVpbmcgYW5ub3RhdGVkXG4gICAgc2VsZi5kZXN0aW5hdGlvbk5vZGVJbmRleDsgIC8vIEluZGV4IG9mIG5vZGUgdG8gd2hpY2ggdGhlIGFuaW1hdGlvbiBpcyBjdXJyZW50bHkgbW92aW5nXG4gICAgc2VsZi5kZXN0aW5hdGlvblllYXI7XG4gICAgc2VsZi5jdXJyWWVhcjtcblxuXHQvLyBzZWxmLmRlc3RpbmF0aW9uTm9kZUluZGV4ID0gMjAwOyAgLy8gVEVTVFxuXHRzZWxmLmRlc3RpbmF0aW9uTm9kZUluZGV4ID0gc2VsZi5kYXRhLm5vZGVzLmxlbmd0aC0xOyAgLy8gVEVTVFxuXG5cdC8vdGVzdGluZ1xuXHRzZWxmLmMgPSAwO1xuXHRzZWxmLnR0ID0gMDtcblxuXHQvLyBzZWxmLmluaXQoKTtcblxuXHRyZXR1cm4gc2VsZjtcblxufVxuXG5lZ29HcmFwaFZpcy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBzZWxmLnRpY2sgPSBzZWxmLm1ha2VUaWNrKCk7XG4gICAgc2VsZi5mb3JjZSA9IHNlbGYubWFrZUZvcmNlKCk7XG5cdGlmIChzZWxmLnpvb21hYmxlID09PSB0cnVlKSB7XG5cdFx0c2VsZi56b29tID0gc2VsZi5tYWtlWm9vbSgpO1xuXHR9XG4gICAgLy8gc2VsZi5kcmFnID0gc2VsZi5tYWtlRHJhZygpO1xuXHRcblx0c2VsZi5hbmltYXRpb25TdGF0ZSA9ICdpbml0JztcblxuXHRzZWxmLmdldERvbWFpbnNUaGlzR3JhcGgoKTtcblxuXHRzZWxmLnN2ZyA9IGQzLnNlbGVjdCgnI2dyYXBoRGl2JykuYXBwZW5kKCdzdmcnKVxuXHRcdC5hdHRyKCdpZCcsICdncmFwaFN2ZycpXG5cdFx0LmF0dHIoJ3dpZHRoJywgc2VsZi5ncmFwaERpbWVuc2lvbnMud2lkdGgpXG5cdFx0LmF0dHIoJ2hlaWdodCcsIHNlbGYuZ3JhcGhEaW1lbnNpb25zLmhlaWdodCk7XG5cblx0Ly8gc2VsZi50aXAgPSBkMy50aXAoKVxuXHQvLyBcdC5hdHRyKCdjbGFzcycsICdkMy10aXAnKVxuXHQvLyBcdC5zdHlsZSgnY3Vyc29yJywgJ2RlZmF1bHQnKVxuXHQvLyBcdC5zdHlsZSgnYm9yZGVyLXN0eWxlJywgJ3NvbGlkJylcblx0Ly8gXHQvLyAuc3R5bGUoJ2JvcmRlci1jb2xvcicsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuY29sb3I7IH0pXG5cdC8vIFx0LnN0eWxlKCdwb2ludGVyLWV2ZW50cycsICdub25lJyk7XG5cdC8vIC8vIHNlbGYuc3ZnLmNhbGwoc2VsZi50aXApO1xuXG4gICAgc2VsZi5ncm91cCA9IHNlbGYuc3ZnLmFwcGVuZCgnZycpXG5cdFx0ICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dyYXBoQ29udGFpbmVyJylcbiAgICBzZWxmLmxpbmsgPSBzZWxmLmdyb3VwLmFwcGVuZCgnc3ZnOmcnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGlua3MnKVxuICAgICAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCcubGluaycpO1xuICAgIHNlbGYubm9kZSA9IHNlbGYuZ3JvdXAuYXBwZW5kKCdzdmc6ZycpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdub2RlcycpXG4gICAgICAgICAgICAgICAgICAgIC5zZWxlY3RBbGwoJy5ub2RlJyk7XG5cdFxuICAgIC8vIEluaXRpYWxpemUgdG9vbHRpcCBmb3Igbm9kZXMgKHdoaWNoIHdpbGwgYmUgdmlzaWJsZSBvbiBtb3VzZW92ZXIgb2Ygbm9kZXMpXG4gICAgc2VsZi50b29sdGlwID0gZDMuc2VsZWN0KCdib2R5JylcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ25vZGVUb29sdGlwJylcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdwb3NpdGlvbicsICdhYnNvbHV0ZScpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnd2lkdGgnLCBzZWxmLmdyYXBoRGltZW5zaW9ucy53aWR0aCAvIDQgKyAncHgnKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3otaW5kZXgnLCAnMTAnKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG5cblx0Ly8gQWRkIHNwZWNpYWwgcHJvcGVydGllcyB0byB0aGUgZWdvIG5vZGU6XG5cdHNlbGYuZGF0YS5ub2Rlc1swXS5maXhlZCA9IHRydWU7XG5cdC8vIHBvc2l0aW9uIGluIGNlbnRlclxuXHRzZWxmLmRhdGEubm9kZXNbMF0ueCA9IHNlbGYuZ3JhcGhEaW1lbnNpb25zLndpZHRoLzI7XG5cdHNlbGYuZGF0YS5ub2Rlc1swXS55ID0gc2VsZi5ncmFwaERpbWVuc2lvbnMuaGVpZ2h0LzI7XG5cdHNlbGYuZGF0YS5ub2Rlc1swXS5jb2xvciA9IHNlbGYuY29sb3JTY2hlbWVbMF07XG5cdHNlbGYuZWdvTm9kZSA9IHNlbGYuZGF0YS5ub2Rlc1swXTtcblx0XG5cdC8vIFNldCB1cCBhIHNjYWxlIGZvciBFaWdlbmZhY3RvciBpbiBvcmRlciB0byBlbmNvZGUgc2l6ZSBvZiBub2RlcyBieSBFaWdlbmZhY3RvciAoaW5mbHVlbmNlKVxuXHR2YXIgZWlnZW5GYWN0b3JNYXggPSBkMy5tYXgoc2VsZi5kYXRhLm5vZGVzLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLkVGOyB9KTtcblx0c2VsZi5laWdlbkZhY3RvclNjYWxlID0gZDMuc2NhbGUubGluZWFyKClcblx0XHQuZG9tYWluKFswLCBlaWdlbkZhY3Rvck1heF0pXG5cdFx0LnJhbmdlKFswLCAxXSk7XG5cdHNlbGYuZGF0YS5ub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uKGQpIHtcblx0XHRpZiAoZC5ub2RlVHlwZSA9PT0gJ3BhcGVyJykge1xuXHRcdFx0ZC5yYWRpdXMgPSA0LjUgKyAoc2VsZi5laWdlbkZhY3RvclNjYWxlKGQuRUYpICogMTApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkLnJhZGl1cyA9IDEwO1xuXHRcdH1cblx0fSk7XG5cbiAgICAvLyBhZGQgZ3JhcGggcHJvcGVydGllc1xuXHRzZWxmLmZvcmNlLm5vZGVzKHNlbGYuZGF0YS5ub2Rlcyk7XG5cdFxuICAgIC8vIHVwZGF0ZSBub2RlIGVsZW1lbnRzXG4gICAgc2VsZi5ub2RlID0gc2VsZi5ub2RlLmRhdGEoc2VsZi5kYXRhLm5vZGVzKTtcbiAgICAvL3NlbGYubm9kZS5leGl0KCkucmVtb3ZlKCk7XG4gICAgdmFyIG5ld05vZGUgPSBzZWxmLm5vZGUuZW50ZXIoKTtcblxuICAgIG5ld05vZGUgPSBuZXdOb2RlLmFwcGVuZCgnc3ZnOmNpcmNsZScpXG5cdFx0Ly90ZXN0XG5cdFx0LmF0dHIoJ2NsYXNzJywgJ25vZGUnKVxuXHRcdC8vIGFkZCBjbGFzcyBmb3IgdGhlIGNlbnRlciBub2RlXG5cdFx0LmNsYXNzZWQoJ2NlbnRlck5vZGUnLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLmlkID09PSBzZWxmLmVnb05vZGUuaWQ7IH0pXG5cdFx0LmF0dHIoJ3InLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLnJhZGl1czsgfSlcbiAgICAgICAgLy8gLmF0dHIoJ2NsYXNzJywgJ25vZGUgaGlkZGVuJylcbiAgICAgICAgLy8gXCJUXCIgYXR0cmlidXRlIHdpbGwga2VlcCB0cmFjayBvZiB0aGUgdHJhbnNpdGlvbiB0aW1lIGVsYXBzZWRcbiAgICAgICAgLmF0dHIoJ1QnLCAwKVxuICAgICAgICAvLyBTdGFydCB3aXRoIHRoZSBub2RlIGludmlzaWJsZVxuICAgICAgICAuYXR0cigncicsMWUtOSlcblx0XHQuZWFjaChmdW5jdGlvbihkKSB7XG5cdFx0XHRkLkRvbWFpbk5hbWUgPSBzZWxmLmRhdGEuZ3JhcGguRG9tYWluc1tkLkRvbWFpbklEXTtcblx0XHRcdGZvciAodmFyIGk9MDsgaTxzZWxmLmRvbWFpbnNUaGlzR3JhcGgubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dmFyIHRoaXNEb21haW4gPSBzZWxmLmRvbWFpbnNUaGlzR3JhcGhbaV0ua2V5XG5cdFx0XHRcdGlmICh0aGlzRG9tYWluPT1kLkRvbWFpbklEKSB7XG5cdFx0XHRcdFx0Ly8gdmFyIHRoaXNDb2xvciA9IHNlbGYuY29sb3JTY2hlbWVbaV07XG5cdFx0XHRcdFx0dmFyIHRoaXNDb2xvciA9IHNlbGYuZG9tYWluc1RoaXNHcmFwaFtpXS5jb2xvcjtcblx0XHRcdFx0XHRkLmNvbG9yID0gdGhpc0NvbG9yO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSlcbiAgICAgICAgLy8gQ29sb3IgYnkgZGlmZmVyZW50IGNhdGVnb3JpZXMgb2YgaG93IHNpbWlsYXIgdGhlIG5vZGUncyBjbHVzdGVyIGlzIHRvIHRoZSBlZ28gbm9kZVxuICAgICAgICAuYXR0cignZmlsbCcsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIC8vIGNvbG9yIHRoZSBub2RlcyBiYXNlZCBvbiBEb21haW5JRFxuXHRcdFx0cmV0dXJuIGQuY29sb3JcbiAgICAgICAgfSlcbiAgICAgICAgLnN0eWxlKCdvcGFjaXR5Jywgc2VsZi5vcGFjaXR5VmFscy5ub2RlKTtcblxuICAgIG5ld05vZGUuY2FsbChzZWxmLmZvcmNlLmRyYWcpO1xuXG5cdC8vIHNlbGYuZWdvTm9kZSA9IHNlbGYubm9kZS5maWx0ZXIoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5pZHggPT09IDA7IH0pO1xuXHRcbiAgICAvLyB1cGRhdGUgbGluayBlbGVtZW50c1xuXHRzZWxmLmZvcmNlLmxpbmtzKHNlbGYuZGF0YS5saW5rcyk7XG5cbiAgICBzZWxmLmxpbmsgPSBzZWxmLmxpbmsuZGF0YShzZWxmLmRhdGEubGlua3MpO1xuICAgIC8vc2VsZi5saW5rLmV4aXQoKS5yZW1vdmUoKTtcblx0dmFyIG5ld0xpbmsgPSBzZWxmLmxpbmtcblx0XHQuZW50ZXIoKVxuXHRcdC5hcHBlbmQoJ3N2ZzpsaW5lJylcblx0XHQuYXR0cignY2xhc3MnLCBmdW5jdGlvbihkKSB7XG5cdFx0XHQvLyBpZiAoZC50YXJnZXQgPT09IDApIHsgcmV0dXJuICdsaW5rIHRvRWdvIGxpbmtUb0Vnbyc7IH1cblx0XHRcdC8vIGVsc2UgeyByZXR1cm4gJ2xpbmsgbm90VG9FZ28gbGlua05vdFRvRWdvJzsgfVxuXHRcdFx0aWYgKGQudGFyZ2V0ID09PSAwKSB7IHJldHVybiAnbGluayBoaWRkZW4gdG9FZ28gbGlua1RvRWdvJzsgfVxuXHRcdFx0ZWxzZSB7IHJldHVybiAnbGluayBoaWRkZW4gbm90VG9FZ28gbGlua05vdFRvRWdvJzsgfVxuXHRcdH0pXG5cdFx0Ly8gXCJUXCIgYXR0cmlidXRlIHdpbGwga2VlcCB0cmFjayBvZiB0aGUgdHJhbnNpdGlvbiB0aW1lIGVsYXBzZWRcblx0XHQuYXR0cignVCcsIDApXG5cdFx0Ly8gTGlua3MgdG8gdGhlIGVnbyBub2RlIGFyZSBkYXJrZXIgdGhhbiBsaW5rcyBiZXR3ZWVuIHRoZSBvdGhlcnNcblx0XHQuc3R5bGUoJ29wYWNpdHknLCBmdW5jdGlvbihkKSB7XG5cdFx0XHR2YXIgb3BWYWxzID0gc2VsZi5vcGFjaXR5VmFscztcblx0XHRcdGlmIChkLmxpbmtUb0Vnbykge1xuXHRcdFx0XHRyZXR1cm4gb3BWYWxzLmxpbmtUb0Vnbztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBvcFZhbHMubGlua05vdFRvRWdvO1xuXHRcdFx0fVxuXHRcdFx0Ly8gcmV0dXJuIC41O1xuXHRcdFx0Ly8gaWYgKGQudGFyZ2V0ID09PSAwKSB7IHJldHVybiBzZWxmLmdyYXBoUGFyYW1zLm9wYWNpdHlWYWxzLnZhbHVlLmxpbmtUb0VnbzsgfVxuXHRcdFx0Ly8gZWxzZSB7IHJldHVybiBzZWxmLmdyYXBoUGFyYW1zLm9wYWNpdHlWYWxzLnZhbHVlLmxpbmtOb3RUb0VnbzsgfVxuXHRcdH0pO1xuXG5cdGZ1bmN0aW9uIHBsYWNlTm9kZXMoKSB7XG5cdFx0Ly8gVGhpcyBmdW5jdGlvbiB3aWxsIGRldGVybWluZSB0aGUgZmluYWwgc3BhdGlhbCBwbGFjZW1lbnQgb2YgYWxsIG9mIHRoZSBub2Rlcy5cblxuXHRcdHN3aXRjaCAoc2VsZi5ub2RlUGxhY2VtZW50KSB7XG5cdFx0XHRjYXNlIHNlbGYubm9kZVBsYWNlbWVudE9wdGlvbnNbMF06XG5cdFx0XHRcdC8vIFBsYWNlIHRoZSBub2RlcyB1c2luZyB0aGUgZm9yY2UgbGF5b3V0LlxuXHRcdFx0XHQvLyBVc2VzIHRoZSBmb3JjZSBsYXlvdXQgcGFyYW1ldGVycyBpbiBzZWxmLm1ha2VGb3JjZVxuXHRcdFx0XHRzZWxmLmZvcmNlLnN0YXJ0KCk7XG5cdFx0XHRcdC8vIEV4ZWN1dGUgZm9yY2UgYSBiaXQsIHRoZW4gc3RvcFxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaTwxMDAwMDA7ICsraSkgc2VsZi5mb3JjZS50aWNrKCk7XG5cdFx0XHRcdHNlbGYuZm9yY2Uuc3RvcCgpO1xuXHRcdFx0XHRuZXdOb2RlLmVhY2goZnVuY3Rpb24oZCkgeyBkLmZpeGVkID0gdHJ1ZTsgfSk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIHNlbGYubm9kZVBsYWNlbWVudE9wdGlvbnNbMV06XG5cdFx0XHRcdC8vIFBsYWNlIHRoZSBub2RlcyBpbiBzcGlyYWwgZm9ybWF0aW9uLlxuXHRcdFx0XHR2YXIgY3ggPSBzZWxmLmVnb05vZGUueCxcblx0XHRcdCAgICAgICAgY3kgPSBzZWxmLmVnb05vZGUueSxcblx0XHRcdCAgICAgICAgLy8gaW5pdGlhbFJhZCA9IDYwO1xuXHRcdFx0ICAgICAgICBpbml0aWFsUmFkID0gMjA7XG5cdFx0XHRcdHZhciBudW1Ob2RlcyA9IHNlbGYuZGF0YS5ub2Rlcy5sZW5ndGg7XG5cdFx0XHRcdC8vIGNvbnNvbGUubG9nKG51bU5vZGVzKTtcblx0XHRcdFx0bmV3Tm9kZS5lYWNoKGZ1bmN0aW9uKGQsIGkpIHtcblx0XHRcdFx0XHRpZiAoZC5pZHggIT0gMCkge1xuXHRcdFx0XHRcdFx0ZC5maXhlZCA9IHRydWU7XG5cdFx0XHRcdFx0XHQvLyB2YXIgdGhpc1JhZCA9IGkgKiAyICsgaW5pdGlhbFJhZDtcblx0XHRcdFx0XHRcdC8vIHZhciB0aGlzU3BhY2luZyA9IGkgKiAoTWF0aC5QSS8oOC41Ky4xKmkpKTtcblxuXHRcdFx0XHRcdFx0dmFyIHRoaXNSYWQgPSBNYXRoLnBvdyhpLCAxKSAqIC45NSArIGluaXRpYWxSYWQ7XG5cdFx0XHRcdFx0XHR2YXIgdGhpc1NwYWNpbmcgPSBpICogKE1hdGguUEkvKDguNSsuMDUqaSkpO1xuXHRcdFx0XHRcdFx0ZC54ID0gY3ggKyAodGhpc1JhZCAqIE1hdGguY29zKHRoaXNTcGFjaW5nKSk7XG5cdFx0XHRcdFx0XHRkLnkgPSBjeSArICh0aGlzUmFkICogTWF0aC5zaW4odGhpc1NwYWNpbmcpKTtcblx0XHRcdFx0XHRcdC8vIHZhciBhbmdsZSA9IDAuMSAqIGk7XG5cdFx0XHRcdFx0XHQvLyBkLnggPSBjeCArIHRoaXNSYWQgKiBNYXRoLmNvcyhhbmdsZSk7XG5cdFx0XHRcdFx0XHQvLyBkLnkgPSBjeSArIHRoaXNSYWQgKiBNYXRoLnNpbihhbmdsZSk7XG5cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRzZWxmLmZvcmNlLnN0YXJ0KCk7XG5cdFx0XHRcdHNlbGYuZm9yY2UudGljaygpO1xuXHRcdFx0XHRzZWxmLmZvcmNlLnN0b3AoKTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2Ugc2VsZi5ub2RlUGxhY2VtZW50T3B0aW9uc1syXTpcblx0XHRcdFx0Ly8gQWx0ZXJuYXRlIHNwaXJhbCBhbGdvcml0aG1cblx0XHRcdFx0Ly9cblx0XHRcdFx0Ly8gaHR0cDovL2dhbWVkZXYuc3RhY2tleGNoYW5nZS5jb20vcXVlc3Rpb25zLzE2NzQ1L21vdmluZy1hLXBhcnRpY2xlLWFyb3VuZC1hbi1hcmNoaW1lZGVhbi1zcGlyYWwtYXQtYS1jb25zdGFudC1zcGVlZFxuXHRcdFx0XHRmdW5jdGlvbiBjb21wdXRlQW5nbGUoYWxwaGEsIGFyY0xlbmd0aCwgZXBzaWxvbikge1xuXHRcdFx0XHRcdC8vIGFscGhhOiBkaXN0YW5jZSBiZXR3ZWVuIHN1Y2Nlc3NpdmUgdHVybmluZ3Ncblx0XHRcdFx0XHQvLyBhcmNMZW5ndGg6IGRlc2lyZWQgYXJjTGVuZ3RoXG5cdFx0XHRcdFx0Ly8gZXBzaWxvbjogKHZhbHVlID4wKSBpbmRpY2F0ZXMgdGhlIHByZWNpc2lvbiBvZiB0aGUgYXBwcm94aW1hdGlvblxuXHRcdFx0XHRcdC8vIHJldHVybnM6IGFuZ2xlIGF0IHdoaWNoIHRoZSBkZXNpcmVkIGFyY0xlbmd0aCBpcyBhY2hpZXZlZFxuXHRcdFx0XHRcdHZhciBhbmdsZVJhZCA9IE1hdGguUEkgKyBNYXRoLlBJO1xuXHRcdFx0XHRcdHdoaWxlICh0cnVlKSB7XG5cdFx0XHRcdFx0XHR2YXIgZCA9IGNvbXB1dGVBcmNMZW5ndGgoYWxwaGEsIGFuZ2xlUmFkKSAtIGFyY0xlbmd0aDtcblx0XHRcdFx0XHRcdGlmIChNYXRoLmFicyhkKSA8PSBlcHNpbG9uKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBhbmdsZVJhZDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHZhciBkYSA9IGFscGhhICogTWF0aC5zcXJ0KGFuZ2xlUmFkICogYW5nbGVSYWQgKyAxKTtcblx0XHRcdFx0XHRcdGFuZ2xlUmFkID0gYW5nbGVSYWQgLSAoZCAvIGRhKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZnVuY3Rpb24gY29tcHV0ZUFyY0xlbmd0aChhbHBoYSwgYW5nbGVSYWQpIHtcblx0XHRcdFx0XHR2YXIgdSA9IE1hdGguc3FydCgxICsgYW5nbGVSYWQgKiBhbmdsZVJhZCk7XG5cdFx0XHRcdFx0dmFyIHYgPSBNYXRoLmxvZyhhbmdsZVJhZCArIHUpO1xuXHRcdFx0XHRcdHJldHVybiAwLjUgKiBhbHBoYSAqIChhbmdsZVJhZCAqIHUgKyB2KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRmdW5jdGlvbiBjb21wdXRlUG9pbnQoYWxwaGEsIGFuZ2xlUmFkKSB7XG5cdFx0XHRcdFx0dmFyIGRpc3RhbmNlID0gYW5nbGVSYWQgKiBhbHBoYTtcblx0XHRcdFx0XHR2YXIgeCA9IE1hdGguc2luKGFuZ2xlUmFkKSAqIGRpc3RhbmNlO1xuXHRcdFx0XHRcdHZhciB5ID0gTWF0aC5jb3MoYW5nbGVSYWQpICogZGlzdGFuY2U7XG5cdFx0XHRcdFx0cmV0dXJuIFt4LCB5XTtcblx0XHRcdFx0fVxuXHRcdFx0XHRmdW5jdGlvbiBnZXRBbmdsZXMobnVtTm9kZXMsIGFscGhhKSB7XG5cdFx0XHRcdFx0dmFyIHBvaW50QXJjRGlzdGFuY2UgPSA1O1xuXHRcdFx0XHRcdHZhciBlcHNpbG9uID0gLjAwMDA1O1xuXHRcdFx0XHRcdHZhciB0b3RhbEFyY0xlbmd0aCA9IDAuMDtcblx0XHRcdFx0XHR2YXIgcHJldmlvdXNBbmdsZVJhZCA9IDAuMDtcblx0XHRcdFx0XHR2YXIgYW5nbGVzID0gW107XG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDAsIGxlbiA9IG51bU5vZGVzOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdFx0XHRcdHZhciBhbmdsZVJhZCA9IGNvbXB1dGVBbmdsZShhbHBoYSwgdG90YWxBcmNMZW5ndGgsIGVwc2lsb24pO1xuXHRcdFx0XHRcdFx0YW5nbGVzLnB1c2goYW5nbGVSYWQpO1xuXHRcdFx0XHRcdFx0dG90YWxBcmNMZW5ndGggPSB0b3RhbEFyY0xlbmd0aCArIHBvaW50QXJjRGlzdGFuY2U7XG5cdFx0XHRcdFx0XHRwcmV2aW91c0FuZ2xlUmFkID0gYW5nbGVSYWQ7XG5cdFx0XHRcdFx0XHRpZiAoaT4xMCkgeyBwb2ludEFyY0Rpc3RhbmNlID0gMTA7fVxuXHRcdFx0XHRcdFx0aWYgKGk+NTApIHsgcG9pbnRBcmNEaXN0YW5jZSA9IDE1O31cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGFuZ2xlcztcblx0XHRcdFx0fVxuXHRcdFx0XHR2YXIgbnVtTm9kZXMgPSBzZWxmLmRhdGEubm9kZXMubGVuZ3RoO1xuXHRcdFx0XHR2YXIgYW5nbGVzID0gZ2V0QW5nbGVzKG51bU5vZGVzLCA3KTtcblx0XHRcdFx0Ly8gY29uc29sZS5sb2coYW5nbGVzKTtcblx0XHRcdFx0dmFyIGN4ID0gc2VsZi5lZ29Ob2RlLngsXG5cdFx0XHQgICAgICAgIGN5ID0gc2VsZi5lZ29Ob2RlLnksXG5cdFx0XHQgICAgICAgIC8vIGluaXRpYWxSYWQgPSA2MDtcblx0XHRcdCAgICAgICAgaW5pdGlhbFJhZCA9IDIwO1xuXHRcdFx0XHR2YXIgbnVtTm9kZXMgPSBzZWxmLmRhdGEubm9kZXMubGVuZ3RoO1xuXHRcdFx0XHRjb25zb2xlLmxvZyhudW1Ob2Rlcyk7XG5cdFx0XHRcdG5ld05vZGUuZWFjaChmdW5jdGlvbihkLCBpKSB7XG5cdFx0XHRcdFx0aWYgKGQuaWR4ICE9IDApIHtcblx0XHRcdFx0XHRcdGQuZml4ZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0dmFyIHRoaXNSYWQgPSBpICogMiArIGluaXRpYWxSYWQ7XG5cdFx0XHRcdFx0XHR2YXIgdGhpc1NwYWNpbmcgPSBpICogKE1hdGguUEkvKDguNSsuMSppKSk7XG5cblx0XHRcdFx0XHRcdC8vIHZhciB0aGlzUmFkID0gTWF0aC5wb3coaSwgMSkgKiAuOTUgKyBpbml0aWFsUmFkO1xuXHRcdFx0XHRcdFx0Ly8gdmFyIHRoaXNTcGFjaW5nID0gaSAqIChNYXRoLlBJLyg4LjUrLjA1KmkpKTtcblx0XHRcdFx0XHRcdC8vIGQueCA9IGN4ICsgKHRoaXNSYWQgKiBNYXRoLmNvcyh0aGlzU3BhY2luZykpO1xuXHRcdFx0XHRcdFx0Ly8gZC55ID0gY3kgKyAodGhpc1JhZCAqIE1hdGguc2luKHRoaXNTcGFjaW5nKSk7XG5cdFx0XHRcdFx0XHQvLyB2YXIgYW5nbGUgPSAwLjEgKiBpO1xuXHRcdFx0XHRcdFx0Ly8gZC54ID0gY3ggKyB0aGlzUmFkICogTWF0aC5jb3MoYW5nbGUpO1xuXHRcdFx0XHRcdFx0Ly8gZC55ID0gY3kgKyB0aGlzUmFkICogTWF0aC5zaW4oYW5nbGUpO1xuXHRcdFx0XHRcdFx0dmFyIHBvd1NjYWxlID0gZDMuc2NhbGUucG93KCkuZXhwb25lbnQoLjcpLmRvbWFpbihbMSxudW1Ob2Rlc10pLnJhbmdlKFswLDYwXSk7XG5cdFx0XHRcdFx0XHR2YXIgcG93U2NhbGUgPSBkMy5zY2FsZS5saW5lYXIoKS5kb21haW4oWzEsTWF0aC5wb3cobnVtTm9kZXMsIC4zKV0pLnJhbmdlKFswLDYwXSk7XG5cdFx0XHRcdFx0XHR2YXIgcG93U2NhbGUgPSBkMy5zY2FsZS5sb2coKS5kb21haW4oWzEwMCwgbnVtTm9kZXMrMTAwXSkucmFuZ2UoWzAsNjBdKTtcblx0XHRcdFx0XHRcdC8vIHZhciB0aGlzUG9zID0gTWF0aC5wb3coaSsxLCAuNykgKiAxO1xuXHRcdFx0XHRcdFx0Ly8gY29uc29sZS5sb2codGhpc1Bvcyk7XG5cdFx0XHRcdFx0XHR2YXIgbmV3aSA9IE1hdGgucG93KGkrMSwgLjMpO1xuXHRcdFx0XHRcdFx0dmFyIG5ld2kgPSAoaSkrMTAwO1xuXHRcdFx0XHRcdFx0dmFyIHRoaXNQb3MgPSBwb3dTY2FsZShuZXdpKTtcblx0XHRcdFx0XHRcdC8vIGNvbnNvbGUubG9nKHRoaXNQb3MpXG5cdFx0XHRcdFx0XHR2YXIgYiA9IDc7XG5cdFx0XHRcdFx0XHR2YXIgdGhpc1BvcyA9IGFuZ2xlc1tpXTtcblx0XHRcdFx0XHRcdGQueCA9IGN4ICsgKGluaXRpYWxSYWQgKyBiICogdGhpc1BvcykgKiBNYXRoLmNvcyh0aGlzUG9zKTtcblx0XHRcdFx0XHRcdGQueSA9IGN5ICsgKGluaXRpYWxSYWQgKyBiICogdGhpc1BvcykgKiBNYXRoLnNpbih0aGlzUG9zKTtcblxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdHNlbGYuZm9yY2Uuc3RhcnQoKTtcblx0XHRcdFx0c2VsZi5mb3JjZS50aWNrKCk7XG5cdFx0XHRcdHNlbGYuZm9yY2Uuc3RvcCgpO1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdH1cbiAgICBwbGFjZU5vZGVzKCk7XG5cblx0c2VsZi5sZWdlbmRJbml0KCk7XG5cdHNlbGYuYWRkQXV0aG9ySW1hZ2UoKTtcblx0c2VsZi5hZGRFdmVudExpc3RlbmVycygpO1xuXG4gICAgc2VsZi55ZWFyVGV4dERpc3BsYXkgPSBzZWxmLnN2Zy5hcHBlbmQoJ3N2Zzp0ZXh0JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCBzZWxmLmdyYXBoRGltZW5zaW9ucy53aWR0aCAqIDgvOSlcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3knLCBzZWxmLmdyYXBoRGltZW5zaW9ucy5oZWlnaHQgKiAxMi8xMylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2R5JywgJy0uM2VtJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2ZvbnQtc2l6ZScsICcxMGVtJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ2VuZCcpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgncG9pbnRlci1ldmVudHMnLCAnbm9uZScpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDFlLTkpXG5cdFx0XHRcdFx0LnRleHQoc2VsZi5kYXRhLmdyYXBoLnllYXJSYW5nZVswXSk7XG5cblx0c2VsZi5yZXZlYWxFZ29Ob2RlKCk7XG5cbn07XG5cbmVnb0dyYXBoVmlzLnByb3RvdHlwZS5tYWtlWm9vbSA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXHRyZXR1cm4gZDMuYmVoYXZpb3Iuem9vbSgpXG5cdFx0LmNlbnRlcihbc2VsZi5ncmFwaERpbWVuc2lvbnMud2lkdGgvMiwgc2VsZi5ncmFwaERpbWVuc2lvbnMuaGVpZ2h0LzJdKVxuXHRcdC5zY2FsZUV4dGVudChbMC4yLCAxMF0pXG5cdFx0Lm9uKCd6b29tJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRzZWxmLmdyb3VwLmF0dHIoXG5cdFx0XHRcdCd0cmFuc2Zvcm0nLFxuXHRcdFx0XHQndHJhbnNsYXRlKCcgKyBkMy5ldmVudC50cmFuc2xhdGUgKyAnKScgK1xuXHRcdFx0XHRcdCdzY2FsZSgnICsgZDMuZXZlbnQuc2NhbGUgKyAnKSdcblx0XHRcdCk7XG5cdFx0fSk7XG59O1xuXG5lZ29HcmFwaFZpcy5wcm90b3R5cGUubWFrZVRpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIC8vIGNhY2hlIGZ1bmN0aW9uIGNyZWF0aW9uIGZvciB0aW55IG9wdGltaXphdGlvblxuICAgIGZ1bmN0aW9uIHgxKGQpIHsgcmV0dXJuIGQuc291cmNlLng7IH1cbiAgICBmdW5jdGlvbiB5MShkKSB7IHJldHVybiBkLnNvdXJjZS55OyB9XG4gICAgZnVuY3Rpb24geDIoZCkgeyByZXR1cm4gZC50YXJnZXQueDsgfVxuICAgIGZ1bmN0aW9uIHkyKGQpIHsgcmV0dXJuIGQudGFyZ2V0Lnk7IH1cbiAgICAvLyBmdW5jdGlvbiB0cmFuc2Zvcm0oZCkge1xuICAgIC8vICAgICBkLnggPSBNYXRoLm1heCg0LjUsIE1hdGgubWluKHNlbGYuZ3JhcGhEaW1lbnNpb25zLndpZHRoIC0gNC41LCBkLngpKTtcbiAgICAvLyAgICAgZC55ID0gTWF0aC5tYXgoNC41LCBNYXRoLm1pbihzZWxmLmdyYXBoRGltZW5zaW9ucy5oZWlnaHQgLSA0LjUsIGQueSkpO1xuICAgIC8vICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgnICsgZC54ICsgJywnICsgZC55ICsgJyknO1xuICAgIC8vIH1cbiAgICBmdW5jdGlvbiB0cmFuc2Zvcm0oZCkge1xuXHRcdC8vIFRoZSBiZWxvdyBsaW5lcyBjb25zdHJhaW4gdGhlIG5vZGVzIHRvIHN0YXkgd2l0aGluIHRoZSBib3VuZHMgb2YgdGhlIG9yaWdpbmFsIGRpc3BsYXkuXG5cdFx0aWYgKHNlbGYuem9vbWFibGUgPT09IGZhbHNlKSB7XG5cdFx0XHRkLnggPSBNYXRoLm1heCg0LjUsIE1hdGgubWluKHNlbGYuZ3JhcGhEaW1lbnNpb25zLndpZHRoIC0gNC41LCBkLngpKTtcblx0XHRcdGQueSA9IE1hdGgubWF4KDQuNSwgTWF0aC5taW4oc2VsZi5ncmFwaERpbWVuc2lvbnMuaGVpZ2h0IC0gNC41LCBkLnkpKTtcblx0XHR9XG4gICAgICAgIHJldHVybiAndHJhbnNsYXRlKCcgKyBkLnggKyAnLCcgKyBkLnkgKyAnKSc7XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYubGlua1xuICAgICAgICAgICAgLmF0dHIoJ3gxJywgeDEpXG4gICAgICAgICAgICAuYXR0cigneTEnLCB5MSlcbiAgICAgICAgICAgIC5hdHRyKCd4MicsIHgyKVxuICAgICAgICAgICAgLmF0dHIoJ3kyJywgeTIpO1xuICAgICAgICBzZWxmLm5vZGVcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCB0cmFuc2Zvcm0pO1xuICAgIH07XG59O1xuXG5lZ29HcmFwaFZpcy5wcm90b3R5cGUubWFrZUZvcmNlID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICByZXR1cm4gZDMubGF5b3V0LmZvcmNlKClcbiAgICAgICAgLnNpemUoW3NlbGYuZ3JhcGhEaW1lbnNpb25zLndpZHRoLCBzZWxmLmdyYXBoRGltZW5zaW9ucy5oZWlnaHRdKVxuICAgICAgICAubGlua0Rpc3RhbmNlKDIyNSlcbiAgICAgICAgLy8ubGlua0Rpc3RhbmNlKGZ1bmN0aW9uKGQpIHsgY29uc29sZS5sb2coc2VsZi5sZFNjbChkLnNvdXJjZS5ZZWFyKSk7IHJldHVybiBzZWxmLmxkU2NsKGQuc291cmNlLlllYXIpID8gNzUgKyBzZWxmLmxkU2NsKGQuc291cmNlLlllYXIpIDogMDt9KVxuICAgICAgICAvLy5saW5rU3RyZW5ndGgoZnVuY3Rpb24oZCkgeyByZXR1cm4gc2VsZi5sc1NjbChkLnNvdXJjZS5ZZWFyKSA/IHNlbGYubHNTY2woZC5zb3VyY2UuWWVhcikgOiAwO30pXG4gICAgICAgIC8vIC5jaGFyZ2UoLTE1KVxuICAgICAgICAvLyAuZ3Jhdml0eSgwLjAzKVxuICAgICAgICAvLyAuZnJpY3Rpb24oMC44KVxuICAgICAgICAvLyAudGhldGEoMC45KVxuICAgICAgICAvLyAuYWxwaGEoMC4xKVxuICAgICAgICAub24oJ3RpY2snLCB0aGlzLnRpY2spO1xufTtcblxuZWdvR3JhcGhWaXMucHJvdG90eXBlLmltcG9ydERlZmF1bHRPcHRpb25zID0gZnVuY3Rpb24ob3B0aW9ucykge1xuXHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0c2VsZi5jb2xvclNjaGVtZSA9IG9wdGlvbnMuY29sb3JTY2hlbWU7XG5cblx0c2VsZi5ncmFwaERpbWVuc2lvbnMgPSBvcHRpb25zLmRpbWVuc2lvbnM7XG5cblx0c2VsZi50cmFuc2l0aW9uVGltZVBlclllYXIgPSBvcHRpb25zLnRyYW5zaXRpb25UaW1lUGVyWWVhcjtcblxuXHRjb25zb2xlLmxvZyhvcHRpb25zKTtcblxufTtcblxuZWdvR3JhcGhWaXMucHJvdG90eXBlLmdldERvbWFpbnNUaGlzR3JhcGggPSBmdW5jdGlvbigpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdHZhciBkb21haW5zID0gc2VsZi5kYXRhLmdyYXBoLkRvbWFpbnM7XG5cdGNvbnNvbGUubG9nKGRvbWFpbnMpO1xuXG5cdHZhciBtYXhEb21haW5zID0gc2VsZi5jb2xvclNjaGVtZS5sZW5ndGg7XG5cdFxuXHQvLyBzZWxmLmRvbWFpbnNUaGlzR3JhcGggd2lsbCBiZSBhbiBhcnJheSBvZiB7a2V5OiBcIkRvbWFpbklEXCIsIHZhbHVlczogY291bnR9XG5cdHNlbGYuZG9tYWluc1RoaXNHcmFwaCA9IGQzLm5lc3QoKVxuXHRcdC5rZXkoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5Eb21haW5JRDsgfSlcblx0XHQucm9sbHVwKGZ1bmN0aW9uKGxlYXZlcykgeyByZXR1cm4gbGVhdmVzLmxlbmd0aDsgfSlcblx0XHQuZW50cmllcyhzZWxmLm5vdEVnb05vZGVzKTtcblx0c2VsZi5kb21haW5zVGhpc0dyYXBoLnNvcnQoZnVuY3Rpb24oYSxiKSB7IHJldHVybiBkMy5kZXNjZW5kaW5nKGEudmFsdWVzLCBiLnZhbHVlcyk7IH0pO1xuXHQvLyBBZGQgYSBmZXcgbW9yZSB2YXJpYWJsZXMgdG8gdGhlIGRvbWFpbnNUaGlzR3JhcGggZGF0YTpcblx0Zm9yICh2YXIgaT0wOyBpPHNlbGYuZG9tYWluc1RoaXNHcmFwaC5sZW5ndGg7IGkrKykge1xuXHRcdC8vIHZhciBrZXkgPSArc2VsZi5kb21haW5zVGhpc0dyYXBoW2ldLmtleTtcblx0XHR2YXIga2V5ID0gc2VsZi5kb21haW5zVGhpc0dyYXBoW2ldLmtleTtcblx0XHRzZWxmLmRvbWFpbnNUaGlzR3JhcGhbaV0uRG9tYWluSUQgPSBrZXk7XG5cdFx0aWYgKGk8bWF4RG9tYWlucy0xKSB7XG5cdFx0XHRzZWxmLmRvbWFpbnNUaGlzR3JhcGhbaV0uRG9tYWluTmFtZSA9IGRvbWFpbnNba2V5XTtcblx0XHRcdHNlbGYuZG9tYWluc1RoaXNHcmFwaFtpXS5jb2xvciA9IHNlbGYuY29sb3JTY2hlbWVbaV07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHNlbGYuZG9tYWluc1RoaXNHcmFwaFtpXS5Eb21haW5OYW1lID0gXCJPdGhlclwiO1xuXHRcdFx0c2VsZi5kb21haW5zVGhpc0dyYXBoW2ldLmNvbG9yID0gc2VsZi5jb2xvclNjaGVtZVttYXhEb21haW5zLTFdO1xuXHRcdH1cblx0fVxuXHRjb25zb2xlLmxvZyhzZWxmLmRvbWFpbnNUaGlzR3JhcGgpO1xufTtcblxuZWdvR3JhcGhWaXMucHJvdG90eXBlLmxlZ2VuZEluaXQgPSBmdW5jdGlvbigpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdHZhciBzcXVhcmVTaXplID0gc2VsZi5ncmFwaERpbWVuc2lvbnMud2lkdGggLyA3MDtcbiAgICB2YXIgcGFkZGluZyA9IHNxdWFyZVNpemUgLyAzO1xuICAgIHZhciBzcXJQbHVzUGFkZGluZyA9IHNxdWFyZVNpemUgKyBwYWRkaW5nO1xuXG4gICAgc2VsZi5sZWdlbmQgPSBzZWxmLnN2Zy5hcHBlbmQoJ2cnKVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnbGVnZW5kJylcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJytwYWRkaW5nKycsJytwYWRkaW5nKycpJyk7XG4gICAgICAgIC8vIC5zdHlsZSgnb3BhY2l0eScsIDFlLTkpO1xuXHRjb25zb2xlLmxvZyhzZWxmLmRvbWFpbnNUaGlzR3JhcGgpO1xuXG4gICAgdmFyIGxlZ2VuZEl0ZW0gPSBzZWxmLmxlZ2VuZC5zZWxlY3RBbGwoJ2cnKVxuICAgICAgICAuZGF0YShzZWxmLmRvbWFpbnNUaGlzR3JhcGgpXG4gICAgICAgIC5lbnRlcigpXG4gICAgICAgIC5hcHBlbmQoJ2cnKVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnbGVnZW5kSXRlbScpXG5cdFx0Ly8gYWRkIFwib3RoZXJcIiBjbGFzcyB0byBsYXN0IGxlZ2VuZCBpdGVtXG5cdFx0LmNsYXNzZWQoJ290aGVyJywgZnVuY3Rpb24oZCkgeyBcblx0XHRcdHJldHVybiAoZC5Eb21haW5JRCAhPSAwICYmIGQuRG9tYWluTmFtZS50b0xvd2VyQ2FzZSgpPT1cIm90aGVyXCIpID8gdHJ1ZSA6IGZhbHNlO1xuXHRcdH0pXG4gICAgICAgIC5hdHRyKCdpZCcsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIC8vIHJldHVybiAnbGVnZW5kQ2x1c3RlcicgKyBkLmNsdXN0ZXI7IH0pXG4gICAgICAgICAgICAvLyBVc2UgRG9tYWluIGluc3RlYWQgb2YgY2x1c3RlclxuICAgICAgICAgICAgcmV0dXJuICdsZWdlbmREb21haW4nICsgZC5Eb21haW5JRC5yZXBsYWNlKFwiIFwiLCBcIlwiKTsgfSlcblx0XHQub24oXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24oZCkge1xuXHRcdFx0ZDMuc2VsZWN0QWxsKFwiLm5vZGVcIilcblx0XHRcdFx0LmZpbHRlcihmdW5jdGlvbihkZCkge1xuXHRcdFx0XHRcdHJldHVybiBkLmNvbG9yPT1kZC5jb2xvcjtcblx0XHRcdFx0fSlcblx0XHRcdFx0LmNsYXNzZWQoXCJsZWdlbmRIb3ZlclwiLCB0cnVlKTtcblxuXHRcdH0pXG5cdFx0Lm9uKFwibW91c2VvdXRcIiwgZnVuY3Rpb24oZCkge1xuXHRcdFx0ZDMuc2VsZWN0QWxsKFwiLm5vZGVcIikuY2xhc3NlZChcImxlZ2VuZEhvdmVyXCIsIGZhbHNlKTtcblx0XHR9KVxuXHRcdC5hdHRyKFwiZGlzcGxheVwiLCBmdW5jdGlvbihkLCBpKSB7XG5cdFx0XHRcdC8vIGhpZGUgYWxsIFwib3RoZXJcIiBkb21haW4gb2JqZWN0cyBleGNlcHQgdGhlIGZpcnN0IG9uZVxuXHRcdFx0XHRpZiAoaTxzZWxmLmNvbG9yU2NoZW1lLmxlbmd0aCkge1xuXHRcdFx0XHRcdHJldHVybiBcIlwiO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJldHVybiBcIm5vbmVcIjtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG4gICAgICAgIC8vIC8vIHN0YXJ0IG9mZiBoaWRkZW4gaWYgbm90IHRoZSBzYW1lIGRvbWFpbiBhcyB0aGUgZWdvIG5vZGVcbiAgICAgICAgLy8gLnN0eWxlKCdvcGFjaXR5JywgZnVuY3Rpb24oZCkge1xuICAgICAgICAvLyAgICAgLy8gdmFyIHRoaXNUb3BDbHVzdGVyID0gZC5jbHVzdGVyLnNwbGl0KCc6JylbMF07XG4gICAgICAgIC8vICAgICAvLyBpZiAodGhpc1RvcENsdXN0ZXIgPT09IGVnb05vZGVUb3BDbHVzdGVyKSByZXR1cm4gMTsgZWxzZSByZXR1cm4gMDtcbiAgICAgICAgLy8gICAgIGlmIChkLkRvbWFpbklEPT09c2VsZi5lZ29Ob2RlLkRvbWFpbklEKSByZXR1cm4gMTsgZWxzZSByZXR1cm4gMDtcbiAgICAgICAgLy8gfSk7XG4gICAgLy8gLy8gRG9uJ3QgaGlkZSB0aGUgbGVnZW5kIGlmIGFubm90YXRpb25zIGFyZSB0dXJuZWQgb2ZmXG4gICAgLy8gLy8gbWF5YmUgdHJ5IGEgZGlmZmVyZW50IGFwcHJvYWNoIGxhdGVyXG4gICAgLy8gaWYgKCAhc2VsZi5ncmFwaFBhcmFtcy5kb0Fubm90YXRpb25zLnZhbHVlICkgbGVnZW5kSXRlbS5zdHlsZSgnb3BhY2l0eScsIDEpO1xuXG4gICAgbGVnZW5kSXRlbS5hcHBlbmQoJ3N2ZzpyZWN0JylcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgc3F1YXJlU2l6ZSlcbiAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHNxdWFyZVNpemUpXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgwLCcgKyAoc3FyUGx1c1BhZGRpbmcgKiBpKSArICcpJztcbiAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoJ2ZpbGwnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gZC5jb2xvcjsgfSk7XG4gICAgbGVnZW5kSXRlbS5hcHBlbmQoJ3N2Zzp0ZXh0JylcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgnICsgKHNxclBsdXNQYWRkaW5nKSArICcsJyArIChzcXJQbHVzUGFkZGluZyAqIGkpICsgJyknO1xuICAgICAgICB9KVxuICAgICAgICAuYXR0cignZHknLCAnMWVtJylcbiAgICAgICAgLnRleHQoZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgIC8vIHJldHVybiAnUGFwZXJzIGluIGNhdGVnb3J5IFwiJyArIGQuRG9tYWluTmFtZSArICdcIiAoZG9tYWluICcgKyBkLkRvbWFpbklEICsgJyknO1xuXHRcdFx0XHRpZiAoZC5Eb21haW5JRCAhPSAwICYmIGQuRG9tYWluTmFtZS50b0xvd2VyQ2FzZSgpPT1cIm90aGVyXCIpIHtcblx0XHRcdFx0XHRyZXR1cm4gXCJQYXBlcnMgaW4gb3RoZXIgY2F0ZWdvcmllc1wiO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJldHVybiAnUGFwZXJzIGluIGNhdGVnb3J5IFwiJyArIGQuRG9tYWluTmFtZSArICdcIic7XG5cdFx0XHRcdH1cbiAgICAgICAgfSlcblx0XHQuc3R5bGUoJ2ZvbnQtc2l6ZScsICcuOWVtJyk7XG5cblxufTtcblxuZWdvR3JhcGhWaXMucHJvdG90eXBlLmFkZEF1dGhvckltYWdlID0gZnVuY3Rpb24oKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblx0aWYgKHNlbGYuZWdvTm9kZS5oYXNPd25Qcm9wZXJ0eSgnbmFtZScpKSB7XG5cdFx0c2VsZi5lZ29Ob2RlLkF1dGhvck5hbWUgPSBzZWxmLmVnb05vZGUubmFtZTtcblx0fVxuXHRpZiAoc2VsZi5lZ29Ob2RlLmhhc093blByb3BlcnR5KCdBdXRob3JOYW1lJykpIHtcblx0XHRcblx0XHRzZWxmLmF1dGhvckltYWdlRGl2ID0gc2VsZi5zdmcuYXBwZW5kKCdmb3JlaWduT2JqZWN0JykuYXR0cignY2xhc3MnLCAnZXh0ZXJuYWxPYmplY3QnKVxuXHRcdFx0LmF0dHIoJ3gnLCAwKVxuXHRcdFx0LmF0dHIoJ3knLCBzZWxmLmdyYXBoRGltZW5zaW9ucy5oZWlnaHQvMiAtIDUwKVxuXHRcdFx0Ly8gLmF0dHIoJ2hlaWdodCcsIHNlbGYuZ3JhcGhEaW1lbnNpb25zLmhlaWdodC81KVxuXHRcdFx0LmF0dHIoJ2hlaWdodCcsICcxMDAlJylcblx0XHRcdC5hdHRyKCd3aWR0aCcsIHNlbGYuZ3JhcGhEaW1lbnNpb25zLmhlaWdodC81KVxuXHRcdFx0LmFwcGVuZCgneGh0bWw6ZGl2Jylcblx0XHRcdC5hdHRyKCdpZCcsICdhdXRob3JJbWFnZURpdicpO1xuXHRcdHNlbGYuYXV0aG9ySW1hZ2VEaXZcblx0XHRcdC5hcHBlbmQoJ3hodG1sOnAnKVxuXHRcdFx0Lmh0bWwoJzxwPicgKyBzZWxmLmRhdGEubm9kZXNbMF0uQXV0aG9yTmFtZS5jYXBpdGFsaXplKCkgKyAnPC9wPicpO1xuXG5cdFx0dmFyIGF1dGhvckltYWdlQ29udGFpbmVyID0gc2VsZi5hdXRob3JJbWFnZURpdlxuXHRcdFx0LmFwcGVuZCgneGh0bWwnKVxuXHRcdFx0LmF0dHIoJ2lkJywgJ2F1dGhvckltYWdlQ29udGFpbmVyJyk7XG5cblx0XHQvLyBBZGQgY29udGVudCBmb3IgSFJBIGF1dGhvcnNcblx0XHR2YXIgYXV0aG9yT3JnID0gc2VsZi5kYXRhLm5vZGVzWzBdLm9yZ2FuaXphdGlvbjtcblx0XHRjb25zb2xlLmxvZyhhdXRob3JPcmcpO1xuXHRcdGlmICh0eXBlb2YgYXV0aG9yT3JnICE9ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRkMy50c3YoXCJzdGF0aWMvaGVhbHRocmEvb3Jnc193aXRoX2xpbmtzLnRzdlwiLCBmdW5jdGlvbihlcnJvciwgb3JnX2RhdGEpIHtcblx0XHRcdFx0aWYgKGVycm9yKSB0aHJvdyBlcnJvcjtcblx0XHRcdFx0dmFyIHBzdHlsZSA9ICdzdHlsZT1cIm1hcmdpbjogMDsgcGFkZGluZzogMDsgZm9udC1zaXplOiAuODVlbVwiJ1xuXHRcdFx0XHRjb25zb2xlLmxvZyhvcmdfZGF0YSk7XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwLCBsZW4gPSBvcmdfZGF0YS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0XHRcdGlmIChvcmdfZGF0YVtpXVsnb3JnX25hbWUnXSA9PSBhdXRob3JPcmcpIHtcblx0XHRcdFx0XHRcdHZhciBuYW1lRnJvbVRTViA9IG9yZ19kYXRhW2ldWydtYXRjaF9uYW1lJ107XG5cdFx0XHRcdFx0XHRpZiAoICh0eXBlb2YgbmFtZUZyb21UU1YgIT0gJ3VuZGVmaW5lZCcpICYmIChuYW1lRnJvbVRTViAhPSAnJykgKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBvcmdMaW5rID0gb3JnX2RhdGFbaV1bJ2xpbmsnXTtcblx0XHRcdFx0XHRcdFx0dmFyIG9yZ0ltZ1VybCA9IG9yZ19kYXRhW2ldWydpbWdfdXJsJ107XG5cdFx0XHRcdFx0XHRcdHNlbGYuYXV0aG9ySW1hZ2VEaXZcblx0XHRcdFx0XHRcdFx0XHQuYXBwZW5kKCd4aHRtbDpwJylcblx0XHRcdFx0XHRcdFx0XHQuaHRtbCgnPGEgaHJlZj1cIicgKyBvcmdMaW5rICsgJ1wiIHRhcmdldD1cIl9ibGFua1wiPjxwICcgKyBwc3R5bGUgKyAnPicgKyBuYW1lRnJvbVRTViArICc8L3A+Jyk7XG5cdFx0XHRcdFx0XHRcdHZhciBhdXRob3JJbWFnZSA9IGFkZEltYWdlKG9yZ0ltZ1VybCk7XG5cdFx0XHRcdFx0XHRcdGF1dGhvckltYWdlLnN0eWxlKCdjdXJzb3InLCAncG9pbnRlcicpO1xuXHRcdFx0XHRcdFx0XHRhdXRob3JJbWFnZS5vbignY2xpY2snLCBmdW5jdGlvbigpIHsgY29uc29sZS5sb2cob3JnTGluayk7IHdpbmRvdy5vcGVuKG9yZ0xpbmssICdfYmxhbmsnKX0pO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0c2VsZi5hdXRob3JJbWFnZURpdlxuXHRcdFx0XHRcdFx0XHRcdC5hcHBlbmQoJ3hodG1sOnAnKVxuXHRcdFx0XHRcdFx0XHRcdC5odG1sKCc8cCBzdHlsZT1cIm1hcmdpbjogMDsgcGFkZGluZzogMDsgZm9udC1zaXplOiAuODVlbVwiPicgKyBhdXRob3JPcmcgKyAnPC9wPicpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGFkZEltYWdlKGF1dGhvckltYWdlU3JjKSB7XG5cdFx0dmFyIGF1dGhvckltYWdlID0gYXV0aG9ySW1hZ2VDb250YWluZXJcblx0XHRcdC5hcHBlbmQoJ3hodG1sOmltZycpXG5cdFx0XHQuYXR0cignc3JjJywgYXV0aG9ySW1hZ2VTcmMpXG5cdFx0XHQuYXR0cignaWQnLCAnYXV0aG9ySW1hZ2UnKVxuXHRcdFx0LmF0dHIoJ3dpZHRoJywgJzg1cHgnKTtcblx0XHRyZXR1cm4gYXV0aG9ySW1hZ2U7XG5cdH1cblxuXHQvLyBJZiBhbiBpbWFnZSBVUkwgaXMgaW5jbHVkZWQgaW4gdGhlIGRhdGE6XG5cdHZhciBBdXRob3JJbWdVcmwgPSBzZWxmLmRhdGEubm9kZXNbMF0uQXV0aG9ySW1nVXJsIHx8IHNlbGYuZGF0YS5ub2Rlc1swXS5JbWdVUkw7XG5cdGNvbnNvbGUubG9nKEF1dGhvckltZ1VybCk7XG5cdGlmICh0eXBlb2YgQXV0aG9ySW1nVXJsICE9ICd1bmRlZmluZWQnKSB7XG5cdFx0YWRkSW1hZ2UoQXV0aG9ySW1nVXJsKTtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvLyBQZXcgbWV0aG9kIG9mIGdldHRpbmcgYXV0aG9yIGltYWdlOlxuXHQvLyBUcnkgc29tZSBmaWxlbmFtZSBleHRlbnNpb25zIGFuZCBhdHRlbXB0IHRvIGluc2VydCB0aGUgaW1hZ2Vcblx0dmFyIHBld2lkX3N0ciA9IHNlbGYuZGF0YS5ub2Rlc1swXS5QZXdTY2hvbGFySUQ7XG5cdGlmICh0eXBlb2YgcGV3aWRfc3RyID09PSAndW5kZWZpbmVkJykge1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgcGV3aWRfc3RyID0gcGV3aWRfc3RyLnRvU3RyaW5nKCk7XG5cdC8vIHplcm8tcGFkIHRoZSBwZXcgaWRcblx0cGV3aWRfc3RyID0gKCcwMDAnICsgcGV3aWRfc3RyKTtcblx0cGV3aWRfc3RyID0gcGV3aWRfc3RyLnN1YnN0cihwZXdpZF9zdHIubGVuZ3RoLTMpO1xuXHR2YXIgZm5hbWVfcm9vdCA9IFwic3RhdGljL2ltZy9wZXdfcGhvdG9zL1wiICsgcGV3aWRfc3RyO1xuXHR2YXIgcG9zc2libGVFeHRlbnNpb25zID0gWycucG5nJywgJy5qcGcnLCAnLmpwZWcnLCAnLkpQRycsICcuSlBFRycsICcuUE5HJ107XG5cdFxuXHQvLyByZWN1cnNpdmUgZnVuY3Rpb24gdGhhdCBsb29wcyB0aHJvdWdoIHRoZSBkaWZmZXJlbnQgcG9zc2libGUgZmlsZSBleHRlbnNpb25zIGFib3ZlXG5cdGZ1bmN0aW9uIHRyeUltYWdlRmlsZW5hbWVzKGZuYW1lX3Jvb3QsIHBvc3NpYmxlRXh0ZW5zaW9ucywgaXRlcikge1xuXHRcdHZhciBhdXRob3JJbWFnZUZpbGVuYW1lID0gZm5hbWVfcm9vdCArIHBvc3NpYmxlRXh0ZW5zaW9uc1tpdGVyXTtcblx0XHRpZiAoaXRlciA+PSBwb3NzaWJsZUV4dGVuc2lvbnMubGVuZ3RoKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdCQuZ2V0KGF1dGhvckltYWdlRmlsZW5hbWUpXG5cdFx0XHQuZG9uZShmdW5jdGlvbigpIHtcblx0XHRcdFx0YWRkSW1hZ2UoYXV0aG9ySW1hZ2VGaWxlbmFtZSk7XG5cdFx0XHR9KS5mYWlsKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHQvLyByZWN1cnNlXG5cdFx0XHRcdHZhciBjID0gaXRlciArIDE7XG5cdFx0XHRcdHRyeUltYWdlRmlsZW5hbWVzKGZuYW1lX3Jvb3QsIHBvc3NpYmxlRXh0ZW5zaW9ucywgYyk7XG5cdFx0XHR9KTtcblx0fVxuXHR0cnlJbWFnZUZpbGVuYW1lcyhmbmFtZV9yb290LCBwb3NzaWJsZUV4dGVuc2lvbnMsIDApO1xuXG5cblx0dmFyIHBld0NsYXNzID0gc2VsZi5kYXRhLm5vZGVzWzBdLnBld19DbGFzcztcblx0aWYgKHR5cGVvZiBwZXdDbGFzcyAhPSAndW5kZWZpbmVkJykge1xuXHRcdHNlbGYuYXV0aG9ySW1hZ2VEaXZcblx0XHRcdC5hcHBlbmQoJ3hodG1sOnAnKVxuXHRcdFx0Lmh0bWwoJzxwIHN0eWxlPVwibWFyZ2luOiAwOyBwYWRkaW5nOiAwOyBmb250LXNpemU6IC44NWVtXCI+UGV3IFNjaG9sYXIgJyArIHBld0NsYXNzICsgJzwvcD4nKTtcblx0fVxuXG5cbn07XG5cbmVnb0dyYXBoVmlzLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uKCkge1xuXHQvLyBPbmx5IGFkZCBldmVudCBsaXN0ZW5lcnMgaGVyZSB0aGF0IGRvbid0IGFjdCBhY3Jvc3MgZGlmZmVyZW50IHZpcyBvYmplY3RzXG5cdC8vIE90aGVyd2lzZSB0aGV5IG5lZWQgdG8gYmUgYWRkZWQgdG8gKGUuZy4pIGNpdGF0aW9uVmlzX01haW4uanNcblx0XG5cdHZhciBzZWxmID0gdGhpcztcblxuXHRpZiAoc2VsZi56b29tYWJsZSA9PT0gdHJ1ZSkge1xuXHRcdHNlbGYuZ3JvdXAuY2FsbChzZWxmLnpvb20pO1xuXHR9XG5cbiAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXIgdG8gbm9kZXMgZm9yIHRvb2x0aXA6XG4gICAgZDMuc2VsZWN0QWxsKCcubm9kZScpXG5cdFx0LmVhY2goZnVuY3Rpb24oZCkgeyBcblx0XHRcdGQudXBkYXRlZFByb3BzID0gZmFsc2U7XG5cdCAgICAgICAgZC50b29sdGlwSHRtbCA9ICc8cD5Mb2FkaW5nLi4uPC9wPidcdH0pO1xuXHQvLyBzZWxmLnRpcC5odG1sKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQudG9vbHRpcEh0bWw7IH0pO1xuXHRkMy5zZWxlY3RBbGwoJy5ub2RlJylcbiAgICAgICAgLm9uKCdtb3VzZW92ZXInLCBmdW5jdGlvbihkKSB7XG5cdFx0XHRkLmhvdmVyZWQgPSB0cnVlO1xuXHRcdFx0dmFyIGhvdmVyZWRJdGVtID0gZDMuc2VsZWN0KHRoaXMpO1xuXHRcdFx0Ly8gc2VsZi50b29sdGlwID0gc2VsZi50b29sdGlwXG5cdFx0XHQvLyBcdC5odG1sKGQudG9vbHRpcEh0bWwpXG5cdFx0XHQvLyBcdC5zdHlsZSgndmlzaWJpbGl0eScsICd2aXNpYmxlJylcblx0XHRcdC8vIFx0LnN0eWxlKCdib3JkZXItc3R5bGUnLCAnc29saWQnKVxuXHRcdFx0Ly8gXHQuc3R5bGUoJ2JvcmRlci1jb2xvcicsIGQuY29sb3IpO1xuXHRcdFx0Ly8gdGhlIGZpcnN0IHRpbWUgYSBub2RlIGlzIG1vdXNlZCBvdmVyLCByZXRyaWV2ZSBhZGRpdGlvbmFsIHByb3BlcnRpZXMgaWYgaXQgaXMgYSBwYXBlciBub2RlXG5cdFx0XHQvLyBpZiAoIChkLm5vZGVUeXBlID09PSAncGFwZXInKSAmJiAoIWQudXBkYXRlZFByb3BzKSApIHtcblx0XHRcdC8vIFx0JC5hamF4KHtcblx0XHRcdC8vIFx0XHRkYXRhVHlwZTogJ2pzb24nLFxuXHRcdFx0Ly8gXHRcdHVybDogJFNDUklQVF9ST09UICsgJy9fdmlzX2dldF9tb3JlX3BhcGVyaW5mbycsXG5cdFx0XHQvLyBcdFx0ZGF0YToge3BhcGVyaWQ6IGQuaWR9LFxuXHRcdFx0Ly8gXHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3VsdCkge1xuXHRcdFx0Ly8gXHRcdFx0ZC5UaXRsZSA9IHJlc3VsdFsndGl0bGUnXTtcblx0XHRcdC8vIFx0XHRcdGQuZG9pID0gcmVzdWx0Wydkb2knXTtcblx0XHRcdC8vIFx0XHRcdGQuY2l0YXRpb24gPSByZXN1bHRbJ2NpdGF0aW9uJ107XG5cdFx0XHQvLyBcdFx0XHRkLnVwZGF0ZWRQcm9wcyA9IHRydWU7XG5cdFx0XHQvLyBcdFx0XHQvLyBkLnRvb2x0aXBIdG1sID0gJzxwPicgKyBkLmNpdGF0aW9uICsgJzwvcD4nO1xuXHRcdFx0Ly8gXHRcdFx0Ly8gZC50b29sdGlwSHRtbCA9IGQudG9vbHRpcEh0bWwgKyAnPGJyPic7XG5cdFx0XHQvLyBcdFx0XHQvLyBkLnRvb2x0aXBIdG1sID0gZC50b29sdGlwSHRtbCArICc8cD5DYXRlZ29yeTogJyArIGQuRG9tYWluTmFtZSArICc8L3A+Jztcblx0XHRcdC8vIFx0XHRcdC8vIGlmIChkLmhvdmVyZWQpIHtcblx0XHRcdC8vIFx0XHRcdC8vIFx0c2VsZi50aXAuc2hvdyhkLCBob3ZlcmVkSXRlbS5ub2RlKCkpO1xuXHRcdFx0Ly8gXHRcdFx0Ly8gXHQvLyBzZWxmLnRpcC5zaG93KGQpO1xuXHRcdFx0Ly8gXHRcdFx0Ly8gfVxuICAgICAgICAgICAgLy9cblx0XHRcdC8vIFx0XHR9XG5cdFx0XHQvLyBcdH0pO1xuXHRcdFx0Ly8gfSBlbHNlIGlmICggZC5pZHggPT0gMCApIHtcblx0XHRcdC8vIFx0ZC50b29sdGlwSHRtbCA9ICc8cD4nO1xuXHRcdFx0Ly8gXHRpZiAoZC5ub2RlVHlwZSkge1xuXHRcdFx0Ly8gXHRcdGQudG9vbHRpcEh0bWwgPSBkLnRvb2x0aXBIdG1sICsgZC5ub2RlVHlwZS5jYXBpdGFsaXplKCkgKyAnOiAnO1xuXHRcdFx0Ly8gXHR9XG5cdFx0XHQvLyBcdGQudG9vbHRpcEh0bWwgPSBkLnRvb2x0aXBIdG1sICsgZC5uYW1lO1xuXHRcdFx0Ly8gXHRkLnRvb2x0aXBIdG1sID0gZC50b29sdGlwSHRtbCArICc8L3A+Jztcblx0XHRcdC8vIFx0dmFyIG51bWJlck9mUHVicyA9IGQucGFwZXJzLmxlbmd0aDtcblx0XHRcdC8vIFx0ZC50b29sdGlwSHRtbCA9IGQudG9vbHRpcEh0bWwgKyAnPHA+TnVtYmVyIG9mIFB1YmxpY2F0aW9uczogJyArIG51bWJlck9mUHVicyArICc8L3A+Jztcblx0XHRcdC8vIFx0XG5cdFx0XHQvLyB9XG5cdFx0XHQvLyBzZWxmLnRpcC5zdHlsZSgnYm9yZGVyLWNvbG9yJywgZC5jb2xvcilcblx0XHRcdC8vIFx0LnNob3coZCwgaG92ZXJlZEl0ZW0ubm9kZSgpKTtcblx0XHRcdFx0Ly8gLnNob3coZCk7XG5cdFx0XHQvLyBzZWxmLm1ha2VUb29sdGlwKGQsIGZ1bmN0aW9uKHRvb2x0aXBIdG1sKSB7XG5cdFx0XHQvLyBcdHNlbGYudG9vbHRpcCA9IHNlbGYudG9vbHRpcFxuXHRcdFx0Ly8gXHRcdC5odG1sKHRvb2x0aXBIdG1sKVxuXHRcdFx0Ly8gXHRcdC5zdHlsZSgndmlzaWJpbGl0eScsICd2aXNpYmxlJylcblx0XHRcdC8vIFx0XHQuc3R5bGUoJ2JvcmRlci1zdHlsZScsICdzb2xpZCcpXG5cdFx0XHQvLyBcdFx0LnN0eWxlKCdib3JkZXItY29sb3InLCBkLmNvbG9yKTtcblx0XHRcdC8vIH0pO1xuXHRcdFx0Ly8gZ29pbmcgdG8gdHJ5IHRvIHVzZSB0aGUgbWV0aG9kIG9mIGdldHRpbmcgdGhlIGNpdGF0aW9uIHRleHQuIGJ1dCBub3Qgd29ya2luZyB5ZXRcblx0XHRcdC8vIGdldENpdGF0aW9uKGQuUGFwZXJJRCwgdGhpcyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignbW91c2Vtb3ZlJywgZnVuY3Rpb24oZCkge1xuXHRcdFx0Ly8gc2VsZi50aXAuc2hvdyhkKTtcbiAgICAgICAgICAgIC8vIHNlbGYudG9vbHRpcCA9IHNlbGYudG9vbHRpcFxuXHRcdFx0Ly8gXHQuaHRtbChkLnRvb2x0aXBIdG1sKVxuICAgICAgICAgICAgLy8gICAgIC5zdHlsZSgndmlzaWJpbGl0eScsICd2aXNpYmxlJylcbiAgICAgICAgICAgIC8vICAgICAuc3R5bGUoJ3RvcCcsIChkMy5ldmVudC5wYWdlWS0xMCkrJ3B4JylcbiAgICAgICAgICAgIC8vICAgICAuc3R5bGUoJ2xlZnQnLCAoZDMuZXZlbnQucGFnZVgrMTApKydweCcpO1xuICAgICAgICB9KVxuICAgICAgICAub24oJ21vdXNlb3V0JywgZnVuY3Rpb24oZCkge1xuXHRcdFx0ZC5ob3ZlcmVkID0gZmFsc2U7XG5cdFx0XHQvLyBzZWxmLnRpcC5oaWRlKGQpO1xuICAgICAgICAgICAgc2VsZi50b29sdGlwID0gc2VsZi50b29sdGlwLnN0eWxlKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpOyB9KVxuXHRcdC5vbignY2xpY2snLCBmdW5jdGlvbihkKSB7XG5cdFx0XHQvLyB2YXIgZG9pID0gZ2V0RE9JKGQuUGFwZXJJRCwgdGhpcyk7XG5cdFx0XHRpZiAoIChkLm5vZGVUeXBlID09PSAncGFwZXInKSApIHtcblx0XHRcdFx0aWYgKCAoZC5oYXNPd25Qcm9wZXJ0eSgnZG9pJykpICYmIChkLmRvaSAhPT0gJycpICkge1xuXHRcdFx0XHRcdHZhciB1cmwgPSAnaHR0cHM6Ly9kb2kub3JnLycgKyBkLmRvaTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2YXIgdXJsID0gJ2h0dHBzOi8vYWNhZGVtaWMubWljcm9zb2Z0LmNvbS8jL2RldGFpbC8nICsgZC5pZDtcblx0XHRcdFx0fVxuXHRcdFx0XHR3aW5kb3cub3Blbih1cmwsICdfYmxhbmsnKTtcblx0XHRcdFx0XG5cdFx0XHR9XG5cdFx0fSlcblxuXHRmdW5jdGlvbiBnZXRET0kocGFwZXJpZCwgbm9kZU9iaikge1xuXHRcdHZhciB0aGlzTm9kZSA9IGQzLnNlbGVjdChub2RlT2JqKTtcblx0XHQkLmFqYXgoe1xuXHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcblx0XHRcdHVybDogJFNDUklQVF9ST09UICsgJy9fdmlzX2dldF9kb2knLFxuXHRcdFx0ZGF0YToge3BhcGVyaWQ6IHBhcGVyaWR9LFxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24ocmVzdWx0KSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKHJlc3VsdFsnZG9pJ10pO1xuXHRcdFx0XHR2YXIgZG9pID0gcmVzdWx0Wydkb2knXTtcblx0XHRcdFx0aWYgKGRvaSkge1xuXHRcdFx0XHRcdHZhciB1cmwgPSAnaHR0cHM6Ly9kb2kub3JnLycgKyBkb2k7XG5cdFx0XHRcdFx0d2luZG93Lm9wZW4odXJsLCAnX2JsYW5rJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdFxuXHR9XG5cdGZ1bmN0aW9uIGdldENpdGF0aW9uKHBhcGVyaWQsIG5vZGVPYmopIHtcblx0XHQvL1xuXHRcdHZhciB0aGlzTm9kZSA9IGQzLnNlbGVjdChub2RlT2JqKTtcblx0XHQkLmFqYXgoe1xuXHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcblx0XHRcdHVybDogJFNDUklQVF9ST09UICsgJy9fdmlzX2dldF9jaXRhdGlvbicsXG5cdFx0XHRkYXRhOiB7cGFwZXJpZDogcGFwZXJpZH0sXG5cdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHQpIHtcblx0XHRcdFx0Y29uc29sZS5sb2cocmVzdWx0WydjaXRhdGlvbiddKTtcblx0XHRcdFx0dGhpc05vZGUuYXR0cigndGl0bGUnLCByZXN1bHRbJ2NpdGF0aW9uJ10pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cbn07XG5cbmVnb0dyYXBoVmlzLnByb3RvdHlwZS5tYWtlVG9vbHRpcCA9IGZ1bmN0aW9uKGQsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG5cdC8vIEFjY291bnQgZm9yIGF1dGhvciBub2RlOlxuXHRpZiAoZC5ub2RlVHlwZSA9PT0gJ2F1dGhvcicgfHwgZC5ub2RlVHlwZSA9PT0gJycgfHwgZC5ub2RlVHlwZSA9PT0gJ3ZlbnVlJykge1xuXHRcdHZhciB0b29sdGlwSHRtbCA9ICc8cCBjbGFzcz1cImF1dGhvck5hbWVcIj5BdXRob3I6ICcgKyBkLkF1dGhvck5hbWUgKyAnPC9wPic7XG5cdFx0aWYgKGQucGV3X0NsYXNzKSB7XG5cdFx0XHR0b29sdGlwSHRtbCA9IHRvb2x0aXBIdG1sICsgJzxwIGNsYXNzPVwicGV3Q2xhc3NcIj5QZXcgQ2xhc3M6ICcgKyBkLnBld19DbGFzcyArICc8L3A+Jztcblx0XHR9XG5cdFx0dmFyIG51bWJlck9mUHVicyA9IGQucGFwZXJzLmxlbmd0aDtcblx0XHR0b29sdGlwSHRtbCA9IHRvb2x0aXBIdG1sICsgJzxwIGNsYXNzPVwibnVtYmVyT2ZQdWJzXCI+TnVtYmVyIG9mIFB1YmxpY2F0aW9uczogJyArIG51bWJlck9mUHVicyArICc8L3A+Jztcblx0XHQvLyByZXR1cm4gdG9vbHRpcEh0bWw7XG5cdFx0Y2FsbGJhY2sodG9vbHRpcEh0bWwpO1xuXHR9XG5cblx0Ly8gT3RoZXJ3aXNlOiBtYWtlIGEgdG9vbHRpcCBmb3IgYSBwYXBlciBub2RlXG5cdGZ1bmN0aW9uIGdldEF1dGhvckxpc3QoYXV0aG9ycykge1xuXHRcdHZhciBhdXRob3JMaXN0ID0gW107XG5cdFx0YXV0aG9ycy5mb3JFYWNoKGZ1bmN0aW9uKGEpIHtcblx0XHRcdHZhciB0aGlzQXV0aG9yU3RyTGlzdCA9IGFbMV0uc3BsaXQoJyAnKTtcblx0XHRcdC8vIHRoaXNBdXRob3JTdHJMaXN0ID0gdGhpc0F1dGhvclN0ckxpc3QubWFwKGZ1bmN0aW9uKHgpIHsgcmV0dXJuIHguY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB4LnNsaWNlKDEpLnRvTG93ZXJDYXNlKCk7IH0pO1xuXHRcdFx0Ly8gdGhpc0F1dGhvclN0ckxpc3QgPSB0aGlzQXV0aG9yU3RyTGlzdC5tYXAoZnVuY3Rpb24oeCkgeyBpZiAoeCA9PT0geC50b1VwcGVyQ2FzZSgpKSByZXR1cm4geC5jYXBpdGFsaXplKCk7IGVsc2UgcmV0dXJuIHg7fSk7XG5cdFx0XHR0aGlzQXV0aG9yU3RyTGlzdCA9IHRoaXNBdXRob3JTdHJMaXN0Lm1hcChmdW5jdGlvbih4KSB7IGlmICh4ICE9IHgudG9VcHBlckNhc2UoKSkgcmV0dXJuIHguY2FwaXRhbGl6ZSgpOyBlbHNlIHJldHVybiB4O30pO1xuXHRcdFx0Ly8gdmFyIHRoaXNBdXRob3IgPSBhLk5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBhLk5hbWUuc2xpY2UoMSkudG9Mb3dlckNhc2UoKTtcblx0XHRcdHZhciB0aGlzQXV0aG9yID0gdGhpc0F1dGhvclN0ckxpc3Quam9pbignICcpO1xuXHRcdFx0YXV0aG9yTGlzdC5wdXNoKHRoaXNBdXRob3IpO1xuXHRcdH0pO1xuXHRcdHJldHVybiBhdXRob3JMaXN0O1xuXHR9XG5cdGZ1bmN0aW9uIGdldFRpdGxlKHBhcGVyaWQsIGNhbGxiYWNrKSB7XG5cdFx0Ly9cblx0XHQkLmFqYXgoe1xuXHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcblx0XHRcdHVybDogJFNDUklQVF9ST09UICsgJy9fdmlzX2dldF90aXRsZScsXG5cdFx0XHRkYXRhOiB7cGFwZXJpZDogcGFwZXJpZH0sXG5cdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHQpIHtcblx0XHRcdFx0Y2FsbGJhY2socmVzdWx0Wyd0aXRsZSddKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXHRmdW5jdGlvbiBtYWtlSHRtbCgpIHtcblx0XHQvLyB2YXIgdG9vbHRpcEh0bWwgPSAnPHAgY2xhc3M9XCJwYXBlcklEXCI+cElEOiAnICsgZC5pZCArICc8L3A+Jztcblx0XHR2YXIgdG9vbHRpcEh0bWwgPSAnJztcblx0XHR0b29sdGlwSHRtbCA9IHRvb2x0aXBIdG1sICsgJzxwIGNsYXNzPVwicGFwZXJUaXRsZVwiPic7XG5cdFx0dG9vbHRpcEh0bWwgPSB0b29sdGlwSHRtbCArIGQuVGl0bGU7XG5cdFx0dG9vbHRpcEh0bWwgPSB0b29sdGlwSHRtbCArICc8L3A+Jztcblx0XHR0b29sdGlwSHRtbCA9IHRvb2x0aXBIdG1sICsgJzxwIGNsYXNzPVwicGFwZXJZZWFyXCI+JyArIGQuWWVhciArICc8L3A+Jztcblx0XHR2YXIgYXV0aG9yU3RyTGlzdCA9IFtdO1xuXHRcdGQuYXV0aG9yTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGEpIHtcblx0XHRcdGF1dGhvclN0ckxpc3QucHVzaChhKVxuXHRcdH0pO1xuXHRcdHZhciBhdXRob3JMaXN0ID0gYXV0aG9yU3RyTGlzdC5qb2luKCcsICcpO1xuXHRcdHRvb2x0aXBIdG1sID0gdG9vbHRpcEh0bWwgKyAnPHAgY2xhc3M9XCJwYXBlckF1dGhvclwiPkF1dGhvcnM6ICcgKyBhdXRob3JMaXN0ICsgJzwvcD4nO1xuXHRcdHJldHVybiB0b29sdGlwSHRtbDtcblx0fVxuXHRpZiAoIGQuaGFzT3duUHJvcGVydHkoJ2F1dGhvcnMnKSApIHtcblx0XHR2YXIgYXV0aG9yTGlzdCA9IGdldEF1dGhvckxpc3QoZC5hdXRob3JzKTtcblx0XHRkLmF1dGhvckxpc3QgPSBhdXRob3JMaXN0O1xuXHRcdGlmICggZC5oYXNPd25Qcm9wZXJ0eSgnVGl0bGUnKSApe1xuXHRcdFx0dmFyIHRvb2x0aXBIdG1sID0gbWFrZUh0bWwoKTtcblx0XHRcdGNhbGxiYWNrKHRvb2x0aXBIdG1sKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Z2V0VGl0bGUoZC5pZCwgZnVuY3Rpb24odGl0bGUpIHtcblx0XHRcdFx0ZC5UaXRsZSA9IHRpdGxlO1xuXHRcdFx0XHR2YXIgdG9vbHRpcEh0bWwgPSBtYWtlSHRtbCgpO1xuXHRcdFx0XHRjYWxsYmFjayh0b29sdGlwSHRtbCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0JC5hamF4KHtcblx0XHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHR1cmw6ICRTQ1JJUFRfUk9PVCArICcvX3Zpc19nZXRfYXV0aG9yaW5mbycsXG5cdFx0XHRkYXRhOiB7YXV0aG9yaWRzOiBKU09OLnN0cmluZ2lmeShkLkF1dGhvcklETGlzdCl9LFxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24ocmVzdWx0KSB7XG5cdFx0XHRcdGQuYXV0aG9ycyA9IHJlc3VsdFsnYXV0aG9ycyddO1xuXHRcdFx0XHR2YXIgYXV0aG9yTGlzdCA9IGdldEF1dGhvckxpc3QoZC5hdXRob3JzKVxuXHRcdFx0XHRkLmF1dGhvckxpc3QgPSBhdXRob3JMaXN0O1xuXHRcdFx0XHRpZiAoIGQuaGFzT3duUHJvcGVydHkoJ1RpdGxlJykgKXtcblx0XHRcdFx0XHR2YXIgdG9vbHRpcEh0bWwgPSBtYWtlSHRtbCgpO1xuXHRcdFx0XHRcdGNhbGxiYWNrKHRvb2x0aXBIdG1sKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRnZXRUaXRsZShkLmlkLCBmdW5jdGlvbih0aXRsZSkge1xuXHRcdFx0XHRcdFx0ZC5UaXRsZSA9IHRpdGxlO1xuXHRcdFx0XHRcdFx0dmFyIHRvb2x0aXBIdG1sID0gbWFrZUh0bWwoKTtcblx0XHRcdFx0XHRcdGNhbGxiYWNrKHRvb2x0aXBIdG1sKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH1cbiAgICBcbn07XG5cbmVnb0dyYXBoVmlzLnByb3RvdHlwZS5yZXZlYWxFZ29Ob2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgc2VsZi5jdXJyTm9kZUluZGV4ID0gMDsgIC8vIEluZGV4IG9mIGN1cnJlbnQgbm9kZSAoZWdvIG5vZGUpXG5cdHNlbGYuY3VyclllYXIgPSBzZWxmLmRhdGEuZ3JhcGgueWVhclJhbmdlWzBdO1xuXG4gICAgLy8gUmV2ZWFsIGVnbyBub2RlXG5cdGQzLnNlbGVjdEFsbCgnLm5vZGUnKS5maWx0ZXIoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5pZCA9PT0gc2VsZi5lZ29Ob2RlLmlkOyB9KVxuICAgICAgICAuY2xhc3NlZCgnaGlkZGVuJywgZmFsc2UpXG4gICAgICAgIC5jbGFzc2VkKCd2aXNpYmxlJywgdHJ1ZSlcbiAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAvLyAuZGVsYXkoc2VsZi5ncmFwaFBhcmFtcy50cmFuc2l0aW9uVGltZVBlclllYXIudmFsdWUvNClcbiAgICAgICAgLmR1cmF0aW9uKDIwMDApXG4gICAgICAgIC5hdHRyKCdyJywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgIC8vcmV0dXJuIDQuNSArIChzZWxmLmVpZ2VuRmFjdG9yU2NhbGUoZC5FRikgKiAxMCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQucmFkaXVzO1xuICAgICAgICB9KVxuICAgICAgICAuYXR0cignVCcsIDEpXG5cdFx0LmVhY2goJ3N0YXJ0JywgZnVuY3Rpb24oKSB7XG5cdFx0XHRzZWxmLnllYXJUZXh0RGlzcGxheS50cmFuc2l0aW9uKClcblx0XHRcdCAgICAuZGVsYXkoMTAwMClcblx0XHRcdCAgICAuZHVyYXRpb24oMTAwMClcblx0XHRcdCAgICAuc3R5bGUoJ29wYWNpdHknLCAuMTUpO1xuXHRcdH0pXG4gICAgICAgIC5lYWNoKCdlbmQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIHJldmVhbCBsZWdlbmRcbiAgICAgICAgICAgIC8vIHNlbGYubGVnZW5kLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLy8gICAgIC5kZWxheSg0MDAwKVxuICAgICAgICAgICAgLy8gICAgIC5kdXJhdGlvbigxMDAwKVxuICAgICAgICAgICAgLy8gICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpO1xuXG4gICAgICAgICAgICAvLyByZXZlYWwgdGhlIGRpc3BsYXkgb2YgY3VycmVudCB5ZWFyXG4gICAgICAgICAgICAvLyBzZWxmLnllYXJUZXh0RGlzcGxheS50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC8vICAgICAuZHVyYXRpb24oMTAwMClcbiAgICAgICAgICAgIC8vICAgICAuc3R5bGUoJ29wYWNpdHknLCAuMTUpO1xuXG5cdFx0XHQvLyBub3RpZnkgZXZlcnlvbmUgKGkuZS4gdGhlIE1haW4uanMgYW5kIHRoZSBsaW5lIGNoYXJ0cylcblx0XHRcdCQuZXZlbnQudHJpZ2dlcih7XG5cdFx0XHRcdHR5cGU6IFwieWVhckNoYW5nZVwiLFxuXHRcdFx0fSk7XG4gICAgICAgICAgICBzZWxmLmFuaW1hdGVUb0Rlc3RpbmF0aW9uTm9kZSgpO1xuICAgICAgICB9KTtcbn07XG5cbmVnb0dyYXBoVmlzLnByb3RvdHlwZS5hbmltYXRlVG9EZXN0aW5hdGlvbk5vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cblxuXG4gICAgLy8gQ2hlY2sgaWYgd2UncmUgbW92aW5nIGZvcndhcmQgb3IgYmFja3dhcmRcbiAgICAgICAgLy8gaWYgY3Vyck5vZGVJbmRleCA8IGRlc3RpbmF0aW9uTm9kZUluZGV4OlxuICAgICAgICAvLyAgICAgY3Vyck5vZGVJbmRleCsrO1xuICAgICAgICAvLyAgICAgY2hlY2sgZm9yIHllYXJcbiAgICAgICAgLy8gICAgIGRyYXdOb2RlKCk7XG4gICAgaWYgKHNlbGYuY3Vyck5vZGVJbmRleCA9PT0gc2VsZi5kZXN0aW5hdGlvbk5vZGVJbmRleCkge1xuICAgICAgICBjb25zb2xlLmxvZygnZ290byBmaW5pc2gnKTtcbiAgICAgICAgc2VsZi5maW5pc2hBbmltYXRpb24oKTtcbiAgICB9IGVsc2UgaWYgKHNlbGYuY3Vyck5vZGVJbmRleCA8IHNlbGYuZGVzdGluYXRpb25Ob2RlSW5kZXgpIHtcblx0XHRzZWxmLmFuaW1hdGlvblN0YXRlID0gJ2ZvcndhcmQnO1xuICAgICAgICBzZWxmLmN1cnJOb2RlSW5kZXgrKztcbiAgICAgICAgc2VsZi5jaGVja1llYXIoKTtcbiAgICAgICAgLy8gc2VsZi5kcmF3Tm9kZSgpO1xuICAgIH0gZWxzZSBpZiAoc2VsZi5jdXJyTm9kZUluZGV4ID4gc2VsZi5kZXN0aW5hdGlvbk5vZGVJbmRleCkge1xuXHRcdHNlbGYuYW5pbWF0aW9uU3RhdGUgPSAncmV3aW5kJztcbiAgICAgICAgc2VsZi5jdXJyTm9kZUluZGV4LS07XG4gICAgICAgIHNlbGYuY2hlY2tZZWFyKCk7XG4gICAgICAgIC8vIHNlbGYucmVtb3ZlTm9kZSgpO1xuICAgIH1cbn07XG5cbmVnb0dyYXBoVmlzLnByb3RvdHlwZS5jb250aW51ZSA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAvLyBpZiAoc2VsZi5jdXJyTm9kZUluZGV4ID09PSBzZWxmLmRlc3RpbmF0aW9uTm9kZUluZGV4KSB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKCdnb3RvIGZpbmlzaCcpO1xuICAgIC8vICAgICBzZWxmLmZpbmlzaEFuaW1hdGlvbigpO1xuICAgIC8vIGlmIChzZWxmLmN1cnJOb2RlSW5kZXggPCBzZWxmLmRlc3RpbmF0aW9uTm9kZUluZGV4KSB7XG4gICAgLy8gICAgIHNlbGYuZHJhd05vZGUoKTtcbiAgICAvLyB9IGVsc2UgaWYgKHNlbGYuY3Vyck5vZGVJbmRleCA+IHNlbGYuZGVzdGluYXRpb25Ob2RlSW5kZXgpIHtcbiAgICAvLyAgICAgc2VsZi5yZW1vdmVOb2RlKCk7XG4gICAgLy8gfVxuXG5cdC8vIGlmIHRoZSB5ZWFyIG9mIHRoZSBmaXJzdCBub25FZ28gbm9kZSBpcyB0aGUgc2FtZSBhcyB0aGUgeWVhciBvZiB0aGUgY2VudGVyXG5cdC8vIG5vZGUncyBmaXJzdCBwdWJsaWNhdGlvbiwgdHJhbnNpdGlvblRpbWVQZXJOb2RlIHdpbGwgYmUgdW5kZWZpbmVkIGFuZCB0aGVyZVxuXHQvLyB3aWxsIGJlIGVycm9ycy5cblx0Ly8gU28gbGV0J3MgY2FsY3VsYXRlIGl0OlxuXHRpZiAodHlwZW9mIHNlbGYudHJhbnNpdGlvblRpbWVQZXJOb2RlID09PSAndW5kZWZpbmVkJykge1xuXHRcdHNlbGYuY2FsY3VsYXRlVHJhbnNpdGlvblRpbWUoKTtcblx0fVxuXHRpZiAoc2VsZi5hbmltYXRpb25TdGF0ZSA9PT0gJ2ZvcndhcmQnKSB7XG5cdFx0c2VsZi5kcmF3Tm9kZSgpO1xuXHR9IGVsc2UgaWYgKHNlbGYuYW5pbWF0aW9uU3RhdGUgPT09ICdyZXdpbmQnKSB7XG5cdFx0c2VsZi5yZW1vdmVOb2RlKCk7XG5cdH1cbn07XG5cbmVnb0dyYXBoVmlzLnByb3RvdHlwZS5jaGVja1llYXIgPSBmdW5jdGlvbigpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcblx0Ly8gaWYgd2UgYXJlIG9uIHRoZSBsYXN0IG5vZGUsIGp1c3QgbWF4IG91dCB0aGUgeWVhci5cblx0aWYgKHNlbGYuY3Vyck5vZGVJbmRleCA9PSBzZWxmLmRhdGEubm9kZXMubGVuZ3RoLTEpIHtcblx0XHRzZWxmLmN1cnJZZWFyID0gc2VsZi5kYXRhLmdyYXBoLnllYXJSYW5nZVsxXTtcblx0XHQvLyBjdXRvZmYgYXQgMjAxNVxuXHRcdHNlbGYuY3VyclllYXIgPSBNYXRoLm1pbihzZWxmLmN1cnJZZWFyLCAyMDE1KTtcblxuXHRcdHNlbGYueWVhclRleHREaXNwbGF5LnRleHQoc2VsZi5jdXJyWWVhcik7XG5cblx0XHQvLyBqUXVlcnkgY3VzdG9tIGV2ZW50LCBzbyB0aGF0IE1haW4uanMgY2FuIGxpc3RlbiBmb3IgaXQgYW5kIGFkdmFuY2UgdGhlIHllYXIgb24gdGhlIGxpbmUgY2hhcnRzXG5cdFx0JC5ldmVudC50cmlnZ2VyKHtcblx0XHRcdHR5cGU6IFwieWVhckNoYW5nZVwiLFxuXHRcdH0pO1xuXHRcdHNlbGYuY29udGludWUoKTtcblx0XHRyZXR1cm47XG5cdH1cblxuXHR2YXIgY3Vyck5vZGUgPSBzZWxmLmRhdGEubm9kZXMuZmlsdGVyKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuaWR4ID09PSBzZWxmLmN1cnJOb2RlSW5kZXg7IH0pO1xuXHR2YXIgb2xkWWVhciA9IHNlbGYuY3VyclllYXI7XG5cdHZhciBuZXdZZWFyID0gY3Vyck5vZGVbMF0uWWVhcjtcblx0Ly8gaWYgdGhlIHllYXIgaXMgdGhlIHNhbWUgYXMgaXQgd2FzLCBkbyBub3RoaW5nXG5cdGlmIChuZXdZZWFyID09IG9sZFllYXIpIHtcblx0XHRzZWxmLmNvbnRpbnVlKCk7XG5cdH0gZWxzZSBpZiAobmV3WWVhciA+IG9sZFllYXIpIHtcblx0XHQvLyB0cnlpbmcgdG8gZGVidWcgdGltaW5nIGlzc3Vlc1xuXHRcdC8vIGxvb2tzIGxpa2UgdGltaW5nIGlzIGp1c3QgaW5oZXJlbnRseSBpbmNvbnNpc3RlbnQuIHRoZXJlIHNlZW1zIHRvIGJlIGEgZGVsYXkgd2l0aCB0aGlzIG1ldGhvZCAoY2FsbGluZyB0aGUgbmV4dCBub2RlIGRyYXdpbmcgaW4gdHJhbnNpdGlvbi5lYWNoKCdlbmQnKSApXG5cdFx0Ly8gY29uc29sZS5sb2coc2VsZi5jdXJyWWVhcik7XG5cdFx0Ly8gY29uc29sZS5sb2coJ2MgJytzZWxmLmMpO1xuXHRcdC8vIGNvbnNvbGUubG9nKCd0dCAnK3NlbGYudHQpO1xuXHRcdC8vIGNvbnNvbGUubG9nKCd0dCBvdmVyIGMgJytzZWxmLnR0L3NlbGYuYyk7XG5cdFx0Ly8gY29uc29sZS5sb2coJ3RyYW5zaXRpb25UaW1lUGVyTm9kZSAnK3NlbGYudHJhbnNpdGlvblRpbWVQZXJOb2RlKTtcblx0XHQvLyBjb25zb2xlLmxvZygnZXJyb3IgJysoc2VsZi50cmFuc2l0aW9uVGltZVBlck5vZGUpLyhzZWxmLnR0L3NlbGYuYykpO1xuXHRcdHNlbGYuYz0wO1xuXHRcdHNlbGYudHQ9MDtcblx0XHRzZWxmLmN1cnJZZWFyKys7XG5cdFx0c2VsZi5iZWdpbk5ld1llYXIoKTtcblx0fSBlbHNlIGlmIChuZXdZZWFyIDwgb2xkWWVhcikge1xuXHRcdHNlbGYuY3VyclllYXItLTtcblx0XHRzZWxmLmJlZ2luTmV3WWVhcigpO1xuXHR9XG5cdC8vIHNlbGYuY3VyclllYXIgPSBjdXJyTm9kZVswXS5ZZWFyO1xuXG5cdC8vIFRPRE86IGNvbWUgYmFjayB0byB0aGlzXG5cdC8vXG4gICAgLy8gLy8gQ2hlY2sgdGhlIHllYXIgb2YgdGhlIGN1cnJlbnQgbm9kZSwgYW5kIGlmIGl0IGlzIGRpZmZlcmVudCB0aGFuIGN1cnJZZWFyOlxuICAgIC8vIC8vICAgICB1cGRhdGUgY3VyclllYXI7XG4gICAgLy8gLy8gICAgIHVwZGF0ZSB5ZWFyVGV4dERpc3BsYXk7XG4gICAgLy8gLy8gICAgIGZhZGUgbm9kZXMgYW5kIGxpbmtzIGZyb20gcHJldmlvdXMgeWVhcjtcbiAgICAvLyAvLyAgICAgcmVjYWxjdWxhdGUgdHJhbnNpdGlvbiB0aW1lcztcbiAgICAvL1xuICAgIC8vIHZhciBzZWxmID0gdGhpcztcbiAgICAvL1xuICAgIC8vIHZhciB5ZWFyT2ZDdXJyTm9kZSA9IHNlbGYuYWxsTm9kZXNbc2VsZi5jdXJyTm9kZUluZGV4XS5ZZWFyXG4gICAgLy8gaWYgKCB5ZWFyT2ZDdXJyTm9kZSAhPSBzZWxmLmN1cnJZZWFyICkge1xuICAgIC8vICAgICBzZWxmLmN1cnJZZWFyID0geWVhck9mQ3Vyck5vZGU7XG4gICAgLy9cbiAgICAvLyAgICAgc2VsZi51cGRhdGVMaW5lQ2hhcnQoKTtcbiAgICAvL1xuICAgIC8vICAgICAvLyBVcGRhdGUgdGhlIHllYXIgZGlzcGxheVxuICAgIC8vICAgICBzZWxmLnllYXJUZXh0RGlzcGxheS50ZXh0KHNlbGYuY3VyclllYXIpO1xuICAgIC8vICAgICAvLyBJIG1heSBuZWVkIHRvIGRvIHNvbWV0aGluZyBhYm91dCB0aGlzICh0aGF0IHRoZSB5ZWFyIHRleHQgZGlzcGxheSBzdGFydHMgb2ZmIGhpZGRlbik6XG4gICAgLy8gICAgIC8vIGlmIChzZWxmLmN1cnJZZWFyID09IHNlbGYuZWdvTm9kZS5ZZWFyKSBcbiAgICAvLyAgICAgLy8gICAgICAgICB7c2VsZi55ZWFyVGV4dERpc3BsYXkudHJhbnNpdGlvbigpXG4gICAgLy8gICAgIC8vICAgICAgICAgICAgICAgICAuZHVyYXRpb24oMTAwMClcbiAgICAvLyAgICAgLy8gICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIC4xNSk7XG4gICAgLy9cbiAgICAvLyAgICAgLy8gT25seSBmYWRlIHByZXZpb3VzIHllYXIgaWYgZ29pbmcgZm9yd2FyZCBpbiB0aW1lXG4gICAgLy8gICAgIGlmIChzZWxmLmN1cnJOb2RlSW5kZXggPCBzZWxmLmRlc3RpbmF0aW9uTm9kZUluZGV4KSBzZWxmLmZhZGVOb2Rlc0FuZExpbmtzUHJldlllYXIoKTtcbiAgICAvL1xuICAgIC8vICAgICBzZWxmLmNhbGN1bGF0ZVRyYW5zaXRpb25UaW1lKCk7XG4gICAgLy8gfVxuXHRyZXR1cm4gc2VsZi5jdXJyWWVhcjtcbn07XG5cbmVnb0dyYXBoVmlzLnByb3RvdHlwZS5iZWdpbk5ld1llYXIgPSBmdW5jdGlvbigpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdFxuXHRzZWxmLnllYXJUZXh0RGlzcGxheS50ZXh0KHNlbGYuY3VyclllYXIpO1xuXG5cdC8vIGpRdWVyeSBjdXN0b20gZXZlbnQsIHNvIHRoYXQgTWFpbi5qcyBjYW4gbGlzdGVuIGZvciBpdCBhbmQgYWR2YW5jZSB0aGUgeWVhciBvbiB0aGUgbGluZSBjaGFydHNcblx0JC5ldmVudC50cmlnZ2VyKHtcblx0XHR0eXBlOiBcInllYXJDaGFuZ2VcIixcblx0fSk7XG5cblx0c2VsZi5jYWxjdWxhdGVUcmFuc2l0aW9uVGltZSgpO1xuXHR2YXIgbm9kZXNUaGlzWWVhciA9IHNlbGYubm90RWdvTm9kZXMuZmlsdGVyKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuWWVhciA9PSBzZWxmLmN1cnJZZWFyOyB9KTtcblxuXHQvLyBJZiB0aGlzIHllYXIgaGFzIG5vIG5vZGVzLCBkZWxheSwgdGhlbiBjb250aW51ZVxuXHRpZiAoIG5vZGVzVGhpc1llYXIubGVuZ3RoID09PSAwICkge1xuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRzZWxmLmNoZWNrWWVhcigpO1xuXHRcdH0sIHNlbGYudHJhbnNpdGlvblRpbWVQZXJZZWFyW3NlbGYuY3VyclllYXJdKVxuXHR9IGVsc2Uge1xuXHRcdHNlbGYuY29udGludWUoKTtcblx0fVxuXG5cbn07XG5cbmVnb0dyYXBoVmlzLnByb3RvdHlwZS5kcmF3Tm9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIC8vIHNlbGYuYW5pbWF0aW9uU3RhdGUgPSAnZm9yd2FyZCc7XG5cbiAgICAvLyBzZWxmLmZhZGVOb2Rlc0FuZExpbmtzUHJldlllYXIoKTtcblxuICAgIHZhciBjdXJyTm9kZSA9IGQzLnNlbGVjdEFsbCgnLm5vZGUnKS5maWx0ZXIoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5pZHggPT09IHNlbGYuY3Vyck5vZGVJbmRleDsgfSk7XG5cbiAgICBmdW5jdGlvbiBkcmF3TGlua3Mobm9kZU9iaikge1xuICAgICAgICAvLyBUaGlzIGZ1bmN0aW9uIHdpbGwgZHJhdyB0aGUgbGluayBvdXQgZnJvbSB0aGUgc291cmNlIHRvIHRoZSB0YXJnZXQuXG4gICAgICAgIC8vIFdlJ2xsIGNhbGwgaXQgYWZ0ZXIgZWFjaCBub2RlIGFwcGVhcnMuXG4gICAgICAgIG5vZGVPYmoubGlua3NUaGlzTm9kZUlzU291cmNlID0gZDMuc2VsZWN0QWxsKCcubGluaycpLmZpbHRlcihmdW5jdGlvbihsKSB7IHJldHVybiBsLnNvdXJjZSA9PT0gbm9kZU9iajsgfSk7XG4gICAgICAgIG5vZGVPYmoubGlua3NUaGlzTm9kZUlzU291cmNlLmNsYXNzZWQoJ2hpZGRlbicsIGZhbHNlKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ3Zpc2libGUnLCB0cnVlKVxuICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24oZCkgeyBkLmluVHJhbnNpdGlvbiA9IHRydWU7IH0pXG4gICAgICAgICAgICAuYXR0cigneDInLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLnNvdXJjZS54OyB9KVxuICAgICAgICAgICAgLmF0dHIoJ3kyJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5zb3VyY2UueTsgfSlcbiAgICAgICAgICAgIC5zdHlsZSgndmlzaWJpbGl0eScsICd2aXNpYmxlJylcbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5lYXNlKCdsaW5lYXInKVxuICAgICAgICAgICAgLmRlbGF5KDApXG4gICAgICAgICAgICAuZHVyYXRpb24oc2VsZi5saW5rQXBwZWFyRHVyYXRpb24pXG4gICAgICAgICAgICAuYXR0cigneDInLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLnRhcmdldC54OyB9KVxuICAgICAgICAgICAgLmF0dHIoJ3kyJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC50YXJnZXQueTsgfSlcbiAgICAgICAgICAgIC8vIC5hdHRyKCd4MicsIDApXG4gICAgICAgICAgICAvLyAuYXR0cigneTInLCAwKVxuICAgICAgICAgICAgLmF0dHIoJ1QnLCAxKVxuICAgICAgICAgICAgLmVhY2goJ2VuZCcsIGZ1bmN0aW9uKGQpIHsgZC5pblRyYW5zaXRpb24gPSBmYWxzZTsgfSk7XG4gICAgfVxuICAgIC8vIE1ha2UgdGhlIG5vZGVzIGFwcGVhcjpcblx0Ly8gdmFyIHQwID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgY3Vyck5vZGUuY2xhc3NlZCgnaGlkZGVuJywgZmFsc2UpXG4gICAgICAgIC5jbGFzc2VkKCd2aXNpYmxlJywgdHJ1ZSlcbiAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAuZWFzZSgnbGluZWFyJylcbiAgICAgICAgLy8uZGVsYXkoZnVuY3Rpb24oZCwgaSkgeyByZXR1cm4gKGktY3VyckluZGV4KSAqIHRpbWVQZXJOb2RlOyB9KVxuICAgICAgICAvLyAuZGVsYXkoZnVuY3Rpb24oZCwgaSkgeyByZXR1cm4gaSAqIHNlbGYudHJhbnNpdGlvblRpbWVQZXJOb2RlOyB9KVxuICAgICAgICAuZHVyYXRpb24oc2VsZi50cmFuc2l0aW9uVGltZVBlck5vZGUpXG4gICAgICAgIC5hdHRyKCdyJywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgLy9yZXR1cm4gNC41ICsgKHNlbGYuZWlnZW5GYWN0b3JTY2FsZShkLkVGKSAqIDEwKTtcbiAgICAgICAgICAgIHJldHVybiBkLnJhZGl1cztcbiAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoJ1QnLCAxKVxuXHRcdC5lYWNoKCdlbmQnLCBmdW5jdGlvbihkKSB7XG5cdFx0XHQvLyB2YXIgdDEgPSBwZXJmb3JtYW5jZS5ub3coKTtcblx0XHRcdC8vIHNlbGYudHQgPSBzZWxmLnR0ICsgKHQxLXQwKTtcblx0XHRcdHNlbGYuYysrO1xuXHRcdFx0aWYgKHNlbGYuem9vbWFibGUgPT09IHRydWUpIHtcblx0XHRcdFx0c2VsZi5jaGVja1pvb20oZCk7XG5cdFx0XHR9XG5cdFx0XHQvLyBjb25zb2xlLmxvZyh0MS10MCArIFwibWlsbGlzZWNvbmRzXCIpO1xuXHRcdFx0c2VsZi5hbmltYXRlVG9EZXN0aW5hdGlvbk5vZGUoKTtcblx0XHRcdGRyYXdMaW5rcyhkKTtcbiAgICAgICAgLy8gLmVhY2goZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgLy8gUHV0IHVwIGFubm90YXRpb24gaWYgYSBub2RlIGNvbWVzIGZyb20gYSBuZXcgZG9tYWluLlxuICAgICAgICAgICAgLy8gTXVzdCBzYXRpc2Z5IHRoZSBjb25kaXRpb25zOlxuICAgICAgICAgICAgLy8gLWdyYXBoIHBhcmFtYXRlciBkb0Fubm90YXRpb25zIGlzIHRydWVcbiAgICAgICAgICAgIC8vIC10aGUgZG9tYWluIGhhcyBub3QgYWxyZWFkeSBiZWVuIGFubm90YXRlZFxuICAgICAgICAgICAgLy8gLXRoZSBkb21haW4gaXMgZGlmZmVyZW50IHRoYW4gdGhlIGVnbyBub2RlJ3MgZG9tYWluXG4gICAgICAgICAgICB2YXIgdGhpc0RvbWFpbiA9IHNlbGYuZG9tYWluc1RoaXNHcmFwaC5maWx0ZXIoZnVuY3Rpb24oZG9tYWluKSB7cmV0dXJuIGRvbWFpbi5Eb21haW5JRD09ZC5Eb21haW5JRDt9KTtcbiAgICAgICAgICAgIC8vIFRoZSBhYm92ZSByZXR1cm5lZCBhbiBhcnJheS4gVGFrZSB0aGUgZmlyc3QgZWxlbWVudCB0byBnZXQgdGhlIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIERvbWFpbi5cbiAgICAgICAgICAgIHRoaXNEb21haW4gPSB0aGlzRG9tYWluWzBdXG4gICAgICAgICAgICBpZiAoIChzZWxmLmRvQW5ub3RhdGlvbnMpICYmICghdGhpc0RvbWFpbi5hbHJlYWR5QW5ub3RhdGVkKSAmJiAodGhpc0RvbWFpbi5Eb21haW5JRCAhPSBzZWxmLmVnb05vZGUuRG9tYWluSUQpICkge1xuICAgICAgICAgICAgICAgIHNlbGYuYW5ub3RhdGlvbk5ld0NsdXN0ZXIoZCk7XG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcjbGVnZW5kRG9tYWluJyArIGQuRG9tYWluSUQpXG4gICAgICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKCkuZGVsYXkoMTAwMCkuZHVyYXRpb24oMjAwMClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMSk7XG4gICAgICAgICAgICAgICAgdGhpc0RvbWFpbi5hbHJlYWR5QW5ub3RhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gLy8gZWxzZSB7XG5cbiAgICAgICAgICAgIC8vIEkgY2FuIHVzZSBlbHNlIGlmIHN0YXRlbWVudHMgZm9yIHRoZSBvdGhlciBhbm5vdGF0aW9ucy5cbiAgICAgICAgICAgIC8vIChvciBvdGhlciBpZiBzdGF0ZW1lbnRzPyB3aGF0IGlmIG9uZSBub2RlIHRyaXBzIHR3byBhbm5vdGF0aW9ucz8pXG5cbiAgICAgICAgICAgIC8vIHZhciBjbHVzdGVyU3BsaXQgPSBkLmNsdXN0ZXIuc3BsaXQoJzonKTtcbiAgICAgICAgICAgIC8vIC8vIFB1dCB1cCBhbm5vdGF0aW9uIGlmIGEgbm9kZSBjb21lcyBmcm9tIGEgbmV3IGNsdXN0ZXJcbiAgICAgICAgICAgIC8vIC8vIEFsc28gcmV2ZWFsIHRoaXMgY2x1c3RlciBpbiB0aGUgbGVnZW5kXG4gICAgICAgICAgICAvLyB2YXIgY2x1c3RlckluZGV4ID0gc2VsZi5jbHVzdGVyc1RvQW5ub3RhdGUuaW5kZXhPZihjbHVzdGVyU3BsaXRbMF0pXG4gICAgICAgICAgICAvLyBpZiAoY2x1c3RlckluZGV4ID4gLTEpXG4gICAgICAgICAgICAvLyAgICAgICAgIHsgaWYgKCAoc2VsZi5ncmFwaFBhcmFtcy5kb0Fubm90YXRpb25zLnZhbHVlICkgJiYgKCAhc2VsZi5jbHVzdGVyc1tjbHVzdGVySW5kZXhdLmFscmVhZHlBbm5vdGF0ZWQgKSlcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICB7IHNlbGYuYW5ub3RhdGlvbk5ld0NsdXN0ZXIoZCk7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcjbGVnZW5kQ2x1c3RlcicgKyBjbHVzdGVyU3BsaXRbMF0pXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAudHJhbnNpdGlvbigpLmRlbGF5KDEwMDApLmR1cmF0aW9uKDIwMDApXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAxKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICBzZWxmLmNsdXN0ZXJzW2NsdXN0ZXJJbmRleF0uYWxyZWFkeUFubm90YXRlZCA9IHRydWU7IH0gfVxuXG4gICAgICAgICAgICAvLyBQdXQgdXAgYW5ub3RhdGlvbiB3aGVuIHRoZSBoaWdoZXN0IEVpZ2VuZmFjdG9yIG5vZGUgYXBwZWFyc1xuICAgICAgICAgICAgLy8gQ29tbWVudGVkIG91dCBiZWNhdXNlIGl0IGhhcHBlbnMgdG9vIGVhcmx5IGZvciB0aGlzIHBhcGVyIGFuZCBpbnRlcmZlcmVzIHdpdGggZmxvd1xuICAgICAgICAgICAgLy9pZiAoZC5FRiA9PT0gZDMubWF4KHNlbGYuYWxsTm9kZXMsIGZ1bmN0aW9uKGRkKSB7IHJldHVybiBkZC5FRjsgfSkpXG4gICAgICAgICAgICAgICAgICAgIC8veyBjb25zb2xlLmxvZygnaGlnaGVzdCBFRicpOyBzZWxmLmFubm90YXRpb25IaWdoZXN0RUYoZCk7IH1cblxuICAgICAgICAgICAgLy8gZWxzZSBzZWxmLmFuaW1hdGVUb0Rlc3RpbmF0aW9uTm9kZSgpO1xuXG4gICAgICAgIH0pO1xufTtcblxuZWdvR3JhcGhWaXMucHJvdG90eXBlLnJlbW92ZU5vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBzZWxmLmFuaW1hdGlvblN0YXRlID0gJ3Jld2luZCc7XG5cbiAgICAvLyBzZWxmLmNhbGN1bGF0ZVRyYW5zaXRpb25UaW1lKCk7XG5cbiAgICB2YXIgY3Vyck5vZGUgPSBkMy5zZWxlY3RBbGwoJy5ub2RlJykuZmlsdGVyKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuaW5kZXggPT09IHNlbGYuY3Vyck5vZGVJbmRleDsgfSk7XG4gICAgdmFyIGN1cnJMaW5rcyA9IGQzLnNlbGVjdEFsbCgnLmxpbmsnKS5maWx0ZXIoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5zb3VyY2UuaW5kZXggPT09IHNlbGYuY3Vyck5vZGVJbmRleDsgfSk7XG5cbiAgICAvLyB2YXIgcmV0cmFjdER1cmF0aW9uID0gc2VsZi5saW5rQXBwZWFyRHVyYXRpb247XG4gICAgdmFyIHJldHJhY3REdXJhdGlvbiA9IHNlbGYudHJhbnNpdGlvblRpbWVQZXJOb2RlO1xuICAgIGN1cnJMaW5rcy50cmFuc2l0aW9uKClcbiAgICAgICAgLmVhY2goJ3N0YXJ0JywgZnVuY3Rpb24oZCkgeyBkLmluVHJhbnNpdGlvbj10cnVlOyB9KVxuICAgICAgICAuZHVyYXRpb24ocmV0cmFjdER1cmF0aW9uKVxuICAgICAgICAuZWFzZSgncXVhZCcpXG4gICAgICAgIC5hdHRyKCd4MicsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuc291cmNlLng7IH0pXG4gICAgICAgIC5hdHRyKCd5MicsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuc291cmNlLnk7IH0pXG4gICAgICAgIC5jYWxsKGZ1bmN0aW9uKGQpIHtcblx0XHQvLyAuZWFjaCgnZW5kJywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgZC5pblRyYW5zaXRpb249ZmFsc2U7XG4gICAgICAgICAgICB2YXIgY3Vyck5vZGUgPSBkMy5zZWxlY3RBbGwoJy5ub2RlJykuZmlsdGVyKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuaWR4ID09PSBzZWxmLmN1cnJOb2RlSW5kZXg7IH0pO1xuICAgICAgICAgICAgY3Vyck5vZGUudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgLmR1cmF0aW9uKHNlbGYudHJhbnNpdGlvblRpbWVQZXJOb2RlKVxuICAgICAgICAgICAgICAgIC5lYXNlKCdxdWFkJylcbiAgICAgICAgICAgICAgICAuYXR0cigncicsMClcbiAgICAgICAgICAgICAgICAuYXR0cignVCcsMSlcbiAgICAgICAgICAgICAgICAuZWFjaCgnZW5kJywgZnVuY3Rpb24oZGQpIHtcbiAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmNsYXNzZWQoJ2hpZGRlbicsIHRydWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xhc3NlZCgndmlzaWJsZScsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5hbmltYXRlVG9EZXN0aW5hdGlvbk5vZGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG59O1xuXG5lZ29HcmFwaFZpcy5wcm90b3R5cGUuZmluaXNoQW5pbWF0aW9uID0gZnVuY3Rpb24oKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblxuXHRzZWxmLmFuaW1hdGlvblN0YXRlID0gJ3N0b3BwZWQnO1xuXHQkLmV2ZW50LnRyaWdnZXIoe1xuXHRcdHR5cGU6IFwiYW5pbWF0aW9uRmluaXNoZWRcIixcblx0fSk7XG5cdGNvbnNvbGUubG9nKCdmaW5pc2hlZCcpO1xuXHRjb25zb2xlLmxvZyhzZWxmLmN1cnJOb2RlSW5kZXgpO1xufTtcblxuZWdvR3JhcGhWaXMucHJvdG90eXBlLm5ld0Rlc3RpbmF0aW9uTm9kZSA9IGZ1bmN0aW9uKGRlc3RpbmF0aW9uWWVhcikge1xuXHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0c2VsZi5kZXN0aW5hdGlvblllYXIgPSBkZXN0aW5hdGlvblllYXI7XG5cdGNvbnNvbGUubG9nKHNlbGYuZGVzdGluYXRpb25ZZWFyKTtcblx0c2VsZi5nZXREZXN0aW5hdGlvbk5vZGUoKTtcblx0XG5cdC8vIG1ha2Ugc3VyZSB0aGUgY3VycmVudCBub2RlIGlzIGluY2x1ZGVkOlxuXHRpZiAoICEoc2VsZi5jdXJyTm9kZUluZGV4ID09PSBzZWxmLmRlc3RpbmF0aW9uTm9kZUluZGV4KSApIHsgIC8vIGRvbid0IGRvIGFueXRoaW5nIGlmIHRoaXMgaXMgdHJ1ZVxuXHRcdGlmIChzZWxmLmN1cnJOb2RlSW5kZXggPCBzZWxmLmRlc3RpbmF0aW9uTm9kZUluZGV4KSB7XG5cdFx0XHRzZWxmLmFuaW1hdGlvblN0YXRlID0gJ2ZvcndhcmQnO1xuXHRcdFx0c2VsZi5kcmF3Tm9kZSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzZWxmLmFuaW1hdGlvblN0YXRlID0gJ3Jld2luZCc7XG5cdFx0XHRzZWxmLnJlbW92ZU5vZGUoKTtcblx0XHR9XG5cdH1cbn07XG5cbmVnb0dyYXBoVmlzLnByb3RvdHlwZS5nZXREZXN0aW5hdGlvbk5vZGUgPSBmdW5jdGlvbigpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdC8vIEdldCB0aGUgZGVzdGluYXRpb24gbm9kZSBpbmRleCBmcm9tIHRoZSBkZXN0aW5hdGlvbiB5ZWFyXG5cdHZhciBtYXhZZWFyID0gc2VsZi5kYXRhLmdyYXBoLnllYXJSYW5nZVsxXTtcblx0ZnVuY3Rpb24gZ2V0Tm9kZXNUaGlzWWVhcigpIHtcblx0XHR2YXIgbm9kZXNUaGlzWWVhciA9IHNlbGYubm90RWdvTm9kZXMuZmlsdGVyKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuWWVhciA9PSBzZWxmLmRlc3RpbmF0aW9uWWVhcjsgfSk7XG5cdFx0cmV0dXJuIG5vZGVzVGhpc1llYXI7XG5cdH1cblx0dmFyIG5vZGVzVGhpc1llYXIgPSBnZXROb2Rlc1RoaXNZZWFyKCk7XG5cdGlmIChub2Rlc1RoaXNZZWFyLmxlbmd0aCA+IDApIHtcblx0XHR2YXIgbGFzdE5vZGVUaGlzWWVhciA9IG5vZGVzVGhpc1llYXJbbm9kZXNUaGlzWWVhci5sZW5ndGgtMV07XG5cdFx0c2VsZi5kZXN0aW5hdGlvbk5vZGVJbmRleCA9IGxhc3ROb2RlVGhpc1llYXIuaWR4O1xuXHR9IGVsc2Uge1xuXHRcdGlmIChzZWxmLmRlc3RpbmF0aW9uWWVhciA9PSBtYXhZZWFyKSB7XG5cdFx0XHRyZXdpbmRTZWFyY2goKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c2VsZi5kZXN0aW5hdGlvblllYXIrKztcblx0XHRcdHNlbGYuZ2V0RGVzdGluYXRpb25Ob2RlKCk7ICAvLyByZWN1cnNlXG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gcmV3aW5kU2VhcmNoKCkge1xuXHRcdHNlbGYuZGVzdGluYXRpb25ZZWFyLS07XG5cdFx0dmFyIG5vZGVzVGhpc1llYXIgPSBnZXROb2Rlc1RoaXNZZWFyKCk7XG5cdFx0aWYgKG5vZGVzVGhpc1llYXIubGVuZ3RoID4gMCkge1xuXHRcdFx0c2VsZi5nZXREZXN0aW5hdGlvbk5vZGUoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV3aW5kU2VhcmNoKCk7ICAvLyByZWN1cnNlXG5cdFx0fVxuXHR9XG5cbn07XG5cbmVnb0dyYXBoVmlzLnByb3RvdHlwZS5jYWxjdWxhdGVUcmFuc2l0aW9uVGltZSA9IGZ1bmN0aW9uKCkge1xuXHQvLyBNZXRob2QgdG8gY2FsY3VsYXRlIHRoZSB0cmFuc2l0aW9uIHRpbWUgZm9yIGVhY2ggbm9kZSBiYXNlZCBvbiB0aGUgbnVtYmVyIG9mIG5vZGVzIGluIHRoZSBjdXJyZW50IHllYXJcblx0XG5cdHZhciBzZWxmID0gdGhpcztcblxuXHQvLyBTUEVFRCBVUCBGT1IgVEVTVElORyBQVVJQT1NFU1xuXHQvLyBLRUVQIFRISVMgQ09NTUVOVEVEIE9VVFxuXHQvLyBzZWxmLnRyYW5zaXRpb25UaW1lUGVyWWVhcltzZWxmLmN1cnJZZWFyXSA9IDEwMDtcblxuXHR2YXIgY291bnRUaGlzWWVhciA9IHNlbGYuZGF0YS5ncmFwaC5ub2RlQ291bnRzUGVyWWVhcltzZWxmLmN1cnJZZWFyXTtcblx0c2VsZi50cmFuc2l0aW9uVGltZVBlck5vZGUgPSBjb3VudFRoaXNZZWFyID8gc2VsZi50cmFuc2l0aW9uVGltZVBlclllYXJbc2VsZi5jdXJyWWVhcl0gLyBjb3VudFRoaXNZZWFyIDogMDtcblx0c2VsZi50cmFuc2l0aW9uVGltZVBlck5vZGUgPSBzZWxmLnRyYW5zaXRpb25UaW1lUGVyTm9kZSAtIDEwO1xuXG5cbn07XG5cbmVnb0dyYXBoVmlzLnByb3RvdHlwZS5yZXZlYWxGaW5hbFN0YXRlID0gZnVuY3Rpb24oKSB7XG5cdC8vIGNhbmNlbCBhbGwgdHJhbnNpdGlvbnMgYW5kIHJldmVhbCB0aGUgZmluYWwgc3RhdGUgb2YgdGhlIHZpc1xuXG5cdHZhciBzZWxmID0gdGhpcztcblx0XG5cdGQzLnNlbGVjdEFsbCgnLm5vZGUsIC5saW5rJykudHJhbnNpdGlvbigpLmR1cmF0aW9uKDApO1xuXG5cdHNlbGYubm9kZVxuXHRcdC5jbGFzc2VkKCdoaWRkZW4nLCBmYWxzZSlcblx0XHQuYXR0cigncicsIGZ1bmN0aW9uKGQpIHtcblx0XHRcdHJldHVybiBkLnJhZGl1cztcblx0XHR9KVxuXHRcdC5lYWNoKGZ1bmN0aW9uKGQpIHtcblx0XHRcdGlmIChzZWxmLnpvb21hYmxlID09PSB0cnVlKSB7XG5cdFx0XHRcdHNlbGYuY2hlY2tab29tKGQpXG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0c2VsZi5saW5rXG5cdFx0LmNsYXNzZWQoJ2hpZGRlbicsIGZhbHNlKVxuXHRcdC5jbGFzc2VkKCd2aXNpYmxlJywgdHJ1ZSlcblx0XHQuc3R5bGUoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpXG5cdFx0LmF0dHIoJ3gyJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC50YXJnZXQueDsgfSlcblx0XHQuYXR0cigneTInLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLnRhcmdldC55OyB9KVxuXHRcdC5lYWNoKGZ1bmN0aW9uKGQpIHsgZC5pblRyYW5zaXRpb24gPSBmYWxzZTsgfSk7XG5cblx0c2VsZi5jdXJyTm9kZUluZGV4ID0gc2VsZi5kYXRhLm5vZGVzLmxlbmd0aC0xO1xuXHRzZWxmLmN1cnJZZWFyID0gc2VsZi5kYXRhLmdyYXBoLnllYXJSYW5nZVsxXTtcblx0c2VsZi55ZWFyVGV4dERpc3BsYXkudGV4dChzZWxmLmN1cnJZZWFyKTtcblx0JC5ldmVudC50cmlnZ2VyKHtcblx0XHR0eXBlOiBcInllYXJDaGFuZ2VcIixcblx0fSlcblxuXHRzZWxmLmZpbmlzaEFuaW1hdGlvbigpO1xuXG5cdHJldHVyblxufVxuXG5cdFx0XG5cbmZ1bmN0aW9uIGxpbmVDaGFydEJ5WWVhcihkYXRhKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblx0c2VsZi5kYXRhID0gZGF0YS52YWx1ZXM7XG5cdHNlbGYucGV3X0NsYXNzID0gZGF0YS5wZXdfQ2xhc3M7XG5cdHNlbGYuaHJhX2Z1bmRpbmcgPSBkYXRhLmZ1bmRpbmc7XG5cdC8vIGlmIHRoZXJlIGlzIG9ubHkgb25lIGZ1bmRpbmcgcmVjb3JkOlxuXHQvLyBpZiAoc2VsZi5ocmFfZnVuZGluZy5sZW5ndGggPT0gMSkge1xuXHQvLyBcdHNlbGYuaHJhX2Z1bmRpbmcgPSBzZWxmLmhyYV9mdW5kaW5nWzBdO1xuXHQvLyB9XG5cdFxuXHQvLyB0ZXN0aW5nOlxuXHQvLyBzZWxmLmhyYV9mdW5kaW5nID0gc2VsZi5ocmFfZnVuZGluZ1swXTtcblx0Ly8gY29uc29sZS5sb2coc2VsZi5ocmFfZnVuZGluZyk7XG5cblx0Ly8gRGVmYXVsdHNcblx0Ly8gR3JhcGggU1ZHIERpbWVuc2lvbnNcbiAgICAvLyBzZWxmLmxpbmVDaGFydERpbWVuc2lvbnMgPSB7XG5cdC8vIFx0bWFyZ2luOiB7dG9wOiAzMCwgcmlnaHQ6IDIwLCBib3R0b206IDMwLCBsZWZ0OiA1MH1cblx0Ly8gfTtcblx0Ly8gc2VsZi5saW5lQ2hhcnREaW1lbnNpb25zLndpZHRoID0gOTYwICogMy80IC0gc2VsZi5saW5lQ2hhcnREaW1lbnNpb25zLm1hcmdpbi5sZWZ0IC0gc2VsZi5saW5lQ2hhcnREaW1lbnNpb25zLm1hcmdpbi5yaWdodDtcblx0Ly8gc2VsZi5saW5lQ2hhcnREaW1lbnNpb25zLmhlaWdodCA9IDExMCAtIHNlbGYubGluZUNoYXJ0RGltZW5zaW9ucy5tYXJnaW4udG9wIC0gc2VsZi5saW5lQ2hhcnREaW1lbnNpb25zLm1hcmdpbi5ib3R0b207XG5cdHNlbGYubGluZUNoYXJ0RGltZW5zaW9uczsgIC8vIGltcG9ydGVkIGluIHNlbGYuaW1wb3J0RGVmYXVsdE9wdGlvbnMgYmVsb3dcblx0XG5cdHNlbGYuY29sb3JTY2hlbWU7XG5cdC8vIC8vIENvbG9yczpcbiAgICAvLyAvLyBTZWUgaHR0cDovL2NvbG9yYnJld2VyMi5vcmcvP3R5cGU9cXVhbGl0YXRpdmUmc2NoZW1lPVNldDEmbj04XG4gICAgLy8gc2VsZi5jb2xvclNjaGVtZSA9IFsncmdiKDIyOCwyNiwyOCknLCdyZ2IoNTUsMTI2LDE4NCknLCdyZ2IoNzcsMTc1LDc0KScsXG4gICAgLy8gICAgICAgICAncmdiKDE1Miw3OCwxNjMpJywncmdiKDI1NSwxMjcsMCknLCdyZ2IoMjU1LDI1NSw1MSknLFxuICAgIC8vICAgICAgICAgJ3JnYigxNjYsODYsNDApJywncmdiKDI0NywxMjksMTkxKSddXG4gICAgLy8gLy8gSSBsaWtlZCB0aGUgYmx1ZSBiZXR0ZXIgZm9yIHRoZSBtYWluIGNvbG9yLCBzbyB0aGUgbmV4dCBsaW5lIGp1c3QgbW92ZXNcbiAgICAvLyAvLyB0aGUgYmx1ZSBjb2xvciAob3JpZ2luYWxseSBzZWxmLmNvbG9yU2NoZW1lWzFdKSB0byB0aGUgZnJvbnQgKHNlbGYuY29sb3JTY2hlbWVbMF0pXG4gICAgLy8gc2VsZi5jb2xvclNjaGVtZS5zcGxpY2UoMCwgMCwgc2VsZi5jb2xvclNjaGVtZS5zcGxpY2UoMSwgMSlbMF0pXG5cbiAgICAvLyBzZWxmLnggPSBkMy50aW1lLnNjYWxlKCkucmFuZ2UoWzAsIHNlbGYubGluZUNoYXJ0RGltZW5zaW9ucy53aWR0aF0pO1xuXG5cdHNlbGYueDtcblx0c2VsZi55O1xuXHRzZWxmLmNoYXJ0RGl2O1xuICAgIHNlbGYuc3ZnO1xuICAgIHNlbGYuc3ZnRGVmcztcblx0c2VsZi50aXRsZTtcbiAgICBzZWxmLmNsaXBQYXRoO1xuICAgIHNlbGYuY3VyclllYXJJbmRpY2F0b3I7XG5cdHNlbGYueWVhckFyZWE7XG5cdHNlbGYueWVhckFyZWFPcGFjaXR5ID0gLjE7XG4gICAgc2VsZi54QXhpcztcbiAgICBzZWxmLnlBeGlzO1xuICAgIHNlbGYubGluZTsgIC8vIGxpbmUgZHJhd2luZyBmdW5jdGlvblxuICAgIHNlbGYuYXJlYTsgIC8vIGFyZWEgZHJhd2luZyBmdW5jdGlvblxuXHRzZWxmLmNoYXJ0TGluZTsgIC8vIGFjdHVhbCBsaW5lIGVsZW1lbnRcblx0c2VsZi5jaGFydEFyZWE7ICAvLyBhY3R1YWwgYXJlYSBlbGVtZW50XG5cdHNlbGYubGluZWFyR3JhZGllbnQ7XG5cblx0c2VsZi5hbmltYXRpb25TdGF0ZTtcblx0c2VsZi5jdXJyWWVhcjtcblx0c2VsZi50cmFuc2l0aW9uVGltZVBlclllYXI7XG5cdHNlbGYueWVhclJhbmdlID0gZDMuZXh0ZW50KHNlbGYuZGF0YSwgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC55ZWFyOyB9KTtcblx0Ly8gY3V0IG9mZiBhdCAyMDE1XG5cdHNlbGYueWVhclJhbmdlWzFdID0gTWF0aC5taW4oc2VsZi55ZWFyUmFuZ2VbMV0sIDIwMTUpO1xuXHRcblx0c2VsZi5mdW5kaW5nVGltZTtcblx0aWYgKHR5cGVvZiBzZWxmLnBld19DbGFzcyAhPSAndW5kZWZpbmVkJykge1xuXHRcdHNlbGYuZnVuZGluZ1RpbWUgPSA0OyAgLy8gZnVuZGluZyBwZXJpb2QgZm9yIFBld1xuXHR9XG5cdGlmICh0eXBlb2Ygc2VsZi5ocmFfZnVuZGluZyAhPSAndW5kZWZpbmVkJykge1xuXHRcdHNlbGYuaHJhX2Z1bmRpbmcgPSBzZWxmLmhyYV9mdW5kaW5nWzBdO1xuXHRcdHNlbGYuZnVuZGluZ1RpbWUgPSBzZWxmLmhyYV9mdW5kaW5nLmR1cmF0aW9uX2luX3llYXJzO1xuXHRcdC8vIHRoaXMgaXMgYSBoYWNrIHRoYXQgd2lsbCB3b3JrIGZvciBub3dcblx0XHQvLyBUT0RPOiBmaXggdGhpc1xuXHRcdHNlbGYucGV3X0NsYXNzID0gc2VsZi5ocmFfZnVuZGluZy5zdGFydF9kYXRlO1xuXHR9XG5cblx0Ly8gc2VsZi5pbml0KCk7XG5cblx0cmV0dXJuIHNlbGY7XG5cbn1cblxubGluZUNoYXJ0QnlZZWFyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblxuXG5cdHNlbGYuYW5pbWF0aW9uU3RhdGUgPSAnaW5pdCc7XG5cdHNlbGYuY3VyclllYXIgPSBzZWxmLnllYXJSYW5nZVswXTsgIC8vIEluaXRpYWxpemUgeWVhclxuXG4gICAgc2VsZi54ID0gZDMuc2NhbGUubGluZWFyKCkucmFuZ2UoWzAsIHNlbGYubGluZUNoYXJ0RGltZW5zaW9ucy53aWR0aF0pO1xuICAgIHNlbGYueSA9IGQzLnNjYWxlLmxpbmVhcigpLnJhbmdlKFtzZWxmLmxpbmVDaGFydERpbWVuc2lvbnMuaGVpZ2h0LCAwXSk7XG5cblx0c2VsZi5jaGFydERpdiA9IGQzLnNlbGVjdCgnI2NoYXJ0c0RpdicpLmFwcGVuZCgnZGl2Jylcblx0XHQuYXR0cignY2xhc3MnLCAnY2hhcnREaXYnKTtcblxuXHRzZWxmLnN2ZyA9IHNlbGYuY2hhcnREaXYuYXBwZW5kKCdzdmcnKVxuXHQgICAgLmF0dHIoJ3dpZHRoJywgc2VsZi5saW5lQ2hhcnREaW1lbnNpb25zLndpZHRoICsgc2VsZi5saW5lQ2hhcnREaW1lbnNpb25zLm1hcmdpbi5sZWZ0ICsgc2VsZi5saW5lQ2hhcnREaW1lbnNpb25zLm1hcmdpbi5yaWdodClcblx0ICAgIC5hdHRyKCdoZWlnaHQnLCBzZWxmLmxpbmVDaGFydERpbWVuc2lvbnMuaGVpZ2h0ICsgc2VsZi5saW5lQ2hhcnREaW1lbnNpb25zLm1hcmdpbi50b3AgKyBzZWxmLmxpbmVDaGFydERpbWVuc2lvbnMubWFyZ2luLmJvdHRvbSlcblx0ICAgIC8vIC5hdHRyKCdpZCcsICdjaGFydDJTdmcnKVxuXHQgICAgLmF0dHIoJ2NsYXNzJywgJ2xpbmVDaGFydCcpXG5cdCAgICAuYXBwZW5kKCdnJylcblx0ICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyBzZWxmLmxpbmVDaGFydERpbWVuc2lvbnMubWFyZ2luLmxlZnQgKyAnLCcgKyBzZWxmLmxpbmVDaGFydERpbWVuc2lvbnMubWFyZ2luLnRvcCArICcpJyk7XG5cdHNlbGYuc3ZnRGVmcyA9IHNlbGYuc3ZnLmFwcGVuZCgnZGVmcycpO1xuXHRcblx0Ly8gVGhlIHN0cmF0ZWd5IGlzIHRvIGRyYXcgdGhlIGVudGlyZSBsaW5lLCBidXQgdXNlIGEgY2xpcCBwYXRoIHRvIG9ubHlcblx0Ly8gZGlzcGxheSB1cCB0byB0aGUgY3VycmVudCB5ZWFyLlxuXHQvLyB2YXIgY2hhcnQyQ2xpcFBhdGggPSBzZWxmLnN2Z0RlZnNcblx0Ly8gXHQuYXBwZW5kKCdjbGlwUGF0aCcpXG5cdC8vIFx0LmF0dHIoJ2NsYXNzJywgJ2NsaXAnKVxuXHQvLyBcdC5hcHBlbmQoJ3JlY3QnKVxuXHQvLyBcdC5hdHRyKCd3aWR0aCcsIDApXG5cdC8vIFx0LmF0dHIoJ2hlaWdodCcsIHNlbGYubGluZUNoYXJ0RGltZW5zaW9ucy5oZWlnaHQpO1xuXG4gICAgLy8gc2VsZi54LmRvbWFpbihbc2VsZi5zdHJUb1llYXIoXCIxOTY4XCIpLCBzZWxmLnN0clRvWWVhcihcIjIwMTNcIildKTtcblx0c2VsZi54LmRvbWFpbihzZWxmLnllYXJSYW5nZSk7XG5cdC8vIEhhY2sgdG8gY3V0IG9mZiB4IGF4aXMgYXQgMjAxMDpcblx0Ly8gc2VsZi54LmRvbWFpbihbc2VsZi55ZWFyUmFuZ2VbMF0sIDIwMTBdKTtcblx0Ly8gc2VsZi55LmRvbWFpbihbMCwgZDMubWF4KHNlbGYuZGF0YSwgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5jb3VudCs1OyB9KV0pO1xuXHRzZWxmLnkuZG9tYWluKFswLCBkMy5tYXgoc2VsZi5kYXRhLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLmNvdW50OyB9KV0pO1xuXG5cdHNlbGYueEF4aXMgPSBkMy5zdmcuYXhpcygpLnNjYWxlKHNlbGYueClcblx0XHQub3JpZW50KCdib3R0b20nKVxuXHRcdC50aWNrRm9ybWF0KGQzLmZvcm1hdChcImRcIikpXG5cdFx0Ly8gLnRpY2tzKDE2KTtcblx0XHQudGlja3MoTWF0aC5taW4oc2VsZi5kYXRhLmxlbmd0aCwgMjApKTtcblx0XG5cdHNlbGYueUF4aXMgPSBkMy5zdmcuYXhpcygpLnNjYWxlKHNlbGYueSlcblx0XHQub3JpZW50KCdsZWZ0Jylcblx0XHQudGlja3MoMilcblx0XHQudGlja1NpemUoMCk7XG5cdFxuICAgIC8vIERlZmluZSBsaW5lIGRyYXdpbmcgZnVuY3Rpb25cbiAgICBzZWxmLmxpbmUgPSBkMy5zdmcubGluZSgpXG5cdFx0LngoZnVuY3Rpb24oZCkgeyByZXR1cm4gc2VsZi54KGQueWVhcik7IH0pXG5cdFx0LnkoZnVuY3Rpb24oZCkgeyByZXR1cm4gc2VsZi55KGQuY291bnQpOyB9KTtcbiAgICBcbiAgICAvLyBEZWZpbmUgdGhlIGFyZWEgZHJhd2luZyBmdW5jdGlvblxuICAgIHNlbGYuYXJlYSA9IGQzLnN2Zy5hcmVhKClcblx0XHQueChmdW5jdGlvbihkKSB7IHJldHVybiBzZWxmLngoZC55ZWFyKTsgfSlcblx0XHQueTAoc2VsZi5saW5lQ2hhcnREaW1lbnNpb25zLmhlaWdodClcblx0XHQueTEoZnVuY3Rpb24oZCkgeyByZXR1cm4gc2VsZi55KGQuY291bnQpOyB9KTtcblxuXHQvLyBEcmF3IHggYXhpc1xuICAgIHNlbGYuc3ZnLmFwcGVuZCgnZycpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAneCBheGlzJylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKDAsJyArIHNlbGYubGluZUNoYXJ0RGltZW5zaW9ucy5oZWlnaHQgKyAnKScpXG4gICAgICAgICAgICAuY2FsbChzZWxmLnhBeGlzKTtcblxuICAgIC8vIFB1dCB0aGUgeWVhciBmb3IgZWFjaCBheGlzIHRpY2sgbGFiZWwgaW50byBhIGRhdGEgYXR0cmlidXRlXG4gICAgLy8gdG8gYmUgYWJsZSB0byBnZXQgaXQgbW9yZSBlYXNpbHkgbGF0ZXJcbiAgICB2YXIgeWVhckxhYmVscyA9IHNlbGYuc3ZnLnNlbGVjdCgnLnguYXhpcycpXG4gICAgICAgIC5zZWxlY3RBbGwoJy50aWNrJylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywneWVhclRpY2snKVxuICAgICAgICAvLyAuYXR0cihcImRhdGEteWVhclwiLCBmdW5jdGlvbihkKSB7cmV0dXJuIHNlbGYueWVhclRvU3RyKGQpOyB9KVxuICAgICAgICAuYXR0cihcImRhdGEteWVhclwiLCBmdW5jdGlvbihkKSB7cmV0dXJuIGQ7IH0pXG5cdFx0LnN0eWxlKCdmb250LXNpemUnLCAnLjc1ZW0nKTtcblx0XG4gICAgLy8gQWRkIGEgcmVjdCBmb3IgZWFjaCB5ZWFyIGxhYmVsIHNvIHdlIGNhbiBoaWdobGlnaHQgaXQgbGF0ZXJcblx0dmFyIHllYXJMYWJlbCA9IHNlbGYuc3ZnLnNlbGVjdEFsbCgnLnllYXJUaWNrJylcblx0XHQuYXBwZW5kKCdzdmc6cmVjdCcpXG5cdFx0LmF0dHIoJ2ZpbGwnLCBzZWxmLmNvbG9yU2NoZW1lWzRdKVxuXHRcdC5zdHlsZSgnb3BhY2l0eScsIDApXG5cdFx0LmF0dHIoJ2NsYXNzJywgJ2hpZ2hsaWdodFJlY3QnKVxuXHRcdC5lYWNoKGZ1bmN0aW9uKGQpIHtcblx0XHRcdHZhciBiYm94ID0gdGhpcy5wYXJlbnROb2RlLmdldEJCb3goKTtcblx0XHRcdHZhciBwYWRkaW5nID0gYmJveC53aWR0aC80O1xuXHRcdFx0ZDMuc2VsZWN0KHRoaXMpXG5cdFx0XHRcdC5hdHRyKCd4JywgYmJveC54IC0gcGFkZGluZylcblx0XHRcdC5hdHRyKCd5JywgYmJveC55KVxuXHRcdFx0LmF0dHIoJ3dpZHRoJywgYmJveC53aWR0aCArIHBhZGRpbmcqMilcblx0XHRcdC5hdHRyKCdoZWlnaHQnLCBiYm94LmhlaWdodCk7XG5cdFx0fSk7XG5cblx0Ly8gRHJhdyB5IGF4aXNcblx0c2VsZi5zdmcuYXBwZW5kKCdnJylcblx0XHQuYXR0cignY2xhc3MnLCAneSBheGlzJylcblx0XHQuY2FsbChzZWxmLnlBeGlzKVxuXHRcdC5hcHBlbmQoJ3RleHQnKVxuXHRcdC5hdHRyKCd0cmFuc2Zvcm0nLCAncm90YXRlKC05MCknKVxuXHRcdC5hdHRyKCd5JywgLXNlbGYubGluZUNoYXJ0RGltZW5zaW9ucy5tYXJnaW4ubGVmdC8yKVxuXHRcdC5hdHRyKCd4JywgLShzZWxmLmxpbmVDaGFydERpbWVuc2lvbnMuaGVpZ2h0ICsgc2VsZi5saW5lQ2hhcnREaW1lbnNpb25zLm1hcmdpbi50b3AgKyBzZWxmLmxpbmVDaGFydERpbWVuc2lvbnMubWFyZ2luLmJvdHRvbSkvMilcblx0XHQuYXR0cignY2xhc3MnLCAnYXhpc0xhYmVsJylcblx0XHQudGV4dCgnTnVtIGNpdGF0aW9ucycpXG5cdFx0LmF0dHIoJ2ZvbnQtc2l6ZScsICcuNWVtJyk7XG5cblx0Ly8gdmFyIG1heFggPSBzZWxmLngoc2VsZi55ZWFyUmFuZ2VbMV0pO1xuXHQvLyBjb25zb2xlLmxvZyhzZWxmLnllYXJSYW5nZVswXSk7XG5cdC8vIHNlbGYubGluZWFyR3JhZGllbnQgPSBzZWxmLnN2Zy5hcHBlbmQoJ2xpbmVhckdyYWRpZW50Jylcblx0Ly8gICAgIC5hdHRyKCdpZCcsICdsaW5lLWdyYWRpZW50Jylcblx0Ly8gICAgIC5hdHRyKCdncmFkaWVudFVuaXRzJywgJ3VzZXJTcGFjZU9uVXNlJylcblx0Ly8gICAgIC5hdHRyKCd4MScsIDApLmF0dHIoJ3kxJywgc2VsZi54KHNlbGYueWVhclJhbmdlWzBdKSlcblx0Ly8gICAgIC5hdHRyKCd4MicsIG1heFgpXG5cdC8vICAgICAuYXR0cigneTInLCAwKVxuXHQvLyAgICAgLnNlbGVjdEFsbCgnc3RvcCcpXG5cdC8vICAgICAuZGF0YShbXG5cdC8vIFx0e29mZnNldDogc2VsZi54KHNlbGYueWVhclJhbmdlWzBdKS9tYXhYLCBjb2xvcjogZDMucmdiKHNlbGYuY29sb3JTY2hlbWVbN10pLmRhcmtlcigpfSxcblx0Ly8gXHR7b2Zmc2V0OiBzZWxmLngoMTk4NSkvbWF4WCwgY29sb3I6IGQzLnJnYihzZWxmLmNvbG9yU2NoZW1lWzddKS5kYXJrZXIoKX0sXG5cdC8vIFx0e29mZnNldDogc2VsZi54KDE5ODcpL21heFgsIGNvbG9yOiBzZWxmLmNvbG9yU2NoZW1lWzJdfSxcblx0Ly8gXHR7b2Zmc2V0OiBzZWxmLngoMTk4OSkvbWF4WCwgY29sb3I6IHNlbGYuY29sb3JTY2hlbWVbMl19LFxuXHQvLyBcdHtvZmZzZXQ6IHNlbGYueCgxOTkxKS9tYXhYLCBjb2xvcjogc2VsZi5jb2xvclNjaGVtZVswXX0sXG5cdC8vIFx0e29mZnNldDogMSwgY29sb3I6IHNlbGYuY29sb3JTY2hlbWVbMF19XG5cdC8vICAgICBdKVxuXHQvLyAgICAgLmVudGVyKCkuYXBwZW5kKCdzdG9wJylcblx0Ly8gICAgIC5hdHRyKCdvZmZzZXQnLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLm9mZnNldDsgfSlcblx0Ly8gICAgIC5hdHRyKCdzdG9wLWNvbG9yJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5jb2xvcjsgfSk7XG5cdC8vIGNvbnNvbGUubG9nKHNlbGYubGluZWFyR3JhZGllbnQpO1xuXHRzZWxmLmxpbmVhckdyYWRpZW50ID0gZDMuc2VsZWN0KCcjbGluZS1ncmFkaWVudCcpO1xuXHQvLyBpZiAoc2VsZi5saW5lYXJHcmFkaWVudC5lbXB0eSgpKSB7XG5cdC8vIFx0Ly8gc2VsZi5saW5lYXJHcmFkaWVudCA9IHNlbGYubWFrZUNvbG9yR3JhZGllbnQoMTk4OSk7XG5cdC8vIFx0c2VsZi5saW5lYXJHcmFkaWVudCA9IHNlbGYubWFrZUNvbG9yR3JhZGllbnQoc2VsZi5wZXdfQ2xhc3MpO1xuXHQvLyB9XG5cdC8vIHNlbGYubGluZWFyR3JhZGllbnQgPSBzZWxmLm1ha2VDb2xvckdyYWRpZW50KHNlbGYucGV3X0NsYXNzKTtcblxuXHRzZWxmLmNoYXJ0QXJlYSA9IHNlbGYuc3ZnLmFwcGVuZCgnZycpXG5cdFx0Ly8gLmF0dHIoJ2NsaXAtcGF0aCcsICd1cmwoI2NsaXApJylcblx0XHQuYXBwZW5kKCdwYXRoJylcblx0XHQuZGF0dW0oc2VsZi5kYXRhKVxuXHRcdC5hdHRyKCdjbGFzcycsICdhcmVhJylcblx0XHQvLyAuc3R5bGUoJ2ZpbGwnLCBzZWxmLmdyYXBoUGFyYW1zLmNvbG9yU2NoZW1lLnZhbHVlWzBdKVxuXHRcdC5zdHlsZSgnZmlsbCcsICd1cmwoI2xpbmUtZ3JhZGllbnQpJylcblx0XHQuYXR0cignZCcsIHNlbGYuYXJlYSk7XG5cblx0c2VsZi5jaGFydExpbmUgPSBzZWxmLnN2Zy5hcHBlbmQoJ2cnKVxuXHRcdC8vIC5hdHRyKCdjbGlwLXBhdGgnLCAndXJsKCNjbGlwKScpXG5cdFx0LmFwcGVuZCgncGF0aCcpXG5cdFx0LmRhdHVtKHNlbGYuZGF0YSlcblx0XHQuYXR0cignY2xhc3MnLCAnbGluZScpXG5cdFx0Ly8gLnN0eWxlKCdzdHJva2UnLCBzZWxmLmdyYXBoUGFyYW1zLmNvbG9yU2NoZW1lLnZhbHVlWzBdKVxuXHRcdC5zdHlsZSgnc3Ryb2tlJywgJ3VybCgjbGluZS1ncmFkaWVudCknKVxuXHRcdC5hdHRyKCdkJywgc2VsZi5saW5lKTtcblxuXHRzZWxmLmN1cnJZZWFySW5kaWNhdG9yID0gc2VsZi5zdmcuYXBwZW5kKCdzdmc6bGluZScpXG5cdFx0Ly8gLmF0dHIoJ2NsYXNzJywgJ3ZlcnRpY2FsTGluZSB5ZWFySW5kaWNhdG9yJylcblx0XHQuYXR0cignY2xhc3MnLCAndmVydGljYWxMaW5lIHllYXJJbmRpY2F0b3IgaGlkZGVuJykgLy8gdHVybiBpdCBvZmYgZm9yIG5vdyAodGVzdGluZyBvdGhlciB0aGluZ3MpXG5cdFx0Ly8gS2VlcCB0cmFjayBvZiB0cmFuc2l0aW9uIHRpbWluZzpcblx0XHQuYXR0cignVCcsIDApXG5cdFx0LmF0dHIoJ3gxJywgc2VsZi54KHNlbGYuY3VyclllYXIpKVxuXHRcdC5hdHRyKCd4MicsIHNlbGYueChzZWxmLmN1cnJZZWFyKSlcblx0XHQuYXR0cigneTEnLCBzZWxmLmxpbmVDaGFydERpbWVuc2lvbnMuaGVpZ2h0KVxuXHRcdC8vIC5hdHRyKCd5MicsIHNlbGYubGluZUNoYXJ0WVNjYWxlKGN1cnJWYWwpKVxuXHRcdC5hdHRyKCd5MicsIDApXG5cdFx0LmF0dHIoJ3N0cm9rZS13aWR0aCcsIDIpXG5cdFx0LmF0dHIoJ3N0cm9rZScsICdibGFjaycpXG5cdFx0LmF0dHIoJ3N0cm9rZS1kYXNoYXJyYXknLCAoJzUsIDInKSlcblx0XHQuc3R5bGUoJ29wYWNpdHknLCAuMjUpO1xuXG5cdC8vIHNlbGYuc3ZnLnNlbGVjdCgnLnllYXJUaWNrJykuc2VsZWN0KCcuaGlnaGxpZ2h0UmVjdCcpXG5cdC8vIFx0LmF0dHIoJ2NsYXNzJywgJ2N1cnJZZWFyJylcblx0Ly8gXHQudHJhbnNpdGlvbigpXG5cdC8vIFx0LmR1cmF0aW9uKDUwMClcblx0Ly8gXHQuc3R5bGUoJ29wYWNpdHknLCAuMSk7XG5cblx0c2VsZi55ZWFyQXJlYSA9IHNlbGYuc3ZnLnNlbGVjdEFsbCgnLnllYXJBcmVhJylcblx0XHQuZGF0YShzZWxmLmRhdGEpXG5cdFx0LmVudGVyKCkuYXBwZW5kKCdzdmc6cmVjdCcpXG5cdFx0LmF0dHIoJ2NsYXNzJywgJ3llYXJBcmVhIGhpZGRlbicpXG5cdFx0LmF0dHIoJ2RhdGEteWVhcicsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQueWVhcjsgfSlcblx0XHQuYXR0cigneCcsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIHNlbGYueChkLnllYXIpOyB9KVxuXHRcdC5hdHRyKCd5JywgMClcblx0XHQuYXR0cignd2lkdGgnLCBmdW5jdGlvbihkKSB7IHJldHVybiBzZWxmLngoZC55ZWFyKzEpLXNlbGYueChkLnllYXIpOyB9KVxuXHRcdC5hdHRyKCdoZWlnaHQnLCBzZWxmLmxpbmVDaGFydERpbWVuc2lvbnMuaGVpZ2h0KVxuXHRcdC5hdHRyKCdmaWxsJywgc2VsZi5jb2xvclNjaGVtZVs0XSlcblx0XHQuc3R5bGUoJ29wYWNpdHknLCAwKTtcblxuXG5cdGlmICh0eXBlb2Ygc2VsZi5wZXdfQ2xhc3MgIT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRzZWxmLm1ha2VGdW5kaW5nTGluZXMoc2VsZi5wZXdfQ2xhc3MpO1xuXHR9XG5cbn07XG5cbmxpbmVDaGFydEJ5WWVhci5wcm90b3R5cGUuaW1wb3J0RGVmYXVsdE9wdGlvbnMgPSBmdW5jdGlvbihvcHRpb25zKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblxuXHRzZWxmLmNvbG9yU2NoZW1lID0gb3B0aW9ucy5jb2xvclNjaGVtZTtcblxuXHRzZWxmLmxpbmVDaGFydERpbWVuc2lvbnMgPSBvcHRpb25zLmRpbWVuc2lvbnMubGluZUNoYXJ0O1xuXG5cdHNlbGYudHJhbnNpdGlvblRpbWVQZXJZZWFyID0gb3B0aW9ucy50cmFuc2l0aW9uVGltZVBlclllYXI7XG5cbn07XG5cbmxpbmVDaGFydEJ5WWVhci5wcm90b3R5cGUubWFrZUNvbG9yR3JhZGllbnQgPSBmdW5jdGlvbihmdW5kaW5nWWVhcikge1xuXHR2YXIgc2VsZiA9IHRoaXM7XG5cdGNvbnNvbGUubG9nKGZ1bmRpbmdZZWFyKTtcblxuXHQvLyBUaGlzIG1ldGhvZCBzaG91bGQgYmUgY2FsbGVkIGJ5IHRoZSBtYWluIGFwcCAoZS5nLiBNYWluLmpzKVxuXHQvLyBJdCBtYWtlcyBhIGxpbmVhciBncmFkaWVudCBmb3IgdGhlIGxpbmUgY2hhcnRzIGJhc2VkIG9uIGZ1bmRpbmcgcGVyaW9kXG5cdC8vIGZ1bmRpbmdZZWFyIGlzIHRoZSBQZXcgU2Nob2xhcidzIGNsYXNzIHllYXJcblx0Ly8gVGhlIFBldyBmdW5kaW5nIGxhc3RzIGZvciBmaXZlIHllYXJzXG5cdC8vIE1heWJlIHRoaXMgbWV0aG9kIHNob3VsZCBiZSBtb2RpZmllZCBhdCBzb21lIHBvaW50IHRvIGJlIGFibGUgdG8gaGF2ZSBkaWZmZXJlbnQgbGVuZ3RocyBvZiBmdW5kaW5nXG5cdFxuXHQvLyBUSElTIERJRE4nVCBXT1JLIGJlY2F1c2UgdGhlIHdpZHRoIGRlcGVuZHMgb24gc2VsZi5pbml0LCBidXQgdGhpcyBuZWVkcyB0byBiZSBjYWxsZWQgYmVmb3JlIHNlbGYuaW5pdFxuXHQvL1xuXHQvLyBpbnN0ZWFkIGNhbGwgaXQgaW4gc2VsZi5pbml0KClcblx0XG5cblx0dmFyIG1heFggPSBzZWxmLngoc2VsZi55ZWFyUmFuZ2VbMV0pO1xuXHR2YXIgbGluZWFyR3JhZGllbnQgPSBzZWxmLnN2Zy5hcHBlbmQoJ2xpbmVhckdyYWRpZW50Jylcblx0ICAgIC5hdHRyKCdpZCcsICdsaW5lLWdyYWRpZW50Jylcblx0ICAgIC5hdHRyKCdncmFkaWVudFVuaXRzJywgJ3VzZXJTcGFjZU9uVXNlJylcblx0ICAgIC5hdHRyKCd4MScsIDApLmF0dHIoJ3kxJywgc2VsZi54KHNlbGYueWVhclJhbmdlWzBdKSlcblx0ICAgIC5hdHRyKCd4MicsIG1heFgpXG5cdCAgICAuYXR0cigneTInLCAwKVxuXHQgICAgLnNlbGVjdEFsbCgnc3RvcCcpXG5cdCAgICAuZGF0YShbXG5cdFx0e29mZnNldDogc2VsZi54KHNlbGYueWVhclJhbmdlWzBdKS9tYXhYLCBjb2xvcjogZDMucmdiKHNlbGYuY29sb3JTY2hlbWVbN10pLmRhcmtlcigpfSxcblx0XHR7b2Zmc2V0OiBzZWxmLngoZnVuZGluZ1llYXItMSkvbWF4WCwgY29sb3I6IGQzLnJnYihzZWxmLmNvbG9yU2NoZW1lWzddKS5kYXJrZXIoKX0sXG5cdFx0e29mZnNldDogc2VsZi54KGZ1bmRpbmdZZWFyKzEpL21heFgsIGNvbG9yOiBzZWxmLmNvbG9yU2NoZW1lWzJdfSxcblx0XHR7b2Zmc2V0OiBzZWxmLngoZnVuZGluZ1llYXIgKyAoc2VsZi5mdW5kaW5nVGltZSktMSkvbWF4WCwgY29sb3I6IHNlbGYuY29sb3JTY2hlbWVbMl19LFxuXHRcdHtvZmZzZXQ6IHNlbGYueChmdW5kaW5nWWVhciArIChzZWxmLmZ1bmRpbmdUaW1lKSsxKS9tYXhYLCBjb2xvcjogc2VsZi5jb2xvclNjaGVtZVswXX0sXG5cdFx0e29mZnNldDogMSwgY29sb3I6IHNlbGYuY29sb3JTY2hlbWVbMF19XG5cdCAgICBdKVxuXHQgICAgLmVudGVyKCkuYXBwZW5kKCdzdG9wJylcblx0ICAgIC5hdHRyKCdvZmZzZXQnLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLm9mZnNldDsgfSlcblx0ICAgIC5hdHRyKCdzdG9wLWNvbG9yJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5jb2xvcjsgfSk7XG5cblx0cmV0dXJuIGxpbmVhckdyYWRpZW50O1xuXG59O1xuXG5saW5lQ2hhcnRCeVllYXIucHJvdG90eXBlLm1ha2VGdW5kaW5nTGluZXMgPSBmdW5jdGlvbihmdW5kaW5nWWVhcikge1xuXHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0Ly8gTWFrZSB0aGUgdmVydGljYWwgbGluZXMgdGhhdCBzaG93IGZ1bmRpbmcgcGVyaW9kXG5cblxuXHRzZWxmLnN2Zy5hcHBlbmQoJ3N2ZzpsaW5lJylcblx0XHQuYXR0cignY2xhc3MnLCAndmVydGljYWxMaW5lU3RhdGljIHZlcnRpY2FsTGluZUZ1bmRpbmdCZWdpbicpXG5cdFx0LmF0dHIoJ3gxJywgc2VsZi54KGZ1bmRpbmdZZWFyKSlcblx0XHQuYXR0cigneDInLCBzZWxmLngoZnVuZGluZ1llYXIpKVxuXHRcdC5hdHRyKCd5MScsIHNlbGYubGluZUNoYXJ0RGltZW5zaW9ucy5oZWlnaHQpXG5cdFx0LmF0dHIoJ3kyJywgMClcblx0XHQuYXR0cignc3Ryb2tlLXdpZHRoJywgMilcblx0XHQuYXR0cignc3Ryb2tlJywgc2VsZi5jb2xvclNjaGVtZVsyXSlcblx0XHQuc3R5bGUoJ3N0cm9rZS1kYXNoYXJyYXknLCAoJzUsIDInKSlcblx0XHQuc3R5bGUoJ29wYWNpdHknLCAuOCk7XG5cdHNlbGYuc3ZnLmFwcGVuZCgnc3ZnOmxpbmUnKVxuXHRcdC5hdHRyKCdjbGFzcycsICd2ZXJ0aWNhbExpbmVTdGF0aWMgdmVydGljYWxMaW5lRnVuZGluZ0VuZCcpXG5cdFx0LmF0dHIoJ3gxJywgc2VsZi54KGZ1bmRpbmdZZWFyICsgc2VsZi5mdW5kaW5nVGltZSkpXG5cdFx0LmF0dHIoJ3gyJywgc2VsZi54KGZ1bmRpbmdZZWFyICsgc2VsZi5mdW5kaW5nVGltZSkpXG5cdFx0LmF0dHIoJ3kxJywgc2VsZi5saW5lQ2hhcnREaW1lbnNpb25zLmhlaWdodClcblx0XHQuYXR0cigneTInLCAwKVxuXHRcdC5hdHRyKCdzdHJva2Utd2lkdGgnLCAyKVxuXHRcdC5hdHRyKCdzdHJva2UnLCBzZWxmLmNvbG9yU2NoZW1lWzBdKVxuXHRcdC5zdHlsZSgnc3Ryb2tlLWRhc2hhcnJheScsICgnNSwgMicpKVxuXHRcdC5zdHlsZSgnb3BhY2l0eScsIC44KTtcbn07XG5cbmxpbmVDaGFydEJ5WWVhci5wcm90b3R5cGUuY2hhbmdlQW5pbWF0aW9uU3RhdGUgPSBmdW5jdGlvbihhbmltYXRpb25TdGF0ZSkge1xuXHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0c2VsZi5hbmltYXRpb25TdGF0ZSA9IGFuaW1hdGlvblN0YXRlO1xuXHRjb25zb2xlLmxvZyhzZWxmLmFuaW1hdGlvblN0YXRlKTtcblx0ZnVuY3Rpb24gYWR2YW5jZUxpbmUoKSB7XG5cdFx0dmFyIHRpbWVFbGFwc2VkID0gc2VsZi5jdXJyWWVhckluZGljYXRvci5hdHRyKCdUJyk7XG5cdFx0c2VsZi5jdXJyWWVhckluZGljYXRvclxuXHRcdFx0LmF0dHIoJ2RhdGEtc3RhdGUnLCAnZm9yd2FyZCcpXG5cdFx0XHQvLyAuYXR0cignVCcsIDApXG5cdFx0XHQuY2xhc3NlZCgnaGlkZGVuJywgZmFsc2UpXG5cdFx0XHQudHJhbnNpdGlvbigpXG5cdFx0XHQvLyAuZHVyYXRpb24oc2VsZi50cmFuc2l0aW9uVGltZVBlclllYXJbc2VsZi5jdXJyWWVhcl0gLSB0aW1lRWxhcHNlZClcblx0XHRcdC5kdXJhdGlvbihzZWxmLnRyYW5zaXRpb25UaW1lUGVyWWVhcltzZWxmLmN1cnJZZWFyXSlcblx0XHRcdC5lYXNlKCdsaW5lYXInKVxuXHRcdFx0LmF0dHIoJ3gxJywgc2VsZi54KHNlbGYuY3VyclllYXIpKVxuXHRcdFx0LmF0dHIoJ3gyJywgc2VsZi54KHNlbGYuY3VyclllYXIpKVxuXHRcdFx0Ly8gLmF0dHIoJ3kyJywgc2VsZi5saW5lQ2hhcnRZU2NhbGUoY3VyclZhbCkpXG5cdFx0XHQuYXR0cignZGF0YS1zdGF0ZScsICdzdG9wcGVkJylcblx0XHRcdC5hdHRyKCdUJywgMSlcblx0XHRcdC5lYWNoKCdlbmQnLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0ZDMuc2VsZWN0KHRoaXMpLmF0dHIoJ1QnLCAwKTtcblx0XHRcdFx0c2VsZi5jdXJyWWVhcisrO1xuXHRcdFx0XHQvLyBhZHZhbmNlTGluZSgpXG5cdFx0XHR9KTtcblx0XHQvLyAvLyBVcGRhdGUgdGhlIGNsaXAgcGF0aCB0byBzaG93IHRoZSBwYXJ0IG9mIHRoZSBsaW5lIHdlIHdhbnQgKHdpdGggdHJhbnNpdGlvbilcblx0XHQvLyBzZWxmLmxpbmVDaGFydENsaXBQYXRoXG5cdFx0Ly8gXHQuYXR0cignZGF0YS1zdGF0ZScsICdmb3J3YXJkJylcblx0XHQvLyBcdC8vIC5hdHRyKCdUJywgMClcblx0XHQvLyBcdC50cmFuc2l0aW9uKClcblx0XHQvLyBcdC5kdXJhdGlvbihzZWxmLmdyYXBoUGFyYW1zLnRyYW5zaXRpb25UaW1lUGVyWWVhci52YWx1ZSAtIHRpbWVFbGFwc2VkKVxuXHRcdC8vIFx0LmVhc2UoJ2xpbmVhcicpXG5cdFx0Ly8gXHQuYXR0cignd2lkdGgnLCBzZWxmLmxpbmVDaGFydFhTY2FsZShjdXJyWWVhckRhdGVGb3JtYXQpKVxuXHRcdC8vIFx0LmF0dHIoJ2RhdGEtc3RhdGUnLCAnc3RvcHBlZCcpXG5cdFx0Ly8gXHQuYXR0cignVCcsIDEpXG5cdFx0Ly8gXHQuZWFjaCgnZW5kJywgZnVuY3Rpb24oKSB7IGQzLnNlbGVjdCh0aGlzKS5hdHRyKCdUJywgMCk7IH0pO1xuXHR9XG5cdGlmIChzZWxmLmFuaW1hdGlvblN0YXRlID09PSAnZm9yd2FyZCcpIHtcblx0XHRhZHZhbmNlTGluZSgpO1xuXHR9XG59O1xuXG5saW5lQ2hhcnRCeVllYXIucHJvdG90eXBlLmNvcnJlY3RZZWFyID0gZnVuY3Rpb24oY3VyclllYXIpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXHRpZiAoY3VyclllYXIgIT0gc2VsZi5jdXJyWWVhcikge1xuXHRcdHNlbGYuY3VyclllYXIgPSBjdXJyWWVhcjtcblx0XHRzZWxmLmN1cnJZZWFySW5kaWNhdG9yXG5cdFx0XHQuYXR0cigneDEnLCBzZWxmLngoc2VsZi5jdXJyWWVhcikpXG5cdFx0XHQuYXR0cigneDInLCBzZWxmLngoc2VsZi5jdXJyWWVhcikpO1xuXHRcdHNlbGYuY2hhbmdlQW5pbWF0aW9uU3RhdGUoKTtcblx0fVxufTtcblxubGluZUNoYXJ0QnlZZWFyLnByb3RvdHlwZS5tb3ZlWWVhckluZGljYXRvciA9IGZ1bmN0aW9uKGN1cnJZZWFyKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblxuXHRzZWxmLmN1cnJZZWFyID0gY3VyclllYXI7XG5cdHNlbGYuY3VyclllYXJJbmRpY2F0b3Jcblx0XHQuYXR0cignVCcsIDApXG5cdFx0LnRyYW5zaXRpb24oKVxuXHRcdC5kdXJhdGlvbihzZWxmLnRyYW5zaXRpb25UaW1lUGVyWWVhcltzZWxmLmN1cnJZZWFyXSlcblx0XHQuZWFzZSgnbGluZWFyJylcblx0XHQuYXR0cigneDEnLCBzZWxmLngoc2VsZi5jdXJyWWVhcikpXG5cdFx0LmF0dHIoJ3gyJywgc2VsZi54KHNlbGYuY3VyclllYXIpKVxuXHRcdC8vIC5hdHRyKCd5MicsIHNlbGYubGluZUNoYXJ0WVNjYWxlKGN1cnJWYWwpKVxuXHRcdC8vIC5hdHRyKCdkYXRhLXN0YXRlJywgJ3N0b3BwZWQnKVxuXHRcdC5hdHRyKCdUJywgMSlcblx0XHQuZWFjaCgnZW5kJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRkMy5zZWxlY3QodGhpcykuYXR0cignVCcsIDApO1xuXHRcdH0pO1xuXHRmdW5jdGlvbiBoaWdobGlnaHRDdXJyWWVhclRpY2soKSB7XG5cdFx0c2VsZi5zdmcuc2VsZWN0QWxsKCcueWVhclRpY2snKS5zZWxlY3RBbGwoJy5oaWdobGlnaHRSZWN0Jylcblx0XHRcdC5maWx0ZXIoZnVuY3Rpb24oZCkgeyByZXR1cm4gZCA9PSBzZWxmLmN1cnJZZWFyOyB9KVxuXHRcdFx0LmF0dHIoJ2NsYXNzJywgJ2N1cnJZZWFyJylcblx0XHRcdC50cmFuc2l0aW9uKClcblx0XHRcdC5kdXJhdGlvbihzZWxmLnRyYW5zaXRpb25UaW1lUGVyWWVhcltzZWxmLmN1cnJZZWFyXS80KVxuXHRcdFx0LnN0eWxlKCdvcGFjaXR5JywgLjEpO1xuXHR9XG5cdHNlbGYuc3ZnLnNlbGVjdEFsbCgnLnllYXJUaWNrJykuc2VsZWN0QWxsKCcuY3VyclllYXInKVxuXHRcdC5jbGFzc2VkKCcuY3VyclllYXInLCBmYWxzZSlcblx0XHQudHJhbnNpdGlvbigpXG5cdFx0LmR1cmF0aW9uKHNlbGYudHJhbnNpdGlvblRpbWVQZXJZZWFyW3NlbGYuY3VyclllYXJdLzQpXG5cdFx0LnN0eWxlKCdvcGFjaXR5JywgMCk7XG5cdC8vIGhpZ2hsaWdodEN1cnJZZWFyVGljaygpO1xuXG5cdHNlbGYuc3ZnLnNlbGVjdEFsbCgnLnllYXJBcmVhLmN1cnJZZWFyJylcblx0XHQuY2xhc3NlZCgnY3VyclllYXInLCBmYWxzZSlcblx0XHQudHJhbnNpdGlvbigpXG5cdFx0LmR1cmF0aW9uKHNlbGYudHJhbnNpdGlvblRpbWVQZXJZZWFyW3NlbGYuY3VyclllYXJdLzQpXG5cdFx0Ly8gLnN0eWxlKCdvcGFjaXR5Jywgc2VsZi55ZWFyQXJlYU9wYWNpdHkvMik7XG5cdFx0LnN0eWxlKCdvcGFjaXR5JywgZnVuY3Rpb24oZCkge1xuXHRcdFx0aWYgKGQueWVhciA8IHNlbGYuY3VyclllYXIpIHtcblx0XHRcdFx0cmV0dXJuIHNlbGYueWVhckFyZWFPcGFjaXR5LzI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdH1cblx0XHR9KTtcblx0c2VsZi55ZWFyQXJlYS5maWx0ZXIoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC55ZWFyID09IHNlbGYuY3VyclllYXI7IH0pXG5cdFx0LmNsYXNzZWQoJ2N1cnJZZWFyJywgdHJ1ZSlcblx0XHQuY2xhc3NlZCgnaGlkZGVuJywgZmFsc2UpXG5cdFx0LnN0eWxlKCdvcGFjaXR5Jywgc2VsZi55ZWFyQXJlYU9wYWNpdHkqMilcblx0XHQudHJhbnNpdGlvbigpXG5cdFx0LmR1cmF0aW9uKHNlbGYudHJhbnNpdGlvblRpbWVQZXJZZWFyW3NlbGYuY3VyclllYXJdLzIpXG5cdFx0LnN0eWxlKCdvcGFjaXR5Jywgc2VsZi55ZWFyQXJlYU9wYWNpdHkpO1xuXG5cdC8vIG1ha2Ugc3VyZSB0aGF0IGV2ZXJ5dGhpbmcgaXMgaW4gb3JkZXIuLi4gaS5lLiB0aGF0IHllYXJzIGJlZm9yZSBjdXJyWWVhciBhcmUgaGlnaGxpZ2h0ZWRcblx0Ly8gYW5kIHllYXJzIGFmdGVyIGN1cnJZZWFyIGFyZSBub3Rcblx0c2VsZi55ZWFyQXJlYS5maWx0ZXIoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC55ZWFyIDwgc2VsZi5jdXJyWWVhcjsgfSlcblx0XHQuY2xhc3NlZCgnaGlkZGVuJywgZmFsc2UpXG5cdFx0LnN0eWxlKCdvcGFjaXR5Jywgc2VsZi55ZWFyQXJlYU9wYWNpdHkvMik7XG5cdHNlbGYueWVhckFyZWEuZmlsdGVyKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQueWVhciA+IHNlbGYuY3VyclllYXI7IH0pXG5cdFx0LnN0eWxlKCdvcGFjaXR5JywgMCk7XG5cdGNvbnNvbGUubG9nKHNlbGYuY3VyclllYXIpO1xuXG59O1xuXG5saW5lQ2hhcnRCeVllYXIucHJvdG90eXBlLmFkZFRpdGxlID0gZnVuY3Rpb24odGl0bGUpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdHNlbGYudGl0bGUgPSBzZWxmLnN2Zy5hcHBlbmQoJ3RleHQnKVxuXHQgICAgLmF0dHIoJ2NsYXNzJywgJ2xpbmVDaGFydFRpdGxlJylcblx0ICAgIC5hdHRyKCd4Jywgc2VsZi5saW5lQ2hhcnREaW1lbnNpb25zLndpZHRoLzIpXG5cdCAgICAuYXR0cigneScsIDAgLSAoc2VsZi5saW5lQ2hhcnREaW1lbnNpb25zLm1hcmdpbi50b3AgLyAyKSApXG5cdCAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcblx0ICAgIC50ZXh0KHRpdGxlKTtcblxufTtcbi8vIHZhciBjaXRhdGlvblZpcyA9IGNpdGF0aW9uVmlzIHx8IHt9O1xuLy9cbi8vICQoIGRvY3VtZW50ICkub24oIFwiaW5pdENvbXBsZXRlXCIsIHtmb2N1c19pZDogZm9jdXNfaWR9LCBmdW5jdGlvbihldmVudCkge1xuLy8gXHQvLyBwYXNzIGZvY3VzX2lkIHRocm91Z2ggdGhlIGV2ZW50IGRhdGFcbi8vIFx0dmFyIGZvY3VzX2lkID0gZXZlbnQuZGF0YS5mb2N1c19pZDtcbi8vIFx0Zm9jdXNfaWQgPSBwYXJzZUludChmb2N1c19pZClcbi8vIFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy85MDExMTUvaG93LWNhbi1pLWdldC1xdWVyeS1zdHJpbmctdmFsdWVzLWluLWphdmFzY3JpcHRcbi8vIFx0ZnVuY3Rpb24gZ2V0UGFyYW1ldGVyQnlOYW1lKG5hbWUsIHVybCkge1xuLy8gXHRcdGlmICghdXJsKSB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbi8vIFx0XHRuYW1lID0gbmFtZS5yZXBsYWNlKC9bXFxbXFxdXS9nLCBcIlxcXFwkJlwiKTtcbi8vIFx0XHR2YXIgcmVnZXggPSBuZXcgUmVnRXhwKFwiWz8mXVwiICsgbmFtZSArIFwiKD0oW14mI10qKXwmfCN8JClcIiksXG4vLyBcdFx0XHRyZXN1bHRzID0gcmVnZXguZXhlYyh1cmwpO1xuLy8gXHRcdGlmICghcmVzdWx0cykgcmV0dXJuIG51bGw7XG4vLyBcdFx0aWYgKCFyZXN1bHRzWzJdKSByZXR1cm4gJyc7XG4vLyBcdFx0cmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChyZXN1bHRzWzJdLnJlcGxhY2UoL1xcKy9nLCBcIiBcIikpO1xuLy8gXHR9XG4vLyBcdC8vIGlmIChnZXRQYXJhbWV0ZXJCeU5hbWUoJ3Jjdm1zZycpID09PSBudWxsKSByZXR1cm47IC8vIGFkZCBcInJjdm1zZz0xXCIgdG8gdGhlIFVSTCBxdWVyeSBwYXJhbWV0ZXJzIHRvIGVuYWJsZSB0aGlzLCBvdGhlcndpc2UgZG8gbm90aGluZ1xuLy9cbi8vIFx0dmFyIGVnb0dyYXBoVmlzID0gY2l0YXRpb25WaXMuZWdvR3JhcGhWaXM7XG4vL1xuLy8gXHQvLyBvcGVuIHRoZSB0aW1lbGluZVZpcyB3aGVuIGNlbnRlciBub2RlIGlzIGNsaWNrZWRcbi8vIFx0aWYgKHR5cGVvZiBmb2N1c19pZCA9PSAndW5kZWZpbmVkJyB8fCAhZm9jdXNfaWQpIHtcbi8vIFx0XHR2YXIgZm9jdXNfaWQgPSBnZXRQYXJhbWV0ZXJCeU5hbWUoJ2ZvY3VzaWQnKTtcbi8vIFx0fVxuLy8gXHRpZiAoZm9jdXNfaWQpIHtcbi8vIFx0XHQkKCAnLmNlbnRlck5vZGUnICkuY2xpY2soIGZ1bmN0aW9uKCkge1xuLy8gXHRcdFx0dmFyIHVybCA9IEZsYXNrLnVybF9mb3IoJ2dlbmVyYXRlX2NvbGxkYXRhX2Zyb21fY29sbGVjdGlvbicsIHsnZm9jdXNfaWQnOiBmb2N1c19pZH0pO1xuLy8gXHRcdFx0d2luZG93Lm9wZW4odXJsLCAnX2JsYW5rJywgJ2xvY2F0aW9uPTAnKTtcbi8vIFx0XHR9KTtcbi8vIFx0fVxuLy9cbi8vIFx0JCh3aW5kb3cpLm9uKCdzdG9yYWdlJywgbWVzc2FnZV9yZWNlaXZlKTtcbi8vXG4vLyBcdC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzI4MjMwODQ1L2NvbW11bmljYXRpb24tYmV0d2Vlbi10YWJzLW9yLXdpbmRvd3Ncbi8vIFx0Ly8gcmVjZWl2ZSBtZXNzYWdlXG4vLyBcdC8vXG4vLyBcdGZ1bmN0aW9uIG1lc3NhZ2VfcmVjZWl2ZShldikgXG4vLyBcdHtcbi8vIFx0XHRpZiAoZXYub3JpZ2luYWxFdmVudC5rZXkhPSdtZXNzYWdlJykgcmV0dXJuOyAvLyBpZ25vcmUgb3RoZXIga2V5c1xuLy8gXHRcdHZhciBtZXNzYWdlID0gSlNPTi5wYXJzZShldi5vcmlnaW5hbEV2ZW50Lm5ld1ZhbHVlKTtcbi8vIFx0XHRpZiAoIW1lc3NhZ2UpIHJldHVybjsgLy8gaWdub3JlIGVtcHR5IG1lc3NhZ2Ugb3IgbWVzc2FnZSByZXNldFxuLy9cbi8vIFx0XHQvLyBhY3Qgb24gdGhlIG1lc3NhZ2Vcbi8vIFx0XHRpZiAobWVzc2FnZS5jb21tYW5kID09ICd0aW1lbGluZVZpczpwYXBlckl0ZW06bW91c2VvdmVyJykgaGlnaGxpZ2h0TGlua2VkUGFwZXJzKG1lc3NhZ2UuZGF0YS5waWQpO1xuLy8gXHRcdGlmIChtZXNzYWdlLmNvbW1hbmQgPT0gJ3RpbWVsaW5lVmlzOnBhcGVySXRlbTptb3VzZW91dCcpIGxpbmtlZFBhcGVyc01vdXNlb3V0KG1lc3NhZ2UuZGF0YS5waWQpO1xuLy8gXHR9XG4vL1xuLy8gXHRmdW5jdGlvbiBoaWdobGlnaHRMaW5rZWRQYXBlcnMocGFwZXJfaWQpIHtcbi8vIFx0XHR2YXIgaGlnaGxpZ2h0ZWROb2RlcyA9IFtdO1xuLy9cbi8vIFx0XHRkMy5zZWxlY3RBbGwoXCIubm9kZVwiKS5maWx0ZXIoZnVuY3Rpb24oZCkge1xuLy8gXHRcdFx0Ly8gcmV0dXJuIGQudGFyZ2V0UGFwZXJJRHMgJiYgZC50YXJnZXRQYXBlcklEcy5pbmRleE9mKHBhcGVyX2lkKSAhPSAtMTtcbi8vIFx0XHRcdGlmIChkLnRhcmdldFBhcGVySURzICYmIGQudGFyZ2V0UGFwZXJJRHMuaW5kZXhPZihwYXBlcl9pZCkgIT0gLTEpIHtcbi8vIFx0XHRcdFx0aGlnaGxpZ2h0ZWROb2Rlcy5wdXNoKGQpO1xuLy8gXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcbi8vIFx0XHRcdH1cbi8vIFx0XHR9KVxuLy8gXHRcdC5jbGFzc2VkKFwibGlua2VkVG9UaW1lbGluZVwiLCB0cnVlKTtcbi8vXG4vLyBcdFx0Ly8gZDMuc2VsZWN0QWxsKFwiLmxpbmsudG9FZ29cIikuZmlsdGVyKGZ1bmN0aW9uKGQpIHtcbi8vIFx0XHRkMy5zZWxlY3RBbGwoXCIubGlua1wiKS5maWx0ZXIoZnVuY3Rpb24oZCkge1xuLy8gXHRcdFx0cmV0dXJuIGhpZ2hsaWdodGVkTm9kZXMuaW5kZXhPZihkLnNvdXJjZSkgIT0gLTE7XG4vLyBcdFx0fSlcbi8vIFx0XHQuY2xhc3NlZChcImxpbmtlZFRvVGltZWxpbmVcIiwgdHJ1ZSk7XG4vLyBcdH1cbi8vXG4vLyBcdGZ1bmN0aW9uIGxpbmtlZFBhcGVyc01vdXNlb3V0KHBhcGVyX2lkKSB7XG4vLyBcdFx0Ly8gZDMuc2VsZWN0QWxsKFwiLm5vZGVcIikuZmlsdGVyKGZ1bmN0aW9uKGQpIHtcbi8vIFx0XHQvLyBcdHJldHVybiBkLnRhcmdldFBhcGVySURzICYmIGQudGFyZ2V0UGFwZXJJRHMuaW5kZXhPZihwYXBlcl9pZCkgIT0gLTE7XG4vLyBcdFx0Ly8gfSlcbi8vIFx0XHQvLyAuY2xhc3NlZChcImxpbmtlZFRvVGltZWxpbmVcIiwgZmFsc2UpO1xuLy8gXHRcdGQzLnNlbGVjdEFsbChcIi5saW5rZWRUb1RpbWVsaW5lXCIpLmNsYXNzZWQoXCJsaW5rZWRUb1RpbWVsaW5lXCIsIGZhbHNlKTtcbi8vIFx0fVxuLy8gfSk7XG5cblxuXG52YXIgY2l0YXRpb25WaXMgPSBjaXRhdGlvblZpcyB8fCB7fTtcblxuJCggZG9jdW1lbnQgKS5vbiggXCJpbml0Q29tcGxldGVcIiwgZnVuY3Rpb24oKSB7XG5cdHZhciBlZ29HcmFwaFZpcyA9IGNpdGF0aW9uVmlzLmVnb0dyYXBoVmlzO1xuXHRpZiAoZWdvR3JhcGhWaXMuem9vbWFibGUgPT0gZmFsc2UpIHtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIHpvb20gPSBlZ29HcmFwaFZpcy56b29tO1xuXHRlZ29HcmFwaFZpcy56b29tVHJhbnNsYXRlID0gem9vbS50cmFuc2xhdGUoKTtcblxuXHRlZ29HcmFwaFZpcy5jaGVja1pvb20gPSBmdW5jdGlvbihkKSB7XG5cdFx0dmFyIHpvb21UaHJlc2hvbGRNaW4gPSBjb29yZGluYXRlcyhbMCwgMF0pWzFdOyAgLy8gbWluaW11bSB5IHZhbHVlXG5cdFx0dmFyIHpvb21UaHJlc2hvbGRNYXggPSBjb29yZGluYXRlcyhbZWdvR3JhcGhWaXMuZ3JhcGhEaW1lbnNpb25zLndpZHRoLCBlZ29HcmFwaFZpcy5ncmFwaERpbWVuc2lvbnMuaGVpZ2h0XSlbMV07ICAvLyBtYXhpbXVtIHkgdmFsdWVcblx0XHRpZiAoZC55IDwgem9vbVRocmVzaG9sZE1pbiB8fCBkLnkgPiB6b29tVGhyZXNob2xkTWF4KSB7XG5cdFx0XHRjb25zb2xlLmxvZyh6b29tLnRyYW5zbGF0ZSgpKTtcblx0XHRcdGNvbnNvbGUubG9nKHpvb20uc2NhbGUoKSk7XG5cdFx0XHRjb25zb2xlLmxvZyhjb29yZGluYXRlcyhbZC54LCBkLnldKSk7XG5cdGNvbnNvbGUubG9nKGNvb3JkaW5hdGVzKFtlZ29HcmFwaFZpcy5ncmFwaERpbWVuc2lvbnMud2lkdGgsIGVnb0dyYXBoVmlzLmdyYXBoRGltZW5zaW9ucy5oZWlnaHRdKSk7XG5cdGNvbnNvbGUubG9nKGNvb3JkaW5hdGVzKFswLDBdKSk7XG5cdFx0XHQvLyBodHRwOi8vYmwub2Nrcy5vcmcvbWJvc3RvY2svN2VjOTc3Yzk1OTEwZGQwMjY4MTJcblx0XHRcdGVnb0dyYXBoVmlzLmdyb3VwLmNhbGwoem9vbS5ldmVudCk7XG5cblx0XHRcdC8vIFJlY29yZCB0aGUgY29vcmRpbmF0ZXMgKGluIGRhdGEgc3BhY2UpIG9mIHRoZSBjZW50ZXIgKGluIHNjcmVlbiBzcGFjZSkuXG5cdFx0XHR2YXIgY2VudGVyMCA9IHpvb20uY2VudGVyKCk7XG5cdFx0XHR2YXIgdHJhbnNsYXRlMCA9IHpvb20udHJhbnNsYXRlKCk7XG5cdFx0XHR2YXIgY29vcmRpbmF0ZXMwID0gY29vcmRpbmF0ZXMoY2VudGVyMCk7XG5cdFx0XHR6b29tLnNjYWxlKHpvb20uc2NhbGUoKSAqIC45KTtcblxuXHRcdFx0Ly8gVHJhbnNsYXRlIGJhY2sgdG8gdGhlIGNlbnRlci5cblx0XHRcdHZhciBjZW50ZXIxID0gcG9pbnQoY29vcmRpbmF0ZXMwKTtcblx0XHRcdHpvb20udHJhbnNsYXRlKFt0cmFuc2xhdGUwWzBdICsgY2VudGVyMFswXSAtIGNlbnRlcjFbMF0sIHRyYW5zbGF0ZTBbMV0gKyBjZW50ZXIwWzFdIC0gY2VudGVyMVsxXV0pO1xuXG5cdFx0XHRlZ29HcmFwaFZpcy5ncm91cC50cmFuc2l0aW9uKCkuZHVyYXRpb24oNTAwKS5jYWxsKHpvb20uZXZlbnQpO1xuXHRcdFx0Ly8gZWdvR3JhcGhWaXMuZ3JvdXAuY2FsbCh6b29tLmV2ZW50KTtcblx0XHR9XG5cdH07XG5cblx0ZnVuY3Rpb24gY29vcmRpbmF0ZXMocG9pbnQpIHtcblx0XHR2YXIgc2NhbGUgPSB6b29tLnNjYWxlKCk7XG5cdFx0dmFyIHRyYW5zbGF0ZSA9IHpvb20udHJhbnNsYXRlKCk7XG5cdFx0cmV0dXJuIFsocG9pbnRbMF0gLSB0cmFuc2xhdGVbMF0pIC8gc2NhbGUsIChwb2ludFsxXSAtIHRyYW5zbGF0ZVsxXSkgLyBzY2FsZV07XG5cdH1cblxuXHRmdW5jdGlvbiBwb2ludChjb29yZGluYXRlcykge1xuXHRcdHZhciBzY2FsZSA9IHpvb20uc2NhbGUoKTtcblx0XHR2YXIgdHJhbnNsYXRlID0gem9vbS50cmFuc2xhdGUoKTtcblx0XHRyZXR1cm4gW2Nvb3JkaW5hdGVzWzBdICogc2NhbGUgKyB0cmFuc2xhdGVbMF0sIGNvb3JkaW5hdGVzWzFdICogc2NhbGUgKyB0cmFuc2xhdGVbMV1dO1xuXHR9XG5cblx0ZnVuY3Rpb24gdGVzdHJlY29yZCgpIHtcblx0XHR2YXIgdCA9IFszMDAsIDUwMV07XG5cdFx0Y29uc29sZS5sb2coJ2Nvb3JkaW5hdGVzJyk7XG5cdFx0Y29uc29sZS5sb2codCk7XG5cdFx0Y29uc29sZS5sb2coY29vcmRpbmF0ZXModCkpO1xuXHRjb25zb2xlLmxvZyhjb29yZGluYXRlcyhbZWdvR3JhcGhWaXMuZ3JhcGhEaW1lbnNpb25zLndpZHRoLCBlZ29HcmFwaFZpcy5ncmFwaERpbWVuc2lvbnMuaGVpZ2h0XSkpO1xuXHR9XG5cblx0JCggZG9jdW1lbnQgKS5vbiggXCJhbmltYXRpb25GaW5pc2hlZFwiLCBmdW5jdGlvbigpIHtcblx0XHR0ZXN0cmVjb3JkKCk7XG5cdFx0Y29uc29sZS5sb2coem9vbS50cmFuc2xhdGUoKSk7XG5cdFx0Y29uc29sZS5sb2coem9vbS5zY2FsZSgpKTtcblx0fSk7XG5cdHRlc3RyZWNvcmQoKTtcblx0XHRcdC8vIC8vIFJlY29yZCB0aGUgY29vcmRpbmF0ZXMgKGluIGRhdGEgc3BhY2UpIG9mIHRoZSBjZW50ZXIgKGluIHNjcmVlbiBzcGFjZSkuXG5cdFx0XHQvLyB2YXIgY2VudGVyMCA9IHpvb20uY2VudGVyKCk7XG5cdFx0XHQvLyB2YXIgdHJhbnNsYXRlMCA9IHpvb20udHJhbnNsYXRlKCk7XG5cdFx0XHQvLyB2YXIgY29vcmRpbmF0ZXMwID0gY29vcmRpbmF0ZXMoY2VudGVyMCk7XG5cdFx0XHQvLyB6b29tLnNjYWxlKHpvb20uc2NhbGUoKSAqIC41KTtcbiAgICAgICAgICAgIC8vXG5cdFx0XHQvLyAvLyBUcmFuc2xhdGUgYmFjayB0byB0aGUgY2VudGVyLlxuXHRcdFx0Ly8gdmFyIGNlbnRlcjEgPSBwb2ludChjb29yZGluYXRlczApO1xuXHRcdFx0Ly8gem9vbS50cmFuc2xhdGUoW3RyYW5zbGF0ZTBbMF0gKyBjZW50ZXIwWzBdIC0gY2VudGVyMVswXSwgdHJhbnNsYXRlMFsxXSArIGNlbnRlcjBbMV0gLSBjZW50ZXIxWzFdXSk7XG4gICAgICAgICAgICAvL1xuXHRcdFx0Ly8gLy8gZWdvR3JhcGhWaXMuZ3JvdXAudHJhbnNpdGlvbigpLmR1cmF0aW9uKDIwMCkuY2FsbCh6b29tLmV2ZW50KTtcblx0XHRcdC8vIGVnb0dyYXBoVmlzLmdyb3VwLmNhbGwoem9vbS5ldmVudCk7XG5cdFx0XHQvLyB0ZXN0cmVjb3JkKCk7XG59KTtcblxuZnVuY3Rpb24gbWFpbihncmFwaCkge1xuaWYgKGNpdGF0aW9udmlzX2RhdGEgPT09ICdBQk9SVCcpIHtcblx0cmV0dXJuO1xufVxuXG5kMy5zZWxlY3QoJyNtYWluRGl2JykuYXBwZW5kKCdwJylcblx0LmF0dHIoXCJjbGFzc1wiLCBcImxvYWRpbmdUZXh0XCIpXG5cdC50ZXh0KCdMb2FkaW5nLi4uJyk7XG5cblxuLy8gZDMuanNvbihjaXRhdGlvbnZpc19kYXRhLCBmdW5jdGlvbihlcnJvciwgZ3JhcGgpIHtcblx0Y29uc29sZS5sb2coZ3JhcGgpO1xuXG5cdC8vIEdldCB0aGUgbW9zdCBjb21tb24gRG9tYWluIElEcyBmb3IgdGhlIGVnbyBhdXRob3IncyBwYXBlcnNcblx0dmFyIGRvbWFpbnNOZXN0ID0gZDMubmVzdCgpXG5cdFx0LmtleShmdW5jdGlvbihkKSB7IHJldHVybiBkLkRvbWFpbklEOyB9KS5zb3J0VmFsdWVzKGQzLmRlc2NlbmRpbmcpXG5cdFx0LnJvbGx1cChmdW5jdGlvbihsZWF2ZXMpIHsgcmV0dXJuIGxlYXZlcy5sZW5ndGg7IH0pXG5cdFx0LmVudHJpZXMoZ3JhcGgubm9kZXNbMF0ucGFwZXJzKTtcblx0ZG9tYWluc05lc3Quc29ydChmdW5jdGlvbihhLGIpIHsgcmV0dXJuIGQzLmRlc2NlbmRpbmcoYS52YWx1ZXMsIGIudmFsdWVzKTsgfSk7XG5cdC8vIHN0b3JlIGFzIGEgbm9kZSBwcm9wZXJ0eVxuXHRncmFwaC5ub2Rlc1swXS5Eb21haW5Db3VudHMgPSBkb21haW5zTmVzdDtcblx0Ly8gZDMuc2VsZWN0KCcjaW5mb0RpdicpLmFwcGVuZCgncCcpLnRleHQoZ3JhcGgubm9kZXNbMF0uQXV0aG9yTmFtZSk7XG5cblx0dmFyIGRlZmF1bHRfb3B0aW9ucyA9IGNpdGF0aW9uVmlzLmRlZmF1bHRfb3B0aW9ucywgXG5cdFx0c3VtbWFyeVN0YXRpc3RpY3MgPSBjaXRhdGlvblZpcy5zdW1tYXJ5U3RhdGlzdGljcyxcblx0XHRlZ29HcmFwaERhdGEgPSBjaXRhdGlvblZpcy5lZ29HcmFwaERhdGEsXG5cdCAgICBsaW5lQ2hhcnREYXRhID0gY2l0YXRpb25WaXMubGluZUNoYXJ0RGF0YSxcblx0XHRldmVudExpc3RlbmVycyA9IGNpdGF0aW9uVmlzLmV2ZW50TGlzdGVuZXJzO1xuXG5cdGNvbnNvbGUubG9nKGRlZmF1bHRfb3B0aW9ucyk7XG5cdHZhciBvcHRpb25zID0gZGVmYXVsdF9vcHRpb25zLmRlZmF1bHRzO1xuXHRjb25zb2xlLmxvZyhvcHRpb25zKTtcblxuXHRncmFwaCA9IHN1bW1hcnlTdGF0aXN0aWNzLmFkZFN1bW1hcnlTdGF0aXN0aWNzKGdyYXBoKTtcblx0Y2l0YXRpb25WaXMuZ3JhcGhfZGF0YSA9IGVnb0dyYXBoRGF0YS5wcmVwYXJlX2Vnb0dyYXBoRGF0YShncmFwaCk7XG5cdGNpdGF0aW9uVmlzLnB1YmxpY2F0aW9uc19kYXRhID0gbGluZUNoYXJ0RGF0YS5wcmVwYXJlRGF0YV9lZ29BdXRob3JQdWJsaWNhdGlvbnMoZ3JhcGgpO1xuXHRjaXRhdGlvblZpcy5hbGxfY2l0YXRpb25zX2RhdGEgPSBsaW5lQ2hhcnREYXRhLnByZXBhcmVEYXRhX2FsbENpdGF0aW9ucyhncmFwaCk7XG5cdGNpdGF0aW9uVmlzLmVpZ2VuZmFjdG9yX3N1bV9kYXRhID0gbGluZUNoYXJ0RGF0YS5wcmVwYXJlRGF0YV9hdXRob3JFaWdlbmZhY3RvclN1bShncmFwaCk7XG5cblx0Ly8gVmlzdWFsaXphdGlvbiBvYmplY3RzIGdvIGhlcmVcblx0Y2l0YXRpb25WaXMuZWdvR3JhcGhWaXMgPSBuZXcgZWdvR3JhcGhWaXMoY2l0YXRpb25WaXMuZ3JhcGhfZGF0YSk7XG5cdC8vIGNpdGF0aW9uVmlzLnB1YmxpY2F0aW9uc0xpbmVDaGFydCA9IG5ldyBsaW5lQ2hhcnRCeVllYXIoY2l0YXRpb25WaXMucHVibGljYXRpb25zX2RhdGEpO1xuXHQvLyBjaXRhdGlvblZpcy5jaXRhdGlvbnNMaW5lQ2hhcnQgPSBuZXcgbGluZUNoYXJ0QnlZZWFyKGNpdGF0aW9uVmlzLmFsbF9jaXRhdGlvbnNfZGF0YSk7XG5cdC8vIGNpdGF0aW9uVmlzLmVpZ2VuZmFjdG9yU3VtTGluZUNoYXJ0ID0gbmV3IGxpbmVDaGFydEJ5WWVhcihjaXRhdGlvblZpcy5laWdlbmZhY3Rvcl9zdW1fZGF0YSk7XG5cdGNpdGF0aW9uVmlzLmxpbmVDaGFydHMgPSBbXTtcblx0Y2l0YXRpb25WaXMubGluZUNoYXJ0cy5wdXNoKG5ldyBsaW5lQ2hhcnRCeVllYXIoY2l0YXRpb25WaXMucHVibGljYXRpb25zX2RhdGEpKTtcblx0Y2l0YXRpb25WaXMubGluZUNoYXJ0cy5wdXNoKG5ldyBsaW5lQ2hhcnRCeVllYXIoY2l0YXRpb25WaXMuYWxsX2NpdGF0aW9uc19kYXRhKSk7XG5cdGNpdGF0aW9uVmlzLmxpbmVDaGFydHMucHVzaChuZXcgbGluZUNoYXJ0QnlZZWFyKGNpdGF0aW9uVmlzLmVpZ2VuZmFjdG9yX3N1bV9kYXRhKSk7XG5cblx0b3B0aW9ucy50cmFuc2l0aW9uVGltZVBlclllYXIgPSBjaXRhdGlvblZpcy5nZXRUcmFuc2l0aW9uVGltZVBlclllYXIoZ3JhcGgpO1xuXG5cdGNpdGF0aW9uVmlzLmVnb0dyYXBoVmlzLmltcG9ydERlZmF1bHRPcHRpb25zKG9wdGlvbnMpO1xuXHRmb3IgKHZhciBpPTA7IGk8Y2l0YXRpb25WaXMubGluZUNoYXJ0cy5sZW5ndGg7IGkrKykge1xuXHRcdGNpdGF0aW9uVmlzLmxpbmVDaGFydHNbaV0uaW1wb3J0RGVmYXVsdE9wdGlvbnMob3B0aW9ucyk7XG5cdH1cblxuXHRjaXRhdGlvblZpcy5lZ29HcmFwaFZpcy5pbml0KCk7XG5cdGZvciAodmFyIGk9MDsgaTxjaXRhdGlvblZpcy5saW5lQ2hhcnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2l0YXRpb25WaXMubGluZUNoYXJ0c1tpXS5pbml0KCk7XG5cdH1cblx0JC5ldmVudC50cmlnZ2VyKHtcblx0XHR0eXBlOiBcImluaXRDb21wbGV0ZVwiLFxuXHR9KTtcblxuXHRjaXRhdGlvblZpcy5saW5lQ2hhcnRzWzBdLmFkZFRpdGxlKFwiTnVtYmVyIG9mIHB1YmxpY2F0aW9uc1wiKTtcblx0Y2l0YXRpb25WaXMubGluZUNoYXJ0c1sxXS5hZGRUaXRsZShcIk51bWJlciBvZiBjaXRhdGlvbnMgcmVjZWl2ZWRcIik7XG5cdHZhciBjdHJ0eXBlID0gZ2V0UXVlcnlWYXJpYWJsZShcImN0cnR5cGVcIik7XG5cdGlmICghY3RydHlwZSkge1xuXHRcdGN0cnR5cGUgPSBcImF1dGhvclwiO1xuXHR9XG5cdGNvbnNvbGUubG9nKGN0cnR5cGUpO1xuXHQvLyBjaXRhdGlvblZpcy5saW5lQ2hhcnRzWzJdLmFkZFRpdGxlKFwiU3VtIG9mIGVpZ2VuZmFjdG9yIGZvciB0aGlzIGF1dGhvcidzIHB1YmxpY2F0aW9ucyBieSB5ZWFyXCIpO1xuXHRjaXRhdGlvblZpcy5saW5lQ2hhcnRzWzJdLmFkZFRpdGxlKFwiU3VtIG9mIGVpZ2VuZmFjdG9yIGZvciB0aGlzIFwiICsgY3RydHlwZSArIFwiJ3MgcHVibGljYXRpb25zIGJ5IHllYXJcIik7XG5cblxuXHQkKCBkb2N1bWVudCApLm9uKCBcInllYXJDaGFuZ2VcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGN1cnJZZWFyID0gY2l0YXRpb25WaXMuZWdvR3JhcGhWaXMuY3VyclllYXI7XG5cdFx0Zm9yICh2YXIgaT0wOyBpPGNpdGF0aW9uVmlzLmxpbmVDaGFydHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNpdGF0aW9uVmlzLmxpbmVDaGFydHNbaV0ubW92ZVllYXJJbmRpY2F0b3IoY3VyclllYXIpO1xuXHRcdH1cblx0fSk7XG5cblx0Ly8gSGFjayB0byBsYWJlbCB0aGUgcHVibGljYXRpb25zIGxpbmUgY2hhcnQuIFRPRE86IEZpeCB0aGlzIGxhdGVyXG5cdC8vIHZhciBwdWJzID0gZDMuc2VsZWN0KGNpdGF0aW9uVmlzLnB1YmxpY2F0aW9uc0xpbmVDaGFydC5jaGFydERpdlswXVswXSk7XG5cdHZhciBwdWJzID0gZDMuc2VsZWN0KGNpdGF0aW9uVmlzLmxpbmVDaGFydHNbMF0uY2hhcnREaXZbMF1bMF0pO1xuXHR2YXIgcHVic0F4aXNMYWJlbCA9IHB1YnMuc2VsZWN0KCcueS5heGlzJykuc2VsZWN0KCcuYXhpc0xhYmVsJyk7XG5cdHB1YnNBeGlzTGFiZWwudGV4dCgnTnVtIHB1YmxpY2F0aW9ucycpO1xuXHQvLyBIYWNrIHRvIGFsdGVyIGVpZ2VuZmFjdG9yIGxpbmUgY2hhcnQuIFRPRE86IEZpeCB0aGlzIGxhdGVyXG5cdC8vIGNpdGF0aW9uVmlzLmVpZ2VuZmFjdG9yU3VtTGluZUNoYXJ0LnlBeGlzLnRpY2tGb3JtYXQoZDMuZm9ybWF0KCdlJykpO1xuXHRjaXRhdGlvblZpcy5saW5lQ2hhcnRzWzJdLnlBeGlzLnRpY2tGb3JtYXQoZDMuZm9ybWF0KCdlJykpO1xuXHQvLyB2YXIgRUZDaGFydCA9IGQzLnNlbGVjdChjaXRhdGlvblZpcy5laWdlbmZhY3RvclN1bUxpbmVDaGFydC5jaGFydERpdlswXVswXSk7XG5cdHZhciBFRkNoYXJ0ID0gZDMuc2VsZWN0KGNpdGF0aW9uVmlzLmxpbmVDaGFydHNbMl0uY2hhcnREaXZbMF1bMF0pO1xuXHRFRkNoYXJ0LnNlbGVjdCgnLnkuYXhpcycpXG5cdFx0Ly8gLmNhbGwoY2l0YXRpb25WaXMuZWlnZW5mYWN0b3JTdW1MaW5lQ2hhcnQueUF4aXMpXG5cdFx0LmNhbGwoY2l0YXRpb25WaXMubGluZUNoYXJ0c1syXS55QXhpcylcblx0XHQuc2VsZWN0KCcuYXhpc0xhYmVsJykudGV4dCgnU3VtIG9mIEVpZ2VuZmFjdG9yJyk7XG5cblxuXHQvLyBFdmVudCBsaXN0ZW5lcnNcblx0Ly8gRXZlbnQgbGlzdGVuZXJzIHRoYXQgYWN0IGFjcm9zcyBkaWZmZXJlbnQgdmlzdWFsaXphdGlvbiBvYmplY3RzIGdvIGhlcmVcblx0Y2l0YXRpb25WaXMueWVhclRpY2tDbGlja0V2ZW50TGlzdGVuZXIoKTtcblx0XG5cdGQzLnNlbGVjdChcIi5sb2FkaW5nVGV4dFwiKS5yZW1vdmUoKTtcbi8vIH0pKGNpdGF0aW9udmlzX2RhdGEpO1xufVxuXG4vLyBtYWluKCk7XG4vL1xuZXhwb3J0IHsgY2l0YXRpb25WaXMsIGVnb0dyYXBoVmlzLCBsaW5lQ2hhcnRCeVllYXIgfTtcbiIsImltcG9ydCB7IGNpdGF0aW9uVmlzLCBlZ29HcmFwaFZpcywgbGluZUNoYXJ0QnlZZWFyIH0gZnJvbSAnLi9jb25jYXQuanMnO1xuZXhwb3J0IHsgY2l0YXRpb25WaXMsIGVnb0dyYXBoVmlzLCBsaW5lQ2hhcnRCeVllYXIgfTtcblxuIl0sInNvdXJjZVJvb3QiOiIifQ==