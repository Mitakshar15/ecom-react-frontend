import React, { useEffect, useState } from 'react';
import MainCarousel from '../../components/HomeCarousel/MainCarousel';
import HomeSectionCarousel from '../../components/HomeSectionCarousel/HomeSectionCarousel';
import { mens_kurta } from "../../../Data/Mens_kurta";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { findProducts } from '../../../State/Product/Action';








const HomePage = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const params  = useParams();
  const dispatch = useDispatch();
  const {product} = useSelector((store)=>store);

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const colorValue  = searchParams.get("color");
  const sizeValue  = searchParams.get("size");
  const priceValue = searchParams.get("price");
  const discountValue = searchParams.get("discountedPrice");
  const sortValue = searchParams.get("sort");
  const pageNumber = searchParams.get("page") || 1;
  const stock = searchParams.get("stock");

  useEffect(()=>{
    
    const [minPrice, maxPrice] = priceValue === null?[0,10000]: priceValue.split("-").map(Number);

     const data={
    category: params.lavelThree || "",
    colors:colorValue ||[],
    sizes:sizeValue ||[],
    minPrice,
    maxPrice,
    minDiscount: discountValue || 0,
    stock: stock || null,
    sort: sortValue || "price_low",
    pageNumber: pageNumber -1,
    pageSize : 10,
    }

    dispatch(findProducts(data))

  },[params.levelThree,
    colorValue,
    sizeValue,
    priceValue,
    discountValue,
    sortValue,
    pageNumber,
    stock]
);

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
