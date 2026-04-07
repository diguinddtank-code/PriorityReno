/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.msisurfaces.com',
      },
      {
        protocol: 'https',
        hostname: 'kbfhomeimprovement.com',
      },
      {
        protocol: 'https',
        hostname: 'stonesuperior.com',
      },
      {
        protocol: 'https',
        hostname: 's.alicdn.com',
      },
      {
        protocol: 'https',
        hostname: 'www.marbletrend.com',
      },
      {
        protocol: 'https',
        hostname: 'www.fuleistone.com',
      },
      {
        protocol: 'https',
        hostname: 'builderssurplusyeehaa.com',
      },
      {
        protocol: 'https',
        hostname: 'cabinetcurestriangle.com',
      },
      {
        protocol: 'https',
        hostname: 'iconcustombuilders.com',
      },
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
      },
      {
        protocol: 'https',
        hostname: 'deckguardian.com',
      },
      {
        protocol: 'https',
        hostname: 'howtonestforless.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'marinamarmores.com.br',
      },
      {
        protocol: 'https',
        hostname: 'fabquartz.com',
      },
      {
        protocol: 'https',
        hostname: 'marble.com',
      },
      {
        protocol: 'https',
        hostname: 'studio.caesarstoneus.com',
      },
      {
        protocol: 'https',
        hostname: 'www.wk.com.au',
      },
      {
        protocol: 'https',
        hostname: 'd1eukw5if3dy4m.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'www.alicante.com.br',
      },
      {
        protocol: 'https',
        hostname: 'marmialberti.it',
      },
      {
        protocol: 'https',
        hostname: 'www.fiorantina.com',
      },
      {
        protocol: 'https',
        hostname: 'www.usmarble.com',
      },
      {
        protocol: 'https',
        hostname: 'graniteshop1.com',
      },
      {
        protocol: 'https',
        hostname: 'ootwc.com',
      }
    ],
  },
};

export default nextConfig;
