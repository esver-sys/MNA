"use client";

import React from "react";
import { Minus, Plus } from "lucide-react";

interface FeatureTargetPanelProps {
  title: string;
  description: string;
  values: string[];
  placeholder: string;
  disabled?: boolean;
  onChange: (values: string[]) => void;
}

export function FeatureTargetPanel({
  title,
  description,
  values,
  placeholder,
  disabled = false,
  onChange,
}: FeatureTargetPanelProps) {
  const normalizedValues = values.length > 0 ? values : [""];

  function handleValueChange(index: number, nextValue: string) {
    const nextValues = [...normalizedValues];
    nextValues[index] = nextValue;
    onChange(nextValues);
  }

  function handleAddRow() {
    onChange([...normalizedValues, ""]);
  }

  function handleRemoveRow(index: number) {
    if (normalizedValues.length === 1) {
      onChange([""]);
      return;
    }

    onChange(normalizedValues.filter((_, rowIndex) => rowIndex !== index));
  }

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-100">{title}</h3>
        <p className="mt-1 text-xs leading-5 text-slate-400">{description}</p>
      </div>

      <div className="space-y-3">
        {normalizedValues.map((value, index) => (
          <div key={`${title}-${index}`} className="flex items-center gap-2">
            <input
              type="text"
              value={value}
              disabled={disabled}
              placeholder={placeholder}
              onChange={(event) => handleValueChange(index, event.target.value)}
              className="h-10 flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-blue-400 disabled:cursor-not-allowed disabled:opacity-70"
            />
            <button
              type="button"
              onClick={() => handleRemoveRow(index)}
              disabled={disabled}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-950 text-slate-300 transition hover:border-slate-500 hover:text-white disabled:cursor-not-allowed disabled:border-slate-800 disabled:text-slate-600"
              aria-label={`删除${title}第 ${index + 1} 项`}
            >
              <Minus className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleAddRow}
        disabled={disabled}
        className="mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-dashed border-slate-700 px-3 text-sm font-medium text-slate-300 transition hover:border-slate-500 hover:text-white disabled:cursor-not-allowed disabled:border-slate-800 disabled:text-slate-600"
      >
        <Plus className="h-4 w-4" />
        新增一项
      </button>
    </section>
  );
}
