'use client';

import { WorkPageLayout } from '~/components/Layouts/WorkPageLayout'
import { WorkContent } from '~/components/work/WorkContent';

export default function Page() {
  return (
    <WorkPageLayout>
      <WorkContent />
    </WorkPageLayout>
  );
}

