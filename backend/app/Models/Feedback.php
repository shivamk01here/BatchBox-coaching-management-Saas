<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    protected $fillable = [
        'feedbackable_id',
        'feedbackable_type',
        'given_by',
        'remarks',
        'rating',
    ];

    public function feedbackable()
    {
        return $this->morphTo();
    }

    public function giver()
    {
        return $this->belongsTo(User::class, 'given_by');
    }
}
