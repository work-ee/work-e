"use client";

import React, { useState } from "react";

import { LinkedInShowPopup } from "@/components/feedback/LinkedInPopup/LinkedInShowPopup";
import { CoverLetterGoogle } from "@/components/shared";
import { Button, Checkbox, DropdownBlock, Input, PaginationBlock, RadioButton, Slider, Toggle } from "@/components/ui";

export default function UiKit() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    searchQuery: "",
    phone: "",
    notes: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    searchQuery: "",
    phone: "",
    notes: "",
  });

  const [successMessages, setSuccessMessages] = useState({
    username: "",
    email: "",
    password: "",
    searchQuery: "",
    phone: "",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
    setSuccessMessages((prevSuccess) => ({
      ...prevSuccess,
      [name]: "",
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      username: "",
      email: "",
      password: "",
      searchQuery: "",
      phone: "",
      notes: "",
    };
    const newSuccessMessages = {
      username: "",
      email: "",
      password: "",
      searchQuery: "",
      phone: "",
      notes: "",
    };
    let isValid = true;

    if (!formData.username) {
      newErrors.username = "Ім'я користувача є обов'язковим.";
      isValid = false;
    } else {
      newSuccessMessages.username = "Ім'я користувача введено!";
    }

    if (!formData.email) {
      newErrors.email = "Email є обов'язковим.";
      isValid = false;
    } else if (!/\S+@\S+\.\S/.test(formData.email)) {
      newErrors.email = "Недійсний формат Email.";
      isValid = false;
    } else {
      newSuccessMessages.email = "Email введено коректно!";
    }

    if (!formData.password) {
      newErrors.password = "Пароль є обов'язковим.";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Пароль має бути не менше 6 символів.";
      isValid = false;
    } else {
      newSuccessMessages.password = "Пароль введено!";
    }

    if (formData.notes === "") {
      newErrors.notes = "Будь ласка, введіть повідомлення.";
    } else {
      newSuccessMessages.notes = "Повідомлення додано.";
    }

    if (formData.searchQuery === "") {
      newErrors.searchQuery = "Поле пошуку порожнє.";
    } else {
      newSuccessMessages.searchQuery = "Запит введено.";
    }

    if (formData.phone === "") {
      newErrors.phone = "Номер телефону не вказано.";
    } else if (!/^[0-9+()-\s]*$/.test(formData.phone)) {
      newErrors.phone = "Недійсний формат номера телефону.";
    } else {
      newSuccessMessages.phone = "Телефон введено.";
    }

    setErrors(newErrors);
    setSuccessMessages(newSuccessMessages);

    if (isValid) {
      alert("Вся обов'язкова частина форми відправлена успішно!");
      setFormData({
        username: "",
        email: "",
        password: "",
        searchQuery: "",
        phone: "",
        notes: "",
      });
      setErrors({
        username: "",
        email: "",
        password: "",
        searchQuery: "",
        phone: "",
        notes: "",
      });
      setSuccessMessages({
        username: "",
        email: "",
        password: "",
        searchQuery: "",
        phone: "",
        notes: "",
      });
    }
  };

  const [checked, setChecked] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value);
    setSubmitted(false);
  };

  const handleSubmitRadio = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const getStatus = (value: string) => {
    if (!submitted) return "default";
    if (!selected) return "error";
    return selected === value ? "success" : "default";
  };

  const getMessage = (value: string) => {
    if (!submitted) return undefined;
    if (!selected) return "Оберіть хоча б один варіант";
    if (selected === value) return "Успішно обрано";
    return undefined;
  };

  const [toggled, setToggled] = useState(false);

  const handleToggle = () => {
    setToggled((prev) => !prev);
  };

  const [range, setRange] = useState({ from: 20, to: 80 });

  const totalItems = 123;
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const [selectedItem, setSelectedItem] = useState<{ value: string; label: string } | null>(null);

  const handleOptionSelect = (value: string, label: string) => {
    setSelectedItem({ value, label });
    alert(`Вибрано: ${label}`);
  };

  const menuOptions = [
    { value: "profile", label: "Мій Профіль" },
    { value: "billing", label: "Оплата" },
    { value: "team", label: "Команда розробників" },
    { value: "subscription", label: "Підписка на послуги" },
    { value: "logout", label: "Вийти з облікового запису" },
  ];

  const [jobDescription, setJobDescription] = useState("");

  const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(e.target.value);
  };

  return (
    <main className="py-8">
      <section className="section flex flex-col items-center gap-y-4">
        <Button variant="main">Button</Button>
        <Button variant="main" icon>
          Button
        </Button>
        <Button variant="secondary">Button</Button>
        <Button variant="secondary" icon>
          Button
        </Button>
        <Button variant="main" disabled>
          Button
        </Button>
        <Button variant="main" disabled icon>
          Button
        </Button>
        <Button variant="secondary" disabled>
          Button
        </Button>
        <Button variant="secondary" icon disabled>
          Button
        </Button>
      </section>
      <section className="section">
        <form onSubmit={handleSubmit} noValidate className="mx-auto max-w-md rounded bg-white p-8 shadow-md">
          <Input
            id="username"
            name="username"
            label="Ім'я користувача"
            type="text"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
            success={successMessages.username}
            className="mb-4"
            required
          />

          <Input
            id="email"
            name="email"
            label="Email адреса"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            success={successMessages.email}
            required
            iconLeft={
              <svg className="h-5 w-5 fill-current">
                <use href="/sprite.svg#icon-search"></use>
              </svg>
            }
            className="mb-4"
          />

          <Input
            id="password"
            name="password"
            label="Пароль"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            success={successMessages.password}
            required
            iconRight={
              <svg className="h-5 w-5 fill-current">
                <use href="/sprite.svg#icon-eye"></use>
              </svg>
            }
            className="mb-4"
          />

          <Input
            id="notes"
            name="notes"
            placeholder="Введіть повідомлення"
            value={formData.notes}
            onChange={handleChange}
            error={errors.notes}
            success={successMessages.notes}
            required
            className="mb-4"
          />

          <Input
            id="searchQuery"
            name="searchQuery"
            placeholder="Введіть пошуковий запит"
            value={formData.searchQuery}
            onChange={handleChange}
            error={errors.searchQuery}
            success={successMessages.searchQuery}
            required
            iconLeft={
              <svg className="h-5 w-5 fill-current">
                <use href="/sprite.svg#icon-search"></use>
              </svg>
            }
            className="mb-4"
          />

          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Номер телефону"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            success={successMessages.phone}
            required
            iconRight={
              <svg className="h-5 w-5 fill-current">
                <use href="/sprite.svg#icon-eye"></use>
              </svg>
            }
            className="mb-4"
          />
          <p>disabled</p>
          <Input
            id="username2"
            name="username"
            label="Ім'я користувача"
            type="text"
            value={formData.username}
            onChange={handleChange}
            error={""}
            success={""}
            disabled
            className="mb-4"
          />

          <Input
            id="email2"
            name="email"
            label="Email адреса"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={""}
            success={""}
            disabled
            iconLeft={
              <svg className="h-5 w-5 fill-current">
                <use href="/sprite.svg#icon-search"></use>
              </svg>
            }
          />

          <Input
            id="password2"
            name="password"
            label="Пароль"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={""}
            success={""}
            disabled
            iconRight={
              <svg className="h-5 w-5 fill-current">
                <use href="/sprite.svg#icon-eye"></use>
              </svg>
            }
            className="mb-4"
          />

          <Input
            id="notes2"
            name="notes"
            placeholder="Введіть повідомлення"
            value={formData.notes}
            onChange={handleChange}
            error={""}
            success={""}
            disabled
            className="mb-4"
          />

          <Input
            id="searchQuery2"
            name="searchQuery"
            placeholder="Введіть пошуковий запит"
            value={formData.searchQuery}
            onChange={handleChange}
            error={""}
            success={""}
            disabled
            iconLeft={
              <svg className="h-5 w-5 fill-current">
                <use href="/sprite.svg#icon-search"></use>
              </svg>
            }
            className="mb-4"
          />

          <Input
            id="phone2"
            name="phone"
            type="tel"
            placeholder="Номер телефону"
            value={formData.phone}
            onChange={handleChange}
            error={""}
            success={""}
            disabled
            iconRight={
              <svg className="h-5 w-5 fill-current">
                <use href="/sprite.svg#icon-eye"></use>
              </svg>
            }
            className="mb-4"
          />
          <Button variant="secondary" type="submit">
            Відправити форму
          </Button>
        </form>
      </section>
      <section className="section flex flex-col items-center gap-y-4">
        <div className="space-y-6">
          <Checkbox
            name="terms"
            labelMessage="Я погоджуюсь з умовами"
            checked={checked}
            onChange={(e) => {
              setChecked(e.target.checked);
              setHasError(!e.target.checked);
            }}
            errorMessageText={hasError ? "Потрібно погодитись з умовами" : ""}
            successMessageText="Дякуємо за згоду"
          />
          <Checkbox name="terms" labelMessage="Я погоджуюсь з умовами" disabled onChange={() => {}} />
        </div>
      </section>
      <section className="section flex flex-col items-center gap-y-4">
        <form onSubmit={handleSubmitRadio} className="mx-auto max-w-md space-y-4 rounded bg-white p-8 shadow-md">
          <RadioButton
            name="answer"
            value="yes"
            checked={selected === "yes"}
            onChange={handleChangeRadio}
            labelMessage="Так"
            status={getStatus("yes")}
            messageText={getMessage("yes")}
          />
          <RadioButton
            name="answer"
            value="no"
            checked={selected === "no"}
            onChange={handleChangeRadio}
            labelMessage="Ні"
            status={getStatus("no")}
            messageText={getMessage("no")}
          />
          <RadioButton
            name="answer"
            value="disabled"
            disabled
            checked={selected === "disabled"}
            onChange={handleChangeRadio}
            labelMessage="Не обирається"
            status={getStatus("disabled")}
            messageText={getMessage("disabled")}
          />

          <Button variant="secondary" type="submit">
            Відправити форму
          </Button>
        </form>
      </section>
      <section className="section flex flex-col items-center gap-y-4">
        <div className="space-y-4 p-4">
          <Toggle name="toggle-example" isChecked={toggled} onChange={handleToggle} />
          <p className="text-sm">
            Стан перемикача: <strong>{toggled ? "Увімкнено" : "Вимкнено"}</strong>
          </p>
          <Toggle name="toggle-disabled" disabled onChange={() => {}} />
        </div>
      </section>
      <section className="section flex flex-col items-center gap-y-4">
        <div className="mx-auto max-w-lg space-y-8 rounded-lg bg-gray-50 p-8 shadow-xl">
          <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-800">Кастомні слайдери</h2>

          <div className="rounded-md border border-gray-200 bg-white p-10 shadow-sm">
            <Slider
              min={0}
              max={5000}
              fromValue={range.from}
              toValue={range.to}
              onChange={(from, to) => setRange({ from, to })}
            />
          </div>
          <div className="rounded-md border border-gray-200 bg-white p-10 shadow-sm">
            <Slider min={0} max={100} fromValue={10} toValue={60} onChange={() => {}} disabled />
          </div>
        </div>
      </section>
      <section className="section flex flex-col items-center gap-y-4">
        <div>
          <h2 className="mb-2 text-xl font-semibold">Основний Dropdown</h2>
          <DropdownBlock
            triggerText="Обрати опцію"
            options={menuOptions}
            onSelect={handleOptionSelect}
            selectedLabel={selectedItem?.label}
          />
        </div>
      </section>
      <section className="section flex flex-col items-center gap-y-4">
        <h2 className="mb-2 text-xl">Пагінація</h2>
        <PaginationBlock
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          showEllipsis={true}
          disabled={false}
        />

        <div className="mt-8">
          <h2 className="mb-2 text-xl">Приклад вимкненої пагінації</h2>
          <PaginationBlock totalPages={5} currentPage={1} onPageChange={handlePageChange} disabled={true} />
        </div>
      </section>

      <div className="font-rubik flex min-h-screen flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-center text-4xl font-extrabold text-gray-900">Генератор Мотиваційних Листів</h1>
        <h3 className="text-error-main heading-h3 text-2xl font-semibold">
          Тестувати обережно, платний тариф !!!!!!!!!!!!!
        </h3>

        <div className="mb-8 w-full max-w-4xl rounded-lg bg-white p-8 shadow-xl">
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">Вставте повний опис вакансії</h2>

          <div className="mb-6 grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="jobDescription" className="mb-1 block text-sm font-medium text-gray-700">
                Текст оголошення про вакансію:
              </label>
              <textarea
                id="jobDescription"
                value={jobDescription}
                onChange={handleJobDescriptionChange}
                placeholder="Вставте сюди повний текст оголошення про вакансію (назву вакансії, компанію, вимоги, бажану мову тощо). Модель спробує автоматично витягнути необхідні дані."
                rows={15} // Збільшуємо висоту textarea
                className="mt-1 block w-full resize-y rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm"
              ></textarea>
            </div>
          </div>
        </div>
        <CoverLetterGoogle jobDescription={jobDescription} />
      </div>
      <LinkedInShowPopup variant="withHeader" />
    </main>
  );
}
