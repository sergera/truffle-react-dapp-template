import React from 'react';
import { SelectProps } from './Select.types';

// TODO: make this into a controlled component

export function Select({
	label,
	options,
	handleChange, 
	handleBlur=()=>{},
	isRequired=false,
	formId="", 
	placeholder="",
	styleClass=""
}: SelectProps) {

	const getValueOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		handleChange(options.find((option) => option.label === e.target.value) || {});
	}

	const getValueOnBlur = (e:  React.ChangeEvent<HTMLSelectElement>) => {
		handleBlur(options.find((option) => option.label === e.target.value) || {});
	};

  return (
		<div className="select__wrapper">
			<label className="select__label">
				{label}
			</label>
			<select 
				onChange={(e) => getValueOnChange(e)}
				onBlur={(e) => getValueOnBlur(e)}
				name={label}
				form={formId}
				className={"select " + styleClass} 
			>
				{placeholder &&
				<option
					className={"select__option"}
				>
					{placeholder}
				</option>}
				{options.map((option) => {
					return (
						<option 
							key={option.label}
							className={"select__option"} 
						>
							{option.label}
						</option>
					);
				})}
			</select>
			{isRequired && 
				<small
					className="text-input__required"
				>
					*required
				</small>
			}
		</div>
  );
};
