<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class FeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'student_id' => \App\Models\Student::factory(),
            'amount' => $this->faker->numberBetween(5000, 25000), // Random fee amount
            'due_date' => $this->faker->dateTimeBetween('-1 month', '+2 months'),
            'paid_at' => $this->faker->optional(0.75)->dateTimeBetween('-1 month', 'now'), // 75% paid
            'paid' => $this->faker->boolean(75), // 25% defaulters
        ];
    }
}
