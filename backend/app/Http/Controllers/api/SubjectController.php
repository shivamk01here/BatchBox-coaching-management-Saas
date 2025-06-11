<?php


namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class SubjectController extends Controller
{
    public function index()
    {
        $subjects = DB::select('SELECT id, name, status FROM subjects');
        return response()->json(['success' => true, 'data' => $subjects]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'status' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }

        DB::insert('INSERT INTO subjects (name, status, created_at, updated_at) VALUES (?, ?, NOW(), NOW())', [
            $request->name,
            $request->status
        ]);

        return response()->json(['success' => true, 'message' => 'Subject added successfully']);
    }
}