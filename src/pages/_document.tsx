import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth overflow-x-hidden">
      <Head>
        {/* SEO Meta Tags - HIGH INTENT OPTIMIZATION */}
        <meta name="description" content="Looking for 'countertop installers near me'? We are Atlanta's #1 factory-direct granite & quartz installation and cabinet refacing experts. Get a free quote today." />
        <meta name="keywords" content="Countertop installation near me, Granite installers Atlanta, Quartz countertops installation, Cabinet refacing contractors, Kitchen remodelers, Custom cabinets near me" />
        <meta name="robots" content="index, follow" />
        
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17900042533"></script>
        <script
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
        <script
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
          />
        </noscript>
        {/* End Meta Pixel Code */}

        {/* PERFORMANCE OPTIMIZATION: Resource Hints */}
        <link rel="preload" as="image" href="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" />
        
        {/* Google Ads Conversion Tracking */}
        <script
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

        {/* Tailwind & Fonts */}
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet" />
        
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                theme: {
                  extend: {
                    fontFamily: {
                      sans: ['Inter', 'sans-serif'],
                      serif: ['Playfair Display', 'serif'],
                    },
                    colors: {
                      brand: {
                        orange: '#F97316',
                        dark: '#0F172A',
                        gold: '#D4AF37',
                      }
                    },
                    transitionTimingFunction: {
                      'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
                      'luxury': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    },
                    animation: {
                      'marquee': 'marquee 30s linear infinite',
                      'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                      'fade-in': 'fadeIn 0.5s ease-out forwards',
                      'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                      'scale-in': 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                      'slide-in-right': 'slideInRight 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                      'shimmer': 'shimmer 2.5s infinite linear',
                    },
                    keyframes: {
                      marquee: {
                        '0%': { transform: 'translateX(0)' },
                        '100%': { transform: 'translateX(-50%)' },
                      },
                      fadeIn: {
                        '0%': { opacity: '0' },
                        '100%': { opacity: '1' }
                      },
                      fadeInUp: {
                        '0%': { opacity: '0', transform: 'translateY(30px)' },
                        '100%': { opacity: '1', transform: 'translateY(0)' }
                      },
                      slideInRight: {
                        '0%': { opacity: '0', transform: 'translateX(30px)' },
                        '100%': { opacity: '1', transform: 'translateX(0)' }
                      },
                      scaleIn: {
                        '0%': { opacity: '0', transform: 'scale(0.95)' },
                        '100%': { opacity: '1', transform: 'scale(1)' }
                      },
                      shimmer: {
                        '0%': { transform: 'translateX(-100%) skewX(-15deg)' },
                        '100%': { transform: 'translateX(200%) skewX(-15deg)' }
                      }
                    }
                  }
                }
              }
            `,
          }}
        />
        
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Custom Scrollbar */
            ::-webkit-scrollbar {
              width: 8px;
              height: 4px;
            }
            ::-webkit-scrollbar-track {
              background: #f1f1f1;
            }
            ::-webkit-scrollbar-thumb {
              background: #cbd5e1;
              border-radius: 4px;
            }
            ::-webkit-scrollbar-thumb:hover {
              background: #94a3b8;
            }
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .no-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            /* Prevent horizontal scroll on mobile globally */
            body, html {
              overflow-x: hidden;
              max-width: 100vw;
              width: 100%;
            }
          `
        }} />

        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
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
