'use client'
import Link from "next/link";

export default function Register () {
    
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="bg-gray-500 py-24 px-20 rounded-xl w-1/4 ">
                <h3 className="text-3xl pb-10">Register now</h3>
                <form action="">
                    <div className="flex justify-between">
                        <div>
                            <label htmlFor="" className="block text-lg">First name</label>
                            <input type="text" className="py-1 px-2 mt-1 mb-5 rounded-sm w-full" />
                        </div>
                        <div>
                            <label htmlFor="" className="block text-lg">Last name</label>
                            <input type="text" className="py-1 px-2 mt-1 mb-5 rounded-sm w-full" />
                        </div>
                    </div>
                    
                    <label htmlFor="" className="block text-lg">Username</label>
                    <input type="text" className="py-1 px-2 mt-1 mb-5 rounded-sm w-full" />
                    <label htmlFor="" className="block text-lg">Email</label>
                    <input type="email" className="py-1 px-2 mt-1 mb-5 rounded-sm w-full" />
                    <label htmlFor="" className="block text-lg">Password</label>
                    <input type="password" className="py-1 px-2 mt-1 mb-5 rounded-sm w-full" />
                    <button type="submit" className="block justify-center py-1 px-6 mb-5 mt-3 bg-stone-400 text-lg">Login</button>
                    <p>Already have an account? <Link href="/login" className="text-white">Sign in!</Link> </p>
                </form>
            </div>
        </div>
    )
}