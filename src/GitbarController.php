<?php

namespace Danj\Gitbar;

use Illuminate\Routing\Controller,
	Illuminate\Http\Response,
	Config;

class GitbarController extends Controller{

	private $repo 	= null;
	private $bin 	= null;

	public function __construct(){
		$this->repo = Config::get('gitbar.repo');
		$this->bin 	= Config::get('gitbar.git_bin');
	}

	private function runCommand($command){

		$descriptorspec = array(
			1 => ['pipe', 'w'],
			2 => ['pipe', 'w'],
		);

		$pipes = [];

		$resource = proc_open($command, $descriptorspec, $pipes, $this->repo, []);
		$stdout = stream_get_contents($pipes[1]);
		$stderr = stream_get_contents($pipes[2]);

		$status = trim(proc_close($resource));
		if ($status) throw new Exception($stderr);
		return $stdout;

	}
	
	public function branches(){

		$Branches = $this->runCommand('git branch');

		$Branches = explode("\n", rtrim($Branches, "\n"));

		$ReturnBranches = [];


		foreach($Branches as $Branch){
			
			$Current = false;
			
			if(substr($Branch, 0, 1) == "*") $Current = true;

			$ReturnBranches[] = [
				"Name" => substr($Branch, 2),
				"Current"	 => $Current
			];

		}

		return $ReturnBranches;

	}



	public function checkout($branch){

	}

	public function outputBar(){

		$Branches = $this->branches();

		$CurrentBranch = null;
		foreach($Branches as $Branch){
			if($Branch['Current']){
				$CurrentBranch = $Branch['Name'];
				break;
			}
		}

		return view('gitbar::main')->with([
			'Branches'		=> $Branches,
			'CurrentBranch' => $CurrentBranch
		]);
	}

	public function css(){
		$content = file_get_contents(__DIR__.'/resources/css/gitbar.css');
		return new Response(
			$content, 200, ['Content-Type' => 'text/css']
		);
	}

	public function js(){
		$content = file_get_contents(__DIR__.'/resources/js/gitbar.js');
		return new Response(
			$content, 200, ['Content-Type' => 'text/javascript']
		);
	}
}