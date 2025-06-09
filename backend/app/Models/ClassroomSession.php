<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ClassroomSession extends Model
{
    use HasFactory;

    protected $fillable = ['batch_id', 'subject_id', 'topic', 'session_date', 'duration_minutes', 'remarks'];

    protected $dates = ['session_date'];

    public function batch()
    {
        return $this->belongsTo(Batch::class);
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }
}

