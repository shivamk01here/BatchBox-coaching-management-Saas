<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Batch extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'start_date', 'end_date', 'status'];

    public function students()
    {
        return $this->hasMany(Student::class);
    }

    public function classroomSessions()
    {
        return $this->hasMany(ClassroomSession::class);
    }

    public function reports()
    {
        return $this->hasMany(Report::class);
    }
}
