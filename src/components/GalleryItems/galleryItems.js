import { useState } from 'react';
import { CustomModal} from '../Modal/modal';
import {ListItem, Item, Images} from './galleryItems.styled';

export const GalleryItem = ({images}) => {
      const [modalOpen, setModalOpen] = useState(false);
      const [selectedImage, setSelectedImage] = useState(null);

      
         // Обработчик открытия модального окна
        const openModal = (images) => {
          setSelectedImage(images);
          setModalOpen(true);}
  
      // Обработчик закрытия модального окна
      const closeModal = () => {
        setSelectedImage(null);
        setModalOpen(false);
    };
   
    if (!images || images.length === 0) {
        return null;
    }

    return (
        <ListItem className="gallery-list">
          {images.map((image) => (
            <Item key={image.id} className="gallery-item">
              <Images src={image.webformatURL} alt={`${image.id}`}  onClick={() => openModal(image)}/>
             
            </Item>
          ))}
    
          {modalOpen && (
            <CustomModal image={selectedImage} closeModal={closeModal}/>
          )}
        </ListItem>
      );
}