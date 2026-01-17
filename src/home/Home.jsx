import WhatsAppButton from "../common/WhatsAppButton"
import HomePage1 from "./HomePage1"
import HomePage2 from "./HomePage2"
import HomePage3 from "./HomePage3"
import BrandStory from "./BrandStory"
import BulkGifting from "./BulkGifting"
import Review from "./Review"

function Home() {
    return (
        <>
            <WhatsAppButton />
            <HomePage1 />
            <HomePage3 />
            <HomePage2 />
            <BrandStory />
            <BulkGifting />
            <Review />


        </>
    )
}
export default Home