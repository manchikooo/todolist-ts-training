import {FilterValuesType} from "../App";


export const FilterReducer = (state: FilterValuesType, action: changeFilterACType) => {
    switch (action.type) {
        case 'CHANGE-FILTER': {
            return state
        }
    }
};

export type changeFilterACType = ReturnType<typeof changeFilterAC>

export const changeFilterAC = (value: FilterValuesType, todolistId: string) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            value: value,
            todolistId: todolistId
        }
    }
}