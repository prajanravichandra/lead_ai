const DashboardNav = () => {
  const links = [
    { href: "/dashboard", label: "Overview" },
    { href: "/dashboard/scrape", label: "Scrape" },
    { href: "/dashboard/leads", label: "Leads" },
    { href: "/dashboard/credits", label: "Credits" },
    { href: "/dashboard/settings", label: "Settings" },
  ];

  return (
    <nav className="flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-3 text-sm shadow-sm">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="rounded-lg px-3 py-2 font-medium text-slate-700 hover:bg-slate-100"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
};

export default DashboardNav;

