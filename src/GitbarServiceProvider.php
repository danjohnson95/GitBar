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

        //$jsModified = $this->getModifiedTime('js');
        //$cssModified = $this->getModifiedTime('css');

		$this->loadViewsFrom(__DIR__.'/resources/views/', 'gitbar');

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

        $this->app['Illuminate\Contracts\Http\Kernel']->pushMiddleware('Danj\Gitbar\Middleware');

	}


}