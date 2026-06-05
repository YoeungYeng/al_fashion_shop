interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export function Header({ title = 'Café Noir', subtitle = 'Artisan Coffee & Pastries' }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
      <div className="text-center max-w-md mx-auto">
        <h1 className="font-serif text-xl text-gray-900">{title}</h1>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    </header>
  );
}
