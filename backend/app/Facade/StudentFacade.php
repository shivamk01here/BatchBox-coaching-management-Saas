<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

class StudentFacade extends Facade {
    protected static function getFacadeAccessor() {
        return \App\Contracts\StudentContract::class;
    }
}
