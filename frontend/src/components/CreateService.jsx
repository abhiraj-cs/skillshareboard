import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";

function CreateService() {
  const { user, token } = useContext(AuthContext); // Get user and token
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const serviceData = {
        ...formData,
        userId: user.id, // Add the user's ID
      };

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/services/add`,
        serviceData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token for authentication
          },
        }
      );

      toast.success("Service posted successfully!");
      // Optionally, clear the form
      setFormData({ title: "", description: "", price: "" });
    } catch (error) {
      console.error("Error posting service", error.response?.data || error);
      toast.error(
        "Error: " + (error.response?.data?.message || "Something went wrong")
      );
    }
  };

  return (
    <div>
      <h4>Post a New Skill</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Service Title"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Detailed description..."
          required
        ></textarea>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price (in ₹)"
          required
        />
        <button type="submit">Post Service</button>
      </form>
    </div>
  );
}

export default CreateService;

