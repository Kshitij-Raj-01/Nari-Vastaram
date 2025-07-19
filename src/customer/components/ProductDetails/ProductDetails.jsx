"use client";

import { useEffect, useState } from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import { Box, Button, Grid, Rating } from "@mui/material";
import ProductReviewCard from "./ProductReviewCard";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProductsById } from "../../../State/Product/Action";
import { addItemToCart } from "../../../State/Cart/Action";
import { api } from "../../../config/apiConfig";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector((state) => state.product);
  const [selectedSize, setSelectedSize] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [similarProducts, setSimilarProducts] = useState([]);

useEffect(() => {
  const fetchSimilar = async () => {
    try {
      const res = await api.get(`/api/products/similar/${params.productId}`);
      setSimilarProducts(res.data || []);
    } catch (error) {
      console.error("Error fetching similar products:", error);
    }
  };

  if (params.productId) {
    fetchSimilar();
  }
}, [params.productId]);

  useEffect(() => {
    if (params.productId) {
      dispatch(findProductsById(params.productId));
      fetchReviewsAndRatings(params.productId);
    }
  }, [params.productId]);

  const fetchReviewsAndRatings = async (productId) => {
    try {
      const res = await api.get(`/api/reviews/product/${productId}`);
      const reviewsData = res.data || [];
      setReviews(reviewsData);
  
      // Compute average rating directly from reviews
      const avg =
        reviewsData.reduce((acc, r) => acc + (r.rating || 0), 0) /
          (reviewsData.length || 1) || 0;
      setAverageRating(avg);
    } catch (error) {
      console.error("Error fetching reviews/ratings:", error);
    }
  };
  

  const handleAddToCart = () => {
    const data = {productId:params.productId, size:selectedSize.name}
    dispatch(addItemToCart(data))
    navigate('/cart');
  }

  useEffect(() => {
    if (params.productId) {
      dispatch(findProductsById(params.productId));
    }
  }, [params.productId]);

  useEffect(() => {
    if (product && product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  if (loading || !product) {
    return <div className="p-10 text-xl text-purple-700">Loading product details...</div>;
  }

  if (error) {
    return <div className="p-10 text-red-600">Error loading product: {error}</div>;
  }

  console.log(product)

  return (
    <div className="bg-[#FFE0BC] lg:px-20">
      <div className="pt-6">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb">
          <ol className="mx-20 mt-10 flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {product.breadcrumbs?.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                    {breadcrumb.name}
                  </a>
                  <svg fill="currentColor" width={16} height={20} viewBox="0 0 16 20" className="h-5 w-4 text-gray-300">
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a href={product.href} className="font-medium text-gray-500 hover:text-gray-600">
                {product.name}
              </a>
            </li>
          </ol>
        </nav>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 my-5 pt-10 bg-[#F1D4A9] rounded-lg">
          {/* Image Gallery */}
          <div className="flex flex-col items-center gap-y-5">
            <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
              <img src={product.imageUrl} alt={product.images?.[0]?.alt} className="h-full w-full object-cover object-center" />
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-1 mx-auto max-w-2xl px-4 pb-60 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
            <div>
              <h1 className="text-lg lg:text-xl font-semibold text-gray-900">{product.brand || "Brand Name"}</h1>
              <h2 className="text-lg lg:text-xl text-gray-900 opacity-60 pt-1">
                {product.title || "Product Title"}
              </h2>
            </div>

            <div className="mt-4">
              <div className="flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-6">
                <p className="font-semibold">₹{product.discountedPrice}</p>
                <p className="opacity-50 line-through">₹{product.price}</p>
                <p className="text-green-600 font-semibold">{product.discountPercent}% Off</p>
              </div>

              <div className="mt-6 flex items-center space-x-3">
              <Rating name="read-only" value={averageRating} readOnly precision={0.5} />
                <p className="opacity-50 text-sm">{product.numRatings} Ratings</p>
                <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">{product.numReviews} Reviews</p>
              </div>

              {/* Size Selector */}
              <form className="mt-10">
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  </div>

                  <fieldset className="mt-4">
                    <RadioGroup value={selectedSize} onChange={setSelectedSize} className="grid grid-cols-5 gap-4">
                      {product.sizes.filter((size) => size.quantity > 0).map((size) => (
                        <Radio
                          key={size.name}
                          value={size}
                          className={({ checked }) =>
                            classNames(
                              size.quantity > 0
                                ? "cursor-pointer bg-white text-gray-900 shadow-xs"
                                : "cursor-not-allowed bg-gray-50 text-gray-200",
                              checked ? "ring-2 ring-indigo-500 border-indigo-500" : "",
                              "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 sm:flex-1 sm:py-6"
                            )
                          }
                        >
                          <span className="text-black">{size.name}</span>
                        </Radio>
                      ))}
                    </RadioGroup>
                    {selectedSize && (
                      <p className="mt-2 text-sm text-indigo-600">
                        Selected Size: <span className="font-semibold">{selectedSize.name}</span>
                      </p>
                    )}
                  </fieldset>
                </div>

                <Button onClick={handleAddToCart} variant="contained" sx={{ padding: "2rem", py: "1rem", my: "1rem", bgcolor: "#9155fd" }}>
                  Add to Cart
                </Button>
              </form>
            </div>

            <div className="py-10 lg:pt-6 lg:pr-8">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Description</h3>
                <p className="text-base text-gray-900 mt-2">{product.description}</p>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
                <ul className="list-disc space-y-2 pl-4 text-sm mt-2">
                  {product.highlights?.map((highlight) => (
                    <li key={highlight} className="text-gray-600">{highlight}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
  <h2 className="text-sm font-medium text-gray-900">Details</h2>
  <ul className="list-disc space-y-2 pl-4 text-sm mt-2">
    {product.details?.map((detail, i) => (
      <li key={i} className="text-gray-600">{detail}</li>
    ))}
  </ul>
</div>

            </div>
          </div>
        </section>

        {/* Reviews */}
        <section>
          <h1 className="font-semibold text-lg pb-4">Recent Review & Rating</h1>
          <div className="border p-5 bg-[#F1EDE1] rounded-lg">
            <Grid container spacing={7} sx={{ gap: '45rem' }}>
              <Grid item xs={7}>
              <div className="space-y-5">
  {reviews.length > 0 ? (
    reviews.map((review) => (
      <ProductReviewCard key={review._id} review={review} />
    ))
  ) : (
    <p className="italic text-gray-600">No reviews yet. Be the first to share your thoughts!</p>
  )}
</div>

              </Grid>
            </Grid>
          </div>
        </section>

        {/* Similar Products */}
        <section className="pt-10 items">
  <h1 className="py-5 text-xl font-bold">Similar Products</h1>
  <div className="flex flex-wrap gap-5 lg:justify-start justify-center bg-[#F1D4A9] p-10">
    {similarProducts.length > 0 ? (
      similarProducts.map((item, index) => (
        <div key={item._id} className="flex-grow-0">
          <HomeSectionCard product={item} />
        </div>
      ))
    ) : (
      <p className="italic text-gray-600">No similar products found.</p>
    )}
  </div>
</section>

      </div>
    </div>
  );
};

export default ProductDetail;
