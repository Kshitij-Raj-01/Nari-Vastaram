import React, { useEffect, useState } from 'react';
import MainCarousel from '../../components/HomeCarousel/MainCarousel';
import HomeSectionCarousel from '../../components/HomeSectionCarousel/HomeSectionCarousel';
import axios from 'axios';
import { API_BASE_URL } from '../../../config/apiConfig';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../../../State/Cart/Action';
import HeroSection from '../../components/HeroSection/HeroSection';

function HomePage() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const { jwt, user } = useSelector((state) => state.auth); // adjust this based on your auth slice

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/products`, {
          params: { category: 'All Kurtis', pageSize: 20 },
        });
        setProducts(res?.data?.content || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();

    // 🌷 Only fetch cart if user is logged in and token exists
    if (jwt && user) {
      dispatch(getCart());
    }
  }, [jwt, user, dispatch]);

  return (
    <div className="mt-[-2.5rem]">
      <HeroSection/>
      <MainCarousel />

      <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10 bg-[#FFE0BC]">
        <HomeSectionCarousel
          data={products.slice(0, 5)}
          sectionName={"Latest Arrivals"}
        />
        <HomeSectionCarousel
          data={products.slice(2, 7)}
          sectionName={"Festive Kurtis"}
        />
        <HomeSectionCarousel
          data={products.slice(0, 4)}
          sectionName={"Bestsellers"}
        />
      </div>
    </div>
  );
}

export default HomePage;
