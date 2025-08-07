"use client";
import { useState } from 'react';

interface Artist {
  id: number;
  name: string;
}

let nextId = 0;

export default function List() {
  const [name, setName] = useState<string>('');
  const [artists, setArtists] = useState<Artist[]>([]);

  return (
<div className="jusify-center max-w-sm mx-auto">
<form onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()} className="max-w-md mx-auto">   
    <label form="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        <button type="submit" className="text-white absolute right-2.5 top-2.5 end-2.5  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => {
        setArtists([...artists, {
          id: nextId++,
          name: name,
        }]);
      }}>Add</button>
      
    </div>
</form>

{artists.length > 0 && (
  <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-4">
    {artists.map((artist: Artist) => (
      <li key={artist.id} className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600 flex items-center justify-between p-2">
        <label htmlFor={`checkbox-${artist.id}`} className="flex-grow cursor-pointer">
          {artist.name}
        </label>
        <input
          type="checkbox"
          id={`checkbox-${artist.id}`}  
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
        />
      </li>
    ))}
  </ul>
)}
</div>

  );
}




