import { getAllProductByCategoryAPI } from "../services/service";
import { useQuery } from "@tanstack/react-query";
import PageLoader from "../common/PageLoader";
import { useParams } from "react-router-dom";
import ProductCard from "../product/ProductCard";

export default function Category(){
  const { id } = useParams(); 

  const { data ,isLoading  } = useQuery({
    queryKey: ["products",id],
    queryFn: () => getAllProductByCategoryAPI( id),
    enabled: !!id,
  }); 
  console.log(isLoading,"isLoading");
  
    return(
        <>
        {isLoading ?
          <div className="flex justify-center items-center h-screen">
            <PageLoader />
          </div>
         :  
           <div className="grid  grid-cols-3 p-6" >
              <ProductCard details={data}/>
          </div>
        }
      

      
        </>
    )
}