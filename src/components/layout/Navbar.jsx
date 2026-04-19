import { useEffect, useMemo, useRef, useState } from "react";
import {
  Menu,
  Search,
  HeartHandshake,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "../ui/Container";

const navItems = [
  {
    label: "About Jeanluc",
    id: "about",
    pages: [
      "Overview",
      "History",
      "Our Structure",
      "Our Foundation",
      "Our Leaders",
      "Membership",
      "Careers",
    ],
  },
  {
    label: "Get Involved",
    id: "get-involved",
    pages: [
      "Overview",
      "Join a club",
      "Volunteer Groups",
      "Youth Clubs",
      "Community Clubs",
      "Projects",
      "Partnerships",
      "Ways to Give",
    ],
  },
  {
    label: "Our Causes",
    id: "causes",
    pages: [
      "Overview",
      "Promoting Peace",
      "Fighting Disease",
      "Providing Clean Water",
      "Supporting Education",
      "Growing Local Economies",
      "Protecting the Environment",
    ],
  },
  {
    label: "Our Programs",
    id: "programs",
    pages: [
      "Overview",
      "Youth Programs",
      "Leadership Awards",
      "Scholarships",
      "Community Projects",
      "Grants",
    ],
  },
  {
    label: "News & Features",
    id: "news",
    pages: [
      "All News & Features",
      "Magazine",
      "Press Center",
      "Blog",
      "Podcast",
      "Social Media",
    ],
  },
  {
    label: "For Members",
    id: "members",
    pages: [
      "My Jeanluc",
      "Club Administration",
      "Club Finder",
      "Profile",
      "Resources",
      "Foundation",
    ],
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(null);
  const [hoveredDesktop, setHoveredDesktop] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState("get-involved");
  const [activeSection, setActiveSection] = useState("about");

  const closeTimerRef = useRef(null);
  const sectionIds = useMemo(() => navItems.map((item) => item.id), []);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname !== "/") return;

    const onScroll = () => {
      const scrollPosition = window.scrollY + 150;
      let current = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPosition) current = id;
      }

      setActiveSection(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionIds, location.pathname]);

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

  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
      setMobileOpen(false);
      return;
    }

    const element = document.getElementById(id);
    if (!element) return;

    const navbarOffset = window.innerWidth >= 1024 ? 146 : 56;
    const top =
      element.getBoundingClientRect().top + window.pageYOffset - navbarOffset;

    window.scrollTo({
      top,
      behavior: "smooth",
    });

    setActiveSection(id);
    setMobileOpen(false);
  };

  const goToDonate = () => {
    setMobileOpen(false);
    navigate("/donate");
  };

  const goToGetInvolved = () => {
    setMobileOpen(false);
    navigate("/get-involved");
  };

  const goToMyJeanluc = () => {
    setMobileOpen(false);
    navigate("/my-jeanluc");
  };

  const handleDesktopHoverEnter = (id) => {
    clearCloseTimer();
    setHoveredDesktop(id);
  };

  const handleDesktopHoverLeave = () => {
    startCloseTimer();
  };

  const handleDesktopClick = (id) => {
    setHoveredDesktop(null);
    setDesktopOpen((prev) => (prev === id ? null : id));
  };

  const handleDesktopLinkClick = (id) => {
    setDesktopOpen(null);
    setHoveredDesktop(null);
    scrollToSection(id);
  };

  const toggleMobileGroup = (id) => {
    setMobileExpanded((prev) => (prev === id ? null : id));
  };

  const desktopLinkClass = (isOpen) =>
    `group relative flex items-center gap-2 text-[18px] font-normal tracking-[0.005em] transition-colors duration-200 ${
      isOpen ? "text-sky-600" : "text-slate-600 hover:text-sky-600"
    }`;

  return (
    <header className="w-full border-y border-slate-300 bg-white">
      <Container className="max-w-[1800px] px-0">
        <div className="hidden lg:block">
          <div className="flex h-[74px] items-center justify-between px-8 xl:px-14">
            <button
              type="button"
              onClick={() => scrollToSection("about")}
              className="flex items-center gap-3"
            >
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
              <button
                type="button"
                onClick={goToMyJeanluc}
                className="text-[15px] font-semibold uppercase tracking-[0.01em] text-sky-600 transition-colors duration-200 hover:text-sky-800"
              >
                My Jeanluc
              </button>

              <span className="text-slate-300">|</span>

              <a
                href="#"
                className="text-[15px] font-semibold uppercase tracking-[0.01em] text-sky-600 transition-colors duration-200 hover:text-sky-800"
              >
                Club Finder
              </a>

              <span className="text-slate-300">|</span>

              <a
                href="#"
                className="inline-flex items-center gap-1 text-[15px] font-semibold uppercase tracking-[0.01em] text-sky-600 transition-colors duration-200 hover:text-sky-800"
              >
                <Search className="h-4 w-4 stroke-[2.4]" />
                Search
              </a>

              <button
                type="button"
                onClick={goToGetInvolved}
                className="ml-2 inline-flex h-[38px] items-center justify-center rounded-full border border-sky-500 px-9 text-[15px] font-semibold uppercase tracking-[0.01em] text-sky-600 transition-all duration-300 hover:bg-sky-600 hover:text-white"
              >
                Join a Club
              </button>

              <button
                type="button"
                onClick={goToDonate}
                className="inline-flex h-[38px] items-center justify-center rounded-full bg-sky-600 px-10 text-[15px] font-semibold uppercase tracking-[0.01em] text-white shadow-sm transition-all duration-300 hover:border hover:border-sky-600 hover:bg-white hover:text-sky-600"
              >
                Donate
              </button>
            </div>
          </div>

          <div className="relative" onMouseLeave={handleDesktopHoverLeave}>
            <nav className="flex h-[72px] items-center justify-between px-8 xl:px-14">
              {navItems.map((item) => {
                const isOpen = visibleDesktopDropdown === item.id;

                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => handleDesktopHoverEnter(item.id)}
                  >
                    <button
                      type="button"
                      onClick={() => handleDesktopClick(item.id)}
                      className={desktopLinkClass(isOpen)}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                      <span
                        className={`absolute -bottom-[22px] left-1/2 h-[2px] -translate-x-1/2 bg-sky-600 transition-all duration-300 ${
                          isOpen ? "w-full" : "w-0 group-hover:w-full"
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
                  ? "pointer-events-auto max-h-[500px] opacity-100"
                  : "pointer-events-none max-h-0 opacity-0"
              }`}
            >
              <div className="grid grid-cols-6 gap-8 px-8 py-8 xl:px-14">
                {navItems.map((group) => {
                  const highlighted = visibleDesktopDropdown === group.id;

                  return (
                    <div key={group.id}>
                      <button
                        type="button"
                        onClick={() => handleDesktopLinkClick(group.id)}
                        className={`mb-4 inline-flex items-center gap-2 text-left text-[16px] font-semibold transition ${
                          highlighted
                            ? "text-sky-600"
                            : "text-slate-700 hover:text-sky-600"
                        }`}
                      >
                        {highlighted && <ChevronRight className="h-4 w-4" />}
                        <span>{group.label}</span>
                      </button>

                      <div className="space-y-3">
                        {group.pages.map((page) => (
                          <a
                            key={page}
                            href="#"
                            className="block text-[14px] leading-6 text-slate-500 transition hover:text-sky-600"
                          >
                            {page}
                          </a>
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
            className="flex h-full w-[72px] flex-col items-center justify-center border-r border-slate-300 text-slate-600 transition hover:bg-slate-50"
          >
            <Menu className="h-6 w-6 stroke-[2.1]" />
            <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.08em]">
              Menu
            </span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("about")}
            className="flex flex-1 items-center justify-center gap-2 px-3"
          >
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
            className="flex h-full w-[72px] flex-col items-center justify-center border-l border-slate-300 text-sky-500 transition hover:bg-slate-50"
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

            <div className="flex flex-1 items-center justify-center gap-2 px-3">
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
            </div>

            <div className="flex h-full w-[72px] flex-col items-center justify-center border-l border-slate-300 text-sky-500">
              <Search className="h-5 w-5 stroke-[2.3]" />
              <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.08em]">
                Search
              </span>
            </div>
          </div>

          <div className="flex h-[calc(100vh-56px)] flex-col overflow-hidden">
            <div className="shrink-0 px-0">
              <div className="grid grid-cols-2">
                <button
                  type="button"
                  onClick={goToGetInvolved}
                  className="inline-flex h-[48px] w-full items-center justify-center border-b border-r border-slate-300 bg-white text-[14px] font-bold uppercase tracking-[0.01em] text-sky-600 transition hover:bg-sky-600 hover:text-white"
                >
                  Join a Club
                </button>

                <button
                  type="button"
                  onClick={goToDonate}
                  className="inline-flex h-[48px] w-full items-center justify-center border-b border-slate-300 bg-sky-600 text-[14px] font-bold uppercase tracking-[0.01em] text-white transition-all duration-300 hover:bg-white hover:text-sky-600"
                >
                  Donate
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-7">
              <div className="mx-auto max-w-[260px] space-y-6 text-center">
                {navItems.map((item) => {
                  const expanded = mobileExpanded === item.id;
                  const isActive = activeSection === item.id;

                  return (
                    <div key={item.id}>
                      <button
                        type="button"
                        onClick={() => toggleMobileGroup(item.id)}
                        className={`mx-auto block text-center text-[18px] font-bold tracking-tight transition ${
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

                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          expanded
                            ? "mt-4 max-h-[420px] opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="space-y-3">
                          {item.pages.map((page, index) => (
                            <button
                              key={page}
                              type="button"
                              onClick={() => {
                                if (index === 0) {
                                  scrollToSection(item.id);
                                  setMobileOpen(false);
                                }
                              }}
                              className="block w-full text-center text-[16px] leading-8 text-[#5d7287] transition hover:text-sky-600"
                            >
                              {page}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="mt-10 border-t border-[#d9dee3] pt-5">
                  <button
                    type="button"
                    onClick={goToMyJeanluc}
                    className="block w-full text-[13px] font-bold uppercase tracking-[0.03em] text-sky-600 transition hover:text-sky-800"
                  >
                    My Jeanluc
                  </button>

                  <a
                    href="#"
                    className="mt-4 block text-[13px] font-bold uppercase tracking-[0.03em] text-sky-600 transition hover:text-sky-800"
                  >
                    Club Finder
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}