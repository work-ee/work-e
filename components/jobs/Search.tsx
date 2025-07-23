"use client";

import { useState } from "react";

import { Input } from "@/components/ui";

export const Search = () => {
  const [formData, setFormData] = useState({ searchQuery: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form className="ml-auto max-w-[320px] flex-1">
      <Input
        id="searchQuery"
        name="searchQuery"
        placeholder="Пошук вакансій"
        value={formData.searchQuery}
        onChange={handleChange}
        required
        iconLeft={
          <svg className="h-5 w-5 fill-current">
            <use href="/sprite.svg#icon-search"></use>
          </svg>
        }
      />
    </form>
  );
};
