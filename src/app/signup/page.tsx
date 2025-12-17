"use client"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"



export default function signuppage(){
    const router = useRouter()
    const [user, setuser] = React.useState({
        email: "",
        password: "",
        username: ""
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    const [loading, setloading] = React.useState(false)

    const onsignup = async () => {
        try {
            setloading(true)
            const response = await axios.post("/api/users/signup", user)
            toast.success(response.data.message || "Signup successful!")
            router.push("/login")
            
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || error.message || "Signup failed"
            toast.error(errorMessage)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        if(user.email.length > 0  && user.password.length > 0 && user.username.length > 0 ){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    }, [user])

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">{loading ? "processing": "signup"}</h1>
                
                <form onSubmit={(e) => { e.preventDefault(); onsignup(); }}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Username</label>
                        <input
                            id="username"
                            type="text"
                            value={user.username}
                            onChange={(e) => setuser({...user, username: e.target.value})}
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400"
                            placeholder="Enter your username"
                            required
                            minLength={3}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={user.email}
                            onChange={(e) => setuser({...user, email: e.target.value})}
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={user.password}
                            onChange={(e) => setuser({...user, password: e.target.value})}
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400"
                            placeholder="Enter your password (min 6 characters)"
                            required
                            minLength={6}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={buttonDisabled || loading}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Processing..." : "Sign Up"}
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-4">
                    Already have an account? <Link href="/login" className="text-blue-500 font-semibold hover:underline">Login</Link>
                </p>
            </div>
        </div>
    )
}