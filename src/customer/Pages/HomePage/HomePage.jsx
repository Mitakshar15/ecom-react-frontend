import React from 'react';
import MainCarousel from '../../components/HomeCarousel/MainCarousel';
import HomeSectionCarousel from '../../components/HomeSectionCarousel/HomeSectionCarousel';
import { mens_kurta } from "../../../Data/Mens_kurta";




const HomePage = () => {
  return (
    <div>
      <MainCarousel/>
       <div className='space-y-10  py-20 flex flex-col justify-center px-5 lg:px-10'>
         <HomeSectionCarousel data_items={mens_kurta} section_name={"Men's Kurta"}/>
         <HomeSectionCarousel data_items={mens_kurta}  section_name={"Men's Shoes"}/>
         <HomeSectionCarousel data_items={mens_kurta}  section_name={"Men's Shirt"}/>
         <HomeSectionCarousel data_items={mens_kurta}  section_name={"Women's Saree"}/>
         <HomeSectionCarousel data_items={mens_kurta} section_name={"Women's dress"}/>
       </div>
    </div>
  );
}

export default HomePage;
