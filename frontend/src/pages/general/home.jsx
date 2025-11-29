import React from 'react';

const Home = () => {
    return (
        <div className="home">
            <header className="header">
                <h1>Zomato</h1>
                <nav>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
            </header>

            <section className="hero">
                <h2>Discover the best food & drinks</h2>
                <input type="text" placeholder="Search for restaurants, cuisine, or a dish" />
            </section>

            <section className="featured">
                <h3>Featured Restaurants</h3>
                <div className="restaurant-grid">
                    {/* Add restaurant cards here */}
                </div>
            </section>

            <footer className="footer">
                <p>&copy; 2024 Zomato Clone. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;