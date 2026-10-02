// The app's main parts, in tab-bar order.
export const TABS = [
  { name: 'index', href: '/', label: 'خانه', sf: 'house', md: 'home' },
  { name: 'exam', href: '/exam', label: 'آزمون', sf: 'checkmark.circle', md: 'quiz' },
  { name: 'learn', href: '/learn', label: 'آموزش', sf: 'book', md: 'school' },
  { name: 'settings', href: '/settings', label: 'تنظیمات', sf: 'gearshape', md: 'settings' },
] as const;
