<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::apiResource('users', UserController::class)->missing(function () {
    return response()->json([
        'success' => false,
        'message' => 'Người dùng này không tồn tại trong hệ thống của chúng tôi.'
    ], 404);
})->middleware(['throttle:api', 'auth:sanctum']);

Route::post('/login', [AuthController::class, 'login'])->name('auth.login')->middleware('throttle:login');
Route::post('/logout', [AuthController::class, 'logout'])->name('auth.logout')->middleware('auth:sanctum');
