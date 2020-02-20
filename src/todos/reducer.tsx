import Types from "./types";
import Storage from "./storage";

interface Action {
  	type: string
  	payload: any | { id: number; text: string; completed: boolean }
}

export default function (state:any = [], action: Action) {
	switch (action.type) {
		case Types.ADD_TODO: {
			const {id,text,completed} = action.payload;
			if(text){
				return [...state,{id,text,completed}]
			}
			return state;
		}
		case Types.TOGGLE_TODO:{
			const {id} = action.payload;
			const _state = state.map((item: any) =>{
				if(item.id === id){
					return {...item,completed: !item.completed}
				}
				return item;
			})
			Storage.set("todos",_state)
			return _state
		}
		default:
			return state;
	}
}