"use client"
import axios from "axios"
import Link from "next/link"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function profilepage() {
    const router = useRouter()
    const [userData, setUserData] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    const getUserDetails = async () => {
        try {
            const res = await axios.get("/api/users/me")
            setUserData(res.data.data)
            setLoading(false)
        } catch (error: any) {
            toast.error(error.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        getUserDetails()
    }, [])

    const logout = async () => {
        try {
            const log = await axios.get("/api/users/logout")
            toast.success("Logged out successfully")
            router.push("/login")
        } catch (error: any) {
           toast.error(error.message) 
        }
    }




    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold mb-4">Profile</h1>
            <hr className="w-full max-w-md mb-4" />
            {loading ? (
                <p>Loading...</p>
            ) : userData ? (
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <p className="mb-2"><span className="font-semibold">Username:</span> {userData.username}</p>
                    <p className="mb-2"><span className="font-semibold">Email:</span> {userData.email}</p>
                    <p className="mb-2"><span className="font-semibold">User ID:</span> {userData._id}</p>
                </div>
            ) : (
                <p>No user data found</p>
            )}
        <hr className="w-full max-w-md my-4" />
        <button onClick={logout} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition">Logout</button>

        </div>
    )
}