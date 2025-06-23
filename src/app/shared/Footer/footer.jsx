"use client";

const Footer = () => {
  return (
    <footer className="bg-[#252525] text-gray-400 px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="text-white text-2xl font-semibold mb-3">Logo</h2>
            <ul className="space-y-2 text-sm">
              <li>58 Howard Street #2, San Francisco</li>
              <li>contact@homeid.com</li>
              <li>(+68) 1221 09876</li>
              <li>www.homeid.com</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-xl font-semibold mb-4">
              Popular Searches
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white transition">
                Apartment for Rent
              </li>
              <li className="hover:text-white transition">
                Apartment Low to High
              </li>
              <li className="hover:text-white transition">Offices for Buy</li>
              <li className="hover:text-white transition">Offices for Rent</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-xl font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white transition">About Us</li>
              <li className="hover:text-white transition">Contact</li>
              <li className="hover:text-white transition">Blog</li>
              <li className="hover:text-white transition">Support</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-xl font-semibold mb-4">
              Stay Updated
            </h3>
            <p className="mb-4 text-sm">Subscribe to our newsletter</p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between text-sm">
          <div className="flex gap-4 mb-4 md:mb-0">
            <a href="#" className="hover:text-white">
              Terms of Use
            </a>
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
          </div>
          <p>© {new Date().getFullYear()} homeID. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
