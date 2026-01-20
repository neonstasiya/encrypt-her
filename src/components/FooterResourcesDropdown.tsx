import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming", "District of Columbia"
];

export const FooterResourcesDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button 
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-left"
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-label="Resources by State - opens dropdown menu"
        >
          Resources by State
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-56 p-2 bg-card border border-border z-50" 
        align="start"
        role="menu"
        aria-label="State resources navigation"
      >
        <ScrollArea className="h-72">
          <nav aria-label="Resources by state">
            <ul className="flex flex-col gap-1" role="list">
              <li>
                <Link
                  to="/resources-by-state"
                  className="block px-3 py-2 text-sm font-medium text-primary hover:bg-muted rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                >
                  View All Resources
                </Link>
              </li>
              <li aria-hidden="true">
                <div className="border-t border-border my-1" />
              </li>
              {US_STATES.map((state) => (
                <li key={state}>
                  <Link
                    to={`/resources-by-state?state=${encodeURIComponent(state)}`}
                    className="block px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                    role="menuitem"
                    onClick={() => setIsOpen(false)}
                  >
                    {state}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
