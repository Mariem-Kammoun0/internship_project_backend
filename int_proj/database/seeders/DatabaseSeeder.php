<?php

namespace Database\Seeders;

use App\Models\Application;
use App\Models\Company;
use App\Models\JobOffer;
use App\Models\User;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        
        $employer = User::factory()->employer()->create();
        $employees = User::factory(5)->jobSeeker()->create();
        $unverifiedUser = User::factory()->jobSeeker()->unverified()->create();
        $company=Company::factory()->create(['employer_id' => $employer->id]);
        $employer->company_id = $company->id;
        $employer->save();

        JobOffer::factory(5)->create([
            'company_id' => $company->id,
        ]);

        $job=JobOffer::all();
        foreach ($employees as $employee) {
            Application::factory()->create([
                'job_offer_id' => $job->random()->id,
                'user_id' => $employee->id,
                'motivation_letter' => 'i am very motivated',
            ]);
        }

    }
}
