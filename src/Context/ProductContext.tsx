import { createContext, useContext, useEffect, useState } from "react";
import { doc, setDoc,getDocs,collection } from "firebase/firestore";
import { db, auth,imageDb } from "../Service/firebase";
import {getDownloadURL,listAll,ref,uploadBytes,UploadResult} from 'firebase/storage'
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { promises } from "dns";

type getAllproducttype={
  Productname: string,
  productprice: string,
  productdescription: string,
  images: string[]
}

type Props = {
  children: React.ReactNode;
};

type ContextProviderType = {
  user: User | null;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  logIn: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  addProduct: (
    Productname: string,
    productprice: string,
    productdescription: string,
    images: string[],
    userEmail: string
  ) => void;
  getAllProducts:()=>Promise<any[]>
};

const AuthContext = createContext<ContextProviderType | null>(null);

export function ContextProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe; // Cleanup function
  }, []);

  async function addProduct(
    Productname: string,
    productprice: string,
    productdescription: string,
    images: string[],
    userEmail: string,
  ): Promise<void> {
    // Adjusted return type
    const Productref = doc(db, "products", userEmail);

    const productData = {
      name: Productname,
      price: productprice,
      description: productdescription,
      images: images,
    };

    await setDoc(Productref, productData);
  }

  function logIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut(): Promise<void> {
    return signOut(auth);
  }

   function signUp(email: string, password: string): Promise<UserCredential> {
  //   const userRef = doc(db, "users", email);
  //  setDoc(userRef, {
  //     Productdetails: [],
  //   });

    return createUserWithEmailAndPassword(auth, email, password);
  }


  async function getAllProducts(): Promise<getAllproducttype[]> {
    const productsCollection = collection(db, "users");
    const querySnapshot = await getDocs(productsCollection);

    const products: any[] = [];
    querySnapshot.forEach((doc) => {
      products.push(doc.data());
    });


    // let urlArr:string[]=[];
    listAll(ref(imageDb,'files')).then(imgs=>{
      imgs.items.forEach(val => {
        getDownloadURL(val).then(url=>{ 
          products.push(url)
        })
      });      
      
    });

    return products;
  }


  return (
    <AuthContext.Provider value={{ addProduct, logIn, logOut, signUp, user,getAllProducts }}>
      {children}
    </AuthContext.Provider>
  );
}

export function userAuth() {
  return useContext(AuthContext);
}
