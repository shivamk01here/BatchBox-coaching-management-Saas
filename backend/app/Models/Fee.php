<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Fee extends Model
{
    use HasFactory;

    protected $fillable = ['student_id', 'amount', 'paid', 'paid_at', 'due_date', 'remarks'];

    protected $casts = [
        'paid' => 'boolean',
        'paid_at' => 'datetime',
        'due_date' => 'datetime',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
