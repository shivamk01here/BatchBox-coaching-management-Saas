<?php

namespace Database\Factories;
use App\Models\Batch;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'batch_id' => Batch::factory(), // Assign a batch, will be overridden in seeder
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'email' => fn (array $attributes) => Str::slug($attributes['first_name'].'.'.$attributes['last_name']).'@example.com',
            'phone' => $this->faker->phoneNumber,
            'gender' => $this->faker->randomElement(['male', 'female']),
            'dob' => $this->faker->date('Y-m-d', '2005-01-01'), // Students born before 2005
            'address' => $this->faker->address,
            'is_active' => true,
        ];
    }
}
