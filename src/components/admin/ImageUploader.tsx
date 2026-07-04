"use client";

import Image from "next/image";
import { useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { STORAGE_BUCKET } from "@/lib/supabase/config";

export default function ImageUploader({
  name,
  defaultValue = [],
  multiple = true,
}: {
  name: string;
  defaultValue?: string[];
  multiple?: boolean;
}) {
  const [urls, setUrls] = useState<string[]>(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setError("");
    setUploading(true);
    const supabase = createClient();
    const uploaded: string[] = [];

    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(path, file, { cacheControl: "3600", upsert: false });
      if (upErr) {
        setError(upErr.message);
        continue;
      }
      const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
      uploaded.push(data.publicUrl);
    }

    setUrls((prev) => (multiple ? [...prev, ...uploaded] : uploaded.slice(0, 1)));
    setUploading(false);
  };

  const addByUrl = (value: string) => {
    const v = value.trim();
    if (!v) return;
    setUrls((prev) => (multiple ? [...prev, v] : [v]));
  };

  const remove = (i: number) =>
    setUrls((prev) => prev.filter((_, idx) => idx !== i));

  return (
    <div>
      {/* Hidden field submitted with the form: newline-separated URLs */}
      <input type="hidden" name={name} value={urls.join("\n")} />

      <div className="flex flex-wrap gap-3">
        {urls.map((url, i) => (
          <div
            key={`${url}-${i}`}
            className="relative h-24 w-24 overflow-hidden rounded-xl border border-wood-200"
          >
            <Image
              src={url}
              alt={`Image ${i + 1}`}
              fill
              sizes="96px"
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white"
              aria-label="Remove image"
            >
              <X size={12} />
            </button>
          </div>
        ))}

        <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-wood-300 text-xs text-charcoal/60 transition hover:border-wood-500">
          {uploading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <>
              <Upload size={18} />
              Upload
            </>
          )}
          <input
            type="file"
            accept="image/*"
            multiple={multiple}
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>
      </div>

      <div className="mt-3 flex gap-2">
        <input
          type="url"
          placeholder="Or paste an image URL and press Add"
          className="flex-1 rounded-lg border border-wood-200 px-3 py-2 text-sm outline-none focus:border-wood-400"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addByUrl((e.target as HTMLInputElement).value);
              (e.target as HTMLInputElement).value = "";
            }
          }}
        />
      </div>

      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
      <p className="mt-2 text-xs text-charcoal/50">
        Uploads require a public Supabase Storage bucket named
        <code className="mx-1">{STORAGE_BUCKET}</code>. You can also paste image
        URLs directly.
      </p>
    </div>
  );
}
