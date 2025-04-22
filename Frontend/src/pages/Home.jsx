import React from 'react'
import Header from './Movies/Header';
import MoviesContainerPage from './Movies/MoviesContainerPage';



function Home() {
  return (
    <>
     <Header/>
     <section className="mt-[1rem]">
        <MoviesContainerPage />
      </section>
    </>
  )
}

export default Home