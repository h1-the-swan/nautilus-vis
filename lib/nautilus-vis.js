(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("nautilus-vis", [], factory);
	else if(typeof exports === 'object')
		exports["nautilus-vis"] = factory();
	else
		root["nautilus-vis"] = factory();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uYXV0aWx1cy12aXMvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL25hdXRpbHVzLXZpcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uYXV0aWx1cy12aXMvLi9zcmMvY2l0YXRpb25WaXNfTWFpbi5qcyIsIndlYnBhY2s6Ly9uYXV0aWx1cy12aXMvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiZ2V0UXVlcnlWYXJpYWJsZSIsInZhcmlhYmxlIiwicXVlcnkiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInNlYXJjaCIsInN1YnN0cmluZyIsInZhcnMiLCJzcGxpdCIsImkiLCJsZW5ndGgiLCJwYWlyIiwiY2l0YXRpb25WaXMiLCJnZXRUcmFuc2l0aW9uVGltZVBlclllYXIiLCJncmFwaCIsImxvbmdlc3RZZWFyVHJhbnNpdGlvblRpbWUiLCJjb25zb2xlIiwibG9nIiwidHJhbnNpdGlvblRpbWVQZXJZZWFyIiwiZW1wdHlZZWFyVHJhbnNpdGlvblRpbWUiLCJ0aHJlc2hvbGRTY2FsZSIsImQzIiwic2NhbGUiLCJ0aHJlc2hvbGQiLCJkb21haW4iLCJyYW5nZSIsInllYXJSYW5nZSIsIm5vZGVDb3VudHNQZXJZZWFyIiwieWVhclRpY2tDbGlja0V2ZW50TGlzdGVuZXIiLCJzZWxlY3RBbGwiLCJvbiIsImQiLCJkZXN0aW5hdGlvblllYXIiLCJnZXRBdHRyaWJ1dGUiLCJ0cmFuc2l0aW9uIiwiZHVyYXRpb24iLCJlZ29HcmFwaFZpcyIsIm5ld0Rlc3RpbmF0aW9uTm9kZSIsIm1haW4iLCJjaXRhdGlvbnZpc19kYXRhIiwic2VsZWN0IiwiYXBwZW5kIiwiYXR0ciIsInRleHQiLCJqc29uIiwiZXJyb3IiLCJjb250YWN0RW1haWwiLCJlcnJIdG1sIiwiJCIsImh0bWwiLCJjc3MiLCJkb21haW5zTmVzdCIsIm5lc3QiLCJrZXkiLCJEb21haW5JRCIsInNvcnRWYWx1ZXMiLCJkZXNjZW5kaW5nIiwicm9sbHVwIiwibGVhdmVzIiwiZW50cmllcyIsIm5vZGVzIiwicGFwZXJzIiwic29ydCIsImEiLCJiIiwidmFsdWVzIiwiRG9tYWluQ291bnRzIiwiZGVmYXVsdF9vcHRpb25zIiwic3VtbWFyeVN0YXRpc3RpY3MiLCJlZ29HcmFwaERhdGEiLCJsaW5lQ2hhcnREYXRhIiwiZXZlbnRMaXN0ZW5lcnMiLCJvcHRpb25zIiwiZGVmYXVsdHMiLCJhZGRTdW1tYXJ5U3RhdGlzdGljcyIsImdyYXBoX2RhdGEiLCJwcmVwYXJlX2Vnb0dyYXBoRGF0YSIsInB1YmxpY2F0aW9uc19kYXRhIiwicHJlcGFyZURhdGFfZWdvQXV0aG9yUHVibGljYXRpb25zIiwiYWxsX2NpdGF0aW9uc19kYXRhIiwicHJlcGFyZURhdGFfYWxsQ2l0YXRpb25zIiwiZWlnZW5mYWN0b3Jfc3VtX2RhdGEiLCJwcmVwYXJlRGF0YV9hdXRob3JFaWdlbmZhY3RvclN1bSIsImxpbmVDaGFydHMiLCJwdXNoIiwibGluZUNoYXJ0QnlZZWFyIiwiaW1wb3J0RGVmYXVsdE9wdGlvbnMiLCJpbml0IiwiZXZlbnQiLCJ0cmlnZ2VyIiwidHlwZSIsImFkZFRpdGxlIiwiY3RydHlwZSIsImRvY3VtZW50IiwiY3VyclllYXIiLCJtb3ZlWWVhckluZGljYXRvciIsInB1YnMiLCJjaGFydERpdiIsInB1YnNBeGlzTGFiZWwiLCJ5QXhpcyIsInRpY2tGb3JtYXQiLCJmb3JtYXQiLCJFRkNoYXJ0IiwiY2FsbCIsInJlbW92ZSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFD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ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwibmF1dGlsdXMtdmlzXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIm5hdXRpbHVzLXZpc1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJuYXV0aWx1cy12aXNcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIvLyBodHRwczovL2Nzcy10cmlja3MuY29tL3NuaXBwZXRzL2phdmFzY3JpcHQvZ2V0LXVybC12YXJpYWJsZXMvXG5mdW5jdGlvbiBnZXRRdWVyeVZhcmlhYmxlKHZhcmlhYmxlKVxue1xuICAgIHZhciBxdWVyeSA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyaW5nKDEpO1xuICAgIHZhciB2YXJzID0gcXVlcnkuc3BsaXQoXCImXCIpO1xuICAgIGZvciAodmFyIGk9MDsgaTx2YXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBwYWlyID0gdmFyc1tpXS5zcGxpdChcIj1cIik7XG4gICAgICAgIGlmKHBhaXJbMF0gPT0gdmFyaWFibGUpIHtyZXR1cm4gcGFpclsxXTt9XG4gICAgfVxuICAgIHJldHVybihmYWxzZSk7XG59XG5cblxuLy8gY2l0YXRpb252aXNfZGF0YSBpcyBhIHZhcmlhYmxlIGRlZmluZWQgaW4gdGhlIGZsYXNrIHRlbXBsYXRlIHRoYXQgaW5jbHVkZXMgdGhpcyBqcyBmaWxlIChlLmcuIHZpc21haW4uaHRtbClcblxudmFyIGNpdGF0aW9uVmlzID0gY2l0YXRpb25WaXMgfHwge307XG5cbmNpdGF0aW9uVmlzLmdldFRyYW5zaXRpb25UaW1lUGVyWWVhcj0gZnVuY3Rpb24oZ3JhcGgsIGxvbmdlc3RZZWFyVHJhbnNpdGlvblRpbWUpIHtcblx0Y29uc29sZS5sb2coZ3JhcGgpO1xuXHQvLyBUaGlzIHdpbGwgbGV0IHVzIHZhcnkgdGhlIHRyYW5zaXRpb24gdGltZSBwZXIgeWVhclxuXHR2YXIgdHJhbnNpdGlvblRpbWVQZXJZZWFyID0ge307XG5cdHZhciBlbXB0eVllYXJUcmFuc2l0aW9uVGltZSA9IDMwMDtcblx0Ly8gdmFyIGxvbmdlc3RZZWFyVHJhbnNpdGlvblRpbWUgPSA0MDAwO1xuXHQvLyBTZXQgZGVmYXVsdCB2YWx1ZTpcblx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy84OTQ4NjAvc2V0LWEtZGVmYXVsdC1wYXJhbWV0ZXItdmFsdWUtZm9yLWEtamF2YXNjcmlwdC1mdW5jdGlvblxuXHR2YXIgbG9uZ2VzdFllYXJUcmFuc2l0aW9uVGltZSA9IHR5cGVvZiBsb25nZXN0WWVhclRyYW5zaXRpb25UaW1lICE9PSAndW5kZWZpbmVkJyA/IGxvbmdlc3RZZWFyVHJhbnNpdGlvblRpbWUgOiA0MDAwO1xuXHQvLyBUaGlzIHNjYWxlIHRha2VzIHRoZSBudW1iZXIgb2Ygbm9kZXMgZm9yIGEgZ2l2ZW4geWVhciBhcyBpbnB1dFxuXHQvLyBhbmQgb3V0cHV0cyB0aGUgdHJhbnNpdGlvbiB0aW1lLCBiYXNlZCBvbiBhIHRocmVzaG9sZCBtYXBwaW5nXG5cdHZhciB0aHJlc2hvbGRTY2FsZSA9IGQzLnNjYWxlLnRocmVzaG9sZCgpXG5cdFx0LmRvbWFpbihbMSwgMywgMTAsIDIwLCAzMF0pXG5cdFx0LnJhbmdlKFtcblx0XHRcdFx0ZW1wdHlZZWFyVHJhbnNpdGlvblRpbWUsICAvLyB6ZXJvIG5vZGVzXG5cdFx0XHRcdGxvbmdlc3RZZWFyVHJhbnNpdGlvblRpbWUgKiAuMiwgIC8vIG9uZSBvciB0d28gbm9kZXNcblx0XHRcdFx0bG9uZ2VzdFllYXJUcmFuc2l0aW9uVGltZSAqIC41LCAvLyAzIHRvIDlcblx0XHRcdFx0bG9uZ2VzdFllYXJUcmFuc2l0aW9uVGltZSAqIC43LCAgLy8gMTAgdG8gMTlcblx0XHRcdFx0bG9uZ2VzdFllYXJUcmFuc2l0aW9uVGltZSAqIC44NSwgIC8vIDIwIHRvIDI5XG5cdFx0XHRcdGxvbmdlc3RZZWFyVHJhbnNpdGlvblRpbWUgIC8vIDMwK1xuXHRcdFx0XHRdKTtcblx0dmFyIHllYXJSYW5nZSA9IGdyYXBoLmdyYXBoLnllYXJSYW5nZTtcblx0XG5cdC8vIFB1dCB0aGUgdHJhbnNpdGlvbiB0aW1lIGZvciBlYWNoIHllYXIgaW50byBhbiBvYmplY3Rcblx0Zm9yICh2YXIgaT15ZWFyUmFuZ2VbMF07IGk8PXllYXJSYW5nZVsxXTsgaSsrKSB7XG5cdFx0Ly8gdHJhbnNpdGlvblRpbWVQZXJZZWFyW2ldID0gMTAwMDtcblx0XHR0cmFuc2l0aW9uVGltZVBlclllYXJbaV0gPSB0aHJlc2hvbGRTY2FsZShncmFwaC5ncmFwaC5ub2RlQ291bnRzUGVyWWVhcltpXSk7XG5cdH1cblx0cmV0dXJuIHRyYW5zaXRpb25UaW1lUGVyWWVhcjtcbn07XG5cbmNpdGF0aW9uVmlzLnllYXJUaWNrQ2xpY2tFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gQWRkIGNsaWNrIGxpc3RlbmVycyB0byBsaW5lIGNoYXJ0IGF4aXMgdGljayBsYWJlbHMgKHllYXJzKS5cbiAgICAvLyBPbiBjbGljaywgYSBuZXcgZGVzdGluYXRpb24gbm9kZSB3aWxsIGJlIHNldC5cbiAgICBkMy5zZWxlY3RBbGwoJy55ZWFyVGljaycpXG4gICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAvLyBHZXQgdGhlIHllYXIgKGFzIGludGVnZXIpXG4gICAgICAgICAgICB2YXIgZGVzdGluYXRpb25ZZWFyID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEteWVhcicpO1xuICAgICAgICAgICAgLy8gU3RvcCBhbGwgdHJhbnNpdGlvbnMgb24gbm9kZXMgYW5kIGxpbmtzXG4gICAgICAgICAgICBkMy5zZWxlY3RBbGwoJy5ub2RlLCAubGluaycpLnRyYW5zaXRpb24oKS5kdXJhdGlvbigwKTtcblxuXHRcdFx0Y2l0YXRpb25WaXMuZWdvR3JhcGhWaXMubmV3RGVzdGluYXRpb25Ob2RlKGRlc3RpbmF0aW9uWWVhcik7XG4gICAgICAgIH0pO1xufTtcblxuZnVuY3Rpb24gbWFpbigpIHtcblxuaWYgKGNpdGF0aW9udmlzX2RhdGEgPT09ICdBQk9SVCcpIHtcblx0cmV0dXJuO1xufVxuXG5kMy5zZWxlY3QoJyNtYWluRGl2JykuYXBwZW5kKCdwJylcblx0LmF0dHIoXCJjbGFzc1wiLCBcImxvYWRpbmdUZXh0XCIpXG5cdC50ZXh0KCdMb2FkaW5nLi4uJyk7XG5cbmQzLmpzb24oY2l0YXRpb252aXNfZGF0YSwgZnVuY3Rpb24oZXJyb3IsIGdyYXBoKSB7XG5cdGNvbnNvbGUubG9nKGVycm9yKTtcblx0aWYgKGVycm9yKSB7XG5cdFx0dmFyIGNvbnRhY3RFbWFpbCA9ICdqcG9ydGVub0B1dy5lZHUnO1xuXHRcdHZhciBlcnJIdG1sID0gJ1RoZXJlIHdhcyBhbiBlcnJvciBnZW5lcmF0aW5nIHRoZSB2aXN1YWxpemF0aW9uLCBvciBlbHNlIGRhdGEgcHJvY2Vzc2luZyBpcyBzdGlsbCBpbiBwcm9ncmVzcy4gVHJ5IHJlbG9hZGluZyB0aGUgcGFnZSBsYXRlciwgb3IgZ2VuZXJhdGluZyB0aGUgdmlzdWFsaXphdGlvbiBhZ2Fpbi4gSWYgdGhlIHByb2JsZW0gcGVyc2lzdHMsIDxhIGhyZWY9XCJtYWlsdG86JyArIGNvbnRhY3RFbWFpbCArICdcIj5jb250YWN0IHRoZSBhZG1pbmlzdHJhdG9yPC9hPi4nXG5cdFx0JCggJy5sb2FkaW5nVGV4dCcgKS5odG1sKCBlcnJIdG1sIClcblx0XHRcdC5jc3MoIHsnY29sb3InOiAncmVkJ30gKTtcblx0XHR0aHJvdyBlcnJvcjtcblx0fVxuXG5cdC8vIEdldCB0aGUgbW9zdCBjb21tb24gRG9tYWluIElEcyBmb3IgdGhlIGVnbyBhdXRob3IncyBwYXBlcnNcblx0dmFyIGRvbWFpbnNOZXN0ID0gZDMubmVzdCgpXG5cdFx0LmtleShmdW5jdGlvbihkKSB7IHJldHVybiBkLkRvbWFpbklEOyB9KS5zb3J0VmFsdWVzKGQzLmRlc2NlbmRpbmcpXG5cdFx0LnJvbGx1cChmdW5jdGlvbihsZWF2ZXMpIHsgcmV0dXJuIGxlYXZlcy5sZW5ndGg7IH0pXG5cdFx0LmVudHJpZXMoZ3JhcGgubm9kZXNbMF0ucGFwZXJzKTtcblx0ZG9tYWluc05lc3Quc29ydChmdW5jdGlvbihhLGIpIHsgcmV0dXJuIGQzLmRlc2NlbmRpbmcoYS52YWx1ZXMsIGIudmFsdWVzKTsgfSk7XG5cdC8vIHN0b3JlIGFzIGEgbm9kZSBwcm9wZXJ0eVxuXHRncmFwaC5ub2Rlc1swXS5Eb21haW5Db3VudHMgPSBkb21haW5zTmVzdDtcblx0Y29uc29sZS5sb2coZ3JhcGgpO1xuXHQvLyBkMy5zZWxlY3QoJyNpbmZvRGl2JykuYXBwZW5kKCdwJykudGV4dChncmFwaC5ub2Rlc1swXS5BdXRob3JOYW1lKTtcblxuXHR2YXIgZGVmYXVsdF9vcHRpb25zID0gY2l0YXRpb25WaXMuZGVmYXVsdF9vcHRpb25zLCBcblx0XHRzdW1tYXJ5U3RhdGlzdGljcyA9IGNpdGF0aW9uVmlzLnN1bW1hcnlTdGF0aXN0aWNzLFxuXHRcdGVnb0dyYXBoRGF0YSA9IGNpdGF0aW9uVmlzLmVnb0dyYXBoRGF0YSxcblx0ICAgIGxpbmVDaGFydERhdGEgPSBjaXRhdGlvblZpcy5saW5lQ2hhcnREYXRhLFxuXHRcdGV2ZW50TGlzdGVuZXJzID0gY2l0YXRpb25WaXMuZXZlbnRMaXN0ZW5lcnM7XG5cblx0dmFyIG9wdGlvbnMgPSBkZWZhdWx0X29wdGlvbnMuZGVmYXVsdHM7XG5cdGNvbnNvbGUubG9nKG9wdGlvbnMpO1xuXG5cdGdyYXBoID0gc3VtbWFyeVN0YXRpc3RpY3MuYWRkU3VtbWFyeVN0YXRpc3RpY3MoZ3JhcGgpO1xuXHRjaXRhdGlvblZpcy5ncmFwaF9kYXRhID0gZWdvR3JhcGhEYXRhLnByZXBhcmVfZWdvR3JhcGhEYXRhKGdyYXBoKTtcblx0Y2l0YXRpb25WaXMucHVibGljYXRpb25zX2RhdGEgPSBsaW5lQ2hhcnREYXRhLnByZXBhcmVEYXRhX2Vnb0F1dGhvclB1YmxpY2F0aW9ucyhncmFwaCk7XG5cdGNpdGF0aW9uVmlzLmFsbF9jaXRhdGlvbnNfZGF0YSA9IGxpbmVDaGFydERhdGEucHJlcGFyZURhdGFfYWxsQ2l0YXRpb25zKGdyYXBoKTtcblx0Y2l0YXRpb25WaXMuZWlnZW5mYWN0b3Jfc3VtX2RhdGEgPSBsaW5lQ2hhcnREYXRhLnByZXBhcmVEYXRhX2F1dGhvckVpZ2VuZmFjdG9yU3VtKGdyYXBoKTtcblxuXHQvLyBWaXN1YWxpemF0aW9uIG9iamVjdHMgZ28gaGVyZVxuXHRjaXRhdGlvblZpcy5lZ29HcmFwaFZpcyA9IG5ldyBlZ29HcmFwaFZpcyhjaXRhdGlvblZpcy5ncmFwaF9kYXRhKTtcblx0Ly8gY2l0YXRpb25WaXMucHVibGljYXRpb25zTGluZUNoYXJ0ID0gbmV3IGxpbmVDaGFydEJ5WWVhcihjaXRhdGlvblZpcy5wdWJsaWNhdGlvbnNfZGF0YSk7XG5cdC8vIGNpdGF0aW9uVmlzLmNpdGF0aW9uc0xpbmVDaGFydCA9IG5ldyBsaW5lQ2hhcnRCeVllYXIoY2l0YXRpb25WaXMuYWxsX2NpdGF0aW9uc19kYXRhKTtcblx0Ly8gY2l0YXRpb25WaXMuZWlnZW5mYWN0b3JTdW1MaW5lQ2hhcnQgPSBuZXcgbGluZUNoYXJ0QnlZZWFyKGNpdGF0aW9uVmlzLmVpZ2VuZmFjdG9yX3N1bV9kYXRhKTtcblx0Y2l0YXRpb25WaXMubGluZUNoYXJ0cyA9IFtdO1xuXHRjaXRhdGlvblZpcy5saW5lQ2hhcnRzLnB1c2gobmV3IGxpbmVDaGFydEJ5WWVhcihjaXRhdGlvblZpcy5wdWJsaWNhdGlvbnNfZGF0YSkpO1xuXHRjaXRhdGlvblZpcy5saW5lQ2hhcnRzLnB1c2gobmV3IGxpbmVDaGFydEJ5WWVhcihjaXRhdGlvblZpcy5hbGxfY2l0YXRpb25zX2RhdGEpKTtcblx0Y2l0YXRpb25WaXMubGluZUNoYXJ0cy5wdXNoKG5ldyBsaW5lQ2hhcnRCeVllYXIoY2l0YXRpb25WaXMuZWlnZW5mYWN0b3Jfc3VtX2RhdGEpKTtcblxuXHRvcHRpb25zLnRyYW5zaXRpb25UaW1lUGVyWWVhciA9IGNpdGF0aW9uVmlzLmdldFRyYW5zaXRpb25UaW1lUGVyWWVhcihncmFwaCk7XG5cblx0Y2l0YXRpb25WaXMuZWdvR3JhcGhWaXMuaW1wb3J0RGVmYXVsdE9wdGlvbnMob3B0aW9ucyk7XG5cdGZvciAodmFyIGk9MDsgaTxjaXRhdGlvblZpcy5saW5lQ2hhcnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2l0YXRpb25WaXMubGluZUNoYXJ0c1tpXS5pbXBvcnREZWZhdWx0T3B0aW9ucyhvcHRpb25zKTtcblx0fVxuXG5cdGNpdGF0aW9uVmlzLmVnb0dyYXBoVmlzLmluaXQoKTtcblx0Zm9yICh2YXIgaT0wOyBpPGNpdGF0aW9uVmlzLmxpbmVDaGFydHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaXRhdGlvblZpcy5saW5lQ2hhcnRzW2ldLmluaXQoKTtcblx0fVxuXHQkLmV2ZW50LnRyaWdnZXIoe1xuXHRcdHR5cGU6IFwiaW5pdENvbXBsZXRlXCIsXG5cdH0pO1xuXG5cdGNpdGF0aW9uVmlzLmxpbmVDaGFydHNbMF0uYWRkVGl0bGUoXCJOdW1iZXIgb2YgcHVibGljYXRpb25zXCIpO1xuXHRjaXRhdGlvblZpcy5saW5lQ2hhcnRzWzFdLmFkZFRpdGxlKFwiTnVtYmVyIG9mIGNpdGF0aW9ucyByZWNlaXZlZFwiKTtcblx0dmFyIGN0cnR5cGUgPSBnZXRRdWVyeVZhcmlhYmxlKFwiY3RydHlwZVwiKTtcblx0aWYgKCFjdHJ0eXBlKSB7XG5cdFx0Y3RydHlwZSA9IFwiYXV0aG9yXCI7XG5cdH1cblx0Y29uc29sZS5sb2coY3RydHlwZSk7XG5cdC8vIGNpdGF0aW9uVmlzLmxpbmVDaGFydHNbMl0uYWRkVGl0bGUoXCJTdW0gb2YgZWlnZW5mYWN0b3IgZm9yIHRoaXMgYXV0aG9yJ3MgcHVibGljYXRpb25zIGJ5IHllYXJcIik7XG5cdGNpdGF0aW9uVmlzLmxpbmVDaGFydHNbMl0uYWRkVGl0bGUoXCJTdW0gb2YgZWlnZW5mYWN0b3IgZm9yIHRoaXMgXCIgKyBjdHJ0eXBlICsgXCIncyBwdWJsaWNhdGlvbnMgYnkgeWVhclwiKTtcblxuXG5cdCQoIGRvY3VtZW50ICkub24oIFwieWVhckNoYW5nZVwiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgY3VyclllYXIgPSBjaXRhdGlvblZpcy5lZ29HcmFwaFZpcy5jdXJyWWVhcjtcblx0XHRmb3IgKHZhciBpPTA7IGk8Y2l0YXRpb25WaXMubGluZUNoYXJ0cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y2l0YXRpb25WaXMubGluZUNoYXJ0c1tpXS5tb3ZlWWVhckluZGljYXRvcihjdXJyWWVhcik7XG5cdFx0fVxuXHR9KTtcblxuXHQvLyBIYWNrIHRvIGxhYmVsIHRoZSBwdWJsaWNhdGlvbnMgbGluZSBjaGFydC4gVE9ETzogRml4IHRoaXMgbGF0ZXJcblx0Ly8gdmFyIHB1YnMgPSBkMy5zZWxlY3QoY2l0YXRpb25WaXMucHVibGljYXRpb25zTGluZUNoYXJ0LmNoYXJ0RGl2WzBdWzBdKTtcblx0dmFyIHB1YnMgPSBkMy5zZWxlY3QoY2l0YXRpb25WaXMubGluZUNoYXJ0c1swXS5jaGFydERpdlswXVswXSk7XG5cdHZhciBwdWJzQXhpc0xhYmVsID0gcHVicy5zZWxlY3QoJy55LmF4aXMnKS5zZWxlY3QoJy5heGlzTGFiZWwnKTtcblx0cHVic0F4aXNMYWJlbC50ZXh0KCdOdW0gcHVibGljYXRpb25zJyk7XG5cdC8vIEhhY2sgdG8gYWx0ZXIgZWlnZW5mYWN0b3IgbGluZSBjaGFydC4gVE9ETzogRml4IHRoaXMgbGF0ZXJcblx0Ly8gY2l0YXRpb25WaXMuZWlnZW5mYWN0b3JTdW1MaW5lQ2hhcnQueUF4aXMudGlja0Zvcm1hdChkMy5mb3JtYXQoJ2UnKSk7XG5cdGNpdGF0aW9uVmlzLmxpbmVDaGFydHNbMl0ueUF4aXMudGlja0Zvcm1hdChkMy5mb3JtYXQoJ2UnKSk7XG5cdC8vIHZhciBFRkNoYXJ0ID0gZDMuc2VsZWN0KGNpdGF0aW9uVmlzLmVpZ2VuZmFjdG9yU3VtTGluZUNoYXJ0LmNoYXJ0RGl2WzBdWzBdKTtcblx0dmFyIEVGQ2hhcnQgPSBkMy5zZWxlY3QoY2l0YXRpb25WaXMubGluZUNoYXJ0c1syXS5jaGFydERpdlswXVswXSk7XG5cdEVGQ2hhcnQuc2VsZWN0KCcueS5heGlzJylcblx0XHQvLyAuY2FsbChjaXRhdGlvblZpcy5laWdlbmZhY3RvclN1bUxpbmVDaGFydC55QXhpcylcblx0XHQuY2FsbChjaXRhdGlvblZpcy5saW5lQ2hhcnRzWzJdLnlBeGlzKVxuXHRcdC5zZWxlY3QoJy5heGlzTGFiZWwnKS50ZXh0KCdTdW0gb2YgRWlnZW5mYWN0b3InKTtcblxuXG5cdC8vIEV2ZW50IGxpc3RlbmVyc1xuXHQvLyBFdmVudCBsaXN0ZW5lcnMgdGhhdCBhY3QgYWNyb3NzIGRpZmZlcmVudCB2aXN1YWxpemF0aW9uIG9iamVjdHMgZ28gaGVyZVxuXHRjaXRhdGlvblZpcy55ZWFyVGlja0NsaWNrRXZlbnRMaXN0ZW5lcigpO1xuXHRcblx0ZDMuc2VsZWN0KFwiLmxvYWRpbmdUZXh0XCIpLnJlbW92ZSgpO1xufSk7XG4vLyB9KShjaXRhdGlvbnZpc19kYXRhKTtcbn1cblxuLy8gbWFpbigpO1xuLy9cbmV4cG9ydCBkZWZhdWx0IG1haW47XG4iLCJpbXBvcnQgbWFpbiBmcm9tICcuL2NpdGF0aW9uVmlzX01haW4uanMnO1xuZXhwb3J0IHsgbWFpbiB9O1xuXG4iXSwic291cmNlUm9vdCI6IiJ9