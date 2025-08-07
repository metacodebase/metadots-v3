"use client";

import { useState, useRef } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  placeholder?: string;
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  placeholder = "Upload or paste image URL",
  className = "",
}: ImageUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    setIsUploading(true);

    try {
      // For now, we'll use a simple base64 conversion
      // In production, you'd upload to a cloud service like Cloudinary, AWS S3, etc.
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onChange(result);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image");
      setIsUploading(false);
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUrlInput("");
    }
  };

  const removeImage = () => {
    onChange("");
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Current Image Preview */}
      {value && (
        <div className="relative">
          <img
            src={value}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={removeImage}
            className="absolute top-2 right-2 bg-blue-700 hover:bg-blue-800 text-white !w-auto">
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Upload Area */}
      <div
        className={`p-6 text-center transition-colors ${
          isDragOver
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}>
        <Upload className="mx-auto h-12 w-12 text-blue-700 mb-4" />
        <p className="text-sm text-gray-600 mb-2">
          {isDragOver
            ? "Drop image here"
            : "Drag and drop an image here, or click to select"}
        </p>
        <Button
          type="button"
          className="bg-blue-700 hover:bg-blue-800 "
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}>
          {isUploading ? "Uploading..." : "Select Image"}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden w-full"
        />
      </div>

      {/* URL Input */}
      <div className="space-y-2">
        <Label>Or paste image URL</Label>
        <div className="flex space-x-2">
          <Input
            type="url"
            className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
            placeholder="https://example.com/image.jpg"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleUrlSubmit()}
          />
          <Button
            type="button"
            className="!w-auto bg-blue-700 hover:bg-blue-800 text-white"
            onClick={handleUrlSubmit}
            disabled={!urlInput.trim()}>
            Add
          </Button>
        </div>
      </div>

      {/* Supported formats */}
      <p className="text-xs text-gray-500">
        Supported formats: JPG, PNG, GIF, WebP (Max 5MB)
      </p>
    </div>
  );
}
