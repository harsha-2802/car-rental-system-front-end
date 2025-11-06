import React from 'react'
import banner from '../assets/images/homephoto.jpg'

const Banner = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${banner})`,
      }}
    >
      <div className="hero-overlay bg-opacity-70"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Welcome to RentEase</h1>
          <p className="mb-5">
          Revolutionize your car rental business with RentEase, a cutting-edge management solution. Effortlessly handle reservations, track fleet performance, and enhance customer satisfaction. Experience efficiency and growth in one powerful platform.
          </p>
          <button className="btn btn-primary opacity-50">Get Started</button>
        </div>
      </div>
    </div>
  )
}

export default Banner
