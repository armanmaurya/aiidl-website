"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface SubmissionSuccess {
  headline: string;
  detail: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateFields(values: {
  name: string;
  email: string;
  message: string;
}): FieldErrors {
  const errors: FieldErrors = {};

  const trimmedName = values.name.trim();
  const trimmedEmail = values.email.trim();
  const trimmedMessage = values.message.trim();

  if (!trimmedName) {
    errors.name =
      "Name is required. Please enter your name (whitespace-only input is not allowed).";
  } else if (trimmedName.length < 2) {
    errors.name = "Please enter at least 2 characters for your name.";
  }

  if (!trimmedEmail) {
    errors.email = "Email is required so we can reply to your enquiry.";
  } else if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.email =
      "Please enter a valid email address (for example: founder@company.com).";
  }

  if (!trimmedMessage) {
    errors.message =
      "Project message is required. Please describe your project (whitespace-only input is not allowed).";
  } else if (trimmedMessage.length < 10) {
    errors.message =
      "Please enter at least 10 characters describing your project or goals.";
  }

  return errors;
}

export function ContactForm() {
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResult, setSuccessResult] = useState<SubmissionSuccess | null>(
    null
  );

  useEffect(() => {
    const projectParam = searchParams.get("project");
    const serviceParam = searchParams.get("service");
    if (projectParam && !message) {
      setMessage(
        `Hi AIIDL team, we saw the "${projectParam}" concept build and would like to discuss a similar project.`
      );
    } else if (serviceParam && !message) {
      setMessage(
        `Hi AIIDL team, we are interested in ${serviceParam} and would like to discuss scope and timelines.`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleFieldChange = (
    field: keyof FieldErrors,
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(value);
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (serverError) {
      setServerError(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setServerError(null);

    const clientErrors = validateFields({ name, email, message });
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const payload = await response.json();

      if (!response.ok || !payload.ok) {
        if (payload.errors && Object.keys(payload.errors).length > 0) {
          setErrors(payload.errors);
        } else {
          setServerError(
            payload.message ||
              "Unable to validate your enquiry. Please check the fields and try again."
          );
        }
        setIsSubmitting(false);
        return;
      }

      setSuccessResult({
        headline: payload.headline || "Demo only - no message was sent.",
        detail: payload.detail,
      });
    } catch {
      setSuccessResult({
        headline: "Demo only - no message was sent.",
        detail:
          "Your enquiry passed client-side validation. No actual enquiry was delivered or saved.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSuccessResult(null);
    setErrors({});
    setServerError(null);
  };

  return (
    <div className="border border-ink bg-surface p-6 sm:p-10">
      {successResult ? (
        <div
          role="status"
          aria-live="polite"
          className="border-l-4 border-accent bg-canvas p-6 sm:p-8"
        >
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
            Validation Complete
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink">
            {successResult.headline}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {successResult.detail}
          </p>

          <div className="mt-6 border-t border-hairline pt-5">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 bg-ink px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-canvas transition-colors hover:bg-accent"
            >
              <span>Return to form</span>
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div className="border-b border-hairline pb-4">
            <h2 className="text-xl font-bold tracking-tight text-ink">
              Project Enquiry Form
            </h2>
            <p className="mt-1 text-xs text-muted sm:text-sm">
              All three fields are required.
            </p>
          </div>

          {serverError && (
            <div
              role="alert"
              className="border-l-4 border-red-600 bg-red-50 p-4 text-sm text-red-800"
            >
              {serverError}
            </div>
          )}

          {/* Field 1: Name */}
          <div>
            <label
              htmlFor="enquiry-name"
              className="block font-mono text-xs font-semibold uppercase tracking-wider text-ink"
            >
              Name <span className="text-accent">*</span>
            </label>
            <input
              id="enquiry-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              value={name}
              onChange={(e) =>
                handleFieldChange("name", e.target.value, setName)
              }
              placeholder="Your full name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "enquiry-name-error" : undefined}
              className={`mt-2 block w-full border px-4 py-3 text-sm text-ink transition-colors placeholder:text-neutral-400 ${
                errors.name
                  ? "border-red-600 bg-red-50/30"
                  : "border-hairline bg-canvas focus:border-ink focus:bg-surface"
              }`}
            />
            {errors.name && (
              <p
                id="enquiry-name-error"
                role="alert"
                className="mt-2 text-xs font-medium text-red-700 sm:text-sm"
              >
                {errors.name}
              </p>
            )}
          </div>

          {/* Field 2: Email */}
          <div>
            <label
              htmlFor="enquiry-email"
              className="block font-mono text-xs font-semibold uppercase tracking-wider text-ink"
            >
              Email <span className="text-accent">*</span>
            </label>
            <input
              id="enquiry-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) =>
                handleFieldChange("email", e.target.value, setEmail)
              }
              placeholder="you@company.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email ? "enquiry-email-error" : undefined
              }
              className={`mt-2 block w-full border px-4 py-3 text-sm text-ink transition-colors placeholder:text-neutral-400 ${
                errors.email
                  ? "border-red-600 bg-red-50/30"
                  : "border-hairline bg-canvas focus:border-ink focus:bg-surface"
              }`}
            />
            {errors.email && (
              <p
                id="enquiry-email-error"
                role="alert"
                className="mt-2 text-xs font-medium text-red-700 sm:text-sm"
              >
                {errors.email}
              </p>
            )}
          </div>

          {/* Field 3: Project Message */}
          <div>
            <label
              htmlFor="enquiry-message"
              className="block font-mono text-xs font-semibold uppercase tracking-wider text-ink"
            >
              Project message <span className="text-accent">*</span>
            </label>
            <textarea
              id="enquiry-message"
              name="message"
              rows={5}
              required
              value={message}
              onChange={(e) =>
                handleFieldChange("message", e.target.value, setMessage)
              }
              placeholder="Briefly describe what you want to build or improve..."
              aria-invalid={Boolean(errors.message)}
              aria-describedby={
                errors.message ? "enquiry-message-error" : undefined
              }
              className={`mt-2 block w-full border px-4 py-3 text-sm text-ink transition-colors placeholder:text-neutral-400 ${
                errors.message
                  ? "border-red-600 bg-red-50/30"
                  : "border-hairline bg-canvas focus:border-ink focus:bg-surface"
              }`}
            />
            {errors.message && (
              <p
                id="enquiry-message-error"
                role="alert"
                className="mt-2 text-xs font-medium text-red-700 sm:text-sm"
              >
                {errors.message}
              </p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group inline-flex w-full items-center justify-center gap-2 bg-ink px-6 py-4 font-mono text-xs font-semibold uppercase tracking-wider text-canvas transition-colors hover:bg-accent disabled:opacity-60 sm:w-auto"
            >
              <span>{isSubmitting ? "Validating..." : "Send enquiry"}</span>
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>
            <p className="mt-3 font-mono text-[11px] text-muted">
              Demo mode: validates via client &amp; POST /api/enquiries without
              sending an actual email.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
