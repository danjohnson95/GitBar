<?php namespace Danj\Gitbar;

use Closure,
	Exception;

class Middleware{

	public function handle($request, Closure $next){

		try{
			$response = $next($request);
		} catch(Exception $e){
			dd($e);
		}

		return $this->modifyResponse($request, $response);

	}

	public function modifyResponse($request, $response){

		if(
			$response->isRedirection() ||
				(
					$response->headers->has('Content-Type') &&
            		strpos($response->headers->get('Content-Type'), 'html') === false
        		)
        	|| $request->getRequestFormat() !== 'html'

        ) return $response;

		$cssModified = $this->lastModified("css");
		$jsModified = $this->lastModified("js");

		$html = "<meta name='gitbar-get-route' content='".route('gitbar.branches')."'>";
		$html.= "<meta name='gitbar-checkout-route' content='".route('gitbar.checkout', ['branch' => null])."'>";

		$html .= sprintf(
            '<link rel="stylesheet" type="text/css" href="%s?%s">' . "\n",
            route('gitbar.css'),
            $cssModified
        );

        $html .= sprintf(
            '<script type="text/javascript" src="%s?%s"></script>' . "\n",
            route('gitbar.js'),
            $jsModified
        );

		$content = $response->getContent();

		$pos = strripos($content, '</head>');

        if (false !== $pos) {
            $content = substr($content, 0, $pos).$html.substr($content, $pos);
        } else {
            $content = $content.$html;
        }

        $response->setContent($content);
        return $response;

	}

	public function lastModified($file){
		switch($file){
			case "css":
				return filemtime(__DIR__.'/resources/css/gitbar.css');
			case "js":
				return filemtime(__DIR__.'/resources/js/gitbar.js');
			default:
				return 0;
		}
	}
}
