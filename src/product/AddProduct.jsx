import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addProductAPI } from "../services/service";
import { useMutation } from "@tanstack/react-query";
import "./AddProduct.css";
import { useNavigate } from "react-router-dom";

/* ---------------- CONSTANTS ---------------- */
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const VIDEO_TYPES = ["video/mp4", "video/webm"];
const MAX_FILES = 6;

/* ---------------- VALIDATION ---------------- */
const validationSchema = Yup.object({
  name: Yup.string().required("Product Name is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  discount: Yup.number()
    .nullable()
    .lessThan(Yup.ref("price"), "Discount must be less than price"),
  category: Yup.string()
    .required("Please select a Category")
    .notOneOf([""], "Please select a Category"),
  description: Yup.string(),
  instock: Yup.number(),
  images: Yup.array()
    .min(1, "At least one image is required")
    .max(MAX_FILES, `You can upload up to ${MAX_FILES} images`)
    .of(
      Yup.mixed().test(
        "fileType",
        "Only JPEG/PNG/WebP images are allowed",
        (file) => (file ? ALLOWED_TYPES.includes(file.type) : false)
      )
    ),
});

/* ---------------- COMPONENT ---------------- */
function AddProduct() {
  const [previews, setPreviews] = useState([]);
  const navigate = useNavigate();

  const addProductMutation = useMutation({
    mutationFn: addProductAPI,
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      discount: "",
      category: "",
      description: "",
      instock: "",
      images: [],
      video: null,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();

        formData.append("pname", values.name);
        formData.append("price", values.price);
        formData.append("discount", values.discount || "");
        formData.append("category", values.category);
        formData.append("description", values.description);
        formData.append("instock", values.instock);

        values.images.forEach((file) => {
          formData.append("images", file, file.name);
        });

        if (values.video) {
          formData.append("video", values.video);
        }

        await addProductMutation.mutateAsync(formData);

        resetForm();
        setPreviews([]);
        navigate("/listProduct");
      } catch (error) {
        alert(error?.response?.data?.message ?? "Product Add Failed");
      }
    },
  });

  /* ---------------- IMAGE PREVIEWS ---------------- */
  useEffect(() => {
    const files = formik.values.images || [];
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);

    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [formik.values.images]);

  /* ---------------- HANDLERS ---------------- */
  const onFilesSelected = (e) => {
    const files = Array.from(e.currentTarget.files || []);
    const merged = [...formik.values.images, ...files];
    formik.setFieldValue("images", merged.slice(0, MAX_FILES));
  };

  const removeImageAt = (index) => {
    const next = [...formik.values.images];
    next.splice(index, 1);
    formik.setFieldValue("images", next);
  };

  const onVideoSelected = (e) => {
    const file = e.target.files?.[0];
    if (file && VIDEO_TYPES.includes(file.type)) {
      formik.setFieldValue("video", file);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="ap-container">
      <form className="ap-form" onSubmit={formik.handleSubmit} noValidate>
        <h2 className="ap-heading">Add Product</h2>

        {/* NAME */}
        <div className="ap-field">
          <label>Product Name</label>
          <input className="ap-input" {...formik.getFieldProps("name")} />
        </div>

        {/* PRICE */}
        <div className="ap-field">
          <label>Price</label>
          <input
            type="number"
            className="ap-input"
            {...formik.getFieldProps("price")}
          />
        </div>

        {/* DISCOUNT */}
        <div className="ap-field">
          <label>Discount Price</label>
          <input
            type="number"
            className="ap-input"
            {...formik.getFieldProps("discount")}
            placeholder="Optional"
          />
          {formik.errors.discount && (
            <div className="ap-error">{formik.errors.discount}</div>
          )}
        </div>

        {/* CATEGORY */}
        <div className="ap-field">
          <label>Category</label>
          <select className="ap-select" {...formik.getFieldProps("category")}>
            <option value="">Select</option>
            <option value="Painting">Painting</option>
            <option value="Craft">Craft Item</option>
            <option value="Nettipattam">Nettipattam</option>
            <option value="Resin">Resin Products</option>
          </select>
        </div>

        {/* DESCRIPTION */}
        <div className="ap-field">
          <label>Description</label>
          <textarea
            rows="4"
            className="ap-input"
            {...formik.getFieldProps("description")}
          />
        </div>

        {/* STOCK */}
        <div className="ap-field">
          <label>In Stock</label>
          <input
            type="number"
            className="ap-input"
            {...formik.getFieldProps("instock")}
          />
        </div>

        {/* IMAGES */}
        <div className="ap-field">
          <label>Product Images</label>
          <div className="ap-dropzone">
            Click or drag images
            <input
              type="file"
              multiple
              accept={ALLOWED_TYPES.join(",")}
              className="ap-file"
              onChange={onFilesSelected}
            />
          </div>

          {previews.length > 0 && (
            <div className="ap-previews">
              {previews.map((src, i) => (
                <div className="ap-preview" key={i}>
                  <img src={src} alt="" />
                  <button
                    type="button"
                    className="ap-remove"
                    onClick={() => removeImageAt(i)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* VIDEO */}
        <div className="ap-field">
          <label>Product Video (optional)</label>
          <input
            type="file"
            accept={VIDEO_TYPES.join(",")}
            className="ap-input"
            onChange={onVideoSelected}
          />

          {formik.values.video && (
            <div className="ap-previews">
              <div className="ap-preview">
                <video
                  controls
                  src={URL.createObjectURL(formik.values.video)}
                  className="ap-video-preview"
                />
                <button
                  type="button"
                  className="ap-remove"
                  onClick={() => formik.setFieldValue("video", null)}
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="ap-actions">
          <button className="ap-btn ap-btn-primary" type="submit">
            Submit
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
