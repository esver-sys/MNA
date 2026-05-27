"use client";

import React from "react";

interface CodeEditorPanelProps {
  title: string;
  description: string;
  value: string;
  placeholder: string;
  readOnly?: boolean;
  disabled?: boolean;
  metaText: string;
  statusNode?: React.ReactNode;
  onChange?: (value: string) => void;
}

export function CodeEditorPanel({
  title,
  description,
  value,
  placeholder,
  readOnly = false,
  disabled = false,
  metaText,
  statusNode,
  onChange,
}: CodeEditorPanelProps) {
  const panelId = title.replace(/\s+/g, "-").toLowerCase();

  return (
    <section className="flex min-h-[420px] flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
      <div className="flex items-start justify-between gap-4 border-b border-slate-800 px-5 py-4">
        <div>
          <label
            htmlFor={panelId}
            className="block text-sm font-semibold text-slate-100"
          >
            {title}
          </label>
          <p className="mt-1 text-xs leading-5 text-slate-400">
            {description}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          {statusNode}
          <span className="text-xs text-slate-500">{metaText}</span>
        </div>
      </div>

      <div className="flex-1">
        <textarea
          id={panelId}
          value={value}
          readOnly={readOnly || disabled}
          disabled={disabled}
          spellCheck={false}
          placeholder={placeholder}
          onChange={(event) => onChange?.(event.target.value)}
          className="h-full min-h-[360px] w-full resize-none bg-slate-950 px-5 py-4 font-mono text-sm leading-7 text-slate-100 outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-70"
        />
      </div>
    </section>
  );
}
