"use client";

import { useCallback, useMemo, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import type { PanelId } from "@/lib/panels";
import { PANEL_IDS } from "@/lib/panels";

/**
 * 面板「开/关/排序」的单一事实来源。
 * - `order`：当前已打开面板的从左到右顺序。
 * - `sidebarOrder`：左侧图标顺序（已打开部分与 `order` 一致，未打开的按 `PANEL_IDS` 稳定顺序接在后面）。
 */
export function usePanelOrder(initial: readonly PanelId[] = PANEL_IDS) {
  const [order, setOrder] = useState<PanelId[]>([...initial]);

  const openPanel = useCallback((id: PanelId) => {
    setOrder((o) => (o.includes(id) ? o : [...o, id]));
  }, []);

  const closePanel = useCallback((id: PanelId) => {
    setOrder((o) => o.filter((x) => x !== id));
  }, []);

  const reorder = useCallback((from: PanelId, to: PanelId) => {
    if (from === to) return;
    setOrder((o) => {
      const f = o.indexOf(from);
      const t = o.indexOf(to);
      return f < 0 || t < 0 ? o : arrayMove(o, f, t);
    });
  }, []);

  const sidebarOrder = useMemo<PanelId[]>(
    () => [...order, ...PANEL_IDS.filter((id) => !order.includes(id))],
    [order]
  );

  return { order, openPanel, closePanel, reorder, sidebarOrder };
}
