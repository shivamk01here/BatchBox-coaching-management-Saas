<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class FeedbackFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory(), // Assuming you have a User model and table
            'feedbackable_id' => null, // This will be set dynamically
            'feedbackable_type' => null, // This will be set dynamically
            'rating' => $this->faker->numberBetween(1, 5),
            'comments' => $this->faker->paragraph(2),
            'created_at' => $this->faker->dateTimeBetween('-1 month', 'now'),
        ];
    }
}
