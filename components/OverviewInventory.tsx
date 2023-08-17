import Image from 'next/image'

export default function OverviewInventory ({inventoryProfilePicture, title, description}) {
    return (
        <div className="rounded-xl flex-wrap pb-10">
            <Image src={inventoryProfilePicture} height={10} width={300} alt='xdd'></Image>
            <div className="bg-stone-200 inline-block w-full pt-2 pb-3 px-3">
                <p className='text-xl pb-1'>{title}</p>
                <p className='text-neutral-600'>{description}</p>
            </div> 
        </div>
    )
}