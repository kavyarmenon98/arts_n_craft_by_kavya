import React, { useEffect, useRef, useState, useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { editProductAPI, getProductByIdAPI } from "../services/service";
import "./AddProduct.css";

/* ---------------- CONSTANTS ---------------- */
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const VIDEO_TYPES = ["video/mp4", "video/webm"];
const MAX_FILES = 6;

/* ---------------- VALIDATION ---------------- */
const validationSchema = Yup.object({
  pname: Yup.string().required("Product name is required"),
  price: Yup.number().required("Price is required"),
  discount: Yup.number()
    .nullable()
    .lessThan(Yup.ref("price"), "Discount must be less than price"),
  category: Yup.string().required("Category is required"),
  description: Yup.string().required("Description is required"),
  instock: Yup.number().required("Stock is required"),
});

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  /* ---------------- FETCH PRODUCT ---------------- */
  const { data } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductByIdAPI(id),
    enabled: !!id,
  });

  /* ---------------- EXISTING MEDIA ---------------- */
  const [visibleImages, setVisibleImages] = useState([]);
  const [existingVideo, setExistingVideo] = useState(null);

  const deletedImagesRef = useRef([]);
  const deletedVideoRef = useRef(false);

  /* ---------------- INIT DATA ---------------- */
  useEffect(() => {
    if (data?.product) {
      setVisibleImages(data.product.images || []);
      setExistingVideo(data.product.video || null);
    }
  }, [data]);

  /* ---------------- FORMIK ---------------- */
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      pname: data?.product?.pname || "",
      price: data?.product?.price || "",
      discount: data?.product?.discount || "",
      category: data?.product?.category || "",
      description: data?.product?.description || "",
      instock: data?.product?.instock || "",
      images: [],
      video: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();

      formData.append("pname", values.pname);
      formData.append("price", values.price);
      formData.append("discount", values.discount || "");
      formData.append("category", values.category);
      formData.append("description", values.description);
      formData.append("instock", values.instock);

      /* existing images */
      visibleImages.forEach((img) =>
        formData.append("existingImages", img)
      );

      /* deleted images */
      deletedImagesRef.current.forEach((img) =>
        formData.append("deletedImages", img)
      );

      /* new images */
      values.images.forEach((file) =>
        formData.append("images", file)
      );

      /* video handling */
      if (deletedVideoRef.current) {
        formData.append("deleteVideo", "true");
      }

      if (values.video) {
        formData.append("video", values.video);
      }

      await editProductMutation.mutateAsync({ id, formData });
      navigate("/listProduct");
    },
  });

  /* ---------------- MUTATION ---------------- */
  const editProductMutation = useMutation({
    mutationFn: editProductAPI,
  });

  /* ---------------- IMAGE PREVIEWS ---------------- */
  const newImagePreviews = useMemo(() => {
    return formik.values.images.map((file) =>
      URL.createObjectURL(file)
    );
  }, [formik.values.images]);

  /* ---------------- HANDLERS ---------------- */
  const onFilesSelected = (e) => {
    const files = Array.from(e.target.files || []).filter((f) =>
      ALLOWED_TYPES.includes(f.type)
    );
    formik.setFieldValue("images", files.slice(0, MAX_FILES));
  };

  const onVideoSelected = (e) => {
    const file = e.target.files?.[0];
    if (file && VIDEO_TYPES.includes(file.type)) {
      setExistingVideo(null);
      deletedVideoRef.current = true;
      formik.setFieldValue("video", file);
    }
  };

  const removeExistingImage = (img, index) => {
    deletedImagesRef.current.push(img);
    setVisibleImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index) => {
    const updated = [...formik.values.images];
    updated.splice(index, 1);
    formik.setFieldValue("images", updated);
  };

  const removeExistingVideo = () => {
    setExistingVideo(null);
    deletedVideoRef.current = true;
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="ap-container">
      <form className="ap-form" onSubmit={formik.handleSubmit}>
        <h2 className="ap-heading">Edit Product</h2>

        {/* NAME */}
        <div className="ap-field">
          <label>Product Name</label>
          <input className="ap-input" {...formik.getFieldProps("pname")} />
        </div>

        {/* PRICE */}
        <div className="ap-field">
          <label>Price</label>
          <input type="number" className="ap-input" {...formik.getFieldProps("price")} />
        </div>

        {/* DISCOUNT */}
        <div className="ap-field">
          <label>Discount Price</label>
          <input type="number" className="ap-input" {...formik.getFieldProps("discount")} />
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
          <textarea rows="4" className="ap-input" {...formik.getFieldProps("description")} />
        </div>

        {/* STOCK */}
        <div className="ap-field">
          <label>In Stock</label>
          <input type="number" className="ap-input" {...formik.getFieldProps("instock")} />
        </div>

        {/* EXISTING IMAGES */}
        {visibleImages.length > 0 && (
          <div className="ap-field">
            <label>Current Images</label>
            <div className="ap-previews">
              {visibleImages.map((img, i) => (
                <div className="ap-preview" key={img}>
                  <img src={img} alt="" />
                  <button type="button" className="ap-remove" onClick={() => removeExistingImage(img, i)}>
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NEW IMAGES */}
        <div className="ap-field">
          <label>Add New Images</label>
          <div className="ap-dropzone">
            Click or drag images
            <input type="file" multiple accept={ALLOWED_TYPES.join(",")} className="ap-file" onChange={onFilesSelected} />
          </div>
        </div>

        {/* NEW IMAGE PREVIEWS */}
        {newImagePreviews.length > 0 && (
          <div className="ap-previews">
            {newImagePreviews.map((src, i) => (
              <div className="ap-preview" key={i}>
                <img src={src} alt="" />
                <button type="button" className="ap-remove" onClick={() => removeNewImage(i)}>
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* EXISTING VIDEO */}
        {existingVideo && (
          <div className="ap-field">
            <label>Current Video</label>
            <div className="ap-previews">
              <div className="ap-preview">
                <video src={existingVideo} controls className="ap-video-preview" />
                <button type="button" className="ap-remove" onClick={removeExistingVideo}>
                  ✕
                </button>
              </div>
            </div>
          </div>
        )}

        {/* NEW VIDEO */}
        <div className="ap-field">
          <label>Replace Video (optional)</label>
          <input type="file" accept={VIDEO_TYPES.join(",")} onChange={onVideoSelected} className="ap-input" />
        </div>

        {/* NEW VIDEO PREVIEW */}
        {formik.values.video && (
          <div className="ap-previews">
            <div className="ap-preview">
              <video
                src={URL.createObjectURL(formik.values.video)}
                controls
                className="ap-video-preview"
              />
              <button type="button" className="ap-remove" onClick={() => formik.setFieldValue("video", null)}>
                ✕
              </button>
            </div>
          </div>
        )}

        {/* ACTIONS */}
        <div className="ap-actions">
          <button className="ap-btn ap-btn-primary" type="submit">
            Update Product
          </button>
          <button type="button" className="ap-btn ap-btn-ghost" onClick={() => navigate("/listProduct")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
