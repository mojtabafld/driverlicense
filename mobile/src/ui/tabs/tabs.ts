// The app's main parts, in tab-bar order (their icons: app-tabs.tsx).
export const TABS = [
  { name: 'index', href: '/', label: 'خانه' },
  { name: 'learn', href: '/learn', label: 'آموزش' },
  { name: 'exam', href: '/exam', label: 'آزمون' },
  { name: 'settings', href: '/settings', label: 'تنظیمات' },
] as const;
