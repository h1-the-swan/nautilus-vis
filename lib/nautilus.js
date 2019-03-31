(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("nautilus", [], factory);
	else if(typeof exports === 'object')
		exports["nautilus"] = factory();
	else
		root["nautilus"] = factory();
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

/***/ "./src/citationVis_Main.js":
/*!*********************************!*\
  !*** ./src/citationVis_Main.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// https://css-tricks.com/snippets/javascript/get-url-variables/
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
} // citationvis_data is a variable defined in the flask template that includes this js file (e.g. vismain.html)


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
  if (citationvis_data === 'ABORT') {
    return;
  }

  d3.select('#mainDiv').append('p').attr("class", "loadingText").text('Loading...');
  d3.json(citationvis_data, function (error, graph) {
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
//


/* harmony default export */ __webpack_exports__["default"] = (main);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: main */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _citationVis_Main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./citationVis_Main.js */ "./src/citationVis_Main.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "main", function() { return _citationVis_Main_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });




/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uYXV0aWx1cy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vbmF1dGlsdXMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbmF1dGlsdXMvLi9zcmMvY2l0YXRpb25WaXNfTWFpbi5qcyIsIndlYnBhY2s6Ly9uYXV0aWx1cy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJnZXRRdWVyeVZhcmlhYmxlIiwidmFyaWFibGUiLCJxdWVyeSIsIndpbmRvdyIsImxvY2F0aW9uIiwic2VhcmNoIiwic3Vic3RyaW5nIiwidmFycyIsInNwbGl0IiwiaSIsImxlbmd0aCIsInBhaXIiLCJjaXRhdGlvblZpcyIsImdldFRyYW5zaXRpb25UaW1lUGVyWWVhciIsImdyYXBoIiwibG9uZ2VzdFllYXJUcmFuc2l0aW9uVGltZSIsImNvbnNvbGUiLCJsb2ciLCJ0cmFuc2l0aW9uVGltZVBlclllYXIiLCJlbXB0eVllYXJUcmFuc2l0aW9uVGltZSIsInRocmVzaG9sZFNjYWxlIiwiZDMiLCJzY2FsZSIsInRocmVzaG9sZCIsImRvbWFpbiIsInJhbmdlIiwieWVhclJhbmdlIiwibm9kZUNvdW50c1BlclllYXIiLCJ5ZWFyVGlja0NsaWNrRXZlbnRMaXN0ZW5lciIsInNlbGVjdEFsbCIsIm9uIiwiZCIsImRlc3RpbmF0aW9uWWVhciIsImdldEF0dHJpYnV0ZSIsInRyYW5zaXRpb24iLCJkdXJhdGlvbiIsImVnb0dyYXBoVmlzIiwibmV3RGVzdGluYXRpb25Ob2RlIiwibWFpbiIsImNpdGF0aW9udmlzX2RhdGEiLCJzZWxlY3QiLCJhcHBlbmQiLCJhdHRyIiwidGV4dCIsImpzb24iLCJlcnJvciIsImNvbnRhY3RFbWFpbCIsImVyckh0bWwiLCIkIiwiaHRtbCIsImNzcyIsImRvbWFpbnNOZXN0IiwibmVzdCIsImtleSIsIkRvbWFpbklEIiwic29ydFZhbHVlcyIsImRlc2NlbmRpbmciLCJyb2xsdXAiLCJsZWF2ZXMiLCJlbnRyaWVzIiwibm9kZXMiLCJwYXBlcnMiLCJzb3J0IiwiYSIsImIiLCJ2YWx1ZXMiLCJEb21haW5Db3VudHMiLCJkZWZhdWx0X29wdGlvbnMiLCJzdW1tYXJ5U3RhdGlzdGljcyIsImVnb0dyYXBoRGF0YSIsImxpbmVDaGFydERhdGEiLCJldmVudExpc3RlbmVycyIsIm9wdGlvbnMiLCJkZWZhdWx0cyIsImFkZFN1bW1hcnlTdGF0aXN0aWNzIiwiZ3JhcGhfZGF0YSIsInByZXBhcmVfZWdvR3JhcGhEYXRhIiwicHVibGljYXRpb25zX2RhdGEiLCJwcmVwYXJlRGF0YV9lZ29BdXRob3JQdWJsaWNhdGlvbnMiLCJhbGxfY2l0YXRpb25zX2RhdGEiLCJwcmVwYXJlRGF0YV9hbGxDaXRhdGlvbnMiLCJlaWdlbmZhY3Rvcl9zdW1fZGF0YSIsInByZXBhcmVEYXRhX2F1dGhvckVpZ2VuZmFjdG9yU3VtIiwibGluZUNoYXJ0cyIsInB1c2giLCJsaW5lQ2hhcnRCeVllYXIiLCJpbXBvcnREZWZhdWx0T3B0aW9ucyIsImluaXQiLCJldmVudCIsInRyaWdnZXIiLCJ0eXBlIiwiYWRkVGl0bGUiLCJjdHJ0eXBlIiwiZG9jdW1lbnQiLCJjdXJyWWVhciIsIm1vdmVZZWFySW5kaWNhdG9yIiwicHVicyIsImNoYXJ0RGl2IiwicHVic0F4aXNMYWJlbCIsInlBeGlzIiwidGlja0Zvcm1hdCIsImZvcm1hdCIsIkVGQ2hhcnQiLCJjYWxsIiwicmVtb3ZlIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FB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cGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcIm5hdXRpbHVzXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIm5hdXRpbHVzXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIm5hdXRpbHVzXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiLy8gaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9zbmlwcGV0cy9qYXZhc2NyaXB0L2dldC11cmwtdmFyaWFibGVzL1xuZnVuY3Rpb24gZ2V0UXVlcnlWYXJpYWJsZSh2YXJpYWJsZSlcbntcbiAgICB2YXIgcXVlcnkgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKTtcbiAgICB2YXIgdmFycyA9IHF1ZXJ5LnNwbGl0KFwiJlwiKTtcbiAgICBmb3IgKHZhciBpPTA7IGk8dmFycy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcGFpciA9IHZhcnNbaV0uc3BsaXQoXCI9XCIpO1xuICAgICAgICBpZihwYWlyWzBdID09IHZhcmlhYmxlKSB7cmV0dXJuIHBhaXJbMV07fVxuICAgIH1cbiAgICByZXR1cm4oZmFsc2UpO1xufVxuXG5cbi8vIGNpdGF0aW9udmlzX2RhdGEgaXMgYSB2YXJpYWJsZSBkZWZpbmVkIGluIHRoZSBmbGFzayB0ZW1wbGF0ZSB0aGF0IGluY2x1ZGVzIHRoaXMganMgZmlsZSAoZS5nLiB2aXNtYWluLmh0bWwpXG5cbnZhciBjaXRhdGlvblZpcyA9IGNpdGF0aW9uVmlzIHx8IHt9O1xuXG5jaXRhdGlvblZpcy5nZXRUcmFuc2l0aW9uVGltZVBlclllYXI9IGZ1bmN0aW9uKGdyYXBoLCBsb25nZXN0WWVhclRyYW5zaXRpb25UaW1lKSB7XG5cdGNvbnNvbGUubG9nKGdyYXBoKTtcblx0Ly8gVGhpcyB3aWxsIGxldCB1cyB2YXJ5IHRoZSB0cmFuc2l0aW9uIHRpbWUgcGVyIHllYXJcblx0dmFyIHRyYW5zaXRpb25UaW1lUGVyWWVhciA9IHt9O1xuXHR2YXIgZW1wdHlZZWFyVHJhbnNpdGlvblRpbWUgPSAzMDA7XG5cdC8vIHZhciBsb25nZXN0WWVhclRyYW5zaXRpb25UaW1lID0gNDAwMDtcblx0Ly8gU2V0IGRlZmF1bHQgdmFsdWU6XG5cdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvODk0ODYwL3NldC1hLWRlZmF1bHQtcGFyYW1ldGVyLXZhbHVlLWZvci1hLWphdmFzY3JpcHQtZnVuY3Rpb25cblx0dmFyIGxvbmdlc3RZZWFyVHJhbnNpdGlvblRpbWUgPSB0eXBlb2YgbG9uZ2VzdFllYXJUcmFuc2l0aW9uVGltZSAhPT0gJ3VuZGVmaW5lZCcgPyBsb25nZXN0WWVhclRyYW5zaXRpb25UaW1lIDogNDAwMDtcblx0Ly8gVGhpcyBzY2FsZSB0YWtlcyB0aGUgbnVtYmVyIG9mIG5vZGVzIGZvciBhIGdpdmVuIHllYXIgYXMgaW5wdXRcblx0Ly8gYW5kIG91dHB1dHMgdGhlIHRyYW5zaXRpb24gdGltZSwgYmFzZWQgb24gYSB0aHJlc2hvbGQgbWFwcGluZ1xuXHR2YXIgdGhyZXNob2xkU2NhbGUgPSBkMy5zY2FsZS50aHJlc2hvbGQoKVxuXHRcdC5kb21haW4oWzEsIDMsIDEwLCAyMCwgMzBdKVxuXHRcdC5yYW5nZShbXG5cdFx0XHRcdGVtcHR5WWVhclRyYW5zaXRpb25UaW1lLCAgLy8gemVybyBub2Rlc1xuXHRcdFx0XHRsb25nZXN0WWVhclRyYW5zaXRpb25UaW1lICogLjIsICAvLyBvbmUgb3IgdHdvIG5vZGVzXG5cdFx0XHRcdGxvbmdlc3RZZWFyVHJhbnNpdGlvblRpbWUgKiAuNSwgLy8gMyB0byA5XG5cdFx0XHRcdGxvbmdlc3RZZWFyVHJhbnNpdGlvblRpbWUgKiAuNywgIC8vIDEwIHRvIDE5XG5cdFx0XHRcdGxvbmdlc3RZZWFyVHJhbnNpdGlvblRpbWUgKiAuODUsICAvLyAyMCB0byAyOVxuXHRcdFx0XHRsb25nZXN0WWVhclRyYW5zaXRpb25UaW1lICAvLyAzMCtcblx0XHRcdFx0XSk7XG5cdHZhciB5ZWFyUmFuZ2UgPSBncmFwaC5ncmFwaC55ZWFyUmFuZ2U7XG5cdFxuXHQvLyBQdXQgdGhlIHRyYW5zaXRpb24gdGltZSBmb3IgZWFjaCB5ZWFyIGludG8gYW4gb2JqZWN0XG5cdGZvciAodmFyIGk9eWVhclJhbmdlWzBdOyBpPD15ZWFyUmFuZ2VbMV07IGkrKykge1xuXHRcdC8vIHRyYW5zaXRpb25UaW1lUGVyWWVhcltpXSA9IDEwMDA7XG5cdFx0dHJhbnNpdGlvblRpbWVQZXJZZWFyW2ldID0gdGhyZXNob2xkU2NhbGUoZ3JhcGguZ3JhcGgubm9kZUNvdW50c1BlclllYXJbaV0pO1xuXHR9XG5cdHJldHVybiB0cmFuc2l0aW9uVGltZVBlclllYXI7XG59O1xuXG5jaXRhdGlvblZpcy55ZWFyVGlja0NsaWNrRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xuICAgIC8vIEFkZCBjbGljayBsaXN0ZW5lcnMgdG8gbGluZSBjaGFydCBheGlzIHRpY2sgbGFiZWxzICh5ZWFycykuXG4gICAgLy8gT24gY2xpY2ssIGEgbmV3IGRlc3RpbmF0aW9uIG5vZGUgd2lsbCBiZSBzZXQuXG4gICAgZDMuc2VsZWN0QWxsKCcueWVhclRpY2snKVxuICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgLy8gR2V0IHRoZSB5ZWFyIChhcyBpbnRlZ2VyKVxuICAgICAgICAgICAgdmFyIGRlc3RpbmF0aW9uWWVhciA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLXllYXInKTtcbiAgICAgICAgICAgIC8vIFN0b3AgYWxsIHRyYW5zaXRpb25zIG9uIG5vZGVzIGFuZCBsaW5rc1xuICAgICAgICAgICAgZDMuc2VsZWN0QWxsKCcubm9kZSwgLmxpbmsnKS50cmFuc2l0aW9uKCkuZHVyYXRpb24oMCk7XG5cblx0XHRcdGNpdGF0aW9uVmlzLmVnb0dyYXBoVmlzLm5ld0Rlc3RpbmF0aW9uTm9kZShkZXN0aW5hdGlvblllYXIpO1xuICAgICAgICB9KTtcbn07XG5cbmZ1bmN0aW9uIG1haW4oKSB7XG5cbmlmIChjaXRhdGlvbnZpc19kYXRhID09PSAnQUJPUlQnKSB7XG5cdHJldHVybjtcbn1cblxuZDMuc2VsZWN0KCcjbWFpbkRpdicpLmFwcGVuZCgncCcpXG5cdC5hdHRyKFwiY2xhc3NcIiwgXCJsb2FkaW5nVGV4dFwiKVxuXHQudGV4dCgnTG9hZGluZy4uLicpO1xuXG5kMy5qc29uKGNpdGF0aW9udmlzX2RhdGEsIGZ1bmN0aW9uKGVycm9yLCBncmFwaCkge1xuXHRjb25zb2xlLmxvZyhlcnJvcik7XG5cdGlmIChlcnJvcikge1xuXHRcdHZhciBjb250YWN0RW1haWwgPSAnanBvcnRlbm9AdXcuZWR1Jztcblx0XHR2YXIgZXJySHRtbCA9ICdUaGVyZSB3YXMgYW4gZXJyb3IgZ2VuZXJhdGluZyB0aGUgdmlzdWFsaXphdGlvbiwgb3IgZWxzZSBkYXRhIHByb2Nlc3NpbmcgaXMgc3RpbGwgaW4gcHJvZ3Jlc3MuIFRyeSByZWxvYWRpbmcgdGhlIHBhZ2UgbGF0ZXIsIG9yIGdlbmVyYXRpbmcgdGhlIHZpc3VhbGl6YXRpb24gYWdhaW4uIElmIHRoZSBwcm9ibGVtIHBlcnNpc3RzLCA8YSBocmVmPVwibWFpbHRvOicgKyBjb250YWN0RW1haWwgKyAnXCI+Y29udGFjdCB0aGUgYWRtaW5pc3RyYXRvcjwvYT4uJ1xuXHRcdCQoICcubG9hZGluZ1RleHQnICkuaHRtbCggZXJySHRtbCApXG5cdFx0XHQuY3NzKCB7J2NvbG9yJzogJ3JlZCd9ICk7XG5cdFx0dGhyb3cgZXJyb3I7XG5cdH1cblxuXHQvLyBHZXQgdGhlIG1vc3QgY29tbW9uIERvbWFpbiBJRHMgZm9yIHRoZSBlZ28gYXV0aG9yJ3MgcGFwZXJzXG5cdHZhciBkb21haW5zTmVzdCA9IGQzLm5lc3QoKVxuXHRcdC5rZXkoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5Eb21haW5JRDsgfSkuc29ydFZhbHVlcyhkMy5kZXNjZW5kaW5nKVxuXHRcdC5yb2xsdXAoZnVuY3Rpb24obGVhdmVzKSB7IHJldHVybiBsZWF2ZXMubGVuZ3RoOyB9KVxuXHRcdC5lbnRyaWVzKGdyYXBoLm5vZGVzWzBdLnBhcGVycyk7XG5cdGRvbWFpbnNOZXN0LnNvcnQoZnVuY3Rpb24oYSxiKSB7IHJldHVybiBkMy5kZXNjZW5kaW5nKGEudmFsdWVzLCBiLnZhbHVlcyk7IH0pO1xuXHQvLyBzdG9yZSBhcyBhIG5vZGUgcHJvcGVydHlcblx0Z3JhcGgubm9kZXNbMF0uRG9tYWluQ291bnRzID0gZG9tYWluc05lc3Q7XG5cdGNvbnNvbGUubG9nKGdyYXBoKTtcblx0Ly8gZDMuc2VsZWN0KCcjaW5mb0RpdicpLmFwcGVuZCgncCcpLnRleHQoZ3JhcGgubm9kZXNbMF0uQXV0aG9yTmFtZSk7XG5cblx0dmFyIGRlZmF1bHRfb3B0aW9ucyA9IGNpdGF0aW9uVmlzLmRlZmF1bHRfb3B0aW9ucywgXG5cdFx0c3VtbWFyeVN0YXRpc3RpY3MgPSBjaXRhdGlvblZpcy5zdW1tYXJ5U3RhdGlzdGljcyxcblx0XHRlZ29HcmFwaERhdGEgPSBjaXRhdGlvblZpcy5lZ29HcmFwaERhdGEsXG5cdCAgICBsaW5lQ2hhcnREYXRhID0gY2l0YXRpb25WaXMubGluZUNoYXJ0RGF0YSxcblx0XHRldmVudExpc3RlbmVycyA9IGNpdGF0aW9uVmlzLmV2ZW50TGlzdGVuZXJzO1xuXG5cdHZhciBvcHRpb25zID0gZGVmYXVsdF9vcHRpb25zLmRlZmF1bHRzO1xuXHRjb25zb2xlLmxvZyhvcHRpb25zKTtcblxuXHRncmFwaCA9IHN1bW1hcnlTdGF0aXN0aWNzLmFkZFN1bW1hcnlTdGF0aXN0aWNzKGdyYXBoKTtcblx0Y2l0YXRpb25WaXMuZ3JhcGhfZGF0YSA9IGVnb0dyYXBoRGF0YS5wcmVwYXJlX2Vnb0dyYXBoRGF0YShncmFwaCk7XG5cdGNpdGF0aW9uVmlzLnB1YmxpY2F0aW9uc19kYXRhID0gbGluZUNoYXJ0RGF0YS5wcmVwYXJlRGF0YV9lZ29BdXRob3JQdWJsaWNhdGlvbnMoZ3JhcGgpO1xuXHRjaXRhdGlvblZpcy5hbGxfY2l0YXRpb25zX2RhdGEgPSBsaW5lQ2hhcnREYXRhLnByZXBhcmVEYXRhX2FsbENpdGF0aW9ucyhncmFwaCk7XG5cdGNpdGF0aW9uVmlzLmVpZ2VuZmFjdG9yX3N1bV9kYXRhID0gbGluZUNoYXJ0RGF0YS5wcmVwYXJlRGF0YV9hdXRob3JFaWdlbmZhY3RvclN1bShncmFwaCk7XG5cblx0Ly8gVmlzdWFsaXphdGlvbiBvYmplY3RzIGdvIGhlcmVcblx0Y2l0YXRpb25WaXMuZWdvR3JhcGhWaXMgPSBuZXcgZWdvR3JhcGhWaXMoY2l0YXRpb25WaXMuZ3JhcGhfZGF0YSk7XG5cdC8vIGNpdGF0aW9uVmlzLnB1YmxpY2F0aW9uc0xpbmVDaGFydCA9IG5ldyBsaW5lQ2hhcnRCeVllYXIoY2l0YXRpb25WaXMucHVibGljYXRpb25zX2RhdGEpO1xuXHQvLyBjaXRhdGlvblZpcy5jaXRhdGlvbnNMaW5lQ2hhcnQgPSBuZXcgbGluZUNoYXJ0QnlZZWFyKGNpdGF0aW9uVmlzLmFsbF9jaXRhdGlvbnNfZGF0YSk7XG5cdC8vIGNpdGF0aW9uVmlzLmVpZ2VuZmFjdG9yU3VtTGluZUNoYXJ0ID0gbmV3IGxpbmVDaGFydEJ5WWVhcihjaXRhdGlvblZpcy5laWdlbmZhY3Rvcl9zdW1fZGF0YSk7XG5cdGNpdGF0aW9uVmlzLmxpbmVDaGFydHMgPSBbXTtcblx0Y2l0YXRpb25WaXMubGluZUNoYXJ0cy5wdXNoKG5ldyBsaW5lQ2hhcnRCeVllYXIoY2l0YXRpb25WaXMucHVibGljYXRpb25zX2RhdGEpKTtcblx0Y2l0YXRpb25WaXMubGluZUNoYXJ0cy5wdXNoKG5ldyBsaW5lQ2hhcnRCeVllYXIoY2l0YXRpb25WaXMuYWxsX2NpdGF0aW9uc19kYXRhKSk7XG5cdGNpdGF0aW9uVmlzLmxpbmVDaGFydHMucHVzaChuZXcgbGluZUNoYXJ0QnlZZWFyKGNpdGF0aW9uVmlzLmVpZ2VuZmFjdG9yX3N1bV9kYXRhKSk7XG5cblx0b3B0aW9ucy50cmFuc2l0aW9uVGltZVBlclllYXIgPSBjaXRhdGlvblZpcy5nZXRUcmFuc2l0aW9uVGltZVBlclllYXIoZ3JhcGgpO1xuXG5cdGNpdGF0aW9uVmlzLmVnb0dyYXBoVmlzLmltcG9ydERlZmF1bHRPcHRpb25zKG9wdGlvbnMpO1xuXHRmb3IgKHZhciBpPTA7IGk8Y2l0YXRpb25WaXMubGluZUNoYXJ0cy5sZW5ndGg7IGkrKykge1xuXHRcdGNpdGF0aW9uVmlzLmxpbmVDaGFydHNbaV0uaW1wb3J0RGVmYXVsdE9wdGlvbnMob3B0aW9ucyk7XG5cdH1cblxuXHRjaXRhdGlvblZpcy5lZ29HcmFwaFZpcy5pbml0KCk7XG5cdGZvciAodmFyIGk9MDsgaTxjaXRhdGlvblZpcy5saW5lQ2hhcnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2l0YXRpb25WaXMubGluZUNoYXJ0c1tpXS5pbml0KCk7XG5cdH1cblx0JC5ldmVudC50cmlnZ2VyKHtcblx0XHR0eXBlOiBcImluaXRDb21wbGV0ZVwiLFxuXHR9KTtcblxuXHRjaXRhdGlvblZpcy5saW5lQ2hhcnRzWzBdLmFkZFRpdGxlKFwiTnVtYmVyIG9mIHB1YmxpY2F0aW9uc1wiKTtcblx0Y2l0YXRpb25WaXMubGluZUNoYXJ0c1sxXS5hZGRUaXRsZShcIk51bWJlciBvZiBjaXRhdGlvbnMgcmVjZWl2ZWRcIik7XG5cdHZhciBjdHJ0eXBlID0gZ2V0UXVlcnlWYXJpYWJsZShcImN0cnR5cGVcIik7XG5cdGlmICghY3RydHlwZSkge1xuXHRcdGN0cnR5cGUgPSBcImF1dGhvclwiO1xuXHR9XG5cdGNvbnNvbGUubG9nKGN0cnR5cGUpO1xuXHQvLyBjaXRhdGlvblZpcy5saW5lQ2hhcnRzWzJdLmFkZFRpdGxlKFwiU3VtIG9mIGVpZ2VuZmFjdG9yIGZvciB0aGlzIGF1dGhvcidzIHB1YmxpY2F0aW9ucyBieSB5ZWFyXCIpO1xuXHRjaXRhdGlvblZpcy5saW5lQ2hhcnRzWzJdLmFkZFRpdGxlKFwiU3VtIG9mIGVpZ2VuZmFjdG9yIGZvciB0aGlzIFwiICsgY3RydHlwZSArIFwiJ3MgcHVibGljYXRpb25zIGJ5IHllYXJcIik7XG5cblxuXHQkKCBkb2N1bWVudCApLm9uKCBcInllYXJDaGFuZ2VcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGN1cnJZZWFyID0gY2l0YXRpb25WaXMuZWdvR3JhcGhWaXMuY3VyclllYXI7XG5cdFx0Zm9yICh2YXIgaT0wOyBpPGNpdGF0aW9uVmlzLmxpbmVDaGFydHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNpdGF0aW9uVmlzLmxpbmVDaGFydHNbaV0ubW92ZVllYXJJbmRpY2F0b3IoY3VyclllYXIpO1xuXHRcdH1cblx0fSk7XG5cblx0Ly8gSGFjayB0byBsYWJlbCB0aGUgcHVibGljYXRpb25zIGxpbmUgY2hhcnQuIFRPRE86IEZpeCB0aGlzIGxhdGVyXG5cdC8vIHZhciBwdWJzID0gZDMuc2VsZWN0KGNpdGF0aW9uVmlzLnB1YmxpY2F0aW9uc0xpbmVDaGFydC5jaGFydERpdlswXVswXSk7XG5cdHZhciBwdWJzID0gZDMuc2VsZWN0KGNpdGF0aW9uVmlzLmxpbmVDaGFydHNbMF0uY2hhcnREaXZbMF1bMF0pO1xuXHR2YXIgcHVic0F4aXNMYWJlbCA9IHB1YnMuc2VsZWN0KCcueS5heGlzJykuc2VsZWN0KCcuYXhpc0xhYmVsJyk7XG5cdHB1YnNBeGlzTGFiZWwudGV4dCgnTnVtIHB1YmxpY2F0aW9ucycpO1xuXHQvLyBIYWNrIHRvIGFsdGVyIGVpZ2VuZmFjdG9yIGxpbmUgY2hhcnQuIFRPRE86IEZpeCB0aGlzIGxhdGVyXG5cdC8vIGNpdGF0aW9uVmlzLmVpZ2VuZmFjdG9yU3VtTGluZUNoYXJ0LnlBeGlzLnRpY2tGb3JtYXQoZDMuZm9ybWF0KCdlJykpO1xuXHRjaXRhdGlvblZpcy5saW5lQ2hhcnRzWzJdLnlBeGlzLnRpY2tGb3JtYXQoZDMuZm9ybWF0KCdlJykpO1xuXHQvLyB2YXIgRUZDaGFydCA9IGQzLnNlbGVjdChjaXRhdGlvblZpcy5laWdlbmZhY3RvclN1bUxpbmVDaGFydC5jaGFydERpdlswXVswXSk7XG5cdHZhciBFRkNoYXJ0ID0gZDMuc2VsZWN0KGNpdGF0aW9uVmlzLmxpbmVDaGFydHNbMl0uY2hhcnREaXZbMF1bMF0pO1xuXHRFRkNoYXJ0LnNlbGVjdCgnLnkuYXhpcycpXG5cdFx0Ly8gLmNhbGwoY2l0YXRpb25WaXMuZWlnZW5mYWN0b3JTdW1MaW5lQ2hhcnQueUF4aXMpXG5cdFx0LmNhbGwoY2l0YXRpb25WaXMubGluZUNoYXJ0c1syXS55QXhpcylcblx0XHQuc2VsZWN0KCcuYXhpc0xhYmVsJykudGV4dCgnU3VtIG9mIEVpZ2VuZmFjdG9yJyk7XG5cblxuXHQvLyBFdmVudCBsaXN0ZW5lcnNcblx0Ly8gRXZlbnQgbGlzdGVuZXJzIHRoYXQgYWN0IGFjcm9zcyBkaWZmZXJlbnQgdmlzdWFsaXphdGlvbiBvYmplY3RzIGdvIGhlcmVcblx0Y2l0YXRpb25WaXMueWVhclRpY2tDbGlja0V2ZW50TGlzdGVuZXIoKTtcblx0XG5cdGQzLnNlbGVjdChcIi5sb2FkaW5nVGV4dFwiKS5yZW1vdmUoKTtcbn0pO1xuLy8gfSkoY2l0YXRpb252aXNfZGF0YSk7XG59XG5cbi8vIG1haW4oKTtcbi8vXG5leHBvcnQgZGVmYXVsdCBtYWluO1xuIiwiaW1wb3J0IG1haW4gZnJvbSAnLi9jaXRhdGlvblZpc19NYWluLmpzJztcbmV4cG9ydCB7IG1haW4gfTtcblxuIl0sInNvdXJjZVJvb3QiOiIifQ==