import React, { useState, useEffect, useCallback } from 'react';
import './CarouselModal.css';

const CarouselModal = ({ toggleModal, handleToggleModal, images, image }) => {

    const [currentImage, setCurrentImage]= useState(image);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [previousImage, setPreviousImage] = useState({});
    const [nextImage, setNextImage] = useState({});
    
    const handleNextAndPrevious = useCallback((selectedImage) => {
        // GETTING IMAGE INDEX
        let currentImageIndex = images.indexOf(selectedImage);
        let next = '';
        let previous = '';
        if(images.length > 0) {
            if(currentImageIndex === 0) { // IF IT'S THE FIRST IMAGE
                next = images[currentImageIndex + 1];
            }else if(currentImageIndex === images.length-1){ // IF IT'S THE LAST IMAGE
                previous = images[currentImageIndex - 1];
            }else {
                next = images[currentImageIndex + 1];
                previous = images[currentImageIndex - 1];
            }
        }

        setSelectedImageIndex(currentImageIndex + 1);
        setPreviousImage(previous);
        setNextImage(next);

    }, [images]);

    useEffect(() => {
        if(toggleModal){
            setCurrentImage(image);
            handleNextAndPrevious(image);

            // TO REMOVE SCROLL ON MODAL OPEN
            document.body.style.overflow = "hidden";
        }else {
            setCurrentImage({});
            // TO ADD SCROLL ON MODAL CLOSE
            document.body.style.overflow = "";
        }
    }, [toggleModal, image, images, handleNextAndPrevious]);

    // ON PREVIOUS BUTTON CLICK
    const handleNext = () => {
        setCurrentImage(nextImage);
        handleNextAndPrevious(nextImage);
    }

    // ON PREVIOUS BUTTON CLICK
    const handlePrevious = () => {
        setCurrentImage(previousImage);
        handleNextAndPrevious(previousImage);
    }

    return (
        <div className={`carousel-modal ${ toggleModal ? 'd-flex' : 'd-none' }`}>
            {/* PREVIOUS BUTTON */}
            <button className='btn previous-btn' onClick={() => handlePrevious()} disabled={ !previousImage }>&#8249;</button>
            {/* MODAL BODY */}
            <div className='container d-flex flex-column justify-content-center align-items-center'>
                {/* CLOSE BUTTON */}
                <div className='col-12 col-md-6 close-btn-box text-end'>
                    <button className='btn text-white' onClick={() => handleToggleModal(false)}>x</button>
                </div>
                {/* IMAGE AND NAME */}
                <div className='col-md-6'>
                    <img src={currentImage.url} alt={currentImage.name} width="100%" />
                    <div className='image-name py-1'>
                        <span>{currentImage.name}</span>
                    </div>
                </div>
                {/* IMAGE INDEX */}
                <div className='col-md-6 '>
                    <span className='image-number p-1 mt-3'>image {selectedImageIndex}/{images.length}</span>
                </div>
            </div>
            {/* NEXT BUTTON */}
            <button className='btn next-btn' onClick={() => handleNext()} disabled={ !nextImage }>&#8250;</button>
        </div>
    );
}

export default CarouselModal;