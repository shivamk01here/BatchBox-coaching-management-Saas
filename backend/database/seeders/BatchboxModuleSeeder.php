<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

use App\Models\Batch;
use App\Models\Student;
use App\Models\Subject;
use App\Models\ClassroomSession;
use App\Models\Attendance;
use App\Models\Report;
use App\Models\Fee;
use App\Models\Feedback;

class BatchboxModuleSeeder extends Seeder
{
    public function run(): void
    {
        $faker = \Faker\Factory::create();

        // Create 10 Subjects
        $subjects = [];
        for ($i = 1; $i <= 10; $i++) {
            $subjects[] = Subject::create([
                'name' => 'Subject ' . $i,
                'code' => 'SUB' . $i,
                'description' => $faker->sentence,
            ]);
        }

        // Create 5 Batches
        for ($b = 1; $b <= 5; $b++) {
            $batch = Batch::create([
                'start_date' => now()->subDays(rand(10, 90)),
                'end_date' => now()->addDays(rand(10, 90)),
                'status' => $faker->randomElement(['active', 'completed', 'upcoming']),
            ]);

            // Create 20 Students per batch
            for ($s = 1; $s <= 20; $s++) {
                $student = Student::create([
                    'user_id' => 1, // or random user_i
                    'batch_id' => $batch->id,
                    'first_name' => $faker->firstName,
                    'last_name' => $faker->lastName,
                    'email' => $faker->unique()->safeEmail,
                    'phone' => $faker->numerify('98########'),
                    'gender' => $faker->randomElement(['male', 'female']),
                    'dob' => $faker->date(),
                    'is_active' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                // Insert subject marks (pivot)
                foreach (collect($subjects)->random(5) as $subject) {
                    DB::table('student_subject')->insert([
                        'student_id' => $student->id,
                        'subject_id' => $subject->id,
                        'marks_obtained' => rand(20, 95),
                        'grade' => $faker->randomElement(['A', 'B', 'C', 'D']),
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }

                // Insert Fee
                Fee::create([
                    'student_id' => $student->id,
                    'amount' => rand(8000, 15000),
                    'paid' => $faker->boolean(75),
                    'payment_date' => now()->subDays(rand(5, 30)),
                    'remarks' => $faker->optional()->sentence,
                ]);

                // Insert Reports
                for ($r = 1; $r <= rand(2, 4); $r++) {
                    $report = Report::create([
                        'student_id' => $student->id,
                        'batch_id' => $batch->id,
                        'overall_score' => rand(40, 95),
                        'grade' => $faker->randomElement(['A', 'B', 'C', 'D']),
                        'remarks' => $faker->optional()->sentence,
                        'submitted_at' => now()->subDays(rand(1, 60)),
                        'created_by' => 1, // or random user_id
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);

                    // Insert feedback on report
                    Feedback::create([
                        'feedbackable_id' => $report->id,
                        'feedbackable_type' => \App\Models\Report::class,
                        'given_by' => 1,
                        'remarks' => $faker->sentence,
                        'rating' => rand(3, 5),
                    ]);
                }
            }

            // Create Classroom Sessions
            for ($cs = 1; $cs <= 5; $cs++) {
                $session = ClassroomSession::create([
                    'batch_id' => $batch->id,
                    'topic' => $faker->words(3, true),
                    'mentor_id' => 1,
                    'duration_minutes' => rand(45, 90),
                    'remarks' => $faker->optional()->sentence,
                ]);

                // Create random attendance
                $students = Student::where('batch_id', $batch->id)->inRandomOrder()->take(10)->get();
                foreach ($students as $stud) {
                    Attendance::create([
                        'student_id' => $stud->id,
                        'classroom_session_id' => $session->id,
                        'status' => $faker->randomElement(['present', 'absent', 'late']),
                        'remarks' => $faker->optional()->sentence,
                    ]);
                }
            }
        }
    }
}
