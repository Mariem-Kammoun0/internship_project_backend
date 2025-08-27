<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\User;
use App\Models\JobOffer;

class Application extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_offer_id',
        'user_id',
        'motivation_letter',
        'applied_at',
    ];

    /**
     * Get the job offer associated with the application.
     */
    public function jobOffer(): BelongsTo
    {
        return $this->belongsTo(JobOffer::class);
    }

    /**
     * Get the user who applied for the job.
     */
    public function applicant(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

     public function scopeStatus($q, string $status)
    {
        return $status ? $query->where('status', $status) : $query;
    }

}
