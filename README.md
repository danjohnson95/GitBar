# GitBar
Quickly and easily manage your git repository for your staging area

###Getting Started
Getting GitBar installed on your existing Laravel application is easy. Just require this package in your `composer.json` file and then run a cheeky `composer update`

```
composer require gitbar
```

After that, you'll need to include the following ServiceProvider to the `providers` array in your `config/app.php` file.

```
'Danj\Gitbar\GitbarServiceProvider'
```

Now run the following command to publish the vendor assets (CSS, JavaScript and config files)

```
php artisan vendor:publish --provider="Danj\Gitbar"
```

By default, GitBar is turned off.
To enable it, just add this line to your `.env` file.

```
GITBAR_ENABLE=true
```

GitBar should **NEVER** be enabled on a production environment, so please make sure you only enable this on your local workstation and staging area.

###Configuration
GitBar uses some routes for grabbing branches and checking them out. The default URI is `/gitbar/~`, but if this conflicts with anything in your application, you can change the `route_prefix` in the config file. This is located in `config/gitbar.php`.

###And that's it!
Issues and Pull Requests are welcome.

If this package makes development easier for you or your team, donations are greatly appreciated! :beer:
