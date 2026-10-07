"use client";

import { useState } from "react";
import { Laptop, TrendingUp, Layers, Users, Sparkles, Check } from "lucide-react";

export default function FeatureTabs({ content }: { content?: any }) {
  const [activeTab, setActiveTab] = useState(3); // Default to Team management matching screenshot 4

  const title = content?.title || "Built for high performance";
  const subtitle =
    content?.subtitle ||
    "Grovia gives your team everything it needs to stay aligned, track performance, and scale with confidence — all in one place.";

  const defaultTabs = [
    {
      id: "portal",
      label: "Client portal",
      icon: Laptop,
      badge: "CLIENT PORTAL",
      title: "Seamless client experience",
      description:
        "Provide customers with an interactive, branded portal to review proposals, track itinerary changes, and sign off with zero back-and-forth friction.",
      mockupType: "portal",
    },
    {
      id: "kpi",
      label: "KPI tracking",
      icon: TrendingUp,
      badge: "KPI TRACKING",
      title: "Real-time performance metrics",
      description:
        "Gain instant visibility into booking volumes, profit margins, and supplier disbursements with automated currency indexing and live analytics.",
      mockupType: "kpi",
    },
    {
      id: "automation",
      label: "Workflow automation",
      icon: Layers,
      badge: "WORKFLOW AUTOMATION",
      title: "Smart operational automation",
      description:
        "Transform proposals into active projects in one click, sync rooming sheets to flight itineraries, and alert dispatchers to vehicle capacity constraints automatically.",
      mockupType: "automation",
    },
    {
      id: "team",
      label: "Team management",
      icon: Users,
      badge: "TEAM MANAGEMENT",
      title: "Built for growing teams",
      description:
        "Easily onboard new members, assign roles, and manage access. Keep your organization structured and scalable from day one.",
      mockupType: "team",
    },
  ];

  const icons = [Laptop, TrendingUp, Layers, Users];
  const rawTabs = content?.tabs && content.tabs.length > 0 ? content.tabs : defaultTabs;
  const tabs = rawTabs.map((t: any, i: number) => ({
    id: t.id || defaultTabs[i % defaultTabs.length].id,
    label: t.label || defaultTabs[i % defaultTabs.length].label,
    icon: icons[i % icons.length],
    badge: (t.label || defaultTabs[i % defaultTabs.length].label).toUpperCase(),
    title: t.title || defaultTabs[i % defaultTabs.length].title,
    description: t.description || defaultTabs[i % defaultTabs.length].description,
    mockupType: defaultTabs[i % defaultTabs.length].mockupType,
  }));

  const currentTab = tabs[activeTab] || tabs[0] || defaultTabs[3];

  return (
    <section id="features" className="py-20 sm:py-28 bg-[#F4F2EE] relative">
      <div className="grovia-container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 className="custom-section-title text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#1A1A1A] mb-4 leading-tight">
            {title}
          </h2>
          <p className="custom-section-sub text-base sm:text-lg text-[#7A7570] leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Tab Selector Pills Bar matching Grovia Screenshot 4 */}
        <div className="flex items-center justify-center mb-8 sm:mb-12">
          <div className="bg-[#EBE7E2] p-1.5 rounded-full flex items-center gap-1 sm:gap-1.5 overflow-x-auto max-w-full shadow-inner border border-[#E0DBD4]">
            {tabs.map((tab: any, idx: number) => {
              const Icon = tab.icon;
              const isActive = activeTab === idx;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(idx)}
                  className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0 active:scale-95 cursor-pointer ${
                    isActive
                      ? "bg-white text-[#1A1A1A] shadow-[0_2px_10px_rgba(0,0,0,0.08)] border border-[#DDD8D2]"
                      : "text-[#7A7570] hover:text-[#1A1A1A] hover:bg-white/60"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-[#1A1A1A]" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Large Feature Card matching Grovia Screenshot 4 with Spring Animation */}
        <div
          key={activeTab}
          className="bg-white rounded-[2.5rem] p-7 sm:p-12 md:p-16 border border-[#E6E1DC] shadow-[0_15px_40px_rgba(0,0,0,0.03)] grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center max-w-5xl mx-auto animate-grovia-fade"
        >
          {/* Left Column: UI Mockup with Floating Invite Pill */}
          <div className="md:col-span-6 relative pt-4">
            {/* Ambient Dark Gradient Container */}
            <div className="bg-gradient-to-br from-[#2D313A] via-[#353944] to-[#20232A] p-3 sm:p-4 rounded-3xl relative shadow-xl">
              {/* Floating Invite Pill */}
              <div className="absolute -top-4 left-6 sm:left-8 z-20 inline-flex items-center gap-2 bg-[#1A1A1A] text-white px-3.5 py-1.5 rounded-full shadow-lg border border-white/20">
                <span className="text-xs font-medium flex items-center gap-1.5">
                  <span className="text-[14px] leading-none">+</span> Invite
                </span>
                <div className="flex -space-x-1.5 ml-1">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80"
                    alt="User"
                    className="w-4 h-4 rounded-full border border-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80"
                    alt="User"
                    className="w-4 h-4 rounded-full border border-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&auto=format&fit=crop&q=80"
                    alt="User"
                    className="w-4 h-4 rounded-full border border-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60&auto=format&fit=crop&q=80"
                    alt="User"
                    className="w-4 h-4 rounded-full border border-white object-cover"
                  />
                  <span className="w-4 h-4 rounded-full bg-white/20 text-white text-[8px] flex items-center justify-center font-mono">
                    +2
                  </span>
                </div>
              </div>

              {/* White Inner Card */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 pt-7 sm:pt-8 space-y-4 shadow-sm">
                <div className="w-5 h-5 rounded-md bg-[#FAF5F0] flex items-center justify-center text-[#E07A5F]">
                  <Sparkles className="w-3.5 h-3.5 fill-[#E07A5F]" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] tracking-tight">
                  {currentTab.mockupType === "team"
                    ? "Welcome!"
                    : currentTab.mockupType === "kpi"
                    ? "Live KPI Board"
                    : currentTab.mockupType === "automation"
                    ? "Active Pipeline"
                    : "Client Space"}
                </h3>

                {/* Form fields mockup */}
                <div className="space-y-3 pt-1">
                  <div>
                    <label className="text-[11px] font-medium text-[#7A7570] block mb-1">
                      {currentTab.mockupType === "team" ? "Username" : "Workspace / Group"}
                    </label>
                    <div className="bg-[#FAF9F6] border border-[#EDE8E3] rounded-lg px-3.5 py-2 text-xs text-[#A09A93]">
                      {currentTab.mockupType === "team" ? "Your username" : "MICE Operations 2026"}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-[#7A7570] block mb-1">
                      {currentTab.mockupType === "team" ? "Email" : "Assigned Manager"}
                    </label>
                    <div className="bg-[#FAF9F6] border border-[#EDE8E3] rounded-lg px-3.5 py-2 text-xs text-[#A09A93]">
                      {currentTab.mockupType === "team" ? "Your email" : "mert@tempustravel.com"}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-[#7A7570] block mb-1">
                      {currentTab.mockupType === "team" ? "Password" : "Status & Key"}
                    </label>
                    <div className="bg-[#FAF9F6] border border-[#EDE8E3] rounded-lg px-3.5 py-2 text-xs text-[#A09A93]">
                      ••••••••••••••••
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Yellow Tag & Content */}
          <div className="md:col-span-6 space-y-4">
            <span className="inline-block bg-[#FEF7AF] text-[#594C00] text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              {currentTab.badge}
            </span>
            <h3 className="custom-card-title text-3xl sm:text-4xl font-normal text-[#1A1A1A] tracking-tight leading-tight">
              {currentTab.title}
            </h3>
            <p className="text-sm sm:text-base text-[#7A7570] leading-relaxed max-w-md">
              {currentTab.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
