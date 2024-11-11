'use client'

import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { useEdgeStore } from "@/lib/edgestore";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState(0);
  const [urls, setUrls] = useState<{
    url: string;
    thumbnailUrl: string | null;
  }>();
  const { edgestore } = useEdgeStore()

  const handleUpload = async () => {
    if (file) {
      const res = await edgestore.myPublicImages.upload({
        file,
        onProgressChange: (progress) => {
          setProgress(progress)
        }
      })
      // save our data here...
      setUrls({
        url: res.url,
        thumbnailUrl: res.thumbnailUrl
      })
    }
  }
  return (
    <>
    <div className="flex flex-col md:flex-row items-center gap-3">

      <div className="flex flex-col items-center m-6 gap-2">
        <h1 className="text-xl underline font-bold">Custom Made Upload</h1>
        <input type="file" onChange={(e) => { setFile(e.target.files?.[0]) }} />
        <div className="h-[6px] w-44 border rounded overflow-hidden">
          <div className="h-full bg-white transition-all duration-150" style={{ width: `${progress}%` }} />
        </div>
        <button className="bg-white text-black rounded px-2 hover:opacity-80" onClick={handleUpload}>Upload</button>
        {urls?.url && <Link href={urls.url} target="_blank">Image Url</Link>}
        {urls?.thumbnailUrl && <Link href={urls.thumbnailUrl} target="_blank">Thumbnail Image Url</Link>}
      </div>

      <div className="flex flex-col items-center m-6 gap-2">
        <h1 className="text-xl underline font-bold">Single Image Upload</h1>
        <span>max file size 1Mb</span>
        <SingleImageDropzone width={200} height={200} value={file} 
        onChange={(file) => { setFile(file) }} dropzoneOptions={{maxSize: 1024*1024*1}} />
        <div className="h-[6px] w-44 border rounded overflow-hidden">
          <div className="h-full bg-white transition-all duration-150" style={{ width: `${progress}%` }} />
        </div>
        <button className="bg-white text-black rounded px-2 hover:opacity-80" onClick={handleUpload}>Upload</button>
        {urls?.url && <Link href={urls.url} target="_blank">Image Url</Link>}
        {urls?.thumbnailUrl && <Link href={urls.thumbnailUrl} target="_blank">Thumbnail Image Url</Link>}
      </div>

    </div>
    </>


  );
}
