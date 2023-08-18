import Image from 'next/image'

export default function OverviewInventory ({inventoryProfilePicture, title, description}: {inventoryProfilePicture: string, title: string, description: string}) {
    return (
        <div className="rounded-xl flex-wrap pb-10 pr-5">
            <Image className='object-cover h-28 w-72' src={inventoryProfilePicture} height={100} width={300} alt='xdd'></Image>
            <div className="bg-stone-200 block w-full pt-2 pb-3 px-3">
                <p className='text-xl pb-1'>{title}</p>
                <p className='text-neutral-600'>{description}</p>
            </div> 
        </div>
    )
}