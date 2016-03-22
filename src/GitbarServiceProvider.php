<?

namespace Danj\Gitbar;

class GitbarServiceProvider extends \Illuminate\Support\ServiceProvider{

	public function register(){
		
	}
	
	public function boot(){

		$this->mergeConfigFrom(__DIR__.'/../config/gitbar.php', 'gitbar');

		$this->publishes([
			__DIR__.'/resources' => public_path('vendor/danj/gitbar')
		], 'gitbar');

		$Config = $this->app['config'];

		if($this->app->runningInConsole() || !$Config->get('gitbar.enabled')){
			return;
		}

		$this->loadViewsFrom(__DIR__.'/resources/views/', 'gitbar');

		$routeConfig = [
            'namespace' => 'Danj\Gitbar',
            'prefix' 	=> $this->app['config']->get('gitbar.route_prefix').'gitbar',
        ];

        $this->app['router']->group($routeConfig, function($router) {
            $router->get('branches', 'GitbarController@branches');
            $router->post('checkout/{branch}', 'GitbarController@checkout');
            $router->get('test', 'GitbarController@outputBar');
        });


	}


}