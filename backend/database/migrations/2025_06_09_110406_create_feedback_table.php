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
        Schema::create('feedback', function (Blueprint $table) {
            $table->id();
            $table->morphs('feedbackable'); // feedbackable_id, feedbackable_type
            $table->foreignId('given_by')->constrained('users')->onDelete('set null')->nullable();
            $table->text('remarks');
            $table->unsignedTinyInteger('rating')->nullable(); // 1–5 stars
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('feedback');
    }
};
