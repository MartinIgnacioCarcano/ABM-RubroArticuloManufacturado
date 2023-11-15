import Carousel from 'react-bootstrap/Carousel';
import "./Carousel.Home.css";


const CarouselHome = () => {
  return (
    <div className='carousel'>
      <Carousel>
        <Carousel.Item interval={5000}>
          <img
            className='d block w-100'
            src="/fotos/paty.jpg"
            alt="slide 1"

          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>

        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className='d block w-100'
            src="/fotos/Pizzas.jpeg" alt="slide2" />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item interval={5000}>
          <img
            className='d block w-100'
            src="/fotos/pancho.jpg" alt="slide3" />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

export default CarouselHome