import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db, storage } from '../API/firebase';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

const AddClothing = () => {
    const [uniqueId, setUniqueId] = useState(uuidv4());
    const [clothName, setClothName] = useState('');
    const [src1, setSrc1] = useState(null);
    const [src2, setSrc2] = useState(null);
    const [previewSrc1, setPreviewSrc1] = useState(null);
    const [previewSrc2, setPreviewSrc2] = useState(null);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(false);

    const navigate = useNavigate();

    const onChangeClothNameHandler = (e) => setClothName(e.target.value);
    const onChangeSrc1Handler = (e) => {
        const file = e.target.files[0];
        setSrc1(file);
        setPreviewSrc1(URL.createObjectURL(file));
    };
    const onChangeSrc2Handler = (e) => {
        const file = e.target.files[0];
        setSrc2(file);
        setPreviewSrc2(URL.createObjectURL(file));
    };

    const uploadImage = async (image, imageId) => {
        const imageRef = ref(storage, `images/${imageId}`);
        const snapshot = await uploadBytes(imageRef, image);
        const url = await getDownloadURL(snapshot.ref);
        return url;
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErr(false);
        try {
            const image1Id = `${uniqueId}-1`;
            const image2Id = `${uniqueId}-2`;
            const imageUrl1 = await uploadImage(src1, image1Id);
            const imageUrl2 = await uploadImage(src2, image2Id);
            const newCloth = {
                uid: uniqueId,
                clothName: clothName,
                image1: imageUrl1,
                image2: imageUrl2,
            };
            await setDoc(doc(db, 'clothes', clothName), newCloth);
            setLoading(false);
            // Clear form after successful submission
            setClothName('');
            setSrc1(null);
            setSrc2(null);
            setPreviewSrc1(null);
            setPreviewSrc2(null);
            setUniqueId(uuidv4());
            navigate('/');
        } catch (e) {
            console.error(e);
            setErr(true);
            setLoading(false);
        }
    };

    return (
        <div className='bg-[#f6f6eb] h-auto p-5 rounded-md shadow-md'>
            <form onSubmit={submitHandler} className='flex flex-col space-y-4'>
                <input 
                    onChange={onChangeClothNameHandler} 
                    type="text" 
                    value={clothName}
                    className='w-full p-2 border-[1px] border-black rounded-md' 
                    placeholder='Cloth Name' 
                    required
                />
                <input 
                    onChange={onChangeSrc1Handler} 
                    type="file" 
                    accept="image/*" 
                    className='w-full p-2 border-[1px] border-black rounded-md' 
                    required
                />
                <input 
                    onChange={onChangeSrc2Handler} 
                    type="file" 
                    accept="image/*" 
                    className='w-full p-2 border-[1px] border-black rounded-md' 
                    required
                />
                <button 
                    className={`w-full p-2 rounded-md ${loading ? 'bg-gray-500' : 'bg-green-500'} text-white`} 
                    type='submit'
                    disabled={loading}
                >
                    {loading ? 'Subiendo...' : 'Subir'}
                </button>
                {err && <p className='text-red-500 mt-2'>Error uploading images. Please try again.</p>}
            </form>

                <div className='h-[982px] w-[580px] mx-auto mt-10'>
                    <div className='relative h-[870px] w-[580px] overflow-hidden'>
                        <X 
                            className='absolute top-0 right-0 m-2 z-10 cursor-pointer' 
                            color='white'
                        />
                        <img
                            src={previewSrc1}
                            alt={clothName}
                            className='w-full h-full object-cover transition-opacity duration-300 ease-in-out absolute top-0 left-0'
                        />
                        <img
                            src={previewSrc2}
                            alt={clothName}
                            className='w-full h-full object-cover transition-opacity duration-300 ease-in-out opacity-0 hover:opacity-100 absolute top-0 left-0'
                        />
                    </div>
                    <p className='w-full text-center capitalize'>{clothName}</p>
                </div>
        </div>
    );
}

export default AddClothing;
