document.addEventListener("DOMContentLoaded", function(event) {

	//Document is ready.
	//Here's the HTML.

	var gitbar = document.createElement('div');
	var gitbarCurrent = document.createElement('div');
	var gitbarBranches = document.createElement('div');
	var gitbarButton = document.createElement('button');
	gitbar.id = "gitbar";
	gitbarCurrent.className = "gitbar-current";
	gitbarBranches.className = "gitbar-branches";
	gitbarButton.id = "checkout-branch";
	gitbarButton.innerHTML = "test";

	gitbarCurrent.innerHTML =	"<div class='gitbar-current'>Current Branch <strong></strong></div>";
	gitbarBranches.innerHTML = "Switch branch";
	gitbarBranches.appendChild(gitbarButton);

	gitbar.appendChild(gitbarCurrent);
	gitbar.appendChild(gitbarBranches);

	document.body.appendChild(gitbar);

});