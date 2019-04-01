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
var citationVis = citationVis || {};
$(document).on("initComplete", {
  focus_id: focus_id
}, function (event) {
  // pass focus_id through the event data
  var focus_id = event.data.focus_id;
  focus_id = parseInt(focus_id); // http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript

  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  } // if (getParameterByName('rcvmsg') === null) return; // add "rcvmsg=1" to the URL query parameters to enable this, otherwise do nothing


  var egoGraphVis = citationVis.egoGraphVis; // open the timelineVis when center node is clicked

  if (typeof focus_id == 'undefined' || !focus_id) {
    var focus_id = getParameterByName('focusid');
  }

  if (focus_id) {
    $('.centerNode').click(function () {
      var url = Flask.url_for('generate_colldata_from_collection', {
        'focus_id': focus_id
      });
      window.open(url, '_blank', 'location=0');
    });
  }

  $(window).on('storage', message_receive); // https://stackoverflow.com/questions/28230845/communication-between-tabs-or-windows
  // receive message
  //

  function message_receive(ev) {
    if (ev.originalEvent.key != 'message') return; // ignore other keys

    var message = JSON.parse(ev.originalEvent.newValue);
    if (!message) return; // ignore empty message or message reset
    // act on the message

    if (message.command == 'timelineVis:paperItem:mouseover') highlightLinkedPapers(message.data.pid);
    if (message.command == 'timelineVis:paperItem:mouseout') linkedPapersMouseout(message.data.pid);
  }

  function highlightLinkedPapers(paper_id) {
    var highlightedNodes = [];
    d3.selectAll(".node").filter(function (d) {
      // return d.targetPaperIDs && d.targetPaperIDs.indexOf(paper_id) != -1;
      if (d.targetPaperIDs && d.targetPaperIDs.indexOf(paper_id) != -1) {
        highlightedNodes.push(d);
        return true;
      }
    }).classed("linkedToTimeline", true); // d3.selectAll(".link.toEgo").filter(function(d) {

    d3.selectAll(".link").filter(function (d) {
      return highlightedNodes.indexOf(d.source) != -1;
    }).classed("linkedToTimeline", true);
  }

  function linkedPapersMouseout(paper_id) {
    // d3.selectAll(".node").filter(function(d) {
    // 	return d.targetPaperIDs && d.targetPaperIDs.indexOf(paper_id) != -1;
    // })
    // .classed("linkedToTimeline", false);
    d3.selectAll(".linkedToTimeline").classed("linkedToTimeline", false);
  }
});
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
    }); // // cutoff at 2015
    // maxYear = Math.min(maxYear, 2015);
    // cut off at 2017

    maxYear = Math.min(maxYear, 2017);
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
}();

var citationVis = citationVis || {}; // $( document ).on( "initComplete", function() {
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
} // http://codereview.stackexchange.com/questions/77614/capitalize-the-first-character-of-all-words-even-when-following-a


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
  // continuous color scheme based on jensen-shannon divergence

  var viridis = ["#440154", "#440256", "#450457", "#450559", "#46075a", "#46085c", "#460a5d", "#460b5e", "#470d60", "#470e61", "#471063", "#471164", "#471365", "#481467", "#481668", "#481769", "#48186a", "#481a6c", "#481b6d", "#481c6e", "#481d6f", "#481f70", "#482071", "#482173", "#482374", "#482475", "#482576", "#482677", "#482878", "#482979", "#472a7a", "#472c7a", "#472d7b", "#472e7c", "#472f7d", "#46307e", "#46327e", "#46337f", "#463480", "#453581", "#453781", "#453882", "#443983", "#443a83", "#443b84", "#433d84", "#433e85", "#423f85", "#424086", "#424186", "#414287", "#414487", "#404588", "#404688", "#3f4788", "#3f4889", "#3e4989", "#3e4a89", "#3e4c8a", "#3d4d8a", "#3d4e8a", "#3c4f8a", "#3c508b", "#3b518b", "#3b528b", "#3a538b", "#3a548c", "#39558c", "#39568c", "#38588c", "#38598c", "#375a8c", "#375b8d", "#365c8d", "#365d8d", "#355e8d", "#355f8d", "#34608d", "#34618d", "#33628d", "#33638d", "#32648e", "#32658e", "#31668e", "#31678e", "#31688e", "#30698e", "#306a8e", "#2f6b8e", "#2f6c8e", "#2e6d8e", "#2e6e8e", "#2e6f8e", "#2d708e", "#2d718e", "#2c718e", "#2c728e", "#2c738e", "#2b748e", "#2b758e", "#2a768e", "#2a778e", "#2a788e", "#29798e", "#297a8e", "#297b8e", "#287c8e", "#287d8e", "#277e8e", "#277f8e", "#27808e", "#26818e", "#26828e", "#26828e", "#25838e", "#25848e", "#25858e", "#24868e", "#24878e", "#23888e", "#23898e", "#238a8d", "#228b8d", "#228c8d", "#228d8d", "#218e8d", "#218f8d", "#21908d", "#21918c", "#20928c", "#20928c", "#20938c", "#1f948c", "#1f958b", "#1f968b", "#1f978b", "#1f988b", "#1f998a", "#1f9a8a", "#1e9b8a", "#1e9c89", "#1e9d89", "#1f9e89", "#1f9f88", "#1fa088", "#1fa188", "#1fa187", "#1fa287", "#20a386", "#20a486", "#21a585", "#21a685", "#22a785", "#22a884", "#23a983", "#24aa83", "#25ab82", "#25ac82", "#26ad81", "#27ad81", "#28ae80", "#29af7f", "#2ab07f", "#2cb17e", "#2db27d", "#2eb37c", "#2fb47c", "#31b57b", "#32b67a", "#34b679", "#35b779", "#37b878", "#38b977", "#3aba76", "#3bbb75", "#3dbc74", "#3fbc73", "#40bd72", "#42be71", "#44bf70", "#46c06f", "#48c16e", "#4ac16d", "#4cc26c", "#4ec36b", "#50c46a", "#52c569", "#54c568", "#56c667", "#58c765", "#5ac864", "#5cc863", "#5ec962", "#60ca60", "#63cb5f", "#65cb5e", "#67cc5c", "#69cd5b", "#6ccd5a", "#6ece58", "#70cf57", "#73d056", "#75d054", "#77d153", "#7ad151", "#7cd250", "#7fd34e", "#81d34d", "#84d44b", "#86d549", "#89d548", "#8bd646", "#8ed645", "#90d743", "#93d741", "#95d840", "#98d83e", "#9bd93c", "#9dd93b", "#a0da39", "#a2da37", "#a5db36", "#a8db34", "#aadc32", "#addc30", "#b0dd2f", "#b2dd2d", "#b5de2b", "#b8de29", "#bade28", "#bddf26", "#c0df25", "#c2df23", "#c5e021", "#c8e020", "#cae11f", "#cde11d", "#d0e11c", "#d2e21b", "#d5e21a", "#d8e219", "#dae319", "#dde318", "#dfe318", "#e2e418", "#e5e419", "#e7e419", "#eae51a", "#ece51b", "#efe51c", "#f1e51d", "#f4e61e", "#f6e620", "#f8e621", "#fbe723", "#fde725"];
  var spectral8 = ['#d53e4f', '#f46d43', '#fdae61', '#fee08b', '#e6f598', '#abdda4', '#66c2a5', '#3288bd'];
  var rainbow = ["#2c7bb6", "#00a6ca", "#00ccbc", "#90eb9d", "#ffff8c", "#f9d057", "#f29e2e", "#e76818", "#d7191c"];
  self.JSDColorScale = d3.scale.linear().domain(d3.extent(self.notEgoNodes, function (d) {
    return d.js_div;
  })).range(["red", "blue"]);
  self.ClusterDistanceColorScale = d3.scale.linear().domain(d3.extent(self.notEgoNodes, function (d) {
    return d.average_cluster_distance_to_center;
  })).range(spectral8); // Opacity values

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
  self.svg = d3.select('#graphDiv').append('svg').attr('id', 'graphSvg').attr('width', self.graphDimensions.width).attr('height', self.graphDimensions.height);
  self.tip = d3.tip().attr('class', 'd3-tip').style('cursor', 'default').style('border-style', 'solid') // .style('border-color', function(d) { return d.color; })
  .style('pointer-events', 'none'); // self.svg.call(self.tip);

  self.group = self.svg.append('g').attr('class', 'graphContainer');
  self.link = self.group.append('svg:g').attr('class', 'links').selectAll('.link');
  self.node = self.group.append('svg:g').attr('class', 'nodes').selectAll('.node'); // Initialize tooltip for nodes (which will be visible on mouseover of nodes)

  self.tooltip = d3.select('body').append('div').attr('class', 'nodeTooltip').style('position', 'absolute').style('width', self.graphDimensions.width / 4 + 'px').style('z-index', '10').style('visibility', 'hidden'); // Add special properties to the ego node:

  self.data.nodes[0].fixed = true; // position in center

  self.data.nodes[0].x = self.graphDimensions.width / 2;
  self.data.nodes[0].y = self.graphDimensions.height / 2; // self.data.nodes[0].color = self.colorScheme[0];

  self.data.nodes[0].color = self.JSDColorScale(0);
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
    d.DomainName = self.data.graph.Domains[d.DomainID]; // for (var i=0; i<self.domainsThisGraph.length; i++) {
    // 	var thisDomain = self.domainsThisGraph[i].key
    // 	if (thisDomain==d.DomainID) {
    // 		// var thisColor = self.colorScheme[i];
    // 		var thisColor = self.domainsThisGraph[i].color;
    // 		d.color = thisColor;
    // 	}
    // }
    // d.color = self.JSDColorScale(d.js_div);
    // d.color = self.ClusterDistanceColorScale(d.average_cluster_distance_to_center);
    // d.color = self.colorScheme[d.fos_kmeans_category];

    d.color = self.colorScheme[d.tfidf_kmeans_category];
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
  self.yearTextDisplay = self.svg.append('svg:text').attr('x', self.graphDimensions.width * 8 / 9).attr('y', self.graphDimensions.height * 12 / 13).attr('dy', '-.3em').attr('font-size', '10em').attr('text-anchor', 'end').style('pointer-events', 'none').style('opacity', 1e-9).attr('id', 'egoGraphVis_yearIndicator').text(self.data.graph.yearRange[0]);
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
}; // This version of getDomainsThisGraph counts up the occurrences of the domains
// to allow for an "other" category.
// If we're using predetermined k-means-based categories, we don't need this.
// So use the below version of getDomainsThisGraph instead.
//
// egoGraphVis.prototype.getDomainsThisGraph = function() {
// 	var self = this;
//
// 	// var domains = self.data.graph.Domains;
// 	// var domains = self.data.graph.fos_kmeans_categories;
// 	var domains = self.data.graph.titles_kmeans_categories;
// 	console.log(domains);
//
// 	var maxDomains = self.colorScheme.length;
// 	
// 	// self.domainsThisGraph will be an array of {key: "DomainID", values: count}
// 	self.domainsThisGraph = d3.nest()
// 		// .key(function(d) { return d.DomainID; })
// 		// .key(function(d) { return d.fos_kmeans_category; })
// 		.key(function(d) { return d.title_kmeans_category; })
// 		.rollup(function(leaves) { return leaves.length; })
// 		.entries(self.notEgoNodes);
// 	// self.domainsThisGraph.sort(function(a,b) { return d3.descending(a.values, b.values); });
// 	// Add a few more variables to the domainsThisGraph data:
// 	for (var i=0; i<self.domainsThisGraph.length; i++) {
// 		// var key = +self.domainsThisGraph[i].key;
// 		var key = self.domainsThisGraph[i].key;
// 		self.domainsThisGraph[i].DomainID = key;
// 		// if (i<maxDomains-1) {
// 		// 	self.domainsThisGraph[i].DomainName = domains[key];
// 		// 	self.domainsThisGraph[i].color = self.colorScheme[i];
// 		// } else {
// 		// 	self.domainsThisGraph[i].DomainName = "Other";
// 		// 	self.domainsThisGraph[i].color = self.colorScheme[maxDomains-1];
// 		// }
// 		self.domainsThisGraph[i].DomainName = domains[key];
// 		self.domainsThisGraph[i].color = self.colorScheme[i];
// 	}
// 	console.log(self.domainsThisGraph);
// };


egoGraphVis.prototype.getDomainsThisGraph = function () {
  // Use this version of getDomainsThisGraph if the categories are predetermined and don't need to be counted.
  // (We don't need an "other" (miscellaneous) category
  var self = this;
  var maxDomains = self.colorScheme.length;
  var domains = self.data.graph.tfidf_kmeans_categories;
  self.domainsThisGraph = []; // Add a few more variables to the domainsThisGraph data:

  for (var i = 0; i < maxDomains; i++) {
    self.domainsThisGraph.push({});
    self.domainsThisGraph[i].DomainID = i;
    self.domainsThisGraph[i].DomainName = domains[i];
    self.domainsThisGraph[i].color = self.colorScheme[i];
  }

  console.log(self.domainsThisGraph);
};

egoGraphVis.prototype.legendInit = function () {
  var self = this;
  var misinfoLegendItemsText = ['computer science, data mining, ...', 'sociology, social science, ...', 'medicine, health, ...', 'economics, business, ...', 'psychology, cognition, ...', 'political science, ...', 'biology, ecology, ...', 'climate change, ...'];
  var squareSize = self.graphDimensions.width / 70;
  var padding = squareSize / 3;
  var sqrPlusPadding = squareSize + padding;
  self.legend = self.svg.append('g').attr('class', 'legend').attr('transform', 'translate(' + padding + ',' + padding + ')'); // .style('opacity', 1e-9);

  var legendHeaderSize = squareSize;
  self.legend.append('svg:text').attr('transform', 'translate(0, ' + legendHeaderSize + ')').attr('class', 'egoGraphVisLegendHeader').text('Categories ⓘ');
  var legendItem = self.legend.selectAll('g').data(self.domainsThisGraph).enter().append('g').attr('class', 'legendItem') // // add "other" class to last legend item
  // .classed('other', function(d) { 
  // 	return (d.DomainID != 0 && d.DomainName.toLowerCase()=="other") ? true : false;
  // })
  .attr('id', function (d) {
    // return 'legendCluster' + d.cluster; })
    // Use Domain instead of cluster
    // return 'legendDomain' + d.DomainID.replace(" ", ""); })
    return 'legendDomain' + d.DomainID;
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
    // return 'translate(0,' + (sqrPlusPadding * i) + ')';
    return 'translate(0,' + (legendHeaderSize + padding + sqrPlusPadding * i) + ')';
  }).attr('fill', function (d) {
    return d.color;
  });
  self.legendText = legendItem.append('svg:text').attr('transform', function (d, i) {
    return 'translate(' + sqrPlusPadding + ',' + (legendHeaderSize + padding + sqrPlusPadding * i) + ')';
  }).attr('dy', '1em').text(function (d, i) {
    // return 'Papers in category "' + d.DomainName + '" (domain ' + d.DomainID + ')';
    //
    // if (d.DomainID != 0 && d.DomainName.toLowerCase()=="other") {
    // 	return "Papers in other categories";
    // } else {
    // 	return 'Papers in category "' + d.DomainName + '"';
    // }
    //
    // return d.DomainName;
    //
    // return "Category " + d.DomainID;
    return 'C' + i + ' (' + misinfoLegendItemsText[i] + ')';
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
    var hoveredItem = d3.select(this); // $("#devoutput").html("<h3>" + d.js_div + "</h3>").css("color", d.color);
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
        var url = 'https://preview.academic.microsoft.com/paper/' + d.id;
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
    self.currYear = self.data.graph.yearRange[1]; // // cutoff at 2015
    // self.currYear = Math.min(self.currYear, 2015);

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
    drawLinks(d);
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
      if (graph.nodes[i].Year > 0 && graph.nodes[i].Title != "") {
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
        // var thisSource = nodes.filter(function(d) { return d.oldIdx === links[i].source; });
        // var thisTarget = nodes.filter(function(d) { return d.oldIdx === links[i].target; });
        // now (2018) the node id (i.e., Paper_ID) is working to identify links, instead of the node index
        // maybe this is because of a new version of networkx?
        var thisSource = nodes.filter(function (d) {
          return d.id === links[i].source;
        });
        var thisTarget = nodes.filter(function (d) {
          return d.id === links[i].target;
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
});

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
  }); // // cut off at 2015
  // self.yearRange[1] = Math.min(self.yearRange[1], 2015);
  // cut off at 2017

  self.yearRange[1] = Math.min(self.yearRange[1], 2017);
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

  self.svg.append('g').attr('class', 'y axis').call(self.yAxis).append('text').attr('transform', 'rotate(-90)').attr('y', -self.lineChartDimensions.margin.left / 2 - 6).attr('x', -(self.lineChartDimensions.height + self.lineChartDimensions.margin.top + self.lineChartDimensions.margin.bottom) / 2).attr('class', 'axisLabel').text('Num citations').attr('font-size', '.5em'); // var maxX = self.x(self.yearRange[1]);
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
  // .style('stroke', 'url(#line-gradient)')
  .style('stroke', 'black').attr('d', self.line);
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

function main() {
  d3.select('#mainDiv').append('p').attr("class", "loadingText").text('Loading...');
  d3.json('nas2_mag_doi_join_network_fulldata_with_fos_names.json', function (error, graph) {
    console.log(error);

    if (error) {
      var contactEmail = 'jporteno@uw.edu';
      var errHtml = 'There was an error generating the visualization, or else data processing is still in progress. Try reloading the page later, or generating the visualization again. If the problem persists, <a href="mailto:' + contactEmail + '">contact the administrator</a>.';
      $('.loadingText').html(errHtml).css({
        'color': 'red'
      });
      throw error;
    } // Get the most common Domain IDs for the ego author's papers


    var domainsNest = d3.nest().key(function (d) {
      return d.DomainID;
    }).sortValues(d3.descending).rollup(function (leaves) {
      return leaves.length;
    }).entries(graph.nodes[0].papers);
    domainsNest.sort(function (a, b) {
      return d3.descending(a.values, b.values);
    }); // store as a node property

    graph.nodes[0].DomainCounts = domainsNest;
    console.log(graph); // d3.select('#infoDiv').append('p').text(graph.nodes[0].AuthorName);

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
    d3.select(".loadingText").remove();
  }); // })(citationvis_data);
} // main();




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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uYXV0aWx1c192aXMvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL25hdXRpbHVzX3Zpcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uYXV0aWx1c192aXMvLi9zcmMvY29uY2F0LmpzIiwid2VicGFjazovL25hdXRpbHVzX3Zpcy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJjaXRhdGlvblZpcyIsIiQiLCJkb2N1bWVudCIsIm9uIiwiZWdvR3JhcGhWaXMiLCJ6b29tYWJsZSIsInpvb20iLCJ6b29tVHJhbnNsYXRlIiwidHJhbnNsYXRlIiwiY2hlY2tab29tIiwiZCIsInpvb21UaHJlc2hvbGRNaW4iLCJjb29yZGluYXRlcyIsInpvb21UaHJlc2hvbGRNYXgiLCJncmFwaERpbWVuc2lvbnMiLCJ3aWR0aCIsImhlaWdodCIsInkiLCJjb25zb2xlIiwibG9nIiwic2NhbGUiLCJ4IiwiZ3JvdXAiLCJjYWxsIiwiZXZlbnQiLCJjZW50ZXIwIiwiY2VudGVyIiwidHJhbnNsYXRlMCIsImNvb3JkaW5hdGVzMCIsImNlbnRlcjEiLCJwb2ludCIsInRyYW5zaXRpb24iLCJkdXJhdGlvbiIsInRlc3RyZWNvcmQiLCJ0IiwiZm9jdXNfaWQiLCJkYXRhIiwicGFyc2VJbnQiLCJnZXRQYXJhbWV0ZXJCeU5hbWUiLCJuYW1lIiwidXJsIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwicmVwbGFjZSIsInJlZ2V4IiwiUmVnRXhwIiwicmVzdWx0cyIsImV4ZWMiLCJkZWNvZGVVUklDb21wb25lbnQiLCJjbGljayIsIkZsYXNrIiwidXJsX2ZvciIsIm9wZW4iLCJtZXNzYWdlX3JlY2VpdmUiLCJldiIsIm9yaWdpbmFsRXZlbnQiLCJrZXkiLCJtZXNzYWdlIiwiSlNPTiIsInBhcnNlIiwibmV3VmFsdWUiLCJjb21tYW5kIiwiaGlnaGxpZ2h0TGlua2VkUGFwZXJzIiwicGlkIiwibGlua2VkUGFwZXJzTW91c2VvdXQiLCJwYXBlcl9pZCIsImhpZ2hsaWdodGVkTm9kZXMiLCJkMyIsInNlbGVjdEFsbCIsImZpbHRlciIsInRhcmdldFBhcGVySURzIiwiaW5kZXhPZiIsInB1c2giLCJjbGFzc2VkIiwic291cmNlIiwiZGVmYXVsdF9vcHRpb25zIiwiZGltZW5zaW9ucyIsImxpbmVDaGFydCIsIm1hcmdpbiIsInRvcCIsInJpZ2h0IiwiYm90dG9tIiwibGVmdCIsImNvbG9yU2NoZW1lIiwic3BsaWNlIiwiREVGQVVMVF9PUFRJT05TIiwiZGVmYXVsdHMiLCJsaW5lQ2hhcnREYXRhIiwiZ2V0UGV3Q2xhc3NZZWFyIiwiZ3JhcGgiLCJlZ29Ob2RlIiwibm9kZXMiLCJwZXdfQ2xhc3MiLCJnZXRGdW5kaW5nIiwiZnVuZGluZyIsImNsZWFuTGlua3MiLCJsaW5rcyIsImNsZWFuZWRMaW5rcyIsImZvckVhY2giLCJsaW5rVG9FZ28iLCJzb3VyY2VZZWFyIiwidGFyZ2V0WWVhciIsImdldFllYXJSYW5nZSIsIm1pblllYXIiLCJtaW4iLCJ0b2RheVllYXIiLCJEYXRlIiwiZ2V0RnVsbFllYXIiLCJtYXhZZWFyIiwibWF4IiwiTWF0aCIsImdldEVtcHR5Q291bnREYXRhIiwieWVhclJhbmdlIiwiZW1wdHlDb3VudERhdGEiLCJpIiwieWVhciIsImNvdW50IiwicHJlcGFyZURhdGFfYWxsQ2l0YXRpb25zIiwidmFsdWVzIiwidGhpc1NvdXJjZVllYXIiLCJkYXRhVGhpc1llYXIiLCJkZCIsInByZXBhcmVEYXRhX2Vnb0F1dGhvclB1YmxpY2F0aW9ucyIsImVnb1BhcGVycyIsInBhcGVycyIsIlllYXIiLCJwcmVwYXJlRGF0YV9hdXRob3JFaWdlbmZhY3RvclN1bSIsIkVGIiwiU3RyaW5nIiwicHJvdG90eXBlIiwiY2FwaXRhbGl6ZSIsInRvTG93ZXJDYXNlIiwibSIsInRvVXBwZXJDYXNlIiwibWFrZUh0bWwiLCJudW1EaXNwbGF5IiwiY2FsbGJhY2siLCJoYXNPd25Qcm9wZXJ0eSIsInRvb2x0aXBIdG1sIiwibnVtUGFwZXJzQWRkZWQiLCJsZW4iLCJsZW5ndGgiLCJwYXBlciIsInRvb2x0aXAiLCJodG1sIiwicGlkcyIsIlBhcGVySUQiLCJhamF4IiwiZGF0YVR5cGUiLCIkU0NSSVBUX1JPT1QiLCJwYXBlcmlkIiwic3RyaW5naWZ5Iiwic3VjY2VzcyIsInJlc3VsdCIsImRiX3BhcGVycyIsIndpbmRvd1dpZHRoIiwibm9kZVRvb2x0aXBzIiwibGVnZW5kVG9vbHRpcHMiLCJjc3MiLCJ0b29sdGlwc3RlciIsInRoZW1lIiwibWF4V2lkdGgiLCJhbmltYXRpb24iLCJhbmltYXRpb25kdXJhdGlvbiIsImRlbGF5IiwidXBkYXRlQW5pbWF0aW9uIiwiY29udGVudCIsImNvbnRlbnRBc0hUTUwiLCJmdW5jdGlvbkluaXQiLCJmdW5jdGlvbkJlZm9yZSIsImluc3RhbmNlIiwiaGVscGVyIiwiJG9yaWdpbiIsIm9yaWdpbiIsInRoaXNZZWFyUGFwZXJzIiwic29ydCIsImEiLCJiIiwiZGVzY2VuZGluZyIsImFkZENsYXNzIiwiYWpheFBhcGVySW5mbyIsIm5vZGUiLCJzZWxlY3QiLCJlYWNoIiwibm9kZVR5cGUiLCJ1cGRhdGVkUHJvcHMiLCJjaXRhdGlvbiIsImJ5cGFzc0FqYXgiLCJpZCIsIlRpdGxlIiwiZG9pIiwiYXV0aG9yX3N0ciIsInZlbnVlIiwibWFrZU5vZGVUb29sdGlwSHRtbCIsImlkeCIsIm51bWJlck9mUHVicyIsInNwYW4iLCJhcHBlbmQiLCJ0ZXh0IiwiRmllbGRfb2Zfc3R1ZHlfbmFtZXMiLCJvdGhlckh0bWwiLCJoZWFkZXJIdG1sIiwibGVnZW5kSXRlbSIsIkRvbWFpbklEIiwiRG9tYWluTmFtZSIsInNlbGYiLCJub3RFZ29Ob2RlcyIsInNsaWNlIiwibm9kZVBsYWNlbWVudE9wdGlvbnMiLCJub2RlUGxhY2VtZW50Iiwic3ZnIiwibGluayIsImVpZ2VuRmFjdG9yU2NhbGUiLCJkb21haW5zVGhpc0dyYXBoIiwibGVnZW5kIiwieWVhclRleHREaXNwbGF5IiwiYXV0aG9ySW1hZ2VEaXYiLCJ0aXAiLCJ0aWNrIiwiZm9yY2UiLCJ2aXJpZGlzIiwic3BlY3RyYWw4IiwicmFpbmJvdyIsIkpTRENvbG9yU2NhbGUiLCJsaW5lYXIiLCJkb21haW4iLCJleHRlbnQiLCJqc19kaXYiLCJyYW5nZSIsIkNsdXN0ZXJEaXN0YW5jZUNvbG9yU2NhbGUiLCJhdmVyYWdlX2NsdXN0ZXJfZGlzdGFuY2VfdG9fY2VudGVyIiwib3BhY2l0eVZhbHMiLCJub2RlUHJldlllYXIiLCJsaW5rTm90VG9FZ28iLCJsaW5rUHJldlllYXIiLCJkb0Fubm90YXRpb25zIiwiYW5pbWF0aW9uU3RhdGUiLCJ0cmFuc2l0aW9uVGltZVBlclllYXIiLCJ0cmFuc2l0aW9uVGltZVBlck5vZGUiLCJsaW5rQXBwZWFyRHVyYXRpb24iLCJjdXJyTm9kZUluZGV4IiwiZGVzdGluYXRpb25Ob2RlSW5kZXgiLCJkZXN0aW5hdGlvblllYXIiLCJjdXJyWWVhciIsImMiLCJ0dCIsImluaXQiLCJtYWtlVGljayIsIm1ha2VGb3JjZSIsIm1ha2Vab29tIiwiZ2V0RG9tYWluc1RoaXNHcmFwaCIsImF0dHIiLCJzdHlsZSIsImZpeGVkIiwiY29sb3IiLCJlaWdlbkZhY3Rvck1heCIsInJhZGl1cyIsIm5ld05vZGUiLCJlbnRlciIsIkRvbWFpbnMiLCJ0ZmlkZl9rbWVhbnNfY2F0ZWdvcnkiLCJkcmFnIiwibmV3TGluayIsInRhcmdldCIsIm9wVmFscyIsInBsYWNlTm9kZXMiLCJzdGFydCIsInN0b3AiLCJjeCIsImN5IiwiaW5pdGlhbFJhZCIsIm51bU5vZGVzIiwidGhpc1JhZCIsInBvdyIsInRoaXNTcGFjaW5nIiwiUEkiLCJjb3MiLCJzaW4iLCJjb21wdXRlQW5nbGUiLCJhbHBoYSIsImFyY0xlbmd0aCIsImVwc2lsb24iLCJhbmdsZVJhZCIsImNvbXB1dGVBcmNMZW5ndGgiLCJhYnMiLCJkYSIsInNxcnQiLCJ1IiwidiIsImNvbXB1dGVQb2ludCIsImRpc3RhbmNlIiwiZ2V0QW5nbGVzIiwicG9pbnRBcmNEaXN0YW5jZSIsInRvdGFsQXJjTGVuZ3RoIiwicHJldmlvdXNBbmdsZVJhZCIsImFuZ2xlcyIsInBvd1NjYWxlIiwiZXhwb25lbnQiLCJuZXdpIiwidGhpc1BvcyIsImxlZ2VuZEluaXQiLCJhZGRBdXRob3JJbWFnZSIsImFkZEV2ZW50TGlzdGVuZXJzIiwicmV2ZWFsRWdvTm9kZSIsImJlaGF2aW9yIiwic2NhbGVFeHRlbnQiLCJ4MSIsInkxIiwieDIiLCJ5MiIsInRyYW5zZm9ybSIsImxheW91dCIsInNpemUiLCJsaW5rRGlzdGFuY2UiLCJpbXBvcnREZWZhdWx0T3B0aW9ucyIsIm9wdGlvbnMiLCJtYXhEb21haW5zIiwiZG9tYWlucyIsInRmaWRmX2ttZWFuc19jYXRlZ29yaWVzIiwibWlzaW5mb0xlZ2VuZEl0ZW1zVGV4dCIsInNxdWFyZVNpemUiLCJwYWRkaW5nIiwic3FyUGx1c1BhZGRpbmciLCJsZWdlbmRIZWFkZXJTaXplIiwibGVnZW5kVGV4dCIsIkF1dGhvck5hbWUiLCJhdXRob3JJbWFnZUNvbnRhaW5lciIsImF1dGhvck9yZyIsIm9yZ2FuaXphdGlvbiIsInRzdiIsImVycm9yIiwib3JnX2RhdGEiLCJwc3R5bGUiLCJuYW1lRnJvbVRTViIsIm9yZ0xpbmsiLCJvcmdJbWdVcmwiLCJhdXRob3JJbWFnZSIsImFkZEltYWdlIiwiYXV0aG9ySW1hZ2VTcmMiLCJBdXRob3JJbWdVcmwiLCJJbWdVUkwiLCJwZXdpZF9zdHIiLCJQZXdTY2hvbGFySUQiLCJ0b1N0cmluZyIsInN1YnN0ciIsImZuYW1lX3Jvb3QiLCJwb3NzaWJsZUV4dGVuc2lvbnMiLCJ0cnlJbWFnZUZpbGVuYW1lcyIsIml0ZXIiLCJhdXRob3JJbWFnZUZpbGVuYW1lIiwiZ2V0IiwiZG9uZSIsImZhaWwiLCJwZXdDbGFzcyIsImhvdmVyZWQiLCJob3ZlcmVkSXRlbSIsImdldERPSSIsIm5vZGVPYmoiLCJ0aGlzTm9kZSIsImdldENpdGF0aW9uIiwibWFrZVRvb2x0aXAiLCJnZXRBdXRob3JMaXN0IiwiYXV0aG9ycyIsImF1dGhvckxpc3QiLCJ0aGlzQXV0aG9yU3RyTGlzdCIsInNwbGl0IiwibWFwIiwidGhpc0F1dGhvciIsImpvaW4iLCJnZXRUaXRsZSIsImF1dGhvclN0ckxpc3QiLCJ0aXRsZSIsImF1dGhvcmlkcyIsIkF1dGhvcklETGlzdCIsInRyaWdnZXIiLCJ0eXBlIiwiYW5pbWF0ZVRvRGVzdGluYXRpb25Ob2RlIiwiZmluaXNoQW5pbWF0aW9uIiwiY2hlY2tZZWFyIiwiY29udGludWUiLCJjYWxjdWxhdGVUcmFuc2l0aW9uVGltZSIsImRyYXdOb2RlIiwicmVtb3ZlTm9kZSIsImN1cnJOb2RlIiwib2xkWWVhciIsIm5ld1llYXIiLCJiZWdpbk5ld1llYXIiLCJub2Rlc1RoaXNZZWFyIiwic2V0VGltZW91dCIsImRyYXdMaW5rcyIsImxpbmtzVGhpc05vZGVJc1NvdXJjZSIsImwiLCJpblRyYW5zaXRpb24iLCJlYXNlIiwiaW5kZXgiLCJjdXJyTGlua3MiLCJyZXRyYWN0RHVyYXRpb24iLCJuZXdEZXN0aW5hdGlvbk5vZGUiLCJnZXREZXN0aW5hdGlvbk5vZGUiLCJnZXROb2Rlc1RoaXNZZWFyIiwibGFzdE5vZGVUaGlzWWVhciIsInJld2luZFNlYXJjaCIsImNvdW50VGhpc1llYXIiLCJub2RlQ291bnRzUGVyWWVhciIsInJldmVhbEZpbmFsU3RhdGUiLCJlZ29HcmFwaERhdGEiLCJtYXhOb2RlcyIsInByZXBhcmVfZWdvR3JhcGhEYXRhIiwib2xkSWR4IiwibmV3R3JhcGgiLCJwcm9wc1RvQ29weSIsInByb3AiLCJzaHVmZmxlIiwiRG9tYWluSURUb0Zyb250IiwiYXJyIiwiaGFzRG9tYWluSUQiLCJub0RvbWFpbklEIiwibmV3QXJyIiwiY29uY2F0IiwiYXNjZW5kaW5nIiwicmVjYWxjdWxhdGVMaW5rcyIsIm5ld0xpbmtzIiwidGhpc1NvdXJjZSIsInRoaXNUYXJnZXQiLCJnZXROb2RlQ291bnRzUGVyWWVhciIsInllYXJzTmVzdCIsIm5lc3QiLCJzb3J0S2V5cyIsInJvbGx1cCIsImxlYXZlcyIsImV2ZW50TGlzdGVuZXJzIiwiZG9tYWluc011bHQiLCJEb21haW5zTXVsdCIsIiRkb21haW5Ecm9wZG93biIsImRvbWFpbl9zZWxlY3QiLCJwcmVwZW5kIiwiayIsInN3aXRjaERvbWFpbiIsInZhbCIsImRvbWFpblR5cGUiLCJkdXIiLCJEb21haW5NdWx0IiwicmVtb3ZlIiwidGhpc0RvbWFpbiIsInRoaXNDb2xvciIsImxpbmVDaGFydEJ5WWVhciIsImhyYV9mdW5kaW5nIiwibGluZUNoYXJ0RGltZW5zaW9ucyIsImNoYXJ0RGl2Iiwic3ZnRGVmcyIsImNsaXBQYXRoIiwiY3VyclllYXJJbmRpY2F0b3IiLCJ5ZWFyQXJlYSIsInllYXJBcmVhT3BhY2l0eSIsInhBeGlzIiwieUF4aXMiLCJsaW5lIiwiYXJlYSIsImNoYXJ0TGluZSIsImNoYXJ0QXJlYSIsImxpbmVhckdyYWRpZW50IiwiZnVuZGluZ1RpbWUiLCJkdXJhdGlvbl9pbl95ZWFycyIsInN0YXJ0X2RhdGUiLCJheGlzIiwib3JpZW50IiwidGlja0Zvcm1hdCIsImZvcm1hdCIsInRpY2tzIiwidGlja1NpemUiLCJ5MCIsInllYXJMYWJlbHMiLCJ5ZWFyTGFiZWwiLCJiYm94IiwicGFyZW50Tm9kZSIsImdldEJCb3giLCJkYXR1bSIsIm1ha2VGdW5kaW5nTGluZXMiLCJtYWtlQ29sb3JHcmFkaWVudCIsImZ1bmRpbmdZZWFyIiwibWF4WCIsIm9mZnNldCIsInJnYiIsImRhcmtlciIsImNoYW5nZUFuaW1hdGlvblN0YXRlIiwiYWR2YW5jZUxpbmUiLCJ0aW1lRWxhcHNlZCIsImNvcnJlY3RZZWFyIiwibW92ZVllYXJJbmRpY2F0b3IiLCJoaWdobGlnaHRDdXJyWWVhclRpY2siLCJhZGRUaXRsZSIsInN1bW1hcnlTdGF0aXN0aWNzIiwiYWRkU3VtbWFyeVN0YXRpc3RpY3MiLCJnZXRDaXRhdGlvbkNvdW50c1BlclllYXIiLCJjaXRhdGlvbkNvdW50c1BlclllYXIiLCJnZXRRdWVyeVZhcmlhYmxlIiwidmFyaWFibGUiLCJxdWVyeSIsInNlYXJjaCIsInN1YnN0cmluZyIsInZhcnMiLCJwYWlyIiwiZ2V0VHJhbnNpdGlvblRpbWVQZXJZZWFyIiwibG9uZ2VzdFllYXJUcmFuc2l0aW9uVGltZSIsImVtcHR5WWVhclRyYW5zaXRpb25UaW1lIiwidGhyZXNob2xkU2NhbGUiLCJ0aHJlc2hvbGQiLCJ5ZWFyVGlja0NsaWNrRXZlbnRMaXN0ZW5lciIsImdldEF0dHJpYnV0ZSIsIm1haW4iLCJqc29uIiwiY29udGFjdEVtYWlsIiwiZXJySHRtbCIsImRvbWFpbnNOZXN0Iiwic29ydFZhbHVlcyIsImVudHJpZXMiLCJEb21haW5Db3VudHMiLCJncmFwaF9kYXRhIiwicHVibGljYXRpb25zX2RhdGEiLCJhbGxfY2l0YXRpb25zX2RhdGEiLCJlaWdlbmZhY3Rvcl9zdW1fZGF0YSIsImxpbmVDaGFydHMiLCJjdHJ0eXBlIiwicHVicyIsInB1YnNBeGlzTGFiZWwiLCJFRkNoYXJ0Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7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Q0FBQ21ILE1BQUgsQ0FBVXZMLFdBQVcsQ0FBQzBnQixVQUFaLENBQXVCLENBQXZCLEVBQTBCekUsUUFBMUIsQ0FBbUMsQ0FBbkMsRUFBc0MsQ0FBdEMsQ0FBVixDQUFYO0FBQ0EsUUFBSTRFLGFBQWEsR0FBR0QsSUFBSSxDQUFDclYsTUFBTCxDQUFZLFNBQVosRUFBdUJBLE1BQXZCLENBQThCLFlBQTlCLENBQXBCO0FBQ0FzVixpQkFBYSxDQUFDdFUsSUFBZCxDQUFtQixrQkFBbkIsRUFuRndGLENBb0Z4RjtBQUNBOztBQUNBdk0sZUFBVyxDQUFDMGdCLFVBQVosQ0FBdUIsQ0FBdkIsRUFBMEJsRSxLQUExQixDQUFnQ1csVUFBaEMsQ0FBMkMvWSxFQUFFLENBQUNnWixNQUFILENBQVUsR0FBVixDQUEzQyxFQXRGd0YsQ0F1RnhGOztBQUNBLFFBQUkwRCxPQUFPLEdBQUcxYyxFQUFFLENBQUNtSCxNQUFILENBQVV2TCxXQUFXLENBQUMwZ0IsVUFBWixDQUF1QixDQUF2QixFQUEwQnpFLFFBQTFCLENBQW1DLENBQW5DLEVBQXNDLENBQXRDLENBQVYsQ0FBZDtBQUNBNkUsV0FBTyxDQUFDdlYsTUFBUixDQUFlLFNBQWYsRUFDQztBQURELEtBRUVoSyxJQUZGLENBRU92QixXQUFXLENBQUMwZ0IsVUFBWixDQUF1QixDQUF2QixFQUEwQmxFLEtBRmpDLEVBR0VqUixNQUhGLENBR1MsWUFIVCxFQUd1QmdCLElBSHZCLENBRzRCLG9CQUg1QixFQXpGd0YsQ0ErRnhGO0FBQ0E7O0FBQ0F2TSxlQUFXLENBQUM0ZiwwQkFBWjtBQUVBeGIsTUFBRSxDQUFDbUgsTUFBSCxDQUFVLGNBQVYsRUFBMEJvUSxNQUExQjtBQUNBLEdBcEdELEVBUGdCLENBNEdoQjtBQUNDLEMsQ0FFRDs7Ozs7Ozs7Ozs7Ozs7O0FDbmdHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEiLCJmaWxlIjoibmF1dGlsdXNfdmlzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJuYXV0aWx1c192aXNcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wibmF1dGlsdXNfdmlzXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIm5hdXRpbHVzX3Zpc1wiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsInZhciBjaXRhdGlvblZpcyA9IGNpdGF0aW9uVmlzIHx8IHt9O1xuXG4kKCBkb2N1bWVudCApLm9uKCBcImluaXRDb21wbGV0ZVwiLCBmdW5jdGlvbigpIHtcblx0dmFyIGVnb0dyYXBoVmlzID0gY2l0YXRpb25WaXMuZWdvR3JhcGhWaXM7XG5cdGlmIChlZ29HcmFwaFZpcy56b29tYWJsZSA9PSBmYWxzZSkge1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgem9vbSA9IGVnb0dyYXBoVmlzLnpvb207XG5cdGVnb0dyYXBoVmlzLnpvb21UcmFuc2xhdGUgPSB6b29tLnRyYW5zbGF0ZSgpO1xuXG5cdGVnb0dyYXBoVmlzLmNoZWNrWm9vbSA9IGZ1bmN0aW9uKGQpIHtcblx0XHR2YXIgem9vbVRocmVzaG9sZE1pbiA9IGNvb3JkaW5hdGVzKFswLCAwXSlbMV07ICAvLyBtaW5pbXVtIHkgdmFsdWVcblx0XHR2YXIgem9vbVRocmVzaG9sZE1heCA9IGNvb3JkaW5hdGVzKFtlZ29HcmFwaFZpcy5ncmFwaERpbWVuc2lvbnMud2lkdGgsIGVnb0dyYXBoVmlzLmdyYXBoRGltZW5zaW9ucy5oZWlnaHRdKVsxXTsgIC8vIG1heGltdW0geSB2YWx1ZVxuXHRcdGlmIChkLnkgPCB6b29tVGhyZXNob2xkTWluIHx8IGQueSA+IHpvb21UaHJlc2hvbGRNYXgpIHtcblx0XHRcdGNvbnNvbGUubG9nKHpvb20udHJhbnNsYXRlKCkpO1xuXHRcdFx0Y29uc29sZS5sb2coem9vbS5zY2FsZSgpKTtcblx0XHRcdGNvbnNvbGUubG9nKGNvb3JkaW5hdGVzKFtkLngsIGQueV0pKTtcblx0Y29uc29sZS5sb2coY29vcmRpbmF0ZXMoW2Vnb0dyYXBoVmlzLmdyYXBoRGltZW5zaW9ucy53aWR0aCwgZWdvR3JhcGhWaXMuZ3JhcGhEaW1lbnNpb25zLmhlaWdodF0pKTtcblx0Y29uc29sZS5sb2coY29vcmRpbmF0ZXMoWzAsMF0pKTtcblx0XHRcdC8vIGh0dHA6Ly9ibC5vY2tzLm9yZy9tYm9zdG9jay83ZWM5NzdjOTU5MTBkZDAyNjgxMlxuXHRcdFx0ZWdvR3JhcGhWaXMuZ3JvdXAuY2FsbCh6b29tLmV2ZW50KTtcblxuXHRcdFx0Ly8gUmVjb3JkIHRoZSBjb29yZGluYXRlcyAoaW4gZGF0YSBzcGFjZSkgb2YgdGhlIGNlbnRlciAoaW4gc2NyZWVuIHNwYWNlKS5cblx0XHRcdHZhciBjZW50ZXIwID0gem9vbS5jZW50ZXIoKTtcblx0XHRcdHZhciB0cmFuc2xhdGUwID0gem9vbS50cmFuc2xhdGUoKTtcblx0XHRcdHZhciBjb29yZGluYXRlczAgPSBjb29yZGluYXRlcyhjZW50ZXIwKTtcblx0XHRcdHpvb20uc2NhbGUoem9vbS5zY2FsZSgpICogLjkpO1xuXG5cdFx0XHQvLyBUcmFuc2xhdGUgYmFjayB0byB0aGUgY2VudGVyLlxuXHRcdFx0dmFyIGNlbnRlcjEgPSBwb2ludChjb29yZGluYXRlczApO1xuXHRcdFx0em9vbS50cmFuc2xhdGUoW3RyYW5zbGF0ZTBbMF0gKyBjZW50ZXIwWzBdIC0gY2VudGVyMVswXSwgdHJhbnNsYXRlMFsxXSArIGNlbnRlcjBbMV0gLSBjZW50ZXIxWzFdXSk7XG5cblx0XHRcdGVnb0dyYXBoVmlzLmdyb3VwLnRyYW5zaXRpb24oKS5kdXJhdGlvbig1MDApLmNhbGwoem9vbS5ldmVudCk7XG5cdFx0XHQvLyBlZ29HcmFwaFZpcy5ncm91cC5jYWxsKHpvb20uZXZlbnQpO1xuXHRcdH1cblx0fTtcblxuXHRmdW5jdGlvbiBjb29yZGluYXRlcyhwb2ludCkge1xuXHRcdHZhciBzY2FsZSA9IHpvb20uc2NhbGUoKTtcblx0XHR2YXIgdHJhbnNsYXRlID0gem9vbS50cmFuc2xhdGUoKTtcblx0XHRyZXR1cm4gWyhwb2ludFswXSAtIHRyYW5zbGF0ZVswXSkgLyBzY2FsZSwgKHBvaW50WzFdIC0gdHJhbnNsYXRlWzFdKSAvIHNjYWxlXTtcblx0fVxuXG5cdGZ1bmN0aW9uIHBvaW50KGNvb3JkaW5hdGVzKSB7XG5cdFx0dmFyIHNjYWxlID0gem9vbS5zY2FsZSgpO1xuXHRcdHZhciB0cmFuc2xhdGUgPSB6b29tLnRyYW5zbGF0ZSgpO1xuXHRcdHJldHVybiBbY29vcmRpbmF0ZXNbMF0gKiBzY2FsZSArIHRyYW5zbGF0ZVswXSwgY29vcmRpbmF0ZXNbMV0gKiBzY2FsZSArIHRyYW5zbGF0ZVsxXV07XG5cdH1cblxuXHRmdW5jdGlvbiB0ZXN0cmVjb3JkKCkge1xuXHRcdHZhciB0ID0gWzMwMCwgNTAxXTtcblx0XHRjb25zb2xlLmxvZygnY29vcmRpbmF0ZXMnKTtcblx0XHRjb25zb2xlLmxvZyh0KTtcblx0XHRjb25zb2xlLmxvZyhjb29yZGluYXRlcyh0KSk7XG5cdGNvbnNvbGUubG9nKGNvb3JkaW5hdGVzKFtlZ29HcmFwaFZpcy5ncmFwaERpbWVuc2lvbnMud2lkdGgsIGVnb0dyYXBoVmlzLmdyYXBoRGltZW5zaW9ucy5oZWlnaHRdKSk7XG5cdH1cblxuXHQkKCBkb2N1bWVudCApLm9uKCBcImFuaW1hdGlvbkZpbmlzaGVkXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHRlc3RyZWNvcmQoKTtcblx0XHRjb25zb2xlLmxvZyh6b29tLnRyYW5zbGF0ZSgpKTtcblx0XHRjb25zb2xlLmxvZyh6b29tLnNjYWxlKCkpO1xuXHR9KTtcblx0dGVzdHJlY29yZCgpO1xuXHRcdFx0Ly8gLy8gUmVjb3JkIHRoZSBjb29yZGluYXRlcyAoaW4gZGF0YSBzcGFjZSkgb2YgdGhlIGNlbnRlciAoaW4gc2NyZWVuIHNwYWNlKS5cblx0XHRcdC8vIHZhciBjZW50ZXIwID0gem9vbS5jZW50ZXIoKTtcblx0XHRcdC8vIHZhciB0cmFuc2xhdGUwID0gem9vbS50cmFuc2xhdGUoKTtcblx0XHRcdC8vIHZhciBjb29yZGluYXRlczAgPSBjb29yZGluYXRlcyhjZW50ZXIwKTtcblx0XHRcdC8vIHpvb20uc2NhbGUoem9vbS5zY2FsZSgpICogLjUpO1xuICAgICAgICAgICAgLy9cblx0XHRcdC8vIC8vIFRyYW5zbGF0ZSBiYWNrIHRvIHRoZSBjZW50ZXIuXG5cdFx0XHQvLyB2YXIgY2VudGVyMSA9IHBvaW50KGNvb3JkaW5hdGVzMCk7XG5cdFx0XHQvLyB6b29tLnRyYW5zbGF0ZShbdHJhbnNsYXRlMFswXSArIGNlbnRlcjBbMF0gLSBjZW50ZXIxWzBdLCB0cmFuc2xhdGUwWzFdICsgY2VudGVyMFsxXSAtIGNlbnRlcjFbMV1dKTtcbiAgICAgICAgICAgIC8vXG5cdFx0XHQvLyAvLyBlZ29HcmFwaFZpcy5ncm91cC50cmFuc2l0aW9uKCkuZHVyYXRpb24oMjAwKS5jYWxsKHpvb20uZXZlbnQpO1xuXHRcdFx0Ly8gZWdvR3JhcGhWaXMuZ3JvdXAuY2FsbCh6b29tLmV2ZW50KTtcblx0XHRcdC8vIHRlc3RyZWNvcmQoKTtcbn0pO1xuXG52YXIgY2l0YXRpb25WaXMgPSBjaXRhdGlvblZpcyB8fCB7fTtcblxuJCggZG9jdW1lbnQgKS5vbiggXCJpbml0Q29tcGxldGVcIiwge2ZvY3VzX2lkOiBmb2N1c19pZH0sIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdC8vIHBhc3MgZm9jdXNfaWQgdGhyb3VnaCB0aGUgZXZlbnQgZGF0YVxuXHR2YXIgZm9jdXNfaWQgPSBldmVudC5kYXRhLmZvY3VzX2lkO1xuXHRmb2N1c19pZCA9IHBhcnNlSW50KGZvY3VzX2lkKVxuXHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzkwMTExNS9ob3ctY2FuLWktZ2V0LXF1ZXJ5LXN0cmluZy12YWx1ZXMtaW4tamF2YXNjcmlwdFxuXHRmdW5jdGlvbiBnZXRQYXJhbWV0ZXJCeU5hbWUobmFtZSwgdXJsKSB7XG5cdFx0aWYgKCF1cmwpIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuXHRcdG5hbWUgPSBuYW1lLnJlcGxhY2UoL1tcXFtcXF1dL2csIFwiXFxcXCQmXCIpO1xuXHRcdHZhciByZWdleCA9IG5ldyBSZWdFeHAoXCJbPyZdXCIgKyBuYW1lICsgXCIoPShbXiYjXSopfCZ8I3wkKVwiKSxcblx0XHRcdHJlc3VsdHMgPSByZWdleC5leGVjKHVybCk7XG5cdFx0aWYgKCFyZXN1bHRzKSByZXR1cm4gbnVsbDtcblx0XHRpZiAoIXJlc3VsdHNbMl0pIHJldHVybiAnJztcblx0XHRyZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHJlc3VsdHNbMl0ucmVwbGFjZSgvXFwrL2csIFwiIFwiKSk7XG5cdH1cblx0Ly8gaWYgKGdldFBhcmFtZXRlckJ5TmFtZSgncmN2bXNnJykgPT09IG51bGwpIHJldHVybjsgLy8gYWRkIFwicmN2bXNnPTFcIiB0byB0aGUgVVJMIHF1ZXJ5IHBhcmFtZXRlcnMgdG8gZW5hYmxlIHRoaXMsIG90aGVyd2lzZSBkbyBub3RoaW5nXG5cblx0dmFyIGVnb0dyYXBoVmlzID0gY2l0YXRpb25WaXMuZWdvR3JhcGhWaXM7XG5cblx0Ly8gb3BlbiB0aGUgdGltZWxpbmVWaXMgd2hlbiBjZW50ZXIgbm9kZSBpcyBjbGlja2VkXG5cdGlmICh0eXBlb2YgZm9jdXNfaWQgPT0gJ3VuZGVmaW5lZCcgfHwgIWZvY3VzX2lkKSB7XG5cdFx0dmFyIGZvY3VzX2lkID0gZ2V0UGFyYW1ldGVyQnlOYW1lKCdmb2N1c2lkJyk7XG5cdH1cblx0aWYgKGZvY3VzX2lkKSB7XG5cdFx0JCggJy5jZW50ZXJOb2RlJyApLmNsaWNrKCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciB1cmwgPSBGbGFzay51cmxfZm9yKCdnZW5lcmF0ZV9jb2xsZGF0YV9mcm9tX2NvbGxlY3Rpb24nLCB7J2ZvY3VzX2lkJzogZm9jdXNfaWR9KTtcblx0XHRcdHdpbmRvdy5vcGVuKHVybCwgJ19ibGFuaycsICdsb2NhdGlvbj0wJyk7XG5cdFx0fSk7XG5cdH1cblxuXHQkKHdpbmRvdykub24oJ3N0b3JhZ2UnLCBtZXNzYWdlX3JlY2VpdmUpO1xuXG5cdC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzI4MjMwODQ1L2NvbW11bmljYXRpb24tYmV0d2Vlbi10YWJzLW9yLXdpbmRvd3Ncblx0Ly8gcmVjZWl2ZSBtZXNzYWdlXG5cdC8vXG5cdGZ1bmN0aW9uIG1lc3NhZ2VfcmVjZWl2ZShldikgXG5cdHtcblx0XHRpZiAoZXYub3JpZ2luYWxFdmVudC5rZXkhPSdtZXNzYWdlJykgcmV0dXJuOyAvLyBpZ25vcmUgb3RoZXIga2V5c1xuXHRcdHZhciBtZXNzYWdlID0gSlNPTi5wYXJzZShldi5vcmlnaW5hbEV2ZW50Lm5ld1ZhbHVlKTtcblx0XHRpZiAoIW1lc3NhZ2UpIHJldHVybjsgLy8gaWdub3JlIGVtcHR5IG1lc3NhZ2Ugb3IgbWVzc2FnZSByZXNldFxuXG5cdFx0Ly8gYWN0IG9uIHRoZSBtZXNzYWdlXG5cdFx0aWYgKG1lc3NhZ2UuY29tbWFuZCA9PSAndGltZWxpbmVWaXM6cGFwZXJJdGVtOm1vdXNlb3ZlcicpIGhpZ2hsaWdodExpbmtlZFBhcGVycyhtZXNzYWdlLmRhdGEucGlkKTtcblx0XHRpZiAobWVzc2FnZS5jb21tYW5kID09ICd0aW1lbGluZVZpczpwYXBlckl0ZW06bW91c2VvdXQnKSBsaW5rZWRQYXBlcnNNb3VzZW91dChtZXNzYWdlLmRhdGEucGlkKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGhpZ2hsaWdodExpbmtlZFBhcGVycyhwYXBlcl9pZCkge1xuXHRcdHZhciBoaWdobGlnaHRlZE5vZGVzID0gW107XG5cblx0XHRkMy5zZWxlY3RBbGwoXCIubm9kZVwiKS5maWx0ZXIoZnVuY3Rpb24oZCkge1xuXHRcdFx0Ly8gcmV0dXJuIGQudGFyZ2V0UGFwZXJJRHMgJiYgZC50YXJnZXRQYXBlcklEcy5pbmRleE9mKHBhcGVyX2lkKSAhPSAtMTtcblx0XHRcdGlmIChkLnRhcmdldFBhcGVySURzICYmIGQudGFyZ2V0UGFwZXJJRHMuaW5kZXhPZihwYXBlcl9pZCkgIT0gLTEpIHtcblx0XHRcdFx0aGlnaGxpZ2h0ZWROb2Rlcy5wdXNoKGQpO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9KVxuXHRcdC5jbGFzc2VkKFwibGlua2VkVG9UaW1lbGluZVwiLCB0cnVlKTtcblxuXHRcdC8vIGQzLnNlbGVjdEFsbChcIi5saW5rLnRvRWdvXCIpLmZpbHRlcihmdW5jdGlvbihkKSB7XG5cdFx0ZDMuc2VsZWN0QWxsKFwiLmxpbmtcIikuZmlsdGVyKGZ1bmN0aW9uKGQpIHtcblx0XHRcdHJldHVybiBoaWdobGlnaHRlZE5vZGVzLmluZGV4T2YoZC5zb3VyY2UpICE9IC0xO1xuXHRcdH0pXG5cdFx0LmNsYXNzZWQoXCJsaW5rZWRUb1RpbWVsaW5lXCIsIHRydWUpO1xuXHR9XG5cblx0ZnVuY3Rpb24gbGlua2VkUGFwZXJzTW91c2VvdXQocGFwZXJfaWQpIHtcblx0XHQvLyBkMy5zZWxlY3RBbGwoXCIubm9kZVwiKS5maWx0ZXIoZnVuY3Rpb24oZCkge1xuXHRcdC8vIFx0cmV0dXJuIGQudGFyZ2V0UGFwZXJJRHMgJiYgZC50YXJnZXRQYXBlcklEcy5pbmRleE9mKHBhcGVyX2lkKSAhPSAtMTtcblx0XHQvLyB9KVxuXHRcdC8vIC5jbGFzc2VkKFwibGlua2VkVG9UaW1lbGluZVwiLCBmYWxzZSk7XG5cdFx0ZDMuc2VsZWN0QWxsKFwiLmxpbmtlZFRvVGltZWxpbmVcIikuY2xhc3NlZChcImxpbmtlZFRvVGltZWxpbmVcIiwgZmFsc2UpO1xuXHR9XG59KTtcblxuXG5cbnZhciBjaXRhdGlvblZpcyA9IGNpdGF0aW9uVmlzIHx8IHt9O1xuXG5jaXRhdGlvblZpcy5kZWZhdWx0X29wdGlvbnMgPSAoZnVuY3Rpb24oKSB7XG5cdC8vIERpbWVuc2lvbnMgb2YgdGhlIGxhcmdlc3QgcGFydCBvZiB0aGUgdmlzdWFsaXphdGlvbiAodGhlIGdyYXBoKVxuXHR2YXIgZGltZW5zaW9ucyA9IHtcblx0XHR3aWR0aDogOTYwLFxuXHRcdGhlaWdodDogNTAwXG5cdH07XG5cdC8vIERpbWVuc2lvbnMgb2YgdGhlIGxpbmUgY2hhcnRzOlxuXHRkaW1lbnNpb25zLmxpbmVDaGFydCA9IHtcblx0XHRtYXJnaW46IHt0b3A6IDMwLCByaWdodDogMjAsIGJvdHRvbTogMzAsIGxlZnQ6IDUwfVxuXHR9O1xuXHRkaW1lbnNpb25zLmxpbmVDaGFydC53aWR0aCA9IGRpbWVuc2lvbnMud2lkdGggKiAzLzQgLSBkaW1lbnNpb25zLmxpbmVDaGFydC5tYXJnaW4ubGVmdCAtIGRpbWVuc2lvbnMubGluZUNoYXJ0Lm1hcmdpbi5yaWdodDtcblx0ZGltZW5zaW9ucy5saW5lQ2hhcnQuaGVpZ2h0ID0gMTEwIC0gZGltZW5zaW9ucy5saW5lQ2hhcnQubWFyZ2luLnRvcCAtIGRpbWVuc2lvbnMubGluZUNoYXJ0Lm1hcmdpbi5ib3R0b207XG5cblxuXHQvLyBDb2xvcnM6XG5cdC8vIFNlZSBodHRwOi8vY29sb3JicmV3ZXIyLm9yZy8/dHlwZT1xdWFsaXRhdGl2ZSZzY2hlbWU9U2V0MSZuPThcblx0dmFyIGNvbG9yU2NoZW1lID0gWydyZ2IoMjI4LDI2LDI4KScsJ3JnYig1NSwxMjYsMTg0KScsJ3JnYig3NywxNzUsNzQpJyxcblx0XHRcdCdyZ2IoMTUyLDc4LDE2MyknLCdyZ2IoMjU1LDEyNywwKScsJ3JnYigyNTUsMjU1LDUxKScsXG5cdFx0XHQncmdiKDE2Niw4Niw0MCknLCdyZ2IoMjQ3LDEyOSwxOTEpJ107XG5cdC8vIEkgbGlrZWQgdGhlIGJsdWUgYmV0dGVyIGZvciB0aGUgbWFpbiBjb2xvciwgc28gdGhlIG5leHQgbGluZSBqdXN0IG1vdmVzXG5cdC8vIHRoZSBibHVlIGNvbG9yIChvcmlnaW5hbGx5IHNlbGYuY29sb3JTY2hlbWVbMV0pIHRvIHRoZSBmcm9udCAoc2VsZi5jb2xvclNjaGVtZVswXSlcblx0Y29sb3JTY2hlbWUuc3BsaWNlKDAsIDAsIGNvbG9yU2NoZW1lLnNwbGljZSgxLCAxKVswXSk7XG5cblx0dmFyIERFRkFVTFRfT1BUSU9OUyA9IHtcblx0XHRjb2xvclNjaGVtZTogY29sb3JTY2hlbWUsXG5cdFx0ZGltZW5zaW9uczogZGltZW5zaW9uc1xuXHR9O1xuXG5cdHJldHVybiB7XG5cdFx0ZGVmYXVsdHM6IERFRkFVTFRfT1BUSU9OU1xuXHR9O1xufSgpKTtcbnZhciBjaXRhdGlvblZpcyA9IGNpdGF0aW9uVmlzIHx8IHt9O1xuXG5jaXRhdGlvblZpcy5saW5lQ2hhcnREYXRhID0gKGZ1bmN0aW9uKCkge1xuXHQvLyBUYWtlIGluIGdyYXBoIGRhdGEgYW5kIHByZXBhcmUgaXQgZm9yIGxpbmUgY2hhcnRzXG5cdFxuXHRmdW5jdGlvbiBnZXRQZXdDbGFzc1llYXIoZ3JhcGgpIHtcblx0XHR2YXIgZWdvTm9kZSA9IGdyYXBoLm5vZGVzWzBdO1xuXHRcdHJldHVybiBlZ29Ob2RlLnBld19DbGFzcztcblx0fVxuXG5cdGZ1bmN0aW9uIGdldEZ1bmRpbmcoZ3JhcGgpIHtcblx0XHR2YXIgZWdvTm9kZSA9IGdyYXBoLm5vZGVzWzBdO1xuXHRcdHJldHVybiBlZ29Ob2RlLmZ1bmRpbmc7XG5cdH1cblxuXHRmdW5jdGlvbiBjbGVhbkxpbmtzKGxpbmtzKSB7XG5cdFx0dmFyIGNsZWFuZWRMaW5rcyA9IFtdO1xuXHRcdGxpbmtzLmZvckVhY2goZnVuY3Rpb24oZCkge1xuXHRcdFx0aWYgKCAodHlwZW9mIGQubGlua1RvRWdvICE9ICd1bmRlZmluZWQnKSAmJiAoZC5saW5rVG9FZ28gPT09IHRydWUpICkge1xuXHRcdFx0XHR2YXIgc291cmNlWWVhciA9ICtkLnNvdXJjZVllYXI7XG5cdFx0XHRcdHZhciB0YXJnZXRZZWFyID0gK2QudGFyZ2V0WWVhcjtcblx0XHRcdFx0aWYgKCAoc291cmNlWWVhciA+IDApICYmICh0YXJnZXRZZWFyID4gMCkgJiYgKHNvdXJjZVllYXIgPj0gdGFyZ2V0WWVhcikgKSB7XG5cdFx0XHRcdFx0Y2xlYW5lZExpbmtzLnB1c2goZCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gY2xlYW5lZExpbmtzO1xuXHR9XG5cblx0ZnVuY3Rpb24gZ2V0WWVhclJhbmdlKGNsZWFuZWRMaW5rcykge1xuXHRcdC8vIE1ha2Ugc3VyZSBhbGwgb3VyIGRhdGEgZmFsbCB3aXRoaW4gdGhlIGFwcHJvcHJpYXRlIHRpbWUgc3Bhbi5cblx0XHQvLyBUaGUgbWluaW11bSB5ZWFyIGlzIHRoZSBlYXJsaWVzdCBwdWJsaWNhdGlvbiBieSB0aGUgZWdvIGF1dGhvciAodGhlcmUgd2lsbCBsaWtlbHkgYmUgbm8gY2l0YXRpb25zIHdpdGhpbiB0aGlzIHllYXIsIGJ1dCB0aGlzIGNoYXJ0IG5lZWRzIHRvIGxpbmUgdXAgd2l0aCB0aGUgb3RoZXIgY2hhcnRzKS5cblx0XHQvLyBUaGUgbWF4aW11bSB5ZWFyIGlzIHRoZSBsYXN0IHllYXIgdGhhdCBhIHBhcGVyIGNpdGVkIG9uZSBvZiB0aGUgZWdvIGF1dGhvcidzIHBhcGVyIChjaGVja2luZyB0byBtYWtlIHN1cmUgaXQgaXMgbm90IGluIHRoZSBmdXR1cmUsIHdoaWNoIHdvdWxkIG1lYW4gYmFkIGRhdGEpLlxuXHRcdHZhciBtaW5ZZWFyID0gZDMubWluKGNsZWFuZWRMaW5rcywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC50YXJnZXRZZWFyPjAgPyBkLnRhcmdldFllYXIgOiBudWxsOyB9KTtcblx0XHQvLyBHZXQgY3VycmVudCB5ZWFyICh1c2luZyB0b2RheSdzIGRhdGUpOlxuXHRcdHZhciB0b2RheVllYXIgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XG5cdFx0dmFyIG1heFllYXIgPSBkMy5tYXgoY2xlYW5lZExpbmtzLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLnNvdXJjZVllYXI8PXRvZGF5WWVhciA/IGQuc291cmNlWWVhciA6IG51bGw7IH0pO1xuXG5cdFx0Ly8gLy8gY3V0b2ZmIGF0IDIwMTVcblx0XHQvLyBtYXhZZWFyID0gTWF0aC5taW4obWF4WWVhciwgMjAxNSk7XG5cdFx0Ly8gY3V0IG9mZiBhdCAyMDE3XG5cdFx0bWF4WWVhciA9IE1hdGgubWluKG1heFllYXIsIDIwMTcpO1xuXG5cdFx0cmV0dXJuIFttaW5ZZWFyLCBtYXhZZWFyXTtcblx0fVxuXG5cdGZ1bmN0aW9uIGdldEVtcHR5Q291bnREYXRhKHllYXJSYW5nZSkge1xuXHRcdHZhciBlbXB0eUNvdW50RGF0YSA9IFtdO1xuXHRcdGZvciAodmFyIGk9eWVhclJhbmdlWzBdOyBpPD15ZWFyUmFuZ2VbMV07IGkrKykge1xuXHRcdFx0ZW1wdHlDb3VudERhdGEucHVzaCh7eWVhcjogaSwgY291bnQ6IDB9KTtcblx0XHR9XG5cdFx0cmV0dXJuIGVtcHR5Q291bnREYXRhO1xuXHR9XG5cblx0ZnVuY3Rpb24gcHJlcGFyZURhdGFfYWxsQ2l0YXRpb25zKGdyYXBoKSB7XG5cdFx0Ly8gdmFyIGRhdGEgPSB7fTtcblx0XHR2YXIgZGF0YSA9IHt9O1xuXHRcdGRhdGFbJ3Bld19DbGFzcyddID0gZ2V0UGV3Q2xhc3NZZWFyKGdyYXBoKTtcblx0XHRkYXRhWydmdW5kaW5nJ10gPSBnZXRGdW5kaW5nKGdyYXBoKTtcblx0XHRkYXRhWyd2YWx1ZXMnXSA9IFtdO1xuXG5cdFx0dmFyIGNsZWFuZWRMaW5rcyA9IGNsZWFuTGlua3MoZ3JhcGgubGlua3MpO1xuXHRcdHZhciB5ZWFyUmFuZ2UgPSBnZXRZZWFyUmFuZ2UoY2xlYW5lZExpbmtzKTtcblx0XHRjbGVhbmVkTGlua3MgPSBjbGVhbmVkTGlua3MuZmlsdGVyKGZ1bmN0aW9uKGQpIHtcblx0XHRcdHJldHVybiBkLnNvdXJjZVllYXIgPD0geWVhclJhbmdlWzFdICYmIGQudGFyZ2V0WWVhciA8PSB5ZWFyUmFuZ2VbMV07XG5cdFx0fSk7XG5cblx0XHQvLyBmb3IgKHZhciBpPXllYXJSYW5nZVswXTsgaTw9eWVhclJhbmdlWzFdOyBpKyspIHtcblx0XHQvLyBcdC8vIGRhdGFbaV0gPSAwO1xuXHRcdC8vIFx0ZGF0YS5wdXNoKHt5ZWFyOiBpLCBjb3VudDogMH0pO1xuXHRcdC8vIH1cblx0XHQvLyBjbGVhbmVkTGlua3MuZm9yRWFjaChmdW5jdGlvbihkKSB7XG5cdFx0Ly8gXHRkYXRhW2Quc291cmNlWWVhcl0rKztcblx0XHQvLyB9KTtcblx0XHRkYXRhLnZhbHVlcyA9IGdldEVtcHR5Q291bnREYXRhKHllYXJSYW5nZSk7XG5cdFx0Y2xlYW5lZExpbmtzLmZvckVhY2goZnVuY3Rpb24oZCkge1xuXHRcdFx0dmFyIHRoaXNTb3VyY2VZZWFyID0gZC5zb3VyY2VZZWFyO1xuXHRcdFx0dmFyIGRhdGFUaGlzWWVhciA9IGRhdGEudmFsdWVzLmZpbHRlcihmdW5jdGlvbihkZCkgeyByZXR1cm4gZGQueWVhcj09PXRoaXNTb3VyY2VZZWFyOyB9KVswXTtcblx0XHRcdGRhdGFUaGlzWWVhci5jb3VudCsrO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIGRhdGE7XG5cdH1cblxuXHRmdW5jdGlvbiBwcmVwYXJlRGF0YV9lZ29BdXRob3JQdWJsaWNhdGlvbnMoZ3JhcGgpIHtcblx0XHR2YXIgZGF0YSA9IHt9O1xuXHRcdGRhdGFbJ3Bld19DbGFzcyddID0gZ2V0UGV3Q2xhc3NZZWFyKGdyYXBoKTtcblx0XHRkYXRhWydmdW5kaW5nJ10gPSBnZXRGdW5kaW5nKGdyYXBoKTtcblx0XHRkYXRhWyd2YWx1ZXMnXSA9IFtdO1xuXG5cdFx0dmFyIGNsZWFuZWRMaW5rcyA9IGNsZWFuTGlua3MoZ3JhcGgubGlua3MpO1xuXHRcdHZhciB5ZWFyUmFuZ2UgPSBnZXRZZWFyUmFuZ2UoY2xlYW5lZExpbmtzKTtcblx0XHRkYXRhLnZhbHVlcyA9IGdldEVtcHR5Q291bnREYXRhKHllYXJSYW5nZSk7XG5cdFx0dmFyIGVnb1BhcGVycyA9IGdyYXBoLm5vZGVzWzBdLnBhcGVycztcblx0XHRlZ29QYXBlcnMgPSBlZ29QYXBlcnMuZmlsdGVyKGZ1bmN0aW9uKGQpIHtcblx0XHRcdHJldHVybiAoIChkLlllYXIgPj0geWVhclJhbmdlWzBdKSAmJiAoZC5ZZWFyIDw9IHllYXJSYW5nZVsxXSkgKTtcblx0XHR9KVxuXHRcdGVnb1BhcGVycy5mb3JFYWNoKGZ1bmN0aW9uKGQpIHtcblx0XHRcdHZhciBkYXRhVGhpc1llYXIgPSBkYXRhLnZhbHVlcy5maWx0ZXIoZnVuY3Rpb24oZGQpIHsgcmV0dXJuIGRkLnllYXI9PWQuWWVhcjsgfSlbMF07XG5cdFx0XHRkYXRhVGhpc1llYXIuY291bnQrKztcblx0XHR9KTtcblxuXHRcdHJldHVybiBkYXRhO1xuXHR9XG5cblx0ZnVuY3Rpb24gcHJlcGFyZURhdGFfYXV0aG9yRWlnZW5mYWN0b3JTdW0oZ3JhcGgpIHtcblx0XHQvLyBGb3IgZWFjaCB5ZWFyLCBzdW0gdGhlIGVpZ2VuZmFjdG9yIChFRikgb2YgdGhlIGVnbyBhdXRob3IncyBwYXBlcidzXG5cdFx0dmFyIGRhdGEgPSB7fTtcblx0XHRkYXRhWydwZXdfQ2xhc3MnXSA9IGdldFBld0NsYXNzWWVhcihncmFwaCk7XG5cdFx0ZGF0YVsnZnVuZGluZyddID0gZ2V0RnVuZGluZyhncmFwaCk7XG5cdFx0ZGF0YVsndmFsdWVzJ10gPSBbXTtcblxuXHRcdHZhciBjbGVhbmVkTGlua3MgPSBjbGVhbkxpbmtzKGdyYXBoLmxpbmtzKTtcblx0XHR2YXIgeWVhclJhbmdlID0gZ2V0WWVhclJhbmdlKGNsZWFuZWRMaW5rcyk7XG5cdFx0ZGF0YS52YWx1ZXMgPSBnZXRFbXB0eUNvdW50RGF0YSh5ZWFyUmFuZ2UpO1xuXHRcdHZhciBlZ29QYXBlcnMgPSBncmFwaC5ub2Rlc1swXS5wYXBlcnM7XG5cdFx0ZWdvUGFwZXJzID0gZWdvUGFwZXJzLmZpbHRlcihmdW5jdGlvbihkKSB7XG5cdFx0XHRyZXR1cm4gKCAoZC5ZZWFyID49IHllYXJSYW5nZVswXSkgJiYgKGQuWWVhciA8PSB5ZWFyUmFuZ2VbMV0pICk7XG5cdFx0fSlcblx0XHRlZ29QYXBlcnMuZm9yRWFjaChmdW5jdGlvbihkKSB7XG5cdFx0XHR2YXIgZGF0YVRoaXNZZWFyID0gZGF0YS52YWx1ZXMuZmlsdGVyKGZ1bmN0aW9uKGRkKSB7IHJldHVybiBkZC55ZWFyPT1kLlllYXI7IH0pWzBdO1xuXHRcdFx0ZGF0YVRoaXNZZWFyLmNvdW50ID0gZGF0YVRoaXNZZWFyLmNvdW50ICsgZC5FRjtcblx0XHR9KTtcblxuXHRcdHJldHVybiBkYXRhO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRwcmVwYXJlRGF0YV9hbGxDaXRhdGlvbnM6IHByZXBhcmVEYXRhX2FsbENpdGF0aW9ucyxcblx0XHRwcmVwYXJlRGF0YV9lZ29BdXRob3JQdWJsaWNhdGlvbnM6IHByZXBhcmVEYXRhX2Vnb0F1dGhvclB1YmxpY2F0aW9ucyxcblx0XHRwcmVwYXJlRGF0YV9hdXRob3JFaWdlbmZhY3RvclN1bTogcHJlcGFyZURhdGFfYXV0aG9yRWlnZW5mYWN0b3JTdW1cblx0fTtcbn0oKSk7XG5cblxudmFyIGNpdGF0aW9uVmlzID0gY2l0YXRpb25WaXMgfHwge307XG5cbi8vICQoIGRvY3VtZW50ICkub24oIFwiaW5pdENvbXBsZXRlXCIsIGZ1bmN0aW9uKCkge1xuLy8gXHR2YXIgZWdvR3JhcGhWaXMgPSBjaXRhdGlvblZpcy5lZ29HcmFwaFZpcztcbi8vXG4vLyBcdHZhciAkbGVnZW5kVG9nZ2xlQnV0dG9uID0gJCgnPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIlRvZ2dsZSBMZWdlbmRcIiAvPicpO1xuLy8gXHQkbGVnZW5kVG9nZ2xlQnV0dG9uLmRhdGEoJ3ZhbCcsIDApO1xuLy8gXHR2YXIgbWF4VmFsID0gMztcbi8vXG4vLyBcdCQoJyNtYWluRGl2JykucHJlcGVuZCgkbGVnZW5kVG9nZ2xlQnV0dG9uKTtcbi8vXG4vLyBcdCRsZWdlbmRUb2dnbGVCdXR0b24ub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4vLyBcdFx0dmFyIGN1clZhbCA9ICRsZWdlbmRUb2dnbGVCdXR0b24uZGF0YSgndmFsJyk7XG4vLyBcdFx0Y3VyVmFsKys7XG4vLyBcdFx0aWYgKGN1clZhbCA+IG1heFZhbCkge1xuLy8gXHRcdFx0Y3VyVmFsID0gMDtcbi8vIFx0XHR9XG4vLyBcdFx0JGxlZ2VuZFRvZ2dsZUJ1dHRvbi5kYXRhKCd2YWwnLCBjdXJWYWwpO1xuLy8gXHRcdHN3aXRjaCAoY3VyVmFsKSB7XG4vLyBcdFx0XHRjYXNlIDA6XG4vLyBcdFx0XHRcdGVnb0dyYXBoVmlzLmxlZ2VuZC5yZW1vdmUoKTtcbi8vIFx0XHRcdFx0ZWdvR3JhcGhWaXMubGVnZW5kSW5pdCgpXG4vLyBcdFx0XHRcdFxuLy8gXHRcdFx0XHRicmVhaztcbi8vIFx0XHRcdFxuLy8gXHRcdFx0Y2FzZSAxOlxuLy8gXHRcdFx0XHRlZ29HcmFwaFZpcy5sZWdlbmRUZXh0XG4vLyBcdFx0XHRcdFx0LnRleHQoZnVuY3Rpb24oZCkge1xuLy8gXHRcdFx0XHRcdFx0dmFyIGlkeCA9ICtkLmtleTtcbi8vIFx0XHRcdFx0XHRcdHZhciBuZXdUZXh0ID0gZWdvR3JhcGhWaXMuZGF0YS5ncmFwaC5mb3Nfa21lYW5zX2NhdGVnb3JpZXNfdG9wZm9zbmFtZXNfdGZpZGZbaWR4XTtcbi8vIFx0XHRcdFx0XHRcdHJldHVybiBuZXdUZXh0O1xuLy8gXHRcdFx0XHRcdH0pO1xuLy9cbi8vIFx0XHRcdFx0YnJlYWs7XG4vL1xuLy8gXHRcdFx0Y2FzZSAyOlxuLy8gXHRcdFx0XHRlZ29HcmFwaFZpcy5sZWdlbmRUZXh0XG4vLyBcdFx0XHRcdFx0LnRleHQoZnVuY3Rpb24oZCkge1xuLy8gXHRcdFx0XHRcdFx0dmFyIGlkeCA9ICtkLmtleTtcbi8vIFx0XHRcdFx0XHRcdHZhciBuZXdUZXh0ID0gZWdvR3JhcGhWaXMuZGF0YS5ncmFwaC5mb3Nfa21lYW5zX2NhdGVnb3JpZXNfdG9wdGl0bGV3b3Jkc190ZmlkZltpZHhdO1xuLy8gXHRcdFx0XHRcdFx0cmV0dXJuIG5ld1RleHQ7XG4vLyBcdFx0XHRcdFx0fSk7XG4vL1xuLy8gXHRcdFx0XHRicmVhaztcbi8vXG4vLyBcdFx0XHRjYXNlIDM6XG4vLyBcdFx0XHRcdGVnb0dyYXBoVmlzLmxlZ2VuZFRleHRcbi8vIFx0XHRcdFx0XHQudGV4dChmdW5jdGlvbihkKSB7XG4vLyBcdFx0XHRcdFx0XHR2YXIgaWR4ID0gK2Qua2V5O1xuLy8gXHRcdFx0XHRcdFx0dmFyIG5ld1RleHQgPSBlZ29HcmFwaFZpcy5kYXRhLmdyYXBoLmZvc19rbWVhbnNfY2F0ZWdvcmllc190b3B0aXRsZXdvcmRzX3RmaWRmX3Jlc3RyaWN0ZWRbaWR4XTtcbi8vIFx0XHRcdFx0XHRcdHJldHVybiBuZXdUZXh0O1xuLy8gXHRcdFx0XHRcdH0pO1xuLy9cbi8vIFx0XHRcdFx0YnJlYWs7XG4vLyBcdFx0fVxuLy8gXHR9KTtcbi8vIFx0Ly8gZWdvR3JhcGhWaXMubGVnZW5kVGV4dFxuLy8gXHQvLyBcdC50ZXh0KCdkZGQnKTtcbi8vIH0pO1xuLy9cbi8vXG4vLyBodHRwOi8vY29kZXJldmlldy5zdGFja2V4Y2hhbmdlLmNvbS9xdWVzdGlvbnMvNzc2MTQvY2FwaXRhbGl6ZS10aGUtZmlyc3QtY2hhcmFjdGVyLW9mLWFsbC13b3Jkcy1ldmVuLXdoZW4tZm9sbG93aW5nLWFcblN0cmluZy5wcm90b3R5cGUuY2FwaXRhbGl6ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnRvTG93ZXJDYXNlKCkucmVwbGFjZSggL1xcYlxcdy9nLCBmdW5jdGlvbihtKSB7XG4gICAgICAgIHJldHVybiBtLnRvVXBwZXJDYXNlKCk7XG4gICAgfSk7XG59O1xuXG5cbnZhciBjaXRhdGlvblZpcyA9IGNpdGF0aW9uVmlzIHx8IHt9O1xuXG5mdW5jdGlvbiBtYWtlSHRtbCh5ZWFyLCBwYXBlcnMsIG51bURpc3BsYXksIGNhbGxiYWNrKSB7XG5cdGlmIChwYXBlcnNbMF0uaGFzT3duUHJvcGVydHkoJ2NpdGF0aW9uJykpIHtcblx0XHR2YXIgdG9vbHRpcEh0bWwgPSAnPGgzIHN0eWxlPVwiZm9udC1zaXplOiAxMDAlXCI+VG9wIHBhcGVycyBpbiB0aGlzIGNvbGxlY3Rpb24gaW4gJyArIHllYXIgKyc6PC9oMz4nO1xuXHRcdHRvb2x0aXBIdG1sID0gdG9vbHRpcEh0bWwgKyAnPG9sPic7XG5cdFx0dmFyIG51bVBhcGVyc0FkZGVkID0gMDtcblx0XHRmb3IgKHZhciBpID0gMCwgbGVuID0gcGFwZXJzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHR2YXIgcGFwZXIgPSBwYXBlcnNbaV07XG5cdFx0XHRpZiAocGFwZXIuaGFzT3duUHJvcGVydHkoJ2NpdGF0aW9uJykpIHtcblx0XHRcdFx0dG9vbHRpcEh0bWwgPSB0b29sdGlwSHRtbCArICc8bGk+JyArIHBhcGVyWydjaXRhdGlvbiddICsgJzwvbGk+Jztcblx0XHRcdFx0bnVtUGFwZXJzQWRkZWQrKztcblx0XHRcdFx0aWYgKG51bVBhcGVyc0FkZGVkID09PSBudW1EaXNwbGF5KSB7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0dG9vbHRpcEh0bWwgPSB0b29sdGlwSHRtbCArICc8L29sPic7XG5cblx0XHRjaXRhdGlvblZpcy5lZ29HcmFwaFZpcy50b29sdGlwID0gY2l0YXRpb25WaXMuZWdvR3JhcGhWaXMudG9vbHRpcC5odG1sKHRvb2x0aXBIdG1sKTtcblx0XHRpZiAoY2FsbGJhY2sgIT0gbnVsbCkge1xuXHRcdFx0Y2FsbGJhY2sodG9vbHRpcEh0bWwpO1xuXHRcdH1cblx0XHRyZXR1cm4gdG9vbHRpcEh0bWw7XG5cblx0fSBlbHNlIHtcblx0XHR2YXIgcGlkcyA9IFtdO1xuXHRcdGZvciAodmFyIGkgPSAwLCBsZW4gPSBudW1EaXNwbGF5OyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdGlmIChpIDwgcGFwZXJzLmxlbmd0aCkge1xuXHRcdFx0XHRwaWRzLnB1c2gocGFwZXJzW2ldLlBhcGVySUQpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHQkLmFqYXgoe1xuXHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcblx0XHRcdHVybDogJFNDUklQVF9ST09UICsgJy9fdmlzX2dldF9tb3JlX3BhcGVyaW5mbycsXG5cdFx0XHRkYXRhOiB7cGFwZXJpZDogSlNPTi5zdHJpbmdpZnkocGlkcyl9LFxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24ocmVzdWx0KSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKHJlc3VsdCk7XG5cdFx0XHRcdHZhciBkYl9wYXBlcnMgPSByZXN1bHRbJ3BhcGVycyddO1xuXHRcdFx0XHR2YXIgdG9vbHRpcEh0bWwgPSAnPGgzIHN0eWxlPVwiZm9udC1zaXplOiAxMDAlXCI+VG9wIHBhcGVycyBpbiB0aGlzIGNvbGxlY3Rpb24gaW4gJyArIHllYXIgKyc6PC9oMz4nO1xuXHRcdFx0XHR0b29sdGlwSHRtbCA9IHRvb2x0aXBIdG1sICsgJzxvbD4nO1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMCwgbGVuID0gZGJfcGFwZXJzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRcdFx0cGFwZXJzW2ldWydjaXRhdGlvbiddID0gZGJfcGFwZXJzW2ldWydjaXRhdGlvbiddO1xuXHRcdFx0XHRcdHRvb2x0aXBIdG1sID0gdG9vbHRpcEh0bWwgKyAnPGxpPicgKyBwYXBlcnNbaV1bJ2NpdGF0aW9uJ10gKyAnPC9saT4nO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRvb2x0aXBIdG1sID0gdG9vbHRpcEh0bWwgKyAnPC9vbD4nO1xuXG5cdFx0XHRcdGNpdGF0aW9uVmlzLmVnb0dyYXBoVmlzLnRvb2x0aXAgPSBjaXRhdGlvblZpcy5lZ29HcmFwaFZpcy50b29sdGlwLmh0bWwodG9vbHRpcEh0bWwpO1xuXHRcdFx0XHRpZiAoY2FsbGJhY2sgIT0gbnVsbCkge1xuXHRcdFx0XHRcdGNhbGxiYWNrKHRvb2x0aXBIdG1sKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdG9vbHRpcEh0bWw7XG5cblx0XHRcdFx0Lypcblx0XHRcdFx0ZC5UaXRsZSA9IHJlc3VsdFsndGl0bGUnXTtcblx0XHRcdFx0ZC5kb2kgPSByZXN1bHRbJ2RvaSddO1xuXHRcdFx0XHRkLmNpdGF0aW9uID0gcmVzdWx0WydjaXRhdGlvbiddO1xuXHRcdFx0XHRkLnVwZGF0ZWRQcm9wcyA9IHRydWU7XG5cdFx0XHRcdGQudG9vbHRpcEh0bWwgPSAnPHA+JyArIGQuY2l0YXRpb24gKyAnPC9wPic7XG5cdFx0XHRcdGQudG9vbHRpcEh0bWwgPSBkLnRvb2x0aXBIdG1sICsgJzxicj4nO1xuXHRcdFx0XHRkLnRvb2x0aXBIdG1sID0gZC50b29sdGlwSHRtbCArICc8cD5DYXRlZ29yeTogJyArIGQuRG9tYWluTmFtZSArICc8L3A+Jztcblx0XHRcdFx0aWYgKGQuaG92ZXJlZCkge1xuXHRcdFx0XHRcdHNlbGYudGlwLnNob3coZCwgaG92ZXJlZEl0ZW0ubm9kZSgpKTtcblx0XHRcdFx0XHQvLyBzZWxmLnRpcC5zaG93KGQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdCovXG5cblx0XHRcdH1cblx0XHR9KTtcblx0fSAgLy8gZW5kIGVsc2VcblxuXG59XG5cbi8qXG4kKCBkb2N1bWVudCApLm9uKCBcImluaXRDb21wbGV0ZVwiLCBmdW5jdGlvbigpIHtcblx0dmFyIGxpbmVDaGFydHMgPSBjaXRhdGlvblZpcy5saW5lQ2hhcnRzO1xuXHR2YXIgZWdvR3JhcGhWaXMgPSBjaXRhdGlvblZpcy5lZ29HcmFwaFZpcztcblx0dmFyIGVnb1BhcGVycyA9IGNpdGF0aW9uVmlzLmVnb0dyYXBoVmlzLmVnb05vZGUucGFwZXJzO1xuXHRmb3IgKHZhciBpID0gMCwgbGVuID0gbGluZUNoYXJ0cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHRcdHZhciB5ZWFyQXJlYSA9IGxpbmVDaGFydHNbaV0ueWVhckFyZWE7XG5cdFx0eWVhckFyZWEuc3R5bGUoJ3BvaW50ZXItZXZlbnRzJywgJ2FsbCcpXG5cdFx0XHQub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKGQpIHtcblx0XHRcdFx0dmFyIHRoaXNZZWFyUGFwZXJzID0gZWdvUGFwZXJzLmZpbHRlcihmdW5jdGlvbihkZCkge1xuXHRcdFx0XHRcdHJldHVybiBkZC5ZZWFyPT1kLnllYXI7fVxuXHRcdFx0XHRcdClcblx0XHRcdFx0XHQuc29ydChmdW5jdGlvbihhLCBiKSB7IHJldHVybiBkMy5kZXNjZW5kaW5nKGEuRUYsIGIuRUYpOyB9KTtcblx0XHRcdFx0Y29uc29sZS5sb2codGhpc1llYXJQYXBlcnMpO1xuXHRcdFx0XHRpZiAodGhpc1llYXJQYXBlcnMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNpdGF0aW9uVmlzLmVnb0dyYXBoVmlzLnRvb2x0aXAgPSBjaXRhdGlvblZpcy5lZ29HcmFwaFZpcy50b29sdGlwXG5cdFx0XHRcdFx0Lmh0bWwoJzxwPkxvYWRpbmcuLi48L3A+Jylcblx0XHRcdFx0XHQuc3R5bGUoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpXG5cdFx0XHRcdFx0LnN0eWxlKCdib3JkZXItc3R5bGUnLCAnc29saWQnKVxuXHRcdFx0XHRcdC5zdHlsZSgnYm9yZGVyLWNvbG9yJywgY2l0YXRpb25WaXMuZWdvR3JhcGhWaXMuY29sb3JTY2hlbWVbMF0pXG5cdFx0XHRcdFx0LnN0eWxlKCd0b3AnLCAoZDMuZXZlbnQucGFnZVktMjAwKSsncHgnKVxuXHRcdFx0XHRcdC5zdHlsZSgnbGVmdCcsIChkMy5ldmVudC5wYWdlWCsxMCkrJ3B4Jyk7XG5cdFx0XHRcdHZhciB0b29sdGlwSHRtbCA9IG1ha2VIdG1sKGQueWVhciwgdGhpc1llYXJQYXBlcnMsIDMpO1xuXHRcdFx0XHR9KVxuXHRcdFx0Lm9uKCdtb3VzZW91dCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRjaXRhdGlvblZpcy5lZ29HcmFwaFZpcy50b29sdGlwID0gY2l0YXRpb25WaXMuZWdvR3JhcGhWaXMudG9vbHRpcFxuXHRcdFx0XHRcdC5zdHlsZSgndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcblx0XHRcdH0pO1xuXHR9XG5cbn0pO1xuKi9cblxuXG4vLyB0b29sdGlwc3RlciBtZXRob2RcbiQoIGRvY3VtZW50ICkub24oICdpbml0Q29tcGxldGUnLCBmdW5jdGlvbigpIHtcblx0dmFyIHdpbmRvd1dpZHRoID0gJCh3aW5kb3cpLndpZHRoKCk7XG5cblx0bm9kZVRvb2x0aXBzKCk7XG5cdGxlZ2VuZFRvb2x0aXBzKCk7XG5cblx0JCgnLnllYXJBcmVhLCAueWVhclRpY2snKS5jc3MoJ3BvaW50ZXItZXZlbnRzJywgJ2FsbCcpXG5cdFx0LnRvb2x0aXBzdGVyKHtcblx0XHRcdHRoZW1lOiAndG9vbHRpcHN0ZXItbm9pcicsXG5cdFx0XHRtYXhXaWR0aDogd2luZG93V2lkdGggKiAuNSxcblx0XHRcdGFuaW1hdGlvbjogbnVsbCxcblx0XHRcdGFuaW1hdGlvbmR1cmF0aW9uOiAwLFxuXHRcdFx0ZGVsYXk6IDAsXG5cdFx0XHR1cGRhdGVBbmltYXRpb246IG51bGwsXG5cdFx0XHRjb250ZW50OiAnPHA+TG9hZGluZy4uLjwvcD4nLFxuXHRcdFx0Y29udGVudEFzSFRNTDogdHJ1ZSxcblx0XHRcdGZ1bmN0aW9uSW5pdDogZnVuY3Rpb24oKSB7Y29uc29sZS5sb2coJ3Rvb2x0aXBzdGVyIGluaXQnKTt9LFxuXHRcdFx0ZnVuY3Rpb25CZWZvcmU6IGZ1bmN0aW9uKGluc3RhbmNlLCBoZWxwZXIpIHtcblx0XHRcdFx0dmFyICRvcmlnaW4gPSAkKGhlbHBlci5vcmlnaW4pO1xuXHRcdFx0XHR2YXIgeWVhciA9ICRvcmlnaW4uZGF0YSgneWVhcicpO1xuXHRcdFx0XHR2YXIgZWdvUGFwZXJzID0gY2l0YXRpb25WaXMuZWdvR3JhcGhWaXMuZWdvTm9kZS5wYXBlcnM7XG5cdFx0XHRcdHZhciB0aGlzWWVhclBhcGVycyA9IGVnb1BhcGVycy5maWx0ZXIoZnVuY3Rpb24oZGQpIHtcblx0XHRcdFx0XHRyZXR1cm4gZGQuWWVhcj09eWVhcjt9XG5cdFx0XHRcdFx0KVxuXHRcdFx0XHRcdC5zb3J0KGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGQzLmRlc2NlbmRpbmcoYS5FRiwgYi5FRik7IH0pO1xuXHRcdFx0XHRpZiAodGhpc1llYXJQYXBlcnMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHZhciB0b29sdGlwSHRtbCA9IG1ha2VIdG1sKHllYXIsIHRoaXNZZWFyUGFwZXJzLCAzLCBmdW5jdGlvbihodG1sKSB7XG5cdFx0XHRcdFx0aW5zdGFuY2UuY29udGVudChodG1sKTsgXG5cdFx0XHRcdH0pO1xuXHRcdFx0XHQvLyBpbnN0YW5jZS5jb250ZW50KHRvb2x0aXBIdG1sKTtcblx0XHRcdH1cblx0fSk7XG59ICk7XG5cbmZ1bmN0aW9uIG5vZGVUb29sdGlwcygpIHtcblx0Ly8gJCgnLmQzLXRpcCcpLnJlbW92ZSgpO1xuXHQkKCcubm9kZScpLmFkZENsYXNzKCd0b29sdGlwc3RlcicpO1xuXHQvLyAkKCcubm9kZScpLmZpcnN0KCkuYWRkQ2xhc3MoJ2NlbnRlci1ub2RlJyk7XG5cdHZhciB3aW5kb3dXaWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xuXHQkKCcudG9vbHRpcHN0ZXInKS50b29sdGlwc3Rlcih7XG5cdFx0dGhlbWU6ICd0b29sdGlwc3Rlci1ub2lyJyxcblx0XHRtYXhXaWR0aDogd2luZG93V2lkdGggKiAuNSxcblx0XHRhbmltYXRpb246IG51bGwsXG5cdFx0YW5pbWF0aW9uZHVyYXRpb246IDAsXG5cdFx0ZGVsYXk6IDAsXG5cdFx0dXBkYXRlQW5pbWF0aW9uOiBudWxsLFxuXHRcdGNvbnRlbnQ6ICc8cD5Mb2FkaW5nLi4uPC9wPicsXG5cdFx0Y29udGVudEFzSFRNTDogdHJ1ZSxcblx0XHRmdW5jdGlvbkJlZm9yZTogZnVuY3Rpb24oaW5zdGFuY2UsIGhlbHBlcikge1xuXHRcdFx0dmFyIHRvb2x0aXBIdG1sID0gYWpheFBhcGVySW5mbyhoZWxwZXIub3JpZ2luLCBmdW5jdGlvbihodG1sKSB7XG5cdFx0XHRcdGluc3RhbmNlLmNvbnRlbnQoaHRtbCk7IFxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9KTtcblxuXHRmdW5jdGlvbiBhamF4UGFwZXJJbmZvKG5vZGUsIGNhbGxiYWNrKSB7XG5cdFx0Ly8gbm9kZSBpcyB0aGUgRE9NIGVsZW1lbnQgZm9yIGEgbm9kZVxuXHRcdHZhciBodG1sID0gJyc7XG5cdFx0ZDMuc2VsZWN0KG5vZGUpLmVhY2goZnVuY3Rpb24oZCkge1xuXHRcdFx0aWYgKCAoZC5ub2RlVHlwZSA9PT0gJ3BhcGVyJykgJiYgKCFkLnVwZGF0ZWRQcm9wcykgKSB7XG5cdFx0XHRcdGlmICggKHR5cGVvZiBkLmNpdGF0aW9uICE9IFwidW5kZWZpbmVkXCIpICYmIChkLmNpdGF0aW9uLmxlbmd0aD4wKSApIHtcblx0XHRcdFx0XHRodG1sID0gYnlwYXNzQWpheChkKTtcblx0XHRcdFx0XHRpZiAoY2FsbGJhY2sgIT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0Y2FsbGJhY2soaHRtbCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBodG1sXG5cdFx0XHRcdH1cblx0XHRcdFx0JC5hamF4KHtcblx0XHRcdFx0XHRkYXRhVHlwZTogJ2pzb24nLFxuXHRcdFx0XHRcdHVybDogJFNDUklQVF9ST09UICsgJy9fdmlzX2dldF9tb3JlX3BhcGVyaW5mbycsXG5cdFx0XHRcdFx0ZGF0YToge3BhcGVyaWQ6IGQuaWR9LFxuXHRcdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3VsdCkge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2cocmVzdWx0KTtcblx0XHRcdFx0XHRcdGQuVGl0bGUgPSByZXN1bHRbJ3RpdGxlJ107XG5cdFx0XHRcdFx0XHRkLmRvaSA9IHJlc3VsdFsnZG9pJ107XG5cdFx0XHRcdFx0XHRkLmNpdGF0aW9uID0gcmVzdWx0WydjaXRhdGlvbiddO1xuXHRcdFx0XHRcdFx0ZC5hdXRob3Jfc3RyID0gcmVzdWx0WydhdXRob3Jfc3RyJ107XG5cdFx0XHRcdFx0XHRkLnZlbnVlID0gcmVzdWx0Wyd2ZW51ZSddO1xuXHRcdFx0XHRcdFx0ZC51cGRhdGVkUHJvcHMgPSB0cnVlO1xuXHRcdFx0XHRcdFx0Ly8gZC50b29sdGlwSHRtbCA9ICc8cD4nICsgZC5jaXRhdGlvbiArICc8L3A+Jztcblx0XHRcdFx0XHRcdC8vIGQudG9vbHRpcEh0bWwgPSBkLnRvb2x0aXBIdG1sICsgJzxicj4nO1xuXHRcdFx0XHRcdFx0Ly8gZC50b29sdGlwSHRtbCA9IGQudG9vbHRpcEh0bWwgKyAnPHA+Q2F0ZWdvcnk6ICcgKyBkLkRvbWFpbk5hbWUgKyAnPC9wPic7XG5cdFx0XHRcdFx0XHQvLyBpZiAoZC5ob3ZlcmVkKSB7XG5cdFx0XHRcdFx0XHQvLyBcdHNlbGYudGlwLnNob3coZCwgaG92ZXJlZEl0ZW0ubm9kZSgpKTtcblx0XHRcdFx0XHRcdC8vIFx0Ly8gc2VsZi50aXAuc2hvdyhkKTtcblx0XHRcdFx0XHRcdC8vIH1cblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0aHRtbCA9IG1ha2VOb2RlVG9vbHRpcEh0bWwoZCk7XG5cdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2sgIT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0XHRjYWxsYmFjayhodG1sKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJldHVybiBodG1sXG5cblxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2UgaWYgKCBkLmlkeCA9PSAwICkge1xuXHRcdFx0XHRkLnRvb2x0aXBIdG1sID0gJzxwPic7XG5cdFx0XHRcdGlmIChkLm5vZGVUeXBlKSB7XG5cdFx0XHRcdFx0ZC50b29sdGlwSHRtbCA9IGQudG9vbHRpcEh0bWwgKyBkLm5vZGVUeXBlLmNhcGl0YWxpemUoKSArICc6ICc7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZC50b29sdGlwSHRtbCA9IGQudG9vbHRpcEh0bWwgKyBkLm5hbWU7XG5cdFx0XHRcdGQudG9vbHRpcEh0bWwgPSBkLnRvb2x0aXBIdG1sICsgJzwvcD4nO1xuXHRcdFx0XHR2YXIgbnVtYmVyT2ZQdWJzID0gZC5wYXBlcnMubGVuZ3RoO1xuXHRcdFx0XHRkLnRvb2x0aXBIdG1sID0gZC50b29sdGlwSHRtbCArICc8cD5OdW1iZXIgb2YgUHVibGljYXRpb25zOiAnICsgbnVtYmVyT2ZQdWJzICsgJzwvcD4nO1xuXHRcdFx0XHRodG1sID0gZC50b29sdGlwSHRtbDtcblx0XHRcdFx0aWYgKGNhbGxiYWNrICE9IG51bGwpIHtcblx0XHRcdFx0XHRjYWxsYmFjayhodG1sKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0cmV0dXJuIGh0bWw7XG5cdFx0XHR9XG5cblx0XHR9KTtcblx0XHRyZXR1cm4gaHRtbDtcblx0fVxuXG5cdGZ1bmN0aW9uIGJ5cGFzc0FqYXgoZCkge1xuXHRcdGQudXBkYXRlZFByb3BzID0gdHJ1ZTtcblx0XHR2YXIgaHRtbCA9IG1ha2VOb2RlVG9vbHRpcEh0bWwoZCk7XG5cdFx0cmV0dXJuIGh0bWxcblx0fVxuXG5cdGZ1bmN0aW9uIG1ha2VOb2RlVG9vbHRpcEh0bWwoZCkge1xuXHRcdHZhciBzcGFuID0gJCggJzxzcGFuPicgKTtcblx0XHRzcGFuLmFwcGVuZCggJCggJzxwIGNsYXNzPVwidG9vbHRpcCB0aXRsZVwiPicgKS50ZXh0KGQuVGl0bGUpICk7XG5cdFx0c3Bhbi5hcHBlbmQoICQoICc8cCBjbGFzcz1cInRvb2x0aXAgYXV0aG9yc1wiPicgKS50ZXh0KGQuYXV0aG9yX3N0cikgKTtcblx0XHRzcGFuLmFwcGVuZCggJCggJzxwIGNsYXNzPVwidG9vbHRpcCB2ZW51ZVwiPicgKS50ZXh0KGQudmVudWUpICk7XG5cdFx0c3Bhbi5hcHBlbmQoICQoICc8cCBjbGFzcz1cInRvb2x0aXAgeWVhclwiPicgKS50ZXh0KGQuWWVhcikgKTtcblx0XHQvLyBzcGFuLmFwcGVuZCggJCggJzxwIGNsYXNzPVwidG9vbHRpcCBkb21haW5cIj4nICkudGV4dChcIkNhdGVnb3J5OiBcIiArIGQuRG9tYWluTmFtZSkgKTtcblx0XHRzcGFuLmFwcGVuZCggJCggJzxwIGNsYXNzPVwidG9vbHRpcCBkb21haW5cIj4nICkudGV4dChcIkNhdGVnb3JpZXM6IFwiICsgZC5GaWVsZF9vZl9zdHVkeV9uYW1lcykgKTtcblx0XHQvLyBzcGFuLmFwcGVuZCggJCggJzxwIGNsYXNzPVwidG9vbHRpcCBqc19kaXZcIj4nICkudGV4dChcIkpTIERpdmVyZ2VuY2U6IFwiICsgZC5qc19kaXYpICk7XG5cdFx0Ly8gc3Bhbi5hcHBlbmQoICQoICc8cCBjbGFzcz1cInRvb2x0aXAgYXZnX2Rpc3RhbmNlXCI+JyApLnRleHQoXCJBdmVyYWdlIGNsdXN0ZXIgZGlzdGFuY2U6IFwiICsgZC5hdmVyYWdlX2NsdXN0ZXJfZGlzdGFuY2VfdG9fY2VudGVyKSApO1xuXHRcdC8vIHNwYW4uYXBwZW5kKCAkKCAnPHAgY2xhc3M9XCJ0b29sdGlwIGZvc19rbWVhbnNfY2F0ZWdvcnlcIj4nICkudGV4dChcIkZPUyBLbWVhbnMgY2F0ZWdvcnk6IFwiICsgZC5mb3Nfa21lYW5zX2NhdGVnb3J5KSApO1xuXHRcdGQudG9vbHRpcEh0bWwgPSBzcGFuLmh0bWwoKTtcblx0XHR2YXIgaHRtbCA9IGQudG9vbHRpcEh0bWw7XG5cdFx0cmV0dXJuIGh0bWw7XG5cdFx0XG5cdH1cbn1cblxuZnVuY3Rpb24gbGVnZW5kVG9vbHRpcHMoKSB7XG5cdHZhciB3aW5kb3dXaWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xuXHR2YXIgb3RoZXJIdG1sID0gJzxwPlRoZXNlIGFyZSBwYXBlcnMgaW4gY2F0ZWdvcmllcyBvdGhlciB0aGFuIHRoZSBvbmVzIGFib3ZlLiBQb2ludCB5b3VyIG1vdXNlIGF0IGEgc3BlY2lmaWMgcGFwZXIgdG8gc2VlIHRoZSBuYW1lIG9mIHRoZSBjYXRlZ29yeS48L3A+Jztcblx0JCgnLmxlZ2VuZEl0ZW0ub3RoZXInKS50b29sdGlwc3Rlcih7XG5cdFx0dGhlbWU6ICd0b29sdGlwc3Rlci1ub2lyJyxcblx0XHRtYXhXaWR0aDogd2luZG93V2lkdGggKiAuNSxcblx0XHRhbmltYXRpb246IG51bGwsXG5cdFx0YW5pbWF0aW9uZHVyYXRpb246IDAsXG5cdFx0ZGVsYXk6IDAsXG5cdFx0dXBkYXRlQW5pbWF0aW9uOiBudWxsLFxuXHRcdGNvbnRlbnQ6IG90aGVySHRtbCxcblx0XHRjb250ZW50QXNIVE1MOiB0cnVlXG5cdH0pO1xuXG5cdHZhciBoZWFkZXJIdG1sID0gXCI8cD5UaGUgZGF0YSB1bmRlcmx5aW5nIHRoaXMgdmlzdWFsaXphdGlvbiBjb21lcyBmcm9tIHRoZSBNaWNyb3NvZnQgQWNhZGVtaWMgR3JhcGguIEVhY2ggZG9jdW1lbnQgaGFzIG11bHRpcGxlIGFzc29jaWF0ZWQgRmllbGRzIG9mIFN0dWR5LiBIZXJlLCB0aGVzZSBGaWVsZHMgYXJlIGNvbWJpbmVkIHdpdGggdGhlIGRvY3VtZW50J3MgdGl0bGUsIHdlaWdodGVkIHVzaW5nIFRGLUlERiwgYW5kIGFzc2lnbmVkIGEgY2F0ZWdvcnkgdXNpbmcgSy1NZWFucyBjbHVzdGVyaW5nLiBNb3VzZSBvdmVyIHRoZSBjYXRlZ29yaWVzIHRvIGhpZ2hsaWdodCBpdHMgcGFwZXJzLCBhbmQgdG8gc2VlIG1vcmUgaW1wb3J0YW50IHRlcm1zLjwvcD5cIjtcblx0JCgnLmVnb0dyYXBoVmlzTGVnZW5kSGVhZGVyJykudG9vbHRpcHN0ZXIoe1xuXHRcdHRoZW1lOiAndG9vbHRpcHN0ZXItbm9pcicsXG5cdFx0bWF4V2lkdGg6IHdpbmRvd1dpZHRoICogLjUsXG5cdFx0YW5pbWF0aW9uOiBudWxsLFxuXHRcdGFuaW1hdGlvbmR1cmF0aW9uOiAwLFxuXHRcdGRlbGF5OiAwLFxuXHRcdHVwZGF0ZUFuaW1hdGlvbjogbnVsbCxcblx0XHRjb250ZW50OiBoZWFkZXJIdG1sLFxuXHRcdGNvbnRlbnRBc0hUTUw6IHRydWVcblx0fSk7XG5cblx0JCgnLmxlZ2VuZEl0ZW0nKS50b29sdGlwc3Rlcih7XG5cdFx0dGhlbWU6ICd0b29sdGlwc3Rlci1ub2lyJyxcblx0XHRtYXhXaWR0aDogd2luZG93V2lkdGggKiAuNSxcblx0XHRhbmltYXRpb246IG51bGwsXG5cdFx0YW5pbWF0aW9uZHVyYXRpb246IDAsXG5cdFx0ZGVsYXk6IDAsXG5cdFx0dXBkYXRlQW5pbWF0aW9uOiBudWxsLFxuXHRcdGNvbnRlbnQ6ICc8cD5Mb2FkaW5nLi4uPC9wPicsXG5cdFx0Y29udGVudEFzSFRNTDogdHJ1ZSxcblx0XHRmdW5jdGlvbkJlZm9yZTogZnVuY3Rpb24oaW5zdGFuY2UsIGhlbHBlcikge1xuXHRcdFx0dmFyIGxlZ2VuZEl0ZW0gPSBkMy5zZWxlY3QoaGVscGVyLm9yaWdpbik7XG5cdFx0XHRsZWdlbmRJdGVtLmVhY2goZnVuY3Rpb24oZCkge1xuXHRcdFx0XHR2YXIgaHRtbCA9IFwiPGgzPlRvcCB0ZXJtcyBpbiBjYXRlZ29yeSBcIiArIGQuRG9tYWluSUQgKyBcIjo8L2gzPlwiO1xuXHRcdFx0XHRodG1sID0gaHRtbCArIFwiPHVsPlwiXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwLCBsZW4gPSBkLkRvbWFpbk5hbWUubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdFx0XHRodG1sID0gaHRtbCArIFwiPGxpPlwiICsgZC5Eb21haW5OYW1lW2ldICsgXCI8L2xpPlwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGh0bWwgPSBodG1sICsgXCI8L3VsPlwiXG5cdFx0XHRcdGluc3RhbmNlLmNvbnRlbnQoaHRtbCk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH0pO1xuXHRcdH0sXG5cdH0pO1xufVxuLy8gaHR0cDovL2NvZGVyZXZpZXcuc3RhY2tleGNoYW5nZS5jb20vcXVlc3Rpb25zLzc3NjE0L2NhcGl0YWxpemUtdGhlLWZpcnN0LWNoYXJhY3Rlci1vZi1hbGwtd29yZHMtZXZlbi13aGVuLWZvbGxvd2luZy1hXG5TdHJpbmcucHJvdG90eXBlLmNhcGl0YWxpemUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoIC9cXGJcXHcvZywgZnVuY3Rpb24obSkge1xuICAgICAgICByZXR1cm4gbS50b1VwcGVyQ2FzZSgpO1xuICAgIH0pO1xufTtcblxuXG5mdW5jdGlvbiBlZ29HcmFwaFZpcyhkYXRhKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblx0c2VsZi5kYXRhID0gZGF0YTtcblx0c2VsZi5ub3RFZ29Ob2RlcyA9IHNlbGYuZGF0YS5ub2Rlcy5zbGljZSgxKTtcblx0Y29uc29sZS5sb2coc2VsZi5kYXRhKTtcblxuXHQvLyBEZWZhdWx0c1xuXHQvLyBHcmFwaCBTVkcgRGltZW5zaW9uc1xuICAgIC8vIHNlbGYuZ3JhcGhEaW1lbnNpb25zID0ge1xuICAgIC8vICAgICB3aWR0aDogOTYwLFxuICAgIC8vICAgICBoZWlnaHQ6IDUwMFxuICAgIC8vIH07XG5cdHNlbGYuZ3JhcGhEaW1lbnNpb25zOyAgLy8gaW1wb3J0ZWQgaW4gc2VsZi5pbXBvcnREZWZhdWx0T3B0aW9ucyBiZWxvd1xuXHRcblx0c2VsZi5jb2xvclNjaGVtZTtcblxuICAgIC8vIE5vZGUgcGxhY2VtZW50IG9wdGlvbnM6XG4gICAgLy8gXCJmb3JjZTFcIjogbm9kZXMgcGxhY2VkIGJ5IHJ1bm5pbmcgdGhlIGZvcmNlIGxheW91dCBhbmQgdGhlbiBmcmVlemluZ1xuICAgIC8vIFwic3BpcmFsXCIgcGxhY2VzIHRoZSBub2RlcyBpbiBhIHNwaXJhbCBmb3JtYXRpb24gd2l0aCB0aGUgZWdvIG5vZGUgYXQgdGhlIGNlbnRlclxuXHQvLyBcInNwaXJhbDJcIjogYWx0ZXJuYXRlIHNwaXJhbCBhbGdvcml0aG1cbiAgICAvLyBBREQgTU9SRVxuICAgIHNlbGYubm9kZVBsYWNlbWVudE9wdGlvbnMgPSBbXCJmb3JjZTFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3BpcmFsXCIsXG5cdFx0XHRcdFx0XHRcdFx0IFwic3BpcmFsMlwiXTtcblx0c2VsZi5ub2RlUGxhY2VtZW50ID0gc2VsZi5ub2RlUGxhY2VtZW50T3B0aW9uc1sxXTtcblx0XG5cdHNlbGYuem9vbWFibGUgPSBmYWxzZTtcblxuXHRzZWxmLnN2ZztcbiAgICBzZWxmLmdyb3VwO1xuXHRzZWxmLm5vZGU7XG5cdHNlbGYubGluaztcblx0c2VsZi5lZ29Ob2RlO1xuXG5cdHNlbGYuZWlnZW5GYWN0b3JTY2FsZTtcblxuXHQvLyBzZWxmLmxvYWRpbmdUZXh0O1xuXG5cdHNlbGYuZG9tYWluc1RoaXNHcmFwaDtcbiAgICBzZWxmLmxlZ2VuZDtcblxuICAgIHNlbGYueWVhclRleHREaXNwbGF5O1xuXG4gICAgc2VsZi5hdXRob3JJbWFnZURpdjtcblxuICAgIHNlbGYudG9vbHRpcDtcblx0c2VsZi50aXA7XG5cblx0c2VsZi50aWNrO1xuXHRzZWxmLmZvcmNlO1xuXG4gICAgLy8gU2VlIGh0dHA6Ly9jb2xvcmJyZXdlcjIub3JnLz90eXBlPXF1YWxpdGF0aXZlJnNjaGVtZT1TZXQxJm49OFxuICAgIC8vIHNlbGYuY29sb3JTY2hlbWUgPSBbJ3JnYigyMjgsMjYsMjgpJywncmdiKDU1LDEyNiwxODQpJywncmdiKDc3LDE3NSw3NCknLFxuXHQvLyBcdCdyZ2IoMTUyLDc4LDE2MyknLCdyZ2IoMjU1LDEyNywwKScsJ3JnYigyNTUsMjU1LDUxKScsXG5cdC8vIFx0J3JnYigxNjYsODYsNDApJywncmdiKDI0NywxMjksMTkxKSddXG4gICAgLy8gLy8gSSBsaWtlZCB0aGUgYmx1ZSBiZXR0ZXIgZm9yIHRoZSBtYWluIGNvbG9yLCBzbyB0aGUgbmV4dCBsaW5lIGp1c3QgbW92ZXNcbiAgICAvLyAvLyB0aGUgYmx1ZSBjb2xvciAob3JpZ2luYWxseSBzZWxmLmNvbG9yU2NoZW1lWzFdKSB0byB0aGUgZnJvbnQgKHNlbGYuY29sb3JTY2hlbWVbMF0pXG4gICAgLy8gc2VsZi5jb2xvclNjaGVtZS5zcGxpY2UoMCwgMCwgc2VsZi5jb2xvclNjaGVtZS5zcGxpY2UoMSwgMSlbMF0pXG5cdHNlbGYuY29sb3JTY2hlbWU7ICAvLyBpbXBvcnRlZCBpbiBpbXBvcnREZWZhdWx0T3B0aW9ucyBiZWxvd1xuXG5cdC8vIGNvbnRpbnVvdXMgY29sb3Igc2NoZW1lIGJhc2VkIG9uIGplbnNlbi1zaGFubm9uIGRpdmVyZ2VuY2Vcblx0dmFyIHZpcmlkaXMgPSBbXCIjNDQwMTU0XCIsXCIjNDQwMjU2XCIsXCIjNDUwNDU3XCIsXCIjNDUwNTU5XCIsXCIjNDYwNzVhXCIsXCIjNDYwODVjXCIsXCIjNDYwYTVkXCIsXCIjNDYwYjVlXCIsXCIjNDcwZDYwXCIsXCIjNDcwZTYxXCIsXCIjNDcxMDYzXCIsXCIjNDcxMTY0XCIsXCIjNDcxMzY1XCIsXCIjNDgxNDY3XCIsXCIjNDgxNjY4XCIsXCIjNDgxNzY5XCIsXCIjNDgxODZhXCIsXCIjNDgxYTZjXCIsXCIjNDgxYjZkXCIsXCIjNDgxYzZlXCIsXCIjNDgxZDZmXCIsXCIjNDgxZjcwXCIsXCIjNDgyMDcxXCIsXCIjNDgyMTczXCIsXCIjNDgyMzc0XCIsXCIjNDgyNDc1XCIsXCIjNDgyNTc2XCIsXCIjNDgyNjc3XCIsXCIjNDgyODc4XCIsXCIjNDgyOTc5XCIsXCIjNDcyYTdhXCIsXCIjNDcyYzdhXCIsXCIjNDcyZDdiXCIsXCIjNDcyZTdjXCIsXCIjNDcyZjdkXCIsXCIjNDYzMDdlXCIsXCIjNDYzMjdlXCIsXCIjNDYzMzdmXCIsXCIjNDYzNDgwXCIsXCIjNDUzNTgxXCIsXCIjNDUzNzgxXCIsXCIjNDUzODgyXCIsXCIjNDQzOTgzXCIsXCIjNDQzYTgzXCIsXCIjNDQzYjg0XCIsXCIjNDMzZDg0XCIsXCIjNDMzZTg1XCIsXCIjNDIzZjg1XCIsXCIjNDI0MDg2XCIsXCIjNDI0MTg2XCIsXCIjNDE0Mjg3XCIsXCIjNDE0NDg3XCIsXCIjNDA0NTg4XCIsXCIjNDA0Njg4XCIsXCIjM2Y0Nzg4XCIsXCIjM2Y0ODg5XCIsXCIjM2U0OTg5XCIsXCIjM2U0YTg5XCIsXCIjM2U0YzhhXCIsXCIjM2Q0ZDhhXCIsXCIjM2Q0ZThhXCIsXCIjM2M0ZjhhXCIsXCIjM2M1MDhiXCIsXCIjM2I1MThiXCIsXCIjM2I1MjhiXCIsXCIjM2E1MzhiXCIsXCIjM2E1NDhjXCIsXCIjMzk1NThjXCIsXCIjMzk1NjhjXCIsXCIjMzg1ODhjXCIsXCIjMzg1OThjXCIsXCIjMzc1YThjXCIsXCIjMzc1YjhkXCIsXCIjMzY1YzhkXCIsXCIjMzY1ZDhkXCIsXCIjMzU1ZThkXCIsXCIjMzU1ZjhkXCIsXCIjMzQ2MDhkXCIsXCIjMzQ2MThkXCIsXCIjMzM2MjhkXCIsXCIjMzM2MzhkXCIsXCIjMzI2NDhlXCIsXCIjMzI2NThlXCIsXCIjMzE2NjhlXCIsXCIjMzE2NzhlXCIsXCIjMzE2ODhlXCIsXCIjMzA2OThlXCIsXCIjMzA2YThlXCIsXCIjMmY2YjhlXCIsXCIjMmY2YzhlXCIsXCIjMmU2ZDhlXCIsXCIjMmU2ZThlXCIsXCIjMmU2ZjhlXCIsXCIjMmQ3MDhlXCIsXCIjMmQ3MThlXCIsXCIjMmM3MThlXCIsXCIjMmM3MjhlXCIsXCIjMmM3MzhlXCIsXCIjMmI3NDhlXCIsXCIjMmI3NThlXCIsXCIjMmE3NjhlXCIsXCIjMmE3NzhlXCIsXCIjMmE3ODhlXCIsXCIjMjk3OThlXCIsXCIjMjk3YThlXCIsXCIjMjk3YjhlXCIsXCIjMjg3YzhlXCIsXCIjMjg3ZDhlXCIsXCIjMjc3ZThlXCIsXCIjMjc3ZjhlXCIsXCIjMjc4MDhlXCIsXCIjMjY4MThlXCIsXCIjMjY4MjhlXCIsXCIjMjY4MjhlXCIsXCIjMjU4MzhlXCIsXCIjMjU4NDhlXCIsXCIjMjU4NThlXCIsXCIjMjQ4NjhlXCIsXCIjMjQ4NzhlXCIsXCIjMjM4ODhlXCIsXCIjMjM4OThlXCIsXCIjMjM4YThkXCIsXCIjMjI4YjhkXCIsXCIjMjI4YzhkXCIsXCIjMjI4ZDhkXCIsXCIjMjE4ZThkXCIsXCIjMjE4ZjhkXCIsXCIjMjE5MDhkXCIsXCIjMjE5MThjXCIsXCIjMjA5MjhjXCIsXCIjMjA5MjhjXCIsXCIjMjA5MzhjXCIsXCIjMWY5NDhjXCIsXCIjMWY5NThiXCIsXCIjMWY5NjhiXCIsXCIjMWY5NzhiXCIsXCIjMWY5ODhiXCIsXCIjMWY5OThhXCIsXCIjMWY5YThhXCIsXCIjMWU5YjhhXCIsXCIjMWU5Yzg5XCIsXCIjMWU5ZDg5XCIsXCIjMWY5ZTg5XCIsXCIjMWY5Zjg4XCIsXCIjMWZhMDg4XCIsXCIjMWZhMTg4XCIsXCIjMWZhMTg3XCIsXCIjMWZhMjg3XCIsXCIjMjBhMzg2XCIsXCIjMjBhNDg2XCIsXCIjMjFhNTg1XCIsXCIjMjFhNjg1XCIsXCIjMjJhNzg1XCIsXCIjMjJhODg0XCIsXCIjMjNhOTgzXCIsXCIjMjRhYTgzXCIsXCIjMjVhYjgyXCIsXCIjMjVhYzgyXCIsXCIjMjZhZDgxXCIsXCIjMjdhZDgxXCIsXCIjMjhhZTgwXCIsXCIjMjlhZjdmXCIsXCIjMmFiMDdmXCIsXCIjMmNiMTdlXCIsXCIjMmRiMjdkXCIsXCIjMmViMzdjXCIsXCIjMmZiNDdjXCIsXCIjMzFiNTdiXCIsXCIjMzJiNjdhXCIsXCIjMzRiNjc5XCIsXCIjMzViNzc5XCIsXCIjMzdiODc4XCIsXCIjMzhiOTc3XCIsXCIjM2FiYTc2XCIsXCIjM2JiYjc1XCIsXCIjM2RiYzc0XCIsXCIjM2ZiYzczXCIsXCIjNDBiZDcyXCIsXCIjNDJiZTcxXCIsXCIjNDRiZjcwXCIsXCIjNDZjMDZmXCIsXCIjNDhjMTZlXCIsXCIjNGFjMTZkXCIsXCIjNGNjMjZjXCIsXCIjNGVjMzZiXCIsXCIjNTBjNDZhXCIsXCIjNTJjNTY5XCIsXCIjNTRjNTY4XCIsXCIjNTZjNjY3XCIsXCIjNThjNzY1XCIsXCIjNWFjODY0XCIsXCIjNWNjODYzXCIsXCIjNWVjOTYyXCIsXCIjNjBjYTYwXCIsXCIjNjNjYjVmXCIsXCIjNjVjYjVlXCIsXCIjNjdjYzVjXCIsXCIjNjljZDViXCIsXCIjNmNjZDVhXCIsXCIjNmVjZTU4XCIsXCIjNzBjZjU3XCIsXCIjNzNkMDU2XCIsXCIjNzVkMDU0XCIsXCIjNzdkMTUzXCIsXCIjN2FkMTUxXCIsXCIjN2NkMjUwXCIsXCIjN2ZkMzRlXCIsXCIjODFkMzRkXCIsXCIjODRkNDRiXCIsXCIjODZkNTQ5XCIsXCIjODlkNTQ4XCIsXCIjOGJkNjQ2XCIsXCIjOGVkNjQ1XCIsXCIjOTBkNzQzXCIsXCIjOTNkNzQxXCIsXCIjOTVkODQwXCIsXCIjOThkODNlXCIsXCIjOWJkOTNjXCIsXCIjOWRkOTNiXCIsXCIjYTBkYTM5XCIsXCIjYTJkYTM3XCIsXCIjYTVkYjM2XCIsXCIjYThkYjM0XCIsXCIjYWFkYzMyXCIsXCIjYWRkYzMwXCIsXCIjYjBkZDJmXCIsXCIjYjJkZDJkXCIsXCIjYjVkZTJiXCIsXCIjYjhkZTI5XCIsXCIjYmFkZTI4XCIsXCIjYmRkZjI2XCIsXCIjYzBkZjI1XCIsXCIjYzJkZjIzXCIsXCIjYzVlMDIxXCIsXCIjYzhlMDIwXCIsXCIjY2FlMTFmXCIsXCIjY2RlMTFkXCIsXCIjZDBlMTFjXCIsXCIjZDJlMjFiXCIsXCIjZDVlMjFhXCIsXCIjZDhlMjE5XCIsXCIjZGFlMzE5XCIsXCIjZGRlMzE4XCIsXCIjZGZlMzE4XCIsXCIjZTJlNDE4XCIsXCIjZTVlNDE5XCIsXCIjZTdlNDE5XCIsXCIjZWFlNTFhXCIsXCIjZWNlNTFiXCIsXCIjZWZlNTFjXCIsXCIjZjFlNTFkXCIsXCIjZjRlNjFlXCIsXCIjZjZlNjIwXCIsXCIjZjhlNjIxXCIsXCIjZmJlNzIzXCIsXCIjZmRlNzI1XCJdO1xuXHR2YXIgc3BlY3RyYWw4ID0gWycjZDUzZTRmJywgJyNmNDZkNDMnLCAnI2ZkYWU2MScsICcjZmVlMDhiJywgJyNlNmY1OTgnLCAnI2FiZGRhNCcsICcjNjZjMmE1JywgJyMzMjg4YmQnXTtcblx0dmFyIHJhaW5ib3cgPSBbXCIjMmM3YmI2XCIsIFwiIzAwYTZjYVwiLFwiIzAwY2NiY1wiLFwiIzkwZWI5ZFwiLFwiI2ZmZmY4Y1wiLCBcIiNmOWQwNTdcIixcIiNmMjllMmVcIixcIiNlNzY4MThcIixcIiNkNzE5MWNcIl1cblx0c2VsZi5KU0RDb2xvclNjYWxlID0gZDMuc2NhbGUubGluZWFyKClcblx0XHQuZG9tYWluKGQzLmV4dGVudChzZWxmLm5vdEVnb05vZGVzLCBmdW5jdGlvbihkKSB7cmV0dXJuIGQuanNfZGl2O30pKVxuXHRcdC5yYW5nZShbXCJyZWRcIiwgXCJibHVlXCJdKTtcblx0c2VsZi5DbHVzdGVyRGlzdGFuY2VDb2xvclNjYWxlID0gZDMuc2NhbGUubGluZWFyKClcblx0XHQuZG9tYWluKGQzLmV4dGVudChzZWxmLm5vdEVnb05vZGVzLCBmdW5jdGlvbihkKSB7cmV0dXJuIGQuYXZlcmFnZV9jbHVzdGVyX2Rpc3RhbmNlX3RvX2NlbnRlcjt9KSlcblx0XHQucmFuZ2Uoc3BlY3RyYWw4KTtcblxuICAgIC8vIE9wYWNpdHkgdmFsdWVzXG4gICAgc2VsZi5vcGFjaXR5VmFscyA9IHtcblx0XHRub2RlOiAxLCBcblx0XHRub2RlUHJldlllYXI6IC42LFxuXHRcdGxpbmtUb0VnbzogLjEyLFxuXHRcdGxpbmtOb3RUb0VnbzogLjEyLFxuXHRcdGxpbmtQcmV2WWVhcjogLjA0XG5cdH07XG5cblx0c2VsZi5kb0Fubm90YXRpb25zID0gZmFsc2U7XG5cbiAgICBzZWxmLmFuaW1hdGlvblN0YXRlOyAgLy8gXCJmb3J3YXJkXCIsIFwicmV3aW5kXCIsIFwic3RvcHBlZFwiXG5cdHNlbGYudHJhbnNpdGlvblRpbWVQZXJZZWFyOyAvLyBpbXBvcnRlZCBpbiBpbXBvcnREZWZhdWx0T3B0aW9ucyBiZWxvd1xuXHQvLyBzZWxmLnRyYW5zaXRpb25UaW1lUGVyTm9kZSA9IDEwMDsgIC8vIFRFU1Rcblx0c2VsZi50cmFuc2l0aW9uVGltZVBlck5vZGU7IC8vIGNhbGN1bGF0ZWQgaW4gY2FsY3VsYXRlVHJhbnNpdGlvblRpbWUoKVxuICAgIC8vIHNlbGYubm9kZUFwcGVhckR1cmF0aW9uID0gc2VsZi50cmFuc2l0aW9uVGltZVBlck5vZGUgKiA0O1xuXHQvLyBJIGhhdmVuJ3QgYWN0dWFsbHkgZ290dGVuIGl0IHRvIHdvcmsgaGF2aW5nIGRpZmZlcmVudCB0cmFuc2l0aW9uVGltZVBlck5vZGUgYW5kIG5vZGVBcHBlYXJEdXJhdGlvblxuXHRzZWxmLmxpbmtBcHBlYXJEdXJhdGlvbiA9IDUwMDtcbiAgICBzZWxmLmN1cnJOb2RlSW5kZXg7ICAvLyBJbmRleCBvZiBub2RlIGN1cnJlbnRseSBiZWluZyBhbm5vdGF0ZWRcbiAgICBzZWxmLmRlc3RpbmF0aW9uTm9kZUluZGV4OyAgLy8gSW5kZXggb2Ygbm9kZSB0byB3aGljaCB0aGUgYW5pbWF0aW9uIGlzIGN1cnJlbnRseSBtb3ZpbmdcbiAgICBzZWxmLmRlc3RpbmF0aW9uWWVhcjtcbiAgICBzZWxmLmN1cnJZZWFyO1xuXG5cdC8vIHNlbGYuZGVzdGluYXRpb25Ob2RlSW5kZXggPSAyMDA7ICAvLyBURVNUXG5cdHNlbGYuZGVzdGluYXRpb25Ob2RlSW5kZXggPSBzZWxmLmRhdGEubm9kZXMubGVuZ3RoLTE7ICAvLyBURVNUXG5cblx0Ly90ZXN0aW5nXG5cdHNlbGYuYyA9IDA7XG5cdHNlbGYudHQgPSAwO1xuXG5cdC8vIHNlbGYuaW5pdCgpO1xuXG5cdHJldHVybiBzZWxmO1xuXG59XG5cbmVnb0dyYXBoVmlzLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblxuICAgIHNlbGYudGljayA9IHNlbGYubWFrZVRpY2soKTtcbiAgICBzZWxmLmZvcmNlID0gc2VsZi5tYWtlRm9yY2UoKTtcblx0aWYgKHNlbGYuem9vbWFibGUgPT09IHRydWUpIHtcblx0XHRzZWxmLnpvb20gPSBzZWxmLm1ha2Vab29tKCk7XG5cdH1cbiAgICAvLyBzZWxmLmRyYWcgPSBzZWxmLm1ha2VEcmFnKCk7XG5cdFxuXHRzZWxmLmFuaW1hdGlvblN0YXRlID0gJ2luaXQnO1xuXG5cdHNlbGYuZ2V0RG9tYWluc1RoaXNHcmFwaCgpO1xuXG5cdHNlbGYuc3ZnID0gZDMuc2VsZWN0KCcjZ3JhcGhEaXYnKS5hcHBlbmQoJ3N2ZycpXG5cdFx0LmF0dHIoJ2lkJywgJ2dyYXBoU3ZnJylcblx0XHQuYXR0cignd2lkdGgnLCBzZWxmLmdyYXBoRGltZW5zaW9ucy53aWR0aClcblx0XHQuYXR0cignaGVpZ2h0Jywgc2VsZi5ncmFwaERpbWVuc2lvbnMuaGVpZ2h0KTtcblxuXHRzZWxmLnRpcCA9IGQzLnRpcCgpXG5cdFx0LmF0dHIoJ2NsYXNzJywgJ2QzLXRpcCcpXG5cdFx0LnN0eWxlKCdjdXJzb3InLCAnZGVmYXVsdCcpXG5cdFx0LnN0eWxlKCdib3JkZXItc3R5bGUnLCAnc29saWQnKVxuXHRcdC8vIC5zdHlsZSgnYm9yZGVyLWNvbG9yJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5jb2xvcjsgfSlcblx0XHQuc3R5bGUoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKTtcblx0Ly8gc2VsZi5zdmcuY2FsbChzZWxmLnRpcCk7XG5cbiAgICBzZWxmLmdyb3VwID0gc2VsZi5zdmcuYXBwZW5kKCdnJylcblx0XHQgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZ3JhcGhDb250YWluZXInKVxuICAgIHNlbGYubGluayA9IHNlbGYuZ3JvdXAuYXBwZW5kKCdzdmc6ZycpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaW5rcycpXG4gICAgICAgICAgICAgICAgICAgIC5zZWxlY3RBbGwoJy5saW5rJyk7XG4gICAgc2VsZi5ub2RlID0gc2VsZi5ncm91cC5hcHBlbmQoJ3N2ZzpnJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ25vZGVzJylcbiAgICAgICAgICAgICAgICAgICAgLnNlbGVjdEFsbCgnLm5vZGUnKTtcblx0XG4gICAgLy8gSW5pdGlhbGl6ZSB0b29sdGlwIGZvciBub2RlcyAod2hpY2ggd2lsbCBiZSB2aXNpYmxlIG9uIG1vdXNlb3ZlciBvZiBub2RlcylcbiAgICBzZWxmLnRvb2x0aXAgPSBkMy5zZWxlY3QoJ2JvZHknKVxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbm9kZVRvb2x0aXAnKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJylcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCd3aWR0aCcsIHNlbGYuZ3JhcGhEaW1lbnNpb25zLndpZHRoIC8gNCArICdweCcpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnei1pbmRleCcsICcxMCcpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcblxuXHQvLyBBZGQgc3BlY2lhbCBwcm9wZXJ0aWVzIHRvIHRoZSBlZ28gbm9kZTpcblx0c2VsZi5kYXRhLm5vZGVzWzBdLmZpeGVkID0gdHJ1ZTtcblx0Ly8gcG9zaXRpb24gaW4gY2VudGVyXG5cdHNlbGYuZGF0YS5ub2Rlc1swXS54ID0gc2VsZi5ncmFwaERpbWVuc2lvbnMud2lkdGgvMjtcblx0c2VsZi5kYXRhLm5vZGVzWzBdLnkgPSBzZWxmLmdyYXBoRGltZW5zaW9ucy5oZWlnaHQvMjtcblx0Ly8gc2VsZi5kYXRhLm5vZGVzWzBdLmNvbG9yID0gc2VsZi5jb2xvclNjaGVtZVswXTtcblx0c2VsZi5kYXRhLm5vZGVzWzBdLmNvbG9yID0gc2VsZi5KU0RDb2xvclNjYWxlKDApO1xuXHRzZWxmLmVnb05vZGUgPSBzZWxmLmRhdGEubm9kZXNbMF07XG5cdFxuXHQvLyBTZXQgdXAgYSBzY2FsZSBmb3IgRWlnZW5mYWN0b3IgaW4gb3JkZXIgdG8gZW5jb2RlIHNpemUgb2Ygbm9kZXMgYnkgRWlnZW5mYWN0b3IgKGluZmx1ZW5jZSlcblx0dmFyIGVpZ2VuRmFjdG9yTWF4ID0gZDMubWF4KHNlbGYuZGF0YS5ub2RlcywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5FRjsgfSk7XG5cdHNlbGYuZWlnZW5GYWN0b3JTY2FsZSA9IGQzLnNjYWxlLmxpbmVhcigpXG5cdFx0LmRvbWFpbihbMCwgZWlnZW5GYWN0b3JNYXhdKVxuXHRcdC5yYW5nZShbMCwgMV0pO1xuXHRzZWxmLmRhdGEubm9kZXMuZm9yRWFjaChmdW5jdGlvbihkKSB7XG5cdFx0aWYgKGQubm9kZVR5cGUgPT09ICdwYXBlcicpIHtcblx0XHRcdGQucmFkaXVzID0gNC41ICsgKHNlbGYuZWlnZW5GYWN0b3JTY2FsZShkLkVGKSAqIDEwKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZC5yYWRpdXMgPSAxMDtcblx0XHR9XG5cdH0pO1xuXG4gICAgLy8gYWRkIGdyYXBoIHByb3BlcnRpZXNcblx0c2VsZi5mb3JjZS5ub2RlcyhzZWxmLmRhdGEubm9kZXMpO1xuXHRcbiAgICAvLyB1cGRhdGUgbm9kZSBlbGVtZW50c1xuICAgIHNlbGYubm9kZSA9IHNlbGYubm9kZS5kYXRhKHNlbGYuZGF0YS5ub2Rlcyk7XG4gICAgLy9zZWxmLm5vZGUuZXhpdCgpLnJlbW92ZSgpO1xuICAgIHZhciBuZXdOb2RlID0gc2VsZi5ub2RlLmVudGVyKCk7XG5cbiAgICBuZXdOb2RlID0gbmV3Tm9kZS5hcHBlbmQoJ3N2ZzpjaXJjbGUnKVxuXHRcdC8vdGVzdFxuXHRcdC5hdHRyKCdjbGFzcycsICdub2RlJylcblx0XHQvLyBhZGQgY2xhc3MgZm9yIHRoZSBjZW50ZXIgbm9kZVxuXHRcdC5jbGFzc2VkKCdjZW50ZXJOb2RlJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5pZCA9PT0gc2VsZi5lZ29Ob2RlLmlkOyB9KVxuXHRcdC5hdHRyKCdyJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5yYWRpdXM7IH0pXG4gICAgICAgIC8vIC5hdHRyKCdjbGFzcycsICdub2RlIGhpZGRlbicpXG4gICAgICAgIC8vIFwiVFwiIGF0dHJpYnV0ZSB3aWxsIGtlZXAgdHJhY2sgb2YgdGhlIHRyYW5zaXRpb24gdGltZSBlbGFwc2VkXG4gICAgICAgIC5hdHRyKCdUJywgMClcbiAgICAgICAgLy8gU3RhcnQgd2l0aCB0aGUgbm9kZSBpbnZpc2libGVcbiAgICAgICAgLmF0dHIoJ3InLDFlLTkpXG5cdFx0LmVhY2goZnVuY3Rpb24oZCkge1xuXHRcdFx0ZC5Eb21haW5OYW1lID0gc2VsZi5kYXRhLmdyYXBoLkRvbWFpbnNbZC5Eb21haW5JRF07XG5cdFx0XHQvLyBmb3IgKHZhciBpPTA7IGk8c2VsZi5kb21haW5zVGhpc0dyYXBoLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHQvLyBcdHZhciB0aGlzRG9tYWluID0gc2VsZi5kb21haW5zVGhpc0dyYXBoW2ldLmtleVxuXHRcdFx0Ly8gXHRpZiAodGhpc0RvbWFpbj09ZC5Eb21haW5JRCkge1xuXHRcdFx0Ly8gXHRcdC8vIHZhciB0aGlzQ29sb3IgPSBzZWxmLmNvbG9yU2NoZW1lW2ldO1xuXHRcdFx0Ly8gXHRcdHZhciB0aGlzQ29sb3IgPSBzZWxmLmRvbWFpbnNUaGlzR3JhcGhbaV0uY29sb3I7XG5cdFx0XHQvLyBcdFx0ZC5jb2xvciA9IHRoaXNDb2xvcjtcblx0XHRcdC8vIFx0fVxuXHRcdFx0Ly8gfVxuXHRcdFx0Ly8gZC5jb2xvciA9IHNlbGYuSlNEQ29sb3JTY2FsZShkLmpzX2Rpdik7XG5cdFx0XHQvLyBkLmNvbG9yID0gc2VsZi5DbHVzdGVyRGlzdGFuY2VDb2xvclNjYWxlKGQuYXZlcmFnZV9jbHVzdGVyX2Rpc3RhbmNlX3RvX2NlbnRlcik7XG5cblx0XHRcdC8vIGQuY29sb3IgPSBzZWxmLmNvbG9yU2NoZW1lW2QuZm9zX2ttZWFuc19jYXRlZ29yeV07XG5cdFx0XHRkLmNvbG9yID0gc2VsZi5jb2xvclNjaGVtZVtkLnRmaWRmX2ttZWFuc19jYXRlZ29yeV07XG5cdFx0fSlcbiAgICAgICAgLy8gQ29sb3IgYnkgZGlmZmVyZW50IGNhdGVnb3JpZXMgb2YgaG93IHNpbWlsYXIgdGhlIG5vZGUncyBjbHVzdGVyIGlzIHRvIHRoZSBlZ28gbm9kZVxuICAgICAgICAuYXR0cignZmlsbCcsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIC8vIGNvbG9yIHRoZSBub2RlcyBiYXNlZCBvbiBEb21haW5JRFxuXHRcdFx0cmV0dXJuIGQuY29sb3JcbiAgICAgICAgfSlcbiAgICAgICAgLnN0eWxlKCdvcGFjaXR5Jywgc2VsZi5vcGFjaXR5VmFscy5ub2RlKTtcblxuICAgIG5ld05vZGUuY2FsbChzZWxmLmZvcmNlLmRyYWcpO1xuXG5cdC8vIHNlbGYuZWdvTm9kZSA9IHNlbGYubm9kZS5maWx0ZXIoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5pZHggPT09IDA7IH0pO1xuXHRcbiAgICAvLyB1cGRhdGUgbGluayBlbGVtZW50c1xuXHRzZWxmLmZvcmNlLmxpbmtzKHNlbGYuZGF0YS5saW5rcyk7XG5cbiAgICBzZWxmLmxpbmsgPSBzZWxmLmxpbmsuZGF0YShzZWxmLmRhdGEubGlua3MpO1xuICAgIC8vc2VsZi5saW5rLmV4aXQoKS5yZW1vdmUoKTtcblx0dmFyIG5ld0xpbmsgPSBzZWxmLmxpbmtcblx0XHQuZW50ZXIoKVxuXHRcdC5hcHBlbmQoJ3N2ZzpsaW5lJylcblx0XHQuYXR0cignY2xhc3MnLCBmdW5jdGlvbihkKSB7XG5cdFx0XHQvLyBpZiAoZC50YXJnZXQgPT09IDApIHsgcmV0dXJuICdsaW5rIHRvRWdvIGxpbmtUb0Vnbyc7IH1cblx0XHRcdC8vIGVsc2UgeyByZXR1cm4gJ2xpbmsgbm90VG9FZ28gbGlua05vdFRvRWdvJzsgfVxuXHRcdFx0aWYgKGQudGFyZ2V0ID09PSAwKSB7IHJldHVybiAnbGluayBoaWRkZW4gdG9FZ28gbGlua1RvRWdvJzsgfVxuXHRcdFx0ZWxzZSB7IHJldHVybiAnbGluayBoaWRkZW4gbm90VG9FZ28gbGlua05vdFRvRWdvJzsgfVxuXHRcdH0pXG5cdFx0Ly8gXCJUXCIgYXR0cmlidXRlIHdpbGwga2VlcCB0cmFjayBvZiB0aGUgdHJhbnNpdGlvbiB0aW1lIGVsYXBzZWRcblx0XHQuYXR0cignVCcsIDApXG5cdFx0Ly8gTGlua3MgdG8gdGhlIGVnbyBub2RlIGFyZSBkYXJrZXIgdGhhbiBsaW5rcyBiZXR3ZWVuIHRoZSBvdGhlcnNcblx0XHQuc3R5bGUoJ29wYWNpdHknLCBmdW5jdGlvbihkKSB7XG5cdFx0XHR2YXIgb3BWYWxzID0gc2VsZi5vcGFjaXR5VmFscztcblx0XHRcdGlmIChkLmxpbmtUb0Vnbykge1xuXHRcdFx0XHRyZXR1cm4gb3BWYWxzLmxpbmtUb0Vnbztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBvcFZhbHMubGlua05vdFRvRWdvO1xuXHRcdFx0fVxuXHRcdFx0Ly8gcmV0dXJuIC41O1xuXHRcdFx0Ly8gaWYgKGQudGFyZ2V0ID09PSAwKSB7IHJldHVybiBzZWxmLmdyYXBoUGFyYW1zLm9wYWNpdHlWYWxzLnZhbHVlLmxpbmtUb0VnbzsgfVxuXHRcdFx0Ly8gZWxzZSB7IHJldHVybiBzZWxmLmdyYXBoUGFyYW1zLm9wYWNpdHlWYWxzLnZhbHVlLmxpbmtOb3RUb0VnbzsgfVxuXHRcdH0pO1xuXG5cdGZ1bmN0aW9uIHBsYWNlTm9kZXMoKSB7XG5cdFx0Ly8gVGhpcyBmdW5jdGlvbiB3aWxsIGRldGVybWluZSB0aGUgZmluYWwgc3BhdGlhbCBwbGFjZW1lbnQgb2YgYWxsIG9mIHRoZSBub2Rlcy5cblxuXHRcdHN3aXRjaCAoc2VsZi5ub2RlUGxhY2VtZW50KSB7XG5cdFx0XHRjYXNlIHNlbGYubm9kZVBsYWNlbWVudE9wdGlvbnNbMF06XG5cdFx0XHRcdC8vIFBsYWNlIHRoZSBub2RlcyB1c2luZyB0aGUgZm9yY2UgbGF5b3V0LlxuXHRcdFx0XHQvLyBVc2VzIHRoZSBmb3JjZSBsYXlvdXQgcGFyYW1ldGVycyBpbiBzZWxmLm1ha2VGb3JjZVxuXHRcdFx0XHRzZWxmLmZvcmNlLnN0YXJ0KCk7XG5cdFx0XHRcdC8vIEV4ZWN1dGUgZm9yY2UgYSBiaXQsIHRoZW4gc3RvcFxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaTwxMDAwMDA7ICsraSkgc2VsZi5mb3JjZS50aWNrKCk7XG5cdFx0XHRcdHNlbGYuZm9yY2Uuc3RvcCgpO1xuXHRcdFx0XHRuZXdOb2RlLmVhY2goZnVuY3Rpb24oZCkgeyBkLmZpeGVkID0gdHJ1ZTsgfSk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIHNlbGYubm9kZVBsYWNlbWVudE9wdGlvbnNbMV06XG5cdFx0XHRcdC8vIFBsYWNlIHRoZSBub2RlcyBpbiBzcGlyYWwgZm9ybWF0aW9uLlxuXHRcdFx0XHR2YXIgY3ggPSBzZWxmLmVnb05vZGUueCxcblx0XHRcdCAgICAgICAgY3kgPSBzZWxmLmVnb05vZGUueSxcblx0XHRcdCAgICAgICAgLy8gaW5pdGlhbFJhZCA9IDYwO1xuXHRcdFx0ICAgICAgICBpbml0aWFsUmFkID0gMjA7XG5cdFx0XHRcdHZhciBudW1Ob2RlcyA9IHNlbGYuZGF0YS5ub2Rlcy5sZW5ndGg7XG5cdFx0XHRcdC8vIGNvbnNvbGUubG9nKG51bU5vZGVzKTtcblx0XHRcdFx0bmV3Tm9kZS5lYWNoKGZ1bmN0aW9uKGQsIGkpIHtcblx0XHRcdFx0XHRpZiAoZC5pZHggIT0gMCkge1xuXHRcdFx0XHRcdFx0ZC5maXhlZCA9IHRydWU7XG5cdFx0XHRcdFx0XHQvLyB2YXIgdGhpc1JhZCA9IGkgKiAyICsgaW5pdGlhbFJhZDtcblx0XHRcdFx0XHRcdC8vIHZhciB0aGlzU3BhY2luZyA9IGkgKiAoTWF0aC5QSS8oOC41Ky4xKmkpKTtcblxuXHRcdFx0XHRcdFx0dmFyIHRoaXNSYWQgPSBNYXRoLnBvdyhpLCAxKSAqIC45NSArIGluaXRpYWxSYWQ7XG5cdFx0XHRcdFx0XHR2YXIgdGhpc1NwYWNpbmcgPSBpICogKE1hdGguUEkvKDguNSsuMDUqaSkpO1xuXHRcdFx0XHRcdFx0ZC54ID0gY3ggKyAodGhpc1JhZCAqIE1hdGguY29zKHRoaXNTcGFjaW5nKSk7XG5cdFx0XHRcdFx0XHRkLnkgPSBjeSArICh0aGlzUmFkICogTWF0aC5zaW4odGhpc1NwYWNpbmcpKTtcblx0XHRcdFx0XHRcdC8vIHZhciBhbmdsZSA9IDAuMSAqIGk7XG5cdFx0XHRcdFx0XHQvLyBkLnggPSBjeCArIHRoaXNSYWQgKiBNYXRoLmNvcyhhbmdsZSk7XG5cdFx0XHRcdFx0XHQvLyBkLnkgPSBjeSArIHRoaXNSYWQgKiBNYXRoLnNpbihhbmdsZSk7XG5cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRzZWxmLmZvcmNlLnN0YXJ0KCk7XG5cdFx0XHRcdHNlbGYuZm9yY2UudGljaygpO1xuXHRcdFx0XHRzZWxmLmZvcmNlLnN0b3AoKTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2Ugc2VsZi5ub2RlUGxhY2VtZW50T3B0aW9uc1syXTpcblx0XHRcdFx0Ly8gQWx0ZXJuYXRlIHNwaXJhbCBhbGdvcml0aG1cblx0XHRcdFx0Ly9cblx0XHRcdFx0Ly8gaHR0cDovL2dhbWVkZXYuc3RhY2tleGNoYW5nZS5jb20vcXVlc3Rpb25zLzE2NzQ1L21vdmluZy1hLXBhcnRpY2xlLWFyb3VuZC1hbi1hcmNoaW1lZGVhbi1zcGlyYWwtYXQtYS1jb25zdGFudC1zcGVlZFxuXHRcdFx0XHRmdW5jdGlvbiBjb21wdXRlQW5nbGUoYWxwaGEsIGFyY0xlbmd0aCwgZXBzaWxvbikge1xuXHRcdFx0XHRcdC8vIGFscGhhOiBkaXN0YW5jZSBiZXR3ZWVuIHN1Y2Nlc3NpdmUgdHVybmluZ3Ncblx0XHRcdFx0XHQvLyBhcmNMZW5ndGg6IGRlc2lyZWQgYXJjTGVuZ3RoXG5cdFx0XHRcdFx0Ly8gZXBzaWxvbjogKHZhbHVlID4wKSBpbmRpY2F0ZXMgdGhlIHByZWNpc2lvbiBvZiB0aGUgYXBwcm94aW1hdGlvblxuXHRcdFx0XHRcdC8vIHJldHVybnM6IGFuZ2xlIGF0IHdoaWNoIHRoZSBkZXNpcmVkIGFyY0xlbmd0aCBpcyBhY2hpZXZlZFxuXHRcdFx0XHRcdHZhciBhbmdsZVJhZCA9IE1hdGguUEkgKyBNYXRoLlBJO1xuXHRcdFx0XHRcdHdoaWxlICh0cnVlKSB7XG5cdFx0XHRcdFx0XHR2YXIgZCA9IGNvbXB1dGVBcmNMZW5ndGgoYWxwaGEsIGFuZ2xlUmFkKSAtIGFyY0xlbmd0aDtcblx0XHRcdFx0XHRcdGlmIChNYXRoLmFicyhkKSA8PSBlcHNpbG9uKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBhbmdsZVJhZDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHZhciBkYSA9IGFscGhhICogTWF0aC5zcXJ0KGFuZ2xlUmFkICogYW5nbGVSYWQgKyAxKTtcblx0XHRcdFx0XHRcdGFuZ2xlUmFkID0gYW5nbGVSYWQgLSAoZCAvIGRhKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZnVuY3Rpb24gY29tcHV0ZUFyY0xlbmd0aChhbHBoYSwgYW5nbGVSYWQpIHtcblx0XHRcdFx0XHR2YXIgdSA9IE1hdGguc3FydCgxICsgYW5nbGVSYWQgKiBhbmdsZVJhZCk7XG5cdFx0XHRcdFx0dmFyIHYgPSBNYXRoLmxvZyhhbmdsZVJhZCArIHUpO1xuXHRcdFx0XHRcdHJldHVybiAwLjUgKiBhbHBoYSAqIChhbmdsZVJhZCAqIHUgKyB2KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRmdW5jdGlvbiBjb21wdXRlUG9pbnQoYWxwaGEsIGFuZ2xlUmFkKSB7XG5cdFx0XHRcdFx0dmFyIGRpc3RhbmNlID0gYW5nbGVSYWQgKiBhbHBoYTtcblx0XHRcdFx0XHR2YXIgeCA9IE1hdGguc2luKGFuZ2xlUmFkKSAqIGRpc3RhbmNlO1xuXHRcdFx0XHRcdHZhciB5ID0gTWF0aC5jb3MoYW5nbGVSYWQpICogZGlzdGFuY2U7XG5cdFx0XHRcdFx0cmV0dXJuIFt4LCB5XTtcblx0XHRcdFx0fVxuXHRcdFx0XHRmdW5jdGlvbiBnZXRBbmdsZXMobnVtTm9kZXMsIGFscGhhKSB7XG5cdFx0XHRcdFx0dmFyIHBvaW50QXJjRGlzdGFuY2UgPSA1O1xuXHRcdFx0XHRcdHZhciBlcHNpbG9uID0gLjAwMDA1O1xuXHRcdFx0XHRcdHZhciB0b3RhbEFyY0xlbmd0aCA9IDAuMDtcblx0XHRcdFx0XHR2YXIgcHJldmlvdXNBbmdsZVJhZCA9IDAuMDtcblx0XHRcdFx0XHR2YXIgYW5nbGVzID0gW107XG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDAsIGxlbiA9IG51bU5vZGVzOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdFx0XHRcdHZhciBhbmdsZVJhZCA9IGNvbXB1dGVBbmdsZShhbHBoYSwgdG90YWxBcmNMZW5ndGgsIGVwc2lsb24pO1xuXHRcdFx0XHRcdFx0YW5nbGVzLnB1c2goYW5nbGVSYWQpO1xuXHRcdFx0XHRcdFx0dG90YWxBcmNMZW5ndGggPSB0b3RhbEFyY0xlbmd0aCArIHBvaW50QXJjRGlzdGFuY2U7XG5cdFx0XHRcdFx0XHRwcmV2aW91c0FuZ2xlUmFkID0gYW5nbGVSYWQ7XG5cdFx0XHRcdFx0XHRpZiAoaT4xMCkgeyBwb2ludEFyY0Rpc3RhbmNlID0gMTA7fVxuXHRcdFx0XHRcdFx0aWYgKGk+NTApIHsgcG9pbnRBcmNEaXN0YW5jZSA9IDE1O31cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGFuZ2xlcztcblx0XHRcdFx0fVxuXHRcdFx0XHR2YXIgbnVtTm9kZXMgPSBzZWxmLmRhdGEubm9kZXMubGVuZ3RoO1xuXHRcdFx0XHR2YXIgYW5nbGVzID0gZ2V0QW5nbGVzKG51bU5vZGVzLCA3KTtcblx0XHRcdFx0Ly8gY29uc29sZS5sb2coYW5nbGVzKTtcblx0XHRcdFx0dmFyIGN4ID0gc2VsZi5lZ29Ob2RlLngsXG5cdFx0XHQgICAgICAgIGN5ID0gc2VsZi5lZ29Ob2RlLnksXG5cdFx0XHQgICAgICAgIC8vIGluaXRpYWxSYWQgPSA2MDtcblx0XHRcdCAgICAgICAgaW5pdGlhbFJhZCA9IDIwO1xuXHRcdFx0XHR2YXIgbnVtTm9kZXMgPSBzZWxmLmRhdGEubm9kZXMubGVuZ3RoO1xuXHRcdFx0XHRjb25zb2xlLmxvZyhudW1Ob2Rlcyk7XG5cdFx0XHRcdG5ld05vZGUuZWFjaChmdW5jdGlvbihkLCBpKSB7XG5cdFx0XHRcdFx0aWYgKGQuaWR4ICE9IDApIHtcblx0XHRcdFx0XHRcdGQuZml4ZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0dmFyIHRoaXNSYWQgPSBpICogMiArIGluaXRpYWxSYWQ7XG5cdFx0XHRcdFx0XHR2YXIgdGhpc1NwYWNpbmcgPSBpICogKE1hdGguUEkvKDguNSsuMSppKSk7XG5cblx0XHRcdFx0XHRcdC8vIHZhciB0aGlzUmFkID0gTWF0aC5wb3coaSwgMSkgKiAuOTUgKyBpbml0aWFsUmFkO1xuXHRcdFx0XHRcdFx0Ly8gdmFyIHRoaXNTcGFjaW5nID0gaSAqIChNYXRoLlBJLyg4LjUrLjA1KmkpKTtcblx0XHRcdFx0XHRcdC8vIGQueCA9IGN4ICsgKHRoaXNSYWQgKiBNYXRoLmNvcyh0aGlzU3BhY2luZykpO1xuXHRcdFx0XHRcdFx0Ly8gZC55ID0gY3kgKyAodGhpc1JhZCAqIE1hdGguc2luKHRoaXNTcGFjaW5nKSk7XG5cdFx0XHRcdFx0XHQvLyB2YXIgYW5nbGUgPSAwLjEgKiBpO1xuXHRcdFx0XHRcdFx0Ly8gZC54ID0gY3ggKyB0aGlzUmFkICogTWF0aC5jb3MoYW5nbGUpO1xuXHRcdFx0XHRcdFx0Ly8gZC55ID0gY3kgKyB0aGlzUmFkICogTWF0aC5zaW4oYW5nbGUpO1xuXHRcdFx0XHRcdFx0dmFyIHBvd1NjYWxlID0gZDMuc2NhbGUucG93KCkuZXhwb25lbnQoLjcpLmRvbWFpbihbMSxudW1Ob2Rlc10pLnJhbmdlKFswLDYwXSk7XG5cdFx0XHRcdFx0XHR2YXIgcG93U2NhbGUgPSBkMy5zY2FsZS5saW5lYXIoKS5kb21haW4oWzEsTWF0aC5wb3cobnVtTm9kZXMsIC4zKV0pLnJhbmdlKFswLDYwXSk7XG5cdFx0XHRcdFx0XHR2YXIgcG93U2NhbGUgPSBkMy5zY2FsZS5sb2coKS5kb21haW4oWzEwMCwgbnVtTm9kZXMrMTAwXSkucmFuZ2UoWzAsNjBdKTtcblx0XHRcdFx0XHRcdC8vIHZhciB0aGlzUG9zID0gTWF0aC5wb3coaSsxLCAuNykgKiAxO1xuXHRcdFx0XHRcdFx0Ly8gY29uc29sZS5sb2codGhpc1Bvcyk7XG5cdFx0XHRcdFx0XHR2YXIgbmV3aSA9IE1hdGgucG93KGkrMSwgLjMpO1xuXHRcdFx0XHRcdFx0dmFyIG5ld2kgPSAoaSkrMTAwO1xuXHRcdFx0XHRcdFx0dmFyIHRoaXNQb3MgPSBwb3dTY2FsZShuZXdpKTtcblx0XHRcdFx0XHRcdC8vIGNvbnNvbGUubG9nKHRoaXNQb3MpXG5cdFx0XHRcdFx0XHR2YXIgYiA9IDc7XG5cdFx0XHRcdFx0XHR2YXIgdGhpc1BvcyA9IGFuZ2xlc1tpXTtcblx0XHRcdFx0XHRcdGQueCA9IGN4ICsgKGluaXRpYWxSYWQgKyBiICogdGhpc1BvcykgKiBNYXRoLmNvcyh0aGlzUG9zKTtcblx0XHRcdFx0XHRcdGQueSA9IGN5ICsgKGluaXRpYWxSYWQgKyBiICogdGhpc1BvcykgKiBNYXRoLnNpbih0aGlzUG9zKTtcblxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdHNlbGYuZm9yY2Uuc3RhcnQoKTtcblx0XHRcdFx0c2VsZi5mb3JjZS50aWNrKCk7XG5cdFx0XHRcdHNlbGYuZm9yY2Uuc3RvcCgpO1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdH1cbiAgICBwbGFjZU5vZGVzKCk7XG5cblx0c2VsZi5sZWdlbmRJbml0KCk7XG5cdHNlbGYuYWRkQXV0aG9ySW1hZ2UoKTtcblx0c2VsZi5hZGRFdmVudExpc3RlbmVycygpO1xuXG4gICAgc2VsZi55ZWFyVGV4dERpc3BsYXkgPSBzZWxmLnN2Zy5hcHBlbmQoJ3N2Zzp0ZXh0JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCBzZWxmLmdyYXBoRGltZW5zaW9ucy53aWR0aCAqIDgvOSlcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3knLCBzZWxmLmdyYXBoRGltZW5zaW9ucy5oZWlnaHQgKiAxMi8xMylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2R5JywgJy0uM2VtJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2ZvbnQtc2l6ZScsICcxMGVtJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ2VuZCcpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgncG9pbnRlci1ldmVudHMnLCAnbm9uZScpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDFlLTkpXG5cdFx0XHRcdFx0LmF0dHIoJ2lkJywgJ2Vnb0dyYXBoVmlzX3llYXJJbmRpY2F0b3InKVxuXHRcdFx0XHRcdC50ZXh0KHNlbGYuZGF0YS5ncmFwaC55ZWFyUmFuZ2VbMF0pO1xuXG5cdHNlbGYucmV2ZWFsRWdvTm9kZSgpO1xuXG59O1xuXG5lZ29HcmFwaFZpcy5wcm90b3R5cGUubWFrZVpvb20gPSBmdW5jdGlvbiAoKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblx0cmV0dXJuIGQzLmJlaGF2aW9yLnpvb20oKVxuXHRcdC5jZW50ZXIoW3NlbGYuZ3JhcGhEaW1lbnNpb25zLndpZHRoLzIsIHNlbGYuZ3JhcGhEaW1lbnNpb25zLmhlaWdodC8yXSlcblx0XHQuc2NhbGVFeHRlbnQoWzAuMiwgMTBdKVxuXHRcdC5vbignem9vbScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0c2VsZi5ncm91cC5hdHRyKFxuXHRcdFx0XHQndHJhbnNmb3JtJyxcblx0XHRcdFx0J3RyYW5zbGF0ZSgnICsgZDMuZXZlbnQudHJhbnNsYXRlICsgJyknICtcblx0XHRcdFx0XHQnc2NhbGUoJyArIGQzLmV2ZW50LnNjYWxlICsgJyknXG5cdFx0XHQpO1xuXHRcdH0pO1xufTtcblxuZWdvR3JhcGhWaXMucHJvdG90eXBlLm1ha2VUaWNrID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAvLyBjYWNoZSBmdW5jdGlvbiBjcmVhdGlvbiBmb3IgdGlueSBvcHRpbWl6YXRpb25cbiAgICBmdW5jdGlvbiB4MShkKSB7IHJldHVybiBkLnNvdXJjZS54OyB9XG4gICAgZnVuY3Rpb24geTEoZCkgeyByZXR1cm4gZC5zb3VyY2UueTsgfVxuICAgIGZ1bmN0aW9uIHgyKGQpIHsgcmV0dXJuIGQudGFyZ2V0Lng7IH1cbiAgICBmdW5jdGlvbiB5MihkKSB7IHJldHVybiBkLnRhcmdldC55OyB9XG4gICAgLy8gZnVuY3Rpb24gdHJhbnNmb3JtKGQpIHtcbiAgICAvLyAgICAgZC54ID0gTWF0aC5tYXgoNC41LCBNYXRoLm1pbihzZWxmLmdyYXBoRGltZW5zaW9ucy53aWR0aCAtIDQuNSwgZC54KSk7XG4gICAgLy8gICAgIGQueSA9IE1hdGgubWF4KDQuNSwgTWF0aC5taW4oc2VsZi5ncmFwaERpbWVuc2lvbnMuaGVpZ2h0IC0gNC41LCBkLnkpKTtcbiAgICAvLyAgICAgcmV0dXJuICd0cmFuc2xhdGUoJyArIGQueCArICcsJyArIGQueSArICcpJztcbiAgICAvLyB9XG4gICAgZnVuY3Rpb24gdHJhbnNmb3JtKGQpIHtcblx0XHQvLyBUaGUgYmVsb3cgbGluZXMgY29uc3RyYWluIHRoZSBub2RlcyB0byBzdGF5IHdpdGhpbiB0aGUgYm91bmRzIG9mIHRoZSBvcmlnaW5hbCBkaXNwbGF5LlxuXHRcdGlmIChzZWxmLnpvb21hYmxlID09PSBmYWxzZSkge1xuXHRcdFx0ZC54ID0gTWF0aC5tYXgoNC41LCBNYXRoLm1pbihzZWxmLmdyYXBoRGltZW5zaW9ucy53aWR0aCAtIDQuNSwgZC54KSk7XG5cdFx0XHRkLnkgPSBNYXRoLm1heCg0LjUsIE1hdGgubWluKHNlbGYuZ3JhcGhEaW1lbnNpb25zLmhlaWdodCAtIDQuNSwgZC55KSk7XG5cdFx0fVxuICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgnICsgZC54ICsgJywnICsgZC55ICsgJyknO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLmxpbmtcbiAgICAgICAgICAgIC5hdHRyKCd4MScsIHgxKVxuICAgICAgICAgICAgLmF0dHIoJ3kxJywgeTEpXG4gICAgICAgICAgICAuYXR0cigneDInLCB4MilcbiAgICAgICAgICAgIC5hdHRyKCd5MicsIHkyKTtcbiAgICAgICAgc2VsZi5ub2RlXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgdHJhbnNmb3JtKTtcbiAgICB9O1xufTtcblxuZWdvR3JhcGhWaXMucHJvdG90eXBlLm1ha2VGb3JjZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgcmV0dXJuIGQzLmxheW91dC5mb3JjZSgpXG4gICAgICAgIC5zaXplKFtzZWxmLmdyYXBoRGltZW5zaW9ucy53aWR0aCwgc2VsZi5ncmFwaERpbWVuc2lvbnMuaGVpZ2h0XSlcbiAgICAgICAgLmxpbmtEaXN0YW5jZSgyMjUpXG4gICAgICAgIC8vLmxpbmtEaXN0YW5jZShmdW5jdGlvbihkKSB7IGNvbnNvbGUubG9nKHNlbGYubGRTY2woZC5zb3VyY2UuWWVhcikpOyByZXR1cm4gc2VsZi5sZFNjbChkLnNvdXJjZS5ZZWFyKSA/IDc1ICsgc2VsZi5sZFNjbChkLnNvdXJjZS5ZZWFyKSA6IDA7fSlcbiAgICAgICAgLy8ubGlua1N0cmVuZ3RoKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIHNlbGYubHNTY2woZC5zb3VyY2UuWWVhcikgPyBzZWxmLmxzU2NsKGQuc291cmNlLlllYXIpIDogMDt9KVxuICAgICAgICAvLyAuY2hhcmdlKC0xNSlcbiAgICAgICAgLy8gLmdyYXZpdHkoMC4wMylcbiAgICAgICAgLy8gLmZyaWN0aW9uKDAuOClcbiAgICAgICAgLy8gLnRoZXRhKDAuOSlcbiAgICAgICAgLy8gLmFscGhhKDAuMSlcbiAgICAgICAgLm9uKCd0aWNrJywgdGhpcy50aWNrKTtcbn07XG5cbmVnb0dyYXBoVmlzLnByb3RvdHlwZS5pbXBvcnREZWZhdWx0T3B0aW9ucyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdHNlbGYuY29sb3JTY2hlbWUgPSBvcHRpb25zLmNvbG9yU2NoZW1lO1xuXG5cdHNlbGYuZ3JhcGhEaW1lbnNpb25zID0gb3B0aW9ucy5kaW1lbnNpb25zO1xuXG5cdHNlbGYudHJhbnNpdGlvblRpbWVQZXJZZWFyID0gb3B0aW9ucy50cmFuc2l0aW9uVGltZVBlclllYXI7XG5cblx0Y29uc29sZS5sb2cob3B0aW9ucyk7XG5cbn07XG5cbi8vIFRoaXMgdmVyc2lvbiBvZiBnZXREb21haW5zVGhpc0dyYXBoIGNvdW50cyB1cCB0aGUgb2NjdXJyZW5jZXMgb2YgdGhlIGRvbWFpbnNcbi8vIHRvIGFsbG93IGZvciBhbiBcIm90aGVyXCIgY2F0ZWdvcnkuXG4vLyBJZiB3ZSdyZSB1c2luZyBwcmVkZXRlcm1pbmVkIGstbWVhbnMtYmFzZWQgY2F0ZWdvcmllcywgd2UgZG9uJ3QgbmVlZCB0aGlzLlxuLy8gU28gdXNlIHRoZSBiZWxvdyB2ZXJzaW9uIG9mIGdldERvbWFpbnNUaGlzR3JhcGggaW5zdGVhZC5cbi8vXG4vLyBlZ29HcmFwaFZpcy5wcm90b3R5cGUuZ2V0RG9tYWluc1RoaXNHcmFwaCA9IGZ1bmN0aW9uKCkge1xuLy8gXHR2YXIgc2VsZiA9IHRoaXM7XG4vL1xuLy8gXHQvLyB2YXIgZG9tYWlucyA9IHNlbGYuZGF0YS5ncmFwaC5Eb21haW5zO1xuLy8gXHQvLyB2YXIgZG9tYWlucyA9IHNlbGYuZGF0YS5ncmFwaC5mb3Nfa21lYW5zX2NhdGVnb3JpZXM7XG4vLyBcdHZhciBkb21haW5zID0gc2VsZi5kYXRhLmdyYXBoLnRpdGxlc19rbWVhbnNfY2F0ZWdvcmllcztcbi8vIFx0Y29uc29sZS5sb2coZG9tYWlucyk7XG4vL1xuLy8gXHR2YXIgbWF4RG9tYWlucyA9IHNlbGYuY29sb3JTY2hlbWUubGVuZ3RoO1xuLy8gXHRcbi8vIFx0Ly8gc2VsZi5kb21haW5zVGhpc0dyYXBoIHdpbGwgYmUgYW4gYXJyYXkgb2Yge2tleTogXCJEb21haW5JRFwiLCB2YWx1ZXM6IGNvdW50fVxuLy8gXHRzZWxmLmRvbWFpbnNUaGlzR3JhcGggPSBkMy5uZXN0KClcbi8vIFx0XHQvLyAua2V5KGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuRG9tYWluSUQ7IH0pXG4vLyBcdFx0Ly8gLmtleShmdW5jdGlvbihkKSB7IHJldHVybiBkLmZvc19rbWVhbnNfY2F0ZWdvcnk7IH0pXG4vLyBcdFx0LmtleShmdW5jdGlvbihkKSB7IHJldHVybiBkLnRpdGxlX2ttZWFuc19jYXRlZ29yeTsgfSlcbi8vIFx0XHQucm9sbHVwKGZ1bmN0aW9uKGxlYXZlcykgeyByZXR1cm4gbGVhdmVzLmxlbmd0aDsgfSlcbi8vIFx0XHQuZW50cmllcyhzZWxmLm5vdEVnb05vZGVzKTtcbi8vIFx0Ly8gc2VsZi5kb21haW5zVGhpc0dyYXBoLnNvcnQoZnVuY3Rpb24oYSxiKSB7IHJldHVybiBkMy5kZXNjZW5kaW5nKGEudmFsdWVzLCBiLnZhbHVlcyk7IH0pO1xuLy8gXHQvLyBBZGQgYSBmZXcgbW9yZSB2YXJpYWJsZXMgdG8gdGhlIGRvbWFpbnNUaGlzR3JhcGggZGF0YTpcbi8vIFx0Zm9yICh2YXIgaT0wOyBpPHNlbGYuZG9tYWluc1RoaXNHcmFwaC5sZW5ndGg7IGkrKykge1xuLy8gXHRcdC8vIHZhciBrZXkgPSArc2VsZi5kb21haW5zVGhpc0dyYXBoW2ldLmtleTtcbi8vIFx0XHR2YXIga2V5ID0gc2VsZi5kb21haW5zVGhpc0dyYXBoW2ldLmtleTtcbi8vIFx0XHRzZWxmLmRvbWFpbnNUaGlzR3JhcGhbaV0uRG9tYWluSUQgPSBrZXk7XG4vLyBcdFx0Ly8gaWYgKGk8bWF4RG9tYWlucy0xKSB7XG4vLyBcdFx0Ly8gXHRzZWxmLmRvbWFpbnNUaGlzR3JhcGhbaV0uRG9tYWluTmFtZSA9IGRvbWFpbnNba2V5XTtcbi8vIFx0XHQvLyBcdHNlbGYuZG9tYWluc1RoaXNHcmFwaFtpXS5jb2xvciA9IHNlbGYuY29sb3JTY2hlbWVbaV07XG4vLyBcdFx0Ly8gfSBlbHNlIHtcbi8vIFx0XHQvLyBcdHNlbGYuZG9tYWluc1RoaXNHcmFwaFtpXS5Eb21haW5OYW1lID0gXCJPdGhlclwiO1xuLy8gXHRcdC8vIFx0c2VsZi5kb21haW5zVGhpc0dyYXBoW2ldLmNvbG9yID0gc2VsZi5jb2xvclNjaGVtZVttYXhEb21haW5zLTFdO1xuLy8gXHRcdC8vIH1cbi8vIFx0XHRzZWxmLmRvbWFpbnNUaGlzR3JhcGhbaV0uRG9tYWluTmFtZSA9IGRvbWFpbnNba2V5XTtcbi8vIFx0XHRzZWxmLmRvbWFpbnNUaGlzR3JhcGhbaV0uY29sb3IgPSBzZWxmLmNvbG9yU2NoZW1lW2ldO1xuLy8gXHR9XG4vLyBcdGNvbnNvbGUubG9nKHNlbGYuZG9tYWluc1RoaXNHcmFwaCk7XG4vLyB9O1xuXG5lZ29HcmFwaFZpcy5wcm90b3R5cGUuZ2V0RG9tYWluc1RoaXNHcmFwaCA9IGZ1bmN0aW9uKCkge1xuXHQvLyBVc2UgdGhpcyB2ZXJzaW9uIG9mIGdldERvbWFpbnNUaGlzR3JhcGggaWYgdGhlIGNhdGVnb3JpZXMgYXJlIHByZWRldGVybWluZWQgYW5kIGRvbid0IG5lZWQgdG8gYmUgY291bnRlZC5cblx0Ly8gKFdlIGRvbid0IG5lZWQgYW4gXCJvdGhlclwiIChtaXNjZWxsYW5lb3VzKSBjYXRlZ29yeVxuXHRcblx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdHZhciBtYXhEb21haW5zID0gc2VsZi5jb2xvclNjaGVtZS5sZW5ndGg7XG5cdFxuXHR2YXIgZG9tYWlucyA9IHNlbGYuZGF0YS5ncmFwaC50ZmlkZl9rbWVhbnNfY2F0ZWdvcmllcztcblx0c2VsZi5kb21haW5zVGhpc0dyYXBoID0gW107XG5cdC8vIEFkZCBhIGZldyBtb3JlIHZhcmlhYmxlcyB0byB0aGUgZG9tYWluc1RoaXNHcmFwaCBkYXRhOlxuXHRmb3IgKHZhciBpPTA7IGk8bWF4RG9tYWluczsgaSsrKSB7XG5cdFx0c2VsZi5kb21haW5zVGhpc0dyYXBoLnB1c2goe30pO1xuXHRcdHNlbGYuZG9tYWluc1RoaXNHcmFwaFtpXS5Eb21haW5JRCA9IGk7XG5cdFx0c2VsZi5kb21haW5zVGhpc0dyYXBoW2ldLkRvbWFpbk5hbWUgPSBkb21haW5zW2ldO1xuXHRcdHNlbGYuZG9tYWluc1RoaXNHcmFwaFtpXS5jb2xvciA9IHNlbGYuY29sb3JTY2hlbWVbaV07XG5cdH1cblx0Y29uc29sZS5sb2coc2VsZi5kb21haW5zVGhpc0dyYXBoKTtcbn07XG5cbmVnb0dyYXBoVmlzLnByb3RvdHlwZS5sZWdlbmRJbml0ID0gZnVuY3Rpb24oKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblxuXHR2YXIgbWlzaW5mb0xlZ2VuZEl0ZW1zVGV4dCA9IFtcblx0XHQnY29tcHV0ZXIgc2NpZW5jZSwgZGF0YSBtaW5pbmcsIC4uLicsXG5cdFx0J3NvY2lvbG9neSwgc29jaWFsIHNjaWVuY2UsIC4uLicsXG5cdFx0J21lZGljaW5lLCBoZWFsdGgsIC4uLicsXG5cdFx0J2Vjb25vbWljcywgYnVzaW5lc3MsIC4uLicsXG5cdFx0J3BzeWNob2xvZ3ksIGNvZ25pdGlvbiwgLi4uJyxcblx0XHQncG9saXRpY2FsIHNjaWVuY2UsIC4uLicsXG5cdFx0J2Jpb2xvZ3ksIGVjb2xvZ3ksIC4uLicsXG5cdFx0J2NsaW1hdGUgY2hhbmdlLCAuLi4nLFxuXHRdO1xuXG5cdHZhciBzcXVhcmVTaXplID0gc2VsZi5ncmFwaERpbWVuc2lvbnMud2lkdGggLyA3MDtcbiAgICB2YXIgcGFkZGluZyA9IHNxdWFyZVNpemUgLyAzO1xuICAgIHZhciBzcXJQbHVzUGFkZGluZyA9IHNxdWFyZVNpemUgKyBwYWRkaW5nO1xuXG4gICAgc2VsZi5sZWdlbmQgPSBzZWxmLnN2Zy5hcHBlbmQoJ2cnKVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnbGVnZW5kJylcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJytwYWRkaW5nKycsJytwYWRkaW5nKycpJyk7XG4gICAgICAgIC8vIC5zdHlsZSgnb3BhY2l0eScsIDFlLTkpO1xuXHR2YXIgbGVnZW5kSGVhZGVyU2l6ZSA9IHNxdWFyZVNpemU7XG5cdHNlbGYubGVnZW5kLmFwcGVuZCgnc3ZnOnRleHQnKVxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgwLCAnICsgbGVnZW5kSGVhZGVyU2l6ZSArICcpJylcblx0XHQuYXR0cignY2xhc3MnLCAnZWdvR3JhcGhWaXNMZWdlbmRIZWFkZXInKVxuXHRcdC50ZXh0KCdDYXRlZ29yaWVzIOKTmCcpO1xuXG4gICAgdmFyIGxlZ2VuZEl0ZW0gPSBzZWxmLmxlZ2VuZC5zZWxlY3RBbGwoJ2cnKVxuICAgICAgICAuZGF0YShzZWxmLmRvbWFpbnNUaGlzR3JhcGgpXG4gICAgICAgIC5lbnRlcigpXG4gICAgICAgIC5hcHBlbmQoJ2cnKVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnbGVnZW5kSXRlbScpXG5cdFx0Ly8gLy8gYWRkIFwib3RoZXJcIiBjbGFzcyB0byBsYXN0IGxlZ2VuZCBpdGVtXG5cdFx0Ly8gLmNsYXNzZWQoJ290aGVyJywgZnVuY3Rpb24oZCkgeyBcblx0XHQvLyBcdHJldHVybiAoZC5Eb21haW5JRCAhPSAwICYmIGQuRG9tYWluTmFtZS50b0xvd2VyQ2FzZSgpPT1cIm90aGVyXCIpID8gdHJ1ZSA6IGZhbHNlO1xuXHRcdC8vIH0pXG4gICAgICAgIC5hdHRyKCdpZCcsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIC8vIHJldHVybiAnbGVnZW5kQ2x1c3RlcicgKyBkLmNsdXN0ZXI7IH0pXG4gICAgICAgICAgICAvLyBVc2UgRG9tYWluIGluc3RlYWQgb2YgY2x1c3RlclxuICAgICAgICAgICAgLy8gcmV0dXJuICdsZWdlbmREb21haW4nICsgZC5Eb21haW5JRC5yZXBsYWNlKFwiIFwiLCBcIlwiKTsgfSlcbiAgICAgICAgICAgIHJldHVybiAnbGVnZW5kRG9tYWluJyArIGQuRG9tYWluSUQ7IH0pXG5cdFx0Lm9uKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uKGQpIHtcblx0XHRcdGQzLnNlbGVjdEFsbChcIi5ub2RlXCIpXG5cdFx0XHRcdC5maWx0ZXIoZnVuY3Rpb24oZGQpIHtcblx0XHRcdFx0XHRyZXR1cm4gZC5jb2xvcj09ZGQuY29sb3I7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5jbGFzc2VkKFwibGVnZW5kSG92ZXJcIiwgdHJ1ZSk7XG5cblx0XHR9KVxuXHRcdC5vbihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uKGQpIHtcblx0XHRcdGQzLnNlbGVjdEFsbChcIi5ub2RlXCIpLmNsYXNzZWQoXCJsZWdlbmRIb3ZlclwiLCBmYWxzZSk7XG5cdFx0fSlcblx0XHQuYXR0cihcImRpc3BsYXlcIiwgZnVuY3Rpb24oZCwgaSkge1xuXHRcdFx0XHQvLyBoaWRlIGFsbCBcIm90aGVyXCIgZG9tYWluIG9iamVjdHMgZXhjZXB0IHRoZSBmaXJzdCBvbmVcblx0XHRcdFx0aWYgKGk8c2VsZi5jb2xvclNjaGVtZS5sZW5ndGgpIHtcblx0XHRcdFx0XHRyZXR1cm4gXCJcIjtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXR1cm4gXCJub25lXCI7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuICAgICAgICAvLyAvLyBzdGFydCBvZmYgaGlkZGVuIGlmIG5vdCB0aGUgc2FtZSBkb21haW4gYXMgdGhlIGVnbyBub2RlXG4gICAgICAgIC8vIC5zdHlsZSgnb3BhY2l0eScsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgLy8gICAgIC8vIHZhciB0aGlzVG9wQ2x1c3RlciA9IGQuY2x1c3Rlci5zcGxpdCgnOicpWzBdO1xuICAgICAgICAvLyAgICAgLy8gaWYgKHRoaXNUb3BDbHVzdGVyID09PSBlZ29Ob2RlVG9wQ2x1c3RlcikgcmV0dXJuIDE7IGVsc2UgcmV0dXJuIDA7XG4gICAgICAgIC8vICAgICBpZiAoZC5Eb21haW5JRD09PXNlbGYuZWdvTm9kZS5Eb21haW5JRCkgcmV0dXJuIDE7IGVsc2UgcmV0dXJuIDA7XG4gICAgICAgIC8vIH0pO1xuICAgIC8vIC8vIERvbid0IGhpZGUgdGhlIGxlZ2VuZCBpZiBhbm5vdGF0aW9ucyBhcmUgdHVybmVkIG9mZlxuICAgIC8vIC8vIG1heWJlIHRyeSBhIGRpZmZlcmVudCBhcHByb2FjaCBsYXRlclxuICAgIC8vIGlmICggIXNlbGYuZ3JhcGhQYXJhbXMuZG9Bbm5vdGF0aW9ucy52YWx1ZSApIGxlZ2VuZEl0ZW0uc3R5bGUoJ29wYWNpdHknLCAxKTtcblxuICAgIGxlZ2VuZEl0ZW0uYXBwZW5kKCdzdmc6cmVjdCcpXG4gICAgICAgIC5hdHRyKCd3aWR0aCcsIHNxdWFyZVNpemUpXG4gICAgICAgIC5hdHRyKCdoZWlnaHQnLCBzcXVhcmVTaXplKVxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICAgICAgLy8gcmV0dXJuICd0cmFuc2xhdGUoMCwnICsgKHNxclBsdXNQYWRkaW5nICogaSkgKyAnKSc7XG4gICAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgwLCcgKyAobGVnZW5kSGVhZGVyU2l6ZSArIHBhZGRpbmcgKyBzcXJQbHVzUGFkZGluZyAqIGkpICsgJyknO1xuICAgICAgICB9KVxuICAgICAgICAuYXR0cignZmlsbCcsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHJldHVybiBkLmNvbG9yOyB9KTtcbiAgICBzZWxmLmxlZ2VuZFRleHQgPSBsZWdlbmRJdGVtLmFwcGVuZCgnc3ZnOnRleHQnKVxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAndHJhbnNsYXRlKCcgKyAoc3FyUGx1c1BhZGRpbmcpICsgJywnICsgKGxlZ2VuZEhlYWRlclNpemUgKyBwYWRkaW5nICsgc3FyUGx1c1BhZGRpbmcgKiBpKSArICcpJztcbiAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoJ2R5JywgJzFlbScpXG4gICAgICAgIC50ZXh0KGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gJ1BhcGVycyBpbiBjYXRlZ29yeSBcIicgKyBkLkRvbWFpbk5hbWUgKyAnXCIgKGRvbWFpbiAnICsgZC5Eb21haW5JRCArICcpJztcbiAgICAgICAgICAgICAgICAvL1xuXHRcdFx0XHQvLyBpZiAoZC5Eb21haW5JRCAhPSAwICYmIGQuRG9tYWluTmFtZS50b0xvd2VyQ2FzZSgpPT1cIm90aGVyXCIpIHtcblx0XHRcdFx0Ly8gXHRyZXR1cm4gXCJQYXBlcnMgaW4gb3RoZXIgY2F0ZWdvcmllc1wiO1xuXHRcdFx0XHQvLyB9IGVsc2Uge1xuXHRcdFx0XHQvLyBcdHJldHVybiAnUGFwZXJzIGluIGNhdGVnb3J5IFwiJyArIGQuRG9tYWluTmFtZSArICdcIic7XG5cdFx0XHRcdC8vIH1cbiAgICAgICAgICAgICAgICAvL1xuXHRcdFx0XHQvLyByZXR1cm4gZC5Eb21haW5OYW1lO1xuICAgICAgICAgICAgICAgIC8vXG5cdFx0XHRcdC8vIHJldHVybiBcIkNhdGVnb3J5IFwiICsgZC5Eb21haW5JRDtcblxuXHRcdFx0XHRyZXR1cm4gJ0MnICsgaSArICcgKCcgKyBtaXNpbmZvTGVnZW5kSXRlbXNUZXh0W2ldICsgJyknO1xuICAgICAgICB9KVxuXHRcdC5zdHlsZSgnZm9udC1zaXplJywgJy45ZW0nKTtcblxuXG59O1xuXG5lZ29HcmFwaFZpcy5wcm90b3R5cGUuYWRkQXV0aG9ySW1hZ2UgPSBmdW5jdGlvbigpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXHRpZiAoc2VsZi5lZ29Ob2RlLmhhc093blByb3BlcnR5KCduYW1lJykpIHtcblx0XHRzZWxmLmVnb05vZGUuQXV0aG9yTmFtZSA9IHNlbGYuZWdvTm9kZS5uYW1lO1xuXHR9XG5cdGlmIChzZWxmLmVnb05vZGUuaGFzT3duUHJvcGVydHkoJ0F1dGhvck5hbWUnKSkge1xuXHRcdFxuXHRcdHNlbGYuYXV0aG9ySW1hZ2VEaXYgPSBzZWxmLnN2Zy5hcHBlbmQoJ2ZvcmVpZ25PYmplY3QnKS5hdHRyKCdjbGFzcycsICdleHRlcm5hbE9iamVjdCcpXG5cdFx0XHQuYXR0cigneCcsIDApXG5cdFx0XHQuYXR0cigneScsIHNlbGYuZ3JhcGhEaW1lbnNpb25zLmhlaWdodC8yIC0gNTApXG5cdFx0XHQvLyAuYXR0cignaGVpZ2h0Jywgc2VsZi5ncmFwaERpbWVuc2lvbnMuaGVpZ2h0LzUpXG5cdFx0XHQuYXR0cignaGVpZ2h0JywgJzEwMCUnKVxuXHRcdFx0LmF0dHIoJ3dpZHRoJywgc2VsZi5ncmFwaERpbWVuc2lvbnMuaGVpZ2h0LzUpXG5cdFx0XHQuYXBwZW5kKCd4aHRtbDpkaXYnKVxuXHRcdFx0LmF0dHIoJ2lkJywgJ2F1dGhvckltYWdlRGl2Jyk7XG5cdFx0c2VsZi5hdXRob3JJbWFnZURpdlxuXHRcdFx0LmFwcGVuZCgneGh0bWw6cCcpXG5cdFx0XHQuaHRtbCgnPHA+JyArIHNlbGYuZGF0YS5ub2Rlc1swXS5BdXRob3JOYW1lLmNhcGl0YWxpemUoKSArICc8L3A+Jyk7XG5cblx0XHR2YXIgYXV0aG9ySW1hZ2VDb250YWluZXIgPSBzZWxmLmF1dGhvckltYWdlRGl2XG5cdFx0XHQuYXBwZW5kKCd4aHRtbCcpXG5cdFx0XHQuYXR0cignaWQnLCAnYXV0aG9ySW1hZ2VDb250YWluZXInKTtcblxuXHRcdC8vIEFkZCBjb250ZW50IGZvciBIUkEgYXV0aG9yc1xuXHRcdHZhciBhdXRob3JPcmcgPSBzZWxmLmRhdGEubm9kZXNbMF0ub3JnYW5pemF0aW9uO1xuXHRcdGNvbnNvbGUubG9nKGF1dGhvck9yZyk7XG5cdFx0aWYgKHR5cGVvZiBhdXRob3JPcmcgIT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdGQzLnRzdihcInN0YXRpYy9oZWFsdGhyYS9vcmdzX3dpdGhfbGlua3MudHN2XCIsIGZ1bmN0aW9uKGVycm9yLCBvcmdfZGF0YSkge1xuXHRcdFx0XHRpZiAoZXJyb3IpIHRocm93IGVycm9yO1xuXHRcdFx0XHR2YXIgcHN0eWxlID0gJ3N0eWxlPVwibWFyZ2luOiAwOyBwYWRkaW5nOiAwOyBmb250LXNpemU6IC44NWVtXCInXG5cdFx0XHRcdGNvbnNvbGUubG9nKG9yZ19kYXRhKTtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDAsIGxlbiA9IG9yZ19kYXRhLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRcdFx0aWYgKG9yZ19kYXRhW2ldWydvcmdfbmFtZSddID09IGF1dGhvck9yZykge1xuXHRcdFx0XHRcdFx0dmFyIG5hbWVGcm9tVFNWID0gb3JnX2RhdGFbaV1bJ21hdGNoX25hbWUnXTtcblx0XHRcdFx0XHRcdGlmICggKHR5cGVvZiBuYW1lRnJvbVRTViAhPSAndW5kZWZpbmVkJykgJiYgKG5hbWVGcm9tVFNWICE9ICcnKSApIHtcblx0XHRcdFx0XHRcdFx0dmFyIG9yZ0xpbmsgPSBvcmdfZGF0YVtpXVsnbGluayddO1xuXHRcdFx0XHRcdFx0XHR2YXIgb3JnSW1nVXJsID0gb3JnX2RhdGFbaV1bJ2ltZ191cmwnXTtcblx0XHRcdFx0XHRcdFx0c2VsZi5hdXRob3JJbWFnZURpdlxuXHRcdFx0XHRcdFx0XHRcdC5hcHBlbmQoJ3hodG1sOnAnKVxuXHRcdFx0XHRcdFx0XHRcdC5odG1sKCc8YSBocmVmPVwiJyArIG9yZ0xpbmsgKyAnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+PHAgJyArIHBzdHlsZSArICc+JyArIG5hbWVGcm9tVFNWICsgJzwvcD4nKTtcblx0XHRcdFx0XHRcdFx0dmFyIGF1dGhvckltYWdlID0gYWRkSW1hZ2Uob3JnSW1nVXJsKTtcblx0XHRcdFx0XHRcdFx0YXV0aG9ySW1hZ2Uuc3R5bGUoJ2N1cnNvcicsICdwb2ludGVyJyk7XG5cdFx0XHRcdFx0XHRcdGF1dGhvckltYWdlLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkgeyBjb25zb2xlLmxvZyhvcmdMaW5rKTsgd2luZG93Lm9wZW4ob3JnTGluaywgJ19ibGFuaycpfSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRzZWxmLmF1dGhvckltYWdlRGl2XG5cdFx0XHRcdFx0XHRcdFx0LmFwcGVuZCgneGh0bWw6cCcpXG5cdFx0XHRcdFx0XHRcdFx0Lmh0bWwoJzxwIHN0eWxlPVwibWFyZ2luOiAwOyBwYWRkaW5nOiAwOyBmb250LXNpemU6IC44NWVtXCI+JyArIGF1dGhvck9yZyArICc8L3A+Jyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gYWRkSW1hZ2UoYXV0aG9ySW1hZ2VTcmMpIHtcblx0XHR2YXIgYXV0aG9ySW1hZ2UgPSBhdXRob3JJbWFnZUNvbnRhaW5lclxuXHRcdFx0LmFwcGVuZCgneGh0bWw6aW1nJylcblx0XHRcdC5hdHRyKCdzcmMnLCBhdXRob3JJbWFnZVNyYylcblx0XHRcdC5hdHRyKCdpZCcsICdhdXRob3JJbWFnZScpXG5cdFx0XHQuYXR0cignd2lkdGgnLCAnODVweCcpO1xuXHRcdHJldHVybiBhdXRob3JJbWFnZTtcblx0fVxuXG5cdC8vIElmIGFuIGltYWdlIFVSTCBpcyBpbmNsdWRlZCBpbiB0aGUgZGF0YTpcblx0dmFyIEF1dGhvckltZ1VybCA9IHNlbGYuZGF0YS5ub2Rlc1swXS5BdXRob3JJbWdVcmwgfHwgc2VsZi5kYXRhLm5vZGVzWzBdLkltZ1VSTDtcblx0Y29uc29sZS5sb2coQXV0aG9ySW1nVXJsKTtcblx0aWYgKHR5cGVvZiBBdXRob3JJbWdVcmwgIT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRhZGRJbWFnZShBdXRob3JJbWdVcmwpO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vIFBldyBtZXRob2Qgb2YgZ2V0dGluZyBhdXRob3IgaW1hZ2U6XG5cdC8vIFRyeSBzb21lIGZpbGVuYW1lIGV4dGVuc2lvbnMgYW5kIGF0dGVtcHQgdG8gaW5zZXJ0IHRoZSBpbWFnZVxuXHR2YXIgcGV3aWRfc3RyID0gc2VsZi5kYXRhLm5vZGVzWzBdLlBld1NjaG9sYXJJRDtcblx0aWYgKHR5cGVvZiBwZXdpZF9zdHIgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBwZXdpZF9zdHIgPSBwZXdpZF9zdHIudG9TdHJpbmcoKTtcblx0Ly8gemVyby1wYWQgdGhlIHBldyBpZFxuXHRwZXdpZF9zdHIgPSAoJzAwMCcgKyBwZXdpZF9zdHIpO1xuXHRwZXdpZF9zdHIgPSBwZXdpZF9zdHIuc3Vic3RyKHBld2lkX3N0ci5sZW5ndGgtMyk7XG5cdHZhciBmbmFtZV9yb290ID0gXCJzdGF0aWMvaW1nL3Bld19waG90b3MvXCIgKyBwZXdpZF9zdHI7XG5cdHZhciBwb3NzaWJsZUV4dGVuc2lvbnMgPSBbJy5wbmcnLCAnLmpwZycsICcuanBlZycsICcuSlBHJywgJy5KUEVHJywgJy5QTkcnXTtcblx0XG5cdC8vIHJlY3Vyc2l2ZSBmdW5jdGlvbiB0aGF0IGxvb3BzIHRocm91Z2ggdGhlIGRpZmZlcmVudCBwb3NzaWJsZSBmaWxlIGV4dGVuc2lvbnMgYWJvdmVcblx0ZnVuY3Rpb24gdHJ5SW1hZ2VGaWxlbmFtZXMoZm5hbWVfcm9vdCwgcG9zc2libGVFeHRlbnNpb25zLCBpdGVyKSB7XG5cdFx0dmFyIGF1dGhvckltYWdlRmlsZW5hbWUgPSBmbmFtZV9yb290ICsgcG9zc2libGVFeHRlbnNpb25zW2l0ZXJdO1xuXHRcdGlmIChpdGVyID49IHBvc3NpYmxlRXh0ZW5zaW9ucy5sZW5ndGgpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0JC5nZXQoYXV0aG9ySW1hZ2VGaWxlbmFtZSlcblx0XHRcdC5kb25lKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRhZGRJbWFnZShhdXRob3JJbWFnZUZpbGVuYW1lKTtcblx0XHRcdH0pLmZhaWwoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdC8vIHJlY3Vyc2Vcblx0XHRcdFx0dmFyIGMgPSBpdGVyICsgMTtcblx0XHRcdFx0dHJ5SW1hZ2VGaWxlbmFtZXMoZm5hbWVfcm9vdCwgcG9zc2libGVFeHRlbnNpb25zLCBjKTtcblx0XHRcdH0pO1xuXHR9XG5cdHRyeUltYWdlRmlsZW5hbWVzKGZuYW1lX3Jvb3QsIHBvc3NpYmxlRXh0ZW5zaW9ucywgMCk7XG5cblxuXHR2YXIgcGV3Q2xhc3MgPSBzZWxmLmRhdGEubm9kZXNbMF0ucGV3X0NsYXNzO1xuXHRpZiAodHlwZW9mIHBld0NsYXNzICE9ICd1bmRlZmluZWQnKSB7XG5cdFx0c2VsZi5hdXRob3JJbWFnZURpdlxuXHRcdFx0LmFwcGVuZCgneGh0bWw6cCcpXG5cdFx0XHQuaHRtbCgnPHAgc3R5bGU9XCJtYXJnaW46IDA7IHBhZGRpbmc6IDA7IGZvbnQtc2l6ZTogLjg1ZW1cIj5QZXcgU2Nob2xhciAnICsgcGV3Q2xhc3MgKyAnPC9wPicpO1xuXHR9XG5cblxufTtcblxuZWdvR3JhcGhWaXMucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG5cdC8vIE9ubHkgYWRkIGV2ZW50IGxpc3RlbmVycyBoZXJlIHRoYXQgZG9uJ3QgYWN0IGFjcm9zcyBkaWZmZXJlbnQgdmlzIG9iamVjdHNcblx0Ly8gT3RoZXJ3aXNlIHRoZXkgbmVlZCB0byBiZSBhZGRlZCB0byAoZS5nLikgY2l0YXRpb25WaXNfTWFpbi5qc1xuXHRcblx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdGlmIChzZWxmLnpvb21hYmxlID09PSB0cnVlKSB7XG5cdFx0c2VsZi5ncm91cC5jYWxsKHNlbGYuem9vbSk7XG5cdH1cblxuICAgIC8vIEFkZCBldmVudCBsaXN0ZW5lciB0byBub2RlcyBmb3IgdG9vbHRpcDpcbiAgICBkMy5zZWxlY3RBbGwoJy5ub2RlJylcblx0XHQuZWFjaChmdW5jdGlvbihkKSB7IFxuXHRcdFx0ZC51cGRhdGVkUHJvcHMgPSBmYWxzZTtcblx0ICAgICAgICBkLnRvb2x0aXBIdG1sID0gJzxwPkxvYWRpbmcuLi48L3A+J1x0fSk7XG5cdC8vIHNlbGYudGlwLmh0bWwoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC50b29sdGlwSHRtbDsgfSk7XG5cdGQzLnNlbGVjdEFsbCgnLm5vZGUnKVxuICAgICAgICAub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKGQpIHtcblx0XHRcdGQuaG92ZXJlZCA9IHRydWU7XG5cdFx0XHR2YXIgaG92ZXJlZEl0ZW0gPSBkMy5zZWxlY3QodGhpcyk7XG5cdFx0XHQvLyAkKFwiI2Rldm91dHB1dFwiKS5odG1sKFwiPGgzPlwiICsgZC5qc19kaXYgKyBcIjwvaDM+XCIpLmNzcyhcImNvbG9yXCIsIGQuY29sb3IpO1xuXG5cdFx0XHQvLyBzZWxmLnRvb2x0aXAgPSBzZWxmLnRvb2x0aXBcblx0XHRcdC8vIFx0Lmh0bWwoZC50b29sdGlwSHRtbClcblx0XHRcdC8vIFx0LnN0eWxlKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKVxuXHRcdFx0Ly8gXHQuc3R5bGUoJ2JvcmRlci1zdHlsZScsICdzb2xpZCcpXG5cdFx0XHQvLyBcdC5zdHlsZSgnYm9yZGVyLWNvbG9yJywgZC5jb2xvcik7XG5cdFx0XHQvLyB0aGUgZmlyc3QgdGltZSBhIG5vZGUgaXMgbW91c2VkIG92ZXIsIHJldHJpZXZlIGFkZGl0aW9uYWwgcHJvcGVydGllcyBpZiBpdCBpcyBhIHBhcGVyIG5vZGVcblx0XHRcdC8vIGlmICggKGQubm9kZVR5cGUgPT09ICdwYXBlcicpICYmICghZC51cGRhdGVkUHJvcHMpICkge1xuXHRcdFx0Ly8gXHQkLmFqYXgoe1xuXHRcdFx0Ly8gXHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHQvLyBcdFx0dXJsOiAkU0NSSVBUX1JPT1QgKyAnL192aXNfZ2V0X21vcmVfcGFwZXJpbmZvJyxcblx0XHRcdC8vIFx0XHRkYXRhOiB7cGFwZXJpZDogZC5pZH0sXG5cdFx0XHQvLyBcdFx0c3VjY2VzczogZnVuY3Rpb24ocmVzdWx0KSB7XG5cdFx0XHQvLyBcdFx0XHRkLlRpdGxlID0gcmVzdWx0Wyd0aXRsZSddO1xuXHRcdFx0Ly8gXHRcdFx0ZC5kb2kgPSByZXN1bHRbJ2RvaSddO1xuXHRcdFx0Ly8gXHRcdFx0ZC5jaXRhdGlvbiA9IHJlc3VsdFsnY2l0YXRpb24nXTtcblx0XHRcdC8vIFx0XHRcdGQudXBkYXRlZFByb3BzID0gdHJ1ZTtcblx0XHRcdC8vIFx0XHRcdC8vIGQudG9vbHRpcEh0bWwgPSAnPHA+JyArIGQuY2l0YXRpb24gKyAnPC9wPic7XG5cdFx0XHQvLyBcdFx0XHQvLyBkLnRvb2x0aXBIdG1sID0gZC50b29sdGlwSHRtbCArICc8YnI+Jztcblx0XHRcdC8vIFx0XHRcdC8vIGQudG9vbHRpcEh0bWwgPSBkLnRvb2x0aXBIdG1sICsgJzxwPkNhdGVnb3J5OiAnICsgZC5Eb21haW5OYW1lICsgJzwvcD4nO1xuXHRcdFx0Ly8gXHRcdFx0Ly8gaWYgKGQuaG92ZXJlZCkge1xuXHRcdFx0Ly8gXHRcdFx0Ly8gXHRzZWxmLnRpcC5zaG93KGQsIGhvdmVyZWRJdGVtLm5vZGUoKSk7XG5cdFx0XHQvLyBcdFx0XHQvLyBcdC8vIHNlbGYudGlwLnNob3coZCk7XG5cdFx0XHQvLyBcdFx0XHQvLyB9XG4gICAgICAgICAgICAvL1xuXHRcdFx0Ly8gXHRcdH1cblx0XHRcdC8vIFx0fSk7XG5cdFx0XHQvLyB9IGVsc2UgaWYgKCBkLmlkeCA9PSAwICkge1xuXHRcdFx0Ly8gXHRkLnRvb2x0aXBIdG1sID0gJzxwPic7XG5cdFx0XHQvLyBcdGlmIChkLm5vZGVUeXBlKSB7XG5cdFx0XHQvLyBcdFx0ZC50b29sdGlwSHRtbCA9IGQudG9vbHRpcEh0bWwgKyBkLm5vZGVUeXBlLmNhcGl0YWxpemUoKSArICc6ICc7XG5cdFx0XHQvLyBcdH1cblx0XHRcdC8vIFx0ZC50b29sdGlwSHRtbCA9IGQudG9vbHRpcEh0bWwgKyBkLm5hbWU7XG5cdFx0XHQvLyBcdGQudG9vbHRpcEh0bWwgPSBkLnRvb2x0aXBIdG1sICsgJzwvcD4nO1xuXHRcdFx0Ly8gXHR2YXIgbnVtYmVyT2ZQdWJzID0gZC5wYXBlcnMubGVuZ3RoO1xuXHRcdFx0Ly8gXHRkLnRvb2x0aXBIdG1sID0gZC50b29sdGlwSHRtbCArICc8cD5OdW1iZXIgb2YgUHVibGljYXRpb25zOiAnICsgbnVtYmVyT2ZQdWJzICsgJzwvcD4nO1xuXHRcdFx0Ly8gXHRcblx0XHRcdC8vIH1cblx0XHRcdC8vIHNlbGYudGlwLnN0eWxlKCdib3JkZXItY29sb3InLCBkLmNvbG9yKVxuXHRcdFx0Ly8gXHQuc2hvdyhkLCBob3ZlcmVkSXRlbS5ub2RlKCkpO1xuXHRcdFx0XHQvLyAuc2hvdyhkKTtcblx0XHRcdC8vIHNlbGYubWFrZVRvb2x0aXAoZCwgZnVuY3Rpb24odG9vbHRpcEh0bWwpIHtcblx0XHRcdC8vIFx0c2VsZi50b29sdGlwID0gc2VsZi50b29sdGlwXG5cdFx0XHQvLyBcdFx0Lmh0bWwodG9vbHRpcEh0bWwpXG5cdFx0XHQvLyBcdFx0LnN0eWxlKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKVxuXHRcdFx0Ly8gXHRcdC5zdHlsZSgnYm9yZGVyLXN0eWxlJywgJ3NvbGlkJylcblx0XHRcdC8vIFx0XHQuc3R5bGUoJ2JvcmRlci1jb2xvcicsIGQuY29sb3IpO1xuXHRcdFx0Ly8gfSk7XG5cdFx0XHQvLyBnb2luZyB0byB0cnkgdG8gdXNlIHRoZSBtZXRob2Qgb2YgZ2V0dGluZyB0aGUgY2l0YXRpb24gdGV4dC4gYnV0IG5vdCB3b3JraW5nIHlldFxuXHRcdFx0Ly8gZ2V0Q2l0YXRpb24oZC5QYXBlcklELCB0aGlzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdtb3VzZW1vdmUnLCBmdW5jdGlvbihkKSB7XG5cdFx0XHQvLyBzZWxmLnRpcC5zaG93KGQpO1xuICAgICAgICAgICAgLy8gc2VsZi50b29sdGlwID0gc2VsZi50b29sdGlwXG5cdFx0XHQvLyBcdC5odG1sKGQudG9vbHRpcEh0bWwpXG4gICAgICAgICAgICAvLyAgICAgLnN0eWxlKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKVxuICAgICAgICAgICAgLy8gICAgIC5zdHlsZSgndG9wJywgKGQzLmV2ZW50LnBhZ2VZLTEwKSsncHgnKVxuICAgICAgICAgICAgLy8gICAgIC5zdHlsZSgnbGVmdCcsIChkMy5ldmVudC5wYWdlWCsxMCkrJ3B4Jyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignbW91c2VvdXQnLCBmdW5jdGlvbihkKSB7XG5cdFx0XHRkLmhvdmVyZWQgPSBmYWxzZTtcblx0XHRcdC8vIHNlbGYudGlwLmhpZGUoZCk7XG4gICAgICAgICAgICBzZWxmLnRvb2x0aXAgPSBzZWxmLnRvb2x0aXAuc3R5bGUoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7IH0pXG5cdFx0Lm9uKCdjbGljaycsIGZ1bmN0aW9uKGQpIHtcblx0XHRcdC8vIHZhciBkb2kgPSBnZXRET0koZC5QYXBlcklELCB0aGlzKTtcblx0XHRcdGlmICggKGQubm9kZVR5cGUgPT09ICdwYXBlcicpICkge1xuXHRcdFx0XHRpZiAoIChkLmhhc093blByb3BlcnR5KCdkb2knKSkgJiYgKGQuZG9pICE9PSAnJykgKSB7XG5cdFx0XHRcdFx0dmFyIHVybCA9ICdodHRwczovL2RvaS5vcmcvJyArIGQuZG9pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHZhciB1cmwgPSAnaHR0cHM6Ly9wcmV2aWV3LmFjYWRlbWljLm1pY3Jvc29mdC5jb20vcGFwZXIvJyArIGQuaWQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0d2luZG93Lm9wZW4odXJsLCAnX2JsYW5rJyk7XG5cdFx0XHRcdFxuXHRcdFx0fVxuXHRcdH0pXG5cblx0ZnVuY3Rpb24gZ2V0RE9JKHBhcGVyaWQsIG5vZGVPYmopIHtcblx0XHR2YXIgdGhpc05vZGUgPSBkMy5zZWxlY3Qobm9kZU9iaik7XG5cdFx0JC5hamF4KHtcblx0XHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHR1cmw6ICRTQ1JJUFRfUk9PVCArICcvX3Zpc19nZXRfZG9pJyxcblx0XHRcdGRhdGE6IHtwYXBlcmlkOiBwYXBlcmlkfSxcblx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3VsdCkge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhyZXN1bHRbJ2RvaSddKTtcblx0XHRcdFx0dmFyIGRvaSA9IHJlc3VsdFsnZG9pJ107XG5cdFx0XHRcdGlmIChkb2kpIHtcblx0XHRcdFx0XHR2YXIgdXJsID0gJ2h0dHBzOi8vZG9pLm9yZy8nICsgZG9pO1xuXHRcdFx0XHRcdHdpbmRvdy5vcGVuKHVybCwgJ19ibGFuaycpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH1cblx0XHR9KTtcblx0XHRcblx0fVxuXHRmdW5jdGlvbiBnZXRDaXRhdGlvbihwYXBlcmlkLCBub2RlT2JqKSB7XG5cdFx0Ly9cblx0XHR2YXIgdGhpc05vZGUgPSBkMy5zZWxlY3Qobm9kZU9iaik7XG5cdFx0JC5hamF4KHtcblx0XHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHR1cmw6ICRTQ1JJUFRfUk9PVCArICcvX3Zpc19nZXRfY2l0YXRpb24nLFxuXHRcdFx0ZGF0YToge3BhcGVyaWQ6IHBhcGVyaWR9LFxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24ocmVzdWx0KSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKHJlc3VsdFsnY2l0YXRpb24nXSk7XG5cdFx0XHRcdHRoaXNOb2RlLmF0dHIoJ3RpdGxlJywgcmVzdWx0WydjaXRhdGlvbiddKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG59O1xuXG5lZ29HcmFwaFZpcy5wcm90b3R5cGUubWFrZVRvb2x0aXAgPSBmdW5jdGlvbihkLCBjYWxsYmFjaykge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuXHQvLyBBY2NvdW50IGZvciBhdXRob3Igbm9kZTpcblx0aWYgKGQubm9kZVR5cGUgPT09ICdhdXRob3InIHx8IGQubm9kZVR5cGUgPT09ICcnIHx8IGQubm9kZVR5cGUgPT09ICd2ZW51ZScpIHtcblx0XHR2YXIgdG9vbHRpcEh0bWwgPSAnPHAgY2xhc3M9XCJhdXRob3JOYW1lXCI+QXV0aG9yOiAnICsgZC5BdXRob3JOYW1lICsgJzwvcD4nO1xuXHRcdGlmIChkLnBld19DbGFzcykge1xuXHRcdFx0dG9vbHRpcEh0bWwgPSB0b29sdGlwSHRtbCArICc8cCBjbGFzcz1cInBld0NsYXNzXCI+UGV3IENsYXNzOiAnICsgZC5wZXdfQ2xhc3MgKyAnPC9wPic7XG5cdFx0fVxuXHRcdHZhciBudW1iZXJPZlB1YnMgPSBkLnBhcGVycy5sZW5ndGg7XG5cdFx0dG9vbHRpcEh0bWwgPSB0b29sdGlwSHRtbCArICc8cCBjbGFzcz1cIm51bWJlck9mUHVic1wiPk51bWJlciBvZiBQdWJsaWNhdGlvbnM6ICcgKyBudW1iZXJPZlB1YnMgKyAnPC9wPic7XG5cdFx0Ly8gcmV0dXJuIHRvb2x0aXBIdG1sO1xuXHRcdGNhbGxiYWNrKHRvb2x0aXBIdG1sKTtcblx0fVxuXG5cdC8vIE90aGVyd2lzZTogbWFrZSBhIHRvb2x0aXAgZm9yIGEgcGFwZXIgbm9kZVxuXHRmdW5jdGlvbiBnZXRBdXRob3JMaXN0KGF1dGhvcnMpIHtcblx0XHR2YXIgYXV0aG9yTGlzdCA9IFtdO1xuXHRcdGF1dGhvcnMuZm9yRWFjaChmdW5jdGlvbihhKSB7XG5cdFx0XHR2YXIgdGhpc0F1dGhvclN0ckxpc3QgPSBhWzFdLnNwbGl0KCcgJyk7XG5cdFx0XHQvLyB0aGlzQXV0aG9yU3RyTGlzdCA9IHRoaXNBdXRob3JTdHJMaXN0Lm1hcChmdW5jdGlvbih4KSB7IHJldHVybiB4LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgeC5zbGljZSgxKS50b0xvd2VyQ2FzZSgpOyB9KTtcblx0XHRcdC8vIHRoaXNBdXRob3JTdHJMaXN0ID0gdGhpc0F1dGhvclN0ckxpc3QubWFwKGZ1bmN0aW9uKHgpIHsgaWYgKHggPT09IHgudG9VcHBlckNhc2UoKSkgcmV0dXJuIHguY2FwaXRhbGl6ZSgpOyBlbHNlIHJldHVybiB4O30pO1xuXHRcdFx0dGhpc0F1dGhvclN0ckxpc3QgPSB0aGlzQXV0aG9yU3RyTGlzdC5tYXAoZnVuY3Rpb24oeCkgeyBpZiAoeCAhPSB4LnRvVXBwZXJDYXNlKCkpIHJldHVybiB4LmNhcGl0YWxpemUoKTsgZWxzZSByZXR1cm4geDt9KTtcblx0XHRcdC8vIHZhciB0aGlzQXV0aG9yID0gYS5OYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgYS5OYW1lLnNsaWNlKDEpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHR2YXIgdGhpc0F1dGhvciA9IHRoaXNBdXRob3JTdHJMaXN0LmpvaW4oJyAnKTtcblx0XHRcdGF1dGhvckxpc3QucHVzaCh0aGlzQXV0aG9yKTtcblx0XHR9KTtcblx0XHRyZXR1cm4gYXV0aG9yTGlzdDtcblx0fVxuXHRmdW5jdGlvbiBnZXRUaXRsZShwYXBlcmlkLCBjYWxsYmFjaykge1xuXHRcdC8vXG5cdFx0JC5hamF4KHtcblx0XHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHR1cmw6ICRTQ1JJUFRfUk9PVCArICcvX3Zpc19nZXRfdGl0bGUnLFxuXHRcdFx0ZGF0YToge3BhcGVyaWQ6IHBhcGVyaWR9LFxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24ocmVzdWx0KSB7XG5cdFx0XHRcdGNhbGxiYWNrKHJlc3VsdFsndGl0bGUnXSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblx0ZnVuY3Rpb24gbWFrZUh0bWwoKSB7XG5cdFx0Ly8gdmFyIHRvb2x0aXBIdG1sID0gJzxwIGNsYXNzPVwicGFwZXJJRFwiPnBJRDogJyArIGQuaWQgKyAnPC9wPic7XG5cdFx0dmFyIHRvb2x0aXBIdG1sID0gJyc7XG5cdFx0dG9vbHRpcEh0bWwgPSB0b29sdGlwSHRtbCArICc8cCBjbGFzcz1cInBhcGVyVGl0bGVcIj4nO1xuXHRcdHRvb2x0aXBIdG1sID0gdG9vbHRpcEh0bWwgKyBkLlRpdGxlO1xuXHRcdHRvb2x0aXBIdG1sID0gdG9vbHRpcEh0bWwgKyAnPC9wPic7XG5cdFx0dG9vbHRpcEh0bWwgPSB0b29sdGlwSHRtbCArICc8cCBjbGFzcz1cInBhcGVyWWVhclwiPicgKyBkLlllYXIgKyAnPC9wPic7XG5cdFx0dmFyIGF1dGhvclN0ckxpc3QgPSBbXTtcblx0XHRkLmF1dGhvckxpc3QuZm9yRWFjaChmdW5jdGlvbihhKSB7XG5cdFx0XHRhdXRob3JTdHJMaXN0LnB1c2goYSlcblx0XHR9KTtcblx0XHR2YXIgYXV0aG9yTGlzdCA9IGF1dGhvclN0ckxpc3Quam9pbignLCAnKTtcblx0XHR0b29sdGlwSHRtbCA9IHRvb2x0aXBIdG1sICsgJzxwIGNsYXNzPVwicGFwZXJBdXRob3JcIj5BdXRob3JzOiAnICsgYXV0aG9yTGlzdCArICc8L3A+Jztcblx0XHRyZXR1cm4gdG9vbHRpcEh0bWw7XG5cdH1cblx0aWYgKCBkLmhhc093blByb3BlcnR5KCdhdXRob3JzJykgKSB7XG5cdFx0dmFyIGF1dGhvckxpc3QgPSBnZXRBdXRob3JMaXN0KGQuYXV0aG9ycyk7XG5cdFx0ZC5hdXRob3JMaXN0ID0gYXV0aG9yTGlzdDtcblx0XHRpZiAoIGQuaGFzT3duUHJvcGVydHkoJ1RpdGxlJykgKXtcblx0XHRcdHZhciB0b29sdGlwSHRtbCA9IG1ha2VIdG1sKCk7XG5cdFx0XHRjYWxsYmFjayh0b29sdGlwSHRtbCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGdldFRpdGxlKGQuaWQsIGZ1bmN0aW9uKHRpdGxlKSB7XG5cdFx0XHRcdGQuVGl0bGUgPSB0aXRsZTtcblx0XHRcdFx0dmFyIHRvb2x0aXBIdG1sID0gbWFrZUh0bWwoKTtcblx0XHRcdFx0Y2FsbGJhY2sodG9vbHRpcEh0bWwpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdCQuYWpheCh7XG5cdFx0XHRkYXRhVHlwZTogJ2pzb24nLFxuXHRcdFx0dXJsOiAkU0NSSVBUX1JPT1QgKyAnL192aXNfZ2V0X2F1dGhvcmluZm8nLFxuXHRcdFx0ZGF0YToge2F1dGhvcmlkczogSlNPTi5zdHJpbmdpZnkoZC5BdXRob3JJRExpc3QpfSxcblx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3VsdCkge1xuXHRcdFx0XHRkLmF1dGhvcnMgPSByZXN1bHRbJ2F1dGhvcnMnXTtcblx0XHRcdFx0dmFyIGF1dGhvckxpc3QgPSBnZXRBdXRob3JMaXN0KGQuYXV0aG9ycylcblx0XHRcdFx0ZC5hdXRob3JMaXN0ID0gYXV0aG9yTGlzdDtcblx0XHRcdFx0aWYgKCBkLmhhc093blByb3BlcnR5KCdUaXRsZScpICl7XG5cdFx0XHRcdFx0dmFyIHRvb2x0aXBIdG1sID0gbWFrZUh0bWwoKTtcblx0XHRcdFx0XHRjYWxsYmFjayh0b29sdGlwSHRtbCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Z2V0VGl0bGUoZC5pZCwgZnVuY3Rpb24odGl0bGUpIHtcblx0XHRcdFx0XHRcdGQuVGl0bGUgPSB0aXRsZTtcblx0XHRcdFx0XHRcdHZhciB0b29sdGlwSHRtbCA9IG1ha2VIdG1sKCk7XG5cdFx0XHRcdFx0XHRjYWxsYmFjayh0b29sdGlwSHRtbCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblxuXHR9XG4gICAgXG59O1xuXG5lZ29HcmFwaFZpcy5wcm90b3R5cGUucmV2ZWFsRWdvTm9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHNlbGYuY3Vyck5vZGVJbmRleCA9IDA7ICAvLyBJbmRleCBvZiBjdXJyZW50IG5vZGUgKGVnbyBub2RlKVxuXHRzZWxmLmN1cnJZZWFyID0gc2VsZi5kYXRhLmdyYXBoLnllYXJSYW5nZVswXTtcblxuICAgIC8vIFJldmVhbCBlZ28gbm9kZVxuXHRkMy5zZWxlY3RBbGwoJy5ub2RlJykuZmlsdGVyKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuaWQgPT09IHNlbGYuZWdvTm9kZS5pZDsgfSlcbiAgICAgICAgLmNsYXNzZWQoJ2hpZGRlbicsIGZhbHNlKVxuICAgICAgICAuY2xhc3NlZCgndmlzaWJsZScsIHRydWUpXG4gICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgLy8gLmRlbGF5KHNlbGYuZ3JhcGhQYXJhbXMudHJhbnNpdGlvblRpbWVQZXJZZWFyLnZhbHVlLzQpXG4gICAgICAgIC5kdXJhdGlvbigyMDAwKVxuICAgICAgICAuYXR0cigncicsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICAvL3JldHVybiA0LjUgKyAoc2VsZi5laWdlbkZhY3RvclNjYWxlKGQuRUYpICogMTApO1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnJhZGl1cztcbiAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoJ1QnLCAxKVxuXHRcdC5lYWNoKCdzdGFydCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0c2VsZi55ZWFyVGV4dERpc3BsYXkudHJhbnNpdGlvbigpXG5cdFx0XHQgICAgLmRlbGF5KDEwMDApXG5cdFx0XHQgICAgLmR1cmF0aW9uKDEwMDApXG5cdFx0XHQgICAgLnN0eWxlKCdvcGFjaXR5JywgLjE1KTtcblx0XHR9KVxuICAgICAgICAuZWFjaCgnZW5kJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyByZXZlYWwgbGVnZW5kXG4gICAgICAgICAgICAvLyBzZWxmLmxlZ2VuZC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC8vICAgICAuZGVsYXkoNDAwMClcbiAgICAgICAgICAgIC8vICAgICAuZHVyYXRpb24oMTAwMClcbiAgICAgICAgICAgIC8vICAgICAuc3R5bGUoJ29wYWNpdHknLCAxKTtcblxuICAgICAgICAgICAgLy8gcmV2ZWFsIHRoZSBkaXNwbGF5IG9mIGN1cnJlbnQgeWVhclxuICAgICAgICAgICAgLy8gc2VsZi55ZWFyVGV4dERpc3BsYXkudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAvLyAgICAgLmR1cmF0aW9uKDEwMDApXG4gICAgICAgICAgICAvLyAgICAgLnN0eWxlKCdvcGFjaXR5JywgLjE1KTtcblxuXHRcdFx0Ly8gbm90aWZ5IGV2ZXJ5b25lIChpLmUuIHRoZSBNYWluLmpzIGFuZCB0aGUgbGluZSBjaGFydHMpXG5cdFx0XHQkLmV2ZW50LnRyaWdnZXIoe1xuXHRcdFx0XHR0eXBlOiBcInllYXJDaGFuZ2VcIixcblx0XHRcdH0pO1xuICAgICAgICAgICAgc2VsZi5hbmltYXRlVG9EZXN0aW5hdGlvbk5vZGUoKTtcbiAgICAgICAgfSk7XG59O1xuXG5lZ29HcmFwaFZpcy5wcm90b3R5cGUuYW5pbWF0ZVRvRGVzdGluYXRpb25Ob2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG5cblxuICAgIC8vIENoZWNrIGlmIHdlJ3JlIG1vdmluZyBmb3J3YXJkIG9yIGJhY2t3YXJkXG4gICAgICAgIC8vIGlmIGN1cnJOb2RlSW5kZXggPCBkZXN0aW5hdGlvbk5vZGVJbmRleDpcbiAgICAgICAgLy8gICAgIGN1cnJOb2RlSW5kZXgrKztcbiAgICAgICAgLy8gICAgIGNoZWNrIGZvciB5ZWFyXG4gICAgICAgIC8vICAgICBkcmF3Tm9kZSgpO1xuICAgIGlmIChzZWxmLmN1cnJOb2RlSW5kZXggPT09IHNlbGYuZGVzdGluYXRpb25Ob2RlSW5kZXgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2dvdG8gZmluaXNoJyk7XG4gICAgICAgIHNlbGYuZmluaXNoQW5pbWF0aW9uKCk7XG4gICAgfSBlbHNlIGlmIChzZWxmLmN1cnJOb2RlSW5kZXggPCBzZWxmLmRlc3RpbmF0aW9uTm9kZUluZGV4KSB7XG5cdFx0c2VsZi5hbmltYXRpb25TdGF0ZSA9ICdmb3J3YXJkJztcbiAgICAgICAgc2VsZi5jdXJyTm9kZUluZGV4Kys7XG4gICAgICAgIHNlbGYuY2hlY2tZZWFyKCk7XG4gICAgICAgIC8vIHNlbGYuZHJhd05vZGUoKTtcbiAgICB9IGVsc2UgaWYgKHNlbGYuY3Vyck5vZGVJbmRleCA+IHNlbGYuZGVzdGluYXRpb25Ob2RlSW5kZXgpIHtcblx0XHRzZWxmLmFuaW1hdGlvblN0YXRlID0gJ3Jld2luZCc7XG4gICAgICAgIHNlbGYuY3Vyck5vZGVJbmRleC0tO1xuICAgICAgICBzZWxmLmNoZWNrWWVhcigpO1xuICAgICAgICAvLyBzZWxmLnJlbW92ZU5vZGUoKTtcbiAgICB9XG59O1xuXG5lZ29HcmFwaFZpcy5wcm90b3R5cGUuY29udGludWUgPSBmdW5jdGlvbigpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgLy8gaWYgKHNlbGYuY3Vyck5vZGVJbmRleCA9PT0gc2VsZi5kZXN0aW5hdGlvbk5vZGVJbmRleCkge1xuICAgIC8vICAgICBjb25zb2xlLmxvZygnZ290byBmaW5pc2gnKTtcbiAgICAvLyAgICAgc2VsZi5maW5pc2hBbmltYXRpb24oKTtcbiAgICAvLyBpZiAoc2VsZi5jdXJyTm9kZUluZGV4IDwgc2VsZi5kZXN0aW5hdGlvbk5vZGVJbmRleCkge1xuICAgIC8vICAgICBzZWxmLmRyYXdOb2RlKCk7XG4gICAgLy8gfSBlbHNlIGlmIChzZWxmLmN1cnJOb2RlSW5kZXggPiBzZWxmLmRlc3RpbmF0aW9uTm9kZUluZGV4KSB7XG4gICAgLy8gICAgIHNlbGYucmVtb3ZlTm9kZSgpO1xuICAgIC8vIH1cblxuXHQvLyBpZiB0aGUgeWVhciBvZiB0aGUgZmlyc3Qgbm9uRWdvIG5vZGUgaXMgdGhlIHNhbWUgYXMgdGhlIHllYXIgb2YgdGhlIGNlbnRlclxuXHQvLyBub2RlJ3MgZmlyc3QgcHVibGljYXRpb24sIHRyYW5zaXRpb25UaW1lUGVyTm9kZSB3aWxsIGJlIHVuZGVmaW5lZCBhbmQgdGhlcmVcblx0Ly8gd2lsbCBiZSBlcnJvcnMuXG5cdC8vIFNvIGxldCdzIGNhbGN1bGF0ZSBpdDpcblx0aWYgKHR5cGVvZiBzZWxmLnRyYW5zaXRpb25UaW1lUGVyTm9kZSA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRzZWxmLmNhbGN1bGF0ZVRyYW5zaXRpb25UaW1lKCk7XG5cdH1cblx0aWYgKHNlbGYuYW5pbWF0aW9uU3RhdGUgPT09ICdmb3J3YXJkJykge1xuXHRcdHNlbGYuZHJhd05vZGUoKTtcblx0fSBlbHNlIGlmIChzZWxmLmFuaW1hdGlvblN0YXRlID09PSAncmV3aW5kJykge1xuXHRcdHNlbGYucmVtb3ZlTm9kZSgpO1xuXHR9XG59O1xuXG5lZ29HcmFwaFZpcy5wcm90b3R5cGUuY2hlY2tZZWFyID0gZnVuY3Rpb24oKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblx0XG5cdC8vIGlmIHdlIGFyZSBvbiB0aGUgbGFzdCBub2RlLCBqdXN0IG1heCBvdXQgdGhlIHllYXIuXG5cdGlmIChzZWxmLmN1cnJOb2RlSW5kZXggPT0gc2VsZi5kYXRhLm5vZGVzLmxlbmd0aC0xKSB7XG5cdFx0c2VsZi5jdXJyWWVhciA9IHNlbGYuZGF0YS5ncmFwaC55ZWFyUmFuZ2VbMV07XG5cdFx0Ly8gLy8gY3V0b2ZmIGF0IDIwMTVcblx0XHQvLyBzZWxmLmN1cnJZZWFyID0gTWF0aC5taW4oc2VsZi5jdXJyWWVhciwgMjAxNSk7XG5cblx0XHRzZWxmLnllYXJUZXh0RGlzcGxheS50ZXh0KHNlbGYuY3VyclllYXIpO1xuXG5cdFx0Ly8galF1ZXJ5IGN1c3RvbSBldmVudCwgc28gdGhhdCBNYWluLmpzIGNhbiBsaXN0ZW4gZm9yIGl0IGFuZCBhZHZhbmNlIHRoZSB5ZWFyIG9uIHRoZSBsaW5lIGNoYXJ0c1xuXHRcdCQuZXZlbnQudHJpZ2dlcih7XG5cdFx0XHR0eXBlOiBcInllYXJDaGFuZ2VcIixcblx0XHR9KTtcblx0XHRzZWxmLmNvbnRpbnVlKCk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0dmFyIGN1cnJOb2RlID0gc2VsZi5kYXRhLm5vZGVzLmZpbHRlcihmdW5jdGlvbihkKSB7IHJldHVybiBkLmlkeCA9PT0gc2VsZi5jdXJyTm9kZUluZGV4OyB9KTtcblx0dmFyIG9sZFllYXIgPSBzZWxmLmN1cnJZZWFyO1xuXHR2YXIgbmV3WWVhciA9IGN1cnJOb2RlWzBdLlllYXI7XG5cdC8vIGlmIHRoZSB5ZWFyIGlzIHRoZSBzYW1lIGFzIGl0IHdhcywgZG8gbm90aGluZ1xuXHRpZiAobmV3WWVhciA9PSBvbGRZZWFyKSB7XG5cdFx0c2VsZi5jb250aW51ZSgpO1xuXHR9IGVsc2UgaWYgKG5ld1llYXIgPiBvbGRZZWFyKSB7XG5cdFx0Ly8gdHJ5aW5nIHRvIGRlYnVnIHRpbWluZyBpc3N1ZXNcblx0XHQvLyBsb29rcyBsaWtlIHRpbWluZyBpcyBqdXN0IGluaGVyZW50bHkgaW5jb25zaXN0ZW50LiB0aGVyZSBzZWVtcyB0byBiZSBhIGRlbGF5IHdpdGggdGhpcyBtZXRob2QgKGNhbGxpbmcgdGhlIG5leHQgbm9kZSBkcmF3aW5nIGluIHRyYW5zaXRpb24uZWFjaCgnZW5kJykgKVxuXHRcdC8vIGNvbnNvbGUubG9nKHNlbGYuY3VyclllYXIpO1xuXHRcdC8vIGNvbnNvbGUubG9nKCdjICcrc2VsZi5jKTtcblx0XHQvLyBjb25zb2xlLmxvZygndHQgJytzZWxmLnR0KTtcblx0XHQvLyBjb25zb2xlLmxvZygndHQgb3ZlciBjICcrc2VsZi50dC9zZWxmLmMpO1xuXHRcdC8vIGNvbnNvbGUubG9nKCd0cmFuc2l0aW9uVGltZVBlck5vZGUgJytzZWxmLnRyYW5zaXRpb25UaW1lUGVyTm9kZSk7XG5cdFx0Ly8gY29uc29sZS5sb2coJ2Vycm9yICcrKHNlbGYudHJhbnNpdGlvblRpbWVQZXJOb2RlKS8oc2VsZi50dC9zZWxmLmMpKTtcblx0XHRzZWxmLmM9MDtcblx0XHRzZWxmLnR0PTA7XG5cdFx0c2VsZi5jdXJyWWVhcisrO1xuXHRcdHNlbGYuYmVnaW5OZXdZZWFyKCk7XG5cdH0gZWxzZSBpZiAobmV3WWVhciA8IG9sZFllYXIpIHtcblx0XHRzZWxmLmN1cnJZZWFyLS07XG5cdFx0c2VsZi5iZWdpbk5ld1llYXIoKTtcblx0fVxuXHQvLyBzZWxmLmN1cnJZZWFyID0gY3Vyck5vZGVbMF0uWWVhcjtcblxuXHQvLyBUT0RPOiBjb21lIGJhY2sgdG8gdGhpc1xuXHQvL1xuICAgIC8vIC8vIENoZWNrIHRoZSB5ZWFyIG9mIHRoZSBjdXJyZW50IG5vZGUsIGFuZCBpZiBpdCBpcyBkaWZmZXJlbnQgdGhhbiBjdXJyWWVhcjpcbiAgICAvLyAvLyAgICAgdXBkYXRlIGN1cnJZZWFyO1xuICAgIC8vIC8vICAgICB1cGRhdGUgeWVhclRleHREaXNwbGF5O1xuICAgIC8vIC8vICAgICBmYWRlIG5vZGVzIGFuZCBsaW5rcyBmcm9tIHByZXZpb3VzIHllYXI7XG4gICAgLy8gLy8gICAgIHJlY2FsY3VsYXRlIHRyYW5zaXRpb24gdGltZXM7XG4gICAgLy9cbiAgICAvLyB2YXIgc2VsZiA9IHRoaXM7XG4gICAgLy9cbiAgICAvLyB2YXIgeWVhck9mQ3Vyck5vZGUgPSBzZWxmLmFsbE5vZGVzW3NlbGYuY3Vyck5vZGVJbmRleF0uWWVhclxuICAgIC8vIGlmICggeWVhck9mQ3Vyck5vZGUgIT0gc2VsZi5jdXJyWWVhciApIHtcbiAgICAvLyAgICAgc2VsZi5jdXJyWWVhciA9IHllYXJPZkN1cnJOb2RlO1xuICAgIC8vXG4gICAgLy8gICAgIHNlbGYudXBkYXRlTGluZUNoYXJ0KCk7XG4gICAgLy9cbiAgICAvLyAgICAgLy8gVXBkYXRlIHRoZSB5ZWFyIGRpc3BsYXlcbiAgICAvLyAgICAgc2VsZi55ZWFyVGV4dERpc3BsYXkudGV4dChzZWxmLmN1cnJZZWFyKTtcbiAgICAvLyAgICAgLy8gSSBtYXkgbmVlZCB0byBkbyBzb21ldGhpbmcgYWJvdXQgdGhpcyAodGhhdCB0aGUgeWVhciB0ZXh0IGRpc3BsYXkgc3RhcnRzIG9mZiBoaWRkZW4pOlxuICAgIC8vICAgICAvLyBpZiAoc2VsZi5jdXJyWWVhciA9PSBzZWxmLmVnb05vZGUuWWVhcikgXG4gICAgLy8gICAgIC8vICAgICAgICAge3NlbGYueWVhclRleHREaXNwbGF5LnRyYW5zaXRpb24oKVxuICAgIC8vICAgICAvLyAgICAgICAgICAgICAgICAgLmR1cmF0aW9uKDEwMDApXG4gICAgLy8gICAgIC8vICAgICAgICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAuMTUpO1xuICAgIC8vXG4gICAgLy8gICAgIC8vIE9ubHkgZmFkZSBwcmV2aW91cyB5ZWFyIGlmIGdvaW5nIGZvcndhcmQgaW4gdGltZVxuICAgIC8vICAgICBpZiAoc2VsZi5jdXJyTm9kZUluZGV4IDwgc2VsZi5kZXN0aW5hdGlvbk5vZGVJbmRleCkgc2VsZi5mYWRlTm9kZXNBbmRMaW5rc1ByZXZZZWFyKCk7XG4gICAgLy9cbiAgICAvLyAgICAgc2VsZi5jYWxjdWxhdGVUcmFuc2l0aW9uVGltZSgpO1xuICAgIC8vIH1cblx0cmV0dXJuIHNlbGYuY3VyclllYXI7XG59O1xuXG5lZ29HcmFwaFZpcy5wcm90b3R5cGUuYmVnaW5OZXdZZWFyID0gZnVuY3Rpb24oKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblxuXHRcblx0c2VsZi55ZWFyVGV4dERpc3BsYXkudGV4dChzZWxmLmN1cnJZZWFyKTtcblxuXHQvLyBqUXVlcnkgY3VzdG9tIGV2ZW50LCBzbyB0aGF0IE1haW4uanMgY2FuIGxpc3RlbiBmb3IgaXQgYW5kIGFkdmFuY2UgdGhlIHllYXIgb24gdGhlIGxpbmUgY2hhcnRzXG5cdCQuZXZlbnQudHJpZ2dlcih7XG5cdFx0dHlwZTogXCJ5ZWFyQ2hhbmdlXCIsXG5cdH0pO1xuXG5cdHNlbGYuY2FsY3VsYXRlVHJhbnNpdGlvblRpbWUoKTtcblx0dmFyIG5vZGVzVGhpc1llYXIgPSBzZWxmLm5vdEVnb05vZGVzLmZpbHRlcihmdW5jdGlvbihkKSB7IHJldHVybiBkLlllYXIgPT0gc2VsZi5jdXJyWWVhcjsgfSk7XG5cblx0Ly8gSWYgdGhpcyB5ZWFyIGhhcyBubyBub2RlcywgZGVsYXksIHRoZW4gY29udGludWVcblx0aWYgKCBub2Rlc1RoaXNZZWFyLmxlbmd0aCA9PT0gMCApIHtcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0c2VsZi5jaGVja1llYXIoKTtcblx0XHR9LCBzZWxmLnRyYW5zaXRpb25UaW1lUGVyWWVhcltzZWxmLmN1cnJZZWFyXSlcblx0fSBlbHNlIHtcblx0XHRzZWxmLmNvbnRpbnVlKCk7XG5cdH1cblxuXG59O1xuXG5lZ29HcmFwaFZpcy5wcm90b3R5cGUuZHJhd05vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAvLyBzZWxmLmFuaW1hdGlvblN0YXRlID0gJ2ZvcndhcmQnO1xuXG4gICAgLy8gc2VsZi5mYWRlTm9kZXNBbmRMaW5rc1ByZXZZZWFyKCk7XG5cbiAgICB2YXIgY3Vyck5vZGUgPSBkMy5zZWxlY3RBbGwoJy5ub2RlJykuZmlsdGVyKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuaWR4ID09PSBzZWxmLmN1cnJOb2RlSW5kZXg7IH0pO1xuXG4gICAgZnVuY3Rpb24gZHJhd0xpbmtzKG5vZGVPYmopIHtcbiAgICAgICAgLy8gVGhpcyBmdW5jdGlvbiB3aWxsIGRyYXcgdGhlIGxpbmsgb3V0IGZyb20gdGhlIHNvdXJjZSB0byB0aGUgdGFyZ2V0LlxuICAgICAgICAvLyBXZSdsbCBjYWxsIGl0IGFmdGVyIGVhY2ggbm9kZSBhcHBlYXJzLlxuICAgICAgICBub2RlT2JqLmxpbmtzVGhpc05vZGVJc1NvdXJjZSA9IGQzLnNlbGVjdEFsbCgnLmxpbmsnKS5maWx0ZXIoZnVuY3Rpb24obCkgeyByZXR1cm4gbC5zb3VyY2UgPT09IG5vZGVPYmo7IH0pO1xuICAgICAgICBub2RlT2JqLmxpbmtzVGhpc05vZGVJc1NvdXJjZS5jbGFzc2VkKCdoaWRkZW4nLCBmYWxzZSlcbiAgICAgICAgICAgIC5jbGFzc2VkKCd2aXNpYmxlJywgdHJ1ZSlcbiAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uKGQpIHsgZC5pblRyYW5zaXRpb24gPSB0cnVlOyB9KVxuICAgICAgICAgICAgLmF0dHIoJ3gyJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5zb3VyY2UueDsgfSlcbiAgICAgICAgICAgIC5hdHRyKCd5MicsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuc291cmNlLnk7IH0pXG4gICAgICAgICAgICAuc3R5bGUoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZWFzZSgnbGluZWFyJylcbiAgICAgICAgICAgIC5kZWxheSgwKVxuICAgICAgICAgICAgLmR1cmF0aW9uKHNlbGYubGlua0FwcGVhckR1cmF0aW9uKVxuICAgICAgICAgICAgLmF0dHIoJ3gyJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC50YXJnZXQueDsgfSlcbiAgICAgICAgICAgIC5hdHRyKCd5MicsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQudGFyZ2V0Lnk7IH0pXG4gICAgICAgICAgICAvLyAuYXR0cigneDInLCAwKVxuICAgICAgICAgICAgLy8gLmF0dHIoJ3kyJywgMClcbiAgICAgICAgICAgIC5hdHRyKCdUJywgMSlcbiAgICAgICAgICAgIC5lYWNoKCdlbmQnLCBmdW5jdGlvbihkKSB7IGQuaW5UcmFuc2l0aW9uID0gZmFsc2U7IH0pO1xuICAgIH1cbiAgICAvLyBNYWtlIHRoZSBub2RlcyBhcHBlYXI6XG5cdC8vIHZhciB0MCA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgIGN1cnJOb2RlLmNsYXNzZWQoJ2hpZGRlbicsIGZhbHNlKVxuICAgICAgICAuY2xhc3NlZCgndmlzaWJsZScsIHRydWUpXG4gICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgLmVhc2UoJ2xpbmVhcicpXG4gICAgICAgIC8vLmRlbGF5KGZ1bmN0aW9uKGQsIGkpIHsgcmV0dXJuIChpLWN1cnJJbmRleCkgKiB0aW1lUGVyTm9kZTsgfSlcbiAgICAgICAgLy8gLmRlbGF5KGZ1bmN0aW9uKGQsIGkpIHsgcmV0dXJuIGkgKiBzZWxmLnRyYW5zaXRpb25UaW1lUGVyTm9kZTsgfSlcbiAgICAgICAgLmR1cmF0aW9uKHNlbGYudHJhbnNpdGlvblRpbWVQZXJOb2RlKVxuICAgICAgICAuYXR0cigncicsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIC8vcmV0dXJuIDQuNSArIChzZWxmLmVpZ2VuRmFjdG9yU2NhbGUoZC5FRikgKiAxMCk7XG4gICAgICAgICAgICByZXR1cm4gZC5yYWRpdXM7XG4gICAgICAgIH0pXG4gICAgICAgIC5hdHRyKCdUJywgMSlcblx0XHQuZWFjaCgnZW5kJywgZnVuY3Rpb24oZCkge1xuXHRcdFx0Ly8gdmFyIHQxID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cdFx0XHQvLyBzZWxmLnR0ID0gc2VsZi50dCArICh0MS10MCk7XG5cdFx0XHRzZWxmLmMrKztcblx0XHRcdGlmIChzZWxmLnpvb21hYmxlID09PSB0cnVlKSB7XG5cdFx0XHRcdHNlbGYuY2hlY2tab29tKGQpO1xuXHRcdFx0fVxuXHRcdFx0Ly8gY29uc29sZS5sb2codDEtdDAgKyBcIm1pbGxpc2Vjb25kc1wiKTtcblx0XHRcdHNlbGYuYW5pbWF0ZVRvRGVzdGluYXRpb25Ob2RlKCk7XG5cdFx0XHRkcmF3TGlua3MoZCk7XG5cbiAgICAgICAgfSk7XG59O1xuXG5lZ29HcmFwaFZpcy5wcm90b3R5cGUucmVtb3ZlTm9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHNlbGYuYW5pbWF0aW9uU3RhdGUgPSAncmV3aW5kJztcblxuICAgIC8vIHNlbGYuY2FsY3VsYXRlVHJhbnNpdGlvblRpbWUoKTtcblxuICAgIHZhciBjdXJyTm9kZSA9IGQzLnNlbGVjdEFsbCgnLm5vZGUnKS5maWx0ZXIoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5pbmRleCA9PT0gc2VsZi5jdXJyTm9kZUluZGV4OyB9KTtcbiAgICB2YXIgY3VyckxpbmtzID0gZDMuc2VsZWN0QWxsKCcubGluaycpLmZpbHRlcihmdW5jdGlvbihkKSB7IHJldHVybiBkLnNvdXJjZS5pbmRleCA9PT0gc2VsZi5jdXJyTm9kZUluZGV4OyB9KTtcblxuICAgIC8vIHZhciByZXRyYWN0RHVyYXRpb24gPSBzZWxmLmxpbmtBcHBlYXJEdXJhdGlvbjtcbiAgICB2YXIgcmV0cmFjdER1cmF0aW9uID0gc2VsZi50cmFuc2l0aW9uVGltZVBlck5vZGU7XG4gICAgY3VyckxpbmtzLnRyYW5zaXRpb24oKVxuICAgICAgICAuZWFjaCgnc3RhcnQnLCBmdW5jdGlvbihkKSB7IGQuaW5UcmFuc2l0aW9uPXRydWU7IH0pXG4gICAgICAgIC5kdXJhdGlvbihyZXRyYWN0RHVyYXRpb24pXG4gICAgICAgIC5lYXNlKCdxdWFkJylcbiAgICAgICAgLmF0dHIoJ3gyJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5zb3VyY2UueDsgfSlcbiAgICAgICAgLmF0dHIoJ3kyJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5zb3VyY2UueTsgfSlcbiAgICAgICAgLmNhbGwoZnVuY3Rpb24oZCkge1xuXHRcdC8vIC5lYWNoKCdlbmQnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICBkLmluVHJhbnNpdGlvbj1mYWxzZTtcbiAgICAgICAgICAgIHZhciBjdXJyTm9kZSA9IGQzLnNlbGVjdEFsbCgnLm5vZGUnKS5maWx0ZXIoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5pZHggPT09IHNlbGYuY3Vyck5vZGVJbmRleDsgfSk7XG4gICAgICAgICAgICBjdXJyTm9kZS50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAuZHVyYXRpb24oc2VsZi50cmFuc2l0aW9uVGltZVBlck5vZGUpXG4gICAgICAgICAgICAgICAgLmVhc2UoJ3F1YWQnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdyJywwKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdUJywxKVxuICAgICAgICAgICAgICAgIC5lYWNoKCdlbmQnLCBmdW5jdGlvbihkZCkge1xuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuY2xhc3NlZCgnaGlkZGVuJywgdHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbGFzc2VkKCd2aXNpYmxlJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmFuaW1hdGVUb0Rlc3RpbmF0aW9uTm9kZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbn07XG5cbmVnb0dyYXBoVmlzLnByb3RvdHlwZS5maW5pc2hBbmltYXRpb24gPSBmdW5jdGlvbigpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdHNlbGYuYW5pbWF0aW9uU3RhdGUgPSAnc3RvcHBlZCc7XG5cdCQuZXZlbnQudHJpZ2dlcih7XG5cdFx0dHlwZTogXCJhbmltYXRpb25GaW5pc2hlZFwiLFxuXHR9KTtcblx0Y29uc29sZS5sb2coJ2ZpbmlzaGVkJyk7XG5cdGNvbnNvbGUubG9nKHNlbGYuY3Vyck5vZGVJbmRleCk7XG59O1xuXG5lZ29HcmFwaFZpcy5wcm90b3R5cGUubmV3RGVzdGluYXRpb25Ob2RlID0gZnVuY3Rpb24oZGVzdGluYXRpb25ZZWFyKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblxuXHRzZWxmLmRlc3RpbmF0aW9uWWVhciA9IGRlc3RpbmF0aW9uWWVhcjtcblx0Y29uc29sZS5sb2coc2VsZi5kZXN0aW5hdGlvblllYXIpO1xuXHRzZWxmLmdldERlc3RpbmF0aW9uTm9kZSgpO1xuXHRcblx0Ly8gbWFrZSBzdXJlIHRoZSBjdXJyZW50IG5vZGUgaXMgaW5jbHVkZWQ6XG5cdGlmICggIShzZWxmLmN1cnJOb2RlSW5kZXggPT09IHNlbGYuZGVzdGluYXRpb25Ob2RlSW5kZXgpICkgeyAgLy8gZG9uJ3QgZG8gYW55dGhpbmcgaWYgdGhpcyBpcyB0cnVlXG5cdFx0aWYgKHNlbGYuY3Vyck5vZGVJbmRleCA8IHNlbGYuZGVzdGluYXRpb25Ob2RlSW5kZXgpIHtcblx0XHRcdHNlbGYuYW5pbWF0aW9uU3RhdGUgPSAnZm9yd2FyZCc7XG5cdFx0XHRzZWxmLmRyYXdOb2RlKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHNlbGYuYW5pbWF0aW9uU3RhdGUgPSAncmV3aW5kJztcblx0XHRcdHNlbGYucmVtb3ZlTm9kZSgpO1xuXHRcdH1cblx0fVxufTtcblxuZWdvR3JhcGhWaXMucHJvdG90eXBlLmdldERlc3RpbmF0aW9uTm9kZSA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0Ly8gR2V0IHRoZSBkZXN0aW5hdGlvbiBub2RlIGluZGV4IGZyb20gdGhlIGRlc3RpbmF0aW9uIHllYXJcblx0dmFyIG1heFllYXIgPSBzZWxmLmRhdGEuZ3JhcGgueWVhclJhbmdlWzFdO1xuXHRmdW5jdGlvbiBnZXROb2Rlc1RoaXNZZWFyKCkge1xuXHRcdHZhciBub2Rlc1RoaXNZZWFyID0gc2VsZi5ub3RFZ29Ob2Rlcy5maWx0ZXIoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5ZZWFyID09IHNlbGYuZGVzdGluYXRpb25ZZWFyOyB9KTtcblx0XHRyZXR1cm4gbm9kZXNUaGlzWWVhcjtcblx0fVxuXHR2YXIgbm9kZXNUaGlzWWVhciA9IGdldE5vZGVzVGhpc1llYXIoKTtcblx0aWYgKG5vZGVzVGhpc1llYXIubGVuZ3RoID4gMCkge1xuXHRcdHZhciBsYXN0Tm9kZVRoaXNZZWFyID0gbm9kZXNUaGlzWWVhcltub2Rlc1RoaXNZZWFyLmxlbmd0aC0xXTtcblx0XHRzZWxmLmRlc3RpbmF0aW9uTm9kZUluZGV4ID0gbGFzdE5vZGVUaGlzWWVhci5pZHg7XG5cdH0gZWxzZSB7XG5cdFx0aWYgKHNlbGYuZGVzdGluYXRpb25ZZWFyID09IG1heFllYXIpIHtcblx0XHRcdHJld2luZFNlYXJjaCgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzZWxmLmRlc3RpbmF0aW9uWWVhcisrO1xuXHRcdFx0c2VsZi5nZXREZXN0aW5hdGlvbk5vZGUoKTsgIC8vIHJlY3Vyc2Vcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiByZXdpbmRTZWFyY2goKSB7XG5cdFx0c2VsZi5kZXN0aW5hdGlvblllYXItLTtcblx0XHR2YXIgbm9kZXNUaGlzWWVhciA9IGdldE5vZGVzVGhpc1llYXIoKTtcblx0XHRpZiAobm9kZXNUaGlzWWVhci5sZW5ndGggPiAwKSB7XG5cdFx0XHRzZWxmLmdldERlc3RpbmF0aW9uTm9kZSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXdpbmRTZWFyY2goKTsgIC8vIHJlY3Vyc2Vcblx0XHR9XG5cdH1cblxufTtcblxuZWdvR3JhcGhWaXMucHJvdG90eXBlLmNhbGN1bGF0ZVRyYW5zaXRpb25UaW1lID0gZnVuY3Rpb24oKSB7XG5cdC8vIE1ldGhvZCB0byBjYWxjdWxhdGUgdGhlIHRyYW5zaXRpb24gdGltZSBmb3IgZWFjaCBub2RlIGJhc2VkIG9uIHRoZSBudW1iZXIgb2Ygbm9kZXMgaW4gdGhlIGN1cnJlbnQgeWVhclxuXHRcblx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdC8vIFNQRUVEIFVQIEZPUiBURVNUSU5HIFBVUlBPU0VTXG5cdC8vIEtFRVAgVEhJUyBDT01NRU5URUQgT1VUXG5cdC8vIHNlbGYudHJhbnNpdGlvblRpbWVQZXJZZWFyW3NlbGYuY3VyclllYXJdID0gMTAwO1xuXG5cdHZhciBjb3VudFRoaXNZZWFyID0gc2VsZi5kYXRhLmdyYXBoLm5vZGVDb3VudHNQZXJZZWFyW3NlbGYuY3VyclllYXJdO1xuXHRzZWxmLnRyYW5zaXRpb25UaW1lUGVyTm9kZSA9IGNvdW50VGhpc1llYXIgPyBzZWxmLnRyYW5zaXRpb25UaW1lUGVyWWVhcltzZWxmLmN1cnJZZWFyXSAvIGNvdW50VGhpc1llYXIgOiAwO1xuXHRzZWxmLnRyYW5zaXRpb25UaW1lUGVyTm9kZSA9IHNlbGYudHJhbnNpdGlvblRpbWVQZXJOb2RlIC0gMTA7XG5cblxufTtcblxuZWdvR3JhcGhWaXMucHJvdG90eXBlLnJldmVhbEZpbmFsU3RhdGUgPSBmdW5jdGlvbigpIHtcblx0Ly8gY2FuY2VsIGFsbCB0cmFuc2l0aW9ucyBhbmQgcmV2ZWFsIHRoZSBmaW5hbCBzdGF0ZSBvZiB0aGUgdmlzXG5cblx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcblx0ZDMuc2VsZWN0QWxsKCcubm9kZSwgLmxpbmsnKS50cmFuc2l0aW9uKCkuZHVyYXRpb24oMCk7XG5cblx0c2VsZi5ub2RlXG5cdFx0LmNsYXNzZWQoJ2hpZGRlbicsIGZhbHNlKVxuXHRcdC5hdHRyKCdyJywgZnVuY3Rpb24oZCkge1xuXHRcdFx0cmV0dXJuIGQucmFkaXVzO1xuXHRcdH0pXG5cdFx0LmVhY2goZnVuY3Rpb24oZCkge1xuXHRcdFx0aWYgKHNlbGYuem9vbWFibGUgPT09IHRydWUpIHtcblx0XHRcdFx0c2VsZi5jaGVja1pvb20oZClcblx0XHRcdH1cblx0XHR9KTtcblxuXHRzZWxmLmxpbmtcblx0XHQuY2xhc3NlZCgnaGlkZGVuJywgZmFsc2UpXG5cdFx0LmNsYXNzZWQoJ3Zpc2libGUnLCB0cnVlKVxuXHRcdC5zdHlsZSgndmlzaWJpbGl0eScsICd2aXNpYmxlJylcblx0XHQuYXR0cigneDInLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLnRhcmdldC54OyB9KVxuXHRcdC5hdHRyKCd5MicsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQudGFyZ2V0Lnk7IH0pXG5cdFx0LmVhY2goZnVuY3Rpb24oZCkgeyBkLmluVHJhbnNpdGlvbiA9IGZhbHNlOyB9KTtcblxuXHRzZWxmLmN1cnJOb2RlSW5kZXggPSBzZWxmLmRhdGEubm9kZXMubGVuZ3RoLTE7XG5cdHNlbGYuY3VyclllYXIgPSBzZWxmLmRhdGEuZ3JhcGgueWVhclJhbmdlWzFdO1xuXHRzZWxmLnllYXJUZXh0RGlzcGxheS50ZXh0KHNlbGYuY3VyclllYXIpO1xuXHQkLmV2ZW50LnRyaWdnZXIoe1xuXHRcdHR5cGU6IFwieWVhckNoYW5nZVwiLFxuXHR9KVxuXG5cdHNlbGYuZmluaXNoQW5pbWF0aW9uKCk7XG5cblx0cmV0dXJuXG59XG5cblx0XHRcblxuXG5cbnZhciBjaXRhdGlvblZpcyA9IGNpdGF0aW9uVmlzIHx8IHt9O1xuXG5jaXRhdGlvblZpcy5lZ29HcmFwaERhdGEgPSAoZnVuY3Rpb24obWF4Tm9kZXMpIHtcblx0ZnVuY3Rpb24gcHJlcGFyZV9lZ29HcmFwaERhdGEoZ3JhcGgpIHtcblx0XHRmb3IgKGk9MDsgaTxncmFwaC5ub2Rlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0Z3JhcGgubm9kZXNbaV0ub2xkSWR4ID0gaTtcblx0XHR9XG5cdFx0dmFyIG5ld0dyYXBoID0ge307XG5cdFx0Ly8gQ29weSBwcm9wZXJ0aWVzIHRvIG5ld0dyYXBoIHRoYXQgd29uJ3QgY2hhbmdlOlxuXHRcdHZhciBwcm9wc1RvQ29weSA9IFsnZ3JhcGgnLCAnZGlyZWN0ZWQnLCAnbXVsdGlncmFwaCddO1xuXHRcdGZvciAoaT0wOyBpPHByb3BzVG9Db3B5Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgcHJvcCA9IHByb3BzVG9Db3B5W2ldO1xuXHRcdFx0aWYgKGdyYXBoLmhhc093blByb3BlcnR5KHByb3ApKSB7IG5ld0dyYXBoW3Byb3BdID0gZ3JhcGhbcHJvcF07IH1cblx0XHR9XG5cblx0XHRuZXdHcmFwaC5ub2RlcyA9IFtdO1xuXHRcdG5ld0dyYXBoLm5vZGVzLnB1c2goZ3JhcGgubm9kZXNbMF0pO1xuXHRcdG5ld0dyYXBoLm5vZGVzWzBdLmlkeCA9IDA7XG5cdFx0Ly8gLy8gdGhpcyBpcyBhIHRlc3Q6XG5cdFx0Ly8gZm9yIChpPTEwOyBpPDIwOyBpKyspIHtcblx0XHQvLyBcdHZhciBuZXdOb2RlID0gZ3JhcGgubm9kZXNbaV07XG5cdFx0Ly8gXHRuZXdOb2RlLmlkeCA9IG5ld0dyYXBoLm5vZGVzLmxlbmd0aDtcblx0XHQvLyBcdG5ld0dyYXBoLm5vZGVzLnB1c2gobmV3Tm9kZSk7XG5cdFx0Ly8gfVxuXHRcdHZhciBub3RFZ29Ob2RlcyA9IFtdO1xuXHRcdC8vIEZpbHRlciBvdXQgbm9kZXMgdGhhdCBoYXZlIHllYXIgb2YgMFxuXHRcdGZvciAodmFyIGk9MTsgaTxncmFwaC5ub2Rlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0Ly8gaWYgKCAoZ3JhcGgubm9kZXNbaV0uRUYgPiAwKSAmJiAoZ3JhcGgubm9kZXNbaV0uWWVhcj4wKSApIHtcblx0XHRcdGlmIChncmFwaC5ub2Rlc1tpXS5ZZWFyPjAgJiYgZ3JhcGgubm9kZXNbaV0uVGl0bGUgIT0gXCJcIikge1xuXHRcdFx0XHRub3RFZ29Ob2Rlcy5wdXNoKGdyYXBoLm5vZGVzW2ldKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Ly8gU3RhcnQgYnkgcmFuZG9taXppbmcgdGhlIG9yZGVyIG9mIGFsbCB0aGUgbm9kZXNcblx0XHRkMy5zaHVmZmxlKG5vdEVnb05vZGVzKTtcblx0XHQvLyBvcmRlciBkZXNjZW5kaW5nIGJ5IEVpZ2VuZmFjdG9yXG5cdFx0Ly8gbm90RWdvTm9kZXMuc29ydChmdW5jdGlvbihhLGIpIHsgcmV0dXJuIGIuRUYgLSBhLkVGOyB9KTtcblx0XHRub3RFZ29Ob2Rlcy5zb3J0KGZ1bmN0aW9uKGEsYikgeyByZXR1cm4gZDMuZGVzY2VuZGluZyhhLkVGLCBiLkVGKTsgfSk7XG5cdFx0Ly8gLy8gSSBkb24ndCB3YW50IHRvIHJlbW92ZSBhbnkgbm9kZXMgdGhhdCBoYXZlIGEgZGlmZmVyZW50IERvbWFpbklEIHRoYW4gdGhlIGVnbyxcblx0XHQvLyAvLyBzbyBJJ2xsIG1vdmUgdGhvc2UgdG8gdGhlIGZyb250IHRvIHByb3RlY3QgdGhlbS5cblx0XHQvLyAvLyBBQ1RVQUxMWSB0aGVyZSBhcmUgdG9vIG1hbnkgdG8gZG8gdGhpc1xuXHRcdC8vIHZhciBlZ29Eb21haW4gPSBncmFwaC5ub2Rlc1swXS5Eb21haW5Db3VudHNbMF0ua2V5OyAgLy8gVGhpcyBpcyB0aGUgbW9zdCBjb21tb24gZG9tYWluIGlkIGZvciB0aGUgZWdvIGF1dGhvcidzIHBhcGVyc1xuXHRcdC8vIHZhciBjID0gW107XG5cdFx0Ly8gZm9yICh2YXIgaT0wOyBpPG5vdEVnb05vZGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Ly8gXHRpZiAoIG5vdEVnb05vZGVzW2ldLkRvbWFpbklEICE9IGVnb0RvbWFpbiApIHtcblx0XHQvLyBcdFx0Yy5wdXNoKG5vdEVnb05vZGVzW2ldLkRvbWFpbklEKTtcblx0XHQvLyBcdFx0bm90RWdvTm9kZXMuc3BsaWNlKDAsIDAsIG5vdEVnb05vZGVzLnNwbGljZShpLCAxKVswXSk7XG5cdFx0Ly8gXHR9XG5cdFx0Ly8gfVxuXHRcdC8vIE1vdmUgcGFwZXJzIHRoYXQgaGF2ZSBhIERvbWFpbklEIHRvIHRoZSBmcm9udFxuXHRcdGZ1bmN0aW9uIERvbWFpbklEVG9Gcm9udChhcnIpIHtcblx0XHRcdHZhciBoYXNEb21haW5JRCA9IFtdO1xuXHRcdFx0dmFyIG5vRG9tYWluSUQgPSBbXTtcblx0XHRcdGZvciAodmFyIGkgPSAwLCBsZW4gPSBhcnIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdFx0aWYgKCBhcnJbaV0uRG9tYWluSUQgIT0gMCApIHtcblx0XHRcdFx0XHRoYXNEb21haW5JRC5wdXNoKGFycltpXSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0bm9Eb21haW5JRC5wdXNoKGFycltpXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGNvbnNvbGUubG9nKGFycik7XG5cdFx0XHR2YXIgbmV3QXJyID0gaGFzRG9tYWluSUQuY29uY2F0KG5vRG9tYWluSUQpO1xuXHRcdFx0Y29uc29sZS5sb2cobmV3QXJyKTtcblx0XHRcdHJldHVybiBuZXdBcnI7XG5cdFx0fVxuXHRcdG5vdEVnb05vZGVzID0gRG9tYWluSURUb0Zyb250KG5vdEVnb05vZGVzKTtcblx0XHQvLyBmb3IgKHZhciBpID0gbm90RWdvTm9kZXMubGVuZ3RoLTE7IGk+PTA7IGktLSkge1xuXHRcdC8vIFx0aWYgKCBub3RFZ29Ob2Rlc1tpXS5Eb21haW5JRCAhPSAwICkge1xuXHRcdC8vIFx0XHRub3RFZ29Ob2Rlcy5zcGxpY2UoMCwgMCwgbm90RWdvTm9kZXMuc3BsaWNlKGksIDEpWzBdKTtcblx0XHQvLyBcdH1cblx0XHQvLyB9XG5cdFx0Ly8gY29uc29sZS5sb2coYyk7XG5cdFx0Ly8gVGFrZSB0aGUgZmlyc3QgbiBpdGVtcywgd2hlcmUgbiA9IG1heE5vZGVzXG5cdFx0Ly8gY29uc29sZS5sb2cobWF4Tm9kZXMpO1xuXHRcdGlmICh0eXBlb2YgbWF4Tm9kZXMgPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHZhciBtYXhOb2RlcyA9IDI3NDsgIC8vIFRPRE86IGltcGxlbWVudCB0aGlzIGJldHRlciAoc28gaXQncyBub3QgaGFyZCBjb2RlZCBoZXJlKVxuXHRcdH1cblx0XHQvLyB2YXIgbWF4Tm9kZXMgPSA1MDAwOyAgLy8gVE9ETzogaW1wbGVtZW50IHRoaXMgYmV0dGVyIChzbyBpdCdzIG5vdCBoYXJkIGNvZGVkIGhlcmUpXG5cdFx0aWYgKG5vdEVnb05vZGVzLmxlbmd0aCA+IG1heE5vZGVzKSB7XG5cdFx0XHQvLyBzZWxmLmFsbE5vZGVzID0gc2VsZi5hbGxOb2Rlcy5zbGljZSgwLCBzZWxmLmdyYXBoUGFyYW1zLm1heE5vZGVzLnZhbHVlKTtcblx0XHRcdG5vdEVnb05vZGVzID0gbm90RWdvTm9kZXMuc2xpY2UoMCwgbWF4Tm9kZXMpO1xuXHRcdH1cbiAgICAgICAgLy8gc29ydCBieSBZZWFyXG4gICAgICAgIC8vIHRoZW4gc29ydCBieSBFRiAoc2l6ZSkgc28gdGhhdCBsYXJnZXIgbm9kZXMgdGVuZCB0byBhcHBlYXIgZmlyc3QuXG4gICAgICAgIC8vICh0aGlzIHNvbWV3aGF0IHJlZHVjZXMgdGhlIHByb2JsZW0gb2Ygc2VuZGluZyBvdXQgXG4gICAgICAgIC8vIGxpbmtzIHRvIG5vZGVzIHRoYXQgaGF2ZW4ndCBhcHBlYXJlZCB5ZXQuXG4gICAgICAgIC8vIG1heWJlIHRyeSBhIGJldHRlciBzb2x1dGlvbiBsYXRlci4pXG5cdFx0bm90RWdvTm9kZXMuc29ydChmdW5jdGlvbihhLGIpIHtcblx0XHRcdHJldHVybiBkMy5hc2NlbmRpbmcoYS5ZZWFyLCBiLlllYXIpIHx8IGQzLmRlc2NlbmRpbmcoYS5FRiwgYi5FRik7XG5cdFx0fSk7XG5cblx0XHQvLyBBcHBlbmQgdGhlc2UgdG8gbmV3R3JhcGgubm9kZXNcblx0XHRmb3IgKGk9MDsgaTxub3RFZ29Ob2Rlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIG5ld05vZGUgPSBub3RFZ29Ob2Rlc1tpXTtcblx0XHRcdG5ld05vZGUuaWR4ID0gbmV3R3JhcGgubm9kZXMubGVuZ3RoO1xuXHRcdFx0bmV3R3JhcGgubm9kZXMucHVzaChuZXdOb2RlKTtcblx0XHR9XG5cblx0XHRuZXdHcmFwaC5saW5rcyA9IHJlY2FsY3VsYXRlTGlua3MobmV3R3JhcGgubm9kZXMsIGdyYXBoLmxpbmtzKTtcblxuXHRcdGZ1bmN0aW9uIHJlY2FsY3VsYXRlTGlua3Mobm9kZXMsIGxpbmtzKSB7XG5cdFx0XHR2YXIgbmV3TGlua3MgPSBbXTtcblx0XHRcdGZvciAoaT0wOyBpPGxpbmtzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdC8vIHZhciB0aGlzU291cmNlID0gbm9kZXMuZmlsdGVyKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQub2xkSWR4ID09PSBsaW5rc1tpXS5zb3VyY2U7IH0pO1xuXHRcdFx0XHQvLyB2YXIgdGhpc1RhcmdldCA9IG5vZGVzLmZpbHRlcihmdW5jdGlvbihkKSB7IHJldHVybiBkLm9sZElkeCA9PT0gbGlua3NbaV0udGFyZ2V0OyB9KTtcblx0XHRcdFx0XG5cdFx0XHRcdC8vIG5vdyAoMjAxOCkgdGhlIG5vZGUgaWQgKGkuZS4sIFBhcGVyX0lEKSBpcyB3b3JraW5nIHRvIGlkZW50aWZ5IGxpbmtzLCBpbnN0ZWFkIG9mIHRoZSBub2RlIGluZGV4XG5cdFx0XHRcdC8vIG1heWJlIHRoaXMgaXMgYmVjYXVzZSBvZiBhIG5ldyB2ZXJzaW9uIG9mIG5ldHdvcmt4P1xuXHRcdFx0XHR2YXIgdGhpc1NvdXJjZSA9IG5vZGVzLmZpbHRlcihmdW5jdGlvbihkKSB7IHJldHVybiBkLmlkID09PSBsaW5rc1tpXS5zb3VyY2U7IH0pO1xuXHRcdFx0XHR2YXIgdGhpc1RhcmdldCA9IG5vZGVzLmZpbHRlcihmdW5jdGlvbihkKSB7IHJldHVybiBkLmlkID09PSBsaW5rc1tpXS50YXJnZXQ7IH0pO1xuXHRcdFx0XHRpZiAoIHRoaXNTb3VyY2UubGVuZ3RoPjAgJiYgdGhpc1RhcmdldC5sZW5ndGg+MCApIHtcblx0XHRcdFx0XHRpZiAoICh0aGlzVGFyZ2V0WzBdLm5vZGVUeXBlID09PSAncGFwZXInKSAmJiAodGhpc1NvdXJjZVswXS5ZZWFyIDwgdGhpc1RhcmdldFswXS5ZZWFyKSApIHtcblx0XHRcdFx0XHRcdC8vIGV4Y2x1ZGUgdGhlIGxpbmsgaW4gdGhpcyBjYXNlIChpLmUuIGlmIHRoZSBzb3VyY2UgeWVhciBpcyBsZXNzIHRoYW4gdGhlIHRhcmdldCB5ZWFyXG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHZhciBuZXdMaW5rID0gbGlua3NbaV07XG5cdFx0XHRcdFx0XHRuZXdMaW5rLnNvdXJjZSA9IHRoaXNTb3VyY2VbMF0uaWR4O1xuXHRcdFx0XHRcdFx0bmV3TGluay50YXJnZXQgPSB0aGlzVGFyZ2V0WzBdLmlkeDtcblx0XHRcdFx0XHRcdG5ld0xpbmtzLnB1c2gobGlua3NbaV0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bmV3TGlua3MuZm9yRWFjaChmdW5jdGlvbihkKSB7XG5cdFx0XHRcdGlmICggdHlwZW9mIGQudGFyZ2V0ICE9ICdudW1iZXInICkgY29uc29sZS5sb2coZCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuIG5ld0xpbmtzO1xuXHRcdH1cblxuXHRcdHZhciB5ZWFyUmFuZ2UgPSBuZXdHcmFwaC5ncmFwaC55ZWFyUmFuZ2U7XG5cdFx0ZnVuY3Rpb24gZ2V0Tm9kZUNvdW50c1BlclllYXIobm9kZXMsIHllYXJSYW5nZSkge1xuXHRcdFx0dmFyIHllYXJzTmVzdCA9IGQzLm5lc3QoKVxuXHRcdFx0XHQua2V5KGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuWWVhcjsgfSkuc29ydEtleXMoZDMuYXNjZW5kaW5nKVxuXHRcdFx0XHQucm9sbHVwKGZ1bmN0aW9uKGxlYXZlcykgeyByZXR1cm4gbGVhdmVzLmxlbmd0aDsgfSlcblx0XHRcdFx0Ly8gLmVudHJpZXMobm9kZXMuc2xpY2UoMSkpOyAgLy8gYWxsIGV4Y2VwdCBlZ28gbm9kZSAobm9kZVswXSlcblx0XHRcdFx0Lm1hcChub2Rlcy5zbGljZSgxKSk7XG5cblx0XHRcdHZhciBub2RlQ291bnRzUGVyWWVhciA9IHt9O1xuXHRcdFx0Zm9yICh2YXIgaT15ZWFyUmFuZ2VbMF07IGk8PXllYXJSYW5nZVsxXTsgaSsrKSB7XG5cdFx0XHRcdHZhciBjb3VudFRoaXNZZWFyID0geWVhcnNOZXN0W2ldO1xuXHRcdFx0XHRpZiAodHlwZW9mIGNvdW50VGhpc1llYXIgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdFx0bm9kZUNvdW50c1BlclllYXJbaV0gPSAwO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdG5vZGVDb3VudHNQZXJZZWFyW2ldID0gY291bnRUaGlzWWVhcjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG5vZGVDb3VudHNQZXJZZWFyO1xuXHRcdH1cblx0XHRuZXdHcmFwaC5ncmFwaC5ub2RlQ291bnRzUGVyWWVhciA9IGdldE5vZGVDb3VudHNQZXJZZWFyKG5ld0dyYXBoLm5vZGVzLCB5ZWFyUmFuZ2UpO1xuXG5cblx0XHRyZXR1cm4gbmV3R3JhcGg7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdHByZXBhcmVfZWdvR3JhcGhEYXRhOiBwcmVwYXJlX2Vnb0dyYXBoRGF0YVxuXHR9O1xufSgpKTtcblxudmFyIGNpdGF0aW9uVmlzID0gY2l0YXRpb25WaXMgfHwge307XG5cbmNpdGF0aW9uVmlzLmV2ZW50TGlzdGVuZXJzID0gKGZ1bmN0aW9uKCkge1xuXHQvLyBFdmVudCBsaXN0ZW5lcnMgdGhhdCBhY3QgYWNyb3NzIGRpZmZlcmVudCB2aXN1YWxpemF0aW9uIG9iamVjdHMgZ28gaGVyZVxuXHRcblx0Ly8gZnVuY3Rpb24gdG9vbHRpcExpc3RlbmVyKCkge1xuXHQvLyBcdC8vIEFkZCBldmVudCBsaXN0ZW5lciB0byBub2RlcyBmb3IgdG9vbHRpcDpcblx0Ly8gXHRkMy5zZWxlY3RBbGwoJy5ub2RlJylcblx0Ly8gXHRcdC5vbignbW91c2VvdmVyJywgZnVuY3Rpb24oZCkge1xuXHQvLyBcdFx0XHR2YXIgdG9vbHRpcEh0bWwgPSBzZWxmLm1ha2VUb29sdGlwKGQpO1xuXHQvLyBcdFx0XHRzZWxmLnRvb2x0aXAgPSBzZWxmLnRvb2x0aXBcblx0Ly8gXHRcdFx0XHQuaHRtbCh0b29sdGlwSHRtbClcblx0Ly8gXHRcdFx0XHQuc3R5bGUoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpXG5cdC8vIFx0XHRcdFx0LnN0eWxlKCdib3JkZXItc3R5bGUnLCAnc29saWQnKVxuXHQvLyBcdFx0XHRcdC5zdHlsZSgnYm9yZGVyLWNvbG9yJywgZC5jb2xvcik7XG5cdC8vIFx0XHR9KVxuXHQvLyBcdFx0Lm9uKCdtb3VzZW1vdmUnLCBmdW5jdGlvbigpIHtcblx0Ly8gXHRcdFx0c2VsZi50b29sdGlwID0gc2VsZi50b29sdGlwXG5cdC8vIFx0XHRcdFx0LnN0eWxlKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKVxuXHQvLyBcdFx0XHRcdC5zdHlsZSgndG9wJywgKGQzLmV2ZW50LnBhZ2VZLTEwKSsncHgnKVxuXHQvLyBcdFx0XHRcdC5zdHlsZSgnbGVmdCcsIChkMy5ldmVudC5wYWdlWCsxMCkrJ3B4Jyk7XG5cdC8vIFx0XHR9KVxuXHQvLyBcdFx0Lm9uKCdtb3VzZW91dCcsIGZ1bmN0aW9uKCkge1xuXHQvLyBcdFx0XHRzZWxmLnRvb2x0aXAgPSBzZWxmLnRvb2x0aXAuc3R5bGUoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7IH0pO1xuXHQvLyB9XG5cblx0cmV0dXJuIHtcblx0XHQvLyB0b29sdGlwTGlzdGVuZXI6IHRvb2x0aXBMaXN0ZW5lclxuXHR9O1xufSgpKTtcbi8vIFRoaXMgd2lsbCBhZGQgdGhlIGFiaWxpdHkgdG8gY2hhbmdlIHRoZSB0eXBlIG9mIGRvbWFpbiAoZS5nLiBmcm9tIGNhdGVnb3J5IHRvIHZlbnVlKSB0aGF0IHRoZSBub2RlcyBhcmUgY29sb3JlZCBieVxuLy8gVGhlIEpTT04gZGF0YSBtdXN0IGhhdmUgdGhlIHJpZ2h0IHByb3BlcnRpZXMgKGkuZS4gYGdyYXBoLkRvbWFpbnNNdWx0YCBhbmQgbm9kZSBwcm9wZXJ0eSBgRG9tYWluTXVsdGBcbi8vIGFuZCB0aGUgVVJMIG11c3QgaGF2ZSB0aGUgcXVlcnkgcGFyYW1ldGVyIFwiZG9tYWluc011bHRcIlxuXG4vLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzkwMTExNS9ob3ctY2FuLWktZ2V0LXF1ZXJ5LXN0cmluZy12YWx1ZXMtaW4tamF2YXNjcmlwdFxuZnVuY3Rpb24gZ2V0UGFyYW1ldGVyQnlOYW1lKG5hbWUsIHVybCkge1xuXHRpZiAoIXVybCkgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG5cdG5hbWUgPSBuYW1lLnJlcGxhY2UoL1tcXFtcXF1dL2csIFwiXFxcXCQmXCIpO1xuICAgIHZhciByZWdleCA9IG5ldyBSZWdFeHAoXCJbPyZdXCIgKyBuYW1lICsgXCIoPShbXiYjXSopfCZ8I3wkKVwiKSxcblx0XHRyZXN1bHRzID0gcmVnZXguZXhlYyh1cmwpO1xuXHRpZiAoIXJlc3VsdHMpIHJldHVybiBudWxsO1xuXHRpZiAoIXJlc3VsdHNbMl0pIHJldHVybiAnJztcblx0cmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChyZXN1bHRzWzJdLnJlcGxhY2UoL1xcKy9nLCBcIiBcIikpO1xufVxuXG52YXIgY2l0YXRpb25WaXMgPSBjaXRhdGlvblZpcyB8fCB7fTtcblxuJCggZG9jdW1lbnQgKS5vbiggXCJpbml0Q29tcGxldGVcIiwgZnVuY3Rpb24oKSB7XG5cdHZhciBlZ29HcmFwaFZpcyA9IGNpdGF0aW9uVmlzLmVnb0dyYXBoVmlzO1xuXHR2YXIgZG9tYWluc011bHQgPSBlZ29HcmFwaFZpcy5kYXRhLmdyYXBoLkRvbWFpbnNNdWx0XG5cdGlmICggKCFkb21haW5zTXVsdCkgfHwgKCFnZXRQYXJhbWV0ZXJCeU5hbWUoJ2RvbWFpbnNNdWx0JykpICkge1xuXHRcdC8vIGluIHRoaXMgY2FzZSwgZXhpdCB3aXRob3V0IGRvaW5nIGFueXRoaW5nXG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciAkZG9tYWluRHJvcGRvd24gPSAkKCAnPGRpdj4nICk7XG5cdCRkb21haW5Ecm9wZG93bi5hcHBlbmQoICQoICc8bGFiZWw+JyApLnRleHQoJ0NvbG9yIGJ5OiAnKS5jc3MoICdkaXNwbGF5JywgJ2lubGluZScgKSApO1xuXHR2YXIgZG9tYWluX3NlbGVjdCA9ICRkb21haW5Ecm9wZG93bi5hcHBlbmQoICQoICc8c2VsZWN0PicgKS5hdHRyKCAnaWQnLCAnZG9tYWluX3NlbGVjdCcgKSApO1xuXHQkKCAnI21haW5EaXYnICkucHJlcGVuZCggJGRvbWFpbkRyb3Bkb3duICk7XG5cdCQuZWFjaChkb21haW5zTXVsdCwgZnVuY3Rpb24oaywgdikge1xuXHRcdCQoICcjZG9tYWluX3NlbGVjdCcgKS5hcHBlbmQoICQoICc8b3B0aW9uPicgKS50ZXh0KGspICk7XG5cdFx0ZDMuc2VsZWN0KFwiI21haW5EaXZcIikuYXBwZW5kKFwicFwiKVxuXHRcdFx0LnRleHQoaylcblx0XHRcdC5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge3N3aXRjaERvbWFpbihrKTt9KTtcblx0fSk7XG5cdCQoICcjZG9tYWluX3NlbGVjdCcgKS52YWwoXCJjYXRlZ29yeV9mcm9tX2tleXdvcmRcIik7XG5cdCQoICcjZG9tYWluX3NlbGVjdCcgKS5vbiggJ2NoYW5nZScsIGZ1bmN0aW9uKCkgeyBzd2l0Y2hEb21haW4oJCh0aGlzKS52YWwoKSk7IH0pO1xuXG5cdGZ1bmN0aW9uIHN3aXRjaERvbWFpbihkb21haW5UeXBlKSB7XG5cdFx0dmFyIGR1ciA9IDIwMDtcblx0XHRlZ29HcmFwaFZpcy5kYXRhLmdyYXBoLkRvbWFpbnMgPSBkb21haW5zTXVsdFtkb21haW5UeXBlXTtcblx0XHRmb3IgKHZhciBpID0gMCwgbGVuID0gZWdvR3JhcGhWaXMubm90RWdvTm9kZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdHZhciB0aGlzTm9kZSA9IGVnb0dyYXBoVmlzLm5vdEVnb05vZGVzW2ldO1xuXHRcdFx0dGhpc05vZGUuRG9tYWluSUQgPSB0aGlzTm9kZS5Eb21haW5NdWx0W2RvbWFpblR5cGVdO1xuXHRcdH1cblx0XHRlZ29HcmFwaFZpcy5nZXREb21haW5zVGhpc0dyYXBoKCk7XG5cdFx0ZDMuc2VsZWN0QWxsKFwiLmxlZ2VuZEl0ZW1cIikucmVtb3ZlKCk7XG5cdFx0ZWdvR3JhcGhWaXMubGVnZW5kSW5pdCgpO1xuXHRcdGQzLnNlbGVjdEFsbChcIi5ub2RlXCIpXG5cdFx0XHQuZWFjaChmdW5jdGlvbihkKSB7XG5cdFx0XHRcdGQuRG9tYWluTmFtZSA9IGVnb0dyYXBoVmlzLmRhdGEuZ3JhcGguRG9tYWluc1tkLkRvbWFpbklEXTtcblx0XHRcdFx0Zm9yICh2YXIgaT0wOyBpPGVnb0dyYXBoVmlzLmRvbWFpbnNUaGlzR3JhcGgubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHR2YXIgdGhpc0RvbWFpbiA9IGVnb0dyYXBoVmlzLmRvbWFpbnNUaGlzR3JhcGhbaV0ua2V5XG5cdFx0XHRcdFx0aWYgKHRoaXNEb21haW49PWQuRG9tYWluSUQpIHtcblx0XHRcdFx0XHRcdC8vIHZhciB0aGlzQ29sb3IgPSBzZWxmLmNvbG9yU2NoZW1lW2ldO1xuXHRcdFx0XHRcdFx0dmFyIHRoaXNDb2xvciA9IGVnb0dyYXBoVmlzLmRvbWFpbnNUaGlzR3JhcGhbaV0uY29sb3I7XG5cdFx0XHRcdFx0XHRkLmNvbG9yID0gdGhpc0NvbG9yO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHRcdC50cmFuc2l0aW9uKCkuZHVyYXRpb24oZHVyKVxuXHRcdFx0LmF0dHIoJ2ZpbGwnLCAnd2hpdGUnKVxuXHRcdFx0LmVhY2goJ2VuZCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRkMy5zZWxlY3QodGhpcylcblx0XHRcdFx0XHQudHJhbnNpdGlvbigpLmR1cmF0aW9uKGR1cilcblx0XHRcdFx0XHQuYXR0cignZmlsbCcsIGZ1bmN0aW9uKGQpIHtcblx0XHRcdFx0XHRcdC8vIGNvbG9yIHRoZSBub2RlcyBiYXNlZCBvbiBEb21haW5JRFxuXHRcdFx0XHRcdFx0cmV0dXJuIGQuY29sb3Jcblx0XHRcdFx0XHR9KVxuXHRcdFx0fSlcblx0XHRkMy50cmFuc2l0aW9uKCkuZHVyYXRpb24oZHVyKjIpLmVhY2goJ2VuZCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0ZWdvR3JhcGhWaXMucmV2ZWFsRmluYWxTdGF0ZSgpO1xuXHRcdH0pO1xuXHR9XG59KTtcblxuXG5mdW5jdGlvbiBsaW5lQ2hhcnRCeVllYXIoZGF0YSkge1xuXHR2YXIgc2VsZiA9IHRoaXM7XG5cdHNlbGYuZGF0YSA9IGRhdGEudmFsdWVzO1xuXHRzZWxmLnBld19DbGFzcyA9IGRhdGEucGV3X0NsYXNzO1xuXHRzZWxmLmhyYV9mdW5kaW5nID0gZGF0YS5mdW5kaW5nO1xuXHQvLyBpZiB0aGVyZSBpcyBvbmx5IG9uZSBmdW5kaW5nIHJlY29yZDpcblx0Ly8gaWYgKHNlbGYuaHJhX2Z1bmRpbmcubGVuZ3RoID09IDEpIHtcblx0Ly8gXHRzZWxmLmhyYV9mdW5kaW5nID0gc2VsZi5ocmFfZnVuZGluZ1swXTtcblx0Ly8gfVxuXHRcblx0Ly8gdGVzdGluZzpcblx0Ly8gc2VsZi5ocmFfZnVuZGluZyA9IHNlbGYuaHJhX2Z1bmRpbmdbMF07XG5cdC8vIGNvbnNvbGUubG9nKHNlbGYuaHJhX2Z1bmRpbmcpO1xuXG5cdC8vIERlZmF1bHRzXG5cdC8vIEdyYXBoIFNWRyBEaW1lbnNpb25zXG4gICAgLy8gc2VsZi5saW5lQ2hhcnREaW1lbnNpb25zID0ge1xuXHQvLyBcdG1hcmdpbjoge3RvcDogMzAsIHJpZ2h0OiAyMCwgYm90dG9tOiAzMCwgbGVmdDogNTB9XG5cdC8vIH07XG5cdC8vIHNlbGYubGluZUNoYXJ0RGltZW5zaW9ucy53aWR0aCA9IDk2MCAqIDMvNCAtIHNlbGYubGluZUNoYXJ0RGltZW5zaW9ucy5tYXJnaW4ubGVmdCAtIHNlbGYubGluZUNoYXJ0RGltZW5zaW9ucy5tYXJnaW4ucmlnaHQ7XG5cdC8vIHNlbGYubGluZUNoYXJ0RGltZW5zaW9ucy5oZWlnaHQgPSAxMTAgLSBzZWxmLmxpbmVDaGFydERpbWVuc2lvbnMubWFyZ2luLnRvcCAtIHNlbGYubGluZUNoYXJ0RGltZW5zaW9ucy5tYXJnaW4uYm90dG9tO1xuXHRzZWxmLmxpbmVDaGFydERpbWVuc2lvbnM7ICAvLyBpbXBvcnRlZCBpbiBzZWxmLmltcG9ydERlZmF1bHRPcHRpb25zIGJlbG93XG5cdFxuXHRzZWxmLmNvbG9yU2NoZW1lO1xuXHQvLyAvLyBDb2xvcnM6XG4gICAgLy8gLy8gU2VlIGh0dHA6Ly9jb2xvcmJyZXdlcjIub3JnLz90eXBlPXF1YWxpdGF0aXZlJnNjaGVtZT1TZXQxJm49OFxuICAgIC8vIHNlbGYuY29sb3JTY2hlbWUgPSBbJ3JnYigyMjgsMjYsMjgpJywncmdiKDU1LDEyNiwxODQpJywncmdiKDc3LDE3NSw3NCknLFxuICAgIC8vICAgICAgICAgJ3JnYigxNTIsNzgsMTYzKScsJ3JnYigyNTUsMTI3LDApJywncmdiKDI1NSwyNTUsNTEpJyxcbiAgICAvLyAgICAgICAgICdyZ2IoMTY2LDg2LDQwKScsJ3JnYigyNDcsMTI5LDE5MSknXVxuICAgIC8vIC8vIEkgbGlrZWQgdGhlIGJsdWUgYmV0dGVyIGZvciB0aGUgbWFpbiBjb2xvciwgc28gdGhlIG5leHQgbGluZSBqdXN0IG1vdmVzXG4gICAgLy8gLy8gdGhlIGJsdWUgY29sb3IgKG9yaWdpbmFsbHkgc2VsZi5jb2xvclNjaGVtZVsxXSkgdG8gdGhlIGZyb250IChzZWxmLmNvbG9yU2NoZW1lWzBdKVxuICAgIC8vIHNlbGYuY29sb3JTY2hlbWUuc3BsaWNlKDAsIDAsIHNlbGYuY29sb3JTY2hlbWUuc3BsaWNlKDEsIDEpWzBdKVxuXG4gICAgLy8gc2VsZi54ID0gZDMudGltZS5zY2FsZSgpLnJhbmdlKFswLCBzZWxmLmxpbmVDaGFydERpbWVuc2lvbnMud2lkdGhdKTtcblxuXHRzZWxmLng7XG5cdHNlbGYueTtcblx0c2VsZi5jaGFydERpdjtcbiAgICBzZWxmLnN2ZztcbiAgICBzZWxmLnN2Z0RlZnM7XG5cdHNlbGYudGl0bGU7XG4gICAgc2VsZi5jbGlwUGF0aDtcbiAgICBzZWxmLmN1cnJZZWFySW5kaWNhdG9yO1xuXHRzZWxmLnllYXJBcmVhO1xuXHRzZWxmLnllYXJBcmVhT3BhY2l0eSA9IC4xO1xuICAgIHNlbGYueEF4aXM7XG4gICAgc2VsZi55QXhpcztcbiAgICBzZWxmLmxpbmU7ICAvLyBsaW5lIGRyYXdpbmcgZnVuY3Rpb25cbiAgICBzZWxmLmFyZWE7ICAvLyBhcmVhIGRyYXdpbmcgZnVuY3Rpb25cblx0c2VsZi5jaGFydExpbmU7ICAvLyBhY3R1YWwgbGluZSBlbGVtZW50XG5cdHNlbGYuY2hhcnRBcmVhOyAgLy8gYWN0dWFsIGFyZWEgZWxlbWVudFxuXHRzZWxmLmxpbmVhckdyYWRpZW50O1xuXG5cdHNlbGYuYW5pbWF0aW9uU3RhdGU7XG5cdHNlbGYuY3VyclllYXI7XG5cdHNlbGYudHJhbnNpdGlvblRpbWVQZXJZZWFyO1xuXHRzZWxmLnllYXJSYW5nZSA9IGQzLmV4dGVudChzZWxmLmRhdGEsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQueWVhcjsgfSk7XG5cdC8vIC8vIGN1dCBvZmYgYXQgMjAxNVxuXHQvLyBzZWxmLnllYXJSYW5nZVsxXSA9IE1hdGgubWluKHNlbGYueWVhclJhbmdlWzFdLCAyMDE1KTtcblx0Ly8gY3V0IG9mZiBhdCAyMDE3XG5cdHNlbGYueWVhclJhbmdlWzFdID0gTWF0aC5taW4oc2VsZi55ZWFyUmFuZ2VbMV0sIDIwMTcpO1xuXHRcblx0c2VsZi5mdW5kaW5nVGltZTtcblx0aWYgKHR5cGVvZiBzZWxmLnBld19DbGFzcyAhPSAndW5kZWZpbmVkJykge1xuXHRcdHNlbGYuZnVuZGluZ1RpbWUgPSA0OyAgLy8gZnVuZGluZyBwZXJpb2QgZm9yIFBld1xuXHR9XG5cdGlmICh0eXBlb2Ygc2VsZi5ocmFfZnVuZGluZyAhPSAndW5kZWZpbmVkJykge1xuXHRcdHNlbGYuaHJhX2Z1bmRpbmcgPSBzZWxmLmhyYV9mdW5kaW5nWzBdO1xuXHRcdHNlbGYuZnVuZGluZ1RpbWUgPSBzZWxmLmhyYV9mdW5kaW5nLmR1cmF0aW9uX2luX3llYXJzO1xuXHRcdC8vIHRoaXMgaXMgYSBoYWNrIHRoYXQgd2lsbCB3b3JrIGZvciBub3dcblx0XHQvLyBUT0RPOiBmaXggdGhpc1xuXHRcdHNlbGYucGV3X0NsYXNzID0gc2VsZi5ocmFfZnVuZGluZy5zdGFydF9kYXRlO1xuXHR9XG5cblx0Ly8gc2VsZi5pbml0KCk7XG5cblx0cmV0dXJuIHNlbGY7XG5cbn1cblxubGluZUNoYXJ0QnlZZWFyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblxuXG5cdHNlbGYuYW5pbWF0aW9uU3RhdGUgPSAnaW5pdCc7XG5cdHNlbGYuY3VyclllYXIgPSBzZWxmLnllYXJSYW5nZVswXTsgIC8vIEluaXRpYWxpemUgeWVhclxuXG4gICAgc2VsZi54ID0gZDMuc2NhbGUubGluZWFyKCkucmFuZ2UoWzAsIHNlbGYubGluZUNoYXJ0RGltZW5zaW9ucy53aWR0aF0pO1xuICAgIHNlbGYueSA9IGQzLnNjYWxlLmxpbmVhcigpLnJhbmdlKFtzZWxmLmxpbmVDaGFydERpbWVuc2lvbnMuaGVpZ2h0LCAwXSk7XG5cblx0c2VsZi5jaGFydERpdiA9IGQzLnNlbGVjdCgnI2NoYXJ0c0RpdicpLmFwcGVuZCgnZGl2Jylcblx0XHQuYXR0cignY2xhc3MnLCAnY2hhcnREaXYnKTtcblxuXHRzZWxmLnN2ZyA9IHNlbGYuY2hhcnREaXYuYXBwZW5kKCdzdmcnKVxuXHQgICAgLmF0dHIoJ3dpZHRoJywgc2VsZi5saW5lQ2hhcnREaW1lbnNpb25zLndpZHRoICsgc2VsZi5saW5lQ2hhcnREaW1lbnNpb25zLm1hcmdpbi5sZWZ0ICsgc2VsZi5saW5lQ2hhcnREaW1lbnNpb25zLm1hcmdpbi5yaWdodClcblx0ICAgIC5hdHRyKCdoZWlnaHQnLCBzZWxmLmxpbmVDaGFydERpbWVuc2lvbnMuaGVpZ2h0ICsgc2VsZi5saW5lQ2hhcnREaW1lbnNpb25zLm1hcmdpbi50b3AgKyBzZWxmLmxpbmVDaGFydERpbWVuc2lvbnMubWFyZ2luLmJvdHRvbSlcblx0ICAgIC8vIC5hdHRyKCdpZCcsICdjaGFydDJTdmcnKVxuXHQgICAgLmF0dHIoJ2NsYXNzJywgJ2xpbmVDaGFydCcpXG5cdCAgICAuYXBwZW5kKCdnJylcblx0ICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyBzZWxmLmxpbmVDaGFydERpbWVuc2lvbnMubWFyZ2luLmxlZnQgKyAnLCcgKyBzZWxmLmxpbmVDaGFydERpbWVuc2lvbnMubWFyZ2luLnRvcCArICcpJyk7XG5cdHNlbGYuc3ZnRGVmcyA9IHNlbGYuc3ZnLmFwcGVuZCgnZGVmcycpO1xuXHRcblx0Ly8gVGhlIHN0cmF0ZWd5IGlzIHRvIGRyYXcgdGhlIGVudGlyZSBsaW5lLCBidXQgdXNlIGEgY2xpcCBwYXRoIHRvIG9ubHlcblx0Ly8gZGlzcGxheSB1cCB0byB0aGUgY3VycmVudCB5ZWFyLlxuXHQvLyB2YXIgY2hhcnQyQ2xpcFBhdGggPSBzZWxmLnN2Z0RlZnNcblx0Ly8gXHQuYXBwZW5kKCdjbGlwUGF0aCcpXG5cdC8vIFx0LmF0dHIoJ2NsYXNzJywgJ2NsaXAnKVxuXHQvLyBcdC5hcHBlbmQoJ3JlY3QnKVxuXHQvLyBcdC5hdHRyKCd3aWR0aCcsIDApXG5cdC8vIFx0LmF0dHIoJ2hlaWdodCcsIHNlbGYubGluZUNoYXJ0RGltZW5zaW9ucy5oZWlnaHQpO1xuXG4gICAgLy8gc2VsZi54LmRvbWFpbihbc2VsZi5zdHJUb1llYXIoXCIxOTY4XCIpLCBzZWxmLnN0clRvWWVhcihcIjIwMTNcIildKTtcblx0c2VsZi54LmRvbWFpbihzZWxmLnllYXJSYW5nZSk7XG5cdC8vIEhhY2sgdG8gY3V0IG9mZiB4IGF4aXMgYXQgMjAxMDpcblx0Ly8gc2VsZi54LmRvbWFpbihbc2VsZi55ZWFyUmFuZ2VbMF0sIDIwMTBdKTtcblx0Ly8gc2VsZi55LmRvbWFpbihbMCwgZDMubWF4KHNlbGYuZGF0YSwgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5jb3VudCs1OyB9KV0pO1xuXHRzZWxmLnkuZG9tYWluKFswLCBkMy5tYXgoc2VsZi5kYXRhLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLmNvdW50OyB9KV0pO1xuXG5cdHNlbGYueEF4aXMgPSBkMy5zdmcuYXhpcygpLnNjYWxlKHNlbGYueClcblx0XHQub3JpZW50KCdib3R0b20nKVxuXHRcdC50aWNrRm9ybWF0KGQzLmZvcm1hdChcImRcIikpXG5cdFx0Ly8gLnRpY2tzKDE2KTtcblx0XHQudGlja3MoTWF0aC5taW4oc2VsZi5kYXRhLmxlbmd0aCwgMjApKTtcblx0XG5cdHNlbGYueUF4aXMgPSBkMy5zdmcuYXhpcygpLnNjYWxlKHNlbGYueSlcblx0XHQub3JpZW50KCdsZWZ0Jylcblx0XHQudGlja3MoMilcblx0XHQudGlja1NpemUoMCk7XG5cdFxuICAgIC8vIERlZmluZSBsaW5lIGRyYXdpbmcgZnVuY3Rpb25cbiAgICBzZWxmLmxpbmUgPSBkMy5zdmcubGluZSgpXG5cdFx0LngoZnVuY3Rpb24oZCkgeyByZXR1cm4gc2VsZi54KGQueWVhcik7IH0pXG5cdFx0LnkoZnVuY3Rpb24oZCkgeyByZXR1cm4gc2VsZi55KGQuY291bnQpOyB9KTtcbiAgICBcbiAgICAvLyBEZWZpbmUgdGhlIGFyZWEgZHJhd2luZyBmdW5jdGlvblxuICAgIHNlbGYuYXJlYSA9IGQzLnN2Zy5hcmVhKClcblx0XHQueChmdW5jdGlvbihkKSB7IHJldHVybiBzZWxmLngoZC55ZWFyKTsgfSlcblx0XHQueTAoc2VsZi5saW5lQ2hhcnREaW1lbnNpb25zLmhlaWdodClcblx0XHQueTEoZnVuY3Rpb24oZCkgeyByZXR1cm4gc2VsZi55KGQuY291bnQpOyB9KTtcblxuXHQvLyBEcmF3IHggYXhpc1xuICAgIHNlbGYuc3ZnLmFwcGVuZCgnZycpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAneCBheGlzJylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKDAsJyArIHNlbGYubGluZUNoYXJ0RGltZW5zaW9ucy5oZWlnaHQgKyAnKScpXG4gICAgICAgICAgICAuY2FsbChzZWxmLnhBeGlzKTtcblxuICAgIC8vIFB1dCB0aGUgeWVhciBmb3IgZWFjaCBheGlzIHRpY2sgbGFiZWwgaW50byBhIGRhdGEgYXR0cmlidXRlXG4gICAgLy8gdG8gYmUgYWJsZSB0byBnZXQgaXQgbW9yZSBlYXNpbHkgbGF0ZXJcbiAgICB2YXIgeWVhckxhYmVscyA9IHNlbGYuc3ZnLnNlbGVjdCgnLnguYXhpcycpXG4gICAgICAgIC5zZWxlY3RBbGwoJy50aWNrJylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywneWVhclRpY2snKVxuICAgICAgICAvLyAuYXR0cihcImRhdGEteWVhclwiLCBmdW5jdGlvbihkKSB7cmV0dXJuIHNlbGYueWVhclRvU3RyKGQpOyB9KVxuICAgICAgICAuYXR0cihcImRhdGEteWVhclwiLCBmdW5jdGlvbihkKSB7cmV0dXJuIGQ7IH0pXG5cdFx0LnN0eWxlKCdmb250LXNpemUnLCAnLjc1ZW0nKTtcblx0XG4gICAgLy8gQWRkIGEgcmVjdCBmb3IgZWFjaCB5ZWFyIGxhYmVsIHNvIHdlIGNhbiBoaWdobGlnaHQgaXQgbGF0ZXJcblx0dmFyIHllYXJMYWJlbCA9IHNlbGYuc3ZnLnNlbGVjdEFsbCgnLnllYXJUaWNrJylcblx0XHQuYXBwZW5kKCdzdmc6cmVjdCcpXG5cdFx0LmF0dHIoJ2ZpbGwnLCBzZWxmLmNvbG9yU2NoZW1lWzRdKVxuXHRcdC5zdHlsZSgnb3BhY2l0eScsIDApXG5cdFx0LmF0dHIoJ2NsYXNzJywgJ2hpZ2hsaWdodFJlY3QnKVxuXHRcdC5lYWNoKGZ1bmN0aW9uKGQpIHtcblx0XHRcdHZhciBiYm94ID0gdGhpcy5wYXJlbnROb2RlLmdldEJCb3goKTtcblx0XHRcdHZhciBwYWRkaW5nID0gYmJveC53aWR0aC80O1xuXHRcdFx0ZDMuc2VsZWN0KHRoaXMpXG5cdFx0XHRcdC5hdHRyKCd4JywgYmJveC54IC0gcGFkZGluZylcblx0XHRcdC5hdHRyKCd5JywgYmJveC55KVxuXHRcdFx0LmF0dHIoJ3dpZHRoJywgYmJveC53aWR0aCArIHBhZGRpbmcqMilcblx0XHRcdC5hdHRyKCdoZWlnaHQnLCBiYm94LmhlaWdodCk7XG5cdFx0fSk7XG5cblx0Ly8gRHJhdyB5IGF4aXNcblx0c2VsZi5zdmcuYXBwZW5kKCdnJylcblx0XHQuYXR0cignY2xhc3MnLCAneSBheGlzJylcblx0XHQuY2FsbChzZWxmLnlBeGlzKVxuXHRcdC5hcHBlbmQoJ3RleHQnKVxuXHRcdC5hdHRyKCd0cmFuc2Zvcm0nLCAncm90YXRlKC05MCknKVxuXHRcdC5hdHRyKCd5JywgLXNlbGYubGluZUNoYXJ0RGltZW5zaW9ucy5tYXJnaW4ubGVmdC8yIC0gNilcblx0XHQuYXR0cigneCcsIC0oc2VsZi5saW5lQ2hhcnREaW1lbnNpb25zLmhlaWdodCArIHNlbGYubGluZUNoYXJ0RGltZW5zaW9ucy5tYXJnaW4udG9wICsgc2VsZi5saW5lQ2hhcnREaW1lbnNpb25zLm1hcmdpbi5ib3R0b20pLzIpXG5cdFx0LmF0dHIoJ2NsYXNzJywgJ2F4aXNMYWJlbCcpXG5cdFx0LnRleHQoJ051bSBjaXRhdGlvbnMnKVxuXHRcdC5hdHRyKCdmb250LXNpemUnLCAnLjVlbScpO1xuXG5cdC8vIHZhciBtYXhYID0gc2VsZi54KHNlbGYueWVhclJhbmdlWzFdKTtcblx0Ly8gY29uc29sZS5sb2coc2VsZi55ZWFyUmFuZ2VbMF0pO1xuXHQvLyBzZWxmLmxpbmVhckdyYWRpZW50ID0gc2VsZi5zdmcuYXBwZW5kKCdsaW5lYXJHcmFkaWVudCcpXG5cdC8vICAgICAuYXR0cignaWQnLCAnbGluZS1ncmFkaWVudCcpXG5cdC8vICAgICAuYXR0cignZ3JhZGllbnRVbml0cycsICd1c2VyU3BhY2VPblVzZScpXG5cdC8vICAgICAuYXR0cigneDEnLCAwKS5hdHRyKCd5MScsIHNlbGYueChzZWxmLnllYXJSYW5nZVswXSkpXG5cdC8vICAgICAuYXR0cigneDInLCBtYXhYKVxuXHQvLyAgICAgLmF0dHIoJ3kyJywgMClcblx0Ly8gICAgIC5zZWxlY3RBbGwoJ3N0b3AnKVxuXHQvLyAgICAgLmRhdGEoW1xuXHQvLyBcdHtvZmZzZXQ6IHNlbGYueChzZWxmLnllYXJSYW5nZVswXSkvbWF4WCwgY29sb3I6IGQzLnJnYihzZWxmLmNvbG9yU2NoZW1lWzddKS5kYXJrZXIoKX0sXG5cdC8vIFx0e29mZnNldDogc2VsZi54KDE5ODUpL21heFgsIGNvbG9yOiBkMy5yZ2Ioc2VsZi5jb2xvclNjaGVtZVs3XSkuZGFya2VyKCl9LFxuXHQvLyBcdHtvZmZzZXQ6IHNlbGYueCgxOTg3KS9tYXhYLCBjb2xvcjogc2VsZi5jb2xvclNjaGVtZVsyXX0sXG5cdC8vIFx0e29mZnNldDogc2VsZi54KDE5ODkpL21heFgsIGNvbG9yOiBzZWxmLmNvbG9yU2NoZW1lWzJdfSxcblx0Ly8gXHR7b2Zmc2V0OiBzZWxmLngoMTk5MSkvbWF4WCwgY29sb3I6IHNlbGYuY29sb3JTY2hlbWVbMF19LFxuXHQvLyBcdHtvZmZzZXQ6IDEsIGNvbG9yOiBzZWxmLmNvbG9yU2NoZW1lWzBdfVxuXHQvLyAgICAgXSlcblx0Ly8gICAgIC5lbnRlcigpLmFwcGVuZCgnc3RvcCcpXG5cdC8vICAgICAuYXR0cignb2Zmc2V0JywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5vZmZzZXQ7IH0pXG5cdC8vICAgICAuYXR0cignc3RvcC1jb2xvcicsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuY29sb3I7IH0pO1xuXHQvLyBjb25zb2xlLmxvZyhzZWxmLmxpbmVhckdyYWRpZW50KTtcblx0c2VsZi5saW5lYXJHcmFkaWVudCA9IGQzLnNlbGVjdCgnI2xpbmUtZ3JhZGllbnQnKTtcblx0Ly8gaWYgKHNlbGYubGluZWFyR3JhZGllbnQuZW1wdHkoKSkge1xuXHQvLyBcdC8vIHNlbGYubGluZWFyR3JhZGllbnQgPSBzZWxmLm1ha2VDb2xvckdyYWRpZW50KDE5ODkpO1xuXHQvLyBcdHNlbGYubGluZWFyR3JhZGllbnQgPSBzZWxmLm1ha2VDb2xvckdyYWRpZW50KHNlbGYucGV3X0NsYXNzKTtcblx0Ly8gfVxuXHQvLyBzZWxmLmxpbmVhckdyYWRpZW50ID0gc2VsZi5tYWtlQ29sb3JHcmFkaWVudChzZWxmLnBld19DbGFzcyk7XG5cblx0c2VsZi5jaGFydEFyZWEgPSBzZWxmLnN2Zy5hcHBlbmQoJ2cnKVxuXHRcdC8vIC5hdHRyKCdjbGlwLXBhdGgnLCAndXJsKCNjbGlwKScpXG5cdFx0LmFwcGVuZCgncGF0aCcpXG5cdFx0LmRhdHVtKHNlbGYuZGF0YSlcblx0XHQuYXR0cignY2xhc3MnLCAnYXJlYScpXG5cdFx0Ly8gLnN0eWxlKCdmaWxsJywgc2VsZi5ncmFwaFBhcmFtcy5jb2xvclNjaGVtZS52YWx1ZVswXSlcblx0XHQuc3R5bGUoJ2ZpbGwnLCAndXJsKCNsaW5lLWdyYWRpZW50KScpXG5cdFx0LmF0dHIoJ2QnLCBzZWxmLmFyZWEpO1xuXG5cdHNlbGYuY2hhcnRMaW5lID0gc2VsZi5zdmcuYXBwZW5kKCdnJylcblx0XHQvLyAuYXR0cignY2xpcC1wYXRoJywgJ3VybCgjY2xpcCknKVxuXHRcdC5hcHBlbmQoJ3BhdGgnKVxuXHRcdC5kYXR1bShzZWxmLmRhdGEpXG5cdFx0LmF0dHIoJ2NsYXNzJywgJ2xpbmUnKVxuXHRcdC8vIC5zdHlsZSgnc3Ryb2tlJywgc2VsZi5ncmFwaFBhcmFtcy5jb2xvclNjaGVtZS52YWx1ZVswXSlcblx0XHQvLyAuc3R5bGUoJ3N0cm9rZScsICd1cmwoI2xpbmUtZ3JhZGllbnQpJylcblx0XHQuc3R5bGUoJ3N0cm9rZScsICdibGFjaycpXG5cdFx0LmF0dHIoJ2QnLCBzZWxmLmxpbmUpO1xuXG5cdHNlbGYuY3VyclllYXJJbmRpY2F0b3IgPSBzZWxmLnN2Zy5hcHBlbmQoJ3N2ZzpsaW5lJylcblx0XHQvLyAuYXR0cignY2xhc3MnLCAndmVydGljYWxMaW5lIHllYXJJbmRpY2F0b3InKVxuXHRcdC5hdHRyKCdjbGFzcycsICd2ZXJ0aWNhbExpbmUgeWVhckluZGljYXRvciBoaWRkZW4nKSAvLyB0dXJuIGl0IG9mZiBmb3Igbm93ICh0ZXN0aW5nIG90aGVyIHRoaW5ncylcblx0XHQvLyBLZWVwIHRyYWNrIG9mIHRyYW5zaXRpb24gdGltaW5nOlxuXHRcdC5hdHRyKCdUJywgMClcblx0XHQuYXR0cigneDEnLCBzZWxmLngoc2VsZi5jdXJyWWVhcikpXG5cdFx0LmF0dHIoJ3gyJywgc2VsZi54KHNlbGYuY3VyclllYXIpKVxuXHRcdC5hdHRyKCd5MScsIHNlbGYubGluZUNoYXJ0RGltZW5zaW9ucy5oZWlnaHQpXG5cdFx0Ly8gLmF0dHIoJ3kyJywgc2VsZi5saW5lQ2hhcnRZU2NhbGUoY3VyclZhbCkpXG5cdFx0LmF0dHIoJ3kyJywgMClcblx0XHQuYXR0cignc3Ryb2tlLXdpZHRoJywgMilcblx0XHQuYXR0cignc3Ryb2tlJywgJ2JsYWNrJylcblx0XHQuYXR0cignc3Ryb2tlLWRhc2hhcnJheScsICgnNSwgMicpKVxuXHRcdC5zdHlsZSgnb3BhY2l0eScsIC4yNSk7XG5cblx0Ly8gc2VsZi5zdmcuc2VsZWN0KCcueWVhclRpY2snKS5zZWxlY3QoJy5oaWdobGlnaHRSZWN0Jylcblx0Ly8gXHQuYXR0cignY2xhc3MnLCAnY3VyclllYXInKVxuXHQvLyBcdC50cmFuc2l0aW9uKClcblx0Ly8gXHQuZHVyYXRpb24oNTAwKVxuXHQvLyBcdC5zdHlsZSgnb3BhY2l0eScsIC4xKTtcblxuXHRzZWxmLnllYXJBcmVhID0gc2VsZi5zdmcuc2VsZWN0QWxsKCcueWVhckFyZWEnKVxuXHRcdC5kYXRhKHNlbGYuZGF0YSlcblx0XHQuZW50ZXIoKS5hcHBlbmQoJ3N2ZzpyZWN0Jylcblx0XHQuYXR0cignY2xhc3MnLCAneWVhckFyZWEgaGlkZGVuJylcblx0XHQuYXR0cignZGF0YS15ZWFyJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC55ZWFyOyB9KVxuXHRcdC5hdHRyKCd4JywgZnVuY3Rpb24oZCkgeyByZXR1cm4gc2VsZi54KGQueWVhcik7IH0pXG5cdFx0LmF0dHIoJ3knLCAwKVxuXHRcdC5hdHRyKCd3aWR0aCcsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIHNlbGYueChkLnllYXIrMSktc2VsZi54KGQueWVhcik7IH0pXG5cdFx0LmF0dHIoJ2hlaWdodCcsIHNlbGYubGluZUNoYXJ0RGltZW5zaW9ucy5oZWlnaHQpXG5cdFx0LmF0dHIoJ2ZpbGwnLCBzZWxmLmNvbG9yU2NoZW1lWzRdKVxuXHRcdC5zdHlsZSgnb3BhY2l0eScsIDApO1xuXG5cblx0aWYgKHR5cGVvZiBzZWxmLnBld19DbGFzcyAhPSAndW5kZWZpbmVkJykge1xuXHRcdHNlbGYubWFrZUZ1bmRpbmdMaW5lcyhzZWxmLnBld19DbGFzcyk7XG5cdH1cblxufTtcblxubGluZUNoYXJ0QnlZZWFyLnByb3RvdHlwZS5pbXBvcnREZWZhdWx0T3B0aW9ucyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdHNlbGYuY29sb3JTY2hlbWUgPSBvcHRpb25zLmNvbG9yU2NoZW1lO1xuXG5cdHNlbGYubGluZUNoYXJ0RGltZW5zaW9ucyA9IG9wdGlvbnMuZGltZW5zaW9ucy5saW5lQ2hhcnQ7XG5cblx0c2VsZi50cmFuc2l0aW9uVGltZVBlclllYXIgPSBvcHRpb25zLnRyYW5zaXRpb25UaW1lUGVyWWVhcjtcblxufTtcblxubGluZUNoYXJ0QnlZZWFyLnByb3RvdHlwZS5tYWtlQ29sb3JHcmFkaWVudCA9IGZ1bmN0aW9uKGZ1bmRpbmdZZWFyKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblx0Y29uc29sZS5sb2coZnVuZGluZ1llYXIpO1xuXG5cdC8vIFRoaXMgbWV0aG9kIHNob3VsZCBiZSBjYWxsZWQgYnkgdGhlIG1haW4gYXBwIChlLmcuIE1haW4uanMpXG5cdC8vIEl0IG1ha2VzIGEgbGluZWFyIGdyYWRpZW50IGZvciB0aGUgbGluZSBjaGFydHMgYmFzZWQgb24gZnVuZGluZyBwZXJpb2Rcblx0Ly8gZnVuZGluZ1llYXIgaXMgdGhlIFBldyBTY2hvbGFyJ3MgY2xhc3MgeWVhclxuXHQvLyBUaGUgUGV3IGZ1bmRpbmcgbGFzdHMgZm9yIGZpdmUgeWVhcnNcblx0Ly8gTWF5YmUgdGhpcyBtZXRob2Qgc2hvdWxkIGJlIG1vZGlmaWVkIGF0IHNvbWUgcG9pbnQgdG8gYmUgYWJsZSB0byBoYXZlIGRpZmZlcmVudCBsZW5ndGhzIG9mIGZ1bmRpbmdcblx0XG5cdC8vIFRISVMgRElETidUIFdPUksgYmVjYXVzZSB0aGUgd2lkdGggZGVwZW5kcyBvbiBzZWxmLmluaXQsIGJ1dCB0aGlzIG5lZWRzIHRvIGJlIGNhbGxlZCBiZWZvcmUgc2VsZi5pbml0XG5cdC8vXG5cdC8vIGluc3RlYWQgY2FsbCBpdCBpbiBzZWxmLmluaXQoKVxuXHRcblxuXHR2YXIgbWF4WCA9IHNlbGYueChzZWxmLnllYXJSYW5nZVsxXSk7XG5cdHZhciBsaW5lYXJHcmFkaWVudCA9IHNlbGYuc3ZnLmFwcGVuZCgnbGluZWFyR3JhZGllbnQnKVxuXHQgICAgLmF0dHIoJ2lkJywgJ2xpbmUtZ3JhZGllbnQnKVxuXHQgICAgLmF0dHIoJ2dyYWRpZW50VW5pdHMnLCAndXNlclNwYWNlT25Vc2UnKVxuXHQgICAgLmF0dHIoJ3gxJywgMCkuYXR0cigneTEnLCBzZWxmLngoc2VsZi55ZWFyUmFuZ2VbMF0pKVxuXHQgICAgLmF0dHIoJ3gyJywgbWF4WClcblx0ICAgIC5hdHRyKCd5MicsIDApXG5cdCAgICAuc2VsZWN0QWxsKCdzdG9wJylcblx0ICAgIC5kYXRhKFtcblx0XHR7b2Zmc2V0OiBzZWxmLngoc2VsZi55ZWFyUmFuZ2VbMF0pL21heFgsIGNvbG9yOiBkMy5yZ2Ioc2VsZi5jb2xvclNjaGVtZVs3XSkuZGFya2VyKCl9LFxuXHRcdHtvZmZzZXQ6IHNlbGYueChmdW5kaW5nWWVhci0xKS9tYXhYLCBjb2xvcjogZDMucmdiKHNlbGYuY29sb3JTY2hlbWVbN10pLmRhcmtlcigpfSxcblx0XHR7b2Zmc2V0OiBzZWxmLngoZnVuZGluZ1llYXIrMSkvbWF4WCwgY29sb3I6IHNlbGYuY29sb3JTY2hlbWVbMl19LFxuXHRcdHtvZmZzZXQ6IHNlbGYueChmdW5kaW5nWWVhciArIChzZWxmLmZ1bmRpbmdUaW1lKS0xKS9tYXhYLCBjb2xvcjogc2VsZi5jb2xvclNjaGVtZVsyXX0sXG5cdFx0e29mZnNldDogc2VsZi54KGZ1bmRpbmdZZWFyICsgKHNlbGYuZnVuZGluZ1RpbWUpKzEpL21heFgsIGNvbG9yOiBzZWxmLmNvbG9yU2NoZW1lWzBdfSxcblx0XHR7b2Zmc2V0OiAxLCBjb2xvcjogc2VsZi5jb2xvclNjaGVtZVswXX1cblx0ICAgIF0pXG5cdCAgICAuZW50ZXIoKS5hcHBlbmQoJ3N0b3AnKVxuXHQgICAgLmF0dHIoJ29mZnNldCcsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQub2Zmc2V0OyB9KVxuXHQgICAgLmF0dHIoJ3N0b3AtY29sb3InLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLmNvbG9yOyB9KTtcblxuXHRyZXR1cm4gbGluZWFyR3JhZGllbnQ7XG5cbn07XG5cbmxpbmVDaGFydEJ5WWVhci5wcm90b3R5cGUubWFrZUZ1bmRpbmdMaW5lcyA9IGZ1bmN0aW9uKGZ1bmRpbmdZZWFyKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblxuXHQvLyBNYWtlIHRoZSB2ZXJ0aWNhbCBsaW5lcyB0aGF0IHNob3cgZnVuZGluZyBwZXJpb2RcblxuXG5cdHNlbGYuc3ZnLmFwcGVuZCgnc3ZnOmxpbmUnKVxuXHRcdC5hdHRyKCdjbGFzcycsICd2ZXJ0aWNhbExpbmVTdGF0aWMgdmVydGljYWxMaW5lRnVuZGluZ0JlZ2luJylcblx0XHQuYXR0cigneDEnLCBzZWxmLngoZnVuZGluZ1llYXIpKVxuXHRcdC5hdHRyKCd4MicsIHNlbGYueChmdW5kaW5nWWVhcikpXG5cdFx0LmF0dHIoJ3kxJywgc2VsZi5saW5lQ2hhcnREaW1lbnNpb25zLmhlaWdodClcblx0XHQuYXR0cigneTInLCAwKVxuXHRcdC5hdHRyKCdzdHJva2Utd2lkdGgnLCAyKVxuXHRcdC5hdHRyKCdzdHJva2UnLCBzZWxmLmNvbG9yU2NoZW1lWzJdKVxuXHRcdC5zdHlsZSgnc3Ryb2tlLWRhc2hhcnJheScsICgnNSwgMicpKVxuXHRcdC5zdHlsZSgnb3BhY2l0eScsIC44KTtcblx0c2VsZi5zdmcuYXBwZW5kKCdzdmc6bGluZScpXG5cdFx0LmF0dHIoJ2NsYXNzJywgJ3ZlcnRpY2FsTGluZVN0YXRpYyB2ZXJ0aWNhbExpbmVGdW5kaW5nRW5kJylcblx0XHQuYXR0cigneDEnLCBzZWxmLngoZnVuZGluZ1llYXIgKyBzZWxmLmZ1bmRpbmdUaW1lKSlcblx0XHQuYXR0cigneDInLCBzZWxmLngoZnVuZGluZ1llYXIgKyBzZWxmLmZ1bmRpbmdUaW1lKSlcblx0XHQuYXR0cigneTEnLCBzZWxmLmxpbmVDaGFydERpbWVuc2lvbnMuaGVpZ2h0KVxuXHRcdC5hdHRyKCd5MicsIDApXG5cdFx0LmF0dHIoJ3N0cm9rZS13aWR0aCcsIDIpXG5cdFx0LmF0dHIoJ3N0cm9rZScsIHNlbGYuY29sb3JTY2hlbWVbMF0pXG5cdFx0LnN0eWxlKCdzdHJva2UtZGFzaGFycmF5JywgKCc1LCAyJykpXG5cdFx0LnN0eWxlKCdvcGFjaXR5JywgLjgpO1xufTtcblxubGluZUNoYXJ0QnlZZWFyLnByb3RvdHlwZS5jaGFuZ2VBbmltYXRpb25TdGF0ZSA9IGZ1bmN0aW9uKGFuaW1hdGlvblN0YXRlKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblxuXHRzZWxmLmFuaW1hdGlvblN0YXRlID0gYW5pbWF0aW9uU3RhdGU7XG5cdGNvbnNvbGUubG9nKHNlbGYuYW5pbWF0aW9uU3RhdGUpO1xuXHRmdW5jdGlvbiBhZHZhbmNlTGluZSgpIHtcblx0XHR2YXIgdGltZUVsYXBzZWQgPSBzZWxmLmN1cnJZZWFySW5kaWNhdG9yLmF0dHIoJ1QnKTtcblx0XHRzZWxmLmN1cnJZZWFySW5kaWNhdG9yXG5cdFx0XHQuYXR0cignZGF0YS1zdGF0ZScsICdmb3J3YXJkJylcblx0XHRcdC8vIC5hdHRyKCdUJywgMClcblx0XHRcdC5jbGFzc2VkKCdoaWRkZW4nLCBmYWxzZSlcblx0XHRcdC50cmFuc2l0aW9uKClcblx0XHRcdC8vIC5kdXJhdGlvbihzZWxmLnRyYW5zaXRpb25UaW1lUGVyWWVhcltzZWxmLmN1cnJZZWFyXSAtIHRpbWVFbGFwc2VkKVxuXHRcdFx0LmR1cmF0aW9uKHNlbGYudHJhbnNpdGlvblRpbWVQZXJZZWFyW3NlbGYuY3VyclllYXJdKVxuXHRcdFx0LmVhc2UoJ2xpbmVhcicpXG5cdFx0XHQuYXR0cigneDEnLCBzZWxmLngoc2VsZi5jdXJyWWVhcikpXG5cdFx0XHQuYXR0cigneDInLCBzZWxmLngoc2VsZi5jdXJyWWVhcikpXG5cdFx0XHQvLyAuYXR0cigneTInLCBzZWxmLmxpbmVDaGFydFlTY2FsZShjdXJyVmFsKSlcblx0XHRcdC5hdHRyKCdkYXRhLXN0YXRlJywgJ3N0b3BwZWQnKVxuXHRcdFx0LmF0dHIoJ1QnLCAxKVxuXHRcdFx0LmVhY2goJ2VuZCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRkMy5zZWxlY3QodGhpcykuYXR0cignVCcsIDApO1xuXHRcdFx0XHRzZWxmLmN1cnJZZWFyKys7XG5cdFx0XHRcdC8vIGFkdmFuY2VMaW5lKClcblx0XHRcdH0pO1xuXHRcdC8vIC8vIFVwZGF0ZSB0aGUgY2xpcCBwYXRoIHRvIHNob3cgdGhlIHBhcnQgb2YgdGhlIGxpbmUgd2Ugd2FudCAod2l0aCB0cmFuc2l0aW9uKVxuXHRcdC8vIHNlbGYubGluZUNoYXJ0Q2xpcFBhdGhcblx0XHQvLyBcdC5hdHRyKCdkYXRhLXN0YXRlJywgJ2ZvcndhcmQnKVxuXHRcdC8vIFx0Ly8gLmF0dHIoJ1QnLCAwKVxuXHRcdC8vIFx0LnRyYW5zaXRpb24oKVxuXHRcdC8vIFx0LmR1cmF0aW9uKHNlbGYuZ3JhcGhQYXJhbXMudHJhbnNpdGlvblRpbWVQZXJZZWFyLnZhbHVlIC0gdGltZUVsYXBzZWQpXG5cdFx0Ly8gXHQuZWFzZSgnbGluZWFyJylcblx0XHQvLyBcdC5hdHRyKCd3aWR0aCcsIHNlbGYubGluZUNoYXJ0WFNjYWxlKGN1cnJZZWFyRGF0ZUZvcm1hdCkpXG5cdFx0Ly8gXHQuYXR0cignZGF0YS1zdGF0ZScsICdzdG9wcGVkJylcblx0XHQvLyBcdC5hdHRyKCdUJywgMSlcblx0XHQvLyBcdC5lYWNoKCdlbmQnLCBmdW5jdGlvbigpIHsgZDMuc2VsZWN0KHRoaXMpLmF0dHIoJ1QnLCAwKTsgfSk7XG5cdH1cblx0aWYgKHNlbGYuYW5pbWF0aW9uU3RhdGUgPT09ICdmb3J3YXJkJykge1xuXHRcdGFkdmFuY2VMaW5lKCk7XG5cdH1cbn07XG5cbmxpbmVDaGFydEJ5WWVhci5wcm90b3R5cGUuY29ycmVjdFllYXIgPSBmdW5jdGlvbihjdXJyWWVhcikge1xuXHR2YXIgc2VsZiA9IHRoaXM7XG5cdGlmIChjdXJyWWVhciAhPSBzZWxmLmN1cnJZZWFyKSB7XG5cdFx0c2VsZi5jdXJyWWVhciA9IGN1cnJZZWFyO1xuXHRcdHNlbGYuY3VyclllYXJJbmRpY2F0b3Jcblx0XHRcdC5hdHRyKCd4MScsIHNlbGYueChzZWxmLmN1cnJZZWFyKSlcblx0XHRcdC5hdHRyKCd4MicsIHNlbGYueChzZWxmLmN1cnJZZWFyKSk7XG5cdFx0c2VsZi5jaGFuZ2VBbmltYXRpb25TdGF0ZSgpO1xuXHR9XG59O1xuXG5saW5lQ2hhcnRCeVllYXIucHJvdG90eXBlLm1vdmVZZWFySW5kaWNhdG9yID0gZnVuY3Rpb24oY3VyclllYXIpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdHNlbGYuY3VyclllYXIgPSBjdXJyWWVhcjtcblx0c2VsZi5jdXJyWWVhckluZGljYXRvclxuXHRcdC5hdHRyKCdUJywgMClcblx0XHQudHJhbnNpdGlvbigpXG5cdFx0LmR1cmF0aW9uKHNlbGYudHJhbnNpdGlvblRpbWVQZXJZZWFyW3NlbGYuY3VyclllYXJdKVxuXHRcdC5lYXNlKCdsaW5lYXInKVxuXHRcdC5hdHRyKCd4MScsIHNlbGYueChzZWxmLmN1cnJZZWFyKSlcblx0XHQuYXR0cigneDInLCBzZWxmLngoc2VsZi5jdXJyWWVhcikpXG5cdFx0Ly8gLmF0dHIoJ3kyJywgc2VsZi5saW5lQ2hhcnRZU2NhbGUoY3VyclZhbCkpXG5cdFx0Ly8gLmF0dHIoJ2RhdGEtc3RhdGUnLCAnc3RvcHBlZCcpXG5cdFx0LmF0dHIoJ1QnLCAxKVxuXHRcdC5lYWNoKCdlbmQnLCBmdW5jdGlvbigpIHtcblx0XHRcdGQzLnNlbGVjdCh0aGlzKS5hdHRyKCdUJywgMCk7XG5cdFx0fSk7XG5cdGZ1bmN0aW9uIGhpZ2hsaWdodEN1cnJZZWFyVGljaygpIHtcblx0XHRzZWxmLnN2Zy5zZWxlY3RBbGwoJy55ZWFyVGljaycpLnNlbGVjdEFsbCgnLmhpZ2hsaWdodFJlY3QnKVxuXHRcdFx0LmZpbHRlcihmdW5jdGlvbihkKSB7IHJldHVybiBkID09IHNlbGYuY3VyclllYXI7IH0pXG5cdFx0XHQuYXR0cignY2xhc3MnLCAnY3VyclllYXInKVxuXHRcdFx0LnRyYW5zaXRpb24oKVxuXHRcdFx0LmR1cmF0aW9uKHNlbGYudHJhbnNpdGlvblRpbWVQZXJZZWFyW3NlbGYuY3VyclllYXJdLzQpXG5cdFx0XHQuc3R5bGUoJ29wYWNpdHknLCAuMSk7XG5cdH1cblx0c2VsZi5zdmcuc2VsZWN0QWxsKCcueWVhclRpY2snKS5zZWxlY3RBbGwoJy5jdXJyWWVhcicpXG5cdFx0LmNsYXNzZWQoJy5jdXJyWWVhcicsIGZhbHNlKVxuXHRcdC50cmFuc2l0aW9uKClcblx0XHQuZHVyYXRpb24oc2VsZi50cmFuc2l0aW9uVGltZVBlclllYXJbc2VsZi5jdXJyWWVhcl0vNClcblx0XHQuc3R5bGUoJ29wYWNpdHknLCAwKTtcblx0Ly8gaGlnaGxpZ2h0Q3VyclllYXJUaWNrKCk7XG5cblx0c2VsZi5zdmcuc2VsZWN0QWxsKCcueWVhckFyZWEuY3VyclllYXInKVxuXHRcdC5jbGFzc2VkKCdjdXJyWWVhcicsIGZhbHNlKVxuXHRcdC50cmFuc2l0aW9uKClcblx0XHQuZHVyYXRpb24oc2VsZi50cmFuc2l0aW9uVGltZVBlclllYXJbc2VsZi5jdXJyWWVhcl0vNClcblx0XHQvLyAuc3R5bGUoJ29wYWNpdHknLCBzZWxmLnllYXJBcmVhT3BhY2l0eS8yKTtcblx0XHQuc3R5bGUoJ29wYWNpdHknLCBmdW5jdGlvbihkKSB7XG5cdFx0XHRpZiAoZC55ZWFyIDwgc2VsZi5jdXJyWWVhcikge1xuXHRcdFx0XHRyZXR1cm4gc2VsZi55ZWFyQXJlYU9wYWNpdHkvMjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRzZWxmLnllYXJBcmVhLmZpbHRlcihmdW5jdGlvbihkKSB7IHJldHVybiBkLnllYXIgPT0gc2VsZi5jdXJyWWVhcjsgfSlcblx0XHQuY2xhc3NlZCgnY3VyclllYXInLCB0cnVlKVxuXHRcdC5jbGFzc2VkKCdoaWRkZW4nLCBmYWxzZSlcblx0XHQuc3R5bGUoJ29wYWNpdHknLCBzZWxmLnllYXJBcmVhT3BhY2l0eSoyKVxuXHRcdC50cmFuc2l0aW9uKClcblx0XHQuZHVyYXRpb24oc2VsZi50cmFuc2l0aW9uVGltZVBlclllYXJbc2VsZi5jdXJyWWVhcl0vMilcblx0XHQuc3R5bGUoJ29wYWNpdHknLCBzZWxmLnllYXJBcmVhT3BhY2l0eSk7XG5cblx0Ly8gbWFrZSBzdXJlIHRoYXQgZXZlcnl0aGluZyBpcyBpbiBvcmRlci4uLiBpLmUuIHRoYXQgeWVhcnMgYmVmb3JlIGN1cnJZZWFyIGFyZSBoaWdobGlnaHRlZFxuXHQvLyBhbmQgeWVhcnMgYWZ0ZXIgY3VyclllYXIgYXJlIG5vdFxuXHRzZWxmLnllYXJBcmVhLmZpbHRlcihmdW5jdGlvbihkKSB7IHJldHVybiBkLnllYXIgPCBzZWxmLmN1cnJZZWFyOyB9KVxuXHRcdC5jbGFzc2VkKCdoaWRkZW4nLCBmYWxzZSlcblx0XHQuc3R5bGUoJ29wYWNpdHknLCBzZWxmLnllYXJBcmVhT3BhY2l0eS8yKTtcblx0c2VsZi55ZWFyQXJlYS5maWx0ZXIoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC55ZWFyID4gc2VsZi5jdXJyWWVhcjsgfSlcblx0XHQuc3R5bGUoJ29wYWNpdHknLCAwKTtcblx0Y29uc29sZS5sb2coc2VsZi5jdXJyWWVhcik7XG5cbn07XG5cbmxpbmVDaGFydEJ5WWVhci5wcm90b3R5cGUuYWRkVGl0bGUgPSBmdW5jdGlvbih0aXRsZSkge1xuXHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0c2VsZi50aXRsZSA9IHNlbGYuc3ZnLmFwcGVuZCgndGV4dCcpXG5cdCAgICAuYXR0cignY2xhc3MnLCAnbGluZUNoYXJ0VGl0bGUnKVxuXHQgICAgLmF0dHIoJ3gnLCBzZWxmLmxpbmVDaGFydERpbWVuc2lvbnMud2lkdGgvMilcblx0ICAgIC5hdHRyKCd5JywgMCAtIChzZWxmLmxpbmVDaGFydERpbWVuc2lvbnMubWFyZ2luLnRvcCAvIDIpIClcblx0ICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuXHQgICAgLnRleHQodGl0bGUpO1xuXG59O1xudmFyIGNpdGF0aW9uVmlzID0gY2l0YXRpb25WaXMgfHwge307XG5cbmNpdGF0aW9uVmlzLnN1bW1hcnlTdGF0aXN0aWNzID0gKGZ1bmN0aW9uKCkge1xuXG5cdGZ1bmN0aW9uIGFkZFN1bW1hcnlTdGF0aXN0aWNzKGdyYXBoKSB7XG5cblx0XHRmdW5jdGlvbiBjbGVhbkxpbmtzKGxpbmtzKSB7XG5cdFx0XHR2YXIgY2xlYW5lZExpbmtzID0gW107XG5cdFx0XHRsaW5rcy5mb3JFYWNoKGZ1bmN0aW9uKGQpIHtcblx0XHRcdFx0aWYgKCAodHlwZW9mIGQubGlua1RvRWdvICE9ICd1bmRlZmluZWQnKSAmJiAoZC5saW5rVG9FZ28gPT09IHRydWUpICkge1xuXHRcdFx0XHRcdHZhciBzb3VyY2VZZWFyID0gK2Quc291cmNlWWVhcjtcblx0XHRcdFx0XHR2YXIgdGFyZ2V0WWVhciA9ICtkLnRhcmdldFllYXI7XG5cdFx0XHRcdFx0aWYgKCAoc291cmNlWWVhciA+IDApICYmICh0YXJnZXRZZWFyID4gMCkgJiYgKHNvdXJjZVllYXIgPj0gdGFyZ2V0WWVhcikgKSB7XG5cdFx0XHRcdFx0XHRjbGVhbmVkTGlua3MucHVzaChkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIGNsZWFuZWRMaW5rcztcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBnZXRZZWFyUmFuZ2UobGlua3MpIHtcblx0XHRcdC8vIEEgbG90IG9mIHRoaXMgY29kZSB3YXMgY29waWVkIGZyb20gbGluZUNoYXJ0RGF0YVxuXHRcdFx0Ly8gTWF5IG5lZWQgdG8gY2xlYW4gdGhpcyB1cCAoVE9ETylcblxuXHRcdFx0Ly8gTWFrZSBzdXJlIGFsbCBvdXIgZGF0YSBmYWxsIHdpdGhpbiB0aGUgYXBwcm9wcmlhdGUgdGltZSBzcGFuLlxuXHRcdFx0Ly8gVGhlIG1pbmltdW0geWVhciBpcyB0aGUgZWFybGllc3QgcHVibGljYXRpb24gYnkgdGhlIGVnbyBhdXRob3IgKHRoZXJlIHdpbGwgbGlrZWx5IGJlIG5vIGNpdGF0aW9ucyB3aXRoaW4gdGhpcyB5ZWFyLCBidXQgdGhpcyBjaGFydCBuZWVkcyB0byBsaW5lIHVwIHdpdGggdGhlIG90aGVyIGNoYXJ0cykuXG5cdFx0XHQvLyBUaGUgbWF4aW11bSB5ZWFyIGlzIHRoZSBsYXN0IHllYXIgdGhhdCBhIHBhcGVyIGNpdGVkIG9uZSBvZiB0aGUgZWdvIGF1dGhvcidzIHBhcGVyIChjaGVja2luZyB0byBtYWtlIHN1cmUgaXQgaXMgbm90IGluIHRoZSBmdXR1cmUsIHdoaWNoIHdvdWxkIG1lYW4gYmFkIGRhdGEpLlxuXHRcdFx0dmFyIGNsZWFuZWRMaW5rcyA9IGNsZWFuTGlua3MobGlua3MpO1xuXHRcdFx0dmFyIG1pblllYXIgPSBkMy5taW4oY2xlYW5lZExpbmtzLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLnRhcmdldFllYXI+MCA/IGQudGFyZ2V0WWVhciA6IG51bGw7IH0pO1xuXHRcdFx0Ly8gR2V0IGN1cnJlbnQgeWVhciAodXNpbmcgdG9kYXkncyBkYXRlKTpcblx0XHRcdHZhciB0b2RheVllYXIgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XG5cdFx0XHR2YXIgbWF4WWVhciA9IGQzLm1heChjbGVhbmVkTGlua3MsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuc291cmNlWWVhcjw9dG9kYXlZZWFyID8gZC5zb3VyY2VZZWFyIDogbnVsbDsgfSk7XG5cdFx0XHRyZXR1cm4gW21pblllYXIsIG1heFllYXJdO1xuXHRcdH1cblxuXG5cdFx0ZnVuY3Rpb24gZ2V0RW1wdHlDb3VudERhdGEoeWVhclJhbmdlKSB7XG5cdFx0XHR2YXIgZW1wdHlDb3VudERhdGEgPSBbXTtcblx0XHRcdGZvciAodmFyIGk9eWVhclJhbmdlWzBdOyBpPD15ZWFyUmFuZ2VbMV07IGkrKykge1xuXHRcdFx0XHRlbXB0eUNvdW50RGF0YS5wdXNoKHt5ZWFyOiBpLCBjb3VudDogMH0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGVtcHR5Q291bnREYXRhO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGdldENpdGF0aW9uQ291bnRzUGVyWWVhcihncmFwaCkge1xuXHRcdFx0dmFyIGNpdGF0aW9uQ291bnRzUGVyWWVhciA9IGdldEVtcHR5Q291bnREYXRhKGdyYXBoLmdyYXBoLnllYXJSYW5nZSk7XG5cdFx0XHR2YXIgY2xlYW5lZExpbmtzID0gY2xlYW5MaW5rcyhncmFwaC5saW5rcyk7XG5cdFx0XHRjbGVhbmVkTGlua3MuZm9yRWFjaChmdW5jdGlvbihkLCBpKSB7XG5cdFx0XHRcdHZhciB0aGlzU291cmNlWWVhciA9IGQuc291cmNlWWVhcjtcblx0XHRcdFx0dmFyIGRhdGFUaGlzWWVhciA9IGNpdGF0aW9uQ291bnRzUGVyWWVhci5maWx0ZXIoZnVuY3Rpb24oZGQpIHsgcmV0dXJuIGRkLnllYXI9PT10aGlzU291cmNlWWVhcjsgfSlbMF07XG5cdFx0XHRcdGRhdGFUaGlzWWVhci5jb3VudCsrO1xuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybiBjaXRhdGlvbkNvdW50c1BlclllYXI7XG5cdFx0fVxuXG5cdFx0Z3JhcGguZ3JhcGgueWVhclJhbmdlID0gZ2V0WWVhclJhbmdlKGdyYXBoLmxpbmtzKTtcblx0XHRncmFwaC5ncmFwaC5jaXRhdGlvbkNvdW50c1BlclllYXIgPSBnZXRDaXRhdGlvbkNvdW50c1BlclllYXIoZ3JhcGgpO1xuXHRcdHJldHVybiBncmFwaDtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0YWRkU3VtbWFyeVN0YXRpc3RpY3M6IGFkZFN1bW1hcnlTdGF0aXN0aWNzXG5cdH07XG59KCkpO1xuXG5cblxuLy8gaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9zbmlwcGV0cy9qYXZhc2NyaXB0L2dldC11cmwtdmFyaWFibGVzL1xuZnVuY3Rpb24gZ2V0UXVlcnlWYXJpYWJsZSh2YXJpYWJsZSlcbntcbiAgICB2YXIgcXVlcnkgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKTtcbiAgICB2YXIgdmFycyA9IHF1ZXJ5LnNwbGl0KFwiJlwiKTtcbiAgICBmb3IgKHZhciBpPTA7IGk8dmFycy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcGFpciA9IHZhcnNbaV0uc3BsaXQoXCI9XCIpO1xuICAgICAgICBpZihwYWlyWzBdID09IHZhcmlhYmxlKSB7cmV0dXJuIHBhaXJbMV07fVxuICAgIH1cbiAgICByZXR1cm4oZmFsc2UpO1xufVxuXG5cblxudmFyIGNpdGF0aW9uVmlzID0gY2l0YXRpb25WaXMgfHwge307XG5cbmNpdGF0aW9uVmlzLmdldFRyYW5zaXRpb25UaW1lUGVyWWVhcj0gZnVuY3Rpb24oZ3JhcGgsIGxvbmdlc3RZZWFyVHJhbnNpdGlvblRpbWUpIHtcblx0Y29uc29sZS5sb2coZ3JhcGgpO1xuXHQvLyBUaGlzIHdpbGwgbGV0IHVzIHZhcnkgdGhlIHRyYW5zaXRpb24gdGltZSBwZXIgeWVhclxuXHR2YXIgdHJhbnNpdGlvblRpbWVQZXJZZWFyID0ge307XG5cdHZhciBlbXB0eVllYXJUcmFuc2l0aW9uVGltZSA9IDMwMDtcblx0Ly8gdmFyIGxvbmdlc3RZZWFyVHJhbnNpdGlvblRpbWUgPSA0MDAwO1xuXHQvLyBTZXQgZGVmYXVsdCB2YWx1ZTpcblx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy84OTQ4NjAvc2V0LWEtZGVmYXVsdC1wYXJhbWV0ZXItdmFsdWUtZm9yLWEtamF2YXNjcmlwdC1mdW5jdGlvblxuXHR2YXIgbG9uZ2VzdFllYXJUcmFuc2l0aW9uVGltZSA9IHR5cGVvZiBsb25nZXN0WWVhclRyYW5zaXRpb25UaW1lICE9PSAndW5kZWZpbmVkJyA/IGxvbmdlc3RZZWFyVHJhbnNpdGlvblRpbWUgOiA0MDAwO1xuXHQvLyBUaGlzIHNjYWxlIHRha2VzIHRoZSBudW1iZXIgb2Ygbm9kZXMgZm9yIGEgZ2l2ZW4geWVhciBhcyBpbnB1dFxuXHQvLyBhbmQgb3V0cHV0cyB0aGUgdHJhbnNpdGlvbiB0aW1lLCBiYXNlZCBvbiBhIHRocmVzaG9sZCBtYXBwaW5nXG5cdHZhciB0aHJlc2hvbGRTY2FsZSA9IGQzLnNjYWxlLnRocmVzaG9sZCgpXG5cdFx0LmRvbWFpbihbMSwgMywgMTAsIDIwLCAzMF0pXG5cdFx0LnJhbmdlKFtcblx0XHRcdFx0ZW1wdHlZZWFyVHJhbnNpdGlvblRpbWUsICAvLyB6ZXJvIG5vZGVzXG5cdFx0XHRcdGxvbmdlc3RZZWFyVHJhbnNpdGlvblRpbWUgKiAuMiwgIC8vIG9uZSBvciB0d28gbm9kZXNcblx0XHRcdFx0bG9uZ2VzdFllYXJUcmFuc2l0aW9uVGltZSAqIC41LCAvLyAzIHRvIDlcblx0XHRcdFx0bG9uZ2VzdFllYXJUcmFuc2l0aW9uVGltZSAqIC43LCAgLy8gMTAgdG8gMTlcblx0XHRcdFx0bG9uZ2VzdFllYXJUcmFuc2l0aW9uVGltZSAqIC44NSwgIC8vIDIwIHRvIDI5XG5cdFx0XHRcdGxvbmdlc3RZZWFyVHJhbnNpdGlvblRpbWUgIC8vIDMwK1xuXHRcdFx0XHRdKTtcblx0dmFyIHllYXJSYW5nZSA9IGdyYXBoLmdyYXBoLnllYXJSYW5nZTtcblx0XG5cdC8vIFB1dCB0aGUgdHJhbnNpdGlvbiB0aW1lIGZvciBlYWNoIHllYXIgaW50byBhbiBvYmplY3Rcblx0Zm9yICh2YXIgaT15ZWFyUmFuZ2VbMF07IGk8PXllYXJSYW5nZVsxXTsgaSsrKSB7XG5cdFx0Ly8gdHJhbnNpdGlvblRpbWVQZXJZZWFyW2ldID0gMTAwMDtcblx0XHR0cmFuc2l0aW9uVGltZVBlclllYXJbaV0gPSB0aHJlc2hvbGRTY2FsZShncmFwaC5ncmFwaC5ub2RlQ291bnRzUGVyWWVhcltpXSk7XG5cdH1cblx0cmV0dXJuIHRyYW5zaXRpb25UaW1lUGVyWWVhcjtcbn07XG5cbmNpdGF0aW9uVmlzLnllYXJUaWNrQ2xpY2tFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gQWRkIGNsaWNrIGxpc3RlbmVycyB0byBsaW5lIGNoYXJ0IGF4aXMgdGljayBsYWJlbHMgKHllYXJzKS5cbiAgICAvLyBPbiBjbGljaywgYSBuZXcgZGVzdGluYXRpb24gbm9kZSB3aWxsIGJlIHNldC5cbiAgICBkMy5zZWxlY3RBbGwoJy55ZWFyVGljaycpXG4gICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAvLyBHZXQgdGhlIHllYXIgKGFzIGludGVnZXIpXG4gICAgICAgICAgICB2YXIgZGVzdGluYXRpb25ZZWFyID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEteWVhcicpO1xuICAgICAgICAgICAgLy8gU3RvcCBhbGwgdHJhbnNpdGlvbnMgb24gbm9kZXMgYW5kIGxpbmtzXG4gICAgICAgICAgICBkMy5zZWxlY3RBbGwoJy5ub2RlLCAubGluaycpLnRyYW5zaXRpb24oKS5kdXJhdGlvbigwKTtcblxuXHRcdFx0Y2l0YXRpb25WaXMuZWdvR3JhcGhWaXMubmV3RGVzdGluYXRpb25Ob2RlKGRlc3RpbmF0aW9uWWVhcik7XG4gICAgICAgIH0pO1xufTtcblxuZnVuY3Rpb24gbWFpbigpIHtcblxuXG5kMy5zZWxlY3QoJyNtYWluRGl2JykuYXBwZW5kKCdwJylcblx0LmF0dHIoXCJjbGFzc1wiLCBcImxvYWRpbmdUZXh0XCIpXG5cdC50ZXh0KCdMb2FkaW5nLi4uJyk7XG5cbmQzLmpzb24oJ25hczJfbWFnX2RvaV9qb2luX25ldHdvcmtfZnVsbGRhdGFfd2l0aF9mb3NfbmFtZXMuanNvbicsIGZ1bmN0aW9uKGVycm9yLCBncmFwaCkge1xuXHRjb25zb2xlLmxvZyhlcnJvcik7XG5cdGlmIChlcnJvcikge1xuXHRcdHZhciBjb250YWN0RW1haWwgPSAnanBvcnRlbm9AdXcuZWR1Jztcblx0XHR2YXIgZXJySHRtbCA9ICdUaGVyZSB3YXMgYW4gZXJyb3IgZ2VuZXJhdGluZyB0aGUgdmlzdWFsaXphdGlvbiwgb3IgZWxzZSBkYXRhIHByb2Nlc3NpbmcgaXMgc3RpbGwgaW4gcHJvZ3Jlc3MuIFRyeSByZWxvYWRpbmcgdGhlIHBhZ2UgbGF0ZXIsIG9yIGdlbmVyYXRpbmcgdGhlIHZpc3VhbGl6YXRpb24gYWdhaW4uIElmIHRoZSBwcm9ibGVtIHBlcnNpc3RzLCA8YSBocmVmPVwibWFpbHRvOicgKyBjb250YWN0RW1haWwgKyAnXCI+Y29udGFjdCB0aGUgYWRtaW5pc3RyYXRvcjwvYT4uJ1xuXHRcdCQoICcubG9hZGluZ1RleHQnICkuaHRtbCggZXJySHRtbCApXG5cdFx0XHQuY3NzKCB7J2NvbG9yJzogJ3JlZCd9ICk7XG5cdFx0dGhyb3cgZXJyb3I7XG5cdH1cblxuXHQvLyBHZXQgdGhlIG1vc3QgY29tbW9uIERvbWFpbiBJRHMgZm9yIHRoZSBlZ28gYXV0aG9yJ3MgcGFwZXJzXG5cdHZhciBkb21haW5zTmVzdCA9IGQzLm5lc3QoKVxuXHRcdC5rZXkoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5Eb21haW5JRDsgfSkuc29ydFZhbHVlcyhkMy5kZXNjZW5kaW5nKVxuXHRcdC5yb2xsdXAoZnVuY3Rpb24obGVhdmVzKSB7IHJldHVybiBsZWF2ZXMubGVuZ3RoOyB9KVxuXHRcdC5lbnRyaWVzKGdyYXBoLm5vZGVzWzBdLnBhcGVycyk7XG5cdGRvbWFpbnNOZXN0LnNvcnQoZnVuY3Rpb24oYSxiKSB7IHJldHVybiBkMy5kZXNjZW5kaW5nKGEudmFsdWVzLCBiLnZhbHVlcyk7IH0pO1xuXHQvLyBzdG9yZSBhcyBhIG5vZGUgcHJvcGVydHlcblx0Z3JhcGgubm9kZXNbMF0uRG9tYWluQ291bnRzID0gZG9tYWluc05lc3Q7XG5cdGNvbnNvbGUubG9nKGdyYXBoKTtcblx0Ly8gZDMuc2VsZWN0KCcjaW5mb0RpdicpLmFwcGVuZCgncCcpLnRleHQoZ3JhcGgubm9kZXNbMF0uQXV0aG9yTmFtZSk7XG5cblx0dmFyIGRlZmF1bHRfb3B0aW9ucyA9IGNpdGF0aW9uVmlzLmRlZmF1bHRfb3B0aW9ucywgXG5cdFx0c3VtbWFyeVN0YXRpc3RpY3MgPSBjaXRhdGlvblZpcy5zdW1tYXJ5U3RhdGlzdGljcyxcblx0XHRlZ29HcmFwaERhdGEgPSBjaXRhdGlvblZpcy5lZ29HcmFwaERhdGEsXG5cdCAgICBsaW5lQ2hhcnREYXRhID0gY2l0YXRpb25WaXMubGluZUNoYXJ0RGF0YSxcblx0XHRldmVudExpc3RlbmVycyA9IGNpdGF0aW9uVmlzLmV2ZW50TGlzdGVuZXJzO1xuXG5cdHZhciBvcHRpb25zID0gZGVmYXVsdF9vcHRpb25zLmRlZmF1bHRzO1xuXHRjb25zb2xlLmxvZyhvcHRpb25zKTtcblxuXHRncmFwaCA9IHN1bW1hcnlTdGF0aXN0aWNzLmFkZFN1bW1hcnlTdGF0aXN0aWNzKGdyYXBoKTtcblx0Y2l0YXRpb25WaXMuZ3JhcGhfZGF0YSA9IGVnb0dyYXBoRGF0YS5wcmVwYXJlX2Vnb0dyYXBoRGF0YShncmFwaCk7XG5cdGNpdGF0aW9uVmlzLnB1YmxpY2F0aW9uc19kYXRhID0gbGluZUNoYXJ0RGF0YS5wcmVwYXJlRGF0YV9lZ29BdXRob3JQdWJsaWNhdGlvbnMoZ3JhcGgpO1xuXHRjaXRhdGlvblZpcy5hbGxfY2l0YXRpb25zX2RhdGEgPSBsaW5lQ2hhcnREYXRhLnByZXBhcmVEYXRhX2FsbENpdGF0aW9ucyhncmFwaCk7XG5cdGNpdGF0aW9uVmlzLmVpZ2VuZmFjdG9yX3N1bV9kYXRhID0gbGluZUNoYXJ0RGF0YS5wcmVwYXJlRGF0YV9hdXRob3JFaWdlbmZhY3RvclN1bShncmFwaCk7XG5cblx0Ly8gVmlzdWFsaXphdGlvbiBvYmplY3RzIGdvIGhlcmVcblx0Y2l0YXRpb25WaXMuZWdvR3JhcGhWaXMgPSBuZXcgZWdvR3JhcGhWaXMoY2l0YXRpb25WaXMuZ3JhcGhfZGF0YSk7XG5cdC8vIGNpdGF0aW9uVmlzLnB1YmxpY2F0aW9uc0xpbmVDaGFydCA9IG5ldyBsaW5lQ2hhcnRCeVllYXIoY2l0YXRpb25WaXMucHVibGljYXRpb25zX2RhdGEpO1xuXHQvLyBjaXRhdGlvblZpcy5jaXRhdGlvbnNMaW5lQ2hhcnQgPSBuZXcgbGluZUNoYXJ0QnlZZWFyKGNpdGF0aW9uVmlzLmFsbF9jaXRhdGlvbnNfZGF0YSk7XG5cdC8vIGNpdGF0aW9uVmlzLmVpZ2VuZmFjdG9yU3VtTGluZUNoYXJ0ID0gbmV3IGxpbmVDaGFydEJ5WWVhcihjaXRhdGlvblZpcy5laWdlbmZhY3Rvcl9zdW1fZGF0YSk7XG5cdGNpdGF0aW9uVmlzLmxpbmVDaGFydHMgPSBbXTtcblx0Y2l0YXRpb25WaXMubGluZUNoYXJ0cy5wdXNoKG5ldyBsaW5lQ2hhcnRCeVllYXIoY2l0YXRpb25WaXMucHVibGljYXRpb25zX2RhdGEpKTtcblx0Y2l0YXRpb25WaXMubGluZUNoYXJ0cy5wdXNoKG5ldyBsaW5lQ2hhcnRCeVllYXIoY2l0YXRpb25WaXMuYWxsX2NpdGF0aW9uc19kYXRhKSk7XG5cdGNpdGF0aW9uVmlzLmxpbmVDaGFydHMucHVzaChuZXcgbGluZUNoYXJ0QnlZZWFyKGNpdGF0aW9uVmlzLmVpZ2VuZmFjdG9yX3N1bV9kYXRhKSk7XG5cblx0b3B0aW9ucy50cmFuc2l0aW9uVGltZVBlclllYXIgPSBjaXRhdGlvblZpcy5nZXRUcmFuc2l0aW9uVGltZVBlclllYXIoZ3JhcGgpO1xuXG5cdGNpdGF0aW9uVmlzLmVnb0dyYXBoVmlzLmltcG9ydERlZmF1bHRPcHRpb25zKG9wdGlvbnMpO1xuXHRmb3IgKHZhciBpPTA7IGk8Y2l0YXRpb25WaXMubGluZUNoYXJ0cy5sZW5ndGg7IGkrKykge1xuXHRcdGNpdGF0aW9uVmlzLmxpbmVDaGFydHNbaV0uaW1wb3J0RGVmYXVsdE9wdGlvbnMob3B0aW9ucyk7XG5cdH1cblxuXHRjaXRhdGlvblZpcy5lZ29HcmFwaFZpcy5pbml0KCk7XG5cdGZvciAodmFyIGk9MDsgaTxjaXRhdGlvblZpcy5saW5lQ2hhcnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2l0YXRpb25WaXMubGluZUNoYXJ0c1tpXS5pbml0KCk7XG5cdH1cblx0JC5ldmVudC50cmlnZ2VyKHtcblx0XHR0eXBlOiBcImluaXRDb21wbGV0ZVwiLFxuXHR9KTtcblxuXHRjaXRhdGlvblZpcy5saW5lQ2hhcnRzWzBdLmFkZFRpdGxlKFwiTnVtYmVyIG9mIHB1YmxpY2F0aW9uc1wiKTtcblx0Y2l0YXRpb25WaXMubGluZUNoYXJ0c1sxXS5hZGRUaXRsZShcIk51bWJlciBvZiBjaXRhdGlvbnMgcmVjZWl2ZWRcIik7XG5cdHZhciBjdHJ0eXBlID0gZ2V0UXVlcnlWYXJpYWJsZShcImN0cnR5cGVcIik7XG5cdGlmICghY3RydHlwZSkge1xuXHRcdGN0cnR5cGUgPSBcImF1dGhvclwiO1xuXHR9XG5cdGNvbnNvbGUubG9nKGN0cnR5cGUpO1xuXHQvLyBjaXRhdGlvblZpcy5saW5lQ2hhcnRzWzJdLmFkZFRpdGxlKFwiU3VtIG9mIGVpZ2VuZmFjdG9yIGZvciB0aGlzIGF1dGhvcidzIHB1YmxpY2F0aW9ucyBieSB5ZWFyXCIpO1xuXHRjaXRhdGlvblZpcy5saW5lQ2hhcnRzWzJdLmFkZFRpdGxlKFwiU3VtIG9mIGVpZ2VuZmFjdG9yIGZvciB0aGlzIFwiICsgY3RydHlwZSArIFwiJ3MgcHVibGljYXRpb25zIGJ5IHllYXJcIik7XG5cblxuXHQkKCBkb2N1bWVudCApLm9uKCBcInllYXJDaGFuZ2VcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGN1cnJZZWFyID0gY2l0YXRpb25WaXMuZWdvR3JhcGhWaXMuY3VyclllYXI7XG5cdFx0Zm9yICh2YXIgaT0wOyBpPGNpdGF0aW9uVmlzLmxpbmVDaGFydHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNpdGF0aW9uVmlzLmxpbmVDaGFydHNbaV0ubW92ZVllYXJJbmRpY2F0b3IoY3VyclllYXIpO1xuXHRcdH1cblx0fSk7XG5cblx0Ly8gSGFjayB0byBsYWJlbCB0aGUgcHVibGljYXRpb25zIGxpbmUgY2hhcnQuIFRPRE86IEZpeCB0aGlzIGxhdGVyXG5cdC8vIHZhciBwdWJzID0gZDMuc2VsZWN0KGNpdGF0aW9uVmlzLnB1YmxpY2F0aW9uc0xpbmVDaGFydC5jaGFydERpdlswXVswXSk7XG5cdHZhciBwdWJzID0gZDMuc2VsZWN0KGNpdGF0aW9uVmlzLmxpbmVDaGFydHNbMF0uY2hhcnREaXZbMF1bMF0pO1xuXHR2YXIgcHVic0F4aXNMYWJlbCA9IHB1YnMuc2VsZWN0KCcueS5heGlzJykuc2VsZWN0KCcuYXhpc0xhYmVsJyk7XG5cdHB1YnNBeGlzTGFiZWwudGV4dCgnTnVtIHB1YmxpY2F0aW9ucycpO1xuXHQvLyBIYWNrIHRvIGFsdGVyIGVpZ2VuZmFjdG9yIGxpbmUgY2hhcnQuIFRPRE86IEZpeCB0aGlzIGxhdGVyXG5cdC8vIGNpdGF0aW9uVmlzLmVpZ2VuZmFjdG9yU3VtTGluZUNoYXJ0LnlBeGlzLnRpY2tGb3JtYXQoZDMuZm9ybWF0KCdlJykpO1xuXHRjaXRhdGlvblZpcy5saW5lQ2hhcnRzWzJdLnlBeGlzLnRpY2tGb3JtYXQoZDMuZm9ybWF0KCdlJykpO1xuXHQvLyB2YXIgRUZDaGFydCA9IGQzLnNlbGVjdChjaXRhdGlvblZpcy5laWdlbmZhY3RvclN1bUxpbmVDaGFydC5jaGFydERpdlswXVswXSk7XG5cdHZhciBFRkNoYXJ0ID0gZDMuc2VsZWN0KGNpdGF0aW9uVmlzLmxpbmVDaGFydHNbMl0uY2hhcnREaXZbMF1bMF0pO1xuXHRFRkNoYXJ0LnNlbGVjdCgnLnkuYXhpcycpXG5cdFx0Ly8gLmNhbGwoY2l0YXRpb25WaXMuZWlnZW5mYWN0b3JTdW1MaW5lQ2hhcnQueUF4aXMpXG5cdFx0LmNhbGwoY2l0YXRpb25WaXMubGluZUNoYXJ0c1syXS55QXhpcylcblx0XHQuc2VsZWN0KCcuYXhpc0xhYmVsJykudGV4dCgnU3VtIG9mIEVpZ2VuZmFjdG9yJyk7XG5cblxuXHQvLyBFdmVudCBsaXN0ZW5lcnNcblx0Ly8gRXZlbnQgbGlzdGVuZXJzIHRoYXQgYWN0IGFjcm9zcyBkaWZmZXJlbnQgdmlzdWFsaXphdGlvbiBvYmplY3RzIGdvIGhlcmVcblx0Y2l0YXRpb25WaXMueWVhclRpY2tDbGlja0V2ZW50TGlzdGVuZXIoKTtcblx0XG5cdGQzLnNlbGVjdChcIi5sb2FkaW5nVGV4dFwiKS5yZW1vdmUoKTtcbn0pO1xuLy8gfSkoY2l0YXRpb252aXNfZGF0YSk7XG59XG5cbi8vIG1haW4oKTtcbmV4cG9ydCB7IGNpdGF0aW9uVmlzLCBlZ29HcmFwaFZpcywgbGluZUNoYXJ0QnlZZWFyIH07XG4iLCJpbXBvcnQgeyBjaXRhdGlvblZpcywgZWdvR3JhcGhWaXMsIGxpbmVDaGFydEJ5WWVhciB9IGZyb20gJy4vY29uY2F0LmpzJztcbmV4cG9ydCB7IGNpdGF0aW9uVmlzLCBlZ29HcmFwaFZpcywgbGluZUNoYXJ0QnlZZWFyIH07XG5cbiJdLCJzb3VyY2VSb290IjoiIn0=