"use client";

import { createContext, useContext } from "react";
import type { PanelId } from "@/lib/panels";

/**
 * 松手后 DragOverlay 回位动画进行期间，对应面板的「槽位」应保持不可见，
 * 避免与 overlay 叠影；由 Workspace 在动画时长结束后清空。
 */
export const DropAnimatingIdContext = createContext<PanelId | null>(null);

export const useDropAnimatingId = () => useContext(DropAnimatingIdContext);
