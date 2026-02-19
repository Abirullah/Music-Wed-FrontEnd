import React, { useEffect, useMemo, useState } from "react";

import {
  amazonMusic,
  FeaturesIcon,
  appleIcon,
  spotifyIcon,
  youtubeIcon,
  jioSaavnIcon,
  wynkmMusicIcon,
} from "../../assets/Icons/IconExporter";
import { fetchTopOwnerInsights } from "../../src/api/catalog";
import { getCurrentUser } from "../../src/utils/session";

const formatCurrencyUsd = (value = 0) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value || 0);

function MiniOwnerChart({ labels = [], series = [] }) {
  const width = 360;
  const height = 180;
  const paddingX = 16;
  const paddingY = 14;

  const max = Math.max(...series, 1);
  const min = Math.min(...series, 0);
  const range = max - min || 1;

  const stepX = labels.length > 1 ? (width - paddingX * 2) / (labels.length - 1) : 0;

  const points = series
    .map((value, index) => {
      const x = paddingX + index * stepX;
      const y = paddingY + (height - paddingY * 2) * (1 - (value - min) / range);
      return `${x},${y}`;
    })
    .join(" ");

  const area = `${paddingX},${height - paddingY} ${points} ${
    paddingX + (labels.length - 1) * stepX
  },${height - paddingY}`;

  return (
    <div className="rounded-2xl border border-yellow-400/30 bg-black p-4">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-44 w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="topOwnerFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFD43B" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FFD43B" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        <polyline points={area} fill="url(#topOwnerFill)" stroke="none" />
        <polyline
          points={points}
          fill="none"
          stroke="#FFD43B"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>

      <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
        {labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}

function CompanyAndOurContant() {
  const currentUser = useMemo(() => getCurrentUser(), []);
  const [insights, setInsights] = useState(null);

  const features = [
    {
      title: "One dashboard for songs and content",
      desc: "Track uploads, payments and ownership status from one place without switching tools.",
    },
    {
      title: "Live sales visibility",
      desc: "Monitor monthly license sales in real-time and compare content vs song performance instantly.",
    },
    {
      title: "Faster complaint resolution",
      desc: "Receive piracy reports with uploader and item details so your response team can act quickly.",
    },
    {
      title: "Smarter publishing workflow",
      desc: "Save metadata, links and pricing in one flow to keep your catalog clean and searchable.",
    },
    {
      title: "Built for creators at scale",
      desc: "From first upload to enterprise library management, every step is optimized for growth.",
    },
  ];

  const icons = [amazonMusic, appleIcon, spotifyIcon, youtubeIcon, jioSaavnIcon, wynkmMusicIcon];

  useEffect(() => {
    let active = true;

    const loadTopOwnerInsights = async () => {
      try {
        const response = await fetchTopOwnerInsights();
        if (!active) return;
        const normalized = response?.data && typeof response.data === "object"
          ? response.data
          : response;
        setInsights(normalized || null);
      } catch {
        if (!active) return;
        setInsights(null);
      }
    };

    loadTopOwnerInsights();

    return () => {
      active = false;
    };
  }, []);

  const ownerName = useMemo(() => {
    const candidates = [
      insights?.owner?.name,
      insights?.owner?.fullName,
      insights?.ownerName,
      insights?.topOwnerName,
      insights?.name,
      currentUser?.fullName,
    ];

    const resolved = candidates.find(
      (value) => typeof value === "string" && value.trim().length,
    );

    return resolved || "Top Owner";
  }, [insights, currentUser?.fullName]);
  const labels = useMemo(() => {
    const raw = Array.isArray(insights?.labels) ? insights.labels : [];
    return raw.length ? raw.slice(0, 6) : ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  }, [insights?.labels]);

  const series = useMemo(() => {
    const raw = Array.isArray(insights?.series) ? insights.series : [];
    return raw.length ? raw.slice(0, 6) : [0, 0, 0, 0, 0, 0];
  }, [insights?.series]);

  return (
    <>
      <div className="w-full min-h-[20vh] top-20 py-20 flex justify-center item-center">
        <div className="md:w-[80%] w-[90%]  flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2 flex items-center">
            <h2 className="text-2xl text-center text-bold w-full md:text-3xl lg:text-4xl font-extrabold leading-tight">
              Trusted by world best companies and creative professional
            </h2>
          </div>

          <div className="lg:w-1/2 grid grid-cols-2 sm:grid-cols-3 gap-1">
            {icons.map((item) => (
              <div
                key={item}
                className="w-full h-20 md:h-24 lg:h-25  overflow-hidden bg-gray-200"
              >
                <img
                  src={item}
                  alt="product"
                  className="w-full h-full object-cover p-2  scale-95 hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full mb-15 flex justify-center items-center px-4 sm:px-6">
        <div className="w-full max-w-[1500px] bg-black text-white rounded-2xl lg:rounded-3xl px-6 sm:px-8 md:px-12 py-8 md:py-10 flex flex-col gap-10">
          <div className="flex flex-col items-center text-center gap-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold max-w-3xl">
              Manage All Your Music & Content At One Place
            </h2>
            <p className="text-gray-400 max-w-2xl text-sm sm:text-base md:text-lg">
              Manage uploads, licensing, payments and complaint tracking from one clean workspace designed for creators.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
            <div className="lg:w-1/2 flex flex-col gap-6">
              {features.map((item, index) => (
                <div
                  key={index}
                  tabIndex={0}
                  className="group border-l-2 border-transparent pl-4 hover:border-yellow-400 focus-within:border-yellow-400 transition-all duration-300"
                >
                  <div className="flex gap-2 items-center">
                    <img src={FeaturesIcon} alt="" className="w-4 h-4 sm:w-5 sm:h-5" />
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold">{item.title}</h3>
                  </div>

                  <div className="mt-2 text-sm text-gray-400 max-w-[95%] md:mt-0 md:max-h-0 md:overflow-hidden md:opacity-0 md:group-hover:mt-2 md:group-hover:max-h-24 md:group-hover:opacity-100 md:group-focus-within:mt-2 md:group-focus-within:max-h-24 md:group-focus-within:opacity-100 transition-all duration-300">
                    <p>{item.desc}</p>
                    <a href="#" className="inline-block text-yellow-400 mt-3">
                      Get Started
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full lg:w-1/2">
              <div className="rounded-2xl border border-yellow-400/25 bg-gradient-to-br from-yellow-500/10 to-transparent p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-yellow-400">Top owner performance</p>
                    <h3 className="text-lg font-bold text-white">{ownerName}</h3>
                  </div>
                  <div className="rounded-full bg-yellow-400 px-3 py-1 text-xs font-semibold text-black">
                    {insights?.year || new Date().getFullYear()}
                  </div>
                </div>

                <MiniOwnerChart labels={labels} series={series} />

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-gray-400">Total sales</p>
                    <p className="text-lg font-bold text-white">{insights?.totalSales || 0}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-gray-400">Total revenue</p>
                    <p className="text-lg font-bold text-white">
                      {formatCurrencyUsd(insights?.totalRevenue || 0)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompanyAndOurContant;
