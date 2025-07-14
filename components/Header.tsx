'use client';

interface HeaderProps {
  onCreateJob: () => void;
}

export default function Header({ onCreateJob }: HeaderProps) {
  return (
    <header className="w-fit mx-auto mt-6 px-6 py-3 bg-white rounded-full shadow-xl drop-shadow-lg">
  <div className="flex items-center justify-between gap-10">
    {/* Logo */}
    <div className="flex items-center">
      <div className="w-10 h-10 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 rounded-lg flex items-center justify-center shadow">
        <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
      </div>
    </div>

    {/* Navigation */}
    <nav className="flex items-center gap-8">
      {["Home", "Find Jobs", "Find Talents", "About us", "Testimonials"].map((item) => (
        <a
          key={item}
          href="#"
          className="text-gray-900 font-medium text-sm hover:text-purple-600 transition-colors duration-200 relative group"
        >
          {item}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full"></span>
        </a>
      ))}
    </nav>

    {/* Create Jobs Button */}
    <button
      onClick={onCreateJob}
      className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-6 py-2 rounded-full font-semibold text-sm hover:from-purple-700 hover:to-purple-900 transition-all duration-200 shadow hover:shadow-md"
    >
      Create Jobs
    </button>
  </div>
</header>

  );
}
