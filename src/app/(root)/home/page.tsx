import React from "react";
import homeBlocksConfig from "@/config/home-blocks.json";
import { ImageConverterCard } from "@/components/home/ImageConverterCard";

interface BlockConfig {
  id: string;
  type: string;
  title: string;
  description: string;
  url?: string;
  icon?: string;
  size: "small" | "medium" | "large";
  stats?: {
    count: number;
    label: string;
  };
  status?: {
    progress: number;
    label: string;
  };
  items?: string[];
}

interface HomeBlocksConfig {
  blocks: BlockConfig[];
  layout: {
    columns: number;
    gap: string;
    maxWidth: string;
  };
  styles: {
    cardBase: string;
    titleBase: string;
    descriptionBase: string;
  };
}

const config = homeBlocksConfig as HomeBlocksConfig;

const warmColors = [
  "bg-orange-400 hover:bg-orange-500",
  "bg-amber-400 hover:bg-amber-500",
  "bg-yellow-400 hover:bg-yellow-500",
  "bg-red-400 hover:bg-red-500",
  "bg-rose-400 hover:bg-rose-500",
  "bg-pink-400 hover:bg-pink-500",
  "bg-fuchsia-400 hover:bg-fuchsia-500",
  "bg-purple-400 hover:bg-purple-500",
  "bg-violet-400 hover:bg-violet-500",
  "bg-indigo-400 hover:bg-indigo-500",
];

const getRandomWarmColor = () => {
  return warmColors[Math.floor(Math.random() * warmColors.length)];
};

const getColorClasses = (color: string) => {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-500 hover:bg-blue-600 text-white",
    green: "bg-green-500 hover:bg-green-600 text-white",
    purple: "bg-purple-500 hover:bg-purple-600 text-white",
    orange: "bg-orange-500 hover:bg-orange-600 text-white",
    indigo: "bg-indigo-500 hover:bg-indigo-600 text-white",
  };
  return colorMap[color] || "bg-gray-500 hover:bg-gray-600 text-white";
};

const getSizeClasses = (size: string) => {
  const sizeMap: Record<string, string> = {
    small: "p-4 h-32",
    medium: "p-6 h-40",
    large: "p-8 h-48",
  };
  return sizeMap[size] || "p-6 h-40";
};

const getIconComponent = (icon: string) => {
  const iconMap: Record<string, JSX.Element> = {
    gitlab: (
      <svg className="w-8 h-8 mb-3" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 24l-4.09-12.61h8.18L12 24z" />
        <path d="M12 24L2.47 6.31h19.06L12 24z" />
        <path d="M2.47 6.31L0 12.61l12 11.39L2.47 6.31z" />
        <path d="M21.53 6.31L24 12.61l-12 11.39L21.53 6.31z" />
        <path d="M12 24l4.09-12.61H3.91L12 24z" opacity="0.7" />
      </svg>
    ),
    book: (
      <svg className="w-8 h-8 mb-3" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.5a9.5 9.5 0 0 1 9.5 9.5c0 2.5-1 4.8-2.6 6.4l-6.9 6.9-6.9-6.9A9.5 9.5 0 0 1 2.5 12 9.5 9.5 0 0 1 12 2.5m0 2a7.5 7.5 0 0 0-7.5 7.5c0 1.9.7 3.7 2 5l5.5 5.5 5.5-5.5c1.3-1.3 2-3.1 2-5a7.5 7.5 0 0 0-7.5-7.5m0 3a4.5 4.5 0 0 1 4.5 4.5 4.5 4.5 0 0 1-4.5 4.5A4.5 4.5 0 0 1 7.5 12 4.5 4.5 0 0 1 12 7.5z" />
      </svg>
    ),
    users: (
      <svg className="w-8 h-8 mb-3" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V18c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V18c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5z" />
      </svg>
    ),
    progress: (
      <svg className="w-8 h-8 mb-3" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.48 2.54l2.6 1.53c.56-1.24.88-2.62.88-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.06.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z" />
      </svg>
    ),
    update: (
      <svg className="w-8 h-8 mb-3" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21 10.12h-6.34l2.12-2.12-1.41-1.41L12 10.12 7.62 5.73 6.21 7.14l2.12 2.12H3v3h6.34l-2.12 2.12 1.41 1.41L12 13.88l4.38 4.38 1.41-1.41L10.66 13.12H21z" />
      </svg>
    ),
  };
  return iconMap[icon] || null;
};

