<?php


class Helpers{

	//get addmin prefix from here
	public static function admin_url($uri_path = ''){
		return url('admin/'.$uri_path);
	}
	//get addmin prefix from here
	public static function client_url($uri_path = ''){
		return url($uri_path);
	}
	
}