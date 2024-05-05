import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const Gallery = ({ imageUrl }) => {
  const images = [
    {
      original: imageUrl,
      thumbnail: imageUrl,
      description: 'Captura formulario E-14'
    }
    // Agrega más imágenes según sea necesario
  ];

  return (
    <div>
      <ImageGallery items={images} />
    </div>
  );
};

export default Gallery;
