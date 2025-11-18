import { HiOutlineDeviceMobile } from "react-icons/hi";
import { IoInformationCircleOutline } from "react-icons/io5";
import { Link } from "react-router";
import type { FormState } from "../../typedefs";

type Props = {
  state: FormState
}

const BottomButtons = ({ state }: Props) => {

  const isSubmitDisabled = () => Object.values(state).some(value => value === null)

  return (
    <div className="flex items-center justify-center flex-wrap gap-x-4 gap-y-5 w-full mt-5">
      <button
        className="flex-[1_1_0] leading-5 text-sm w-full text-light-blue px-3 py-3.5 text-nowrap flex items-center justify-center rounded-md box-shadowed cursor-help"
        type="button"
      >
        <IoInformationCircleOutline size={18} className="mr-3" />
        <span>All plans have a 30-day activation period. </span>
      </button>
      <Link
        className="flex-[1_1_0] leading-5 text-sm w-full text-main-blue px-3 py-3.5 text-nowrap flex items-center justify-center rounded-md box-shadowed cursor-pointer"
        to={'/compatibility'}
      >
        <HiOutlineDeviceMobile size={18} className="mr-3" />
        <span>Check device compatibility</span>
      </Link>
      <button 
        type="submit" 
        disabled={isSubmitDisabled()}
        style={{ cursor: isSubmitDisabled() ? 'not-allowed' : 'pointer' }}
        className="w-full h-[52px] text-black rounded-md flex items-center justify-center gradiented-submit cursor-pointer disabled:opacity-40 enabled:hover:scale-101 duration-200"
      >
        <div className="w-[calc(100%-4px)] h-[calc(100%-4px)] bg-linear-to-tr from-white from-0% via-grad-1 via-80% to-grad-3/60 to-100% flex items-center justify-center rounded-md">
          Go to checkout
        </div>
      </button>
    </div>
  );
}

export default BottomButtons;