"use client";

import Image from 'next/image';
import { useState } from 'react';

// Default fallback image
const FALLBACK_IMAGE = '/cb13f0f2.webp';

type LocalImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
};

export default function LocalImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = '',
  style = {},
  priority = false,
}: LocalImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  
  // Handle image load errors
  const handleError = () => {
    setImgSrc(FALLBACK_IMAGE);
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      fill={fill}
      className={className}
      style={style}
      priority={priority}
      onError={handleError}
    />
  );
} 