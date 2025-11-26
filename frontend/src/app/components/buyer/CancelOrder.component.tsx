'use client'
import { useState } from 'react'
import Image from 'next/image'
import { ProductInterface } from '../../utils/productsInterface'
import { OrderInterface } from '../../utils/orderInterface'
import UserPaymentForm from './UserPaymentForm.component'

const CancelOrderComponent = ({
  cancelOrders,
  products,
}: {
  cancelOrders: OrderInterface[]
  products: ProductInterface[]
}) => {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)

  if (cancelOrders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 rounded-2xl">
        <p className="text-sm text-gray-500 mt-2">
          You haven’t canceled any orders yet.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {cancelOrders.map((order) => {
        const showDetails = selectedOrderId === order._id

        return (
          <div key={order._id} className="border p-4 rounded-md bg-white shadow">
            <div className="flex flex-col flex-wrap justify-between items-center">
              <div className='flex flex-wrap justify-between items-center w-full'>
                <h2 className="font-semibold text-gray-700">
                  Order #{order._id.slice(-6).toUpperCase()}
                </h2>

                <p className="text-sm text-gray-600">
                  Canceled on {' '}
                  {new Date(order.updatedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
                <div className="flex items-center mt-1">
                  <span className={`inline-block w-3 h-3 rounded-full ${order.cancelled ? 'bg-green-500' : 'bg-red-500'}  mr-2`}></span>
                  <span className={`text-sm ${order.cancelled ? 'text-green-700' : 'text-red-500'} `}>
                    {order.cancelled ? 'Cancelled' : 'pending'}
                  </span>
                </div>
              </div>



              <button
                onClick={() =>
                  setSelectedOrderId((prev) =>
                    prev === order._id ? null : order._id
                  )
                }
                className="bg-blue-500 text-white w-full px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                {showDetails ? 'Hide Details' : 'View Details'}
              </button>
            </div>

            {showDetails && (
              <div className="mt-6 flex flex-wrap justify-between border-t pt-4">
                <div>
                  {order.transactionId && <p className="text-sm text-gray-600 mb-1">
                    Refund Status:{' '}
                    <span
                      className={`font-medium ${order.refund ? 'text-green-500' : 'text-red-500'
                        }`}
                    >
                      {order.refund ? 'Refunded' : 'Pending'}
                    </span>
                  </p>}

                  <p className="text-sm text-gray-600 mb-1">
                    Transaction ID:{' '}
                    <span className="text-green-500 font-medium">
                      {order.transactionId || 'N/A'}
                    </span>
                  </p>

                  <p className="text-sm text-gray-600 mb-3">
                    Total Amount:{' '}
                    <span className="font-medium text-gray-800">
                      PKR {order.totalPrice.toFixed(2)}
                    </span>{' '}
                    (Tax: PKR {order.taxPrice.toFixed(2)}, Shipping: PKR{' '}
                    {order.shippingPrice.toFixed(2)})
                  </p>
                  <div className="flex flex-wrap gap-4 justify-start">
                    {order.products.map((orderProduct) => {
                      const product = products.find(
                        (p) => p._id === orderProduct.productId._id
                      )


                      return (
                        product ?
                          <div
                            key={orderProduct.productId._id}
                            className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-gray-300"
                          >
                            {/* Image Container */}
                            <div className="relative flex-shrink-0  bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                              <Image
                                src={product.image}
                                alt={product.title}
                                onClick={() => window.open(product.image, "_blank")}
                                className={`rounded-lg object-cover   shadow-md cursor-pointer`}
                                width={400}
                                height={400}
                              />
                            </div>

                            {/* Content Container */}
                            <div className="flex-1 min-w-0 w-full">
                              {/* Product Title */}
                              <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                                {product.title}
                              </h3>

                              {/* Product Details Grid */}
                              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 mb-4">
                                {/* Price */}
                                <div className="flex items-center gap-2">
                                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                                      <path d="M6 4h2v16H6V4zm3 0h2v7.5l4-4V4h2v16h-2v-7.5l-4 4V20h-2V4z" />
                                    </svg>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500 font-medium">Price</p>
                                    <p className="text-sm font-semibold text-gray-900">
                                      PKR {orderProduct.price}
                                    </p>
                                  </div>
                                </div>

                                {/* Quantity */}
                                <div className="flex items-center gap-2">
                                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500 font-medium">Quantity</p>
                                    <p className="text-sm font-semibold text-gray-900">{orderProduct.quantity}</p>
                                  </div>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                {/* Total Price */}
                                <div className="text-sm">
                                  <span className="text-gray-500">Subtotal: </span>
                                  <span className="font-semibold text-gray-900">
                                   {  (orderProduct.price * orderProduct.quantity).toFixed(2) || 'N/A'}
                                  </span>
                                </div>

                                {/* View Button */}
                                <button
                                  onClick={() => window.open(product.image, "_blank")}
                                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium text-sm"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                  View Image
                                </button>
                              </div>
                            </div>
                          </div>
                          :
                          <div key={order._id} className="flex items-center justify-between p-6">
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
                                  This product has been removed
                                </p>
                              </div>
                            </div>


                          </div>

                      )
                    })}
                  </div>
                </div>

                {
                  order.transactionId && order.cancelled && !order.refund &&
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      Refund will be issued to:
                    </p>
                    <UserPaymentForm />

                  </div>
                }
              </div>
            )}

          </div>
        )
      })}
    </div>
  )
}

export default CancelOrderComponent
