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
    content: '<p>Click to see details of this paper</p>',
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
    span.append($('<p class="title">').text(d.Title));
    span.append($('<p class="authors">').text(d.author_str));
    span.append($('<p class="venue">').text(d.venue));
    span.append($('<p class="year">').text(d.Year)); // span.append( $( '<p class="tooltip domain">' ).text("Category: " + d.DomainName) );

    span.append($('<p class="domain">').text("Categories: " + d.Field_of_study_names)); // span.append( $( '<p class="tooltip js_div">' ).text("JS Divergence: " + d.js_div) );
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
  self.svg = d3.select('#graphDiv').append('svg').attr('id', 'graphSvg').attr('width', self.graphDimensions.width).attr('height', self.graphDimensions.height); // self.tip = d3.tip()
  // 	.attr('class', 'd3-tip')
  // 	.style('cursor', 'default')
  // 	.style('border-style', 'solid')
  // 	// .style('border-color', function(d) { return d.color; })
  // 	.style('pointer-events', 'none');
  // self.svg.call(self.tip);

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
    d.DomainName = self.data.graph.Domains[d.DomainID];

    if (self.data.nodes[0].name === "Science Communication and Misinformation") {
      d.color = self.colorScheme[d.tfidf_kmeans_category];
    } else {
      for (var i = 0; i < self.domainsThisGraph.length; i++) {
        var thisDomain = self.domainsThisGraph[i].key;

        if (thisDomain == d.DomainID) {
          // var thisColor = self.colorScheme[i];
          var thisColor = self.domainsThisGraph[i].color;
          d.color = thisColor;
        }
      }
    } // d.color = self.JSDColorScale(d.js_div);
    // d.color = self.ClusterDistanceColorScale(d.average_cluster_distance_to_center);
    // d.color = self.colorScheme[d.fos_kmeans_category];
    // d.color = self.colorScheme[d.tfidf_kmeans_category];

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


egoGraphVis.prototype.getDomainsThisGraphLegacy = function () {
  var self = this;
  var domains = self.data.graph.Domains; // var domains = self.data.graph.fos_kmeans_categories;
  // var domains = self.data.graph.titles_kmeans_categories;

  console.log(domains);
  var maxDomains = self.colorScheme.length; // self.domainsThisGraph will be an array of {key: "DomainID", values: count}

  self.domainsThisGraph = d3.nest().key(function (d) {
    return d.DomainID;
  }) // .key(function(d) { return d.fos_kmeans_category; })
  // .key(function(d) { return d.title_kmeans_category; })
  .rollup(function (leaves) {
    return leaves.length;
  }).entries(self.notEgoNodes); // self.domainsThisGraph.sort(function(a,b) { return d3.descending(a.values, b.values); });
  // Add a few more variables to the domainsThisGraph data:

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
    } // self.domainsThisGraph[i].DomainName = domains[key];
    // self.domainsThisGraph[i].color = self.colorScheme[i];

  }

  console.log(self.domainsThisGraph);
};

egoGraphVis.prototype.getDomainsThisGraphTfidf = function () {
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

egoGraphVis.prototype.getDomainsThisGraph = function () {
  var self = this;
  var domains = self.data.graph.tfidf_kmeans_categories;

  if (typeof domains === 'undefined') {
    self.getDomainsThisGraphLegacy();
  } else {
    self.getDomainsThisGraphTfidf();
  }
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
    if (self.data.nodes[0].name === "Science Communication and Misinformation") {
      return 'C' + i + ' (' + misinfoLegendItemsText[i] + ')';
    } else {
      if (d.DomainID != 0 && d.DomainName.toLowerCase() == "other") {
        return "Papers in other categories";
      } else {
        return 'Papers in category "' + d.DomainName + '"';
      }
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
        var url = 'https://academic.microsoft.com/paper/' + d.id;
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

    if (!newGraph.links.length) {
      newGraph.links = recalculateLinksLegacy(newGraph.nodes, graph.links);
    }

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

    function recalculateLinksLegacy(nodes, links) {
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
    console.log(newGraph);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uYXV0aWx1c192aXMvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL25hdXRpbHVzX3Zpcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uYXV0aWx1c192aXMvLi9zcmMvY29uY2F0LmpzIiwid2VicGFjazovL25hdXRpbHVzX3Zpcy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJjaXRhdGlvblZpcyIsIiQiLCJkb2N1bWVudCIsIm9uIiwiZWdvR3JhcGhWaXMiLCJ6b29tYWJsZSIsInpvb20iLCJ6b29tVHJhbnNsYXRlIiwidHJhbnNsYXRlIiwiY2hlY2tab29tIiwiZCIsInpvb21UaHJlc2hvbGRNaW4iLCJjb29yZGluYXRlcyIsInpvb21UaHJlc2hvbGRNYXgiLCJncmFwaERpbWVuc2lvbnMiLCJ3aWR0aCIsImhlaWdodCIsInkiLCJjb25zb2xlIiwibG9nIiwic2NhbGUiLCJ4IiwiZ3JvdXAiLCJjYWxsIiwiZXZlbnQiLCJjZW50ZXIwIiwiY2VudGVyIiwidHJhbnNsYXRlMCIsImNvb3JkaW5hdGVzMCIsImNlbnRlcjEiLCJwb2ludCIsInRyYW5zaXRpb24iLCJkdXJhdGlvbiIsInRlc3RyZWNvcmQiLCJ0IiwiZm9jdXNfaWQiLCJkYXRhIiwicGFyc2VJbnQiLCJnZXRQYXJhbWV0ZXJCeU5hbWUiLCJuYW1lIiwidXJsIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwicmVwbGFjZSIsInJlZ2V4IiwiUmVnRXhwIiwicmVzdWx0cyIsImV4ZWMiLCJkZWNvZGVVUklDb21wb25lbnQiLCJjbGljayIsIkZsYXNrIiwidXJsX2ZvciIsIm9wZW4iLCJtZXNzYWdlX3JlY2VpdmUiLCJldiIsIm9yaWdpbmFsRXZlbnQiLCJrZXkiLCJtZXNzYWdlIiwiSlNPTiIsInBhcnNlIiwibmV3VmFsdWUiLCJjb21tYW5kIiwiaGlnaGxpZ2h0TGlua2VkUGFwZXJzIiwicGlkIiwibGlua2VkUGFwZXJzTW91c2VvdXQiLCJwYXBlcl9pZCIsImhpZ2hsaWdodGVkTm9kZXMiLCJkMyIsInNlbGVjdEFsbCIsImZpbHRlciIsInRhcmdldFBhcGVySURzIiwiaW5kZXhPZiIsInB1c2giLCJjbGFzc2VkIiwic291cmNlIiwiZGVmYXVsdF9vcHRpb25zIiwiZGltZW5zaW9ucyIsImxpbmVDaGFydCIsIm1hcmdpbiIsInRvcCIsInJpZ2h0IiwiYm90dG9tIiwibGVmdCIsImNvbG9yU2NoZW1lIiwic3BsaWNlIiwiREVGQVVMVF9PUFRJT05TIiwiZGVmYXVsdHMiLCJsaW5lQ2hhcnREYXRhIiwiZ2V0UGV3Q2xhc3NZZWFyIiwiZ3JhcGgiLCJlZ29Ob2RlIiwibm9kZXMiLCJwZXdfQ2xhc3MiLCJnZXRGdW5kaW5nIiwiZnVuZGluZyIsImNsZWFuTGlua3MiLCJsaW5rcyIsImNsZWFuZWRMaW5rcyIsImZvckVhY2giLCJsaW5rVG9FZ28iLCJzb3VyY2VZZWFyIiwidGFyZ2V0WWVhciIsImdldFllYXJSYW5nZSIsIm1pblllYXIiLCJtaW4iLCJ0b2RheVllYXIiLCJEYXRlIiwiZ2V0RnVsbFllYXIiLCJtYXhZZWFyIiwibWF4IiwiTWF0aCIsImdldEVtcHR5Q291bnREYXRhIiwieWVhclJhbmdlIiwiZW1wdHlDb3VudERhdGEiLCJpIiwieWVhciIsImNvdW50IiwicHJlcGFyZURhdGFfYWxsQ2l0YXRpb25zIiwidmFsdWVzIiwidGhpc1NvdXJjZVllYXIiLCJkYXRhVGhpc1llYXIiLCJkZCIsInByZXBhcmVEYXRhX2Vnb0F1dGhvclB1YmxpY2F0aW9ucyIsImVnb1BhcGVycyIsInBhcGVycyIsIlllYXIiLCJwcmVwYXJlRGF0YV9hdXRob3JFaWdlbmZhY3RvclN1bSIsIkVGIiwiU3RyaW5nIiwicHJvdG90eXBlIiwiY2FwaXRhbGl6ZSIsInRvTG93ZXJDYXNlIiwibSIsInRvVXBwZXJDYXNlIiwibWFrZUh0bWwiLCJudW1EaXNwbGF5IiwiY2FsbGJhY2siLCJoYXNPd25Qcm9wZXJ0eSIsInRvb2x0aXBIdG1sIiwibnVtUGFwZXJzQWRkZWQiLCJsZW4iLCJsZW5ndGgiLCJwYXBlciIsInRvb2x0aXAiLCJodG1sIiwicGlkcyIsIlBhcGVySUQiLCJhamF4IiwiZGF0YVR5cGUiLCIkU0NSSVBUX1JPT1QiLCJwYXBlcmlkIiwic3RyaW5naWZ5Iiwic3VjY2VzcyIsInJlc3VsdCIsImRiX3BhcGVycyIsIndpbmRvd1dpZHRoIiwibm9kZVRvb2x0aXBzIiwibGVnZW5kVG9vbHRpcHMiLCJjc3MiLCJ0b29sdGlwc3RlciIsInRoZW1lIiwibWF4V2lkdGgiLCJhbmltYXRpb24iLCJhbmltYXRpb25kdXJhdGlvbiIsImRlbGF5IiwidXBkYXRlQW5pbWF0aW9uIiwiY29udGVudCIsImNvbnRlbnRBc0hUTUwiLCJmdW5jdGlvbkluaXQiLCJmdW5jdGlvbkJlZm9yZSIsImluc3RhbmNlIiwiaGVscGVyIiwiJG9yaWdpbiIsIm9yaWdpbiIsInRoaXNZZWFyUGFwZXJzIiwic29ydCIsImEiLCJiIiwiZGVzY2VuZGluZyIsImFkZENsYXNzIiwiYWpheFBhcGVySW5mbyIsIm5vZGUiLCJzZWxlY3QiLCJlYWNoIiwibm9kZVR5cGUiLCJ1cGRhdGVkUHJvcHMiLCJjaXRhdGlvbiIsImJ5cGFzc0FqYXgiLCJpZCIsIlRpdGxlIiwiZG9pIiwiYXV0aG9yX3N0ciIsInZlbnVlIiwibWFrZU5vZGVUb29sdGlwSHRtbCIsImlkeCIsIm51bWJlck9mUHVicyIsInNwYW4iLCJhcHBlbmQiLCJ0ZXh0IiwiRmllbGRfb2Zfc3R1ZHlfbmFtZXMiLCJvdGhlckh0bWwiLCJoZWFkZXJIdG1sIiwibGVnZW5kSXRlbSIsIkRvbWFpbklEIiwiRG9tYWluTmFtZSIsInNlbGYiLCJub3RFZ29Ob2RlcyIsInNsaWNlIiwibm9kZVBsYWNlbWVudE9wdGlvbnMiLCJub2RlUGxhY2VtZW50Iiwic3ZnIiwibGluayIsImVpZ2VuRmFjdG9yU2NhbGUiLCJkb21haW5zVGhpc0dyYXBoIiwibGVnZW5kIiwieWVhclRleHREaXNwbGF5IiwiYXV0aG9ySW1hZ2VEaXYiLCJ0aXAiLCJ0aWNrIiwiZm9yY2UiLCJ2aXJpZGlzIiwic3BlY3RyYWw4IiwicmFpbmJvdyIsIkpTRENvbG9yU2NhbGUiLCJsaW5lYXIiLCJkb21haW4iLCJleHRlbnQiLCJqc19kaXYiLCJyYW5nZSIsIkNsdXN0ZXJEaXN0YW5jZUNvbG9yU2NhbGUiLCJhdmVyYWdlX2NsdXN0ZXJfZGlzdGFuY2VfdG9fY2VudGVyIiwib3BhY2l0eVZhbHMiLCJub2RlUHJldlllYXIiLCJsaW5rTm90VG9FZ28iLCJsaW5rUHJldlllYXIiLCJkb0Fubm90YXRpb25zIiwiYW5pbWF0aW9uU3RhdGUiLCJ0cmFuc2l0aW9uVGltZVBlclllYXIiLCJ0cmFuc2l0aW9uVGltZVBlck5vZGUiLCJsaW5rQXBwZWFyRHVyYXRpb24iLCJjdXJyTm9kZUluZGV4IiwiZGVzdGluYXRpb25Ob2RlSW5kZXgiLCJkZXN0aW5hdGlvblllYXIiLCJjdXJyWWVhciIsImMiLCJ0dCIsImluaXQiLCJtYWtlVGljayIsIm1ha2VGb3JjZSIsIm1ha2Vab29tIiwiZ2V0RG9tYWluc1RoaXNHcmFwaCIsImF0dHIiLCJzdHlsZSIsImZpeGVkIiwiY29sb3IiLCJlaWdlbkZhY3Rvck1heCIsInJhZGl1cyIsIm5ld05vZGUiLCJlbnRlciIsIkRvbWFpbnMiLCJ0ZmlkZl9rbWVhbnNfY2F0ZWdvcnkiLCJ0aGlzRG9tYWluIiwidGhpc0NvbG9yIiwiZHJhZyIsIm5ld0xpbmsiLCJ0YXJnZXQiLCJvcFZhbHMiLCJwbGFjZU5vZGVzIiwic3RhcnQiLCJzdG9wIiwiY3giLCJjeSIsImluaXRpYWxSYWQiLCJudW1Ob2RlcyIsInRoaXNSYWQiLCJwb3ciLCJ0aGlzU3BhY2luZyIsIlBJIiwiY29zIiwic2luIiwiY29tcHV0ZUFuZ2xlIiwiYWxwaGEiLCJhcmNMZW5ndGgiLCJlcHNpbG9uIiwiYW5nbGVSYWQiLCJjb21wdXRlQXJjTGVuZ3RoIiwiYWJzIiwiZGEiLCJzcXJ0IiwidSIsInYiLCJjb21wdXRlUG9pbnQiLCJkaXN0YW5jZSIsImdldEFuZ2xlcyIsInBvaW50QXJjRGlzdGFuY2UiLCJ0b3RhbEFyY0xlbmd0aCIsInByZXZpb3VzQW5nbGVSYWQiLCJhbmdsZXMiLCJwb3dTY2FsZSIsImV4cG9uZW50IiwibmV3aSIsInRoaXNQb3MiLCJsZWdlbmRJbml0IiwiYWRkQXV0aG9ySW1hZ2UiLCJhZGRFdmVudExpc3RlbmVycyIsInJldmVhbEVnb05vZGUiLCJiZWhhdmlvciIsInNjYWxlRXh0ZW50IiwieDEiLCJ5MSIsIngyIiwieTIiLCJ0cmFuc2Zvcm0iLCJsYXlvdXQiLCJzaXplIiwibGlua0Rpc3RhbmNlIiwiaW1wb3J0RGVmYXVsdE9wdGlvbnMiLCJvcHRpb25zIiwiZ2V0RG9tYWluc1RoaXNHcmFwaExlZ2FjeSIsImRvbWFpbnMiLCJtYXhEb21haW5zIiwibmVzdCIsInJvbGx1cCIsImxlYXZlcyIsImVudHJpZXMiLCJnZXREb21haW5zVGhpc0dyYXBoVGZpZGYiLCJ0ZmlkZl9rbWVhbnNfY2F0ZWdvcmllcyIsIm1pc2luZm9MZWdlbmRJdGVtc1RleHQiLCJzcXVhcmVTaXplIiwicGFkZGluZyIsInNxclBsdXNQYWRkaW5nIiwibGVnZW5kSGVhZGVyU2l6ZSIsImxlZ2VuZFRleHQiLCJBdXRob3JOYW1lIiwiYXV0aG9ySW1hZ2VDb250YWluZXIiLCJhdXRob3JPcmciLCJvcmdhbml6YXRpb24iLCJ0c3YiLCJlcnJvciIsIm9yZ19kYXRhIiwicHN0eWxlIiwibmFtZUZyb21UU1YiLCJvcmdMaW5rIiwib3JnSW1nVXJsIiwiYXV0aG9ySW1hZ2UiLCJhZGRJbWFnZSIsImF1dGhvckltYWdlU3JjIiwiQXV0aG9ySW1nVXJsIiwiSW1nVVJMIiwicGV3aWRfc3RyIiwiUGV3U2Nob2xhcklEIiwidG9TdHJpbmciLCJzdWJzdHIiLCJmbmFtZV9yb290IiwicG9zc2libGVFeHRlbnNpb25zIiwidHJ5SW1hZ2VGaWxlbmFtZXMiLCJpdGVyIiwiYXV0aG9ySW1hZ2VGaWxlbmFtZSIsImdldCIsImRvbmUiLCJmYWlsIiwicGV3Q2xhc3MiLCJob3ZlcmVkIiwiaG92ZXJlZEl0ZW0iLCJnZXRET0kiLCJub2RlT2JqIiwidGhpc05vZGUiLCJnZXRDaXRhdGlvbiIsIm1ha2VUb29sdGlwIiwiZ2V0QXV0aG9yTGlzdCIsImF1dGhvcnMiLCJhdXRob3JMaXN0IiwidGhpc0F1dGhvclN0ckxpc3QiLCJzcGxpdCIsIm1hcCIsInRoaXNBdXRob3IiLCJqb2luIiwiZ2V0VGl0bGUiLCJhdXRob3JTdHJMaXN0IiwidGl0bGUiLCJhdXRob3JpZHMiLCJBdXRob3JJRExpc3QiLCJ0cmlnZ2VyIiwidHlwZSIsImFuaW1hdGVUb0Rlc3RpbmF0aW9uTm9kZSIsImZpbmlzaEFuaW1hdGlvbiIsImNoZWNrWWVhciIsImNvbnRpbnVlIiwiY2FsY3VsYXRlVHJhbnNpdGlvblRpbWUiLCJkcmF3Tm9kZSIsInJlbW92ZU5vZGUiLCJjdXJyTm9kZSIsIm9sZFllYXIiLCJuZXdZZWFyIiwiYmVnaW5OZXdZZWFyIiwibm9kZXNUaGlzWWVhciIsInNldFRpbWVvdXQiLCJkcmF3TGlua3MiLCJsaW5rc1RoaXNOb2RlSXNTb3VyY2UiLCJsIiwiaW5UcmFuc2l0aW9uIiwiZWFzZSIsImluZGV4IiwiY3VyckxpbmtzIiwicmV0cmFjdER1cmF0aW9uIiwibmV3RGVzdGluYXRpb25Ob2RlIiwiZ2V0RGVzdGluYXRpb25Ob2RlIiwiZ2V0Tm9kZXNUaGlzWWVhciIsImxhc3ROb2RlVGhpc1llYXIiLCJyZXdpbmRTZWFyY2giLCJjb3VudFRoaXNZZWFyIiwibm9kZUNvdW50c1BlclllYXIiLCJyZXZlYWxGaW5hbFN0YXRlIiwiZWdvR3JhcGhEYXRhIiwibWF4Tm9kZXMiLCJwcmVwYXJlX2Vnb0dyYXBoRGF0YSIsIm9sZElkeCIsIm5ld0dyYXBoIiwicHJvcHNUb0NvcHkiLCJwcm9wIiwic2h1ZmZsZSIsIkRvbWFpbklEVG9Gcm9udCIsImFyciIsImhhc0RvbWFpbklEIiwibm9Eb21haW5JRCIsIm5ld0FyciIsImNvbmNhdCIsImFzY2VuZGluZyIsInJlY2FsY3VsYXRlTGlua3MiLCJyZWNhbGN1bGF0ZUxpbmtzTGVnYWN5IiwibmV3TGlua3MiLCJ0aGlzU291cmNlIiwidGhpc1RhcmdldCIsImdldE5vZGVDb3VudHNQZXJZZWFyIiwieWVhcnNOZXN0Iiwic29ydEtleXMiLCJldmVudExpc3RlbmVycyIsImRvbWFpbnNNdWx0IiwiRG9tYWluc011bHQiLCIkZG9tYWluRHJvcGRvd24iLCJkb21haW5fc2VsZWN0IiwicHJlcGVuZCIsImsiLCJzd2l0Y2hEb21haW4iLCJ2YWwiLCJkb21haW5UeXBlIiwiZHVyIiwiRG9tYWluTXVsdCIsInJlbW92ZSIsImxpbmVDaGFydEJ5WWVhciIsImhyYV9mdW5kaW5nIiwibGluZUNoYXJ0RGltZW5zaW9ucyIsImNoYXJ0RGl2Iiwic3ZnRGVmcyIsImNsaXBQYXRoIiwiY3VyclllYXJJbmRpY2F0b3IiLCJ5ZWFyQXJlYSIsInllYXJBcmVhT3BhY2l0eSIsInhBeGlzIiwieUF4aXMiLCJsaW5lIiwiYXJlYSIsImNoYXJ0TGluZSIsImNoYXJ0QXJlYSIsImxpbmVhckdyYWRpZW50IiwiZnVuZGluZ1RpbWUiLCJkdXJhdGlvbl9pbl95ZWFycyIsInN0YXJ0X2RhdGUiLCJheGlzIiwib3JpZW50IiwidGlja0Zvcm1hdCIsImZvcm1hdCIsInRpY2tzIiwidGlja1NpemUiLCJ5MCIsInllYXJMYWJlbHMiLCJ5ZWFyTGFiZWwiLCJiYm94IiwicGFyZW50Tm9kZSIsImdldEJCb3giLCJkYXR1bSIsIm1ha2VGdW5kaW5nTGluZXMiLCJtYWtlQ29sb3JHcmFkaWVudCIsImZ1bmRpbmdZZWFyIiwibWF4WCIsIm9mZnNldCIsInJnYiIsImRhcmtlciIsImNoYW5nZUFuaW1hdGlvblN0YXRlIiwiYWR2YW5jZUxpbmUiLCJ0aW1lRWxhcHNlZCIsImNvcnJlY3RZZWFyIiwibW92ZVllYXJJbmRpY2F0b3IiLCJoaWdobGlnaHRDdXJyWWVhclRpY2siLCJhZGRUaXRsZSIsInN1bW1hcnlTdGF0aXN0aWNzIiwiYWRkU3VtbWFyeVN0YXRpc3RpY3MiLCJnZXRDaXRhdGlvbkNvdW50c1BlclllYXIiLCJjaXRhdGlvbkNvdW50c1BlclllYXIiLCJnZXRRdWVyeVZhcmlhYmxlIiwidmFyaWFibGUiLCJxdWVyeSIsInNlYXJjaCIsInN1YnN0cmluZyIsInZhcnMiLCJwYWlyIiwiZ2V0VHJhbnNpdGlvblRpbWVQZXJZZWFyIiwibG9uZ2VzdFllYXJUcmFuc2l0aW9uVGltZSIsImVtcHR5WWVhclRyYW5zaXRpb25UaW1lIiwidGhyZXNob2xkU2NhbGUiLCJ0aHJlc2hvbGQiLCJ5ZWFyVGlja0NsaWNrRXZlbnRMaXN0ZW5lciIsImdldEF0dHJpYnV0ZSIsIm1haW4iLCJqc29uIiwiY29udGFjdEVtYWlsIiwiZXJySHRtbCIsImRvbWFpbnNOZXN0Iiwic29ydFZhbHVlcyIsIkRvbWFpbkNvdW50cyIsImdyYXBoX2RhdGEiLCJwdWJsaWNhdGlvbnNfZGF0YSIsImFsbF9jaXRhdGlvbnNfZGF0YSIsImVpZ2VuZmFjdG9yX3N1bV9kYXRhIiwibGluZUNoYXJ0cyIsImN0cnR5cGUiLCJwdWJzIiwicHVic0F4aXNMYWJlbCIsIkVGQ2hhcnQiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFBSUEsV0FBVyxHQUFHQSxXQUFXLElBQUksRUFBakM7QUFFQUMsQ0FBQyxDQUFFQyxRQUFGLENBQUQsQ0FBY0MsRUFBZCxDQUFrQixjQUFsQixFQUFrQyxZQUFXO0FBQzVDLE1BQUlDLFdBQVcsR0FBR0osV0FBVyxDQUFDSSxXQUE5Qjs7QUFDQSxNQUFJQSxXQUFXLENBQUNDLFFBQVosSUFBd0IsS0FBNUIsRUFBbUM7QUFDbEM7QUFDQTs7QUFDRCxNQUFJQyxJQUFJLEdBQUdGLFdBQVcsQ0FBQ0UsSUFBdkI7QUFDQUYsYUFBVyxDQUFDRyxhQUFaLEdBQTRCRCxJQUFJLENBQUNFLFNBQUwsRUFBNUI7O0FBRUFKLGFBQVcsQ0FBQ0ssU0FBWixHQUF3QixVQUFTQyxDQUFULEVBQVk7QUFDbkMsUUFBSUMsZ0JBQWdCLEdBQUdDLFdBQVcsQ0FBQyxDQUFDLENBQUQsRUFBSSxDQUFKLENBQUQsQ0FBWCxDQUFvQixDQUFwQixDQUF2QixDQURtQyxDQUNhOztBQUNoRCxRQUFJQyxnQkFBZ0IsR0FBR0QsV0FBVyxDQUFDLENBQUNSLFdBQVcsQ0FBQ1UsZUFBWixDQUE0QkMsS0FBN0IsRUFBb0NYLFdBQVcsQ0FBQ1UsZUFBWixDQUE0QkUsTUFBaEUsQ0FBRCxDQUFYLENBQXFGLENBQXJGLENBQXZCLENBRm1DLENBRThFOztBQUNqSCxRQUFJTixDQUFDLENBQUNPLENBQUYsR0FBTU4sZ0JBQU4sSUFBMEJELENBQUMsQ0FBQ08sQ0FBRixHQUFNSixnQkFBcEMsRUFBc0Q7QUFDckRLLGFBQU8sQ0FBQ0MsR0FBUixDQUFZYixJQUFJLENBQUNFLFNBQUwsRUFBWjtBQUNBVSxhQUFPLENBQUNDLEdBQVIsQ0FBWWIsSUFBSSxDQUFDYyxLQUFMLEVBQVo7QUFDQUYsYUFBTyxDQUFDQyxHQUFSLENBQVlQLFdBQVcsQ0FBQyxDQUFDRixDQUFDLENBQUNXLENBQUgsRUFBTVgsQ0FBQyxDQUFDTyxDQUFSLENBQUQsQ0FBdkI7QUFDRkMsYUFBTyxDQUFDQyxHQUFSLENBQVlQLFdBQVcsQ0FBQyxDQUFDUixXQUFXLENBQUNVLGVBQVosQ0FBNEJDLEtBQTdCLEVBQW9DWCxXQUFXLENBQUNVLGVBQVosQ0FBNEJFLE1BQWhFLENBQUQsQ0FBdkI7QUFDQUUsYUFBTyxDQUFDQyxHQUFSLENBQVlQLFdBQVcsQ0FBQyxDQUFDLENBQUQsRUFBRyxDQUFILENBQUQsQ0FBdkIsRUFMdUQsQ0FNckQ7O0FBQ0FSLGlCQUFXLENBQUNrQixLQUFaLENBQWtCQyxJQUFsQixDQUF1QmpCLElBQUksQ0FBQ2tCLEtBQTVCLEVBUHFELENBU3JEOztBQUNBLFVBQUlDLE9BQU8sR0FBR25CLElBQUksQ0FBQ29CLE1BQUwsRUFBZDtBQUNBLFVBQUlDLFVBQVUsR0FBR3JCLElBQUksQ0FBQ0UsU0FBTCxFQUFqQjtBQUNBLFVBQUlvQixZQUFZLEdBQUdoQixXQUFXLENBQUNhLE9BQUQsQ0FBOUI7QUFDQW5CLFVBQUksQ0FBQ2MsS0FBTCxDQUFXZCxJQUFJLENBQUNjLEtBQUwsS0FBZSxFQUExQixFQWJxRCxDQWVyRDs7QUFDQSxVQUFJUyxPQUFPLEdBQUdDLEtBQUssQ0FBQ0YsWUFBRCxDQUFuQjtBQUNBdEIsVUFBSSxDQUFDRSxTQUFMLENBQWUsQ0FBQ21CLFVBQVUsQ0FBQyxDQUFELENBQVYsR0FBZ0JGLE9BQU8sQ0FBQyxDQUFELENBQXZCLEdBQTZCSSxPQUFPLENBQUMsQ0FBRCxDQUFyQyxFQUEwQ0YsVUFBVSxDQUFDLENBQUQsQ0FBVixHQUFnQkYsT0FBTyxDQUFDLENBQUQsQ0FBdkIsR0FBNkJJLE9BQU8sQ0FBQyxDQUFELENBQTlFLENBQWY7QUFFQXpCLGlCQUFXLENBQUNrQixLQUFaLENBQWtCUyxVQUFsQixHQUErQkMsUUFBL0IsQ0FBd0MsR0FBeEMsRUFBNkNULElBQTdDLENBQWtEakIsSUFBSSxDQUFDa0IsS0FBdkQsRUFuQnFELENBb0JyRDtBQUNBO0FBQ0QsR0F6QkQ7O0FBMkJBLFdBQVNaLFdBQVQsQ0FBcUJrQixLQUFyQixFQUE0QjtBQUMzQixRQUFJVixLQUFLLEdBQUdkLElBQUksQ0FBQ2MsS0FBTCxFQUFaO0FBQ0EsUUFBSVosU0FBUyxHQUFHRixJQUFJLENBQUNFLFNBQUwsRUFBaEI7QUFDQSxXQUFPLENBQUMsQ0FBQ3NCLEtBQUssQ0FBQyxDQUFELENBQUwsR0FBV3RCLFNBQVMsQ0FBQyxDQUFELENBQXJCLElBQTRCWSxLQUE3QixFQUFvQyxDQUFDVSxLQUFLLENBQUMsQ0FBRCxDQUFMLEdBQVd0QixTQUFTLENBQUMsQ0FBRCxDQUFyQixJQUE0QlksS0FBaEUsQ0FBUDtBQUNBOztBQUVELFdBQVNVLEtBQVQsQ0FBZWxCLFdBQWYsRUFBNEI7QUFDM0IsUUFBSVEsS0FBSyxHQUFHZCxJQUFJLENBQUNjLEtBQUwsRUFBWjtBQUNBLFFBQUlaLFNBQVMsR0FBR0YsSUFBSSxDQUFDRSxTQUFMLEVBQWhCO0FBQ0EsV0FBTyxDQUFDSSxXQUFXLENBQUMsQ0FBRCxDQUFYLEdBQWlCUSxLQUFqQixHQUF5QlosU0FBUyxDQUFDLENBQUQsQ0FBbkMsRUFBd0NJLFdBQVcsQ0FBQyxDQUFELENBQVgsR0FBaUJRLEtBQWpCLEdBQXlCWixTQUFTLENBQUMsQ0FBRCxDQUExRSxDQUFQO0FBQ0E7O0FBRUQsV0FBU3lCLFVBQVQsR0FBc0I7QUFDckIsUUFBSUMsQ0FBQyxHQUFHLENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FBUjtBQUNBaEIsV0FBTyxDQUFDQyxHQUFSLENBQVksYUFBWjtBQUNBRCxXQUFPLENBQUNDLEdBQVIsQ0FBWWUsQ0FBWjtBQUNBaEIsV0FBTyxDQUFDQyxHQUFSLENBQVlQLFdBQVcsQ0FBQ3NCLENBQUQsQ0FBdkI7QUFDRGhCLFdBQU8sQ0FBQ0MsR0FBUixDQUFZUCxXQUFXLENBQUMsQ0FBQ1IsV0FBVyxDQUFDVSxlQUFaLENBQTRCQyxLQUE3QixFQUFvQ1gsV0FBVyxDQUFDVSxlQUFaLENBQTRCRSxNQUFoRSxDQUFELENBQXZCO0FBQ0M7O0FBRURmLEdBQUMsQ0FBRUMsUUFBRixDQUFELENBQWNDLEVBQWQsQ0FBa0IsbUJBQWxCLEVBQXVDLFlBQVc7QUFDakQ4QixjQUFVO0FBQ1ZmLFdBQU8sQ0FBQ0MsR0FBUixDQUFZYixJQUFJLENBQUNFLFNBQUwsRUFBWjtBQUNBVSxXQUFPLENBQUNDLEdBQVIsQ0FBWWIsSUFBSSxDQUFDYyxLQUFMLEVBQVo7QUFDQSxHQUpEO0FBS0FhLFlBQVUsR0E1RGtDLENBNkQxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ1M7QUFDVDtBQUNBO0FBQ0E7QUFDUztBQUNUO0FBQ0E7QUFDQTtBQUNGLENBMUVEO0FBNEVBLElBQUlqQyxXQUFXLEdBQUdBLFdBQVcsSUFBSSxFQUFqQztBQUVBQyxDQUFDLENBQUVDLFFBQUYsQ0FBRCxDQUFjQyxFQUFkLENBQWtCLGNBQWxCLEVBQWtDO0FBQUNnQyxVQUFRLEVBQUVBO0FBQVgsQ0FBbEMsRUFBd0QsVUFBU1gsS0FBVCxFQUFnQjtBQUN2RTtBQUNBLE1BQUlXLFFBQVEsR0FBR1gsS0FBSyxDQUFDWSxJQUFOLENBQVdELFFBQTFCO0FBQ0FBLFVBQVEsR0FBR0UsUUFBUSxDQUFDRixRQUFELENBQW5CLENBSHVFLENBSXZFOztBQUNBLFdBQVNHLGtCQUFULENBQTRCQyxJQUE1QixFQUFrQ0MsR0FBbEMsRUFBdUM7QUFDdEMsUUFBSSxDQUFDQSxHQUFMLEVBQVVBLEdBQUcsR0FBR0MsTUFBTSxDQUFDQyxRQUFQLENBQWdCQyxJQUF0QjtBQUNWSixRQUFJLEdBQUdBLElBQUksQ0FBQ0ssT0FBTCxDQUFhLFNBQWIsRUFBd0IsTUFBeEIsQ0FBUDtBQUNBLFFBQUlDLEtBQUssR0FBRyxJQUFJQyxNQUFKLENBQVcsU0FBU1AsSUFBVCxHQUFnQixtQkFBM0IsQ0FBWjtBQUFBLFFBQ0NRLE9BQU8sR0FBR0YsS0FBSyxDQUFDRyxJQUFOLENBQVdSLEdBQVgsQ0FEWDtBQUVBLFFBQUksQ0FBQ08sT0FBTCxFQUFjLE9BQU8sSUFBUDtBQUNkLFFBQUksQ0FBQ0EsT0FBTyxDQUFDLENBQUQsQ0FBWixFQUFpQixPQUFPLEVBQVA7QUFDakIsV0FBT0Usa0JBQWtCLENBQUNGLE9BQU8sQ0FBQyxDQUFELENBQVAsQ0FBV0gsT0FBWCxDQUFtQixLQUFuQixFQUEwQixHQUExQixDQUFELENBQXpCO0FBQ0EsR0Fic0UsQ0FjdkU7OztBQUVBLE1BQUl4QyxXQUFXLEdBQUdKLFdBQVcsQ0FBQ0ksV0FBOUIsQ0FoQnVFLENBa0J2RTs7QUFDQSxNQUFJLE9BQU8rQixRQUFQLElBQW1CLFdBQW5CLElBQWtDLENBQUNBLFFBQXZDLEVBQWlEO0FBQ2hELFFBQUlBLFFBQVEsR0FBR0csa0JBQWtCLENBQUMsU0FBRCxDQUFqQztBQUNBOztBQUNELE1BQUlILFFBQUosRUFBYztBQUNibEMsS0FBQyxDQUFFLGFBQUYsQ0FBRCxDQUFtQmlELEtBQW5CLENBQTBCLFlBQVc7QUFDcEMsVUFBSVYsR0FBRyxHQUFHVyxLQUFLLENBQUNDLE9BQU4sQ0FBYyxtQ0FBZCxFQUFtRDtBQUFDLG9CQUFZakI7QUFBYixPQUFuRCxDQUFWO0FBQ0FNLFlBQU0sQ0FBQ1ksSUFBUCxDQUFZYixHQUFaLEVBQWlCLFFBQWpCLEVBQTJCLFlBQTNCO0FBQ0EsS0FIRDtBQUlBOztBQUVEdkMsR0FBQyxDQUFDd0MsTUFBRCxDQUFELENBQVV0QyxFQUFWLENBQWEsU0FBYixFQUF3Qm1ELGVBQXhCLEVBN0J1RSxDQStCdkU7QUFDQTtBQUNBOztBQUNBLFdBQVNBLGVBQVQsQ0FBeUJDLEVBQXpCLEVBQ0E7QUFDQyxRQUFJQSxFQUFFLENBQUNDLGFBQUgsQ0FBaUJDLEdBQWpCLElBQXNCLFNBQTFCLEVBQXFDLE9BRHRDLENBQzhDOztBQUM3QyxRQUFJQyxPQUFPLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXTCxFQUFFLENBQUNDLGFBQUgsQ0FBaUJLLFFBQTVCLENBQWQ7QUFDQSxRQUFJLENBQUNILE9BQUwsRUFBYyxPQUhmLENBR3VCO0FBRXRCOztBQUNBLFFBQUlBLE9BQU8sQ0FBQ0ksT0FBUixJQUFtQixpQ0FBdkIsRUFBMERDLHFCQUFxQixDQUFDTCxPQUFPLENBQUN0QixJQUFSLENBQWE0QixHQUFkLENBQXJCO0FBQzFELFFBQUlOLE9BQU8sQ0FBQ0ksT0FBUixJQUFtQixnQ0FBdkIsRUFBeURHLG9CQUFvQixDQUFDUCxPQUFPLENBQUN0QixJQUFSLENBQWE0QixHQUFkLENBQXBCO0FBQ3pEOztBQUVELFdBQVNELHFCQUFULENBQStCRyxRQUEvQixFQUF5QztBQUN4QyxRQUFJQyxnQkFBZ0IsR0FBRyxFQUF2QjtBQUVBQyxNQUFFLENBQUNDLFNBQUgsQ0FBYSxPQUFiLEVBQXNCQyxNQUF0QixDQUE2QixVQUFTNUQsQ0FBVCxFQUFZO0FBQ3hDO0FBQ0EsVUFBSUEsQ0FBQyxDQUFDNkQsY0FBRixJQUFvQjdELENBQUMsQ0FBQzZELGNBQUYsQ0FBaUJDLE9BQWpCLENBQXlCTixRQUF6QixLQUFzQyxDQUFDLENBQS9ELEVBQWtFO0FBQ2pFQyx3QkFBZ0IsQ0FBQ00sSUFBakIsQ0FBc0IvRCxDQUF0QjtBQUNBLGVBQU8sSUFBUDtBQUNBO0FBQ0QsS0FORCxFQU9DZ0UsT0FQRCxDQU9TLGtCQVBULEVBTzZCLElBUDdCLEVBSHdDLENBWXhDOztBQUNBTixNQUFFLENBQUNDLFNBQUgsQ0FBYSxPQUFiLEVBQXNCQyxNQUF0QixDQUE2QixVQUFTNUQsQ0FBVCxFQUFZO0FBQ3hDLGFBQU95RCxnQkFBZ0IsQ0FBQ0ssT0FBakIsQ0FBeUI5RCxDQUFDLENBQUNpRSxNQUEzQixLQUFzQyxDQUFDLENBQTlDO0FBQ0EsS0FGRCxFQUdDRCxPQUhELENBR1Msa0JBSFQsRUFHNkIsSUFIN0I7QUFJQTs7QUFFRCxXQUFTVCxvQkFBVCxDQUE4QkMsUUFBOUIsRUFBd0M7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQUUsTUFBRSxDQUFDQyxTQUFILENBQWEsbUJBQWIsRUFBa0NLLE9BQWxDLENBQTBDLGtCQUExQyxFQUE4RCxLQUE5RDtBQUNBO0FBQ0QsQ0F2RUQ7QUEyRUEsSUFBSTFFLFdBQVcsR0FBR0EsV0FBVyxJQUFJLEVBQWpDOztBQUVBQSxXQUFXLENBQUM0RSxlQUFaLEdBQStCLFlBQVc7QUFDekM7QUFDQSxNQUFJQyxVQUFVLEdBQUc7QUFDaEI5RCxTQUFLLEVBQUUsR0FEUztBQUVoQkMsVUFBTSxFQUFFO0FBRlEsR0FBakIsQ0FGeUMsQ0FNekM7O0FBQ0E2RCxZQUFVLENBQUNDLFNBQVgsR0FBdUI7QUFDdEJDLFVBQU0sRUFBRTtBQUFDQyxTQUFHLEVBQUUsRUFBTjtBQUFVQyxXQUFLLEVBQUUsRUFBakI7QUFBcUJDLFlBQU0sRUFBRSxFQUE3QjtBQUFpQ0MsVUFBSSxFQUFFO0FBQXZDO0FBRGMsR0FBdkI7QUFHQU4sWUFBVSxDQUFDQyxTQUFYLENBQXFCL0QsS0FBckIsR0FBNkI4RCxVQUFVLENBQUM5RCxLQUFYLEdBQW1CLENBQW5CLEdBQXFCLENBQXJCLEdBQXlCOEQsVUFBVSxDQUFDQyxTQUFYLENBQXFCQyxNQUFyQixDQUE0QkksSUFBckQsR0FBNEROLFVBQVUsQ0FBQ0MsU0FBWCxDQUFxQkMsTUFBckIsQ0FBNEJFLEtBQXJIO0FBQ0FKLFlBQVUsQ0FBQ0MsU0FBWCxDQUFxQjlELE1BQXJCLEdBQThCLE1BQU02RCxVQUFVLENBQUNDLFNBQVgsQ0FBcUJDLE1BQXJCLENBQTRCQyxHQUFsQyxHQUF3Q0gsVUFBVSxDQUFDQyxTQUFYLENBQXFCQyxNQUFyQixDQUE0QkcsTUFBbEcsQ0FYeUMsQ0FjekM7QUFDQTs7QUFDQSxNQUFJRSxXQUFXLEdBQUcsQ0FBQyxnQkFBRCxFQUFrQixpQkFBbEIsRUFBb0MsZ0JBQXBDLEVBQ2hCLGlCQURnQixFQUNFLGdCQURGLEVBQ21CLGlCQURuQixFQUVoQixnQkFGZ0IsRUFFQyxrQkFGRCxDQUFsQixDQWhCeUMsQ0FtQnpDO0FBQ0E7O0FBQ0FBLGFBQVcsQ0FBQ0MsTUFBWixDQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QkQsV0FBVyxDQUFDQyxNQUFaLENBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLENBQXpCO0FBRUEsTUFBSUMsZUFBZSxHQUFHO0FBQ3JCRixlQUFXLEVBQUVBLFdBRFE7QUFFckJQLGNBQVUsRUFBRUE7QUFGUyxHQUF0QjtBQUtBLFNBQU87QUFDTlUsWUFBUSxFQUFFRDtBQURKLEdBQVA7QUFHQSxDQS9COEIsRUFBL0I7O0FBZ0NBLElBQUl0RixXQUFXLEdBQUdBLFdBQVcsSUFBSSxFQUFqQzs7QUFFQUEsV0FBVyxDQUFDd0YsYUFBWixHQUE2QixZQUFXO0FBQ3ZDO0FBRUEsV0FBU0MsZUFBVCxDQUF5QkMsS0FBekIsRUFBZ0M7QUFDL0IsUUFBSUMsT0FBTyxHQUFHRCxLQUFLLENBQUNFLEtBQU4sQ0FBWSxDQUFaLENBQWQ7QUFDQSxXQUFPRCxPQUFPLENBQUNFLFNBQWY7QUFDQTs7QUFFRCxXQUFTQyxVQUFULENBQW9CSixLQUFwQixFQUEyQjtBQUMxQixRQUFJQyxPQUFPLEdBQUdELEtBQUssQ0FBQ0UsS0FBTixDQUFZLENBQVosQ0FBZDtBQUNBLFdBQU9ELE9BQU8sQ0FBQ0ksT0FBZjtBQUNBOztBQUVELFdBQVNDLFVBQVQsQ0FBb0JDLEtBQXBCLEVBQTJCO0FBQzFCLFFBQUlDLFlBQVksR0FBRyxFQUFuQjtBQUNBRCxTQUFLLENBQUNFLE9BQU4sQ0FBYyxVQUFTekYsQ0FBVCxFQUFZO0FBQ3pCLFVBQU0sT0FBT0EsQ0FBQyxDQUFDMEYsU0FBVCxJQUFzQixXQUF2QixJQUF3QzFGLENBQUMsQ0FBQzBGLFNBQUYsS0FBZ0IsSUFBN0QsRUFBcUU7QUFDcEUsWUFBSUMsVUFBVSxHQUFHLENBQUMzRixDQUFDLENBQUMyRixVQUFwQjtBQUNBLFlBQUlDLFVBQVUsR0FBRyxDQUFDNUYsQ0FBQyxDQUFDNEYsVUFBcEI7O0FBQ0EsWUFBTUQsVUFBVSxHQUFHLENBQWQsSUFBcUJDLFVBQVUsR0FBRyxDQUFsQyxJQUF5Q0QsVUFBVSxJQUFJQyxVQUE1RCxFQUEwRTtBQUN6RUosc0JBQVksQ0FBQ3pCLElBQWIsQ0FBa0IvRCxDQUFsQjtBQUNBO0FBQ0Q7QUFDRCxLQVJEO0FBU0EsV0FBT3dGLFlBQVA7QUFDQTs7QUFFRCxXQUFTSyxZQUFULENBQXNCTCxZQUF0QixFQUFvQztBQUNuQztBQUNBO0FBQ0E7QUFDQSxRQUFJTSxPQUFPLEdBQUdwQyxFQUFFLENBQUNxQyxHQUFILENBQU9QLFlBQVAsRUFBcUIsVUFBU3hGLENBQVQsRUFBWTtBQUFFLGFBQU9BLENBQUMsQ0FBQzRGLFVBQUYsR0FBYSxDQUFiLEdBQWlCNUYsQ0FBQyxDQUFDNEYsVUFBbkIsR0FBZ0MsSUFBdkM7QUFBOEMsS0FBakYsQ0FBZCxDQUptQyxDQUtuQzs7QUFDQSxRQUFJSSxTQUFTLEdBQUcsSUFBSUMsSUFBSixHQUFXQyxXQUFYLEVBQWhCO0FBQ0EsUUFBSUMsT0FBTyxHQUFHekMsRUFBRSxDQUFDMEMsR0FBSCxDQUFPWixZQUFQLEVBQXFCLFVBQVN4RixDQUFULEVBQVk7QUFBRSxhQUFPQSxDQUFDLENBQUMyRixVQUFGLElBQWNLLFNBQWQsR0FBMEJoRyxDQUFDLENBQUMyRixVQUE1QixHQUF5QyxJQUFoRDtBQUF1RCxLQUExRixDQUFkLENBUG1DLENBU25DO0FBQ0E7QUFDQTs7QUFDQVEsV0FBTyxHQUFHRSxJQUFJLENBQUNOLEdBQUwsQ0FBU0ksT0FBVCxFQUFrQixJQUFsQixDQUFWO0FBRUEsV0FBTyxDQUFDTCxPQUFELEVBQVVLLE9BQVYsQ0FBUDtBQUNBOztBQUVELFdBQVNHLGlCQUFULENBQTJCQyxTQUEzQixFQUFzQztBQUNyQyxRQUFJQyxjQUFjLEdBQUcsRUFBckI7O0FBQ0EsU0FBSyxJQUFJQyxDQUFDLEdBQUNGLFNBQVMsQ0FBQyxDQUFELENBQXBCLEVBQXlCRSxDQUFDLElBQUVGLFNBQVMsQ0FBQyxDQUFELENBQXJDLEVBQTBDRSxDQUFDLEVBQTNDLEVBQStDO0FBQzlDRCxvQkFBYyxDQUFDekMsSUFBZixDQUFvQjtBQUFDMkMsWUFBSSxFQUFFRCxDQUFQO0FBQVVFLGFBQUssRUFBRTtBQUFqQixPQUFwQjtBQUNBOztBQUNELFdBQU9ILGNBQVA7QUFDQTs7QUFFRCxXQUFTSSx3QkFBVCxDQUFrQzVCLEtBQWxDLEVBQXlDO0FBQ3hDO0FBQ0EsUUFBSXRELElBQUksR0FBRyxFQUFYO0FBQ0FBLFFBQUksQ0FBQyxXQUFELENBQUosR0FBb0JxRCxlQUFlLENBQUNDLEtBQUQsQ0FBbkM7QUFDQXRELFFBQUksQ0FBQyxTQUFELENBQUosR0FBa0IwRCxVQUFVLENBQUNKLEtBQUQsQ0FBNUI7QUFDQXRELFFBQUksQ0FBQyxRQUFELENBQUosR0FBaUIsRUFBakI7QUFFQSxRQUFJOEQsWUFBWSxHQUFHRixVQUFVLENBQUNOLEtBQUssQ0FBQ08sS0FBUCxDQUE3QjtBQUNBLFFBQUlnQixTQUFTLEdBQUdWLFlBQVksQ0FBQ0wsWUFBRCxDQUE1QjtBQUNBQSxnQkFBWSxHQUFHQSxZQUFZLENBQUM1QixNQUFiLENBQW9CLFVBQVM1RCxDQUFULEVBQVk7QUFDOUMsYUFBT0EsQ0FBQyxDQUFDMkYsVUFBRixJQUFnQlksU0FBUyxDQUFDLENBQUQsQ0FBekIsSUFBZ0N2RyxDQUFDLENBQUM0RixVQUFGLElBQWdCVyxTQUFTLENBQUMsQ0FBRCxDQUFoRTtBQUNBLEtBRmMsQ0FBZixDQVR3QyxDQWF4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTdFLFFBQUksQ0FBQ21GLE1BQUwsR0FBY1AsaUJBQWlCLENBQUNDLFNBQUQsQ0FBL0I7QUFDQWYsZ0JBQVksQ0FBQ0MsT0FBYixDQUFxQixVQUFTekYsQ0FBVCxFQUFZO0FBQ2hDLFVBQUk4RyxjQUFjLEdBQUc5RyxDQUFDLENBQUMyRixVQUF2QjtBQUNBLFVBQUlvQixZQUFZLEdBQUdyRixJQUFJLENBQUNtRixNQUFMLENBQVlqRCxNQUFaLENBQW1CLFVBQVNvRCxFQUFULEVBQWE7QUFBRSxlQUFPQSxFQUFFLENBQUNOLElBQUgsS0FBVUksY0FBakI7QUFBa0MsT0FBcEUsRUFBc0UsQ0FBdEUsQ0FBbkI7QUFDQUMsa0JBQVksQ0FBQ0osS0FBYjtBQUNBLEtBSkQ7QUFNQSxXQUFPakYsSUFBUDtBQUNBOztBQUVELFdBQVN1RixpQ0FBVCxDQUEyQ2pDLEtBQTNDLEVBQWtEO0FBQ2pELFFBQUl0RCxJQUFJLEdBQUcsRUFBWDtBQUNBQSxRQUFJLENBQUMsV0FBRCxDQUFKLEdBQW9CcUQsZUFBZSxDQUFDQyxLQUFELENBQW5DO0FBQ0F0RCxRQUFJLENBQUMsU0FBRCxDQUFKLEdBQWtCMEQsVUFBVSxDQUFDSixLQUFELENBQTVCO0FBQ0F0RCxRQUFJLENBQUMsUUFBRCxDQUFKLEdBQWlCLEVBQWpCO0FBRUEsUUFBSThELFlBQVksR0FBR0YsVUFBVSxDQUFDTixLQUFLLENBQUNPLEtBQVAsQ0FBN0I7QUFDQSxRQUFJZ0IsU0FBUyxHQUFHVixZQUFZLENBQUNMLFlBQUQsQ0FBNUI7QUFDQTlELFFBQUksQ0FBQ21GLE1BQUwsR0FBY1AsaUJBQWlCLENBQUNDLFNBQUQsQ0FBL0I7QUFDQSxRQUFJVyxTQUFTLEdBQUdsQyxLQUFLLENBQUNFLEtBQU4sQ0FBWSxDQUFaLEVBQWVpQyxNQUEvQjtBQUNBRCxhQUFTLEdBQUdBLFNBQVMsQ0FBQ3RELE1BQVYsQ0FBaUIsVUFBUzVELENBQVQsRUFBWTtBQUN4QyxhQUFVQSxDQUFDLENBQUNvSCxJQUFGLElBQVViLFNBQVMsQ0FBQyxDQUFELENBQXBCLElBQTZCdkcsQ0FBQyxDQUFDb0gsSUFBRixJQUFVYixTQUFTLENBQUMsQ0FBRCxDQUF6RDtBQUNBLEtBRlcsQ0FBWjtBQUdBVyxhQUFTLENBQUN6QixPQUFWLENBQWtCLFVBQVN6RixDQUFULEVBQVk7QUFDN0IsVUFBSStHLFlBQVksR0FBR3JGLElBQUksQ0FBQ21GLE1BQUwsQ0FBWWpELE1BQVosQ0FBbUIsVUFBU29ELEVBQVQsRUFBYTtBQUFFLGVBQU9BLEVBQUUsQ0FBQ04sSUFBSCxJQUFTMUcsQ0FBQyxDQUFDb0gsSUFBbEI7QUFBeUIsT0FBM0QsRUFBNkQsQ0FBN0QsQ0FBbkI7QUFDQUwsa0JBQVksQ0FBQ0osS0FBYjtBQUNBLEtBSEQ7QUFLQSxXQUFPakYsSUFBUDtBQUNBOztBQUVELFdBQVMyRixnQ0FBVCxDQUEwQ3JDLEtBQTFDLEVBQWlEO0FBQ2hEO0FBQ0EsUUFBSXRELElBQUksR0FBRyxFQUFYO0FBQ0FBLFFBQUksQ0FBQyxXQUFELENBQUosR0FBb0JxRCxlQUFlLENBQUNDLEtBQUQsQ0FBbkM7QUFDQXRELFFBQUksQ0FBQyxTQUFELENBQUosR0FBa0IwRCxVQUFVLENBQUNKLEtBQUQsQ0FBNUI7QUFDQXRELFFBQUksQ0FBQyxRQUFELENBQUosR0FBaUIsRUFBakI7QUFFQSxRQUFJOEQsWUFBWSxHQUFHRixVQUFVLENBQUNOLEtBQUssQ0FBQ08sS0FBUCxDQUE3QjtBQUNBLFFBQUlnQixTQUFTLEdBQUdWLFlBQVksQ0FBQ0wsWUFBRCxDQUE1QjtBQUNBOUQsUUFBSSxDQUFDbUYsTUFBTCxHQUFjUCxpQkFBaUIsQ0FBQ0MsU0FBRCxDQUEvQjtBQUNBLFFBQUlXLFNBQVMsR0FBR2xDLEtBQUssQ0FBQ0UsS0FBTixDQUFZLENBQVosRUFBZWlDLE1BQS9CO0FBQ0FELGFBQVMsR0FBR0EsU0FBUyxDQUFDdEQsTUFBVixDQUFpQixVQUFTNUQsQ0FBVCxFQUFZO0FBQ3hDLGFBQVVBLENBQUMsQ0FBQ29ILElBQUYsSUFBVWIsU0FBUyxDQUFDLENBQUQsQ0FBcEIsSUFBNkJ2RyxDQUFDLENBQUNvSCxJQUFGLElBQVViLFNBQVMsQ0FBQyxDQUFELENBQXpEO0FBQ0EsS0FGVyxDQUFaO0FBR0FXLGFBQVMsQ0FBQ3pCLE9BQVYsQ0FBa0IsVUFBU3pGLENBQVQsRUFBWTtBQUM3QixVQUFJK0csWUFBWSxHQUFHckYsSUFBSSxDQUFDbUYsTUFBTCxDQUFZakQsTUFBWixDQUFtQixVQUFTb0QsRUFBVCxFQUFhO0FBQUUsZUFBT0EsRUFBRSxDQUFDTixJQUFILElBQVMxRyxDQUFDLENBQUNvSCxJQUFsQjtBQUF5QixPQUEzRCxFQUE2RCxDQUE3RCxDQUFuQjtBQUNBTCxrQkFBWSxDQUFDSixLQUFiLEdBQXFCSSxZQUFZLENBQUNKLEtBQWIsR0FBcUIzRyxDQUFDLENBQUNzSCxFQUE1QztBQUNBLEtBSEQ7QUFLQSxXQUFPNUYsSUFBUDtBQUNBOztBQUVELFNBQU87QUFDTmtGLDRCQUF3QixFQUFFQSx3QkFEcEI7QUFFTksscUNBQWlDLEVBQUVBLGlDQUY3QjtBQUdOSSxvQ0FBZ0MsRUFBRUE7QUFINUIsR0FBUDtBQUtBLENBbEk0QixFQUE3Qjs7QUFxSUEsSUFBSS9ILFdBQVcsR0FBR0EsV0FBVyxJQUFJLEVBQWpDLEMsQ0FFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0FpSSxNQUFNLENBQUNDLFNBQVAsQ0FBaUJDLFVBQWpCLEdBQThCLFlBQVc7QUFDckMsU0FBTyxLQUFLQyxXQUFMLEdBQW1CeEYsT0FBbkIsQ0FBNEIsT0FBNUIsRUFBcUMsVUFBU3lGLENBQVQsRUFBWTtBQUNwRCxXQUFPQSxDQUFDLENBQUNDLFdBQUYsRUFBUDtBQUNILEdBRk0sQ0FBUDtBQUdILENBSkQ7O0FBT0EsSUFBSXRJLFdBQVcsR0FBR0EsV0FBVyxJQUFJLEVBQWpDOztBQUVBLFNBQVN1SSxRQUFULENBQWtCbkIsSUFBbEIsRUFBd0JTLE1BQXhCLEVBQWdDVyxVQUFoQyxFQUE0Q0MsUUFBNUMsRUFBc0Q7QUFDckQsTUFBSVosTUFBTSxDQUFDLENBQUQsQ0FBTixDQUFVYSxjQUFWLENBQXlCLFVBQXpCLENBQUosRUFBMEM7QUFDekMsUUFBSUMsV0FBVyxHQUFHLGtFQUFrRXZCLElBQWxFLEdBQXdFLFFBQTFGO0FBQ0F1QixlQUFXLEdBQUdBLFdBQVcsR0FBRyxNQUE1QjtBQUNBLFFBQUlDLGNBQWMsR0FBRyxDQUFyQjs7QUFDQSxTQUFLLElBQUl6QixDQUFDLEdBQUcsQ0FBUixFQUFXMEIsR0FBRyxHQUFHaEIsTUFBTSxDQUFDaUIsTUFBN0IsRUFBcUMzQixDQUFDLEdBQUcwQixHQUF6QyxFQUE4QzFCLENBQUMsRUFBL0MsRUFBbUQ7QUFDbEQsVUFBSTRCLEtBQUssR0FBR2xCLE1BQU0sQ0FBQ1YsQ0FBRCxDQUFsQjs7QUFDQSxVQUFJNEIsS0FBSyxDQUFDTCxjQUFOLENBQXFCLFVBQXJCLENBQUosRUFBc0M7QUFDckNDLG1CQUFXLEdBQUdBLFdBQVcsR0FBRyxNQUFkLEdBQXVCSSxLQUFLLENBQUMsVUFBRCxDQUE1QixHQUEyQyxPQUF6RDtBQUNBSCxzQkFBYzs7QUFDZCxZQUFJQSxjQUFjLEtBQUtKLFVBQXZCLEVBQW1DO0FBQ2xDO0FBQ0E7QUFDRDtBQUNEOztBQUNERyxlQUFXLEdBQUdBLFdBQVcsR0FBRyxPQUE1QjtBQUVBM0ksZUFBVyxDQUFDSSxXQUFaLENBQXdCNEksT0FBeEIsR0FBa0NoSixXQUFXLENBQUNJLFdBQVosQ0FBd0I0SSxPQUF4QixDQUFnQ0MsSUFBaEMsQ0FBcUNOLFdBQXJDLENBQWxDOztBQUNBLFFBQUlGLFFBQVEsSUFBSSxJQUFoQixFQUFzQjtBQUNyQkEsY0FBUSxDQUFDRSxXQUFELENBQVI7QUFDQTs7QUFDRCxXQUFPQSxXQUFQO0FBRUEsR0F0QkQsTUFzQk87QUFDTixRQUFJTyxJQUFJLEdBQUcsRUFBWDs7QUFDQSxTQUFLLElBQUkvQixDQUFDLEdBQUcsQ0FBUixFQUFXMEIsR0FBRyxHQUFHTCxVQUF0QixFQUFrQ3JCLENBQUMsR0FBRzBCLEdBQXRDLEVBQTJDMUIsQ0FBQyxFQUE1QyxFQUFnRDtBQUMvQyxVQUFJQSxDQUFDLEdBQUdVLE1BQU0sQ0FBQ2lCLE1BQWYsRUFBdUI7QUFDdEJJLFlBQUksQ0FBQ3pFLElBQUwsQ0FBVW9ELE1BQU0sQ0FBQ1YsQ0FBRCxDQUFOLENBQVVnQyxPQUFwQjtBQUNBO0FBQ0Q7O0FBQ0RsSixLQUFDLENBQUNtSixJQUFGLENBQU87QUFDTkMsY0FBUSxFQUFFLE1BREo7QUFFTjdHLFNBQUcsRUFBRThHLFlBQVksR0FBRywwQkFGZDtBQUdObEgsVUFBSSxFQUFFO0FBQUNtSCxlQUFPLEVBQUU1RixJQUFJLENBQUM2RixTQUFMLENBQWVOLElBQWY7QUFBVixPQUhBO0FBSU5PLGFBQU8sRUFBRSxVQUFTQyxNQUFULEVBQWlCO0FBQ3pCeEksZUFBTyxDQUFDQyxHQUFSLENBQVl1SSxNQUFaO0FBQ0EsWUFBSUMsU0FBUyxHQUFHRCxNQUFNLENBQUMsUUFBRCxDQUF0QjtBQUNBLFlBQUlmLFdBQVcsR0FBRyxrRUFBa0V2QixJQUFsRSxHQUF3RSxRQUExRjtBQUNBdUIsbUJBQVcsR0FBR0EsV0FBVyxHQUFHLE1BQTVCOztBQUNBLGFBQUssSUFBSXhCLENBQUMsR0FBRyxDQUFSLEVBQVcwQixHQUFHLEdBQUdjLFNBQVMsQ0FBQ2IsTUFBaEMsRUFBd0MzQixDQUFDLEdBQUcwQixHQUE1QyxFQUFpRDFCLENBQUMsRUFBbEQsRUFBc0Q7QUFDckRVLGdCQUFNLENBQUNWLENBQUQsQ0FBTixDQUFVLFVBQVYsSUFBd0J3QyxTQUFTLENBQUN4QyxDQUFELENBQVQsQ0FBYSxVQUFiLENBQXhCO0FBQ0F3QixxQkFBVyxHQUFHQSxXQUFXLEdBQUcsTUFBZCxHQUF1QmQsTUFBTSxDQUFDVixDQUFELENBQU4sQ0FBVSxVQUFWLENBQXZCLEdBQStDLE9BQTdEO0FBQ0E7O0FBQ0R3QixtQkFBVyxHQUFHQSxXQUFXLEdBQUcsT0FBNUI7QUFFQTNJLG1CQUFXLENBQUNJLFdBQVosQ0FBd0I0SSxPQUF4QixHQUFrQ2hKLFdBQVcsQ0FBQ0ksV0FBWixDQUF3QjRJLE9BQXhCLENBQWdDQyxJQUFoQyxDQUFxQ04sV0FBckMsQ0FBbEM7O0FBQ0EsWUFBSUYsUUFBUSxJQUFJLElBQWhCLEVBQXNCO0FBQ3JCQSxrQkFBUSxDQUFDRSxXQUFELENBQVI7QUFDQTs7QUFDRCxlQUFPQSxXQUFQO0FBRUE7Ozs7Ozs7Ozs7Ozs7QUFjQTtBQW5DSyxLQUFQO0FBcUNBLEdBbkVvRCxDQW1FbEQ7O0FBR0g7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9DQTs7O0FBQ0ExSSxDQUFDLENBQUVDLFFBQUYsQ0FBRCxDQUFjQyxFQUFkLENBQWtCLGNBQWxCLEVBQWtDLFlBQVc7QUFDNUMsTUFBSXlKLFdBQVcsR0FBRzNKLENBQUMsQ0FBQ3dDLE1BQUQsQ0FBRCxDQUFVMUIsS0FBVixFQUFsQjtBQUVBOEksY0FBWTtBQUNaQyxnQkFBYztBQUVkN0osR0FBQyxDQUFDLHNCQUFELENBQUQsQ0FBMEI4SixHQUExQixDQUE4QixnQkFBOUIsRUFBZ0QsS0FBaEQsRUFDRUMsV0FERixDQUNjO0FBQ1pDLFNBQUssRUFBRSxrQkFESztBQUVaQyxZQUFRLEVBQUVOLFdBQVcsR0FBRyxFQUZaO0FBR1pPLGFBQVMsRUFBRSxJQUhDO0FBSVpDLHFCQUFpQixFQUFFLENBSlA7QUFLWkMsU0FBSyxFQUFFLENBTEs7QUFNWkMsbUJBQWUsRUFBRSxJQU5MO0FBT1pDLFdBQU8sRUFBRSxtQkFQRztBQVFaQyxpQkFBYSxFQUFFLElBUkg7QUFTWkMsZ0JBQVksRUFBRSxZQUFXO0FBQUN2SixhQUFPLENBQUNDLEdBQVIsQ0FBWSxrQkFBWjtBQUFpQyxLQVQvQztBQVVadUosa0JBQWMsRUFBRSxVQUFTQyxRQUFULEVBQW1CQyxNQUFuQixFQUEyQjtBQUMxQyxVQUFJQyxPQUFPLEdBQUc1SyxDQUFDLENBQUMySyxNQUFNLENBQUNFLE1BQVIsQ0FBZjtBQUNBLFVBQUkxRCxJQUFJLEdBQUd5RCxPQUFPLENBQUN6SSxJQUFSLENBQWEsTUFBYixDQUFYO0FBQ0EsVUFBSXdGLFNBQVMsR0FBRzVILFdBQVcsQ0FBQ0ksV0FBWixDQUF3QnVGLE9BQXhCLENBQWdDa0MsTUFBaEQ7QUFDQSxVQUFJa0QsY0FBYyxHQUFHbkQsU0FBUyxDQUFDdEQsTUFBVixDQUFpQixVQUFTb0QsRUFBVCxFQUFhO0FBQ2xELGVBQU9BLEVBQUUsQ0FBQ0ksSUFBSCxJQUFTVixJQUFoQjtBQUFzQixPQURGLEVBR25CNEQsSUFIbUIsQ0FHZCxVQUFTQyxDQUFULEVBQVlDLENBQVosRUFBZTtBQUFFLGVBQU85RyxFQUFFLENBQUMrRyxVQUFILENBQWNGLENBQUMsQ0FBQ2pELEVBQWhCLEVBQW9Ca0QsQ0FBQyxDQUFDbEQsRUFBdEIsQ0FBUDtBQUFtQyxPQUh0QyxDQUFyQjs7QUFJQSxVQUFJK0MsY0FBYyxDQUFDakMsTUFBZixLQUEwQixDQUE5QixFQUFpQztBQUNoQyxlQUFPLEtBQVA7QUFDQTs7QUFDRCxVQUFJSCxXQUFXLEdBQUdKLFFBQVEsQ0FBQ25CLElBQUQsRUFBTzJELGNBQVAsRUFBdUIsQ0FBdkIsRUFBMEIsVUFBUzlCLElBQVQsRUFBZTtBQUNsRTBCLGdCQUFRLENBQUNKLE9BQVQsQ0FBaUJ0QixJQUFqQjtBQUNBLE9BRnlCLENBQTFCLENBWDBDLENBYzFDO0FBQ0E7QUF6QlcsR0FEZDtBQTRCQSxDQWxDRDs7QUFvQ0EsU0FBU1ksWUFBVCxHQUF3QjtBQUN2QjtBQUNBNUosR0FBQyxDQUFDLE9BQUQsQ0FBRCxDQUFXbUwsUUFBWCxDQUFvQixhQUFwQixFQUZ1QixDQUd2Qjs7QUFDQSxNQUFJeEIsV0FBVyxHQUFHM0osQ0FBQyxDQUFDd0MsTUFBRCxDQUFELENBQVUxQixLQUFWLEVBQWxCO0FBQ0FkLEdBQUMsQ0FBQyxjQUFELENBQUQsQ0FBa0IrSixXQUFsQixDQUE4QjtBQUM3QkMsU0FBSyxFQUFFLGtCQURzQjtBQUU3QkMsWUFBUSxFQUFFTixXQUFXLEdBQUcsRUFGSztBQUc3Qk8sYUFBUyxFQUFFLElBSGtCO0FBSTdCQyxxQkFBaUIsRUFBRSxDQUpVO0FBSzdCQyxTQUFLLEVBQUUsQ0FMc0I7QUFNN0JDLG1CQUFlLEVBQUUsSUFOWTtBQU83QkMsV0FBTyxFQUFFLDJDQVBvQjtBQVE3QkMsaUJBQWEsRUFBRSxJQVJjO0FBUzdCRSxrQkFBYyxFQUFFLFVBQVNDLFFBQVQsRUFBbUJDLE1BQW5CLEVBQTJCO0FBQzFDLFVBQUlqQyxXQUFXLEdBQUcwQyxhQUFhLENBQUNULE1BQU0sQ0FBQ0UsTUFBUixFQUFnQixVQUFTN0IsSUFBVCxFQUFlO0FBQzdEMEIsZ0JBQVEsQ0FBQ0osT0FBVCxDQUFpQnRCLElBQWpCO0FBQ0EsT0FGOEIsQ0FBL0I7QUFHQTtBQWI0QixHQUE5Qjs7QUFnQkEsV0FBU29DLGFBQVQsQ0FBdUJDLElBQXZCLEVBQTZCN0MsUUFBN0IsRUFBdUM7QUFDdEM7QUFDQSxRQUFJUSxJQUFJLEdBQUcsRUFBWDtBQUNBN0UsTUFBRSxDQUFDbUgsTUFBSCxDQUFVRCxJQUFWLEVBQWdCRSxJQUFoQixDQUFxQixVQUFTOUssQ0FBVCxFQUFZO0FBQ2hDLFVBQU1BLENBQUMsQ0FBQytLLFFBQUYsS0FBZSxPQUFoQixJQUE2QixDQUFDL0ssQ0FBQyxDQUFDZ0wsWUFBckMsRUFBcUQ7QUFDcEQsWUFBTSxPQUFPaEwsQ0FBQyxDQUFDaUwsUUFBVCxJQUFxQixXQUF0QixJQUF1Q2pMLENBQUMsQ0FBQ2lMLFFBQUYsQ0FBVzdDLE1BQVgsR0FBa0IsQ0FBOUQsRUFBbUU7QUFDbEVHLGNBQUksR0FBRzJDLFVBQVUsQ0FBQ2xMLENBQUQsQ0FBakI7O0FBQ0EsY0FBSStILFFBQVEsSUFBSSxJQUFoQixFQUFzQjtBQUNyQkEsb0JBQVEsQ0FBQ1EsSUFBRCxDQUFSO0FBQ0E7O0FBQ0QsaUJBQU9BLElBQVA7QUFDQTs7QUFDRGhKLFNBQUMsQ0FBQ21KLElBQUYsQ0FBTztBQUNOQyxrQkFBUSxFQUFFLE1BREo7QUFFTjdHLGFBQUcsRUFBRThHLFlBQVksR0FBRywwQkFGZDtBQUdObEgsY0FBSSxFQUFFO0FBQUNtSCxtQkFBTyxFQUFFN0ksQ0FBQyxDQUFDbUw7QUFBWixXQUhBO0FBSU5wQyxpQkFBTyxFQUFFLFVBQVNDLE1BQVQsRUFBaUI7QUFDekJ4SSxtQkFBTyxDQUFDQyxHQUFSLENBQVl1SSxNQUFaO0FBQ0FoSixhQUFDLENBQUNvTCxLQUFGLEdBQVVwQyxNQUFNLENBQUMsT0FBRCxDQUFoQjtBQUNBaEosYUFBQyxDQUFDcUwsR0FBRixHQUFRckMsTUFBTSxDQUFDLEtBQUQsQ0FBZDtBQUNBaEosYUFBQyxDQUFDaUwsUUFBRixHQUFhakMsTUFBTSxDQUFDLFVBQUQsQ0FBbkI7QUFDQWhKLGFBQUMsQ0FBQ3NMLFVBQUYsR0FBZXRDLE1BQU0sQ0FBQyxZQUFELENBQXJCO0FBQ0FoSixhQUFDLENBQUN1TCxLQUFGLEdBQVV2QyxNQUFNLENBQUMsT0FBRCxDQUFoQjtBQUNBaEosYUFBQyxDQUFDZ0wsWUFBRixHQUFpQixJQUFqQixDQVB5QixDQVF6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQXpDLGdCQUFJLEdBQUdpRCxtQkFBbUIsQ0FBQ3hMLENBQUQsQ0FBMUI7O0FBQ0EsZ0JBQUkrSCxRQUFRLElBQUksSUFBaEIsRUFBc0I7QUFDckJBLHNCQUFRLENBQUNRLElBQUQsQ0FBUjtBQUNBOztBQUNELG1CQUFPQSxJQUFQO0FBR0E7QUEzQkssU0FBUDtBQTZCQSxPQXJDRCxNQXFDTyxJQUFLdkksQ0FBQyxDQUFDeUwsR0FBRixJQUFTLENBQWQsRUFBa0I7QUFDeEJ6TCxTQUFDLENBQUNpSSxXQUFGLEdBQWdCLEtBQWhCOztBQUNBLFlBQUlqSSxDQUFDLENBQUMrSyxRQUFOLEVBQWdCO0FBQ2YvSyxXQUFDLENBQUNpSSxXQUFGLEdBQWdCakksQ0FBQyxDQUFDaUksV0FBRixHQUFnQmpJLENBQUMsQ0FBQytLLFFBQUYsQ0FBV3RELFVBQVgsRUFBaEIsR0FBMEMsSUFBMUQ7QUFDQTs7QUFDRHpILFNBQUMsQ0FBQ2lJLFdBQUYsR0FBZ0JqSSxDQUFDLENBQUNpSSxXQUFGLEdBQWdCakksQ0FBQyxDQUFDNkIsSUFBbEM7QUFDQTdCLFNBQUMsQ0FBQ2lJLFdBQUYsR0FBZ0JqSSxDQUFDLENBQUNpSSxXQUFGLEdBQWdCLE1BQWhDO0FBQ0EsWUFBSXlELFlBQVksR0FBRzFMLENBQUMsQ0FBQ21ILE1BQUYsQ0FBU2lCLE1BQTVCO0FBQ0FwSSxTQUFDLENBQUNpSSxXQUFGLEdBQWdCakksQ0FBQyxDQUFDaUksV0FBRixHQUFnQiw2QkFBaEIsR0FBZ0R5RCxZQUFoRCxHQUErRCxNQUEvRTtBQUNBbkQsWUFBSSxHQUFHdkksQ0FBQyxDQUFDaUksV0FBVDs7QUFDQSxZQUFJRixRQUFRLElBQUksSUFBaEIsRUFBc0I7QUFDckJBLGtCQUFRLENBQUNRLElBQUQsQ0FBUjtBQUNBOztBQUVELGVBQU9BLElBQVA7QUFDQTtBQUVELEtBdkREO0FBd0RBLFdBQU9BLElBQVA7QUFDQTs7QUFFRCxXQUFTMkMsVUFBVCxDQUFvQmxMLENBQXBCLEVBQXVCO0FBQ3RCQSxLQUFDLENBQUNnTCxZQUFGLEdBQWlCLElBQWpCO0FBQ0EsUUFBSXpDLElBQUksR0FBR2lELG1CQUFtQixDQUFDeEwsQ0FBRCxDQUE5QjtBQUNBLFdBQU91SSxJQUFQO0FBQ0E7O0FBRUQsV0FBU2lELG1CQUFULENBQTZCeEwsQ0FBN0IsRUFBZ0M7QUFDL0IsUUFBSTJMLElBQUksR0FBR3BNLENBQUMsQ0FBRSxRQUFGLENBQVo7QUFDQW9NLFFBQUksQ0FBQ0MsTUFBTCxDQUFhck0sQ0FBQyxDQUFFLG1CQUFGLENBQUQsQ0FBeUJzTSxJQUF6QixDQUE4QjdMLENBQUMsQ0FBQ29MLEtBQWhDLENBQWI7QUFDQU8sUUFBSSxDQUFDQyxNQUFMLENBQWFyTSxDQUFDLENBQUUscUJBQUYsQ0FBRCxDQUEyQnNNLElBQTNCLENBQWdDN0wsQ0FBQyxDQUFDc0wsVUFBbEMsQ0FBYjtBQUNBSyxRQUFJLENBQUNDLE1BQUwsQ0FBYXJNLENBQUMsQ0FBRSxtQkFBRixDQUFELENBQXlCc00sSUFBekIsQ0FBOEI3TCxDQUFDLENBQUN1TCxLQUFoQyxDQUFiO0FBQ0FJLFFBQUksQ0FBQ0MsTUFBTCxDQUFhck0sQ0FBQyxDQUFFLGtCQUFGLENBQUQsQ0FBd0JzTSxJQUF4QixDQUE2QjdMLENBQUMsQ0FBQ29ILElBQS9CLENBQWIsRUFMK0IsQ0FNL0I7O0FBQ0F1RSxRQUFJLENBQUNDLE1BQUwsQ0FBYXJNLENBQUMsQ0FBRSxvQkFBRixDQUFELENBQTBCc00sSUFBMUIsQ0FBK0IsaUJBQWlCN0wsQ0FBQyxDQUFDOEwsb0JBQWxELENBQWIsRUFQK0IsQ0FRL0I7QUFDQTtBQUNBOztBQUNBOUwsS0FBQyxDQUFDaUksV0FBRixHQUFnQjBELElBQUksQ0FBQ3BELElBQUwsRUFBaEI7QUFDQSxRQUFJQSxJQUFJLEdBQUd2SSxDQUFDLENBQUNpSSxXQUFiO0FBQ0EsV0FBT00sSUFBUDtBQUVBO0FBQ0Q7O0FBRUQsU0FBU2EsY0FBVCxHQUEwQjtBQUN6QixNQUFJRixXQUFXLEdBQUczSixDQUFDLENBQUN3QyxNQUFELENBQUQsQ0FBVTFCLEtBQVYsRUFBbEI7QUFDQSxNQUFJMEwsU0FBUyxHQUFHLHdJQUFoQjtBQUNBeE0sR0FBQyxDQUFDLG1CQUFELENBQUQsQ0FBdUIrSixXQUF2QixDQUFtQztBQUNsQ0MsU0FBSyxFQUFFLGtCQUQyQjtBQUVsQ0MsWUFBUSxFQUFFTixXQUFXLEdBQUcsRUFGVTtBQUdsQ08sYUFBUyxFQUFFLElBSHVCO0FBSWxDQyxxQkFBaUIsRUFBRSxDQUplO0FBS2xDQyxTQUFLLEVBQUUsQ0FMMkI7QUFNbENDLG1CQUFlLEVBQUUsSUFOaUI7QUFPbENDLFdBQU8sRUFBRWtDLFNBUHlCO0FBUWxDakMsaUJBQWEsRUFBRTtBQVJtQixHQUFuQztBQVdBLE1BQUlrQyxVQUFVLEdBQUcsdVdBQWpCO0FBQ0F6TSxHQUFDLENBQUMsMEJBQUQsQ0FBRCxDQUE4QitKLFdBQTlCLENBQTBDO0FBQ3pDQyxTQUFLLEVBQUUsa0JBRGtDO0FBRXpDQyxZQUFRLEVBQUVOLFdBQVcsR0FBRyxFQUZpQjtBQUd6Q08sYUFBUyxFQUFFLElBSDhCO0FBSXpDQyxxQkFBaUIsRUFBRSxDQUpzQjtBQUt6Q0MsU0FBSyxFQUFFLENBTGtDO0FBTXpDQyxtQkFBZSxFQUFFLElBTndCO0FBT3pDQyxXQUFPLEVBQUVtQyxVQVBnQztBQVF6Q2xDLGlCQUFhLEVBQUU7QUFSMEIsR0FBMUM7QUFXQXZLLEdBQUMsQ0FBQyxhQUFELENBQUQsQ0FBaUIrSixXQUFqQixDQUE2QjtBQUM1QkMsU0FBSyxFQUFFLGtCQURxQjtBQUU1QkMsWUFBUSxFQUFFTixXQUFXLEdBQUcsRUFGSTtBQUc1Qk8sYUFBUyxFQUFFLElBSGlCO0FBSTVCQyxxQkFBaUIsRUFBRSxDQUpTO0FBSzVCQyxTQUFLLEVBQUUsQ0FMcUI7QUFNNUJDLG1CQUFlLEVBQUUsSUFOVztBQU81QkMsV0FBTyxFQUFFLG1CQVBtQjtBQVE1QkMsaUJBQWEsRUFBRSxJQVJhO0FBUzVCRSxrQkFBYyxFQUFFLFVBQVNDLFFBQVQsRUFBbUJDLE1BQW5CLEVBQTJCO0FBQzFDLFVBQUkrQixVQUFVLEdBQUd2SSxFQUFFLENBQUNtSCxNQUFILENBQVVYLE1BQU0sQ0FBQ0UsTUFBakIsQ0FBakI7QUFDQTZCLGdCQUFVLENBQUNuQixJQUFYLENBQWdCLFVBQVM5SyxDQUFULEVBQVk7QUFDM0IsWUFBSXVJLElBQUksR0FBRywrQkFBK0J2SSxDQUFDLENBQUNrTSxRQUFqQyxHQUE0QyxRQUF2RDtBQUNBM0QsWUFBSSxHQUFHQSxJQUFJLEdBQUcsTUFBZDs7QUFDQSxhQUFLLElBQUk5QixDQUFDLEdBQUcsQ0FBUixFQUFXMEIsR0FBRyxHQUFHbkksQ0FBQyxDQUFDbU0sVUFBRixDQUFhL0QsTUFBbkMsRUFBMkMzQixDQUFDLEdBQUcwQixHQUEvQyxFQUFvRDFCLENBQUMsRUFBckQsRUFBeUQ7QUFDeEQ4QixjQUFJLEdBQUdBLElBQUksR0FBRyxNQUFQLEdBQWdCdkksQ0FBQyxDQUFDbU0sVUFBRixDQUFhMUYsQ0FBYixDQUFoQixHQUFrQyxPQUF6QztBQUNBOztBQUNEOEIsWUFBSSxHQUFHQSxJQUFJLEdBQUcsT0FBZDtBQUNBMEIsZ0JBQVEsQ0FBQ0osT0FBVCxDQUFpQnRCLElBQWpCO0FBQ0E7QUFDQSxPQVREO0FBVUE7QUFyQjJCLEdBQTdCO0FBdUJBLEMsQ0FDRDs7O0FBQ0FoQixNQUFNLENBQUNDLFNBQVAsQ0FBaUJDLFVBQWpCLEdBQThCLFlBQVc7QUFDckMsU0FBTyxLQUFLQyxXQUFMLEdBQW1CeEYsT0FBbkIsQ0FBNEIsT0FBNUIsRUFBcUMsVUFBU3lGLENBQVQsRUFBWTtBQUNwRCxXQUFPQSxDQUFDLENBQUNDLFdBQUYsRUFBUDtBQUNILEdBRk0sQ0FBUDtBQUdILENBSkQ7O0FBT0EsU0FBU2xJLFdBQVQsQ0FBcUJnQyxJQUFyQixFQUEyQjtBQUMxQixNQUFJMEssSUFBSSxHQUFHLElBQVg7QUFDQUEsTUFBSSxDQUFDMUssSUFBTCxHQUFZQSxJQUFaO0FBQ0EwSyxNQUFJLENBQUNDLFdBQUwsR0FBbUJELElBQUksQ0FBQzFLLElBQUwsQ0FBVXdELEtBQVYsQ0FBZ0JvSCxLQUFoQixDQUFzQixDQUF0QixDQUFuQjtBQUNBOUwsU0FBTyxDQUFDQyxHQUFSLENBQVkyTCxJQUFJLENBQUMxSyxJQUFqQixFQUowQixDQU0xQjtBQUNBO0FBQ0c7QUFDQTtBQUNBO0FBQ0E7O0FBQ0gwSyxNQUFJLENBQUNoTSxlQUFMLENBWjBCLENBWUg7O0FBRXZCZ00sTUFBSSxDQUFDMUgsV0FBTCxDQWQwQixDQWdCdkI7QUFDQTtBQUNBO0FBQ0g7QUFDRzs7QUFDQTBILE1BQUksQ0FBQ0csb0JBQUwsR0FBNEIsQ0FBQyxRQUFELEVBQ0MsUUFERCxFQUV2QixTQUZ1QixDQUE1QjtBQUdISCxNQUFJLENBQUNJLGFBQUwsR0FBcUJKLElBQUksQ0FBQ0csb0JBQUwsQ0FBMEIsQ0FBMUIsQ0FBckI7QUFFQUgsTUFBSSxDQUFDek0sUUFBTCxHQUFnQixLQUFoQjtBQUVBeU0sTUFBSSxDQUFDSyxHQUFMO0FBQ0dMLE1BQUksQ0FBQ3hMLEtBQUw7QUFDSHdMLE1BQUksQ0FBQ3hCLElBQUw7QUFDQXdCLE1BQUksQ0FBQ00sSUFBTDtBQUNBTixNQUFJLENBQUNuSCxPQUFMO0FBRUFtSCxNQUFJLENBQUNPLGdCQUFMLENBbEMwQixDQW9DMUI7O0FBRUFQLE1BQUksQ0FBQ1EsZ0JBQUw7QUFDR1IsTUFBSSxDQUFDUyxNQUFMO0FBRUFULE1BQUksQ0FBQ1UsZUFBTDtBQUVBVixNQUFJLENBQUNXLGNBQUw7QUFFQVgsTUFBSSxDQUFDOUQsT0FBTDtBQUNIOEQsTUFBSSxDQUFDWSxHQUFMO0FBRUFaLE1BQUksQ0FBQ2EsSUFBTDtBQUNBYixNQUFJLENBQUNjLEtBQUwsQ0FqRDBCLENBbUR2QjtBQUNBO0FBQ0g7QUFDQTtBQUNHO0FBQ0E7QUFDQTs7QUFDSGQsTUFBSSxDQUFDMUgsV0FBTCxDQTFEMEIsQ0EwRFA7QUFFbkI7O0FBQ0EsTUFBSXlJLE9BQU8sR0FBRyxDQUFDLFNBQUQsRUFBVyxTQUFYLEVBQXFCLFNBQXJCLEVBQStCLFNBQS9CLEVBQXlDLFNBQXpDLEVBQW1ELFNBQW5ELEVBQTZELFNBQTdELEVBQXVFLFNBQXZFLEVBQWlGLFNBQWpGLEVBQTJGLFNBQTNGLEVBQXFHLFNBQXJHLEVBQStHLFNBQS9HLEVBQXlILFNBQXpILEVBQW1JLFNBQW5JLEVBQTZJLFNBQTdJLEVBQXVKLFNBQXZKLEVBQWlLLFNBQWpLLEVBQTJLLFNBQTNLLEVBQXFMLFNBQXJMLEVBQStMLFNBQS9MLEVBQXlNLFNBQXpNLEVBQW1OLFNBQW5OLEVBQTZOLFNBQTdOLEVBQXVPLFNBQXZPLEVBQWlQLFNBQWpQLEVBQTJQLFNBQTNQLEVBQXFRLFNBQXJRLEVBQStRLFNBQS9RLEVBQXlSLFNBQXpSLEVBQW1TLFNBQW5TLEVBQTZTLFNBQTdTLEVBQXVULFNBQXZULEVBQWlVLFNBQWpVLEVBQTJVLFNBQTNVLEVBQXFWLFNBQXJWLEVBQStWLFNBQS9WLEVBQXlXLFNBQXpXLEVBQW1YLFNBQW5YLEVBQTZYLFNBQTdYLEVBQXVZLFNBQXZZLEVBQWlaLFNBQWpaLEVBQTJaLFNBQTNaLEVBQXFhLFNBQXJhLEVBQSthLFNBQS9hLEVBQXliLFNBQXpiLEVBQW1jLFNBQW5jLEVBQTZjLFNBQTdjLEVBQXVkLFNBQXZkLEVBQWllLFNBQWplLEVBQTJlLFNBQTNlLEVBQXFmLFNBQXJmLEVBQStmLFNBQS9mLEVBQXlnQixTQUF6Z0IsRUFBbWhCLFNBQW5oQixFQUE2aEIsU0FBN2hCLEVBQXVpQixTQUF2aUIsRUFBaWpCLFNBQWpqQixFQUEyakIsU0FBM2pCLEVBQXFrQixTQUFya0IsRUFBK2tCLFNBQS9rQixFQUF5bEIsU0FBemxCLEVBQW1tQixTQUFubUIsRUFBNm1CLFNBQTdtQixFQUF1bkIsU0FBdm5CLEVBQWlvQixTQUFqb0IsRUFBMm9CLFNBQTNvQixFQUFxcEIsU0FBcnBCLEVBQStwQixTQUEvcEIsRUFBeXFCLFNBQXpxQixFQUFtckIsU0FBbnJCLEVBQTZyQixTQUE3ckIsRUFBdXNCLFNBQXZzQixFQUFpdEIsU0FBanRCLEVBQTJ0QixTQUEzdEIsRUFBcXVCLFNBQXJ1QixFQUErdUIsU0FBL3VCLEVBQXl2QixTQUF6dkIsRUFBbXdCLFNBQW53QixFQUE2d0IsU0FBN3dCLEVBQXV4QixTQUF2eEIsRUFBaXlCLFNBQWp5QixFQUEyeUIsU0FBM3lCLEVBQXF6QixTQUFyekIsRUFBK3pCLFNBQS96QixFQUF5MEIsU0FBejBCLEVBQW0xQixTQUFuMUIsRUFBNjFCLFNBQTcxQixFQUF1MkIsU0FBdjJCLEVBQWkzQixTQUFqM0IsRUFBMjNCLFNBQTMzQixFQUFxNEIsU0FBcjRCLEVBQSs0QixTQUEvNEIsRUFBeTVCLFNBQXo1QixFQUFtNkIsU0FBbjZCLEVBQTY2QixTQUE3NkIsRUFBdTdCLFNBQXY3QixFQUFpOEIsU0FBajhCLEVBQTI4QixTQUEzOEIsRUFBcTlCLFNBQXI5QixFQUErOUIsU0FBLzlCLEVBQXkrQixTQUF6K0IsRUFBbS9CLFNBQW4vQixFQUE2L0IsU0FBNy9CLEVBQXVnQyxTQUF2Z0MsRUFBaWhDLFNBQWpoQyxFQUEyaEMsU0FBM2hDLEVBQXFpQyxTQUFyaUMsRUFBK2lDLFNBQS9pQyxFQUF5akMsU0FBempDLEVBQW1rQyxTQUFua0MsRUFBNmtDLFNBQTdrQyxFQUF1bEMsU0FBdmxDLEVBQWltQyxTQUFqbUMsRUFBMm1DLFNBQTNtQyxFQUFxbkMsU0FBcm5DLEVBQStuQyxTQUEvbkMsRUFBeW9DLFNBQXpvQyxFQUFtcEMsU0FBbnBDLEVBQTZwQyxTQUE3cEMsRUFBdXFDLFNBQXZxQyxFQUFpckMsU0FBanJDLEVBQTJyQyxTQUEzckMsRUFBcXNDLFNBQXJzQyxFQUErc0MsU0FBL3NDLEVBQXl0QyxTQUF6dEMsRUFBbXVDLFNBQW51QyxFQUE2dUMsU0FBN3VDLEVBQXV2QyxTQUF2dkMsRUFBaXdDLFNBQWp3QyxFQUEyd0MsU0FBM3dDLEVBQXF4QyxTQUFyeEMsRUFBK3hDLFNBQS94QyxFQUF5eUMsU0FBenlDLEVBQW16QyxTQUFuekMsRUFBNnpDLFNBQTd6QyxFQUF1MEMsU0FBdjBDLEVBQWkxQyxTQUFqMUMsRUFBMjFDLFNBQTMxQyxFQUFxMkMsU0FBcjJDLEVBQSsyQyxTQUEvMkMsRUFBeTNDLFNBQXozQyxFQUFtNEMsU0FBbjRDLEVBQTY0QyxTQUE3NEMsRUFBdTVDLFNBQXY1QyxFQUFpNkMsU0FBajZDLEVBQTI2QyxTQUEzNkMsRUFBcTdDLFNBQXI3QyxFQUErN0MsU0FBLzdDLEVBQXk4QyxTQUF6OEMsRUFBbTlDLFNBQW45QyxFQUE2OUMsU0FBNzlDLEVBQXUrQyxTQUF2K0MsRUFBaS9DLFNBQWovQyxFQUEyL0MsU0FBMy9DLEVBQXFnRCxTQUFyZ0QsRUFBK2dELFNBQS9nRCxFQUF5aEQsU0FBemhELEVBQW1pRCxTQUFuaUQsRUFBNmlELFNBQTdpRCxFQUF1akQsU0FBdmpELEVBQWlrRCxTQUFqa0QsRUFBMmtELFNBQTNrRCxFQUFxbEQsU0FBcmxELEVBQStsRCxTQUEvbEQsRUFBeW1ELFNBQXptRCxFQUFtbkQsU0FBbm5ELEVBQTZuRCxTQUE3bkQsRUFBdW9ELFNBQXZvRCxFQUFpcEQsU0FBanBELEVBQTJwRCxTQUEzcEQsRUFBcXFELFNBQXJxRCxFQUErcUQsU0FBL3FELEVBQXlyRCxTQUF6ckQsRUFBbXNELFNBQW5zRCxFQUE2c0QsU0FBN3NELEVBQXV0RCxTQUF2dEQsRUFBaXVELFNBQWp1RCxFQUEydUQsU0FBM3VELEVBQXF2RCxTQUFydkQsRUFBK3ZELFNBQS92RCxFQUF5d0QsU0FBendELEVBQW14RCxTQUFueEQsRUFBNnhELFNBQTd4RCxFQUF1eUQsU0FBdnlELEVBQWl6RCxTQUFqekQsRUFBMnpELFNBQTN6RCxFQUFxMEQsU0FBcjBELEVBQSswRCxTQUEvMEQsRUFBeTFELFNBQXoxRCxFQUFtMkQsU0FBbjJELEVBQTYyRCxTQUE3MkQsRUFBdTNELFNBQXYzRCxFQUFpNEQsU0FBajRELEVBQTI0RCxTQUEzNEQsRUFBcTVELFNBQXI1RCxFQUErNUQsU0FBLzVELEVBQXk2RCxTQUF6NkQsRUFBbTdELFNBQW43RCxFQUE2N0QsU0FBNzdELEVBQXU4RCxTQUF2OEQsRUFBaTlELFNBQWo5RCxFQUEyOUQsU0FBMzlELEVBQXErRCxTQUFyK0QsRUFBKytELFNBQS8rRCxFQUF5L0QsU0FBei9ELEVBQW1nRSxTQUFuZ0UsRUFBNmdFLFNBQTdnRSxFQUF1aEUsU0FBdmhFLEVBQWlpRSxTQUFqaUUsRUFBMmlFLFNBQTNpRSxFQUFxakUsU0FBcmpFLEVBQStqRSxTQUEvakUsRUFBeWtFLFNBQXprRSxFQUFtbEUsU0FBbmxFLEVBQTZsRSxTQUE3bEUsRUFBdW1FLFNBQXZtRSxFQUFpbkUsU0FBam5FLEVBQTJuRSxTQUEzbkUsRUFBcW9FLFNBQXJvRSxFQUErb0UsU0FBL29FLEVBQXlwRSxTQUF6cEUsRUFBbXFFLFNBQW5xRSxFQUE2cUUsU0FBN3FFLEVBQXVyRSxTQUF2ckUsRUFBaXNFLFNBQWpzRSxFQUEyc0UsU0FBM3NFLEVBQXF0RSxTQUFydEUsRUFBK3RFLFNBQS90RSxFQUF5dUUsU0FBenVFLEVBQW12RSxTQUFudkUsRUFBNnZFLFNBQTd2RSxFQUF1d0UsU0FBdndFLEVBQWl4RSxTQUFqeEUsRUFBMnhFLFNBQTN4RSxFQUFxeUUsU0FBcnlFLEVBQSt5RSxTQUEveUUsRUFBeXpFLFNBQXp6RSxFQUFtMEUsU0FBbjBFLEVBQTYwRSxTQUE3MEUsRUFBdTFFLFNBQXYxRSxFQUFpMkUsU0FBajJFLEVBQTIyRSxTQUEzMkUsRUFBcTNFLFNBQXIzRSxFQUErM0UsU0FBLzNFLEVBQXk0RSxTQUF6NEUsRUFBbTVFLFNBQW41RSxFQUE2NUUsU0FBNzVFLEVBQXU2RSxTQUF2NkUsRUFBaTdFLFNBQWo3RSxFQUEyN0UsU0FBMzdFLEVBQXE4RSxTQUFyOEUsRUFBKzhFLFNBQS84RSxFQUF5OUUsU0FBejlFLEVBQW0rRSxTQUFuK0UsRUFBNitFLFNBQTcrRSxFQUF1L0UsU0FBdi9FLENBQWQ7QUFDQSxNQUFJQyxTQUFTLEdBQUcsQ0FBQyxTQUFELEVBQVksU0FBWixFQUF1QixTQUF2QixFQUFrQyxTQUFsQyxFQUE2QyxTQUE3QyxFQUF3RCxTQUF4RCxFQUFtRSxTQUFuRSxFQUE4RSxTQUE5RSxDQUFoQjtBQUNBLE1BQUlDLE9BQU8sR0FBRyxDQUFDLFNBQUQsRUFBWSxTQUFaLEVBQXNCLFNBQXRCLEVBQWdDLFNBQWhDLEVBQTBDLFNBQTFDLEVBQXFELFNBQXJELEVBQStELFNBQS9ELEVBQXlFLFNBQXpFLEVBQW1GLFNBQW5GLENBQWQ7QUFDQWpCLE1BQUksQ0FBQ2tCLGFBQUwsR0FBcUI1SixFQUFFLENBQUNoRCxLQUFILENBQVM2TSxNQUFULEdBQ25CQyxNQURtQixDQUNaOUosRUFBRSxDQUFDK0osTUFBSCxDQUFVckIsSUFBSSxDQUFDQyxXQUFmLEVBQTRCLFVBQVNyTSxDQUFULEVBQVk7QUFBQyxXQUFPQSxDQUFDLENBQUMwTixNQUFUO0FBQWlCLEdBQTFELENBRFksRUFFbkJDLEtBRm1CLENBRWIsQ0FBQyxLQUFELEVBQVEsTUFBUixDQUZhLENBQXJCO0FBR0F2QixNQUFJLENBQUN3Qix5QkFBTCxHQUFpQ2xLLEVBQUUsQ0FBQ2hELEtBQUgsQ0FBUzZNLE1BQVQsR0FDL0JDLE1BRCtCLENBQ3hCOUosRUFBRSxDQUFDK0osTUFBSCxDQUFVckIsSUFBSSxDQUFDQyxXQUFmLEVBQTRCLFVBQVNyTSxDQUFULEVBQVk7QUFBQyxXQUFPQSxDQUFDLENBQUM2TixrQ0FBVDtBQUE2QyxHQUF0RixDQUR3QixFQUUvQkYsS0FGK0IsQ0FFekJQLFNBRnlCLENBQWpDLENBbkUwQixDQXVFdkI7O0FBQ0FoQixNQUFJLENBQUMwQixXQUFMLEdBQW1CO0FBQ3JCbEQsUUFBSSxFQUFFLENBRGU7QUFFckJtRCxnQkFBWSxFQUFFLEVBRk87QUFHckJySSxhQUFTLEVBQUUsR0FIVTtBQUlyQnNJLGdCQUFZLEVBQUUsR0FKTztBQUtyQkMsZ0JBQVksRUFBRTtBQUxPLEdBQW5CO0FBUUg3QixNQUFJLENBQUM4QixhQUFMLEdBQXFCLEtBQXJCO0FBRUc5QixNQUFJLENBQUMrQixjQUFMLENBbEZ1QixDQWtGRDs7QUFDekIvQixNQUFJLENBQUNnQyxxQkFBTCxDQW5GMEIsQ0FtRkU7QUFDNUI7O0FBQ0FoQyxNQUFJLENBQUNpQyxxQkFBTCxDQXJGMEIsQ0FxRkU7QUFDekI7QUFDSDs7QUFDQWpDLE1BQUksQ0FBQ2tDLGtCQUFMLEdBQTBCLEdBQTFCO0FBQ0dsQyxNQUFJLENBQUNtQyxhQUFMLENBekZ1QixDQXlGRjs7QUFDckJuQyxNQUFJLENBQUNvQyxvQkFBTCxDQTFGdUIsQ0EwRks7O0FBQzVCcEMsTUFBSSxDQUFDcUMsZUFBTDtBQUNBckMsTUFBSSxDQUFDc0MsUUFBTCxDQTVGdUIsQ0E4RjFCOztBQUNBdEMsTUFBSSxDQUFDb0Msb0JBQUwsR0FBNEJwQyxJQUFJLENBQUMxSyxJQUFMLENBQVV3RCxLQUFWLENBQWdCa0QsTUFBaEIsR0FBdUIsQ0FBbkQsQ0EvRjBCLENBK0Y2QjtBQUV2RDs7QUFDQWdFLE1BQUksQ0FBQ3VDLENBQUwsR0FBUyxDQUFUO0FBQ0F2QyxNQUFJLENBQUN3QyxFQUFMLEdBQVUsQ0FBVixDQW5HMEIsQ0FxRzFCOztBQUVBLFNBQU94QyxJQUFQO0FBRUE7O0FBRUQxTSxXQUFXLENBQUM4SCxTQUFaLENBQXNCcUgsSUFBdEIsR0FBNkIsWUFBVztBQUN2QyxNQUFJekMsSUFBSSxHQUFHLElBQVg7QUFFR0EsTUFBSSxDQUFDYSxJQUFMLEdBQVliLElBQUksQ0FBQzBDLFFBQUwsRUFBWjtBQUNBMUMsTUFBSSxDQUFDYyxLQUFMLEdBQWFkLElBQUksQ0FBQzJDLFNBQUwsRUFBYjs7QUFDSCxNQUFJM0MsSUFBSSxDQUFDek0sUUFBTCxLQUFrQixJQUF0QixFQUE0QjtBQUMzQnlNLFFBQUksQ0FBQ3hNLElBQUwsR0FBWXdNLElBQUksQ0FBQzRDLFFBQUwsRUFBWjtBQUNBLEdBUHNDLENBUXBDOzs7QUFFSDVDLE1BQUksQ0FBQytCLGNBQUwsR0FBc0IsTUFBdEI7QUFFQS9CLE1BQUksQ0FBQzZDLG1CQUFMO0FBRUE3QyxNQUFJLENBQUNLLEdBQUwsR0FBVy9JLEVBQUUsQ0FBQ21ILE1BQUgsQ0FBVSxXQUFWLEVBQXVCZSxNQUF2QixDQUE4QixLQUE5QixFQUNUc0QsSUFEUyxDQUNKLElBREksRUFDRSxVQURGLEVBRVRBLElBRlMsQ0FFSixPQUZJLEVBRUs5QyxJQUFJLENBQUNoTSxlQUFMLENBQXFCQyxLQUYxQixFQUdUNk8sSUFIUyxDQUdKLFFBSEksRUFHTTlDLElBQUksQ0FBQ2hNLGVBQUwsQ0FBcUJFLE1BSDNCLENBQVgsQ0FkdUMsQ0FtQnZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVHOEwsTUFBSSxDQUFDeEwsS0FBTCxHQUFhd0wsSUFBSSxDQUFDSyxHQUFMLENBQVNiLE1BQVQsQ0FBZ0IsR0FBaEIsRUFDRnNELElBREUsQ0FDRyxPQURILEVBQ1ksZ0JBRFosQ0FBYjtBQUVBOUMsTUFBSSxDQUFDTSxJQUFMLEdBQVlOLElBQUksQ0FBQ3hMLEtBQUwsQ0FBV2dMLE1BQVgsQ0FBa0IsT0FBbEIsRUFDS3NELElBREwsQ0FDVSxPQURWLEVBQ21CLE9BRG5CLEVBRUt2TCxTQUZMLENBRWUsT0FGZixDQUFaO0FBR0F5SSxNQUFJLENBQUN4QixJQUFMLEdBQVl3QixJQUFJLENBQUN4TCxLQUFMLENBQVdnTCxNQUFYLENBQWtCLE9BQWxCLEVBQ0tzRCxJQURMLENBQ1UsT0FEVixFQUNtQixPQURuQixFQUVLdkwsU0FGTCxDQUVlLE9BRmYsQ0FBWixDQWhDb0MsQ0FvQ3BDOztBQUNBeUksTUFBSSxDQUFDOUQsT0FBTCxHQUFlNUUsRUFBRSxDQUFDbUgsTUFBSCxDQUFVLE1BQVYsRUFDRWUsTUFERixDQUNTLEtBRFQsRUFFRXNELElBRkYsQ0FFTyxPQUZQLEVBRWdCLGFBRmhCLEVBR0VDLEtBSEYsQ0FHUSxVQUhSLEVBR29CLFVBSHBCLEVBSUVBLEtBSkYsQ0FJUSxPQUpSLEVBSWlCL0MsSUFBSSxDQUFDaE0sZUFBTCxDQUFxQkMsS0FBckIsR0FBNkIsQ0FBN0IsR0FBaUMsSUFKbEQsRUFLRThPLEtBTEYsQ0FLUSxTQUxSLEVBS21CLElBTG5CLEVBTUVBLEtBTkYsQ0FNUSxZQU5SLEVBTXNCLFFBTnRCLENBQWYsQ0FyQ29DLENBNkN2Qzs7QUFDQS9DLE1BQUksQ0FBQzFLLElBQUwsQ0FBVXdELEtBQVYsQ0FBZ0IsQ0FBaEIsRUFBbUJrSyxLQUFuQixHQUEyQixJQUEzQixDQTlDdUMsQ0ErQ3ZDOztBQUNBaEQsTUFBSSxDQUFDMUssSUFBTCxDQUFVd0QsS0FBVixDQUFnQixDQUFoQixFQUFtQnZFLENBQW5CLEdBQXVCeUwsSUFBSSxDQUFDaE0sZUFBTCxDQUFxQkMsS0FBckIsR0FBMkIsQ0FBbEQ7QUFDQStMLE1BQUksQ0FBQzFLLElBQUwsQ0FBVXdELEtBQVYsQ0FBZ0IsQ0FBaEIsRUFBbUIzRSxDQUFuQixHQUF1QjZMLElBQUksQ0FBQ2hNLGVBQUwsQ0FBcUJFLE1BQXJCLEdBQTRCLENBQW5ELENBakR1QyxDQWtEdkM7O0FBQ0E4TCxNQUFJLENBQUMxSyxJQUFMLENBQVV3RCxLQUFWLENBQWdCLENBQWhCLEVBQW1CbUssS0FBbkIsR0FBMkJqRCxJQUFJLENBQUNrQixhQUFMLENBQW1CLENBQW5CLENBQTNCO0FBQ0FsQixNQUFJLENBQUNuSCxPQUFMLEdBQWVtSCxJQUFJLENBQUMxSyxJQUFMLENBQVV3RCxLQUFWLENBQWdCLENBQWhCLENBQWYsQ0FwRHVDLENBc0R2Qzs7QUFDQSxNQUFJb0ssY0FBYyxHQUFHNUwsRUFBRSxDQUFDMEMsR0FBSCxDQUFPZ0csSUFBSSxDQUFDMUssSUFBTCxDQUFVd0QsS0FBakIsRUFBd0IsVUFBU2xGLENBQVQsRUFBWTtBQUFFLFdBQU9BLENBQUMsQ0FBQ3NILEVBQVQ7QUFBYyxHQUFwRCxDQUFyQjtBQUNBOEUsTUFBSSxDQUFDTyxnQkFBTCxHQUF3QmpKLEVBQUUsQ0FBQ2hELEtBQUgsQ0FBUzZNLE1BQVQsR0FDdEJDLE1BRHNCLENBQ2YsQ0FBQyxDQUFELEVBQUk4QixjQUFKLENBRGUsRUFFdEIzQixLQUZzQixDQUVoQixDQUFDLENBQUQsRUFBSSxDQUFKLENBRmdCLENBQXhCO0FBR0F2QixNQUFJLENBQUMxSyxJQUFMLENBQVV3RCxLQUFWLENBQWdCTyxPQUFoQixDQUF3QixVQUFTekYsQ0FBVCxFQUFZO0FBQ25DLFFBQUlBLENBQUMsQ0FBQytLLFFBQUYsS0FBZSxPQUFuQixFQUE0QjtBQUMzQi9LLE9BQUMsQ0FBQ3VQLE1BQUYsR0FBVyxNQUFPbkQsSUFBSSxDQUFDTyxnQkFBTCxDQUFzQjNNLENBQUMsQ0FBQ3NILEVBQXhCLElBQThCLEVBQWhEO0FBQ0EsS0FGRCxNQUVPO0FBQ050SCxPQUFDLENBQUN1UCxNQUFGLEdBQVcsRUFBWDtBQUNBO0FBQ0QsR0FORCxFQTNEdUMsQ0FtRXBDOztBQUNIbkQsTUFBSSxDQUFDYyxLQUFMLENBQVdoSSxLQUFYLENBQWlCa0gsSUFBSSxDQUFDMUssSUFBTCxDQUFVd0QsS0FBM0IsRUFwRXVDLENBc0VwQzs7QUFDQWtILE1BQUksQ0FBQ3hCLElBQUwsR0FBWXdCLElBQUksQ0FBQ3hCLElBQUwsQ0FBVWxKLElBQVYsQ0FBZTBLLElBQUksQ0FBQzFLLElBQUwsQ0FBVXdELEtBQXpCLENBQVosQ0F2RW9DLENBd0VwQzs7QUFDQSxNQUFJc0ssT0FBTyxHQUFHcEQsSUFBSSxDQUFDeEIsSUFBTCxDQUFVNkUsS0FBVixFQUFkO0FBRUFELFNBQU8sR0FBR0EsT0FBTyxDQUFDNUQsTUFBUixDQUFlLFlBQWYsRUFDWjtBQURZLEdBRVhzRCxJQUZXLENBRU4sT0FGTSxFQUVHLE1BRkgsRUFHWjtBQUhZLEdBSVhsTCxPQUpXLENBSUgsWUFKRyxFQUlXLFVBQVNoRSxDQUFULEVBQVk7QUFBRSxXQUFPQSxDQUFDLENBQUNtTCxFQUFGLEtBQVNpQixJQUFJLENBQUNuSCxPQUFMLENBQWFrRyxFQUE3QjtBQUFrQyxHQUozRCxFQUtYK0QsSUFMVyxDQUtOLEdBTE0sRUFLRCxVQUFTbFAsQ0FBVCxFQUFZO0FBQUUsV0FBT0EsQ0FBQyxDQUFDdVAsTUFBVDtBQUFrQixHQUwvQixFQU1OO0FBQ0E7QUFQTSxHQVFMTCxJQVJLLENBUUEsR0FSQSxFQVFLLENBUkwsRUFTTjtBQVRNLEdBVUxBLElBVkssQ0FVQSxHQVZBLEVBVUksSUFWSixFQVdYcEUsSUFYVyxDQVdOLFVBQVM5SyxDQUFULEVBQVk7QUFDakJBLEtBQUMsQ0FBQ21NLFVBQUYsR0FBZUMsSUFBSSxDQUFDMUssSUFBTCxDQUFVc0QsS0FBVixDQUFnQjBLLE9BQWhCLENBQXdCMVAsQ0FBQyxDQUFDa00sUUFBMUIsQ0FBZjs7QUFDQSxRQUFJRSxJQUFJLENBQUMxSyxJQUFMLENBQVV3RCxLQUFWLENBQWdCLENBQWhCLEVBQW1CckQsSUFBbkIsS0FBNEIsMENBQWhDLEVBQTRFO0FBQzNFN0IsT0FBQyxDQUFDcVAsS0FBRixHQUFVakQsSUFBSSxDQUFDMUgsV0FBTCxDQUFpQjFFLENBQUMsQ0FBQzJQLHFCQUFuQixDQUFWO0FBQ0EsS0FGRCxNQUVPO0FBQ04sV0FBSyxJQUFJbEosQ0FBQyxHQUFDLENBQVgsRUFBY0EsQ0FBQyxHQUFDMkYsSUFBSSxDQUFDUSxnQkFBTCxDQUFzQnhFLE1BQXRDLEVBQThDM0IsQ0FBQyxFQUEvQyxFQUFtRDtBQUNsRCxZQUFJbUosVUFBVSxHQUFHeEQsSUFBSSxDQUFDUSxnQkFBTCxDQUFzQm5HLENBQXRCLEVBQXlCMUQsR0FBMUM7O0FBQ0EsWUFBSTZNLFVBQVUsSUFBRTVQLENBQUMsQ0FBQ2tNLFFBQWxCLEVBQTRCO0FBQzNCO0FBQ0EsY0FBSTJELFNBQVMsR0FBR3pELElBQUksQ0FBQ1EsZ0JBQUwsQ0FBc0JuRyxDQUF0QixFQUF5QjRJLEtBQXpDO0FBQ0FyUCxXQUFDLENBQUNxUCxLQUFGLEdBQVVRLFNBQVY7QUFDQTtBQUNEO0FBQ0QsS0FiZ0IsQ0FjakI7QUFDQTtBQUVBO0FBRUE7O0FBQ0EsR0EvQlcsRUFnQ047QUFoQ00sR0FpQ0xYLElBakNLLENBaUNBLE1BakNBLEVBaUNRLFVBQVNsUCxDQUFULEVBQVk7QUFDdEI7QUFDVCxXQUFPQSxDQUFDLENBQUNxUCxLQUFUO0FBQ00sR0FwQ0ssRUFxQ0xGLEtBckNLLENBcUNDLFNBckNELEVBcUNZL0MsSUFBSSxDQUFDMEIsV0FBTCxDQUFpQmxELElBckM3QixDQUFWO0FBdUNBNEUsU0FBTyxDQUFDM08sSUFBUixDQUFhdUwsSUFBSSxDQUFDYyxLQUFMLENBQVc0QyxJQUF4QixFQWxIb0MsQ0FvSHZDO0FBRUc7O0FBQ0gxRCxNQUFJLENBQUNjLEtBQUwsQ0FBVzNILEtBQVgsQ0FBaUI2RyxJQUFJLENBQUMxSyxJQUFMLENBQVU2RCxLQUEzQjtBQUVHNkcsTUFBSSxDQUFDTSxJQUFMLEdBQVlOLElBQUksQ0FBQ00sSUFBTCxDQUFVaEwsSUFBVixDQUFlMEssSUFBSSxDQUFDMUssSUFBTCxDQUFVNkQsS0FBekIsQ0FBWixDQXpIb0MsQ0EwSHBDOztBQUNILE1BQUl3SyxPQUFPLEdBQUczRCxJQUFJLENBQUNNLElBQUwsQ0FDWitDLEtBRFksR0FFWjdELE1BRlksQ0FFTCxVQUZLLEVBR1pzRCxJQUhZLENBR1AsT0FITyxFQUdFLFVBQVNsUCxDQUFULEVBQVk7QUFDMUI7QUFDQTtBQUNBLFFBQUlBLENBQUMsQ0FBQ2dRLE1BQUYsS0FBYSxDQUFqQixFQUFvQjtBQUFFLGFBQU8sNkJBQVA7QUFBdUMsS0FBN0QsTUFDSztBQUFFLGFBQU8sbUNBQVA7QUFBNkM7QUFDcEQsR0FSWSxFQVNiO0FBVGEsR0FVWmQsSUFWWSxDQVVQLEdBVk8sRUFVRixDQVZFLEVBV2I7QUFYYSxHQVlaQyxLQVpZLENBWU4sU0FaTSxFQVlLLFVBQVNuUCxDQUFULEVBQVk7QUFDN0IsUUFBSWlRLE1BQU0sR0FBRzdELElBQUksQ0FBQzBCLFdBQWxCOztBQUNBLFFBQUk5TixDQUFDLENBQUMwRixTQUFOLEVBQWlCO0FBQ2hCLGFBQU91SyxNQUFNLENBQUN2SyxTQUFkO0FBQ0EsS0FGRCxNQUVPO0FBQ04sYUFBT3VLLE1BQU0sQ0FBQ2pDLFlBQWQ7QUFDQSxLQU40QixDQU83QjtBQUNBO0FBQ0E7O0FBQ0EsR0F0QlksQ0FBZDs7QUF3QkEsV0FBU2tDLFVBQVQsR0FBc0I7QUFDckI7QUFFQSxZQUFROUQsSUFBSSxDQUFDSSxhQUFiO0FBQ0MsV0FBS0osSUFBSSxDQUFDRyxvQkFBTCxDQUEwQixDQUExQixDQUFMO0FBQ0M7QUFDQTtBQUNBSCxZQUFJLENBQUNjLEtBQUwsQ0FBV2lELEtBQVgsR0FIRCxDQUlDOztBQUNBLGFBQUssSUFBSTFKLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUMsTUFBbEIsRUFBMEIsRUFBRUEsQ0FBNUIsRUFBK0IyRixJQUFJLENBQUNjLEtBQUwsQ0FBV0QsSUFBWDs7QUFDL0JiLFlBQUksQ0FBQ2MsS0FBTCxDQUFXa0QsSUFBWDtBQUNBWixlQUFPLENBQUMxRSxJQUFSLENBQWEsVUFBUzlLLENBQVQsRUFBWTtBQUFFQSxXQUFDLENBQUNvUCxLQUFGLEdBQVUsSUFBVjtBQUFpQixTQUE1QztBQUNBOztBQUVELFdBQUtoRCxJQUFJLENBQUNHLG9CQUFMLENBQTBCLENBQTFCLENBQUw7QUFDQztBQUNBLFlBQUk4RCxFQUFFLEdBQUdqRSxJQUFJLENBQUNuSCxPQUFMLENBQWF0RSxDQUF0QjtBQUFBLFlBQ08yUCxFQUFFLEdBQUdsRSxJQUFJLENBQUNuSCxPQUFMLENBQWExRSxDQUR6QjtBQUFBLFlBRU87QUFDQWdRLGtCQUFVLEdBQUcsRUFIcEI7QUFJQSxZQUFJQyxRQUFRLEdBQUdwRSxJQUFJLENBQUMxSyxJQUFMLENBQVV3RCxLQUFWLENBQWdCa0QsTUFBL0IsQ0FORCxDQU9DOztBQUNBb0gsZUFBTyxDQUFDMUUsSUFBUixDQUFhLFVBQVM5SyxDQUFULEVBQVl5RyxDQUFaLEVBQWU7QUFDM0IsY0FBSXpHLENBQUMsQ0FBQ3lMLEdBQUYsSUFBUyxDQUFiLEVBQWdCO0FBQ2Z6TCxhQUFDLENBQUNvUCxLQUFGLEdBQVUsSUFBVixDQURlLENBRWY7QUFDQTs7QUFFQSxnQkFBSXFCLE9BQU8sR0FBR3BLLElBQUksQ0FBQ3FLLEdBQUwsQ0FBU2pLLENBQVQsRUFBWSxDQUFaLElBQWlCLEdBQWpCLEdBQXVCOEosVUFBckM7QUFDQSxnQkFBSUksV0FBVyxHQUFHbEssQ0FBQyxJQUFJSixJQUFJLENBQUN1SyxFQUFMLElBQVMsTUFBSSxNQUFJbkssQ0FBakIsQ0FBSixDQUFuQjtBQUNBekcsYUFBQyxDQUFDVyxDQUFGLEdBQU0wUCxFQUFFLEdBQUlJLE9BQU8sR0FBR3BLLElBQUksQ0FBQ3dLLEdBQUwsQ0FBU0YsV0FBVCxDQUF0QjtBQUNBM1EsYUFBQyxDQUFDTyxDQUFGLEdBQU0rUCxFQUFFLEdBQUlHLE9BQU8sR0FBR3BLLElBQUksQ0FBQ3lLLEdBQUwsQ0FBU0gsV0FBVCxDQUF0QixDQVJlLENBU2Y7QUFDQTtBQUNBO0FBRUE7QUFDRCxTQWZEO0FBZ0JBdkUsWUFBSSxDQUFDYyxLQUFMLENBQVdpRCxLQUFYO0FBQ0EvRCxZQUFJLENBQUNjLEtBQUwsQ0FBV0QsSUFBWDtBQUNBYixZQUFJLENBQUNjLEtBQUwsQ0FBV2tELElBQVg7QUFDQTs7QUFFRCxXQUFLaEUsSUFBSSxDQUFDRyxvQkFBTCxDQUEwQixDQUExQixDQUFMO0FBQ0M7QUFDQTtBQUNBO0FBQ0EsaUJBQVN3RSxZQUFULENBQXNCQyxLQUF0QixFQUE2QkMsU0FBN0IsRUFBd0NDLE9BQXhDLEVBQWlEO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBSUMsUUFBUSxHQUFHOUssSUFBSSxDQUFDdUssRUFBTCxHQUFVdkssSUFBSSxDQUFDdUssRUFBOUI7O0FBQ0EsaUJBQU8sSUFBUCxFQUFhO0FBQ1osZ0JBQUk1USxDQUFDLEdBQUdvUixnQkFBZ0IsQ0FBQ0osS0FBRCxFQUFRRyxRQUFSLENBQWhCLEdBQW9DRixTQUE1Qzs7QUFDQSxnQkFBSTVLLElBQUksQ0FBQ2dMLEdBQUwsQ0FBU3JSLENBQVQsS0FBZWtSLE9BQW5CLEVBQTRCO0FBQzNCLHFCQUFPQyxRQUFQO0FBQ0E7O0FBQ0QsZ0JBQUlHLEVBQUUsR0FBR04sS0FBSyxHQUFHM0ssSUFBSSxDQUFDa0wsSUFBTCxDQUFVSixRQUFRLEdBQUdBLFFBQVgsR0FBc0IsQ0FBaEMsQ0FBakI7QUFDQUEsb0JBQVEsR0FBR0EsUUFBUSxHQUFJblIsQ0FBQyxHQUFHc1IsRUFBM0I7QUFDQTtBQUNEOztBQUNELGlCQUFTRixnQkFBVCxDQUEwQkosS0FBMUIsRUFBaUNHLFFBQWpDLEVBQTJDO0FBQzFDLGNBQUlLLENBQUMsR0FBR25MLElBQUksQ0FBQ2tMLElBQUwsQ0FBVSxJQUFJSixRQUFRLEdBQUdBLFFBQXpCLENBQVI7QUFDQSxjQUFJTSxDQUFDLEdBQUdwTCxJQUFJLENBQUM1RixHQUFMLENBQVMwUSxRQUFRLEdBQUdLLENBQXBCLENBQVI7QUFDQSxpQkFBTyxNQUFNUixLQUFOLElBQWVHLFFBQVEsR0FBR0ssQ0FBWCxHQUFlQyxDQUE5QixDQUFQO0FBQ0E7O0FBQ0QsaUJBQVNDLFlBQVQsQ0FBc0JWLEtBQXRCLEVBQTZCRyxRQUE3QixFQUF1QztBQUN0QyxjQUFJUSxRQUFRLEdBQUdSLFFBQVEsR0FBR0gsS0FBMUI7QUFDQSxjQUFJclEsQ0FBQyxHQUFHMEYsSUFBSSxDQUFDeUssR0FBTCxDQUFTSyxRQUFULElBQXFCUSxRQUE3QjtBQUNBLGNBQUlwUixDQUFDLEdBQUc4RixJQUFJLENBQUN3SyxHQUFMLENBQVNNLFFBQVQsSUFBcUJRLFFBQTdCO0FBQ0EsaUJBQU8sQ0FBQ2hSLENBQUQsRUFBSUosQ0FBSixDQUFQO0FBQ0E7O0FBQ0QsaUJBQVNxUixTQUFULENBQW1CcEIsUUFBbkIsRUFBNkJRLEtBQTdCLEVBQW9DO0FBQ25DLGNBQUlhLGdCQUFnQixHQUFHLENBQXZCO0FBQ0EsY0FBSVgsT0FBTyxHQUFHLE1BQWQ7QUFDQSxjQUFJWSxjQUFjLEdBQUcsR0FBckI7QUFDQSxjQUFJQyxnQkFBZ0IsR0FBRyxHQUF2QjtBQUNBLGNBQUlDLE1BQU0sR0FBRyxFQUFiOztBQUNBLGVBQUssSUFBSXZMLENBQUMsR0FBRyxDQUFSLEVBQVcwQixHQUFHLEdBQUdxSSxRQUF0QixFQUFnQy9KLENBQUMsR0FBRzBCLEdBQXBDLEVBQXlDMUIsQ0FBQyxFQUExQyxFQUE4QztBQUM3QyxnQkFBSTBLLFFBQVEsR0FBR0osWUFBWSxDQUFDQyxLQUFELEVBQVFjLGNBQVIsRUFBd0JaLE9BQXhCLENBQTNCO0FBQ0FjLGtCQUFNLENBQUNqTyxJQUFQLENBQVlvTixRQUFaO0FBQ0FXLDBCQUFjLEdBQUdBLGNBQWMsR0FBR0QsZ0JBQWxDO0FBQ0FFLDRCQUFnQixHQUFHWixRQUFuQjs7QUFDQSxnQkFBSTFLLENBQUMsR0FBQyxFQUFOLEVBQVU7QUFBRW9MLDhCQUFnQixHQUFHLEVBQW5CO0FBQXVCOztBQUNuQyxnQkFBSXBMLENBQUMsR0FBQyxFQUFOLEVBQVU7QUFBRW9MLDhCQUFnQixHQUFHLEVBQW5CO0FBQXVCO0FBQ25DOztBQUNELGlCQUFPRyxNQUFQO0FBQ0E7O0FBQ0QsWUFBSXhCLFFBQVEsR0FBR3BFLElBQUksQ0FBQzFLLElBQUwsQ0FBVXdELEtBQVYsQ0FBZ0JrRCxNQUEvQjtBQUNBLFlBQUk0SixNQUFNLEdBQUdKLFNBQVMsQ0FBQ3BCLFFBQUQsRUFBVyxDQUFYLENBQXRCLENBL0NELENBZ0RDOztBQUNBLFlBQUlILEVBQUUsR0FBR2pFLElBQUksQ0FBQ25ILE9BQUwsQ0FBYXRFLENBQXRCO0FBQUEsWUFDTzJQLEVBQUUsR0FBR2xFLElBQUksQ0FBQ25ILE9BQUwsQ0FBYTFFLENBRHpCO0FBQUEsWUFFTztBQUNBZ1Esa0JBQVUsR0FBRyxFQUhwQjtBQUlBLFlBQUlDLFFBQVEsR0FBR3BFLElBQUksQ0FBQzFLLElBQUwsQ0FBVXdELEtBQVYsQ0FBZ0JrRCxNQUEvQjtBQUNBNUgsZUFBTyxDQUFDQyxHQUFSLENBQVkrUCxRQUFaO0FBQ0FoQixlQUFPLENBQUMxRSxJQUFSLENBQWEsVUFBUzlLLENBQVQsRUFBWXlHLENBQVosRUFBZTtBQUMzQixjQUFJekcsQ0FBQyxDQUFDeUwsR0FBRixJQUFTLENBQWIsRUFBZ0I7QUFDZnpMLGFBQUMsQ0FBQ29QLEtBQUYsR0FBVSxJQUFWO0FBQ0EsZ0JBQUlxQixPQUFPLEdBQUdoSyxDQUFDLEdBQUcsQ0FBSixHQUFROEosVUFBdEI7QUFDQSxnQkFBSUksV0FBVyxHQUFHbEssQ0FBQyxJQUFJSixJQUFJLENBQUN1SyxFQUFMLElBQVMsTUFBSSxLQUFHbkssQ0FBaEIsQ0FBSixDQUFuQixDQUhlLENBS2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsZ0JBQUl3TCxRQUFRLEdBQUd2TyxFQUFFLENBQUNoRCxLQUFILENBQVNnUSxHQUFULEdBQWV3QixRQUFmLENBQXdCLEVBQXhCLEVBQTRCMUUsTUFBNUIsQ0FBbUMsQ0FBQyxDQUFELEVBQUdnRCxRQUFILENBQW5DLEVBQWlEN0MsS0FBakQsQ0FBdUQsQ0FBQyxDQUFELEVBQUcsRUFBSCxDQUF2RCxDQUFmO0FBQ0EsZ0JBQUlzRSxRQUFRLEdBQUd2TyxFQUFFLENBQUNoRCxLQUFILENBQVM2TSxNQUFULEdBQWtCQyxNQUFsQixDQUF5QixDQUFDLENBQUQsRUFBR25ILElBQUksQ0FBQ3FLLEdBQUwsQ0FBU0YsUUFBVCxFQUFtQixFQUFuQixDQUFILENBQXpCLEVBQXFEN0MsS0FBckQsQ0FBMkQsQ0FBQyxDQUFELEVBQUcsRUFBSCxDQUEzRCxDQUFmO0FBQ0EsZ0JBQUlzRSxRQUFRLEdBQUd2TyxFQUFFLENBQUNoRCxLQUFILENBQVNELEdBQVQsR0FBZStNLE1BQWYsQ0FBc0IsQ0FBQyxHQUFELEVBQU1nRCxRQUFRLEdBQUMsR0FBZixDQUF0QixFQUEyQzdDLEtBQTNDLENBQWlELENBQUMsQ0FBRCxFQUFHLEVBQUgsQ0FBakQsQ0FBZixDQWRlLENBZWY7QUFDQTs7QUFDQSxnQkFBSXdFLElBQUksR0FBRzlMLElBQUksQ0FBQ3FLLEdBQUwsQ0FBU2pLLENBQUMsR0FBQyxDQUFYLEVBQWMsRUFBZCxDQUFYO0FBQ0EsZ0JBQUkwTCxJQUFJLEdBQUkxTCxDQUFELEdBQUksR0FBZjtBQUNBLGdCQUFJMkwsT0FBTyxHQUFHSCxRQUFRLENBQUNFLElBQUQsQ0FBdEIsQ0FuQmUsQ0FvQmY7O0FBQ0EsZ0JBQUkzSCxDQUFDLEdBQUcsQ0FBUjtBQUNBLGdCQUFJNEgsT0FBTyxHQUFHSixNQUFNLENBQUN2TCxDQUFELENBQXBCO0FBQ0F6RyxhQUFDLENBQUNXLENBQUYsR0FBTTBQLEVBQUUsR0FBRyxDQUFDRSxVQUFVLEdBQUcvRixDQUFDLEdBQUc0SCxPQUFsQixJQUE2Qi9MLElBQUksQ0FBQ3dLLEdBQUwsQ0FBU3VCLE9BQVQsQ0FBeEM7QUFDQXBTLGFBQUMsQ0FBQ08sQ0FBRixHQUFNK1AsRUFBRSxHQUFHLENBQUNDLFVBQVUsR0FBRy9GLENBQUMsR0FBRzRILE9BQWxCLElBQTZCL0wsSUFBSSxDQUFDeUssR0FBTCxDQUFTc0IsT0FBVCxDQUF4QztBQUVBO0FBQ0QsU0E1QkQ7QUE2QkFoRyxZQUFJLENBQUNjLEtBQUwsQ0FBV2lELEtBQVg7QUFDQS9ELFlBQUksQ0FBQ2MsS0FBTCxDQUFXRCxJQUFYO0FBQ0FiLFlBQUksQ0FBQ2MsS0FBTCxDQUFXa0QsSUFBWDtBQUNBO0FBL0hGO0FBaUlBOztBQUNFRixZQUFVO0FBRWI5RCxNQUFJLENBQUNpRyxVQUFMO0FBQ0FqRyxNQUFJLENBQUNrRyxjQUFMO0FBQ0FsRyxNQUFJLENBQUNtRyxpQkFBTDtBQUVHbkcsTUFBSSxDQUFDVSxlQUFMLEdBQXVCVixJQUFJLENBQUNLLEdBQUwsQ0FBU2IsTUFBVCxDQUFnQixVQUFoQixFQUNOc0QsSUFETSxDQUNELEdBREMsRUFDSTlDLElBQUksQ0FBQ2hNLGVBQUwsQ0FBcUJDLEtBQXJCLEdBQTZCLENBQTdCLEdBQStCLENBRG5DLEVBRU42TyxJQUZNLENBRUQsR0FGQyxFQUVJOUMsSUFBSSxDQUFDaE0sZUFBTCxDQUFxQkUsTUFBckIsR0FBOEIsRUFBOUIsR0FBaUMsRUFGckMsRUFHTjRPLElBSE0sQ0FHRCxJQUhDLEVBR0ssT0FITCxFQUlOQSxJQUpNLENBSUQsV0FKQyxFQUlZLE1BSlosRUFLTkEsSUFMTSxDQUtELGFBTEMsRUFLYyxLQUxkLEVBTU5DLEtBTk0sQ0FNQSxnQkFOQSxFQU1rQixNQU5sQixFQU9OQSxLQVBNLENBT0EsU0FQQSxFQU9XLElBUFgsRUFRckJELElBUnFCLENBUWhCLElBUmdCLEVBUVYsMkJBUlUsRUFTckJyRCxJQVRxQixDQVNoQk8sSUFBSSxDQUFDMUssSUFBTCxDQUFVc0QsS0FBVixDQUFnQnVCLFNBQWhCLENBQTBCLENBQTFCLENBVGdCLENBQXZCO0FBV0g2RixNQUFJLENBQUNvRyxhQUFMO0FBRUEsQ0EzU0Q7O0FBNlNBOVMsV0FBVyxDQUFDOEgsU0FBWixDQUFzQndILFFBQXRCLEdBQWlDLFlBQVk7QUFDNUMsTUFBSTVDLElBQUksR0FBRyxJQUFYO0FBQ0EsU0FBTzFJLEVBQUUsQ0FBQytPLFFBQUgsQ0FBWTdTLElBQVosR0FDTG9CLE1BREssQ0FDRSxDQUFDb0wsSUFBSSxDQUFDaE0sZUFBTCxDQUFxQkMsS0FBckIsR0FBMkIsQ0FBNUIsRUFBK0IrTCxJQUFJLENBQUNoTSxlQUFMLENBQXFCRSxNQUFyQixHQUE0QixDQUEzRCxDQURGLEVBRUxvUyxXQUZLLENBRU8sQ0FBQyxHQUFELEVBQU0sRUFBTixDQUZQLEVBR0xqVCxFQUhLLENBR0YsTUFIRSxFQUdNLFlBQVc7QUFDdEIyTSxRQUFJLENBQUN4TCxLQUFMLENBQVdzTyxJQUFYLENBQ0MsV0FERCxFQUVDLGVBQWV4TCxFQUFFLENBQUM1QyxLQUFILENBQVNoQixTQUF4QixHQUFvQyxHQUFwQyxHQUNDLFFBREQsR0FDWTRELEVBQUUsQ0FBQzVDLEtBQUgsQ0FBU0osS0FEckIsR0FDNkIsR0FIOUI7QUFLQSxHQVRLLENBQVA7QUFVQSxDQVpEOztBQWNBaEIsV0FBVyxDQUFDOEgsU0FBWixDQUFzQnNILFFBQXRCLEdBQWlDLFlBQVk7QUFDekMsTUFBSTFDLElBQUksR0FBRyxJQUFYLENBRHlDLENBRXpDOztBQUNBLFdBQVN1RyxFQUFULENBQVkzUyxDQUFaLEVBQWU7QUFBRSxXQUFPQSxDQUFDLENBQUNpRSxNQUFGLENBQVN0RCxDQUFoQjtBQUFvQjs7QUFDckMsV0FBU2lTLEVBQVQsQ0FBWTVTLENBQVosRUFBZTtBQUFFLFdBQU9BLENBQUMsQ0FBQ2lFLE1BQUYsQ0FBUzFELENBQWhCO0FBQW9COztBQUNyQyxXQUFTc1MsRUFBVCxDQUFZN1MsQ0FBWixFQUFlO0FBQUUsV0FBT0EsQ0FBQyxDQUFDZ1EsTUFBRixDQUFTclAsQ0FBaEI7QUFBb0I7O0FBQ3JDLFdBQVNtUyxFQUFULENBQVk5UyxDQUFaLEVBQWU7QUFBRSxXQUFPQSxDQUFDLENBQUNnUSxNQUFGLENBQVN6UCxDQUFoQjtBQUFvQixHQU5JLENBT3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBLFdBQVN3UyxTQUFULENBQW1CL1MsQ0FBbkIsRUFBc0I7QUFDeEI7QUFDQSxRQUFJb00sSUFBSSxDQUFDek0sUUFBTCxLQUFrQixLQUF0QixFQUE2QjtBQUM1QkssT0FBQyxDQUFDVyxDQUFGLEdBQU0wRixJQUFJLENBQUNELEdBQUwsQ0FBUyxHQUFULEVBQWNDLElBQUksQ0FBQ04sR0FBTCxDQUFTcUcsSUFBSSxDQUFDaE0sZUFBTCxDQUFxQkMsS0FBckIsR0FBNkIsR0FBdEMsRUFBMkNMLENBQUMsQ0FBQ1csQ0FBN0MsQ0FBZCxDQUFOO0FBQ0FYLE9BQUMsQ0FBQ08sQ0FBRixHQUFNOEYsSUFBSSxDQUFDRCxHQUFMLENBQVMsR0FBVCxFQUFjQyxJQUFJLENBQUNOLEdBQUwsQ0FBU3FHLElBQUksQ0FBQ2hNLGVBQUwsQ0FBcUJFLE1BQXJCLEdBQThCLEdBQXZDLEVBQTRDTixDQUFDLENBQUNPLENBQTlDLENBQWQsQ0FBTjtBQUNBOztBQUNLLFdBQU8sZUFBZVAsQ0FBQyxDQUFDVyxDQUFqQixHQUFxQixHQUFyQixHQUEyQlgsQ0FBQyxDQUFDTyxDQUE3QixHQUFpQyxHQUF4QztBQUNIOztBQUNELFNBQU8sWUFBWTtBQUNmNkwsUUFBSSxDQUFDTSxJQUFMLENBQ0t3QyxJQURMLENBQ1UsSUFEVixFQUNnQnlELEVBRGhCLEVBRUt6RCxJQUZMLENBRVUsSUFGVixFQUVnQjBELEVBRmhCLEVBR0sxRCxJQUhMLENBR1UsSUFIVixFQUdnQjJELEVBSGhCLEVBSUszRCxJQUpMLENBSVUsSUFKVixFQUlnQjRELEVBSmhCO0FBS0ExRyxRQUFJLENBQUN4QixJQUFMLENBQ0tzRSxJQURMLENBQ1UsV0FEVixFQUN1QjZELFNBRHZCO0FBRUgsR0FSRDtBQVNILENBN0JEOztBQStCQXJULFdBQVcsQ0FBQzhILFNBQVosQ0FBc0J1SCxTQUF0QixHQUFrQyxZQUFZO0FBQzFDLE1BQUkzQyxJQUFJLEdBQUcsSUFBWDtBQUNBLFNBQU8xSSxFQUFFLENBQUNzUCxNQUFILENBQVU5RixLQUFWLEdBQ0YrRixJQURFLENBQ0csQ0FBQzdHLElBQUksQ0FBQ2hNLGVBQUwsQ0FBcUJDLEtBQXRCLEVBQTZCK0wsSUFBSSxDQUFDaE0sZUFBTCxDQUFxQkUsTUFBbEQsQ0FESCxFQUVGNFMsWUFGRSxDQUVXLEdBRlgsRUFHSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRHLEdBVUZ6VCxFQVZFLENBVUMsTUFWRCxFQVVTLEtBQUt3TixJQVZkLENBQVA7QUFXSCxDQWJEOztBQWVBdk4sV0FBVyxDQUFDOEgsU0FBWixDQUFzQjJMLG9CQUF0QixHQUE2QyxVQUFTQyxPQUFULEVBQWtCO0FBQzlELE1BQUloSCxJQUFJLEdBQUcsSUFBWDtBQUVBQSxNQUFJLENBQUMxSCxXQUFMLEdBQW1CME8sT0FBTyxDQUFDMU8sV0FBM0I7QUFFQTBILE1BQUksQ0FBQ2hNLGVBQUwsR0FBdUJnVCxPQUFPLENBQUNqUCxVQUEvQjtBQUVBaUksTUFBSSxDQUFDZ0MscUJBQUwsR0FBNkJnRixPQUFPLENBQUNoRixxQkFBckM7QUFFQTVOLFNBQU8sQ0FBQ0MsR0FBUixDQUFZMlMsT0FBWjtBQUVBLENBWEQsQyxDQWFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBMVQsV0FBVyxDQUFDOEgsU0FBWixDQUFzQjZMLHlCQUF0QixHQUFrRCxZQUFXO0FBQzVELE1BQUlqSCxJQUFJLEdBQUcsSUFBWDtBQUVBLE1BQUlrSCxPQUFPLEdBQUdsSCxJQUFJLENBQUMxSyxJQUFMLENBQVVzRCxLQUFWLENBQWdCMEssT0FBOUIsQ0FINEQsQ0FJNUQ7QUFDQTs7QUFDQWxQLFNBQU8sQ0FBQ0MsR0FBUixDQUFZNlMsT0FBWjtBQUVBLE1BQUlDLFVBQVUsR0FBR25ILElBQUksQ0FBQzFILFdBQUwsQ0FBaUIwRCxNQUFsQyxDQVI0RCxDQVU1RDs7QUFDQWdFLE1BQUksQ0FBQ1EsZ0JBQUwsR0FBd0JsSixFQUFFLENBQUM4UCxJQUFILEdBQ3RCelEsR0FEc0IsQ0FDbEIsVUFBUy9DLENBQVQsRUFBWTtBQUFFLFdBQU9BLENBQUMsQ0FBQ2tNLFFBQVQ7QUFBb0IsR0FEaEIsRUFFdkI7QUFDQTtBQUh1QixHQUl0QnVILE1BSnNCLENBSWYsVUFBU0MsTUFBVCxFQUFpQjtBQUFFLFdBQU9BLE1BQU0sQ0FBQ3RMLE1BQWQ7QUFBdUIsR0FKM0IsRUFLdEJ1TCxPQUxzQixDQUtkdkgsSUFBSSxDQUFDQyxXQUxTLENBQXhCLENBWDRELENBaUI1RDtBQUNBOztBQUNBLE9BQUssSUFBSTVGLENBQUMsR0FBQyxDQUFYLEVBQWNBLENBQUMsR0FBQzJGLElBQUksQ0FBQ1EsZ0JBQUwsQ0FBc0J4RSxNQUF0QyxFQUE4QzNCLENBQUMsRUFBL0MsRUFBbUQ7QUFDbEQ7QUFDQSxRQUFJMUQsR0FBRyxHQUFHcUosSUFBSSxDQUFDUSxnQkFBTCxDQUFzQm5HLENBQXRCLEVBQXlCMUQsR0FBbkM7QUFDQXFKLFFBQUksQ0FBQ1EsZ0JBQUwsQ0FBc0JuRyxDQUF0QixFQUF5QnlGLFFBQXpCLEdBQW9DbkosR0FBcEM7O0FBQ0EsUUFBSTBELENBQUMsR0FBQzhNLFVBQVUsR0FBQyxDQUFqQixFQUFvQjtBQUNuQm5ILFVBQUksQ0FBQ1EsZ0JBQUwsQ0FBc0JuRyxDQUF0QixFQUF5QjBGLFVBQXpCLEdBQXNDbUgsT0FBTyxDQUFDdlEsR0FBRCxDQUE3QztBQUNBcUosVUFBSSxDQUFDUSxnQkFBTCxDQUFzQm5HLENBQXRCLEVBQXlCNEksS0FBekIsR0FBaUNqRCxJQUFJLENBQUMxSCxXQUFMLENBQWlCK0IsQ0FBakIsQ0FBakM7QUFDQSxLQUhELE1BR087QUFDTjJGLFVBQUksQ0FBQ1EsZ0JBQUwsQ0FBc0JuRyxDQUF0QixFQUF5QjBGLFVBQXpCLEdBQXNDLE9BQXRDO0FBQ0FDLFVBQUksQ0FBQ1EsZ0JBQUwsQ0FBc0JuRyxDQUF0QixFQUF5QjRJLEtBQXpCLEdBQWlDakQsSUFBSSxDQUFDMUgsV0FBTCxDQUFpQjZPLFVBQVUsR0FBQyxDQUE1QixDQUFqQztBQUNBLEtBVmlELENBV2xEO0FBQ0E7O0FBQ0E7O0FBQ0QvUyxTQUFPLENBQUNDLEdBQVIsQ0FBWTJMLElBQUksQ0FBQ1EsZ0JBQWpCO0FBQ0EsQ0FsQ0Q7O0FBb0NBbE4sV0FBVyxDQUFDOEgsU0FBWixDQUFzQm9NLHdCQUF0QixHQUFpRCxZQUFXO0FBQzNEO0FBQ0E7QUFFQSxNQUFJeEgsSUFBSSxHQUFHLElBQVg7QUFFQSxNQUFJbUgsVUFBVSxHQUFHbkgsSUFBSSxDQUFDMUgsV0FBTCxDQUFpQjBELE1BQWxDO0FBRUEsTUFBSWtMLE9BQU8sR0FBR2xILElBQUksQ0FBQzFLLElBQUwsQ0FBVXNELEtBQVYsQ0FBZ0I2Tyx1QkFBOUI7QUFDQXpILE1BQUksQ0FBQ1EsZ0JBQUwsR0FBd0IsRUFBeEIsQ0FUMkQsQ0FVM0Q7O0FBQ0EsT0FBSyxJQUFJbkcsQ0FBQyxHQUFDLENBQVgsRUFBY0EsQ0FBQyxHQUFDOE0sVUFBaEIsRUFBNEI5TSxDQUFDLEVBQTdCLEVBQWlDO0FBQ2hDMkYsUUFBSSxDQUFDUSxnQkFBTCxDQUFzQjdJLElBQXRCLENBQTJCLEVBQTNCO0FBQ0FxSSxRQUFJLENBQUNRLGdCQUFMLENBQXNCbkcsQ0FBdEIsRUFBeUJ5RixRQUF6QixHQUFvQ3pGLENBQXBDO0FBQ0EyRixRQUFJLENBQUNRLGdCQUFMLENBQXNCbkcsQ0FBdEIsRUFBeUIwRixVQUF6QixHQUFzQ21ILE9BQU8sQ0FBQzdNLENBQUQsQ0FBN0M7QUFDQTJGLFFBQUksQ0FBQ1EsZ0JBQUwsQ0FBc0JuRyxDQUF0QixFQUF5QjRJLEtBQXpCLEdBQWlDakQsSUFBSSxDQUFDMUgsV0FBTCxDQUFpQitCLENBQWpCLENBQWpDO0FBQ0E7O0FBQ0RqRyxTQUFPLENBQUNDLEdBQVIsQ0FBWTJMLElBQUksQ0FBQ1EsZ0JBQWpCO0FBQ0EsQ0FsQkQ7O0FBb0JBbE4sV0FBVyxDQUFDOEgsU0FBWixDQUFzQnlILG1CQUF0QixHQUE0QyxZQUFXO0FBQ3RELE1BQUk3QyxJQUFJLEdBQUcsSUFBWDtBQUNBLE1BQUlrSCxPQUFPLEdBQUdsSCxJQUFJLENBQUMxSyxJQUFMLENBQVVzRCxLQUFWLENBQWdCNk8sdUJBQTlCOztBQUNBLE1BQUksT0FBT1AsT0FBUCxLQUFtQixXQUF2QixFQUFvQztBQUNuQ2xILFFBQUksQ0FBQ2lILHlCQUFMO0FBQ0EsR0FGRCxNQUVPO0FBQ05qSCxRQUFJLENBQUN3SCx3QkFBTDtBQUNBO0FBQ0QsQ0FSRDs7QUFVQWxVLFdBQVcsQ0FBQzhILFNBQVosQ0FBc0I2SyxVQUF0QixHQUFtQyxZQUFXO0FBQzdDLE1BQUlqRyxJQUFJLEdBQUcsSUFBWDtBQUVBLE1BQUkwSCxzQkFBc0IsR0FBRyxDQUM1QixvQ0FENEIsRUFFNUIsZ0NBRjRCLEVBRzVCLHVCQUg0QixFQUk1QiwwQkFKNEIsRUFLNUIsNEJBTDRCLEVBTTVCLHdCQU40QixFQU81Qix1QkFQNEIsRUFRNUIscUJBUjRCLENBQTdCO0FBV0EsTUFBSUMsVUFBVSxHQUFHM0gsSUFBSSxDQUFDaE0sZUFBTCxDQUFxQkMsS0FBckIsR0FBNkIsRUFBOUM7QUFDRyxNQUFJMlQsT0FBTyxHQUFHRCxVQUFVLEdBQUcsQ0FBM0I7QUFDQSxNQUFJRSxjQUFjLEdBQUdGLFVBQVUsR0FBR0MsT0FBbEM7QUFFQTVILE1BQUksQ0FBQ1MsTUFBTCxHQUFjVCxJQUFJLENBQUNLLEdBQUwsQ0FBU2IsTUFBVCxDQUFnQixHQUFoQixFQUNUc0QsSUFEUyxDQUNKLE9BREksRUFDSyxRQURMLEVBRVRBLElBRlMsQ0FFSixXQUZJLEVBRVMsZUFBYThFLE9BQWIsR0FBcUIsR0FBckIsR0FBeUJBLE9BQXpCLEdBQWlDLEdBRjFDLENBQWQsQ0FsQjBDLENBcUJ0Qzs7QUFDUCxNQUFJRSxnQkFBZ0IsR0FBR0gsVUFBdkI7QUFDQTNILE1BQUksQ0FBQ1MsTUFBTCxDQUFZakIsTUFBWixDQUFtQixVQUFuQixFQUNRc0QsSUFEUixDQUNhLFdBRGIsRUFDMEIsa0JBQWtCZ0YsZ0JBQWxCLEdBQXFDLEdBRC9ELEVBRUVoRixJQUZGLENBRU8sT0FGUCxFQUVnQix5QkFGaEIsRUFHRXJELElBSEYsQ0FHTyxjQUhQO0FBS0csTUFBSUksVUFBVSxHQUFHRyxJQUFJLENBQUNTLE1BQUwsQ0FBWWxKLFNBQVosQ0FBc0IsR0FBdEIsRUFDWmpDLElBRFksQ0FDUDBLLElBQUksQ0FBQ1EsZ0JBREUsRUFFWjZDLEtBRlksR0FHWjdELE1BSFksQ0FHTCxHQUhLLEVBSVpzRCxJQUpZLENBSVAsT0FKTyxFQUlFLFlBSkYsRUFLbkI7QUFDQTtBQUNBO0FBQ0E7QUFSbUIsR0FTWkEsSUFUWSxDQVNQLElBVE8sRUFTRCxVQUFTbFAsQ0FBVCxFQUFZO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLFdBQU8saUJBQWlCQSxDQUFDLENBQUNrTSxRQUExQjtBQUFxQyxHQWI1QixFQWNsQnpNLEVBZGtCLENBY2YsV0FkZSxFQWNGLFVBQVNPLENBQVQsRUFBWTtBQUM1QjBELE1BQUUsQ0FBQ0MsU0FBSCxDQUFhLE9BQWIsRUFDRUMsTUFERixDQUNTLFVBQVNvRCxFQUFULEVBQWE7QUFDcEIsYUFBT2hILENBQUMsQ0FBQ3FQLEtBQUYsSUFBU3JJLEVBQUUsQ0FBQ3FJLEtBQW5CO0FBQ0EsS0FIRixFQUlFckwsT0FKRixDQUlVLGFBSlYsRUFJeUIsSUFKekI7QUFNQSxHQXJCa0IsRUFzQmxCdkUsRUF0QmtCLENBc0JmLFVBdEJlLEVBc0JILFVBQVNPLENBQVQsRUFBWTtBQUMzQjBELE1BQUUsQ0FBQ0MsU0FBSCxDQUFhLE9BQWIsRUFBc0JLLE9BQXRCLENBQThCLGFBQTlCLEVBQTZDLEtBQTdDO0FBQ0EsR0F4QmtCLEVBeUJsQmtMLElBekJrQixDQXlCYixTQXpCYSxFQXlCRixVQUFTbFAsQ0FBVCxFQUFZeUcsQ0FBWixFQUFlO0FBQzlCO0FBQ0EsUUFBSUEsQ0FBQyxHQUFDMkYsSUFBSSxDQUFDMUgsV0FBTCxDQUFpQjBELE1BQXZCLEVBQStCO0FBQzlCLGFBQU8sRUFBUDtBQUNBLEtBRkQsTUFFTztBQUNOLGFBQU8sTUFBUDtBQUNBO0FBQ0QsR0FoQ2lCLENBQWpCLENBNUIwQyxDQTZEdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0o7QUFDQTtBQUNBOztBQUVBNkQsWUFBVSxDQUFDTCxNQUFYLENBQWtCLFVBQWxCLEVBQ0tzRCxJQURMLENBQ1UsT0FEVixFQUNtQjZFLFVBRG5CLEVBRUs3RSxJQUZMLENBRVUsUUFGVixFQUVvQjZFLFVBRnBCLEVBR0s3RSxJQUhMLENBR1UsV0FIVixFQUd1QixVQUFTbFAsQ0FBVCxFQUFZeUcsQ0FBWixFQUFlO0FBQzlCO0FBQ0EsV0FBTyxrQkFBa0J5TixnQkFBZ0IsR0FBR0YsT0FBbkIsR0FBNkJDLGNBQWMsR0FBR3hOLENBQWhFLElBQXFFLEdBQTVFO0FBQ0gsR0FOTCxFQU9LeUksSUFQTCxDQU9VLE1BUFYsRUFPa0IsVUFBU2xQLENBQVQsRUFBWTtBQUN0QixXQUFPQSxDQUFDLENBQUNxUCxLQUFUO0FBQWlCLEdBUnpCO0FBU0FqRCxNQUFJLENBQUMrSCxVQUFMLEdBQWtCbEksVUFBVSxDQUFDTCxNQUFYLENBQWtCLFVBQWxCLEVBQ2JzRCxJQURhLENBQ1IsV0FEUSxFQUNLLFVBQVNsUCxDQUFULEVBQVl5RyxDQUFaLEVBQWU7QUFDMUIsV0FBTyxlQUFnQndOLGNBQWhCLEdBQWtDLEdBQWxDLElBQXlDQyxnQkFBZ0IsR0FBR0YsT0FBbkIsR0FBNkJDLGNBQWMsR0FBR3hOLENBQXZGLElBQTRGLEdBQW5HO0FBQ1AsR0FIYSxFQUlieUksSUFKYSxDQUlSLElBSlEsRUFJRixLQUpFLEVBS2JyRCxJQUxhLENBS1IsVUFBUzdMLENBQVQsRUFBWXlHLENBQVosRUFBZTtBQUNiO0FBQ0E7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ1k7QUFDWjtBQUNZO0FBQ1o7QUFFQSxRQUFJMkYsSUFBSSxDQUFDMUssSUFBTCxDQUFVd0QsS0FBVixDQUFnQixDQUFoQixFQUFtQnJELElBQW5CLEtBQTRCLDBDQUFoQyxFQUE0RTtBQUMzRSxhQUFPLE1BQU00RSxDQUFOLEdBQVUsSUFBVixHQUFpQnFOLHNCQUFzQixDQUFDck4sQ0FBRCxDQUF2QyxHQUE2QyxHQUFwRDtBQUNBLEtBRkQsTUFFTztBQUNOLFVBQUl6RyxDQUFDLENBQUNrTSxRQUFGLElBQWMsQ0FBZCxJQUFtQmxNLENBQUMsQ0FBQ21NLFVBQUYsQ0FBYXpFLFdBQWIsTUFBNEIsT0FBbkQsRUFBNEQ7QUFDM0QsZUFBTyw0QkFBUDtBQUNBLE9BRkQsTUFFTztBQUNOLGVBQU8seUJBQXlCMUgsQ0FBQyxDQUFDbU0sVUFBM0IsR0FBd0MsR0FBL0M7QUFDQTtBQUNEO0FBQ0ksR0EzQmEsRUE0Qm5CZ0QsS0E1Qm1CLENBNEJiLFdBNUJhLEVBNEJBLE1BNUJBLENBQWxCO0FBK0JILENBL0dEOztBQWlIQXpQLFdBQVcsQ0FBQzhILFNBQVosQ0FBc0I4SyxjQUF0QixHQUF1QyxZQUFXO0FBQ2pELE1BQUlsRyxJQUFJLEdBQUcsSUFBWDs7QUFDQSxNQUFJQSxJQUFJLENBQUNuSCxPQUFMLENBQWErQyxjQUFiLENBQTRCLE1BQTVCLENBQUosRUFBeUM7QUFDeENvRSxRQUFJLENBQUNuSCxPQUFMLENBQWFtUCxVQUFiLEdBQTBCaEksSUFBSSxDQUFDbkgsT0FBTCxDQUFhcEQsSUFBdkM7QUFDQTs7QUFDRCxNQUFJdUssSUFBSSxDQUFDbkgsT0FBTCxDQUFhK0MsY0FBYixDQUE0QixZQUE1QixDQUFKLEVBQStDO0FBRTlDb0UsUUFBSSxDQUFDVyxjQUFMLEdBQXNCWCxJQUFJLENBQUNLLEdBQUwsQ0FBU2IsTUFBVCxDQUFnQixlQUFoQixFQUFpQ3NELElBQWpDLENBQXNDLE9BQXRDLEVBQStDLGdCQUEvQyxFQUNwQkEsSUFEb0IsQ0FDZixHQURlLEVBQ1YsQ0FEVSxFQUVwQkEsSUFGb0IsQ0FFZixHQUZlLEVBRVY5QyxJQUFJLENBQUNoTSxlQUFMLENBQXFCRSxNQUFyQixHQUE0QixDQUE1QixHQUFnQyxFQUZ0QixFQUdyQjtBQUhxQixLQUlwQjRPLElBSm9CLENBSWYsUUFKZSxFQUlMLE1BSkssRUFLcEJBLElBTG9CLENBS2YsT0FMZSxFQUtOOUMsSUFBSSxDQUFDaE0sZUFBTCxDQUFxQkUsTUFBckIsR0FBNEIsQ0FMdEIsRUFNcEJzTCxNQU5vQixDQU1iLFdBTmEsRUFPcEJzRCxJQVBvQixDQU9mLElBUGUsRUFPVCxnQkFQUyxDQUF0QjtBQVFBOUMsUUFBSSxDQUFDVyxjQUFMLENBQ0VuQixNQURGLENBQ1MsU0FEVCxFQUVFckQsSUFGRixDQUVPLFFBQVE2RCxJQUFJLENBQUMxSyxJQUFMLENBQVV3RCxLQUFWLENBQWdCLENBQWhCLEVBQW1Ca1AsVUFBbkIsQ0FBOEIzTSxVQUE5QixFQUFSLEdBQXFELE1BRjVEO0FBSUEsUUFBSTRNLG9CQUFvQixHQUFHakksSUFBSSxDQUFDVyxjQUFMLENBQ3pCbkIsTUFEeUIsQ0FDbEIsT0FEa0IsRUFFekJzRCxJQUZ5QixDQUVwQixJQUZvQixFQUVkLHNCQUZjLENBQTNCLENBZDhDLENBa0I5Qzs7QUFDQSxRQUFJb0YsU0FBUyxHQUFHbEksSUFBSSxDQUFDMUssSUFBTCxDQUFVd0QsS0FBVixDQUFnQixDQUFoQixFQUFtQnFQLFlBQW5DO0FBQ0EvVCxXQUFPLENBQUNDLEdBQVIsQ0FBWTZULFNBQVo7O0FBQ0EsUUFBSSxPQUFPQSxTQUFQLElBQW9CLFdBQXhCLEVBQXFDO0FBQ3BDNVEsUUFBRSxDQUFDOFEsR0FBSCxDQUFPLHFDQUFQLEVBQThDLFVBQVNDLEtBQVQsRUFBZ0JDLFFBQWhCLEVBQTBCO0FBQ3ZFLFlBQUlELEtBQUosRUFBVyxNQUFNQSxLQUFOO0FBQ1gsWUFBSUUsTUFBTSxHQUFHLGlEQUFiO0FBQ0FuVSxlQUFPLENBQUNDLEdBQVIsQ0FBWWlVLFFBQVo7O0FBQ0EsYUFBSyxJQUFJak8sQ0FBQyxHQUFHLENBQVIsRUFBVzBCLEdBQUcsR0FBR3VNLFFBQVEsQ0FBQ3RNLE1BQS9CLEVBQXVDM0IsQ0FBQyxHQUFHMEIsR0FBM0MsRUFBZ0QxQixDQUFDLEVBQWpELEVBQXFEO0FBQ3BELGNBQUlpTyxRQUFRLENBQUNqTyxDQUFELENBQVIsQ0FBWSxVQUFaLEtBQTJCNk4sU0FBL0IsRUFBMEM7QUFDekMsZ0JBQUlNLFdBQVcsR0FBR0YsUUFBUSxDQUFDak8sQ0FBRCxDQUFSLENBQVksWUFBWixDQUFsQjs7QUFDQSxnQkFBTSxPQUFPbU8sV0FBUCxJQUFzQixXQUF2QixJQUF3Q0EsV0FBVyxJQUFJLEVBQTVELEVBQWtFO0FBQ2pFLGtCQUFJQyxPQUFPLEdBQUdILFFBQVEsQ0FBQ2pPLENBQUQsQ0FBUixDQUFZLE1BQVosQ0FBZDtBQUNBLGtCQUFJcU8sU0FBUyxHQUFHSixRQUFRLENBQUNqTyxDQUFELENBQVIsQ0FBWSxTQUFaLENBQWhCO0FBQ0EyRixrQkFBSSxDQUFDVyxjQUFMLENBQ0VuQixNQURGLENBQ1MsU0FEVCxFQUVFckQsSUFGRixDQUVPLGNBQWNzTSxPQUFkLEdBQXdCLHVCQUF4QixHQUFrREYsTUFBbEQsR0FBMkQsR0FBM0QsR0FBaUVDLFdBQWpFLEdBQStFLE1BRnRGO0FBR0Esa0JBQUlHLFdBQVcsR0FBR0MsUUFBUSxDQUFDRixTQUFELENBQTFCO0FBQ0FDLHlCQUFXLENBQUM1RixLQUFaLENBQWtCLFFBQWxCLEVBQTRCLFNBQTVCO0FBQ0E0Rix5QkFBVyxDQUFDdFYsRUFBWixDQUFlLE9BQWYsRUFBd0IsWUFBVztBQUFFZSx1QkFBTyxDQUFDQyxHQUFSLENBQVlvVSxPQUFaO0FBQXNCOVMsc0JBQU0sQ0FBQ1ksSUFBUCxDQUFZa1MsT0FBWixFQUFxQixRQUFyQjtBQUErQixlQUExRjtBQUNBLGFBVEQsTUFTTztBQUNOekksa0JBQUksQ0FBQ1csY0FBTCxDQUNFbkIsTUFERixDQUNTLFNBRFQsRUFFRXJELElBRkYsQ0FFTyx3REFBd0QrTCxTQUF4RCxHQUFvRSxNQUYzRTtBQUdBO0FBQ0Q7QUFDRDtBQUNELE9BdkJEO0FBd0JEO0FBQ0E7O0FBRUQsV0FBU1UsUUFBVCxDQUFrQkMsY0FBbEIsRUFBa0M7QUFDakMsUUFBSUYsV0FBVyxHQUFHVixvQkFBb0IsQ0FDcEN6SSxNQURnQixDQUNULFdBRFMsRUFFaEJzRCxJQUZnQixDQUVYLEtBRlcsRUFFSitGLGNBRkksRUFHaEIvRixJQUhnQixDQUdYLElBSFcsRUFHTCxhQUhLLEVBSWhCQSxJQUpnQixDQUlYLE9BSlcsRUFJRixNQUpFLENBQWxCO0FBS0EsV0FBTzZGLFdBQVA7QUFDQSxHQTdEZ0QsQ0ErRGpEOzs7QUFDQSxNQUFJRyxZQUFZLEdBQUc5SSxJQUFJLENBQUMxSyxJQUFMLENBQVV3RCxLQUFWLENBQWdCLENBQWhCLEVBQW1CZ1EsWUFBbkIsSUFBbUM5SSxJQUFJLENBQUMxSyxJQUFMLENBQVV3RCxLQUFWLENBQWdCLENBQWhCLEVBQW1CaVEsTUFBekU7QUFDQTNVLFNBQU8sQ0FBQ0MsR0FBUixDQUFZeVUsWUFBWjs7QUFDQSxNQUFJLE9BQU9BLFlBQVAsSUFBdUIsV0FBM0IsRUFBd0M7QUFDdkNGLFlBQVEsQ0FBQ0UsWUFBRCxDQUFSO0FBQ0E7QUFDQSxHQXJFZ0QsQ0F1RWpEO0FBQ0E7OztBQUNBLE1BQUlFLFNBQVMsR0FBR2hKLElBQUksQ0FBQzFLLElBQUwsQ0FBVXdELEtBQVYsQ0FBZ0IsQ0FBaEIsRUFBbUJtUSxZQUFuQzs7QUFDQSxNQUFJLE9BQU9ELFNBQVAsS0FBcUIsV0FBekIsRUFBc0M7QUFDckM7QUFDQTs7QUFDRCxNQUFJQSxTQUFTLEdBQUdBLFNBQVMsQ0FBQ0UsUUFBVixFQUFoQixDQTdFaUQsQ0E4RWpEOztBQUNBRixXQUFTLEdBQUksUUFBUUEsU0FBckI7QUFDQUEsV0FBUyxHQUFHQSxTQUFTLENBQUNHLE1BQVYsQ0FBaUJILFNBQVMsQ0FBQ2hOLE1BQVYsR0FBaUIsQ0FBbEMsQ0FBWjtBQUNBLE1BQUlvTixVQUFVLEdBQUcsMkJBQTJCSixTQUE1QztBQUNBLE1BQUlLLGtCQUFrQixHQUFHLENBQUMsTUFBRCxFQUFTLE1BQVQsRUFBaUIsT0FBakIsRUFBMEIsTUFBMUIsRUFBa0MsT0FBbEMsRUFBMkMsTUFBM0MsQ0FBekIsQ0FsRmlELENBb0ZqRDs7QUFDQSxXQUFTQyxpQkFBVCxDQUEyQkYsVUFBM0IsRUFBdUNDLGtCQUF2QyxFQUEyREUsSUFBM0QsRUFBaUU7QUFDaEUsUUFBSUMsbUJBQW1CLEdBQUdKLFVBQVUsR0FBR0Msa0JBQWtCLENBQUNFLElBQUQsQ0FBekQ7O0FBQ0EsUUFBSUEsSUFBSSxJQUFJRixrQkFBa0IsQ0FBQ3JOLE1BQS9CLEVBQXVDO0FBQ3RDLGFBQU8sS0FBUDtBQUNBOztBQUNEN0ksS0FBQyxDQUFDc1csR0FBRixDQUFNRCxtQkFBTixFQUNFRSxJQURGLENBQ08sWUFBVztBQUNoQmQsY0FBUSxDQUFDWSxtQkFBRCxDQUFSO0FBQ0EsS0FIRixFQUdJRyxJQUhKLENBR1MsWUFBVztBQUNsQjtBQUNBLFVBQUlwSCxDQUFDLEdBQUdnSCxJQUFJLEdBQUcsQ0FBZjtBQUNBRCx1QkFBaUIsQ0FBQ0YsVUFBRCxFQUFhQyxrQkFBYixFQUFpQzlHLENBQWpDLENBQWpCO0FBQ0EsS0FQRjtBQVFBOztBQUNEK0csbUJBQWlCLENBQUNGLFVBQUQsRUFBYUMsa0JBQWIsRUFBaUMsQ0FBakMsQ0FBakI7QUFHQSxNQUFJTyxRQUFRLEdBQUc1SixJQUFJLENBQUMxSyxJQUFMLENBQVV3RCxLQUFWLENBQWdCLENBQWhCLEVBQW1CQyxTQUFsQzs7QUFDQSxNQUFJLE9BQU82USxRQUFQLElBQW1CLFdBQXZCLEVBQW9DO0FBQ25DNUosUUFBSSxDQUFDVyxjQUFMLENBQ0VuQixNQURGLENBQ1MsU0FEVCxFQUVFckQsSUFGRixDQUVPLG9FQUFvRXlOLFFBQXBFLEdBQStFLE1BRnRGO0FBR0E7QUFHRCxDQTlHRDs7QUFnSEF0VyxXQUFXLENBQUM4SCxTQUFaLENBQXNCK0ssaUJBQXRCLEdBQTBDLFlBQVc7QUFDcEQ7QUFDQTtBQUVBLE1BQUluRyxJQUFJLEdBQUcsSUFBWDs7QUFFQSxNQUFJQSxJQUFJLENBQUN6TSxRQUFMLEtBQWtCLElBQXRCLEVBQTRCO0FBQzNCeU0sUUFBSSxDQUFDeEwsS0FBTCxDQUFXQyxJQUFYLENBQWdCdUwsSUFBSSxDQUFDeE0sSUFBckI7QUFDQSxHQVJtRCxDQVVqRDs7O0FBQ0E4RCxJQUFFLENBQUNDLFNBQUgsQ0FBYSxPQUFiLEVBQ0RtSCxJQURDLENBQ0ksVUFBUzlLLENBQVQsRUFBWTtBQUNqQkEsS0FBQyxDQUFDZ0wsWUFBRixHQUFpQixLQUFqQjtBQUNNaEwsS0FBQyxDQUFDaUksV0FBRixHQUFnQixtQkFBaEI7QUFBcUMsR0FIMUMsRUFYaUQsQ0FlcEQ7O0FBQ0F2RSxJQUFFLENBQUNDLFNBQUgsQ0FBYSxPQUFiLEVBQ1FsRSxFQURSLENBQ1csV0FEWCxFQUN3QixVQUFTTyxDQUFULEVBQVk7QUFDbENBLEtBQUMsQ0FBQ2lXLE9BQUYsR0FBWSxJQUFaO0FBQ0EsUUFBSUMsV0FBVyxHQUFHeFMsRUFBRSxDQUFDbUgsTUFBSCxDQUFVLElBQVYsQ0FBbEIsQ0FGa0MsQ0FHbEM7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ1M7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNNLEdBdkRSLEVBd0RRcEwsRUF4RFIsQ0F3RFcsV0F4RFgsRUF3RHdCLFVBQVNPLENBQVQsRUFBWSxDQUNsQztBQUNTO0FBQ1Q7QUFDUztBQUNBO0FBQ0E7QUFDSCxHQS9EUixFQWdFUVAsRUFoRVIsQ0FnRVcsVUFoRVgsRUFnRXVCLFVBQVNPLENBQVQsRUFBWTtBQUNqQ0EsS0FBQyxDQUFDaVcsT0FBRixHQUFZLEtBQVosQ0FEaUMsQ0FFakM7O0FBQ1M3SixRQUFJLENBQUM5RCxPQUFMLEdBQWU4RCxJQUFJLENBQUM5RCxPQUFMLENBQWE2RyxLQUFiLENBQW1CLFlBQW5CLEVBQWlDLFFBQWpDLENBQWY7QUFBNEQsR0FuRXZFLEVBb0VFMVAsRUFwRUYsQ0FvRUssT0FwRUwsRUFvRWMsVUFBU08sQ0FBVCxFQUFZO0FBQ3hCO0FBQ0EsUUFBTUEsQ0FBQyxDQUFDK0ssUUFBRixLQUFlLE9BQXJCLEVBQWdDO0FBQy9CLFVBQU0vSyxDQUFDLENBQUNnSSxjQUFGLENBQWlCLEtBQWpCLENBQUQsSUFBOEJoSSxDQUFDLENBQUNxTCxHQUFGLEtBQVUsRUFBN0MsRUFBbUQ7QUFDbEQsWUFBSXZKLEdBQUcsR0FBRyxxQkFBcUI5QixDQUFDLENBQUNxTCxHQUFqQztBQUNBLE9BRkQsTUFFTztBQUNOLFlBQUl2SixHQUFHLEdBQUcsMENBQTBDOUIsQ0FBQyxDQUFDbUwsRUFBdEQ7QUFDQTs7QUFDRHBKLFlBQU0sQ0FBQ1ksSUFBUCxDQUFZYixHQUFaLEVBQWlCLFFBQWpCO0FBRUE7QUFDRCxHQS9FRjs7QUFpRkEsV0FBU3FVLE1BQVQsQ0FBZ0J0TixPQUFoQixFQUF5QnVOLE9BQXpCLEVBQWtDO0FBQ2pDLFFBQUlDLFFBQVEsR0FBRzNTLEVBQUUsQ0FBQ21ILE1BQUgsQ0FBVXVMLE9BQVYsQ0FBZjtBQUNBN1csS0FBQyxDQUFDbUosSUFBRixDQUFPO0FBQ05DLGNBQVEsRUFBRSxNQURKO0FBRU43RyxTQUFHLEVBQUU4RyxZQUFZLEdBQUcsZUFGZDtBQUdObEgsVUFBSSxFQUFFO0FBQUNtSCxlQUFPLEVBQUVBO0FBQVYsT0FIQTtBQUlORSxhQUFPLEVBQUUsVUFBU0MsTUFBVCxFQUFpQjtBQUN6QnhJLGVBQU8sQ0FBQ0MsR0FBUixDQUFZdUksTUFBTSxDQUFDLEtBQUQsQ0FBbEI7QUFDQSxZQUFJcUMsR0FBRyxHQUFHckMsTUFBTSxDQUFDLEtBQUQsQ0FBaEI7O0FBQ0EsWUFBSXFDLEdBQUosRUFBUztBQUNSLGNBQUl2SixHQUFHLEdBQUcscUJBQXFCdUosR0FBL0I7QUFDQXRKLGdCQUFNLENBQUNZLElBQVAsQ0FBWWIsR0FBWixFQUFpQixRQUFqQjtBQUNBO0FBRUQ7QUFaSyxLQUFQO0FBZUE7O0FBQ0QsV0FBU3dVLFdBQVQsQ0FBcUJ6TixPQUFyQixFQUE4QnVOLE9BQTlCLEVBQXVDO0FBQ3RDO0FBQ0EsUUFBSUMsUUFBUSxHQUFHM1MsRUFBRSxDQUFDbUgsTUFBSCxDQUFVdUwsT0FBVixDQUFmO0FBQ0E3VyxLQUFDLENBQUNtSixJQUFGLENBQU87QUFDTkMsY0FBUSxFQUFFLE1BREo7QUFFTjdHLFNBQUcsRUFBRThHLFlBQVksR0FBRyxvQkFGZDtBQUdObEgsVUFBSSxFQUFFO0FBQUNtSCxlQUFPLEVBQUVBO0FBQVYsT0FIQTtBQUlORSxhQUFPLEVBQUUsVUFBU0MsTUFBVCxFQUFpQjtBQUN6QnhJLGVBQU8sQ0FBQ0MsR0FBUixDQUFZdUksTUFBTSxDQUFDLFVBQUQsQ0FBbEI7QUFDQXFOLGdCQUFRLENBQUNuSCxJQUFULENBQWMsT0FBZCxFQUF1QmxHLE1BQU0sQ0FBQyxVQUFELENBQTdCO0FBQ0E7QUFQSyxLQUFQO0FBU0E7QUFFRCxDQWpJRDs7QUFtSUF0SixXQUFXLENBQUM4SCxTQUFaLENBQXNCK08sV0FBdEIsR0FBb0MsVUFBU3ZXLENBQVQsRUFBWStILFFBQVosRUFBc0I7QUFDdEQsTUFBSXFFLElBQUksR0FBRyxJQUFYLENBRHNELENBR3pEOztBQUNBLE1BQUlwTSxDQUFDLENBQUMrSyxRQUFGLEtBQWUsUUFBZixJQUEyQi9LLENBQUMsQ0FBQytLLFFBQUYsS0FBZSxFQUExQyxJQUFnRC9LLENBQUMsQ0FBQytLLFFBQUYsS0FBZSxPQUFuRSxFQUE0RTtBQUMzRSxRQUFJOUMsV0FBVyxHQUFHLG1DQUFtQ2pJLENBQUMsQ0FBQ29VLFVBQXJDLEdBQWtELE1BQXBFOztBQUNBLFFBQUlwVSxDQUFDLENBQUNtRixTQUFOLEVBQWlCO0FBQ2hCOEMsaUJBQVcsR0FBR0EsV0FBVyxHQUFHLGlDQUFkLEdBQWtEakksQ0FBQyxDQUFDbUYsU0FBcEQsR0FBZ0UsTUFBOUU7QUFDQTs7QUFDRCxRQUFJdUcsWUFBWSxHQUFHMUwsQ0FBQyxDQUFDbUgsTUFBRixDQUFTaUIsTUFBNUI7QUFDQUgsZUFBVyxHQUFHQSxXQUFXLEdBQUcsa0RBQWQsR0FBbUV5RCxZQUFuRSxHQUFrRixNQUFoRyxDQU4yRSxDQU8zRTs7QUFDQTNELFlBQVEsQ0FBQ0UsV0FBRCxDQUFSO0FBQ0EsR0Fid0QsQ0FlekQ7OztBQUNBLFdBQVN1TyxhQUFULENBQXVCQyxPQUF2QixFQUFnQztBQUMvQixRQUFJQyxVQUFVLEdBQUcsRUFBakI7QUFDQUQsV0FBTyxDQUFDaFIsT0FBUixDQUFnQixVQUFTOEUsQ0FBVCxFQUFZO0FBQzNCLFVBQUlvTSxpQkFBaUIsR0FBR3BNLENBQUMsQ0FBQyxDQUFELENBQUQsQ0FBS3FNLEtBQUwsQ0FBVyxHQUFYLENBQXhCLENBRDJCLENBRTNCO0FBQ0E7O0FBQ0FELHVCQUFpQixHQUFHQSxpQkFBaUIsQ0FBQ0UsR0FBbEIsQ0FBc0IsVUFBU2xXLENBQVQsRUFBWTtBQUFFLFlBQUlBLENBQUMsSUFBSUEsQ0FBQyxDQUFDaUgsV0FBRixFQUFULEVBQTBCLE9BQU9qSCxDQUFDLENBQUM4RyxVQUFGLEVBQVAsQ0FBMUIsS0FBc0QsT0FBTzlHLENBQVA7QUFBVSxPQUFwRyxDQUFwQixDQUoyQixDQUszQjs7QUFDQSxVQUFJbVcsVUFBVSxHQUFHSCxpQkFBaUIsQ0FBQ0ksSUFBbEIsQ0FBdUIsR0FBdkIsQ0FBakI7QUFDQUwsZ0JBQVUsQ0FBQzNTLElBQVgsQ0FBZ0IrUyxVQUFoQjtBQUNBLEtBUkQ7QUFTQSxXQUFPSixVQUFQO0FBQ0E7O0FBQ0QsV0FBU00sUUFBVCxDQUFrQm5PLE9BQWxCLEVBQTJCZCxRQUEzQixFQUFxQztBQUNwQztBQUNBeEksS0FBQyxDQUFDbUosSUFBRixDQUFPO0FBQ05DLGNBQVEsRUFBRSxNQURKO0FBRU43RyxTQUFHLEVBQUU4RyxZQUFZLEdBQUcsaUJBRmQ7QUFHTmxILFVBQUksRUFBRTtBQUFDbUgsZUFBTyxFQUFFQTtBQUFWLE9BSEE7QUFJTkUsYUFBTyxFQUFFLFVBQVNDLE1BQVQsRUFBaUI7QUFDekJqQixnQkFBUSxDQUFDaUIsTUFBTSxDQUFDLE9BQUQsQ0FBUCxDQUFSO0FBQ0E7QUFOSyxLQUFQO0FBUUE7O0FBQ0QsV0FBU25CLFFBQVQsR0FBb0I7QUFDbkI7QUFDQSxRQUFJSSxXQUFXLEdBQUcsRUFBbEI7QUFDQUEsZUFBVyxHQUFHQSxXQUFXLEdBQUcsd0JBQTVCO0FBQ0FBLGVBQVcsR0FBR0EsV0FBVyxHQUFHakksQ0FBQyxDQUFDb0wsS0FBOUI7QUFDQW5ELGVBQVcsR0FBR0EsV0FBVyxHQUFHLE1BQTVCO0FBQ0FBLGVBQVcsR0FBR0EsV0FBVyxHQUFHLHVCQUFkLEdBQXdDakksQ0FBQyxDQUFDb0gsSUFBMUMsR0FBaUQsTUFBL0Q7QUFDQSxRQUFJNlAsYUFBYSxHQUFHLEVBQXBCO0FBQ0FqWCxLQUFDLENBQUMwVyxVQUFGLENBQWFqUixPQUFiLENBQXFCLFVBQVM4RSxDQUFULEVBQVk7QUFDaEMwTSxtQkFBYSxDQUFDbFQsSUFBZCxDQUFtQndHLENBQW5CO0FBQ0EsS0FGRDtBQUdBLFFBQUltTSxVQUFVLEdBQUdPLGFBQWEsQ0FBQ0YsSUFBZCxDQUFtQixJQUFuQixDQUFqQjtBQUNBOU8sZUFBVyxHQUFHQSxXQUFXLEdBQUcsa0NBQWQsR0FBbUR5TyxVQUFuRCxHQUFnRSxNQUE5RTtBQUNBLFdBQU96TyxXQUFQO0FBQ0E7O0FBQ0QsTUFBS2pJLENBQUMsQ0FBQ2dJLGNBQUYsQ0FBaUIsU0FBakIsQ0FBTCxFQUFtQztBQUNsQyxRQUFJME8sVUFBVSxHQUFHRixhQUFhLENBQUN4VyxDQUFDLENBQUN5VyxPQUFILENBQTlCO0FBQ0F6VyxLQUFDLENBQUMwVyxVQUFGLEdBQWVBLFVBQWY7O0FBQ0EsUUFBSzFXLENBQUMsQ0FBQ2dJLGNBQUYsQ0FBaUIsT0FBakIsQ0FBTCxFQUFnQztBQUMvQixVQUFJQyxXQUFXLEdBQUdKLFFBQVEsRUFBMUI7QUFDQUUsY0FBUSxDQUFDRSxXQUFELENBQVI7QUFDQSxLQUhELE1BR087QUFDTitPLGNBQVEsQ0FBQ2hYLENBQUMsQ0FBQ21MLEVBQUgsRUFBTyxVQUFTK0wsS0FBVCxFQUFnQjtBQUM5QmxYLFNBQUMsQ0FBQ29MLEtBQUYsR0FBVThMLEtBQVY7QUFDQSxZQUFJalAsV0FBVyxHQUFHSixRQUFRLEVBQTFCO0FBQ0FFLGdCQUFRLENBQUNFLFdBQUQsQ0FBUjtBQUNBLE9BSk8sQ0FBUjtBQUtBO0FBQ0QsR0FiRCxNQWFPO0FBQ04xSSxLQUFDLENBQUNtSixJQUFGLENBQU87QUFDTkMsY0FBUSxFQUFFLE1BREo7QUFFTjdHLFNBQUcsRUFBRThHLFlBQVksR0FBRyxzQkFGZDtBQUdObEgsVUFBSSxFQUFFO0FBQUN5VixpQkFBUyxFQUFFbFUsSUFBSSxDQUFDNkYsU0FBTCxDQUFlOUksQ0FBQyxDQUFDb1gsWUFBakI7QUFBWixPQUhBO0FBSU5yTyxhQUFPLEVBQUUsVUFBU0MsTUFBVCxFQUFpQjtBQUN6QmhKLFNBQUMsQ0FBQ3lXLE9BQUYsR0FBWXpOLE1BQU0sQ0FBQyxTQUFELENBQWxCO0FBQ0EsWUFBSTBOLFVBQVUsR0FBR0YsYUFBYSxDQUFDeFcsQ0FBQyxDQUFDeVcsT0FBSCxDQUE5QjtBQUNBelcsU0FBQyxDQUFDMFcsVUFBRixHQUFlQSxVQUFmOztBQUNBLFlBQUsxVyxDQUFDLENBQUNnSSxjQUFGLENBQWlCLE9BQWpCLENBQUwsRUFBZ0M7QUFDL0IsY0FBSUMsV0FBVyxHQUFHSixRQUFRLEVBQTFCO0FBQ0FFLGtCQUFRLENBQUNFLFdBQUQsQ0FBUjtBQUNBLFNBSEQsTUFHTztBQUNOK08sa0JBQVEsQ0FBQ2hYLENBQUMsQ0FBQ21MLEVBQUgsRUFBTyxVQUFTK0wsS0FBVCxFQUFnQjtBQUM5QmxYLGFBQUMsQ0FBQ29MLEtBQUYsR0FBVThMLEtBQVY7QUFDQSxnQkFBSWpQLFdBQVcsR0FBR0osUUFBUSxFQUExQjtBQUNBRSxvQkFBUSxDQUFDRSxXQUFELENBQVI7QUFDQSxXQUpPLENBQVI7QUFLQTtBQUNEO0FBbEJLLEtBQVA7QUFxQkE7QUFFRCxDQTVGRDs7QUE4RkF2SSxXQUFXLENBQUM4SCxTQUFaLENBQXNCZ0wsYUFBdEIsR0FBc0MsWUFBVztBQUM3QyxNQUFJcEcsSUFBSSxHQUFHLElBQVg7QUFFQUEsTUFBSSxDQUFDbUMsYUFBTCxHQUFxQixDQUFyQixDQUg2QyxDQUdwQjs7QUFDNUJuQyxNQUFJLENBQUNzQyxRQUFMLEdBQWdCdEMsSUFBSSxDQUFDMUssSUFBTCxDQUFVc0QsS0FBVixDQUFnQnVCLFNBQWhCLENBQTBCLENBQTFCLENBQWhCLENBSmdELENBTTdDOztBQUNIN0MsSUFBRSxDQUFDQyxTQUFILENBQWEsT0FBYixFQUFzQkMsTUFBdEIsQ0FBNkIsVUFBUzVELENBQVQsRUFBWTtBQUFFLFdBQU9BLENBQUMsQ0FBQ21MLEVBQUYsS0FBU2lCLElBQUksQ0FBQ25ILE9BQUwsQ0FBYWtHLEVBQTdCO0FBQWtDLEdBQTdFLEVBQ1FuSCxPQURSLENBQ2dCLFFBRGhCLEVBQzBCLEtBRDFCLEVBRVFBLE9BRlIsQ0FFZ0IsU0FGaEIsRUFFMkIsSUFGM0IsRUFHUTNDLFVBSFIsR0FJTztBQUpQLEdBS1FDLFFBTFIsQ0FLaUIsSUFMakIsRUFNUTROLElBTlIsQ0FNYSxHQU5iLEVBTWtCLFVBQVNsUCxDQUFULEVBQVk7QUFDZjtBQUNBLFdBQU9BLENBQUMsQ0FBQ3VQLE1BQVQ7QUFDUCxHQVRSLEVBVVFMLElBVlIsQ0FVYSxHQVZiLEVBVWtCLENBVmxCLEVBV0VwRSxJQVhGLENBV08sT0FYUCxFQVdnQixZQUFXO0FBQ3pCc0IsUUFBSSxDQUFDVSxlQUFMLENBQXFCekwsVUFBckIsR0FDS3NJLEtBREwsQ0FDVyxJQURYLEVBRUtySSxRQUZMLENBRWMsSUFGZCxFQUdLNk4sS0FITCxDQUdXLFNBSFgsRUFHc0IsR0FIdEI7QUFJQSxHQWhCRixFQWlCUXJFLElBakJSLENBaUJhLEtBakJiLEVBaUJvQixZQUFXO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVUO0FBQ0F2TCxLQUFDLENBQUN1QixLQUFGLENBQVF1VyxPQUFSLENBQWdCO0FBQ2ZDLFVBQUksRUFBRTtBQURTLEtBQWhCO0FBR1NsTCxRQUFJLENBQUNtTCx3QkFBTDtBQUNILEdBbENSO0FBbUNBLENBMUNEOztBQTRDQTdYLFdBQVcsQ0FBQzhILFNBQVosQ0FBc0IrUCx3QkFBdEIsR0FBaUQsWUFBVztBQUN4RCxNQUFJbkwsSUFBSSxHQUFHLElBQVgsQ0FEd0QsQ0FLeEQ7QUFDSTtBQUNBO0FBQ0E7QUFDQTs7QUFDSixNQUFJQSxJQUFJLENBQUNtQyxhQUFMLEtBQXVCbkMsSUFBSSxDQUFDb0Msb0JBQWhDLEVBQXNEO0FBQ2xEaE8sV0FBTyxDQUFDQyxHQUFSLENBQVksYUFBWjtBQUNBMkwsUUFBSSxDQUFDb0wsZUFBTDtBQUNILEdBSEQsTUFHTyxJQUFJcEwsSUFBSSxDQUFDbUMsYUFBTCxHQUFxQm5DLElBQUksQ0FBQ29DLG9CQUE5QixFQUFvRDtBQUM3RHBDLFFBQUksQ0FBQytCLGNBQUwsR0FBc0IsU0FBdEI7QUFDTS9CLFFBQUksQ0FBQ21DLGFBQUw7QUFDQW5DLFFBQUksQ0FBQ3FMLFNBQUwsR0FIdUQsQ0FJdkQ7QUFDSCxHQUxNLE1BS0EsSUFBSXJMLElBQUksQ0FBQ21DLGFBQUwsR0FBcUJuQyxJQUFJLENBQUNvQyxvQkFBOUIsRUFBb0Q7QUFDN0RwQyxRQUFJLENBQUMrQixjQUFMLEdBQXNCLFFBQXRCO0FBQ00vQixRQUFJLENBQUNtQyxhQUFMO0FBQ0FuQyxRQUFJLENBQUNxTCxTQUFMLEdBSHVELENBSXZEO0FBQ0g7QUFDSixDQXhCRDs7QUEwQkEvWCxXQUFXLENBQUM4SCxTQUFaLENBQXNCa1EsUUFBdEIsR0FBaUMsWUFBVztBQUMzQyxNQUFJdEwsSUFBSSxHQUFHLElBQVgsQ0FEMkMsQ0FHeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUNBLE1BQUksT0FBT0EsSUFBSSxDQUFDaUMscUJBQVosS0FBc0MsV0FBMUMsRUFBdUQ7QUFDdERqQyxRQUFJLENBQUN1TCx1QkFBTDtBQUNBOztBQUNELE1BQUl2TCxJQUFJLENBQUMrQixjQUFMLEtBQXdCLFNBQTVCLEVBQXVDO0FBQ3RDL0IsUUFBSSxDQUFDd0wsUUFBTDtBQUNBLEdBRkQsTUFFTyxJQUFJeEwsSUFBSSxDQUFDK0IsY0FBTCxLQUF3QixRQUE1QixFQUFzQztBQUM1Qy9CLFFBQUksQ0FBQ3lMLFVBQUw7QUFDQTtBQUNELENBeEJEOztBQTBCQW5ZLFdBQVcsQ0FBQzhILFNBQVosQ0FBc0JpUSxTQUF0QixHQUFrQyxZQUFXO0FBQzVDLE1BQUlyTCxJQUFJLEdBQUcsSUFBWCxDQUQ0QyxDQUc1Qzs7QUFDQSxNQUFJQSxJQUFJLENBQUNtQyxhQUFMLElBQXNCbkMsSUFBSSxDQUFDMUssSUFBTCxDQUFVd0QsS0FBVixDQUFnQmtELE1BQWhCLEdBQXVCLENBQWpELEVBQW9EO0FBQ25EZ0UsUUFBSSxDQUFDc0MsUUFBTCxHQUFnQnRDLElBQUksQ0FBQzFLLElBQUwsQ0FBVXNELEtBQVYsQ0FBZ0J1QixTQUFoQixDQUEwQixDQUExQixDQUFoQixDQURtRCxDQUVuRDtBQUNBOztBQUVBNkYsUUFBSSxDQUFDVSxlQUFMLENBQXFCakIsSUFBckIsQ0FBMEJPLElBQUksQ0FBQ3NDLFFBQS9CLEVBTG1ELENBT25EOztBQUNBblAsS0FBQyxDQUFDdUIsS0FBRixDQUFRdVcsT0FBUixDQUFnQjtBQUNmQyxVQUFJLEVBQUU7QUFEUyxLQUFoQjtBQUdBbEwsUUFBSSxDQUFDc0wsUUFBTDtBQUNBO0FBQ0E7O0FBRUQsTUFBSUksUUFBUSxHQUFHMUwsSUFBSSxDQUFDMUssSUFBTCxDQUFVd0QsS0FBVixDQUFnQnRCLE1BQWhCLENBQXVCLFVBQVM1RCxDQUFULEVBQVk7QUFBRSxXQUFPQSxDQUFDLENBQUN5TCxHQUFGLEtBQVVXLElBQUksQ0FBQ21DLGFBQXRCO0FBQXNDLEdBQTNFLENBQWY7QUFDQSxNQUFJd0osT0FBTyxHQUFHM0wsSUFBSSxDQUFDc0MsUUFBbkI7QUFDQSxNQUFJc0osT0FBTyxHQUFHRixRQUFRLENBQUMsQ0FBRCxDQUFSLENBQVkxUSxJQUExQixDQXJCNEMsQ0FzQjVDOztBQUNBLE1BQUk0USxPQUFPLElBQUlELE9BQWYsRUFBd0I7QUFDdkIzTCxRQUFJLENBQUNzTCxRQUFMO0FBQ0EsR0FGRCxNQUVPLElBQUlNLE9BQU8sR0FBR0QsT0FBZCxFQUF1QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EzTCxRQUFJLENBQUN1QyxDQUFMLEdBQU8sQ0FBUDtBQUNBdkMsUUFBSSxDQUFDd0MsRUFBTCxHQUFRLENBQVI7QUFDQXhDLFFBQUksQ0FBQ3NDLFFBQUw7QUFDQXRDLFFBQUksQ0FBQzZMLFlBQUw7QUFDQSxHQWJNLE1BYUEsSUFBSUQsT0FBTyxHQUFHRCxPQUFkLEVBQXVCO0FBQzdCM0wsUUFBSSxDQUFDc0MsUUFBTDtBQUNBdEMsUUFBSSxDQUFDNkwsWUFBTDtBQUNBLEdBekMyQyxDQTBDNUM7QUFFQTtBQUNBO0FBQ0c7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDSCxTQUFPN0wsSUFBSSxDQUFDc0MsUUFBWjtBQUNBLENBMUVEOztBQTRFQWhQLFdBQVcsQ0FBQzhILFNBQVosQ0FBc0J5USxZQUF0QixHQUFxQyxZQUFXO0FBQy9DLE1BQUk3TCxJQUFJLEdBQUcsSUFBWDtBQUdBQSxNQUFJLENBQUNVLGVBQUwsQ0FBcUJqQixJQUFyQixDQUEwQk8sSUFBSSxDQUFDc0MsUUFBL0IsRUFKK0MsQ0FNL0M7O0FBQ0FuUCxHQUFDLENBQUN1QixLQUFGLENBQVF1VyxPQUFSLENBQWdCO0FBQ2ZDLFFBQUksRUFBRTtBQURTLEdBQWhCO0FBSUFsTCxNQUFJLENBQUN1TCx1QkFBTDtBQUNBLE1BQUlPLGFBQWEsR0FBRzlMLElBQUksQ0FBQ0MsV0FBTCxDQUFpQnpJLE1BQWpCLENBQXdCLFVBQVM1RCxDQUFULEVBQVk7QUFBRSxXQUFPQSxDQUFDLENBQUNvSCxJQUFGLElBQVVnRixJQUFJLENBQUNzQyxRQUF0QjtBQUFpQyxHQUF2RSxDQUFwQixDQVorQyxDQWMvQzs7QUFDQSxNQUFLd0osYUFBYSxDQUFDOVAsTUFBZCxLQUF5QixDQUE5QixFQUFrQztBQUNqQytQLGNBQVUsQ0FBQyxZQUFXO0FBQ3JCL0wsVUFBSSxDQUFDcUwsU0FBTDtBQUNBLEtBRlMsRUFFUHJMLElBQUksQ0FBQ2dDLHFCQUFMLENBQTJCaEMsSUFBSSxDQUFDc0MsUUFBaEMsQ0FGTyxDQUFWO0FBR0EsR0FKRCxNQUlPO0FBQ050QyxRQUFJLENBQUNzTCxRQUFMO0FBQ0E7QUFHRCxDQXhCRDs7QUEwQkFoWSxXQUFXLENBQUM4SCxTQUFaLENBQXNCb1EsUUFBdEIsR0FBaUMsWUFBVztBQUN4QyxNQUFJeEwsSUFBSSxHQUFHLElBQVgsQ0FEd0MsQ0FHeEM7QUFFQTs7QUFFQSxNQUFJMEwsUUFBUSxHQUFHcFUsRUFBRSxDQUFDQyxTQUFILENBQWEsT0FBYixFQUFzQkMsTUFBdEIsQ0FBNkIsVUFBUzVELENBQVQsRUFBWTtBQUFFLFdBQU9BLENBQUMsQ0FBQ3lMLEdBQUYsS0FBVVcsSUFBSSxDQUFDbUMsYUFBdEI7QUFBc0MsR0FBakYsQ0FBZjs7QUFFQSxXQUFTNkosU0FBVCxDQUFtQmhDLE9BQW5CLEVBQTRCO0FBQ3hCO0FBQ0E7QUFDQUEsV0FBTyxDQUFDaUMscUJBQVIsR0FBZ0MzVSxFQUFFLENBQUNDLFNBQUgsQ0FBYSxPQUFiLEVBQXNCQyxNQUF0QixDQUE2QixVQUFTMFUsQ0FBVCxFQUFZO0FBQUUsYUFBT0EsQ0FBQyxDQUFDclUsTUFBRixLQUFhbVMsT0FBcEI7QUFBOEIsS0FBekUsQ0FBaEM7QUFDQUEsV0FBTyxDQUFDaUMscUJBQVIsQ0FBOEJyVSxPQUE5QixDQUFzQyxRQUF0QyxFQUFnRCxLQUFoRCxFQUNLQSxPQURMLENBQ2EsU0FEYixFQUN3QixJQUR4QixFQUVLOEcsSUFGTCxDQUVVLFVBQVM5SyxDQUFULEVBQVk7QUFBRUEsT0FBQyxDQUFDdVksWUFBRixHQUFpQixJQUFqQjtBQUF3QixLQUZoRCxFQUdLckosSUFITCxDQUdVLElBSFYsRUFHZ0IsVUFBU2xQLENBQVQsRUFBWTtBQUFFLGFBQU9BLENBQUMsQ0FBQ2lFLE1BQUYsQ0FBU3RELENBQWhCO0FBQW9CLEtBSGxELEVBSUt1TyxJQUpMLENBSVUsSUFKVixFQUlnQixVQUFTbFAsQ0FBVCxFQUFZO0FBQUUsYUFBT0EsQ0FBQyxDQUFDaUUsTUFBRixDQUFTMUQsQ0FBaEI7QUFBb0IsS0FKbEQsRUFLSzRPLEtBTEwsQ0FLVyxZQUxYLEVBS3lCLFNBTHpCLEVBTUs5TixVQU5MLEdBT0ttWCxJQVBMLENBT1UsUUFQVixFQVFLN08sS0FSTCxDQVFXLENBUlgsRUFTS3JJLFFBVEwsQ0FTYzhLLElBQUksQ0FBQ2tDLGtCQVRuQixFQVVLWSxJQVZMLENBVVUsSUFWVixFQVVnQixVQUFTbFAsQ0FBVCxFQUFZO0FBQUUsYUFBT0EsQ0FBQyxDQUFDZ1EsTUFBRixDQUFTclAsQ0FBaEI7QUFBb0IsS0FWbEQsRUFXS3VPLElBWEwsQ0FXVSxJQVhWLEVBV2dCLFVBQVNsUCxDQUFULEVBQVk7QUFBRSxhQUFPQSxDQUFDLENBQUNnUSxNQUFGLENBQVN6UCxDQUFoQjtBQUFvQixLQVhsRCxFQVlJO0FBQ0E7QUFiSixLQWNLMk8sSUFkTCxDQWNVLEdBZFYsRUFjZSxDQWRmLEVBZUtwRSxJQWZMLENBZVUsS0FmVixFQWVpQixVQUFTOUssQ0FBVCxFQUFZO0FBQUVBLE9BQUMsQ0FBQ3VZLFlBQUYsR0FBaUIsS0FBakI7QUFBeUIsS0FmeEQ7QUFnQkgsR0E3QnVDLENBOEJ4QztBQUNIOzs7QUFDR1QsVUFBUSxDQUFDOVQsT0FBVCxDQUFpQixRQUFqQixFQUEyQixLQUEzQixFQUNLQSxPQURMLENBQ2EsU0FEYixFQUN3QixJQUR4QixFQUVLM0MsVUFGTCxHQUdLbVgsSUFITCxDQUdVLFFBSFYsRUFJSTtBQUNBO0FBTEosR0FNS2xYLFFBTkwsQ0FNYzhLLElBQUksQ0FBQ2lDLHFCQU5uQixFQU9LYSxJQVBMLENBT1UsR0FQVixFQU9lLFVBQVNsUCxDQUFULEVBQVk7QUFDbkI7QUFDQSxXQUFPQSxDQUFDLENBQUN1UCxNQUFUO0FBQ0gsR0FWTCxFQVdLTCxJQVhMLENBV1UsR0FYVixFQVdlLENBWGYsRUFZRHBFLElBWkMsQ0FZSSxLQVpKLEVBWVcsVUFBUzlLLENBQVQsRUFBWTtBQUN4QjtBQUNBO0FBQ0FvTSxRQUFJLENBQUN1QyxDQUFMOztBQUNBLFFBQUl2QyxJQUFJLENBQUN6TSxRQUFMLEtBQWtCLElBQXRCLEVBQTRCO0FBQzNCeU0sVUFBSSxDQUFDck0sU0FBTCxDQUFlQyxDQUFmO0FBQ0EsS0FOdUIsQ0FPeEI7OztBQUNBb00sUUFBSSxDQUFDbUwsd0JBQUw7QUFDQWEsYUFBUyxDQUFDcFksQ0FBRCxDQUFUO0FBRU0sR0F2Qkw7QUF3QkgsQ0F4REQ7O0FBMERBTixXQUFXLENBQUM4SCxTQUFaLENBQXNCcVEsVUFBdEIsR0FBbUMsWUFBVztBQUMxQyxNQUFJekwsSUFBSSxHQUFHLElBQVg7QUFFQUEsTUFBSSxDQUFDK0IsY0FBTCxHQUFzQixRQUF0QixDQUgwQyxDQUsxQzs7QUFFQSxNQUFJMkosUUFBUSxHQUFHcFUsRUFBRSxDQUFDQyxTQUFILENBQWEsT0FBYixFQUFzQkMsTUFBdEIsQ0FBNkIsVUFBUzVELENBQVQsRUFBWTtBQUFFLFdBQU9BLENBQUMsQ0FBQ3lZLEtBQUYsS0FBWXJNLElBQUksQ0FBQ21DLGFBQXhCO0FBQXdDLEdBQW5GLENBQWY7QUFDQSxNQUFJbUssU0FBUyxHQUFHaFYsRUFBRSxDQUFDQyxTQUFILENBQWEsT0FBYixFQUFzQkMsTUFBdEIsQ0FBNkIsVUFBUzVELENBQVQsRUFBWTtBQUFFLFdBQU9BLENBQUMsQ0FBQ2lFLE1BQUYsQ0FBU3dVLEtBQVQsS0FBbUJyTSxJQUFJLENBQUNtQyxhQUEvQjtBQUErQyxHQUExRixDQUFoQixDQVIwQyxDQVUxQzs7QUFDQSxNQUFJb0ssZUFBZSxHQUFHdk0sSUFBSSxDQUFDaUMscUJBQTNCO0FBQ0FxSyxXQUFTLENBQUNyWCxVQUFWLEdBQ0t5SixJQURMLENBQ1UsT0FEVixFQUNtQixVQUFTOUssQ0FBVCxFQUFZO0FBQUVBLEtBQUMsQ0FBQ3VZLFlBQUYsR0FBZSxJQUFmO0FBQXNCLEdBRHZELEVBRUtqWCxRQUZMLENBRWNxWCxlQUZkLEVBR0tILElBSEwsQ0FHVSxNQUhWLEVBSUt0SixJQUpMLENBSVUsSUFKVixFQUlnQixVQUFTbFAsQ0FBVCxFQUFZO0FBQUUsV0FBT0EsQ0FBQyxDQUFDaUUsTUFBRixDQUFTdEQsQ0FBaEI7QUFBb0IsR0FKbEQsRUFLS3VPLElBTEwsQ0FLVSxJQUxWLEVBS2dCLFVBQVNsUCxDQUFULEVBQVk7QUFBRSxXQUFPQSxDQUFDLENBQUNpRSxNQUFGLENBQVMxRCxDQUFoQjtBQUFvQixHQUxsRCxFQU1LTSxJQU5MLENBTVUsVUFBU2IsQ0FBVCxFQUFZO0FBQ3hCO0FBQ1VBLEtBQUMsQ0FBQ3VZLFlBQUYsR0FBZSxLQUFmO0FBQ0EsUUFBSVQsUUFBUSxHQUFHcFUsRUFBRSxDQUFDQyxTQUFILENBQWEsT0FBYixFQUFzQkMsTUFBdEIsQ0FBNkIsVUFBUzVELENBQVQsRUFBWTtBQUFFLGFBQU9BLENBQUMsQ0FBQ3lMLEdBQUYsS0FBVVcsSUFBSSxDQUFDbUMsYUFBdEI7QUFBc0MsS0FBakYsQ0FBZjtBQUNBdUosWUFBUSxDQUFDelcsVUFBVCxHQUNLQyxRQURMLENBQ2M4SyxJQUFJLENBQUNpQyxxQkFEbkIsRUFFS21LLElBRkwsQ0FFVSxNQUZWLEVBR0t0SixJQUhMLENBR1UsR0FIVixFQUdjLENBSGQsRUFJS0EsSUFKTCxDQUlVLEdBSlYsRUFJYyxDQUpkLEVBS0twRSxJQUxMLENBS1UsS0FMVixFQUtpQixVQUFTOUQsRUFBVCxFQUFhO0FBQ3RCdEQsUUFBRSxDQUFDbUgsTUFBSCxDQUFVLElBQVYsRUFBZ0I3RyxPQUFoQixDQUF3QixRQUF4QixFQUFrQyxJQUFsQyxFQUNLQSxPQURMLENBQ2EsU0FEYixFQUN3QixLQUR4QjtBQUVBb0ksVUFBSSxDQUFDbUwsd0JBQUw7QUFDSCxLQVRMO0FBVUgsR0FwQkw7QUFxQkgsQ0FqQ0Q7O0FBbUNBN1gsV0FBVyxDQUFDOEgsU0FBWixDQUFzQmdRLGVBQXRCLEdBQXdDLFlBQVc7QUFDbEQsTUFBSXBMLElBQUksR0FBRyxJQUFYO0FBRUFBLE1BQUksQ0FBQytCLGNBQUwsR0FBc0IsU0FBdEI7QUFDQTVPLEdBQUMsQ0FBQ3VCLEtBQUYsQ0FBUXVXLE9BQVIsQ0FBZ0I7QUFDZkMsUUFBSSxFQUFFO0FBRFMsR0FBaEI7QUFHQTlXLFNBQU8sQ0FBQ0MsR0FBUixDQUFZLFVBQVo7QUFDQUQsU0FBTyxDQUFDQyxHQUFSLENBQVkyTCxJQUFJLENBQUNtQyxhQUFqQjtBQUNBLENBVEQ7O0FBV0E3TyxXQUFXLENBQUM4SCxTQUFaLENBQXNCb1Isa0JBQXRCLEdBQTJDLFVBQVNuSyxlQUFULEVBQTBCO0FBQ3BFLE1BQUlyQyxJQUFJLEdBQUcsSUFBWDtBQUVBQSxNQUFJLENBQUNxQyxlQUFMLEdBQXVCQSxlQUF2QjtBQUNBak8sU0FBTyxDQUFDQyxHQUFSLENBQVkyTCxJQUFJLENBQUNxQyxlQUFqQjtBQUNBckMsTUFBSSxDQUFDeU0sa0JBQUwsR0FMb0UsQ0FPcEU7O0FBQ0EsTUFBSyxFQUFFek0sSUFBSSxDQUFDbUMsYUFBTCxLQUF1Qm5DLElBQUksQ0FBQ29DLG9CQUE5QixDQUFMLEVBQTJEO0FBQUc7QUFDN0QsUUFBSXBDLElBQUksQ0FBQ21DLGFBQUwsR0FBcUJuQyxJQUFJLENBQUNvQyxvQkFBOUIsRUFBb0Q7QUFDbkRwQyxVQUFJLENBQUMrQixjQUFMLEdBQXNCLFNBQXRCO0FBQ0EvQixVQUFJLENBQUN3TCxRQUFMO0FBQ0EsS0FIRCxNQUdPO0FBQ054TCxVQUFJLENBQUMrQixjQUFMLEdBQXNCLFFBQXRCO0FBQ0EvQixVQUFJLENBQUN5TCxVQUFMO0FBQ0E7QUFDRDtBQUNELENBakJEOztBQW1CQW5ZLFdBQVcsQ0FBQzhILFNBQVosQ0FBc0JxUixrQkFBdEIsR0FBMkMsWUFBVztBQUNyRCxNQUFJek0sSUFBSSxHQUFHLElBQVgsQ0FEcUQsQ0FHckQ7O0FBQ0EsTUFBSWpHLE9BQU8sR0FBR2lHLElBQUksQ0FBQzFLLElBQUwsQ0FBVXNELEtBQVYsQ0FBZ0J1QixTQUFoQixDQUEwQixDQUExQixDQUFkOztBQUNBLFdBQVN1UyxnQkFBVCxHQUE0QjtBQUMzQixRQUFJWixhQUFhLEdBQUc5TCxJQUFJLENBQUNDLFdBQUwsQ0FBaUJ6SSxNQUFqQixDQUF3QixVQUFTNUQsQ0FBVCxFQUFZO0FBQUUsYUFBT0EsQ0FBQyxDQUFDb0gsSUFBRixJQUFVZ0YsSUFBSSxDQUFDcUMsZUFBdEI7QUFBd0MsS0FBOUUsQ0FBcEI7QUFDQSxXQUFPeUosYUFBUDtBQUNBOztBQUNELE1BQUlBLGFBQWEsR0FBR1ksZ0JBQWdCLEVBQXBDOztBQUNBLE1BQUlaLGFBQWEsQ0FBQzlQLE1BQWQsR0FBdUIsQ0FBM0IsRUFBOEI7QUFDN0IsUUFBSTJRLGdCQUFnQixHQUFHYixhQUFhLENBQUNBLGFBQWEsQ0FBQzlQLE1BQWQsR0FBcUIsQ0FBdEIsQ0FBcEM7QUFDQWdFLFFBQUksQ0FBQ29DLG9CQUFMLEdBQTRCdUssZ0JBQWdCLENBQUN0TixHQUE3QztBQUNBLEdBSEQsTUFHTztBQUNOLFFBQUlXLElBQUksQ0FBQ3FDLGVBQUwsSUFBd0J0SSxPQUE1QixFQUFxQztBQUNwQzZTLGtCQUFZO0FBQ1osS0FGRCxNQUVPO0FBQ041TSxVQUFJLENBQUNxQyxlQUFMO0FBQ0FyQyxVQUFJLENBQUN5TSxrQkFBTCxHQUZNLENBRXNCO0FBQzVCO0FBQ0Q7O0FBRUQsV0FBU0csWUFBVCxHQUF3QjtBQUN2QjVNLFFBQUksQ0FBQ3FDLGVBQUw7QUFDQSxRQUFJeUosYUFBYSxHQUFHWSxnQkFBZ0IsRUFBcEM7O0FBQ0EsUUFBSVosYUFBYSxDQUFDOVAsTUFBZCxHQUF1QixDQUEzQixFQUE4QjtBQUM3QmdFLFVBQUksQ0FBQ3lNLGtCQUFMO0FBQ0EsS0FGRCxNQUVPO0FBQ05HLGtCQUFZLEdBRE4sQ0FDVztBQUNqQjtBQUNEO0FBRUQsQ0FoQ0Q7O0FBa0NBdFosV0FBVyxDQUFDOEgsU0FBWixDQUFzQm1RLHVCQUF0QixHQUFnRCxZQUFXO0FBQzFEO0FBRUEsTUFBSXZMLElBQUksR0FBRyxJQUFYLENBSDBELENBSzFEO0FBQ0E7QUFDQTs7QUFFQSxNQUFJNk0sYUFBYSxHQUFHN00sSUFBSSxDQUFDMUssSUFBTCxDQUFVc0QsS0FBVixDQUFnQmtVLGlCQUFoQixDQUFrQzlNLElBQUksQ0FBQ3NDLFFBQXZDLENBQXBCO0FBQ0F0QyxNQUFJLENBQUNpQyxxQkFBTCxHQUE2QjRLLGFBQWEsR0FBRzdNLElBQUksQ0FBQ2dDLHFCQUFMLENBQTJCaEMsSUFBSSxDQUFDc0MsUUFBaEMsSUFBNEN1SyxhQUEvQyxHQUErRCxDQUF6RztBQUNBN00sTUFBSSxDQUFDaUMscUJBQUwsR0FBNkJqQyxJQUFJLENBQUNpQyxxQkFBTCxHQUE2QixFQUExRDtBQUdBLENBZEQ7O0FBZ0JBM08sV0FBVyxDQUFDOEgsU0FBWixDQUFzQjJSLGdCQUF0QixHQUF5QyxZQUFXO0FBQ25EO0FBRUEsTUFBSS9NLElBQUksR0FBRyxJQUFYO0FBRUExSSxJQUFFLENBQUNDLFNBQUgsQ0FBYSxjQUFiLEVBQTZCdEMsVUFBN0IsR0FBMENDLFFBQTFDLENBQW1ELENBQW5EO0FBRUE4SyxNQUFJLENBQUN4QixJQUFMLENBQ0U1RyxPQURGLENBQ1UsUUFEVixFQUNvQixLQURwQixFQUVFa0wsSUFGRixDQUVPLEdBRlAsRUFFWSxVQUFTbFAsQ0FBVCxFQUFZO0FBQ3RCLFdBQU9BLENBQUMsQ0FBQ3VQLE1BQVQ7QUFDQSxHQUpGLEVBS0V6RSxJQUxGLENBS08sVUFBUzlLLENBQVQsRUFBWTtBQUNqQixRQUFJb00sSUFBSSxDQUFDek0sUUFBTCxLQUFrQixJQUF0QixFQUE0QjtBQUMzQnlNLFVBQUksQ0FBQ3JNLFNBQUwsQ0FBZUMsQ0FBZjtBQUNBO0FBQ0QsR0FURjtBQVdBb00sTUFBSSxDQUFDTSxJQUFMLENBQ0UxSSxPQURGLENBQ1UsUUFEVixFQUNvQixLQURwQixFQUVFQSxPQUZGLENBRVUsU0FGVixFQUVxQixJQUZyQixFQUdFbUwsS0FIRixDQUdRLFlBSFIsRUFHc0IsU0FIdEIsRUFJRUQsSUFKRixDQUlPLElBSlAsRUFJYSxVQUFTbFAsQ0FBVCxFQUFZO0FBQUUsV0FBT0EsQ0FBQyxDQUFDZ1EsTUFBRixDQUFTclAsQ0FBaEI7QUFBb0IsR0FKL0MsRUFLRXVPLElBTEYsQ0FLTyxJQUxQLEVBS2EsVUFBU2xQLENBQVQsRUFBWTtBQUFFLFdBQU9BLENBQUMsQ0FBQ2dRLE1BQUYsQ0FBU3pQLENBQWhCO0FBQW9CLEdBTC9DLEVBTUV1SyxJQU5GLENBTU8sVUFBUzlLLENBQVQsRUFBWTtBQUFFQSxLQUFDLENBQUN1WSxZQUFGLEdBQWlCLEtBQWpCO0FBQXlCLEdBTjlDO0FBUUFuTSxNQUFJLENBQUNtQyxhQUFMLEdBQXFCbkMsSUFBSSxDQUFDMUssSUFBTCxDQUFVd0QsS0FBVixDQUFnQmtELE1BQWhCLEdBQXVCLENBQTVDO0FBQ0FnRSxNQUFJLENBQUNzQyxRQUFMLEdBQWdCdEMsSUFBSSxDQUFDMUssSUFBTCxDQUFVc0QsS0FBVixDQUFnQnVCLFNBQWhCLENBQTBCLENBQTFCLENBQWhCO0FBQ0E2RixNQUFJLENBQUNVLGVBQUwsQ0FBcUJqQixJQUFyQixDQUEwQk8sSUFBSSxDQUFDc0MsUUFBL0I7QUFDQW5QLEdBQUMsQ0FBQ3VCLEtBQUYsQ0FBUXVXLE9BQVIsQ0FBZ0I7QUFDZkMsUUFBSSxFQUFFO0FBRFMsR0FBaEI7QUFJQWxMLE1BQUksQ0FBQ29MLGVBQUw7QUFFQTtBQUNBLENBcENEOztBQTBDQSxJQUFJbFksV0FBVyxHQUFHQSxXQUFXLElBQUksRUFBakM7O0FBRUFBLFdBQVcsQ0FBQzhaLFlBQVosR0FBNEIsVUFBU0MsUUFBVCxFQUFtQjtBQUM5QyxXQUFTQyxvQkFBVCxDQUE4QnRVLEtBQTlCLEVBQXFDO0FBQ3BDLFNBQUt5QixDQUFDLEdBQUMsQ0FBUCxFQUFVQSxDQUFDLEdBQUN6QixLQUFLLENBQUNFLEtBQU4sQ0FBWWtELE1BQXhCLEVBQWdDM0IsQ0FBQyxFQUFqQyxFQUFxQztBQUNwQ3pCLFdBQUssQ0FBQ0UsS0FBTixDQUFZdUIsQ0FBWixFQUFlOFMsTUFBZixHQUF3QjlTLENBQXhCO0FBQ0E7O0FBQ0QsUUFBSStTLFFBQVEsR0FBRyxFQUFmLENBSm9DLENBS3BDOztBQUNBLFFBQUlDLFdBQVcsR0FBRyxDQUFDLE9BQUQsRUFBVSxVQUFWLEVBQXNCLFlBQXRCLENBQWxCOztBQUNBLFNBQUtoVCxDQUFDLEdBQUMsQ0FBUCxFQUFVQSxDQUFDLEdBQUNnVCxXQUFXLENBQUNyUixNQUF4QixFQUFnQzNCLENBQUMsRUFBakMsRUFBcUM7QUFDcEMsVUFBSWlULElBQUksR0FBR0QsV0FBVyxDQUFDaFQsQ0FBRCxDQUF0Qjs7QUFDQSxVQUFJekIsS0FBSyxDQUFDZ0QsY0FBTixDQUFxQjBSLElBQXJCLENBQUosRUFBZ0M7QUFBRUYsZ0JBQVEsQ0FBQ0UsSUFBRCxDQUFSLEdBQWlCMVUsS0FBSyxDQUFDMFUsSUFBRCxDQUF0QjtBQUErQjtBQUNqRTs7QUFFREYsWUFBUSxDQUFDdFUsS0FBVCxHQUFpQixFQUFqQjtBQUNBc1UsWUFBUSxDQUFDdFUsS0FBVCxDQUFlbkIsSUFBZixDQUFvQmlCLEtBQUssQ0FBQ0UsS0FBTixDQUFZLENBQVosQ0FBcEI7QUFDQXNVLFlBQVEsQ0FBQ3RVLEtBQVQsQ0FBZSxDQUFmLEVBQWtCdUcsR0FBbEIsR0FBd0IsQ0FBeEIsQ0Fkb0MsQ0FlcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLFFBQUlZLFdBQVcsR0FBRyxFQUFsQixDQXJCb0MsQ0FzQnBDOztBQUNBLFNBQUssSUFBSTVGLENBQUMsR0FBQyxDQUFYLEVBQWNBLENBQUMsR0FBQ3pCLEtBQUssQ0FBQ0UsS0FBTixDQUFZa0QsTUFBNUIsRUFBb0MzQixDQUFDLEVBQXJDLEVBQXlDO0FBQ3hDO0FBQ0EsVUFBSXpCLEtBQUssQ0FBQ0UsS0FBTixDQUFZdUIsQ0FBWixFQUFlVyxJQUFmLEdBQW9CLENBQXBCLElBQXlCcEMsS0FBSyxDQUFDRSxLQUFOLENBQVl1QixDQUFaLEVBQWUyRSxLQUFmLElBQXdCLEVBQXJELEVBQXlEO0FBQ3hEaUIsbUJBQVcsQ0FBQ3RJLElBQVosQ0FBaUJpQixLQUFLLENBQUNFLEtBQU4sQ0FBWXVCLENBQVosQ0FBakI7QUFDQTtBQUNELEtBNUJtQyxDQTZCcEM7OztBQUNBL0MsTUFBRSxDQUFDaVcsT0FBSCxDQUFXdE4sV0FBWCxFQTlCb0MsQ0ErQnBDO0FBQ0E7O0FBQ0FBLGVBQVcsQ0FBQy9CLElBQVosQ0FBaUIsVUFBU0MsQ0FBVCxFQUFXQyxDQUFYLEVBQWM7QUFBRSxhQUFPOUcsRUFBRSxDQUFDK0csVUFBSCxDQUFjRixDQUFDLENBQUNqRCxFQUFoQixFQUFvQmtELENBQUMsQ0FBQ2xELEVBQXRCLENBQVA7QUFBbUMsS0FBcEUsRUFqQ29DLENBa0NwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsYUFBU3NTLGVBQVQsQ0FBeUJDLEdBQXpCLEVBQThCO0FBQzdCLFVBQUlDLFdBQVcsR0FBRyxFQUFsQjtBQUNBLFVBQUlDLFVBQVUsR0FBRyxFQUFqQjs7QUFDQSxXQUFLLElBQUl0VCxDQUFDLEdBQUcsQ0FBUixFQUFXMEIsR0FBRyxHQUFHMFIsR0FBRyxDQUFDelIsTUFBMUIsRUFBa0MzQixDQUFDLEdBQUcwQixHQUF0QyxFQUEyQzFCLENBQUMsRUFBNUMsRUFBZ0Q7QUFDL0MsWUFBS29ULEdBQUcsQ0FBQ3BULENBQUQsQ0FBSCxDQUFPeUYsUUFBUCxJQUFtQixDQUF4QixFQUE0QjtBQUMzQjROLHFCQUFXLENBQUMvVixJQUFaLENBQWlCOFYsR0FBRyxDQUFDcFQsQ0FBRCxDQUFwQjtBQUNBLFNBRkQsTUFFTztBQUNOc1Qsb0JBQVUsQ0FBQ2hXLElBQVgsQ0FBZ0I4VixHQUFHLENBQUNwVCxDQUFELENBQW5CO0FBQ0E7QUFDRDs7QUFDRGpHLGFBQU8sQ0FBQ0MsR0FBUixDQUFZb1osR0FBWjtBQUNBLFVBQUlHLE1BQU0sR0FBR0YsV0FBVyxDQUFDRyxNQUFaLENBQW1CRixVQUFuQixDQUFiO0FBQ0F2WixhQUFPLENBQUNDLEdBQVIsQ0FBWXVaLE1BQVo7QUFDQSxhQUFPQSxNQUFQO0FBQ0E7O0FBQ0QzTixlQUFXLEdBQUd1TixlQUFlLENBQUN2TixXQUFELENBQTdCLENBN0RvQyxDQThEcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxRQUFJLE9BQU9nTixRQUFQLElBQW1CLFdBQXZCLEVBQW9DO0FBQ25DLFVBQUlBLFFBQVEsR0FBRyxHQUFmLENBRG1DLENBQ2Q7QUFDckIsS0F4RW1DLENBeUVwQzs7O0FBQ0EsUUFBSWhOLFdBQVcsQ0FBQ2pFLE1BQVosR0FBcUJpUixRQUF6QixFQUFtQztBQUNsQztBQUNBaE4saUJBQVcsR0FBR0EsV0FBVyxDQUFDQyxLQUFaLENBQWtCLENBQWxCLEVBQXFCK00sUUFBckIsQ0FBZDtBQUNBLEtBN0VtQyxDQThFOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ05oTixlQUFXLENBQUMvQixJQUFaLENBQWlCLFVBQVNDLENBQVQsRUFBV0MsQ0FBWCxFQUFjO0FBQzlCLGFBQU85RyxFQUFFLENBQUN3VyxTQUFILENBQWEzUCxDQUFDLENBQUNuRCxJQUFmLEVBQXFCb0QsQ0FBQyxDQUFDcEQsSUFBdkIsS0FBZ0MxRCxFQUFFLENBQUMrRyxVQUFILENBQWNGLENBQUMsQ0FBQ2pELEVBQWhCLEVBQW9Ca0QsQ0FBQyxDQUFDbEQsRUFBdEIsQ0FBdkM7QUFDQSxLQUZELEVBbkZvQyxDQXVGcEM7O0FBQ0EsU0FBS2IsQ0FBQyxHQUFDLENBQVAsRUFBVUEsQ0FBQyxHQUFDNEYsV0FBVyxDQUFDakUsTUFBeEIsRUFBZ0MzQixDQUFDLEVBQWpDLEVBQXFDO0FBQ3BDLFVBQUkrSSxPQUFPLEdBQUduRCxXQUFXLENBQUM1RixDQUFELENBQXpCO0FBQ0ErSSxhQUFPLENBQUMvRCxHQUFSLEdBQWMrTixRQUFRLENBQUN0VSxLQUFULENBQWVrRCxNQUE3QjtBQUNBb1IsY0FBUSxDQUFDdFUsS0FBVCxDQUFlbkIsSUFBZixDQUFvQnlMLE9BQXBCO0FBQ0E7O0FBRURnSyxZQUFRLENBQUNqVSxLQUFULEdBQWlCNFUsZ0JBQWdCLENBQUNYLFFBQVEsQ0FBQ3RVLEtBQVYsRUFBaUJGLEtBQUssQ0FBQ08sS0FBdkIsQ0FBakM7O0FBQ0EsUUFBSSxDQUFDaVUsUUFBUSxDQUFDalUsS0FBVCxDQUFlNkMsTUFBcEIsRUFBNEI7QUFDM0JvUixjQUFRLENBQUNqVSxLQUFULEdBQWlCNlUsc0JBQXNCLENBQUNaLFFBQVEsQ0FBQ3RVLEtBQVYsRUFBaUJGLEtBQUssQ0FBQ08sS0FBdkIsQ0FBdkM7QUFDQTs7QUFFRCxhQUFTNFUsZ0JBQVQsQ0FBMEJqVixLQUExQixFQUFpQ0ssS0FBakMsRUFBd0M7QUFDdkMsVUFBSThVLFFBQVEsR0FBRyxFQUFmOztBQUNBLFdBQUs1VCxDQUFDLEdBQUMsQ0FBUCxFQUFVQSxDQUFDLEdBQUNsQixLQUFLLENBQUM2QyxNQUFsQixFQUEwQjNCLENBQUMsRUFBM0IsRUFBK0I7QUFDOUI7QUFDQTtBQUVBO0FBQ0E7QUFDQSxZQUFJNlQsVUFBVSxHQUFHcFYsS0FBSyxDQUFDdEIsTUFBTixDQUFhLFVBQVM1RCxDQUFULEVBQVk7QUFBRSxpQkFBT0EsQ0FBQyxDQUFDbUwsRUFBRixLQUFTNUYsS0FBSyxDQUFDa0IsQ0FBRCxDQUFMLENBQVN4QyxNQUF6QjtBQUFrQyxTQUE3RCxDQUFqQjtBQUNBLFlBQUlzVyxVQUFVLEdBQUdyVixLQUFLLENBQUN0QixNQUFOLENBQWEsVUFBUzVELENBQVQsRUFBWTtBQUFFLGlCQUFPQSxDQUFDLENBQUNtTCxFQUFGLEtBQVM1RixLQUFLLENBQUNrQixDQUFELENBQUwsQ0FBU3VKLE1BQXpCO0FBQWtDLFNBQTdELENBQWpCOztBQUNBLFlBQUtzSyxVQUFVLENBQUNsUyxNQUFYLEdBQWtCLENBQWxCLElBQXVCbVMsVUFBVSxDQUFDblMsTUFBWCxHQUFrQixDQUE5QyxFQUFrRDtBQUNqRCxjQUFNbVMsVUFBVSxDQUFDLENBQUQsQ0FBVixDQUFjeFAsUUFBZCxLQUEyQixPQUE1QixJQUF5Q3VQLFVBQVUsQ0FBQyxDQUFELENBQVYsQ0FBY2xULElBQWQsR0FBcUJtVCxVQUFVLENBQUMsQ0FBRCxDQUFWLENBQWNuVCxJQUFqRixFQUF5RixDQUN4RjtBQUNBLFdBRkQsTUFFTztBQUNOLGdCQUFJMkksT0FBTyxHQUFHeEssS0FBSyxDQUFDa0IsQ0FBRCxDQUFuQjtBQUNBc0osbUJBQU8sQ0FBQzlMLE1BQVIsR0FBaUJxVyxVQUFVLENBQUMsQ0FBRCxDQUFWLENBQWM3TyxHQUEvQjtBQUNBc0UsbUJBQU8sQ0FBQ0MsTUFBUixHQUFpQnVLLFVBQVUsQ0FBQyxDQUFELENBQVYsQ0FBYzlPLEdBQS9CO0FBQ0E0TyxvQkFBUSxDQUFDdFcsSUFBVCxDQUFjd0IsS0FBSyxDQUFDa0IsQ0FBRCxDQUFuQjtBQUNBO0FBQ0Q7QUFDRDs7QUFDRDRULGNBQVEsQ0FBQzVVLE9BQVQsQ0FBaUIsVUFBU3pGLENBQVQsRUFBWTtBQUM1QixZQUFLLE9BQU9BLENBQUMsQ0FBQ2dRLE1BQVQsSUFBbUIsUUFBeEIsRUFBbUN4UCxPQUFPLENBQUNDLEdBQVIsQ0FBWVQsQ0FBWjtBQUNuQyxPQUZEO0FBSUEsYUFBT3FhLFFBQVA7QUFDQTs7QUFFRCxhQUFTRCxzQkFBVCxDQUFnQ2xWLEtBQWhDLEVBQXVDSyxLQUF2QyxFQUE4QztBQUM3QyxVQUFJOFUsUUFBUSxHQUFHLEVBQWY7O0FBQ0EsV0FBSzVULENBQUMsR0FBQyxDQUFQLEVBQVVBLENBQUMsR0FBQ2xCLEtBQUssQ0FBQzZDLE1BQWxCLEVBQTBCM0IsQ0FBQyxFQUEzQixFQUErQjtBQUM5QixZQUFJNlQsVUFBVSxHQUFHcFYsS0FBSyxDQUFDdEIsTUFBTixDQUFhLFVBQVM1RCxDQUFULEVBQVk7QUFBRSxpQkFBT0EsQ0FBQyxDQUFDdVosTUFBRixLQUFhaFUsS0FBSyxDQUFDa0IsQ0FBRCxDQUFMLENBQVN4QyxNQUE3QjtBQUFzQyxTQUFqRSxDQUFqQjtBQUNBLFlBQUlzVyxVQUFVLEdBQUdyVixLQUFLLENBQUN0QixNQUFOLENBQWEsVUFBUzVELENBQVQsRUFBWTtBQUFFLGlCQUFPQSxDQUFDLENBQUN1WixNQUFGLEtBQWFoVSxLQUFLLENBQUNrQixDQUFELENBQUwsQ0FBU3VKLE1BQTdCO0FBQXNDLFNBQWpFLENBQWpCOztBQUVBLFlBQUtzSyxVQUFVLENBQUNsUyxNQUFYLEdBQWtCLENBQWxCLElBQXVCbVMsVUFBVSxDQUFDblMsTUFBWCxHQUFrQixDQUE5QyxFQUFrRDtBQUNqRCxjQUFNbVMsVUFBVSxDQUFDLENBQUQsQ0FBVixDQUFjeFAsUUFBZCxLQUEyQixPQUE1QixJQUF5Q3VQLFVBQVUsQ0FBQyxDQUFELENBQVYsQ0FBY2xULElBQWQsR0FBcUJtVCxVQUFVLENBQUMsQ0FBRCxDQUFWLENBQWNuVCxJQUFqRixFQUF5RixDQUN4RjtBQUNBLFdBRkQsTUFFTztBQUNOLGdCQUFJMkksT0FBTyxHQUFHeEssS0FBSyxDQUFDa0IsQ0FBRCxDQUFuQjtBQUNBc0osbUJBQU8sQ0FBQzlMLE1BQVIsR0FBaUJxVyxVQUFVLENBQUMsQ0FBRCxDQUFWLENBQWM3TyxHQUEvQjtBQUNBc0UsbUJBQU8sQ0FBQ0MsTUFBUixHQUFpQnVLLFVBQVUsQ0FBQyxDQUFELENBQVYsQ0FBYzlPLEdBQS9CO0FBQ0E0TyxvQkFBUSxDQUFDdFcsSUFBVCxDQUFjd0IsS0FBSyxDQUFDa0IsQ0FBRCxDQUFuQjtBQUNBO0FBQ0Q7QUFDRDs7QUFDRCxhQUFPNFQsUUFBUDtBQUNBOztBQUVELFFBQUk5VCxTQUFTLEdBQUdpVCxRQUFRLENBQUN4VSxLQUFULENBQWV1QixTQUEvQjs7QUFDQSxhQUFTaVUsb0JBQVQsQ0FBOEJ0VixLQUE5QixFQUFxQ3FCLFNBQXJDLEVBQWdEO0FBQy9DLFVBQUlrVSxTQUFTLEdBQUcvVyxFQUFFLENBQUM4UCxJQUFILEdBQ2R6USxHQURjLENBQ1YsVUFBUy9DLENBQVQsRUFBWTtBQUFFLGVBQU9BLENBQUMsQ0FBQ29ILElBQVQ7QUFBZ0IsT0FEcEIsRUFDc0JzVCxRQUR0QixDQUMrQmhYLEVBQUUsQ0FBQ3dXLFNBRGxDLEVBRWR6RyxNQUZjLENBRVAsVUFBU0MsTUFBVCxFQUFpQjtBQUFFLGVBQU9BLE1BQU0sQ0FBQ3RMLE1BQWQ7QUFBdUIsT0FGbkMsRUFHZjtBQUhlLE9BSWR5TyxHQUpjLENBSVYzUixLQUFLLENBQUNvSCxLQUFOLENBQVksQ0FBWixDQUpVLENBQWhCO0FBTUEsVUFBSTRNLGlCQUFpQixHQUFHLEVBQXhCOztBQUNBLFdBQUssSUFBSXpTLENBQUMsR0FBQ0YsU0FBUyxDQUFDLENBQUQsQ0FBcEIsRUFBeUJFLENBQUMsSUFBRUYsU0FBUyxDQUFDLENBQUQsQ0FBckMsRUFBMENFLENBQUMsRUFBM0MsRUFBK0M7QUFDOUMsWUFBSXdTLGFBQWEsR0FBR3dCLFNBQVMsQ0FBQ2hVLENBQUQsQ0FBN0I7O0FBQ0EsWUFBSSxPQUFPd1MsYUFBUCxLQUF5QixXQUE3QixFQUEwQztBQUN6Q0MsMkJBQWlCLENBQUN6UyxDQUFELENBQWpCLEdBQXVCLENBQXZCO0FBQ0EsU0FGRCxNQUVPO0FBQ055UywyQkFBaUIsQ0FBQ3pTLENBQUQsQ0FBakIsR0FBdUJ3UyxhQUF2QjtBQUNBO0FBQ0Q7O0FBQ0QsYUFBT0MsaUJBQVA7QUFDQTs7QUFDRE0sWUFBUSxDQUFDeFUsS0FBVCxDQUFla1UsaUJBQWYsR0FBbUNzQixvQkFBb0IsQ0FBQ2hCLFFBQVEsQ0FBQ3RVLEtBQVYsRUFBaUJxQixTQUFqQixDQUF2RDtBQUdBL0YsV0FBTyxDQUFDQyxHQUFSLENBQVkrWSxRQUFaO0FBQ0EsV0FBT0EsUUFBUDtBQUNBOztBQUVELFNBQU87QUFDTkYsd0JBQW9CLEVBQUVBO0FBRGhCLEdBQVA7QUFHQSxDQWpMMkIsRUFBNUI7O0FBbUxBLElBQUloYSxXQUFXLEdBQUdBLFdBQVcsSUFBSSxFQUFqQzs7QUFFQUEsV0FBVyxDQUFDcWIsY0FBWixHQUE4QixZQUFXO0FBQ3hDO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLFNBQU8sQ0FDTjtBQURNLEdBQVA7QUFHQSxDQTNCNkIsRUFBOUIsQyxDQTRCQTtBQUNBO0FBQ0E7QUFFQTs7O0FBQ0EsU0FBUy9ZLGtCQUFULENBQTRCQyxJQUE1QixFQUFrQ0MsR0FBbEMsRUFBdUM7QUFDdEMsTUFBSSxDQUFDQSxHQUFMLEVBQVVBLEdBQUcsR0FBR0MsTUFBTSxDQUFDQyxRQUFQLENBQWdCQyxJQUF0QjtBQUNWSixNQUFJLEdBQUdBLElBQUksQ0FBQ0ssT0FBTCxDQUFhLFNBQWIsRUFBd0IsTUFBeEIsQ0FBUDtBQUNHLE1BQUlDLEtBQUssR0FBRyxJQUFJQyxNQUFKLENBQVcsU0FBU1AsSUFBVCxHQUFnQixtQkFBM0IsQ0FBWjtBQUFBLE1BQ0ZRLE9BQU8sR0FBR0YsS0FBSyxDQUFDRyxJQUFOLENBQVdSLEdBQVgsQ0FEUjtBQUVILE1BQUksQ0FBQ08sT0FBTCxFQUFjLE9BQU8sSUFBUDtBQUNkLE1BQUksQ0FBQ0EsT0FBTyxDQUFDLENBQUQsQ0FBWixFQUFpQixPQUFPLEVBQVA7QUFDakIsU0FBT0Usa0JBQWtCLENBQUNGLE9BQU8sQ0FBQyxDQUFELENBQVAsQ0FBV0gsT0FBWCxDQUFtQixLQUFuQixFQUEwQixHQUExQixDQUFELENBQXpCO0FBQ0E7O0FBRUQsSUFBSTVDLFdBQVcsR0FBR0EsV0FBVyxJQUFJLEVBQWpDO0FBRUFDLENBQUMsQ0FBRUMsUUFBRixDQUFELENBQWNDLEVBQWQsQ0FBa0IsY0FBbEIsRUFBa0MsWUFBVztBQUM1QyxNQUFJQyxXQUFXLEdBQUdKLFdBQVcsQ0FBQ0ksV0FBOUI7QUFDQSxNQUFJa2IsV0FBVyxHQUFHbGIsV0FBVyxDQUFDZ0MsSUFBWixDQUFpQnNELEtBQWpCLENBQXVCNlYsV0FBekM7O0FBQ0EsTUFBTSxDQUFDRCxXQUFGLElBQW1CLENBQUNoWixrQkFBa0IsQ0FBQyxhQUFELENBQTNDLEVBQThEO0FBQzdEO0FBQ0E7QUFDQTs7QUFDRCxNQUFJa1osZUFBZSxHQUFHdmIsQ0FBQyxDQUFFLE9BQUYsQ0FBdkI7QUFDQXViLGlCQUFlLENBQUNsUCxNQUFoQixDQUF3QnJNLENBQUMsQ0FBRSxTQUFGLENBQUQsQ0FBZXNNLElBQWYsQ0FBb0IsWUFBcEIsRUFBa0N4QyxHQUFsQyxDQUF1QyxTQUF2QyxFQUFrRCxRQUFsRCxDQUF4QjtBQUNBLE1BQUkwUixhQUFhLEdBQUdELGVBQWUsQ0FBQ2xQLE1BQWhCLENBQXdCck0sQ0FBQyxDQUFFLFVBQUYsQ0FBRCxDQUFnQjJQLElBQWhCLENBQXNCLElBQXRCLEVBQTRCLGVBQTVCLENBQXhCLENBQXBCO0FBQ0EzUCxHQUFDLENBQUUsVUFBRixDQUFELENBQWdCeWIsT0FBaEIsQ0FBeUJGLGVBQXpCO0FBQ0F2YixHQUFDLENBQUN1TCxJQUFGLENBQU84UCxXQUFQLEVBQW9CLFVBQVNLLENBQVQsRUFBWXhKLENBQVosRUFBZTtBQUNsQ2xTLEtBQUMsQ0FBRSxnQkFBRixDQUFELENBQXNCcU0sTUFBdEIsQ0FBOEJyTSxDQUFDLENBQUUsVUFBRixDQUFELENBQWdCc00sSUFBaEIsQ0FBcUJvUCxDQUFyQixDQUE5QjtBQUNBdlgsTUFBRSxDQUFDbUgsTUFBSCxDQUFVLFVBQVYsRUFBc0JlLE1BQXRCLENBQTZCLEdBQTdCLEVBQ0VDLElBREYsQ0FDT29QLENBRFAsRUFFRXhiLEVBRkYsQ0FFSyxPQUZMLEVBRWMsWUFBVztBQUFDeWIsa0JBQVksQ0FBQ0QsQ0FBRCxDQUFaO0FBQWlCLEtBRjNDO0FBR0EsR0FMRDtBQU1BMWIsR0FBQyxDQUFFLGdCQUFGLENBQUQsQ0FBc0I0YixHQUF0QixDQUEwQix1QkFBMUI7QUFDQTViLEdBQUMsQ0FBRSxnQkFBRixDQUFELENBQXNCRSxFQUF0QixDQUEwQixRQUExQixFQUFvQyxZQUFXO0FBQUV5YixnQkFBWSxDQUFDM2IsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRNGIsR0FBUixFQUFELENBQVo7QUFBOEIsR0FBL0U7O0FBRUEsV0FBU0QsWUFBVCxDQUFzQkUsVUFBdEIsRUFBa0M7QUFDakMsUUFBSUMsR0FBRyxHQUFHLEdBQVY7QUFDQTNiLGVBQVcsQ0FBQ2dDLElBQVosQ0FBaUJzRCxLQUFqQixDQUF1QjBLLE9BQXZCLEdBQWlDa0wsV0FBVyxDQUFDUSxVQUFELENBQTVDOztBQUNBLFNBQUssSUFBSTNVLENBQUMsR0FBRyxDQUFSLEVBQVcwQixHQUFHLEdBQUd6SSxXQUFXLENBQUMyTSxXQUFaLENBQXdCakUsTUFBOUMsRUFBc0QzQixDQUFDLEdBQUcwQixHQUExRCxFQUErRDFCLENBQUMsRUFBaEUsRUFBb0U7QUFDbkUsVUFBSTRQLFFBQVEsR0FBRzNXLFdBQVcsQ0FBQzJNLFdBQVosQ0FBd0I1RixDQUF4QixDQUFmO0FBQ0E0UCxjQUFRLENBQUNuSyxRQUFULEdBQW9CbUssUUFBUSxDQUFDaUYsVUFBVCxDQUFvQkYsVUFBcEIsQ0FBcEI7QUFDQTs7QUFDRDFiLGVBQVcsQ0FBQ3VQLG1CQUFaO0FBQ0F2TCxNQUFFLENBQUNDLFNBQUgsQ0FBYSxhQUFiLEVBQTRCNFgsTUFBNUI7QUFDQTdiLGVBQVcsQ0FBQzJTLFVBQVo7QUFDQTNPLE1BQUUsQ0FBQ0MsU0FBSCxDQUFhLE9BQWIsRUFDRW1ILElBREYsQ0FDTyxVQUFTOUssQ0FBVCxFQUFZO0FBQ2pCQSxPQUFDLENBQUNtTSxVQUFGLEdBQWV6TSxXQUFXLENBQUNnQyxJQUFaLENBQWlCc0QsS0FBakIsQ0FBdUIwSyxPQUF2QixDQUErQjFQLENBQUMsQ0FBQ2tNLFFBQWpDLENBQWY7O0FBQ0EsV0FBSyxJQUFJekYsQ0FBQyxHQUFDLENBQVgsRUFBY0EsQ0FBQyxHQUFDL0csV0FBVyxDQUFDa04sZ0JBQVosQ0FBNkJ4RSxNQUE3QyxFQUFxRDNCLENBQUMsRUFBdEQsRUFBMEQ7QUFDekQsWUFBSW1KLFVBQVUsR0FBR2xRLFdBQVcsQ0FBQ2tOLGdCQUFaLENBQTZCbkcsQ0FBN0IsRUFBZ0MxRCxHQUFqRDs7QUFDQSxZQUFJNk0sVUFBVSxJQUFFNVAsQ0FBQyxDQUFDa00sUUFBbEIsRUFBNEI7QUFDM0I7QUFDQSxjQUFJMkQsU0FBUyxHQUFHblEsV0FBVyxDQUFDa04sZ0JBQVosQ0FBNkJuRyxDQUE3QixFQUFnQzRJLEtBQWhEO0FBQ0FyUCxXQUFDLENBQUNxUCxLQUFGLEdBQVVRLFNBQVY7QUFDQTtBQUNEO0FBQ0QsS0FYRixFQVlFeE8sVUFaRixHQVllQyxRQVpmLENBWXdCK1osR0FaeEIsRUFhRW5NLElBYkYsQ0FhTyxNQWJQLEVBYWUsT0FiZixFQWNFcEUsSUFkRixDQWNPLEtBZFAsRUFjYyxZQUFXO0FBQ3ZCcEgsUUFBRSxDQUFDbUgsTUFBSCxDQUFVLElBQVYsRUFDRXhKLFVBREYsR0FDZUMsUUFEZixDQUN3QitaLEdBRHhCLEVBRUVuTSxJQUZGLENBRU8sTUFGUCxFQUVlLFVBQVNsUCxDQUFULEVBQVk7QUFDekI7QUFDQSxlQUFPQSxDQUFDLENBQUNxUCxLQUFUO0FBQ0EsT0FMRjtBQU1BLEtBckJGO0FBc0JBM0wsTUFBRSxDQUFDckMsVUFBSCxHQUFnQkMsUUFBaEIsQ0FBeUIrWixHQUFHLEdBQUMsQ0FBN0IsRUFBZ0N2USxJQUFoQyxDQUFxQyxLQUFyQyxFQUE0QyxZQUFXO0FBQ3REcEwsaUJBQVcsQ0FBQ3laLGdCQUFaO0FBQ0EsS0FGRDtBQUdBO0FBQ0QsQ0F4REQ7O0FBMkRBLFNBQVNxQyxlQUFULENBQXlCOVosSUFBekIsRUFBK0I7QUFDOUIsTUFBSTBLLElBQUksR0FBRyxJQUFYO0FBQ0FBLE1BQUksQ0FBQzFLLElBQUwsR0FBWUEsSUFBSSxDQUFDbUYsTUFBakI7QUFDQXVGLE1BQUksQ0FBQ2pILFNBQUwsR0FBaUJ6RCxJQUFJLENBQUN5RCxTQUF0QjtBQUNBaUgsTUFBSSxDQUFDcVAsV0FBTCxHQUFtQi9aLElBQUksQ0FBQzJELE9BQXhCLENBSjhCLENBSzlCO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBQ0ErRyxNQUFJLENBQUNzUCxtQkFBTCxDQXJCOEIsQ0FxQkg7O0FBRTNCdFAsTUFBSSxDQUFDMUgsV0FBTCxDQXZCOEIsQ0F3QjlCO0FBQ0c7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFFSDBILE1BQUksQ0FBQ3pMLENBQUw7QUFDQXlMLE1BQUksQ0FBQzdMLENBQUw7QUFDQTZMLE1BQUksQ0FBQ3VQLFFBQUw7QUFDR3ZQLE1BQUksQ0FBQ0ssR0FBTDtBQUNBTCxNQUFJLENBQUN3UCxPQUFMO0FBQ0h4UCxNQUFJLENBQUM4SyxLQUFMO0FBQ0c5SyxNQUFJLENBQUN5UCxRQUFMO0FBQ0F6UCxNQUFJLENBQUMwUCxpQkFBTDtBQUNIMVAsTUFBSSxDQUFDMlAsUUFBTDtBQUNBM1AsTUFBSSxDQUFDNFAsZUFBTCxHQUF1QixFQUF2QjtBQUNHNVAsTUFBSSxDQUFDNlAsS0FBTDtBQUNBN1AsTUFBSSxDQUFDOFAsS0FBTDtBQUNBOVAsTUFBSSxDQUFDK1AsSUFBTCxDQS9DMkIsQ0ErQ2Y7O0FBQ1ovUCxNQUFJLENBQUNnUSxJQUFMLENBaEQyQixDQWdEZjs7QUFDZmhRLE1BQUksQ0FBQ2lRLFNBQUwsQ0FqRDhCLENBaURiOztBQUNqQmpRLE1BQUksQ0FBQ2tRLFNBQUwsQ0FsRDhCLENBa0RiOztBQUNqQmxRLE1BQUksQ0FBQ21RLGNBQUw7QUFFQW5RLE1BQUksQ0FBQytCLGNBQUw7QUFDQS9CLE1BQUksQ0FBQ3NDLFFBQUw7QUFDQXRDLE1BQUksQ0FBQ2dDLHFCQUFMO0FBQ0FoQyxNQUFJLENBQUM3RixTQUFMLEdBQWlCN0MsRUFBRSxDQUFDK0osTUFBSCxDQUFVckIsSUFBSSxDQUFDMUssSUFBZixFQUFxQixVQUFTMUIsQ0FBVCxFQUFZO0FBQUUsV0FBT0EsQ0FBQyxDQUFDMEcsSUFBVDtBQUFnQixHQUFuRCxDQUFqQixDQXhEOEIsQ0F5RDlCO0FBQ0E7QUFDQTs7QUFDQTBGLE1BQUksQ0FBQzdGLFNBQUwsQ0FBZSxDQUFmLElBQW9CRixJQUFJLENBQUNOLEdBQUwsQ0FBU3FHLElBQUksQ0FBQzdGLFNBQUwsQ0FBZSxDQUFmLENBQVQsRUFBNEIsSUFBNUIsQ0FBcEI7QUFFQTZGLE1BQUksQ0FBQ29RLFdBQUw7O0FBQ0EsTUFBSSxPQUFPcFEsSUFBSSxDQUFDakgsU0FBWixJQUF5QixXQUE3QixFQUEwQztBQUN6Q2lILFFBQUksQ0FBQ29RLFdBQUwsR0FBbUIsQ0FBbkIsQ0FEeUMsQ0FDbEI7QUFDdkI7O0FBQ0QsTUFBSSxPQUFPcFEsSUFBSSxDQUFDcVAsV0FBWixJQUEyQixXQUEvQixFQUE0QztBQUMzQ3JQLFFBQUksQ0FBQ3FQLFdBQUwsR0FBbUJyUCxJQUFJLENBQUNxUCxXQUFMLENBQWlCLENBQWpCLENBQW5CO0FBQ0FyUCxRQUFJLENBQUNvUSxXQUFMLEdBQW1CcFEsSUFBSSxDQUFDcVAsV0FBTCxDQUFpQmdCLGlCQUFwQyxDQUYyQyxDQUczQztBQUNBOztBQUNBclEsUUFBSSxDQUFDakgsU0FBTCxHQUFpQmlILElBQUksQ0FBQ3FQLFdBQUwsQ0FBaUJpQixVQUFsQztBQUNBLEdBeEU2QixDQTBFOUI7OztBQUVBLFNBQU90USxJQUFQO0FBRUE7O0FBRURvUCxlQUFlLENBQUNoVSxTQUFoQixDQUEwQnFILElBQTFCLEdBQWlDLFlBQVc7QUFDM0MsTUFBSXpDLElBQUksR0FBRyxJQUFYO0FBR0FBLE1BQUksQ0FBQytCLGNBQUwsR0FBc0IsTUFBdEI7QUFDQS9CLE1BQUksQ0FBQ3NDLFFBQUwsR0FBZ0J0QyxJQUFJLENBQUM3RixTQUFMLENBQWUsQ0FBZixDQUFoQixDQUwyQyxDQUtQOztBQUVqQzZGLE1BQUksQ0FBQ3pMLENBQUwsR0FBUytDLEVBQUUsQ0FBQ2hELEtBQUgsQ0FBUzZNLE1BQVQsR0FBa0JJLEtBQWxCLENBQXdCLENBQUMsQ0FBRCxFQUFJdkIsSUFBSSxDQUFDc1AsbUJBQUwsQ0FBeUJyYixLQUE3QixDQUF4QixDQUFUO0FBQ0ErTCxNQUFJLENBQUM3TCxDQUFMLEdBQVNtRCxFQUFFLENBQUNoRCxLQUFILENBQVM2TSxNQUFULEdBQWtCSSxLQUFsQixDQUF3QixDQUFDdkIsSUFBSSxDQUFDc1AsbUJBQUwsQ0FBeUJwYixNQUExQixFQUFrQyxDQUFsQyxDQUF4QixDQUFUO0FBRUg4TCxNQUFJLENBQUN1UCxRQUFMLEdBQWdCalksRUFBRSxDQUFDbUgsTUFBSCxDQUFVLFlBQVYsRUFBd0JlLE1BQXhCLENBQStCLEtBQS9CLEVBQ2RzRCxJQURjLENBQ1QsT0FEUyxFQUNBLFVBREEsQ0FBaEI7QUFHQTlDLE1BQUksQ0FBQ0ssR0FBTCxHQUFXTCxJQUFJLENBQUN1UCxRQUFMLENBQWMvUCxNQUFkLENBQXFCLEtBQXJCLEVBQ05zRCxJQURNLENBQ0QsT0FEQyxFQUNROUMsSUFBSSxDQUFDc1AsbUJBQUwsQ0FBeUJyYixLQUF6QixHQUFpQytMLElBQUksQ0FBQ3NQLG1CQUFMLENBQXlCclgsTUFBekIsQ0FBZ0NJLElBQWpFLEdBQXdFMkgsSUFBSSxDQUFDc1AsbUJBQUwsQ0FBeUJyWCxNQUF6QixDQUFnQ0UsS0FEaEgsRUFFTjJLLElBRk0sQ0FFRCxRQUZDLEVBRVM5QyxJQUFJLENBQUNzUCxtQkFBTCxDQUF5QnBiLE1BQXpCLEdBQWtDOEwsSUFBSSxDQUFDc1AsbUJBQUwsQ0FBeUJyWCxNQUF6QixDQUFnQ0MsR0FBbEUsR0FBd0U4SCxJQUFJLENBQUNzUCxtQkFBTCxDQUF5QnJYLE1BQXpCLENBQWdDRyxNQUZqSCxFQUdQO0FBSE8sR0FJTjBLLElBSk0sQ0FJRCxPQUpDLEVBSVEsV0FKUixFQUtOdEQsTUFMTSxDQUtDLEdBTEQsRUFNTnNELElBTk0sQ0FNRCxXQU5DLEVBTVksZUFBZTlDLElBQUksQ0FBQ3NQLG1CQUFMLENBQXlCclgsTUFBekIsQ0FBZ0NJLElBQS9DLEdBQXNELEdBQXRELEdBQTREMkgsSUFBSSxDQUFDc1AsbUJBQUwsQ0FBeUJyWCxNQUF6QixDQUFnQ0MsR0FBNUYsR0FBa0csR0FOOUcsQ0FBWDtBQU9BOEgsTUFBSSxDQUFDd1AsT0FBTCxHQUFleFAsSUFBSSxDQUFDSyxHQUFMLENBQVNiLE1BQVQsQ0FBZ0IsTUFBaEIsQ0FBZixDQXBCMkMsQ0FzQjNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFRzs7QUFDSFEsTUFBSSxDQUFDekwsQ0FBTCxDQUFPNk0sTUFBUCxDQUFjcEIsSUFBSSxDQUFDN0YsU0FBbkIsRUFoQzJDLENBaUMzQztBQUNBO0FBQ0E7O0FBQ0E2RixNQUFJLENBQUM3TCxDQUFMLENBQU9pTixNQUFQLENBQWMsQ0FBQyxDQUFELEVBQUk5SixFQUFFLENBQUMwQyxHQUFILENBQU9nRyxJQUFJLENBQUMxSyxJQUFaLEVBQWtCLFVBQVMxQixDQUFULEVBQVk7QUFBRSxXQUFPQSxDQUFDLENBQUMyRyxLQUFUO0FBQWlCLEdBQWpELENBQUosQ0FBZDtBQUVBeUYsTUFBSSxDQUFDNlAsS0FBTCxHQUFhdlksRUFBRSxDQUFDK0ksR0FBSCxDQUFPa1EsSUFBUCxHQUFjamMsS0FBZCxDQUFvQjBMLElBQUksQ0FBQ3pMLENBQXpCLEVBQ1hpYyxNQURXLENBQ0osUUFESSxFQUVYQyxVQUZXLENBRUFuWixFQUFFLENBQUNvWixNQUFILENBQVUsR0FBVixDQUZBLEVBR1o7QUFIWSxHQUlYQyxLQUpXLENBSUwxVyxJQUFJLENBQUNOLEdBQUwsQ0FBU3FHLElBQUksQ0FBQzFLLElBQUwsQ0FBVTBHLE1BQW5CLEVBQTJCLEVBQTNCLENBSkssQ0FBYjtBQU1BZ0UsTUFBSSxDQUFDOFAsS0FBTCxHQUFheFksRUFBRSxDQUFDK0ksR0FBSCxDQUFPa1EsSUFBUCxHQUFjamMsS0FBZCxDQUFvQjBMLElBQUksQ0FBQzdMLENBQXpCLEVBQ1hxYyxNQURXLENBQ0osTUFESSxFQUVYRyxLQUZXLENBRUwsQ0FGSyxFQUdYQyxRQUhXLENBR0YsQ0FIRSxDQUFiLENBNUMyQyxDQWlEeEM7O0FBQ0E1USxNQUFJLENBQUMrUCxJQUFMLEdBQVl6WSxFQUFFLENBQUMrSSxHQUFILENBQU8wUCxJQUFQLEdBQ2J4YixDQURhLENBQ1gsVUFBU1gsQ0FBVCxFQUFZO0FBQUUsV0FBT29NLElBQUksQ0FBQ3pMLENBQUwsQ0FBT1gsQ0FBQyxDQUFDMEcsSUFBVCxDQUFQO0FBQXdCLEdBRDNCLEVBRWJuRyxDQUZhLENBRVgsVUFBU1AsQ0FBVCxFQUFZO0FBQUUsV0FBT29NLElBQUksQ0FBQzdMLENBQUwsQ0FBT1AsQ0FBQyxDQUFDMkcsS0FBVCxDQUFQO0FBQXlCLEdBRjVCLENBQVosQ0FsRHdDLENBc0R4Qzs7QUFDQXlGLE1BQUksQ0FBQ2dRLElBQUwsR0FBWTFZLEVBQUUsQ0FBQytJLEdBQUgsQ0FBTzJQLElBQVAsR0FDYnpiLENBRGEsQ0FDWCxVQUFTWCxDQUFULEVBQVk7QUFBRSxXQUFPb00sSUFBSSxDQUFDekwsQ0FBTCxDQUFPWCxDQUFDLENBQUMwRyxJQUFULENBQVA7QUFBd0IsR0FEM0IsRUFFYnVXLEVBRmEsQ0FFVjdRLElBQUksQ0FBQ3NQLG1CQUFMLENBQXlCcGIsTUFGZixFQUdic1MsRUFIYSxDQUdWLFVBQVM1UyxDQUFULEVBQVk7QUFBRSxXQUFPb00sSUFBSSxDQUFDN0wsQ0FBTCxDQUFPUCxDQUFDLENBQUMyRyxLQUFULENBQVA7QUFBeUIsR0FIN0IsQ0FBWixDQXZEd0MsQ0E0RDNDOztBQUNHeUYsTUFBSSxDQUFDSyxHQUFMLENBQVNiLE1BQVQsQ0FBZ0IsR0FBaEIsRUFDU3NELElBRFQsQ0FDYyxPQURkLEVBQ3VCLFFBRHZCLEVBRVNBLElBRlQsQ0FFYyxXQUZkLEVBRTJCLGlCQUFpQjlDLElBQUksQ0FBQ3NQLG1CQUFMLENBQXlCcGIsTUFBMUMsR0FBbUQsR0FGOUUsRUFHU08sSUFIVCxDQUdjdUwsSUFBSSxDQUFDNlAsS0FIbkIsRUE3RHdDLENBa0V4QztBQUNBOztBQUNBLE1BQUlpQixVQUFVLEdBQUc5USxJQUFJLENBQUNLLEdBQUwsQ0FBUzVCLE1BQVQsQ0FBZ0IsU0FBaEIsRUFDWmxILFNBRFksQ0FDRixPQURFLEVBRVp1TCxJQUZZLENBRVAsT0FGTyxFQUVDLFVBRkQsRUFHYjtBQUhhLEdBSVpBLElBSlksQ0FJUCxXQUpPLEVBSU0sVUFBU2xQLENBQVQsRUFBWTtBQUFDLFdBQU9BLENBQVA7QUFBVyxHQUo5QixFQUtsQm1QLEtBTGtCLENBS1osV0FMWSxFQUtDLE9BTEQsQ0FBakIsQ0FwRXdDLENBMkV4Qzs7QUFDSCxNQUFJZ08sU0FBUyxHQUFHL1EsSUFBSSxDQUFDSyxHQUFMLENBQVM5SSxTQUFULENBQW1CLFdBQW5CLEVBQ2RpSSxNQURjLENBQ1AsVUFETyxFQUVkc0QsSUFGYyxDQUVULE1BRlMsRUFFRDlDLElBQUksQ0FBQzFILFdBQUwsQ0FBaUIsQ0FBakIsQ0FGQyxFQUdkeUssS0FIYyxDQUdSLFNBSFEsRUFHRyxDQUhILEVBSWRELElBSmMsQ0FJVCxPQUpTLEVBSUEsZUFKQSxFQUtkcEUsSUFMYyxDQUtULFVBQVM5SyxDQUFULEVBQVk7QUFDakIsUUFBSW9kLElBQUksR0FBRyxLQUFLQyxVQUFMLENBQWdCQyxPQUFoQixFQUFYO0FBQ0EsUUFBSXRKLE9BQU8sR0FBR29KLElBQUksQ0FBQy9jLEtBQUwsR0FBVyxDQUF6QjtBQUNBcUQsTUFBRSxDQUFDbUgsTUFBSCxDQUFVLElBQVYsRUFDRXFFLElBREYsQ0FDTyxHQURQLEVBQ1lrTyxJQUFJLENBQUN6YyxDQUFMLEdBQVNxVCxPQURyQixFQUVDOUUsSUFGRCxDQUVNLEdBRk4sRUFFV2tPLElBQUksQ0FBQzdjLENBRmhCLEVBR0MyTyxJQUhELENBR00sT0FITixFQUdla08sSUFBSSxDQUFDL2MsS0FBTCxHQUFhMlQsT0FBTyxHQUFDLENBSHBDLEVBSUM5RSxJQUpELENBSU0sUUFKTixFQUlnQmtPLElBQUksQ0FBQzljLE1BSnJCO0FBS0EsR0FiYyxDQUFoQixDQTVFMkMsQ0EyRjNDOztBQUNBOEwsTUFBSSxDQUFDSyxHQUFMLENBQVNiLE1BQVQsQ0FBZ0IsR0FBaEIsRUFDRXNELElBREYsQ0FDTyxPQURQLEVBQ2dCLFFBRGhCLEVBRUVyTyxJQUZGLENBRU91TCxJQUFJLENBQUM4UCxLQUZaLEVBR0V0USxNQUhGLENBR1MsTUFIVCxFQUlFc0QsSUFKRixDQUlPLFdBSlAsRUFJb0IsYUFKcEIsRUFLRUEsSUFMRixDQUtPLEdBTFAsRUFLWSxDQUFDOUMsSUFBSSxDQUFDc1AsbUJBQUwsQ0FBeUJyWCxNQUF6QixDQUFnQ0ksSUFBakMsR0FBc0MsQ0FBdEMsR0FBMEMsQ0FMdEQsRUFNRXlLLElBTkYsQ0FNTyxHQU5QLEVBTVksRUFBRTlDLElBQUksQ0FBQ3NQLG1CQUFMLENBQXlCcGIsTUFBekIsR0FBa0M4TCxJQUFJLENBQUNzUCxtQkFBTCxDQUF5QnJYLE1BQXpCLENBQWdDQyxHQUFsRSxHQUF3RThILElBQUksQ0FBQ3NQLG1CQUFMLENBQXlCclgsTUFBekIsQ0FBZ0NHLE1BQTFHLElBQWtILENBTjlILEVBT0UwSyxJQVBGLENBT08sT0FQUCxFQU9nQixXQVBoQixFQVFFckQsSUFSRixDQVFPLGVBUlAsRUFTRXFELElBVEYsQ0FTTyxXQVRQLEVBU29CLE1BVHBCLEVBNUYyQyxDQXVHM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBOUMsTUFBSSxDQUFDbVEsY0FBTCxHQUFzQjdZLEVBQUUsQ0FBQ21ILE1BQUgsQ0FBVSxnQkFBVixDQUF0QixDQTVIMkMsQ0E2SDNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUF1QixNQUFJLENBQUNrUSxTQUFMLEdBQWlCbFEsSUFBSSxDQUFDSyxHQUFMLENBQVNiLE1BQVQsQ0FBZ0IsR0FBaEIsRUFDaEI7QUFEZ0IsR0FFZkEsTUFGZSxDQUVSLE1BRlEsRUFHZjJSLEtBSGUsQ0FHVG5SLElBQUksQ0FBQzFLLElBSEksRUFJZndOLElBSmUsQ0FJVixPQUpVLEVBSUQsTUFKQyxFQUtoQjtBQUxnQixHQU1mQyxLQU5lLENBTVQsTUFOUyxFQU1ELHFCQU5DLEVBT2ZELElBUGUsQ0FPVixHQVBVLEVBT0w5QyxJQUFJLENBQUNnUSxJQVBBLENBQWpCO0FBU0FoUSxNQUFJLENBQUNpUSxTQUFMLEdBQWlCalEsSUFBSSxDQUFDSyxHQUFMLENBQVNiLE1BQVQsQ0FBZ0IsR0FBaEIsRUFDaEI7QUFEZ0IsR0FFZkEsTUFGZSxDQUVSLE1BRlEsRUFHZjJSLEtBSGUsQ0FHVG5SLElBQUksQ0FBQzFLLElBSEksRUFJZndOLElBSmUsQ0FJVixPQUpVLEVBSUQsTUFKQyxFQUtoQjtBQUNBO0FBTmdCLEdBT2ZDLEtBUGUsQ0FPVCxRQVBTLEVBT0MsT0FQRCxFQVFmRCxJQVJlLENBUVYsR0FSVSxFQVFMOUMsSUFBSSxDQUFDK1AsSUFSQSxDQUFqQjtBQVVBL1AsTUFBSSxDQUFDMFAsaUJBQUwsR0FBeUIxUCxJQUFJLENBQUNLLEdBQUwsQ0FBU2IsTUFBVCxDQUFnQixVQUFoQixFQUN4QjtBQUR3QixHQUV2QnNELElBRnVCLENBRWxCLE9BRmtCLEVBRVQsbUNBRlMsRUFFNEI7QUFDcEQ7QUFId0IsR0FJdkJBLElBSnVCLENBSWxCLEdBSmtCLEVBSWIsQ0FKYSxFQUt2QkEsSUFMdUIsQ0FLbEIsSUFMa0IsRUFLWjlDLElBQUksQ0FBQ3pMLENBQUwsQ0FBT3lMLElBQUksQ0FBQ3NDLFFBQVosQ0FMWSxFQU12QlEsSUFOdUIsQ0FNbEIsSUFOa0IsRUFNWjlDLElBQUksQ0FBQ3pMLENBQUwsQ0FBT3lMLElBQUksQ0FBQ3NDLFFBQVosQ0FOWSxFQU92QlEsSUFQdUIsQ0FPbEIsSUFQa0IsRUFPWjlDLElBQUksQ0FBQ3NQLG1CQUFMLENBQXlCcGIsTUFQYixFQVF4QjtBQVJ3QixHQVN2QjRPLElBVHVCLENBU2xCLElBVGtCLEVBU1osQ0FUWSxFQVV2QkEsSUFWdUIsQ0FVbEIsY0FWa0IsRUFVRixDQVZFLEVBV3ZCQSxJQVh1QixDQVdsQixRQVhrQixFQVdSLE9BWFEsRUFZdkJBLElBWnVCLENBWWxCLGtCQVprQixFQVlHLE1BWkgsRUFhdkJDLEtBYnVCLENBYWpCLFNBYmlCLEVBYU4sR0FiTSxDQUF6QixDQXRKMkMsQ0FxSzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEvQyxNQUFJLENBQUMyUCxRQUFMLEdBQWdCM1AsSUFBSSxDQUFDSyxHQUFMLENBQVM5SSxTQUFULENBQW1CLFdBQW5CLEVBQ2RqQyxJQURjLENBQ1QwSyxJQUFJLENBQUMxSyxJQURJLEVBRWQrTixLQUZjLEdBRU43RCxNQUZNLENBRUMsVUFGRCxFQUdkc0QsSUFIYyxDQUdULE9BSFMsRUFHQSxpQkFIQSxFQUlkQSxJQUpjLENBSVQsV0FKUyxFQUlJLFVBQVNsUCxDQUFULEVBQVk7QUFBRSxXQUFPQSxDQUFDLENBQUMwRyxJQUFUO0FBQWdCLEdBSmxDLEVBS2R3SSxJQUxjLENBS1QsR0FMUyxFQUtKLFVBQVNsUCxDQUFULEVBQVk7QUFBRSxXQUFPb00sSUFBSSxDQUFDekwsQ0FBTCxDQUFPWCxDQUFDLENBQUMwRyxJQUFULENBQVA7QUFBd0IsR0FMbEMsRUFNZHdJLElBTmMsQ0FNVCxHQU5TLEVBTUosQ0FOSSxFQU9kQSxJQVBjLENBT1QsT0FQUyxFQU9BLFVBQVNsUCxDQUFULEVBQVk7QUFBRSxXQUFPb00sSUFBSSxDQUFDekwsQ0FBTCxDQUFPWCxDQUFDLENBQUMwRyxJQUFGLEdBQU8sQ0FBZCxJQUFpQjBGLElBQUksQ0FBQ3pMLENBQUwsQ0FBT1gsQ0FBQyxDQUFDMEcsSUFBVCxDQUF4QjtBQUF5QyxHQVB2RCxFQVFkd0ksSUFSYyxDQVFULFFBUlMsRUFRQzlDLElBQUksQ0FBQ3NQLG1CQUFMLENBQXlCcGIsTUFSMUIsRUFTZDRPLElBVGMsQ0FTVCxNQVRTLEVBU0Q5QyxJQUFJLENBQUMxSCxXQUFMLENBQWlCLENBQWpCLENBVEMsRUFVZHlLLEtBVmMsQ0FVUixTQVZRLEVBVUcsQ0FWSCxDQUFoQjs7QUFhQSxNQUFJLE9BQU8vQyxJQUFJLENBQUNqSCxTQUFaLElBQXlCLFdBQTdCLEVBQTBDO0FBQ3pDaUgsUUFBSSxDQUFDb1IsZ0JBQUwsQ0FBc0JwUixJQUFJLENBQUNqSCxTQUEzQjtBQUNBO0FBRUQsQ0E1TEQ7O0FBOExBcVcsZUFBZSxDQUFDaFUsU0FBaEIsQ0FBMEIyTCxvQkFBMUIsR0FBaUQsVUFBU0MsT0FBVCxFQUFrQjtBQUNsRSxNQUFJaEgsSUFBSSxHQUFHLElBQVg7QUFFQUEsTUFBSSxDQUFDMUgsV0FBTCxHQUFtQjBPLE9BQU8sQ0FBQzFPLFdBQTNCO0FBRUEwSCxNQUFJLENBQUNzUCxtQkFBTCxHQUEyQnRJLE9BQU8sQ0FBQ2pQLFVBQVIsQ0FBbUJDLFNBQTlDO0FBRUFnSSxNQUFJLENBQUNnQyxxQkFBTCxHQUE2QmdGLE9BQU8sQ0FBQ2hGLHFCQUFyQztBQUVBLENBVEQ7O0FBV0FvTixlQUFlLENBQUNoVSxTQUFoQixDQUEwQmlXLGlCQUExQixHQUE4QyxVQUFTQyxXQUFULEVBQXNCO0FBQ25FLE1BQUl0UixJQUFJLEdBQUcsSUFBWDtBQUNBNUwsU0FBTyxDQUFDQyxHQUFSLENBQVlpZCxXQUFaLEVBRm1FLENBSW5FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBR0EsTUFBSUMsSUFBSSxHQUFHdlIsSUFBSSxDQUFDekwsQ0FBTCxDQUFPeUwsSUFBSSxDQUFDN0YsU0FBTCxDQUFlLENBQWYsQ0FBUCxDQUFYO0FBQ0EsTUFBSWdXLGNBQWMsR0FBR25RLElBQUksQ0FBQ0ssR0FBTCxDQUFTYixNQUFULENBQWdCLGdCQUFoQixFQUNoQnNELElBRGdCLENBQ1gsSUFEVyxFQUNMLGVBREssRUFFaEJBLElBRmdCLENBRVgsZUFGVyxFQUVNLGdCQUZOLEVBR2hCQSxJQUhnQixDQUdYLElBSFcsRUFHTCxDQUhLLEVBR0ZBLElBSEUsQ0FHRyxJQUhILEVBR1M5QyxJQUFJLENBQUN6TCxDQUFMLENBQU95TCxJQUFJLENBQUM3RixTQUFMLENBQWUsQ0FBZixDQUFQLENBSFQsRUFJaEIySSxJQUpnQixDQUlYLElBSlcsRUFJTHlPLElBSkssRUFLaEJ6TyxJQUxnQixDQUtYLElBTFcsRUFLTCxDQUxLLEVBTWhCdkwsU0FOZ0IsQ0FNTixNQU5NLEVBT2hCakMsSUFQZ0IsQ0FPWCxDQUNUO0FBQUNrYyxVQUFNLEVBQUV4UixJQUFJLENBQUN6TCxDQUFMLENBQU95TCxJQUFJLENBQUM3RixTQUFMLENBQWUsQ0FBZixDQUFQLElBQTBCb1gsSUFBbkM7QUFBeUN0TyxTQUFLLEVBQUUzTCxFQUFFLENBQUNtYSxHQUFILENBQU96UixJQUFJLENBQUMxSCxXQUFMLENBQWlCLENBQWpCLENBQVAsRUFBNEJvWixNQUE1QjtBQUFoRCxHQURTLEVBRVQ7QUFBQ0YsVUFBTSxFQUFFeFIsSUFBSSxDQUFDekwsQ0FBTCxDQUFPK2MsV0FBVyxHQUFDLENBQW5CLElBQXNCQyxJQUEvQjtBQUFxQ3RPLFNBQUssRUFBRTNMLEVBQUUsQ0FBQ21hLEdBQUgsQ0FBT3pSLElBQUksQ0FBQzFILFdBQUwsQ0FBaUIsQ0FBakIsQ0FBUCxFQUE0Qm9aLE1BQTVCO0FBQTVDLEdBRlMsRUFHVDtBQUFDRixVQUFNLEVBQUV4UixJQUFJLENBQUN6TCxDQUFMLENBQU8rYyxXQUFXLEdBQUMsQ0FBbkIsSUFBc0JDLElBQS9CO0FBQXFDdE8sU0FBSyxFQUFFakQsSUFBSSxDQUFDMUgsV0FBTCxDQUFpQixDQUFqQjtBQUE1QyxHQUhTLEVBSVQ7QUFBQ2taLFVBQU0sRUFBRXhSLElBQUksQ0FBQ3pMLENBQUwsQ0FBTytjLFdBQVcsR0FBSXRSLElBQUksQ0FBQ29RLFdBQXBCLEdBQWlDLENBQXhDLElBQTJDbUIsSUFBcEQ7QUFBMER0TyxTQUFLLEVBQUVqRCxJQUFJLENBQUMxSCxXQUFMLENBQWlCLENBQWpCO0FBQWpFLEdBSlMsRUFLVDtBQUFDa1osVUFBTSxFQUFFeFIsSUFBSSxDQUFDekwsQ0FBTCxDQUFPK2MsV0FBVyxHQUFJdFIsSUFBSSxDQUFDb1EsV0FBcEIsR0FBaUMsQ0FBeEMsSUFBMkNtQixJQUFwRDtBQUEwRHRPLFNBQUssRUFBRWpELElBQUksQ0FBQzFILFdBQUwsQ0FBaUIsQ0FBakI7QUFBakUsR0FMUyxFQU1UO0FBQUNrWixVQUFNLEVBQUUsQ0FBVDtBQUFZdk8sU0FBSyxFQUFFakQsSUFBSSxDQUFDMUgsV0FBTCxDQUFpQixDQUFqQjtBQUFuQixHQU5TLENBUFcsRUFlaEIrSyxLQWZnQixHQWVSN0QsTUFmUSxDQWVELE1BZkMsRUFnQmhCc0QsSUFoQmdCLENBZ0JYLFFBaEJXLEVBZ0JELFVBQVNsUCxDQUFULEVBQVk7QUFBRSxXQUFPQSxDQUFDLENBQUM0ZCxNQUFUO0FBQWtCLEdBaEIvQixFQWlCaEIxTyxJQWpCZ0IsQ0FpQlgsWUFqQlcsRUFpQkcsVUFBU2xQLENBQVQsRUFBWTtBQUFFLFdBQU9BLENBQUMsQ0FBQ3FQLEtBQVQ7QUFBaUIsR0FqQmxDLENBQXJCO0FBbUJBLFNBQU9rTixjQUFQO0FBRUEsQ0FyQ0Q7O0FBdUNBZixlQUFlLENBQUNoVSxTQUFoQixDQUEwQmdXLGdCQUExQixHQUE2QyxVQUFTRSxXQUFULEVBQXNCO0FBQ2xFLE1BQUl0UixJQUFJLEdBQUcsSUFBWCxDQURrRSxDQUdsRTs7QUFHQUEsTUFBSSxDQUFDSyxHQUFMLENBQVNiLE1BQVQsQ0FBZ0IsVUFBaEIsRUFDRXNELElBREYsQ0FDTyxPQURQLEVBQ2dCLDZDQURoQixFQUVFQSxJQUZGLENBRU8sSUFGUCxFQUVhOUMsSUFBSSxDQUFDekwsQ0FBTCxDQUFPK2MsV0FBUCxDQUZiLEVBR0V4TyxJQUhGLENBR08sSUFIUCxFQUdhOUMsSUFBSSxDQUFDekwsQ0FBTCxDQUFPK2MsV0FBUCxDQUhiLEVBSUV4TyxJQUpGLENBSU8sSUFKUCxFQUlhOUMsSUFBSSxDQUFDc1AsbUJBQUwsQ0FBeUJwYixNQUp0QyxFQUtFNE8sSUFMRixDQUtPLElBTFAsRUFLYSxDQUxiLEVBTUVBLElBTkYsQ0FNTyxjQU5QLEVBTXVCLENBTnZCLEVBT0VBLElBUEYsQ0FPTyxRQVBQLEVBT2lCOUMsSUFBSSxDQUFDMUgsV0FBTCxDQUFpQixDQUFqQixDQVBqQixFQVFFeUssS0FSRixDQVFRLGtCQVJSLEVBUTZCLE1BUjdCLEVBU0VBLEtBVEYsQ0FTUSxTQVRSLEVBU21CLEVBVG5CO0FBVUEvQyxNQUFJLENBQUNLLEdBQUwsQ0FBU2IsTUFBVCxDQUFnQixVQUFoQixFQUNFc0QsSUFERixDQUNPLE9BRFAsRUFDZ0IsMkNBRGhCLEVBRUVBLElBRkYsQ0FFTyxJQUZQLEVBRWE5QyxJQUFJLENBQUN6TCxDQUFMLENBQU8rYyxXQUFXLEdBQUd0UixJQUFJLENBQUNvUSxXQUExQixDQUZiLEVBR0V0TixJQUhGLENBR08sSUFIUCxFQUdhOUMsSUFBSSxDQUFDekwsQ0FBTCxDQUFPK2MsV0FBVyxHQUFHdFIsSUFBSSxDQUFDb1EsV0FBMUIsQ0FIYixFQUlFdE4sSUFKRixDQUlPLElBSlAsRUFJYTlDLElBQUksQ0FBQ3NQLG1CQUFMLENBQXlCcGIsTUFKdEMsRUFLRTRPLElBTEYsQ0FLTyxJQUxQLEVBS2EsQ0FMYixFQU1FQSxJQU5GLENBTU8sY0FOUCxFQU11QixDQU52QixFQU9FQSxJQVBGLENBT08sUUFQUCxFQU9pQjlDLElBQUksQ0FBQzFILFdBQUwsQ0FBaUIsQ0FBakIsQ0FQakIsRUFRRXlLLEtBUkYsQ0FRUSxrQkFSUixFQVE2QixNQVI3QixFQVNFQSxLQVRGLENBU1EsU0FUUixFQVNtQixFQVRuQjtBQVVBLENBMUJEOztBQTRCQXFNLGVBQWUsQ0FBQ2hVLFNBQWhCLENBQTBCdVcsb0JBQTFCLEdBQWlELFVBQVM1UCxjQUFULEVBQXlCO0FBQ3pFLE1BQUkvQixJQUFJLEdBQUcsSUFBWDtBQUVBQSxNQUFJLENBQUMrQixjQUFMLEdBQXNCQSxjQUF0QjtBQUNBM04sU0FBTyxDQUFDQyxHQUFSLENBQVkyTCxJQUFJLENBQUMrQixjQUFqQjs7QUFDQSxXQUFTNlAsV0FBVCxHQUF1QjtBQUN0QixRQUFJQyxXQUFXLEdBQUc3UixJQUFJLENBQUMwUCxpQkFBTCxDQUF1QjVNLElBQXZCLENBQTRCLEdBQTVCLENBQWxCO0FBQ0E5QyxRQUFJLENBQUMwUCxpQkFBTCxDQUNFNU0sSUFERixDQUNPLFlBRFAsRUFDcUIsU0FEckIsRUFFQztBQUZELEtBR0VsTCxPQUhGLENBR1UsUUFIVixFQUdvQixLQUhwQixFQUlFM0MsVUFKRixHQUtDO0FBTEQsS0FNRUMsUUFORixDQU1XOEssSUFBSSxDQUFDZ0MscUJBQUwsQ0FBMkJoQyxJQUFJLENBQUNzQyxRQUFoQyxDQU5YLEVBT0U4SixJQVBGLENBT08sUUFQUCxFQVFFdEosSUFSRixDQVFPLElBUlAsRUFRYTlDLElBQUksQ0FBQ3pMLENBQUwsQ0FBT3lMLElBQUksQ0FBQ3NDLFFBQVosQ0FSYixFQVNFUSxJQVRGLENBU08sSUFUUCxFQVNhOUMsSUFBSSxDQUFDekwsQ0FBTCxDQUFPeUwsSUFBSSxDQUFDc0MsUUFBWixDQVRiLEVBVUM7QUFWRCxLQVdFUSxJQVhGLENBV08sWUFYUCxFQVdxQixTQVhyQixFQVlFQSxJQVpGLENBWU8sR0FaUCxFQVlZLENBWlosRUFhRXBFLElBYkYsQ0FhTyxLQWJQLEVBYWMsWUFBVztBQUN2QnBILFFBQUUsQ0FBQ21ILE1BQUgsQ0FBVSxJQUFWLEVBQWdCcUUsSUFBaEIsQ0FBcUIsR0FBckIsRUFBMEIsQ0FBMUI7QUFDQTlDLFVBQUksQ0FBQ3NDLFFBQUwsR0FGdUIsQ0FHdkI7QUFDQSxLQWpCRixFQUZzQixDQW9CdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNELE1BQUl0QyxJQUFJLENBQUMrQixjQUFMLEtBQXdCLFNBQTVCLEVBQXVDO0FBQ3RDNlAsZUFBVztBQUNYO0FBQ0QsQ0F4Q0Q7O0FBMENBeEMsZUFBZSxDQUFDaFUsU0FBaEIsQ0FBMEIwVyxXQUExQixHQUF3QyxVQUFTeFAsUUFBVCxFQUFtQjtBQUMxRCxNQUFJdEMsSUFBSSxHQUFHLElBQVg7O0FBQ0EsTUFBSXNDLFFBQVEsSUFBSXRDLElBQUksQ0FBQ3NDLFFBQXJCLEVBQStCO0FBQzlCdEMsUUFBSSxDQUFDc0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQXRDLFFBQUksQ0FBQzBQLGlCQUFMLENBQ0U1TSxJQURGLENBQ08sSUFEUCxFQUNhOUMsSUFBSSxDQUFDekwsQ0FBTCxDQUFPeUwsSUFBSSxDQUFDc0MsUUFBWixDQURiLEVBRUVRLElBRkYsQ0FFTyxJQUZQLEVBRWE5QyxJQUFJLENBQUN6TCxDQUFMLENBQU95TCxJQUFJLENBQUNzQyxRQUFaLENBRmI7QUFHQXRDLFFBQUksQ0FBQzJSLG9CQUFMO0FBQ0E7QUFDRCxDQVREOztBQVdBdkMsZUFBZSxDQUFDaFUsU0FBaEIsQ0FBMEIyVyxpQkFBMUIsR0FBOEMsVUFBU3pQLFFBQVQsRUFBbUI7QUFDaEUsTUFBSXRDLElBQUksR0FBRyxJQUFYO0FBRUFBLE1BQUksQ0FBQ3NDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0F0QyxNQUFJLENBQUMwUCxpQkFBTCxDQUNFNU0sSUFERixDQUNPLEdBRFAsRUFDWSxDQURaLEVBRUU3TixVQUZGLEdBR0VDLFFBSEYsQ0FHVzhLLElBQUksQ0FBQ2dDLHFCQUFMLENBQTJCaEMsSUFBSSxDQUFDc0MsUUFBaEMsQ0FIWCxFQUlFOEosSUFKRixDQUlPLFFBSlAsRUFLRXRKLElBTEYsQ0FLTyxJQUxQLEVBS2E5QyxJQUFJLENBQUN6TCxDQUFMLENBQU95TCxJQUFJLENBQUNzQyxRQUFaLENBTGIsRUFNRVEsSUFORixDQU1PLElBTlAsRUFNYTlDLElBQUksQ0FBQ3pMLENBQUwsQ0FBT3lMLElBQUksQ0FBQ3NDLFFBQVosQ0FOYixFQU9DO0FBQ0E7QUFSRCxHQVNFUSxJQVRGLENBU08sR0FUUCxFQVNZLENBVFosRUFVRXBFLElBVkYsQ0FVTyxLQVZQLEVBVWMsWUFBVztBQUN2QnBILE1BQUUsQ0FBQ21ILE1BQUgsQ0FBVSxJQUFWLEVBQWdCcUUsSUFBaEIsQ0FBcUIsR0FBckIsRUFBMEIsQ0FBMUI7QUFDQSxHQVpGOztBQWFBLFdBQVNrUCxxQkFBVCxHQUFpQztBQUNoQ2hTLFFBQUksQ0FBQ0ssR0FBTCxDQUFTOUksU0FBVCxDQUFtQixXQUFuQixFQUFnQ0EsU0FBaEMsQ0FBMEMsZ0JBQTFDLEVBQ0VDLE1BREYsQ0FDUyxVQUFTNUQsQ0FBVCxFQUFZO0FBQUUsYUFBT0EsQ0FBQyxJQUFJb00sSUFBSSxDQUFDc0MsUUFBakI7QUFBNEIsS0FEbkQsRUFFRVEsSUFGRixDQUVPLE9BRlAsRUFFZ0IsVUFGaEIsRUFHRTdOLFVBSEYsR0FJRUMsUUFKRixDQUlXOEssSUFBSSxDQUFDZ0MscUJBQUwsQ0FBMkJoQyxJQUFJLENBQUNzQyxRQUFoQyxJQUEwQyxDQUpyRCxFQUtFUyxLQUxGLENBS1EsU0FMUixFQUttQixFQUxuQjtBQU1BOztBQUNEL0MsTUFBSSxDQUFDSyxHQUFMLENBQVM5SSxTQUFULENBQW1CLFdBQW5CLEVBQWdDQSxTQUFoQyxDQUEwQyxXQUExQyxFQUNFSyxPQURGLENBQ1UsV0FEVixFQUN1QixLQUR2QixFQUVFM0MsVUFGRixHQUdFQyxRQUhGLENBR1c4SyxJQUFJLENBQUNnQyxxQkFBTCxDQUEyQmhDLElBQUksQ0FBQ3NDLFFBQWhDLElBQTBDLENBSHJELEVBSUVTLEtBSkYsQ0FJUSxTQUpSLEVBSW1CLENBSm5CLEVBekJnRSxDQThCaEU7O0FBRUEvQyxNQUFJLENBQUNLLEdBQUwsQ0FBUzlJLFNBQVQsQ0FBbUIsb0JBQW5CLEVBQ0VLLE9BREYsQ0FDVSxVQURWLEVBQ3NCLEtBRHRCLEVBRUUzQyxVQUZGLEdBR0VDLFFBSEYsQ0FHVzhLLElBQUksQ0FBQ2dDLHFCQUFMLENBQTJCaEMsSUFBSSxDQUFDc0MsUUFBaEMsSUFBMEMsQ0FIckQsRUFJQztBQUpELEdBS0VTLEtBTEYsQ0FLUSxTQUxSLEVBS21CLFVBQVNuUCxDQUFULEVBQVk7QUFDN0IsUUFBSUEsQ0FBQyxDQUFDMEcsSUFBRixHQUFTMEYsSUFBSSxDQUFDc0MsUUFBbEIsRUFBNEI7QUFDM0IsYUFBT3RDLElBQUksQ0FBQzRQLGVBQUwsR0FBcUIsQ0FBNUI7QUFDQSxLQUZELE1BRU87QUFDTixhQUFPLENBQVA7QUFDQTtBQUNELEdBWEY7QUFZQTVQLE1BQUksQ0FBQzJQLFFBQUwsQ0FBY25ZLE1BQWQsQ0FBcUIsVUFBUzVELENBQVQsRUFBWTtBQUFFLFdBQU9BLENBQUMsQ0FBQzBHLElBQUYsSUFBVTBGLElBQUksQ0FBQ3NDLFFBQXRCO0FBQWlDLEdBQXBFLEVBQ0UxSyxPQURGLENBQ1UsVUFEVixFQUNzQixJQUR0QixFQUVFQSxPQUZGLENBRVUsUUFGVixFQUVvQixLQUZwQixFQUdFbUwsS0FIRixDQUdRLFNBSFIsRUFHbUIvQyxJQUFJLENBQUM0UCxlQUFMLEdBQXFCLENBSHhDLEVBSUUzYSxVQUpGLEdBS0VDLFFBTEYsQ0FLVzhLLElBQUksQ0FBQ2dDLHFCQUFMLENBQTJCaEMsSUFBSSxDQUFDc0MsUUFBaEMsSUFBMEMsQ0FMckQsRUFNRVMsS0FORixDQU1RLFNBTlIsRUFNbUIvQyxJQUFJLENBQUM0UCxlQU54QixFQTVDZ0UsQ0FvRGhFO0FBQ0E7O0FBQ0E1UCxNQUFJLENBQUMyUCxRQUFMLENBQWNuWSxNQUFkLENBQXFCLFVBQVM1RCxDQUFULEVBQVk7QUFBRSxXQUFPQSxDQUFDLENBQUMwRyxJQUFGLEdBQVMwRixJQUFJLENBQUNzQyxRQUFyQjtBQUFnQyxHQUFuRSxFQUNFMUssT0FERixDQUNVLFFBRFYsRUFDb0IsS0FEcEIsRUFFRW1MLEtBRkYsQ0FFUSxTQUZSLEVBRW1CL0MsSUFBSSxDQUFDNFAsZUFBTCxHQUFxQixDQUZ4QztBQUdBNVAsTUFBSSxDQUFDMlAsUUFBTCxDQUFjblksTUFBZCxDQUFxQixVQUFTNUQsQ0FBVCxFQUFZO0FBQUUsV0FBT0EsQ0FBQyxDQUFDMEcsSUFBRixHQUFTMEYsSUFBSSxDQUFDc0MsUUFBckI7QUFBZ0MsR0FBbkUsRUFDRVMsS0FERixDQUNRLFNBRFIsRUFDbUIsQ0FEbkI7QUFFQTNPLFNBQU8sQ0FBQ0MsR0FBUixDQUFZMkwsSUFBSSxDQUFDc0MsUUFBakI7QUFFQSxDQTdERDs7QUErREE4TSxlQUFlLENBQUNoVSxTQUFoQixDQUEwQjZXLFFBQTFCLEdBQXFDLFVBQVNuSCxLQUFULEVBQWdCO0FBQ3BELE1BQUk5SyxJQUFJLEdBQUcsSUFBWDtBQUVBQSxNQUFJLENBQUM4SyxLQUFMLEdBQWE5SyxJQUFJLENBQUNLLEdBQUwsQ0FBU2IsTUFBVCxDQUFnQixNQUFoQixFQUNSc0QsSUFEUSxDQUNILE9BREcsRUFDTSxnQkFETixFQUVSQSxJQUZRLENBRUgsR0FGRyxFQUVFOUMsSUFBSSxDQUFDc1AsbUJBQUwsQ0FBeUJyYixLQUF6QixHQUErQixDQUZqQyxFQUdSNk8sSUFIUSxDQUdILEdBSEcsRUFHRSxJQUFLOUMsSUFBSSxDQUFDc1AsbUJBQUwsQ0FBeUJyWCxNQUF6QixDQUFnQ0MsR0FBaEMsR0FBc0MsQ0FIN0MsRUFJUjRLLElBSlEsQ0FJSCxhQUpHLEVBSVksUUFKWixFQUtSckQsSUFMUSxDQUtIcUwsS0FMRyxDQUFiO0FBT0EsQ0FWRDs7QUFXQSxJQUFJNVgsV0FBVyxHQUFHQSxXQUFXLElBQUksRUFBakM7O0FBRUFBLFdBQVcsQ0FBQ2dmLGlCQUFaLEdBQWlDLFlBQVc7QUFFM0MsV0FBU0Msb0JBQVQsQ0FBOEJ2WixLQUE5QixFQUFxQztBQUVwQyxhQUFTTSxVQUFULENBQW9CQyxLQUFwQixFQUEyQjtBQUMxQixVQUFJQyxZQUFZLEdBQUcsRUFBbkI7QUFDQUQsV0FBSyxDQUFDRSxPQUFOLENBQWMsVUFBU3pGLENBQVQsRUFBWTtBQUN6QixZQUFNLE9BQU9BLENBQUMsQ0FBQzBGLFNBQVQsSUFBc0IsV0FBdkIsSUFBd0MxRixDQUFDLENBQUMwRixTQUFGLEtBQWdCLElBQTdELEVBQXFFO0FBQ3BFLGNBQUlDLFVBQVUsR0FBRyxDQUFDM0YsQ0FBQyxDQUFDMkYsVUFBcEI7QUFDQSxjQUFJQyxVQUFVLEdBQUcsQ0FBQzVGLENBQUMsQ0FBQzRGLFVBQXBCOztBQUNBLGNBQU1ELFVBQVUsR0FBRyxDQUFkLElBQXFCQyxVQUFVLEdBQUcsQ0FBbEMsSUFBeUNELFVBQVUsSUFBSUMsVUFBNUQsRUFBMEU7QUFDekVKLHdCQUFZLENBQUN6QixJQUFiLENBQWtCL0QsQ0FBbEI7QUFDQTtBQUNEO0FBQ0QsT0FSRDtBQVNBLGFBQU93RixZQUFQO0FBQ0E7O0FBRUQsYUFBU0ssWUFBVCxDQUFzQk4sS0FBdEIsRUFBNkI7QUFDNUI7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQUlDLFlBQVksR0FBR0YsVUFBVSxDQUFDQyxLQUFELENBQTdCO0FBQ0EsVUFBSU8sT0FBTyxHQUFHcEMsRUFBRSxDQUFDcUMsR0FBSCxDQUFPUCxZQUFQLEVBQXFCLFVBQVN4RixDQUFULEVBQVk7QUFBRSxlQUFPQSxDQUFDLENBQUM0RixVQUFGLEdBQWEsQ0FBYixHQUFpQjVGLENBQUMsQ0FBQzRGLFVBQW5CLEdBQWdDLElBQXZDO0FBQThDLE9BQWpGLENBQWQsQ0FSNEIsQ0FTNUI7O0FBQ0EsVUFBSUksU0FBUyxHQUFHLElBQUlDLElBQUosR0FBV0MsV0FBWCxFQUFoQjtBQUNBLFVBQUlDLE9BQU8sR0FBR3pDLEVBQUUsQ0FBQzBDLEdBQUgsQ0FBT1osWUFBUCxFQUFxQixVQUFTeEYsQ0FBVCxFQUFZO0FBQUUsZUFBT0EsQ0FBQyxDQUFDMkYsVUFBRixJQUFjSyxTQUFkLEdBQTBCaEcsQ0FBQyxDQUFDMkYsVUFBNUIsR0FBeUMsSUFBaEQ7QUFBdUQsT0FBMUYsQ0FBZDtBQUNBLGFBQU8sQ0FBQ0csT0FBRCxFQUFVSyxPQUFWLENBQVA7QUFDQTs7QUFHRCxhQUFTRyxpQkFBVCxDQUEyQkMsU0FBM0IsRUFBc0M7QUFDckMsVUFBSUMsY0FBYyxHQUFHLEVBQXJCOztBQUNBLFdBQUssSUFBSUMsQ0FBQyxHQUFDRixTQUFTLENBQUMsQ0FBRCxDQUFwQixFQUF5QkUsQ0FBQyxJQUFFRixTQUFTLENBQUMsQ0FBRCxDQUFyQyxFQUEwQ0UsQ0FBQyxFQUEzQyxFQUErQztBQUM5Q0Qsc0JBQWMsQ0FBQ3pDLElBQWYsQ0FBb0I7QUFBQzJDLGNBQUksRUFBRUQsQ0FBUDtBQUFVRSxlQUFLLEVBQUU7QUFBakIsU0FBcEI7QUFDQTs7QUFDRCxhQUFPSCxjQUFQO0FBQ0E7O0FBRUQsYUFBU2dZLHdCQUFULENBQWtDeFosS0FBbEMsRUFBeUM7QUFDeEMsVUFBSXlaLHFCQUFxQixHQUFHblksaUJBQWlCLENBQUN0QixLQUFLLENBQUNBLEtBQU4sQ0FBWXVCLFNBQWIsQ0FBN0M7QUFDQSxVQUFJZixZQUFZLEdBQUdGLFVBQVUsQ0FBQ04sS0FBSyxDQUFDTyxLQUFQLENBQTdCO0FBQ0FDLGtCQUFZLENBQUNDLE9BQWIsQ0FBcUIsVUFBU3pGLENBQVQsRUFBWXlHLENBQVosRUFBZTtBQUNuQyxZQUFJSyxjQUFjLEdBQUc5RyxDQUFDLENBQUMyRixVQUF2QjtBQUNBLFlBQUlvQixZQUFZLEdBQUcwWCxxQkFBcUIsQ0FBQzdhLE1BQXRCLENBQTZCLFVBQVNvRCxFQUFULEVBQWE7QUFBRSxpQkFBT0EsRUFBRSxDQUFDTixJQUFILEtBQVVJLGNBQWpCO0FBQWtDLFNBQTlFLEVBQWdGLENBQWhGLENBQW5CO0FBQ0FDLG9CQUFZLENBQUNKLEtBQWI7QUFDQSxPQUpEO0FBTUEsYUFBTzhYLHFCQUFQO0FBQ0E7O0FBRUR6WixTQUFLLENBQUNBLEtBQU4sQ0FBWXVCLFNBQVosR0FBd0JWLFlBQVksQ0FBQ2IsS0FBSyxDQUFDTyxLQUFQLENBQXBDO0FBQ0FQLFNBQUssQ0FBQ0EsS0FBTixDQUFZeVoscUJBQVosR0FBb0NELHdCQUF3QixDQUFDeFosS0FBRCxDQUE1RDtBQUNBLFdBQU9BLEtBQVA7QUFDQTs7QUFFRCxTQUFPO0FBQ051Wix3QkFBb0IsRUFBRUE7QUFEaEIsR0FBUDtBQUdBLENBOURnQyxFQUFqQyxDLENBa0VBOzs7QUFDQSxTQUFTRyxnQkFBVCxDQUEwQkMsUUFBMUIsRUFDQTtBQUNJLE1BQUlDLEtBQUssR0FBRzdjLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQjZjLE1BQWhCLENBQXVCQyxTQUF2QixDQUFpQyxDQUFqQyxDQUFaO0FBQ0EsTUFBSUMsSUFBSSxHQUFHSCxLQUFLLENBQUNoSSxLQUFOLENBQVksR0FBWixDQUFYOztBQUNBLE9BQUssSUFBSW5RLENBQUMsR0FBQyxDQUFYLEVBQWNBLENBQUMsR0FBQ3NZLElBQUksQ0FBQzNXLE1BQXJCLEVBQTZCM0IsQ0FBQyxFQUE5QixFQUFrQztBQUM5QixRQUFJdVksSUFBSSxHQUFHRCxJQUFJLENBQUN0WSxDQUFELENBQUosQ0FBUW1RLEtBQVIsQ0FBYyxHQUFkLENBQVg7O0FBQ0EsUUFBR29JLElBQUksQ0FBQyxDQUFELENBQUosSUFBV0wsUUFBZCxFQUF3QjtBQUFDLGFBQU9LLElBQUksQ0FBQyxDQUFELENBQVg7QUFBZ0I7QUFDNUM7O0FBQ0QsU0FBTyxLQUFQO0FBQ0g7O0FBSUQsSUFBSTFmLFdBQVcsR0FBR0EsV0FBVyxJQUFJLEVBQWpDOztBQUVBQSxXQUFXLENBQUMyZix3QkFBWixHQUFzQyxVQUFTamEsS0FBVCxFQUFnQmthLHlCQUFoQixFQUEyQztBQUNoRjFlLFNBQU8sQ0FBQ0MsR0FBUixDQUFZdUUsS0FBWixFQURnRixDQUVoRjs7QUFDQSxNQUFJb0oscUJBQXFCLEdBQUcsRUFBNUI7QUFDQSxNQUFJK1EsdUJBQXVCLEdBQUcsR0FBOUIsQ0FKZ0YsQ0FLaEY7QUFDQTtBQUNBOztBQUNBLE1BQUlELHlCQUF5QixHQUFHLE9BQU9BLHlCQUFQLEtBQXFDLFdBQXJDLEdBQW1EQSx5QkFBbkQsR0FBK0UsSUFBL0csQ0FSZ0YsQ0FTaEY7QUFDQTs7QUFDQSxNQUFJRSxjQUFjLEdBQUcxYixFQUFFLENBQUNoRCxLQUFILENBQVMyZSxTQUFULEdBQ25CN1IsTUFEbUIsQ0FDWixDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sRUFBUCxFQUFXLEVBQVgsRUFBZSxFQUFmLENBRFksRUFFbkJHLEtBRm1CLENBRWIsQ0FDTHdSLHVCQURLLEVBQ3FCO0FBQzFCRCwyQkFBeUIsR0FBRyxFQUZ2QixFQUU0QjtBQUNqQ0EsMkJBQXlCLEdBQUcsRUFIdkIsRUFHMkI7QUFDaENBLDJCQUF5QixHQUFHLEVBSnZCLEVBSTRCO0FBQ2pDQSwyQkFBeUIsR0FBRyxHQUx2QixFQUs2QjtBQUNsQ0EsMkJBTkssQ0FNc0I7QUFOdEIsR0FGYSxDQUFyQjtBQVVBLE1BQUkzWSxTQUFTLEdBQUd2QixLQUFLLENBQUNBLEtBQU4sQ0FBWXVCLFNBQTVCLENBckJnRixDQXVCaEY7O0FBQ0EsT0FBSyxJQUFJRSxDQUFDLEdBQUNGLFNBQVMsQ0FBQyxDQUFELENBQXBCLEVBQXlCRSxDQUFDLElBQUVGLFNBQVMsQ0FBQyxDQUFELENBQXJDLEVBQTBDRSxDQUFDLEVBQTNDLEVBQStDO0FBQzlDO0FBQ0EySCx5QkFBcUIsQ0FBQzNILENBQUQsQ0FBckIsR0FBMkIyWSxjQUFjLENBQUNwYSxLQUFLLENBQUNBLEtBQU4sQ0FBWWtVLGlCQUFaLENBQThCelMsQ0FBOUIsQ0FBRCxDQUF6QztBQUNBOztBQUNELFNBQU8ySCxxQkFBUDtBQUNBLENBN0JEOztBQStCQTlPLFdBQVcsQ0FBQ2dnQiwwQkFBWixHQUF5QyxZQUFXO0FBQ2hEO0FBQ0E7QUFDQTViLElBQUUsQ0FBQ0MsU0FBSCxDQUFhLFdBQWIsRUFDS2xFLEVBREwsQ0FDUSxPQURSLEVBQ2lCLFVBQVNPLENBQVQsRUFBWTtBQUNyQjtBQUNBLFFBQUl5TyxlQUFlLEdBQUcsS0FBSzhRLFlBQUwsQ0FBa0IsV0FBbEIsQ0FBdEIsQ0FGcUIsQ0FHckI7O0FBQ0E3YixNQUFFLENBQUNDLFNBQUgsQ0FBYSxjQUFiLEVBQTZCdEMsVUFBN0IsR0FBMENDLFFBQTFDLENBQW1ELENBQW5EO0FBRVRoQyxlQUFXLENBQUNJLFdBQVosQ0FBd0JrWixrQkFBeEIsQ0FBMkNuSyxlQUEzQztBQUNNLEdBUkw7QUFTSCxDQVpEOztBQWNBLFNBQVMrUSxJQUFULEdBQWdCO0FBR2hCOWIsSUFBRSxDQUFDbUgsTUFBSCxDQUFVLFVBQVYsRUFBc0JlLE1BQXRCLENBQTZCLEdBQTdCLEVBQ0VzRCxJQURGLENBQ08sT0FEUCxFQUNnQixhQURoQixFQUVFckQsSUFGRixDQUVPLFlBRlA7QUFJQW5JLElBQUUsQ0FBQytiLElBQUgsQ0FBUSx3REFBUixFQUFrRSxVQUFTaEwsS0FBVCxFQUFnQnpQLEtBQWhCLEVBQXVCO0FBQ3hGeEUsV0FBTyxDQUFDQyxHQUFSLENBQVlnVSxLQUFaOztBQUNBLFFBQUlBLEtBQUosRUFBVztBQUNWLFVBQUlpTCxZQUFZLEdBQUcsaUJBQW5CO0FBQ0EsVUFBSUMsT0FBTyxHQUFHLGtOQUFrTkQsWUFBbE4sR0FBaU8sa0NBQS9PO0FBQ0FuZ0IsT0FBQyxDQUFFLGNBQUYsQ0FBRCxDQUFvQmdKLElBQXBCLENBQTBCb1gsT0FBMUIsRUFDRXRXLEdBREYsQ0FDTztBQUFDLGlCQUFTO0FBQVYsT0FEUDtBQUVBLFlBQU1vTCxLQUFOO0FBQ0EsS0FSdUYsQ0FVeEY7OztBQUNBLFFBQUltTCxXQUFXLEdBQUdsYyxFQUFFLENBQUM4UCxJQUFILEdBQ2hCelEsR0FEZ0IsQ0FDWixVQUFTL0MsQ0FBVCxFQUFZO0FBQUUsYUFBT0EsQ0FBQyxDQUFDa00sUUFBVDtBQUFvQixLQUR0QixFQUN3QjJULFVBRHhCLENBQ21DbmMsRUFBRSxDQUFDK0csVUFEdEMsRUFFaEJnSixNQUZnQixDQUVULFVBQVNDLE1BQVQsRUFBaUI7QUFBRSxhQUFPQSxNQUFNLENBQUN0TCxNQUFkO0FBQXVCLEtBRmpDLEVBR2hCdUwsT0FIZ0IsQ0FHUjNPLEtBQUssQ0FBQ0UsS0FBTixDQUFZLENBQVosRUFBZWlDLE1BSFAsQ0FBbEI7QUFJQXlZLGVBQVcsQ0FBQ3RWLElBQVosQ0FBaUIsVUFBU0MsQ0FBVCxFQUFXQyxDQUFYLEVBQWM7QUFBRSxhQUFPOUcsRUFBRSxDQUFDK0csVUFBSCxDQUFjRixDQUFDLENBQUMxRCxNQUFoQixFQUF3QjJELENBQUMsQ0FBQzNELE1BQTFCLENBQVA7QUFBMkMsS0FBNUUsRUFmd0YsQ0FnQnhGOztBQUNBN0IsU0FBSyxDQUFDRSxLQUFOLENBQVksQ0FBWixFQUFlNGEsWUFBZixHQUE4QkYsV0FBOUI7QUFDQXBmLFdBQU8sQ0FBQ0MsR0FBUixDQUFZdUUsS0FBWixFQWxCd0YsQ0FtQnhGOztBQUVBLFFBQUlkLGVBQWUsR0FBRzVFLFdBQVcsQ0FBQzRFLGVBQWxDO0FBQUEsUUFDQ29hLGlCQUFpQixHQUFHaGYsV0FBVyxDQUFDZ2YsaUJBRGpDO0FBQUEsUUFFQ2xGLFlBQVksR0FBRzlaLFdBQVcsQ0FBQzhaLFlBRjVCO0FBQUEsUUFHSXRVLGFBQWEsR0FBR3hGLFdBQVcsQ0FBQ3dGLGFBSGhDO0FBQUEsUUFJQzZWLGNBQWMsR0FBR3JiLFdBQVcsQ0FBQ3FiLGNBSjlCO0FBTUEsUUFBSXZILE9BQU8sR0FBR2xQLGVBQWUsQ0FBQ1csUUFBOUI7QUFDQXJFLFdBQU8sQ0FBQ0MsR0FBUixDQUFZMlMsT0FBWjtBQUVBcE8sU0FBSyxHQUFHc1osaUJBQWlCLENBQUNDLG9CQUFsQixDQUF1Q3ZaLEtBQXZDLENBQVI7QUFDQTFGLGVBQVcsQ0FBQ3lnQixVQUFaLEdBQXlCM0csWUFBWSxDQUFDRSxvQkFBYixDQUFrQ3RVLEtBQWxDLENBQXpCO0FBQ0ExRixlQUFXLENBQUMwZ0IsaUJBQVosR0FBZ0NsYixhQUFhLENBQUNtQyxpQ0FBZCxDQUFnRGpDLEtBQWhELENBQWhDO0FBQ0ExRixlQUFXLENBQUMyZ0Isa0JBQVosR0FBaUNuYixhQUFhLENBQUM4Qix3QkFBZCxDQUF1QzVCLEtBQXZDLENBQWpDO0FBQ0ExRixlQUFXLENBQUM0Z0Isb0JBQVosR0FBbUNwYixhQUFhLENBQUN1QyxnQ0FBZCxDQUErQ3JDLEtBQS9DLENBQW5DLENBbEN3RixDQW9DeEY7O0FBQ0ExRixlQUFXLENBQUNJLFdBQVosR0FBMEIsSUFBSUEsV0FBSixDQUFnQkosV0FBVyxDQUFDeWdCLFVBQTVCLENBQTFCLENBckN3RixDQXNDeEY7QUFDQTtBQUNBOztBQUNBemdCLGVBQVcsQ0FBQzZnQixVQUFaLEdBQXlCLEVBQXpCO0FBQ0E3Z0IsZUFBVyxDQUFDNmdCLFVBQVosQ0FBdUJwYyxJQUF2QixDQUE0QixJQUFJeVgsZUFBSixDQUFvQmxjLFdBQVcsQ0FBQzBnQixpQkFBaEMsQ0FBNUI7QUFDQTFnQixlQUFXLENBQUM2Z0IsVUFBWixDQUF1QnBjLElBQXZCLENBQTRCLElBQUl5WCxlQUFKLENBQW9CbGMsV0FBVyxDQUFDMmdCLGtCQUFoQyxDQUE1QjtBQUNBM2dCLGVBQVcsQ0FBQzZnQixVQUFaLENBQXVCcGMsSUFBdkIsQ0FBNEIsSUFBSXlYLGVBQUosQ0FBb0JsYyxXQUFXLENBQUM0Z0Isb0JBQWhDLENBQTVCO0FBRUE5TSxXQUFPLENBQUNoRixxQkFBUixHQUFnQzlPLFdBQVcsQ0FBQzJmLHdCQUFaLENBQXFDamEsS0FBckMsQ0FBaEM7QUFFQTFGLGVBQVcsQ0FBQ0ksV0FBWixDQUF3QnlULG9CQUF4QixDQUE2Q0MsT0FBN0M7O0FBQ0EsU0FBSyxJQUFJM00sQ0FBQyxHQUFDLENBQVgsRUFBY0EsQ0FBQyxHQUFDbkgsV0FBVyxDQUFDNmdCLFVBQVosQ0FBdUIvWCxNQUF2QyxFQUErQzNCLENBQUMsRUFBaEQsRUFBb0Q7QUFDbkRuSCxpQkFBVyxDQUFDNmdCLFVBQVosQ0FBdUIxWixDQUF2QixFQUEwQjBNLG9CQUExQixDQUErQ0MsT0FBL0M7QUFDQTs7QUFFRDlULGVBQVcsQ0FBQ0ksV0FBWixDQUF3Qm1QLElBQXhCOztBQUNBLFNBQUssSUFBSXBJLENBQUMsR0FBQyxDQUFYLEVBQWNBLENBQUMsR0FBQ25ILFdBQVcsQ0FBQzZnQixVQUFaLENBQXVCL1gsTUFBdkMsRUFBK0MzQixDQUFDLEVBQWhELEVBQW9EO0FBQ25EbkgsaUJBQVcsQ0FBQzZnQixVQUFaLENBQXVCMVosQ0FBdkIsRUFBMEJvSSxJQUExQjtBQUNBOztBQUNEdFAsS0FBQyxDQUFDdUIsS0FBRixDQUFRdVcsT0FBUixDQUFnQjtBQUNmQyxVQUFJLEVBQUU7QUFEUyxLQUFoQjtBQUlBaFksZUFBVyxDQUFDNmdCLFVBQVosQ0FBdUIsQ0FBdkIsRUFBMEI5QixRQUExQixDQUFtQyx3QkFBbkM7QUFDQS9lLGVBQVcsQ0FBQzZnQixVQUFaLENBQXVCLENBQXZCLEVBQTBCOUIsUUFBMUIsQ0FBbUMsOEJBQW5DO0FBQ0EsUUFBSStCLE9BQU8sR0FBRzFCLGdCQUFnQixDQUFDLFNBQUQsQ0FBOUI7O0FBQ0EsUUFBSSxDQUFDMEIsT0FBTCxFQUFjO0FBQ2JBLGFBQU8sR0FBRyxRQUFWO0FBQ0E7O0FBQ0Q1ZixXQUFPLENBQUNDLEdBQVIsQ0FBWTJmLE9BQVosRUFuRXdGLENBb0V4Rjs7QUFDQTlnQixlQUFXLENBQUM2Z0IsVUFBWixDQUF1QixDQUF2QixFQUEwQjlCLFFBQTFCLENBQW1DLGlDQUFpQytCLE9BQWpDLEdBQTJDLHlCQUE5RTtBQUdBN2dCLEtBQUMsQ0FBRUMsUUFBRixDQUFELENBQWNDLEVBQWQsQ0FBa0IsWUFBbEIsRUFBZ0MsWUFBVztBQUMxQyxVQUFJaVAsUUFBUSxHQUFHcFAsV0FBVyxDQUFDSSxXQUFaLENBQXdCZ1AsUUFBdkM7O0FBQ0EsV0FBSyxJQUFJakksQ0FBQyxHQUFDLENBQVgsRUFBY0EsQ0FBQyxHQUFDbkgsV0FBVyxDQUFDNmdCLFVBQVosQ0FBdUIvWCxNQUF2QyxFQUErQzNCLENBQUMsRUFBaEQsRUFBb0Q7QUFDbkRuSCxtQkFBVyxDQUFDNmdCLFVBQVosQ0FBdUIxWixDQUF2QixFQUEwQjBYLGlCQUExQixDQUE0Q3pQLFFBQTVDO0FBQ0E7QUFDRCxLQUxELEVBeEV3RixDQStFeEY7QUFDQTs7QUFDQSxRQUFJMlIsSUFBSSxHQUFHM2MsRUFBRSxDQUFDbUgsTUFBSCxDQUFVdkwsV0FBVyxDQUFDNmdCLFVBQVosQ0FBdUIsQ0FBdkIsRUFBMEJ4RSxRQUExQixDQUFtQyxDQUFuQyxFQUFzQyxDQUF0QyxDQUFWLENBQVg7QUFDQSxRQUFJMkUsYUFBYSxHQUFHRCxJQUFJLENBQUN4VixNQUFMLENBQVksU0FBWixFQUF1QkEsTUFBdkIsQ0FBOEIsWUFBOUIsQ0FBcEI7QUFDQXlWLGlCQUFhLENBQUN6VSxJQUFkLENBQW1CLGtCQUFuQixFQW5Gd0YsQ0FvRnhGO0FBQ0E7O0FBQ0F2TSxlQUFXLENBQUM2Z0IsVUFBWixDQUF1QixDQUF2QixFQUEwQmpFLEtBQTFCLENBQWdDVyxVQUFoQyxDQUEyQ25aLEVBQUUsQ0FBQ29aLE1BQUgsQ0FBVSxHQUFWLENBQTNDLEVBdEZ3RixDQXVGeEY7O0FBQ0EsUUFBSXlELE9BQU8sR0FBRzdjLEVBQUUsQ0FBQ21ILE1BQUgsQ0FBVXZMLFdBQVcsQ0FBQzZnQixVQUFaLENBQXVCLENBQXZCLEVBQTBCeEUsUUFBMUIsQ0FBbUMsQ0FBbkMsRUFBc0MsQ0FBdEMsQ0FBVixDQUFkO0FBQ0E0RSxXQUFPLENBQUMxVixNQUFSLENBQWUsU0FBZixFQUNDO0FBREQsS0FFRWhLLElBRkYsQ0FFT3ZCLFdBQVcsQ0FBQzZnQixVQUFaLENBQXVCLENBQXZCLEVBQTBCakUsS0FGakMsRUFHRXJSLE1BSEYsQ0FHUyxZQUhULEVBR3VCZ0IsSUFIdkIsQ0FHNEIsb0JBSDVCLEVBekZ3RixDQStGeEY7QUFDQTs7QUFDQXZNLGVBQVcsQ0FBQ2dnQiwwQkFBWjtBQUVBNWIsTUFBRSxDQUFDbUgsTUFBSCxDQUFVLGNBQVYsRUFBMEIwUSxNQUExQjtBQUNBLEdBcEdELEVBUGdCLENBNEdoQjtBQUNDLEMsQ0FFRDs7Ozs7Ozs7Ozs7Ozs7O0FDbGpHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEiLCJmaWxlIjoibmF1dGlsdXNfdmlzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJuYXV0aWx1c192aXNcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wibmF1dGlsdXNfdmlzXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIm5hdXRpbHVzX3Zpc1wiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsInZhciBjaXRhdGlvblZpcyA9IGNpdGF0aW9uVmlzIHx8IHt9O1xuXG4kKCBkb2N1bWVudCApLm9uKCBcImluaXRDb21wbGV0ZVwiLCBmdW5jdGlvbigpIHtcblx0dmFyIGVnb0dyYXBoVmlzID0gY2l0YXRpb25WaXMuZWdvR3JhcGhWaXM7XG5cdGlmIChlZ29HcmFwaFZpcy56b29tYWJsZSA9PSBmYWxzZSkge1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgem9vbSA9IGVnb0dyYXBoVmlzLnpvb207XG5cdGVnb0dyYXBoVmlzLnpvb21UcmFuc2xhdGUgPSB6b29tLnRyYW5zbGF0ZSgpO1xuXG5cdGVnb0dyYXBoVmlzLmNoZWNrWm9vbSA9IGZ1bmN0aW9uKGQpIHtcblx0XHR2YXIgem9vbVRocmVzaG9sZE1pbiA9IGNvb3JkaW5hdGVzKFswLCAwXSlbMV07ICAvLyBtaW5pbXVtIHkgdmFsdWVcblx0XHR2YXIgem9vbVRocmVzaG9sZE1heCA9IGNvb3JkaW5hdGVzKFtlZ29HcmFwaFZpcy5ncmFwaERpbWVuc2lvbnMud2lkdGgsIGVnb0dyYXBoVmlzLmdyYXBoRGltZW5zaW9ucy5oZWlnaHRdKVsxXTsgIC8vIG1heGltdW0geSB2YWx1ZVxuXHRcdGlmIChkLnkgPCB6b29tVGhyZXNob2xkTWluIHx8IGQueSA+IHpvb21UaHJlc2hvbGRNYXgpIHtcblx0XHRcdGNvbnNvbGUubG9nKHpvb20udHJhbnNsYXRlKCkpO1xuXHRcdFx0Y29uc29sZS5sb2coem9vbS5zY2FsZSgpKTtcblx0XHRcdGNvbnNvbGUubG9nKGNvb3JkaW5hdGVzKFtkLngsIGQueV0pKTtcblx0Y29uc29sZS5sb2coY29vcmRpbmF0ZXMoW2Vnb0dyYXBoVmlzLmdyYXBoRGltZW5zaW9ucy53aWR0aCwgZWdvR3JhcGhWaXMuZ3JhcGhEaW1lbnNpb25zLmhlaWdodF0pKTtcblx0Y29uc29sZS5sb2coY29vcmRpbmF0ZXMoWzAsMF0pKTtcblx0XHRcdC8vIGh0dHA6Ly9ibC5vY2tzLm9yZy9tYm9zdG9jay83ZWM5NzdjOTU5MTBkZDAyNjgxMlxuXHRcdFx0ZWdvR3JhcGhWaXMuZ3JvdXAuY2FsbCh6b29tLmV2ZW50KTtcblxuXHRcdFx0Ly8gUmVjb3JkIHRoZSBjb29yZGluYXRlcyAoaW4gZGF0YSBzcGFjZSkgb2YgdGhlIGNlbnRlciAoaW4gc2NyZWVuIHNwYWNlKS5cblx0XHRcdHZhciBjZW50ZXIwID0gem9vbS5jZW50ZXIoKTtcblx0XHRcdHZhciB0cmFuc2xhdGUwID0gem9vbS50cmFuc2xhdGUoKTtcblx0XHRcdHZhciBjb29yZGluYXRlczAgPSBjb29yZGluYXRlcyhjZW50ZXIwKTtcblx0XHRcdHpvb20uc2NhbGUoem9vbS5zY2FsZSgpICogLjkpO1xuXG5cdFx0XHQvLyBUcmFuc2xhdGUgYmFjayB0byB0aGUgY2VudGVyLlxuXHRcdFx0dmFyIGNlbnRlcjEgPSBwb2ludChjb29yZGluYXRlczApO1xuXHRcdFx0em9vbS50cmFuc2xhdGUoW3RyYW5zbGF0ZTBbMF0gKyBjZW50ZXIwWzBdIC0gY2VudGVyMVswXSwgdHJhbnNsYXRlMFsxXSArIGNlbnRlcjBbMV0gLSBjZW50ZXIxWzFdXSk7XG5cblx0XHRcdGVnb0dyYXBoVmlzLmdyb3VwLnRyYW5zaXRpb24oKS5kdXJhdGlvbig1MDApLmNhbGwoem9vbS5ldmVudCk7XG5cdFx0XHQvLyBlZ29HcmFwaFZpcy5ncm91cC5jYWxsKHpvb20uZXZlbnQpO1xuXHRcdH1cblx0fTtcblxuXHRmdW5jdGlvbiBjb29yZGluYXRlcyhwb2ludCkge1xuXHRcdHZhciBzY2FsZSA9IHpvb20uc2NhbGUoKTtcblx0XHR2YXIgdHJhbnNsYXRlID0gem9vbS50cmFuc2xhdGUoKTtcblx0XHRyZXR1cm4gWyhwb2ludFswXSAtIHRyYW5zbGF0ZVswXSkgLyBzY2FsZSwgKHBvaW50WzFdIC0gdHJhbnNsYXRlWzFdKSAvIHNjYWxlXTtcblx0fVxuXG5cdGZ1bmN0aW9uIHBvaW50KGNvb3JkaW5hdGVzKSB7XG5cdFx0dmFyIHNjYWxlID0gem9vbS5zY2FsZSgpO1xuXHRcdHZhciB0cmFuc2xhdGUgPSB6b29tLnRyYW5zbGF0ZSgpO1xuXHRcdHJldHVybiBbY29vcmRpbmF0ZXNbMF0gKiBzY2FsZSArIHRyYW5zbGF0ZVswXSwgY29vcmRpbmF0ZXNbMV0gKiBzY2FsZSArIHRyYW5zbGF0ZVsxXV07XG5cdH1cblxuXHRmdW5jdGlvbiB0ZXN0cmVjb3JkKCkge1xuXHRcdHZhciB0ID0gWzMwMCwgNTAxXTtcblx0XHRjb25zb2xlLmxvZygnY29vcmRpbmF0ZXMnKTtcblx0XHRjb25zb2xlLmxvZyh0KTtcblx0XHRjb25zb2xlLmxvZyhjb29yZGluYXRlcyh0KSk7XG5cdGNvbnNvbGUubG9nKGNvb3JkaW5hdGVzKFtlZ29HcmFwaFZpcy5ncmFwaERpbWVuc2lvbnMud2lkdGgsIGVnb0dyYXBoVmlzLmdyYXBoRGltZW5zaW9ucy5oZWlnaHRdKSk7XG5cdH1cblxuXHQkKCBkb2N1bWVudCApLm9uKCBcImFuaW1hdGlvbkZpbmlzaGVkXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHRlc3RyZWNvcmQoKTtcblx0XHRjb25zb2xlLmxvZyh6b29tLnRyYW5zbGF0ZSgpKTtcblx0XHRjb25zb2xlLmxvZyh6b29tLnNjYWxlKCkpO1xuXHR9KTtcblx0dGVzdHJlY29yZCgpO1xuXHRcdFx0Ly8gLy8gUmVjb3JkIHRoZSBjb29yZGluYXRlcyAoaW4gZGF0YSBzcGFjZSkgb2YgdGhlIGNlbnRlciAoaW4gc2NyZWVuIHNwYWNlKS5cblx0XHRcdC8vIHZhciBjZW50ZXIwID0gem9vbS5jZW50ZXIoKTtcblx0XHRcdC8vIHZhciB0cmFuc2xhdGUwID0gem9vbS50cmFuc2xhdGUoKTtcblx0XHRcdC8vIHZhciBjb29yZGluYXRlczAgPSBjb29yZGluYXRlcyhjZW50ZXIwKTtcblx0XHRcdC8vIHpvb20uc2NhbGUoem9vbS5zY2FsZSgpICogLjUpO1xuICAgICAgICAgICAgLy9cblx0XHRcdC8vIC8vIFRyYW5zbGF0ZSBiYWNrIHRvIHRoZSBjZW50ZXIuXG5cdFx0XHQvLyB2YXIgY2VudGVyMSA9IHBvaW50KGNvb3JkaW5hdGVzMCk7XG5cdFx0XHQvLyB6b29tLnRyYW5zbGF0ZShbdHJhbnNsYXRlMFswXSArIGNlbnRlcjBbMF0gLSBjZW50ZXIxWzBdLCB0cmFuc2xhdGUwWzFdICsgY2VudGVyMFsxXSAtIGNlbnRlcjFbMV1dKTtcbiAgICAgICAgICAgIC8vXG5cdFx0XHQvLyAvLyBlZ29HcmFwaFZpcy5ncm91cC50cmFuc2l0aW9uKCkuZHVyYXRpb24oMjAwKS5jYWxsKHpvb20uZXZlbnQpO1xuXHRcdFx0Ly8gZWdvR3JhcGhWaXMuZ3JvdXAuY2FsbCh6b29tLmV2ZW50KTtcblx0XHRcdC8vIHRlc3RyZWNvcmQoKTtcbn0pO1xuXG52YXIgY2l0YXRpb25WaXMgPSBjaXRhdGlvblZpcyB8fCB7fTtcblxuJCggZG9jdW1lbnQgKS5vbiggXCJpbml0Q29tcGxldGVcIiwge2ZvY3VzX2lkOiBmb2N1c19pZH0sIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdC8vIHBhc3MgZm9jdXNfaWQgdGhyb3VnaCB0aGUgZXZlbnQgZGF0YVxuXHR2YXIgZm9jdXNfaWQgPSBldmVudC5kYXRhLmZvY3VzX2lkO1xuXHRmb2N1c19pZCA9IHBhcnNlSW50KGZvY3VzX2lkKVxuXHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzkwMTExNS9ob3ctY2FuLWktZ2V0LXF1ZXJ5LXN0cmluZy12YWx1ZXMtaW4tamF2YXNjcmlwdFxuXHRmdW5jdGlvbiBnZXRQYXJhbWV0ZXJCeU5hbWUobmFtZSwgdXJsKSB7XG5cdFx0aWYgKCF1cmwpIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuXHRcdG5hbWUgPSBuYW1lLnJlcGxhY2UoL1tcXFtcXF1dL2csIFwiXFxcXCQmXCIpO1xuXHRcdHZhciByZWdleCA9IG5ldyBSZWdFeHAoXCJbPyZdXCIgKyBuYW1lICsgXCIoPShbXiYjXSopfCZ8I3wkKVwiKSxcblx0XHRcdHJlc3VsdHMgPSByZWdleC5leGVjKHVybCk7XG5cdFx0aWYgKCFyZXN1bHRzKSByZXR1cm4gbnVsbDtcblx0XHRpZiAoIXJlc3VsdHNbMl0pIHJldHVybiAnJztcblx0XHRyZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHJlc3VsdHNbMl0ucmVwbGFjZSgvXFwrL2csIFwiIFwiKSk7XG5cdH1cblx0Ly8gaWYgKGdldFBhcmFtZXRlckJ5TmFtZSgncmN2bXNnJykgPT09IG51bGwpIHJldHVybjsgLy8gYWRkIFwicmN2bXNnPTFcIiB0byB0aGUgVVJMIHF1ZXJ5IHBhcmFtZXRlcnMgdG8gZW5hYmxlIHRoaXMsIG90aGVyd2lzZSBkbyBub3RoaW5nXG5cblx0dmFyIGVnb0dyYXBoVmlzID0gY2l0YXRpb25WaXMuZWdvR3JhcGhWaXM7XG5cblx0Ly8gb3BlbiB0aGUgdGltZWxpbmVWaXMgd2hlbiBjZW50ZXIgbm9kZSBpcyBjbGlja2VkXG5cdGlmICh0eXBlb2YgZm9jdXNfaWQgPT0gJ3VuZGVmaW5lZCcgfHwgIWZvY3VzX2lkKSB7XG5cdFx0dmFyIGZvY3VzX2lkID0gZ2V0UGFyYW1ldGVyQnlOYW1lKCdmb2N1c2lkJyk7XG5cdH1cblx0aWYgKGZvY3VzX2lkKSB7XG5cdFx0JCggJy5jZW50ZXJOb2RlJyApLmNsaWNrKCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciB1cmwgPSBGbGFzay51cmxfZm9yKCdnZW5lcmF0ZV9jb2xsZGF0YV9mcm9tX2NvbGxlY3Rpb24nLCB7J2ZvY3VzX2lkJzogZm9jdXNfaWR9KTtcblx0XHRcdHdpbmRvdy5vcGVuKHVybCwgJ19ibGFuaycsICdsb2NhdGlvbj0wJyk7XG5cdFx0fSk7XG5cdH1cblxuXHQkKHdpbmRvdykub24oJ3N0b3JhZ2UnLCBtZXNzYWdlX3JlY2VpdmUpO1xuXG5cdC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzI4MjMwODQ1L2NvbW11bmljYXRpb24tYmV0d2Vlbi10YWJzLW9yLXdpbmRvd3Ncblx0Ly8gcmVjZWl2ZSBtZXNzYWdlXG5cdC8vXG5cdGZ1bmN0aW9uIG1lc3NhZ2VfcmVjZWl2ZShldikgXG5cdHtcblx0XHRpZiAoZXYub3JpZ2luYWxFdmVudC5rZXkhPSdtZXNzYWdlJykgcmV0dXJuOyAvLyBpZ25vcmUgb3RoZXIga2V5c1xuXHRcdHZhciBtZXNzYWdlID0gSlNPTi5wYXJzZShldi5vcmlnaW5hbEV2ZW50Lm5ld1ZhbHVlKTtcblx0XHRpZiAoIW1lc3NhZ2UpIHJldHVybjsgLy8gaWdub3JlIGVtcHR5IG1lc3NhZ2Ugb3IgbWVzc2FnZSByZXNldFxuXG5cdFx0Ly8gYWN0IG9uIHRoZSBtZXNzYWdlXG5cdFx0aWYgKG1lc3NhZ2UuY29tbWFuZCA9PSAndGltZWxpbmVWaXM6cGFwZXJJdGVtOm1vdXNlb3ZlcicpIGhpZ2hsaWdodExpbmtlZFBhcGVycyhtZXNzYWdlLmRhdGEucGlkKTtcblx0XHRpZiAobWVzc2FnZS5jb21tYW5kID09ICd0aW1lbGluZVZpczpwYXBlckl0ZW06bW91c2VvdXQnKSBsaW5rZWRQYXBlcnNNb3VzZW91dChtZXNzYWdlLmRhdGEucGlkKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGhpZ2hsaWdodExpbmtlZFBhcGVycyhwYXBlcl9pZCkge1xuXHRcdHZhciBoaWdobGlnaHRlZE5vZGVzID0gW107XG5cblx0XHRkMy5zZWxlY3RBbGwoXCIubm9kZVwiKS5maWx0ZXIoZnVuY3Rpb24oZCkge1xuXHRcdFx0Ly8gcmV0dXJuIGQudGFyZ2V0UGFwZXJJRHMgJiYgZC50YXJnZXRQYXBlcklEcy5pbmRleE9mKHBhcGVyX2lkKSAhPSAtMTtcblx0XHRcdGlmIChkLnRhcmdldFBhcGVySURzICYmIGQudGFyZ2V0UGFwZXJJRHMuaW5kZXhPZihwYXBlcl9pZCkgIT0gLTEpIHtcblx0XHRcdFx0aGlnaGxpZ2h0ZWROb2Rlcy5wdXNoKGQpO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9KVxuXHRcdC5jbGFzc2VkKFwibGlua2VkVG9UaW1lbGluZVwiLCB0cnVlKTtcblxuXHRcdC8vIGQzLnNlbGVjdEFsbChcIi5saW5rLnRvRWdvXCIpLmZpbHRlcihmdW5jdGlvbihkKSB7XG5cdFx0ZDMuc2VsZWN0QWxsKFwiLmxpbmtcIikuZmlsdGVyKGZ1bmN0aW9uKGQpIHtcblx0XHRcdHJldHVybiBoaWdobGlnaHRlZE5vZGVzLmluZGV4T2YoZC5zb3VyY2UpICE9IC0xO1xuXHRcdH0pXG5cdFx0LmNsYXNzZWQoXCJsaW5rZWRUb1RpbWVsaW5lXCIsIHRydWUpO1xuXHR9XG5cblx0ZnVuY3Rpb24gbGlua2VkUGFwZXJzTW91c2VvdXQocGFwZXJfaWQpIHtcblx0XHQvLyBkMy5zZWxlY3RBbGwoXCIubm9kZVwiKS5maWx0ZXIoZnVuY3Rpb24oZCkge1xuXHRcdC8vIFx0cmV0dXJuIGQudGFyZ2V0UGFwZXJJRHMgJiYgZC50YXJnZXRQYXBlcklEcy5pbmRleE9mKHBhcGVyX2lkKSAhPSAtMTtcblx0XHQvLyB9KVxuXHRcdC8vIC5jbGFzc2VkKFwibGlua2VkVG9UaW1lbGluZVwiLCBmYWxzZSk7XG5cdFx0ZDMuc2VsZWN0QWxsKFwiLmxpbmtlZFRvVGltZWxpbmVcIikuY2xhc3NlZChcImxpbmtlZFRvVGltZWxpbmVcIiwgZmFsc2UpO1xuXHR9XG59KTtcblxuXG5cbnZhciBjaXRhdGlvblZpcyA9IGNpdGF0aW9uVmlzIHx8IHt9O1xuXG5jaXRhdGlvblZpcy5kZWZhdWx0X29wdGlvbnMgPSAoZnVuY3Rpb24oKSB7XG5cdC8vIERpbWVuc2lvbnMgb2YgdGhlIGxhcmdlc3QgcGFydCBvZiB0aGUgdmlzdWFsaXphdGlvbiAodGhlIGdyYXBoKVxuXHR2YXIgZGltZW5zaW9ucyA9IHtcblx0XHR3aWR0aDogOTYwLFxuXHRcdGhlaWdodDogNTAwXG5cdH07XG5cdC8vIERpbWVuc2lvbnMgb2YgdGhlIGxpbmUgY2hhcnRzOlxuXHRkaW1lbnNpb25zLmxpbmVDaGFydCA9IHtcblx0XHRtYXJnaW46IHt0b3A6IDMwLCByaWdodDogMjAsIGJvdHRvbTogMzAsIGxlZnQ6IDUwfVxuXHR9O1xuXHRkaW1lbnNpb25zLmxpbmVDaGFydC53aWR0aCA9IGRpbWVuc2lvbnMud2lkdGggKiAzLzQgLSBkaW1lbnNpb25zLmxpbmVDaGFydC5tYXJnaW4ubGVmdCAtIGRpbWVuc2lvbnMubGluZUNoYXJ0Lm1hcmdpbi5yaWdodDtcblx0ZGltZW5zaW9ucy5saW5lQ2hhcnQuaGVpZ2h0ID0gMTEwIC0gZGltZW5zaW9ucy5saW5lQ2hhcnQubWFyZ2luLnRvcCAtIGRpbWVuc2lvbnMubGluZUNoYXJ0Lm1hcmdpbi5ib3R0b207XG5cblxuXHQvLyBDb2xvcnM6XG5cdC8vIFNlZSBodHRwOi8vY29sb3JicmV3ZXIyLm9yZy8/dHlwZT1xdWFsaXRhdGl2ZSZzY2hlbWU9U2V0MSZuPThcblx0dmFyIGNvbG9yU2NoZW1lID0gWydyZ2IoMjI4LDI2LDI4KScsJ3JnYig1NSwxMjYsMTg0KScsJ3JnYig3NywxNzUsNzQpJyxcblx0XHRcdCdyZ2IoMTUyLDc4LDE2MyknLCdyZ2IoMjU1LDEyNywwKScsJ3JnYigyNTUsMjU1LDUxKScsXG5cdFx0XHQncmdiKDE2Niw4Niw0MCknLCdyZ2IoMjQ3LDEyOSwxOTEpJ107XG5cdC8vIEkgbGlrZWQgdGhlIGJsdWUgYmV0dGVyIGZvciB0aGUgbWFpbiBjb2xvciwgc28gdGhlIG5leHQgbGluZSBqdXN0IG1vdmVzXG5cdC8vIHRoZSBibHVlIGNvbG9yIChvcmlnaW5hbGx5IHNlbGYuY29sb3JTY2hlbWVbMV0pIHRvIHRoZSBmcm9udCAoc2VsZi5jb2xvclNjaGVtZVswXSlcblx0Y29sb3JTY2hlbWUuc3BsaWNlKDAsIDAsIGNvbG9yU2NoZW1lLnNwbGljZSgxLCAxKVswXSk7XG5cblx0dmFyIERFRkFVTFRfT1BUSU9OUyA9IHtcblx0XHRjb2xvclNjaGVtZTogY29sb3JTY2hlbWUsXG5cdFx0ZGltZW5zaW9uczogZGltZW5zaW9uc1xuXHR9O1xuXG5cdHJldHVybiB7XG5cdFx0ZGVmYXVsdHM6IERFRkFVTFRfT1BUSU9OU1xuXHR9O1xufSgpKTtcbnZhciBjaXRhdGlvblZpcyA9IGNpdGF0aW9uVmlzIHx8IHt9O1xuXG5jaXRhdGlvblZpcy5saW5lQ2hhcnREYXRhID0gKGZ1bmN0aW9uKCkge1xuXHQvLyBUYWtlIGluIGdyYXBoIGRhdGEgYW5kIHByZXBhcmUgaXQgZm9yIGxpbmUgY2hhcnRzXG5cdFxuXHRmdW5jdGlvbiBnZXRQZXdDbGFzc1llYXIoZ3JhcGgpIHtcblx0XHR2YXIgZWdvTm9kZSA9IGdyYXBoLm5vZGVzWzBdO1xuXHRcdHJldHVybiBlZ29Ob2RlLnBld19DbGFzcztcblx0fVxuXG5cdGZ1bmN0aW9uIGdldEZ1bmRpbmcoZ3JhcGgpIHtcblx0XHR2YXIgZWdvTm9kZSA9IGdyYXBoLm5vZGVzWzBdO1xuXHRcdHJldHVybiBlZ29Ob2RlLmZ1bmRpbmc7XG5cdH1cblxuXHRmdW5jdGlvbiBjbGVhbkxpbmtzKGxpbmtzKSB7XG5cdFx0dmFyIGNsZWFuZWRMaW5rcyA9IFtdO1xuXHRcdGxpbmtzLmZvckVhY2goZnVuY3Rpb24oZCkge1xuXHRcdFx0aWYgKCAodHlwZW9mIGQubGlua1RvRWdvICE9ICd1bmRlZmluZWQnKSAmJiAoZC5saW5rVG9FZ28gPT09IHRydWUpICkge1xuXHRcdFx0XHR2YXIgc291cmNlWWVhciA9ICtkLnNvdXJjZVllYXI7XG5cdFx0XHRcdHZhciB0YXJnZXRZZWFyID0gK2QudGFyZ2V0WWVhcjtcblx0XHRcdFx0aWYgKCAoc291cmNlWWVhciA+IDApICYmICh0YXJnZXRZZWFyID4gMCkgJiYgKHNvdXJjZVllYXIgPj0gdGFyZ2V0WWVhcikgKSB7XG5cdFx0XHRcdFx0Y2xlYW5lZExpbmtzLnB1c2goZCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gY2xlYW5lZExpbmtzO1xuXHR9XG5cblx0ZnVuY3Rpb24gZ2V0WWVhclJhbmdlKGNsZWFuZWRMaW5rcykge1xuXHRcdC8vIE1ha2Ugc3VyZSBhbGwgb3VyIGRhdGEgZmFsbCB3aXRoaW4gdGhlIGFwcHJvcHJpYXRlIHRpbWUgc3Bhbi5cblx0XHQvLyBUaGUgbWluaW11bSB5ZWFyIGlzIHRoZSBlYXJsaWVzdCBwdWJsaWNhdGlvbiBieSB0aGUgZWdvIGF1dGhvciAodGhlcmUgd2lsbCBsaWtlbHkgYmUgbm8gY2l0YXRpb25zIHdpdGhpbiB0aGlzIHllYXIsIGJ1dCB0aGlzIGNoYXJ0IG5lZWRzIHRvIGxpbmUgdXAgd2l0aCB0aGUgb3RoZXIgY2hhcnRzKS5cblx0XHQvLyBUaGUgbWF4aW11bSB5ZWFyIGlzIHRoZSBsYXN0IHllYXIgdGhhdCBhIHBhcGVyIGNpdGVkIG9uZSBvZiB0aGUgZWdvIGF1dGhvcidzIHBhcGVyIChjaGVja2luZyB0byBtYWtlIHN1cmUgaXQgaXMgbm90IGluIHRoZSBmdXR1cmUsIHdoaWNoIHdvdWxkIG1lYW4gYmFkIGRhdGEpLlxuXHRcdHZhciBtaW5ZZWFyID0gZDMubWluKGNsZWFuZWRMaW5rcywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC50YXJnZXRZZWFyPjAgPyBkLnRhcmdldFllYXIgOiBudWxsOyB9KTtcblx0XHQvLyBHZXQgY3VycmVudCB5ZWFyICh1c2luZyB0b2RheSdzIGRhdGUpOlxuXHRcdHZhciB0b2RheVllYXIgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XG5cdFx0dmFyIG1heFllYXIgPSBkMy5tYXgoY2xlYW5lZExpbmtzLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLnNvdXJjZVllYXI8PXRvZGF5WWVhciA/IGQuc291cmNlWWVhciA6IG51bGw7IH0pO1xuXG5cdFx0Ly8gLy8gY3V0b2ZmIGF0IDIwMTVcblx0XHQvLyBtYXhZZWFyID0gTWF0aC5taW4obWF4WWVhciwgMjAxNSk7XG5cdFx0Ly8gY3V0IG9mZiBhdCAyMDE3XG5cdFx0bWF4WWVhciA9IE1hdGgubWluKG1heFllYXIsIDIwMTcpO1xuXG5cdFx0cmV0dXJuIFttaW5ZZWFyLCBtYXhZZWFyXTtcblx0fVxuXG5cdGZ1bmN0aW9uIGdldEVtcHR5Q291bnREYXRhKHllYXJSYW5nZSkge1xuXHRcdHZhciBlbXB0eUNvdW50RGF0YSA9IFtdO1xuXHRcdGZvciAodmFyIGk9eWVhclJhbmdlWzBdOyBpPD15ZWFyUmFuZ2VbMV07IGkrKykge1xuXHRcdFx0ZW1wdHlDb3VudERhdGEucHVzaCh7eWVhcjogaSwgY291bnQ6IDB9KTtcblx0XHR9XG5cdFx0cmV0dXJuIGVtcHR5Q291bnREYXRhO1xuXHR9XG5cblx0ZnVuY3Rpb24gcHJlcGFyZURhdGFfYWxsQ2l0YXRpb25zKGdyYXBoKSB7XG5cdFx0Ly8gdmFyIGRhdGEgPSB7fTtcblx0XHR2YXIgZGF0YSA9IHt9O1xuXHRcdGRhdGFbJ3Bld19DbGFzcyddID0gZ2V0UGV3Q2xhc3NZZWFyKGdyYXBoKTtcblx0XHRkYXRhWydmdW5kaW5nJ10gPSBnZXRGdW5kaW5nKGdyYXBoKTtcblx0XHRkYXRhWyd2YWx1ZXMnXSA9IFtdO1xuXG5cdFx0dmFyIGNsZWFuZWRMaW5rcyA9IGNsZWFuTGlua3MoZ3JhcGgubGlua3MpO1xuXHRcdHZhciB5ZWFyUmFuZ2UgPSBnZXRZZWFyUmFuZ2UoY2xlYW5lZExpbmtzKTtcblx0XHRjbGVhbmVkTGlua3MgPSBjbGVhbmVkTGlua3MuZmlsdGVyKGZ1bmN0aW9uKGQpIHtcblx0XHRcdHJldHVybiBkLnNvdXJjZVllYXIgPD0geWVhclJhbmdlWzFdICYmIGQudGFyZ2V0WWVhciA8PSB5ZWFyUmFuZ2VbMV07XG5cdFx0fSk7XG5cblx0XHQvLyBmb3IgKHZhciBpPXllYXJSYW5nZVswXTsgaTw9eWVhclJhbmdlWzFdOyBpKyspIHtcblx0XHQvLyBcdC8vIGRhdGFbaV0gPSAwO1xuXHRcdC8vIFx0ZGF0YS5wdXNoKHt5ZWFyOiBpLCBjb3VudDogMH0pO1xuXHRcdC8vIH1cblx0XHQvLyBjbGVhbmVkTGlua3MuZm9yRWFjaChmdW5jdGlvbihkKSB7XG5cdFx0Ly8gXHRkYXRhW2Quc291cmNlWWVhcl0rKztcblx0XHQvLyB9KTtcblx0XHRkYXRhLnZhbHVlcyA9IGdldEVtcHR5Q291bnREYXRhKHllYXJSYW5nZSk7XG5cdFx0Y2xlYW5lZExpbmtzLmZvckVhY2goZnVuY3Rpb24oZCkge1xuXHRcdFx0dmFyIHRoaXNTb3VyY2VZZWFyID0gZC5zb3VyY2VZZWFyO1xuXHRcdFx0dmFyIGRhdGFUaGlzWWVhciA9IGRhdGEudmFsdWVzLmZpbHRlcihmdW5jdGlvbihkZCkgeyByZXR1cm4gZGQueWVhcj09PXRoaXNTb3VyY2VZZWFyOyB9KVswXTtcblx0XHRcdGRhdGFUaGlzWWVhci5jb3VudCsrO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIGRhdGE7XG5cdH1cblxuXHRmdW5jdGlvbiBwcmVwYXJlRGF0YV9lZ29BdXRob3JQdWJsaWNhdGlvbnMoZ3JhcGgpIHtcblx0XHR2YXIgZGF0YSA9IHt9O1xuXHRcdGRhdGFbJ3Bld19DbGFzcyddID0gZ2V0UGV3Q2xhc3NZZWFyKGdyYXBoKTtcblx0XHRkYXRhWydmdW5kaW5nJ10gPSBnZXRGdW5kaW5nKGdyYXBoKTtcblx0XHRkYXRhWyd2YWx1ZXMnXSA9IFtdO1xuXG5cdFx0dmFyIGNsZWFuZWRMaW5rcyA9IGNsZWFuTGlua3MoZ3JhcGgubGlua3MpO1xuXHRcdHZhciB5ZWFyUmFuZ2UgPSBnZXRZZWFyUmFuZ2UoY2xlYW5lZExpbmtzKTtcblx0XHRkYXRhLnZhbHVlcyA9IGdldEVtcHR5Q291bnREYXRhKHllYXJSYW5nZSk7XG5cdFx0dmFyIGVnb1BhcGVycyA9IGdyYXBoLm5vZGVzWzBdLnBhcGVycztcblx0XHRlZ29QYXBlcnMgPSBlZ29QYXBlcnMuZmlsdGVyKGZ1bmN0aW9uKGQpIHtcblx0XHRcdHJldHVybiAoIChkLlllYXIgPj0geWVhclJhbmdlWzBdKSAmJiAoZC5ZZWFyIDw9IHllYXJSYW5nZVsxXSkgKTtcblx0XHR9KVxuXHRcdGVnb1BhcGVycy5mb3JFYWNoKGZ1bmN0aW9uKGQpIHtcblx0XHRcdHZhciBkYXRhVGhpc1llYXIgPSBkYXRhLnZhbHVlcy5maWx0ZXIoZnVuY3Rpb24oZGQpIHsgcmV0dXJuIGRkLnllYXI9PWQuWWVhcjsgfSlbMF07XG5cdFx0XHRkYXRhVGhpc1llYXIuY291bnQrKztcblx0XHR9KTtcblxuXHRcdHJldHVybiBkYXRhO1xuXHR9XG5cblx0ZnVuY3Rpb24gcHJlcGFyZURhdGFfYXV0aG9yRWlnZW5mYWN0b3JTdW0oZ3JhcGgpIHtcblx0XHQvLyBGb3IgZWFjaCB5ZWFyLCBzdW0gdGhlIGVpZ2VuZmFjdG9yIChFRikgb2YgdGhlIGVnbyBhdXRob3IncyBwYXBlcidzXG5cdFx0dmFyIGRhdGEgPSB7fTtcblx0XHRkYXRhWydwZXdfQ2xhc3MnXSA9IGdldFBld0NsYXNzWWVhcihncmFwaCk7XG5cdFx0ZGF0YVsnZnVuZGluZyddID0gZ2V0RnVuZGluZyhncmFwaCk7XG5cdFx0ZGF0YVsndmFsdWVzJ10gPSBbXTtcblxuXHRcdHZhciBjbGVhbmVkTGlua3MgPSBjbGVhbkxpbmtzKGdyYXBoLmxpbmtzKTtcblx0XHR2YXIgeWVhclJhbmdlID0gZ2V0WWVhclJhbmdlKGNsZWFuZWRMaW5rcyk7XG5cdFx0ZGF0YS52YWx1ZXMgPSBnZXRFbXB0eUNvdW50RGF0YSh5ZWFyUmFuZ2UpO1xuXHRcdHZhciBlZ29QYXBlcnMgPSBncmFwaC5ub2Rlc1swXS5wYXBlcnM7XG5cdFx0ZWdvUGFwZXJzID0gZWdvUGFwZXJzLmZpbHRlcihmdW5jdGlvbihkKSB7XG5cdFx0XHRyZXR1cm4gKCAoZC5ZZWFyID49IHllYXJSYW5nZVswXSkgJiYgKGQuWWVhciA8PSB5ZWFyUmFuZ2VbMV0pICk7XG5cdFx0fSlcblx0XHRlZ29QYXBlcnMuZm9yRWFjaChmdW5jdGlvbihkKSB7XG5cdFx0XHR2YXIgZGF0YVRoaXNZZWFyID0gZGF0YS52YWx1ZXMuZmlsdGVyKGZ1bmN0aW9uKGRkKSB7IHJldHVybiBkZC55ZWFyPT1kLlllYXI7IH0pWzBdO1xuXHRcdFx0ZGF0YVRoaXNZZWFyLmNvdW50ID0gZGF0YVRoaXNZZWFyLmNvdW50ICsgZC5FRjtcblx0XHR9KTtcblxuXHRcdHJldHVybiBkYXRhO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRwcmVwYXJlRGF0YV9hbGxDaXRhdGlvbnM6IHByZXBhcmVEYXRhX2FsbENpdGF0aW9ucyxcblx0XHRwcmVwYXJlRGF0YV9lZ29BdXRob3JQdWJsaWNhdGlvbnM6IHByZXBhcmVEYXRhX2Vnb0F1dGhvclB1YmxpY2F0aW9ucyxcblx0XHRwcmVwYXJlRGF0YV9hdXRob3JFaWdlbmZhY3RvclN1bTogcHJlcGFyZURhdGFfYXV0aG9yRWlnZW5mYWN0b3JTdW1cblx0fTtcbn0oKSk7XG5cblxudmFyIGNpdGF0aW9uVmlzID0gY2l0YXRpb25WaXMgfHwge307XG5cbi8vICQoIGRvY3VtZW50ICkub24oIFwiaW5pdENvbXBsZXRlXCIsIGZ1bmN0aW9uKCkge1xuLy8gXHR2YXIgZWdvR3JhcGhWaXMgPSBjaXRhdGlvblZpcy5lZ29HcmFwaFZpcztcbi8vXG4vLyBcdHZhciAkbGVnZW5kVG9nZ2xlQnV0dG9uID0gJCgnPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIlRvZ2dsZSBMZWdlbmRcIiAvPicpO1xuLy8gXHQkbGVnZW5kVG9nZ2xlQnV0dG9uLmRhdGEoJ3ZhbCcsIDApO1xuLy8gXHR2YXIgbWF4VmFsID0gMztcbi8vXG4vLyBcdCQoJyNtYWluRGl2JykucHJlcGVuZCgkbGVnZW5kVG9nZ2xlQnV0dG9uKTtcbi8vXG4vLyBcdCRsZWdlbmRUb2dnbGVCdXR0b24ub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4vLyBcdFx0dmFyIGN1clZhbCA9ICRsZWdlbmRUb2dnbGVCdXR0b24uZGF0YSgndmFsJyk7XG4vLyBcdFx0Y3VyVmFsKys7XG4vLyBcdFx0aWYgKGN1clZhbCA+IG1heFZhbCkge1xuLy8gXHRcdFx0Y3VyVmFsID0gMDtcbi8vIFx0XHR9XG4vLyBcdFx0JGxlZ2VuZFRvZ2dsZUJ1dHRvbi5kYXRhKCd2YWwnLCBjdXJWYWwpO1xuLy8gXHRcdHN3aXRjaCAoY3VyVmFsKSB7XG4vLyBcdFx0XHRjYXNlIDA6XG4vLyBcdFx0XHRcdGVnb0dyYXBoVmlzLmxlZ2VuZC5yZW1vdmUoKTtcbi8vIFx0XHRcdFx0ZWdvR3JhcGhWaXMubGVnZW5kSW5pdCgpXG4vLyBcdFx0XHRcdFxuLy8gXHRcdFx0XHRicmVhaztcbi8vIFx0XHRcdFxuLy8gXHRcdFx0Y2FzZSAxOlxuLy8gXHRcdFx0XHRlZ29HcmFwaFZpcy5sZWdlbmRUZXh0XG4vLyBcdFx0XHRcdFx0LnRleHQoZnVuY3Rpb24oZCkge1xuLy8gXHRcdFx0XHRcdFx0dmFyIGlkeCA9ICtkLmtleTtcbi8vIFx0XHRcdFx0XHRcdHZhciBuZXdUZXh0ID0gZWdvR3JhcGhWaXMuZGF0YS5ncmFwaC5mb3Nfa21lYW5zX2NhdGVnb3JpZXNfdG9wZm9zbmFtZXNfdGZpZGZbaWR4XTtcbi8vIFx0XHRcdFx0XHRcdHJldHVybiBuZXdUZXh0O1xuLy8gXHRcdFx0XHRcdH0pO1xuLy9cbi8vIFx0XHRcdFx0YnJlYWs7XG4vL1xuLy8gXHRcdFx0Y2FzZSAyOlxuLy8gXHRcdFx0XHRlZ29HcmFwaFZpcy5sZWdlbmRUZXh0XG4vLyBcdFx0XHRcdFx0LnRleHQoZnVuY3Rpb24oZCkge1xuLy8gXHRcdFx0XHRcdFx0dmFyIGlkeCA9ICtkLmtleTtcbi8vIFx0XHRcdFx0XHRcdHZhciBuZXdUZXh0ID0gZWdvR3JhcGhWaXMuZGF0YS5ncmFwaC5mb3Nfa21lYW5zX2NhdGVnb3JpZXNfdG9wdGl0bGV3b3Jkc190ZmlkZltpZHhdO1xuLy8gXHRcdFx0XHRcdFx0cmV0dXJuIG5ld1RleHQ7XG4vLyBcdFx0XHRcdFx0fSk7XG4vL1xuLy8gXHRcdFx0XHRicmVhaztcbi8vXG4vLyBcdFx0XHRjYXNlIDM6XG4vLyBcdFx0XHRcdGVnb0dyYXBoVmlzLmxlZ2VuZFRleHRcbi8vIFx0XHRcdFx0XHQudGV4dChmdW5jdGlvbihkKSB7XG4vLyBcdFx0XHRcdFx0XHR2YXIgaWR4ID0gK2Qua2V5O1xuLy8gXHRcdFx0XHRcdFx0dmFyIG5ld1RleHQgPSBlZ29HcmFwaFZpcy5kYXRhLmdyYXBoLmZvc19rbWVhbnNfY2F0ZWdvcmllc190b3B0aXRsZXdvcmRzX3RmaWRmX3Jlc3RyaWN0ZWRbaWR4XTtcbi8vIFx0XHRcdFx0XHRcdHJldHVybiBuZXdUZXh0O1xuLy8gXHRcdFx0XHRcdH0pO1xuLy9cbi8vIFx0XHRcdFx0YnJlYWs7XG4vLyBcdFx0fVxuLy8gXHR9KTtcbi8vIFx0Ly8gZWdvR3JhcGhWaXMubGVnZW5kVGV4dFxuLy8gXHQvLyBcdC50ZXh0KCdkZGQnKTtcbi8vIH0pO1xuLy9cbi8vXG4vLyBodHRwOi8vY29kZXJldmlldy5zdGFja2V4Y2hhbmdlLmNvbS9xdWVzdGlvbnMvNzc2MTQvY2FwaXRhbGl6ZS10aGUtZmlyc3QtY2hhcmFjdGVyLW9mLWFsbC13b3Jkcy1ldmVuLXdoZW4tZm9sbG93aW5nLWFcblN0cmluZy5wcm90b3R5cGUuY2FwaXRhbGl6ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnRvTG93ZXJDYXNlKCkucmVwbGFjZSggL1xcYlxcdy9nLCBmdW5jdGlvbihtKSB7XG4gICAgICAgIHJldHVybiBtLnRvVXBwZXJDYXNlKCk7XG4gICAgfSk7XG59O1xuXG5cbnZhciBjaXRhdGlvblZpcyA9IGNpdGF0aW9uVmlzIHx8IHt9O1xuXG5mdW5jdGlvbiBtYWtlSHRtbCh5ZWFyLCBwYXBlcnMsIG51bURpc3BsYXksIGNhbGxiYWNrKSB7XG5cdGlmIChwYXBlcnNbMF0uaGFzT3duUHJvcGVydHkoJ2NpdGF0aW9uJykpIHtcblx0XHR2YXIgdG9vbHRpcEh0bWwgPSAnPGgzIHN0eWxlPVwiZm9udC1zaXplOiAxMDAlXCI+VG9wIHBhcGVycyBpbiB0aGlzIGNvbGxlY3Rpb24gaW4gJyArIHllYXIgKyc6PC9oMz4nO1xuXHRcdHRvb2x0aXBIdG1sID0gdG9vbHRpcEh0bWwgKyAnPG9sPic7XG5cdFx0dmFyIG51bVBhcGVyc0FkZGVkID0gMDtcblx0XHRmb3IgKHZhciBpID0gMCwgbGVuID0gcGFwZXJzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHR2YXIgcGFwZXIgPSBwYXBlcnNbaV07XG5cdFx0XHRpZiAocGFwZXIuaGFzT3duUHJvcGVydHkoJ2NpdGF0aW9uJykpIHtcblx0XHRcdFx0dG9vbHRpcEh0bWwgPSB0b29sdGlwSHRtbCArICc8bGk+JyArIHBhcGVyWydjaXRhdGlvbiddICsgJzwvbGk+Jztcblx0XHRcdFx0bnVtUGFwZXJzQWRkZWQrKztcblx0XHRcdFx0aWYgKG51bVBhcGVyc0FkZGVkID09PSBudW1EaXNwbGF5KSB7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0dG9vbHRpcEh0bWwgPSB0b29sdGlwSHRtbCArICc8L29sPic7XG5cblx0XHRjaXRhdGlvblZpcy5lZ29HcmFwaFZpcy50b29sdGlwID0gY2l0YXRpb25WaXMuZWdvR3JhcGhWaXMudG9vbHRpcC5odG1sKHRvb2x0aXBIdG1sKTtcblx0XHRpZiAoY2FsbGJhY2sgIT0gbnVsbCkge1xuXHRcdFx0Y2FsbGJhY2sodG9vbHRpcEh0bWwpO1xuXHRcdH1cblx0XHRyZXR1cm4gdG9vbHRpcEh0bWw7XG5cblx0fSBlbHNlIHtcblx0XHR2YXIgcGlkcyA9IFtdO1xuXHRcdGZvciAodmFyIGkgPSAwLCBsZW4gPSBudW1EaXNwbGF5OyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdGlmIChpIDwgcGFwZXJzLmxlbmd0aCkge1xuXHRcdFx0XHRwaWRzLnB1c2gocGFwZXJzW2ldLlBhcGVySUQpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHQkLmFqYXgoe1xuXHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcblx0XHRcdHVybDogJFNDUklQVF9ST09UICsgJy9fdmlzX2dldF9tb3JlX3BhcGVyaW5mbycsXG5cdFx0XHRkYXRhOiB7cGFwZXJpZDogSlNPTi5zdHJpbmdpZnkocGlkcyl9LFxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24ocmVzdWx0KSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKHJlc3VsdCk7XG5cdFx0XHRcdHZhciBkYl9wYXBlcnMgPSByZXN1bHRbJ3BhcGVycyddO1xuXHRcdFx0XHR2YXIgdG9vbHRpcEh0bWwgPSAnPGgzIHN0eWxlPVwiZm9udC1zaXplOiAxMDAlXCI+VG9wIHBhcGVycyBpbiB0aGlzIGNvbGxlY3Rpb24gaW4gJyArIHllYXIgKyc6PC9oMz4nO1xuXHRcdFx0XHR0b29sdGlwSHRtbCA9IHRvb2x0aXBIdG1sICsgJzxvbD4nO1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMCwgbGVuID0gZGJfcGFwZXJzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRcdFx0cGFwZXJzW2ldWydjaXRhdGlvbiddID0gZGJfcGFwZXJzW2ldWydjaXRhdGlvbiddO1xuXHRcdFx0XHRcdHRvb2x0aXBIdG1sID0gdG9vbHRpcEh0bWwgKyAnPGxpPicgKyBwYXBlcnNbaV1bJ2NpdGF0aW9uJ10gKyAnPC9saT4nO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRvb2x0aXBIdG1sID0gdG9vbHRpcEh0bWwgKyAnPC9vbD4nO1xuXG5cdFx0XHRcdGNpdGF0aW9uVmlzLmVnb0dyYXBoVmlzLnRvb2x0aXAgPSBjaXRhdGlvblZpcy5lZ29HcmFwaFZpcy50b29sdGlwLmh0bWwodG9vbHRpcEh0bWwpO1xuXHRcdFx0XHRpZiAoY2FsbGJhY2sgIT0gbnVsbCkge1xuXHRcdFx0XHRcdGNhbGxiYWNrKHRvb2x0aXBIdG1sKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdG9vbHRpcEh0bWw7XG5cblx0XHRcdFx0Lypcblx0XHRcdFx0ZC5UaXRsZSA9IHJlc3VsdFsndGl0bGUnXTtcblx0XHRcdFx0ZC5kb2kgPSByZXN1bHRbJ2RvaSddO1xuXHRcdFx0XHRkLmNpdGF0aW9uID0gcmVzdWx0WydjaXRhdGlvbiddO1xuXHRcdFx0XHRkLnVwZGF0ZWRQcm9wcyA9IHRydWU7XG5cdFx0XHRcdGQudG9vbHRpcEh0bWwgPSAnPHA+JyArIGQuY2l0YXRpb24gKyAnPC9wPic7XG5cdFx0XHRcdGQudG9vbHRpcEh0bWwgPSBkLnRvb2x0aXBIdG1sICsgJzxicj4nO1xuXHRcdFx0XHRkLnRvb2x0aXBIdG1sID0gZC50b29sdGlwSHRtbCArICc8cD5DYXRlZ29yeTogJyArIGQuRG9tYWluTmFtZSArICc8L3A+Jztcblx0XHRcdFx0aWYgKGQuaG92ZXJlZCkge1xuXHRcdFx0XHRcdHNlbGYudGlwLnNob3coZCwgaG92ZXJlZEl0ZW0ubm9kZSgpKTtcblx0XHRcdFx0XHQvLyBzZWxmLnRpcC5zaG93KGQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdCovXG5cblx0XHRcdH1cblx0XHR9KTtcblx0fSAgLy8gZW5kIGVsc2VcblxuXG59XG5cbi8qXG4kKCBkb2N1bWVudCApLm9uKCBcImluaXRDb21wbGV0ZVwiLCBmdW5jdGlvbigpIHtcblx0dmFyIGxpbmVDaGFydHMgPSBjaXRhdGlvblZpcy5saW5lQ2hhcnRzO1xuXHR2YXIgZWdvR3JhcGhWaXMgPSBjaXRhdGlvblZpcy5lZ29HcmFwaFZpcztcblx0dmFyIGVnb1BhcGVycyA9IGNpdGF0aW9uVmlzLmVnb0dyYXBoVmlzLmVnb05vZGUucGFwZXJzO1xuXHRmb3IgKHZhciBpID0gMCwgbGVuID0gbGluZUNoYXJ0cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHRcdHZhciB5ZWFyQXJlYSA9IGxpbmVDaGFydHNbaV0ueWVhckFyZWE7XG5cdFx0eWVhckFyZWEuc3R5bGUoJ3BvaW50ZXItZXZlbnRzJywgJ2FsbCcpXG5cdFx0XHQub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKGQpIHtcblx0XHRcdFx0dmFyIHRoaXNZZWFyUGFwZXJzID0gZWdvUGFwZXJzLmZpbHRlcihmdW5jdGlvbihkZCkge1xuXHRcdFx0XHRcdHJldHVybiBkZC5ZZWFyPT1kLnllYXI7fVxuXHRcdFx0XHRcdClcblx0XHRcdFx0XHQuc29ydChmdW5jdGlvbihhLCBiKSB7IHJldHVybiBkMy5kZXNjZW5kaW5nKGEuRUYsIGIuRUYpOyB9KTtcblx0XHRcdFx0Y29uc29sZS5sb2codGhpc1llYXJQYXBlcnMpO1xuXHRcdFx0XHRpZiAodGhpc1llYXJQYXBlcnMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNpdGF0aW9uVmlzLmVnb0dyYXBoVmlzLnRvb2x0aXAgPSBjaXRhdGlvblZpcy5lZ29HcmFwaFZpcy50b29sdGlwXG5cdFx0XHRcdFx0Lmh0bWwoJzxwPkxvYWRpbmcuLi48L3A+Jylcblx0XHRcdFx0XHQuc3R5bGUoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpXG5cdFx0XHRcdFx0LnN0eWxlKCdib3JkZXItc3R5bGUnLCAnc29saWQnKVxuXHRcdFx0XHRcdC5zdHlsZSgnYm9yZGVyLWNvbG9yJywgY2l0YXRpb25WaXMuZWdvR3JhcGhWaXMuY29sb3JTY2hlbWVbMF0pXG5cdFx0XHRcdFx0LnN0eWxlKCd0b3AnLCAoZDMuZXZlbnQucGFnZVktMjAwKSsncHgnKVxuXHRcdFx0XHRcdC5zdHlsZSgnbGVmdCcsIChkMy5ldmVudC5wYWdlWCsxMCkrJ3B4Jyk7XG5cdFx0XHRcdHZhciB0b29sdGlwSHRtbCA9IG1ha2VIdG1sKGQueWVhciwgdGhpc1llYXJQYXBlcnMsIDMpO1xuXHRcdFx0XHR9KVxuXHRcdFx0Lm9uKCdtb3VzZW91dCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRjaXRhdGlvblZpcy5lZ29HcmFwaFZpcy50b29sdGlwID0gY2l0YXRpb25WaXMuZWdvR3JhcGhWaXMudG9vbHRpcFxuXHRcdFx0XHRcdC5zdHlsZSgndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcblx0XHRcdH0pO1xuXHR9XG5cbn0pO1xuKi9cblxuXG4vLyB0b29sdGlwc3RlciBtZXRob2RcbiQoIGRvY3VtZW50ICkub24oICdpbml0Q29tcGxldGUnLCBmdW5jdGlvbigpIHtcblx0dmFyIHdpbmRvd1dpZHRoID0gJCh3aW5kb3cpLndpZHRoKCk7XG5cblx0bm9kZVRvb2x0aXBzKCk7XG5cdGxlZ2VuZFRvb2x0aXBzKCk7XG5cblx0JCgnLnllYXJBcmVhLCAueWVhclRpY2snKS5jc3MoJ3BvaW50ZXItZXZlbnRzJywgJ2FsbCcpXG5cdFx0LnRvb2x0aXBzdGVyKHtcblx0XHRcdHRoZW1lOiAndG9vbHRpcHN0ZXItbm9pcicsXG5cdFx0XHRtYXhXaWR0aDogd2luZG93V2lkdGggKiAuNSxcblx0XHRcdGFuaW1hdGlvbjogbnVsbCxcblx0XHRcdGFuaW1hdGlvbmR1cmF0aW9uOiAwLFxuXHRcdFx0ZGVsYXk6IDAsXG5cdFx0XHR1cGRhdGVBbmltYXRpb246IG51bGwsXG5cdFx0XHRjb250ZW50OiAnPHA+TG9hZGluZy4uLjwvcD4nLFxuXHRcdFx0Y29udGVudEFzSFRNTDogdHJ1ZSxcblx0XHRcdGZ1bmN0aW9uSW5pdDogZnVuY3Rpb24oKSB7Y29uc29sZS5sb2coJ3Rvb2x0aXBzdGVyIGluaXQnKTt9LFxuXHRcdFx0ZnVuY3Rpb25CZWZvcmU6IGZ1bmN0aW9uKGluc3RhbmNlLCBoZWxwZXIpIHtcblx0XHRcdFx0dmFyICRvcmlnaW4gPSAkKGhlbHBlci5vcmlnaW4pO1xuXHRcdFx0XHR2YXIgeWVhciA9ICRvcmlnaW4uZGF0YSgneWVhcicpO1xuXHRcdFx0XHR2YXIgZWdvUGFwZXJzID0gY2l0YXRpb25WaXMuZWdvR3JhcGhWaXMuZWdvTm9kZS5wYXBlcnM7XG5cdFx0XHRcdHZhciB0aGlzWWVhclBhcGVycyA9IGVnb1BhcGVycy5maWx0ZXIoZnVuY3Rpb24oZGQpIHtcblx0XHRcdFx0XHRyZXR1cm4gZGQuWWVhcj09eWVhcjt9XG5cdFx0XHRcdFx0KVxuXHRcdFx0XHRcdC5zb3J0KGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGQzLmRlc2NlbmRpbmcoYS5FRiwgYi5FRik7IH0pO1xuXHRcdFx0XHRpZiAodGhpc1llYXJQYXBlcnMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHZhciB0b29sdGlwSHRtbCA9IG1ha2VIdG1sKHllYXIsIHRoaXNZZWFyUGFwZXJzLCAzLCBmdW5jdGlvbihodG1sKSB7XG5cdFx0XHRcdFx0aW5zdGFuY2UuY29udGVudChodG1sKTsgXG5cdFx0XHRcdH0pO1xuXHRcdFx0XHQvLyBpbnN0YW5jZS5jb250ZW50KHRvb2x0aXBIdG1sKTtcblx0XHRcdH1cblx0fSk7XG59ICk7XG5cbmZ1bmN0aW9uIG5vZGVUb29sdGlwcygpIHtcblx0Ly8gJCgnLmQzLXRpcCcpLnJlbW92ZSgpO1xuXHQkKCcubm9kZScpLmFkZENsYXNzKCd0b29sdGlwc3RlcicpO1xuXHQvLyAkKCcubm9kZScpLmZpcnN0KCkuYWRkQ2xhc3MoJ2NlbnRlci1ub2RlJyk7XG5cdHZhciB3aW5kb3dXaWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xuXHQkKCcudG9vbHRpcHN0ZXInKS50b29sdGlwc3Rlcih7XG5cdFx0dGhlbWU6ICd0b29sdGlwc3Rlci1ub2lyJyxcblx0XHRtYXhXaWR0aDogd2luZG93V2lkdGggKiAuNSxcblx0XHRhbmltYXRpb246IG51bGwsXG5cdFx0YW5pbWF0aW9uZHVyYXRpb246IDAsXG5cdFx0ZGVsYXk6IDAsXG5cdFx0dXBkYXRlQW5pbWF0aW9uOiBudWxsLFxuXHRcdGNvbnRlbnQ6ICc8cD5DbGljayB0byBzZWUgZGV0YWlscyBvZiB0aGlzIHBhcGVyPC9wPicsXG5cdFx0Y29udGVudEFzSFRNTDogdHJ1ZSxcblx0XHRmdW5jdGlvbkJlZm9yZTogZnVuY3Rpb24oaW5zdGFuY2UsIGhlbHBlcikge1xuXHRcdFx0dmFyIHRvb2x0aXBIdG1sID0gYWpheFBhcGVySW5mbyhoZWxwZXIub3JpZ2luLCBmdW5jdGlvbihodG1sKSB7XG5cdFx0XHRcdGluc3RhbmNlLmNvbnRlbnQoaHRtbCk7IFxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9KTtcblxuXHRmdW5jdGlvbiBhamF4UGFwZXJJbmZvKG5vZGUsIGNhbGxiYWNrKSB7XG5cdFx0Ly8gbm9kZSBpcyB0aGUgRE9NIGVsZW1lbnQgZm9yIGEgbm9kZVxuXHRcdHZhciBodG1sID0gJyc7XG5cdFx0ZDMuc2VsZWN0KG5vZGUpLmVhY2goZnVuY3Rpb24oZCkge1xuXHRcdFx0aWYgKCAoZC5ub2RlVHlwZSA9PT0gJ3BhcGVyJykgJiYgKCFkLnVwZGF0ZWRQcm9wcykgKSB7XG5cdFx0XHRcdGlmICggKHR5cGVvZiBkLmNpdGF0aW9uICE9IFwidW5kZWZpbmVkXCIpICYmIChkLmNpdGF0aW9uLmxlbmd0aD4wKSApIHtcblx0XHRcdFx0XHRodG1sID0gYnlwYXNzQWpheChkKTtcblx0XHRcdFx0XHRpZiAoY2FsbGJhY2sgIT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0Y2FsbGJhY2soaHRtbCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBodG1sXG5cdFx0XHRcdH1cblx0XHRcdFx0JC5hamF4KHtcblx0XHRcdFx0XHRkYXRhVHlwZTogJ2pzb24nLFxuXHRcdFx0XHRcdHVybDogJFNDUklQVF9ST09UICsgJy9fdmlzX2dldF9tb3JlX3BhcGVyaW5mbycsXG5cdFx0XHRcdFx0ZGF0YToge3BhcGVyaWQ6IGQuaWR9LFxuXHRcdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3VsdCkge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2cocmVzdWx0KTtcblx0XHRcdFx0XHRcdGQuVGl0bGUgPSByZXN1bHRbJ3RpdGxlJ107XG5cdFx0XHRcdFx0XHRkLmRvaSA9IHJlc3VsdFsnZG9pJ107XG5cdFx0XHRcdFx0XHRkLmNpdGF0aW9uID0gcmVzdWx0WydjaXRhdGlvbiddO1xuXHRcdFx0XHRcdFx0ZC5hdXRob3Jfc3RyID0gcmVzdWx0WydhdXRob3Jfc3RyJ107XG5cdFx0XHRcdFx0XHRkLnZlbnVlID0gcmVzdWx0Wyd2ZW51ZSddO1xuXHRcdFx0XHRcdFx0ZC51cGRhdGVkUHJvcHMgPSB0cnVlO1xuXHRcdFx0XHRcdFx0Ly8gZC50b29sdGlwSHRtbCA9ICc8cD4nICsgZC5jaXRhdGlvbiArICc8L3A+Jztcblx0XHRcdFx0XHRcdC8vIGQudG9vbHRpcEh0bWwgPSBkLnRvb2x0aXBIdG1sICsgJzxicj4nO1xuXHRcdFx0XHRcdFx0Ly8gZC50b29sdGlwSHRtbCA9IGQudG9vbHRpcEh0bWwgKyAnPHA+Q2F0ZWdvcnk6ICcgKyBkLkRvbWFpbk5hbWUgKyAnPC9wPic7XG5cdFx0XHRcdFx0XHQvLyBpZiAoZC5ob3ZlcmVkKSB7XG5cdFx0XHRcdFx0XHQvLyBcdHNlbGYudGlwLnNob3coZCwgaG92ZXJlZEl0ZW0ubm9kZSgpKTtcblx0XHRcdFx0XHRcdC8vIFx0Ly8gc2VsZi50aXAuc2hvdyhkKTtcblx0XHRcdFx0XHRcdC8vIH1cblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0aHRtbCA9IG1ha2VOb2RlVG9vbHRpcEh0bWwoZCk7XG5cdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2sgIT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0XHRjYWxsYmFjayhodG1sKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJldHVybiBodG1sXG5cblxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2UgaWYgKCBkLmlkeCA9PSAwICkge1xuXHRcdFx0XHRkLnRvb2x0aXBIdG1sID0gJzxwPic7XG5cdFx0XHRcdGlmIChkLm5vZGVUeXBlKSB7XG5cdFx0XHRcdFx0ZC50b29sdGlwSHRtbCA9IGQudG9vbHRpcEh0bWwgKyBkLm5vZGVUeXBlLmNhcGl0YWxpemUoKSArICc6ICc7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZC50b29sdGlwSHRtbCA9IGQudG9vbHRpcEh0bWwgKyBkLm5hbWU7XG5cdFx0XHRcdGQudG9vbHRpcEh0bWwgPSBkLnRvb2x0aXBIdG1sICsgJzwvcD4nO1xuXHRcdFx0XHR2YXIgbnVtYmVyT2ZQdWJzID0gZC5wYXBlcnMubGVuZ3RoO1xuXHRcdFx0XHRkLnRvb2x0aXBIdG1sID0gZC50b29sdGlwSHRtbCArICc8cD5OdW1iZXIgb2YgUHVibGljYXRpb25zOiAnICsgbnVtYmVyT2ZQdWJzICsgJzwvcD4nO1xuXHRcdFx0XHRodG1sID0gZC50b29sdGlwSHRtbDtcblx0XHRcdFx0aWYgKGNhbGxiYWNrICE9IG51bGwpIHtcblx0XHRcdFx0XHRjYWxsYmFjayhodG1sKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0cmV0dXJuIGh0bWw7XG5cdFx0XHR9XG5cblx0XHR9KTtcblx0XHRyZXR1cm4gaHRtbDtcblx0fVxuXG5cdGZ1bmN0aW9uIGJ5cGFzc0FqYXgoZCkge1xuXHRcdGQudXBkYXRlZFByb3BzID0gdHJ1ZTtcblx0XHR2YXIgaHRtbCA9IG1ha2VOb2RlVG9vbHRpcEh0bWwoZCk7XG5cdFx0cmV0dXJuIGh0bWxcblx0fVxuXG5cdGZ1bmN0aW9uIG1ha2VOb2RlVG9vbHRpcEh0bWwoZCkge1xuXHRcdHZhciBzcGFuID0gJCggJzxzcGFuPicgKTtcblx0XHRzcGFuLmFwcGVuZCggJCggJzxwIGNsYXNzPVwidGl0bGVcIj4nICkudGV4dChkLlRpdGxlKSApO1xuXHRcdHNwYW4uYXBwZW5kKCAkKCAnPHAgY2xhc3M9XCJhdXRob3JzXCI+JyApLnRleHQoZC5hdXRob3Jfc3RyKSApO1xuXHRcdHNwYW4uYXBwZW5kKCAkKCAnPHAgY2xhc3M9XCJ2ZW51ZVwiPicgKS50ZXh0KGQudmVudWUpICk7XG5cdFx0c3Bhbi5hcHBlbmQoICQoICc8cCBjbGFzcz1cInllYXJcIj4nICkudGV4dChkLlllYXIpICk7XG5cdFx0Ly8gc3Bhbi5hcHBlbmQoICQoICc8cCBjbGFzcz1cInRvb2x0aXAgZG9tYWluXCI+JyApLnRleHQoXCJDYXRlZ29yeTogXCIgKyBkLkRvbWFpbk5hbWUpICk7XG5cdFx0c3Bhbi5hcHBlbmQoICQoICc8cCBjbGFzcz1cImRvbWFpblwiPicgKS50ZXh0KFwiQ2F0ZWdvcmllczogXCIgKyBkLkZpZWxkX29mX3N0dWR5X25hbWVzKSApO1xuXHRcdC8vIHNwYW4uYXBwZW5kKCAkKCAnPHAgY2xhc3M9XCJ0b29sdGlwIGpzX2RpdlwiPicgKS50ZXh0KFwiSlMgRGl2ZXJnZW5jZTogXCIgKyBkLmpzX2RpdikgKTtcblx0XHQvLyBzcGFuLmFwcGVuZCggJCggJzxwIGNsYXNzPVwidG9vbHRpcCBhdmdfZGlzdGFuY2VcIj4nICkudGV4dChcIkF2ZXJhZ2UgY2x1c3RlciBkaXN0YW5jZTogXCIgKyBkLmF2ZXJhZ2VfY2x1c3Rlcl9kaXN0YW5jZV90b19jZW50ZXIpICk7XG5cdFx0Ly8gc3Bhbi5hcHBlbmQoICQoICc8cCBjbGFzcz1cInRvb2x0aXAgZm9zX2ttZWFuc19jYXRlZ29yeVwiPicgKS50ZXh0KFwiRk9TIEttZWFucyBjYXRlZ29yeTogXCIgKyBkLmZvc19rbWVhbnNfY2F0ZWdvcnkpICk7XG5cdFx0ZC50b29sdGlwSHRtbCA9IHNwYW4uaHRtbCgpO1xuXHRcdHZhciBodG1sID0gZC50b29sdGlwSHRtbDtcblx0XHRyZXR1cm4gaHRtbDtcblx0XHRcblx0fVxufVxuXG5mdW5jdGlvbiBsZWdlbmRUb29sdGlwcygpIHtcblx0dmFyIHdpbmRvd1dpZHRoID0gJCh3aW5kb3cpLndpZHRoKCk7XG5cdHZhciBvdGhlckh0bWwgPSAnPHA+VGhlc2UgYXJlIHBhcGVycyBpbiBjYXRlZ29yaWVzIG90aGVyIHRoYW4gdGhlIG9uZXMgYWJvdmUuIFBvaW50IHlvdXIgbW91c2UgYXQgYSBzcGVjaWZpYyBwYXBlciB0byBzZWUgdGhlIG5hbWUgb2YgdGhlIGNhdGVnb3J5LjwvcD4nO1xuXHQkKCcubGVnZW5kSXRlbS5vdGhlcicpLnRvb2x0aXBzdGVyKHtcblx0XHR0aGVtZTogJ3Rvb2x0aXBzdGVyLW5vaXInLFxuXHRcdG1heFdpZHRoOiB3aW5kb3dXaWR0aCAqIC41LFxuXHRcdGFuaW1hdGlvbjogbnVsbCxcblx0XHRhbmltYXRpb25kdXJhdGlvbjogMCxcblx0XHRkZWxheTogMCxcblx0XHR1cGRhdGVBbmltYXRpb246IG51bGwsXG5cdFx0Y29udGVudDogb3RoZXJIdG1sLFxuXHRcdGNvbnRlbnRBc0hUTUw6IHRydWVcblx0fSk7XG5cblx0dmFyIGhlYWRlckh0bWwgPSBcIjxwPlRoZSBkYXRhIHVuZGVybHlpbmcgdGhpcyB2aXN1YWxpemF0aW9uIGNvbWVzIGZyb20gdGhlIE1pY3Jvc29mdCBBY2FkZW1pYyBHcmFwaC4gRWFjaCBkb2N1bWVudCBoYXMgbXVsdGlwbGUgYXNzb2NpYXRlZCBGaWVsZHMgb2YgU3R1ZHkuIEhlcmUsIHRoZXNlIEZpZWxkcyBhcmUgY29tYmluZWQgd2l0aCB0aGUgZG9jdW1lbnQncyB0aXRsZSwgd2VpZ2h0ZWQgdXNpbmcgVEYtSURGLCBhbmQgYXNzaWduZWQgYSBjYXRlZ29yeSB1c2luZyBLLU1lYW5zIGNsdXN0ZXJpbmcuIE1vdXNlIG92ZXIgdGhlIGNhdGVnb3JpZXMgdG8gaGlnaGxpZ2h0IGl0cyBwYXBlcnMsIGFuZCB0byBzZWUgbW9yZSBpbXBvcnRhbnQgdGVybXMuPC9wPlwiO1xuXHQkKCcuZWdvR3JhcGhWaXNMZWdlbmRIZWFkZXInKS50b29sdGlwc3Rlcih7XG5cdFx0dGhlbWU6ICd0b29sdGlwc3Rlci1ub2lyJyxcblx0XHRtYXhXaWR0aDogd2luZG93V2lkdGggKiAuNSxcblx0XHRhbmltYXRpb246IG51bGwsXG5cdFx0YW5pbWF0aW9uZHVyYXRpb246IDAsXG5cdFx0ZGVsYXk6IDAsXG5cdFx0dXBkYXRlQW5pbWF0aW9uOiBudWxsLFxuXHRcdGNvbnRlbnQ6IGhlYWRlckh0bWwsXG5cdFx0Y29udGVudEFzSFRNTDogdHJ1ZVxuXHR9KTtcblxuXHQkKCcubGVnZW5kSXRlbScpLnRvb2x0aXBzdGVyKHtcblx0XHR0aGVtZTogJ3Rvb2x0aXBzdGVyLW5vaXInLFxuXHRcdG1heFdpZHRoOiB3aW5kb3dXaWR0aCAqIC41LFxuXHRcdGFuaW1hdGlvbjogbnVsbCxcblx0XHRhbmltYXRpb25kdXJhdGlvbjogMCxcblx0XHRkZWxheTogMCxcblx0XHR1cGRhdGVBbmltYXRpb246IG51bGwsXG5cdFx0Y29udGVudDogJzxwPkxvYWRpbmcuLi48L3A+Jyxcblx0XHRjb250ZW50QXNIVE1MOiB0cnVlLFxuXHRcdGZ1bmN0aW9uQmVmb3JlOiBmdW5jdGlvbihpbnN0YW5jZSwgaGVscGVyKSB7XG5cdFx0XHR2YXIgbGVnZW5kSXRlbSA9IGQzLnNlbGVjdChoZWxwZXIub3JpZ2luKTtcblx0XHRcdGxlZ2VuZEl0ZW0uZWFjaChmdW5jdGlvbihkKSB7XG5cdFx0XHRcdHZhciBodG1sID0gXCI8aDM+VG9wIHRlcm1zIGluIGNhdGVnb3J5IFwiICsgZC5Eb21haW5JRCArIFwiOjwvaDM+XCI7XG5cdFx0XHRcdGh0bWwgPSBodG1sICsgXCI8dWw+XCJcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDAsIGxlbiA9IGQuRG9tYWluTmFtZS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0XHRcdGh0bWwgPSBodG1sICsgXCI8bGk+XCIgKyBkLkRvbWFpbk5hbWVbaV0gKyBcIjwvbGk+XCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0aHRtbCA9IGh0bWwgKyBcIjwvdWw+XCJcblx0XHRcdFx0aW5zdGFuY2UuY29udGVudChodG1sKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fSk7XG5cdFx0fSxcblx0fSk7XG59XG4vLyBodHRwOi8vY29kZXJldmlldy5zdGFja2V4Y2hhbmdlLmNvbS9xdWVzdGlvbnMvNzc2MTQvY2FwaXRhbGl6ZS10aGUtZmlyc3QtY2hhcmFjdGVyLW9mLWFsbC13b3Jkcy1ldmVuLXdoZW4tZm9sbG93aW5nLWFcblN0cmluZy5wcm90b3R5cGUuY2FwaXRhbGl6ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnRvTG93ZXJDYXNlKCkucmVwbGFjZSggL1xcYlxcdy9nLCBmdW5jdGlvbihtKSB7XG4gICAgICAgIHJldHVybiBtLnRvVXBwZXJDYXNlKCk7XG4gICAgfSk7XG59O1xuXG5cbmZ1bmN0aW9uIGVnb0dyYXBoVmlzKGRhdGEpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXHRzZWxmLmRhdGEgPSBkYXRhO1xuXHRzZWxmLm5vdEVnb05vZGVzID0gc2VsZi5kYXRhLm5vZGVzLnNsaWNlKDEpO1xuXHRjb25zb2xlLmxvZyhzZWxmLmRhdGEpO1xuXG5cdC8vIERlZmF1bHRzXG5cdC8vIEdyYXBoIFNWRyBEaW1lbnNpb25zXG4gICAgLy8gc2VsZi5ncmFwaERpbWVuc2lvbnMgPSB7XG4gICAgLy8gICAgIHdpZHRoOiA5NjAsXG4gICAgLy8gICAgIGhlaWdodDogNTAwXG4gICAgLy8gfTtcblx0c2VsZi5ncmFwaERpbWVuc2lvbnM7ICAvLyBpbXBvcnRlZCBpbiBzZWxmLmltcG9ydERlZmF1bHRPcHRpb25zIGJlbG93XG5cdFxuXHRzZWxmLmNvbG9yU2NoZW1lO1xuXG4gICAgLy8gTm9kZSBwbGFjZW1lbnQgb3B0aW9uczpcbiAgICAvLyBcImZvcmNlMVwiOiBub2RlcyBwbGFjZWQgYnkgcnVubmluZyB0aGUgZm9yY2UgbGF5b3V0IGFuZCB0aGVuIGZyZWV6aW5nXG4gICAgLy8gXCJzcGlyYWxcIiBwbGFjZXMgdGhlIG5vZGVzIGluIGEgc3BpcmFsIGZvcm1hdGlvbiB3aXRoIHRoZSBlZ28gbm9kZSBhdCB0aGUgY2VudGVyXG5cdC8vIFwic3BpcmFsMlwiOiBhbHRlcm5hdGUgc3BpcmFsIGFsZ29yaXRobVxuICAgIC8vIEFERCBNT1JFXG4gICAgc2VsZi5ub2RlUGxhY2VtZW50T3B0aW9ucyA9IFtcImZvcmNlMVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzcGlyYWxcIixcblx0XHRcdFx0XHRcdFx0XHQgXCJzcGlyYWwyXCJdO1xuXHRzZWxmLm5vZGVQbGFjZW1lbnQgPSBzZWxmLm5vZGVQbGFjZW1lbnRPcHRpb25zWzFdO1xuXHRcblx0c2VsZi56b29tYWJsZSA9IGZhbHNlO1xuXG5cdHNlbGYuc3ZnO1xuICAgIHNlbGYuZ3JvdXA7XG5cdHNlbGYubm9kZTtcblx0c2VsZi5saW5rO1xuXHRzZWxmLmVnb05vZGU7XG5cblx0c2VsZi5laWdlbkZhY3RvclNjYWxlO1xuXG5cdC8vIHNlbGYubG9hZGluZ1RleHQ7XG5cblx0c2VsZi5kb21haW5zVGhpc0dyYXBoO1xuICAgIHNlbGYubGVnZW5kO1xuXG4gICAgc2VsZi55ZWFyVGV4dERpc3BsYXk7XG5cbiAgICBzZWxmLmF1dGhvckltYWdlRGl2O1xuXG4gICAgc2VsZi50b29sdGlwO1xuXHRzZWxmLnRpcDtcblxuXHRzZWxmLnRpY2s7XG5cdHNlbGYuZm9yY2U7XG5cbiAgICAvLyBTZWUgaHR0cDovL2NvbG9yYnJld2VyMi5vcmcvP3R5cGU9cXVhbGl0YXRpdmUmc2NoZW1lPVNldDEmbj04XG4gICAgLy8gc2VsZi5jb2xvclNjaGVtZSA9IFsncmdiKDIyOCwyNiwyOCknLCdyZ2IoNTUsMTI2LDE4NCknLCdyZ2IoNzcsMTc1LDc0KScsXG5cdC8vIFx0J3JnYigxNTIsNzgsMTYzKScsJ3JnYigyNTUsMTI3LDApJywncmdiKDI1NSwyNTUsNTEpJyxcblx0Ly8gXHQncmdiKDE2Niw4Niw0MCknLCdyZ2IoMjQ3LDEyOSwxOTEpJ11cbiAgICAvLyAvLyBJIGxpa2VkIHRoZSBibHVlIGJldHRlciBmb3IgdGhlIG1haW4gY29sb3IsIHNvIHRoZSBuZXh0IGxpbmUganVzdCBtb3Zlc1xuICAgIC8vIC8vIHRoZSBibHVlIGNvbG9yIChvcmlnaW5hbGx5IHNlbGYuY29sb3JTY2hlbWVbMV0pIHRvIHRoZSBmcm9udCAoc2VsZi5jb2xvclNjaGVtZVswXSlcbiAgICAvLyBzZWxmLmNvbG9yU2NoZW1lLnNwbGljZSgwLCAwLCBzZWxmLmNvbG9yU2NoZW1lLnNwbGljZSgxLCAxKVswXSlcblx0c2VsZi5jb2xvclNjaGVtZTsgIC8vIGltcG9ydGVkIGluIGltcG9ydERlZmF1bHRPcHRpb25zIGJlbG93XG5cblx0Ly8gY29udGludW91cyBjb2xvciBzY2hlbWUgYmFzZWQgb24gamVuc2VuLXNoYW5ub24gZGl2ZXJnZW5jZVxuXHR2YXIgdmlyaWRpcyA9IFtcIiM0NDAxNTRcIixcIiM0NDAyNTZcIixcIiM0NTA0NTdcIixcIiM0NTA1NTlcIixcIiM0NjA3NWFcIixcIiM0NjA4NWNcIixcIiM0NjBhNWRcIixcIiM0NjBiNWVcIixcIiM0NzBkNjBcIixcIiM0NzBlNjFcIixcIiM0NzEwNjNcIixcIiM0NzExNjRcIixcIiM0NzEzNjVcIixcIiM0ODE0NjdcIixcIiM0ODE2NjhcIixcIiM0ODE3NjlcIixcIiM0ODE4NmFcIixcIiM0ODFhNmNcIixcIiM0ODFiNmRcIixcIiM0ODFjNmVcIixcIiM0ODFkNmZcIixcIiM0ODFmNzBcIixcIiM0ODIwNzFcIixcIiM0ODIxNzNcIixcIiM0ODIzNzRcIixcIiM0ODI0NzVcIixcIiM0ODI1NzZcIixcIiM0ODI2NzdcIixcIiM0ODI4NzhcIixcIiM0ODI5NzlcIixcIiM0NzJhN2FcIixcIiM0NzJjN2FcIixcIiM0NzJkN2JcIixcIiM0NzJlN2NcIixcIiM0NzJmN2RcIixcIiM0NjMwN2VcIixcIiM0NjMyN2VcIixcIiM0NjMzN2ZcIixcIiM0NjM0ODBcIixcIiM0NTM1ODFcIixcIiM0NTM3ODFcIixcIiM0NTM4ODJcIixcIiM0NDM5ODNcIixcIiM0NDNhODNcIixcIiM0NDNiODRcIixcIiM0MzNkODRcIixcIiM0MzNlODVcIixcIiM0MjNmODVcIixcIiM0MjQwODZcIixcIiM0MjQxODZcIixcIiM0MTQyODdcIixcIiM0MTQ0ODdcIixcIiM0MDQ1ODhcIixcIiM0MDQ2ODhcIixcIiMzZjQ3ODhcIixcIiMzZjQ4ODlcIixcIiMzZTQ5ODlcIixcIiMzZTRhODlcIixcIiMzZTRjOGFcIixcIiMzZDRkOGFcIixcIiMzZDRlOGFcIixcIiMzYzRmOGFcIixcIiMzYzUwOGJcIixcIiMzYjUxOGJcIixcIiMzYjUyOGJcIixcIiMzYTUzOGJcIixcIiMzYTU0OGNcIixcIiMzOTU1OGNcIixcIiMzOTU2OGNcIixcIiMzODU4OGNcIixcIiMzODU5OGNcIixcIiMzNzVhOGNcIixcIiMzNzViOGRcIixcIiMzNjVjOGRcIixcIiMzNjVkOGRcIixcIiMzNTVlOGRcIixcIiMzNTVmOGRcIixcIiMzNDYwOGRcIixcIiMzNDYxOGRcIixcIiMzMzYyOGRcIixcIiMzMzYzOGRcIixcIiMzMjY0OGVcIixcIiMzMjY1OGVcIixcIiMzMTY2OGVcIixcIiMzMTY3OGVcIixcIiMzMTY4OGVcIixcIiMzMDY5OGVcIixcIiMzMDZhOGVcIixcIiMyZjZiOGVcIixcIiMyZjZjOGVcIixcIiMyZTZkOGVcIixcIiMyZTZlOGVcIixcIiMyZTZmOGVcIixcIiMyZDcwOGVcIixcIiMyZDcxOGVcIixcIiMyYzcxOGVcIixcIiMyYzcyOGVcIixcIiMyYzczOGVcIixcIiMyYjc0OGVcIixcIiMyYjc1OGVcIixcIiMyYTc2OGVcIixcIiMyYTc3OGVcIixcIiMyYTc4OGVcIixcIiMyOTc5OGVcIixcIiMyOTdhOGVcIixcIiMyOTdiOGVcIixcIiMyODdjOGVcIixcIiMyODdkOGVcIixcIiMyNzdlOGVcIixcIiMyNzdmOGVcIixcIiMyNzgwOGVcIixcIiMyNjgxOGVcIixcIiMyNjgyOGVcIixcIiMyNjgyOGVcIixcIiMyNTgzOGVcIixcIiMyNTg0OGVcIixcIiMyNTg1OGVcIixcIiMyNDg2OGVcIixcIiMyNDg3OGVcIixcIiMyMzg4OGVcIixcIiMyMzg5OGVcIixcIiMyMzhhOGRcIixcIiMyMjhiOGRcIixcIiMyMjhjOGRcIixcIiMyMjhkOGRcIixcIiMyMThlOGRcIixcIiMyMThmOGRcIixcIiMyMTkwOGRcIixcIiMyMTkxOGNcIixcIiMyMDkyOGNcIixcIiMyMDkyOGNcIixcIiMyMDkzOGNcIixcIiMxZjk0OGNcIixcIiMxZjk1OGJcIixcIiMxZjk2OGJcIixcIiMxZjk3OGJcIixcIiMxZjk4OGJcIixcIiMxZjk5OGFcIixcIiMxZjlhOGFcIixcIiMxZTliOGFcIixcIiMxZTljODlcIixcIiMxZTlkODlcIixcIiMxZjllODlcIixcIiMxZjlmODhcIixcIiMxZmEwODhcIixcIiMxZmExODhcIixcIiMxZmExODdcIixcIiMxZmEyODdcIixcIiMyMGEzODZcIixcIiMyMGE0ODZcIixcIiMyMWE1ODVcIixcIiMyMWE2ODVcIixcIiMyMmE3ODVcIixcIiMyMmE4ODRcIixcIiMyM2E5ODNcIixcIiMyNGFhODNcIixcIiMyNWFiODJcIixcIiMyNWFjODJcIixcIiMyNmFkODFcIixcIiMyN2FkODFcIixcIiMyOGFlODBcIixcIiMyOWFmN2ZcIixcIiMyYWIwN2ZcIixcIiMyY2IxN2VcIixcIiMyZGIyN2RcIixcIiMyZWIzN2NcIixcIiMyZmI0N2NcIixcIiMzMWI1N2JcIixcIiMzMmI2N2FcIixcIiMzNGI2NzlcIixcIiMzNWI3NzlcIixcIiMzN2I4NzhcIixcIiMzOGI5NzdcIixcIiMzYWJhNzZcIixcIiMzYmJiNzVcIixcIiMzZGJjNzRcIixcIiMzZmJjNzNcIixcIiM0MGJkNzJcIixcIiM0MmJlNzFcIixcIiM0NGJmNzBcIixcIiM0NmMwNmZcIixcIiM0OGMxNmVcIixcIiM0YWMxNmRcIixcIiM0Y2MyNmNcIixcIiM0ZWMzNmJcIixcIiM1MGM0NmFcIixcIiM1MmM1NjlcIixcIiM1NGM1NjhcIixcIiM1NmM2NjdcIixcIiM1OGM3NjVcIixcIiM1YWM4NjRcIixcIiM1Y2M4NjNcIixcIiM1ZWM5NjJcIixcIiM2MGNhNjBcIixcIiM2M2NiNWZcIixcIiM2NWNiNWVcIixcIiM2N2NjNWNcIixcIiM2OWNkNWJcIixcIiM2Y2NkNWFcIixcIiM2ZWNlNThcIixcIiM3MGNmNTdcIixcIiM3M2QwNTZcIixcIiM3NWQwNTRcIixcIiM3N2QxNTNcIixcIiM3YWQxNTFcIixcIiM3Y2QyNTBcIixcIiM3ZmQzNGVcIixcIiM4MWQzNGRcIixcIiM4NGQ0NGJcIixcIiM4NmQ1NDlcIixcIiM4OWQ1NDhcIixcIiM4YmQ2NDZcIixcIiM4ZWQ2NDVcIixcIiM5MGQ3NDNcIixcIiM5M2Q3NDFcIixcIiM5NWQ4NDBcIixcIiM5OGQ4M2VcIixcIiM5YmQ5M2NcIixcIiM5ZGQ5M2JcIixcIiNhMGRhMzlcIixcIiNhMmRhMzdcIixcIiNhNWRiMzZcIixcIiNhOGRiMzRcIixcIiNhYWRjMzJcIixcIiNhZGRjMzBcIixcIiNiMGRkMmZcIixcIiNiMmRkMmRcIixcIiNiNWRlMmJcIixcIiNiOGRlMjlcIixcIiNiYWRlMjhcIixcIiNiZGRmMjZcIixcIiNjMGRmMjVcIixcIiNjMmRmMjNcIixcIiNjNWUwMjFcIixcIiNjOGUwMjBcIixcIiNjYWUxMWZcIixcIiNjZGUxMWRcIixcIiNkMGUxMWNcIixcIiNkMmUyMWJcIixcIiNkNWUyMWFcIixcIiNkOGUyMTlcIixcIiNkYWUzMTlcIixcIiNkZGUzMThcIixcIiNkZmUzMThcIixcIiNlMmU0MThcIixcIiNlNWU0MTlcIixcIiNlN2U0MTlcIixcIiNlYWU1MWFcIixcIiNlY2U1MWJcIixcIiNlZmU1MWNcIixcIiNmMWU1MWRcIixcIiNmNGU2MWVcIixcIiNmNmU2MjBcIixcIiNmOGU2MjFcIixcIiNmYmU3MjNcIixcIiNmZGU3MjVcIl07XG5cdHZhciBzcGVjdHJhbDggPSBbJyNkNTNlNGYnLCAnI2Y0NmQ0MycsICcjZmRhZTYxJywgJyNmZWUwOGInLCAnI2U2ZjU5OCcsICcjYWJkZGE0JywgJyM2NmMyYTUnLCAnIzMyODhiZCddO1xuXHR2YXIgcmFpbmJvdyA9IFtcIiMyYzdiYjZcIiwgXCIjMDBhNmNhXCIsXCIjMDBjY2JjXCIsXCIjOTBlYjlkXCIsXCIjZmZmZjhjXCIsIFwiI2Y5ZDA1N1wiLFwiI2YyOWUyZVwiLFwiI2U3NjgxOFwiLFwiI2Q3MTkxY1wiXVxuXHRzZWxmLkpTRENvbG9yU2NhbGUgPSBkMy5zY2FsZS5saW5lYXIoKVxuXHRcdC5kb21haW4oZDMuZXh0ZW50KHNlbGYubm90RWdvTm9kZXMsIGZ1bmN0aW9uKGQpIHtyZXR1cm4gZC5qc19kaXY7fSkpXG5cdFx0LnJhbmdlKFtcInJlZFwiLCBcImJsdWVcIl0pO1xuXHRzZWxmLkNsdXN0ZXJEaXN0YW5jZUNvbG9yU2NhbGUgPSBkMy5zY2FsZS5saW5lYXIoKVxuXHRcdC5kb21haW4oZDMuZXh0ZW50KHNlbGYubm90RWdvTm9kZXMsIGZ1bmN0aW9uKGQpIHtyZXR1cm4gZC5hdmVyYWdlX2NsdXN0ZXJfZGlzdGFuY2VfdG9fY2VudGVyO30pKVxuXHRcdC5yYW5nZShzcGVjdHJhbDgpO1xuXG4gICAgLy8gT3BhY2l0eSB2YWx1ZXNcbiAgICBzZWxmLm9wYWNpdHlWYWxzID0ge1xuXHRcdG5vZGU6IDEsIFxuXHRcdG5vZGVQcmV2WWVhcjogLjYsXG5cdFx0bGlua1RvRWdvOiAuMTIsXG5cdFx0bGlua05vdFRvRWdvOiAuMTIsXG5cdFx0bGlua1ByZXZZZWFyOiAuMDRcblx0fTtcblxuXHRzZWxmLmRvQW5ub3RhdGlvbnMgPSBmYWxzZTtcblxuICAgIHNlbGYuYW5pbWF0aW9uU3RhdGU7ICAvLyBcImZvcndhcmRcIiwgXCJyZXdpbmRcIiwgXCJzdG9wcGVkXCJcblx0c2VsZi50cmFuc2l0aW9uVGltZVBlclllYXI7IC8vIGltcG9ydGVkIGluIGltcG9ydERlZmF1bHRPcHRpb25zIGJlbG93XG5cdC8vIHNlbGYudHJhbnNpdGlvblRpbWVQZXJOb2RlID0gMTAwOyAgLy8gVEVTVFxuXHRzZWxmLnRyYW5zaXRpb25UaW1lUGVyTm9kZTsgLy8gY2FsY3VsYXRlZCBpbiBjYWxjdWxhdGVUcmFuc2l0aW9uVGltZSgpXG4gICAgLy8gc2VsZi5ub2RlQXBwZWFyRHVyYXRpb24gPSBzZWxmLnRyYW5zaXRpb25UaW1lUGVyTm9kZSAqIDQ7XG5cdC8vIEkgaGF2ZW4ndCBhY3R1YWxseSBnb3R0ZW4gaXQgdG8gd29yayBoYXZpbmcgZGlmZmVyZW50IHRyYW5zaXRpb25UaW1lUGVyTm9kZSBhbmQgbm9kZUFwcGVhckR1cmF0aW9uXG5cdHNlbGYubGlua0FwcGVhckR1cmF0aW9uID0gNTAwO1xuICAgIHNlbGYuY3Vyck5vZGVJbmRleDsgIC8vIEluZGV4IG9mIG5vZGUgY3VycmVudGx5IGJlaW5nIGFubm90YXRlZFxuICAgIHNlbGYuZGVzdGluYXRpb25Ob2RlSW5kZXg7ICAvLyBJbmRleCBvZiBub2RlIHRvIHdoaWNoIHRoZSBhbmltYXRpb24gaXMgY3VycmVudGx5IG1vdmluZ1xuICAgIHNlbGYuZGVzdGluYXRpb25ZZWFyO1xuICAgIHNlbGYuY3VyclllYXI7XG5cblx0Ly8gc2VsZi5kZXN0aW5hdGlvbk5vZGVJbmRleCA9IDIwMDsgIC8vIFRFU1Rcblx0c2VsZi5kZXN0aW5hdGlvbk5vZGVJbmRleCA9IHNlbGYuZGF0YS5ub2Rlcy5sZW5ndGgtMTsgIC8vIFRFU1RcblxuXHQvL3Rlc3Rpbmdcblx0c2VsZi5jID0gMDtcblx0c2VsZi50dCA9IDA7XG5cblx0Ly8gc2VsZi5pbml0KCk7XG5cblx0cmV0dXJuIHNlbGY7XG5cbn1cblxuZWdvR3JhcGhWaXMucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgc2VsZi50aWNrID0gc2VsZi5tYWtlVGljaygpO1xuICAgIHNlbGYuZm9yY2UgPSBzZWxmLm1ha2VGb3JjZSgpO1xuXHRpZiAoc2VsZi56b29tYWJsZSA9PT0gdHJ1ZSkge1xuXHRcdHNlbGYuem9vbSA9IHNlbGYubWFrZVpvb20oKTtcblx0fVxuICAgIC8vIHNlbGYuZHJhZyA9IHNlbGYubWFrZURyYWcoKTtcblx0XG5cdHNlbGYuYW5pbWF0aW9uU3RhdGUgPSAnaW5pdCc7XG5cblx0c2VsZi5nZXREb21haW5zVGhpc0dyYXBoKCk7XG5cblx0c2VsZi5zdmcgPSBkMy5zZWxlY3QoJyNncmFwaERpdicpLmFwcGVuZCgnc3ZnJylcblx0XHQuYXR0cignaWQnLCAnZ3JhcGhTdmcnKVxuXHRcdC5hdHRyKCd3aWR0aCcsIHNlbGYuZ3JhcGhEaW1lbnNpb25zLndpZHRoKVxuXHRcdC5hdHRyKCdoZWlnaHQnLCBzZWxmLmdyYXBoRGltZW5zaW9ucy5oZWlnaHQpO1xuXG5cdC8vIHNlbGYudGlwID0gZDMudGlwKClcblx0Ly8gXHQuYXR0cignY2xhc3MnLCAnZDMtdGlwJylcblx0Ly8gXHQuc3R5bGUoJ2N1cnNvcicsICdkZWZhdWx0Jylcblx0Ly8gXHQuc3R5bGUoJ2JvcmRlci1zdHlsZScsICdzb2xpZCcpXG5cdC8vIFx0Ly8gLnN0eWxlKCdib3JkZXItY29sb3InLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLmNvbG9yOyB9KVxuXHQvLyBcdC5zdHlsZSgncG9pbnRlci1ldmVudHMnLCAnbm9uZScpO1xuXHQvLyBzZWxmLnN2Zy5jYWxsKHNlbGYudGlwKTtcblxuICAgIHNlbGYuZ3JvdXAgPSBzZWxmLnN2Zy5hcHBlbmQoJ2cnKVxuXHRcdCAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdncmFwaENvbnRhaW5lcicpXG4gICAgc2VsZi5saW5rID0gc2VsZi5ncm91cC5hcHBlbmQoJ3N2ZzpnJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpbmtzJylcbiAgICAgICAgICAgICAgICAgICAgLnNlbGVjdEFsbCgnLmxpbmsnKTtcbiAgICBzZWxmLm5vZGUgPSBzZWxmLmdyb3VwLmFwcGVuZCgnc3ZnOmcnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbm9kZXMnKVxuICAgICAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCcubm9kZScpO1xuXHRcbiAgICAvLyBJbml0aWFsaXplIHRvb2x0aXAgZm9yIG5vZGVzICh3aGljaCB3aWxsIGJlIHZpc2libGUgb24gbW91c2VvdmVyIG9mIG5vZGVzKVxuICAgIHNlbGYudG9vbHRpcCA9IGQzLnNlbGVjdCgnYm9keScpXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdub2RlVG9vbHRpcCcpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgncG9zaXRpb24nLCAnYWJzb2x1dGUnKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3dpZHRoJywgc2VsZi5ncmFwaERpbWVuc2lvbnMud2lkdGggLyA0ICsgJ3B4JylcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCd6LWluZGV4JywgJzEwJylcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuXG5cdC8vIEFkZCBzcGVjaWFsIHByb3BlcnRpZXMgdG8gdGhlIGVnbyBub2RlOlxuXHRzZWxmLmRhdGEubm9kZXNbMF0uZml4ZWQgPSB0cnVlO1xuXHQvLyBwb3NpdGlvbiBpbiBjZW50ZXJcblx0c2VsZi5kYXRhLm5vZGVzWzBdLnggPSBzZWxmLmdyYXBoRGltZW5zaW9ucy53aWR0aC8yO1xuXHRzZWxmLmRhdGEubm9kZXNbMF0ueSA9IHNlbGYuZ3JhcGhEaW1lbnNpb25zLmhlaWdodC8yO1xuXHQvLyBzZWxmLmRhdGEubm9kZXNbMF0uY29sb3IgPSBzZWxmLmNvbG9yU2NoZW1lWzBdO1xuXHRzZWxmLmRhdGEubm9kZXNbMF0uY29sb3IgPSBzZWxmLkpTRENvbG9yU2NhbGUoMCk7XG5cdHNlbGYuZWdvTm9kZSA9IHNlbGYuZGF0YS5ub2Rlc1swXTtcblx0XG5cdC8vIFNldCB1cCBhIHNjYWxlIGZvciBFaWdlbmZhY3RvciBpbiBvcmRlciB0byBlbmNvZGUgc2l6ZSBvZiBub2RlcyBieSBFaWdlbmZhY3RvciAoaW5mbHVlbmNlKVxuXHR2YXIgZWlnZW5GYWN0b3JNYXggPSBkMy5tYXgoc2VsZi5kYXRhLm5vZGVzLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLkVGOyB9KTtcblx0c2VsZi5laWdlbkZhY3RvclNjYWxlID0gZDMuc2NhbGUubGluZWFyKClcblx0XHQuZG9tYWluKFswLCBlaWdlbkZhY3Rvck1heF0pXG5cdFx0LnJhbmdlKFswLCAxXSk7XG5cdHNlbGYuZGF0YS5ub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uKGQpIHtcblx0XHRpZiAoZC5ub2RlVHlwZSA9PT0gJ3BhcGVyJykge1xuXHRcdFx0ZC5yYWRpdXMgPSA0LjUgKyAoc2VsZi5laWdlbkZhY3RvclNjYWxlKGQuRUYpICogMTApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkLnJhZGl1cyA9IDEwO1xuXHRcdH1cblx0fSk7XG5cbiAgICAvLyBhZGQgZ3JhcGggcHJvcGVydGllc1xuXHRzZWxmLmZvcmNlLm5vZGVzKHNlbGYuZGF0YS5ub2Rlcyk7XG5cdFxuICAgIC8vIHVwZGF0ZSBub2RlIGVsZW1lbnRzXG4gICAgc2VsZi5ub2RlID0gc2VsZi5ub2RlLmRhdGEoc2VsZi5kYXRhLm5vZGVzKTtcbiAgICAvL3NlbGYubm9kZS5leGl0KCkucmVtb3ZlKCk7XG4gICAgdmFyIG5ld05vZGUgPSBzZWxmLm5vZGUuZW50ZXIoKTtcblxuICAgIG5ld05vZGUgPSBuZXdOb2RlLmFwcGVuZCgnc3ZnOmNpcmNsZScpXG5cdFx0Ly90ZXN0XG5cdFx0LmF0dHIoJ2NsYXNzJywgJ25vZGUnKVxuXHRcdC8vIGFkZCBjbGFzcyBmb3IgdGhlIGNlbnRlciBub2RlXG5cdFx0LmNsYXNzZWQoJ2NlbnRlck5vZGUnLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLmlkID09PSBzZWxmLmVnb05vZGUuaWQ7IH0pXG5cdFx0LmF0dHIoJ3InLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLnJhZGl1czsgfSlcbiAgICAgICAgLy8gLmF0dHIoJ2NsYXNzJywgJ25vZGUgaGlkZGVuJylcbiAgICAgICAgLy8gXCJUXCIgYXR0cmlidXRlIHdpbGwga2VlcCB0cmFjayBvZiB0aGUgdHJhbnNpdGlvbiB0aW1lIGVsYXBzZWRcbiAgICAgICAgLmF0dHIoJ1QnLCAwKVxuICAgICAgICAvLyBTdGFydCB3aXRoIHRoZSBub2RlIGludmlzaWJsZVxuICAgICAgICAuYXR0cigncicsMWUtOSlcblx0XHQuZWFjaChmdW5jdGlvbihkKSB7XG5cdFx0XHRkLkRvbWFpbk5hbWUgPSBzZWxmLmRhdGEuZ3JhcGguRG9tYWluc1tkLkRvbWFpbklEXTtcblx0XHRcdGlmIChzZWxmLmRhdGEubm9kZXNbMF0ubmFtZSA9PT0gXCJTY2llbmNlIENvbW11bmljYXRpb24gYW5kIE1pc2luZm9ybWF0aW9uXCIpIHtcblx0XHRcdFx0ZC5jb2xvciA9IHNlbGYuY29sb3JTY2hlbWVbZC50ZmlkZl9rbWVhbnNfY2F0ZWdvcnldO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Zm9yICh2YXIgaT0wOyBpPHNlbGYuZG9tYWluc1RoaXNHcmFwaC5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdHZhciB0aGlzRG9tYWluID0gc2VsZi5kb21haW5zVGhpc0dyYXBoW2ldLmtleVxuXHRcdFx0XHRcdGlmICh0aGlzRG9tYWluPT1kLkRvbWFpbklEKSB7XG5cdFx0XHRcdFx0XHQvLyB2YXIgdGhpc0NvbG9yID0gc2VsZi5jb2xvclNjaGVtZVtpXTtcblx0XHRcdFx0XHRcdHZhciB0aGlzQ29sb3IgPSBzZWxmLmRvbWFpbnNUaGlzR3JhcGhbaV0uY29sb3I7XG5cdFx0XHRcdFx0XHRkLmNvbG9yID0gdGhpc0NvbG9yO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0Ly8gZC5jb2xvciA9IHNlbGYuSlNEQ29sb3JTY2FsZShkLmpzX2Rpdik7XG5cdFx0XHQvLyBkLmNvbG9yID0gc2VsZi5DbHVzdGVyRGlzdGFuY2VDb2xvclNjYWxlKGQuYXZlcmFnZV9jbHVzdGVyX2Rpc3RhbmNlX3RvX2NlbnRlcik7XG5cblx0XHRcdC8vIGQuY29sb3IgPSBzZWxmLmNvbG9yU2NoZW1lW2QuZm9zX2ttZWFuc19jYXRlZ29yeV07XG5cblx0XHRcdC8vIGQuY29sb3IgPSBzZWxmLmNvbG9yU2NoZW1lW2QudGZpZGZfa21lYW5zX2NhdGVnb3J5XTtcblx0XHR9KVxuICAgICAgICAvLyBDb2xvciBieSBkaWZmZXJlbnQgY2F0ZWdvcmllcyBvZiBob3cgc2ltaWxhciB0aGUgbm9kZSdzIGNsdXN0ZXIgaXMgdG8gdGhlIGVnbyBub2RlXG4gICAgICAgIC5hdHRyKCdmaWxsJywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgLy8gY29sb3IgdGhlIG5vZGVzIGJhc2VkIG9uIERvbWFpbklEXG5cdFx0XHRyZXR1cm4gZC5jb2xvclxuICAgICAgICB9KVxuICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCBzZWxmLm9wYWNpdHlWYWxzLm5vZGUpO1xuXG4gICAgbmV3Tm9kZS5jYWxsKHNlbGYuZm9yY2UuZHJhZyk7XG5cblx0Ly8gc2VsZi5lZ29Ob2RlID0gc2VsZi5ub2RlLmZpbHRlcihmdW5jdGlvbihkKSB7IHJldHVybiBkLmlkeCA9PT0gMDsgfSk7XG5cdFxuICAgIC8vIHVwZGF0ZSBsaW5rIGVsZW1lbnRzXG5cdHNlbGYuZm9yY2UubGlua3Moc2VsZi5kYXRhLmxpbmtzKTtcblxuICAgIHNlbGYubGluayA9IHNlbGYubGluay5kYXRhKHNlbGYuZGF0YS5saW5rcyk7XG4gICAgLy9zZWxmLmxpbmsuZXhpdCgpLnJlbW92ZSgpO1xuXHR2YXIgbmV3TGluayA9IHNlbGYubGlua1xuXHRcdC5lbnRlcigpXG5cdFx0LmFwcGVuZCgnc3ZnOmxpbmUnKVxuXHRcdC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uKGQpIHtcblx0XHRcdC8vIGlmIChkLnRhcmdldCA9PT0gMCkgeyByZXR1cm4gJ2xpbmsgdG9FZ28gbGlua1RvRWdvJzsgfVxuXHRcdFx0Ly8gZWxzZSB7IHJldHVybiAnbGluayBub3RUb0VnbyBsaW5rTm90VG9FZ28nOyB9XG5cdFx0XHRpZiAoZC50YXJnZXQgPT09IDApIHsgcmV0dXJuICdsaW5rIGhpZGRlbiB0b0VnbyBsaW5rVG9FZ28nOyB9XG5cdFx0XHRlbHNlIHsgcmV0dXJuICdsaW5rIGhpZGRlbiBub3RUb0VnbyBsaW5rTm90VG9FZ28nOyB9XG5cdFx0fSlcblx0XHQvLyBcIlRcIiBhdHRyaWJ1dGUgd2lsbCBrZWVwIHRyYWNrIG9mIHRoZSB0cmFuc2l0aW9uIHRpbWUgZWxhcHNlZFxuXHRcdC5hdHRyKCdUJywgMClcblx0XHQvLyBMaW5rcyB0byB0aGUgZWdvIG5vZGUgYXJlIGRhcmtlciB0aGFuIGxpbmtzIGJldHdlZW4gdGhlIG90aGVyc1xuXHRcdC5zdHlsZSgnb3BhY2l0eScsIGZ1bmN0aW9uKGQpIHtcblx0XHRcdHZhciBvcFZhbHMgPSBzZWxmLm9wYWNpdHlWYWxzO1xuXHRcdFx0aWYgKGQubGlua1RvRWdvKSB7XG5cdFx0XHRcdHJldHVybiBvcFZhbHMubGlua1RvRWdvO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIG9wVmFscy5saW5rTm90VG9FZ287XG5cdFx0XHR9XG5cdFx0XHQvLyByZXR1cm4gLjU7XG5cdFx0XHQvLyBpZiAoZC50YXJnZXQgPT09IDApIHsgcmV0dXJuIHNlbGYuZ3JhcGhQYXJhbXMub3BhY2l0eVZhbHMudmFsdWUubGlua1RvRWdvOyB9XG5cdFx0XHQvLyBlbHNlIHsgcmV0dXJuIHNlbGYuZ3JhcGhQYXJhbXMub3BhY2l0eVZhbHMudmFsdWUubGlua05vdFRvRWdvOyB9XG5cdFx0fSk7XG5cblx0ZnVuY3Rpb24gcGxhY2VOb2RlcygpIHtcblx0XHQvLyBUaGlzIGZ1bmN0aW9uIHdpbGwgZGV0ZXJtaW5lIHRoZSBmaW5hbCBzcGF0aWFsIHBsYWNlbWVudCBvZiBhbGwgb2YgdGhlIG5vZGVzLlxuXG5cdFx0c3dpdGNoIChzZWxmLm5vZGVQbGFjZW1lbnQpIHtcblx0XHRcdGNhc2Ugc2VsZi5ub2RlUGxhY2VtZW50T3B0aW9uc1swXTpcblx0XHRcdFx0Ly8gUGxhY2UgdGhlIG5vZGVzIHVzaW5nIHRoZSBmb3JjZSBsYXlvdXQuXG5cdFx0XHRcdC8vIFVzZXMgdGhlIGZvcmNlIGxheW91dCBwYXJhbWV0ZXJzIGluIHNlbGYubWFrZUZvcmNlXG5cdFx0XHRcdHNlbGYuZm9yY2Uuc3RhcnQoKTtcblx0XHRcdFx0Ly8gRXhlY3V0ZSBmb3JjZSBhIGJpdCwgdGhlbiBzdG9wXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpPDEwMDAwMDsgKytpKSBzZWxmLmZvcmNlLnRpY2soKTtcblx0XHRcdFx0c2VsZi5mb3JjZS5zdG9wKCk7XG5cdFx0XHRcdG5ld05vZGUuZWFjaChmdW5jdGlvbihkKSB7IGQuZml4ZWQgPSB0cnVlOyB9KTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2Ugc2VsZi5ub2RlUGxhY2VtZW50T3B0aW9uc1sxXTpcblx0XHRcdFx0Ly8gUGxhY2UgdGhlIG5vZGVzIGluIHNwaXJhbCBmb3JtYXRpb24uXG5cdFx0XHRcdHZhciBjeCA9IHNlbGYuZWdvTm9kZS54LFxuXHRcdFx0ICAgICAgICBjeSA9IHNlbGYuZWdvTm9kZS55LFxuXHRcdFx0ICAgICAgICAvLyBpbml0aWFsUmFkID0gNjA7XG5cdFx0XHQgICAgICAgIGluaXRpYWxSYWQgPSAyMDtcblx0XHRcdFx0dmFyIG51bU5vZGVzID0gc2VsZi5kYXRhLm5vZGVzLmxlbmd0aDtcblx0XHRcdFx0Ly8gY29uc29sZS5sb2cobnVtTm9kZXMpO1xuXHRcdFx0XHRuZXdOb2RlLmVhY2goZnVuY3Rpb24oZCwgaSkge1xuXHRcdFx0XHRcdGlmIChkLmlkeCAhPSAwKSB7XG5cdFx0XHRcdFx0XHRkLmZpeGVkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdC8vIHZhciB0aGlzUmFkID0gaSAqIDIgKyBpbml0aWFsUmFkO1xuXHRcdFx0XHRcdFx0Ly8gdmFyIHRoaXNTcGFjaW5nID0gaSAqIChNYXRoLlBJLyg4LjUrLjEqaSkpO1xuXG5cdFx0XHRcdFx0XHR2YXIgdGhpc1JhZCA9IE1hdGgucG93KGksIDEpICogLjk1ICsgaW5pdGlhbFJhZDtcblx0XHRcdFx0XHRcdHZhciB0aGlzU3BhY2luZyA9IGkgKiAoTWF0aC5QSS8oOC41Ky4wNSppKSk7XG5cdFx0XHRcdFx0XHRkLnggPSBjeCArICh0aGlzUmFkICogTWF0aC5jb3ModGhpc1NwYWNpbmcpKTtcblx0XHRcdFx0XHRcdGQueSA9IGN5ICsgKHRoaXNSYWQgKiBNYXRoLnNpbih0aGlzU3BhY2luZykpO1xuXHRcdFx0XHRcdFx0Ly8gdmFyIGFuZ2xlID0gMC4xICogaTtcblx0XHRcdFx0XHRcdC8vIGQueCA9IGN4ICsgdGhpc1JhZCAqIE1hdGguY29zKGFuZ2xlKTtcblx0XHRcdFx0XHRcdC8vIGQueSA9IGN5ICsgdGhpc1JhZCAqIE1hdGguc2luKGFuZ2xlKTtcblxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdHNlbGYuZm9yY2Uuc3RhcnQoKTtcblx0XHRcdFx0c2VsZi5mb3JjZS50aWNrKCk7XG5cdFx0XHRcdHNlbGYuZm9yY2Uuc3RvcCgpO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSBzZWxmLm5vZGVQbGFjZW1lbnRPcHRpb25zWzJdOlxuXHRcdFx0XHQvLyBBbHRlcm5hdGUgc3BpcmFsIGFsZ29yaXRobVxuXHRcdFx0XHQvL1xuXHRcdFx0XHQvLyBodHRwOi8vZ2FtZWRldi5zdGFja2V4Y2hhbmdlLmNvbS9xdWVzdGlvbnMvMTY3NDUvbW92aW5nLWEtcGFydGljbGUtYXJvdW5kLWFuLWFyY2hpbWVkZWFuLXNwaXJhbC1hdC1hLWNvbnN0YW50LXNwZWVkXG5cdFx0XHRcdGZ1bmN0aW9uIGNvbXB1dGVBbmdsZShhbHBoYSwgYXJjTGVuZ3RoLCBlcHNpbG9uKSB7XG5cdFx0XHRcdFx0Ly8gYWxwaGE6IGRpc3RhbmNlIGJldHdlZW4gc3VjY2Vzc2l2ZSB0dXJuaW5nc1xuXHRcdFx0XHRcdC8vIGFyY0xlbmd0aDogZGVzaXJlZCBhcmNMZW5ndGhcblx0XHRcdFx0XHQvLyBlcHNpbG9uOiAodmFsdWUgPjApIGluZGljYXRlcyB0aGUgcHJlY2lzaW9uIG9mIHRoZSBhcHByb3hpbWF0aW9uXG5cdFx0XHRcdFx0Ly8gcmV0dXJuczogYW5nbGUgYXQgd2hpY2ggdGhlIGRlc2lyZWQgYXJjTGVuZ3RoIGlzIGFjaGlldmVkXG5cdFx0XHRcdFx0dmFyIGFuZ2xlUmFkID0gTWF0aC5QSSArIE1hdGguUEk7XG5cdFx0XHRcdFx0d2hpbGUgKHRydWUpIHtcblx0XHRcdFx0XHRcdHZhciBkID0gY29tcHV0ZUFyY0xlbmd0aChhbHBoYSwgYW5nbGVSYWQpIC0gYXJjTGVuZ3RoO1xuXHRcdFx0XHRcdFx0aWYgKE1hdGguYWJzKGQpIDw9IGVwc2lsb24pIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGFuZ2xlUmFkO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0dmFyIGRhID0gYWxwaGEgKiBNYXRoLnNxcnQoYW5nbGVSYWQgKiBhbmdsZVJhZCArIDEpO1xuXHRcdFx0XHRcdFx0YW5nbGVSYWQgPSBhbmdsZVJhZCAtIChkIC8gZGEpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRmdW5jdGlvbiBjb21wdXRlQXJjTGVuZ3RoKGFscGhhLCBhbmdsZVJhZCkge1xuXHRcdFx0XHRcdHZhciB1ID0gTWF0aC5zcXJ0KDEgKyBhbmdsZVJhZCAqIGFuZ2xlUmFkKTtcblx0XHRcdFx0XHR2YXIgdiA9IE1hdGgubG9nKGFuZ2xlUmFkICsgdSk7XG5cdFx0XHRcdFx0cmV0dXJuIDAuNSAqIGFscGhhICogKGFuZ2xlUmFkICogdSArIHYpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGZ1bmN0aW9uIGNvbXB1dGVQb2ludChhbHBoYSwgYW5nbGVSYWQpIHtcblx0XHRcdFx0XHR2YXIgZGlzdGFuY2UgPSBhbmdsZVJhZCAqIGFscGhhO1xuXHRcdFx0XHRcdHZhciB4ID0gTWF0aC5zaW4oYW5nbGVSYWQpICogZGlzdGFuY2U7XG5cdFx0XHRcdFx0dmFyIHkgPSBNYXRoLmNvcyhhbmdsZVJhZCkgKiBkaXN0YW5jZTtcblx0XHRcdFx0XHRyZXR1cm4gW3gsIHldO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGZ1bmN0aW9uIGdldEFuZ2xlcyhudW1Ob2RlcywgYWxwaGEpIHtcblx0XHRcdFx0XHR2YXIgcG9pbnRBcmNEaXN0YW5jZSA9IDU7XG5cdFx0XHRcdFx0dmFyIGVwc2lsb24gPSAuMDAwMDU7XG5cdFx0XHRcdFx0dmFyIHRvdGFsQXJjTGVuZ3RoID0gMC4wO1xuXHRcdFx0XHRcdHZhciBwcmV2aW91c0FuZ2xlUmFkID0gMC4wO1xuXHRcdFx0XHRcdHZhciBhbmdsZXMgPSBbXTtcblx0XHRcdFx0XHRmb3IgKHZhciBpID0gMCwgbGVuID0gbnVtTm9kZXM7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0XHRcdFx0dmFyIGFuZ2xlUmFkID0gY29tcHV0ZUFuZ2xlKGFscGhhLCB0b3RhbEFyY0xlbmd0aCwgZXBzaWxvbik7XG5cdFx0XHRcdFx0XHRhbmdsZXMucHVzaChhbmdsZVJhZCk7XG5cdFx0XHRcdFx0XHR0b3RhbEFyY0xlbmd0aCA9IHRvdGFsQXJjTGVuZ3RoICsgcG9pbnRBcmNEaXN0YW5jZTtcblx0XHRcdFx0XHRcdHByZXZpb3VzQW5nbGVSYWQgPSBhbmdsZVJhZDtcblx0XHRcdFx0XHRcdGlmIChpPjEwKSB7IHBvaW50QXJjRGlzdGFuY2UgPSAxMDt9XG5cdFx0XHRcdFx0XHRpZiAoaT41MCkgeyBwb2ludEFyY0Rpc3RhbmNlID0gMTU7fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gYW5nbGVzO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHZhciBudW1Ob2RlcyA9IHNlbGYuZGF0YS5ub2Rlcy5sZW5ndGg7XG5cdFx0XHRcdHZhciBhbmdsZXMgPSBnZXRBbmdsZXMobnVtTm9kZXMsIDcpO1xuXHRcdFx0XHQvLyBjb25zb2xlLmxvZyhhbmdsZXMpO1xuXHRcdFx0XHR2YXIgY3ggPSBzZWxmLmVnb05vZGUueCxcblx0XHRcdCAgICAgICAgY3kgPSBzZWxmLmVnb05vZGUueSxcblx0XHRcdCAgICAgICAgLy8gaW5pdGlhbFJhZCA9IDYwO1xuXHRcdFx0ICAgICAgICBpbml0aWFsUmFkID0gMjA7XG5cdFx0XHRcdHZhciBudW1Ob2RlcyA9IHNlbGYuZGF0YS5ub2Rlcy5sZW5ndGg7XG5cdFx0XHRcdGNvbnNvbGUubG9nKG51bU5vZGVzKTtcblx0XHRcdFx0bmV3Tm9kZS5lYWNoKGZ1bmN0aW9uKGQsIGkpIHtcblx0XHRcdFx0XHRpZiAoZC5pZHggIT0gMCkge1xuXHRcdFx0XHRcdFx0ZC5maXhlZCA9IHRydWU7XG5cdFx0XHRcdFx0XHR2YXIgdGhpc1JhZCA9IGkgKiAyICsgaW5pdGlhbFJhZDtcblx0XHRcdFx0XHRcdHZhciB0aGlzU3BhY2luZyA9IGkgKiAoTWF0aC5QSS8oOC41Ky4xKmkpKTtcblxuXHRcdFx0XHRcdFx0Ly8gdmFyIHRoaXNSYWQgPSBNYXRoLnBvdyhpLCAxKSAqIC45NSArIGluaXRpYWxSYWQ7XG5cdFx0XHRcdFx0XHQvLyB2YXIgdGhpc1NwYWNpbmcgPSBpICogKE1hdGguUEkvKDguNSsuMDUqaSkpO1xuXHRcdFx0XHRcdFx0Ly8gZC54ID0gY3ggKyAodGhpc1JhZCAqIE1hdGguY29zKHRoaXNTcGFjaW5nKSk7XG5cdFx0XHRcdFx0XHQvLyBkLnkgPSBjeSArICh0aGlzUmFkICogTWF0aC5zaW4odGhpc1NwYWNpbmcpKTtcblx0XHRcdFx0XHRcdC8vIHZhciBhbmdsZSA9IDAuMSAqIGk7XG5cdFx0XHRcdFx0XHQvLyBkLnggPSBjeCArIHRoaXNSYWQgKiBNYXRoLmNvcyhhbmdsZSk7XG5cdFx0XHRcdFx0XHQvLyBkLnkgPSBjeSArIHRoaXNSYWQgKiBNYXRoLnNpbihhbmdsZSk7XG5cdFx0XHRcdFx0XHR2YXIgcG93U2NhbGUgPSBkMy5zY2FsZS5wb3coKS5leHBvbmVudCguNykuZG9tYWluKFsxLG51bU5vZGVzXSkucmFuZ2UoWzAsNjBdKTtcblx0XHRcdFx0XHRcdHZhciBwb3dTY2FsZSA9IGQzLnNjYWxlLmxpbmVhcigpLmRvbWFpbihbMSxNYXRoLnBvdyhudW1Ob2RlcywgLjMpXSkucmFuZ2UoWzAsNjBdKTtcblx0XHRcdFx0XHRcdHZhciBwb3dTY2FsZSA9IGQzLnNjYWxlLmxvZygpLmRvbWFpbihbMTAwLCBudW1Ob2RlcysxMDBdKS5yYW5nZShbMCw2MF0pO1xuXHRcdFx0XHRcdFx0Ly8gdmFyIHRoaXNQb3MgPSBNYXRoLnBvdyhpKzEsIC43KSAqIDE7XG5cdFx0XHRcdFx0XHQvLyBjb25zb2xlLmxvZyh0aGlzUG9zKTtcblx0XHRcdFx0XHRcdHZhciBuZXdpID0gTWF0aC5wb3coaSsxLCAuMyk7XG5cdFx0XHRcdFx0XHR2YXIgbmV3aSA9IChpKSsxMDA7XG5cdFx0XHRcdFx0XHR2YXIgdGhpc1BvcyA9IHBvd1NjYWxlKG5ld2kpO1xuXHRcdFx0XHRcdFx0Ly8gY29uc29sZS5sb2codGhpc1Bvcylcblx0XHRcdFx0XHRcdHZhciBiID0gNztcblx0XHRcdFx0XHRcdHZhciB0aGlzUG9zID0gYW5nbGVzW2ldO1xuXHRcdFx0XHRcdFx0ZC54ID0gY3ggKyAoaW5pdGlhbFJhZCArIGIgKiB0aGlzUG9zKSAqIE1hdGguY29zKHRoaXNQb3MpO1xuXHRcdFx0XHRcdFx0ZC55ID0gY3kgKyAoaW5pdGlhbFJhZCArIGIgKiB0aGlzUG9zKSAqIE1hdGguc2luKHRoaXNQb3MpO1xuXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0c2VsZi5mb3JjZS5zdGFydCgpO1xuXHRcdFx0XHRzZWxmLmZvcmNlLnRpY2soKTtcblx0XHRcdFx0c2VsZi5mb3JjZS5zdG9wKCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuICAgIHBsYWNlTm9kZXMoKTtcblxuXHRzZWxmLmxlZ2VuZEluaXQoKTtcblx0c2VsZi5hZGRBdXRob3JJbWFnZSgpO1xuXHRzZWxmLmFkZEV2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICBzZWxmLnllYXJUZXh0RGlzcGxheSA9IHNlbGYuc3ZnLmFwcGVuZCgnc3ZnOnRleHQnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneCcsIHNlbGYuZ3JhcGhEaW1lbnNpb25zLndpZHRoICogOC85KVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneScsIHNlbGYuZ3JhcGhEaW1lbnNpb25zLmhlaWdodCAqIDEyLzEzKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignZHknLCAnLS4zZW0nKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignZm9udC1zaXplJywgJzEwZW0nKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnZW5kJylcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdwb2ludGVyLWV2ZW50cycsICdub25lJylcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMWUtOSlcblx0XHRcdFx0XHQuYXR0cignaWQnLCAnZWdvR3JhcGhWaXNfeWVhckluZGljYXRvcicpXG5cdFx0XHRcdFx0LnRleHQoc2VsZi5kYXRhLmdyYXBoLnllYXJSYW5nZVswXSk7XG5cblx0c2VsZi5yZXZlYWxFZ29Ob2RlKCk7XG5cbn07XG5cbmVnb0dyYXBoVmlzLnByb3RvdHlwZS5tYWtlWm9vbSA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXHRyZXR1cm4gZDMuYmVoYXZpb3Iuem9vbSgpXG5cdFx0LmNlbnRlcihbc2VsZi5ncmFwaERpbWVuc2lvbnMud2lkdGgvMiwgc2VsZi5ncmFwaERpbWVuc2lvbnMuaGVpZ2h0LzJdKVxuXHRcdC5zY2FsZUV4dGVudChbMC4yLCAxMF0pXG5cdFx0Lm9uKCd6b29tJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRzZWxmLmdyb3VwLmF0dHIoXG5cdFx0XHRcdCd0cmFuc2Zvcm0nLFxuXHRcdFx0XHQndHJhbnNsYXRlKCcgKyBkMy5ldmVudC50cmFuc2xhdGUgKyAnKScgK1xuXHRcdFx0XHRcdCdzY2FsZSgnICsgZDMuZXZlbnQuc2NhbGUgKyAnKSdcblx0XHRcdCk7XG5cdFx0fSk7XG59O1xuXG5lZ29HcmFwaFZpcy5wcm90b3R5cGUubWFrZVRpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIC8vIGNhY2hlIGZ1bmN0aW9uIGNyZWF0aW9uIGZvciB0aW55IG9wdGltaXphdGlvblxuICAgIGZ1bmN0aW9uIHgxKGQpIHsgcmV0dXJuIGQuc291cmNlLng7IH1cbiAgICBmdW5jdGlvbiB5MShkKSB7IHJldHVybiBkLnNvdXJjZS55OyB9XG4gICAgZnVuY3Rpb24geDIoZCkgeyByZXR1cm4gZC50YXJnZXQueDsgfVxuICAgIGZ1bmN0aW9uIHkyKGQpIHsgcmV0dXJuIGQudGFyZ2V0Lnk7IH1cbiAgICAvLyBmdW5jdGlvbiB0cmFuc2Zvcm0oZCkge1xuICAgIC8vICAgICBkLnggPSBNYXRoLm1heCg0LjUsIE1hdGgubWluKHNlbGYuZ3JhcGhEaW1lbnNpb25zLndpZHRoIC0gNC41LCBkLngpKTtcbiAgICAvLyAgICAgZC55ID0gTWF0aC5tYXgoNC41LCBNYXRoLm1pbihzZWxmLmdyYXBoRGltZW5zaW9ucy5oZWlnaHQgLSA0LjUsIGQueSkpO1xuICAgIC8vICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgnICsgZC54ICsgJywnICsgZC55ICsgJyknO1xuICAgIC8vIH1cbiAgICBmdW5jdGlvbiB0cmFuc2Zvcm0oZCkge1xuXHRcdC8vIFRoZSBiZWxvdyBsaW5lcyBjb25zdHJhaW4gdGhlIG5vZGVzIHRvIHN0YXkgd2l0aGluIHRoZSBib3VuZHMgb2YgdGhlIG9yaWdpbmFsIGRpc3BsYXkuXG5cdFx0aWYgKHNlbGYuem9vbWFibGUgPT09IGZhbHNlKSB7XG5cdFx0XHRkLnggPSBNYXRoLm1heCg0LjUsIE1hdGgubWluKHNlbGYuZ3JhcGhEaW1lbnNpb25zLndpZHRoIC0gNC41LCBkLngpKTtcblx0XHRcdGQueSA9IE1hdGgubWF4KDQuNSwgTWF0aC5taW4oc2VsZi5ncmFwaERpbWVuc2lvbnMuaGVpZ2h0IC0gNC41LCBkLnkpKTtcblx0XHR9XG4gICAgICAgIHJldHVybiAndHJhbnNsYXRlKCcgKyBkLnggKyAnLCcgKyBkLnkgKyAnKSc7XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYubGlua1xuICAgICAgICAgICAgLmF0dHIoJ3gxJywgeDEpXG4gICAgICAgICAgICAuYXR0cigneTEnLCB5MSlcbiAgICAgICAgICAgIC5hdHRyKCd4MicsIHgyKVxuICAgICAgICAgICAgLmF0dHIoJ3kyJywgeTIpO1xuICAgICAgICBzZWxmLm5vZGVcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCB0cmFuc2Zvcm0pO1xuICAgIH07XG59O1xuXG5lZ29HcmFwaFZpcy5wcm90b3R5cGUubWFrZUZvcmNlID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICByZXR1cm4gZDMubGF5b3V0LmZvcmNlKClcbiAgICAgICAgLnNpemUoW3NlbGYuZ3JhcGhEaW1lbnNpb25zLndpZHRoLCBzZWxmLmdyYXBoRGltZW5zaW9ucy5oZWlnaHRdKVxuICAgICAgICAubGlua0Rpc3RhbmNlKDIyNSlcbiAgICAgICAgLy8ubGlua0Rpc3RhbmNlKGZ1bmN0aW9uKGQpIHsgY29uc29sZS5sb2coc2VsZi5sZFNjbChkLnNvdXJjZS5ZZWFyKSk7IHJldHVybiBzZWxmLmxkU2NsKGQuc291cmNlLlllYXIpID8gNzUgKyBzZWxmLmxkU2NsKGQuc291cmNlLlllYXIpIDogMDt9KVxuICAgICAgICAvLy5saW5rU3RyZW5ndGgoZnVuY3Rpb24oZCkgeyByZXR1cm4gc2VsZi5sc1NjbChkLnNvdXJjZS5ZZWFyKSA/IHNlbGYubHNTY2woZC5zb3VyY2UuWWVhcikgOiAwO30pXG4gICAgICAgIC8vIC5jaGFyZ2UoLTE1KVxuICAgICAgICAvLyAuZ3Jhdml0eSgwLjAzKVxuICAgICAgICAvLyAuZnJpY3Rpb24oMC44KVxuICAgICAgICAvLyAudGhldGEoMC45KVxuICAgICAgICAvLyAuYWxwaGEoMC4xKVxuICAgICAgICAub24oJ3RpY2snLCB0aGlzLnRpY2spO1xufTtcblxuZWdvR3JhcGhWaXMucHJvdG90eXBlLmltcG9ydERlZmF1bHRPcHRpb25zID0gZnVuY3Rpb24ob3B0aW9ucykge1xuXHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0c2VsZi5jb2xvclNjaGVtZSA9IG9wdGlvbnMuY29sb3JTY2hlbWU7XG5cblx0c2VsZi5ncmFwaERpbWVuc2lvbnMgPSBvcHRpb25zLmRpbWVuc2lvbnM7XG5cblx0c2VsZi50cmFuc2l0aW9uVGltZVBlclllYXIgPSBvcHRpb25zLnRyYW5zaXRpb25UaW1lUGVyWWVhcjtcblxuXHRjb25zb2xlLmxvZyhvcHRpb25zKTtcblxufTtcblxuLy8gVGhpcyB2ZXJzaW9uIG9mIGdldERvbWFpbnNUaGlzR3JhcGggY291bnRzIHVwIHRoZSBvY2N1cnJlbmNlcyBvZiB0aGUgZG9tYWluc1xuLy8gdG8gYWxsb3cgZm9yIGFuIFwib3RoZXJcIiBjYXRlZ29yeS5cbi8vIElmIHdlJ3JlIHVzaW5nIHByZWRldGVybWluZWQgay1tZWFucy1iYXNlZCBjYXRlZ29yaWVzLCB3ZSBkb24ndCBuZWVkIHRoaXMuXG4vLyBTbyB1c2UgdGhlIGJlbG93IHZlcnNpb24gb2YgZ2V0RG9tYWluc1RoaXNHcmFwaCBpbnN0ZWFkLlxuLy9cbmVnb0dyYXBoVmlzLnByb3RvdHlwZS5nZXREb21haW5zVGhpc0dyYXBoTGVnYWN5ID0gZnVuY3Rpb24oKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblxuXHR2YXIgZG9tYWlucyA9IHNlbGYuZGF0YS5ncmFwaC5Eb21haW5zO1xuXHQvLyB2YXIgZG9tYWlucyA9IHNlbGYuZGF0YS5ncmFwaC5mb3Nfa21lYW5zX2NhdGVnb3JpZXM7XG5cdC8vIHZhciBkb21haW5zID0gc2VsZi5kYXRhLmdyYXBoLnRpdGxlc19rbWVhbnNfY2F0ZWdvcmllcztcblx0Y29uc29sZS5sb2coZG9tYWlucyk7XG5cblx0dmFyIG1heERvbWFpbnMgPSBzZWxmLmNvbG9yU2NoZW1lLmxlbmd0aDtcblx0XG5cdC8vIHNlbGYuZG9tYWluc1RoaXNHcmFwaCB3aWxsIGJlIGFuIGFycmF5IG9mIHtrZXk6IFwiRG9tYWluSURcIiwgdmFsdWVzOiBjb3VudH1cblx0c2VsZi5kb21haW5zVGhpc0dyYXBoID0gZDMubmVzdCgpXG5cdFx0LmtleShmdW5jdGlvbihkKSB7IHJldHVybiBkLkRvbWFpbklEOyB9KVxuXHRcdC8vIC5rZXkoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5mb3Nfa21lYW5zX2NhdGVnb3J5OyB9KVxuXHRcdC8vIC5rZXkoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC50aXRsZV9rbWVhbnNfY2F0ZWdvcnk7IH0pXG5cdFx0LnJvbGx1cChmdW5jdGlvbihsZWF2ZXMpIHsgcmV0dXJuIGxlYXZlcy5sZW5ndGg7IH0pXG5cdFx0LmVudHJpZXMoc2VsZi5ub3RFZ29Ob2Rlcyk7XG5cdC8vIHNlbGYuZG9tYWluc1RoaXNHcmFwaC5zb3J0KGZ1bmN0aW9uKGEsYikgeyByZXR1cm4gZDMuZGVzY2VuZGluZyhhLnZhbHVlcywgYi52YWx1ZXMpOyB9KTtcblx0Ly8gQWRkIGEgZmV3IG1vcmUgdmFyaWFibGVzIHRvIHRoZSBkb21haW5zVGhpc0dyYXBoIGRhdGE6XG5cdGZvciAodmFyIGk9MDsgaTxzZWxmLmRvbWFpbnNUaGlzR3JhcGgubGVuZ3RoOyBpKyspIHtcblx0XHQvLyB2YXIga2V5ID0gK3NlbGYuZG9tYWluc1RoaXNHcmFwaFtpXS5rZXk7XG5cdFx0dmFyIGtleSA9IHNlbGYuZG9tYWluc1RoaXNHcmFwaFtpXS5rZXk7XG5cdFx0c2VsZi5kb21haW5zVGhpc0dyYXBoW2ldLkRvbWFpbklEID0ga2V5O1xuXHRcdGlmIChpPG1heERvbWFpbnMtMSkge1xuXHRcdFx0c2VsZi5kb21haW5zVGhpc0dyYXBoW2ldLkRvbWFpbk5hbWUgPSBkb21haW5zW2tleV07XG5cdFx0XHRzZWxmLmRvbWFpbnNUaGlzR3JhcGhbaV0uY29sb3IgPSBzZWxmLmNvbG9yU2NoZW1lW2ldO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzZWxmLmRvbWFpbnNUaGlzR3JhcGhbaV0uRG9tYWluTmFtZSA9IFwiT3RoZXJcIjtcblx0XHRcdHNlbGYuZG9tYWluc1RoaXNHcmFwaFtpXS5jb2xvciA9IHNlbGYuY29sb3JTY2hlbWVbbWF4RG9tYWlucy0xXTtcblx0XHR9XG5cdFx0Ly8gc2VsZi5kb21haW5zVGhpc0dyYXBoW2ldLkRvbWFpbk5hbWUgPSBkb21haW5zW2tleV07XG5cdFx0Ly8gc2VsZi5kb21haW5zVGhpc0dyYXBoW2ldLmNvbG9yID0gc2VsZi5jb2xvclNjaGVtZVtpXTtcblx0fVxuXHRjb25zb2xlLmxvZyhzZWxmLmRvbWFpbnNUaGlzR3JhcGgpO1xufTtcblxuZWdvR3JhcGhWaXMucHJvdG90eXBlLmdldERvbWFpbnNUaGlzR3JhcGhUZmlkZiA9IGZ1bmN0aW9uKCkge1xuXHQvLyBVc2UgdGhpcyB2ZXJzaW9uIG9mIGdldERvbWFpbnNUaGlzR3JhcGggaWYgdGhlIGNhdGVnb3JpZXMgYXJlIHByZWRldGVybWluZWQgYW5kIGRvbid0IG5lZWQgdG8gYmUgY291bnRlZC5cblx0Ly8gKFdlIGRvbid0IG5lZWQgYW4gXCJvdGhlclwiIChtaXNjZWxsYW5lb3VzKSBjYXRlZ29yeVxuXHRcblx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdHZhciBtYXhEb21haW5zID0gc2VsZi5jb2xvclNjaGVtZS5sZW5ndGg7XG5cdFxuXHR2YXIgZG9tYWlucyA9IHNlbGYuZGF0YS5ncmFwaC50ZmlkZl9rbWVhbnNfY2F0ZWdvcmllcztcblx0c2VsZi5kb21haW5zVGhpc0dyYXBoID0gW107XG5cdC8vIEFkZCBhIGZldyBtb3JlIHZhcmlhYmxlcyB0byB0aGUgZG9tYWluc1RoaXNHcmFwaCBkYXRhOlxuXHRmb3IgKHZhciBpPTA7IGk8bWF4RG9tYWluczsgaSsrKSB7XG5cdFx0c2VsZi5kb21haW5zVGhpc0dyYXBoLnB1c2goe30pO1xuXHRcdHNlbGYuZG9tYWluc1RoaXNHcmFwaFtpXS5Eb21haW5JRCA9IGk7XG5cdFx0c2VsZi5kb21haW5zVGhpc0dyYXBoW2ldLkRvbWFpbk5hbWUgPSBkb21haW5zW2ldO1xuXHRcdHNlbGYuZG9tYWluc1RoaXNHcmFwaFtpXS5jb2xvciA9IHNlbGYuY29sb3JTY2hlbWVbaV07XG5cdH1cblx0Y29uc29sZS5sb2coc2VsZi5kb21haW5zVGhpc0dyYXBoKTtcbn07XG5cbmVnb0dyYXBoVmlzLnByb3RvdHlwZS5nZXREb21haW5zVGhpc0dyYXBoID0gZnVuY3Rpb24oKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblx0dmFyIGRvbWFpbnMgPSBzZWxmLmRhdGEuZ3JhcGgudGZpZGZfa21lYW5zX2NhdGVnb3JpZXM7XG5cdGlmICh0eXBlb2YgZG9tYWlucyA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRzZWxmLmdldERvbWFpbnNUaGlzR3JhcGhMZWdhY3koKTtcblx0fSBlbHNlIHtcblx0XHRzZWxmLmdldERvbWFpbnNUaGlzR3JhcGhUZmlkZigpO1xuXHR9XG59XG5cbmVnb0dyYXBoVmlzLnByb3RvdHlwZS5sZWdlbmRJbml0ID0gZnVuY3Rpb24oKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblxuXHR2YXIgbWlzaW5mb0xlZ2VuZEl0ZW1zVGV4dCA9IFtcblx0XHQnY29tcHV0ZXIgc2NpZW5jZSwgZGF0YSBtaW5pbmcsIC4uLicsXG5cdFx0J3NvY2lvbG9neSwgc29jaWFsIHNjaWVuY2UsIC4uLicsXG5cdFx0J21lZGljaW5lLCBoZWFsdGgsIC4uLicsXG5cdFx0J2Vjb25vbWljcywgYnVzaW5lc3MsIC4uLicsXG5cdFx0J3BzeWNob2xvZ3ksIGNvZ25pdGlvbiwgLi4uJyxcblx0XHQncG9saXRpY2FsIHNjaWVuY2UsIC4uLicsXG5cdFx0J2Jpb2xvZ3ksIGVjb2xvZ3ksIC4uLicsXG5cdFx0J2NsaW1hdGUgY2hhbmdlLCAuLi4nLFxuXHRdO1xuXG5cdHZhciBzcXVhcmVTaXplID0gc2VsZi5ncmFwaERpbWVuc2lvbnMud2lkdGggLyA3MDtcbiAgICB2YXIgcGFkZGluZyA9IHNxdWFyZVNpemUgLyAzO1xuICAgIHZhciBzcXJQbHVzUGFkZGluZyA9IHNxdWFyZVNpemUgKyBwYWRkaW5nO1xuXG4gICAgc2VsZi5sZWdlbmQgPSBzZWxmLnN2Zy5hcHBlbmQoJ2cnKVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnbGVnZW5kJylcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJytwYWRkaW5nKycsJytwYWRkaW5nKycpJyk7XG4gICAgICAgIC8vIC5zdHlsZSgnb3BhY2l0eScsIDFlLTkpO1xuXHR2YXIgbGVnZW5kSGVhZGVyU2l6ZSA9IHNxdWFyZVNpemU7XG5cdHNlbGYubGVnZW5kLmFwcGVuZCgnc3ZnOnRleHQnKVxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgwLCAnICsgbGVnZW5kSGVhZGVyU2l6ZSArICcpJylcblx0XHQuYXR0cignY2xhc3MnLCAnZWdvR3JhcGhWaXNMZWdlbmRIZWFkZXInKVxuXHRcdC50ZXh0KCdDYXRlZ29yaWVzIOKTmCcpO1xuXG4gICAgdmFyIGxlZ2VuZEl0ZW0gPSBzZWxmLmxlZ2VuZC5zZWxlY3RBbGwoJ2cnKVxuICAgICAgICAuZGF0YShzZWxmLmRvbWFpbnNUaGlzR3JhcGgpXG4gICAgICAgIC5lbnRlcigpXG4gICAgICAgIC5hcHBlbmQoJ2cnKVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnbGVnZW5kSXRlbScpXG5cdFx0Ly8gLy8gYWRkIFwib3RoZXJcIiBjbGFzcyB0byBsYXN0IGxlZ2VuZCBpdGVtXG5cdFx0Ly8gLmNsYXNzZWQoJ290aGVyJywgZnVuY3Rpb24oZCkgeyBcblx0XHQvLyBcdHJldHVybiAoZC5Eb21haW5JRCAhPSAwICYmIGQuRG9tYWluTmFtZS50b0xvd2VyQ2FzZSgpPT1cIm90aGVyXCIpID8gdHJ1ZSA6IGZhbHNlO1xuXHRcdC8vIH0pXG4gICAgICAgIC5hdHRyKCdpZCcsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIC8vIHJldHVybiAnbGVnZW5kQ2x1c3RlcicgKyBkLmNsdXN0ZXI7IH0pXG4gICAgICAgICAgICAvLyBVc2UgRG9tYWluIGluc3RlYWQgb2YgY2x1c3RlclxuICAgICAgICAgICAgLy8gcmV0dXJuICdsZWdlbmREb21haW4nICsgZC5Eb21haW5JRC5yZXBsYWNlKFwiIFwiLCBcIlwiKTsgfSlcbiAgICAgICAgICAgIHJldHVybiAnbGVnZW5kRG9tYWluJyArIGQuRG9tYWluSUQ7IH0pXG5cdFx0Lm9uKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uKGQpIHtcblx0XHRcdGQzLnNlbGVjdEFsbChcIi5ub2RlXCIpXG5cdFx0XHRcdC5maWx0ZXIoZnVuY3Rpb24oZGQpIHtcblx0XHRcdFx0XHRyZXR1cm4gZC5jb2xvcj09ZGQuY29sb3I7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5jbGFzc2VkKFwibGVnZW5kSG92ZXJcIiwgdHJ1ZSk7XG5cblx0XHR9KVxuXHRcdC5vbihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uKGQpIHtcblx0XHRcdGQzLnNlbGVjdEFsbChcIi5ub2RlXCIpLmNsYXNzZWQoXCJsZWdlbmRIb3ZlclwiLCBmYWxzZSk7XG5cdFx0fSlcblx0XHQuYXR0cihcImRpc3BsYXlcIiwgZnVuY3Rpb24oZCwgaSkge1xuXHRcdFx0XHQvLyBoaWRlIGFsbCBcIm90aGVyXCIgZG9tYWluIG9iamVjdHMgZXhjZXB0IHRoZSBmaXJzdCBvbmVcblx0XHRcdFx0aWYgKGk8c2VsZi5jb2xvclNjaGVtZS5sZW5ndGgpIHtcblx0XHRcdFx0XHRyZXR1cm4gXCJcIjtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXR1cm4gXCJub25lXCI7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuICAgICAgICAvLyAvLyBzdGFydCBvZmYgaGlkZGVuIGlmIG5vdCB0aGUgc2FtZSBkb21haW4gYXMgdGhlIGVnbyBub2RlXG4gICAgICAgIC8vIC5zdHlsZSgnb3BhY2l0eScsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgLy8gICAgIC8vIHZhciB0aGlzVG9wQ2x1c3RlciA9IGQuY2x1c3Rlci5zcGxpdCgnOicpWzBdO1xuICAgICAgICAvLyAgICAgLy8gaWYgKHRoaXNUb3BDbHVzdGVyID09PSBlZ29Ob2RlVG9wQ2x1c3RlcikgcmV0dXJuIDE7IGVsc2UgcmV0dXJuIDA7XG4gICAgICAgIC8vICAgICBpZiAoZC5Eb21haW5JRD09PXNlbGYuZWdvTm9kZS5Eb21haW5JRCkgcmV0dXJuIDE7IGVsc2UgcmV0dXJuIDA7XG4gICAgICAgIC8vIH0pO1xuICAgIC8vIC8vIERvbid0IGhpZGUgdGhlIGxlZ2VuZCBpZiBhbm5vdGF0aW9ucyBhcmUgdHVybmVkIG9mZlxuICAgIC8vIC8vIG1heWJlIHRyeSBhIGRpZmZlcmVudCBhcHByb2FjaCBsYXRlclxuICAgIC8vIGlmICggIXNlbGYuZ3JhcGhQYXJhbXMuZG9Bbm5vdGF0aW9ucy52YWx1ZSApIGxlZ2VuZEl0ZW0uc3R5bGUoJ29wYWNpdHknLCAxKTtcblxuICAgIGxlZ2VuZEl0ZW0uYXBwZW5kKCdzdmc6cmVjdCcpXG4gICAgICAgIC5hdHRyKCd3aWR0aCcsIHNxdWFyZVNpemUpXG4gICAgICAgIC5hdHRyKCdoZWlnaHQnLCBzcXVhcmVTaXplKVxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICAgICAgLy8gcmV0dXJuICd0cmFuc2xhdGUoMCwnICsgKHNxclBsdXNQYWRkaW5nICogaSkgKyAnKSc7XG4gICAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgwLCcgKyAobGVnZW5kSGVhZGVyU2l6ZSArIHBhZGRpbmcgKyBzcXJQbHVzUGFkZGluZyAqIGkpICsgJyknO1xuICAgICAgICB9KVxuICAgICAgICAuYXR0cignZmlsbCcsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHJldHVybiBkLmNvbG9yOyB9KTtcbiAgICBzZWxmLmxlZ2VuZFRleHQgPSBsZWdlbmRJdGVtLmFwcGVuZCgnc3ZnOnRleHQnKVxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAndHJhbnNsYXRlKCcgKyAoc3FyUGx1c1BhZGRpbmcpICsgJywnICsgKGxlZ2VuZEhlYWRlclNpemUgKyBwYWRkaW5nICsgc3FyUGx1c1BhZGRpbmcgKiBpKSArICcpJztcbiAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoJ2R5JywgJzFlbScpXG4gICAgICAgIC50ZXh0KGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gJ1BhcGVycyBpbiBjYXRlZ29yeSBcIicgKyBkLkRvbWFpbk5hbWUgKyAnXCIgKGRvbWFpbiAnICsgZC5Eb21haW5JRCArICcpJztcbiAgICAgICAgICAgICAgICAvL1xuXHRcdFx0XHQvLyBpZiAoZC5Eb21haW5JRCAhPSAwICYmIGQuRG9tYWluTmFtZS50b0xvd2VyQ2FzZSgpPT1cIm90aGVyXCIpIHtcblx0XHRcdFx0Ly8gXHRyZXR1cm4gXCJQYXBlcnMgaW4gb3RoZXIgY2F0ZWdvcmllc1wiO1xuXHRcdFx0XHQvLyB9IGVsc2Uge1xuXHRcdFx0XHQvLyBcdHJldHVybiAnUGFwZXJzIGluIGNhdGVnb3J5IFwiJyArIGQuRG9tYWluTmFtZSArICdcIic7XG5cdFx0XHRcdC8vIH1cbiAgICAgICAgICAgICAgICAvL1xuXHRcdFx0XHQvLyByZXR1cm4gZC5Eb21haW5OYW1lO1xuICAgICAgICAgICAgICAgIC8vXG5cdFx0XHRcdC8vIHJldHVybiBcIkNhdGVnb3J5IFwiICsgZC5Eb21haW5JRDtcblxuXHRcdFx0XHRpZiAoc2VsZi5kYXRhLm5vZGVzWzBdLm5hbWUgPT09IFwiU2NpZW5jZSBDb21tdW5pY2F0aW9uIGFuZCBNaXNpbmZvcm1hdGlvblwiKSB7XG5cdFx0XHRcdFx0cmV0dXJuICdDJyArIGkgKyAnICgnICsgbWlzaW5mb0xlZ2VuZEl0ZW1zVGV4dFtpXSArICcpJztcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRpZiAoZC5Eb21haW5JRCAhPSAwICYmIGQuRG9tYWluTmFtZS50b0xvd2VyQ2FzZSgpPT1cIm90aGVyXCIpIHtcblx0XHRcdFx0XHRcdHJldHVybiBcIlBhcGVycyBpbiBvdGhlciBjYXRlZ29yaWVzXCI7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJldHVybiAnUGFwZXJzIGluIGNhdGVnb3J5IFwiJyArIGQuRG9tYWluTmFtZSArICdcIic7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG4gICAgICAgIH0pXG5cdFx0LnN0eWxlKCdmb250LXNpemUnLCAnLjllbScpO1xuXG5cbn07XG5cbmVnb0dyYXBoVmlzLnByb3RvdHlwZS5hZGRBdXRob3JJbWFnZSA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgc2VsZiA9IHRoaXM7XG5cdGlmIChzZWxmLmVnb05vZGUuaGFzT3duUHJvcGVydHkoJ25hbWUnKSkge1xuXHRcdHNlbGYuZWdvTm9kZS5BdXRob3JOYW1lID0gc2VsZi5lZ29Ob2RlLm5hbWU7XG5cdH1cblx0aWYgKHNlbGYuZWdvTm9kZS5oYXNPd25Qcm9wZXJ0eSgnQXV0aG9yTmFtZScpKSB7XG5cdFx0XG5cdFx0c2VsZi5hdXRob3JJbWFnZURpdiA9IHNlbGYuc3ZnLmFwcGVuZCgnZm9yZWlnbk9iamVjdCcpLmF0dHIoJ2NsYXNzJywgJ2V4dGVybmFsT2JqZWN0Jylcblx0XHRcdC5hdHRyKCd4JywgMClcblx0XHRcdC5hdHRyKCd5Jywgc2VsZi5ncmFwaERpbWVuc2lvbnMuaGVpZ2h0LzIgLSA1MClcblx0XHRcdC8vIC5hdHRyKCdoZWlnaHQnLCBzZWxmLmdyYXBoRGltZW5zaW9ucy5oZWlnaHQvNSlcblx0XHRcdC5hdHRyKCdoZWlnaHQnLCAnMTAwJScpXG5cdFx0XHQuYXR0cignd2lkdGgnLCBzZWxmLmdyYXBoRGltZW5zaW9ucy5oZWlnaHQvNSlcblx0XHRcdC5hcHBlbmQoJ3hodG1sOmRpdicpXG5cdFx0XHQuYXR0cignaWQnLCAnYXV0aG9ySW1hZ2VEaXYnKTtcblx0XHRzZWxmLmF1dGhvckltYWdlRGl2XG5cdFx0XHQuYXBwZW5kKCd4aHRtbDpwJylcblx0XHRcdC5odG1sKCc8cD4nICsgc2VsZi5kYXRhLm5vZGVzWzBdLkF1dGhvck5hbWUuY2FwaXRhbGl6ZSgpICsgJzwvcD4nKTtcblxuXHRcdHZhciBhdXRob3JJbWFnZUNvbnRhaW5lciA9IHNlbGYuYXV0aG9ySW1hZ2VEaXZcblx0XHRcdC5hcHBlbmQoJ3hodG1sJylcblx0XHRcdC5hdHRyKCdpZCcsICdhdXRob3JJbWFnZUNvbnRhaW5lcicpO1xuXG5cdFx0Ly8gQWRkIGNvbnRlbnQgZm9yIEhSQSBhdXRob3JzXG5cdFx0dmFyIGF1dGhvck9yZyA9IHNlbGYuZGF0YS5ub2Rlc1swXS5vcmdhbml6YXRpb247XG5cdFx0Y29uc29sZS5sb2coYXV0aG9yT3JnKTtcblx0XHRpZiAodHlwZW9mIGF1dGhvck9yZyAhPSAndW5kZWZpbmVkJykge1xuXHRcdFx0ZDMudHN2KFwic3RhdGljL2hlYWx0aHJhL29yZ3Nfd2l0aF9saW5rcy50c3ZcIiwgZnVuY3Rpb24oZXJyb3IsIG9yZ19kYXRhKSB7XG5cdFx0XHRcdGlmIChlcnJvcikgdGhyb3cgZXJyb3I7XG5cdFx0XHRcdHZhciBwc3R5bGUgPSAnc3R5bGU9XCJtYXJnaW46IDA7IHBhZGRpbmc6IDA7IGZvbnQtc2l6ZTogLjg1ZW1cIidcblx0XHRcdFx0Y29uc29sZS5sb2cob3JnX2RhdGEpO1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMCwgbGVuID0gb3JnX2RhdGEubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdFx0XHRpZiAob3JnX2RhdGFbaV1bJ29yZ19uYW1lJ10gPT0gYXV0aG9yT3JnKSB7XG5cdFx0XHRcdFx0XHR2YXIgbmFtZUZyb21UU1YgPSBvcmdfZGF0YVtpXVsnbWF0Y2hfbmFtZSddO1xuXHRcdFx0XHRcdFx0aWYgKCAodHlwZW9mIG5hbWVGcm9tVFNWICE9ICd1bmRlZmluZWQnKSAmJiAobmFtZUZyb21UU1YgIT0gJycpICkge1xuXHRcdFx0XHRcdFx0XHR2YXIgb3JnTGluayA9IG9yZ19kYXRhW2ldWydsaW5rJ107XG5cdFx0XHRcdFx0XHRcdHZhciBvcmdJbWdVcmwgPSBvcmdfZGF0YVtpXVsnaW1nX3VybCddO1xuXHRcdFx0XHRcdFx0XHRzZWxmLmF1dGhvckltYWdlRGl2XG5cdFx0XHRcdFx0XHRcdFx0LmFwcGVuZCgneGh0bWw6cCcpXG5cdFx0XHRcdFx0XHRcdFx0Lmh0bWwoJzxhIGhyZWY9XCInICsgb3JnTGluayArICdcIiB0YXJnZXQ9XCJfYmxhbmtcIj48cCAnICsgcHN0eWxlICsgJz4nICsgbmFtZUZyb21UU1YgKyAnPC9wPicpO1xuXHRcdFx0XHRcdFx0XHR2YXIgYXV0aG9ySW1hZ2UgPSBhZGRJbWFnZShvcmdJbWdVcmwpO1xuXHRcdFx0XHRcdFx0XHRhdXRob3JJbWFnZS5zdHlsZSgnY3Vyc29yJywgJ3BvaW50ZXInKTtcblx0XHRcdFx0XHRcdFx0YXV0aG9ySW1hZ2Uub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7IGNvbnNvbGUubG9nKG9yZ0xpbmspOyB3aW5kb3cub3BlbihvcmdMaW5rLCAnX2JsYW5rJyl9KTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHNlbGYuYXV0aG9ySW1hZ2VEaXZcblx0XHRcdFx0XHRcdFx0XHQuYXBwZW5kKCd4aHRtbDpwJylcblx0XHRcdFx0XHRcdFx0XHQuaHRtbCgnPHAgc3R5bGU9XCJtYXJnaW46IDA7IHBhZGRpbmc6IDA7IGZvbnQtc2l6ZTogLjg1ZW1cIj4nICsgYXV0aG9yT3JnICsgJzwvcD4nKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHR9XG5cdH1cblxuXHRmdW5jdGlvbiBhZGRJbWFnZShhdXRob3JJbWFnZVNyYykge1xuXHRcdHZhciBhdXRob3JJbWFnZSA9IGF1dGhvckltYWdlQ29udGFpbmVyXG5cdFx0XHQuYXBwZW5kKCd4aHRtbDppbWcnKVxuXHRcdFx0LmF0dHIoJ3NyYycsIGF1dGhvckltYWdlU3JjKVxuXHRcdFx0LmF0dHIoJ2lkJywgJ2F1dGhvckltYWdlJylcblx0XHRcdC5hdHRyKCd3aWR0aCcsICc4NXB4Jyk7XG5cdFx0cmV0dXJuIGF1dGhvckltYWdlO1xuXHR9XG5cblx0Ly8gSWYgYW4gaW1hZ2UgVVJMIGlzIGluY2x1ZGVkIGluIHRoZSBkYXRhOlxuXHR2YXIgQXV0aG9ySW1nVXJsID0gc2VsZi5kYXRhLm5vZGVzWzBdLkF1dGhvckltZ1VybCB8fCBzZWxmLmRhdGEubm9kZXNbMF0uSW1nVVJMO1xuXHRjb25zb2xlLmxvZyhBdXRob3JJbWdVcmwpO1xuXHRpZiAodHlwZW9mIEF1dGhvckltZ1VybCAhPSAndW5kZWZpbmVkJykge1xuXHRcdGFkZEltYWdlKEF1dGhvckltZ1VybCk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gUGV3IG1ldGhvZCBvZiBnZXR0aW5nIGF1dGhvciBpbWFnZTpcblx0Ly8gVHJ5IHNvbWUgZmlsZW5hbWUgZXh0ZW5zaW9ucyBhbmQgYXR0ZW1wdCB0byBpbnNlcnQgdGhlIGltYWdlXG5cdHZhciBwZXdpZF9zdHIgPSBzZWxmLmRhdGEubm9kZXNbMF0uUGV3U2Nob2xhcklEO1xuXHRpZiAodHlwZW9mIHBld2lkX3N0ciA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIHBld2lkX3N0ciA9IHBld2lkX3N0ci50b1N0cmluZygpO1xuXHQvLyB6ZXJvLXBhZCB0aGUgcGV3IGlkXG5cdHBld2lkX3N0ciA9ICgnMDAwJyArIHBld2lkX3N0cik7XG5cdHBld2lkX3N0ciA9IHBld2lkX3N0ci5zdWJzdHIocGV3aWRfc3RyLmxlbmd0aC0zKTtcblx0dmFyIGZuYW1lX3Jvb3QgPSBcInN0YXRpYy9pbWcvcGV3X3Bob3Rvcy9cIiArIHBld2lkX3N0cjtcblx0dmFyIHBvc3NpYmxlRXh0ZW5zaW9ucyA9IFsnLnBuZycsICcuanBnJywgJy5qcGVnJywgJy5KUEcnLCAnLkpQRUcnLCAnLlBORyddO1xuXHRcblx0Ly8gcmVjdXJzaXZlIGZ1bmN0aW9uIHRoYXQgbG9vcHMgdGhyb3VnaCB0aGUgZGlmZmVyZW50IHBvc3NpYmxlIGZpbGUgZXh0ZW5zaW9ucyBhYm92ZVxuXHRmdW5jdGlvbiB0cnlJbWFnZUZpbGVuYW1lcyhmbmFtZV9yb290LCBwb3NzaWJsZUV4dGVuc2lvbnMsIGl0ZXIpIHtcblx0XHR2YXIgYXV0aG9ySW1hZ2VGaWxlbmFtZSA9IGZuYW1lX3Jvb3QgKyBwb3NzaWJsZUV4dGVuc2lvbnNbaXRlcl07XG5cdFx0aWYgKGl0ZXIgPj0gcG9zc2libGVFeHRlbnNpb25zLmxlbmd0aCkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHQkLmdldChhdXRob3JJbWFnZUZpbGVuYW1lKVxuXHRcdFx0LmRvbmUoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGFkZEltYWdlKGF1dGhvckltYWdlRmlsZW5hbWUpO1xuXHRcdFx0fSkuZmFpbChmdW5jdGlvbigpIHtcblx0XHRcdFx0Ly8gcmVjdXJzZVxuXHRcdFx0XHR2YXIgYyA9IGl0ZXIgKyAxO1xuXHRcdFx0XHR0cnlJbWFnZUZpbGVuYW1lcyhmbmFtZV9yb290LCBwb3NzaWJsZUV4dGVuc2lvbnMsIGMpO1xuXHRcdFx0fSk7XG5cdH1cblx0dHJ5SW1hZ2VGaWxlbmFtZXMoZm5hbWVfcm9vdCwgcG9zc2libGVFeHRlbnNpb25zLCAwKTtcblxuXG5cdHZhciBwZXdDbGFzcyA9IHNlbGYuZGF0YS5ub2Rlc1swXS5wZXdfQ2xhc3M7XG5cdGlmICh0eXBlb2YgcGV3Q2xhc3MgIT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRzZWxmLmF1dGhvckltYWdlRGl2XG5cdFx0XHQuYXBwZW5kKCd4aHRtbDpwJylcblx0XHRcdC5odG1sKCc8cCBzdHlsZT1cIm1hcmdpbjogMDsgcGFkZGluZzogMDsgZm9udC1zaXplOiAuODVlbVwiPlBldyBTY2hvbGFyICcgKyBwZXdDbGFzcyArICc8L3A+Jyk7XG5cdH1cblxuXG59O1xuXG5lZ29HcmFwaFZpcy5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcblx0Ly8gT25seSBhZGQgZXZlbnQgbGlzdGVuZXJzIGhlcmUgdGhhdCBkb24ndCBhY3QgYWNyb3NzIGRpZmZlcmVudCB2aXMgb2JqZWN0c1xuXHQvLyBPdGhlcndpc2UgdGhleSBuZWVkIHRvIGJlIGFkZGVkIHRvIChlLmcuKSBjaXRhdGlvblZpc19NYWluLmpzXG5cdFxuXHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0aWYgKHNlbGYuem9vbWFibGUgPT09IHRydWUpIHtcblx0XHRzZWxmLmdyb3VwLmNhbGwoc2VsZi56b29tKTtcblx0fVxuXG4gICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVyIHRvIG5vZGVzIGZvciB0b29sdGlwOlxuICAgIGQzLnNlbGVjdEFsbCgnLm5vZGUnKVxuXHRcdC5lYWNoKGZ1bmN0aW9uKGQpIHsgXG5cdFx0XHRkLnVwZGF0ZWRQcm9wcyA9IGZhbHNlO1xuXHQgICAgICAgIGQudG9vbHRpcEh0bWwgPSAnPHA+TG9hZGluZy4uLjwvcD4nXHR9KTtcblx0Ly8gc2VsZi50aXAuaHRtbChmdW5jdGlvbihkKSB7IHJldHVybiBkLnRvb2x0aXBIdG1sOyB9KTtcblx0ZDMuc2VsZWN0QWxsKCcubm9kZScpXG4gICAgICAgIC5vbignbW91c2VvdmVyJywgZnVuY3Rpb24oZCkge1xuXHRcdFx0ZC5ob3ZlcmVkID0gdHJ1ZTtcblx0XHRcdHZhciBob3ZlcmVkSXRlbSA9IGQzLnNlbGVjdCh0aGlzKTtcblx0XHRcdC8vICQoXCIjZGV2b3V0cHV0XCIpLmh0bWwoXCI8aDM+XCIgKyBkLmpzX2RpdiArIFwiPC9oMz5cIikuY3NzKFwiY29sb3JcIiwgZC5jb2xvcik7XG5cblx0XHRcdC8vIHNlbGYudG9vbHRpcCA9IHNlbGYudG9vbHRpcFxuXHRcdFx0Ly8gXHQuaHRtbChkLnRvb2x0aXBIdG1sKVxuXHRcdFx0Ly8gXHQuc3R5bGUoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpXG5cdFx0XHQvLyBcdC5zdHlsZSgnYm9yZGVyLXN0eWxlJywgJ3NvbGlkJylcblx0XHRcdC8vIFx0LnN0eWxlKCdib3JkZXItY29sb3InLCBkLmNvbG9yKTtcblx0XHRcdC8vIHRoZSBmaXJzdCB0aW1lIGEgbm9kZSBpcyBtb3VzZWQgb3ZlciwgcmV0cmlldmUgYWRkaXRpb25hbCBwcm9wZXJ0aWVzIGlmIGl0IGlzIGEgcGFwZXIgbm9kZVxuXHRcdFx0Ly8gaWYgKCAoZC5ub2RlVHlwZSA9PT0gJ3BhcGVyJykgJiYgKCFkLnVwZGF0ZWRQcm9wcykgKSB7XG5cdFx0XHQvLyBcdCQuYWpheCh7XG5cdFx0XHQvLyBcdFx0ZGF0YVR5cGU6ICdqc29uJyxcblx0XHRcdC8vIFx0XHR1cmw6ICRTQ1JJUFRfUk9PVCArICcvX3Zpc19nZXRfbW9yZV9wYXBlcmluZm8nLFxuXHRcdFx0Ly8gXHRcdGRhdGE6IHtwYXBlcmlkOiBkLmlkfSxcblx0XHRcdC8vIFx0XHRzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHQpIHtcblx0XHRcdC8vIFx0XHRcdGQuVGl0bGUgPSByZXN1bHRbJ3RpdGxlJ107XG5cdFx0XHQvLyBcdFx0XHRkLmRvaSA9IHJlc3VsdFsnZG9pJ107XG5cdFx0XHQvLyBcdFx0XHRkLmNpdGF0aW9uID0gcmVzdWx0WydjaXRhdGlvbiddO1xuXHRcdFx0Ly8gXHRcdFx0ZC51cGRhdGVkUHJvcHMgPSB0cnVlO1xuXHRcdFx0Ly8gXHRcdFx0Ly8gZC50b29sdGlwSHRtbCA9ICc8cD4nICsgZC5jaXRhdGlvbiArICc8L3A+Jztcblx0XHRcdC8vIFx0XHRcdC8vIGQudG9vbHRpcEh0bWwgPSBkLnRvb2x0aXBIdG1sICsgJzxicj4nO1xuXHRcdFx0Ly8gXHRcdFx0Ly8gZC50b29sdGlwSHRtbCA9IGQudG9vbHRpcEh0bWwgKyAnPHA+Q2F0ZWdvcnk6ICcgKyBkLkRvbWFpbk5hbWUgKyAnPC9wPic7XG5cdFx0XHQvLyBcdFx0XHQvLyBpZiAoZC5ob3ZlcmVkKSB7XG5cdFx0XHQvLyBcdFx0XHQvLyBcdHNlbGYudGlwLnNob3coZCwgaG92ZXJlZEl0ZW0ubm9kZSgpKTtcblx0XHRcdC8vIFx0XHRcdC8vIFx0Ly8gc2VsZi50aXAuc2hvdyhkKTtcblx0XHRcdC8vIFx0XHRcdC8vIH1cbiAgICAgICAgICAgIC8vXG5cdFx0XHQvLyBcdFx0fVxuXHRcdFx0Ly8gXHR9KTtcblx0XHRcdC8vIH0gZWxzZSBpZiAoIGQuaWR4ID09IDAgKSB7XG5cdFx0XHQvLyBcdGQudG9vbHRpcEh0bWwgPSAnPHA+Jztcblx0XHRcdC8vIFx0aWYgKGQubm9kZVR5cGUpIHtcblx0XHRcdC8vIFx0XHRkLnRvb2x0aXBIdG1sID0gZC50b29sdGlwSHRtbCArIGQubm9kZVR5cGUuY2FwaXRhbGl6ZSgpICsgJzogJztcblx0XHRcdC8vIFx0fVxuXHRcdFx0Ly8gXHRkLnRvb2x0aXBIdG1sID0gZC50b29sdGlwSHRtbCArIGQubmFtZTtcblx0XHRcdC8vIFx0ZC50b29sdGlwSHRtbCA9IGQudG9vbHRpcEh0bWwgKyAnPC9wPic7XG5cdFx0XHQvLyBcdHZhciBudW1iZXJPZlB1YnMgPSBkLnBhcGVycy5sZW5ndGg7XG5cdFx0XHQvLyBcdGQudG9vbHRpcEh0bWwgPSBkLnRvb2x0aXBIdG1sICsgJzxwPk51bWJlciBvZiBQdWJsaWNhdGlvbnM6ICcgKyBudW1iZXJPZlB1YnMgKyAnPC9wPic7XG5cdFx0XHQvLyBcdFxuXHRcdFx0Ly8gfVxuXHRcdFx0Ly8gc2VsZi50aXAuc3R5bGUoJ2JvcmRlci1jb2xvcicsIGQuY29sb3IpXG5cdFx0XHQvLyBcdC5zaG93KGQsIGhvdmVyZWRJdGVtLm5vZGUoKSk7XG5cdFx0XHRcdC8vIC5zaG93KGQpO1xuXHRcdFx0Ly8gc2VsZi5tYWtlVG9vbHRpcChkLCBmdW5jdGlvbih0b29sdGlwSHRtbCkge1xuXHRcdFx0Ly8gXHRzZWxmLnRvb2x0aXAgPSBzZWxmLnRvb2x0aXBcblx0XHRcdC8vIFx0XHQuaHRtbCh0b29sdGlwSHRtbClcblx0XHRcdC8vIFx0XHQuc3R5bGUoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpXG5cdFx0XHQvLyBcdFx0LnN0eWxlKCdib3JkZXItc3R5bGUnLCAnc29saWQnKVxuXHRcdFx0Ly8gXHRcdC5zdHlsZSgnYm9yZGVyLWNvbG9yJywgZC5jb2xvcik7XG5cdFx0XHQvLyB9KTtcblx0XHRcdC8vIGdvaW5nIHRvIHRyeSB0byB1c2UgdGhlIG1ldGhvZCBvZiBnZXR0aW5nIHRoZSBjaXRhdGlvbiB0ZXh0LiBidXQgbm90IHdvcmtpbmcgeWV0XG5cdFx0XHQvLyBnZXRDaXRhdGlvbihkLlBhcGVySUQsIHRoaXMpO1xuICAgICAgICB9KVxuICAgICAgICAub24oJ21vdXNlbW92ZScsIGZ1bmN0aW9uKGQpIHtcblx0XHRcdC8vIHNlbGYudGlwLnNob3coZCk7XG4gICAgICAgICAgICAvLyBzZWxmLnRvb2x0aXAgPSBzZWxmLnRvb2x0aXBcblx0XHRcdC8vIFx0Lmh0bWwoZC50b29sdGlwSHRtbClcbiAgICAgICAgICAgIC8vICAgICAuc3R5bGUoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpXG4gICAgICAgICAgICAvLyAgICAgLnN0eWxlKCd0b3AnLCAoZDMuZXZlbnQucGFnZVktMTApKydweCcpXG4gICAgICAgICAgICAvLyAgICAgLnN0eWxlKCdsZWZ0JywgKGQzLmV2ZW50LnBhZ2VYKzEwKSsncHgnKTtcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdtb3VzZW91dCcsIGZ1bmN0aW9uKGQpIHtcblx0XHRcdGQuaG92ZXJlZCA9IGZhbHNlO1xuXHRcdFx0Ly8gc2VsZi50aXAuaGlkZShkKTtcbiAgICAgICAgICAgIHNlbGYudG9vbHRpcCA9IHNlbGYudG9vbHRpcC5zdHlsZSgndmlzaWJpbGl0eScsICdoaWRkZW4nKTsgfSlcblx0XHQub24oJ2NsaWNrJywgZnVuY3Rpb24oZCkge1xuXHRcdFx0Ly8gdmFyIGRvaSA9IGdldERPSShkLlBhcGVySUQsIHRoaXMpO1xuXHRcdFx0aWYgKCAoZC5ub2RlVHlwZSA9PT0gJ3BhcGVyJykgKSB7XG5cdFx0XHRcdGlmICggKGQuaGFzT3duUHJvcGVydHkoJ2RvaScpKSAmJiAoZC5kb2kgIT09ICcnKSApIHtcblx0XHRcdFx0XHR2YXIgdXJsID0gJ2h0dHBzOi8vZG9pLm9yZy8nICsgZC5kb2k7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmFyIHVybCA9ICdodHRwczovL2FjYWRlbWljLm1pY3Jvc29mdC5jb20vcGFwZXIvJyArIGQuaWQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0d2luZG93Lm9wZW4odXJsLCAnX2JsYW5rJyk7XG5cdFx0XHRcdFxuXHRcdFx0fVxuXHRcdH0pXG5cblx0ZnVuY3Rpb24gZ2V0RE9JKHBhcGVyaWQsIG5vZGVPYmopIHtcblx0XHR2YXIgdGhpc05vZGUgPSBkMy5zZWxlY3Qobm9kZU9iaik7XG5cdFx0JC5hamF4KHtcblx0XHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHR1cmw6ICRTQ1JJUFRfUk9PVCArICcvX3Zpc19nZXRfZG9pJyxcblx0XHRcdGRhdGE6IHtwYXBlcmlkOiBwYXBlcmlkfSxcblx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3VsdCkge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhyZXN1bHRbJ2RvaSddKTtcblx0XHRcdFx0dmFyIGRvaSA9IHJlc3VsdFsnZG9pJ107XG5cdFx0XHRcdGlmIChkb2kpIHtcblx0XHRcdFx0XHR2YXIgdXJsID0gJ2h0dHBzOi8vZG9pLm9yZy8nICsgZG9pO1xuXHRcdFx0XHRcdHdpbmRvdy5vcGVuKHVybCwgJ19ibGFuaycpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH1cblx0XHR9KTtcblx0XHRcblx0fVxuXHRmdW5jdGlvbiBnZXRDaXRhdGlvbihwYXBlcmlkLCBub2RlT2JqKSB7XG5cdFx0Ly9cblx0XHR2YXIgdGhpc05vZGUgPSBkMy5zZWxlY3Qobm9kZU9iaik7XG5cdFx0JC5hamF4KHtcblx0XHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHR1cmw6ICRTQ1JJUFRfUk9PVCArICcvX3Zpc19nZXRfY2l0YXRpb24nLFxuXHRcdFx0ZGF0YToge3BhcGVyaWQ6IHBhcGVyaWR9LFxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24ocmVzdWx0KSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKHJlc3VsdFsnY2l0YXRpb24nXSk7XG5cdFx0XHRcdHRoaXNOb2RlLmF0dHIoJ3RpdGxlJywgcmVzdWx0WydjaXRhdGlvbiddKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG59O1xuXG5lZ29HcmFwaFZpcy5wcm90b3R5cGUubWFrZVRvb2x0aXAgPSBmdW5jdGlvbihkLCBjYWxsYmFjaykge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuXHQvLyBBY2NvdW50IGZvciBhdXRob3Igbm9kZTpcblx0aWYgKGQubm9kZVR5cGUgPT09ICdhdXRob3InIHx8IGQubm9kZVR5cGUgPT09ICcnIHx8IGQubm9kZVR5cGUgPT09ICd2ZW51ZScpIHtcblx0XHR2YXIgdG9vbHRpcEh0bWwgPSAnPHAgY2xhc3M9XCJhdXRob3JOYW1lXCI+QXV0aG9yOiAnICsgZC5BdXRob3JOYW1lICsgJzwvcD4nO1xuXHRcdGlmIChkLnBld19DbGFzcykge1xuXHRcdFx0dG9vbHRpcEh0bWwgPSB0b29sdGlwSHRtbCArICc8cCBjbGFzcz1cInBld0NsYXNzXCI+UGV3IENsYXNzOiAnICsgZC5wZXdfQ2xhc3MgKyAnPC9wPic7XG5cdFx0fVxuXHRcdHZhciBudW1iZXJPZlB1YnMgPSBkLnBhcGVycy5sZW5ndGg7XG5cdFx0dG9vbHRpcEh0bWwgPSB0b29sdGlwSHRtbCArICc8cCBjbGFzcz1cIm51bWJlck9mUHVic1wiPk51bWJlciBvZiBQdWJsaWNhdGlvbnM6ICcgKyBudW1iZXJPZlB1YnMgKyAnPC9wPic7XG5cdFx0Ly8gcmV0dXJuIHRvb2x0aXBIdG1sO1xuXHRcdGNhbGxiYWNrKHRvb2x0aXBIdG1sKTtcblx0fVxuXG5cdC8vIE90aGVyd2lzZTogbWFrZSBhIHRvb2x0aXAgZm9yIGEgcGFwZXIgbm9kZVxuXHRmdW5jdGlvbiBnZXRBdXRob3JMaXN0KGF1dGhvcnMpIHtcblx0XHR2YXIgYXV0aG9yTGlzdCA9IFtdO1xuXHRcdGF1dGhvcnMuZm9yRWFjaChmdW5jdGlvbihhKSB7XG5cdFx0XHR2YXIgdGhpc0F1dGhvclN0ckxpc3QgPSBhWzFdLnNwbGl0KCcgJyk7XG5cdFx0XHQvLyB0aGlzQXV0aG9yU3RyTGlzdCA9IHRoaXNBdXRob3JTdHJMaXN0Lm1hcChmdW5jdGlvbih4KSB7IHJldHVybiB4LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgeC5zbGljZSgxKS50b0xvd2VyQ2FzZSgpOyB9KTtcblx0XHRcdC8vIHRoaXNBdXRob3JTdHJMaXN0ID0gdGhpc0F1dGhvclN0ckxpc3QubWFwKGZ1bmN0aW9uKHgpIHsgaWYgKHggPT09IHgudG9VcHBlckNhc2UoKSkgcmV0dXJuIHguY2FwaXRhbGl6ZSgpOyBlbHNlIHJldHVybiB4O30pO1xuXHRcdFx0dGhpc0F1dGhvclN0ckxpc3QgPSB0aGlzQXV0aG9yU3RyTGlzdC5tYXAoZnVuY3Rpb24oeCkgeyBpZiAoeCAhPSB4LnRvVXBwZXJDYXNlKCkpIHJldHVybiB4LmNhcGl0YWxpemUoKTsgZWxzZSByZXR1cm4geDt9KTtcblx0XHRcdC8vIHZhciB0aGlzQXV0aG9yID0gYS5OYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgYS5OYW1lLnNsaWNlKDEpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHR2YXIgdGhpc0F1dGhvciA9IHRoaXNBdXRob3JTdHJMaXN0LmpvaW4oJyAnKTtcblx0XHRcdGF1dGhvckxpc3QucHVzaCh0aGlzQXV0aG9yKTtcblx0XHR9KTtcblx0XHRyZXR1cm4gYXV0aG9yTGlzdDtcblx0fVxuXHRmdW5jdGlvbiBnZXRUaXRsZShwYXBlcmlkLCBjYWxsYmFjaykge1xuXHRcdC8vXG5cdFx0JC5hamF4KHtcblx0XHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHR1cmw6ICRTQ1JJUFRfUk9PVCArICcvX3Zpc19nZXRfdGl0bGUnLFxuXHRcdFx0ZGF0YToge3BhcGVyaWQ6IHBhcGVyaWR9LFxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24ocmVzdWx0KSB7XG5cdFx0XHRcdGNhbGxiYWNrKHJlc3VsdFsndGl0bGUnXSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblx0ZnVuY3Rpb24gbWFrZUh0bWwoKSB7XG5cdFx0Ly8gdmFyIHRvb2x0aXBIdG1sID0gJzxwIGNsYXNzPVwicGFwZXJJRFwiPnBJRDogJyArIGQuaWQgKyAnPC9wPic7XG5cdFx0dmFyIHRvb2x0aXBIdG1sID0gJyc7XG5cdFx0dG9vbHRpcEh0bWwgPSB0b29sdGlwSHRtbCArICc8cCBjbGFzcz1cInBhcGVyVGl0bGVcIj4nO1xuXHRcdHRvb2x0aXBIdG1sID0gdG9vbHRpcEh0bWwgKyBkLlRpdGxlO1xuXHRcdHRvb2x0aXBIdG1sID0gdG9vbHRpcEh0bWwgKyAnPC9wPic7XG5cdFx0dG9vbHRpcEh0bWwgPSB0b29sdGlwSHRtbCArICc8cCBjbGFzcz1cInBhcGVyWWVhclwiPicgKyBkLlllYXIgKyAnPC9wPic7XG5cdFx0dmFyIGF1dGhvclN0ckxpc3QgPSBbXTtcblx0XHRkLmF1dGhvckxpc3QuZm9yRWFjaChmdW5jdGlvbihhKSB7XG5cdFx0XHRhdXRob3JTdHJMaXN0LnB1c2goYSlcblx0XHR9KTtcblx0XHR2YXIgYXV0aG9yTGlzdCA9IGF1dGhvclN0ckxpc3Quam9pbignLCAnKTtcblx0XHR0b29sdGlwSHRtbCA9IHRvb2x0aXBIdG1sICsgJzxwIGNsYXNzPVwicGFwZXJBdXRob3JcIj5BdXRob3JzOiAnICsgYXV0aG9yTGlzdCArICc8L3A+Jztcblx0XHRyZXR1cm4gdG9vbHRpcEh0bWw7XG5cdH1cblx0aWYgKCBkLmhhc093blByb3BlcnR5KCdhdXRob3JzJykgKSB7XG5cdFx0dmFyIGF1dGhvckxpc3QgPSBnZXRBdXRob3JMaXN0KGQuYXV0aG9ycyk7XG5cdFx0ZC5hdXRob3JMaXN0ID0gYXV0aG9yTGlzdDtcblx0XHRpZiAoIGQuaGFzT3duUHJvcGVydHkoJ1RpdGxlJykgKXtcblx0XHRcdHZhciB0b29sdGlwSHRtbCA9IG1ha2VIdG1sKCk7XG5cdFx0XHRjYWxsYmFjayh0b29sdGlwSHRtbCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGdldFRpdGxlKGQuaWQsIGZ1bmN0aW9uKHRpdGxlKSB7XG5cdFx0XHRcdGQuVGl0bGUgPSB0aXRsZTtcblx0XHRcdFx0dmFyIHRvb2x0aXBIdG1sID0gbWFrZUh0bWwoKTtcblx0XHRcdFx0Y2FsbGJhY2sodG9vbHRpcEh0bWwpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdCQuYWpheCh7XG5cdFx0XHRkYXRhVHlwZTogJ2pzb24nLFxuXHRcdFx0dXJsOiAkU0NSSVBUX1JPT1QgKyAnL192aXNfZ2V0X2F1dGhvcmluZm8nLFxuXHRcdFx0ZGF0YToge2F1dGhvcmlkczogSlNPTi5zdHJpbmdpZnkoZC5BdXRob3JJRExpc3QpfSxcblx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3VsdCkge1xuXHRcdFx0XHRkLmF1dGhvcnMgPSByZXN1bHRbJ2F1dGhvcnMnXTtcblx0XHRcdFx0dmFyIGF1dGhvckxpc3QgPSBnZXRBdXRob3JMaXN0KGQuYXV0aG9ycylcblx0XHRcdFx0ZC5hdXRob3JMaXN0ID0gYXV0aG9yTGlzdDtcblx0XHRcdFx0aWYgKCBkLmhhc093blByb3BlcnR5KCdUaXRsZScpICl7XG5cdFx0XHRcdFx0dmFyIHRvb2x0aXBIdG1sID0gbWFrZUh0bWwoKTtcblx0XHRcdFx0XHRjYWxsYmFjayh0b29sdGlwSHRtbCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Z2V0VGl0bGUoZC5pZCwgZnVuY3Rpb24odGl0bGUpIHtcblx0XHRcdFx0XHRcdGQuVGl0bGUgPSB0aXRsZTtcblx0XHRcdFx0XHRcdHZhciB0b29sdGlwSHRtbCA9IG1ha2VIdG1sKCk7XG5cdFx0XHRcdFx0XHRjYWxsYmFjayh0b29sdGlwSHRtbCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblxuXHR9XG4gICAgXG59O1xuXG5lZ29HcmFwaFZpcy5wcm90b3R5cGUucmV2ZWFsRWdvTm9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHNlbGYuY3Vyck5vZGVJbmRleCA9IDA7ICAvLyBJbmRleCBvZiBjdXJyZW50IG5vZGUgKGVnbyBub2RlKVxuXHRzZWxmLmN1cnJZZWFyID0gc2VsZi5kYXRhLmdyYXBoLnllYXJSYW5nZVswXTtcblxuICAgIC8vIFJldmVhbCBlZ28gbm9kZVxuXHRkMy5zZWxlY3RBbGwoJy5ub2RlJykuZmlsdGVyKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuaWQgPT09IHNlbGYuZWdvTm9kZS5pZDsgfSlcbiAgICAgICAgLmNsYXNzZWQoJ2hpZGRlbicsIGZhbHNlKVxuICAgICAgICAuY2xhc3NlZCgndmlzaWJsZScsIHRydWUpXG4gICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgLy8gLmRlbGF5KHNlbGYuZ3JhcGhQYXJhbXMudHJhbnNpdGlvblRpbWVQZXJZZWFyLnZhbHVlLzQpXG4gICAgICAgIC5kdXJhdGlvbigyMDAwKVxuICAgICAgICAuYXR0cigncicsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICAvL3JldHVybiA0LjUgKyAoc2VsZi5laWdlbkZhY3RvclNjYWxlKGQuRUYpICogMTApO1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnJhZGl1cztcbiAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoJ1QnLCAxKVxuXHRcdC5lYWNoKCdzdGFydCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0c2VsZi55ZWFyVGV4dERpc3BsYXkudHJhbnNpdGlvbigpXG5cdFx0XHQgICAgLmRlbGF5KDEwMDApXG5cdFx0XHQgICAgLmR1cmF0aW9uKDEwMDApXG5cdFx0XHQgICAgLnN0eWxlKCdvcGFjaXR5JywgLjE1KTtcblx0XHR9KVxuICAgICAgICAuZWFjaCgnZW5kJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyByZXZlYWwgbGVnZW5kXG4gICAgICAgICAgICAvLyBzZWxmLmxlZ2VuZC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC8vICAgICAuZGVsYXkoNDAwMClcbiAgICAgICAgICAgIC8vICAgICAuZHVyYXRpb24oMTAwMClcbiAgICAgICAgICAgIC8vICAgICAuc3R5bGUoJ29wYWNpdHknLCAxKTtcblxuICAgICAgICAgICAgLy8gcmV2ZWFsIHRoZSBkaXNwbGF5IG9mIGN1cnJlbnQgeWVhclxuICAgICAgICAgICAgLy8gc2VsZi55ZWFyVGV4dERpc3BsYXkudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAvLyAgICAgLmR1cmF0aW9uKDEwMDApXG4gICAgICAgICAgICAvLyAgICAgLnN0eWxlKCdvcGFjaXR5JywgLjE1KTtcblxuXHRcdFx0Ly8gbm90aWZ5IGV2ZXJ5b25lIChpLmUuIHRoZSBNYWluLmpzIGFuZCB0aGUgbGluZSBjaGFydHMpXG5cdFx0XHQkLmV2ZW50LnRyaWdnZXIoe1xuXHRcdFx0XHR0eXBlOiBcInllYXJDaGFuZ2VcIixcblx0XHRcdH0pO1xuICAgICAgICAgICAgc2VsZi5hbmltYXRlVG9EZXN0aW5hdGlvbk5vZGUoKTtcbiAgICAgICAgfSk7XG59O1xuXG5lZ29HcmFwaFZpcy5wcm90b3R5cGUuYW5pbWF0ZVRvRGVzdGluYXRpb25Ob2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG5cblxuICAgIC8vIENoZWNrIGlmIHdlJ3JlIG1vdmluZyBmb3J3YXJkIG9yIGJhY2t3YXJkXG4gICAgICAgIC8vIGlmIGN1cnJOb2RlSW5kZXggPCBkZXN0aW5hdGlvbk5vZGVJbmRleDpcbiAgICAgICAgLy8gICAgIGN1cnJOb2RlSW5kZXgrKztcbiAgICAgICAgLy8gICAgIGNoZWNrIGZvciB5ZWFyXG4gICAgICAgIC8vICAgICBkcmF3Tm9kZSgpO1xuICAgIGlmIChzZWxmLmN1cnJOb2RlSW5kZXggPT09IHNlbGYuZGVzdGluYXRpb25Ob2RlSW5kZXgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2dvdG8gZmluaXNoJyk7XG4gICAgICAgIHNlbGYuZmluaXNoQW5pbWF0aW9uKCk7XG4gICAgfSBlbHNlIGlmIChzZWxmLmN1cnJOb2RlSW5kZXggPCBzZWxmLmRlc3RpbmF0aW9uTm9kZUluZGV4KSB7XG5cdFx0c2VsZi5hbmltYXRpb25TdGF0ZSA9ICdmb3J3YXJkJztcbiAgICAgICAgc2VsZi5jdXJyTm9kZUluZGV4Kys7XG4gICAgICAgIHNlbGYuY2hlY2tZZWFyKCk7XG4gICAgICAgIC8vIHNlbGYuZHJhd05vZGUoKTtcbiAgICB9IGVsc2UgaWYgKHNlbGYuY3Vyck5vZGVJbmRleCA+IHNlbGYuZGVzdGluYXRpb25Ob2RlSW5kZXgpIHtcblx0XHRzZWxmLmFuaW1hdGlvblN0YXRlID0gJ3Jld2luZCc7XG4gICAgICAgIHNlbGYuY3Vyck5vZGVJbmRleC0tO1xuICAgICAgICBzZWxmLmNoZWNrWWVhcigpO1xuICAgICAgICAvLyBzZWxmLnJlbW92ZU5vZGUoKTtcbiAgICB9XG59O1xuXG5lZ29HcmFwaFZpcy5wcm90b3R5cGUuY29udGludWUgPSBmdW5jdGlvbigpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgLy8gaWYgKHNlbGYuY3Vyck5vZGVJbmRleCA9PT0gc2VsZi5kZXN0aW5hdGlvbk5vZGVJbmRleCkge1xuICAgIC8vICAgICBjb25zb2xlLmxvZygnZ290byBmaW5pc2gnKTtcbiAgICAvLyAgICAgc2VsZi5maW5pc2hBbmltYXRpb24oKTtcbiAgICAvLyBpZiAoc2VsZi5jdXJyTm9kZUluZGV4IDwgc2VsZi5kZXN0aW5hdGlvbk5vZGVJbmRleCkge1xuICAgIC8vICAgICBzZWxmLmRyYXdOb2RlKCk7XG4gICAgLy8gfSBlbHNlIGlmIChzZWxmLmN1cnJOb2RlSW5kZXggPiBzZWxmLmRlc3RpbmF0aW9uTm9kZUluZGV4KSB7XG4gICAgLy8gICAgIHNlbGYucmVtb3ZlTm9kZSgpO1xuICAgIC8vIH1cblxuXHQvLyBpZiB0aGUgeWVhciBvZiB0aGUgZmlyc3Qgbm9uRWdvIG5vZGUgaXMgdGhlIHNhbWUgYXMgdGhlIHllYXIgb2YgdGhlIGNlbnRlclxuXHQvLyBub2RlJ3MgZmlyc3QgcHVibGljYXRpb24sIHRyYW5zaXRpb25UaW1lUGVyTm9kZSB3aWxsIGJlIHVuZGVmaW5lZCBhbmQgdGhlcmVcblx0Ly8gd2lsbCBiZSBlcnJvcnMuXG5cdC8vIFNvIGxldCdzIGNhbGN1bGF0ZSBpdDpcblx0aWYgKHR5cGVvZiBzZWxmLnRyYW5zaXRpb25UaW1lUGVyTm9kZSA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRzZWxmLmNhbGN1bGF0ZVRyYW5zaXRpb25UaW1lKCk7XG5cdH1cblx0aWYgKHNlbGYuYW5pbWF0aW9uU3RhdGUgPT09ICdmb3J3YXJkJykge1xuXHRcdHNlbGYuZHJhd05vZGUoKTtcblx0fSBlbHNlIGlmIChzZWxmLmFuaW1hdGlvblN0YXRlID09PSAncmV3aW5kJykge1xuXHRcdHNlbGYucmVtb3ZlTm9kZSgpO1xuXHR9XG59O1xuXG5lZ29HcmFwaFZpcy5wcm90b3R5cGUuY2hlY2tZZWFyID0gZnVuY3Rpb24oKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblx0XG5cdC8vIGlmIHdlIGFyZSBvbiB0aGUgbGFzdCBub2RlLCBqdXN0IG1heCBvdXQgdGhlIHllYXIuXG5cdGlmIChzZWxmLmN1cnJOb2RlSW5kZXggPT0gc2VsZi5kYXRhLm5vZGVzLmxlbmd0aC0xKSB7XG5cdFx0c2VsZi5jdXJyWWVhciA9IHNlbGYuZGF0YS5ncmFwaC55ZWFyUmFuZ2VbMV07XG5cdFx0Ly8gLy8gY3V0b2ZmIGF0IDIwMTVcblx0XHQvLyBzZWxmLmN1cnJZZWFyID0gTWF0aC5taW4oc2VsZi5jdXJyWWVhciwgMjAxNSk7XG5cblx0XHRzZWxmLnllYXJUZXh0RGlzcGxheS50ZXh0KHNlbGYuY3VyclllYXIpO1xuXG5cdFx0Ly8galF1ZXJ5IGN1c3RvbSBldmVudCwgc28gdGhhdCBNYWluLmpzIGNhbiBsaXN0ZW4gZm9yIGl0IGFuZCBhZHZhbmNlIHRoZSB5ZWFyIG9uIHRoZSBsaW5lIGNoYXJ0c1xuXHRcdCQuZXZlbnQudHJpZ2dlcih7XG5cdFx0XHR0eXBlOiBcInllYXJDaGFuZ2VcIixcblx0XHR9KTtcblx0XHRzZWxmLmNvbnRpbnVlKCk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0dmFyIGN1cnJOb2RlID0gc2VsZi5kYXRhLm5vZGVzLmZpbHRlcihmdW5jdGlvbihkKSB7IHJldHVybiBkLmlkeCA9PT0gc2VsZi5jdXJyTm9kZUluZGV4OyB9KTtcblx0dmFyIG9sZFllYXIgPSBzZWxmLmN1cnJZZWFyO1xuXHR2YXIgbmV3WWVhciA9IGN1cnJOb2RlWzBdLlllYXI7XG5cdC8vIGlmIHRoZSB5ZWFyIGlzIHRoZSBzYW1lIGFzIGl0IHdhcywgZG8gbm90aGluZ1xuXHRpZiAobmV3WWVhciA9PSBvbGRZZWFyKSB7XG5cdFx0c2VsZi5jb250aW51ZSgpO1xuXHR9IGVsc2UgaWYgKG5ld1llYXIgPiBvbGRZZWFyKSB7XG5cdFx0Ly8gdHJ5aW5nIHRvIGRlYnVnIHRpbWluZyBpc3N1ZXNcblx0XHQvLyBsb29rcyBsaWtlIHRpbWluZyBpcyBqdXN0IGluaGVyZW50bHkgaW5jb25zaXN0ZW50LiB0aGVyZSBzZWVtcyB0byBiZSBhIGRlbGF5IHdpdGggdGhpcyBtZXRob2QgKGNhbGxpbmcgdGhlIG5leHQgbm9kZSBkcmF3aW5nIGluIHRyYW5zaXRpb24uZWFjaCgnZW5kJykgKVxuXHRcdC8vIGNvbnNvbGUubG9nKHNlbGYuY3VyclllYXIpO1xuXHRcdC8vIGNvbnNvbGUubG9nKCdjICcrc2VsZi5jKTtcblx0XHQvLyBjb25zb2xlLmxvZygndHQgJytzZWxmLnR0KTtcblx0XHQvLyBjb25zb2xlLmxvZygndHQgb3ZlciBjICcrc2VsZi50dC9zZWxmLmMpO1xuXHRcdC8vIGNvbnNvbGUubG9nKCd0cmFuc2l0aW9uVGltZVBlck5vZGUgJytzZWxmLnRyYW5zaXRpb25UaW1lUGVyTm9kZSk7XG5cdFx0Ly8gY29uc29sZS5sb2coJ2Vycm9yICcrKHNlbGYudHJhbnNpdGlvblRpbWVQZXJOb2RlKS8oc2VsZi50dC9zZWxmLmMpKTtcblx0XHRzZWxmLmM9MDtcblx0XHRzZWxmLnR0PTA7XG5cdFx0c2VsZi5jdXJyWWVhcisrO1xuXHRcdHNlbGYuYmVnaW5OZXdZZWFyKCk7XG5cdH0gZWxzZSBpZiAobmV3WWVhciA8IG9sZFllYXIpIHtcblx0XHRzZWxmLmN1cnJZZWFyLS07XG5cdFx0c2VsZi5iZWdpbk5ld1llYXIoKTtcblx0fVxuXHQvLyBzZWxmLmN1cnJZZWFyID0gY3Vyck5vZGVbMF0uWWVhcjtcblxuXHQvLyBUT0RPOiBjb21lIGJhY2sgdG8gdGhpc1xuXHQvL1xuICAgIC8vIC8vIENoZWNrIHRoZSB5ZWFyIG9mIHRoZSBjdXJyZW50IG5vZGUsIGFuZCBpZiBpdCBpcyBkaWZmZXJlbnQgdGhhbiBjdXJyWWVhcjpcbiAgICAvLyAvLyAgICAgdXBkYXRlIGN1cnJZZWFyO1xuICAgIC8vIC8vICAgICB1cGRhdGUgeWVhclRleHREaXNwbGF5O1xuICAgIC8vIC8vICAgICBmYWRlIG5vZGVzIGFuZCBsaW5rcyBmcm9tIHByZXZpb3VzIHllYXI7XG4gICAgLy8gLy8gICAgIHJlY2FsY3VsYXRlIHRyYW5zaXRpb24gdGltZXM7XG4gICAgLy9cbiAgICAvLyB2YXIgc2VsZiA9IHRoaXM7XG4gICAgLy9cbiAgICAvLyB2YXIgeWVhck9mQ3Vyck5vZGUgPSBzZWxmLmFsbE5vZGVzW3NlbGYuY3Vyck5vZGVJbmRleF0uWWVhclxuICAgIC8vIGlmICggeWVhck9mQ3Vyck5vZGUgIT0gc2VsZi5jdXJyWWVhciApIHtcbiAgICAvLyAgICAgc2VsZi5jdXJyWWVhciA9IHllYXJPZkN1cnJOb2RlO1xuICAgIC8vXG4gICAgLy8gICAgIHNlbGYudXBkYXRlTGluZUNoYXJ0KCk7XG4gICAgLy9cbiAgICAvLyAgICAgLy8gVXBkYXRlIHRoZSB5ZWFyIGRpc3BsYXlcbiAgICAvLyAgICAgc2VsZi55ZWFyVGV4dERpc3BsYXkudGV4dChzZWxmLmN1cnJZZWFyKTtcbiAgICAvLyAgICAgLy8gSSBtYXkgbmVlZCB0byBkbyBzb21ldGhpbmcgYWJvdXQgdGhpcyAodGhhdCB0aGUgeWVhciB0ZXh0IGRpc3BsYXkgc3RhcnRzIG9mZiBoaWRkZW4pOlxuICAgIC8vICAgICAvLyBpZiAoc2VsZi5jdXJyWWVhciA9PSBzZWxmLmVnb05vZGUuWWVhcikgXG4gICAgLy8gICAgIC8vICAgICAgICAge3NlbGYueWVhclRleHREaXNwbGF5LnRyYW5zaXRpb24oKVxuICAgIC8vICAgICAvLyAgICAgICAgICAgICAgICAgLmR1cmF0aW9uKDEwMDApXG4gICAgLy8gICAgIC8vICAgICAgICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAuMTUpO1xuICAgIC8vXG4gICAgLy8gICAgIC8vIE9ubHkgZmFkZSBwcmV2aW91cyB5ZWFyIGlmIGdvaW5nIGZvcndhcmQgaW4gdGltZVxuICAgIC8vICAgICBpZiAoc2VsZi5jdXJyTm9kZUluZGV4IDwgc2VsZi5kZXN0aW5hdGlvbk5vZGVJbmRleCkgc2VsZi5mYWRlTm9kZXNBbmRMaW5rc1ByZXZZZWFyKCk7XG4gICAgLy9cbiAgICAvLyAgICAgc2VsZi5jYWxjdWxhdGVUcmFuc2l0aW9uVGltZSgpO1xuICAgIC8vIH1cblx0cmV0dXJuIHNlbGYuY3VyclllYXI7XG59O1xuXG5lZ29HcmFwaFZpcy5wcm90b3R5cGUuYmVnaW5OZXdZZWFyID0gZnVuY3Rpb24oKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblxuXHRcblx0c2VsZi55ZWFyVGV4dERpc3BsYXkudGV4dChzZWxmLmN1cnJZZWFyKTtcblxuXHQvLyBqUXVlcnkgY3VzdG9tIGV2ZW50LCBzbyB0aGF0IE1haW4uanMgY2FuIGxpc3RlbiBmb3IgaXQgYW5kIGFkdmFuY2UgdGhlIHllYXIgb24gdGhlIGxpbmUgY2hhcnRzXG5cdCQuZXZlbnQudHJpZ2dlcih7XG5cdFx0dHlwZTogXCJ5ZWFyQ2hhbmdlXCIsXG5cdH0pO1xuXG5cdHNlbGYuY2FsY3VsYXRlVHJhbnNpdGlvblRpbWUoKTtcblx0dmFyIG5vZGVzVGhpc1llYXIgPSBzZWxmLm5vdEVnb05vZGVzLmZpbHRlcihmdW5jdGlvbihkKSB7IHJldHVybiBkLlllYXIgPT0gc2VsZi5jdXJyWWVhcjsgfSk7XG5cblx0Ly8gSWYgdGhpcyB5ZWFyIGhhcyBubyBub2RlcywgZGVsYXksIHRoZW4gY29udGludWVcblx0aWYgKCBub2Rlc1RoaXNZZWFyLmxlbmd0aCA9PT0gMCApIHtcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0c2VsZi5jaGVja1llYXIoKTtcblx0XHR9LCBzZWxmLnRyYW5zaXRpb25UaW1lUGVyWWVhcltzZWxmLmN1cnJZZWFyXSlcblx0fSBlbHNlIHtcblx0XHRzZWxmLmNvbnRpbnVlKCk7XG5cdH1cblxuXG59O1xuXG5lZ29HcmFwaFZpcy5wcm90b3R5cGUuZHJhd05vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAvLyBzZWxmLmFuaW1hdGlvblN0YXRlID0gJ2ZvcndhcmQnO1xuXG4gICAgLy8gc2VsZi5mYWRlTm9kZXNBbmRMaW5rc1ByZXZZZWFyKCk7XG5cbiAgICB2YXIgY3Vyck5vZGUgPSBkMy5zZWxlY3RBbGwoJy5ub2RlJykuZmlsdGVyKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuaWR4ID09PSBzZWxmLmN1cnJOb2RlSW5kZXg7IH0pO1xuXG4gICAgZnVuY3Rpb24gZHJhd0xpbmtzKG5vZGVPYmopIHtcbiAgICAgICAgLy8gVGhpcyBmdW5jdGlvbiB3aWxsIGRyYXcgdGhlIGxpbmsgb3V0IGZyb20gdGhlIHNvdXJjZSB0byB0aGUgdGFyZ2V0LlxuICAgICAgICAvLyBXZSdsbCBjYWxsIGl0IGFmdGVyIGVhY2ggbm9kZSBhcHBlYXJzLlxuICAgICAgICBub2RlT2JqLmxpbmtzVGhpc05vZGVJc1NvdXJjZSA9IGQzLnNlbGVjdEFsbCgnLmxpbmsnKS5maWx0ZXIoZnVuY3Rpb24obCkgeyByZXR1cm4gbC5zb3VyY2UgPT09IG5vZGVPYmo7IH0pO1xuICAgICAgICBub2RlT2JqLmxpbmtzVGhpc05vZGVJc1NvdXJjZS5jbGFzc2VkKCdoaWRkZW4nLCBmYWxzZSlcbiAgICAgICAgICAgIC5jbGFzc2VkKCd2aXNpYmxlJywgdHJ1ZSlcbiAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uKGQpIHsgZC5pblRyYW5zaXRpb24gPSB0cnVlOyB9KVxuICAgICAgICAgICAgLmF0dHIoJ3gyJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5zb3VyY2UueDsgfSlcbiAgICAgICAgICAgIC5hdHRyKCd5MicsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuc291cmNlLnk7IH0pXG4gICAgICAgICAgICAuc3R5bGUoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZWFzZSgnbGluZWFyJylcbiAgICAgICAgICAgIC5kZWxheSgwKVxuICAgICAgICAgICAgLmR1cmF0aW9uKHNlbGYubGlua0FwcGVhckR1cmF0aW9uKVxuICAgICAgICAgICAgLmF0dHIoJ3gyJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC50YXJnZXQueDsgfSlcbiAgICAgICAgICAgIC5hdHRyKCd5MicsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQudGFyZ2V0Lnk7IH0pXG4gICAgICAgICAgICAvLyAuYXR0cigneDInLCAwKVxuICAgICAgICAgICAgLy8gLmF0dHIoJ3kyJywgMClcbiAgICAgICAgICAgIC5hdHRyKCdUJywgMSlcbiAgICAgICAgICAgIC5lYWNoKCdlbmQnLCBmdW5jdGlvbihkKSB7IGQuaW5UcmFuc2l0aW9uID0gZmFsc2U7IH0pO1xuICAgIH1cbiAgICAvLyBNYWtlIHRoZSBub2RlcyBhcHBlYXI6XG5cdC8vIHZhciB0MCA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgIGN1cnJOb2RlLmNsYXNzZWQoJ2hpZGRlbicsIGZhbHNlKVxuICAgICAgICAuY2xhc3NlZCgndmlzaWJsZScsIHRydWUpXG4gICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgLmVhc2UoJ2xpbmVhcicpXG4gICAgICAgIC8vLmRlbGF5KGZ1bmN0aW9uKGQsIGkpIHsgcmV0dXJuIChpLWN1cnJJbmRleCkgKiB0aW1lUGVyTm9kZTsgfSlcbiAgICAgICAgLy8gLmRlbGF5KGZ1bmN0aW9uKGQsIGkpIHsgcmV0dXJuIGkgKiBzZWxmLnRyYW5zaXRpb25UaW1lUGVyTm9kZTsgfSlcbiAgICAgICAgLmR1cmF0aW9uKHNlbGYudHJhbnNpdGlvblRpbWVQZXJOb2RlKVxuICAgICAgICAuYXR0cigncicsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIC8vcmV0dXJuIDQuNSArIChzZWxmLmVpZ2VuRmFjdG9yU2NhbGUoZC5FRikgKiAxMCk7XG4gICAgICAgICAgICByZXR1cm4gZC5yYWRpdXM7XG4gICAgICAgIH0pXG4gICAgICAgIC5hdHRyKCdUJywgMSlcblx0XHQuZWFjaCgnZW5kJywgZnVuY3Rpb24oZCkge1xuXHRcdFx0Ly8gdmFyIHQxID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cdFx0XHQvLyBzZWxmLnR0ID0gc2VsZi50dCArICh0MS10MCk7XG5cdFx0XHRzZWxmLmMrKztcblx0XHRcdGlmIChzZWxmLnpvb21hYmxlID09PSB0cnVlKSB7XG5cdFx0XHRcdHNlbGYuY2hlY2tab29tKGQpO1xuXHRcdFx0fVxuXHRcdFx0Ly8gY29uc29sZS5sb2codDEtdDAgKyBcIm1pbGxpc2Vjb25kc1wiKTtcblx0XHRcdHNlbGYuYW5pbWF0ZVRvRGVzdGluYXRpb25Ob2RlKCk7XG5cdFx0XHRkcmF3TGlua3MoZCk7XG5cbiAgICAgICAgfSk7XG59O1xuXG5lZ29HcmFwaFZpcy5wcm90b3R5cGUucmVtb3ZlTm9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHNlbGYuYW5pbWF0aW9uU3RhdGUgPSAncmV3aW5kJztcblxuICAgIC8vIHNlbGYuY2FsY3VsYXRlVHJhbnNpdGlvblRpbWUoKTtcblxuICAgIHZhciBjdXJyTm9kZSA9IGQzLnNlbGVjdEFsbCgnLm5vZGUnKS5maWx0ZXIoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5pbmRleCA9PT0gc2VsZi5jdXJyTm9kZUluZGV4OyB9KTtcbiAgICB2YXIgY3VyckxpbmtzID0gZDMuc2VsZWN0QWxsKCcubGluaycpLmZpbHRlcihmdW5jdGlvbihkKSB7IHJldHVybiBkLnNvdXJjZS5pbmRleCA9PT0gc2VsZi5jdXJyTm9kZUluZGV4OyB9KTtcblxuICAgIC8vIHZhciByZXRyYWN0RHVyYXRpb24gPSBzZWxmLmxpbmtBcHBlYXJEdXJhdGlvbjtcbiAgICB2YXIgcmV0cmFjdER1cmF0aW9uID0gc2VsZi50cmFuc2l0aW9uVGltZVBlck5vZGU7XG4gICAgY3VyckxpbmtzLnRyYW5zaXRpb24oKVxuICAgICAgICAuZWFjaCgnc3RhcnQnLCBmdW5jdGlvbihkKSB7IGQuaW5UcmFuc2l0aW9uPXRydWU7IH0pXG4gICAgICAgIC5kdXJhdGlvbihyZXRyYWN0RHVyYXRpb24pXG4gICAgICAgIC5lYXNlKCdxdWFkJylcbiAgICAgICAgLmF0dHIoJ3gyJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5zb3VyY2UueDsgfSlcbiAgICAgICAgLmF0dHIoJ3kyJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5zb3VyY2UueTsgfSlcbiAgICAgICAgLmNhbGwoZnVuY3Rpb24oZCkge1xuXHRcdC8vIC5lYWNoKCdlbmQnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICBkLmluVHJhbnNpdGlvbj1mYWxzZTtcbiAgICAgICAgICAgIHZhciBjdXJyTm9kZSA9IGQzLnNlbGVjdEFsbCgnLm5vZGUnKS5maWx0ZXIoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5pZHggPT09IHNlbGYuY3Vyck5vZGVJbmRleDsgfSk7XG4gICAgICAgICAgICBjdXJyTm9kZS50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAuZHVyYXRpb24oc2VsZi50cmFuc2l0aW9uVGltZVBlck5vZGUpXG4gICAgICAgICAgICAgICAgLmVhc2UoJ3F1YWQnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdyJywwKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdUJywxKVxuICAgICAgICAgICAgICAgIC5lYWNoKCdlbmQnLCBmdW5jdGlvbihkZCkge1xuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuY2xhc3NlZCgnaGlkZGVuJywgdHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbGFzc2VkKCd2aXNpYmxlJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmFuaW1hdGVUb0Rlc3RpbmF0aW9uTm9kZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbn07XG5cbmVnb0dyYXBoVmlzLnByb3RvdHlwZS5maW5pc2hBbmltYXRpb24gPSBmdW5jdGlvbigpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdHNlbGYuYW5pbWF0aW9uU3RhdGUgPSAnc3RvcHBlZCc7XG5cdCQuZXZlbnQudHJpZ2dlcih7XG5cdFx0dHlwZTogXCJhbmltYXRpb25GaW5pc2hlZFwiLFxuXHR9KTtcblx0Y29uc29sZS5sb2coJ2ZpbmlzaGVkJyk7XG5cdGNvbnNvbGUubG9nKHNlbGYuY3Vyck5vZGVJbmRleCk7XG59O1xuXG5lZ29HcmFwaFZpcy5wcm90b3R5cGUubmV3RGVzdGluYXRpb25Ob2RlID0gZnVuY3Rpb24oZGVzdGluYXRpb25ZZWFyKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblxuXHRzZWxmLmRlc3RpbmF0aW9uWWVhciA9IGRlc3RpbmF0aW9uWWVhcjtcblx0Y29uc29sZS5sb2coc2VsZi5kZXN0aW5hdGlvblllYXIpO1xuXHRzZWxmLmdldERlc3RpbmF0aW9uTm9kZSgpO1xuXHRcblx0Ly8gbWFrZSBzdXJlIHRoZSBjdXJyZW50IG5vZGUgaXMgaW5jbHVkZWQ6XG5cdGlmICggIShzZWxmLmN1cnJOb2RlSW5kZXggPT09IHNlbGYuZGVzdGluYXRpb25Ob2RlSW5kZXgpICkgeyAgLy8gZG9uJ3QgZG8gYW55dGhpbmcgaWYgdGhpcyBpcyB0cnVlXG5cdFx0aWYgKHNlbGYuY3Vyck5vZGVJbmRleCA8IHNlbGYuZGVzdGluYXRpb25Ob2RlSW5kZXgpIHtcblx0XHRcdHNlbGYuYW5pbWF0aW9uU3RhdGUgPSAnZm9yd2FyZCc7XG5cdFx0XHRzZWxmLmRyYXdOb2RlKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHNlbGYuYW5pbWF0aW9uU3RhdGUgPSAncmV3aW5kJztcblx0XHRcdHNlbGYucmVtb3ZlTm9kZSgpO1xuXHRcdH1cblx0fVxufTtcblxuZWdvR3JhcGhWaXMucHJvdG90eXBlLmdldERlc3RpbmF0aW9uTm9kZSA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0Ly8gR2V0IHRoZSBkZXN0aW5hdGlvbiBub2RlIGluZGV4IGZyb20gdGhlIGRlc3RpbmF0aW9uIHllYXJcblx0dmFyIG1heFllYXIgPSBzZWxmLmRhdGEuZ3JhcGgueWVhclJhbmdlWzFdO1xuXHRmdW5jdGlvbiBnZXROb2Rlc1RoaXNZZWFyKCkge1xuXHRcdHZhciBub2Rlc1RoaXNZZWFyID0gc2VsZi5ub3RFZ29Ob2Rlcy5maWx0ZXIoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5ZZWFyID09IHNlbGYuZGVzdGluYXRpb25ZZWFyOyB9KTtcblx0XHRyZXR1cm4gbm9kZXNUaGlzWWVhcjtcblx0fVxuXHR2YXIgbm9kZXNUaGlzWWVhciA9IGdldE5vZGVzVGhpc1llYXIoKTtcblx0aWYgKG5vZGVzVGhpc1llYXIubGVuZ3RoID4gMCkge1xuXHRcdHZhciBsYXN0Tm9kZVRoaXNZZWFyID0gbm9kZXNUaGlzWWVhcltub2Rlc1RoaXNZZWFyLmxlbmd0aC0xXTtcblx0XHRzZWxmLmRlc3RpbmF0aW9uTm9kZUluZGV4ID0gbGFzdE5vZGVUaGlzWWVhci5pZHg7XG5cdH0gZWxzZSB7XG5cdFx0aWYgKHNlbGYuZGVzdGluYXRpb25ZZWFyID09IG1heFllYXIpIHtcblx0XHRcdHJld2luZFNlYXJjaCgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzZWxmLmRlc3RpbmF0aW9uWWVhcisrO1xuXHRcdFx0c2VsZi5nZXREZXN0aW5hdGlvbk5vZGUoKTsgIC8vIHJlY3Vyc2Vcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiByZXdpbmRTZWFyY2goKSB7XG5cdFx0c2VsZi5kZXN0aW5hdGlvblllYXItLTtcblx0XHR2YXIgbm9kZXNUaGlzWWVhciA9IGdldE5vZGVzVGhpc1llYXIoKTtcblx0XHRpZiAobm9kZXNUaGlzWWVhci5sZW5ndGggPiAwKSB7XG5cdFx0XHRzZWxmLmdldERlc3RpbmF0aW9uTm9kZSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXdpbmRTZWFyY2goKTsgIC8vIHJlY3Vyc2Vcblx0XHR9XG5cdH1cblxufTtcblxuZWdvR3JhcGhWaXMucHJvdG90eXBlLmNhbGN1bGF0ZVRyYW5zaXRpb25UaW1lID0gZnVuY3Rpb24oKSB7XG5cdC8vIE1ldGhvZCB0byBjYWxjdWxhdGUgdGhlIHRyYW5zaXRpb24gdGltZSBmb3IgZWFjaCBub2RlIGJhc2VkIG9uIHRoZSBudW1iZXIgb2Ygbm9kZXMgaW4gdGhlIGN1cnJlbnQgeWVhclxuXHRcblx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdC8vIFNQRUVEIFVQIEZPUiBURVNUSU5HIFBVUlBPU0VTXG5cdC8vIEtFRVAgVEhJUyBDT01NRU5URUQgT1VUXG5cdC8vIHNlbGYudHJhbnNpdGlvblRpbWVQZXJZZWFyW3NlbGYuY3VyclllYXJdID0gMTAwO1xuXG5cdHZhciBjb3VudFRoaXNZZWFyID0gc2VsZi5kYXRhLmdyYXBoLm5vZGVDb3VudHNQZXJZZWFyW3NlbGYuY3VyclllYXJdO1xuXHRzZWxmLnRyYW5zaXRpb25UaW1lUGVyTm9kZSA9IGNvdW50VGhpc1llYXIgPyBzZWxmLnRyYW5zaXRpb25UaW1lUGVyWWVhcltzZWxmLmN1cnJZZWFyXSAvIGNvdW50VGhpc1llYXIgOiAwO1xuXHRzZWxmLnRyYW5zaXRpb25UaW1lUGVyTm9kZSA9IHNlbGYudHJhbnNpdGlvblRpbWVQZXJOb2RlIC0gMTA7XG5cblxufTtcblxuZWdvR3JhcGhWaXMucHJvdG90eXBlLnJldmVhbEZpbmFsU3RhdGUgPSBmdW5jdGlvbigpIHtcblx0Ly8gY2FuY2VsIGFsbCB0cmFuc2l0aW9ucyBhbmQgcmV2ZWFsIHRoZSBmaW5hbCBzdGF0ZSBvZiB0aGUgdmlzXG5cblx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcblx0ZDMuc2VsZWN0QWxsKCcubm9kZSwgLmxpbmsnKS50cmFuc2l0aW9uKCkuZHVyYXRpb24oMCk7XG5cblx0c2VsZi5ub2RlXG5cdFx0LmNsYXNzZWQoJ2hpZGRlbicsIGZhbHNlKVxuXHRcdC5hdHRyKCdyJywgZnVuY3Rpb24oZCkge1xuXHRcdFx0cmV0dXJuIGQucmFkaXVzO1xuXHRcdH0pXG5cdFx0LmVhY2goZnVuY3Rpb24oZCkge1xuXHRcdFx0aWYgKHNlbGYuem9vbWFibGUgPT09IHRydWUpIHtcblx0XHRcdFx0c2VsZi5jaGVja1pvb20oZClcblx0XHRcdH1cblx0XHR9KTtcblxuXHRzZWxmLmxpbmtcblx0XHQuY2xhc3NlZCgnaGlkZGVuJywgZmFsc2UpXG5cdFx0LmNsYXNzZWQoJ3Zpc2libGUnLCB0cnVlKVxuXHRcdC5zdHlsZSgndmlzaWJpbGl0eScsICd2aXNpYmxlJylcblx0XHQuYXR0cigneDInLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLnRhcmdldC54OyB9KVxuXHRcdC5hdHRyKCd5MicsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQudGFyZ2V0Lnk7IH0pXG5cdFx0LmVhY2goZnVuY3Rpb24oZCkgeyBkLmluVHJhbnNpdGlvbiA9IGZhbHNlOyB9KTtcblxuXHRzZWxmLmN1cnJOb2RlSW5kZXggPSBzZWxmLmRhdGEubm9kZXMubGVuZ3RoLTE7XG5cdHNlbGYuY3VyclllYXIgPSBzZWxmLmRhdGEuZ3JhcGgueWVhclJhbmdlWzFdO1xuXHRzZWxmLnllYXJUZXh0RGlzcGxheS50ZXh0KHNlbGYuY3VyclllYXIpO1xuXHQkLmV2ZW50LnRyaWdnZXIoe1xuXHRcdHR5cGU6IFwieWVhckNoYW5nZVwiLFxuXHR9KVxuXG5cdHNlbGYuZmluaXNoQW5pbWF0aW9uKCk7XG5cblx0cmV0dXJuXG59XG5cblx0XHRcblxuXG5cbnZhciBjaXRhdGlvblZpcyA9IGNpdGF0aW9uVmlzIHx8IHt9O1xuXG5jaXRhdGlvblZpcy5lZ29HcmFwaERhdGEgPSAoZnVuY3Rpb24obWF4Tm9kZXMpIHtcblx0ZnVuY3Rpb24gcHJlcGFyZV9lZ29HcmFwaERhdGEoZ3JhcGgpIHtcblx0XHRmb3IgKGk9MDsgaTxncmFwaC5ub2Rlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0Z3JhcGgubm9kZXNbaV0ub2xkSWR4ID0gaTtcblx0XHR9XG5cdFx0dmFyIG5ld0dyYXBoID0ge307XG5cdFx0Ly8gQ29weSBwcm9wZXJ0aWVzIHRvIG5ld0dyYXBoIHRoYXQgd29uJ3QgY2hhbmdlOlxuXHRcdHZhciBwcm9wc1RvQ29weSA9IFsnZ3JhcGgnLCAnZGlyZWN0ZWQnLCAnbXVsdGlncmFwaCddO1xuXHRcdGZvciAoaT0wOyBpPHByb3BzVG9Db3B5Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgcHJvcCA9IHByb3BzVG9Db3B5W2ldO1xuXHRcdFx0aWYgKGdyYXBoLmhhc093blByb3BlcnR5KHByb3ApKSB7IG5ld0dyYXBoW3Byb3BdID0gZ3JhcGhbcHJvcF07IH1cblx0XHR9XG5cblx0XHRuZXdHcmFwaC5ub2RlcyA9IFtdO1xuXHRcdG5ld0dyYXBoLm5vZGVzLnB1c2goZ3JhcGgubm9kZXNbMF0pO1xuXHRcdG5ld0dyYXBoLm5vZGVzWzBdLmlkeCA9IDA7XG5cdFx0Ly8gLy8gdGhpcyBpcyBhIHRlc3Q6XG5cdFx0Ly8gZm9yIChpPTEwOyBpPDIwOyBpKyspIHtcblx0XHQvLyBcdHZhciBuZXdOb2RlID0gZ3JhcGgubm9kZXNbaV07XG5cdFx0Ly8gXHRuZXdOb2RlLmlkeCA9IG5ld0dyYXBoLm5vZGVzLmxlbmd0aDtcblx0XHQvLyBcdG5ld0dyYXBoLm5vZGVzLnB1c2gobmV3Tm9kZSk7XG5cdFx0Ly8gfVxuXHRcdHZhciBub3RFZ29Ob2RlcyA9IFtdO1xuXHRcdC8vIEZpbHRlciBvdXQgbm9kZXMgdGhhdCBoYXZlIHllYXIgb2YgMFxuXHRcdGZvciAodmFyIGk9MTsgaTxncmFwaC5ub2Rlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0Ly8gaWYgKCAoZ3JhcGgubm9kZXNbaV0uRUYgPiAwKSAmJiAoZ3JhcGgubm9kZXNbaV0uWWVhcj4wKSApIHtcblx0XHRcdGlmIChncmFwaC5ub2Rlc1tpXS5ZZWFyPjAgJiYgZ3JhcGgubm9kZXNbaV0uVGl0bGUgIT0gXCJcIikge1xuXHRcdFx0XHRub3RFZ29Ob2Rlcy5wdXNoKGdyYXBoLm5vZGVzW2ldKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Ly8gU3RhcnQgYnkgcmFuZG9taXppbmcgdGhlIG9yZGVyIG9mIGFsbCB0aGUgbm9kZXNcblx0XHRkMy5zaHVmZmxlKG5vdEVnb05vZGVzKTtcblx0XHQvLyBvcmRlciBkZXNjZW5kaW5nIGJ5IEVpZ2VuZmFjdG9yXG5cdFx0Ly8gbm90RWdvTm9kZXMuc29ydChmdW5jdGlvbihhLGIpIHsgcmV0dXJuIGIuRUYgLSBhLkVGOyB9KTtcblx0XHRub3RFZ29Ob2Rlcy5zb3J0KGZ1bmN0aW9uKGEsYikgeyByZXR1cm4gZDMuZGVzY2VuZGluZyhhLkVGLCBiLkVGKTsgfSk7XG5cdFx0Ly8gLy8gSSBkb24ndCB3YW50IHRvIHJlbW92ZSBhbnkgbm9kZXMgdGhhdCBoYXZlIGEgZGlmZmVyZW50IERvbWFpbklEIHRoYW4gdGhlIGVnbyxcblx0XHQvLyAvLyBzbyBJJ2xsIG1vdmUgdGhvc2UgdG8gdGhlIGZyb250IHRvIHByb3RlY3QgdGhlbS5cblx0XHQvLyAvLyBBQ1RVQUxMWSB0aGVyZSBhcmUgdG9vIG1hbnkgdG8gZG8gdGhpc1xuXHRcdC8vIHZhciBlZ29Eb21haW4gPSBncmFwaC5ub2Rlc1swXS5Eb21haW5Db3VudHNbMF0ua2V5OyAgLy8gVGhpcyBpcyB0aGUgbW9zdCBjb21tb24gZG9tYWluIGlkIGZvciB0aGUgZWdvIGF1dGhvcidzIHBhcGVyc1xuXHRcdC8vIHZhciBjID0gW107XG5cdFx0Ly8gZm9yICh2YXIgaT0wOyBpPG5vdEVnb05vZGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Ly8gXHRpZiAoIG5vdEVnb05vZGVzW2ldLkRvbWFpbklEICE9IGVnb0RvbWFpbiApIHtcblx0XHQvLyBcdFx0Yy5wdXNoKG5vdEVnb05vZGVzW2ldLkRvbWFpbklEKTtcblx0XHQvLyBcdFx0bm90RWdvTm9kZXMuc3BsaWNlKDAsIDAsIG5vdEVnb05vZGVzLnNwbGljZShpLCAxKVswXSk7XG5cdFx0Ly8gXHR9XG5cdFx0Ly8gfVxuXHRcdC8vIE1vdmUgcGFwZXJzIHRoYXQgaGF2ZSBhIERvbWFpbklEIHRvIHRoZSBmcm9udFxuXHRcdGZ1bmN0aW9uIERvbWFpbklEVG9Gcm9udChhcnIpIHtcblx0XHRcdHZhciBoYXNEb21haW5JRCA9IFtdO1xuXHRcdFx0dmFyIG5vRG9tYWluSUQgPSBbXTtcblx0XHRcdGZvciAodmFyIGkgPSAwLCBsZW4gPSBhcnIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdFx0aWYgKCBhcnJbaV0uRG9tYWluSUQgIT0gMCApIHtcblx0XHRcdFx0XHRoYXNEb21haW5JRC5wdXNoKGFycltpXSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0bm9Eb21haW5JRC5wdXNoKGFycltpXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGNvbnNvbGUubG9nKGFycik7XG5cdFx0XHR2YXIgbmV3QXJyID0gaGFzRG9tYWluSUQuY29uY2F0KG5vRG9tYWluSUQpO1xuXHRcdFx0Y29uc29sZS5sb2cobmV3QXJyKTtcblx0XHRcdHJldHVybiBuZXdBcnI7XG5cdFx0fVxuXHRcdG5vdEVnb05vZGVzID0gRG9tYWluSURUb0Zyb250KG5vdEVnb05vZGVzKTtcblx0XHQvLyBmb3IgKHZhciBpID0gbm90RWdvTm9kZXMubGVuZ3RoLTE7IGk+PTA7IGktLSkge1xuXHRcdC8vIFx0aWYgKCBub3RFZ29Ob2Rlc1tpXS5Eb21haW5JRCAhPSAwICkge1xuXHRcdC8vIFx0XHRub3RFZ29Ob2Rlcy5zcGxpY2UoMCwgMCwgbm90RWdvTm9kZXMuc3BsaWNlKGksIDEpWzBdKTtcblx0XHQvLyBcdH1cblx0XHQvLyB9XG5cdFx0Ly8gY29uc29sZS5sb2coYyk7XG5cdFx0Ly8gVGFrZSB0aGUgZmlyc3QgbiBpdGVtcywgd2hlcmUgbiA9IG1heE5vZGVzXG5cdFx0Ly8gY29uc29sZS5sb2cobWF4Tm9kZXMpO1xuXHRcdGlmICh0eXBlb2YgbWF4Tm9kZXMgPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHZhciBtYXhOb2RlcyA9IDI3NDsgIC8vIFRPRE86IGltcGxlbWVudCB0aGlzIGJldHRlciAoc28gaXQncyBub3QgaGFyZCBjb2RlZCBoZXJlKVxuXHRcdH1cblx0XHQvLyB2YXIgbWF4Tm9kZXMgPSA1MDAwOyAgLy8gVE9ETzogaW1wbGVtZW50IHRoaXMgYmV0dGVyIChzbyBpdCdzIG5vdCBoYXJkIGNvZGVkIGhlcmUpXG5cdFx0aWYgKG5vdEVnb05vZGVzLmxlbmd0aCA+IG1heE5vZGVzKSB7XG5cdFx0XHQvLyBzZWxmLmFsbE5vZGVzID0gc2VsZi5hbGxOb2Rlcy5zbGljZSgwLCBzZWxmLmdyYXBoUGFyYW1zLm1heE5vZGVzLnZhbHVlKTtcblx0XHRcdG5vdEVnb05vZGVzID0gbm90RWdvTm9kZXMuc2xpY2UoMCwgbWF4Tm9kZXMpO1xuXHRcdH1cbiAgICAgICAgLy8gc29ydCBieSBZZWFyXG4gICAgICAgIC8vIHRoZW4gc29ydCBieSBFRiAoc2l6ZSkgc28gdGhhdCBsYXJnZXIgbm9kZXMgdGVuZCB0byBhcHBlYXIgZmlyc3QuXG4gICAgICAgIC8vICh0aGlzIHNvbWV3aGF0IHJlZHVjZXMgdGhlIHByb2JsZW0gb2Ygc2VuZGluZyBvdXQgXG4gICAgICAgIC8vIGxpbmtzIHRvIG5vZGVzIHRoYXQgaGF2ZW4ndCBhcHBlYXJlZCB5ZXQuXG4gICAgICAgIC8vIG1heWJlIHRyeSBhIGJldHRlciBzb2x1dGlvbiBsYXRlci4pXG5cdFx0bm90RWdvTm9kZXMuc29ydChmdW5jdGlvbihhLGIpIHtcblx0XHRcdHJldHVybiBkMy5hc2NlbmRpbmcoYS5ZZWFyLCBiLlllYXIpIHx8IGQzLmRlc2NlbmRpbmcoYS5FRiwgYi5FRik7XG5cdFx0fSk7XG5cblx0XHQvLyBBcHBlbmQgdGhlc2UgdG8gbmV3R3JhcGgubm9kZXNcblx0XHRmb3IgKGk9MDsgaTxub3RFZ29Ob2Rlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIG5ld05vZGUgPSBub3RFZ29Ob2Rlc1tpXTtcblx0XHRcdG5ld05vZGUuaWR4ID0gbmV3R3JhcGgubm9kZXMubGVuZ3RoO1xuXHRcdFx0bmV3R3JhcGgubm9kZXMucHVzaChuZXdOb2RlKTtcblx0XHR9XG5cblx0XHRuZXdHcmFwaC5saW5rcyA9IHJlY2FsY3VsYXRlTGlua3MobmV3R3JhcGgubm9kZXMsIGdyYXBoLmxpbmtzKTtcblx0XHRpZiAoIW5ld0dyYXBoLmxpbmtzLmxlbmd0aCkge1xuXHRcdFx0bmV3R3JhcGgubGlua3MgPSByZWNhbGN1bGF0ZUxpbmtzTGVnYWN5KG5ld0dyYXBoLm5vZGVzLCBncmFwaC5saW5rcyk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gcmVjYWxjdWxhdGVMaW5rcyhub2RlcywgbGlua3MpIHtcblx0XHRcdHZhciBuZXdMaW5rcyA9IFtdO1xuXHRcdFx0Zm9yIChpPTA7IGk8bGlua3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Ly8gdmFyIHRoaXNTb3VyY2UgPSBub2Rlcy5maWx0ZXIoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5vbGRJZHggPT09IGxpbmtzW2ldLnNvdXJjZTsgfSk7XG5cdFx0XHRcdC8vIHZhciB0aGlzVGFyZ2V0ID0gbm9kZXMuZmlsdGVyKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQub2xkSWR4ID09PSBsaW5rc1tpXS50YXJnZXQ7IH0pO1xuXHRcdFx0XHRcblx0XHRcdFx0Ly8gbm93ICgyMDE4KSB0aGUgbm9kZSBpZCAoaS5lLiwgUGFwZXJfSUQpIGlzIHdvcmtpbmcgdG8gaWRlbnRpZnkgbGlua3MsIGluc3RlYWQgb2YgdGhlIG5vZGUgaW5kZXhcblx0XHRcdFx0Ly8gbWF5YmUgdGhpcyBpcyBiZWNhdXNlIG9mIGEgbmV3IHZlcnNpb24gb2YgbmV0d29ya3g/XG5cdFx0XHRcdHZhciB0aGlzU291cmNlID0gbm9kZXMuZmlsdGVyKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuaWQgPT09IGxpbmtzW2ldLnNvdXJjZTsgfSk7XG5cdFx0XHRcdHZhciB0aGlzVGFyZ2V0ID0gbm9kZXMuZmlsdGVyKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuaWQgPT09IGxpbmtzW2ldLnRhcmdldDsgfSk7XG5cdFx0XHRcdGlmICggdGhpc1NvdXJjZS5sZW5ndGg+MCAmJiB0aGlzVGFyZ2V0Lmxlbmd0aD4wICkge1xuXHRcdFx0XHRcdGlmICggKHRoaXNUYXJnZXRbMF0ubm9kZVR5cGUgPT09ICdwYXBlcicpICYmICh0aGlzU291cmNlWzBdLlllYXIgPCB0aGlzVGFyZ2V0WzBdLlllYXIpICkge1xuXHRcdFx0XHRcdFx0Ly8gZXhjbHVkZSB0aGUgbGluayBpbiB0aGlzIGNhc2UgKGkuZS4gaWYgdGhlIHNvdXJjZSB5ZWFyIGlzIGxlc3MgdGhhbiB0aGUgdGFyZ2V0IHllYXJcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dmFyIG5ld0xpbmsgPSBsaW5rc1tpXTtcblx0XHRcdFx0XHRcdG5ld0xpbmsuc291cmNlID0gdGhpc1NvdXJjZVswXS5pZHg7XG5cdFx0XHRcdFx0XHRuZXdMaW5rLnRhcmdldCA9IHRoaXNUYXJnZXRbMF0uaWR4O1xuXHRcdFx0XHRcdFx0bmV3TGlua3MucHVzaChsaW5rc1tpXSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRuZXdMaW5rcy5mb3JFYWNoKGZ1bmN0aW9uKGQpIHtcblx0XHRcdFx0aWYgKCB0eXBlb2YgZC50YXJnZXQgIT0gJ251bWJlcicgKSBjb25zb2xlLmxvZyhkKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gbmV3TGlua3M7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gcmVjYWxjdWxhdGVMaW5rc0xlZ2FjeShub2RlcywgbGlua3MpIHtcblx0XHRcdHZhciBuZXdMaW5rcyA9IFtdO1xuXHRcdFx0Zm9yIChpPTA7IGk8bGlua3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dmFyIHRoaXNTb3VyY2UgPSBub2Rlcy5maWx0ZXIoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5vbGRJZHggPT09IGxpbmtzW2ldLnNvdXJjZTsgfSk7XG5cdFx0XHRcdHZhciB0aGlzVGFyZ2V0ID0gbm9kZXMuZmlsdGVyKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQub2xkSWR4ID09PSBsaW5rc1tpXS50YXJnZXQ7IH0pO1xuXHRcdFx0XHRcblx0XHRcdFx0aWYgKCB0aGlzU291cmNlLmxlbmd0aD4wICYmIHRoaXNUYXJnZXQubGVuZ3RoPjAgKSB7XG5cdFx0XHRcdFx0aWYgKCAodGhpc1RhcmdldFswXS5ub2RlVHlwZSA9PT0gJ3BhcGVyJykgJiYgKHRoaXNTb3VyY2VbMF0uWWVhciA8IHRoaXNUYXJnZXRbMF0uWWVhcikgKSB7XG5cdFx0XHRcdFx0XHQvLyBleGNsdWRlIHRoZSBsaW5rIGluIHRoaXMgY2FzZSAoaS5lLiBpZiB0aGUgc291cmNlIHllYXIgaXMgbGVzcyB0aGFuIHRoZSB0YXJnZXQgeWVhclxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR2YXIgbmV3TGluayA9IGxpbmtzW2ldO1xuXHRcdFx0XHRcdFx0bmV3TGluay5zb3VyY2UgPSB0aGlzU291cmNlWzBdLmlkeDtcblx0XHRcdFx0XHRcdG5ld0xpbmsudGFyZ2V0ID0gdGhpc1RhcmdldFswXS5pZHg7XG5cdFx0XHRcdFx0XHRuZXdMaW5rcy5wdXNoKGxpbmtzW2ldKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBuZXdMaW5rcztcblx0XHR9XG5cblx0XHR2YXIgeWVhclJhbmdlID0gbmV3R3JhcGguZ3JhcGgueWVhclJhbmdlO1xuXHRcdGZ1bmN0aW9uIGdldE5vZGVDb3VudHNQZXJZZWFyKG5vZGVzLCB5ZWFyUmFuZ2UpIHtcblx0XHRcdHZhciB5ZWFyc05lc3QgPSBkMy5uZXN0KClcblx0XHRcdFx0LmtleShmdW5jdGlvbihkKSB7IHJldHVybiBkLlllYXI7IH0pLnNvcnRLZXlzKGQzLmFzY2VuZGluZylcblx0XHRcdFx0LnJvbGx1cChmdW5jdGlvbihsZWF2ZXMpIHsgcmV0dXJuIGxlYXZlcy5sZW5ndGg7IH0pXG5cdFx0XHRcdC8vIC5lbnRyaWVzKG5vZGVzLnNsaWNlKDEpKTsgIC8vIGFsbCBleGNlcHQgZWdvIG5vZGUgKG5vZGVbMF0pXG5cdFx0XHRcdC5tYXAobm9kZXMuc2xpY2UoMSkpO1xuXG5cdFx0XHR2YXIgbm9kZUNvdW50c1BlclllYXIgPSB7fTtcblx0XHRcdGZvciAodmFyIGk9eWVhclJhbmdlWzBdOyBpPD15ZWFyUmFuZ2VbMV07IGkrKykge1xuXHRcdFx0XHR2YXIgY291bnRUaGlzWWVhciA9IHllYXJzTmVzdFtpXTtcblx0XHRcdFx0aWYgKHR5cGVvZiBjb3VudFRoaXNZZWFyID09PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdG5vZGVDb3VudHNQZXJZZWFyW2ldID0gMDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRub2RlQ291bnRzUGVyWWVhcltpXSA9IGNvdW50VGhpc1llYXI7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBub2RlQ291bnRzUGVyWWVhcjtcblx0XHR9XG5cdFx0bmV3R3JhcGguZ3JhcGgubm9kZUNvdW50c1BlclllYXIgPSBnZXROb2RlQ291bnRzUGVyWWVhcihuZXdHcmFwaC5ub2RlcywgeWVhclJhbmdlKTtcblxuXG5cdFx0Y29uc29sZS5sb2cobmV3R3JhcGgpO1xuXHRcdHJldHVybiBuZXdHcmFwaDtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0cHJlcGFyZV9lZ29HcmFwaERhdGE6IHByZXBhcmVfZWdvR3JhcGhEYXRhXG5cdH07XG59KCkpO1xuXG52YXIgY2l0YXRpb25WaXMgPSBjaXRhdGlvblZpcyB8fCB7fTtcblxuY2l0YXRpb25WaXMuZXZlbnRMaXN0ZW5lcnMgPSAoZnVuY3Rpb24oKSB7XG5cdC8vIEV2ZW50IGxpc3RlbmVycyB0aGF0IGFjdCBhY3Jvc3MgZGlmZmVyZW50IHZpc3VhbGl6YXRpb24gb2JqZWN0cyBnbyBoZXJlXG5cdFxuXHQvLyBmdW5jdGlvbiB0b29sdGlwTGlzdGVuZXIoKSB7XG5cdC8vIFx0Ly8gQWRkIGV2ZW50IGxpc3RlbmVyIHRvIG5vZGVzIGZvciB0b29sdGlwOlxuXHQvLyBcdGQzLnNlbGVjdEFsbCgnLm5vZGUnKVxuXHQvLyBcdFx0Lm9uKCdtb3VzZW92ZXInLCBmdW5jdGlvbihkKSB7XG5cdC8vIFx0XHRcdHZhciB0b29sdGlwSHRtbCA9IHNlbGYubWFrZVRvb2x0aXAoZCk7XG5cdC8vIFx0XHRcdHNlbGYudG9vbHRpcCA9IHNlbGYudG9vbHRpcFxuXHQvLyBcdFx0XHRcdC5odG1sKHRvb2x0aXBIdG1sKVxuXHQvLyBcdFx0XHRcdC5zdHlsZSgndmlzaWJpbGl0eScsICd2aXNpYmxlJylcblx0Ly8gXHRcdFx0XHQuc3R5bGUoJ2JvcmRlci1zdHlsZScsICdzb2xpZCcpXG5cdC8vIFx0XHRcdFx0LnN0eWxlKCdib3JkZXItY29sb3InLCBkLmNvbG9yKTtcblx0Ly8gXHRcdH0pXG5cdC8vIFx0XHQub24oJ21vdXNlbW92ZScsIGZ1bmN0aW9uKCkge1xuXHQvLyBcdFx0XHRzZWxmLnRvb2x0aXAgPSBzZWxmLnRvb2x0aXBcblx0Ly8gXHRcdFx0XHQuc3R5bGUoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpXG5cdC8vIFx0XHRcdFx0LnN0eWxlKCd0b3AnLCAoZDMuZXZlbnQucGFnZVktMTApKydweCcpXG5cdC8vIFx0XHRcdFx0LnN0eWxlKCdsZWZ0JywgKGQzLmV2ZW50LnBhZ2VYKzEwKSsncHgnKTtcblx0Ly8gXHRcdH0pXG5cdC8vIFx0XHQub24oJ21vdXNlb3V0JywgZnVuY3Rpb24oKSB7XG5cdC8vIFx0XHRcdHNlbGYudG9vbHRpcCA9IHNlbGYudG9vbHRpcC5zdHlsZSgndmlzaWJpbGl0eScsICdoaWRkZW4nKTsgfSk7XG5cdC8vIH1cblxuXHRyZXR1cm4ge1xuXHRcdC8vIHRvb2x0aXBMaXN0ZW5lcjogdG9vbHRpcExpc3RlbmVyXG5cdH07XG59KCkpO1xuLy8gVGhpcyB3aWxsIGFkZCB0aGUgYWJpbGl0eSB0byBjaGFuZ2UgdGhlIHR5cGUgb2YgZG9tYWluIChlLmcuIGZyb20gY2F0ZWdvcnkgdG8gdmVudWUpIHRoYXQgdGhlIG5vZGVzIGFyZSBjb2xvcmVkIGJ5XG4vLyBUaGUgSlNPTiBkYXRhIG11c3QgaGF2ZSB0aGUgcmlnaHQgcHJvcGVydGllcyAoaS5lLiBgZ3JhcGguRG9tYWluc011bHRgIGFuZCBub2RlIHByb3BlcnR5IGBEb21haW5NdWx0YFxuLy8gYW5kIHRoZSBVUkwgbXVzdCBoYXZlIHRoZSBxdWVyeSBwYXJhbWV0ZXIgXCJkb21haW5zTXVsdFwiXG5cbi8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvOTAxMTE1L2hvdy1jYW4taS1nZXQtcXVlcnktc3RyaW5nLXZhbHVlcy1pbi1qYXZhc2NyaXB0XG5mdW5jdGlvbiBnZXRQYXJhbWV0ZXJCeU5hbWUobmFtZSwgdXJsKSB7XG5cdGlmICghdXJsKSB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcblx0bmFtZSA9IG5hbWUucmVwbGFjZSgvW1xcW1xcXV0vZywgXCJcXFxcJCZcIik7XG4gICAgdmFyIHJlZ2V4ID0gbmV3IFJlZ0V4cChcIls/Jl1cIiArIG5hbWUgKyBcIig9KFteJiNdKil8JnwjfCQpXCIpLFxuXHRcdHJlc3VsdHMgPSByZWdleC5leGVjKHVybCk7XG5cdGlmICghcmVzdWx0cykgcmV0dXJuIG51bGw7XG5cdGlmICghcmVzdWx0c1syXSkgcmV0dXJuICcnO1xuXHRyZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHJlc3VsdHNbMl0ucmVwbGFjZSgvXFwrL2csIFwiIFwiKSk7XG59XG5cbnZhciBjaXRhdGlvblZpcyA9IGNpdGF0aW9uVmlzIHx8IHt9O1xuXG4kKCBkb2N1bWVudCApLm9uKCBcImluaXRDb21wbGV0ZVwiLCBmdW5jdGlvbigpIHtcblx0dmFyIGVnb0dyYXBoVmlzID0gY2l0YXRpb25WaXMuZWdvR3JhcGhWaXM7XG5cdHZhciBkb21haW5zTXVsdCA9IGVnb0dyYXBoVmlzLmRhdGEuZ3JhcGguRG9tYWluc011bHRcblx0aWYgKCAoIWRvbWFpbnNNdWx0KSB8fCAoIWdldFBhcmFtZXRlckJ5TmFtZSgnZG9tYWluc011bHQnKSkgKSB7XG5cdFx0Ly8gaW4gdGhpcyBjYXNlLCBleGl0IHdpdGhvdXQgZG9pbmcgYW55dGhpbmdcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyICRkb21haW5Ecm9wZG93biA9ICQoICc8ZGl2PicgKTtcblx0JGRvbWFpbkRyb3Bkb3duLmFwcGVuZCggJCggJzxsYWJlbD4nICkudGV4dCgnQ29sb3IgYnk6ICcpLmNzcyggJ2Rpc3BsYXknLCAnaW5saW5lJyApICk7XG5cdHZhciBkb21haW5fc2VsZWN0ID0gJGRvbWFpbkRyb3Bkb3duLmFwcGVuZCggJCggJzxzZWxlY3Q+JyApLmF0dHIoICdpZCcsICdkb21haW5fc2VsZWN0JyApICk7XG5cdCQoICcjbWFpbkRpdicgKS5wcmVwZW5kKCAkZG9tYWluRHJvcGRvd24gKTtcblx0JC5lYWNoKGRvbWFpbnNNdWx0LCBmdW5jdGlvbihrLCB2KSB7XG5cdFx0JCggJyNkb21haW5fc2VsZWN0JyApLmFwcGVuZCggJCggJzxvcHRpb24+JyApLnRleHQoaykgKTtcblx0XHRkMy5zZWxlY3QoXCIjbWFpbkRpdlwiKS5hcHBlbmQoXCJwXCIpXG5cdFx0XHQudGV4dChrKVxuXHRcdFx0Lm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7c3dpdGNoRG9tYWluKGspO30pO1xuXHR9KTtcblx0JCggJyNkb21haW5fc2VsZWN0JyApLnZhbChcImNhdGVnb3J5X2Zyb21fa2V5d29yZFwiKTtcblx0JCggJyNkb21haW5fc2VsZWN0JyApLm9uKCAnY2hhbmdlJywgZnVuY3Rpb24oKSB7IHN3aXRjaERvbWFpbigkKHRoaXMpLnZhbCgpKTsgfSk7XG5cblx0ZnVuY3Rpb24gc3dpdGNoRG9tYWluKGRvbWFpblR5cGUpIHtcblx0XHR2YXIgZHVyID0gMjAwO1xuXHRcdGVnb0dyYXBoVmlzLmRhdGEuZ3JhcGguRG9tYWlucyA9IGRvbWFpbnNNdWx0W2RvbWFpblR5cGVdO1xuXHRcdGZvciAodmFyIGkgPSAwLCBsZW4gPSBlZ29HcmFwaFZpcy5ub3RFZ29Ob2Rlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0dmFyIHRoaXNOb2RlID0gZWdvR3JhcGhWaXMubm90RWdvTm9kZXNbaV07XG5cdFx0XHR0aGlzTm9kZS5Eb21haW5JRCA9IHRoaXNOb2RlLkRvbWFpbk11bHRbZG9tYWluVHlwZV07XG5cdFx0fVxuXHRcdGVnb0dyYXBoVmlzLmdldERvbWFpbnNUaGlzR3JhcGgoKTtcblx0XHRkMy5zZWxlY3RBbGwoXCIubGVnZW5kSXRlbVwiKS5yZW1vdmUoKTtcblx0XHRlZ29HcmFwaFZpcy5sZWdlbmRJbml0KCk7XG5cdFx0ZDMuc2VsZWN0QWxsKFwiLm5vZGVcIilcblx0XHRcdC5lYWNoKGZ1bmN0aW9uKGQpIHtcblx0XHRcdFx0ZC5Eb21haW5OYW1lID0gZWdvR3JhcGhWaXMuZGF0YS5ncmFwaC5Eb21haW5zW2QuRG9tYWluSURdO1xuXHRcdFx0XHRmb3IgKHZhciBpPTA7IGk8ZWdvR3JhcGhWaXMuZG9tYWluc1RoaXNHcmFwaC5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdHZhciB0aGlzRG9tYWluID0gZWdvR3JhcGhWaXMuZG9tYWluc1RoaXNHcmFwaFtpXS5rZXlcblx0XHRcdFx0XHRpZiAodGhpc0RvbWFpbj09ZC5Eb21haW5JRCkge1xuXHRcdFx0XHRcdFx0Ly8gdmFyIHRoaXNDb2xvciA9IHNlbGYuY29sb3JTY2hlbWVbaV07XG5cdFx0XHRcdFx0XHR2YXIgdGhpc0NvbG9yID0gZWdvR3JhcGhWaXMuZG9tYWluc1RoaXNHcmFwaFtpXS5jb2xvcjtcblx0XHRcdFx0XHRcdGQuY29sb3IgPSB0aGlzQ29sb3I7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdFx0LnRyYW5zaXRpb24oKS5kdXJhdGlvbihkdXIpXG5cdFx0XHQuYXR0cignZmlsbCcsICd3aGl0ZScpXG5cdFx0XHQuZWFjaCgnZW5kJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGQzLnNlbGVjdCh0aGlzKVxuXHRcdFx0XHRcdC50cmFuc2l0aW9uKCkuZHVyYXRpb24oZHVyKVxuXHRcdFx0XHRcdC5hdHRyKCdmaWxsJywgZnVuY3Rpb24oZCkge1xuXHRcdFx0XHRcdFx0Ly8gY29sb3IgdGhlIG5vZGVzIGJhc2VkIG9uIERvbWFpbklEXG5cdFx0XHRcdFx0XHRyZXR1cm4gZC5jb2xvclxuXHRcdFx0XHRcdH0pXG5cdFx0XHR9KVxuXHRcdGQzLnRyYW5zaXRpb24oKS5kdXJhdGlvbihkdXIqMikuZWFjaCgnZW5kJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRlZ29HcmFwaFZpcy5yZXZlYWxGaW5hbFN0YXRlKCk7XG5cdFx0fSk7XG5cdH1cbn0pO1xuXG5cbmZ1bmN0aW9uIGxpbmVDaGFydEJ5WWVhcihkYXRhKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblx0c2VsZi5kYXRhID0gZGF0YS52YWx1ZXM7XG5cdHNlbGYucGV3X0NsYXNzID0gZGF0YS5wZXdfQ2xhc3M7XG5cdHNlbGYuaHJhX2Z1bmRpbmcgPSBkYXRhLmZ1bmRpbmc7XG5cdC8vIGlmIHRoZXJlIGlzIG9ubHkgb25lIGZ1bmRpbmcgcmVjb3JkOlxuXHQvLyBpZiAoc2VsZi5ocmFfZnVuZGluZy5sZW5ndGggPT0gMSkge1xuXHQvLyBcdHNlbGYuaHJhX2Z1bmRpbmcgPSBzZWxmLmhyYV9mdW5kaW5nWzBdO1xuXHQvLyB9XG5cdFxuXHQvLyB0ZXN0aW5nOlxuXHQvLyBzZWxmLmhyYV9mdW5kaW5nID0gc2VsZi5ocmFfZnVuZGluZ1swXTtcblx0Ly8gY29uc29sZS5sb2coc2VsZi5ocmFfZnVuZGluZyk7XG5cblx0Ly8gRGVmYXVsdHNcblx0Ly8gR3JhcGggU1ZHIERpbWVuc2lvbnNcbiAgICAvLyBzZWxmLmxpbmVDaGFydERpbWVuc2lvbnMgPSB7XG5cdC8vIFx0bWFyZ2luOiB7dG9wOiAzMCwgcmlnaHQ6IDIwLCBib3R0b206IDMwLCBsZWZ0OiA1MH1cblx0Ly8gfTtcblx0Ly8gc2VsZi5saW5lQ2hhcnREaW1lbnNpb25zLndpZHRoID0gOTYwICogMy80IC0gc2VsZi5saW5lQ2hhcnREaW1lbnNpb25zLm1hcmdpbi5sZWZ0IC0gc2VsZi5saW5lQ2hhcnREaW1lbnNpb25zLm1hcmdpbi5yaWdodDtcblx0Ly8gc2VsZi5saW5lQ2hhcnREaW1lbnNpb25zLmhlaWdodCA9IDExMCAtIHNlbGYubGluZUNoYXJ0RGltZW5zaW9ucy5tYXJnaW4udG9wIC0gc2VsZi5saW5lQ2hhcnREaW1lbnNpb25zLm1hcmdpbi5ib3R0b207XG5cdHNlbGYubGluZUNoYXJ0RGltZW5zaW9uczsgIC8vIGltcG9ydGVkIGluIHNlbGYuaW1wb3J0RGVmYXVsdE9wdGlvbnMgYmVsb3dcblx0XG5cdHNlbGYuY29sb3JTY2hlbWU7XG5cdC8vIC8vIENvbG9yczpcbiAgICAvLyAvLyBTZWUgaHR0cDovL2NvbG9yYnJld2VyMi5vcmcvP3R5cGU9cXVhbGl0YXRpdmUmc2NoZW1lPVNldDEmbj04XG4gICAgLy8gc2VsZi5jb2xvclNjaGVtZSA9IFsncmdiKDIyOCwyNiwyOCknLCdyZ2IoNTUsMTI2LDE4NCknLCdyZ2IoNzcsMTc1LDc0KScsXG4gICAgLy8gICAgICAgICAncmdiKDE1Miw3OCwxNjMpJywncmdiKDI1NSwxMjcsMCknLCdyZ2IoMjU1LDI1NSw1MSknLFxuICAgIC8vICAgICAgICAgJ3JnYigxNjYsODYsNDApJywncmdiKDI0NywxMjksMTkxKSddXG4gICAgLy8gLy8gSSBsaWtlZCB0aGUgYmx1ZSBiZXR0ZXIgZm9yIHRoZSBtYWluIGNvbG9yLCBzbyB0aGUgbmV4dCBsaW5lIGp1c3QgbW92ZXNcbiAgICAvLyAvLyB0aGUgYmx1ZSBjb2xvciAob3JpZ2luYWxseSBzZWxmLmNvbG9yU2NoZW1lWzFdKSB0byB0aGUgZnJvbnQgKHNlbGYuY29sb3JTY2hlbWVbMF0pXG4gICAgLy8gc2VsZi5jb2xvclNjaGVtZS5zcGxpY2UoMCwgMCwgc2VsZi5jb2xvclNjaGVtZS5zcGxpY2UoMSwgMSlbMF0pXG5cbiAgICAvLyBzZWxmLnggPSBkMy50aW1lLnNjYWxlKCkucmFuZ2UoWzAsIHNlbGYubGluZUNoYXJ0RGltZW5zaW9ucy53aWR0aF0pO1xuXG5cdHNlbGYueDtcblx0c2VsZi55O1xuXHRzZWxmLmNoYXJ0RGl2O1xuICAgIHNlbGYuc3ZnO1xuICAgIHNlbGYuc3ZnRGVmcztcblx0c2VsZi50aXRsZTtcbiAgICBzZWxmLmNsaXBQYXRoO1xuICAgIHNlbGYuY3VyclllYXJJbmRpY2F0b3I7XG5cdHNlbGYueWVhckFyZWE7XG5cdHNlbGYueWVhckFyZWFPcGFjaXR5ID0gLjE7XG4gICAgc2VsZi54QXhpcztcbiAgICBzZWxmLnlBeGlzO1xuICAgIHNlbGYubGluZTsgIC8vIGxpbmUgZHJhd2luZyBmdW5jdGlvblxuICAgIHNlbGYuYXJlYTsgIC8vIGFyZWEgZHJhd2luZyBmdW5jdGlvblxuXHRzZWxmLmNoYXJ0TGluZTsgIC8vIGFjdHVhbCBsaW5lIGVsZW1lbnRcblx0c2VsZi5jaGFydEFyZWE7ICAvLyBhY3R1YWwgYXJlYSBlbGVtZW50XG5cdHNlbGYubGluZWFyR3JhZGllbnQ7XG5cblx0c2VsZi5hbmltYXRpb25TdGF0ZTtcblx0c2VsZi5jdXJyWWVhcjtcblx0c2VsZi50cmFuc2l0aW9uVGltZVBlclllYXI7XG5cdHNlbGYueWVhclJhbmdlID0gZDMuZXh0ZW50KHNlbGYuZGF0YSwgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC55ZWFyOyB9KTtcblx0Ly8gLy8gY3V0IG9mZiBhdCAyMDE1XG5cdC8vIHNlbGYueWVhclJhbmdlWzFdID0gTWF0aC5taW4oc2VsZi55ZWFyUmFuZ2VbMV0sIDIwMTUpO1xuXHQvLyBjdXQgb2ZmIGF0IDIwMTdcblx0c2VsZi55ZWFyUmFuZ2VbMV0gPSBNYXRoLm1pbihzZWxmLnllYXJSYW5nZVsxXSwgMjAxNyk7XG5cdFxuXHRzZWxmLmZ1bmRpbmdUaW1lO1xuXHRpZiAodHlwZW9mIHNlbGYucGV3X0NsYXNzICE9ICd1bmRlZmluZWQnKSB7XG5cdFx0c2VsZi5mdW5kaW5nVGltZSA9IDQ7ICAvLyBmdW5kaW5nIHBlcmlvZCBmb3IgUGV3XG5cdH1cblx0aWYgKHR5cGVvZiBzZWxmLmhyYV9mdW5kaW5nICE9ICd1bmRlZmluZWQnKSB7XG5cdFx0c2VsZi5ocmFfZnVuZGluZyA9IHNlbGYuaHJhX2Z1bmRpbmdbMF07XG5cdFx0c2VsZi5mdW5kaW5nVGltZSA9IHNlbGYuaHJhX2Z1bmRpbmcuZHVyYXRpb25faW5feWVhcnM7XG5cdFx0Ly8gdGhpcyBpcyBhIGhhY2sgdGhhdCB3aWxsIHdvcmsgZm9yIG5vd1xuXHRcdC8vIFRPRE86IGZpeCB0aGlzXG5cdFx0c2VsZi5wZXdfQ2xhc3MgPSBzZWxmLmhyYV9mdW5kaW5nLnN0YXJ0X2RhdGU7XG5cdH1cblxuXHQvLyBzZWxmLmluaXQoKTtcblxuXHRyZXR1cm4gc2VsZjtcblxufVxuXG5saW5lQ2hhcnRCeVllYXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cblx0c2VsZi5hbmltYXRpb25TdGF0ZSA9ICdpbml0Jztcblx0c2VsZi5jdXJyWWVhciA9IHNlbGYueWVhclJhbmdlWzBdOyAgLy8gSW5pdGlhbGl6ZSB5ZWFyXG5cbiAgICBzZWxmLnggPSBkMy5zY2FsZS5saW5lYXIoKS5yYW5nZShbMCwgc2VsZi5saW5lQ2hhcnREaW1lbnNpb25zLndpZHRoXSk7XG4gICAgc2VsZi55ID0gZDMuc2NhbGUubGluZWFyKCkucmFuZ2UoW3NlbGYubGluZUNoYXJ0RGltZW5zaW9ucy5oZWlnaHQsIDBdKTtcblxuXHRzZWxmLmNoYXJ0RGl2ID0gZDMuc2VsZWN0KCcjY2hhcnRzRGl2JykuYXBwZW5kKCdkaXYnKVxuXHRcdC5hdHRyKCdjbGFzcycsICdjaGFydERpdicpO1xuXG5cdHNlbGYuc3ZnID0gc2VsZi5jaGFydERpdi5hcHBlbmQoJ3N2ZycpXG5cdCAgICAuYXR0cignd2lkdGgnLCBzZWxmLmxpbmVDaGFydERpbWVuc2lvbnMud2lkdGggKyBzZWxmLmxpbmVDaGFydERpbWVuc2lvbnMubWFyZ2luLmxlZnQgKyBzZWxmLmxpbmVDaGFydERpbWVuc2lvbnMubWFyZ2luLnJpZ2h0KVxuXHQgICAgLmF0dHIoJ2hlaWdodCcsIHNlbGYubGluZUNoYXJ0RGltZW5zaW9ucy5oZWlnaHQgKyBzZWxmLmxpbmVDaGFydERpbWVuc2lvbnMubWFyZ2luLnRvcCArIHNlbGYubGluZUNoYXJ0RGltZW5zaW9ucy5tYXJnaW4uYm90dG9tKVxuXHQgICAgLy8gLmF0dHIoJ2lkJywgJ2NoYXJ0MlN2ZycpXG5cdCAgICAuYXR0cignY2xhc3MnLCAnbGluZUNoYXJ0Jylcblx0ICAgIC5hcHBlbmQoJ2cnKVxuXHQgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIHNlbGYubGluZUNoYXJ0RGltZW5zaW9ucy5tYXJnaW4ubGVmdCArICcsJyArIHNlbGYubGluZUNoYXJ0RGltZW5zaW9ucy5tYXJnaW4udG9wICsgJyknKTtcblx0c2VsZi5zdmdEZWZzID0gc2VsZi5zdmcuYXBwZW5kKCdkZWZzJyk7XG5cdFxuXHQvLyBUaGUgc3RyYXRlZ3kgaXMgdG8gZHJhdyB0aGUgZW50aXJlIGxpbmUsIGJ1dCB1c2UgYSBjbGlwIHBhdGggdG8gb25seVxuXHQvLyBkaXNwbGF5IHVwIHRvIHRoZSBjdXJyZW50IHllYXIuXG5cdC8vIHZhciBjaGFydDJDbGlwUGF0aCA9IHNlbGYuc3ZnRGVmc1xuXHQvLyBcdC5hcHBlbmQoJ2NsaXBQYXRoJylcblx0Ly8gXHQuYXR0cignY2xhc3MnLCAnY2xpcCcpXG5cdC8vIFx0LmFwcGVuZCgncmVjdCcpXG5cdC8vIFx0LmF0dHIoJ3dpZHRoJywgMClcblx0Ly8gXHQuYXR0cignaGVpZ2h0Jywgc2VsZi5saW5lQ2hhcnREaW1lbnNpb25zLmhlaWdodCk7XG5cbiAgICAvLyBzZWxmLnguZG9tYWluKFtzZWxmLnN0clRvWWVhcihcIjE5NjhcIiksIHNlbGYuc3RyVG9ZZWFyKFwiMjAxM1wiKV0pO1xuXHRzZWxmLnguZG9tYWluKHNlbGYueWVhclJhbmdlKTtcblx0Ly8gSGFjayB0byBjdXQgb2ZmIHggYXhpcyBhdCAyMDEwOlxuXHQvLyBzZWxmLnguZG9tYWluKFtzZWxmLnllYXJSYW5nZVswXSwgMjAxMF0pO1xuXHQvLyBzZWxmLnkuZG9tYWluKFswLCBkMy5tYXgoc2VsZi5kYXRhLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLmNvdW50KzU7IH0pXSk7XG5cdHNlbGYueS5kb21haW4oWzAsIGQzLm1heChzZWxmLmRhdGEsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuY291bnQ7IH0pXSk7XG5cblx0c2VsZi54QXhpcyA9IGQzLnN2Zy5heGlzKCkuc2NhbGUoc2VsZi54KVxuXHRcdC5vcmllbnQoJ2JvdHRvbScpXG5cdFx0LnRpY2tGb3JtYXQoZDMuZm9ybWF0KFwiZFwiKSlcblx0XHQvLyAudGlja3MoMTYpO1xuXHRcdC50aWNrcyhNYXRoLm1pbihzZWxmLmRhdGEubGVuZ3RoLCAyMCkpO1xuXHRcblx0c2VsZi55QXhpcyA9IGQzLnN2Zy5heGlzKCkuc2NhbGUoc2VsZi55KVxuXHRcdC5vcmllbnQoJ2xlZnQnKVxuXHRcdC50aWNrcygyKVxuXHRcdC50aWNrU2l6ZSgwKTtcblx0XG4gICAgLy8gRGVmaW5lIGxpbmUgZHJhd2luZyBmdW5jdGlvblxuICAgIHNlbGYubGluZSA9IGQzLnN2Zy5saW5lKClcblx0XHQueChmdW5jdGlvbihkKSB7IHJldHVybiBzZWxmLngoZC55ZWFyKTsgfSlcblx0XHQueShmdW5jdGlvbihkKSB7IHJldHVybiBzZWxmLnkoZC5jb3VudCk7IH0pO1xuICAgIFxuICAgIC8vIERlZmluZSB0aGUgYXJlYSBkcmF3aW5nIGZ1bmN0aW9uXG4gICAgc2VsZi5hcmVhID0gZDMuc3ZnLmFyZWEoKVxuXHRcdC54KGZ1bmN0aW9uKGQpIHsgcmV0dXJuIHNlbGYueChkLnllYXIpOyB9KVxuXHRcdC55MChzZWxmLmxpbmVDaGFydERpbWVuc2lvbnMuaGVpZ2h0KVxuXHRcdC55MShmdW5jdGlvbihkKSB7IHJldHVybiBzZWxmLnkoZC5jb3VudCk7IH0pO1xuXG5cdC8vIERyYXcgeCBheGlzXG4gICAgc2VsZi5zdmcuYXBwZW5kKCdnJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd4IGF4aXMnKVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoMCwnICsgc2VsZi5saW5lQ2hhcnREaW1lbnNpb25zLmhlaWdodCArICcpJylcbiAgICAgICAgICAgIC5jYWxsKHNlbGYueEF4aXMpO1xuXG4gICAgLy8gUHV0IHRoZSB5ZWFyIGZvciBlYWNoIGF4aXMgdGljayBsYWJlbCBpbnRvIGEgZGF0YSBhdHRyaWJ1dGVcbiAgICAvLyB0byBiZSBhYmxlIHRvIGdldCBpdCBtb3JlIGVhc2lseSBsYXRlclxuICAgIHZhciB5ZWFyTGFiZWxzID0gc2VsZi5zdmcuc2VsZWN0KCcueC5heGlzJylcbiAgICAgICAgLnNlbGVjdEFsbCgnLnRpY2snKVxuICAgICAgICAuYXR0cignY2xhc3MnLCd5ZWFyVGljaycpXG4gICAgICAgIC8vIC5hdHRyKFwiZGF0YS15ZWFyXCIsIGZ1bmN0aW9uKGQpIHtyZXR1cm4gc2VsZi55ZWFyVG9TdHIoZCk7IH0pXG4gICAgICAgIC5hdHRyKFwiZGF0YS15ZWFyXCIsIGZ1bmN0aW9uKGQpIHtyZXR1cm4gZDsgfSlcblx0XHQuc3R5bGUoJ2ZvbnQtc2l6ZScsICcuNzVlbScpO1xuXHRcbiAgICAvLyBBZGQgYSByZWN0IGZvciBlYWNoIHllYXIgbGFiZWwgc28gd2UgY2FuIGhpZ2hsaWdodCBpdCBsYXRlclxuXHR2YXIgeWVhckxhYmVsID0gc2VsZi5zdmcuc2VsZWN0QWxsKCcueWVhclRpY2snKVxuXHRcdC5hcHBlbmQoJ3N2ZzpyZWN0Jylcblx0XHQuYXR0cignZmlsbCcsIHNlbGYuY29sb3JTY2hlbWVbNF0pXG5cdFx0LnN0eWxlKCdvcGFjaXR5JywgMClcblx0XHQuYXR0cignY2xhc3MnLCAnaGlnaGxpZ2h0UmVjdCcpXG5cdFx0LmVhY2goZnVuY3Rpb24oZCkge1xuXHRcdFx0dmFyIGJib3ggPSB0aGlzLnBhcmVudE5vZGUuZ2V0QkJveCgpO1xuXHRcdFx0dmFyIHBhZGRpbmcgPSBiYm94LndpZHRoLzQ7XG5cdFx0XHRkMy5zZWxlY3QodGhpcylcblx0XHRcdFx0LmF0dHIoJ3gnLCBiYm94LnggLSBwYWRkaW5nKVxuXHRcdFx0LmF0dHIoJ3knLCBiYm94LnkpXG5cdFx0XHQuYXR0cignd2lkdGgnLCBiYm94LndpZHRoICsgcGFkZGluZyoyKVxuXHRcdFx0LmF0dHIoJ2hlaWdodCcsIGJib3guaGVpZ2h0KTtcblx0XHR9KTtcblxuXHQvLyBEcmF3IHkgYXhpc1xuXHRzZWxmLnN2Zy5hcHBlbmQoJ2cnKVxuXHRcdC5hdHRyKCdjbGFzcycsICd5IGF4aXMnKVxuXHRcdC5jYWxsKHNlbGYueUF4aXMpXG5cdFx0LmFwcGVuZCgndGV4dCcpXG5cdFx0LmF0dHIoJ3RyYW5zZm9ybScsICdyb3RhdGUoLTkwKScpXG5cdFx0LmF0dHIoJ3knLCAtc2VsZi5saW5lQ2hhcnREaW1lbnNpb25zLm1hcmdpbi5sZWZ0LzIgLSA2KVxuXHRcdC5hdHRyKCd4JywgLShzZWxmLmxpbmVDaGFydERpbWVuc2lvbnMuaGVpZ2h0ICsgc2VsZi5saW5lQ2hhcnREaW1lbnNpb25zLm1hcmdpbi50b3AgKyBzZWxmLmxpbmVDaGFydERpbWVuc2lvbnMubWFyZ2luLmJvdHRvbSkvMilcblx0XHQuYXR0cignY2xhc3MnLCAnYXhpc0xhYmVsJylcblx0XHQudGV4dCgnTnVtIGNpdGF0aW9ucycpXG5cdFx0LmF0dHIoJ2ZvbnQtc2l6ZScsICcuNWVtJyk7XG5cblx0Ly8gdmFyIG1heFggPSBzZWxmLngoc2VsZi55ZWFyUmFuZ2VbMV0pO1xuXHQvLyBjb25zb2xlLmxvZyhzZWxmLnllYXJSYW5nZVswXSk7XG5cdC8vIHNlbGYubGluZWFyR3JhZGllbnQgPSBzZWxmLnN2Zy5hcHBlbmQoJ2xpbmVhckdyYWRpZW50Jylcblx0Ly8gICAgIC5hdHRyKCdpZCcsICdsaW5lLWdyYWRpZW50Jylcblx0Ly8gICAgIC5hdHRyKCdncmFkaWVudFVuaXRzJywgJ3VzZXJTcGFjZU9uVXNlJylcblx0Ly8gICAgIC5hdHRyKCd4MScsIDApLmF0dHIoJ3kxJywgc2VsZi54KHNlbGYueWVhclJhbmdlWzBdKSlcblx0Ly8gICAgIC5hdHRyKCd4MicsIG1heFgpXG5cdC8vICAgICAuYXR0cigneTInLCAwKVxuXHQvLyAgICAgLnNlbGVjdEFsbCgnc3RvcCcpXG5cdC8vICAgICAuZGF0YShbXG5cdC8vIFx0e29mZnNldDogc2VsZi54KHNlbGYueWVhclJhbmdlWzBdKS9tYXhYLCBjb2xvcjogZDMucmdiKHNlbGYuY29sb3JTY2hlbWVbN10pLmRhcmtlcigpfSxcblx0Ly8gXHR7b2Zmc2V0OiBzZWxmLngoMTk4NSkvbWF4WCwgY29sb3I6IGQzLnJnYihzZWxmLmNvbG9yU2NoZW1lWzddKS5kYXJrZXIoKX0sXG5cdC8vIFx0e29mZnNldDogc2VsZi54KDE5ODcpL21heFgsIGNvbG9yOiBzZWxmLmNvbG9yU2NoZW1lWzJdfSxcblx0Ly8gXHR7b2Zmc2V0OiBzZWxmLngoMTk4OSkvbWF4WCwgY29sb3I6IHNlbGYuY29sb3JTY2hlbWVbMl19LFxuXHQvLyBcdHtvZmZzZXQ6IHNlbGYueCgxOTkxKS9tYXhYLCBjb2xvcjogc2VsZi5jb2xvclNjaGVtZVswXX0sXG5cdC8vIFx0e29mZnNldDogMSwgY29sb3I6IHNlbGYuY29sb3JTY2hlbWVbMF19XG5cdC8vICAgICBdKVxuXHQvLyAgICAgLmVudGVyKCkuYXBwZW5kKCdzdG9wJylcblx0Ly8gICAgIC5hdHRyKCdvZmZzZXQnLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLm9mZnNldDsgfSlcblx0Ly8gICAgIC5hdHRyKCdzdG9wLWNvbG9yJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5jb2xvcjsgfSk7XG5cdC8vIGNvbnNvbGUubG9nKHNlbGYubGluZWFyR3JhZGllbnQpO1xuXHRzZWxmLmxpbmVhckdyYWRpZW50ID0gZDMuc2VsZWN0KCcjbGluZS1ncmFkaWVudCcpO1xuXHQvLyBpZiAoc2VsZi5saW5lYXJHcmFkaWVudC5lbXB0eSgpKSB7XG5cdC8vIFx0Ly8gc2VsZi5saW5lYXJHcmFkaWVudCA9IHNlbGYubWFrZUNvbG9yR3JhZGllbnQoMTk4OSk7XG5cdC8vIFx0c2VsZi5saW5lYXJHcmFkaWVudCA9IHNlbGYubWFrZUNvbG9yR3JhZGllbnQoc2VsZi5wZXdfQ2xhc3MpO1xuXHQvLyB9XG5cdC8vIHNlbGYubGluZWFyR3JhZGllbnQgPSBzZWxmLm1ha2VDb2xvckdyYWRpZW50KHNlbGYucGV3X0NsYXNzKTtcblxuXHRzZWxmLmNoYXJ0QXJlYSA9IHNlbGYuc3ZnLmFwcGVuZCgnZycpXG5cdFx0Ly8gLmF0dHIoJ2NsaXAtcGF0aCcsICd1cmwoI2NsaXApJylcblx0XHQuYXBwZW5kKCdwYXRoJylcblx0XHQuZGF0dW0oc2VsZi5kYXRhKVxuXHRcdC5hdHRyKCdjbGFzcycsICdhcmVhJylcblx0XHQvLyAuc3R5bGUoJ2ZpbGwnLCBzZWxmLmdyYXBoUGFyYW1zLmNvbG9yU2NoZW1lLnZhbHVlWzBdKVxuXHRcdC5zdHlsZSgnZmlsbCcsICd1cmwoI2xpbmUtZ3JhZGllbnQpJylcblx0XHQuYXR0cignZCcsIHNlbGYuYXJlYSk7XG5cblx0c2VsZi5jaGFydExpbmUgPSBzZWxmLnN2Zy5hcHBlbmQoJ2cnKVxuXHRcdC8vIC5hdHRyKCdjbGlwLXBhdGgnLCAndXJsKCNjbGlwKScpXG5cdFx0LmFwcGVuZCgncGF0aCcpXG5cdFx0LmRhdHVtKHNlbGYuZGF0YSlcblx0XHQuYXR0cignY2xhc3MnLCAnbGluZScpXG5cdFx0Ly8gLnN0eWxlKCdzdHJva2UnLCBzZWxmLmdyYXBoUGFyYW1zLmNvbG9yU2NoZW1lLnZhbHVlWzBdKVxuXHRcdC8vIC5zdHlsZSgnc3Ryb2tlJywgJ3VybCgjbGluZS1ncmFkaWVudCknKVxuXHRcdC5zdHlsZSgnc3Ryb2tlJywgJ2JsYWNrJylcblx0XHQuYXR0cignZCcsIHNlbGYubGluZSk7XG5cblx0c2VsZi5jdXJyWWVhckluZGljYXRvciA9IHNlbGYuc3ZnLmFwcGVuZCgnc3ZnOmxpbmUnKVxuXHRcdC8vIC5hdHRyKCdjbGFzcycsICd2ZXJ0aWNhbExpbmUgeWVhckluZGljYXRvcicpXG5cdFx0LmF0dHIoJ2NsYXNzJywgJ3ZlcnRpY2FsTGluZSB5ZWFySW5kaWNhdG9yIGhpZGRlbicpIC8vIHR1cm4gaXQgb2ZmIGZvciBub3cgKHRlc3Rpbmcgb3RoZXIgdGhpbmdzKVxuXHRcdC8vIEtlZXAgdHJhY2sgb2YgdHJhbnNpdGlvbiB0aW1pbmc6XG5cdFx0LmF0dHIoJ1QnLCAwKVxuXHRcdC5hdHRyKCd4MScsIHNlbGYueChzZWxmLmN1cnJZZWFyKSlcblx0XHQuYXR0cigneDInLCBzZWxmLngoc2VsZi5jdXJyWWVhcikpXG5cdFx0LmF0dHIoJ3kxJywgc2VsZi5saW5lQ2hhcnREaW1lbnNpb25zLmhlaWdodClcblx0XHQvLyAuYXR0cigneTInLCBzZWxmLmxpbmVDaGFydFlTY2FsZShjdXJyVmFsKSlcblx0XHQuYXR0cigneTInLCAwKVxuXHRcdC5hdHRyKCdzdHJva2Utd2lkdGgnLCAyKVxuXHRcdC5hdHRyKCdzdHJva2UnLCAnYmxhY2snKVxuXHRcdC5hdHRyKCdzdHJva2UtZGFzaGFycmF5JywgKCc1LCAyJykpXG5cdFx0LnN0eWxlKCdvcGFjaXR5JywgLjI1KTtcblxuXHQvLyBzZWxmLnN2Zy5zZWxlY3QoJy55ZWFyVGljaycpLnNlbGVjdCgnLmhpZ2hsaWdodFJlY3QnKVxuXHQvLyBcdC5hdHRyKCdjbGFzcycsICdjdXJyWWVhcicpXG5cdC8vIFx0LnRyYW5zaXRpb24oKVxuXHQvLyBcdC5kdXJhdGlvbig1MDApXG5cdC8vIFx0LnN0eWxlKCdvcGFjaXR5JywgLjEpO1xuXG5cdHNlbGYueWVhckFyZWEgPSBzZWxmLnN2Zy5zZWxlY3RBbGwoJy55ZWFyQXJlYScpXG5cdFx0LmRhdGEoc2VsZi5kYXRhKVxuXHRcdC5lbnRlcigpLmFwcGVuZCgnc3ZnOnJlY3QnKVxuXHRcdC5hdHRyKCdjbGFzcycsICd5ZWFyQXJlYSBoaWRkZW4nKVxuXHRcdC5hdHRyKCdkYXRhLXllYXInLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLnllYXI7IH0pXG5cdFx0LmF0dHIoJ3gnLCBmdW5jdGlvbihkKSB7IHJldHVybiBzZWxmLngoZC55ZWFyKTsgfSlcblx0XHQuYXR0cigneScsIDApXG5cdFx0LmF0dHIoJ3dpZHRoJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gc2VsZi54KGQueWVhcisxKS1zZWxmLngoZC55ZWFyKTsgfSlcblx0XHQuYXR0cignaGVpZ2h0Jywgc2VsZi5saW5lQ2hhcnREaW1lbnNpb25zLmhlaWdodClcblx0XHQuYXR0cignZmlsbCcsIHNlbGYuY29sb3JTY2hlbWVbNF0pXG5cdFx0LnN0eWxlKCdvcGFjaXR5JywgMCk7XG5cblxuXHRpZiAodHlwZW9mIHNlbGYucGV3X0NsYXNzICE9ICd1bmRlZmluZWQnKSB7XG5cdFx0c2VsZi5tYWtlRnVuZGluZ0xpbmVzKHNlbGYucGV3X0NsYXNzKTtcblx0fVxuXG59O1xuXG5saW5lQ2hhcnRCeVllYXIucHJvdG90eXBlLmltcG9ydERlZmF1bHRPcHRpb25zID0gZnVuY3Rpb24ob3B0aW9ucykge1xuXHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0c2VsZi5jb2xvclNjaGVtZSA9IG9wdGlvbnMuY29sb3JTY2hlbWU7XG5cblx0c2VsZi5saW5lQ2hhcnREaW1lbnNpb25zID0gb3B0aW9ucy5kaW1lbnNpb25zLmxpbmVDaGFydDtcblxuXHRzZWxmLnRyYW5zaXRpb25UaW1lUGVyWWVhciA9IG9wdGlvbnMudHJhbnNpdGlvblRpbWVQZXJZZWFyO1xuXG59O1xuXG5saW5lQ2hhcnRCeVllYXIucHJvdG90eXBlLm1ha2VDb2xvckdyYWRpZW50ID0gZnVuY3Rpb24oZnVuZGluZ1llYXIpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXHRjb25zb2xlLmxvZyhmdW5kaW5nWWVhcik7XG5cblx0Ly8gVGhpcyBtZXRob2Qgc2hvdWxkIGJlIGNhbGxlZCBieSB0aGUgbWFpbiBhcHAgKGUuZy4gTWFpbi5qcylcblx0Ly8gSXQgbWFrZXMgYSBsaW5lYXIgZ3JhZGllbnQgZm9yIHRoZSBsaW5lIGNoYXJ0cyBiYXNlZCBvbiBmdW5kaW5nIHBlcmlvZFxuXHQvLyBmdW5kaW5nWWVhciBpcyB0aGUgUGV3IFNjaG9sYXIncyBjbGFzcyB5ZWFyXG5cdC8vIFRoZSBQZXcgZnVuZGluZyBsYXN0cyBmb3IgZml2ZSB5ZWFyc1xuXHQvLyBNYXliZSB0aGlzIG1ldGhvZCBzaG91bGQgYmUgbW9kaWZpZWQgYXQgc29tZSBwb2ludCB0byBiZSBhYmxlIHRvIGhhdmUgZGlmZmVyZW50IGxlbmd0aHMgb2YgZnVuZGluZ1xuXHRcblx0Ly8gVEhJUyBESUROJ1QgV09SSyBiZWNhdXNlIHRoZSB3aWR0aCBkZXBlbmRzIG9uIHNlbGYuaW5pdCwgYnV0IHRoaXMgbmVlZHMgdG8gYmUgY2FsbGVkIGJlZm9yZSBzZWxmLmluaXRcblx0Ly9cblx0Ly8gaW5zdGVhZCBjYWxsIGl0IGluIHNlbGYuaW5pdCgpXG5cdFxuXG5cdHZhciBtYXhYID0gc2VsZi54KHNlbGYueWVhclJhbmdlWzFdKTtcblx0dmFyIGxpbmVhckdyYWRpZW50ID0gc2VsZi5zdmcuYXBwZW5kKCdsaW5lYXJHcmFkaWVudCcpXG5cdCAgICAuYXR0cignaWQnLCAnbGluZS1ncmFkaWVudCcpXG5cdCAgICAuYXR0cignZ3JhZGllbnRVbml0cycsICd1c2VyU3BhY2VPblVzZScpXG5cdCAgICAuYXR0cigneDEnLCAwKS5hdHRyKCd5MScsIHNlbGYueChzZWxmLnllYXJSYW5nZVswXSkpXG5cdCAgICAuYXR0cigneDInLCBtYXhYKVxuXHQgICAgLmF0dHIoJ3kyJywgMClcblx0ICAgIC5zZWxlY3RBbGwoJ3N0b3AnKVxuXHQgICAgLmRhdGEoW1xuXHRcdHtvZmZzZXQ6IHNlbGYueChzZWxmLnllYXJSYW5nZVswXSkvbWF4WCwgY29sb3I6IGQzLnJnYihzZWxmLmNvbG9yU2NoZW1lWzddKS5kYXJrZXIoKX0sXG5cdFx0e29mZnNldDogc2VsZi54KGZ1bmRpbmdZZWFyLTEpL21heFgsIGNvbG9yOiBkMy5yZ2Ioc2VsZi5jb2xvclNjaGVtZVs3XSkuZGFya2VyKCl9LFxuXHRcdHtvZmZzZXQ6IHNlbGYueChmdW5kaW5nWWVhcisxKS9tYXhYLCBjb2xvcjogc2VsZi5jb2xvclNjaGVtZVsyXX0sXG5cdFx0e29mZnNldDogc2VsZi54KGZ1bmRpbmdZZWFyICsgKHNlbGYuZnVuZGluZ1RpbWUpLTEpL21heFgsIGNvbG9yOiBzZWxmLmNvbG9yU2NoZW1lWzJdfSxcblx0XHR7b2Zmc2V0OiBzZWxmLngoZnVuZGluZ1llYXIgKyAoc2VsZi5mdW5kaW5nVGltZSkrMSkvbWF4WCwgY29sb3I6IHNlbGYuY29sb3JTY2hlbWVbMF19LFxuXHRcdHtvZmZzZXQ6IDEsIGNvbG9yOiBzZWxmLmNvbG9yU2NoZW1lWzBdfVxuXHQgICAgXSlcblx0ICAgIC5lbnRlcigpLmFwcGVuZCgnc3RvcCcpXG5cdCAgICAuYXR0cignb2Zmc2V0JywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5vZmZzZXQ7IH0pXG5cdCAgICAuYXR0cignc3RvcC1jb2xvcicsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuY29sb3I7IH0pO1xuXG5cdHJldHVybiBsaW5lYXJHcmFkaWVudDtcblxufTtcblxubGluZUNoYXJ0QnlZZWFyLnByb3RvdHlwZS5tYWtlRnVuZGluZ0xpbmVzID0gZnVuY3Rpb24oZnVuZGluZ1llYXIpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdC8vIE1ha2UgdGhlIHZlcnRpY2FsIGxpbmVzIHRoYXQgc2hvdyBmdW5kaW5nIHBlcmlvZFxuXG5cblx0c2VsZi5zdmcuYXBwZW5kKCdzdmc6bGluZScpXG5cdFx0LmF0dHIoJ2NsYXNzJywgJ3ZlcnRpY2FsTGluZVN0YXRpYyB2ZXJ0aWNhbExpbmVGdW5kaW5nQmVnaW4nKVxuXHRcdC5hdHRyKCd4MScsIHNlbGYueChmdW5kaW5nWWVhcikpXG5cdFx0LmF0dHIoJ3gyJywgc2VsZi54KGZ1bmRpbmdZZWFyKSlcblx0XHQuYXR0cigneTEnLCBzZWxmLmxpbmVDaGFydERpbWVuc2lvbnMuaGVpZ2h0KVxuXHRcdC5hdHRyKCd5MicsIDApXG5cdFx0LmF0dHIoJ3N0cm9rZS13aWR0aCcsIDIpXG5cdFx0LmF0dHIoJ3N0cm9rZScsIHNlbGYuY29sb3JTY2hlbWVbMl0pXG5cdFx0LnN0eWxlKCdzdHJva2UtZGFzaGFycmF5JywgKCc1LCAyJykpXG5cdFx0LnN0eWxlKCdvcGFjaXR5JywgLjgpO1xuXHRzZWxmLnN2Zy5hcHBlbmQoJ3N2ZzpsaW5lJylcblx0XHQuYXR0cignY2xhc3MnLCAndmVydGljYWxMaW5lU3RhdGljIHZlcnRpY2FsTGluZUZ1bmRpbmdFbmQnKVxuXHRcdC5hdHRyKCd4MScsIHNlbGYueChmdW5kaW5nWWVhciArIHNlbGYuZnVuZGluZ1RpbWUpKVxuXHRcdC5hdHRyKCd4MicsIHNlbGYueChmdW5kaW5nWWVhciArIHNlbGYuZnVuZGluZ1RpbWUpKVxuXHRcdC5hdHRyKCd5MScsIHNlbGYubGluZUNoYXJ0RGltZW5zaW9ucy5oZWlnaHQpXG5cdFx0LmF0dHIoJ3kyJywgMClcblx0XHQuYXR0cignc3Ryb2tlLXdpZHRoJywgMilcblx0XHQuYXR0cignc3Ryb2tlJywgc2VsZi5jb2xvclNjaGVtZVswXSlcblx0XHQuc3R5bGUoJ3N0cm9rZS1kYXNoYXJyYXknLCAoJzUsIDInKSlcblx0XHQuc3R5bGUoJ29wYWNpdHknLCAuOCk7XG59O1xuXG5saW5lQ2hhcnRCeVllYXIucHJvdG90eXBlLmNoYW5nZUFuaW1hdGlvblN0YXRlID0gZnVuY3Rpb24oYW5pbWF0aW9uU3RhdGUpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdHNlbGYuYW5pbWF0aW9uU3RhdGUgPSBhbmltYXRpb25TdGF0ZTtcblx0Y29uc29sZS5sb2coc2VsZi5hbmltYXRpb25TdGF0ZSk7XG5cdGZ1bmN0aW9uIGFkdmFuY2VMaW5lKCkge1xuXHRcdHZhciB0aW1lRWxhcHNlZCA9IHNlbGYuY3VyclllYXJJbmRpY2F0b3IuYXR0cignVCcpO1xuXHRcdHNlbGYuY3VyclllYXJJbmRpY2F0b3Jcblx0XHRcdC5hdHRyKCdkYXRhLXN0YXRlJywgJ2ZvcndhcmQnKVxuXHRcdFx0Ly8gLmF0dHIoJ1QnLCAwKVxuXHRcdFx0LmNsYXNzZWQoJ2hpZGRlbicsIGZhbHNlKVxuXHRcdFx0LnRyYW5zaXRpb24oKVxuXHRcdFx0Ly8gLmR1cmF0aW9uKHNlbGYudHJhbnNpdGlvblRpbWVQZXJZZWFyW3NlbGYuY3VyclllYXJdIC0gdGltZUVsYXBzZWQpXG5cdFx0XHQuZHVyYXRpb24oc2VsZi50cmFuc2l0aW9uVGltZVBlclllYXJbc2VsZi5jdXJyWWVhcl0pXG5cdFx0XHQuZWFzZSgnbGluZWFyJylcblx0XHRcdC5hdHRyKCd4MScsIHNlbGYueChzZWxmLmN1cnJZZWFyKSlcblx0XHRcdC5hdHRyKCd4MicsIHNlbGYueChzZWxmLmN1cnJZZWFyKSlcblx0XHRcdC8vIC5hdHRyKCd5MicsIHNlbGYubGluZUNoYXJ0WVNjYWxlKGN1cnJWYWwpKVxuXHRcdFx0LmF0dHIoJ2RhdGEtc3RhdGUnLCAnc3RvcHBlZCcpXG5cdFx0XHQuYXR0cignVCcsIDEpXG5cdFx0XHQuZWFjaCgnZW5kJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGQzLnNlbGVjdCh0aGlzKS5hdHRyKCdUJywgMCk7XG5cdFx0XHRcdHNlbGYuY3VyclllYXIrKztcblx0XHRcdFx0Ly8gYWR2YW5jZUxpbmUoKVxuXHRcdFx0fSk7XG5cdFx0Ly8gLy8gVXBkYXRlIHRoZSBjbGlwIHBhdGggdG8gc2hvdyB0aGUgcGFydCBvZiB0aGUgbGluZSB3ZSB3YW50ICh3aXRoIHRyYW5zaXRpb24pXG5cdFx0Ly8gc2VsZi5saW5lQ2hhcnRDbGlwUGF0aFxuXHRcdC8vIFx0LmF0dHIoJ2RhdGEtc3RhdGUnLCAnZm9yd2FyZCcpXG5cdFx0Ly8gXHQvLyAuYXR0cignVCcsIDApXG5cdFx0Ly8gXHQudHJhbnNpdGlvbigpXG5cdFx0Ly8gXHQuZHVyYXRpb24oc2VsZi5ncmFwaFBhcmFtcy50cmFuc2l0aW9uVGltZVBlclllYXIudmFsdWUgLSB0aW1lRWxhcHNlZClcblx0XHQvLyBcdC5lYXNlKCdsaW5lYXInKVxuXHRcdC8vIFx0LmF0dHIoJ3dpZHRoJywgc2VsZi5saW5lQ2hhcnRYU2NhbGUoY3VyclllYXJEYXRlRm9ybWF0KSlcblx0XHQvLyBcdC5hdHRyKCdkYXRhLXN0YXRlJywgJ3N0b3BwZWQnKVxuXHRcdC8vIFx0LmF0dHIoJ1QnLCAxKVxuXHRcdC8vIFx0LmVhY2goJ2VuZCcsIGZ1bmN0aW9uKCkgeyBkMy5zZWxlY3QodGhpcykuYXR0cignVCcsIDApOyB9KTtcblx0fVxuXHRpZiAoc2VsZi5hbmltYXRpb25TdGF0ZSA9PT0gJ2ZvcndhcmQnKSB7XG5cdFx0YWR2YW5jZUxpbmUoKTtcblx0fVxufTtcblxubGluZUNoYXJ0QnlZZWFyLnByb3RvdHlwZS5jb3JyZWN0WWVhciA9IGZ1bmN0aW9uKGN1cnJZZWFyKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblx0aWYgKGN1cnJZZWFyICE9IHNlbGYuY3VyclllYXIpIHtcblx0XHRzZWxmLmN1cnJZZWFyID0gY3VyclllYXI7XG5cdFx0c2VsZi5jdXJyWWVhckluZGljYXRvclxuXHRcdFx0LmF0dHIoJ3gxJywgc2VsZi54KHNlbGYuY3VyclllYXIpKVxuXHRcdFx0LmF0dHIoJ3gyJywgc2VsZi54KHNlbGYuY3VyclllYXIpKTtcblx0XHRzZWxmLmNoYW5nZUFuaW1hdGlvblN0YXRlKCk7XG5cdH1cbn07XG5cbmxpbmVDaGFydEJ5WWVhci5wcm90b3R5cGUubW92ZVllYXJJbmRpY2F0b3IgPSBmdW5jdGlvbihjdXJyWWVhcikge1xuXHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0c2VsZi5jdXJyWWVhciA9IGN1cnJZZWFyO1xuXHRzZWxmLmN1cnJZZWFySW5kaWNhdG9yXG5cdFx0LmF0dHIoJ1QnLCAwKVxuXHRcdC50cmFuc2l0aW9uKClcblx0XHQuZHVyYXRpb24oc2VsZi50cmFuc2l0aW9uVGltZVBlclllYXJbc2VsZi5jdXJyWWVhcl0pXG5cdFx0LmVhc2UoJ2xpbmVhcicpXG5cdFx0LmF0dHIoJ3gxJywgc2VsZi54KHNlbGYuY3VyclllYXIpKVxuXHRcdC5hdHRyKCd4MicsIHNlbGYueChzZWxmLmN1cnJZZWFyKSlcblx0XHQvLyAuYXR0cigneTInLCBzZWxmLmxpbmVDaGFydFlTY2FsZShjdXJyVmFsKSlcblx0XHQvLyAuYXR0cignZGF0YS1zdGF0ZScsICdzdG9wcGVkJylcblx0XHQuYXR0cignVCcsIDEpXG5cdFx0LmVhY2goJ2VuZCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0ZDMuc2VsZWN0KHRoaXMpLmF0dHIoJ1QnLCAwKTtcblx0XHR9KTtcblx0ZnVuY3Rpb24gaGlnaGxpZ2h0Q3VyclllYXJUaWNrKCkge1xuXHRcdHNlbGYuc3ZnLnNlbGVjdEFsbCgnLnllYXJUaWNrJykuc2VsZWN0QWxsKCcuaGlnaGxpZ2h0UmVjdCcpXG5cdFx0XHQuZmlsdGVyKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQgPT0gc2VsZi5jdXJyWWVhcjsgfSlcblx0XHRcdC5hdHRyKCdjbGFzcycsICdjdXJyWWVhcicpXG5cdFx0XHQudHJhbnNpdGlvbigpXG5cdFx0XHQuZHVyYXRpb24oc2VsZi50cmFuc2l0aW9uVGltZVBlclllYXJbc2VsZi5jdXJyWWVhcl0vNClcblx0XHRcdC5zdHlsZSgnb3BhY2l0eScsIC4xKTtcblx0fVxuXHRzZWxmLnN2Zy5zZWxlY3RBbGwoJy55ZWFyVGljaycpLnNlbGVjdEFsbCgnLmN1cnJZZWFyJylcblx0XHQuY2xhc3NlZCgnLmN1cnJZZWFyJywgZmFsc2UpXG5cdFx0LnRyYW5zaXRpb24oKVxuXHRcdC5kdXJhdGlvbihzZWxmLnRyYW5zaXRpb25UaW1lUGVyWWVhcltzZWxmLmN1cnJZZWFyXS80KVxuXHRcdC5zdHlsZSgnb3BhY2l0eScsIDApO1xuXHQvLyBoaWdobGlnaHRDdXJyWWVhclRpY2soKTtcblxuXHRzZWxmLnN2Zy5zZWxlY3RBbGwoJy55ZWFyQXJlYS5jdXJyWWVhcicpXG5cdFx0LmNsYXNzZWQoJ2N1cnJZZWFyJywgZmFsc2UpXG5cdFx0LnRyYW5zaXRpb24oKVxuXHRcdC5kdXJhdGlvbihzZWxmLnRyYW5zaXRpb25UaW1lUGVyWWVhcltzZWxmLmN1cnJZZWFyXS80KVxuXHRcdC8vIC5zdHlsZSgnb3BhY2l0eScsIHNlbGYueWVhckFyZWFPcGFjaXR5LzIpO1xuXHRcdC5zdHlsZSgnb3BhY2l0eScsIGZ1bmN0aW9uKGQpIHtcblx0XHRcdGlmIChkLnllYXIgPCBzZWxmLmN1cnJZZWFyKSB7XG5cdFx0XHRcdHJldHVybiBzZWxmLnllYXJBcmVhT3BhY2l0eS8yO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdHNlbGYueWVhckFyZWEuZmlsdGVyKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQueWVhciA9PSBzZWxmLmN1cnJZZWFyOyB9KVxuXHRcdC5jbGFzc2VkKCdjdXJyWWVhcicsIHRydWUpXG5cdFx0LmNsYXNzZWQoJ2hpZGRlbicsIGZhbHNlKVxuXHRcdC5zdHlsZSgnb3BhY2l0eScsIHNlbGYueWVhckFyZWFPcGFjaXR5KjIpXG5cdFx0LnRyYW5zaXRpb24oKVxuXHRcdC5kdXJhdGlvbihzZWxmLnRyYW5zaXRpb25UaW1lUGVyWWVhcltzZWxmLmN1cnJZZWFyXS8yKVxuXHRcdC5zdHlsZSgnb3BhY2l0eScsIHNlbGYueWVhckFyZWFPcGFjaXR5KTtcblxuXHQvLyBtYWtlIHN1cmUgdGhhdCBldmVyeXRoaW5nIGlzIGluIG9yZGVyLi4uIGkuZS4gdGhhdCB5ZWFycyBiZWZvcmUgY3VyclllYXIgYXJlIGhpZ2hsaWdodGVkXG5cdC8vIGFuZCB5ZWFycyBhZnRlciBjdXJyWWVhciBhcmUgbm90XG5cdHNlbGYueWVhckFyZWEuZmlsdGVyKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQueWVhciA8IHNlbGYuY3VyclllYXI7IH0pXG5cdFx0LmNsYXNzZWQoJ2hpZGRlbicsIGZhbHNlKVxuXHRcdC5zdHlsZSgnb3BhY2l0eScsIHNlbGYueWVhckFyZWFPcGFjaXR5LzIpO1xuXHRzZWxmLnllYXJBcmVhLmZpbHRlcihmdW5jdGlvbihkKSB7IHJldHVybiBkLnllYXIgPiBzZWxmLmN1cnJZZWFyOyB9KVxuXHRcdC5zdHlsZSgnb3BhY2l0eScsIDApO1xuXHRjb25zb2xlLmxvZyhzZWxmLmN1cnJZZWFyKTtcblxufTtcblxubGluZUNoYXJ0QnlZZWFyLnByb3RvdHlwZS5hZGRUaXRsZSA9IGZ1bmN0aW9uKHRpdGxlKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblxuXHRzZWxmLnRpdGxlID0gc2VsZi5zdmcuYXBwZW5kKCd0ZXh0Jylcblx0ICAgIC5hdHRyKCdjbGFzcycsICdsaW5lQ2hhcnRUaXRsZScpXG5cdCAgICAuYXR0cigneCcsIHNlbGYubGluZUNoYXJ0RGltZW5zaW9ucy53aWR0aC8yKVxuXHQgICAgLmF0dHIoJ3knLCAwIC0gKHNlbGYubGluZUNoYXJ0RGltZW5zaW9ucy5tYXJnaW4udG9wIC8gMikgKVxuXHQgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG5cdCAgICAudGV4dCh0aXRsZSk7XG5cbn07XG52YXIgY2l0YXRpb25WaXMgPSBjaXRhdGlvblZpcyB8fCB7fTtcblxuY2l0YXRpb25WaXMuc3VtbWFyeVN0YXRpc3RpY3MgPSAoZnVuY3Rpb24oKSB7XG5cblx0ZnVuY3Rpb24gYWRkU3VtbWFyeVN0YXRpc3RpY3MoZ3JhcGgpIHtcblxuXHRcdGZ1bmN0aW9uIGNsZWFuTGlua3MobGlua3MpIHtcblx0XHRcdHZhciBjbGVhbmVkTGlua3MgPSBbXTtcblx0XHRcdGxpbmtzLmZvckVhY2goZnVuY3Rpb24oZCkge1xuXHRcdFx0XHRpZiAoICh0eXBlb2YgZC5saW5rVG9FZ28gIT0gJ3VuZGVmaW5lZCcpICYmIChkLmxpbmtUb0VnbyA9PT0gdHJ1ZSkgKSB7XG5cdFx0XHRcdFx0dmFyIHNvdXJjZVllYXIgPSArZC5zb3VyY2VZZWFyO1xuXHRcdFx0XHRcdHZhciB0YXJnZXRZZWFyID0gK2QudGFyZ2V0WWVhcjtcblx0XHRcdFx0XHRpZiAoIChzb3VyY2VZZWFyID4gMCkgJiYgKHRhcmdldFllYXIgPiAwKSAmJiAoc291cmNlWWVhciA+PSB0YXJnZXRZZWFyKSApIHtcblx0XHRcdFx0XHRcdGNsZWFuZWRMaW5rcy5wdXNoKGQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gY2xlYW5lZExpbmtzO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGdldFllYXJSYW5nZShsaW5rcykge1xuXHRcdFx0Ly8gQSBsb3Qgb2YgdGhpcyBjb2RlIHdhcyBjb3BpZWQgZnJvbSBsaW5lQ2hhcnREYXRhXG5cdFx0XHQvLyBNYXkgbmVlZCB0byBjbGVhbiB0aGlzIHVwIChUT0RPKVxuXG5cdFx0XHQvLyBNYWtlIHN1cmUgYWxsIG91ciBkYXRhIGZhbGwgd2l0aGluIHRoZSBhcHByb3ByaWF0ZSB0aW1lIHNwYW4uXG5cdFx0XHQvLyBUaGUgbWluaW11bSB5ZWFyIGlzIHRoZSBlYXJsaWVzdCBwdWJsaWNhdGlvbiBieSB0aGUgZWdvIGF1dGhvciAodGhlcmUgd2lsbCBsaWtlbHkgYmUgbm8gY2l0YXRpb25zIHdpdGhpbiB0aGlzIHllYXIsIGJ1dCB0aGlzIGNoYXJ0IG5lZWRzIHRvIGxpbmUgdXAgd2l0aCB0aGUgb3RoZXIgY2hhcnRzKS5cblx0XHRcdC8vIFRoZSBtYXhpbXVtIHllYXIgaXMgdGhlIGxhc3QgeWVhciB0aGF0IGEgcGFwZXIgY2l0ZWQgb25lIG9mIHRoZSBlZ28gYXV0aG9yJ3MgcGFwZXIgKGNoZWNraW5nIHRvIG1ha2Ugc3VyZSBpdCBpcyBub3QgaW4gdGhlIGZ1dHVyZSwgd2hpY2ggd291bGQgbWVhbiBiYWQgZGF0YSkuXG5cdFx0XHR2YXIgY2xlYW5lZExpbmtzID0gY2xlYW5MaW5rcyhsaW5rcyk7XG5cdFx0XHR2YXIgbWluWWVhciA9IGQzLm1pbihjbGVhbmVkTGlua3MsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQudGFyZ2V0WWVhcj4wID8gZC50YXJnZXRZZWFyIDogbnVsbDsgfSk7XG5cdFx0XHQvLyBHZXQgY3VycmVudCB5ZWFyICh1c2luZyB0b2RheSdzIGRhdGUpOlxuXHRcdFx0dmFyIHRvZGF5WWVhciA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcblx0XHRcdHZhciBtYXhZZWFyID0gZDMubWF4KGNsZWFuZWRMaW5rcywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5zb3VyY2VZZWFyPD10b2RheVllYXIgPyBkLnNvdXJjZVllYXIgOiBudWxsOyB9KTtcblx0XHRcdHJldHVybiBbbWluWWVhciwgbWF4WWVhcl07XG5cdFx0fVxuXG5cblx0XHRmdW5jdGlvbiBnZXRFbXB0eUNvdW50RGF0YSh5ZWFyUmFuZ2UpIHtcblx0XHRcdHZhciBlbXB0eUNvdW50RGF0YSA9IFtdO1xuXHRcdFx0Zm9yICh2YXIgaT15ZWFyUmFuZ2VbMF07IGk8PXllYXJSYW5nZVsxXTsgaSsrKSB7XG5cdFx0XHRcdGVtcHR5Q291bnREYXRhLnB1c2goe3llYXI6IGksIGNvdW50OiAwfSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZW1wdHlDb3VudERhdGE7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gZ2V0Q2l0YXRpb25Db3VudHNQZXJZZWFyKGdyYXBoKSB7XG5cdFx0XHR2YXIgY2l0YXRpb25Db3VudHNQZXJZZWFyID0gZ2V0RW1wdHlDb3VudERhdGEoZ3JhcGguZ3JhcGgueWVhclJhbmdlKTtcblx0XHRcdHZhciBjbGVhbmVkTGlua3MgPSBjbGVhbkxpbmtzKGdyYXBoLmxpbmtzKTtcblx0XHRcdGNsZWFuZWRMaW5rcy5mb3JFYWNoKGZ1bmN0aW9uKGQsIGkpIHtcblx0XHRcdFx0dmFyIHRoaXNTb3VyY2VZZWFyID0gZC5zb3VyY2VZZWFyO1xuXHRcdFx0XHR2YXIgZGF0YVRoaXNZZWFyID0gY2l0YXRpb25Db3VudHNQZXJZZWFyLmZpbHRlcihmdW5jdGlvbihkZCkgeyByZXR1cm4gZGQueWVhcj09PXRoaXNTb3VyY2VZZWFyOyB9KVswXTtcblx0XHRcdFx0ZGF0YVRoaXNZZWFyLmNvdW50Kys7XG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuIGNpdGF0aW9uQ291bnRzUGVyWWVhcjtcblx0XHR9XG5cblx0XHRncmFwaC5ncmFwaC55ZWFyUmFuZ2UgPSBnZXRZZWFyUmFuZ2UoZ3JhcGgubGlua3MpO1xuXHRcdGdyYXBoLmdyYXBoLmNpdGF0aW9uQ291bnRzUGVyWWVhciA9IGdldENpdGF0aW9uQ291bnRzUGVyWWVhcihncmFwaCk7XG5cdFx0cmV0dXJuIGdyYXBoO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRhZGRTdW1tYXJ5U3RhdGlzdGljczogYWRkU3VtbWFyeVN0YXRpc3RpY3Ncblx0fTtcbn0oKSk7XG5cblxuXG4vLyBodHRwczovL2Nzcy10cmlja3MuY29tL3NuaXBwZXRzL2phdmFzY3JpcHQvZ2V0LXVybC12YXJpYWJsZXMvXG5mdW5jdGlvbiBnZXRRdWVyeVZhcmlhYmxlKHZhcmlhYmxlKVxue1xuICAgIHZhciBxdWVyeSA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyaW5nKDEpO1xuICAgIHZhciB2YXJzID0gcXVlcnkuc3BsaXQoXCImXCIpO1xuICAgIGZvciAodmFyIGk9MDsgaTx2YXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBwYWlyID0gdmFyc1tpXS5zcGxpdChcIj1cIik7XG4gICAgICAgIGlmKHBhaXJbMF0gPT0gdmFyaWFibGUpIHtyZXR1cm4gcGFpclsxXTt9XG4gICAgfVxuICAgIHJldHVybihmYWxzZSk7XG59XG5cblxuXG52YXIgY2l0YXRpb25WaXMgPSBjaXRhdGlvblZpcyB8fCB7fTtcblxuY2l0YXRpb25WaXMuZ2V0VHJhbnNpdGlvblRpbWVQZXJZZWFyPSBmdW5jdGlvbihncmFwaCwgbG9uZ2VzdFllYXJUcmFuc2l0aW9uVGltZSkge1xuXHRjb25zb2xlLmxvZyhncmFwaCk7XG5cdC8vIFRoaXMgd2lsbCBsZXQgdXMgdmFyeSB0aGUgdHJhbnNpdGlvbiB0aW1lIHBlciB5ZWFyXG5cdHZhciB0cmFuc2l0aW9uVGltZVBlclllYXIgPSB7fTtcblx0dmFyIGVtcHR5WWVhclRyYW5zaXRpb25UaW1lID0gMzAwO1xuXHQvLyB2YXIgbG9uZ2VzdFllYXJUcmFuc2l0aW9uVGltZSA9IDQwMDA7XG5cdC8vIFNldCBkZWZhdWx0IHZhbHVlOlxuXHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzg5NDg2MC9zZXQtYS1kZWZhdWx0LXBhcmFtZXRlci12YWx1ZS1mb3ItYS1qYXZhc2NyaXB0LWZ1bmN0aW9uXG5cdHZhciBsb25nZXN0WWVhclRyYW5zaXRpb25UaW1lID0gdHlwZW9mIGxvbmdlc3RZZWFyVHJhbnNpdGlvblRpbWUgIT09ICd1bmRlZmluZWQnID8gbG9uZ2VzdFllYXJUcmFuc2l0aW9uVGltZSA6IDQwMDA7XG5cdC8vIFRoaXMgc2NhbGUgdGFrZXMgdGhlIG51bWJlciBvZiBub2RlcyBmb3IgYSBnaXZlbiB5ZWFyIGFzIGlucHV0XG5cdC8vIGFuZCBvdXRwdXRzIHRoZSB0cmFuc2l0aW9uIHRpbWUsIGJhc2VkIG9uIGEgdGhyZXNob2xkIG1hcHBpbmdcblx0dmFyIHRocmVzaG9sZFNjYWxlID0gZDMuc2NhbGUudGhyZXNob2xkKClcblx0XHQuZG9tYWluKFsxLCAzLCAxMCwgMjAsIDMwXSlcblx0XHQucmFuZ2UoW1xuXHRcdFx0XHRlbXB0eVllYXJUcmFuc2l0aW9uVGltZSwgIC8vIHplcm8gbm9kZXNcblx0XHRcdFx0bG9uZ2VzdFllYXJUcmFuc2l0aW9uVGltZSAqIC4yLCAgLy8gb25lIG9yIHR3byBub2Rlc1xuXHRcdFx0XHRsb25nZXN0WWVhclRyYW5zaXRpb25UaW1lICogLjUsIC8vIDMgdG8gOVxuXHRcdFx0XHRsb25nZXN0WWVhclRyYW5zaXRpb25UaW1lICogLjcsICAvLyAxMCB0byAxOVxuXHRcdFx0XHRsb25nZXN0WWVhclRyYW5zaXRpb25UaW1lICogLjg1LCAgLy8gMjAgdG8gMjlcblx0XHRcdFx0bG9uZ2VzdFllYXJUcmFuc2l0aW9uVGltZSAgLy8gMzArXG5cdFx0XHRcdF0pO1xuXHR2YXIgeWVhclJhbmdlID0gZ3JhcGguZ3JhcGgueWVhclJhbmdlO1xuXHRcblx0Ly8gUHV0IHRoZSB0cmFuc2l0aW9uIHRpbWUgZm9yIGVhY2ggeWVhciBpbnRvIGFuIG9iamVjdFxuXHRmb3IgKHZhciBpPXllYXJSYW5nZVswXTsgaTw9eWVhclJhbmdlWzFdOyBpKyspIHtcblx0XHQvLyB0cmFuc2l0aW9uVGltZVBlclllYXJbaV0gPSAxMDAwO1xuXHRcdHRyYW5zaXRpb25UaW1lUGVyWWVhcltpXSA9IHRocmVzaG9sZFNjYWxlKGdyYXBoLmdyYXBoLm5vZGVDb3VudHNQZXJZZWFyW2ldKTtcblx0fVxuXHRyZXR1cm4gdHJhbnNpdGlvblRpbWVQZXJZZWFyO1xufTtcblxuY2l0YXRpb25WaXMueWVhclRpY2tDbGlja0V2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbigpIHtcbiAgICAvLyBBZGQgY2xpY2sgbGlzdGVuZXJzIHRvIGxpbmUgY2hhcnQgYXhpcyB0aWNrIGxhYmVscyAoeWVhcnMpLlxuICAgIC8vIE9uIGNsaWNrLCBhIG5ldyBkZXN0aW5hdGlvbiBub2RlIHdpbGwgYmUgc2V0LlxuICAgIGQzLnNlbGVjdEFsbCgnLnllYXJUaWNrJylcbiAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIC8vIEdldCB0aGUgeWVhciAoYXMgaW50ZWdlcilcbiAgICAgICAgICAgIHZhciBkZXN0aW5hdGlvblllYXIgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS15ZWFyJyk7XG4gICAgICAgICAgICAvLyBTdG9wIGFsbCB0cmFuc2l0aW9ucyBvbiBub2RlcyBhbmQgbGlua3NcbiAgICAgICAgICAgIGQzLnNlbGVjdEFsbCgnLm5vZGUsIC5saW5rJykudHJhbnNpdGlvbigpLmR1cmF0aW9uKDApO1xuXG5cdFx0XHRjaXRhdGlvblZpcy5lZ29HcmFwaFZpcy5uZXdEZXN0aW5hdGlvbk5vZGUoZGVzdGluYXRpb25ZZWFyKTtcbiAgICAgICAgfSk7XG59O1xuXG5mdW5jdGlvbiBtYWluKCkge1xuXG5cbmQzLnNlbGVjdCgnI21haW5EaXYnKS5hcHBlbmQoJ3AnKVxuXHQuYXR0cihcImNsYXNzXCIsIFwibG9hZGluZ1RleHRcIilcblx0LnRleHQoJ0xvYWRpbmcuLi4nKTtcblxuZDMuanNvbignbmFzMl9tYWdfZG9pX2pvaW5fbmV0d29ya19mdWxsZGF0YV93aXRoX2Zvc19uYW1lcy5qc29uJywgZnVuY3Rpb24oZXJyb3IsIGdyYXBoKSB7XG5cdGNvbnNvbGUubG9nKGVycm9yKTtcblx0aWYgKGVycm9yKSB7XG5cdFx0dmFyIGNvbnRhY3RFbWFpbCA9ICdqcG9ydGVub0B1dy5lZHUnO1xuXHRcdHZhciBlcnJIdG1sID0gJ1RoZXJlIHdhcyBhbiBlcnJvciBnZW5lcmF0aW5nIHRoZSB2aXN1YWxpemF0aW9uLCBvciBlbHNlIGRhdGEgcHJvY2Vzc2luZyBpcyBzdGlsbCBpbiBwcm9ncmVzcy4gVHJ5IHJlbG9hZGluZyB0aGUgcGFnZSBsYXRlciwgb3IgZ2VuZXJhdGluZyB0aGUgdmlzdWFsaXphdGlvbiBhZ2Fpbi4gSWYgdGhlIHByb2JsZW0gcGVyc2lzdHMsIDxhIGhyZWY9XCJtYWlsdG86JyArIGNvbnRhY3RFbWFpbCArICdcIj5jb250YWN0IHRoZSBhZG1pbmlzdHJhdG9yPC9hPi4nXG5cdFx0JCggJy5sb2FkaW5nVGV4dCcgKS5odG1sKCBlcnJIdG1sIClcblx0XHRcdC5jc3MoIHsnY29sb3InOiAncmVkJ30gKTtcblx0XHR0aHJvdyBlcnJvcjtcblx0fVxuXG5cdC8vIEdldCB0aGUgbW9zdCBjb21tb24gRG9tYWluIElEcyBmb3IgdGhlIGVnbyBhdXRob3IncyBwYXBlcnNcblx0dmFyIGRvbWFpbnNOZXN0ID0gZDMubmVzdCgpXG5cdFx0LmtleShmdW5jdGlvbihkKSB7IHJldHVybiBkLkRvbWFpbklEOyB9KS5zb3J0VmFsdWVzKGQzLmRlc2NlbmRpbmcpXG5cdFx0LnJvbGx1cChmdW5jdGlvbihsZWF2ZXMpIHsgcmV0dXJuIGxlYXZlcy5sZW5ndGg7IH0pXG5cdFx0LmVudHJpZXMoZ3JhcGgubm9kZXNbMF0ucGFwZXJzKTtcblx0ZG9tYWluc05lc3Quc29ydChmdW5jdGlvbihhLGIpIHsgcmV0dXJuIGQzLmRlc2NlbmRpbmcoYS52YWx1ZXMsIGIudmFsdWVzKTsgfSk7XG5cdC8vIHN0b3JlIGFzIGEgbm9kZSBwcm9wZXJ0eVxuXHRncmFwaC5ub2Rlc1swXS5Eb21haW5Db3VudHMgPSBkb21haW5zTmVzdDtcblx0Y29uc29sZS5sb2coZ3JhcGgpO1xuXHQvLyBkMy5zZWxlY3QoJyNpbmZvRGl2JykuYXBwZW5kKCdwJykudGV4dChncmFwaC5ub2Rlc1swXS5BdXRob3JOYW1lKTtcblxuXHR2YXIgZGVmYXVsdF9vcHRpb25zID0gY2l0YXRpb25WaXMuZGVmYXVsdF9vcHRpb25zLCBcblx0XHRzdW1tYXJ5U3RhdGlzdGljcyA9IGNpdGF0aW9uVmlzLnN1bW1hcnlTdGF0aXN0aWNzLFxuXHRcdGVnb0dyYXBoRGF0YSA9IGNpdGF0aW9uVmlzLmVnb0dyYXBoRGF0YSxcblx0ICAgIGxpbmVDaGFydERhdGEgPSBjaXRhdGlvblZpcy5saW5lQ2hhcnREYXRhLFxuXHRcdGV2ZW50TGlzdGVuZXJzID0gY2l0YXRpb25WaXMuZXZlbnRMaXN0ZW5lcnM7XG5cblx0dmFyIG9wdGlvbnMgPSBkZWZhdWx0X29wdGlvbnMuZGVmYXVsdHM7XG5cdGNvbnNvbGUubG9nKG9wdGlvbnMpO1xuXG5cdGdyYXBoID0gc3VtbWFyeVN0YXRpc3RpY3MuYWRkU3VtbWFyeVN0YXRpc3RpY3MoZ3JhcGgpO1xuXHRjaXRhdGlvblZpcy5ncmFwaF9kYXRhID0gZWdvR3JhcGhEYXRhLnByZXBhcmVfZWdvR3JhcGhEYXRhKGdyYXBoKTtcblx0Y2l0YXRpb25WaXMucHVibGljYXRpb25zX2RhdGEgPSBsaW5lQ2hhcnREYXRhLnByZXBhcmVEYXRhX2Vnb0F1dGhvclB1YmxpY2F0aW9ucyhncmFwaCk7XG5cdGNpdGF0aW9uVmlzLmFsbF9jaXRhdGlvbnNfZGF0YSA9IGxpbmVDaGFydERhdGEucHJlcGFyZURhdGFfYWxsQ2l0YXRpb25zKGdyYXBoKTtcblx0Y2l0YXRpb25WaXMuZWlnZW5mYWN0b3Jfc3VtX2RhdGEgPSBsaW5lQ2hhcnREYXRhLnByZXBhcmVEYXRhX2F1dGhvckVpZ2VuZmFjdG9yU3VtKGdyYXBoKTtcblxuXHQvLyBWaXN1YWxpemF0aW9uIG9iamVjdHMgZ28gaGVyZVxuXHRjaXRhdGlvblZpcy5lZ29HcmFwaFZpcyA9IG5ldyBlZ29HcmFwaFZpcyhjaXRhdGlvblZpcy5ncmFwaF9kYXRhKTtcblx0Ly8gY2l0YXRpb25WaXMucHVibGljYXRpb25zTGluZUNoYXJ0ID0gbmV3IGxpbmVDaGFydEJ5WWVhcihjaXRhdGlvblZpcy5wdWJsaWNhdGlvbnNfZGF0YSk7XG5cdC8vIGNpdGF0aW9uVmlzLmNpdGF0aW9uc0xpbmVDaGFydCA9IG5ldyBsaW5lQ2hhcnRCeVllYXIoY2l0YXRpb25WaXMuYWxsX2NpdGF0aW9uc19kYXRhKTtcblx0Ly8gY2l0YXRpb25WaXMuZWlnZW5mYWN0b3JTdW1MaW5lQ2hhcnQgPSBuZXcgbGluZUNoYXJ0QnlZZWFyKGNpdGF0aW9uVmlzLmVpZ2VuZmFjdG9yX3N1bV9kYXRhKTtcblx0Y2l0YXRpb25WaXMubGluZUNoYXJ0cyA9IFtdO1xuXHRjaXRhdGlvblZpcy5saW5lQ2hhcnRzLnB1c2gobmV3IGxpbmVDaGFydEJ5WWVhcihjaXRhdGlvblZpcy5wdWJsaWNhdGlvbnNfZGF0YSkpO1xuXHRjaXRhdGlvblZpcy5saW5lQ2hhcnRzLnB1c2gobmV3IGxpbmVDaGFydEJ5WWVhcihjaXRhdGlvblZpcy5hbGxfY2l0YXRpb25zX2RhdGEpKTtcblx0Y2l0YXRpb25WaXMubGluZUNoYXJ0cy5wdXNoKG5ldyBsaW5lQ2hhcnRCeVllYXIoY2l0YXRpb25WaXMuZWlnZW5mYWN0b3Jfc3VtX2RhdGEpKTtcblxuXHRvcHRpb25zLnRyYW5zaXRpb25UaW1lUGVyWWVhciA9IGNpdGF0aW9uVmlzLmdldFRyYW5zaXRpb25UaW1lUGVyWWVhcihncmFwaCk7XG5cblx0Y2l0YXRpb25WaXMuZWdvR3JhcGhWaXMuaW1wb3J0RGVmYXVsdE9wdGlvbnMob3B0aW9ucyk7XG5cdGZvciAodmFyIGk9MDsgaTxjaXRhdGlvblZpcy5saW5lQ2hhcnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2l0YXRpb25WaXMubGluZUNoYXJ0c1tpXS5pbXBvcnREZWZhdWx0T3B0aW9ucyhvcHRpb25zKTtcblx0fVxuXG5cdGNpdGF0aW9uVmlzLmVnb0dyYXBoVmlzLmluaXQoKTtcblx0Zm9yICh2YXIgaT0wOyBpPGNpdGF0aW9uVmlzLmxpbmVDaGFydHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaXRhdGlvblZpcy5saW5lQ2hhcnRzW2ldLmluaXQoKTtcblx0fVxuXHQkLmV2ZW50LnRyaWdnZXIoe1xuXHRcdHR5cGU6IFwiaW5pdENvbXBsZXRlXCIsXG5cdH0pO1xuXG5cdGNpdGF0aW9uVmlzLmxpbmVDaGFydHNbMF0uYWRkVGl0bGUoXCJOdW1iZXIgb2YgcHVibGljYXRpb25zXCIpO1xuXHRjaXRhdGlvblZpcy5saW5lQ2hhcnRzWzFdLmFkZFRpdGxlKFwiTnVtYmVyIG9mIGNpdGF0aW9ucyByZWNlaXZlZFwiKTtcblx0dmFyIGN0cnR5cGUgPSBnZXRRdWVyeVZhcmlhYmxlKFwiY3RydHlwZVwiKTtcblx0aWYgKCFjdHJ0eXBlKSB7XG5cdFx0Y3RydHlwZSA9IFwiYXV0aG9yXCI7XG5cdH1cblx0Y29uc29sZS5sb2coY3RydHlwZSk7XG5cdC8vIGNpdGF0aW9uVmlzLmxpbmVDaGFydHNbMl0uYWRkVGl0bGUoXCJTdW0gb2YgZWlnZW5mYWN0b3IgZm9yIHRoaXMgYXV0aG9yJ3MgcHVibGljYXRpb25zIGJ5IHllYXJcIik7XG5cdGNpdGF0aW9uVmlzLmxpbmVDaGFydHNbMl0uYWRkVGl0bGUoXCJTdW0gb2YgZWlnZW5mYWN0b3IgZm9yIHRoaXMgXCIgKyBjdHJ0eXBlICsgXCIncyBwdWJsaWNhdGlvbnMgYnkgeWVhclwiKTtcblxuXG5cdCQoIGRvY3VtZW50ICkub24oIFwieWVhckNoYW5nZVwiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgY3VyclllYXIgPSBjaXRhdGlvblZpcy5lZ29HcmFwaFZpcy5jdXJyWWVhcjtcblx0XHRmb3IgKHZhciBpPTA7IGk8Y2l0YXRpb25WaXMubGluZUNoYXJ0cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y2l0YXRpb25WaXMubGluZUNoYXJ0c1tpXS5tb3ZlWWVhckluZGljYXRvcihjdXJyWWVhcik7XG5cdFx0fVxuXHR9KTtcblxuXHQvLyBIYWNrIHRvIGxhYmVsIHRoZSBwdWJsaWNhdGlvbnMgbGluZSBjaGFydC4gVE9ETzogRml4IHRoaXMgbGF0ZXJcblx0Ly8gdmFyIHB1YnMgPSBkMy5zZWxlY3QoY2l0YXRpb25WaXMucHVibGljYXRpb25zTGluZUNoYXJ0LmNoYXJ0RGl2WzBdWzBdKTtcblx0dmFyIHB1YnMgPSBkMy5zZWxlY3QoY2l0YXRpb25WaXMubGluZUNoYXJ0c1swXS5jaGFydERpdlswXVswXSk7XG5cdHZhciBwdWJzQXhpc0xhYmVsID0gcHVicy5zZWxlY3QoJy55LmF4aXMnKS5zZWxlY3QoJy5heGlzTGFiZWwnKTtcblx0cHVic0F4aXNMYWJlbC50ZXh0KCdOdW0gcHVibGljYXRpb25zJyk7XG5cdC8vIEhhY2sgdG8gYWx0ZXIgZWlnZW5mYWN0b3IgbGluZSBjaGFydC4gVE9ETzogRml4IHRoaXMgbGF0ZXJcblx0Ly8gY2l0YXRpb25WaXMuZWlnZW5mYWN0b3JTdW1MaW5lQ2hhcnQueUF4aXMudGlja0Zvcm1hdChkMy5mb3JtYXQoJ2UnKSk7XG5cdGNpdGF0aW9uVmlzLmxpbmVDaGFydHNbMl0ueUF4aXMudGlja0Zvcm1hdChkMy5mb3JtYXQoJ2UnKSk7XG5cdC8vIHZhciBFRkNoYXJ0ID0gZDMuc2VsZWN0KGNpdGF0aW9uVmlzLmVpZ2VuZmFjdG9yU3VtTGluZUNoYXJ0LmNoYXJ0RGl2WzBdWzBdKTtcblx0dmFyIEVGQ2hhcnQgPSBkMy5zZWxlY3QoY2l0YXRpb25WaXMubGluZUNoYXJ0c1syXS5jaGFydERpdlswXVswXSk7XG5cdEVGQ2hhcnQuc2VsZWN0KCcueS5heGlzJylcblx0XHQvLyAuY2FsbChjaXRhdGlvblZpcy5laWdlbmZhY3RvclN1bUxpbmVDaGFydC55QXhpcylcblx0XHQuY2FsbChjaXRhdGlvblZpcy5saW5lQ2hhcnRzWzJdLnlBeGlzKVxuXHRcdC5zZWxlY3QoJy5heGlzTGFiZWwnKS50ZXh0KCdTdW0gb2YgRWlnZW5mYWN0b3InKTtcblxuXG5cdC8vIEV2ZW50IGxpc3RlbmVyc1xuXHQvLyBFdmVudCBsaXN0ZW5lcnMgdGhhdCBhY3QgYWNyb3NzIGRpZmZlcmVudCB2aXN1YWxpemF0aW9uIG9iamVjdHMgZ28gaGVyZVxuXHRjaXRhdGlvblZpcy55ZWFyVGlja0NsaWNrRXZlbnRMaXN0ZW5lcigpO1xuXHRcblx0ZDMuc2VsZWN0KFwiLmxvYWRpbmdUZXh0XCIpLnJlbW92ZSgpO1xufSk7XG4vLyB9KShjaXRhdGlvbnZpc19kYXRhKTtcbn1cblxuLy8gbWFpbigpO1xuZXhwb3J0IHsgY2l0YXRpb25WaXMsIGVnb0dyYXBoVmlzLCBsaW5lQ2hhcnRCeVllYXIgfTtcbiIsImltcG9ydCB7IGNpdGF0aW9uVmlzLCBlZ29HcmFwaFZpcywgbGluZUNoYXJ0QnlZZWFyIH0gZnJvbSAnLi9jb25jYXQuanMnO1xuZXhwb3J0IHsgY2l0YXRpb25WaXMsIGVnb0dyYXBoVmlzLCBsaW5lQ2hhcnRCeVllYXIgfTtcblxuIl0sInNvdXJjZVJvb3QiOiIifQ==