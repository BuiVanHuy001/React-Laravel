<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder {
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'full_name' => 'Admin User',
            'dob' => '1990-01-01',
            'email' => 'admin@gmail.com',
            'password' => 'password',
            'role' => 'admin',
            'phone_number' => '0123456789',
            'avatar' => null,
            'email_verified_at' => now(),
            'remember_token' => null,
        ]);

        User::create([
            'full_name' => 'John Doe',
            'dob' => '1995-05-15',
            'email' => 'johndoe@gmail.com',
            'password' => 'password',
            'role' => 'user',
            'phone_number' => '0987654321',
            'avatar' => '019a6891-7a9b-72ee-8372-a927e163cf26.png',
        ]);

        User::create([
            'full_name' => 'Jane Smith',
            'dob' => '1988-12-30',
            'email' => 'janesmith@gmail.com',
            'password' => 'password',
            'role' => 'user',
            'phone_number' => '0112233445',
            'avatar' => '019a6891-7aa0-73bb-8289-66e12b30694b.jpg'
        ]);
        User::factory(30)->create();
    }
}
