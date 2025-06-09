<?php

namespace App\Http\Controllers;
use App\Contracts\StudentContract;

use App\Models\Student;
use App\Models\Batch;
use App\Models\Report;

use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function __construct(private StudentContract $studentService) {
        
    }

    public function index(){


        /*
        $students = Student::all(); // Fetches all students (1 query)
        foreach ($students as $s) {
            echo $s->batch->name; // For EACH student, a NEW query is run to fetch their batch!
              // If you have 100 students, this is 1 (students) + 100 (batches) = 101 queries.
        }
        */

        Student::getAll();

        Student::with('batch', 'subjects')->get();

        return response()->json($this->studentService->getAll());
    }

    public function created(Report $report)
    {
        if (in_array($report->grade, ['D', 'F'])) {
            $report->feedbacks()->create([
                'comment' => 'This student needs support. Low performance.',
                'given_by' => 1, // admin
            ]);
        }
    }
}
