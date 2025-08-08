<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
        'id' => Str::uuid(),
        'name' => $this->faker->firstName(),
        'surname' => $this->faker->lastName(),
        'email' => $this->faker->unique()->safeEmail(),
        'email_verified_at' => now(),
        'password' => Hash::make('password123'), // default password
        'phone' => $this->faker->phoneNumber(),
        'role' => 'employer',
        'company_id' => null,
        'profile_picture' => null,
        'cv_file_path' => null,
        'status' =>'employed',
        'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    public function employer()
    {
        return $this->state(function (array $attributes) {
            return [
                'role' => 'employer',
                'status' => 'employed',
            ];
        });
    }

    public function jobSeeker()
    {
        return $this->state(function (array $attributes) {
            return [
                'role' => 'employee',
                'status' => 'unemployed',
                'password' => Hash::make('password123'),
            ];
        });
    }
    
}
