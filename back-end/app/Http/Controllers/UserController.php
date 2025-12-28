<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;
use Throwable;

class UserController extends Controller
{
    public function __construct(
        private readonly UserService $userService,
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $users = $this->userService->getUsers($request->all());
        return UserResource::collection($users);
    }

    /**
     * Store a newly created resource in storage.
     * @throws Throwable
     */
    public function store(UserRequest $request)
    {
        $user = $this->userService->createUser(
            $request->validated(),
            $request->file('avatar')
        );

        return new UserResource($user);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, User $user)
    {
        try {
            $updatedUser = $this->userService->updateUser(
                $user,
                $request->validated(),
                $request->file('avatar')
            );

            return new UserResource($updatedUser);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Lỗi cập nhật người dùng',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user) {
        $this->userService->deleteUser($user);
        return response()->json(['message' => 'Deleted']);
    }
}
