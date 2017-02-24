<?php

return array(

	/*
	|--------------------------------------------------------------------------
	| Gitbar Enable
	|--------------------------------------------------------------------------
	|
	| This toggles GitBar on and off. You can use GITBAR_ENABLE in your env
	| to set it depending on the environment. If this isn't set, it will
	| use the APP_DEBUG variable instead and display GitBar when this
	| is true. Otherwise, it'll be disabled.
	|
	*/
    'enabled' => env('GITBAR_ENABLE', env('APP_DEBUG', false)),

	/*
	|--------------------------------------------------------------------------
	| Route Prefix
	|--------------------------------------------------------------------------
	|
	| GitBar uses some routes to access assets and run AJAX requests. By
	| default, the /gitbar prefix is used. However if this conflicts
	| with your application, you can manually specify which prefix
	| you'd like to use.
	|
	*/
    'route_prefix' => env('GITBAR_PREFIX', 'gitbar'),

	/*
	|--------------------------------------------------------------------------
	| Git Bin
	|--------------------------------------------------------------------------
	|
	| Here you can specify the location of the Git executable.
	| Typically on a Linux enivronment this will be /usr/bin/git
	| However a Windows environment may have Git installed elsewhere.
	|
	*/
    'git_bin' => env('GITBAR_BIN', '/usr/bin/git'),

	/*
	|--------------------------------------------------------------------------
	| Git Repo Path
	|--------------------------------------------------------------------------
	|
	| This is the path to your Git repository, the same directory where
	| you'd run your Git commands.
	|
	*/
    'repo' => env('GITBAR_REPO', '/'),

	/*
	|--------------------------------------------------------------------------
	| Source Path
	|--------------------------------------------------------------------------
	|
	| This is the path to where your source files are located. By default,
	| GitBar will use the same path as your repo. However if you have
	| your source files separate from your .git folder, specify the
	| path to your source files here.
	|
	*/
	'source_path' => env('GITBAR_SOURCE', '')

);
