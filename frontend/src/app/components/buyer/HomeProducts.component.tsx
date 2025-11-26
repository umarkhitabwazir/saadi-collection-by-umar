"use client";

import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { ProductInterface } from '../../utils/productsInterface';
import Loading from '../Loading.component';
import AddToCartComponent from './AddToCart.component';
import FavInterface from '../../utils/favInterface';
import ErrorMessage from '../ErrorMessage.component';
import Slider from '../Slider.component';
import { useFetchData } from '@/app/utils/useFetchData';
import Link from 'next/link';

const Products = () => {
  const [sort, setSort] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [searchResult, setSearchResult] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<{ product: string; rating: number }[]>([]);
  const [showAddTocart, setShowAddTocart] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [favProductsIds, setFavProductsIds] = useState<string[]>([]);
  const [openId, setOpenId] = useState<string | null>(null)

  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const routePath = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const searchedProducts = searchParams.get("search");
  const categoryName = searchParams.get("category");
  const value = searchParams.get("sort");
  const favIdInParams = searchParams.get("favId");

  const { fetchData } = useFetchData(setLoading);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (value) {
      setSort(value);
      if (routePath !== "/") router.push("/");
    } else setSort(null);
  }, [value, routePath, router]);

  const fetchProducts = async () => {
    try {
      const endpoint = sort ? `${API_URL}/${sort}` : `${API_URL}/get-products`;
      const response = await axios.get(endpoint);
      setProducts(response.data.data);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(err.message || "An error occurred while fetching products.");
      }
    }
  };

  const fetchSearchedProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/search-products?search=${searchedProducts}`);
      setProducts(response.data.data);
      setSearchResult(response.data.data.length);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof AxiosError) setError(err.message || "An error occurred while fetching products.");
    }
  };

  useEffect(() => {
    if (searchedProducts) {
      fetchSearchedProducts();
    }
    if (!searchedProducts && !categoryName) fetchProducts();
  }, [API_URL, sort, searchedProducts, categoryName]);

  const fetchAllReviews = async () => {
    try {
      const res = await axios.get(`${API_URL}/get-all-reviews`);
      setReviews(res.data.data);
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.code === "ERR_NETWORK") return;
    }
  };

  useEffect(() => {
    fetchAllReviews();
  }, [API_URL]);

  const getFavProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/get-fav-product`, { withCredentials: true });
      const productIds = res.data.data
        .map((fav: FavInterface) => fav.item?._id)
        .filter((id: string): id is string => Boolean(id));
      setFavProductsIds(productIds);
    } catch { }
  };

  useEffect(() => {
    getFavProducts();
  }, []);

  const categoryBaseProducts = async () => {
    if (!categoryName) return;
    try {
      setError(null);
      const res = await axios.post(`${API_URL}/find-Category-Products?category=${encodeURIComponent(categoryName)}`);
      setProducts(res.data.data);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.error || "An error occurred while fetching products.");
      }
    }
  };

  useEffect(() => {
    if (categoryName) categoryBaseProducts();
  }, [API_URL, categoryName]);

  const getAverageRating = (productId: string) => {
    const productReviews = reviews.filter(review => review.product === productId);
    if (!productReviews.length) return "0";
    const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / productReviews.length).toFixed(1);
  };

  const addToFavHandler = async (productId: string) => {
    try {
      await axios.post(`${API_URL}/add-to-fav/${productId}`, {}, { withCredentials: true });
      if (favIdInParams) alert('✅ Product added to favorite successfully');
      fetchProducts();
      getFavProducts();
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        router.push(`/login?favId=${productId}`);
      }
    }
  };

  const removeFavHandler = async (productId: string) => {
    try {
      await axios.delete(`${API_URL}/remove-fav/${productId}`, { withCredentials: true });
      getFavProducts();
    } catch { }
  };

  useEffect(() => {
    if (favIdInParams) {
      addToFavHandler(favIdInParams);
      setTimeout(() => {
        params.delete("favId");
        router.replace(`?${params.toString()}`);
      }, 3000);
    }
  }, [favIdInParams]);

  return (
    <div className="px-6 py-10">
      {loading && <Loading />}

      {searchedProducts && <h1 className="text-gray-600 font-semibold mb-6 text-lg">{searchResult} items found for &quot;{searchedProducts}&quot;</h1>}
      {categoryName &&
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Items found in <span className="text-blue-600">&quot;{categoryName}&quot;</span>
              </h1>
              <p className="text-gray-500 text-sm">
                Discover our curated collection of {categoryName} products
              </p>
            </div>
            <Link
              href='/'
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg border border-blue-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear Filters
            </Link>
          </div>
        </div>
      }

      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <div className="flex flex-col gap-3">
          <Slider />
          <hr className="h-px bg-gray-200 border-0 my-6" />

          {products.length === 0 && (
            <div className="flex flex-col items-center justify-center min-h-screen px-4">
              <h1 className="text-5xl font-bold text-yellow-600 mb-4">No Products Found</h1>
              <p className="text-lg text-gray-700 mb-3 text-center max-w-md">
                There are currently no products available. Please check back soon.
              </p>
            </div>
          )}

          <div className="grid bg-transparent grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product: ProductInterface) => {
              const productId = product._id;
              const averageRating = parseFloat(getAverageRating(productId));
              const isOutOfStock = product.countInStock <= 0;
              const hasDiscount = product.discount && product.discount > 0;

              return (
                <div key={product._id} className="group relative bg-transparent rounded-xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-gray-200">
                  {isOutOfStock && (
                    <div
                      className="absolute top-4 right-4 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10"
                    >OUT OF STOCK
                    </div>
                  )}
                  {hasDiscount && (
                    <div className="absolute top-4 left-4 z-10">
                      <div className="bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm font-bold px-3 py-2 rounded-lg shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                        {Math.round((Number(product.discount) / Number(product.price)) * 100)}% OFF
                      </div>
                      <div className="absolute -bottom-1 left-3 w-2 h-2 bg-red-700 transform rotate-45"></div>
                    </div>
                  )}
                  <div
                    onClick={() =>
                      router.push(`/buyer/order?query=${btoa(JSON.stringify({ productId, price: product.price - product.discount, stock: product.countInStock, rating: averageRating }))}`)
                    }
                    className="relative pt-[75%] overflow-hidden"
                  >


                    <Image
                      className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      src={product.image}
                      alt={product.title}
                      width={400}
                      height={300}
                    />

                  </div>

                  <div className="p-5">
                    <div className="flex flex-col justify-star flex-wrap gap-2">
                      <div>
                        <h1 className='font-bold text-gray-500'>Title:</h1>
                        <h2
                         title={product.title}
                          className="text-lg font-bold text-gray-900 mb-1 ">
                            {product.title}</h2>
                        <h1 className='font-bold text-gray-500'>Brand:</h1>
                        <p className="text-sm text-gray-500">{product.brand}</p>
                      </div>
                      <div className="">
                                                     
                            <h1 className='font-bold  text-gray-500'>Price
                              <span className='text-gray-400  text-xs'>PKR</span>
                              :

                            </h1>
                          

                        {hasDiscount ? (
                          <div className='flex flex-wrap justify-between items-center gap-2'>
                            <span className="text-sm  font-bold text-emerald-600">
                              {Number(product.price) - Number(product.discount)}
                            </span>
                            <span className="block text-sm text-gray-500 line-through">{product.price}</span>
                             <span className="bg-green-100 text-green-700 text-sm font-semibold px-2 py-1 rounded-full">
                            Save  {Math.round((Number(product.discount) / Number(product.price)) * 100)}%
                          </span>
                          </div>
                        ) : (
                          <span className={`text-sm font-bold ${isOutOfStock ? 'text-gray-400' : 'text-emerald-600'}`}>
                            {product.price}
                          </span>
                        )}
                      </div>
                    <h1 className='font-bold text-gray-500'>Description:</h1>

                    <p 
                      onClick={() => setOpenId(openId === product._id ? null : product._id)}
                    className={openId === product._id ? " text-gray-600 text-sm leading-relaxed break-all "
                      :
                      " text-gray-600 text-sm leading-relaxed line-clamp-2 break-all"}>
                      {product.description}
                    </p>

                    <button
                      onClick={() => setOpenId(openId === product._id ? null : product._id)}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200 flex items-center gap-1"
                    >
                      {openId === product._id ? (
                        <>
                          <span>Show less</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </>
                      ) : (
                        <>
                          <span>Show more</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </>
                      )}
                    </button>
                    </div>
                    <div>

                    </div>
                    <div className="mt-4 flex flex-col gap-2">
                      <div className="flex items-center">
                        <div className="flex mr-2">
                          {[1, 2, 3, 4, 5].map(star => (
                            <span key={star} className={`text-lg ${star <= Math.round(averageRating) ? "text-amber-400" : "text-gray-300"}`}>★</span>
                          ))}
                        </div>
                        <span className="text-gray-700 text-sm font-medium">({averageRating.toFixed(1)})</span>
                      </div>

                      {favProductsIds.includes(product._id) ? (
                        <button onClick={() => removeFavHandler(product._id)} className="text-red-500 w-36 hover:text-red-700">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                        </button>
                      ) : (
                        <button onClick={() => addToFavHandler(product._id)} className="text-red-500 w-36 hover:text-red-700">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                        </button>
                      )}

                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-2 ${isOutOfStock ? 'bg-rose-500' : 'bg-emerald-500'}`}></div>
                          <span className={`text-sm font-medium ${isOutOfStock ? 'text-rose-600' : 'text-emerald-600'}`}>
                            {isOutOfStock ? 'Out of Stock' : `${product.countInStock} Available`}
                          </span>
                        </div>
                        <button
                          className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                          onClick={() => {
                            setSelectedProductId(product._id);
                            setShowAddTocart(prev => !prev);
                          }}
                        >
                          + Quick Add
                        </button>
                      </div>
                    </div>
                  </div>

                  {showAddTocart && selectedProductId === product._id && (
                    <AddToCartComponent product={product} setShowAddTocart={setShowAddTocart} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
