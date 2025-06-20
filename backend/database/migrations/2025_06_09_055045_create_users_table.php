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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('institutionID');
            $table->unsignedBigInteger('roleID');
            $table->string('name');
            $table->string('surname')->nullable();
            $table->string('email')->unique();
            $table->string('password');
            $table->boolean('is_verified')->default(false);
            $table->timestamps();

            $table->foreign('institutionID')->references('id')->on('institutions')->onDelete('cascade');
            $table->foreign('roleID')->references('id')->on('roles')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
