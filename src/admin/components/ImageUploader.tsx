import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { storageService } from '../../services/storage';

interface ImageUploaderProps {
  label: string;
  currentUrl?: string;
  onUploadComplete: (url: string) => void;
  onRemove?: () => void;
  acceptType?: 'image' | 'resume';
  helperText?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  currentUrl,
  onUploadComplete,
  onRemove,
  acceptType = 'image',
  helperText,
}) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | undefined>(currentUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);
    setProgress(10);

    try {
      let result;
      if (acceptType === 'resume') {
        result = await storageService.uploadResume(file, p => setProgress(p));
      } else {
        result = await storageService.uploadImage(file, p => setProgress(p));
      }

      setPreview(result.url);
      onUploadComplete(result.url);
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleClear = () => {
    setPreview(undefined);
    setError(null);
    if (onRemove) onRemove();
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <label style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.4rem', fontWeight: 600 }}>
        {label}
      </label>

      {/* Current Preview */}
      {preview && (
        <div style={{
          position: 'relative',
          display: 'inline-block',
          marginBottom: '0.75rem',
          borderRadius: '10px',
          overflow: 'hidden',
          border: '1px solid rgba(0, 240, 255, 0.25)',
          background: 'rgba(0,0,0,0.4)',
        }}>
          {acceptType === 'resume' ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem' }}>
              <FileText size={28} style={{ color: 'var(--primary-cyan)' }} />
              <div>
                <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600 }}>Resume Document Uploaded</div>
                <a href={preview} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', color: 'var(--primary-cyan)', textDecoration: 'underline' }}>
                  View Document
                </a>
              </div>
            </div>
          ) : (
            <img
              src={preview}
              alt="Preview"
              style={{ maxHeight: '180px', maxWidth: '100%', display: 'block', objectFit: 'cover' }}
              onError={(e) => {
                // Handle fallback if path is local relative
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          )}

          {onRemove && (
            <button
              type="button"
              onClick={handleClear}
              title="Remove file"
              style={{
                position: 'absolute',
                top: '6px',
                right: '6px',
                background: 'rgba(239, 68, 68, 0.85)',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '26px',
                height: '26px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
              }}
            >
              <X size={14} />
            </button>
          )}
        </div>
      )}

      {/* Upload trigger button */}
      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptType === 'resume' ? '.pdf,.doc,.docx' : 'image/jpeg,image/png,image/webp,image/gif'}
          onChange={handleFileSelect}
          style={{ display: 'none' }}
          id={`uploader-${label.replace(/\s+/g, '-').toLowerCase()}`}
        />

        <button
          type="button"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.55rem 1rem',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-color)',
            color: '#fff',
            fontSize: '0.85rem',
            cursor: uploading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            if (!uploading) e.currentTarget.style.borderColor = 'var(--primary-cyan)';
          }}
          onMouseLeave={(e) => {
            if (!uploading) e.currentTarget.style.borderColor = 'var(--border-color)';
          }}
        >
          {uploading ? (
            <>
              <div style={{ width: '14px', height: '14px', border: '2px solid rgba(0,240,255,0.3)', borderTopColor: 'var(--primary-cyan)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              <span>Uploading ({progress}%)...</span>
            </>
          ) : (
            <>
              {acceptType === 'resume' ? <FileText size={16} /> : <Upload size={16} />}
              <span>{preview ? 'Replace File' : `Choose ${acceptType === 'resume' ? 'Document' : 'Image'}`}</span>
            </>
          )}
        </button>

        {helperText && (
          <span style={{ marginLeft: '0.75rem', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            {helperText}
          </span>
        )}
      </div>

      {/* Progress Bar */}
      {uploading && (
        <div style={{ marginTop: '0.5rem', width: '240px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, var(--primary-cyan), var(--secondary-violet))', transition: 'width 0.2s ease' }} />
        </div>
      )}

      {/* Error notification */}
      {error && (
        <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#ef4444', fontSize: '0.8rem' }}>
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
