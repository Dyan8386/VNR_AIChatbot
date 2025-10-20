
import React from 'react';

const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M12 17.27l-5.39 3.25a1 1 0 01-1.45-1.05l1.3-6.23-4.73-4.11a1 1 0 01.55-1.7h6.42l2.6-5.94a1 1 0 011.8 0l2.6 5.94h6.42a1 1 0 01.55 1.7l-4.73 4.11 1.3 6.23a1 1 0 01-1.45 1.05L12 17.27z"
      clipRule="evenodd"
    />
  </svg>
);

const Header: React.FC = () => {
  return (
    <header className="bg-dark-secondary/80 backdrop-blur-sm sticky top-0 z-10 w-full border-b border-dark-tertiary shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-center space-x-3">
        <StarIcon className="w-8 h-8 text-brand-yellow" />
        <h1 className="text-2xl font-bold text-text-primary tracking-wider">
          AI Hỗ trợ học tập Lịch sử Đảng
        </h1>
      </div>
    </header>
  );
};

export default Header;
