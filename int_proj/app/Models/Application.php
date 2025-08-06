<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;
use App\Models\JobOffer;

class Application extends Model
{
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
}
