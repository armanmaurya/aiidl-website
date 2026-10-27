"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

type Field = "name" | "email" | "message";
type FieldErrors = Partial<Record<Field, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: Record<Field, string>): FieldErrors {
  const errors: FieldErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) errors.name = "Please enter your name — spaces alone don't count.";
  else if (name.length < 2) errors.name = "Your name needs at least 2 characters.";

  if (!email) errors.email = "Please enter your email so we can reply.";
  else if (!EMAIL_REGEX.test(email)) errors.email = "That email doesn't look right — try name@company.com.";

  if (!message) errors.message = "Tell us a little about your project — spaces alone don't count.";
  else if (message.length < 10) errors.message = "Add a few more words (at least 10 characters).";

  return errors;
}

export function ContactForm() {
  const searchParams = useSearchParams();
  const [values, setValues] = useState<Record<Field, string>>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const refs = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    message: useRef<HTMLTextAreaElement>(null),
  };
  const successRef = useRef<HTMLDivElement>(null);

  // Pre-fill the message when arriving from a service or project link.
  useEffect(() => {
    const project = searchParams.get("project");
    const service = searchParams.get("service");
    const prefill = project
      ? `Hi AIIDL team — we liked the ${project} concept and would like to discuss something similar.`
      : service
        ? `Hi AIIDL team — we're interested in ${service} and would like to talk about scope and timing.`
        : "";
    if (prefill) setValues((v) => (v.message ? v : { ...v, message: prefill }));
  }, [searchParams]);

  useEffect(() => {
    if (success) successRef.current?.focus();
  }, [success]);

  const update = (field: Field, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
    setServerError(null);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setServerError(null);

    const clientErrors = validate(values);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      const first = (["name", "email", "message"] as Field[]).find((f) => clientErrors[f]);
      if (first) refs[first].current?.focus();
      return;
    }

    setErrors({});
    setSubmitting(true);
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const payload = await response.json();
      if (!response.ok || !payload.ok) {
        if (payload.errors && Object.keys(payload.errors).length > 0) setErrors(payload.errors);
        else setServerError(payload.message || "Something went wrong. Please try again.");
        return;
      }
      setSuccess(true);
    } catch {
      setServerError("We couldn't reach the server. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setValues({ name: "", email: "", message: "" });
    setSuccess(false);
  };

  return (
    <div className="rounded-[1.75rem] bg-surface p-6 ring-1 ring-ink/[0.06] sm:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {success ? (
          <motion.div
            key="success"
            ref={successRef}
            tabIndex={-1}
            role="status"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="py-6 outline-none"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
              <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2 className="h-display mt-6 text-3xl">Demo only - no message was sent.</h2>
            <p className="mt-3 max-w-md leading-relaxed text-muted">
              Your enquiry passed validation in the browser and on the server (<code className="text-ink">POST /api/enquiries</code>),
              but this is a demo: nothing was stored or emailed.
            </p>
            <button type="button" onClick={reset} className="btn-ghost mt-8">
              Write another enquiry
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            {serverError && (
              <p role="alert" className="flex items-start gap-2 rounded-2xl bg-red-50 p-4 text-sm text-red-800">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                {serverError}
              </p>
            )}

            <div className="grid gap-6 sm:grid-cols-2">
              <TextField
                id="name"
                label="Name"
                autoComplete="name"
                value={values.name}
                error={errors.name}
                onChange={(v) => update("name", v)}
                inputRef={refs.name}
              />
              <TextField
                id="email"
                label="Email"
                type="email"
                autoComplete="email"
                value={values.email}
                error={errors.email}
                onChange={(v) => update("email", v)}
                inputRef={refs.email}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium">
                Project message
              </label>
              <textarea
                id="message"
                ref={refs.message}
                rows={6}
                value={values.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="What are you building or improving? Rough timelines help."
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={fieldClass(Boolean(errors.message))}
              />
              <FieldError id="message-error" message={errors.message} />
            </div>

            <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted">All fields are required. Demo form — nothing is sent.</p>
              <button type="submit" disabled={submitting} className="btn-primary group disabled:opacity-60">
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Checking…
                  </>
                ) : (
                  <>
                    Send enquiry
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function fieldClass(invalid: boolean) {
  return `mt-2 block w-full rounded-2xl bg-paper px-4 py-3.5 text-[0.9375rem] text-ink ring-1 ring-inset transition-[box-shadow,background-color] duration-200 placeholder:text-muted/70 focus:bg-surface focus:outline-none focus:ring-2 ${
    invalid ? "ring-red-500 focus:ring-red-500" : "ring-ink/10 focus:ring-ink"
  }`;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p
          id={id}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="flex items-center gap-1.5 overflow-hidden pt-2 text-sm text-red-700"
        >
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function TextField({
  id,
  label,
  type = "text",
  autoComplete,
  value,
  error,
  onChange,
  inputRef,
}: {
  id: Field;
  label: string;
  type?: string;
  autoComplete: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        ref={inputRef}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={fieldClass(Boolean(error))}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}
