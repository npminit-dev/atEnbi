import type { FormState } from "../../typedefs";
import type { Action } from "./ESimForm";
import { v4 as uuidv4 } from 'uuid'

type Props = {
  countryGBS: Array<string>,
  state: FormState,
  dispatch: React.ActionDispatch<[action: Action]>;
}

const GBSelect = ({ countryGBS, state, dispatch }: Props) => {

  return (
    <div className="flex items-center my-5 box-shadowed p-2 rounded-xl gap-2 border border-shadow">
      {
        countryGBS.map(gb => (
          <label
            className={
              `relative grow basis-0 flex items-center justify-center rounded-xl cursor-pointer select-none
            ${gb === '10.00 TB' && state.gb !== gb ? 'gradiented' : 'hover:outline hover:outline-main-blue/30'} 
            ${state.gb === gb ? 'bg-none bg-main-blue text-white' : ''}`
            }
            key={uuidv4()}
          >
            <input
              type="radio"
              className="hidden selection:"
              value={gb}
              onChange={() => dispatch({ type: 'SET_GB', payload: gb })}
            />
            <span
              className="my-3.5 z-10 font-medium text-sm leading-5"
            >
              {gb === '10.00 TB' ? 'Unlimited' : gb}
            </span>
            {
              gb === '10.00 TB' && state.gb !== gb && <span className="absolute size-[calc(100%-2px)] bg-bg-light z-1 rounded-[10px] p-4" />
            }
          </label>
        ))
      }
    </div>
  );
}

export default GBSelect;

