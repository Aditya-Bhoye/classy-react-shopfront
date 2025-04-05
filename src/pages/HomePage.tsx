
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { ProductType } from '../types/types';
import { sampleProducts } from '../data/sampleData';
import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // Get unique categories from products
  const categories = ['All', ...Array.from(
    new Set(sampleProducts.map(product => product.category))
  )];

  // Simulate fetching products from an API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProducts(sampleProducts);
        setFilteredProducts(sampleProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products when search query or category changes
  useEffect(() => {
    let result = products;
    
    // Apply category filter
    if (selectedCategory && selectedCategory !== 'All') {
      result = result.filter(product => 
        product.category === selectedCategory
      );
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, products]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="home-page">
      {/* Hero section */}
      <section className="hero">
        <div className="container">
          <h1>Welcome to ShopFront</h1>
          <p>Discover amazing products at great prices</p>
        </div>
      </section>
      
      <div className="container">
        {/* Filters */}
        <section className="filters">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          
          <div className="category-filter">
            <select value={selectedCategory} onChange={handleCategoryChange}>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </section>
        
        {/* Products grid */}
        <section className="products-section">
          <h2>Our Products</h2>
          
          {loading ? (
            <div className="loading">Loading products...</div>
          ) : filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-products">
              <p>No products found matching your criteria.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
