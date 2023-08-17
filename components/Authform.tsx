"use client"
import {register, signin} from '../lib/apiRoutes'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Image from 'next/image'

const registerContent = {
    linkUrl: "/login",
    linkText: "Already have an account?",
    header: "Create a new Account",
    description: "Create and manage your inventories here!",
    buttonText: "Register",
  };
  
  const signinContent = {
    linkUrl: "/register",
    linkText: "Don't have an account?",
    header: "Welcome Back",
    description: "Enter your credentials to access your account",
    buttonText: "Sign In",
  };

const initialFields = { email: "", username: "", password: "", firstName: "", lastName: "", profilePictureURL: "" };




export default function Authform({mode}: {mode: "register" | "signin"}){

    //AWS Connection

    const BUCKET_URL = "https://inventrackpfp.s3.amazonaws.com/";
    const [file, setFile] = useState<any>();
    const [uploadedFile, setUploadedFile] = useState<any>();

    
    const uploadFile = async () => {

        console.log(file)
        
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
        
        setUploadedFile(BUCKET_URL + file.name)
    };
    
    const selectFile =  (e: any) => {
        console.log(e)
        setFile(e.target.files[0]);
        setFormState((s) => ({...s, profilePictureURL: BUCKET_URL + e.target.files[0].name }))
    }
    //Form submission
    
    const [formState, setFormState] = useState({ ...initialFields });
    
    const router = useRouter();
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        
        if (mode === "register") {
            await uploadFile();
            await register(formState);
        } else {
            await signin(formState);
        }

            setFormState({ ...initialFields });
            router.replace("/home");
        
        }

    const content = mode === "register" ? registerContent : signinContent;

    return (
        <div>
            {mode === "register" && (
                <div className="flex min-h-screen items-center justify-center">
                    <div className="bg-gray-300 py-24 px-20 rounded-xl w-1/4 ">
                        <h3 className="text-3xl pb-7">{content.header}</h3>
                        <p className='pb-5 text-lg'>{content.description}</p>
                        <form onSubmit={handleSubmit}>
                            <div className="flex justify-between">
                                <div className=''>
                                    <label htmlFor="" className="block text-lg">First name</label>
                                    <input type="text" 
                                        className="py-1 px-2 mt-1 mb-5 rounded-sm w-full"
                                        required
                                        placeholder='First name'
                                        value={formState.firstName}
                                        onChange={(e) => {
                                            setFormState((s) => ({ ...s, firstName: e.target.value}))
                                        }}
                                    />
                                </div>
                                <div className='ml-4'>
                                    <label htmlFor="" className="block text-lg">Last name</label>
                                    <input type="text"
                                        className="py-1 px-2 mt-1 mb-5 rounded-sm w-full"
                                        required
                                        placeholder='Last name'
                                        value={formState.lastName}
                                        onChange={(e) => {
                                            setFormState((s) => ({ ...s, lastName: e.target.value}))
                                        }}
                                    />
                                </div>
                            </div>
                            
                            <label htmlFor="" className="block text-lg">Profile picture</label>
                            <input type="file" onChange={(e) => {selectFile(e)}} />
                            {file && <Image src={URL.createObjectURL(file)} width={200} height={100} alt='image' />}
                            <label htmlFor="" className="block text-lg">Username</label>
                            <input type="text" 
                                className="py-1 px-2 mt-1 mb-5 rounded-sm w-full"
                                required
                                placeholder='Username'
                                value={formState.username}
                                onChange={(e) => {
                                    setFormState((s) => ({ ...s, username: e.target.value}))
                                }}
                            />
                            <label htmlFor="" className="block text-lg">Email</label>
                            <input type="email" 
                                className="py-1 px-2 mt-1 mb-5 rounded-sm w-full"
                                required
                                placeholder='Email'
                                value={formState.email}
                                onChange={(e) => {
                                    setFormState((s) => ({ ...s, email: e.target.value}))
                                }}
                            />
                            <label htmlFor="" className="block text-lg">Password</label>
                            <input type="password" 
                                className="py-1 px-2 mt-1 mb-5 rounded-sm w-full"
                                required
                                placeholder='Password'
                                value={formState.password}
                                onChange={(e) => {
                                    setFormState((s) => ({ ...s, password: e.target.value}))
                                }}    
                            />
                            <button type='submit' className="block justify-center py-1 px-6 mb-5 mt-3 bg-stone-400 text-lg">{content.buttonText}</button>
                            <p>{content.linkText} <Link href={content.linkUrl} className="text-white">Sign in!</Link> </p>
                        </form>
                    </div>
                </div>
            )}
            {mode === "signin" && (
            <div className="flex min-h-screen items-center justify-center">
                <div className="bg-gray-300 py-24 px-20 rounded-xl w-1/4">
                    <h3 className="text-3xl pb-5">{content.header}</h3>
                    <p className='py-3'>{content.description}</p>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="" className="block text-lg">Username</label>
                        <input type="text" 
                            className="py-1 px-2 mt-1 mb-5 rounded-sm w-full"
                            required
                            placeholder='Username'
                            value={formState.username}
                            onChange={(e) => {
                                setFormState((s) => ({ ...s, username: e.target.value}))
                            }}   
                        />
                        <label htmlFor="" className="block text-lg">Password</label>
                        <input type="password" 
                        className="py-1 px-2 mt-1 mb-5 rounded-sm w-full"
                            required
                            placeholder='Password'
                            value={formState.password}
                            onChange={(e) => {
                                setFormState((s) => ({ ...s, password: e.target.value}))
                            }}  
                        />
                        <button type="submit"  className="block justify-center py-1 px-6 mb-5 mt-3 bg-stone-400 text-lg">Login</button>
                        <p>{content.linkText} <Link href={content.linkUrl} className="text-white">Register now!</Link> </p>
                    </form>
                </div>
            </div>)}
        </div>
    )
}