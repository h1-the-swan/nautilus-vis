var citationVis = citationVis || {};

$( document ).on( "initComplete", {focus_id: focus_id}, function(event) {
	// pass focus_id through the event data
	var focus_id = event.data.focus_id;
	focus_id = parseInt(focus_id)
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
	// if (getParameterByName('rcvmsg') === null) return; // add "rcvmsg=1" to the URL query parameters to enable this, otherwise do nothing

	var egoGraphVis = citationVis.egoGraphVis;

	// open the timelineVis when center node is clicked
	if (typeof focus_id == 'undefined' || !focus_id) {
		var focus_id = getParameterByName('focusid');
	}
	if (focus_id) {
		$( '.centerNode' ).click( function() {
			var url = Flask.url_for('generate_colldata_from_collection', {'focus_id': focus_id});
			window.open(url, '_blank', 'location=0');
		});
	}

	$(window).on('storage', message_receive);

	// https://stackoverflow.com/questions/28230845/communication-between-tabs-or-windows
	// receive message
	//
	function message_receive(ev) 
	{
		if (ev.originalEvent.key!='message') return; // ignore other keys
		var message = JSON.parse(ev.originalEvent.newValue);
		if (!message) return; // ignore empty message or message reset

		// act on the message
		if (message.command == 'timelineVis:paperItem:mouseover') highlightLinkedPapers(message.data.pid);
		if (message.command == 'timelineVis:paperItem:mouseout') linkedPapersMouseout(message.data.pid);
	}

	function highlightLinkedPapers(paper_id) {
		var highlightedNodes = [];

		d3.selectAll(".node").filter(function(d) {
			// return d.targetPaperIDs && d.targetPaperIDs.indexOf(paper_id) != -1;
			if (d.targetPaperIDs && d.targetPaperIDs.indexOf(paper_id) != -1) {
				highlightedNodes.push(d);
				return true;
			}
		})
		.classed("linkedToTimeline", true);

		// d3.selectAll(".link.toEgo").filter(function(d) {
		d3.selectAll(".link").filter(function(d) {
			return highlightedNodes.indexOf(d.source) != -1;
		})
		.classed("linkedToTimeline", true);
	}

	function linkedPapersMouseout(paper_id) {
		// d3.selectAll(".node").filter(function(d) {
		// 	return d.targetPaperIDs && d.targetPaperIDs.indexOf(paper_id) != -1;
		// })
		// .classed("linkedToTimeline", false);
		d3.selectAll(".linkedToTimeline").classed("linkedToTimeline", false);
	}
});



