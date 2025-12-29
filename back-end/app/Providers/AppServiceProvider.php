<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider {
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip())->response(function () {
                return response()->json(['message' => 'Quá nhiều yêu cầu. Vui lòng thử lại sau.'], 429);
            });
        });

        RateLimiter::for('login', function (Request $request) {
            $email = (string)$request->email;
            $ip = $request->ip();

            return [
                Limit::perMinute(5)->by($email . $ip)->response(function () {
                    return response()->json(['message' => 'Quá nhiều lần đăng nhập cho tài khoản này.'], 429);
                }),

                Limit::perMinute(10)->by($ip)->response(function () {
                    return response()->json(['message' => 'Quá nhiều lần đăng nhập từ địa chỉ IP này.'], 429);
                }),

                Limit::perHour(15)->by($email)->response(function () {
                    return response()->json(['message' => 'Tài khoản tạm thời bị khóa. Vui lòng thử lại sau.'], 429);
                }),
            ];
        });
    }
}
