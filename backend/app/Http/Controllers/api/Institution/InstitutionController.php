<?php

namespace App\Http\Controllers\api\institution;

//services
use App\Services\InstitutionService;
use Illuminate\Support\Facades\Validator;

// controllers
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class InstitutionController extends Controller
{
    protected InstitutionService $institutionService;

    public function __construct(InstitutionService $institutionService)
    {
        $this->institutionService = $institutionService;
    }


    /**
     * Register a new Institution and Owner
     *
     * @group Authentication
     *
     * @bodyParam institution_name string required Name of the institution. Example: BatchBox Academy
     * @bodyParam owner_name string required Full name of the owner. Example: Shivam Kumar
     * @bodyParam surname string optional Owner's surname. Example: Kumar
     * @bodyParam email string required Email address. Example: owner@batchbox.com
     * @bodyParam password string required Password. Example: secret123
     *
     * @response 201 {
     *   "success": true,
     *   "message": "Institution registered successfully",
     *   "user": { "id": 1, "email": "owner@batchbox.com" }
     * }
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'institution_name' => 'required|string|max:255',
            'owner_name' => 'required|string|max:255',
            'surname' => 'nullable|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }

        return $this->institutionService->registerInstitution($request);
    }

}
