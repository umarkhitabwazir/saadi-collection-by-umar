'use client'
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CartDataInterface, CartItemInterface } from "../../utils/cartInterface";
import { useRouter } from "next/navigation";
import AddressComponent from "./Address.component";

const GetUserCartComponent = () => {
  const API = process.env.NEXT_PUBLIC_API_URL;

  const [userCart, setUserCart] = useState<CartDataInterface[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [selectedItemsIds, setSelectedItemsIds] = useState<string[]>([]);
  const [loading,setLoading]=useState(false)
  const [productIdsAndQtyArr, setProductIdsAndQtyArr] = useState<
    { productId: string; quantity: number }[]
  >([]);
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  

  const router = useRouter();

  const handleCheckboxChange = (itemId: string) => {
    setSelectedItemsIds((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };
 const getAddress = async (): Promise<boolean> => {
  try {
    const res = await axios.get(`${API_URL}/find-address`, { withCredentials: true });
    const hasAddress = res.data.success
        return hasAddress;
  } catch  {
    
    return false;
  }
};

    useEffect(() => {
      getAddress()
    }, []);

  const proceedHandler =async () => {
  
    setLoading(true)
const hasAddress = await getAddress();
    if (price > 0 && productIdsAndQtyArr.length > 0) {
      

        if (!hasAddress) {
    setLoading(false)

          alert("Please add a shipping address before proceeding to checkout.");
                return;
        }
    setLoading(false)
  
        router.push(
          `/buyer/payment-cashier?query=${btoa(JSON.stringify({ price, productIdsAndQtyArr }))} `
        );
    
    }


  };

  // fetch cart data once
  const getUserCart = async () => {
    const res = await axios.get(`${API}/get-cart-data`, {
      withCredentials: true,
    });
    return setUserCart(res.data.data);
  };

  useEffect(() => {
    getUserCart();
  }, []);

  useEffect(() => {
    if (!userCart || userCart.length === 0) {
      setProductIdsAndQtyArr([]);
      setPrice(0);
      return;
    }
    const removeDeletedProducts = userCart.filter((cart: { deleted: boolean }) => !cart.deleted)
    const productIdsAndQty = removeDeletedProducts.flatMap((cart: CartDataInterface) =>
      cart.cartItems.map((p: CartItemInterface) => ({
        productId: p.product._id,
        quantity: p.quantity,
      }))
    );

    const filteredProducts = productIdsAndQty.filter((p) =>
      selectedItemsIds.includes(p.productId)
    );
    setProductIdsAndQtyArr(filteredProducts);

    const total = removeDeletedProducts
      .flatMap((cart: CartDataInterface) =>
        cart.cartItems.filter((item: CartItemInterface) =>
          selectedItemsIds.includes(item.product._id)
        )
      )
      .reduce((sum: number, item: CartItemInterface) => sum + item.price, 0);

    setPrice(total);
  }, [userCart, selectedItemsIds]);


  const removeCartHandler = async (cartId: string) => {
    try {
      await axios.delete(`${API}/delete-cart/${cartId}`, { withCredentials: true })
      await getUserCart()

    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        return
      }
    }
  }

  return (
    <>
      {userCart.length === 0 ? (
        <div className="flex flex-wrap flex-col items-center justify-center p-8 rounded-2xl border border-gray-200 bg-gray-50 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">
            Your cart is empty
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Looks like you haven’t added any items yet.
          </p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 px-6 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-6 max-w-6xl mx-auto">

  {/* Cart Items Section */}
  <div className="animate-fadeIn bg-white  rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
    {userCart.map((cart: CartDataInterface) => (
      <div 
        key={cart._id}
        className={`
          relative transition-all duration-300
          ${cart.deleted 
            ? "bg-red-50 border-l-4 border-l-red-400" 
            : "bg-white hover:bg-gray-50"
          }
        `}
      >
        {/* Deleted Item State */}
        {cart.deleted ? (
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-red-800">
                  Item No Longer Available
                </p>
                <p className="text-xs text-red-600 mt-1">
                  This product has been removed or is out of stock
                </p>
              </div>
            </div>
            <button
              onClick={() => removeCartHandler(cart._id)}
              className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-medium rounded-lg transition-colors duration-200 text-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Remove
            </button>
          </div>
        ) : (
          /* Active Cart Items */
          <div className="p-6 ">
            {cart.cartItems.map((cartItem: CartItemInterface) => (
              <div
  key={cartItem._id}
  className="flex flex-col xs:flex-row items-start xs:items-center gap-3 py-4 border-b border-gray-100 last:border-b-0 group hover:bg-gray-50 rounded-lg px-3 transition-colors duration-200"
>
  {/* Checkbox */}
  <div className="flex-shrink-0">
    <input
      checked={selectedItemsIds.length !== 0 && selectedItemsIds.includes(cartItem.product._id)}
      onChange={() => handleCheckboxChange(cartItem.product._id)}
      className="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2 cursor-pointer transition-all duration-200"
      type="checkbox"
    />
  </div>

  {/* Product Image */}
  <div className="flex-shrink-0">
    <div className="relative w-full h-64 xs:w-16 xs:h-16 bg-white rounded-lg border border-gray-200 overflow-hidden">
      <Image
       className="w-full h-64 object-cover "
        onClick={() => window.open(cartItem.product.image, "_self")}
width={400}
      height={400}
        src={cartItem.product.image}
        alt={cartItem.product.title}
      />
    </div>
  </div>

  {/* Product Details - Takes remaining space */}
  <div className="flex-1 min-w-0">
    <h3 className="font-semibold text-gray-900 text-sm xs:text-base mb-1 line-clamp-2">
      {cartItem.product.title}
    </h3>
    <div className="flex flex-wrap items-center gap-2 text-xs xs:text-sm text-gray-600">
      <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md">
        <svg className="w-3 h-3 xs:w-4 xs:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        Qty: {cartItem.quantity}
      </span>
      <span className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-md">
        <svg className="w-3 h-3 xs:w-4 xs:h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 4h2v16H6V4zm3 0h2v7.5l4-4V4h2v16h-2v-7.5l-4 4V20h-2V4z"/>
        </svg>
        PKR {cartItem.product.price}
      </span>
    </div>
  </div>

  {/* Remove Button */}
  <div className="flex-shrink-0 self-center mt-2 xs:mt-0">
    <button
      onClick={() => removeCartHandler(cart._id)}
      className="p-1 xs:p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 group/remove flex items-center gap-1 xs:gap-2"
    >
      <svg className="w-4 h-4 xs:w-5 xs:h-5 group-hover/remove:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
      <span className="text-xs xs:text-sm font-medium group-hover/remove:text-red-600 hidden xs:block">
        Remove
      </span>
      <span className="text-xs font-medium group-hover/remove:text-red-600 xs:hidden">
        Remove Item
      </span>
    </button>
  </div>
</div>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>

  {/* Order Summary Section */}
  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
    <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
      {/* Total Price */}
      <div className="text-center sm:text-left">
        <p className="text-sm font-medium text-gray-600 mb-1">Total Amount</p>
        <p className="text-3xl font-bold text-purple-700">
          PKR {price}
        </p>
        <p className="text-xs text-gray-500 mt-2">
          {selectedItemsIds.length} item{selectedItemsIds.length !== 1 ? 's' : ''} selected
        </p>
      </div>

      {/* Checkout Button */}
      <button
        onClick={proceedHandler}
        disabled={selectedItemsIds.length === 0}
        className={`
          px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform
          ${selectedItemsIds.length === 0 ||loading 
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 hover:shadow-lg hover:scale-105 active:scale-95'
          }
        `}
      >
        <div className="flex items-center gap-3">
          <span>
            {loading?"PROCEEDING...":'PROCEED TO CHECKOUT'}
            </span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </button>
    </div>

    {/* Additional Info */}
    <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
      <div className="flex items-center gap-2">
        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Secure checkout
      </div>
      <div className="flex items-center gap-2">
        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Free shipping on orders over PKR 5000
      </div>
      <div className="flex items-center gap-2">
        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        15-day returns
      </div>
    </div>
  </div>

  {/* Address Component */}
  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
    <AddressComponent />
  </div>
</div>
      )}
    </>
  );
};

export default GetUserCartComponent;
