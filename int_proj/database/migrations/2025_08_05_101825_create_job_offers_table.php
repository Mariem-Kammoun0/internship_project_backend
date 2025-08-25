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
        Schema::create('job_offers', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->decimal('salary', 10, 2)->nullable();
            $table->enum('employment_type', ['undefined','full-time', 'part-time', 'contract', 'temporary'])->default('undefined');
            $table->enum('type_of_contract', ['undefined','permanent', 'fixed-term', 'freelance'])->default('undefined');
            $table->string('duration')->nullable();
            $table->text('requirements')->nullable();
            $table->date('application_deadline')->nullable();
            $table->boolean('motivation_letter_required')->default(false);
            $table->foreignId('company_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_offers');
    }
};
