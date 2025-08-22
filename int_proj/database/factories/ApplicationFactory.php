<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Application>
 */
class ApplicationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'job_offer_id' => null,
            'user_id' => null,
            'motivation_letter' => $this->faker->paragraph(),
            'status' => 'pending',
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }

    /**
     * Indicate that the application is for a specific job offer.
     */
    public function forJobOffer($jobOfferId): static
    {
        return $this->state(function (array $attributes) use ($jobOfferId) {
            return [
                'job_offer_id' => $jobOfferId,
            ];
        });
    }
}
