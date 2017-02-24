<?php namespace Danj\Gitbar;

use Illuminate\Support\ServiceProvider;

class GitbarServiceProvider extends ServiceProvider{

	public function register(){

	}

	private function checkIfShouldUse(){
		if($this->app->runningInConsole()) return false;
		if(!$this->app['config']->get('gitbar.enabled')) return false;
		return true;
	}

	private function setRoutes(){

		$routeConfig = [
            'namespace' => 'Danj\Gitbar',
            'prefix' 	=> $this->app['config']->get('gitbar.route_prefix').'gitbar',
        ];

		$this->app['router']->group($routeConfig, function($router) {
			$router->get('branches', ['uses' => 'GitbarController@branches', 'as' => 'gitbar.branches']);
			$router->post('checkout/{branch}', ['uses' => 'GitbarController@checkout', 'as' => 'gitbar.checkout']);
			$router->get('css', ['uses' => 'GitbarController@css', 'as' => 'gitbar.css']);
			$router->get('js', ['uses' => 'GitbarController@js', 'as' => 'gitbar.js']);
			$router->get('test', 'GitbarController@outputBar');
		});

	}

	private function setMiddleware(){
		$this->app['Illuminate\Contracts\Http\Kernel']
		->pushMiddleware('Danj\Gitbar\Middleware');
	}

	public function boot(){

		$this->mergeConfigFrom(__DIR__.'/../config/gitbar.php', 'gitbar');

		$this->publishes([
			__DIR__.'/resources' => public_path('vendor/danj/gitbar')
		], 'gitbar');

		if(!$this->checkIfShouldUse()) return false;

		$this->setRoutes();
		$this->setMiddleware();

	}


}
