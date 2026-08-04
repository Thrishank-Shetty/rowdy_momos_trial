import { Link } from 'react-router-dom';

export default function Footer({ restaurant }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-cream border-t-2 border-mustard/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🥟</span>
              <span className="font-display text-base leading-none">
                {restaurant?.name || 'Rowdy Momos Cafe'}
              </span>
            </div>
            <p className="text-sm text-cream-dim">
              {restaurant?.shortDescription}
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm text-mustard mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-cream-dim">
              <li><Link to="/" className="hover:text-mustard transition-colors">Home</Link></li>
              <li><Link to="/menu" className="hover:text-mustard transition-colors">Menu</Link></li>
              <li><Link to="/about" className="hover:text-mustard transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-mustard transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm text-mustard mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-cream-dim">
              <li>{restaurant?.phone}</li>
              <li>{restaurant?.email}</li>
              <li>{restaurant?.address}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm text-mustard mb-4">Follow Us</h4>
            <div className="flex gap-3">
              <a
                href={restaurant?.social?.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal-2 hover:bg-mustard hover:text-charcoal transition-colors"
              >
                📷
              </a>
              <a
                href={restaurant?.social?.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal-2 hover:bg-mustard hover:text-charcoal transition-colors"
              >
                📘
              </a>
              <a
                href={restaurant?.social?.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal-2 hover:bg-mustard hover:text-charcoal transition-colors"
              >
                💬
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-charcoal-3 pt-6 text-center text-xs text-cream-dim">
          © {year} {restaurant?.name || 'Rowdy Momos Cafe'}. All rights reserved.
          {' · '}
          <Link to="/admin" className="hover:text-mustard transition-colors">
            Staff Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
