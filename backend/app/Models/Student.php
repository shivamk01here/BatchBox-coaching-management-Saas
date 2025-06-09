<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Student extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'first_name', 'last_name', 'email', 'phone', 'gender', 'dob', 'batch_id', 'is_active'
    ];

    public function batch()
    {
        return $this->belongsTo(Batch::class);
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }

    public function reports()
    {
        return $this->hasMany(Report::class);
    }

    public function subjects()
    {
        return $this->belongsToMany(Subject::class)
                    ->withPivot('marks_obtained', 'grade')
                    ->withTimestamps();
    }

    public function fees()
    {
        return $this->hasOne(Fee::class);
    }

    public function feedbacks()
    {
        return $this->morphMany(Feedback::class, 'feedbackable');
    }

    // A "virtual" attribute that doesn't exist directly in the database but is computed from other attributes.
    // below is accessor
    public function getFullNameAttribute()
    {
        return $this->first_name . ' ' . $this->last_name;
    }

    //mutator
    public function setPhoneAttribute($value){
        $this->attributes['phone'] = preg_replace('/\D/', '', $value);
    }

    //scope - a reusable query
    public function scopeActive($query){
        return $query->where('is_active', true);
    }

    //global scope
    protected static function booted()
    {
        static::addGlobalScope('notDeleted', fn ($builder) => $builder->whereNull('deleted_at'));
    }
}
