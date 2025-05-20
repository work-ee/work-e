'use client';
import Input from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import React, { useState } from 'react';

export default function UiKit() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    searchQuery: '',
    phone: '',
    notes: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    searchQuery: '',
    phone: '',
    notes: '',
  });

  const [successMessages, setSuccessMessages] = useState({
    username: '',
    email: '',
    password: '',
    searchQuery: '',
    phone: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
    setSuccessMessages((prevSuccess) => ({
      ...prevSuccess,
      [name]: '',
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      username: '',
      email: '',
      password: '',
      searchQuery: '',
      phone: '',
      notes: '',
    };
    const newSuccessMessages = {
      username: '',
      email: '',
      password: '',
      searchQuery: '',
      phone: '',
      notes: '',
    };
    let isValid = true;

    if (!formData.username) {
      newErrors.username = 'Ім\'я користувача є обов\'язковим.';
      isValid = false;
    } else {
      newSuccessMessages.username = 'Ім\'я користувача введено!';
    }

    if (!formData.email) {
      newErrors.email = 'Email є обов\'язковим.';
      isValid = false;
    } else if (!/\S+@\S+\.\S/.test(formData.email)) {
      newErrors.email = 'Недійсний формат Email.';
      isValid = false;
    } else {
      newSuccessMessages.email = 'Email введено коректно!';
    }

    if (!formData.password) {
      newErrors.password = 'Пароль є обов\'язковим.';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль має бути не менше 6 символів.';
      isValid = false;
    } else {
      newSuccessMessages.password = 'Пароль введено!';
    }

    if (formData.notes === '') { 
      newErrors.notes = 'Будь ласка, введіть повідомлення.';
      
    } else {
      newSuccessMessages.notes = 'Повідомлення додано.';
    }

    if (formData.searchQuery === '') {
      newErrors.searchQuery = 'Поле пошуку порожнє.';
    } else {
      newSuccessMessages.searchQuery = 'Запит введено.';
    }

    if (formData.phone === '') {
      newErrors.phone = 'Номер телефону не вказано.';
    } else if (!/^[0-9+()-\s]*$/.test(formData.phone)) { 
        newErrors.phone = 'Недійсний формат номера телефону.';
    }
    else {
      newSuccessMessages.phone = 'Телефон введено.';
    }


    setErrors(newErrors);
    setSuccessMessages(newSuccessMessages);

    if (isValid) { 
      console.log('Дані форми:', formData);
      alert('Вся обов\'язкова частина форми відправлена успішно!');
      setFormData({
        username: '',
        email: '',
        password: '',
        searchQuery: '',
        phone: '',
        notes: '',
      });
      setErrors({
        username: '', email: '', password: '', searchQuery: '', phone: '', notes: '',
      });
      setSuccessMessages({
        username: '', email: '', password: '', searchQuery: '', phone: '', notes: '',
      });
    }
  };

  return (
    <main className="py-8">
      <section className="section flex flex-col items-center gap-y-4">
        <h3>Buttons</h3>
        <Button variant="main">Button</Button>
        <Button variant="main" icon>Button</Button>
        <Button variant="secondary">Button</Button>
        <Button variant="secondary" icon>Button</Button>
      </section>
      <section className="section">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
          <Input
            id="username"
            name="username"
            label="Ім'я користувача"
            type="text"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
            success={successMessages.username}
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
            iconLeft={
              <svg className="h-5 w-5 fill-current">
                <use href="/sprite.svg#icon-search"></use>
              </svg>
            }
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
            iconRight={
              <svg className="h-5 w-5 fill-current">
                <use href="/sprite.svg#icon-eye"></use>
              </svg>
            }
          />

          <Input
            id="notes"
            name="notes"
            placeholder="Введіть повідомлення"
            value={formData.notes}
            onChange={handleChange}
            error={errors.notes}
            success={successMessages.notes}
          />

          <Input
            id="searchQuery"
            name="searchQuery"
            placeholder="Введіть пошуковий запит"
            value={formData.searchQuery}
            onChange={handleChange}
            error={errors.searchQuery}
            success={successMessages.searchQuery}
            iconLeft={
              <svg className="h-5 w-5 fill-current">
                <use href="/sprite.svg#icon-search"></use>
              </svg>
            }
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
            iconRight={
              <svg className="h-5 w-5 fill-current">
                <use href="/sprite.svg#icon-eye"></use>
              </svg>
            }
          />
          <Button variant="secondary" type="submit">Відправити форму</Button>
        </form>
      </section>
    </main>
  );
}