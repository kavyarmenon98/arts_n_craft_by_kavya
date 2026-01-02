
import ShopByCategory from "../product/ShopByCategory";
import "./home.css";
function HomePage3()
{

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["products"],
//     queryFn: () => getAllProductAPI(),
//   });
  const categories = [
    { title: 'Resin Product', imageUrl:[ 'src/assets/category/resin1.jpg','src/assets/category/resin2.jpg']  },
    { title: 'Mural Paints', imageUrl: ['src/assets/category/mural1.jpg', 'src/assets/image14.jpg']  },
    { title: 'Nettippattam', imageUrl: ['src/assets/image8.webp','src/assets/image9.jpg']  },
    { title: 'Craft Works', imageUrl: ['src/assets/category/craft1.jpg','src/assets/category/craft2.jpg'] },
  ];
  
    return(

        <>
    <section className="category-section mt-10">
      <h2 className="heading">Shop by Category</h2>
      <p className="subtitle">Our Product Category</p>

      <div className="card-row">
        {categories.map((c) => (
          <ShopByCategory
            key={c.title}
            title={c.title}
            imageUrl={c.imageUrl}
            link={c.imageUrl}
          />
        ))}
      </div>
    </section>
        </>
    )
}

export default HomePage3