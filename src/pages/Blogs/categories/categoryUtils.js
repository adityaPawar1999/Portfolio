
import categoriesData from "./categoriesData.js"; 
import blogData from "../BlogData.js"; 

export function getCategoriesWithCount() {
  const countMap = blogData.reduce((acc, post) => {
    if (post.category) {
      acc[post.category] = (acc[post.category] || 0) + 1;
    }
    return acc;
  }, {});

  return categoriesData.map((cat) => ({
    ...cat,
    count: countMap[cat.name] || 0,
  }));
}

export function getCategoryMeta(categoryName) {
  return (
    categoriesData.find((c) => c.name === categoryName) || {
      name: categoryName,
      color: "bg-gray-400",
      badgeBg: "bg-gray-50",
      badgeText: "text-gray-600",
      badgeBorder: "border-gray-200",
      dot: "#888780",
    }
  );
}