<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\API\Controller;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // dd( $request->all());
        $request->validate([
            'email' => 'required|email|unique:App\Models\User,email|max:100',
            'password' => 'required|confirmed|min:6',
            'name' => 'required|max:25'
        ]);
        
        $user = new User();
        $user->password = Hash::make($request->password);
        $user->email = $request->email;
        $user->name = $request->name;
        
        if($request->path()=="admin/register"){
            $user->role = 'admin';
        }
        $user->save();

        

        $credentials = $request->only('email', 'password');
        
        if (Auth::attempt($credentials)) {
            	$device_name = ($request->device_name) ? $request->device_name : config("app.name");
                return $this->successJson('User registered successfully.', [
                    "email" => Auth::user()->email,
                    "token" => Auth::user()->createToken($device_name)->plainTextToken
                ]);
        }

        return response()->json(["email" => $request->email, "password" => $request->password], 422);
    }
    public function login(Request $request){

        $request->validate([
            'email' => 'required|email|exists:users,email',
            'password' => 'required'
        ],[
            'email.exists' => 'Email does not match.', 
        ]);

        $remember_me = ($request->remember_me) ? true : false;

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials, $remember_me)) {
                $user = Auth::user();
                
                $device_name = ($request->device_name) ? $request->device_name : config("app.name");
                return $this->successJson('Login Successfully.', [
                    "email" => Auth::user()->email,
                    "token" => Auth::user()->createToken($device_name)->plainTextToken
                ]);
                
        }else{
            
            throw ValidationException::withMessages(["password"=>'The credentials are incorrect']);
        }

    }

    public function test(){
        return 'working';
    }

    public function logout(Request $request){

        Auth::user()->currentAccessToken()->delete();
        return $this->successJson('User logged out successfully.', []);
    }

}
// 2|wGiHwR03CZJTVNHy0iO8fKLblevunNRFRUkiZ90y