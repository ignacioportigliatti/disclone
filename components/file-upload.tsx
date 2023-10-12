"use client";

import { UploadDropzone } from "@/lib/uploadthing";

import "@uploadthing/react/styles.css"
import { X } from "lucide-react";

import React from "react";

interface FileUploadProps {
  endpoint: "messageFile" | "serverImage";
  value: string;
  onChange: (url?: string) => void;
}

const FileUpload = (props: FileUploadProps) => {
  const { endpoint, value, onChange } = props;

  const fileType = value?.split(".").pop();

  if (value && fileType !== 'pdf') {
    return (
      <div className="relative h-20 w-20">
        <img src={value} alt="" className="bg-indigo-500 w-20 h-20 object-cover object-center rounded-full" />
        <button onClick={() => onChange("")} className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm" type="button">
            <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone 
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
            onChange(res?.[0].url);
        }}
        onUploadError={(err) => {
            console.log(err);
        }}
    />
  );
};

export default FileUpload;
