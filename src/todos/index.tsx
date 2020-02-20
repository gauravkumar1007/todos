import React, { useState, useEffect, useReducer, useRef } from 'react';
import reducer from "./reducer";
import Storage from "./storage";
import "./todos.css";

const initialState: { id: number, name: string, completed: boolean }[] = Storage.get("todos") || [];

function Todos(){
	const inputRef:any = useRef<HTMLElement>(null);
	const [todos, dispatch] = useReducer(reducer, initialState);

	function onSubmit(e: any){
		e.preventDefault();
        const payload = {
            id: todos.length,
            text: inputRef && inputRef.current && inputRef.current.value || '',
            completed: false
        }
		dispatch({
      		type: 'ADD_TODO',
      		payload
    	});
        inputRef && inputRef.current && (inputRef.current.value = '');
        
        const list = [...todos];
        list.push(payload);
        Storage.set("todos",list);
	}

    function handleToggle({id}: {id: number}){
        dispatch({ 
            type: 'TOGGLE_TODO',
            payload:{
                id
            }
        });
    }

	return <div style={{flex:1}} className="full-view center">
		<div className="container">
			<form onSubmit={onSubmit}>
          		<input ref={inputRef} id="add-todo" className="todo-input" placeholder="Enter your todo here." />
        		<button type="submit" id="submit" className="todo-btn" onClick={onSubmit}>
        			ADD
        		</button>
        	</form>
        	<ul>
        		{
        			todos.map(({id, text, completed}: {id: number, text: string, completed: boolean}, i: number) => {
        				return <li key={i} className={completed ? "in-active-todo todo-list" : "todo-list"} onClick={() => handleToggle({id})}>{text}</li>
        			})
        		}
        	</ul>
		</div>
	</div>
}

export default Todos;