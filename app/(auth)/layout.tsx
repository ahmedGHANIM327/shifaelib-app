import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen bg-accent">
      <ToastContainer
        position={'bottom-right'}
        rtl={false}
        closeOnClick
        theme={'colored'}
        pauseOnHover={false}
      />
      {children}
    </div>
  );
}
