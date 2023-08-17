import Link from "next/link"
import Image from "next/image"


export default function Sidebar () {
    return (
        <div className="bg-gray-200 h-full px-10 text-white rounded-md">
            <Link href="/user/:id" prefetch={false}>
                <Image className="pt-24" src="/home.png" alt="account info" width={64} height={20} ></Image>
            </Link> 
            <Link href="/user/:id" prefetch={false}>
                <Image className="pt-24" src="/products.png" alt="account info" width={64} height={20} ></Image>
            </Link> 
            <Link href="/user/:id" prefetch={false}>
                <Image className="pt-24" src="/inventory.png" alt="account info" width={64} height={20} ></Image>
            </Link> 
            <Link href="/user/:id" prefetch={false}>
                <Image className="pt-24" src="/log-out.png" alt="account info" width={64} height={20} ></Image>
            </Link>
        </div>
    )
}