import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'I love you Laurel',
  description: 'I love you Laurel',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
