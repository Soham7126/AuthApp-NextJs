"use client"
import Link from "next/link"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"

export default function loginpage(){
    const router = useRouter()
    const [user, setuser] = React.useState({
        email: "",
        password: ""
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    const [loading, setloading] = React.useState(false)

    const onlogin = async () => {
        try {
            setloading(true)
            const response = await axios.post("/api/users/login", user)
            toast.success(response.data.message || "Login successful!")
            router.push("/profile")
            
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || error.message || "Login failed"
            toast.error(errorMessage)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    }, [user])

    return ( 
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">{loading ? "processing": "Login"}</h1>
                
                <form onSubmit={(e) => { e.preventDefault(); onlogin(); }}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            value={user.email}
                            onChange={(e) => setuser({...user, email: e.target.value})}
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            value={user.password}
                            onChange={(e) => setuser({...user, password: e.target.value})}
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={buttonDisabled || loading}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Processing..." : "Login"}
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-4">
                    Don't have an account? <Link href="/signup" className="text-blue-500 font-semibold hover:underline">Sign Up</Link>
                </p>
            </div>
        </div>
    )
}