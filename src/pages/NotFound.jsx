import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center sm:px-6">
      <p className="text-5xl mb-4">🥟</p>
      <h1 className="font-display text-2xl text-charcoal mb-2">Page Not Found</h1>
      <p className="text-sm text-charcoal/60 mb-6">This one fell off the plate.</p>
      <Link
        to="/"
        className="inline-block rounded-full bg-mustard px-6 py-3 font-display text-sm text-charcoal hover:bg-chili hover:text-cream transition-colors"
      >
        Back Home
      </Link>
    </div>
  );
}
