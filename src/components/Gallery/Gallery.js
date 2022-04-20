import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarouselModal from '../CarouselModal/CarouselModal';

import './Gallery.css';

const Gallery = () => {

    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState({});
    const [loading, setLoading] = useState(true);
    
    const [toggleModal, setToggleModal] = useState(false);

    useEffect(() => {
        const fetchImages = async () => {
            await axios.get('https://scaleflex.cloudimg.io/v7/0.fe_task_static/pictures.json?vh=7a646d&func=proxy').then(res => {
                setImages(res.data);
                setLoading(false);
            }).catch(err => {
                console.log(err);
            });
        }

        fetchImages();
    }, []);

    const handleShowModal = (image) => {
        setSelectedImage(image);
        setToggleModal(true);
    }

    return (
        <div className='container pt-3'>
            <div className='row'>
                {
                    loading ? 
                        <div className='spinner-border m-auto' role={'status'}></div>
                    :
                    images.length > 0 &&
                        images.map(image => {
                            return (
                                <div key={image.uuid} className='col-6 col-sm-6 col-md-4 col-lg-3 mb-4'>
                                    <img src={image.url} alt='' width="100%" height="100%" className="picture-box" onClick={() => handleShowModal(image)} />
                                </div>
                            );
                        })
                }
            </div>
            <CarouselModal
                toggleModal={toggleModal}
                handleToggleModal={setToggleModal}
                images={images}
                image={selectedImage}
            />
        </div>
    );
}

export default Gallery;