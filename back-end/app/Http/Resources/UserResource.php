<?php

namespace App\Http\Resources;

use App\Services\FilesService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'full_name' => $this->full_name,
            'email' => $this->email,
            'dob' => $this->dob?->format('Y-m-d'),
            'phone_number' => $this->phone_number,
            'avatar_url' => app(FilesService::class)->getUrl($this->avatar),
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
        ];
    }
}
