<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\JobOffer>
 */
class JobOfferFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => $this->faker->uuid(),
            'title' => $this->faker->jobTitle(),
            'description' => $this->faker->paragraph(),
            'salary' => $this->faker->numberBetween(30000, 120000),
            'employment_type' => $this->faker->randomElement(['full_time', 'part_time', 'contract','temporary', 'undefined']),
            'type_of_contract' => $this->faker->randomElement(['permanent', 'fixed_term', 'freelance', 'undefined']),
            'duration' => $this->faker->text(10),
            'requirements' => $this->faker->text(),
            'application_deadline' => $this->faker->dateTimeBetween('now', '+1 year'),
            'motivation_letter_required' => $this->faker->boolean(),
            'company_id' => null,
        ];
    }

    /**
     * Indicate that the job offer is for a specific company.
     */
    public function forCompany($companyId): static
    {
        return $this->state(function (array $attributes) use ($companyId) {
            return [
                'company_id' => $companyId,
            ];
        });
    }
    
}
