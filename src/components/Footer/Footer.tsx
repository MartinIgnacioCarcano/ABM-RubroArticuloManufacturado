import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <footer className="mt-auto py-3 bg-dark text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-12">
              <h3>Our Company</h3>
              <p>Some information about your company.</p>
            </div>
            <div className="col-md-6 col-12">
              <h3>Contact Us</h3>
              <p>Email: info@yourcompany.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>
          </div>
        </div>
      </footer>
    </div>

  )
}

export default Footer