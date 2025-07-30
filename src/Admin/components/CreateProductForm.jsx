import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../State/Product/Action";
import { Button, TextField, Typography } from "@mui/material";
import { api } from "../../config/apiConfig";

const initialSizes = [
  { name: "S", quantity: 0 },
  { name: "M", quantity: 0 },
  { name: "L", quantity: 0 },
  { name: "XL", quantity: 0 },
  { name: "XXL", quantity: 0 },
  { name: "3XL", quantity: 0 },
  { name: "4XL", quantity: 0 },
];

const CreateProductForm = () => {
  const [productData, setProductData] = useState({
    imageUrl: "",
    brand: "",
    title: "",
    color: "",
    discountedPrice: "",
    price: "",
    discountPercent: "",
    size: initialSizes,
    quantity: "",
    category: "",
    description: "",
    highlights: "", // 🆕
    details: "", // 🆕
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSizeChange = (e, index) => {
    const { name, value } = e.target;
    const sizes = [...productData.size];
    sizes[index][name === "size_quantity" ? "quantity" : name] = value;
    setProductData((prev) => ({
      ...prev,
      size: sizes,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setUploadSuccess(false);
  };

  const handleUploadImage = async () => {
    if (!imageFile) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const { data } = await api.post(`/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setProductData((prev) => ({
        ...prev,
        imageUrl: data.imageUrl,
      }));
      setUploadSuccess(true);
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const categoriesArray = productData.category
      ? productData.category.split(",").map((c) => c.trim()).filter(Boolean)
      : [];

    const colorsArray = productData.color
      ? productData.color.split(",").map((c) => c.trim()).filter(Boolean)
      : [];

    const highlightsArray = productData.highlights
      ? productData.highlights.split("\n").map((h) => h.trim()).filter(Boolean)
      : [];

    const detailsArray = productData.details
      ? productData.details.split("\n").map((d) => d.trim()).filter(Boolean)
      : [];

    const transformedData = {
      ...productData,
      category: categoriesArray,
      color: colorsArray,
      highlights: highlightsArray,
      details: detailsArray,
    };

    dispatch(createProduct(transformedData));
    console.log("Transformed productData:", transformedData);
  };

  return (
    <Fragment>
      <Typography
        variant="h3"
        sx={{ textAlign: "center" }}
        className="py-10 text-center"
      >
        Add New Product
      </Typography>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 px-4 max-w-4xl mx-auto"
      >
        {/* Image Upload */}
        <div className="flex flex-col gap-2">
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <Button
            variant="outlined"
            disabled={!imageFile || uploading}
            onClick={handleUploadImage}
          >
            {uploading ? "Uploading..." : "Upload Image"}
          </Button>
          {uploadSuccess && (
            <Typography variant="body2" color="green">
              Image uploaded successfully!
            </Typography>
          )}
          {productData.imageUrl && (
            <img
              src={productData.imageUrl}
              alt="Preview"
              style={{
                maxWidth: "200px",
                marginTop: "10px",
                borderRadius: "8px",
              }}
            />
          )}
        </div>

        {/* Brand & Title */}
        <div className="flex flex-col md:flex-row gap-4">
          <TextField
            fullWidth
            label="Brand"
            name="brand"
            value={productData.brand}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={productData.title}
            onChange={handleChange}
          />
        </div>

        {/* Color & Quantity */}
        <div className="flex flex-col md:flex-row gap-4">
          <TextField
            fullWidth
            label="Color (comma-separated)"
            name="color"
            value={productData.color}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Quantity"
            name="quantity"
            type="number"
            value={productData.quantity}
            onChange={handleChange}
          />
        </div>

        {/* Price, Discounted Price, Discount Percent */}
        <div className="flex flex-col md:flex-row gap-4">
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={productData.price}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Discounted Price"
            name="discountedPrice"
            type="number"
            value={productData.discountedPrice}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Discount Percent"
            name="discountPercent"
            type="number"
            value={productData.discountPercent}
            onChange={handleChange}
          />
        </div>

        {/* Category */}
        <div>
          <TextField
            fullWidth
            label="Category (comma-separated)"
            name="category"
            value={productData.category}
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Description"
            name="description"
            value={productData.description}
            onChange={handleChange}
          />
        </div>

        {/* Highlights */}
        <div>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Highlights (one per line)"
            name="highlights"
            value={productData.highlights}
            onChange={handleChange}
          />
        </div>

        {/* Details */}
        <div>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Details (one per line)"
            name="details"
            value={productData.details}
            onChange={handleChange}
          />
        </div>

        {/* Sizes */}
        <div className="space-y-4">
          {productData.size.map((size, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row gap-4 border p-2 rounded"
            >
              <TextField
                fullWidth
                label="Size Name"
                name="name"
                value={size.name}
                onChange={(e) => handleSizeChange(e, index)}
                required
              />
              <TextField
                fullWidth
                label="Quantity"
                name="size_quantity"
                type="number"
                value={size.quantity}
                onChange={(e) => handleSizeChange(e, index)}
                required
              />
            </div>
          ))}
        </div>

        {/* Submit */}
        <div>
          <Button variant="contained" size="large" type="submit" fullWidth>
            Add New Product
          </Button>
        </div>
      </form>
    </Fragment>
  );
};

export default CreateProductForm;
