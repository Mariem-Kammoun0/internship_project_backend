<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateJobOfferRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'salary' => 'nullable|numeric|min:0',
            'employment_type' => 'required|string|in:full-time,part-time,contract,temporary,undefined',
            'type_of_contract' => 'required|string|in:permanent,fixed_term,freelance,undefined',
            'duration' => 'nullable|string|max:15',
            'requirements' => 'nullable|string|max:255',
            'application_deadline' => 'nullable|date',
            'motivation_letter_required' => 'boolean',
        ];
    }
}
