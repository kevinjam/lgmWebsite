import RootLayout from './layout';

export const metadata = {
  title: 'Latter Glory Ministries',
  description: 'Reaching all people, empowering believers, and causing revival since July 2000.',
  manifest: '/manifest.json',
  themeColor: '#790da3',
};

export default function ServerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootLayout>{children}</RootLayout>;
}