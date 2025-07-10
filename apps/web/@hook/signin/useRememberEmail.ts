"use client";
import { emailStorage } from "@utils/signin";
import { useState, useEffect } from "react";

export function useRememberEmail() {
  const [savedEmail, setSavedEmail] = useState("");
  const [isRemembered, setIsRemembered] = useState(false);

  useEffect(() => {
    const { isEnabled, email } = emailStorage.get();
    setSavedEmail(email);
    setIsRemembered(isEnabled);
  }, []);

  const toggleRememberEmail = (email: string, shouldRemember: boolean) => {
    if (shouldRemember && email) {
      emailStorage.save(email);
      setSavedEmail(email);
      setIsRemembered(true);
    } else {
      emailStorage.remove();
      setSavedEmail("");
      setIsRemembered(false);
    }
  };

  return {
    savedEmail,
    isRemembered,
    toggleRememberEmail,
  };
}
