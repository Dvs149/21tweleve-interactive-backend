<?php
namespace App\Http\Controllers\API;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController {
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;


    public function successJson( $message = '' , $data = [] ) {
    	return response()->json([
            "status" => true, 
          	"message" => $message,
          	"data" => is_array($data) ? $data : [],
        ], 200);
    }

    public function errorJson( $message = '' , $errors = [] ) {
    	return response()->json([
          	"message" => $message,
          	"errors" => is_array($errors) ? $errors : [],
        ], 422);
    }
}