import { GrEdit } from "react-icons/gr"
import ImageSlider from "../home/ImageSlider"
import { RiDeleteBinFill } from "react-icons/ri"
import { FaEye } from "react-icons/fa"
import { useNavigate } from "react-router-dom";

function ProductCard(props){

  const navigate = useNavigate();

    return(

<>
  {props?.details?.readproduct?.map((item) => (
          <div className="card bg-base-100 w-96 shadow-sm m-5"   style={{ background:'linear-gradient(rgb(32, 31, 31) 0%, rgb(22 22 22) 100%)',color: '#fff', borderRadius: '17px' }}>
            <figure className="px-5 pt-5">
                    {/* <img style={{ width: '300px', height:'300px'}} src={item.image}  alt="Shoes" className="rounded-xl" />            <ImageSlider image={image_set1} styleForImage={{ width: '400px',  margin: "auto", borderRadius: "8px"}}  /> */}
            <ImageSlider image={item.images} styleForImage={{ width: '300px', height:'300px',  margin: "auto", borderRadius: "8px"}}  />
                    
            </figure>
            <div className="flex flex-col p-5 gap-6">
                <div className="flex justify-between">
                    <h2 className="card-title">{item.pname}</h2>
                    <div className="mt-1">{item.price}</div>
                </div>   
                <div className="flex justify-between">
                    <div className="text-base">{item.description}</div>
                </div>   
                <div className="flex justify-between">
                    <div className="text-base">Category: {item.category}</div>
                    {item.instock > 0 ? (<div className="badge badge-success p-2">In Stock</div>) : (<div className="badge badge-error p-2">Out of Stock</div>)}
                </div>   
                <div className="flex justify-end gap-5">
                <FaEye   onClick={() => navigate(`/viewProduct/${item._id}`)} />
                <GrEdit />
                <RiDeleteBinFill /> 

                </div>
            </div>            
        

               {/* <div className="card-actions">
                    <button className="btn btn-primary">Buy Now</button>
                </div> */} 
    </div>
        ))}
   
</>
    )
}

export default ProductCard