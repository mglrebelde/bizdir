import React, { useState } from 'react';
import { Category } from '../types';

interface CategoryManagementProps {
  categories: Category[];
  onCategoryUpdate: (updatedCategories: Category[]) => void;
}

const CategoryManagement: React.FC<CategoryManagementProps> = ({ categories, onCategoryUpdate }) => {
  const [newCategory, setNewCategory] = useState('');
  const [newSubcategory, setNewSubcategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      const updatedCategories = [
        ...categories,
        { id: Date.now().toString(), name: newCategory.trim(), subcategories: [] },
      ];
      onCategoryUpdate(updatedCategories);
      setNewCategory('');
    }
  };

  const handleAddSubcategory = () => {
    if (selectedCategory && newSubcategory.trim()) {
      const updatedCategories = categories.map((cat) => {
        if (cat.id === selectedCategory) {
          return {
            ...cat,
            subcategories: [...cat.subcategories, newSubcategory.trim()],
          };
        }
        return cat;
      });
      onCategoryUpdate(updatedCategories);
      setNewSubcategory('');
    }
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Ангилал удирдах</h2>
      <div className="mb-4">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Шинэ ангилал"
          className="w-full px-3 py-2 border rounded-md"
        />
        <button
          onClick={handleAddCategory}
          className="mt-2 zoon-button px-4 py-2 rounded-md"
        >
          Ангилал нэмэх
        </button>
      </div>
      <div className="mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="">Ангилал сонгох</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={newSubcategory}
          onChange={(e) => setNewSubcategory(e.target.value)}
          placeholder="Шинэ дэд ангилал"
          className="w-full px-3 py-2 border rounded-md"
        />
        <button
          onClick={handleAddSubcategory}
          className="mt-2 zoon-button px-4 py-2 rounded-md"
          disabled={!selectedCategory}
        >
          Дэд ангилал нэмэх
        </button>
      </div>
      <div>
        <h3 className="font-bold mb-2">Одоогийн ангилалууд:</h3>
        <ul className="list-disc pl-5">
          {categories.map((cat) => (
            <li key={cat.id}>
              {cat.name}
              <ul className="list-circle pl-5">
                {cat.subcategories.map((sub, index) => (
                  <li key={index}>{sub}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryManagement;