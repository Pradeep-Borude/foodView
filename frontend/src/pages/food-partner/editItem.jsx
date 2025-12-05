import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/addItem.css";

export default function EditItem() {
  const navigate = useNavigate();
  const { foodId } = useParams();

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    const name = event.target.name.value;
    const description = event.target.description.value;
    const imageFile = event.target.image.files[0];
    const price = event.target.price.value;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (imageFile) {
      formData.append("file", imageFile);
    }
    formData.append("price", price);

    try {
      const response = await axios.put(`http://localhost:3000/api/food/${foodId}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert( response.data.message);
      navigate("/food-partner/dashboard");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update item. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="add-item-container">
      <div className="add-item-form-wrapper">
        <h2>Edit Food Item</h2>

        <form className="add-item-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Item Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter food item name"
              required
              disabled={submitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter food item description"
              rows="5"
              required
              disabled={submitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter food item price"
              step="0.01"
              min="0"
              required
              disabled={submitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Upload New Image</label>
            <div className="file-upload-area">
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                className="file-input"
                disabled={submitting}
              />
              <div className="upload-placeholder">
                <span className="upload-icon">📸</span>
                <p>Click to upload image</p>
                <small>PNG, JPG, GIF up to 5MB</small>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit" disabled={submitting}>
              {submitting ? "Updating..." : "Update Item"}
            </button>
            <button type="reset" className="btn-cancel" disabled={submitting}>
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
