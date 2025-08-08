<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\User;
use App\Models\Job;

class Company extends Model
{
    use HasFactory;
    public $incrementing = false; 
    protected $keyType = 'string';

    protected $fillable=[
        'name',
        'address',
        'phone',
        'email',
        'website',
        'industry',
        'description',
        'logo',
        'founded_at',
    ];

    /**
     * Get the users associated with the company.
     */
    public function users(): HasMany
        {
            return $this->hasMany(User::class); 
        }

    /**
     * Get the jobs associated with the company.
     */
    public function jobs(): HasMany
        {
            return $this->hasMany(Job::class);
        }

    /**
     * Get the owner of the company.
     */
    public function owner(): BelongsTo
        {
            return $this->belongsTo(User::class, 'owner_id');
        }

    public function getSizeAttribute()
        {
            return $this->employees()->count();
        }

    public static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $model->id = (string) \Illuminate\Support\Str::uuid();
        });
    }
}
