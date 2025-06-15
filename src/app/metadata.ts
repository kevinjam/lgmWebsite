export const metadata = {
  title: {
    default: 'Latter Glory Ministries - A Glorious Bride Ready for Christ',
    template: '%s | Latter Glory Ministries'
  },
  description: 'Founded in July 2000, Latter Glory Ministries (LGM) in Kampala, Uganda is a prayerful, humble ministry dedicated to bringing people to the Lord, equipping saints for service, and raising dynamic leaders through biblical teaching and revival.',
  applicationName: 'Latter Glory Ministries',
  keywords: [
    'Latter Glory Ministries',
    'Uganda Christian ministry',
    'Kampala church',
    'Biblical teaching',
    'Christian revival',
    'Youth discipleship',
    'Student Mission',
    'Haggai 2:9 ministry',
    'Isaiah 40:5'
  ],
  themeColor: '#790da3',
  manifest: '/manifest.json',
  authors: [{ name: 'Latter Glory Ministries', url: 'https://latterglory.ug' }],
  creator: 'Latter Glory Ministries',
  publisher: 'Latter Glory Ministries',
  metadataBase: new URL('https://www.latterglory.ug'),
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/images/icons/192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/images/icons/512x512.png', sizes: '512x512', type: 'image/png' },
      { url: '/images/icons/16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/icons/32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/images/icons/apple-touch-icon.png',
    shortcut: '/favicon.ico'
  },
  openGraph: {
    type: 'website',
    url: 'https://www.latterglory.ug',
    title: 'Latter Glory Ministries - Revealing God\'s Glory Since 2000',
    description: 'A prayerful, humble ministry fulfilling Haggai 2:9 - raising a generation of Holy Ghost empowered leaders for end times revival in Uganda and beyond.',
    siteName: 'Latter Glory Ministries',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Latter Glory Ministries worship service',
      },
    ],
    locale: 'en_US',
    tags: ['Christian', 'Ministry', 'Uganda', 'Revival', 'Discipleship'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@LGM_UG',
    creator: '@LGM_UG',
    title: 'Latter Glory Ministries',
    description: 'Equipping saints & raising leaders since 2000. "The glory of this present house will be greater than the former" - Haggai 2:9',
    images: ['/images/twitter-card.jpg'],
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  other: {
    ministryScriptures: [
      'Haggai 2:9 - "The glory of this present house will be greater than the glory of the former house"',
      'Isaiah 40:5 - "The glory of the Lord will be revealed"'
    ],
    foundingYear: '2000',
    vision: 'A glorious bride ready for the return of Jesus Christ',
    mission: 'To reach all people, empower and disciple believers, revealing the heart of God, causing revival and restoration',
    mandate: [
      'Bring back the people to the Lord',
      'Equip the saints for service',
      'Stir up believers in revival',
      'Raise up young dynamic leaders',
      'Make known God\'s will to believers',
      'Train Holy Ghost empowered missionaries'
    ],
    character: ['Prayerful', 'Humble', 'Biblically-grounded', 'Spirit-led', 'Community-focused']
  }
};