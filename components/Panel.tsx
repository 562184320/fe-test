"use client";

import { useDropAnimatingId } from "@/contexts/PanelDndContext";
import type { PanelId } from "@/lib/panels";
import { PANEL_LABELS } from "@/lib/panels";
import { SortablePanelSlot } from "./panel/SortablePanelSlot";
import { PanelHeader } from "./panel/PanelHeader";

/**
 * 编排者：只决定「槽位何时隐藏」与「谁来当 header」，不直接碰 dnd / motion。
 * 需要给面板加新的视觉/交互时，放在 children 里（SortablePanelSlot 的 motion 沙盒）即可。
 */
interface PanelProps {
  id: PanelId;
  onClose: (id: PanelId) => void;
}

export function Panel({ id, onClose }: PanelProps) {
  const dropAnimatingId = useDropAnimatingId();
  const hidden = dropAnimatingId === id;

  return (
    <SortablePanelSlot id={id} hidden={hidden}>
      {({ isSorting, dragHandleProps }) => (
        <>
          <PanelHeader
            label={PANEL_LABELS[id]}
            isSorting={isSorting}
            dragHandleProps={dragHandleProps}
            onClose={() => onClose(id)}
          />
          <div className="flex-1 overflow-auto bg-white" />
        </>
      )}
    </SortablePanelSlot>
  );
}
