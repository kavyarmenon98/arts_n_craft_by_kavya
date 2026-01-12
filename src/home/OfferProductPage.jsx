import { useQuery } from "@tanstack/react-query";
import { getAllProductAPI } from "../services/service"; // Your API service
import PageLoader from "../common/PageLoader";
import "./home.css";
import { useNavigate } from "react-router-dom";

export default function OfferProductPage() {
  const navigate = useNavigate();

  // Fetch all products
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProductAPI,
  });
console.log(data,"data");

  if (isLoading) {
    return (
      <div className="loader-wrap">
        <PageLoader />
      </div>
    );
  }

  // Filter products with discount > 15%
  const offerProducts =
    data?.readproduct?.filter((product) => product.discountPercentage > 15) || [];

  if (offerProducts.length === 0) {
    return (
      <div className="no-offers">
        <h3>No offers available right now 😔</h3>
        <p>Check back later for exciting discounts!</p>
      </div>
    );
  }

  return (
    <div className="offer-products-page">
      <h2 className="page-header">🔥 Hot Offers</h2>

      <div className="offer-products-grid">
        {offerProducts.map((product) => (
          <div
            key={product._id}
            className="offer-product-card card"
            onClick={() => navigate(`/product/${product._id}`)}
          >
            <img
              src={product.image}
              alt={product.name}
              className="product-img"
            />

            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>

              <div className="price-section">
                <span className="discounted-price">₹{product.price}</span>
                <span className="original-price">
                  ₹{Math.round(
                    product.price / (1 - product.discountPercentage / 100)
                  )}
                </span>
              </div>

              <span className="discount-badge">
                {product.discountPercentage}% OFF
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
