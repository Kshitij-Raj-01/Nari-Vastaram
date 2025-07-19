import React, { useEffect, useState } from 'react';
import MainCarousel from '../../components/HomeCarousel/MainCarousel';
import HomeSectionCarousel from '../../components/HomeSectionCarousel/HomeSectionCarousel';
import axios from 'axios';
import { API_BASE_URL } from '../../../config/apiConfig';

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Call your live API
        const res = await axios.get(`${API_BASE_URL}/api/products`, {
          params: { category: 'All Kurtis', pageSize: 20 }
        });
        setProducts(res.data.content);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="mt-[-2.5rem]">
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
