'use client'
import axios, { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import FavInterface from '../../utils/favInterface'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const FavouriteProductsComponent = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const [favProducts, setFavProducts] = useState<FavInterface[]>([])
  const router = useRouter();
  const getFavProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/get-fav-product`, { withCredentials: true })
      setFavProducts(res.data.data)

    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return;
      }
    }
  }
  useEffect(() => {
    getFavProducts()
  }, [])
  const removeFavHandler = async (productId: string) => {

    try {
      await axios.delete(`${API_URL}/remove-fav/${productId}`, { withCredentials: true })
      await getFavProducts()

    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return alert(error.message)
      }
    }
  }
  return (
    <>
      {favProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8 rounded-2xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">
            No favorite product found
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            You haven’t added any products to favorites yet.
          </p>
        </div>
      )}

      <div className="animate-fadeIn">
        <div className="grid  md:grid-cols-3 md:gap-4 space-y-2 space-x-2">
          {favProducts.map((fav: FavInterface) => (
            <div
              key={fav._id}

              className="bg-transparent border flex flex-wrap flex-col gap-3 rounded-xl p-4">
              <div
                className='cursor-pointer'
                onClick={() => {
                  if (!fav.item) {
                    return ;
                  }
                  router.push(`/buyer/order?query=${btoa(JSON.stringify({ productId: fav.item._id, p: fav.item.price, stock: fav.item.countInStock, rating: fav.item.rating }))}`)
                }
                }
              >
                {fav.item ?

                  <div className='flex   justify-between  gap-2'>
                    <div >

                      <Image
                        className='w-auto h-auto bg-transparent'
                        src={fav.item.image}
                        width={100}
                        height={100}
                        alt="fav product img" />
                      <p className="font-medium text-gray-800">{fav.item.title}</p>
                      <p className="text-gray-600 text-sm mb-2">{fav.item.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-900">{fav.item.price}</span>
                      </div>
                    </div>
                    <div>

                      <button
                        onClick={() => removeFavHandler(fav.item._id)}
                        className="text-red-500 hover:text-red-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  :
                <div 
  key={fav._id} 
  className="p-4 bg-amber-50 rounded-lg flex flex-col items-center text-gray-400  "
>
  <div className="flex items-center mb-2 w-full justify-center">
    <svg 
      className="w-5 h-5 mr-2 flex-shrink-0" 
      fill="currentColor" 
      viewBox="0 0 20 20"
    >
      <path 
        fillRule="evenodd" 
        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" 
        clipRule="evenodd" 
      />
    </svg>
    <p className="text-sm font-medium text-center">
      This favorite item is no longer available
    </p>
  </div>
  
  <button
    onClick={() => removeFavHandler(fav._id)}
    className="mt-2 px-4 py-2 bg-white border border-amber-300 text-amber-700 rounded-md text-sm font-medium hover:bg-amber-100 hover:border-amber-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
  >
    Remove from Favorites
  </button>
</div>
                }


              </div>


            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default FavouriteProductsComponent
