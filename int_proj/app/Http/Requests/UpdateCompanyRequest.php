<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCompanyRequest extends FormRequest
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
            'name' => 'sometimes|string|max:255',
            'address' => 'sometimes|nullable|string|max:255',
            'email' => 'sometimes|email|max:255|unique:companies,email',
            'phone' => 'sometimes|nullable|string|max:8|min:8',
            'website' => 'sometimes|nullable|url|max:255',
            'industry' => 'sometimes|nullable|string|max:100',
            'founded_at' => 'sometimes|nullable|date',
            'logo' => 'sometimes|nullable|image|mimes:jpeg,png,jpg,svg|max:2048',
            'description' => 'sometimes|nullable|string|max:1000',
        ];
    }
}
