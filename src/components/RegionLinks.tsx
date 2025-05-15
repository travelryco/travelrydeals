'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllRegions } from '@/lib/deals';

export default function RegionLinks() {
  const [regions, setRegions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get all unique regions from deals store
    const fetchRegions = async () => {
      const allRegions = await getAllRegions();
      setRegions(allRegions);
      setLoading(false);
    };
    
    fetchRegions();
  }, []);

  if (loading) {
    return (
      <div className="space-x-2">
        <span className="animate-pulse bg-gray-200 h-5 w-20 inline-block rounded"></span>
        <span className="animate-pulse bg-gray-200 h-5 w-20 inline-block rounded"></span>
      </div>
    );
  }

  return (
    <div className="space-x-2">
      {regions.map((region) => (
        <Link
          key={region}
          href={`/regions/${encodeURIComponent(region)}`}
          className="text-white transition hover:text-secondary"
        >
          {region}
        </Link>
      ))}
    </div>
  );
} 