export default function NotFound() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center max-w-lg">
        
        <h1 className="text-9xl font-extrabold text-gray-800">404</h1>

        <h2 className="mt-[-10px] text-3xl font-semibold text-gray-600">
          Page Not Found
        </h2>

        <p className="mt-4 text-gray-500 text-lg">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <a
          href="/"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
}
