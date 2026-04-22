"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import type { PanelId } from "@/lib/panels";
import { SORTABLE_ITEM_TRANSITION } from "@/lib/sortable-transition";
import { cn } from "@/lib/cn";

/**
 * 「dnd 边界」层：
 * - 只负责 sortable 的 ref / transform / transition / zIndex，以及槽位本身的 opacity 进入-退出。
 * - 不暴露 useSortable 细节，仅通过 render-prop 下发 `isSorting` 和 `dragHandleProps`。
 * - 禁止在此层挂 `layout` / `whileHover` / 会覆盖整条 `transition` 的 motion 配置；
 *   需要这类动画请写在 children 里（天然的「motion 沙盒」）。
 */

const OPACITY_EASE = [0.22, 1, 0.36, 1] as const;

export interface SortableSlotRenderArgs {
  isSorting: boolean;
  dragHandleProps: Record<string, unknown>;
}

interface SortablePanelSlotProps {
  id: PanelId;
  /** 由外部决定「槽位是否应隐藏」（拖拽中 / 松手回位动画中） */
  hidden: boolean;
  children: (args: SortableSlotRenderArgs) => ReactNode;
}

export function SortablePanelSlot({
  id,
  hidden,
  children,
}: SortablePanelSlotProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isSorting,
    isDragging,
  } = useSortable({ id, transition: SORTABLE_ITEM_TRANSITION });

  const slotHidden = hidden || isDragging;

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? undefined : transition,
    zIndex: isDragging ? 20 : undefined,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: slotHidden ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{
        opacity: { duration: slotHidden ? 0.2 : 0, ease: OPACITY_EASE },
      }}
      className={cn(
        "group relative flex h-full min-h-0 min-w-[280px] flex-1 shrink basis-0 flex-col overflow-hidden border-l border-neutral-200 bg-white first:border-l-0",
        isDragging && "shadow-xl ring-1 ring-neutral-900/10"
      )}
    >
      {children({
        isSorting,
        dragHandleProps: { ...attributes, ...listeners },
      })}
    </motion.div>
  );
}
