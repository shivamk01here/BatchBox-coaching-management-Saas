<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $primaryKey = 'userID';

    protected $fillable = [
        'name',
        'email',
        'password',
        'institutionID',
        'roleID',
        'staffID',
        'studentID',
        'phone',
        'date_of_birth',
        'gender',
        'address',
        'status'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'date_of_birth' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function institution()
    {
        return $this->belongsTo(Institution::class, 'institutionID', 'institutionID');
    }

    public function role()
    {
        return $this->belongsTo(Role::class, 'roleID', 'roleID');
    }

    // Helper methods
    public function isAdmin()
    {
        return $this->role && $this->role->name === 'admin';
    }

    public function isTeacher()
    {
        return $this->role && $this->role->name === 'teacher';
    }

    public function isStudent()
    {
        return $this->role && $this->role->name === 'student';
    }

    public function isStaff()
    {
        return $this->role && $this->role->name === 'staff';
    }

    public function getFullNameAttribute()
    {
        return $this->name;
    }

    public function getDisplayIdAttribute()
    {
        return $this->staffID ?: $this->studentID ?: 'N/A';
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeByInstitution($query, $institutionID)
    {
        return $query->where('institutionID', $institutionID);
    }

    public function scopeByRole($query, $roleName)
    {
        return $query->whereHas('role', function($q) use ($roleName) {
            $q->where('name', $roleName);
        });
    }
}