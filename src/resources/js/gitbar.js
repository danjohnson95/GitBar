document.addEventListener("DOMContentLoaded", function(event) {

	var gitbarInjectHtml = '<div id="gitbar">' + 
		 		'<div class="gitbar-current">' +
		 			'Current Branch' +
	 				'<strong>' +
	 					'<span class="load"></span>' +
	 				'</strong>' +
 				'</div>' +
 				'<div class="gitbar-branches">' +
 					'Switch Branch' +
 					'<select></select>' +
 					'<button id="checkout-branch" onclick="gitbarCheckoutBranch()">' +
 						'<div class="load"></div>' +
 					'</button>' +
 				'</div>' +
 			'</div>';

	document.body.innerHTML += gitbarInjectHtml;

	gitbarGetBranches();

});

function gitbarGetBranches(){
	console.log('yo');
	var gitbarGetRoute = document.head.querySelector("[name='gitbar-get-route']").content;

	var gitbarXhr = new XMLHttpRequest(),
		gitbarBranchData = null,
		gitbarSelectHTML = "",
		gitbarOuter = document.querySelector('#gitbar'),
		gitbarSelect = gitbarOuter.querySelector('select'),
		gitbarCurrent = gitbarOuter.querySelector('.gitbar-current strong'),
		gitbarBtn = gitbarOuter.querySelector('button');

	gitbarXhr.open('GET', gitbarGetRoute);

	gitbarXhr.onreadystatechange = function () {
		if (gitbarXhr.readyState === 4) {
		    if (gitbarXhr.status === 200){
		    	
		    	gitbarBranchData = JSON.parse(gitbarXhr.responseText);

		    	for(var i=0;i<gitbarBranchData.length;i++){
		    		
		    		gitbarSelect.innerHTML += "<option "+(gitbarBranchData[i].Current ? "selected" : "")+"value=\""+gitbarBranchData[i].Name+"\">"+gitbarBranchData[i].Name+"</option>";

		    		if(gitbarBranchData[i].Current){
		    			gitbarCurrent.innerHTML = gitbarBranchData[i].Name;
		    		}

		    	}

		    	gitbarBtn.innerHTML = "Checkout";

		    }
    	}
	}

	gitbarXhr.send(null);

}

function gitbarCheckoutBranch(){
	var gitbarCheckoutRoute = document.head.querySelector("[name='gitbar-checkout-route']").content,
		gitbarSelect = document.querySelector('#gitbar select'),
		selectedBranch = gitbarSelect.selectedOptions[0].text,
		gitbarXhr = new XMLHttpRequest();

	gitbarXhr.open('GET', gitbarCheckoutRoute+"/"+selectedBranch);
	
	//TODO: Add an overlay over the content so the page can't be used while switching branches.

	gitbarXhr.onreadystatechange = function(){
		if(gitbarXhr.readyState === 4){
			if(gitbarXhr.status === 200){
				location.href = location.href;
			}
		}
	}
	gitbarXhr.send(null);
}