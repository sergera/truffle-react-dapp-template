import { ValidationRulesProps } from './ValidationRules.types';
 
export function ValidationRules({
	show, 
	rules,
}: ValidationRulesProps) {

  return (
		<> 
		{show &&
			<ul
				className="validation-rules__list"
			>
				{rules.map((rule,index) => {
					return (
						<li
							className="validation-rules__list-item"
							id={String(index)}
						>
							{rule}					
						</li>
					);
				})}
			</ul>
		}
		</>
  );
};
