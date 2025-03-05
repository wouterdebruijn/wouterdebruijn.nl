"use client";

import Form from 'next/form';
import { useActionState } from "react";

import { signIn } from "../../actions";

const initialState = {
    error: '',
}

export default function Login() {
    const [state, formAction, pending] = useActionState(signIn, initialState)

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="font-roboto">
                <Form
                    action={formAction}
                    className="flex flex-col items-center justify-center gap-4 p-8 rounder shadow w-md border-1 border-gray-600 bg-white">
                    <input type="text" name="username" placeholder="Username"
                        className="w-full mt-4 border-b-1 border-gray-400" />
                    <input type="password" name="password" placeholder="Password"
                        className="w-full mt-4 border-b-1 border-gray-400" />

                    <p className="text-red-500">{state.error}</p>

                    <button type="submit" disabled={pending} className="px-4 py-2 text-white bg-secondary shadow rounded font-bold cursor-pointer">Login</button>
                </Form>
            </div>
        </div>
    );
}
