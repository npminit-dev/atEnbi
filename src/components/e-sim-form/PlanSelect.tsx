import { useMemo } from "react";
import type { FormState, PricingEntry } from "../../typedefs";
import type { Action } from "./ESimForm";
import { v4 as uuidv4 } from 'uuid'

type Props = {
  plans: Array<PricingEntry>
  state: FormState,
  dispatch: React.ActionDispatch<[action: Action]>;
}

const PlanSelect = ({ plans, state, dispatch }: Props) => {

  const popular = useMemo(() => Math.floor(Math.random() * (plans.length)), [state.gb])

  return (
    <div className="p-2.5 grow flex flex-col items-center justify-start gap-2 border border-shadow box-shadowed rounded-xl">
      {
        plans.length ? plans.map((plan, i) => (
          <label
            key={uuidv4()}
            className="w-full h-12 px-2.5 py-2.5 flex items-center justify-between hover:bg-shadow/80 rounded-sm duration-300 cursor-pointer"
          >
            <div className="w-[344px] flex items-center justify-start">
              <input
                className="mr-3"
                type="radio"
                checked={plan.days === state.plan?.days && plan.price === state.plan.price}
                onChange={() => {
                  dispatch({ type: 'SET_PLAN', payload: { ...plan } })
                }}
              />
              <span className="text-main-blue leading-5 text-sm "> {plan.days} Days </span>
              <span className="absolute left-32 inline-block h-5 w-0.5 bg-light-blue/20"></span>
              <div className="absolute left-36">
                <span className="font-semibold text-main-blue text-base font-sora"> ${plan.price} </span>
                <span className="text-[10px] text-light-blue font-sora">USD</span>
              </div>
            </div>
            <div>
              {
                popular === i && (
                  <div className="text-white bg-main-blue px-2 py-1 rounded-md text-sm leading-5">
                    Popular choice
                  </div>
                )
              }
            </div>
          </label>
        )) : <span className="text-light-blue text-light m-auto">Select a GB amount</span>
      }
    </div>
  );
}

export default PlanSelect;