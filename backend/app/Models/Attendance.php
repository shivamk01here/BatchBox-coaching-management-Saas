<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Attendance extends Model
{
    use HasFactory;

    protected $fillable = ['student_id', 'classroom_session_id', 'status', 'remarks', 'session_date'];

    protected $dates = ['session_date'];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function session()
    {
        return $this->belongsTo(ClassroomSession::class, 'classroom_session_id');
    }
}
