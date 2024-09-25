
const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="bg-black text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="text-3xl font-bold">
            ZOMO<span className="text-orange-400">.</span>
          </div>
          <div className="flex items-center space-x-6">
            <button className="bg-orange-500 text-white py-2 px-4 rounded-full">
              Location
            </button>
            <nav className="space-x-4 text-white">
              <a href="/" className="hover:text-orange-400">Home</a>
              <a href="/order" className="hover:text-orange-400">Order</a>
              <a href="/blog" className="hover:text-orange-400">Blog</a>
              <a href="/pages" className="hover:text-orange-400">Pages</a>
              <a href="/contact" className="hover:text-orange-400">Contact</a>
            </nav>
            <div className="flex items-center space-x-2">
              <i className="fas fa-shopping-cart"></i>
              <span>My Account</span>
            </div>
          </div>
        </div>
      </header>

      {/* About Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">What is ZOMO?</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Welcome to our online order website! Here, you can browse our wide selection of products and place orders from the comfort of your own home. Whether you're looking for groceries, electronics, or gifts, we have you covered. With easy navigation, secure payment options, and fast delivery.
            We strive to make your online shopping experience as seamless as possible. Explore our website today and discover the convenience of ordering online! So why wait? Start shopping on our online order website and experience the ultimate convenience of online shopping!
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4">
            {/* Image and Feature Section */}
            <div>
              <img src="chef-image.jpg" alt="Chefs" className="rounded-lg shadow-lg" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="shopping-app.jpg" alt="Shopping App" className="rounded-lg shadow-lg" />
              <img src="product-delivery.jpg" alt="Delivery" className="rounded-lg shadow-lg" />
              <img src="cooking.jpg" alt="Cooking" className="rounded-lg shadow-lg" />
              <img src="gifts.jpg" alt="Gifts" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="grid grid-cols-4 gap-6">
            <div>
              <h3 className="text-lg font-semibold">Easiest Way To Order</h3>
              <p className="text-gray-600">We have designed our refund policies to be easy and hassle-free.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Easy Refund Policies</h3>
              <p className="text-gray-600">With our commitment to speedy delivery and no additional cost to you.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Free Fast Deliveries</h3>
              <p className="text-gray-600">Enjoy priority access, special discounts, and more. Elevate your experience today!</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Premium Options</h3>
              <p className="text-gray-600">You only need to follow a few steps & the tasty food is next to your home.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Our Team</h2>
          <p className="text-lg text-gray-600 mb-10">
            Our team is committed to delivering innovative solutions that meet the needs of our clients and users.
          </p>

          <div className="grid grid-cols-4 gap-6">
            {/* Team Member */}
            <div className="text-center">
              <img src="harriet-watson.jpg" alt="Harriet Watson" className="rounded-full w-32 h-32 mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Harriet Watson</h3>
              <p className="text-gray-600">Co-Founder</p>
              <div className="flex justify-center space-x-2 mt-2">
                <i className="fab fa-twitter"></i>
                <i className="fab fa-facebook"></i>
                <i className="fab fa-instagram"></i>
              </div>
            </div>

            {/* More team members */}
            <div className="text-center">
              <img src="jenifer-peters.jpg" alt="Jenifer Peters" className="rounded-full w-32 h-32 mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Jenifer Peters</h3>
              <p className="text-gray-600">Founder</p>
              <div className="flex justify-center space-x-2 mt-2">
                <i className="fab fa-twitter"></i>
                <i className="fab fa-facebook"></i>
                <i className="fab fa-instagram"></i>
              </div>
            </div>

            <div className="text-center">
              <img src="rock-smith.jpg" alt="Rock Smith" className="rounded-full w-32 h-32 mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Rock Smith</h3>
              <p className="text-gray-600">Manager</p>
              <div className="flex justify-center space-x-2 mt-2">
                <i className="fab fa-twitter"></i>
                <i className="fab fa-facebook"></i>
                <i className="fab fa-instagram"></i>
              </div>
            </div>

            <div className="text-center">
              <img src="johnson-clarke.jpg" alt="Johnson Clarke" className="rounded-full w-32 h-32 mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Johnson Clarke</h3>
              <p className="text-gray-600">Marketing Manager</p>
              <div className="flex justify-center space-x-2 mt-2">
                <i className="fab fa-twitter"></i>
                <i className="fab fa-facebook"></i>
                <i className="fab fa-instagram"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-6 bg-gray-800 text-white text-center">
        <div className="container mx-auto px-4">
          <p>&copy; 2024 ZOMO. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;