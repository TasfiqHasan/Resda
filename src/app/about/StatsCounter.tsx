"use client";

import { useEffect, useState, useRef } from "react";
import { Users, BookOpen, Briefcase, Award } from "lucide-react";

interface StatItem {
  id: string;
  target: number;
  suffix: string;
  label: string;
  sublabel: string;
  icon: typeof Users;
}

const statsData: StatItem[] = [
  {
    id: "students",
    target: 500,
    suffix: "+",
    label: "Students Trained",
    sublabel: "Equipped with industry-ready skills",
    icon: Users,
  },
  {
    id: "courses",
    target: 50,
    suffix: "+",
    label: "Courses Offered",
    sublabel: "Foundational to advanced tech tracks",
    icon: BookOpen,
  },
  {
    id: "projects",
    target: 100,
    suffix: "+",
    label: "Projects Delivered",
    sublabel: "Enterprise software & client solutions",
    icon: Briefcase,
  },
  {
    id: "trainers",
    target: 15,
    suffix: "+",
    label: "Expert Trainers",
    sublabel: "Senior industry practitioners & leads",
    icon: Award,
  },
];

export function StatsCounter() {
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if element is in viewport or trigger after mount
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    const duration = 1800; // ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      const nextCounts = statsData.map((stat) =>
        Math.floor(stat.target * easeProgress)
      );

      setCounts(nextCounts);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCounts(statsData.map((stat) => stat.target));
      }
    };

    const frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [hasAnimated]);

  return (
    <div ref={containerRef} className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          const displayValue = counts[index];

          return (
            <div
              key={stat.id}
              className="relative group bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/15 hover:border-accent/40 hover:bg-white/15 transition-all duration-300 shadow-lg shadow-black/10"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative flex flex-col items-center text-center">
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-accent mb-4 group-hover:scale-110 group-hover:bg-accent group-hover:text-primary-900 transition-all duration-300">
                  <Icon className="w-7 h-7" />
                </div>

                {/* Counter Number */}
                <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight flex items-center justify-center gap-0.5">
                  <span>{displayValue}</span>
                  <span className="text-accent">{stat.suffix}</span>
                </div>

                {/* Label */}
                <h3 className="text-lg font-bold text-white mt-2">
                  {stat.label}
                </h3>

                {/* Subtitle */}
                <p className="text-sm text-primary-100/80 mt-1 max-w-[200px]">
                  {stat.sublabel}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
