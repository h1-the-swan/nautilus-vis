var citationVis = citationVis || {};

$( document ).on( "initComplete", function() {
	var egoGraphVis = citationVis.egoGraphVis;
	var domainsMult = egoGraphVis.data.graph.DomainsMult
	if (!domainsMult) {
		return;
	}
	$.each(domainsMult, function(k, v) {
		d3.select("#mainDiv").append("p")
			.text(k)
			.on("click", function() {switchDomain(k);});
	});

	function switchDomain(domainType) {
		egoGraphVis.data.graph.Domains = domainsMult[domainType];
		for (var i = 0, len = egoGraphVis.notEgoNodes.length; i < len; i++) {
			var thisNode = egoGraphVis.notEgoNodes[i];
			thisNode.DomainID = thisNode.DomainMult[domainType];
		}
		egoGraphVis.getDomainsThisGraph();
		d3.selectAll(".legendItem").remove();
		egoGraphVis.legendInit();
	}
});


