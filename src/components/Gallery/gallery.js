import { GalleryItem } from "../GalleryItems/galleryItems";
import{ Container,} from './gallery.styled'

export const Gallery = ({ images }) => {
    return(
        <Container>
                <GalleryItem images={images}/>
        </Container>
    )
}