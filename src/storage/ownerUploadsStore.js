export const OWNER_UPLOADS_KEY = "ownerUploadList";

const safeJsonParse = (value, fallback) => {
  try {
    return JSON.parse(value ?? "");
  } catch {
    return fallback;
  }
};

export const createUploadId = () =>
  `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const defaultOwnerUploads = [
  {
    id: "demo_upl_001",
    type: "Music",
    song: "Neon Skyline",
    affiliateLink: "https://copyva.com/search/music?ref=neon-skyline",
    artistName: "Ava Rivers",
    copyrightOwner: "EchoTune Records",
  },
  {
    id: "demo_upl_002",
    type: "Music",
    song: "Midnight Drive",
    affiliateLink: "https://copyva.com/search/music?ref=midnight-drive",
    artistName: "Kairo Wave",
    copyrightOwner: "WaveSound Ltd",
  },
  {
    id: "demo_upl_003",
    type: "Content",
    song: "Cafe Promo Reel",
    affiliateLink: "https://copyva.com/search/content?ref=cafe-promo",
    artistName: "Studio North",
    copyrightOwner: "Studio North",
  },
  {
    id: "demo_upl_004",
    type: "Music",
    song: "Sunrise Chill",
    affiliateLink: "https://copyva.com/search/music?ref=sunrise-chill",
    artistName: "Luna & Co.",
    copyrightOwner: "Luna & Co.",
  },
  {
    id: "demo_upl_005",
    type: "Content",
    song: "Fitness Launch Teaser",
    affiliateLink: "https://copyva.com/search/content?ref=fitness-launch",
    artistName: "Motion Lab",
    copyrightOwner: "Motion Lab",
  },
  {
    id: "demo_upl_006",
    type: "Music",
    song: "Afterglow",
    affiliateLink: "https://copyva.com/search/music?ref=afterglow",
    artistName: "Kairo Wave",
    copyrightOwner: "WaveSound Ltd",
  },
];

export const getOwnerUploads = () => {
  const raw = localStorage.getItem(OWNER_UPLOADS_KEY);
  const parsed = safeJsonParse(raw, null);
  const list = Array.isArray(parsed) ? parsed : [];
  return list.length ? list : defaultOwnerUploads;
};

export const saveOwnerUploads = (uploads) => {
  const list = Array.isArray(uploads) ? uploads : [];
  localStorage.setItem(OWNER_UPLOADS_KEY, JSON.stringify(list));
};

export const prependOwnerUpload = (item) => {
  const normalized = { id: createUploadId(), ...item };

  const raw = localStorage.getItem(OWNER_UPLOADS_KEY);
  const parsed = safeJsonParse(raw, null);
  const existing = Array.isArray(parsed) && parsed.length ? parsed : defaultOwnerUploads;

  const next = [normalized, ...existing];
  saveOwnerUploads(next);
  return normalized;
};

