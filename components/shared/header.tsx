import Link from "next/link";
import React from "react";
import { Button } from "../ui/Button";

export const Header = () => {
  return (
    <header className="bg-[#E4E4E4]">
      <div className="container">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="logo">
            Work - E
          </Link>
          <div className="flex items-center gap-2">
            <ul>
              <li>УКР</li>
            </ul>

            <Button>Увійти</Button>
            <Button>Зареєструватись</Button>
          </div>
        </div>
      </div>
    </header>
  );
};
