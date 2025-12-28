<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

readonly class UserService {
    public function __construct(
        private FilesService $fileService,
    ) {}

    public function getUsers(array $params): Collection|LengthAwarePaginator
    {
        $query = User::latest();

        if (isset($params['page']) || isset($params['per_page'])) {
            $perPage = $params['per_page'] ?? 10;
            return $query->paginate($perPage);
        }

        return $query->get();
    }

    public function createUser(array $data, $avatarFile = null): User
    {
        return DB::transaction(function () use ($data, $avatarFile) {
            if ($avatarFile) {
                $data['avatar'] = $this->fileService->upload($avatarFile);
            }
            return User::create($data);
        });
    }

    public function updateUser(User $user, array $data, $avatarFile = null): User
    {
        if ($avatarFile) {
            $this->fileService->delete($user->avatar);
            $data['avatar'] = $this->fileService->upload($avatarFile);
        }

        if (empty($data['password'])) {
            unset($data['password']);
        }

        $user->update($data);
        return $user;
    }

    public function deleteUser(User $user): bool
    {
        $this->fileService->delete($user->avatar);
        return $user->delete();
    }
}
