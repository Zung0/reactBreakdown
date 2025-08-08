"use client";
import { useState } from 'react';

interface Item {
  id: number;
  name: string;
  checked: boolean;
}

let nextId = 0;

export default function List() {
  const [name, setName] = useState<string>('');
  const [item, setItem] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addItem = async () => {
    if (!name.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/postList?name=${name}&checked=false`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setItem([...item, {
          id: nextId++,
          name: name,
          checked: false,
        }]);
        setName(''); // Clear the input after successful addition
      } else {
        console.error('Failed to add item:', response.statusText);
        alert('Failed to add item. Please try again.');
      }
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Error adding item. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleItemChecked = (itemId: number, currentChecked: boolean) => {
    // Just update local state for now - API integration will be added later
    setItem(item.map(a => 
      a.id === itemId ? { ...a, checked: !currentChecked } : a
    ));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addItem();
    }
  };

  return (
    <div className="justify-center max-w-sm mx-auto mt-10">
      <h3 className="text-lg font-semibold mb-4">Add to the list</h3>
      <div className="max-w-md mx-auto">  
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input 
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            onKeyPress={handleKeyPress}
            type="search" 
            id="default-search" 
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Enter item name..."
            required 
            disabled={isLoading}
          />
          <button 
            type="button"
            onClick={addItem}
            className="text-white absolute right-2.5 top-2.5 end-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || !name.trim()}
          >
            {isLoading ? 'Adding...' : 'Add'}
          </button>
        </div>
      </div>
      
      {item.length > 0 && (
        <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-4">
          {item.map((currentItem: Item) => (
            <li key={currentItem.id} className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600 flex items-center justify-between p-2">
              <label htmlFor={`checkbox-${currentItem.id}`} className="flex-grow cursor-pointer">
                {currentItem.name}
              </label>
              <input
                type="checkbox"
                id={`checkbox-${currentItem.id}`}
                checked={currentItem.checked}
                onChange={() => toggleItemChecked(currentItem.id, currentItem.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}