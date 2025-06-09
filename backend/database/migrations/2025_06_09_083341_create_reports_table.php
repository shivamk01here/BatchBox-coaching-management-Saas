<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('evaluations', function (Blueprint $table) {
            $table->id(); 
            $table->foreignId('student_id')->constrained('students')->onDelete('cascade');
            $table->foreignId('batch_id')->constrained('batches')->onDelete('cascade');

            $table->integer('overall_score');
            $table->string('grade');
            $table->text('remarks')->nullable(); 
            $table->timestamp('submitted_at')->nullable();
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
