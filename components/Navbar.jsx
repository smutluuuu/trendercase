import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    const { data: session, status } = useSession();
    const handleLogout = async () => {
        await signOut({ redirect: true, callbackUrl: '/login' });
    };
    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">Trender Case</a>
                </div>
                <div className="flex-none">
                    {session ? (
                        <div>
                            <button onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <>
                                <Link href='/login'>Login</Link>
                                <Link className='ml-3' href='/register'>Register</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar