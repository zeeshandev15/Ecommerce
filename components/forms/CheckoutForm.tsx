"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

// Defined Zod schema for form validation
const schema = z.object({
  firstName: z.string().min(3, "First Name is required"),
  lastName: z.string().min(3, "Last Name is required"),
  address: z.string().min(5, "Address is required"),
  phone: z.string().min(8, "Phone is required"),
  city: z.string().min(3, "City is required"),
  zip: z.string().min(5, "ZIP Code is required"),
  country: z.string().min(2, "Country is required"),
});

// Defined types for form data
export type FormData = z.infer<typeof schema>;
interface CheckoutFormProps {
  setShippingform: React.Dispatch<React.SetStateAction<any>>;
}
const CheckoutForm: React.FC<CheckoutFormProps> = ({ setShippingform }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // Handle form submission
  const onSubmit: SubmitHandler<FormData> = (data) => {
    const currentDate = new Date().toISOString();
    const finalData = {
      ...data,
      date: currentDate,
    };
    setShippingform(finalData);
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              {...register("firstName")}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-6 focus:outline-none"
            />
            {errors.firstName && (
              <span className="text-red-500">{errors.firstName.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              {...register("lastName")}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-6 focus:outline-none"
            />
            {errors.lastName && (
              <span className="text-red-500">{errors.lastName.message}</span>
            )}
          </div>
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            {...register("address")}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-6 focus:outline-none"
          />
          {errors.address && (
            <span className="text-red-500">{errors.address.message}</span>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              type="tel"
              id="phone"
              {...register("phone")}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-6 focus:outline-none"
            />
            {errors.phone && (
              <span className="text-red-500">{errors.phone.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              {...register("city")}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-6 focus:outline-none"
            />
            {errors.city && (
              <span className="text-red-500">{errors.city.message}</span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="zip">ZIP Code</Label>
            <Input
              id="zip"
              {...register("zip")}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-6 focus:outline-none"
            />
            {errors.zip && (
              <span className="text-red-500">{errors.zip.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              {...register("country")}
              className="w-full p-6 border border-gray-300 dark:border-gray-700 rounded-lg  focus:outline-none"
            />
            {errors.country && (
              <span className="text-red-500">{errors.country.message}</span>
            )}
          </div>
        </div>
        <div className="flex items-center justify-end">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
};
export default CheckoutForm;
