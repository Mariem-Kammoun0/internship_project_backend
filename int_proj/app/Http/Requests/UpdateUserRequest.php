<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
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
        'name'=> 'sometimes|string|max:20',
        'surname'=> 'sometimes|string|max:20',
        'email'=> 'sometimes|email|max:255|unique:users,email,',
        'phone'=> 'sometimes|nullable|string|max:8|min:8',
        'profile_picture'=> 'sometimes|nullable|image|mimes:jpeg,png,jpg,svg|max:2048',
        'cv_file_path'=> 'sometimes|nullable|file|mimes:pdf,doc,docx|max:2048',
        'status'=> 'sometimes|nullable|string|in:employed,unemployed',
        ];
    }
}
