import { useEffect, useMemo, useRef, useState } from "react";
import { Menu, Search, HeartHandshake, X, ChevronRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "../ui/Container";

const navItems = [
  {
    label: "Home",
    id: "home",
    path: "/",
    pages: [],
  },
  {
    label: "Get Involved",
    id: "get-involved",
    path: "/get-involved",
    pages: [
      { label: "Find a Club", path: "/get-involved" },
      { label: "Submit Interest", path: "/get-involved" },
    ],
  },
  {
    label: "Take Action",
    id: "take-action",
    path: "/take-action",
    pages: [
      { label: "Volunteer", path: "/take-action" },
      { label: "Community Projects", path: "/take-action" },
    ],
  },
  {
    label: "Causes",
    id: "causes",
    section: "causes",
    pages: [
      { label: "Education", section: "causes" },
      { label: "Health", section: "causes" },
      { label: "Community Development", section: "causes" },
    ],
  },
  {
    label: "News",
    id: "news",
    section: "news",
    pages: [
      { label: "News & Features", section: "news" },
      { label: "Impact Stories", section: "impact" },
    ],
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(null);
  const [hoveredDesktop, setHoveredDesktop] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [activeSection, setActiveSection] = useState("home");

  const closeTimerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const sectionIds = useMemo(
    () => navItems.filter((item) => item.section).map((item) => item.section),
    []
  );

  useEffect(() => {
    const pathMatch = navItems.find((item) => item.path === location.pathname);
    if (pathMatch) {
      setActiveSection(pathMatch.id);
      return;
    }

    if (location.pathname !== "/") return;

    const onScroll = () => {
      const scrollPosition = window.scrollY + 160;
      let current = "home";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPosition) current = id;
      }

      setActiveSection(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname, sectionIds]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const startCloseTimer = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setHoveredDesktop(null);
    }, 140);
  };

  const visibleDesktopDropdown = desktopOpen || hoveredDesktop;

  const closeMenus = () => {
    setMobileOpen(false);
    setDesktopOpen(null);
    setHoveredDesktop(null);
  };

  const goHome = () => {
    closeMenus();
    navigate("/");
  };

  const goToDonate = () => {
    closeMenus();
    navigate("/donate");
  };

  const goToMyJeanluc = () => {
    closeMenus();
    navigate("/my-jeanluc");
  };

  const goToClubFinder = () => {
    closeMenus();
    navigate("/club-finder");
  };

  const goToSearch = () => {
    closeMenus();
    navigate("/search");
  };

  const goToGetInvolved = () => {
    closeMenus();
    navigate("/get-involved");
  };

  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
      closeMenus();
      return;
    }

    const element = document.getElementById(id);
    if (!element) return;

    const navbarOffset = window.innerWidth >= 1024 ? 146 : 56;
    const top =
      element.getBoundingClientRect().top + window.pageYOffset - navbarOffset;

    window.scrollTo({ top, behavior: "smooth" });
    setActiveSection(id);
    closeMenus();
  };

  const goToItem = (item) => {
    if (item.path) {
      closeMenus();
      navigate(item.path);
      return;
    }

    if (item.section) {
      scrollToSection(item.section);
    }
  };

  const goToPage = (page) => {
    if (page.path) {
      closeMenus();
      navigate(page.path);
      return;
    }

    if (page.section) {
      scrollToSection(page.section);
    }
  };

  const handleDesktopHoverEnter = (id) => {
    clearCloseTimer();
    setHoveredDesktop(id);
  };

  const handleDesktopHoverLeave = () => {
    startCloseTimer();
  };

  const handleDesktopClick = (item) => {
    setDesktopOpen(null);
    setHoveredDesktop(null);
    goToItem(item);
  };

  const toggleMobileGroup = (item) => {
    if (!item.pages.length) {
      goToItem(item);
      return;
    }

    setMobileExpanded((prev) => (prev === item.id ? null : item.id));
  };

  const isNavItemActive = (item) => {
    if (item.path && location.pathname === item.path) return true;
    if (location.pathname === "/" && activeSection === item.section) return true;
    if (location.pathname === "/" && item.id === "home" && activeSection === "home") return true;
    return false;
  };

  const desktopLinkClass = (isOpen, isActive) =>
    `group relative text-[18px] font-normal tracking-[0.005em] transition-colors duration-200 ${
      isOpen || isActive
        ? "text-sky-600"
        : "text-slate-600 hover:text-sky-600"
    }`;

  return (
    <header className="w-full border-y border-slate-300 bg-white">
      <Container className="max-w-[1800px] px-0">
        <div className="hidden lg:block">
          <div className="flex h-[74px] items-center justify-between px-8 xl:px-14">
            <button type="button" onClick={goHome} className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-amber-500 text-amber-500">
                <HeartHandshake className="h-5 w-5" />
              </div>

              <div className="flex flex-col text-left">
                <span className="text-[18px] font-bold leading-none tracking-tight text-blue-900">
                  Jeanluc
                </span>
                <span className="mt-1 text-[18px] font-bold leading-none tracking-tight text-blue-900">
                  Foundation
                </span>
              </div>
            </button>

            <div className="flex items-center gap-4 xl:gap-5">
              <button onClick={goToMyJeanluc} className="text-[15px] font-semibold uppercase text-sky-600 hover:text-sky-800">
                My Jeanluc
              </button>

              <span className="text-slate-300">|</span>

              <button onClick={goToClubFinder} className="text-[15px] font-semibold uppercase text-sky-600 hover:text-sky-800">
                Club Finder
              </button>

              <span className="text-slate-300">|</span>

              <button onClick={goToSearch} className="inline-flex items-center gap-1 text-[15px] font-semibold uppercase text-sky-600 hover:text-sky-800">
                <Search className="h-4 w-4 stroke-[2.4]" />
                Search
              </button>

              <button
                onClick={goToGetInvolved}
                className="ml-2 inline-flex h-[38px] items-center justify-center rounded-full border border-sky-500 px-9 text-[15px] font-semibold uppercase text-sky-600 transition hover:bg-sky-600 hover:text-white"
              >
                Join a Club
              </button>

              <button
                onClick={goToDonate}
                className="inline-flex h-[38px] items-center justify-center rounded-full bg-sky-600 px-10 text-[15px] font-semibold uppercase text-white transition hover:border hover:border-sky-600 hover:bg-white hover:text-sky-600"
              >
                Donate
              </button>
            </div>
          </div>

          <div className="relative" onMouseLeave={handleDesktopHoverLeave}>
            <nav className="flex h-[72px] items-center justify-center gap-14 px-8 xl:px-14">
              {navItems.map((item) => {
                const isOpen = visibleDesktopDropdown === item.id;
                const isActive = isNavItemActive(item);

                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => item.pages.length && handleDesktopHoverEnter(item.id)}
                  >
                    <button
                      type="button"
                      onClick={() => handleDesktopClick(item)}
                      className={desktopLinkClass(isOpen, isActive)}
                    >
                      <span>{item.label}</span>

                      <span
                        className={`absolute -bottom-[22px] left-1/2 h-[2px] -translate-x-1/2 bg-sky-600 transition-all duration-300 ${
                          isOpen || isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </nav>

            <div
              onMouseEnter={clearCloseTimer}
              onMouseLeave={handleDesktopHoverLeave}
              className={`absolute left-0 top-full z-40 w-full overflow-hidden border-t border-slate-300 bg-[#f4f4f4] shadow-[0_12px_35px_rgba(15,23,42,0.08)] transition-all duration-300 ${
                visibleDesktopDropdown
                  ? "pointer-events-auto max-h-[360px] opacity-100"
                  : "pointer-events-none max-h-0 opacity-0"
              }`}
            >
              <div className="mx-auto grid max-w-[1120px] grid-cols-4 gap-8 px-8 py-8">
                {navItems
                  .filter((item) => item.pages.length)
                  .map((group) => {
                    const highlighted = visibleDesktopDropdown === group.id;
                    const isActive = isNavItemActive(group);

                    return (
                      <div key={group.id} className={highlighted ? "block" : "hidden"}>
                        <button
                          type="button"
                          onClick={() => goToItem(group)}
                          className={`mb-4 inline-flex items-center gap-2 text-left text-[17px] font-bold transition ${
                            highlighted || isActive
                              ? "text-sky-600"
                              : "text-slate-700 hover:text-sky-600"
                          }`}
                        >
                          <ChevronRight className="h-4 w-4" />
                          <span>{group.label}</span>
                        </button>

                        <div className="space-y-3">
                          {group.pages.map((page) => (
                            <button
                              key={page.label}
                              type="button"
                              onClick={() => goToPage(page)}
                              className="block text-left text-[15px] leading-6 text-slate-500 transition hover:text-sky-600"
                            >
                              {page.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-[56px] items-center border-b border-slate-300 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex h-full w-[72px] flex-col items-center justify-center border-r border-slate-300 text-slate-600"
          >
            <Menu className="h-6 w-6 stroke-[2.1]" />
            <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.08em]">
              Menu
            </span>
          </button>

          <button type="button" onClick={goHome} className="flex flex-1 items-center justify-center gap-2 px-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-amber-500 text-amber-500">
              <HeartHandshake className="h-4 w-4" />
            </div>

            <div className="flex flex-col leading-none">
              <span className="text-[16px] font-bold tracking-tight text-blue-900">
                Jeanluc
              </span>
              <span className="mt-[2px] text-[13px] font-bold tracking-tight text-blue-900">
                Foundation
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={goToSearch}
            className="flex h-full w-[72px] flex-col items-center justify-center border-l border-slate-300 text-sky-500"
          >
            <Search className="h-5 w-5 stroke-[2.3]" />
            <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.08em]">
              Search
            </span>
          </button>
        </div>

        <div
          className={`fixed inset-0 z-[70] bg-[#f4f4f4] transition-all duration-300 lg:hidden ${
            mobileOpen ? "visible opacity-100" : "invisible opacity-0"
          }`}
        >
          <div className="flex h-[56px] items-center border-b border-slate-300 bg-[#f4f4f4]">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="flex h-full w-[72px] flex-col items-center justify-center border-r border-slate-300 text-slate-600"
            >
              <X className="h-6 w-6 stroke-[2.1]" />
              <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.08em]">
                Menu
              </span>
            </button>

            <button type="button" onClick={goHome} className="flex flex-1 items-center justify-center gap-2 px-3">
              <HeartHandshake className="h-5 w-5 text-amber-500" />
              <span className="text-[16px] font-bold text-blue-900">
                Jeanluc Foundation
              </span>
            </button>

            <button
              type="button"
              onClick={goToSearch}
              className="flex h-full w-[72px] flex-col items-center justify-center border-l border-slate-300 text-sky-500"
            >
              <Search className="h-5 w-5 stroke-[2.3]" />
              <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.08em]">
                Search
              </span>
            </button>
          </div>

          <div className="flex h-[calc(100vh-56px)] flex-col overflow-hidden">
            <div className="grid grid-cols-2">
              <button
                type="button"
                onClick={goToGetInvolved}
                className="h-[48px] border-b border-r border-slate-300 bg-white text-[14px] font-bold uppercase text-sky-600 hover:bg-sky-600 hover:text-white"
              >
                Join a Club
              </button>

              <button
                type="button"
                onClick={goToDonate}
                className="h-[48px] border-b border-slate-300 bg-sky-600 text-[14px] font-bold uppercase text-white hover:bg-white hover:text-sky-600"
              >
                Donate
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-8">
              <div className="mx-auto max-w-[280px] space-y-6 text-center">
                {navItems.map((item) => {
                  const expanded = mobileExpanded === item.id;
                  const isActive = isNavItemActive(item);

                  return (
                    <div key={item.id}>
                      <button
                        type="button"
                        onClick={() => toggleMobileGroup(item)}
                        className={`text-[20px] font-bold transition ${
                          expanded || isActive
                            ? "text-sky-600"
                            : "text-[#5d7287] hover:text-sky-600"
                        }`}
                      >
                        <span
                          className={`inline-block ${
                            expanded || isActive
                              ? "border-b-[4px] border-[#d9dee3] pb-[2px]"
                              : ""
                          }`}
                        >
                          {item.label}
                        </span>
                      </button>

                      {item.pages.length > 0 && (
                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            expanded ? "mt-4 max-h-[360px] opacity-100" : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="space-y-3">
                            {item.pages.map((page) => (
                              <button
                                key={page.label}
                                type="button"
                                onClick={() => goToPage(page)}
                                className="block w-full text-center text-[16px] leading-8 text-[#5d7287] hover:text-sky-600"
                              >
                                {page.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                <div className="mt-10 border-t border-[#d9dee3] pt-5">
                  <button onClick={goToMyJeanluc} className="block w-full text-[13px] font-bold uppercase text-sky-600">
                    My Jeanluc
                  </button>

                  <button onClick={goToClubFinder} className="mt-4 block w-full text-[13px] font-bold uppercase text-sky-600">
                    Club Finder
                  </button>

                  <button onClick={goToSearch} className="mt-4 block w-full text-[13px] font-bold uppercase text-sky-600">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}