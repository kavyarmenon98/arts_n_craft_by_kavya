import { useQuery } from "@tanstack/react-query";
import { getProductByIdAPI } from "../services/service";
import { useParams } from "react-router-dom";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBinFill } from "react-icons/ri";
import Slider from "react-slick";

export default function ViewProduct()
{
 
    const { id } = useParams(); 
    
    const { data  } = useQuery({
      queryKey: ["products"],
      queryFn: () => getProductByIdAPI(id),
    }); 
    const settings = {
        dots: true,              // Show navigation dots
        infinite: true,          // Loop slides
        speed: 500,              // Transition speed (ms)
        slidesToShow: 1,         // Show one slide at a time
        slidesToScroll: 1,       // Scroll one slide at a time
        autoplay: true,          // Auto slide
        autoplaySpeed: 3000,     // Delay between slides
        arrows: true,            // Show prev/next arrows
        responsive: [
          {
            breakpoint: 768,     // Mobile view
            settings: {
              arrows: false,     // Hide arrows on mobile
              dots: true
            }
          }
        ]
      };
    return(

        <>
   
            <div className="card bg-base-100 shadow-sm m-5"   style={{ background:'linear-gradient(rgb(32, 31, 31) 0%, rgb(22 22 22) 100%)',color: '#fff', borderRadius: '17px' ,width:'70%', margin:'auto' }}>
                <div  style={{height:'70%',  backgroundColor: '#141414',  color: '#fff'}}>
                     <Slider {...settings}>
                                {data?.product?.images.map((src, index) => (
                                <div key={index}>
                                    <img
                                    src={src}
                                    alt={`Slide ${index + 1}`}
                                    style={{
                                        width: "70%", 
                                        borderRadius: "8px"
                                    }}
                                    />
                                </div>
                                ))}
                        </Slider>
                 </div>
                <div className="flex flex-col p-5 gap-6">
                    <div className="flex justify-between">
                          <h2 className="card-title">{data?.product?.pname}</h2>
                          <div className="mt-1">{data?.product?.price}</div>
                    </div>   
                    <div className="flex justify-between">
                         <div className="text-base">{data?.product?.description}</div>
                    </div>   
                    <div className="flex justify-between">
                            <div className="text-base">Category: {data?.product?.category}</div>
                            {data?.product?.instock > 0 ? <div className="badge badge-success p-2">In Stock</div> : <div className="badge badge-error p-2">Out of Stock</div>}
                    </div>   
                    <div className="flex justify-end gap-5">
                        <GrEdit />
                        <RiDeleteBinFill /> 
           
                    </div>
                </div>           
         </div>
             

        </>
    )
}