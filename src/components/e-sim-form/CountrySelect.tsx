import { useState, useRef, useEffect } from "react";
import type { PricingDictionary } from "../../typedefs";
import type { Action } from "./ESimForm";
import { v4 as uuidv4 } from "uuid";
import { IoIosArrowDown } from "react-icons/io";

type Props = {
  countryName: string;
  countryCode: string;
  dispatch: React.ActionDispatch<[action: Action]>;
  countries: PricingDictionary;
};

const CountrySelect = ({ countryName, countryCode, dispatch, countries }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <div
      ref={ref}
      className="px-4 py-5 relative flex items-center justify-between rounded-xl box-shadowed border border-shadow"
    >

      <div className="flex items-center">
        <span className="inline-flex border h-6 w-9 items-center justify-center border-shadow rounded-sm mr-3 overflow-hidden">
          <span className={`h-7 w-9 fib fi-${countryCode.toLowerCase()}`} />
        </span>
        <span className="font-sora text-black text-xl leading-7">
          {countryName}
        </span>
      </div>

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 cursor-pointer select-none"
        type="button"
      >
        <span className="text-light-blue text-sm leading-5">Country</span>
        <span className={`transition-transform duration-300 ${open ? "rotate-x-180" : ""}`}>
          <IoIosArrowDown/>
        </span>
      </button>

      {open && (
        <ul className="absolute right-0 h-[400px] overflow-y-scroll top-full mt-2 w-fit bg-white border border-shadow rounded-xl shadow p-2 z-50">
          {Object.keys(countries).sort().map((country) => (
            <li
              key={uuidv4()}
              className="px-3 py-2 font-onest text-sm cursor-pointer hover:bg-shadow rounded"
              onClick={() => {
                dispatch({
                  type: "SET_COUNTRY",
                  payload: {
                    name: country,
                    code: countries[country].countryCode,
                  },
                });
                setOpen(false);
              }}
            >
              <span className={`mr-4 fi fi-${countries[country].countryCode.toLowerCase()} fis rounded-full`}></span>
              {country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CountrySelect;
