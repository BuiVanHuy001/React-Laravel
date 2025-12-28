<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $user = $this->route('user');
        $userId = $user instanceof \App\Models\User ? $user->id : $user;

        return [
            'full_name' => ['required', 'string', 'max:255'],
            'dob'       => ['nullable', 'date'],
            'email'     => ['required', 'email', 'max:255', 'unique:users,email,' . $userId],
            'phone_number' => ['nullable', 'string', 'max:20'],
            'password'  => $this->isMethod('post') ? ['required', 'min:8'] : ['nullable', 'min:8'],
            'avatar'    => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
        ];
    }

    public function messages(): array
    {
        return [
            'full_name.required' => 'Vui lòng nhập họ và tên.',
            'full_name.string'   => 'Họ và tên phải là một chuỗi ký tự.',
            'full_name.max'      => 'Họ và tên không được vượt quá :max ký tự.',

            'email.required' => 'Vui lòng nhập địa chỉ email.',
            'email.string'   => 'Email phải là một chuỗi ký tự.',
            'email.email'    => 'Email không đúng định dạng (ví dụ: example@gmail.com).',
            'email.max'      => 'Email không được vượt quá :max ký tự.',
            'email.unique'   => 'Email này đã tồn tại trong hệ thống.',

            'phone_number.required' => 'Vui lòng nhập số điện thoại.',
            'phone_number.string'   => 'Số điện thoại phải là một chuỗi ký tự.',
            'phone_number.max'      => 'Số điện thoại không được vượt quá :max ký tự.',

            'password.required' => 'Vui lòng nhập mật khẩu.',
            'password.string'   => 'Mật khẩu phải là một chuỗi ký tự.',
            'password.min'      => 'Mật khẩu phải có ít nhất :min ký tự.',

            'avatar.image'     => 'Tệp tải lên phải là một hình ảnh.',
            'avatar.mimes'     => 'Hình ảnh phải có định dạng: :values.',
            'avatar.max'       => 'Kích thước hình ảnh không được vượt quá :max kilobytes.',
        ];
    }
}
