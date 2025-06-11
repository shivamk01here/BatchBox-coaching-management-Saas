<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EventController extends Controller
{
    public function index()
    {
        return DB::table('events')->get();
    }

    public function store(Request $request)
    {
        $data = $request->only(['title', 'teacher', 'location', 'from', 'to', 'status']);
        $id = DB::table('events')->insertGetId($data);
        return response()->json(['success' => true, 'id' => $id]);
    }

    public function show($id)
    {
        return DB::table('events')->where('id', $id)->first();
    }
}
