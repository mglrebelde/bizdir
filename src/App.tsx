import React, { useState, useEffect } from 'react';
import { Business, Category } from './types';
import BusinessCard from './components/BusinessCard';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import ReviewForm from './components/ReviewForm';
import Map from './components/Map';
import Auth from './components/Auth';
import Pagination from './components/Pagination';
import CategoryManagement from './components/CategoryManagement';
import { Building2 } from 'lucide-react';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const ITEMS_PER_PAGE = 6;

const mockBusinesses: Business[] = [
  // ... (keep existing mock businesses)
];

const mockCategories: Category[] = [
  { id: '1', name: 'Рестораны', subcategories: ['Монгол', 'Европ', 'Ази'] },
  { id: '2', name: 'Гоо сайхны салон', subcategories: ['Үс засах', 'Хумс', 'Нүүр будалт'] },
  { id: '3', name: 'Эрүүл мэндийн үйлчилгээ', subcategories: ['Эмнэлэг', 'Эм ханган нийлүүлэх', 'Сувилал'] },
];

function App() {
  const [businesses, setBusinesses] = useState<Business[]>(mockBusinesses);
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>(mockBusinesses);
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { currentUser } = useAuth();

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentBusinesses = filteredBusinesses.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearch = (query: string) => {
    const filtered = businesses.filter(
      (business) =>
        business.name.toLowerCase().includes(query.toLowerCase()) ||
        business.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBusinesses(filtered);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category) {
      setFilteredBusinesses(businesses.filter((b) => b.category === category));
    } else {
      setFilteredBusinesses(businesses);
    }
    setCurrentPage(1);
  };

  const handleSubmitReview = (businessId: string, review: { rating: number; comment: string }) => {
    const updatedBusinesses = businesses.map((business) => {
      if (business.id === businessId) {
        const newRating = (business.rating + review.rating) / 2;
        return { ...business, rating: newRating };
      }
      return business;
    });
    setBusinesses(updatedBusinesses);
    setFilteredBusinesses(updatedBusinesses);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleCategoryUpdate = (updatedCategories: Category[]) => {
    setCategories(updatedCategories);
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        <header className="zoon-header py-4">
          <div className="zoon-container flex items-center justify-between">
            <div className="flex items-center">
              <Building2 className="w-8 h-8 text-orange-500 mr-2" />
              <h1 className="text-2xl font-bold text-gray-800">Бизнес Лавлах</h1>
            </div>
            <nav>
              <ul className="flex space-x-4">
                <li><a href="#" className="text-gray-600 hover:text-orange-500">Нүүр</a></li>
                <li><a href="#" className="text-gray-600 hover:text-orange-500">Ангилал</a></li>
                <li><a href="#" className="text-gray-600 hover:text-orange-500">Тухай</a></li>
              </ul>
            </nav>
          </div>
        </header>
        <div className="zoon-search py-8">
          <div className="zoon-container">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
        <main className="zoon-container py-8">
          <div className="mb-8">
            <Auth />
          </div>
          {currentUser && currentUser.email === 'admin@example.com' && (
            <div className="mb-8">
              <CategoryManagement categories={categories} onCategoryUpdate={handleCategoryUpdate} />
            </div>
          )}
          <div className="mb-8">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>
          <div className="mb-8">
            <Map businesses={filteredBusinesses} />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {currentBusinesses.map((business) => (
              <div key={business.id}>
                <BusinessCard business={business} />
                <ReviewForm
                  businessId={business.id}
                  onSubmitReview={(review) => handleSubmitReview(business.id, review)}
                />
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredBusinesses.length / ITEMS_PER_PAGE)}
              onPageChange={handlePageChange}
            />
          </div>
        </main>
        <footer className="bg-gray-800 text-white py-8">
          {/* ... (keep existing footer content) */}
        </footer>
      </div>
    </AuthProvider>
  );
}

export default App;