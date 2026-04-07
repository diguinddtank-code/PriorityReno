import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth overflow-x-hidden">
      <Head>
        {/* SEO Meta Tags - HIGH INTENT OPTIMIZATION */}
        <meta name="description" content="Looking for 'countertop installers near me'? We are Atlanta's #1 factory-direct granite & quartz installation and cabinet refacing experts. Get a free quote today." />
        <meta name="keywords" content="Countertop installation near me, Granite installers Atlanta, Quartz countertops installation, Cabinet refacing contractors, Kitchen remodelers, Custom cabinets near me" />
        <meta name="robots" content="index, follow" />
        
        {/* PERFORMANCE OPTIMIZATION: Resource Hints */}
        <link rel="preload" as="image" href="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" />
      </Head>
      <body className="bg-white text-slate-900 antialiased selection:bg-brand-orange selection:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
