"use client";

import type { FormEvent } from "react";
import { useState } from "react";

type Status = "idle" | "sending" | "error" | "success";

type Web3FormsResponse = {
  success?: boolean;
  message?: string;
};

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const name = String(values.get("name") ?? "").trim();
    const email = String(values.get("email") ?? "").trim();
    const body = String(values.get("message") ?? "").trim();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !validEmail || body.length < 10) {
      setStatus("error");
      setMessage("Veuillez saisir un nom, un email valide et un message d'au moins 10 caractères.");
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setStatus("error");
      setMessage("Le formulaire n'est pas encore configure. Contactez-moi directement par email.");
      return;
    }

    values.append("access_key", accessKey);
    values.append("subject", `Nouveau message portfolio de ${name}`);
    values.append("from_name", "Portfolio Mohamed El-Ghazoui");

    setStatus("sending");
    setMessage("Envoi en cours...");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: values,
      });
      const data = (await response.json()) as Web3FormsResponse;

      if (!response.ok || !data.success) {
        throw new Error(data.message ?? "Echec de l'envoi.");
      }

      setStatus("success");
      setMessage("Votre message a ete envoye avec succes. Merci pour votre contact.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("L'envoi a echoue. Veuillez reessayer ou utiliser mon email direct.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="contact-form glass reveal visible" noValidate>
      <label>
        <span>Nom</span>
        <input suppressHydrationWarning type="text" name="name" required placeholder="Votre nom" />
      </label>
      <label>
        <span>Email</span>
        <input suppressHydrationWarning type="email" name="email" required placeholder="vous@exemple.com" />
      </label>
      <label className="wide">
        <span>Message</span>
        <textarea suppressHydrationWarning name="message" required minLength={10} placeholder="Votre message..." />
      </label>
      <p className="contact-status" data-state={status} aria-live="polite">
        {message}
      </p>
      <button suppressHydrationWarning className="cta magnetic" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Envoi..." : "Envoyer le message"}
      </button>
    </form>
  );
}
