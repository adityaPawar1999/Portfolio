import { useState } from "react";
import data from "./accounting_data.json";

export default function AccountingGlossary() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = data.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const suggestions = search
    ? filtered.slice(0, 5)
    : [];

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Accounting Glossary</h1>

      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search terms..."
          className="w-full p-3 border rounded-xl shadow"
        />

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <ul className="absolute w-full bg-white border rounded-xl mt-1 shadow-lg z-10">
            {suggestions.map((item, index)) => (
              <li
                key={index}
                onClick={() => {
                  setSearch(item.title);
                  setSelected(item.title);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {item.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Data List */}
      <div className="space-y-3">
        {filtered.map((item, index) => (
          <div key={index} className="border rounded-xl p-4 shadow">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setSelected(selected === item.title ? null : item.title)}
            >
              <h2 className="font-semibold text-lg">{item.title}</h2>
              <span>{selected === item.title ? "−" : "+"}</span>
            </div>

            {selected === item.title && (
              <div className="mt-3 space-y-2">
                <p><strong>One-line Definition:</strong> {item.one_line_definition}</p>
                <p><strong>Description:</strong> {item.description}</p>
                <p><strong>Example:</strong> {item.example}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Enhanced version with Tailwind, shadcn UI, and Framer Motion
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import data from "./accounting_data.json";

export default function AccountingGlossary() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = data.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const suggestions = search ? filtered.slice(0, 5) : [];

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Accounting Glossary</h1>

      {/* Search Bar */}
      <div className="relative">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search accounting terms..."
          className="rounded-2xl p-4 text-lg shadow"
        />

        {/* Suggestions */}
        <AnimatePresence>
          {suggestions.length > 0 && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute w-full bg-white border rounded-xl mt-1 shadow-lg z-10"
            >
              {suggestions.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSearch(item.title);
                    setSelected(item.title);
                  }}
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                >
                  {item.title}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filtered.map((item, index) => (
          <Card key={index} className="rounded-2xl shadow-lg">
            <CardContent className="p-4">
              <div
                onClick={() => setSelected(selected === item.title ? null : item.title)}
                className="flex justify-between items-center cursor-pointer"
              >
                <h2 className="font-semibold text-xl">{item.title}</h2>
                <span className="text-2xl">{selected === item.title ? "−" : "+"}</span>
              </div>

              <AnimatePresence>
                {selected === item.title && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 space-y-3"
                  >
                    <p><strong>One-line Definition:</strong> {item.one_line_definition}</p>
                    <p><strong>Description:</strong> {item.description}</p>
                    <p><strong>Example:</strong> {item.example}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
