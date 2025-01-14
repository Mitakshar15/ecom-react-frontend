"use client";

import { useEffect, useRef, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import { Box, Button, Grid, LinearProgress, Rating, TextField, Pagination } from "@mui/material";
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
import { addRating } from "../../../State/Rating/Action";

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

const calculateRatingPercentages = (ratings) => {
  if (!ratings || ratings.length === 0) {
    return {
      excellent: 0,
      veryGood: 0,
      good: 0,
      average: 0,
      poor: 0
    };
  }

  let excellent = 0, veryGood = 0, good = 0, average = 0, poor = 0;
  const total = ratings.length;

  ratings.forEach(rating => {
    const value = rating.rating;
    if (value >= 4.5) excellent++;
    else if (value >= 3.5) veryGood++;
    else if (value >= 2.5) good++;
    else if (value >= 1.5) average++;
    else poor++;
  });

  // Convert to percentages
  return {
    excellent: Math.round((excellent / total) * 100),
    veryGood: Math.round((veryGood / total) * 100),
    good: Math.round((good / total) * 100),
    average: Math.round((average / total) * 100),
    poor: Math.round((poor / total) * 100)
  };
};

export default function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const {products} = useSelector(store=>store);
  const [avgRating,setAvgRating] = useState(0);

  const [reviewInput, setReviewInput] = useState({
    rating: 0,
    comment: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 6;

  const handleAddToCart = () => {
    const data = {productId:params.productId,size:selectedSize.name,quantity:1}
    console.log("DATA",data)
   dispatch(addItemToCart(data))

    
    navigate("/cart");
    dispatch(get());
  }

  const calculateAvgRating = ()=>{
    let sum = 0;
    if (products?.product?.ratings) {
      for (let i = 0; i < products.product.ratings.length; i++) {
        sum += products.product.ratings[i].rating;
      }
      const average = sum / products.product.ratings.length;
      setAvgRating(average);
    } else {
      setAvgRating(0);
    }
  }

  const handleSubmitRating = (e) => {
    e.preventDefault();
    if (reviewInput.rating === 0) {
      alert("Please select a rating");
      return;
    }
    dispatch(addRating(products?.product?.id,reviewInput.rating))
      .then(() => {
        // Fetch updated product data after rating submission
        dispatch(findProductById({ productId: params.productId }));
        setReviewInput({
          rating: 0,
          comment: "",
        });
      });
 
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (reviewInput.rating === 0) {
      alert("Please select a rating before submitting your review");
      return;
    }
    if (!reviewInput.comment.trim()) {
      alert("Please write a review");
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

    // ... other state declarations ...
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const isInitialMount = useRef(true);
    const productFetchedRef = useRef(false);
  
    // Combine all data fetching into a single useEffect
    useEffect(() => {
      // Skip effect on initial mount
      if (isInitialMount.current) {
        isInitialMount.current = false;
        return;
      }
  
      // Skip if product is already fetched
      if (productFetchedRef.current) {
        return;
      }
  
      const fetchProductData = async () => {
        try {
          setLoading(true);
          setError(null);
          productFetchedRef.current = true;
          
          await dispatch(findProductById({ productId: params.productId }));
          
          // Calculate average rating after product is fetched
          let sum = 0;
          if (products?.product?.ratings) {
            sum = products.product.ratings.reduce((acc, curr) => acc + curr.rating, 0);
            setAvgRating(sum / products.product.ratings.length);
          } else {
            setAvgRating(0);
          }
        } catch (err) {
          setError(err.message);
          productFetchedRef.current = false;
        } finally {
          setLoading(false);
        }
      };
  
      fetchProductData();
  
      // Cleanup function
      return () => {
        productFetchedRef.current = false;
      };
    }, [params.productId]);

  const ratingStats = calculateRatingPercentages(products?.product?.ratings);

  const getCurrentPageReviews = () => {
    if (!products?.product?.reviews) return [];
    
    // Sort reviews by createdAt date in descending order (latest first)
    const sortedReviews = [...products.product.reviews].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    return sortedReviews.slice(indexOfFirstReview, indexOfLastReview);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

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
                  <Rating name="read-only" value={avgRating} readOnly />
                  <p className="opacity-50 text-sm">{products.product?.ratings?.length} Ratings</p>
                  <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    {products.product?.reviews?.length} Reviews
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
                    {products.product?.description}
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
              
              {/* Quick Rating Section */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                  <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                      <div className="px-8 py-6 border-b border-gray-200">
                          <h3 className="text-xl font-semibold text-gray-900">Rate This Product</h3>
                          <p className="mt-1 text-sm text-gray-500">
                              Share your experience with this product
                          </p>
                      </div>
                      
                      <div className="px-8 py-6">
                          <form onSubmit={handleSubmitRating} className="space-y-4">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                  <div className="space-y-2">
                                      <label className="block text-sm font-medium text-gray-700">
                                          Your Rating
                                      </label>
                                      <Rating
                                          name="quick-rating"
                                          value={reviewInput.rating}
                                          onChange={(event, newValue) => {
                                              setReviewInput(prev => ({...prev, rating: newValue}));
                                          }}
                                          precision={0.5}
                                          size="large"
                                          sx={{
                                              fontSize: '2rem',
                                              '& .MuiRating-iconFilled': {
                                                  color: '#9155fd',
                                              },
                                          }}
                                      />
                                  </div>
                                  
                                  <Button 
                                      type="submit"
                                      variant="contained" 
                                      size="large"
                                      sx={{
                                          bgcolor: "#9155fd",
                                          "&:hover": { bgcolor: "#804dee" },
                                          px: 4,
                                          py: 1.5,
                                          mt: { xs: 2, sm: 0 }
                                      }}
                                  >
                                      Submit Rating
                                  </Button>
                              </div>
                              
                              <div className="mt-4 flex items-center space-x-2 text-sm text-gray-500">
                                  <svg 
                                      className="h-5 w-5 text-gray-400" 
                                      fill="currentColor" 
                                      viewBox="0 0 20 20"
                                  >
                                      <path 
                                          fillRule="evenodd" 
                                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
                                          clipRule="evenodd" 
                                      />
                                  </svg>
                                  <p>Your rating helps other shoppers make better decisions</p>
                              </div>
                          </form>
                      </div>
                  </div>
              </section>
        {/* ratings and reviews */}
<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900">
                Recent Reviews & Ratings
            </h1>
            <p className="mt-1 text-sm text-gray-500">
                What our customers are saying
            </p>
        </div>
        
        <div className="px-8 py-6">
            <Grid container spacing={4}>
                {/* Review Section */}
                <Grid item xs={12} md={7}>
                    <div className="space-y-6 pr-4 border-r border-gray-100">
                        {products?.product?.reviews?.length > 0 ? (
                            <>
                                {getCurrentPageReviews().map((review, index) => (
                                    <ProductReviewCard key={index} review={review} />
                                ))}
                                
                                {/* Pagination */}
                                {products.product.reviews.length > reviewsPerPage && (
                                    <div className="flex justify-center mt-8">
                                        <Pagination 
                                            count={Math.ceil(products.product.reviews.length / reviewsPerPage)}
                                            page={currentPage}
                                            onChange={handlePageChange}
                                            color="primary"
                                            sx={{
                                                '& .MuiPaginationItem-root': {
                                                    color: '#9155fd',
                                                },
                                                '& .Mui-selected': {
                                                    backgroundColor: '#9155fd !important',
                                                    color: 'white',
                                                },
                                                '& .MuiPaginationItem-root:hover': {
                                                    backgroundColor: '#9155fd20',
                                                }
                                            }}
                                        />
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-10">
                                <p className="text-gray-500 text-lg">No reviews yet. Be the first one to review!</p>
                            </div>
                        )}
                    </div>
                </Grid>

                {/* Ratings & Review Form Section */}
                <Grid item xs={12} md={5}>
                    <div className="space-y-8">
                        {/* Rating Statistics */}
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Ratings</h2>
                            {/* Overall Rating Display */}
                            <div className="flex items-center space-x-3 mb-6">
                                <Rating 
                                    readOnly 
                                    value={avgRating|| 0} 
                                    precision={0.5}
                                    sx={{
                                        '& .MuiRating-iconFilled': {
                                            color: '#9155fd',
                                        },
                                    }}
                                />
                                <p className="text-gray-600 text-sm">
                                    {products?.product?.ratings?.length || 0} Ratings
                                </p>
                            </div>

                            {/* Rating Breakdown */}
                            <div className="space-y-4">
                                {[
                                    { label: 'Excellent', value: ratingStats.excellent, color: 'success' },
                                    { label: 'Very Good', value: ratingStats.veryGood, color: 'success' },
                                    { label: 'Good', value: ratingStats.good, color: 'info' },
                                    { label: 'Average', value: ratingStats.average, color: 'warning' },
                                    { label: 'Poor', value: ratingStats.poor, color: 'error' },
                                ].map((rating, index) => (
                                    <div className="flex items-center gap-4" key={index}>
                                        <span className="text-sm text-gray-600 w-20">{rating.label}</span>
                                        <div className="flex-grow">
                                            <LinearProgress
                                                sx={{
                                                    bgcolor: '#e0e0e0',
                                                    '& .MuiLinearProgress-bar': {
                                                        bgcolor: rating.color === 'success' ? '#9155fd' :
                                                                rating.color === 'info' ? '#9155fd' :
                                                                rating.color === 'warning' ? '#f59e0b' :
                                                                '#ef4444',
                                                    },
                                                    borderRadius: '4px',
                                                    height: '8px',
                                                }}
                                                variant="determinate"
                                                value={rating.value}
                                            />
                                        </div>
                                        <span className="text-sm text-gray-500 w-12 text-right">{rating.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Review Form */}
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Write a Review</h2>
                            
                            {/* Rating Input */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Rate this product *
                                </label>
                                <div className="flex items-center space-x-3">
                                    <Rating
                                        name="rating-input"
                                        value={reviewInput.rating}
                                        onChange={(event, newValue) => {
                                            setReviewInput(prev => ({...prev, rating: newValue}));
                                        }}
                                        precision={0.5}
                                        size="large"
                                        sx={{
                                            '& .MuiRating-iconFilled': {
                                                color: '#9155fd',
                                            },
                                        }}
                                    />
                                    <span className="text-sm text-gray-500">
                                        {reviewInput.rating > 0 ? `${reviewInput.rating} stars` : ''}
                                    </span>
                                </div>
                            </div>

                            {/* Review Input */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Review *
                                </label>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    placeholder="What did you like or dislike? What did you use this product for?"
                                    value={reviewInput.comment}
                                    onChange={(e) => setReviewInput(prev => ({...prev, comment: e.target.value}))}
                                />
                            </div>

                            <Button 
                                onClick={handleSubmitReview}
                                variant="contained" 
                                fullWidth
                                sx={{
                                    bgcolor:"#9155fd",
                                    "&:hover": { bgcolor: "#804dee" },
                                    py: 1.5,
                                    mt: 2
                                }}
                            >
                                Submit Review
                            </Button>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
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
