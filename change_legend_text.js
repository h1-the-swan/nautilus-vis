var citationVis = citationVis || {};

// $( document ).on( "initComplete", function() {
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
