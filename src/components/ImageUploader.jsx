import { uploadToCloudinary } from "../firebase/getFileUrl";
import { IoCloudUpload } from "react-icons/io5";
import { useState } from "react";

export default function ImageUploader({ onUpload, defaultImage = null }) {
const [loading, setLoading] = useState(false)

  const handleChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      setLoading(true);
      const imageUrl = await uploadToCloudinary(file);
      if (onUpload) onUpload(imageUrl); 
    } catch (err) {
      console.error("Image upload failed:", err);
    }finally{
      setLoading(false);
    }
  };

  if(loading){
    return <h1>loading...</h1>
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center p-2">
          <IoCloudUpload className="text-gray-500 text-2xl" />
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleChange}
        />
      </label>
    </div>
  );
}
