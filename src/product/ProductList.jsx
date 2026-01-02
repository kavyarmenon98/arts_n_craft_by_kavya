import { useSelector } from "react-redux";
import { getAllProductAPI } from "../services/service";
import { useQuery } from "@tanstack/react-query";
import ProductCard from './ProductCard';
import PageLoader from "../common/PageLoader";

export default function ProductList(){
  const { token } = useSelector((state) => state.auth);

  const { data ,isLoading  } = useQuery({
    queryKey: ["products"],
    queryFn: () => getAllProductAPI(token),
  }); 
  
    return(
        <>
        {isLoading ?
          <PageLoader /> :  
           <div className="grid  grid-cols-3 p-6" >
              <ProductCard details={data}/>
          </div>
        }
      

      
        </>
    )
}