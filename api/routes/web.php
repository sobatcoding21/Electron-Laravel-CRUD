<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->get('/key', function () use ($router) {
    return \Illuminate\Support\Str::random(32);
});

$router->post('login', [ 'uses' => 'AuthController@login']);

$router->get('users', [ 'uses' => 'UserController@index']);
$router->post('users', [ 'uses' => 'UserController@create']);
$router->post('users/update/{id}', [ 'uses' => 'UserController@update']);
$router->get('users/delete/{id}', [ 'uses' => 'UserController@delete']);
