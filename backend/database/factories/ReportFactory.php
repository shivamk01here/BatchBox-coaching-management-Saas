<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ReportFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'student_id' => \App\Models\Student::factory(), // Will be overridden
            'batch_id' => \App\Models\Batch::factory(),     // Will be overridden
            'title' => $this->faker->sentence(3),
            'content' => $this->faker->paragraph(3),
            'submitted_at' => $this->faker->dateTimeBetween('-2 months', 'now'),
            'status' => $this->faker->randomElement(['draft', 'submitted', 'reviewed', 'finalized']),
        ];
    }
}