const LinkCard: React.FC<{ block: BlockConfig }> = ({ block }) => {
  const isExternal = block.url?.startsWith("http");
  const cardColor = getRandomWarmColor();

  const cardContent = (
    <div
      className={`${
        config.styles.cardBase
      } ${cardColor} text-white ${getSizeClasses(
        block.size
      )} cursor-pointer backdrop-blur-sm bg-opacity-90 border border-white border-opacity-20`}
    >
      {block.icon && getIconComponent(block.icon)}
      <h3
        className={`${config.styles.titleBase} ${
          block.icon ? "text-base" : "text-lg"
        } font-bold`}
      >
        {block.title}
      </h3>
      <p
        className={`${config.styles.descriptionBase} text-xs ${
          block.icon ? "hidden sm:block" : ""
        } opacity-90`}
      >
        {block.description}
      </p>
    </div>
  );

  if (block.url) {
    return isExternal ? (
      <a href={block.url} target="_blank" rel="noopener noreferrer">
        {cardContent}
      </a>
    ) : (
      <a href={block.url}>{cardContent}</a>
    );
  }

  return cardContent;
};

const InfoCard: React.FC<{ block: BlockConfig }> = ({ block }) => {
  const cardColor = getRandomWarmColor();
  return (
    <div
      className={`${
        config.styles.cardBase
      } ${cardColor} text-white ${getSizeClasses(
        block.size
      )} backdrop-blur-sm bg-opacity-90 border border-white border-opacity-20`}
    >
      {block.icon && getIconComponent(block.icon)}
      <h3
        className={`${config.styles.titleBase} ${
          block.icon ? "text-base" : "text-lg"
        } font-bold`}
      >
        {block.title}
      </h3>
      <p
        className={`${config.styles.descriptionBase} text-xs ${
          block.icon ? "hidden sm:block" : ""
        } opacity-90`}
      >
        {block.description}
      </p>
      {block.stats && (
        <div className="mt-3">
          <div className="text-2xl font-bold">{block.stats.count}</div>
          <div className="text-xs opacity-90">{block.stats.label}</div>
        </div>
      )}
    </div>
  );
};

const StatusCard: React.FC<{ block: BlockConfig }> = ({ block }) => {
  const cardColor = getRandomWarmColor();
  return (
    <div
      className={`${
        config.styles.cardBase
      } ${cardColor} text-white ${getSizeClasses(
        block.size
      )} backdrop-blur-sm bg-opacity-90 border border-white border-opacity-20`}
    >
      {block.icon && getIconComponent(block.icon)}
      <h3
        className={`${config.styles.titleBase} ${
          block.icon ? "text-base" : "text-lg"
        } font-bold`}
      >
        {block.title}
      </h3>
      {block.status && (
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs opacity-90">{block.status.label}</span>
            <span className="text-sm font-semibold">
              {block.status.progress}%
            </span>
          </div>
          <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full transition-all duration-500"
              style={{ width: `${block.status.progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

const ListCard: React.FC<{ block: BlockConfig }> = ({ block }) => {
  const cardColor = getRandomWarmColor();
  return (
    <div
      className={`${
        config.styles.cardBase
      } ${cardColor} text-white ${getSizeClasses(
        block.size
      )} backdrop-blur-sm bg-opacity-90 border border-white border-opacity-20`}
    >
      {block.icon && getIconComponent(block.icon)}
      <h3
        className={`${config.styles.titleBase} ${
          block.icon ? "text-base" : "text-lg"
        } font-bold`}
      >
        {block.title}
      </h3>
      {block.items && (
        <ul className="mt-3 space-y-1">
          {block.items.slice(0, 3).map((item, index) => (
            <li key={index} className="text-xs opacity-90 flex items-center">
              <span className="w-1 h-1 bg-white rounded-full mr-2"></span>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const BlockCard: React.FC<{ block: BlockConfig }> = ({ block }) => {
  switch (block.type) {
    case "link-card":
      return <LinkCard block={block} />;
    case "info-card":
      return <InfoCard block={block} />;
    case "status-card":
      return <StatusCard block={block} />;
    case "list-card":
      return <ListCard block={block} />;
    case "image-converter":
      return <ImageConverterCard block={block} />;
    default:
      return <LinkCard block={block} />;
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-r from-orange-50 via-amber-50 to-yellow-50 py-8 px-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {config.blocks.map((block) => (
            <BlockCard key={block.id} block={block} />
          ))}
        </div>
      </div>
    </div>
  );
}
