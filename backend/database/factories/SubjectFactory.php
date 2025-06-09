<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class SubjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement([
                'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science',
                'English Literature', 'History', 'Geography', 'Economics', 'Sociology'
            ]),
            'code' => $this->faker->unique()->lexify('SUB###'), // e.g., SUB123
            'description' => $this->faker->paragraph(1),
        ];
    }
}
