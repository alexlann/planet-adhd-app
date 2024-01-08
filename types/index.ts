// ENUMS

import { COLORS } from "../constants";

export enum Status {
    success = "success",
    notStarted = "notStarted",
    failed = "failed",
}

export enum TaskImportance {
    low = "LOW",
    mid = "MID",
    high = "HIGH"
}

export enum SizeOptions {
    large = "large",
    medium = "medium",
    small = "small"
}

export enum ButtonType {
    primary = "primary",
    warning = "warning",
    danger = "danger",
    soft = "soft",
}

export const StatusTypes = {
    success: ButtonType.primary,
    notStarted: false,
    failed: ButtonType.danger,
}

export const TaskImportanceTypes = {
    low: ButtonType.primary,
    mid: ButtonType.warning,
    high: ButtonType.danger,
}

// BUTTON COLORS
export const ButtonColors = {
    primary: {
        primary: COLORS.primary,
        dark: COLORS.primaryDark,
        middle: COLORS.primaryMiddle,
        light: COLORS.primaryLight,
    },
    warning: {
        primary: COLORS.secondary,
        dark: COLORS.secondary,
        middle: COLORS.secondaryMiddle,
        light: COLORS.secondaryLight,
    },
    danger: {
        primary: COLORS.red,
        dark: COLORS.redDark,
        middle: COLORS.redMiddle,
        light: COLORS.redLight,
    },
    soft: {
        primary: COLORS.darkGray,
        dark: COLORS.lightBlack,
        middle: COLORS.darkGray,
        light: COLORS.lightGray,
    },
}

// ICONS
export const IconOptions = {
  bicycle: {
    icon: "bicycle",
    name: "bicycle",
    source: "FontAwesome5"
  },
  book: {
    icon: "book",
    name: "book",
    source: "FontAwesome5"
  },
  calendar: {
    icon: "calendar",
    name: "calendar-alt",
    source: "FontAwesome5"
  },
  car: {
    icon: "car",
    name: "car",
    source: "FontAwesome5"
  },
  chart: {
    icon: "chart",
    name: "chart-line",
    source: "FontAwesome5"
  },
  check: {
    icon: "check",
    name: "check",
    source: "FontAwesome5"
  },
  circle: {
    icon: "circle",
    name: "circle",
    source: "FontAwesome"
  },
  clock: {
    icon: "clock",
    name: "clock",
    source: "FontAwesome5"
  },
  close: {
    icon: "close",
    name: "times",
    source: "FontAwesome"
  },
  dotsV: {
    icon: "dotsV",
    name: "ellipsis-v",
    source: "FontAwesome5"
  },
  down: {
    icon: "down",
    name: "chevron-down",
    source: "FontAwesome5"
  },
  flag: {
    icon: "flag",
    name: "flag",
    source: "FontAwesome5"
  },
  flagSolid: {
    icon: "flagSolid",
    name: "font-awesome-flag",
    source: "FontAwesome5"
  },
  home: {
    icon: "home",
    name: "home",
    source: "FontAwesome5"
  },
  laptop: {
    icon: "laptop",
    name: "laptop",
    source: "FontAwesome5"
  },
  left: {
    icon: "left",
    name: "chevron-left",
    source: "FontAwesome5"
  },
  medal: {
    icon: "medal",
    name: "medal",
    source: "FontAwesome5"
  },
  mountain: {
    icon: "mountain",
    name: "mountain",
    source: "FontAwesome5"
  },
  plus: {
    icon: "plus",
    name: "plus",
    source: "FontAwesome5"
  },
  right: {
    icon: "right",
    name: "chevron-right",
    source: "FontAwesome5"
  },
  shopping: {
    icon: "shopping",
    name: "shopping-cart",
    source: "FontAwesome5"
  },
  star: {
    icon: "star",
    name: "star",
    source: "FontAwesome"
  },
  up: {
    icon: "up",
    name: "chevron-up",
    source: "FontAwesome5"
  },
  user: {
    icon: "user",
    name: "user-alt",
    source: "FontAwesome5"
  },
  users: {
    icon: "users",
    name: "users",
    source: "FontAwesome5"
  },
  utensils: {
    icon: "utensils",
    name: "utensils",
    source: "FontAwesome5"
  },
}

// ENUMS
export enum FormMethods {
    post = "POST",
    get = "GET",
    patch = "PATCH",
    delete = "DELETE"
}

export enum ScorePointOptions {
    goal = 150,
    task = 50,
}

export enum FetchItemOptions {
    goal = "goal",
    level = "level",
    task = "task",
}

export enum InputOptions {
  text = "text",
  tags = "tags",
  categories = "categories",
  goal = "goal",
  startTime = "startTime",
}

// TYPES
export interface UserType {
    id: number;
    email: string;
    role: "USER" | "ADMIN";
    userLevel: UserLevelType;
}

export interface AuthType {
    user: UserType;
    token: string;
}

export interface AuthContextType {
    auth: AuthType | null;
    login: (auth: AuthType) => void;
    logout: () => void;
}

export interface LinkButtonPropsType {
    title?: string;
    screen?: string;
}

export interface IconType {
  icon: string
  name: string;
  source: string;
}

export interface GoalType {
    id: number;
    title: string;
    user: UserType;
    reward: string;
    status: Status;
    completed: boolean;
    notes: string;
    startTime: string;
    stopTime: string;
}

export interface CategoryType {
    id: number;
    title: string;
    user: UserType;
    color: string;
    icon: string;
}

export interface TaskType {
    id: number;
    title: string;
    user: UserType;
    reward: string;
    status: Status;
    completed: boolean;
    importance: TaskImportance;
    category: CategoryType;
    goal: GoalType;
    notes: string;
    startTime: string;
    stopTime: string;
}

export interface LevelType {
    id: number;
    levelNumber: number;
    requiredTotalScore: number;
    maxTotalScore: number;
    maxScore: number;
}

export interface UserLevelType {
    id: number;
    level: LevelType;
    user: UserType;
    reward: string;
    score: number;
}

export interface FetchItemType {
    type: FetchItemOptions,
    title: string,
    reward?: string,
    id: number,
}