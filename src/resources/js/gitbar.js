document.addEventListener("DOMContentLoaded", function(event) {

	var html = '<div id="gitbar">' + 
		 		'<div class="gitbar-current">' +
		 			'Current Branch' +
	 				'<strong>' +
	 					'<span class="load"></span>' +
	 				'</strong>' +
 				'</div>' +
 				'<div class="gitbar-branches">' +
 					'Switch Branch' +
 					'<select></select>' +
 					'<button id="checkout-branch">' +
 						'<div class="load"></div>' +
 					'</button>' +
 				'</div>' +
 			'</div>';

	document.body.innerHTML += html;

});