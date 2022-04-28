<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Support\Facades\Crypt;

use App\Models\Users;

class UserController extends Controller
{
    function index()
    {
        $row = Users::get();

        return response()->json(['data' => $row]);
    }

    function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fullname'        => 'required',
            'username'        => 'required|min:6|unique:m_users',
            'password'        => 'required|min:6',
            'address'         => 'required',
            'phone'           => 'required',
        ],
        [
            'required'  => ':attribute harus diisi',
            'numeric'   => ':attribute harus angka',
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

        $user = new Users;
        $user->name = $request->get('fullname');
        $user->username = $request->get('username');
        $user->password = Crypt::encrypt($request->get('password'));
        $user->address = $request->get('address');
        $user->phone = $request->get('phone');
        $user->save();

        return response()->json(['success' => true, 'message' => 'Data user berhasil diinput']);

    }

    function update($id, Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fullname'        => 'required',
            'username'        => 'required|min:6|unique:m_users,username,'. $id,
            'address'         => 'required',
            'phone'           => 'required',
        ],
        [
            'required'  => ':attribute harus diisi',
            'numeric'   => ':attribute harus angka',
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

        $user = Users::where('id', $id)->update([
                    'name' => $request->get('fullname'),
                    'username' => $request->get('username'),
                    'address' => $request->get('address'),
                    'phone' => $request->get('phone')
                ]);

        return response()->json(['success' => true, 'message' => 'Data user berhasil diupdate']);

    }

    function delete($id)
    {
        Users::where('id', $id)->delete();

        return response()->json(['success' => true, 'message' => 'Data user berhasil dighapus']);

    }
}
