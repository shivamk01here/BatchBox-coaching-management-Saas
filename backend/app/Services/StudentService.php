<?php

namespace App\Services;

//Contracts[INTERFACES
use App\Contracts\StudentContract;

//Models
use App\Models\Student;

class StudentService implements StudentContract {
    public function getAll() {
        return Student::with('batch')->active()->get();
    }

    public function find($id) {
        return Student::with(['reports', 'subjects'])->findOrFail($id);
    }

    public function create(array $data) {
        return Student::create($data);
    }

    public function update($id, array $data) {
        $student = Student::findOrFail($id);
        $student->update($data);
        return $student;
    }

    public function delete($id) {
        return Student::findOrFail($id)->delete();
    }
}
