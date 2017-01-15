
var citationVis = citationVis || {};

$( document ).on( "initComplete", function() {
	var egoGraphVis = citationVis.egoGraphVis;

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
	}

	function highlightLinkedPapers(paper_id) {
		d3.selectAll(".node").filter(function(d) {
			return d.targetPaperIDs && d.targetPaperIDs.indexOf(paper_id) != 0;
		})
		.attr("r", 20);
	}
});



