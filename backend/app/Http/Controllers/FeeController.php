<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FeeController extends Controller
{
    public function status(Request $request){
        return response()->json(['status' => 'working']);
    }
}
