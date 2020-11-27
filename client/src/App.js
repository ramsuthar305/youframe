import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import './App.css';
import axios from 'axios';
import icon from './icon.png'
import ImageRow from './ImageRow';


function App() {
  const BASE_URL = 'http://localhost:5000/';
  const [image, setImage] = useState(null)
  const [imageUrls, setImageUrls] = useState([])
  const [modalMessage, setModalMessage] = useState('')
  const [imageView, setImageView] = useState(false)

  const [modal, setModal] = useState(false);
  const toggle = () => {
    if (imageView) {
      setImageView(false)
    }
    setModal(!modal);
  }
  const toggleViewImage = (imgUri) => {
    toggle()
    setImageView(imgUri)
  }



  const selectFiles = async (event) => {
    try {
      let image = event.target.files[0];
      setImage(image)
      const data = new FormData();
      data.append("image", image, image.name);
      const response = await axios.post(BASE_URL + 'images', data)
      console.log(response.data)
      setImageUrls([response.data.newImage, ...imageUrls])
    } catch (error) {
      if (error.response.status === 406) {
        setModalMessage("Please upload a valid image file.")
        toggle()
      } else if (error.response.status === 500) {
        setModalMessage("Opps something went wrong")
        toggle()
      }
    }
  }


  const getImages = async () => {
    const imgs = await axios.get(BASE_URL + 'images')
    console.log(imgs)
    setImageUrls([...imgs.data.arr])
  }

  useEffect(() => {
    getImages()
  }, [])

  return (
    <div className="App" >
      <Modal isOpen={modal} toggle={toggle}>
        {!imageView ?
          <>
            <ModalBody>


              <div className="m-auto text-center mt-4 pt-4 pb-4">
                <h3 className="text-danger"> Error! </h3>
              </div>
              <div className="m-auto text-center mt-4 pt-4">
                {modalMessage}
              </div>


            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={toggle}>Okay got it</Button>
            </ModalFooter>
          </> :
            <img src={imageView} className="w-100" />
        }
      </Modal>
      <div className="bg-default" style={{ height: "45vh" }} >
        <div style={{ paddingTop: "10vh" }}>
          <img src={icon} />
          <h1 className="text-white p-3 m-auto mb-4" >YouFrame</h1>
          <div className="text-center m-auto">
            <span className="text-light">One frame for your picture album!</span>
          </div>
          <button className="btn btn-outline-primary" style={{ marginTop: "6vh" }} id="tmp">Upload</button>
          <input className="form-control mx-auto w-25 mt-4" id="fileUpload" type="file" hidden onChange={selectFiles} />
        </div>
      </div>
      <ImageRow imageUrls={imageUrls} toggleViewImage={toggleViewImage} />
    </div>
  );
}

export default App;
