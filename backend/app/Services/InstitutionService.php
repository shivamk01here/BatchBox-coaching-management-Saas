<?php

namespace App\Services;

use App\Helpers\InstitutionHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Jobs\SendVerificationEmail;

class InstitutionService
{
    public function registerInstitution(Request $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->only('institution_name', 'owner_name', 'surname', 'email', 'password');
            $result = InstitutionHelper::createInstitutionWithOwner($data);

            // SendVerificationEmail::dispatch($result['user']);

            DB::commit();
            return response()->json(['success' => true, 'user' => $result['user'], 'institution' => $result['institution']], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['success' => false, 'message' => 'Registration failed', 'error' => $e->getMessage()], 500);
        }
    }
}