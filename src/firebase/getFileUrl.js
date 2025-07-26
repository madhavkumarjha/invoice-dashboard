// url get by cloudinary cloud  

export const uploadToCloudinary = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);

  const res = await fetch(import.meta.env.VITE_CLOUDINARY_URL, {
    method: "POST",
    body: data,
  });

  const result = await res.json();
  return result.secure_url;
};
