import {Link} from "react-router-dom";
import React, {useState} from "react";
import Header from "./Header";
import useForm from "../utils/useForm";

export default function AuthForm({ type, onAuth }) {
  const { values, handleChange } = useForm({
    email: "",
    password: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = values;

    if (!email || !password) {
      return;
    }

    onAuth(email, password);
  }

  const { email, password } = values;

  return (
    <>
      <Header>
        {type === "login" ? (
          <Link className="header__link" to="/sign-up">Регистрация</Link>
        ) : (
          <Link className="header__link" to="/sign-in">Войти</Link>
        )}
      </Header>
      <div className="auth">
        <h1 className="auth__title">{type === "login" ? "Вход" : "Регистрация"}</h1>
        <form className="auth__form" onSubmit={handleSubmit}>
          <input
            className="auth__form_input"
            type="text"
            name="email"
            value={email}
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            className="auth__form_input"
            type="password"
            value={password}
            name="password"
            placeholder="Пароль"
            onChange={handleChange}
          />
          <button className="auth__form_action">{type === "login" ? "Войти" : "Зарегистрироваться"}</button>
          {type === "register" && (
            <Link className="auth__form_forgot" to="/sign-in">Уже зарегистрированы? Войти</Link>
          )}
        </form>
      </div>
    </>
  );
}
