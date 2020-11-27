import React from 'react'

function ImageRow({ imageUrls, toggleViewImage }) {
    const BASE_URL = 'http://localhost:5000/';
    const arr = imageUrls.map((img, index) =>
        <div className="col-md-4 p-4" key={img._id} onClick={()=>toggleViewImage(BASE_URL + img.imageUrl)}>
            <img src={BASE_URL + img.imageUrl} alt="image" id={img._id} key={index} style={{ maxHeight: "40vh", maxWidth: "40vh" }} className="m-auto rounded preview-image" />
        </div>
    )
    return (
        <div className="row m-auto p-4 my-4">
            {arr}
        </div>
    )
}

export default ImageRow
