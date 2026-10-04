// The app's main parts, in tab-bar order (their icons: app-tabs.tsx on phones, app-tabs.web.tsx on the web).
export const TABS = [
  { name: 'index', href: '/', label: 'خانه' },
  { name: 'exam', href: '/exam', label: 'آزمون' },
  { name: 'learn', href: '/learn', label: 'آموزش' },
  { name: 'settings', href: '/settings', label: 'تنظیمات' },
] as const;
