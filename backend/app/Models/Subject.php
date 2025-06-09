<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Subject extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'code', 'description'];

    public function students()
    {
        return $this->belongsToMany(Student::class)
                    ->withPivot('marks_obtained', 'grade')
                    ->withTimestamps();
    }

    public function classroomSessions()
    {
        return $this->hasMany(ClassroomSession::class);
    }
}
