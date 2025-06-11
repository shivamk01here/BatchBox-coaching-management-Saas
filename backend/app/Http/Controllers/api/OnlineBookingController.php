<?php


namespace App\Http\Controllers\api;

use Illuminate\Http\Request;
use App\Models\InstitutionSetting;
use App\Models\Institution;
use App\Models\Event;
use App\Models\Subject;
use App\Http\Controllers\Controller;

class OnlineBookingController extends Controller
{
    public function getDetails($obName)
    {
        $setting = InstitutionSetting::where('ob_name', $obName)->first();
        if (!$setting) {
            return response()->json(['error' => 'Not found'], 404);
        }

        $institution = Institution::find($setting->institution_id);

        $eventsWithSubjectData = \Illuminate\Support\Facades\DB::table('events')
        ->join('subjects', 'events.subject_id', '=', 'subjects.id')
        ->where('events.institution_id', $institution->id)
        ->select('events.*', 'subjects.name as subject_name')
        ->get(); // Get all results as a collection of StdClass objects
    
        // Step 2: Use Laravel's Collection groupBy method.
        // The DB facade's `get()` method returns a Collection of StdClass objects,
        // so you can still use collection methods like `groupBy`.
        $classes = $eventsWithSubjectData->groupBy('subject_name');

        return response()->json([
            'institution' => [
                'name' => $institution->name,
                'logo' => $setting->logo,
                'moto' => $setting->moto,
                'description' => $setting->description
            ],
            'classes' => $classes
        ]);
    }
}
