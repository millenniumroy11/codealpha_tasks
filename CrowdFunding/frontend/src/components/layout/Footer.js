import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-md-4 mb-4 mb-md-0">
            <h2 className="h5 fw-bold mb-3">CrowdFunder</h2>
            <p>Empowering creators to bring their projects to life.</p>
          </div>
          <div className="col-md-7">
            <div className="row">
              <div className="col-md-4 mb-4 mb-md-0">
                <h3 className="h6 fw-semibold mb-2">About</h3>
                <ul className="list-unstyled">
                  <li><a href="#" className="text-white text-decoration-none hover-opacity">Our Story</a></li>
                  <li><a href="#" className="text-white text-decoration-none hover-opacity">How It Works</a></li>
                  <li><a href="#" className="text-white text-decoration-none hover-opacity">Careers</a></li>
                </ul>
              </div>
              <div className="col-md-4 mb-4 mb-md-0">
                <h3 className="h6 fw-semibold mb-2">Resources</h3>
                <ul className="list-unstyled">
                  <li><a href="#" className="text-white text-decoration-none hover-opacity">FAQ</a></li>
                  <li><a href="#" className="text-white text-decoration-none hover-opacity">Support</a></li>
                  <li><a href="#" className="text-white text-decoration-none hover-opacity">Blog</a></li>
                </ul>
              </div>
              <div className="col-md-4">
                <h3 className="h6 fw-semibold mb-2">Legal</h3>
                <ul className="list-unstyled">
                  <li><a href="#" className="text-white text-decoration-none hover-opacity">Terms of Service</a></li>
                  <li><a href="#" className="text-white text-decoration-none hover-opacity">Privacy Policy</a></li>
                  <li><a href="#" className="text-white text-decoration-none hover-opacity">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="border-secondary my-4" />
        <div className="text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} CrowdFunder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
