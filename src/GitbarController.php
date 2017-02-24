<?php namespace Danj\Gitbar;

use Illuminate\Routing\Controller,
	Illuminate\Http\Response,
	Config,
	Request;

class GitbarController extends Controller{

	/**
	 * Stores the path of the current repository
	 * @var string
	 */
	private $repo 	= null;

	/**
	 * Stores the path of the Git executable
	 * @var string
	 */
	private $bin 	= null;

	/**
	 * Starts a new instance of the Gitbar Controller,
	 * gets config variables out and sets them in the
	 * object.
	 * @return void
	 */
	public function __construct(){
		$this->repo = Config::get('gitbar.repo');
		$this->bin 	= Config::get('gitbar.git_bin');
	}

	/**
	 * Gets the branches for the current repo, as well as which one is currently
	 * checked out and the latest commit hash for each branch.
	 * @return array
	 */
	public function branches(){
		$cmd = `git branch -v`;
		$out = [];
		foreach(explode("\n", $cmd) as $line){
			$branch = preg_split('/\s+/', $line);
			if(!isset($branch[1])) continue;
			$out[] = [
				'selected' => $branch[0] ? true : false,
				'name' => $branch[1],
				'commit' => $branch[2]
			];
		}
		return $out;
	}



	/**
	 * Checks out the branch specified.
	 * @return array An array containing the branch name and commit hash
	 */
	public function checkout(){
		$branch = Request::get('branch');
		$cmd = `git checkout {$branch} 2>&1`;
		if(substr($cmd, 0, 6) == "error:"){
			$status = 500;
			$arr = [
				'success' => false,
				'msg' => substr($cmd, 7)
			];
		}else{
			$status = 200;
			$arr = [
				'success' => true
			];
		}

		return new Response(
			json_encode($arr), $status, ['Content-Type' => 'application/json']
		);
	}


	/**
	 * Returns a response containing the CSS file for GitBar
	 * @return Response
	 */
	public function css(){
		$content = file_get_contents(__DIR__.'/resources/css/gitbar.css');
		return new Response(
			$content, 200, ['Content-Type' => 'text/css']
		);
	}

	/**
	 * Returns a response containing the JS file for GitBar
	 * @return Response
	 */
	public function js(){
		$content = file_get_contents(__DIR__.'/resources/js/gitbar.js');
		return new Response(
			$content, 200, ['Content-Type' => 'text/javascript']
		);
	}
}
