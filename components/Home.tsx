'use client'
import Image from "next/image"
import OverviewInventory from "./OverviewInventory"
import Filter from "./Filter"
import Sidebar from "./Sidebar"
import axios from "axios"
import { useState } from "react"

export default function Home () {

  const BUCKET_URL = "https://inventrackpfp.s3.amazonaws.com/";
  const [file, setFile] = useState<any>();
  const [uploadingStatus, setUploadingStatus] = useState<any>();
  const [uploadedFile, setUploadedFile] = useState<any>();

  const selectFile = (e: any) => {
    setFile(e.target.files[0]);
  }

  const uploadFile = async () => {
    setUploadingStatus("Uploading the file to AWS S3");

    let { data } = await axios.post("/api/awsConnection", {
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

    setUploadedFile(BUCKET_URL + file.name);
    setFile(null);
  };

    return (
    <div className="flex min-h-screen justify-items-stretch p-24">
      <div>
        <Sidebar />
      </div>
      <div className="w-full px-12">
        <div className="flex justify-between w-full">
          <h1 className="text-6xl">InvenTrack</h1>
          <div className="flex justify-between items-center">
            <Image className="" src="/user.png" height={20} width={25} alt="user"></Image>
            <p>Log out</p>
          </div>
          
        </div>
        <div className="flex w-full py-6 text-xl">
          <p>Bienvenido, @anyone!</p>
        </div>
        <div className="flex w-full text-lg pb-3">
          Filter here!
        </div>
        <div className="flex w-full pb-5">
          <Filter />
        </div>
        <div className="flex w-full flex-wrap justify-between">
          <OverviewInventory/>
          <OverviewInventory/>
          <OverviewInventory/>
          <OverviewInventory/>
        </div>
      </div>

      <div>
        <p>Select a file XDDD</p>
        <input type="file" onChange={(e) => selectFile(e)} />
        <button
          onClick={uploadFile}
          className=" bg-purple-500 text-white p-2 rounded-sm shadow-md hover:bg-purple-700 transition-all"
        >
          Upload a File!
        </button>
        {uploadingStatus && <p>{uploadingStatus}</p>}
        {uploadedFile && <img src={uploadedFile} />}
      </div>
      
    </div>
    )
}