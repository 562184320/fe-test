"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import type { PanelId } from "@/lib/panels";
import { PANEL_LABELS } from "@/lib/panels";

/**
 * 供 `DragOverlay` 使用：与列表中 Panel 同形，不挂 sortable，仅作跟随指针与落点回位动画的镜像。
 */
export function PanelDragPreview({ id }: { id: PanelId }) {
  return (
    <div className="flex h-full min-h-0 w-full min-w-[280px] flex-col overflow-hidden border border-neutral-200 bg-white shadow-2xl ring-2 ring-neutral-900/10">
      <div
        className="flex h-10 shrink-0 items-center justify-center border-b border-neutral-200 bg-neutral-50 px-3 text-sm font-medium text-neutral-700"
        aria-hidden
      >
        <span className="mx-auto truncate">{PANEL_LABELS[id]}</span>
        <span className="ml-2 inline-flex h-6 w-6 shrink-0" aria-hidden>
          <XMarkIcon className="h-4 w-4 text-neutral-300" strokeWidth={2} />
        </span>
      </div>
      <div className="min-h-0 flex-1 bg-white" style={{ minHeight: 80 }} />
    </div>
  );
}
