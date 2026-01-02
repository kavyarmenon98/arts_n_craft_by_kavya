
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addProductAPI } from "../services/service";
import { useMutation } from "@tanstack/react-query";
import "./AddProduct.css"; // <- add the CSS from the next section
import { useNavigate } from "react-router-dom";

// ✅ Allowed types & size constraints
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_MB = 2;
const MAX_FILES = 6; // adjust to your needs

// ✅ Validation for multiple files
const validationSchema = Yup.object({
  name: Yup.string().required("Product Name is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  category: Yup.string()
    .required("Please select a Category")
    .notOneOf([""], "Please select a Category"),
  description: Yup.string(),
  instock: Yup.number(),
  images: Yup.array()
    .min(1, "At least one image is required")
    .max(MAX_FILES, `You can upload up to ${MAX_FILES} images`)
    .of(
      Yup.mixed()
        .test("fileType", "Only JPEG/PNG/WebP images are allowed", (file) =>
          file ? ALLOWED_TYPES.includes(file.type) : false
        )
    ),
});

function AddProduct() {
  const [previews, setPreviews] = useState([]); // array of object URLs
  const navigate = useNavigate();

  const addProductMutation = useMutation({
    mutationFn: addProductAPI, // should accept FormData
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      category: "",
      images: [], // ✅ store files array
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();
        // ✅ Match your backend field names
        formData.append("pname", values.name);
        formData.append("price", String(values.price));
        formData.append("category", values.category); 
        formData.append("description", values.description);
        formData.append("instock",values.instock);

        // ✅ Append multiple files (backend reads as array or multiple parts named 'images')
        values.images.forEach((file) => {
          // Option A: same field name for each file
          formData.append("images", file, file.name);
          // Option B: indexed names (if your backend expects images[0], images[1], …)
          // formData.append(`images[${idx}]`, file, file.name);
        });

        await addProductMutation.mutateAsync(formData);
        resetForm();
        setPreviews([]);
        navigate("/listProduct");



      } catch (error) {
        alert(error?.response?.data?.message ?? "Product Add Failed");
      }
    },
  });

  // ✅ Build preview URLs when images change
  useEffect(() => {
    const urls = (formik.values.images || []).map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [formik.values.images]);

  const onFilesSelected = (e) => {
    const files = Array.from(e.currentTarget.files || []);
    if (!files.length) return;

    // Merge with existing (optional), or replace—pick your UX
    const merged = [...formik.values.images, ...files];

    // Enforce MAX_FILES
    const limited = merged.slice(0, MAX_FILES);
    formik.setFieldValue("images", limited);
  };

  const removeImageAt = (index) => {
    const next = [...formik.values.images];
    next.splice(index, 1);
    formik.setFieldValue("images", next);
  };

  const dropHandler = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files || []);
    const imagesOnly = files.filter((f) => ALLOWED_TYPES.includes(f.type));
    const merged = [...formik.values.images, ...imagesOnly];
    const limited = merged.slice(0, MAX_FILES);
    formik.setFieldValue("images", limited);
  };

  const dragOverHandler = (e) => e.preventDefault();

  return (
    <div className="ap-container">

      <form className="ap-form" onSubmit={formik.handleSubmit} noValidate>
      <h2 className="ap-heading">Add Product</h2>

        {/* Name */}
        <div className="ap-field">
          <label htmlFor="name">Product Name</label>
          <input
            id="name"
            name="name"
            type="text"
            className="ap-input"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="e.g., Kerala Mural Painting"
          />
          {formik.touched.name && formik.errors.name && (
            <div className="ap-error">{formik.errors.name}</div>
          )}
        </div>

        {/* Price */}
        <div className="ap-field">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            type="text"
            className="ap-input"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="e.g., 2499"
          />
          {formik.touched.price && formik.errors.price && (
            <div className="ap-error">{formik.errors.price}</div>
          )}
        </div>

        {/* Category */}
        <div className="ap-field">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            className="ap-select"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Select a category...</option>
            <option value="Mural Painting">Mural Painting</option>
            <option value="Craft Item">Craft Item</option>
            <option value="Nettipattam">Nettipattam</option>
            <option value="Resin Products">Resin Products</option>
          </select>
          {formik.touched.category && formik.errors.category && (
            <div className="ap-error">{formik.errors.category}</div>
          )}
        </div>
        <div className="ap-field">
          
          <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  className="ap-input"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your description here..."
                  rows="5"
                  cols="40"
                />

        </div>
  {/* Price */}
        <div className="ap-field">
          <label htmlFor="instock">In Stock</label>
          <input
            id="instock"
            name="instock"
            type="number"
            className="ap-input"
            value={formik.values.instock}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder=" "
          />
          {formik.touched.instock && formik.errors.instock && (
            <div className="ap-error">{formik.errors.instock}</div>
          )}
        </div>

        {/* Images (Multiple) */}
        <div className="ap-field">
          <label>Product Images</label>

          {/* Drag & Drop area (optional) */}
          <div
            className="ap-dropzone"
            onDrop={dropHandler}
            onDragOver={dragOverHandler}
          >
            <div className="ap-dropzone-text">
              Drag & drop images here, or click to select
            </div>
            <input
              type="file"
              name="images"
              multiple
              accept={ALLOWED_TYPES.join(",")}
              className="ap-file"
              onChange={onFilesSelected}
              onBlur={formik.handleBlur}
            />
          </div>

          {/* Validation error for images */}
          {formik.touched.images && formik.errors.images && (
            <div className="ap-error">
              {typeof formik.errors.images === "string"
                ? formik.errors.images
                : // if Yup returns array of per-file errors, show first
                  formik.errors.images?.[0] ?? "Please check your images."}
            </div>
          )}

          {/* Previews grid */}
          {previews.length > 0 && (
            <div className="ap-previews">
              {previews.map((src, idx) => (
                <div className="ap-preview" key={src}>
                  <img src={src} alt={`Preview ${idx + 1}`} />
                  <button
                    type="button"
                    className="ap-remove"
                    onClick={() => removeImageAt(idx)}
                    aria-label={`Remove image ${idx + 1}`}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Helper note */}
          <div className="ap-hint">
            Allowed: JPG/PNG/WebP • Max {MAX_MB} MB per image • Up to {MAX_FILES} images
          </div>
        </div>

        {/* Actions */}
        <div className="ap-actions">
          <button
            type="submit"
            className="ap-btn ap-btn-primary"
            disabled={addProductMutation.isPending}
          >
            {addProductMutation.isPending ? "Submitting..." : "Submit"}
          </button>
          <button
            type="button"
            className="ap-btn ap-btn-ghost"
            onClick={() => {
              formik.resetForm();
              setPreviews([]);
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
