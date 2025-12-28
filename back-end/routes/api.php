<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::apiResource('users', UserController::class)->missing(function () {
    return response()->json([
        'success' => false,
        'message' => 'Người dùng này không tồn tại trong hệ thống của chúng tôi.'
    ], 404);
});
