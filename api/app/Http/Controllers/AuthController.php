<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Support\Facades\Crypt;

use App\Models\Users;


class AuthController extends Controller
{

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username'        => 'required|min:6',
            'password'        => 'required|min:6'
        ],
        [
            'required'  => ':attribute harus diisi',
            'min'       => ':attribute minimal :min karakter'
        ]);

        if ($validator->fails()) {
            $resp = [
                'success' => false,
                'message' => $validator->errors()->first(),
                ];
            return response()->json($resp, 422);
            die();
        }

        $user = Users::where('username', $request->username)->first();
        if( !$user )
        {
            if ($validator->fails()) {
                $resp = [
                    'success' => false,
                    'message' => "Username/password invalid",
                    ];
                return response()->json($resp, 422);
                die();
            }
        }else{
            return response()->json(['success' => true, 'message' => 'Berhasil login']);
        }
    }

}