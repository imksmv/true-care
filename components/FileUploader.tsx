"use client";

import { convertFileToUrl } from "@/lib/utils";
import { CloudUpload } from "lucide-react";
import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
}

const FileUploader = ({ files, onChange }: Props) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="flex cursor-pointer flex-col items-center justify-center border border-dashed p-5 text-sm text-muted-foreground"
    >
      <input {...getInputProps()} />
      {files && files.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          height={1000}
          width={1000}
          alt="Uploaded image"
          className="max-h-96 object-cover"
        />
      ) : (
        <>
          <CloudUpload size={26} />
          <div className="mt-2 text-center">
            <p>
              <span className="text-primary">Click to upload</span> or drag and
              drop
            </p>
            <p>JPG, JPEG, PNG or SVG</p>
          </div>
        </>
      )}
    </div>
  );
};

export default FileUploader;
