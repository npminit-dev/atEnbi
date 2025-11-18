import FormHeading from "./FormHeading";
import Image from "./Image";
import usePricing from "../../hooks/usePricing";
import type { FormState } from "../../typedefs";
import { useReducer, type FormEvent } from "react";
import CountrySelect from "./CountrySelect";
import GBSelect from "./GBSelect";
import PlanSelect from "./PlanSelect";
import BottomButtons from "./BottomButtons";
import { useNavigate } from "react-router";
import riverImage from '../../assets/image/river-and-boats.webp';
import JSONPretty from "react-json-pretty";

const initialState: FormState = {
  countryName: 'Argentina',
  countryCode: 'AR',
  gb: null,
  plan: null,
};

function formReducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case "SET_COUNTRY":
      return {
        countryName: action.payload.name,
        countryCode: action.payload.code,
        gb: null,
        plan: null,
      };

    case "SET_GB":
      return {
        ...state,
        gb: action.payload,
        plan: null,
      };

    case "SET_PLAN":
      return {
        ...state,
        plan: action.payload,
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

const ESimForm = () => {

  const { pricingData } = usePricing()
  const [state, dispatch] = useReducer(formReducer, initialState);
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate('/form-redirect', {
      state
    })
  }

  return (
    <>
      {
        pricingData !== null ?
          <>
            <div className="flex items-start justify-center gap-12 h-full my-20">
              <Image src={riverImage} alt="decorative image" />
              <form onSubmit={handleSubmit} className="relative flex flex-col min-h-[680px] max-w-[587px] mt-4">
                <FormHeading
                  title="Select eSIM plan"
                  caption="Get an eSIM for Japan and enjoy reliable and affordable internet access on your trip."
                />
                <CountrySelect
                  countryName={state.countryName}
                  countryCode={state.countryCode}
                  dispatch={dispatch}
                  countries={pricingData}
                />
                <GBSelect
                  countryGBS={state.countryName
                    ? Object.keys(pricingData[state.countryName].plansByGB)
                    : []}
                  dispatch={dispatch}
                  state={state}
                />
                <PlanSelect
                  plans={(state.countryName && state.gb)
                    ? pricingData[state.countryName].plansByGB[state.gb]
                    : []}
                  dispatch={dispatch}
                  state={state}
                />
                <BottomButtons
                  state={state}
                />
              </form>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-main-blue font-onest mb-4">Form Status</h3>
              <JSONPretty
                className="text-light-blue"
                data={{
                  ...state,
                  gb: (state as FormState).gb === '10.00 TB' ? 'Unlimited' : state.gb
                }}
              />
            </div>
          </>
          : <></>
      }
    </>
  );
}

export type Action =
  | { type: "SET_COUNTRY"; payload: { name: string; code: string } }
  | { type: "SET_GB"; payload: string }
  | { type: "SET_PLAN"; payload: { days: number; price: number } }
  | { type: "RESET" };

export default ESimForm;