document.addEventListener("DOMContentLoaded", function(event) {

	//Document is ready.
	//Here's the HTML.

	var gitbar = document.createElement('div');
	var gitbarCurrent = document.createElement('div');
	var gitbarBranches = document.createElement('div');
	var gitbarButton = document.createElement('button');
	var loading = document.createElement('div');
	var loadingSpan = document.createElement('span');
	var gitbarStrongBranch = document.createElement('strong');
	var branchSelect = document.createElement('select');

	loadingSpan.className = "load";
	loading.className = "load";

	gitbarStrongBranch.appendChild(loadingSpan);

	gitbar.id = "gitbar";
	gitbarCurrent.className = "gitbar-current";
	gitbarBranches.className = "gitbar-branches";
	gitbarButton.id = "checkout-branch";
	gitbarButton.appendChild(loading);

	gitbarCurrent.innerHTML =	"Current Branch";
	gitbarCurrent.appendChild(gitbarStrongBranch);
	gitbarBranches.innerHTML = "Switch branch";
	gitbarBranches.appendChild(branchSelect);
	gitbarBranches.appendChild(gitbarButton);

	gitbar.appendChild(gitbarCurrent);
	gitbar.appendChild(gitbarBranches);

	document.body.appendChild(gitbar);

});