import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Ecommercify',
    default: 'Ecommercify - Modern Shopping Experience'
  },
  description: 'A beautiful e-commerce platform with a modern shopping experience',
  keywords: ['ecommerce', 'shopping', 'online store', 'products'],
  authors: [{ name: 'Ecommercify Team' }],
  creator: 'Ecommercify',
  publisher: 'Ecommercify',
  robots: 'index, follow',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#171717' },
  ],
  viewport: 'width=device-width, initial-scale=1',
}; 