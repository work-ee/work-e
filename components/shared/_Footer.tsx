import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-secondary-300">
      <div className="container">
        <div className="py-9 flex gap-26 label-text text-neutral-900">
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
