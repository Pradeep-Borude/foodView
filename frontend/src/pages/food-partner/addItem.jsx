import '../../styles/addItem.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';


export default function AddItem() {

     const navigate = useNavigate();
  const [adding, setadding] = useState(false);

      const handleSubmit = async (event) => {
        event.preventDefault();
    setadding(true);

        const name = event.target.name.value;
        const description = event.target.description.value;
        const image = event.target.image.files[0];
        const price = event.target.price.value;

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('file', image);
        formData.append('price', price);
try {
        const response = await axios.post('http://localhost:3000/api/food', formData, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        alert(response.data.message)
        navigate('/food-partner/dashboard');
      }
    catch (error) {
      alert("Failed to add item. Please try again.");
    } finally {
      setadding(false);
    }
  
  }



  return (
    <div className="add-item-container">
      <div className="add-item-form-wrapper">
        <h2>Add New Food Item</h2>

        <form className="add-item-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Item Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter food item name"
              required={true}
              disabled={adding}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Enter food item description"
              rows="5"
              disabled={adding}
              required={true}
            ></textarea>
          </div>

           <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              placeholder="Enter food item price"
              disabled={adding}
              required={true}

            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Upload Image</label>
            <div className="file-upload-area">
              <input
                type="file"
                id="image"
                accept="image/*"
                className="file-input"
              disabled={adding}
              required={true}

              />
              <div className="upload-placeholder">
                <span className="upload-icon">📸</span>
                <p>Click to upload image</p>
                <small>PNG, JPG, GIF up to 5MB</small>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit" disabled={adding}>
              {adding ? 'Adding...' : 'Add Item'}
              </button>
            <button type="reset" className="btn-cancel" disabled={adding}>Clear</button>
          </div>
        </form>
      </div>
    </div>
  );
}
