<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BatchController extends Controller
{
    public function index()
    {
        return response()->json(['status' => 'working']);
    }
}
