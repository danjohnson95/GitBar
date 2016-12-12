var gitbarGetRoute, gitbarHashRoute, gitbarBranchData, gitbarSelectHTML, gitbarOuter, gitbarSelect, gitbarCurrent, gitbarHash;

document.addEventListener("DOMContentLoaded", function(event) {

 	var gitbarInjectHtml = '<div id="gitbar">' +
					'<div class="gitbar-top">' +
						'Gitbar' +
					'</div>' +
					'<table>' +
						'<tr>' +
							'<td>Current Branch</td>' +
							'<td class="gitbar-current"><strong><div class="gitbar-load"></div></strong></td>' +
						'</tr>' +
						'<tr>' +
							'<td>Last Commit</td>' +
							'<td class="gitbar-hash"><strong><div class="gitbar-load"></div></strong><small></small></td>' +
						'</tr>' +
						'<tr>' +
							'<td>Checkout</td>' +
							'<td>' +
								'<select></select>' +
							'</td>' +
						'</tr>' +
					'</table>' +
				'</div>';


	document.body.innerHTML += gitbarInjectHtml;

	gitbarGetRoute = document.head.querySelector("[name='gitbar-get-route']").content,
	gitbarHashRoute = document.head.querySelector("[name='gitbar-hash-route']").content,
	gitbarBranchData = null,
	gitbarSelectHTML = "",
	gitbarOuter = document.querySelector('#gitbar'),
	gitbarSelect = gitbarOuter.querySelector('select'),
	gitbarCurrent = gitbarOuter.querySelector('.gitbar-current strong');
	gitbarHash = gitbarOuter.querySelector('.gitbar-hash strong');

	gitbarGetBranches();
	gitbarGetLatestCommitHash();

});

function gitbarGetBranches(){
	

	var gitbarXhr = new XMLHttpRequest();

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
		    }
    	}
	}

	gitbarXhr.send(null);

}

function gitbarGetLatestCommitHash(){
	var hashXhr = new XMLHttpRequest();

	hashXhr.open('GET', gitbarHashRoute);
	
	hashXhr.onreadystatechange = function(){
		if(hashXhr.readyState === 4){
			if(hashXhr.status === 200){
				gitbarHash.innerHTML = hashXhr.responseText;
			}
		}
	}
	hashXhr.send(null);

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