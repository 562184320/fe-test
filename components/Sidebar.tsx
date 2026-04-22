"use client";

import { LayoutGroup, motion } from "motion/react";
import type { PanelId } from "@/lib/panels";
import { PANEL_ICONS, PANEL_LABELS } from "@/lib/panels";
import { cn } from "@/lib/cn";

interface SidebarProps {
  items: readonly PanelId[];
  openIds: PanelId[];
  onOpen: (id: PanelId) => void;
}

const LAYOUT_SPRING = {
  type: "spring",
  stiffness: 520,
  damping: 38,
  mass: 0.65,
} as const;

const SCALE_SPRING = { type: "spring", stiffness: 600, damping: 30 } as const;

const BUTTON_TRANSITION = { layout: LAYOUT_SPRING, scale: SCALE_SPRING };

export function Sidebar({ items, openIds, onOpen }: SidebarProps) {
  return (
    <aside className="flex h-full w-14 shrink-0 flex-col items-stretch gap-1 border-r border-neutral-200 bg-white/80 py-3 backdrop-blur">
      <LayoutGroup>
        {items.map((id) => {
          const Icon = PANEL_ICONS[id];
          const label = PANEL_LABELS[id];
          const isOpen = openIds.includes(id);
          return (
            <motion.button
              key={id}
              layout
              type="button"
              onClick={isOpen ? undefined : () => onOpen(id)}
              whileTap={isOpen ? undefined : { scale: 0.92 }}
              whileHover={isOpen ? undefined : { scale: 1.04 }}
              transition={BUTTON_TRANSITION}
              aria-pressed={isOpen}
              aria-disabled={isOpen}
              aria-label={isOpen ? `${label} panel is open` : `Open ${label} panel`}
              title={isOpen ? `${label} (open)` : `Open ${label}`}
              className={cn(
                "group mx-1 flex flex-col items-center justify-center gap-1 rounded-lg px-1 py-2 text-[11px] font-medium select-none outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30",
                isOpen
                  ? "cursor-default text-neutral-900"
                  : "cursor-pointer text-neutral-400 opacity-60 hover:bg-neutral-100 hover:opacity-90"
              )}
            >
              <Icon
                className={cn(
                  "h-6 w-6 transition-colors",
                  isOpen ? "text-neutral-900" : "text-neutral-400"
                )}
                strokeWidth={1.6}
                aria-hidden
              />
              <span className="leading-tight">{label}</span>
            </motion.button>
          );
        })}
      </LayoutGroup>
    </aside>
  );
}
