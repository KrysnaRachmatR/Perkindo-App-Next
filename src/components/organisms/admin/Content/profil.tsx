"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const ProfileAdminPage = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    section1: "",
    visi: "",
    misi: [],
    header_image: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch profile data from the backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/profile");
        if (response.data.success) {
          setProfile(response.data.data);
          setFormData({
            title: response.data.data.title,
            section1: response.data.data.section1,
            visi: response.data.data.visi,
            misi: response.data.data.misi,
            header_image: null,
          });
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, []);

  const getToken = () => {
    return localStorage.getItem("token");
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      header_image: e.target.files[0],
    });
  };

  // Handle form submission for storing or updating profile data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();

    if (!token) {
      setMessage("You must be logged in to perform this action.");
      return;
    }

    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("section1", formData.section1);
    formDataToSend.append("visi", formData.visi);
    formDataToSend.append("misi", JSON.stringify(formData.misi));

    if (formData.header_image) {
      formDataToSend.append("header_image", formData.header_image);
    }

    try {
      const response = isEditing
        ? await axios.put(
            `http://localhost:8000/api/profile/${profile.id}`,
            formDataToSend,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Add Bearer token to the request header
              },
            }
          )
        : await axios.post(
            "http://localhost:8000/api/profile",
            formDataToSend,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Add Bearer token to the request header
              },
            }
          );

      if (response.data.success) {
        setMessage(response.data.message);
        setProfile(response.data.data);
        setIsEditing(false);
      }
    } catch (error) {
      setMessage("Error occurred while saving the profile content.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete profile
  const handleDelete = async () => {
    const token = getToken();

    if (!token) {
      setMessage("You must be logged in to perform this action.");
      return;
    }

    if (profile) {
      try {
        await axios.delete(`http://localhost:8000/api/profile/${profile.id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add Bearer token to the request header
          },
        });
        setProfile(null);
        setMessage("Profile content successfully deleted.");
      } catch (error) {
        setMessage("Error occurred while deleting the profile content.");
        console.error(error);
      }
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">
        {isEditing ? "Edit Profile" : "Profile Admin"}
      </h1>

      {message && <p className="text-green-500 mb-4">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium">Section 1</label>
          <textarea
            name="section1"
            value={formData.section1}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium">Visi</label>
          <textarea
            name="visi"
            value={formData.visi}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium">
            Misi (JSON format)
          </label>
          <textarea
            name="misi"
            value={formData.misi}
            onChange={(e) =>
              handleChange({
                target: { name: "misi", value: e.target.value.split(",") },
              })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium">Header Image</label>
          <input
            type="file"
            name="header_image"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : isEditing
              ? "Update Profile"
              : "Create Profile"}
          </button>
        </div>
      </form>

      {profile && !isEditing && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Current Profile</h2>
          <div>
            <p>
              <strong>Title:</strong> {profile.title}
            </p>
            <p>
              <strong>Section 1:</strong> {profile.section1}
            </p>
            <p>
              <strong>Visi:</strong> {profile.visi}
            </p>
            <p>
              <strong>Misi:</strong> {profile.misi.join(", ")}
            </p>
            <img
              src={`/storage/${profile.header_image}`}
              alt="Header"
              className="mt-4"
            />
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 bg-yellow-500 text-white p-2 rounded"
          >
            Edit Profile
          </button>

          <button
            onClick={handleDelete}
            className="mt-4 bg-red-500 text-white p-2 rounded"
          >
            Delete Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileAdminPage;
