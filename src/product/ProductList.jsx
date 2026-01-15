import { getAllProductAPI } from "../services/service";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import PageLoader from "../common/PageLoader";

export default function ProductList() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => getAllProductAPI(),
  });

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <PageLoader />
        </div>
      ) : (
        <div className="w-full px-3 sm:px-6 py-6">
          <div
            className="
              grid 
              grid-cols-1 
              lg:grid-cols-3
              gap-6
            "
          >
            <ProductCard details={data} />
          </div>
        </div>
      )}
    </>
  );
}
