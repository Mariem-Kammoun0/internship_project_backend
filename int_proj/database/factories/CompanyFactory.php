<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Company;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Company>
 */
class CompanyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Company::class;
    public function definition(): array
    {
        return [
        'name' => $this->faker->company(),
        'address' => $this->faker->address(),
        'phone' => $this->faker->phoneNumber(),
        'email' => $this->faker->companyEmail(),
        'website' => $this->faker->url(),
        'industry' => $this->faker->word(),
        'description' => $this->faker->paragraph(),
        'logo' => null,
        'founded_at' => $this->faker->date(),
        'employer_id' => null,
        'size' => $this->faker->numberBetween(1, 10),
        ];
    }
}
