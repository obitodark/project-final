import React from 'react';

interface GridProps {
  children?: React.ReactNode;
  container?: boolean;
  item?: boolean;
  cols?: { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  spacing?: { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  span?: { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  className?: string;
}
export const Grid = ({
  children,
  container = false,
  item = false,
  cols = { xs: 12 },
  spacing = { xs: 0 },
  span = {},
  className = '',
}: GridProps) => {

  const gridColsClasses = container
    ? [
      cols.xs !== undefined ? `grid-cols-${cols.xs}` : '',
      cols.sm !== undefined ? `sm:grid-cols-${cols.sm}` : '',
      cols.md !== undefined ? `md:grid-cols-${cols.md}` : '',
      cols.lg !== undefined ? `lg:grid-cols-${cols.lg}` : '',
      cols.xl !== undefined ? `xl:grid-cols-${cols.xl}` : '',
    ]
      .filter(Boolean)
      .join(' ')
    : '';

  const gapClasses = container
    ? [
      spacing.xs !== undefined ? `gap-${spacing.xs}` : '',
      spacing.sm !== undefined ? `sm:gap-${spacing.sm}` : '',
      spacing.md !== undefined ? `md:gap-${spacing.md}` : '',
      spacing.lg !== undefined ? `lg:gap-${spacing.lg}` : '',
      spacing.xl !== undefined ? `xl:gap-${spacing.xl}` : '',
    ]
      .filter(Boolean)
      .join(' ')
    : '';

  const spanClasses = item
    ? [
      span.xs !== undefined ? `col-span-${span.xs}` : '',
      span.sm !== undefined ? `sm:col-span-${span.sm}` : '',
      span.md !== undefined ? `md:col-span-${span.md}` : '',
      span.lg !== undefined ? `lg:col-span-${span.lg}` : '',
      span.xl !== undefined ? `xl:col-span-${span.xl}` : '',
    ]
      .filter(Boolean)
      .join(' ')
    : '';
  return (
    <div className={`${container ? 'grid' : ''} ${gridColsClasses} ${gapClasses} ${spanClasses} ${className}`}>
      {children}
    </div>
  );
};
