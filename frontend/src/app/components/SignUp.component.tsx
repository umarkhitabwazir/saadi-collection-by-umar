'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SignupSchema, SignupFormData } from '../utils/formSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import SignUpWithGoogleComponent from './SignUpWithGoogle.component';

const SignupComponent = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<SignupFormData>({
        resolver: zodResolver(SignupSchema),
        mode: 'onChange'
    });

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const [error, setError] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const router = useRouter();

    const onSubmit = async (data: SignupFormData) => {
        console.log("data", data);
        setLoading(true);
        setError(undefined);
        try {
            await axios.post(`${API_URL}/user/signup`, data, { withCredentials: true });
            
            const maskEmail = (email: string) => {
                const [name, domain] = email.split('@');
                const firstTwo = name.slice(0, 2);
                const lastTwo = name.slice(-2);
                return `${firstTwo}****${lastTwo}@${domain}`;
            };
            
            const maskedEmail = maskEmail(data.email);
            router.push(`/verify-email?email=${maskedEmail}`);
            setLoading(false);

        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                setLoading(false);
                if (err?.response) {
                    setError(err.response.data.error);
                } else {
                    setError('An unknown error occurred.');
                }
            }
        }
    };

    return (
        <div className="min-h-screen flex  items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 ">
            <div className="w-full max-w-md mx-auto">
                {/* Card Container */}
                <div className="backdrop-blur-sm  p-8">
                    
                    {/* Header */}
                    <div className="text-center mb-8">
                        <Image
                            src="/logo.jpg" 
                            alt="App Logo" 
                            width={120} 
                            height={120} 
                            className="mx-auto rounded-full mb-4 border-4 border-orange-200/20"
                        />
                        <h2 className="text-3xl font-bold text-orange-200 text-center mb-2">
                            Create Your Account
                        </h2>
                        <p className="text-gray-400 text-sm">
                            Join our community today
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        
                        {/* Username Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-orange-200">
                                Username
                            </label>
                            <input
                                {...register('username')}
                                className={`w-full px-4 py-3 bg-gray-700/50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 placeholder-gray-400 text-white ${
                                    errors.username 
                                        ? 'border-red-500 focus:ring-red-500' 
                                        : 'border-gray-600 focus:border-orange-300 focus:ring-orange-300/50'
                                }`}
                                placeholder="Choose a username"
                            />
                            {errors.username && (
                                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                                    <span>⚠</span> {errors.username.message}
                                </p>
                            )}
                        </div>

                        {/* Phone Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-orange-200">
                                Phone Number
                            </label>
                            <input
                                {...register('phone')}
                                className={`w-full px-4 py-3 bg-gray-700/50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 placeholder-gray-400 text-white ${
                                    errors.phone 
                                        ? 'border-red-500 focus:ring-red-500' 
                                        : 'border-gray-600 focus:border-orange-300 focus:ring-orange-300/50'
                                }`}
                                placeholder="03XXXXXXXXX"
                            />
                            {errors.phone && (
                                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                                    <span>⚠</span> {errors.phone.message}
                                </p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-orange-200">
                                Email Address
                            </label>
                            <input
                                {...register('email')}
                                type="email"
                                className={`w-full px-4 py-3 bg-gray-700/50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 placeholder-gray-400 text-white ${
                                    errors.email 
                                        ? 'border-red-500 focus:ring-red-500' 
                                        : 'border-gray-600 focus:border-orange-300 focus:ring-orange-300/50'
                                }`}
                                placeholder="your@email.com"
                            />
                            {errors.email && (
                                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                                    <span>⚠</span> {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-orange-200">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    {...register('password')}
                                    type={passwordVisible ? 'text' : 'password'}
                                    className={`w-full px-4 py-3 bg-gray-700/50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 placeholder-gray-400 text-white pr-12 ${
                                        errors.password 
                                            ? 'border-red-500 focus:ring-red-500' 
                                            : 'border-gray-600 focus:border-orange-300 focus:ring-orange-300/50'
                                    }`}
                                    placeholder="Create a secure password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setPasswordVisible(prev => !prev)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-600/50 rounded-lg transition-colors duration-200"
                                >
                                    <Image 
                                        src={passwordVisible ? "/eye-solid.svg" : "/eye-slash-solid.svg"}
                                        width={18} 
                                        height={18} 
                                        alt="Toggle password visibility"
                                        className="opacity-70"
                                    />
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                                    <span>⚠</span> {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading || !isValid}
                            className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 mt-6 ${
                                loading || !isValid
                                    ? 'bg-gray-600 cursor-not-allowed text-gray-400'
                                    : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0'
                            }`}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Creating Account...
                                </div>
                            ) : (
                                'Sign Up'
                            )}
                        </button>

                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                                <p className="text-red-300 text-sm text-center">
                                    {error.split(' at ')[0]}
                                </p>
                            </div>
                        )}
                    </form>

                    {/* Divider */}
                    <div className="my-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-600"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-3 bg-gray-800 text-gray-400">Or continue with</span>
                            </div>
                        </div>
                    </div>

                    {/* Google Sign Up */}
                    <div className="mb-6">
                        <SignUpWithGoogleComponent />
                    </div>

                    {/* Login CTA */}
                    <div className="text-center mb-6">
                        <p className="text-gray-400 text-sm">
                            Already have an account?{' '}
                            <Link
                                href="/login"
                                className="font-semibold text-orange-300 hover:text-orange-200 transition-colors duration-200 underline hover:no-underline"
                            >
                                Sign in here
                            </Link>
                        </p>
                    </div>

                    {/* Secondary Actions */}
                    <div className="pt-4 border-t border-gray-700">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-sm">
                            <Link
                                href="/reset-password"
                                className="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium"
                            >
                                Forgot password?
                            </Link>
                            <Link
                                href="/"
                                className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-200 font-medium group"
                            >
                                Return to Home
                                <svg 
                                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupComponent;