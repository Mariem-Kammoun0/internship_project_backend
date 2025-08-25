<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\User;
use App\Models\JobOffer;

class Company extends Model
{
    use HasFactory;

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
    public function employees(): HasMany
        {
            return $this->hasMany(User::class, 'company_id');
        }

    /**
     * Get the jobs associated with the company.
     */
    public function jobOffers(): HasMany
        {
            return $this->hasMany(JobOffer::class, 'company_id', 'id');
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


    //scope methods for filtering companies
    public function scopeByIndustry($query, $industry)
    {
        return $query->where('industry', $industry);
    }
    public function scopeBySize($query, $sizemin, $sizemax)
    {
        return $query->whereBetween('size', [$sizemin, $sizemax]);
    }
    public function scopeByLocation($query, $location)
    {
        return $query->where('address', 'like', '%' . $location . '%');
    }
    public function scopeByName($query, $name)
    {
        return $query->where('name', 'like', '%' . $name . '%');
    }

}
