const nav = [
  ["Today", "/today"],
  ["Report", "/report"],
  ["Journal", "/journal"],
  ["Coach", "/coach"],
  ["Settings", "/settings"],
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-md min-h-screen flex flex-col">
      <div className="flex-1 px-6 pt-10 pb-24">{children}</div>
      <nav className="fixed bottom-0 inset-x-0 mx-auto max-w-md flex justify-between px-8 py-4 bg-midnight/90 backdrop-blur border-t border-mist/10 text-[11px]">
        {nav.map(([label, href]) => (
          <a key={href} href={href} className="opacity-70 hover:opacity-100 hover:text-mist">
            {label}
          </a>
        ))}
      </nav>
    </div>
  );
}
