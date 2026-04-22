"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import type { PanelId } from "@/lib/panels";
import { PANEL_OVERLAY_DROP_DURATION_MS } from "@/lib/sortable-transition";

interface UsePanelDndOptions {
  /** 当排序真正发生时被调用（相同项或未命中不会触发） */
  onReorder: (from: PanelId, to: PanelId) => void;
}

/**
 * 面板拖拽编排：
 * - 输出 `sensors` 与 `dndProps`（onDragStart / onDragEnd / onDragCancel）给 `<DndContext>`。
 * - 维护 `activePanelId`（拖动中）与 `dropAnimatingId`（松手回位动画期间）。
 *   `dropAnimatingId` 会在 `PANEL_OVERLAY_DROP_DURATION_MS` 后自动清空；与 DragOverlay 的 WAA 回位时长对齐。
 */
export function usePanelDnd({ onReorder }: UsePanelDndOptions) {
  const [activePanelId, setActivePanelId] = useState<PanelId | null>(null);
  const [dropAnimatingId, setDropAnimatingId] = useState<PanelId | null>(null);
  const clearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 12 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const cancelDropClear = useCallback(() => {
    if (clearTimerRef.current) {
      clearTimeout(clearTimerRef.current);
      clearTimerRef.current = null;
    }
  }, []);

  useEffect(() => cancelDropClear, [cancelDropClear]);

  const onDragStart = useCallback(
    (e: DragStartEvent) => {
      cancelDropClear();
      setDropAnimatingId(null);
      setActivePanelId(e.active.id as PanelId);
    },
    [cancelDropClear]
  );

  const onDragEnd = useCallback(
    (e: DragEndEvent) => {
      const { active, over } = e;
      const id = active.id as PanelId;
      if (over && active.id !== over.id) {
        onReorder(id, over.id as PanelId);
      }

      setActivePanelId(null);
      // 槽位保持隐藏直到 DragOverlay 回位动画结束，避免与 overlay 叠影
      setDropAnimatingId(id);
      cancelDropClear();
      clearTimerRef.current = setTimeout(() => {
        setDropAnimatingId(null);
        clearTimerRef.current = null;
      }, PANEL_OVERLAY_DROP_DURATION_MS);
    },
    [cancelDropClear, onReorder]
  );

  const onDragCancel = useCallback(() => {
    cancelDropClear();
    setDropAnimatingId(null);
    setActivePanelId(null);
  }, [cancelDropClear]);

  return {
    sensors,
    activePanelId,
    dropAnimatingId,
    dndProps: { onDragStart, onDragEnd, onDragCancel },
  };
}
