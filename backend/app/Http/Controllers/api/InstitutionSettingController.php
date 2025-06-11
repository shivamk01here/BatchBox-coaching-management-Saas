<?php
namespace App\Http\Controllers\api;

use Illuminate\Http\Request;
use App\Models\InstitutionSetting;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class InstitutionSettingController extends Controller
{
    public function get()
    {
        $institutionId = Auth::user()->institution_id;
        $setting = InstitutionSetting::where('institution_id', $institutionId)->first();
        return response()->json($setting);
    }

    public function save(Request $request)
    {
        $institutionId = Auth::user()->institution_id;

        $setting = InstitutionSetting::updateOrCreate(
            ['institution_id' => 1],
            [
                'ob_name' => $request->ob_name,
                'ob_enable' => $request->ob_enable,
                'logo' => $request->logo,
                'moto' => $request->moto,
                'description' => $request->description,
                'domain' => $request->domain
            ]
        );

        return response()->json(['success' => true, 'data' => $setting]);
    }
}