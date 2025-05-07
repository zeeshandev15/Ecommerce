"use client";
import React, { useEffect, useState } from "react";
import CartItemsDetails from "./CartItemsDetails";
import { Separator } from "../ui/separator";
import useCartStore from "@/store/cartStore";
import { Button } from "../ui/button";
import Loader from "../others/Loader";
import { formatPrice } from "@/lib/formatPrice";
import { useRouter } from "next/navigation";

const OrderSummaryForCheckout = ({ shippingform }: any) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const {
    getTotalPrice,
    getTax,
    getShippingFee,
    getTotalAmount,
    cartItems,
    clearCart,
  } = useCartStore();

  const customerOrder = {
    totalPrice: getTotalPrice(),
    tax: getTax(),
    shippingFee: getShippingFee(),
    totalAmount: getTotalAmount(),
    cartItems,
    shippingForm: shippingform,
  };

  const submitOrder = async (customerOrder: any) => {
    try {
      const response = await fetch("http://localhost:8000/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerOrder),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to place order");
      }

      const data = await response.json();
      console.log("Order placed successfully:", data);
      clearCart();
      router.push("/");
    } catch (error: any) {
      console.error("Error submitting order:", error.message);
    }
  };

  if (!isMounted) {
    return <Loader />;
  }
  return (
    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
      <div>
        <h2 className="text-lg font-semibold my-2 lg:p-4">Order Items</h2>
        <CartItemsDetails />
        <Separator className="dark:bg-white/50 mb-2" />
      </div>

      <div className="lg:px-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Order Summary
        </h2>
        <div className="flex justify-between mb-4">
          <span className="text-gray-700 dark:text-gray-300">Subtotal:</span>
          <span className="text-gray-900 dark:text-white">
            ${formatPrice(getTotalPrice())}
          </span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-gray-700 dark:text-gray-300">Shipping:</span>
          <span className="text-gray-900 dark:text-white">
            ${formatPrice(getShippingFee())}
          </span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-gray-700 dark:text-gray-300">Tax:</span>
          <span className="text-gray-900 dark:text-white">
            ${formatPrice(getTax())}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-xl font-semibold text-gray-900 dark:text-white">
            Total:
          </span>
          <span className="text-xl font-semibold text-gray-900 dark:text-white">
            ${formatPrice(getTotalAmount())}
          </span>
        </div>
        <Button
          className="text-xl mt-6 bg-blue-500 dark:bg-blue-600 text-white py-6 px-12 hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none rounded-full hover:ring-2"
          onClick={() => submitOrder(customerOrder)}
        >
          Place Order
        </Button>
      </div>
    </div>
  );
};

export default OrderSummaryForCheckout;
