import React from "react";

import Link from "next/link";

import { Button } from "../ui/Button";

export const Header = () => {
  return (
    <header className="bg-[#E4E4E4]">
      <div className="container">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="logo">
            <i>Work- E</i>
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Button variant="secondary">Увійти</Button>
              <Button variant="secondary">Зареєструватись</Button>
            </div>

            <ul className="ml-4 flex items-center gap-4">
              <li>
                <a href="#" className="flex items-center gap-2">
                  <i>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 31C24.3 31 31 24.3 31 16H1C1 24.3 7.7 31 16 31Z" fill="#FFE62E" />
                      <path d="M16 1C7.7 1 1 7.7 1 16H31C31 7.7 24.3 1 16 1Z" fill="#428BC1" />
                    </svg>
                  </i>
                  УКР
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};
