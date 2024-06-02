import React, {useEffect, useState} from 'react';
import "../styles/LayoutStyles.css";
import "./style.css";
import "./fontawesome-free-5.15.3-web/css/all.min.css";
import logo from "./images/logo.png";
import cute from "./images/cute.jpg";
import gal3 from "./images/gal3.jpg";
import gal2 from "./images/gal2.jpg";
import gal5 from "./images/gal5.jpg";
import chiness from "./images/chiness.jpg";
// import sou from "./images/sou.jpg";
// import dev from "./images/dev.jpg";
const Home = () => {
  return (
<div>
<link rel="stylesheet" href="style.css"></link>
    <link rel="stylesheet" href="fontawesome-free-5.15.3-web/css/all.min.css"></link>
    <link
      rel="stylesheet"
      href="https://unpkg.com/swiper/swiper-bundle.min.css"
    />
    <header class="header">
        <img src={logo} id="logo" alt="Hi"></img>

        <nav class="navbar">
            <a href="#">Home</a>
            <a href="#our-services">Services</a>
            <a href="#contact">Contact</a>
            <a href="#about">About</a>
        </nav>

        <div class="icons">
            <div id="menubar" class="fas fa-bars"></div>
            <a href="/login">Register/Login</a>
        </div>
    </header>

    <div class="background-image"/>
        <div class="background-content"/>
            
<section id="our-services">
    <div class="our-services">
        <div class="service-content">
            <div class="left-service-content">
                <h1>Our special services</h1>
                <p>Get the online doctors consultation with just a click only...</p>
            </div>

            <div class="right-service-content">
                <div class="right-btn">
                    <a href="#our-services">See all services</a>
                </div>
            </div>
        </div>

        <div class="main-services">
            <div class="inner-services-content">
                <div class="service-icon">
                    <i class="fas fa-notes-medical"></i>
                </div>
                <h2>Online doctors consultation</h2>

            </div>

            <div class="inner-services-content">
                <div class="service-icon">
                    <i class="fas fa-hospital-user"></i>
                </div>
                <h2>Easy appointment booking</h2>
                
            </div>

            <div class="inner-services-content">
                <div class="service-icon">
                    <i class="fas fa-user-md"></i>
                </div>
                <h2>Verified doctors</h2>
                
            </div>
        </div>
    </div>
</section>

<section id="contact">
    <div class="why-choseus">
    <div class="main-chose">
        <div class="inner-chose">
            <img src={cute} alt=""></img>
        </div>

        <div class="inner-chose">
            <h1>Why choose us </h1>

            <div class="inner-chose-content">
                <div class="main-inner-chose">
                    <div class="chose-icon">
                        <i class="fas fa-notes-medical"></i>
                    </div>
                    <div class="icon-content">
                        <p>With our online doctor consultations, patients can connect with qualified healthcare professionals. </p>
                    </div>
                </div>

                <div class="main-inner-chose">
                    <div class="chose-icon">
                        <i class="fas fa-hospital-user"></i>
                        
                    </div>
                    <div class="icon-content">
                        <p>You can book our doctors appiontment very easily and very quickly with a few steps. </p>
                    </div>
                </div>

                <div class="main-inner-chose">
                    <div class="chose-icon">
                        <i class="fas fa-user-md"></i>
                    </div>
                    <div class="icon-content">
                        <p>We are providing you the verified doctors in our web applications. They are totally reliable and faithful.</p>
                    </div>
                </div>
            </div>

            <div class="main-inner-chose">
                    <div class="chose-icon">
                        <i class="fa-solid fa-envelope"></i>
                    </div>
                    <div class="icon-content">
                        <strong><p>For any queries or suggestions please contact us at <a href="mailto:docmate735@gmail.com">docmate735@gmail.com</a></p></strong>
                    </div>
                </div>
            

        </div>
    </div>
</div>
</section>


<div class="our-doctors">
    <h1>Our special doctors</h1>

    <div class="main-doctor">
        <div class="inner-doctor">
            <img src={gal3} alt=""></img>
            <div class="doc-icons">
                <div class="fab fa-facebook"></div>
                <div class="fab fa-twitter"></div>
                <div class="fab fa-instagram"></div>
                <div class="fab fa-linkedin"></div>
            </div>
        </div>

        <div class="inner-doctor">
            <img src={gal2} alt=""></img>
            <div class="doc-icons">
                <div class="fab fa-facebook"></div>
                <div class="fab fa-twitter"></div>
                <div class="fab fa-instagram"></div>
                <div class="fab fa-linkedin"></div>
            </div>
        </div>

        <div class="inner-doctor">
            <img src={gal5} alt=""></img>
            <div class="doc-icons">
                <div class="fab fa-facebook"></div>
                <div class="fab fa-twitter"></div>
                <div class="fab fa-instagram"></div>
                <div class="fab fa-linkedin"></div>
            </div>
        </div>

        
    </div>
</div>

<section id="about">
    <div class="about">
        <div class="main-about">
            <div class="inner-about">
                <div class="about-content">
                    <h1>About us</h1>
                <p><b>WE ARE docMate. AN END-TO-END DIGITAL HEALTHCARE PLATFORM</b><br/>When the webslinger wears his red and blue suit, he's ready to save a life. Same rule applies to us at docMate. We know how to weave a web of doctors to create a world of possibilities for people looking for healthcare assistance.</p>
                <a href="#">Read more</a>
                </div>
                
            </div>
            <div class="inner-about">
                <div class="inner-about-image">
                    {/* <img src={chiness} alt=""></img>
                    <img src={sou} alt=""></img>
                    <img src={dev} alt=""></img> */}
                </div>
            </div>
        </div>
    </div>
    </section>
<script src="script.js"></script>
</div>
  )
}

export default Home;