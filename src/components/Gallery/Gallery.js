import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Gallery.css';

const Gallery = () => {

    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            await axios.get('https://scaleflex.cloudimg.io/v7/0.fe_task_static/pictures.json?vh=7a646d&func=proxy').then(res => {
                setImages(res.data);
            }).catch(err => {
                console.log(err);
            });
        }

        fetchImages();
    }, []);

    return (
        <div className='container pt-3'>
            <div className='row'>
                {
                    images.length > 0 &&
                        images.map(image => {
                            return (
                                <div key={image.uuid} className='col-6 col-sm-6 col-md-4 col-lg-3 mb-4'>
                                    <img src={image.url} alt={image.name} width="100%" height={'100%'} className="picture-box" />
                                </div>
                            );
                        })
                }
            </div>
        </div>
    );
}

export default Gallery;