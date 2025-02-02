import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import imageCompression from "browser-image-compression";

import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { baseAPIUrl } from "src/utils/baseAPIUrl";
import Header1 from "src/components/Header1";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [updatedHTML, setUpdatedHTML] = useState("");

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_API_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID, // Fix this line
  };

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  // Function to upload image to Firebase Storage

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: "<p>Write your story...</p>",
  });

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]; // Get selected file
    console.log(file);
    if (!file || !editor) return;

    const imageUrl = await uploadImageToFirebase(file); // Upload to Firebase
    if (imageUrl) {
      console.log(imageUrl);
      editor.chain().focus().setImage({ src: imageUrl }).run(); // Insert image into editor
    }
  };

  async function uploadImageToFirebase(file: File) {
    const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  }

  const handleSubmit = async () => {
    if (!editor) return;

    const htmlContent = editor.getHTML(); // Extract HTML from editor
    setUpdatedHTML(htmlContent); // Store HTML before sending
    const firstImg = extractFirstImage(htmlContent); // Extract first image

    if (htmlContent === "") {
      return toast.error("Please write something!", {
        className: "bg-white text-red-500 text-lg font-semibold border-r-500 ",
      });
    }

    if (title === "") {
      return toast.error("No Title!", {
        className: "bg-red-500 text-red-500 text-lg border-r-500 ",
      });
    }

    try {
      const { data } = await axios.post(`${baseAPIUrl}/blog/create`, {
        user: id,
        title: title,
        description: updatedHTML, // Send HTML content
        image:
          firstImg ||
          "https://www.travelpayouts.com/blog/wp-content/uploads/2021/10/tp-blog-1864x980-10-2048x1077.png",
      });

      if (data?.success) {
        toast.success("Blog Uploaded successfully!");
        navigate("/");
      }

      // console.log("Blog submitted successfully:");
    } catch (error) {
      console.error("Error submitting blog:", error);
    }
  };

  const extractFirstImage = (html: string) => {
    const match = html.match(/<img[^>]+src="([^">]+)"/);
    return match ? match[1] : null; // Returns the first image src or null
  };

  return (
    <>
      <Header1 />
      <div className="w-full">
        <div className="mx-auto w-1/2 py-4">
          <div className="w-full">
            <textarea
              placeholder="Title"
              className="w-full max-h-80 focus:outline-none text-5xl font-sans p-2 resize-none overflow-hidden "
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className=" w-full">
            <div className="p-4 rounded-lg">
              <div className="text-3xl">
                <EditorContent editor={editor} />
              </div>
              <div className=" flex items-center gap-3 mt-20">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="image-upload"
                  onChange={handleImageUpload} // Upload image when selected
                />
                <label
                  htmlFor="image-upload"
                  className="text-lg cursor-pointer"
                >
                  <AddPhotoAlternateIcon />
                </label>
                <button
                  onClick={handleSubmit}
                  className="bg-black text-white rounded-3xl px-4 py-2"
                >
                  Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateBlog;
