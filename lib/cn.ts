type ClassValue = string | false | null | undefined;

/** 拼接条件性 className。用 `cond && "class"` 代替 `cond ? "class" : ""` */
export const cn = (...classes: ClassValue[]) =>
  classes.filter(Boolean).join(" ");
