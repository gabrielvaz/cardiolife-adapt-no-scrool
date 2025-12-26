'use client';

import ECGDashboard from '@/components/ECGDashboard';
import { useParams } from 'next/navigation';
import { TabId } from '@/components/layout/TabNavigation';
import { useEffect } from 'react';
import { useVariant } from '@/context/VariantContext';

export default function VariantTabPage() {
  const params = useParams();
  const variantParam = (params.variant as string).toUpperCase() as any;
  const tabParam = params.tab as TabId;
  const { setVariant } = useVariant();

  useEffect(() => {
    if (variantParam) {
      setVariant(variantParam);
    }
  }, [variantParam, setVariant]);

  return <ECGDashboard initialTab={tabParam} />;
}
