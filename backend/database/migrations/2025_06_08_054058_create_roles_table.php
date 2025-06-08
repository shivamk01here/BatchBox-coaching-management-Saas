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
        Schema::create('roles', function (Blueprint $table) {
            $table->id('roleID');
            $table->string('name');
            $table->string('description')->nullable();
            $table->unsignedBigInteger('institutionID');
            $table->timestamps();
            
            $table->foreign('institutionID')->references('institutionID')->on('institutions')->onDelete('cascade');
            $table->index('institutionID');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('roles');
    }
};