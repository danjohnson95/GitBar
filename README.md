# GitBar
Quickly and easily manage your git repository for your staging area

![alt tag](https://danjohnson.xyz/img/gitbar.jpg)

### Getting Started
Getting GitBar installed on your existing Laravel application is easy. Just run the following command in your project

```
$ composer require danj/gitbar
```

After that, you'll need to include the following ServiceProvider to the `providers` array in your `config/app.php` file.

```
Danj\Gitbar\GitbarServiceProvider::class
```

By default, GitBar is enabled based on the `APP_DEBUG` variable. However you can override this behaviour by adding this line in your `.env` file

```
GITBAR_ENABLE=true
```

Please see below for further configurations.

> GitBar should **NEVER** be enabled on a production environment, so please make sure you only enable this on your local workstation and staging area.

### Configuration
GitBar can be configured for your needs. You can either publish the config file and edit this directly, or use .env variables.

#### Publishing Config File

```
$ php artisan vendor:publish --provider="Danj\Gitbar"
```

A new file will be created in `/config/gitbar.php`. You can modify this directly.

#### Using .env variables

The following .env variables are available for GitBar:

- GITBAR_ENABLE
- GITBAR_PREFIX
- GITBAR_BIN
- GITBAR_REPO
- GITBAR_SOURCE

Please see the comments in the [config file](/src/config/gitbar.php) for more info about these.

### And that's it!
Issues and Pull Requests are welcome.

If this package makes development easier for you or your team, donations are greatly appreciated! :beer:
