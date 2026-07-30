import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tharu Photography | Capturing Life\'s Most Beautiful Moments',
  description:
    'Professional photography services specializing in weddings, portraits, nature, and events. Based in Sri Lanka — booking worldwide.',
  keywords: 'photography, wedding photography, portrait photography, Sri Lanka photographer, professional photography',
  authors: [{ name: 'Tharu Photography' }],
  openGraph: {
    title: 'Tharu Photography',
    description: 'Capturing Life\'s Most Beautiful Moments',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
