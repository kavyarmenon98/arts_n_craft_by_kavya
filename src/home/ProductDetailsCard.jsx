import ImageSlider from "./ImageSlider"

function ProductDetailsCard(){
    
const image_set1 =[ 
 "src/assets/image2.jpg", 
 "src/assets/image4.jpg", 

 "src/assets/image13.png",
 "src/assets/image14.jpg", 
 "src/assets/image16.jpg", 
]
const image_set2 =[
 "src/assets/image8.webp",
 "src/assets/image9.jpg",
 "src/assets/image10.jpg",
 "src/assets/image11.webp",
 "src/assets/image18.jpg",
 "src/assets/image19.jpg",
 "src/assets/image17.jpg",


]


    return(
        <>
        <div className="flex flex-col p-2 m-3  items-center"
  style={{
     background: 'linear-gradient(rgb(32 31 31) 0%, rgb(4 4 4) 100%)',
    color: '#fff',
    width: '620px',
    height: '800px',
    borderRadius: '17px'
  }}>
            {/* <img src="src/assets/image4.jpg" style={{width:'400px',height:'300px',borderRadius: '10px'}}  /> */}
            <ImageSlider image={image_set1} styleForImage={{ width: '400px',  margin: "auto", borderRadius: "8px"}}  />
            <div className="mt-2 text-2xl">
                Kerala Mural Painting
            </div>
            <div className="mt-3 p-5" style={{  lineHeight: '1.6',textAlign: 'center'}}>
                Kerala mural paintings have their origins in about the seventh or eighth centuries AD, temples dating to which period are the earliest that have been found. Most paintings have been dated to the period of the ninth to twelfth centuries. Some of the oldest murals, and the oldest extant paintings of the Kerala school of mural paintings can be found on the walls of the rock cut cave temples of Thrunanadikkara and Tiruvanchikulam, dated to about the ninth century AD. Kerala Murals were heavily influenced by Pallava art and culture, since they grew under the Pallavas’ patronage. 
            </div>
        </div>

          <div className="flex flex-col p-2 m-3  items-center"  style={{ background: 'linear-gradient(rgb(32 31 31) 0%, rgb(4 4 4) 100%)',
    color: '#fff',
    width: '620px',
    height: '800px',
    borderRadius: '17px'
  }}>
            {/* <img src="src/assets/image8.webp" style={{width:'400px',height:'300px',borderRadius: '10px'}}  /> */}
            <ImageSlider image={image_set2} styleForImage={{ width: '400px',  margin: "auto", borderRadius: "8px"}} />
            
            <div className="mt-2 text-2xl">
                Traditional Nettipattam
            </div>
            <div className="mt-3 p-5" style={{  lineHeight: '1.6',textAlign: 'center'}}>
               Traditional Nettipattam, also known as the elephant caparison, is a stunning piece of art that adds charm and elegance to any occasion. These beautifully crafted umbrellas have a rich history and are an integral part of Kerala's cultural heritage. They are used to decorate elephants during festivals and are also used as wall hangings in homes and offices. The Nettipattam is made of copper and gold, and it is believed that keeping it at home brings prosperity and blessings. The craftsmanship of Nettipattam reflects centuries-old temple decoration techniques, making each piece unique.
            </div>
        </div>
        </>
    )
}
export default ProductDetailsCard