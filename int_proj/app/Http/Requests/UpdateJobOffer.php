<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateJobOffer extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'salary' => 'sometimes|nullable|numeric|min:0',
            'employment_type' => 'sometimes|string|in:full-time,part-time,contract,temporary,undefined',
            'type_of_contract' => 'sometimes|string|in:permanent,fixed_term,freelance,undefined',
            'duration' => 'sometimes|nullable|string|max:15',
            'requirements' => 'sometimes|nullable|string|max:255',
            'application_deadline' => 'sometimes|nullable|date',
            'motivation_letter_required' => 'sometimes|boolean',
        ];
        }
}
