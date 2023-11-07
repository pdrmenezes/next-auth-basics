"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export function UserForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = () => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setFormData((prevState) => ({ ...prevState, [inputName]: inputValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const response = await fetch("api/Users", {
      method: "POST",
      body: JSON.stringify({ formData }),
      "content-type": "application/json",
    });
    if (!response.ok) {
      const response = await response.json();
      setErrorMessage(response.message);
    } else {
      router.refresh();
      router.push("/");
    }
  };

  return (
    <>
      <h1>Form</h1>
      <form onSubmit={handleSubmit} method="post" className="flex flex-col gap-3 w-1/2">
        <h2>Create User</h2>
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
          required
          value={formData.name}
          className="px-2 py-4 m-2 bg-slate-400 rounded"
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          required
          value={formData.email}
          className="px-2 py-4 m-2 bg-slate-400 rounded"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          required
          value={formData.password}
          className="px-2 py-4 m-2 bg-slate-400 rounded"
        />
        <button type="submit" className="px-2 py-4 hover:bg-blue-300 bg-blue-100">
          Create User
        </button>
      </form>
      <p className=" text-red-500">{errorMessage}</p>
    </>
  );
}
