"use client"

import { useState } from "react";
import Image from "next/image";
import Modal from "react-modal";
import axios from "axios";
import { createInventory } from "../lib/apiRoutes";

Modal.setAppElement("#newinventorymodal");

const NewInventory = () => {

  // AWS Connection

  const BUCKET_URL = "https://inventrackinventorypfp.s3.amazonaws.com/";
    const [uploadedFile, setUploadedFile] = useState<any>();
    
    
    const uploadFile = async () => {
      
      console.log(file)
      
      let { data } = await axios.post("/api/awsInventoryConnection", {
        name: file.name,
        type: file.type,
      });
      
      console.log(data);
      
      const url = data.url;
      let { data: newData } = await axios.put(url, file, {
            headers: {
              "Content-type": file.type,
              "Access-Control-Allow-Origin": "*",
            },
          });
          
          setUploadedFile(BUCKET_URL + file.name)
    };
        
        //Modal
        
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [inventoryProfilePicture, setInventoryProfilePicture] = useState("");
  const [file, setFile] = useState<any>();
        
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await uploadFile();
    await createInventory({title: title, description: description, inventoryProfilePictureURL: inventoryProfilePicture});
    closeModal();
  };

  const selectFile = (e: any) => {
    setFile(e.target.files[0]);
    setInventoryProfilePicture(BUCKET_URL + e.target.files[0].name)
  }

  return (
    <div>
        <button onClick={() => openModal()}>+ New Project</button>

        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-3/4 bg-white rounded-xl p-8"
        >
        <h1 className="text-3xl mb-6">New Project</h1>
        <form onSubmit={handleSubmit}>
            <label>Title</label>
            <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
            <label>Description</label>
            <input
            type="text"
            placeholder="Title"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
            <label>Set profile picture for your new inventory</label>
            <input
            type="file"
            onChange={(e) => {selectFile(e)}}
            />
            {file && <Image src={URL.createObjectURL(file)} width={200} height={100} alt='image' />}
            <button type="submit">Create</button>
        </form>
        </Modal>
    </div>
  )
}

export default NewInventory;