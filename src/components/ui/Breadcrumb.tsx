import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-xs text-slate-500 py-2" aria-label="Breadcrumb">
      <Link href="/" className="hover:text-school-navy flex items-center gap-1 transition-colors">
        <Home className="w-3.5 h-3.5 text-school-academic" />
      </Link>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
          {item.href ? (
            <Link href={item.href} className="hover:text-school-navy font-medium transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-school-navy font-semibold">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
