"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/cn";

/**
 * 面板头部：承载拖拽把手（`dragHandleProps` 来自 SortablePanelSlot），
 * 同时提供关闭按钮。与 dnd / motion 都不直接耦合——换库只影响 props 聚合处。
 */
interface PanelHeaderProps {
  label: string;
  isSorting: boolean;
  dragHandleProps: Record<string, unknown>;
  onClose: () => void;
}

export function PanelHeader({
  label,
  isSorting,
  dragHandleProps,
  onClose,
}: PanelHeaderProps) {
  return (
    <header
      {...dragHandleProps}
      className={cn(
        "flex h-10 shrink-0 touch-none items-center justify-between border-b border-neutral-200 bg-neutral-50 px-3 text-sm font-medium text-neutral-700 select-none",
        isSorting ? "cursor-grabbing" : "cursor-grab"
      )}
    >
      <span className="pointer-events-none mx-auto truncate">{label}</span>
      <button
        type="button"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label={`Close ${label} panel`}
        title="Close"
        className="ml-2 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded text-neutral-500 transition-colors hover:bg-neutral-200 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30"
      >
        <XMarkIcon className="h-4 w-4" strokeWidth={2} aria-hidden />
      </button>
    </header>
  );
}
