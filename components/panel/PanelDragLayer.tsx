"use client";

import { DragOverlay } from "@dnd-kit/core";
import type { PanelId } from "@/lib/panels";
import { PANEL_OVERLAY_DROP_ANIMATION } from "@/lib/sortable-transition";
import { PanelDragPreview } from "./PanelDragPreview";

/**
 * 拖拽层：把 DragOverlay 及其 dropAnimation / preview 封装在一起，
 * Workspace 只关心「当前 active 的 id」。
 */
export function PanelDragLayer({ activeId }: { activeId: PanelId | null }) {
  return (
    <DragOverlay
      className="pointer-events-none"
      dropAnimation={PANEL_OVERLAY_DROP_ANIMATION}
    >
      {activeId ? <PanelDragPreview id={activeId} /> : null}
    </DragOverlay>
  );
}
