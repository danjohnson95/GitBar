document.addEventListener("DOMContentLoaded", function(event) {

	var load = "<div class='gitbar-loading'></div>";
	var html = 	"<div id='gitbar'>" +
					"<div class='gitbar-header'>" +
						"<div class='gitbar-close-btn'></div>" +
						"<div class='gitbar-title'>Gitbar</div>" +
					"</div>" +
				 	"<div class='gitbar-body'>" +
						"<table>" +
							"<tr>" +
								"<td>Current Branch</td>" +
								"<td id='gitbar-current'>"+load+"</td>" +
							"</tr>" +
							"<tr>" +
								"<td>Last Commit</td>" +
								"<td id='gitbar-commit'>"+load+"</td>" +
							"</tr>" +
							"<tr>" +
								"<td>Checkout</td>" +
								"<td id='gitbar-select'>"+load+"</td>" +
							"</tr>" +
						"</table>" +
					"</div>" +
				"</div>";

	document.body.innerHTML += html;

	gitbarGetBranches();

});

function gitbarGetBranches(){
	var gitbarGetRoute = document.head.querySelector("[name='gitbar-get-route']").content;

	var gitbarXhr = new XMLHttpRequest(),
		gitbarBranchData = null,
		gitbarSelectHTML = "",
		gitbarOuter = document.querySelector('#gitbar'),
		gitbarSelect = gitbarOuter.querySelector('#gitbar-select'),
		gitbarCurrent = gitbarOuter.querySelector('#gitbar-current'),
		gitbarCommit = gitbarOuter.querySelector('#gitbar-commit');

	gitbarXhr.open('GET', gitbarGetRoute);

	gitbarXhr.onreadystatechange = function () {
		if (gitbarXhr.readyState === 4) {
		    if (gitbarXhr.status === 200){

		    	gitbarBranchData = JSON.parse(gitbarXhr.responseText);
		    	var select = "<select>";

		    	for(var i=0;i<gitbarBranchData.length;i++){
		    		select += "<option "+(gitbarBranchData[i].selected ? "selected" : "")+" value='"+gitbarBranchData[i].name+"'>"+gitbarBranchData[i].name+"</option>";
		    		if(gitbarBranchData[i].selected){
		    			gitbarCurrent.innerHTML = gitbarBranchData[i].name;
		    			gitbarCommit.innerHTML = gitbarBranchData[i].commit;
		    		}
		    	}
		    	gitbarSelect.innerHTML = select;

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
