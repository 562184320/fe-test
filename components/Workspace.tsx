"use client";

import { DndContext, closestCenter } from "@dnd-kit/core";
import { DropAnimatingIdContext } from "@/contexts/PanelDndContext";
import { usePanelOrder } from "@/hooks/usePanelOrder";
import { usePanelDnd } from "@/hooks/usePanelDnd";
import { Sidebar } from "./Sidebar";
import { PanelBoard } from "./PanelBoard";
import { PanelDragLayer } from "./panel/PanelDragLayer";

export function Workspace() {
  const { order, openPanel, closePanel, reorder, sidebarOrder } =
    usePanelOrder();
  const { sensors, activePanelId, dropAnimatingId, dndProps } = usePanelDnd({
    onReorder: reorder,
  });

  return (
    <div className="flex h-full w-full bg-neutral-50 text-neutral-900">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        {...dndProps}
      >
        <Sidebar items={sidebarOrder} openIds={order} onOpen={openPanel} />
        <DropAnimatingIdContext.Provider value={dropAnimatingId}>
          <PanelBoard order={order} onClose={closePanel} />
        </DropAnimatingIdContext.Provider>
        <PanelDragLayer activeId={activePanelId} />
      </DndContext>
    </div>
  );
}
