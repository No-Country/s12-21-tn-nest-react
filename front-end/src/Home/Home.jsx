import React from 'react'
import { Link } from "react-router-dom";
import { MentorCard } from '../components/MentorCard';

const Home = () => {
  return (
    <div>
        <div>Home</div>
        <Link to={'/signUp'}><button>Registro</button></Link>
        <MentorCard />
    </div>
  )
}

export default Home