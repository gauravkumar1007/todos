import React from "react";
import ReactDom from "react-dom";
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

import Todos from "../todos/index";

test('renders without crashing', () => {
 	const { container } = render(<Todos />);
 	
 	const input = container.querySelector("input");
 	const button = container.querySelector("button");
 	const ul = container.querySelector("ul");

 	fireEvent.change(input, {
    	target: {value: 'thor'},
  	})

  	fireEvent.click(button);

  	expect(ul.firstChild.innerHTML).toBe("thor");

  	fireEvent.click(ul.firstChild);
  	expect(ul.firstChild.className).toBe("in-active-todo todo-list");

  	fireEvent.click(ul.firstChild);
  	expect(ul.firstChild.className).toBe("todo-list");		
});