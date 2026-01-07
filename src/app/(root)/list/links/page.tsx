'use client'
import { useState } from "react";

type ColorOption = {
  label: string;
  hex: string;
};

type PricingTier = {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  originalPrice: string;
  image: string;
  colorSlots: number;
  isPopular?: boolean;
  badge?: string;
};

const availableColors: ColorOption[] = [
  { label: "Black", hex: "#000000" },
  { label: "Dark Brown", hex: "#3B2F1B" },
  { label: "Grey", hex: "#9B9B9B" },
  { label: "Blonde", hex: "#F1D88B" },
  { label: "Light Brown", hex: "#A76B3B" },
  { label: "Medium Brown", hex: "#7A492F" },
];

export default function PricingTiers() {
  const [selectedTier, setSelectedTier] = useState("tier-3");
  const [selectedColors, setSelectedColors] = useState<Record<string, string[]>>({
    "tier-1": ["Black"],
    "tier-2": ["Black", "Black"],
    "tier-3": ["Black", "Black", "Black"],
  });

  const tiers: PricingTier[] = [
    {
      id: "tier-1",
      title: "Basic - 1 Pot",
      subtitle: "1 Month Supply",
      price: "$34.00",
      originalPrice: "$40.00",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/6f001f7b1ee8153244435eb9b3204872bc3f6bbf?width=100",
      colorSlots: 1,
    },
    {
      id: "tier-2",
      title: "Basic - 2 Pot",
      subtitle: "2 Month Supply",
      price: "$68.00",
      originalPrice: "$80.00",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/624128c0b466ef58304a25495ce9337ab2da4220?width=100",
      colorSlots: 2,
    },
    {
      id: "tier-3",
      title: "Buy 2 Get 1 Free",
      subtitle: "3 Months Supply - $22.67 / pot",
      price: "$68.00",
      originalPrice: "$120.00",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/624128c0b466ef58304a25495ce9337ab2da4220?width=100",
      colorSlots: 3,
      isPopular: true,
      badge: "LIMITED - SAVE $52.00",
    },
  ];

  const handleColorChange = (tierId: string, slotIndex: number, colorLabel: string) => {
    setSelectedColors((prev) => {
      const tierColors = [...(prev[tierId] || [])];
      tierColors[slotIndex] = colorLabel;
      return { ...prev, [tierId]: tierColors };
    });
  };

  const getSelectedColor = (tierId: string, slotIndex: number): ColorOption => {
    const colorLabel = selectedColors[tierId]?.[slotIndex] || "Black";
    return availableColors.find((c) => c.label === colorLabel) || availableColors[0];
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="h-0.5 flex-1 bg-[rgba(57,68,220,0.3)]" />
        <span className="text-black text-center font-dm-sans text-sm font-bold">
          Get More, Pay Less
        </span>
        <div className="h-0.5 flex-1 bg-[rgba(57,68,220,0.3)]" />
      </div>

      <div className="flex flex-col gap-3">
        {tiers.map((tier) => {
          const isSelected = selectedTier === tier.id;
          return (
            <div
              key={tier.id}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { setSelectedTier(tier.id); } }}
              onClick={() => setSelectedTier(tier.id)}
              className={`flex flex-col py-2 px-4 rounded-[10px] transition-all text-left focus:outline-none ${
                isSelected
                  ? tier.isPopular
                    ? "bg-[#E3E9FF] shadow-[inset_0_0_0_2px_rgba(57,68,220,1),_0_2px_6px_rgba(0,0,0,0.08)]"
                    : "bg-white shadow-[inset_0_0_0_2px_rgba(57,68,220,1),_0_2px_6px_rgba(0,0,0,0.08)]"
                  : "bg-white shadow-[inset_0_0_0_1px_rgba(57,68,220,0.3),_0_1px_2px_rgba(0,0,0,0.3)] hover:shadow-[inset_0_0_0_2px_rgba(57,68,220,0.3),_0_1px_2px_rgba(0,0,0,0.3)]"
              }`}
            >
              <div className="flex items-center gap-[18px]">
                <img
                  src={tier.image}
                  alt={tier.title}
                  className="w-[50px] h-[50px] rounded-sm object-cover"
                />

                <div className="flex flex-col items-start gap-0.5 flex-1">
                  <div className="flex items-start gap-2 w-full">
                    <span className="text-[#102173] font-dm-sans text-base font-bold tracking-[0.32px]">
                      {tier.title}
                    </span>
                    {tier.badge && (
                      <div className="flex px-2 py-1 justify-center items-center rounded-lg bg-white">
                        <span className="text-[#0B0B0B] font-dm-sans text-xs font-medium">
                          {tier.badge}
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="text-[#5D6DC3] font-dm-sans text-[13px] font-normal">
                    {tier.subtitle}
                  </span>
                </div>

                <div className="flex flex-col items-end gap-0.5 w-[60px]">
                  <span className="text-[#102173] text-right font-dm-sans text-[17px] font-bold">
                    {tier.price}
                  </span>
                  <span className="text-[#7A7A7A] text-right font-dm-sans text-[13px] font-normal line-through">
                    {tier.originalPrice}
                  </span>
                </div>
              </div>

              <div className="flex flex-col mt-3">
                <div className="flex h-[22px] flex-col justify-center">
                  <span className="text-[#5D6DC3] font-dm-sans text-xs font-normal">
                    Colour
                  </span>
                </div>

                <div className="flex flex-col gap-1 mt-1">
                  {[...Array(tier.colorSlots)].map((_, slotIndex) => {
                    const selectedColor = getSelectedColor(tier.id, slotIndex);
                    return (
                      <div
                        key={slotIndex}
                        className="flex items-center gap-0.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {tier.colorSlots > 1 && (
                          <div className="w-5 text-[#102173] font-dm-sans text-xs font-normal">
                            #{slotIndex + 1}
                          </div>
                        )}

                        <div className="relative inline-block">
                          {/* Custom dropdown to show color preview inside options */}
                          <div className="relative inline-block text-left" onClick={(e) => e.stopPropagation()}>
                            <div
                              role="button"
                              tabIndex={0}
                              onClick={(e) => {
                                e.stopPropagation();
                                const el = (e.currentTarget.nextElementSibling as HTMLElement);
                                if (el) el.classList.toggle("hidden");
                              }}
                              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); const el = (e.currentTarget.nextElementSibling as HTMLElement); if (el) el.classList.toggle("hidden"); } }}
                              className="inline-flex items-center gap-2.5 py-1.5 pr-3 pl-10 rounded-[6px] border border-[#B1B1B1] bg-white font-dm-sans text-sm text-black cursor-pointer focus:outline-none"
                            >
                              <span
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full"
                                style={{ backgroundColor: selectedColor.hex }}
                              />
                              <span className="pl-1">{selectedColor.label}</span>
                              <svg className="ml-2" width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.89746 3.75L7.79457 0H0.000346661L3.89746 3.75Z" fill="black" />
                              </svg>
                            </div>

                            <div className="absolute z-50 mt-1 hidden bg-white border border-[#E6E6E6] rounded shadow-lg min-w-[140px]">
                              {availableColors.map((color) => (
                                <div
                                  key={color.label}
                                  role="option"
                                  tabIndex={0}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleColorChange(tier.id, slotIndex, color.label);
                                    const el = (e.currentTarget.parentElement as HTMLElement);
                                    if (el) el.classList.add("hidden");
                                  }}
                                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); handleColorChange(tier.id, slotIndex, color.label); const el = (e.currentTarget.parentElement as HTMLElement); if (el) el.classList.add('hidden'); } }}
                                  className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-3"
                                >
                                  <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: color.hex }} />
                                  <span className="text-sm font-dm-sans">{color.label}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
