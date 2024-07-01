import React from 'react';
import { db, storage } from '../API/firebase';
import { deleteObject, ref } from 'firebase/storage';
import { X } from 'lucide-react';
import { deleteDoc, doc } from 'firebase/firestore';

const Shop = ({ clothes, setLoading }) => {

  const deleteCloth = async (name, img1, img2) => {
    try {
      setLoading(true);
      
      // Log the document and image paths
      console.log(`Deleting document: clothes/${name}`);
      console.log(`Deleting image1: ${img1}`);
      console.log(`Deleting image2: ${img2}`);

      // Delete Firestore document
      await deleteDoc(doc(db, 'clothes', name));
      console.log(`Document ${name} deleted`);

      // Delete images from Firebase Storage
      const img1Ref = ref(storage, img1);
      const img2Ref = ref(storage, img2);
      await deleteObject(img1Ref);
      await deleteObject(img2Ref);
      console.log(`Images ${img1} and ${img2} deleted`);

      setLoading(false);
    } catch (e) {
      console.log(`Error deleting project: ${e}`);
      setLoading(false);
    }
  };

  return (
    <div className='w-full h-full flex flex-row p-20 justify-around flex-wrap'>
      {clothes?.map((item) => (
        <div key={item.clothName} className='h-[982px] w-[580px] mx-5 mt-5'>
          <div className='relative h-[870px] w-[580px] overflow-hidden'>
            <X 
              className='absolute top-0 right-0 m-2 z-10 cursor-pointer' 
              color='white' 
              onClick={() => deleteCloth(item.clothName, item.image1, item.image2)}
            />
            <img
              src={item.image1}
              alt={item.name}
              className='w-full h-full object-cover transition-opacity duration-300 ease-in-out absolute top-0 left-0'
            />
            <img
              src={item.image2}
              alt={item.name}
              className='w-full h-full object-cover transition-opacity duration-300 ease-in-out opacity-0 hover:opacity-100 absolute top-0 left-0'
            />
          </div>
          <p className='w-full text-center capitalize'>{item.clothName}</p>
        </div>
      ))}
    </div>
  );
}

export default Shop;
