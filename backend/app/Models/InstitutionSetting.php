<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InstitutionSetting extends Model
{
    protected $fillable = [
        'institution_id', 'ob_name', 'ob_enable', 'logo', 'moto', 'description', 'domain'
    ];
}

