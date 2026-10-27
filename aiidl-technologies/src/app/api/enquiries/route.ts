import { NextResponse } from "next/server";

interface EnquiryFieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateEnquiryPayload(payload: {
  name?: unknown;
  email?: unknown;
  message?: unknown;
}): EnquiryFieldErrors {
  const errors: EnquiryFieldErrors = {};

  const rawName = typeof payload.name === "string" ? payload.name : "";
  const rawEmail = typeof payload.email === "string" ? payload.email : "";
  const rawMessage = typeof payload.message === "string" ? payload.message : "";

  const trimmedName = rawName.trim();
  const trimmedEmail = rawEmail.trim();
  const trimmedMessage = rawMessage.trim();

  if (!trimmedName) {
    errors.name =
      "Please enter your full name (whitespace-only input is not accepted).";
  } else if (trimmedName.length < 2) {
    errors.name = "Please enter at least 2 characters for your name.";
  }

  if (!trimmedEmail) {
    errors.email = "Please enter your work or personal email address.";
  } else if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.email =
      "Please enter a valid email address (for example: priya@company.com).";
  }

  if (!trimmedMessage) {
    errors.message =
      "Please describe your project or enquiry (whitespace-only input is not accepted).";
  } else if (trimmedMessage.length < 10) {
    errors.message =
      "Please share a few more words about your project (at least 10 characters).";
  }

  return errors;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const errors = validateEnquiryPayload(body ?? {});

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          ok: false,
          message: "Please fix the highlighted fields and try again.",
          errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        mode: "demo_endpoint",
        headline: "Demo only - no message was sent.",
        detail:
          "Your enquiry passed both client-side and server-side validation via POST /api/enquiries. No data was stored in a database or emailed in this candidate assessment environment.",
        submittedAt: new Date().toISOString(),
        data: {
          name: String(body.name).trim(),
          email: String(body.email).trim(),
          message: String(body.message).trim(),
        },
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Unable to parse request payload. Please try submitting again.",
        errors: {},
      },
      { status: 400 }
    );
  }
}
