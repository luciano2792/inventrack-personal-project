import Image from "next/image"
import OverviewInventory from "./OverviewInventory"
import Filter from "./Filter"
import Sidebar from "./Sidebar"

export default function Home () {
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
      
    </div>
    )
}