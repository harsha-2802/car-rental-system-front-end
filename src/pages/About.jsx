import React from 'react'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Service from '../components/Service'
import about from '../assets/images/aboutphoto.jpg'

const About = () => {
  return (
    <>
      <Hero img={about} pageName="About" />
      <Service />
      <Footer />
    </>
  )
}

export default About
