import {
  ChatBubbleBottomCenterIcon,
  MapIcon,
  MusicalNoteIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";

export type PanelId = "map" | "music" | "chat";

export const PANEL_IDS: readonly PanelId[] = ["map", "music", "chat"] as const;

export const PANEL_LABELS: Record<PanelId, string> = {
  map: "Map",
  music: "Music",
  chat: "Chat",
};

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { title?: string; titleId?: string }>;

export const PANEL_ICONS: Record<PanelId, IconComponent> = {
  map: MapIcon,
  music: MusicalNoteIcon,
  chat: ChatBubbleBottomCenterIcon,
};
