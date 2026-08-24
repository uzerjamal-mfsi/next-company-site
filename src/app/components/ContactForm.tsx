'use client';

import { useActionState } from 'react';
import { type ContactFormState, submitContact } from '../contact/actions';

const initialState: ContactFormState = {};

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContact, initialState);

  return (
    <form action={formAction} noValidate className="border-border bg-muted rounded-2xl border p-8">
      {state.message && (
        <p
          role={state.success ? 'status' : 'alert'}
          className={`mb-6 rounded-lg p-4 text-sm font-medium ${
            state.success ? 'bg-success text-success-foreground' : 'bg-error text-error-foreground'
          }`}
        >
          {state.message}
        </p>
      )}

      <div className="mb-6">
        <label htmlFor="name" className="text-foreground mb-2 block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          aria-invalid={Boolean(state.errors?.name)}
          aria-describedby={state.errors?.name ? 'name-error' : undefined}
          className="border-border bg-background text-foreground w-full rounded-lg border px-4 py-3"
        />
        {state.errors?.name && (
          <p id="name-error" className="text-error-foreground mt-2 text-sm">
            {state.errors.name[0]}
          </p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="email" className="text-foreground mb-2 block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          aria-invalid={Boolean(state.errors?.email)}
          aria-describedby={state.errors?.email ? 'email-error' : undefined}
          className="border-border bg-background text-foreground w-full rounded-lg border px-4 py-3"
        />
        {state.errors?.email && (
          <p id="email-error" className="text-error-foreground mt-2 text-sm">
            {state.errors.email[0]}
          </p>
        )}
      </div>

      <div className="mb-8">
        <label htmlFor="message" className="text-foreground mb-2 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          aria-invalid={Boolean(state.errors?.message)}
          aria-describedby={state.errors?.message ? 'message-error' : undefined}
          className="border-border bg-background text-foreground w-full rounded-lg border px-4 py-3"
        />
        {state.errors?.message && (
          <p id="message-error" className="text-error-foreground mt-2 text-sm">
            {state.errors.message[0]}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-primary text-primary-foreground w-full rounded-lg px-8 py-3 font-semibold transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {isPending ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
