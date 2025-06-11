<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Institution extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';
    
    protected $fillable = [
        'name',
        'email', 
        'phone',
        'address',
        'type'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function users()
    {
        return $this->hasMany(User::class, 'institutionID', 'institutionID');
    }

    public function roles()
    {
        return $this->hasMany(Role::class, 'institutionID', 'institutionID');
    }

    public function admins()
    {
        return $this->hasMany(User::class, 'institutionID', 'institutionID')
                    ->whereHas('role', function($query) {
                        $query->where('name', 'admin');
                    });
    }

    public function teachers()
    {
        return $this->hasMany(User::class, 'institutionID', 'institutionID')
                    ->whereHas('role', function($query) {
                        $query->where('name', 'teacher');
                    });
    }

    public function students()
    {
        return $this->hasMany(User::class, 'institutionID', 'institutionID')
                    ->whereHas('role', function($query) {
                        $query->where('name', 'student');
                    });
    }

    public function staff()
    {
        return $this->hasMany(User::class, 'institutionID', 'institutionID')
                    ->whereHas('role', function($query) {
                        $query->where('name', 'staff');
                    });
    }
}