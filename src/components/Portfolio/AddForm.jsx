import { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { collection, addDoc } from 'firebase/firestore';
import axios from 'axios';
import { db } from '../../firestore';

export const GameForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    img: '',
    videoLink: '',
    githubLink: '',
    gameLink: '',
    completed: true,
    platform: 'Web'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileUpload, setFileUpload] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileUpload(e.target.files[0]);
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'nwosu_chidera'); // replace with your preset
    formData.append('cloud_name', 'dhurarxnw'); // replace with your cloud name

    const res = await axios.post('https://api.cloudinary.com/v1_1/dhurarxnw/image/upload', formData);
    return res.data.secure_url; // returns the uploaded image URL
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = formData.img; // default to manually entered URL
      
      if (fileUpload) {
        // If a file was uploaded, prioritize uploading to Cloudinary
        imageUrl = await uploadImageToCloudinary(fileUpload);
      }

      // Save to Firebase Firestore
      const gameData = {
        ...formData,
        img: imageUrl,
        createdAt: new Date()
      };

      await addDoc(collection(db, 'games'), gameData);

      toast.success('Game added successfully!');
      setFormData({
        title: '',
        description: '',
        img: '',
        videoLink: '',
        githubLink: '',
        gameLink: '',
        completed: true,
        platform: 'Web'
      });
      setFileUpload(null);
      if (fileInputRef.current) fileInputRef.current.value = '';

    } catch (error) {
      console.error(error);
      toast.error('Failed to add game. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-green mb-6">Add New Game</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green bg-white/10"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green bg-white/10"
          />
        </div>

        {/* Platform */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-400">Platform</label>
            <select
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green bg-white/10"
            >
              <option value="PC">PC</option>
              <option value="Mobile">Mobile</option>
              <option value="Web">Web</option>
            </select>
          </div>
        </div>

        {/* File Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">Game Image</label>
          <div className="flex items-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green bg-white/10"
            />
          </div>
          <p className="text-xs text-gray-500">Upload an image file or provide an image URL below</p>
        </div>

        {/* Image URL */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">Image URL (optional)</label>
          <input
            type="url"
            name="img"
            value={formData.img}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green bg-white/10"
          />
        </div>

        {/* Optional Links */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">Video Link (optional)</label>
          <input
            type="url"
            name="videoLink"
            value={formData.videoLink}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green bg-white/10"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">GitHub Link (optional)</label>
          <input
            type="url"
            name="githubLink"
            value={formData.githubLink}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green bg-white/10"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">Game Link (optional)</label>
          <input
            type="url"
            name="gameLink"
            value={formData.gameLink}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green bg-white/10"
          />
        </div>

        {/* Completed Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="completed"
            checked={formData.completed}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-green bg-white/10 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-400">
            Completed
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green hover:bg-green/20 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green bg-white/10 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            {isSubmitting ? 'Adding...' : 'Add Game'}
          </button>
        </div>
      </form>
    </div>
  );
};
