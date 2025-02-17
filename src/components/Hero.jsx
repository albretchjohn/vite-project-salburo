import './Hero.css';
import { useEffect, useState } from 'react';


function Hero() {
    const images = [
        '../../Alice.png',
        '../../Arsene.png',
        '../../Odin.png',
      ];
    
      const [currentImage, setCurrentImage] = useState('');

      useEffect(() => {
        const changeImage = () => {
          // Randomly select an image from the array
          
        
          const randomImage = images[Math.floor(Math.random() * images.length)];
          
          setCurrentImage(randomImage);
        };
    
        // Change image every 5 seconds
        const interval = setInterval(changeImage, 5000);
    
        // Set an initial random image
        changeImage();
    
        return () => clearInterval(interval);
      }, [images]);


    return (
      <section className="hero">
        <h1 class="hey" >Hero Testing</h1>
        

        <img src={currentImage} alt="Disturbing image"/>

      </section>
    );
  }
  
  export default Hero;
  