import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async redirects() {
    return [
      // ── Canonical domain: www -> non-www ──
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.sanpietroformaggi.com',
          },
        ],
        destination: 'https://sanpietroformaggi.com/:path*',
        permanent: true,
      },

      // ── Legacy slugs whose current slug changed ──
      {
        source: '/prodotto/pecorino-semi-stagionato-con-pepe',
        destination: '/i-nostri-formaggi/pecorino-semistagionato-con-pepe',
        permanent: true,
      },
      {
        source: '/prodotto/pecorino-semi-stagionato-bianco-con-pepe-esterno',
        destination: '/i-nostri-formaggi/pecorino-semistagionato-bianco-con-pepe-esterno',
        permanent: true,
      },
      {
        source: '/prodotto/pecorino-semi-stagionato-bianco',
        destination: '/i-nostri-formaggi/pecorino-semistagionato-bianco',
        permanent: true,
      },
      {
        source: '/prodotto/formaggio-primo-sale-bianco',
        destination: '/i-nostri-formaggi/formaggio-pecorino-fresco-bianco',
        permanent: true,
      },
      {
        source: '/prodotto/formaggio-primosale-con-peperoncino-olive-e-erba-chipollina',
        destination: '/i-nostri-formaggi/formaggio-pecorino-fresco-con-peperoncino-olive-e-erba-cipollina',
        permanent: true,
      },
      {
        source: '/prodotto/formaggio-pecorino-fresco-con-erba-chipollina',
        destination: '/i-nostri-formaggi/formaggio-pecorino-fresco-con-erba-cipollina',
        permanent: true,
      },
      {
        source: '/prodotto/caciocavallo-semi-stagionato',
        destination: '/i-nostri-formaggi/caciocavallo-semistagionato',
        permanent: true,
      },
      {
        source: '/prodotto/ricotta-aromatizzata-allo-zafferano',
        destination: '/i-nostri-formaggi/ricotta-salata-aromatizzata-allo-zafferano',
        permanent: true,
      },

      // ── Legacy category pages ──
      {
        source: '/categoria-prodotto/formaggi-freschi',
        destination: '/i-nostri-formaggi',
        permanent: true,
      },
      {
        source: '/categoria-prodotto/formaggi-semi-stagionati',
        destination: '/i-nostri-formaggi',
        permanent: true,
      },
      {
        source: '/categoria-prodotto/formaggi-stagionati',
        destination: '/i-nostri-formaggi',
        permanent: true,
      },
      {
        source: '/formaggi-freschi',
        destination: '/i-nostri-formaggi',
        permanent: true,
      },
      {
        source: '/formaggi-semi-stagionati',
        destination: '/i-nostri-formaggi',
        permanent: true,
      },
      {
        source: '/formaggi-stagionati',
        destination: '/i-nostri-formaggi',
        permanent: true,
      },

      // ── Legacy static pages ──
      {
        source: '/contattaci',
        destination: '/contatti',
        permanent: true,
      },
      {
        source: '/shop',
        destination: '/i-nostri-formaggi',
        permanent: true,
      },
      {
        source: '/l-area-di-stoccaggio',
        destination: '/lazienda',
        permanent: true,
      },
      {
        source: '/il-laboratorio',
        destination: '/lazienda',
        permanent: true,
      },
      {
        source: '/gdpr-richiedi-dati-personali',
        destination: '/richiedi-dati',
        permanent: true,
      },
      {
        source: '/privacidad',
        destination: '/privacy',
        permanent: true,
      },
      {
        source: '/wishlist',
        destination: '/i-nostri-formaggi',
        permanent: true,
      },

      // ── Legacy WordPress / WooCommerce / YITH query params ──
      {
        source: '/:path*',
        has: [
          {
            type: 'query',
            key: 'action',
            value: 'yith-woocompare-add-product',
          },
        ],
        destination: '/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'query',
            key: 'action',
            value: 'yith-woocompare-remove-product',
          },
        ],
        destination: '/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'query',
            key: 'action',
            value: 'yith-woocompare-view-table',
          },
        ],
        destination: '/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'query',
            key: 'yith_wcwl_action',
          },
        ],
        destination: '/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'query',
            key: 'add-to-cart',
          },
        ],
        destination: '/:path*',
        permanent: true,
      },

      // ── Generic legacy patterns ──
      {
        source: '/prodotto/:slug*',
        destination: '/i-nostri-formaggi/:slug*',
        permanent: true,
      },
      {
        source: '/prodotti/:slug*',
        destination: '/i-nostri-formaggi/:slug*',
        permanent: true,
      },
      {
        source: '/recipe/:slug*',
        destination: '/ricette/:slug*',
        permanent: true,
      },
      {
        source: '/categoria-prodotto/:slug*',
        destination: '/i-nostri-formaggi',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
