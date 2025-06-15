// components/PaymentIcons/PaypalIcon.tsx
import React from 'react';

interface PaypalIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const PaypalIcon: React.FC<PaypalIconProps> = ({ size = 24, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    {...props}
  >
    <path d="M7.3 17.1h1.8l.5-3.2 1.1.1c2.7 0 4.6-1.1 5.1-3.5.2-1.1.1-2-.4-2.6-1.1-1.3-3.7-1.5-5.8-1.5H7.7c-.4 0-.7.3-.8.7L5.4 17.1c0 .2 0 .4.2.5.1.1.3.1.5.1h1.2z" />
    <path d="M19.2 8.3c-.6-1.1-1.9-1.8-3.7-1.8h-4.1c-.4 0-.7.3-.8.7L9.2 17.1c0 .2 0 .4.2.5.1.1.3.1.5.1h2.6l.6-3.9-.1.1c.4-.1.8-.1 1.1-.1h1.1c2.8 0 5-1.1 5.6-4.2.2-1.1.1-2.1-.4-2.8zm-3.1 4.1c-.3 1.8-1.6 1.8-3.1 1.8h-.6l.4-2.8h.6c1.5 0 2.8 0 3.1 1 .1.4.1.7 0 1z" />
    <path d="M9.9 8.5H6.3c-.4 0-.7.3-.8.7L4 18.2c0 .2 0 .4.2.5.1.1.3.1.5.1h2.1l1.5-9.6c0-.4.4-.7.8-.7h1.1c3.1 0 5.5-1.3 6.1-4.9.1-.5-.3-.9-.8-.9h-4.1c-.2 0-.4.1-.5.2-.1.1-.2.3-.2.5l-.2 1.2z" />
  </svg>
);