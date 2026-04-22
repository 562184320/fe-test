import { defaultDropAnimation } from "@dnd-kit/core";

/**
 * 仅作用于 @dnd-kit/sortable 列表里 **transform**（旁列让位、槽位位移等）
 */
export const SORTABLE_ITEM_TRANSITION = {
  duration: 320,
  easing: "cubic-bezier(0.22, 1, 0.36, 1)",
} as const;

const { sideEffects: _ignoredSideEffects, ...dropAnimationBase } = defaultDropAnimation;

/**
 * 松手时 **DragOverlay** 的 WAA 回位。默认 `defaultDropAnimation` 会在 active 槽位上写 `opacity: 0` 并在结束时清理，
 * 与 motion 的 `opacity` 会打架，表现为消失或闪影；由槽位在 React 里按同一时长 `opacity:0` 即可。
 */
export const PANEL_OVERLAY_DROP_ANIMATION = {
  ...dropAnimationBase,
  /** 槽位显隐用 `DropAnimatingIdContext`，不要由 dnd 再写 inline opacity */
  sideEffects: null,
  duration: 420,
  easing: "cubic-bezier(0.22, 1, 0.36, 1)",
} as const;

/** 与 WAA 的 `duration` 同值，供 Workspace 计时；**勿**在计时上再加大的「保险延迟」，易与 overlay 卸除不同步。 */
export const PANEL_OVERLAY_DROP_DURATION_MS = PANEL_OVERLAY_DROP_ANIMATION.duration;
