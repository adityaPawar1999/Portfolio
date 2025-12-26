import { useEffect, useState } from "react";

export default function VisitorCount() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    fetch("/api/visit")
      .then(res => res.json())
      .then(data => setCount(data.visitors))
      .catch(() => setCount(null));
  }, []);

  if (!count) return null;

  return (
    <p className="text-sm text-gray-500 mt-2">
      👋 Visitors: {count.toLocaleString()}
    </p>
  );
}
