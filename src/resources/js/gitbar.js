var gitbar = {

	elements: {},
	routes: {},

	/**
	 * Gets elements which we'll reuse throughout this file,
	 * stores them inside this object.
	 */
	getElements: function(){
		var outer = document.getElementById('gitbar');
		this.elements.outer = outer;
		this.elements.select = outer.querySelector('#gitbar-select'),
		this.elements.current = outer.querySelector('#gitbar-current'),
		this.elements.commit = outer.querySelector('#gitbar-commit'),
		this.elements.error = outer.querySelector('#gitbar-error');
	},

	/**
	 * Finds a meta tag in the head matching the name specified, and
	 * returns the contents.
	 * @param string The name of the meta tag
	 * @return string The content of the meta tag
	 */
	getMetaContent: function(name){
		return document.head.querySelector('[name="'+name+'"]').content;
	},

	/**
	 * Gets the routes we need to use for AJAX requests from meta tags,
	 * stores them inside this object.
	 */
	getRoutes: function(){
		this.routes.branch = this.getMetaContent('gitbar-get-route');
		this.routes.checkout = this.getMetaContent('gitbar-checkout-route');
	},

	/**
	 * Registers an event listener on ready, and runs the start() function.
	 * This is the starting point for GitBar
	 */
	init: function(){
		document.addEventListener('DOMContentLoaded', gitbar.start);
	},

	/**
	 * Starts up GitBar by injecting the HTML, grabbing references to
	 * the elements, registering event listeners and running the
	 * initial AJAX request to grab branches
	 */
	start: function(){
		gitbar.injectHTML();
		gitbar.getRoutes();
		gitbar.getElements();
		gitbar.registerEventListeners();
		gitbar.requestBranches();
	},

	/**
	 * Injects the GitBar html with no content inside - just loading
	 * spinners. Puts this HTML at the end of the body
	 */
	injectHTML: function(){
		var load = "<div class='gitbar-loading'></div>";
		var html = "<div id='gitbar'>" +
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
							"<div id='gitbar-error'></div>" +
						"</div>" +
					"</div>";
		document.body.innerHTML += html;
	},

	/**
	 * Registers event listeners on GitBar elements.
	 */
	registerEventListeners: function(){
		gitbar.elements.select.addEventListener('change', function(){
			var opt = this.querySelector('select');
			var val = opt.options[opt.selectedIndex].value;
			gitbar.startBranchCheckout(val);
		});
	},

	/**
	 * Initialises the AJAX request for grabbing the available branches.
	 * @see gitbar.start()
	 */
	requestBranches: function(){
		var xhr = new XMLHttpRequest(),
			branchData = null;

		xhr.open('GET', gitbar.routes.branch);

		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
		    	branchData = JSON.parse(xhr.responseText);
				gitbar.buildAndInjectBranchHTML(branchData);
	    	}
		}

		xhr.send(null);
	},

	/**
	 * Builds and injects the HTML for the select tag which contains the
	 * branches for this repo. Also sets the HTML for the current branch
	 * and for the latest commit.
	 * @see gitbar.requestBranches()
	 */
	buildAndInjectBranchHTML: function(branchData){
		var select = "<select>",
			branch = null;

		for(var i=0;i<branchData.length;i++){
			branch = branchData[i];
			select += "<option "+(branch.selected ? "selected" : "")+" value='"+branch.name+"'>"+branch.name+"</option>";
			if(branch.selected){
				gitbar.elements.current.innerHTML = branch.name;
				gitbar.elements.commit.innerHTML = branch.commit;
			}
		}

		gitbar.elements.select.innerHTML = select+"</select>";
	},

	/**
	 * Initialises the AJAX request for checking out a new branch.
	 * Once the AJAX returns a success, we just refresh the page.
	 * @param string The name of the branch
	 */
	startBranchCheckout: function(branch){
		var xhr = new XMLHttpRequest();
		xhr.open('POST', gitbar.routes.checkout, true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		if(gitbar.elements.outer.classList.contains('error'))
			gitbar.elements.outer.classList.remove('error')

		xhr.onreadystatechange = function(){
			var resp = JSON.parse(xhr.responseText);
			resp.msg = resp.msg.replace(/\n/g, "<br>");
			if(xhr.readyState === 4 && xhr.status === 200 && resp.success){
				location.href = location.href;
			}else{
				gitbar.elements.error.innerHTML = resp.msg;
				if(!gitbar.elements.outer.classList.contains('error'))
					gitbar.elements.outer.classList.add('error')
			}
		}

		xhr.send("branch="+branch);
	}

};

gitbar.init();
