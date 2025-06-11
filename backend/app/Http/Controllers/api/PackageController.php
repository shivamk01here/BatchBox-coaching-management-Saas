<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class PackageController extends Controller
{
    public function index()
    {
        $packages = DB::select("SELECT * FROM packages");
        return response()->json($packages);
    }

    public function show($id)
    {
        $package = DB::selectOne("SELECT * FROM packages WHERE id = ?", [$id]);
        $subjects = DB::select("SELECT s.* FROM subjects s JOIN package_subject ps ON s.id = ps.subject_id WHERE ps.package_id = ?", [$id]);

        return response()->json([
            'package' => $package,
            'subjects' => $subjects
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'price' => 'required|numeric',
            'duration' => 'required|integer',
            'subject_ids' => 'required|array'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $id = DB::table('packages')->insertGetId([
            'name' => $request->name,
            'price' => $request->price,
            'duration' => $request->duration,
        ]);

        foreach ($request->subject_ids as $subjectId) {
            DB::table('package_subject')->insert([
                'package_id' => $id,
                'subject_id' => $subjectId
            ]);
        }

        return response()->json(['success' => true]);
    }
}