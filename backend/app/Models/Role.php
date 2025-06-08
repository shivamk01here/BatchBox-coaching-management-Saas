<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    protected $primaryKey = 'roleID';
    
    protected $fillable = [
        'name',
        'description',
        'institutionID'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function institution()
    {
        return $this->belongsTo(Institution::class, 'institutionID', 'institutionID');
    }

    public function users()
    {
        return $this->hasMany(User::class, 'roleID', 'roleID');
    }

    public function isAdmin()
    {
        return $this->name === 'admin';
    }

    public function isTeacher()
    {
        return $this->name === 'teacher';
    }

    public function isStudent()
    {
        return $this->name === 'student';
    }

    public function isStaff()
    {
        return $this->name === 'staff';
    }
}