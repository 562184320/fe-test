"use client";

import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { AnimatePresence } from "motion/react";
import type { PanelId } from "@/lib/panels";
import { Panel } from "./Panel";

interface PanelBoardProps {
  order: PanelId[];
  onClose: (id: PanelId) => void;
}

export function PanelBoard({ order, onClose }: PanelBoardProps) {
  return (
    <div className="panel-scroll min-w-0 flex-1 overflow-hidden">
      <SortableContext items={order} strategy={horizontalListSortingStrategy}>
        <div className="flex h-full w-max min-w-full items-stretch ">
          <AnimatePresence initial={false}>
            {order.map((id) => (
              <Panel key={id} id={id} onClose={onClose} />
            ))}
          </AnimatePresence>
        </div>
      </SortableContext>
    </div>
  );
}
