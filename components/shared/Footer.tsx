import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-primary-100 min-h-[94px] flex items-center justify-center py-4">
      <div className="container">
        <div className="flex gap-26 label-text text-base text-primary-900">
          <p className="text-start">© 2025 Work - E. All rights reserved.</p>
          <ul className="flex gap-8">
            <li>
              <a href="#">Умови користування</a>
            </li>
            <li>
              <a href="#">Підтримати Work-E</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
