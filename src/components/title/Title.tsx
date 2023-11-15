import { titleFont } from '@/config/fonts';
import React from 'react';

interface Props {
  title:string;
  subtitle?:string;
  className?:string;
}

export const Title = ({title, subtitle, className}:Props) => {
  return (
    <div className={`mt-3 ${className}`}>
      <h1 className={`${titleFont.className} antialiased text-4xl font-semibold my-7`}>
        {title}
      </h1>
      {
        subtitle && (
          <h3 className="font-light text-xl mb-7">
            {subtitle}
          </h3>
        )
      }
    </div>
  )
}
