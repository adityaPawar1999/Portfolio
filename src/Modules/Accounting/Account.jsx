import React from 'react'
import { useState } from "react";
import data from './accounting_data'
import Navbar from '../../components/Navbar';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';


export default function AccountingGlossary() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filtered = data.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const suggestions = search
    ? filtered.slice(0, 5)
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar/>
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-20 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          {/* <h1 className="text-2xl mt-8 sm:text-3xl font-bold text-slate-800 mb-3 sm:mb-4">
            Accounting Glossary
          </h1> */}

          {/* Search Bar */}
          <div className="relative">
            <div className="relative mt-[60px] sm:mt-[100px]">
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder="Search terms..."
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && showSuggestions && (
              <ul className="absolute w-full bg-white border border-slate-200 rounded-lg mt-2 shadow-lg overflow-hidden">
                {suggestions.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setSearch(item.title);
                      setSelected(item.title);
                      setShowSuggestions(false);
                    }}
                    className="px-4 py-3 hover:bg-slate-50 cursor-pointer transition border-b border-slate-100 last:border-b-0"
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Content with padding for fixed header */}
      <div className="pt-36 sm:pt-40 pb-8 px-4 sm:px-6">
        
        <div className="max-w-6xl mx-auto">
          {/* Grid Layout */}
          <h1 className="text-2xl mt-4 sm:text-3xl font-bold text-black mb-3 sm:mb-4">
           <AccountBalanceIcon fontSize="large" /> ACCOUNTING CONCEPT
          </h1>
          <div className="grid grid-cols-1  gap-1">
            {filtered.map((item, index) => (
              <div
                key={index}
                className="bg-white  shadow-sm hover:shadow-md transition border border-slate-200 overflow-hidden"
              >
                <div
                  className="p-2 cursor-pointer flex justify-between items-center hover:bg-gray-200"
                  onClick={() =>
                    setSelected(selected === item.title ? null : item.title)
                  }
                >
                  <h2 className=" text-md text-slate-800">
                    {item.title}
                  </h2>
                  <span className="text-slate-500 text-xl font-light">
                    {selected === item.title ? "−" : "+"}
                  </span>
                </div>

                {selected === item.title && (
                  <div className="px-4 pb-4 space-y-3 text-sm">
                    <div>
                      <span className="font-semibold text-slate-700">
                        Definition:
                      </span>
                      <p className="text-slate-600 mt-1">
                        {item.one_line_definition}
                      </p>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-700">
                        Description:
                      </span>
                      <p className="text-slate-600 mt-1">{item.description}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-700">
                        Example:
                      </span>
                      <p className="text-slate-600 mt-1">{item.example}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* No Results */}
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">No results found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}