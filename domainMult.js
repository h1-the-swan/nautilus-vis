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


