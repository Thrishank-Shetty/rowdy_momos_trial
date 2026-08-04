import { Link, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center sm:px-6">
      <p className="text-5xl mb-4">🔥</p>
      <h1 className="font-display text-2xl text-charcoal mb-2">Something Went Wrong</h1>
      <p className="text-sm text-charcoal/60 mb-1">
        The kitchen hit a snag rendering this page.
      </p>
      {error?.statusText || error?.message ? (
        <p className="text-xs text-charcoal/40 mb-6">{error.statusText || error.message}</p>
      ) : (
        <div className="mb-6" />
      )}
      <Link
        to="/"
        className="inline-block rounded-full bg-mustard px-6 py-3 font-display text-sm text-charcoal hover:bg-chili hover:text-cream transition-colors"
      >
        Back Home
      </Link>
    </div>
  );
}
