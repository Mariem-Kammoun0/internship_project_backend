<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Company;
use App\Models\Application;

class JobOffer extends Model
{
    use HasFactory;
    public $incrementing = false; 
    protected $keyType = 'string';

    protected $fillable = [
        'title',
        'description',
        'salary',
        'employment_type',
        'duration',
        'type_of_contract',
        'requirements',
        'application_deadline',
        'company_id',
        'motivation_letter_required',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
 
    public function applications()
    {
        return $this->hasMany(Application::class);
    }

    public function getFormattedSalaryAttribute()
    {
        return number_format($this->salary, 2);
    }

    public function getEmploymentTypeLabelAttribute()
    {
        return match ($this->employment_type) {
            'full_time' => 'Full Time',
            'part_time' => 'Part Time',
            'contract' => 'Contract',
            'temporary' => 'Temporary',
            default => 'undefined',
        };
    }
    public function getTypeOfContractLabelAttribute()
    {
        return match ($this->type_of_contract) {
            'permanent' => 'Permanent',
            'fixed_term' => 'Fixed Term',
            'freelance' => 'Freelance',
            default => 'undefined',
        };
    }    

    public function scopeActive($query)
    {
        return $query->where('application_deadline', '>', now());
    }
    public function scopeExpired($query)
    {
        return $query->where('application_deadline', '<=', now());
    }  

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($jobOffer) {
            if (!$jobOffer->id) {
                $jobOffer->id = (string) \Illuminate\Support\Str::uuid();
            }
        });
    }
   
}
