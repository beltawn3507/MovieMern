import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import MoviesCard from '../pages/Movies/MoviesCard';


const SliderUtil = ({data}) => {

    const settings={
      dots:true,
      infinite:true,
      speed:500,
      slidesToShow:4,
      slidesToScroll:1,
      autoplay: true,            
      autoplaySpeed: 1800,
      pauseOnHover:true,
      responsive: [
        {
          breakpoint: 1280, // xl and below
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 1024, // lg and below
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 640, // sm and below
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    }
   //console.log(data);

  return (
    <Slider {...settings}>
      {data?.map((movie)=>(
        <MoviesCard key={movie._id} movie={movie} />
      ))}
    </Slider>
  )
}

export default SliderUtil
