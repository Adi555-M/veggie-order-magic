
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VegetableCard from '@/components/VegetableCard';
import CategoryFilter from '@/components/CategoryFilter';
import { vegetables, categories } from '@/data/vegetables';
import { ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { getCart } from '@/utils/localStorage';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredVegetables, setFilteredVegetables] = useState(vegetables);
  const [cartCount, setCartCount] = useState(0);
  
  // Apply category filter
  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredVegetables(vegetables);
    } else {
      setFilteredVegetables(vegetables.filter(veg => veg.category === activeCategory));
    }
  }, [activeCategory]);
  
  // Update cart count
  useEffect(() => {
    const updateCartCount = () => {
      const cart = getCart();
      setCartCount(cart.length);
    };
    
    updateCartCount();
    
    // Listen for cart updates
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cartUpdated', updateCartCount);
    
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-16 bg-gradient-to-b from-veggie-50 to-white">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="text-center max-w-3xl mx-auto animate-fade-slide-in">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Fresh Vegetables Delivered To Your Door
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Quality produce at affordable prices, delivered straight to your doorstep. Order now for same-day delivery!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" asChild>
                <a href="#vegetables">
                  Shop Now
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/how-to-order">
                  How It Works
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Vegetables Section */}
      <section id="vegetables" className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Fresh Vegetables</h2>
            <p className="text-gray-600 mt-2">Browse our selection of fresh, high-quality vegetables</p>
          </div>
          
          {/* Category filter */}
          <CategoryFilter 
            categories={categories} 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory}
          />
          
          {/* Vegetables grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredVegetables.map((vegetable) => (
              <VegetableCard key={vegetable.id} vegetable={vegetable} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Fixed Cart Button (Mobile) */}
      {cartCount > 0 && (
        <div className="fixed bottom-4 right-4 md:hidden z-20 animate-scale-in">
          <Link to="/cart">
            <Button size="lg" className="rounded-full h-14 w-14 shadow-lg">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                {cartCount}
              </span>
            </Button>
          </Link>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Index;
