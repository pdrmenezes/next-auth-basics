"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export function UserForm() {
  const router = useRouter();
  const [formDate, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = () => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setFormData((prevState) => ({ ...prevState, [inputName]: inputValue }));
  };

  return (
    <>
      <h1>Form</h1>
    </>
  );
}
