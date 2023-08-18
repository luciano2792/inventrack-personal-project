import Image from "next/image"
import OverviewInventory from "./OverviewInventory"
import Filter from "./Filter"
import Sidebar from "./Sidebar"
import { getUserFromCookie } from "../lib/auth"
import { cookies } from "next/headers"
import { db } from "../lib/dbConnection"
import NewInventoryModal from "./NewInventory(Modal)"

const getUser = async () => {
  const user = await getUserFromCookie(cookies());
  
  return user;
}

const getData = async () => {
  const user: any = getUser();
  const inventories: any[] = await db.inventory.findMany({
    take: 5,
    where: {
      ownerId: user?.id
    }
  })

  return {inventories};
}

export default async function Home () {

  const user = await getUser();

  const {inventories} = await getData();

    return (
    <>
      <div className="flex min-h-screen justify-items-stretch">
        <div>
          <Sidebar />
        </div>
        <div className="w-full px-12 pt-24">
          <div className="flex justify-between w-full">
            <h1 className="text-6xl">InvenTrack</h1>
            <div className="flex justify-between items-center">
              <Image src={user?.profilePictureURL} height={20} width={25} alt="user"></Image>
              <p>Log out</p>
            </div>
          </div>
          <div className="flex w-full py-6 text-xl">
            <p>Welcome, {user?.firstName}</p>
          </div>
          <div className="flex w-full text-lg pb-3">
            Filter here!
          </div>
          <div className="flex w-full pb-5">
            <Filter />
          </div>
          <div>
            <NewInventoryModal />
          </div>
          <div className="flex flex-wrap justify-start">
            {
              inventories.map((inventory: any) => (
                  <OverviewInventory key={inventory.id} inventoryProfilePicture={inventory.inventoryProfilePictureURL} 
                  title={inventory.title}
                  description={inventory.description} />
              ))
            }
          </div>
        </div>      
      </div>
    </>
    )
}