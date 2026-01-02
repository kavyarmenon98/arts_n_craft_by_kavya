import ProductDetailsCard from "./ProductDetailsCard"

function HomePage2(){
    return(
        <>
        <div className="flex flex-col p-2 mt-15 items-center"  style={{ height: '570px',backgroundColor: 'black',color: '#fff'}}>
            <img src=" \src\assets\logo2.png" style={{width: '435px',height: '200px'}} />
            <div className="elegant-quote mt-6">
                ENCHANTING YOU SINCE 2019. DISCOVER THE REFINED AND EXCLUSIVE COLLECTION BY KAVYA ARTS & CRAFT. EXPERTLY CURATED PRODUCTS BRING GRANDEUR TO YOUR SPACE, ENSURING UNIQUENESS AND ELEGANCE.
            </div>
       </div>
       <div className="flex p-2 mt-5 items-center">
        <ProductDetailsCard/>
       </div>
        </>
    )
}
export default HomePage2