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
        return $this->belongsTo(Company::class,  'company_id', 'id');
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


    //define scopes for filtering job offers

     public function scopeTitle($q, string $title)
    {
        return $title ? $q->where('title', 'like', "%{$title}%") : $q;
    }

    public function scopeEmploymentType($query, $employmentType)
    {
        return $employmentType ? $query->where('employment_type', $employmentType) : $query;
    }

    public function scopeTypeOfContract($query, $typeOfContract)
    {
        return $typeOfContract ? $query->where('type_of_contract', $typeOfContract) : $query;
    }

    public function scopeSalaryRange($query, $minSalary, $maxSalary)
    {
        if ($minSalary && $maxSalary) {
            return $query->whereBetween('salary', [$minSalary, $maxSalary]);
        } elseif ($minSalary) {
            return $query->where('salary', '>=', $minSalary);
        } elseif ($maxSalary) {
            return $query->where('salary', '<=', $maxSalary);
        }
        return $query;
    }

    public function scopeDuration($query, $duration)
    {
        return $duration ? $query->where('duration', $duration) : $query;
    }

    public function scopeActive($q)
    {
        return $q->where('application_deadline', '>', now());
    }

    public function scopeCompany($query, $companyId)
    {

        return $companyId ? $query->where('company_id', $companyId) : $query;

    }

    public function scopeCompanyLocation($query, $location)
    {
        $companyIds = Company::where('location', $location)->pluck('id');
        return $companyIds->isNotEmpty() ? $query->whereIn('company_id', $companyIds) : $query;
    }

    public function scopeRequirements()
    {
        return $this->requirements ? explode(',', $this->requirements) : [];
    }

    //scope methods for sorting job offers

    public function scopeSortBy($query, $sort)
    {
        switch ($sort) {
            case 'salary_asc':
                return $query->orderBy('salary', 'asc');
            case 'salary_desc':
                return $query->orderBy('salary', 'desc');
            case 'newest':
                return $query->orderBy('created_at', 'desc');
            default:
                return $query;
        }
    }
}
