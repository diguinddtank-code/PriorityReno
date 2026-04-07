import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth overflow-x-hidden">
      <Head>
        {/* SEO Meta Tags - HIGH INTENT OPTIMIZATION */}
        <meta name="description" content="Looking for 'countertop installers near me'? We are Atlanta's #1 factory-direct granite & quartz installation and cabinet refacing experts. Get a free quote today." />
        <meta name="keywords" content="Countertop installation near me, Granite installers Atlanta, Quartz countertops installation, Cabinet refacing contractors, Kitchen remodelers, Custom cabinets near me" />
        <meta name="robots" content="index, follow" />
        
        {/* Google tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-17900042533"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17900042533');
            `,
          }}
        />

        {/* Meta Pixel Code */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1070545399813605');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1070545399813605&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}

        {/* PERFORMANCE OPTIMIZATION: Resource Hints */}
        <link rel="preload" as="image" href="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" />
        
        {/* Google Ads Conversion Tracking */}
        <Script
          id="google-ads-conversion"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              function gtag_report_conversion(url) {
                var callback = function () {
                  if (typeof(url) != 'undefined') {
                    window.location = url;
                  }
                };
                if (typeof gtag === 'function') {
                    gtag('event', 'conversion', {
                        'send_to': 'AW-17900042533/UqsJCMLazOwbEKXys9dC',
                        'event_callback': callback
                    });
                } else {
                    callback();
                }
                return false;
              }
            `,
          }}
        />

        {/* Schema.org JSON-LD */}
        <Script
          id="schema-org"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HomeAndConstructionBusiness",
              "name": "Priority Renovations",
              "image": "https://i.imgur.com/VBoJH82.png",
              "description": "Expert Countertop Installation and Cabinet Refacing in Metro Atlanta.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Atlanta",
                "addressRegion": "GA",
                "addressCountry": "US"
              },
              "areaServed": ["Atlanta", "Buckhead", "Alpharetta", "Roswell", "Marietta"],
              "priceRange": "$$"
            })
          }}
        />
      </Head>
      <body className="bg-white text-slate-900 antialiased selection:bg-brand-orange selection:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
