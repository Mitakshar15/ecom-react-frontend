/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    theme: {
      extend: {
        gridTemplateRows: {
          '[auto,auto,1fr]': 'auto auto 1fr',
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
"use client";

import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import { Box, Button, Grid, LinearProgress, Rating, TextField } from "@mui/material";
import ProductReviewCard from "./ProductReviewCard";
import { mens_kurta } from "../../../Data/Mens_kurta";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import HomeSectionCarousel from "../HomeSectionCarousel/HomeSectionCarousel";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProductById } from "../../../State/Product/Action";
import { store } from "../../../State/store";
import { addItemToCart, get } from "../../../State/Cart/Action";
import { addReview, findProductReviews } from "../../../State/Reviews/Action";

const product = {
  name: "Basic Tee 6-Pack",
  price: "$192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://tailwindui.com/plus/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindui.com/plus/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindui.com/plus/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindui.com/plus/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const {products} = useSelector(store=>store);
  const [reviewInput, setReviewInput] = useState({
    rating: 0,
    comment: "",
  });

  const handleAddToCart = () => {
    const data = {productId:params.productId,size:selectedSize.name}
    console.log("DATA",data)
   dispatch(addItemToCart(data))

    
    navigate("/cart");
    dispatch(get());
  }

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (reviewInput.rating === 0) {
      alert("Please select a rating");
      return;
    }
    
    dispatch(addReview({
      productId: products?.product?.id,
      product: products?.product,
      rating: reviewInput.rating,
      review: reviewInput.comment,
    })).then(() => {
      dispatch(findProductById({ productId: params.productId }));
      
      setReviewInput({
        rating: 0,
        comment: "",
      });
    });
  };

  useEffect(()=>{
    const data ={productId:params.productId}
  dispatch(findProductById(data))  
   
  },[params.productId])

  return (
    <div className="bg-white lg:px-20 mt-[120px]">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={breadcrumb.href}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a
                href={product.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.name}
              </a>
            </li>
          </ol>
        </nav>
        <section className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 px-4 pt-10">
          {/* Image gallery */}
          <div className="flex flex-col items-center ">
            <div className=" overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
              <img
                alt={product.images[0].alt}
                src={products.product?.imageUrl}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="flex flex-wrap space-x-5 justify-center">
              {product.images.map((item) => (
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] mt-4">
                  <img
                    alt={item.alt}
                    src={item.src}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Product info */}
          <div className="lg:col-span-1 maxt-auto max-w-2xl sm:px-6 lg:max-7xl lg:px-8 lg:pb-24">
            <div className="lg:col-span-2">
              <h1 className="text-lg lg:text-xl font-semibold text-gray-900">
                {products.product?.brand}
              </h1>
              <h1 className="text-lg lg:text-x1 text-gray-900 opacity-60 pt-1">
                {products.product?.title}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <div className="flex space-x-5 items-center text-lg lg:text-xl textgray-900 mt-6">
                <p className="font-semibold">{products.product?.discountedPrice}</p>
                <p className="opacity-50 line-through">{products.product?.price}</p>
                <p className="text-green-600 font-semibold">{products.product?.discountPercent}% off</p>
              </div>

              {/* Reviews */}
              <div className="mt-6">
                <div className="flex items-center space-x-3">
                  <Rating name="read-only" value={3.5} readOnly />
                  <p className="opacity-50 text-sm">5604 Ratings</p>
                  <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    3807 Reviews
                  </p>
                </div>
              </div>

              <form className="mt-10">
                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  </div>

                  <fieldset aria-label="Choose a size" className="mt-4">
                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                    >
                      {product.sizes.map((size) => (
                        <Radio
                          key={size.name}
                          value={size}
                          disabled={!size.inStock}
                          className={classNames(
                            size.inStock
                              ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                              : "cursor-not-allowed bg-gray-50 text-gray-200",
                            "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6"
                          )}
                        >
                          <span>{size.name}</span>
                          {size.inStock ? (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                            />
                          ) : (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                            >
                              <svg
                                stroke="currentColor"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                              >
                                <line
                                  x1={0}
                                  x2={100}
                                  y1={100}
                                  y2={0}
                                  vectorEffect="non-scaling-stroke"
                                />
                              </svg>
                            </span>
                          )}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>

                <Button onClick={handleAddToCart} variant="contained" sx={{px:"2rem",py:"1rem",bgcolor:"#9155fd",marginTop:"2rem"}}>

                    Add To Cart
                </Button>
                <div>
                  <span className="text-gray-500 text-sm">
                  Available Quantity: {products.product?.quantity}
                  </span>

                </div>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {product.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{product.details}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ratings and reviews */}
<section className="p-6 bg-white rounded-lg shadow-lg">
    <h1 className="font-bold text-2xl mb-6 text-gray-800">
        Recent Reviews & Ratings
    </h1>
    <div className=" rounded-lg p-6 bg-gray-50 bg-opacity-70">
        <Grid container spacing={4}>
            {/* Review Section */}
            <Grid item xs={12} md={7}>
                <div className="space-y-6">
                    {products?.product?.reviews?.length > 0 ? (
                        products.product.reviews.map((review, index) => (
                            <ProductReviewCard key={index} review={review} />
                        ))
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-gray-500 text-lg">No reviews yet. Be the first one to review!</p>
                        </div>
                    )}
                </div>
            </Grid>

            {/* Ratings Section */}
            <Grid item xs={12} md={5} className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-700">Product Ratings</h2>
                
                {/* Overall Rating Display */}
                <div className="flex items-center space-x-3">
                    <Rating 
                        readOnly 
                        value={products?.product?.ratings || 0} 
                        precision={0.5} 
                    />
                    <p className="text-gray-600 text-sm">
                        {products?.product?.reviews?.length || 0} Ratings
                    </p>
                </div>

                {/* Rating Breakdown */}
                <Box className="mt-6 space-y-4">
                    {[
                        { label: 'Excellent', value: 40, color: 'success' },
                        { label: 'Very Good', value: 10, color: 'success' },
                        { label: 'Good', value: 20, color: 'info' },
                        { label: 'Average', value: 50, color: 'warning' },
                        { label: 'Poor', value: 80, color: 'error' },
                    ].map((rating, index) => (
                        <Grid container alignItems="center" key={index}>
                            <Grid item xs={3}>
                                <p className="text-gray-600">{rating.label}</p>
                            </Grid>
                            <Grid item xs={9}>
                                <LinearProgress
                                    sx={{
                                        bgcolor: '#e0e0e0',
                                        '& .MuiLinearProgress-bar': {
                                            bgcolor: rating.color === 'success' ? 'green' :
                                                    rating.color === 'info' ? 'blue' :
                                                    rating.color === 'warning' ? 'orange' :
                                                    'red',
                                        },
                                        borderRadius: '4px',
                                        height: '8px',
                                    }}
                                    variant="determinate"
                                    value={rating.value}
                                />
                            </Grid>
                        </Grid>
                    ))}
                </Box>

                <div className="mb-10">
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">Write a Review</h2>
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-700">Your Rating:</span>
                      <Rating
                        name="rating-input"
                        value={reviewInput.rating}
                        onChange={(event, newValue) => {
                          setReviewInput(prev => ({...prev, rating: newValue}));
                        }}
                        precision={0.5}
                      />
                    </div>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      variant="outlined"
                      placeholder="Write your review here..."
                      value={reviewInput.comment}
                      onChange={(e) => setReviewInput(prev => ({...prev, comment: e.target.value}))}
                    />
                    <Button 
                      type="submit"
                      variant="contained" 
                      sx={{
                        bgcolor:"#9155fd",
                        "&:hover": { bgcolor: "#804dee" }
                      }}
                    >
                      Submit Review
                    </Button>
                  </form>
                </div>
            </Grid>
        </Grid>
    </div>
</section>

         {/* similar products */}
         <section className="pt-10 w-full overflow-hidden">

           <h1 className="py-5 text-xl font-bold ">Similar Products</h1>

            {/* <div className="flex flex-wrap space-y-5">
              {mens_kurta.map((item) =><HomeSectionCard product={item}/>)}
            </div> */}
           
           <HomeSectionCarousel className="" data_items={mens_kurta} section_name={"Men's Kurta"}/>

         </section>
      </div>
    </div>
  );
}
