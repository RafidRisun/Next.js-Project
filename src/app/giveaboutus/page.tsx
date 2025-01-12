"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';

interface User {
    fullName: string;
    userName: string;
    email: string;
}
interface Feedback {
    id: number;
    content: string;
}

export default function Feedback() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [content, setContentText] = useState<string>('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const email = localStorage.getItem('email');
                if (token) {
                    // Fetch user data
                    const userResponse = await axios.get('http://localhost:3000/admin/findAdminByEmail/' + email, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUser(userResponse.data);
                } else {
                    router.push('/dashboard');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                router.push('/dashboard');
            }
        };

        fetchUserData();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        router.push('/logintype');
    };



    const handleSubmitFeedback = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (token && user) {
                // Send feedback to backend endpoint
                await axios.post(`http://localhost:3000/about-us`, { content }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                // Reset feedback text after submission
                setContentText('');
                // Show success message
                toast.success('About Us submitted successfully');
            } else {
                router.push('/dashboard');
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
            // Show error message
            toast.error('Failed to submit feedback');
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-base-200 py-4 px-6">
                <div className="mb-4">
                    <ul className="space-y-2">
                        <li>
                            <Link href="/dashboard">
                                <p className="text-lg font-bold">CampusNET</p>
                            </Link>
                        </li>
                    </ul>
                </div>
                <nav>
                    <ul className="space-y-2">

                    </ul>
                </nav>
            </aside>

            {/* Main content */}
            <div className="flex flex-col flex-1">
                {user && (
                    <div className="navbar bg-base-100 flex items-center justify-between py-4 px-6">
                        <div>
                            <p className="text-xl text-white">{`Hi, ${user.fullName}`}</p>
                        </div>
                        <div className="flex gap-4 items-center">

                            <div className="dropdown dropdown-end">
                                <ul tabIndex={0} className="dropdown-content bg-base-100 rounded-box w-52 shadow-lg flex gap-4">
                                    <li>
                                        <Link href="/dashboard" className="text-white-500 hover:text-blue-500">
                                            <span role="img" aria-label="Profile">Dashboard</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <button className="text-white-500 hover:text-blue-500" onClick={handleLogout}>
                                            <span role="img" aria-label="Logout">Logout</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                <Toaster />

                {/* Main content body */}
                <div className="flex-1 overflow-y-auto">
                    <div className="container mx-auto p-6">
                        {/* Feedback form */}
                        <form onSubmit={handleSubmitFeedback}>
                            <textarea
                                value={content}
                                onChange={(e) => setContentText(e.target.value)}
                                className="w-full border p-2 mb-4 text-black" // Added text-black class
                                placeholder="Enter about us here"
                                rows={4}
                            />

                            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                Submit About Us
                            </button>
                        </form>

                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-gray-800 text-gray-300 py-6">
                    <div className="container mx-auto flex justify-between items-center">
                        <div>
                            <p className="text-xl font-bold">CampusNET</p>
                            <p className="mt-2">123 Kuratoli, Dhaka, Bangladesh</p>
                            <p className="mt-1">CampusNet@yourcompany.com</p>
                            <p className="mt-1">+8801820153496</p>
                        </div>
                        <div>
                            <p>Follow Us:</p>
                            <div className="flex mt-2">
                                <a href="#" className="text-gray-300 hover:text-gray-400 mr-4">
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 6a2 2 0 00-2-2h-4.586a2 2 0 01-1.414-.586l-1.086-1.086A2 2 0 0010.586 2H6a2 2 0 00-2 2v16a2 2 0 002 2h8a2 2 0 002-2v-7l3.5-3.5L21 6zm-7 2a4 4 0 100 8 4 4 0 000-8z"></path>
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-300 hover:text-gray-400 mr-4">
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l1 1 1-1M3 10v4a7 7 0 007 7h1a7 7 0 007-7v-4M8 14h0"></path>
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-300 hover:text-gray-400">
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 10c-1.5 0-2.5.2-3.7.5 1.1-.7 2.2-1.7 2.8-3-1 .6-2 1-3.1 1.2C16.4 7.8 15 7 13.5 7c-2.2 0-4 1.8-4 4 0 .3 0 .6.1.9C7.8 12.9 5.2 11 3 11c-.4 0-.8 0-1.2.1 1.7 1.1 3.6 1.7 5.7 1.8-.3.9-.4 1.8-.4 2.7 0 5.2 2.8 5.2 5.2 0 .4 0 .8-.1 1.2 1.1 0 2.3-.2 3.4-.6-.4 1.1-1.1 2-2.1 2.7.9-.1 1.8-.4 2.7-.8.6.4 1.3.6 2 .6 2.4 0 4.3-2 4.3-4.4 0-.1 0-.3 0-.4.8-.6 1.5-1.4 2.1-2.3-.8.3-1.7.5-2.5.6.9-.5 1.6-1.2 2.2-2-.9.3-1.8.5-2.7.7.8-.5 1.6-1 2.3-1.7z"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
