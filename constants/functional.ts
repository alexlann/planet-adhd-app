import * as yup from "yup";
import { COLORS } from "./theme";
import { IconOptions } from "../types";

// CALENDAR
export const MINDATECALENDAR = "2010-01-01";
export const MAXDATECALENDAR = "2030-12-31";

// SCHEMAS
export const addCategoryModalSchema = yup.object().shape({
    title: yup.string().required(),
    color: yup.string().required(),
    icon: yup.string().required(),
});

export const addGoalSchema = yup.object().shape({
    title: yup.string().required(),
    reward: yup.string().required(),
    startTime: yup.string().required(),
    stopTime: yup.string().required(),
    user: yup.number().required(),
});

export const addTaskSchema = yup.object().shape({
    title: yup.string().required(),
    reward: yup.string().required(),
    importance: yup.string().required(),
    category: yup.number(),
    user: yup.number().required(),
    goal: yup.number(),
    status: yup.string().required(),
    completed: yup.boolean().required(),
    startTime: yup.string().required(),
    stopTime: yup.string().required(),
});

export const emailFormSchema = yup.object().shape({
    email: yup.string().email().required(),
});

export const loginWithMailSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

export const progressSchema = yup.object().shape({
    reward: yup.string().required(),
});


export const registerWithMailSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

export const rewardSchema = yup.object().shape({
    reward: yup.string().required(),
});

// CATEGORY OPTIONS
// icons
export const iconOptionsCategory = [{
    id: 1,
    icon: IconOptions.book
},{
    id: 2,
    icon: IconOptions.medal
},{
    id: 3,
    icon: IconOptions.chart
},{
    id: 4,
    icon: IconOptions.utensils
},{
    id: 5,
    icon: IconOptions.laptop
},{
    id: 6,
    icon: IconOptions.shopping
},{
    id: 7,
    icon: IconOptions.car
},{
    id: 8,
    icon: IconOptions.home
},{
    id: 9,
    icon: IconOptions.bicycle
},{
    id: 10,
    icon: IconOptions.users
}];

// colors
export const colorOptionsCategory = [{
    id: 1,
    color: COLORS.red
},{
    id: 2,
    color: COLORS.purple
},{
    id: 3,
    color: COLORS.primaryDark
},{
    id: 4,
    color: COLORS.primaryMiddle
},{
    id: 5,
    color: COLORS.green
},{
    id: 6,
    color: COLORS.secondaryMiddle
},{
    id: 7,
    color: COLORS.secondaryDark
},{
    id: 8,
    color: COLORS.orange
},{
    id: 9,
    color: COLORS.lightBlack
},{
    id: 10,
    color: COLORS.darkGray
}];