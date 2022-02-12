import React, { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import banner from "../../images/banner.jpg";
import banner2 from "../../images/banner2.jpg";
import Content from "../Content/Content";
import SkeletonHome from "../SkeletonView/SkeletonHome";

const Home = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    // Cancel the timer while unmounting
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading && <SkeletonHome />}
      {!loading && (
        <>
          <div id="carouselExampleIndicators" className="carousel slide d-md-block d-none" data-bs-ride="carousel">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"
                      aria-current="true" aria-label="Slide 1">

              </button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                      aria-label="Slide 2">
              </button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={banner} className="d-block w-100" style={{maxHeight:'375px'}} alt="..."/>
              </div>
              <div className="carousel-item">
                <img src={banner2} className="d-block w-100  " style={{maxHeight:'375px'}} alt="..."/>
              </div>
            </div>
          </div>
        </>
      )}
      <Content />
    </div>
  );
};

export default Home;
