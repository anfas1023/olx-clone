import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { LuPlus } from "react-icons/lu";
import { doc, arrayUnion, updateDoc,getDoc,setDoc } from "firebase/firestore";
import {db,imageDb} from '../Service/firebase'

import {getDownloadURL,listAll,ref,uploadBytes,UploadResult} from 'firebase/storage'
import {v4} from 'uuid'


import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userAuth } from "@/Context/ProductContext";

type Product = {
  name: string;
  price: string;
  description: string;
  images: string[]; // Assuming array of image URLs
};
const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const auth = userAuth();

  if (!auth) {
    throw new Error("userauth is not defined on the navbar");
  }
  const { addProduct,user,logOut } = auth;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [product, setProduct] = useState<Product>({
    name: "",
    price: "",
    description: "",
    images: [],
  });

  const handleAddName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log("heloo");

    const { name, value } = e.target;

    setProduct({
      ...product,
      name: value,
    });
  };

  const handleAddPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log("heloo");

    const { name, id, value } = e.target;

    console.log(id);

    setProduct({
      ...product,
      price: value,
    });
  };

  const handleAddDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log("heloo");

    const { name, value } = e.target;
    setProduct({
      ...product,
      description: value,
    });
  };

  const handleUploadImages = async (files: FileList | null) => {
    if (files) {
      const imageURLs: string[] = [];
      const promises: Promise<UploadResult>[] = [];
  
      // Iterate over each file in the FileList
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        imageURLs.push(URL.createObjectURL(file));
  
        // Create a reference for each file in the storage
        const imageRef = ref(imageDb, `files/${v4()}`);
        // Upload the file to the storage and push the promise to the array
        promises.push(uploadBytes(imageRef, file));
      }
  
      try {
        // Wait for all uploads to complete
        const results = await Promise.all(promises);
        console.log('All files uploaded successfully:', results);
        
        // Update the product state with the image URLs
        if (product) setProduct({ ...product, images: imageURLs });
      } catch (error) {
        console.error('Error uploading files:', error);
      }
    }
  };



  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userEmail = user?.email;
      if (userEmail) {
        const userRef = doc(db, "users", userEmail);
  
        // Check if the document exists
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          // Document exists, update it
          await updateDoc(userRef, {
            Productdetails: arrayUnion({ ...product }),
          });
        } else {
          // Document doesn't exist, create it first
          await setDoc(userRef, { Productdetails: [{ ...product }] });
        }
  
        navigate("/");
        setIsOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout =async(e:React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault()
    navigate('/');
    try{
    await logOut();
  
    }catch (err){
      console.log(err);
      
    }
  
  
  
   }
  return (
    <>
      <div className="w-[100%] flex  items-center justify-around  bg-slate-100  ">
        <Link to="/">
          <h1 className="text-green-950 font-bold fonst-x cursor-pointer text-4xl">
            oLx
          </h1>
        </Link>

        <div className="w-[222px] h-[48px] mt-4  font-semibold rounded-lg border-2 border-black flex justify-center items-center">
          <select className="text-center bg-slate-100" id="cars" name="cars">
            <option value="volvo">Kerala</option>
            <option value="saab">Tamil Nadu</option>
            <option value="mercedes">Karnataka</option>
            <option value="audi">Andra Pradhesh</option>
          </select>
        </div>
        <div className="w-[48%] h-12 ml-5 mt-4 font-semibold rounded-lg border-2 border-black flex justify-around">
          <input
            type="text"
            placeholder="Search for vehicles"
            className="flex-1 h-full ml-2 px-2 bg-slate-100 focus:outline-none"
          ></input>

          <div className=" h-full   flex items-center ">
            <div className="h-12  rounded border-2 border-green-950 w-12 bg-green-950 flex justify-center items-center">
              <FiSearch size={20} className="text-white" />
            </div>
          </div>
        </div>

        <div className="w-[130px] h-[48px] border-2 border-green-950 mt-4 ml-4 relative inline-block">
          <select
            className="appearance-none bg-transparent border-none pl-4 pr-10 py-2 rounded-lg"
            id="cars"
            name="cars"
          >
            <option value="volvo">English</option>
            <option value="saab">Hindhi</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none ">
            <svg
              className="h-6 w-6 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={toggleDropdown}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

     {user?.email ? (
           <div className="ml-5 mt-3">
            
            <button onClick={handleLogout} className='text-transform: capitalize bg-slate-100 px-6 py-2 rounded '>Logout</button>
          
         </div>
     ):(
      <div className="ml-5 mt-3">
      <Link to="/login">
        <p className="underline decoration-solid font-medium text-xl">
          Login
        </p>
      </Link>
    </div>
     )}
     
        <div className="relative">
          <Dialog >
            <DialogTrigger asChild>
              <Button onClick={()=>setIsOpen(true)}
                className=" mt-5 bg-gray-200 border-col px-6 py-2 text-xl rounded-3xl font-sans font-semibold border-4  border-t-sky-500  border-l-yellow-400 border-r-blue-600 border-b-green-500"
                variant="outline"
              >
                Sell
              </Button>
            </DialogTrigger>
            {isOpen && (<DialogContent className="sm:max-w-[425px] bg-white">
              <DialogHeader>
                <DialogTitle>Sell A Product</DialogTitle>
                <DialogDescription>
                  Here You Can Sell Your Product
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Product Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter Product Name"
                      className="col-span-3"
                      onChange={handleAddName}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                      Product Price
                    </Label>
                    <Input
                      id="price"
                      placeholder="Enter Product Price"
                      className="col-span-3"
                      onChange={handleAddPrice}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Product Description
                    </Label>
                    <Input
                      id="description"
                      placeholder="Enter Product Description"
                      className="col-span-3"
                      onChange={handleAddDescription}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="images" className="text-right">
                      Add Images
                    </Label>
                    <Input
                      type="file"
                      id="images"
                      accept="image/*"
                      multiple
                      className="col-span-3"
                      onChange={(e) => handleUploadImages(e.target.files)}
                    />
                  </div>
                </div>
                <Button type="submit">Submit</Button>
              </form>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>) }
          </Dialog>
         

          {/* <span className="absolute top-[34px] right-[58px]"><LuPlus size={25}/></span> */}
        </div>
     
      </div>
    </>
  );
};

export default Navbar;
