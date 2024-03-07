import { userAuth } from "@/Context/ProductContext";
import React, { useEffect, useState } from "react";
import {getDownloadURL,listAll,ref,uploadBytes,UploadResult} from 'firebase/storage'
import { imageDb } from "@/Service/firebase";
 interface producttype{

 productdetails : {
  name:string;

  }

 }


type getAllproducttype={
  name: string,
  price: string,
  description: string,
  images: string[];
}
const ProductComponenet = () => {
  const [Product, setProducts] = useState<getAllproducttype[]>([]);
  const [imageUrl,setImageUrl]=useState<string[]>();
  const auth=userAuth();
  if(!auth){
    throw new Error("");
    
  }

  const {getAllProducts}=auth
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData  = await getAllProducts();
        // console.log(productsData);
        
        setProducts(productsData)
     
      
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, [getAllProducts]);

  console.log("product",Product);

  Product.map((product)=>{
console.log(product);

  })
  // console.log("imageUrl",imageUrl);
  
  return (
    <>
<div className="max-w-sm rounded overflow-hidden shadow-lg">
  <div className="flex justify-center items-center">
  <img className="w-[60%] h-[10%]   object-cover object-fit" src="https://apollo.olx.in/v1/files/g0lv7y9g5k392-IN/image;s=300x600;q=60" alt="Sunset in the mountains"/>
  </div>
 
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">House for Rent</div>
    <p className="text-gray-700 text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia
    </p>
  </div>
  <div className="px-6 pt-4 pb-2">
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Price:4000</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Place:trivandrum</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"></span>
  </div>
</div>

<div className="max-w-sm rounded overflow-hidden shadow-lg">
  <div className="flex justify-center items-center">
  <img className="w-[30%] px-auto object-cover" src="https://apollo.olx.in/v1/files/lo5cjsu41tdu-IN/image;s=300x600;q=60" alt="Sunset in the mountains"/>
  </div>
  
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">I Phone</div>
    <p className="text-gray-700 text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia
    </p>
  </div>
  <div className="px-6 pt-4 pb-2">
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Price:40000</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Place:Kollam</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"></span>
  </div>
</div>


<div className="max-w-sm rounded overflow-hidden shadow-lg">
  <div className="flex justify-center items-center">
  <img className="w-[50%] px-auto object-cover" src="https://apollo.olx.in/v1/files/n8tqxsh2z6x22-IN/image;s=300x600;q=60" alt="Sunset in the mountains"/>
  </div>
  
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">Hundayi Creata</div>
    <p className="text-gray-700 text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia
    </p>
  </div>
  <div className="px-6 pt-4 pb-2">
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Price:40000</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Place:Ernakulam</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"></span>
  </div>
</div>


<div className="max-w-sm rounded overflow-hidden shadow-lg">
  <div className="flex justify-center items-center">
  <img className="w-[50%] px-auto object-cover" src="https://apollo.olx.in/v1/files/lrk2msu6lov3-IN/image;s=300x600;q=60" alt="Sunset in the mountains"/>
  </div>
  
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">Swift Dezire</div>
    <p className="text-gray-700 text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia
    </p>
  </div>
  <div className="px-6 pt-4 pb-2">
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Price:3000</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Place:trivandrum</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"></span>
  </div>
</div>




<div className="max-w-sm rounded overflow-hidden shadow-lg">
  <div className="flex justify-center items-center">
  <img className="w-[60%] px-auto object-cover" src="https://apollo.olx.in/v1/files/6sfg3k3wn84m2-IN/image;s=300x600;q=60" alt="Sunset in the mountains"/>
  </div>
  
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">Ben Z</div>
    <p className="text-gray-700 text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia
    </p>
  </div>
  <div className="px-6 pt-4 pb-2">
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Price:400000</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Place:Idukki</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"></span>
  </div>
</div>



<div className="max-w-sm rounded overflow-hidden shadow-lg">
  <div className="flex justify-center items-center">
  <img className="w-[60%] px-auto object-cover" src="https://apollo.olx.in/v1/files/30x850gs2skl-IN/image;s=300x600;q=60https://apollo.olx.in/v1/files/6sfg3k3wn84m2-IN/image;s=300x600;q=60" alt="Sunset in the mountains"/>
  </div>
  
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">House for Rent</div>
    <p className="text-gray-700 text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia
    </p>
  </div>
  <div className="px-6 pt-4 pb-2">
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Price:4000</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Place:trivandrum</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"></span>
  </div>
</div>



<div className="max-w-sm rounded overflow-hidden shadow-lg">
  <div className="flex justify-center items-center">
  <img className="w-[60%] px-auto object-cover" src="https://apollo.olx.in/v1/files/6sfg3k3wn84m2-IN/image;s=300x600;q=60" alt="Sunset in the mountains"/>
  </div>
  
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">House for Rent</div>
    <p className="text-gray-700 text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia
    </p>
  </div>
  <div className="px-6 pt-4 pb-2">
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Price:4000</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Place:trivandrum</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"></span>
  </div>
</div>





  </>
  
  );
};

export default ProductComponenet;







