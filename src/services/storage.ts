import { supabase, isSupabaseConfigured } from './supabase';

export interface UploadResult {
  url: string;
  path: string;
  name: string;
  size: number;
}

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const ALLOWED_RESUME_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_RESUME_SIZE = 10 * 1024 * 1024; // 10 MB

export const storageService = {
  /**
   * Upload an image to 'portfolio-images' bucket
   */
  async uploadImage(
    file: File,
    onProgress?: (percent: number) => void
  ): Promise<UploadResult> {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      throw new Error(`Unsupported image type (${file.type}). Allowed: JPG, PNG, WebP, GIF.`);
    }

    if (file.size > MAX_IMAGE_SIZE) {
      throw new Error(`Image size (${(file.size / (1024 * 1024)).toFixed(1)}MB) exceeds maximum limit of 5MB.`);
    }

    return this.uploadFile(file, 'portfolio-images', onProgress);
  },

  /**
   * Upload a resume document to 'portfolio-resumes' bucket
   */
  async uploadResume(
    file: File,
    onProgress?: (percent: number) => void
  ): Promise<UploadResult> {
    if (!ALLOWED_RESUME_TYPES.includes(file.type)) {
      throw new Error(`Unsupported document type (${file.type}). Please upload a PDF or Word document.`);
    }

    if (file.size > MAX_RESUME_SIZE) {
      throw new Error(`Resume file size (${(file.size / (1024 * 1024)).toFixed(1)}MB) exceeds maximum limit of 10MB.`);
    }

    return this.uploadFile(file, 'portfolio-resumes', onProgress);
  },

  /**
   * Internal upload handler with Supabase and local dev fallback
   */
  async uploadFile(
    file: File,
    bucket: 'portfolio-images' | 'portfolio-resumes',
    onProgress?: (percent: number) => void
  ): Promise<UploadResult> {
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const uniqueFileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}_${sanitizedName}`;

    onProgress?.(25);

    if (isSupabaseConfigured && supabase) {
      try {
        const { error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(uniqueFileName, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (uploadError) {
          throw uploadError;
        }

        onProgress?.(75);

        const { data: publicUrlData } = supabase.storage
          .from(bucket)
          .getPublicUrl(uniqueFileName);

        onProgress?.(100);

        return {
          url: publicUrlData.publicUrl,
          path: `${bucket}/${uniqueFileName}`,
          name: file.name,
          size: file.size,
        };
      } catch (err: any) {
        console.warn('Supabase storage upload failed, falling back to local object URL:', err.message);
      }
    }

    // Local development fallback: Convert to Data URL / Object URL
    onProgress?.(50);
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    onProgress?.(100);

    return {
      url: dataUrl,
      path: `local/${uniqueFileName}`,
      name: file.name,
      size: file.size,
    };
  },

  /**
   * Delete file from storage
   */
  async deleteFile(bucket: string, path: string): Promise<void> {
    if (isSupabaseConfigured && supabase && !path.startsWith('local/')) {
      const relativePath = path.replace(`${bucket}/`, '');
      await supabase.storage.from(bucket).remove([relativePath]);
    }
  },
};
