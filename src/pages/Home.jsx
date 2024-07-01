import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Shop from '../components/Shop';
import bg1 from '/assets/bg1.jpg';
import Menu from '../components/Menu';
import Biography from '../components/Biography';
import AddClothing from './AddClothing';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../API/firebase';
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [clothes, setClothes] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleOpenMenu = () => {
        setIsOpen(!isOpen);
    };

    const fetchClothes = () => {
        onSnapshot(collection(db, 'clothes'), (querySnapshot) => {
            const responseArr = [];
            querySnapshot.forEach((doc) => {
                responseArr.push(doc.data());
            });
            setClothes(responseArr);
            setLoading(false); // Set loading to false once clothes are fetched
        });
    };

    useEffect(() => {
        fetchClothes();
    }, []);

    return (
        <div className='relative h-screen w-full'>
            <AnimatePresence>
                {loading && (
                    <motion.div 
                        className='fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center'
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="absolute top-0 left-0 w-full h-full flex">
                            <motion.div
                                className="bg-black w-1/2 h-full"
                                initial={{ x: 0 }}
                                exit={{ x: '-100%' }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            />
                            <motion.div
                                className="bg-black w-1/2 h-full"
                                initial={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            />
                        </div>
                        <motion.span
                            className="loading loading-ring w-[300px] text-white h-[500px]"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.1 }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            <Navbar handleOpenMenu={handleOpenMenu} isOpen={isOpen} />
            <Menu handleOpenMenu={handleOpenMenu} isOpen={isOpen} />
            <Hero />
            <Biography />
            <Shop 
                clothes={clothes}
                setLoading={setLoading}
            />
        </div>
    );
};

export default Home;
