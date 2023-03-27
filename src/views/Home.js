import React, {useState, useEffect, useRef} from "react"; 
import { Header } from "../components/Header";
import { PhotoDashBoard } from "../components/PhotoDashboard";
import { ShuffleButton } from "../components/ShuffleButton";
import { Photo } from "../components/Photo";

import "../index.css"

export function Home() {

    const [photoCollection, setPhotoCollection] = useState(); 
    const [imagesLoaded, setLoaded] = useState(false);
    const [cachedImages, setCachedImages] = useState(new Map());

    //Initiate api call for photos upon load
    useEffect(() => {
        if (!photoCollection) {
            function submitRequest() {
                fetch("https://jsonplaceholder.typicode.com/albums/1/photos", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(data => {

                    setPhotoCollection(data.slice(0, 10));
                })
                .catch(error => console.log(error));
            }
            submitRequest()
        }     
    }, []);

    function processImages() {
        return photoCollection?.map((photo, i) => {
            //Retrieve and return photos cached in local storage
            if(imagesLoaded) {
                let cachedImage = localStorage.getItem(i)
            
                return (
                    <Photo key={i} 
                           value={`${cachedImage}`} 
                           alt={photo.title} >
                    </Photo>)
            //Return downloaded photos and cache to local storage
            } else if (!imagesLoaded) {
       
                setCachedImages(map => new Map(map.set(i, photo.thumbnailUrl)));
                setLoaded(true);
                
                if (localStorage.getItem(i)) return;
                
                localStorage.setItem(i, photo.thumbnailUrl);


                return (
                    <Photo key={i} 
                           value={`${photo.thumbnailUrl}`} 
                           alt={photo.title}>
                    </Photo>)
            }
        })
    }

    function shufflePhotos(keyArray) {
        if (keyArray.length <= 0) {
            return; 
        }

        let randomIndexOne;
        let randomIndexTwo;
        let imageOne;
        let imageTwo;

        randomIndexOne = Math.floor(Math.random() * keyArray.length); 
        randomIndexTwo = Math.floor(Math.random() * keyArray.length);
        imageOne = cachedImages.get(randomIndexOne);
        imageTwo = cachedImages.get(randomIndexTwo);
    
        console.log("Working:" + imageOne);
        console.log("Working:" + imageTwo);

        localStorage.setItem(randomIndexOne, imageTwo);
        localStorage.setItem(randomIndexTwo, imageOne);

        keyArray.pop(randomIndexOne);
        keyArray.pop(randomIndexTwo)
        
        console.log(cachedImages)
        console.log(cachedImages.size)

        shufflePhotos(keyArray);
    }

    return (
        <>
            <Header></Header>
            <div class = "dashboard-container">
                <PhotoDashBoard processImages={processImages}></PhotoDashBoard>
            </div>
            <ShuffleButton keys={Array.from(cachedImages)} shufflePhotos={shufflePhotos} photoCollection={photoCollection}></ShuffleButton>
        </>
    )
}