'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Leaf } from 'lucide-react';

export function HomeButton() {
  const pathname = usePathname();
  const router = useRouter();

  // 메인 페이지에서는 렌더링하지 않음
  if (pathname === '/') {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="fixed left-4 top-4 z-50 h-12 w-12 rounded-full bg-primary/10 text-primary shadow-sm backdrop-blur-md hover:bg-primary/20 transition-all border border-primary/20"
      onClick={() => router.push('/')}
      title="처음으로 돌아가기"
    >
      <Leaf className="h-6 w-6" />
    </Button>
  );
}
