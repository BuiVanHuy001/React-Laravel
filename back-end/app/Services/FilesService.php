<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Storage;

class FilesService {
    private string $disk;
    private string $path;

    public function __construct()
    {
        $this->disk = Config::get('filesystems.paths.avatars.disk', 'public');
        $this->path = Config::get('filesystems.paths.avatars.directory', 'avatars');
    }

    public function upload(UploadedFile $file): string
    {
        $filename = $file->hashName();
        $file->storeAs($this->path, $filename, $this->disk);

        return $filename;
    }

    public function delete(?string $filename): void
    {
        if ($filename) {
            $filePath = $this->path . '/' . $filename;
            if (Storage::disk($this->disk)->exists($filePath)) {
                Storage::disk($this->disk)->delete($filePath);
            }
        }
    }

    public function getUrl(?string $filename): ?string
    {
        if (!$filename) {
            return null;
        }
        return Storage::disk($this->disk)->url($this->path . '/' . $filename);
    }
}
