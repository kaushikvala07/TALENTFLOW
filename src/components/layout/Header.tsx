import {
  Users,
  Briefcase,
  ClipboardList,
  BarChart3,
  Menu,
  Settings,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/", icon: BarChart3 },
  { name: "Jobs", href: "/jobs", icon: Briefcase },
  { name: "Candidates", href: "/candidates", icon: Users },
  { name: "Assessments", href: "/assessments", icon: ClipboardList },
];

const NavigationItems = ({ isMobile, onItemClick }: { isMobile?: boolean; onItemClick?: () => void }) => {
  const location = useLocation();

  return (
    <>
      {navigation.map((item) => {
        const isActive = location.pathname === item.href;
        const buttonContent = (
          <div className="flex items-center space-x-2">
            <item.icon className="h-4 w-4" />
            <span className={cn(!isMobile && "hidden lg:inline")}>
              {item.name}
            </span>
          </div>
        );

        return (
          <TooltipProvider key={item.name}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  asChild
                  className={cn(
                    "h-9 px-3 w-full justify-start md:w-auto md:justify-center",
                    isActive && "bg-primary text-primary-foreground shadow-sm"
                  )}
                  onClick={onItemClick}
                >
                  <Link to={item.href}>{buttonContent}</Link>
                </Button>
              </TooltipTrigger>
              {!isMobile && (
                <TooltipContent>
                  <p>{item.name}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </>
  );
};

export const Header = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center px-3 md:px-5 lg:px-8">
        {/* Logo */}
        <div className="mr-4 md:mr-6 lg:mr-8 flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-hover">
            <span className="text-lg font-bold text-white">T</span>
          </div>
          <span className="hidden lg:block text-xl lg:text-2xl font-bold text-foreground">
            TalentFlow
          </span>
          <span className="text-lg font-bold text-foreground lg:hidden">TF</span>
        </div>

        {/* Desktop and Tablet Navigation */}
        <nav className="hidden md:flex flex-1 items-center justify-center space-x-1 lg:space-x-2">
          <NavigationItems />
        </nav>

        {/* Right Side Actions */}
        <div className="ml-auto flex items-center space-x-2 md:space-x-3">
          {/* Settings Button */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 md:mr-0 lg:mr-2" />
                  <span className="hidden lg:inline">Settings</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Profile Avatar */}
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary-hover" />

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-hover">
                    <span className="text-lg font-bold text-white">T</span>
                  </div>
                  <span className="text-xl font-bold text-foreground">
                    TalentFlow
                  </span>
                </div>
              </div>
              <nav className="flex flex-col space-y-2">
                <NavigationItems
                  isMobile={true}
                  onItemClick={() => setIsOpen(false)}
                />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};