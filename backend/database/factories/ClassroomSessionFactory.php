<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ClassroomSessionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'batch_id' => \App\Models\Batch::factory(), // Will be overridden
            'subject_id' => \App\Models\Subject::factory(), // Will be overridden
            'session_date' => $this->faker->dateTimeBetween('-3 months', 'now'),
            'topic' => $this->faker->sentence(4),
            'duration_minutes' => $this->faker->numberBetween(60, 180),
        ];
    }
}
