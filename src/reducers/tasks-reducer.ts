import {TodolistsType} from "../App";

export const tasksReducer = (state: TodolistsType[] , action: tsarType) => {
    switch (action.type){
        case "REMOVE-TASK": {
            return state

        }
        default: return state
    }
}

type tsarType = RemoveTaskACType
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = () => {
    return {
        type: "REMOVE-TASK"
    }as const
}
