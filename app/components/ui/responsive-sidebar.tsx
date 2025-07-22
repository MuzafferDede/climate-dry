import { NavLink } from "react-router";
import { useState } from 'react';
import { cn } from "~/utils";


export  function ResponsiveSidebar({ pages , segment}: { pages: { slug: string; name: string }[] , segment: string } ) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="col-span-full lg:col-span-1">
      <div className="space-y-6">
        {/* Toggle button for small screens */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full lg:hidden border border-black bg-teal hover:bg-white hover:text-teal text-white px-4 py-2 text-left  font-semibold rounded-md shadow"
        >
          {isOpen ? 'Hide Menu' : 'Show Menu'}
        </button>

        {/* Collapsible menu on small, always visible on large */}
        <div
          className={cn(
            "flex-col  lg:grid lg:grid-cols-1  self-start",
            isOpen ? "flex" : "hidden lg:grid"
          )}
          role="tablist"
          aria-orientation="vertical"
        >
          {pages.map((link) => (
            <NavLink
              key={link.slug}
              to={`/${segment}/${link.slug}`}
              className={({ isActive }) =>
                cn(
                  "w-full cursor-pointer border-t border-black py-2.5 px-3 text-left font-semibold outline-0 hover:text-teal data-selected:text-teal",
                  isActive && "bg-gray-lightest font-bold text-teal",
                )
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </aside>
  );
}

