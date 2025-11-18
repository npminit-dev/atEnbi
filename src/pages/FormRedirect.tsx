import JSONPretty from 'react-json-pretty';
import { useLocation } from 'react-router';
import type { FormState } from '../typedefs';

const FormRedirect = () => {

  const { state } = useLocation()

  return (
    <div className="h-screen w-screen bg-bg-light flex flex-col items-center justify-center">
      <h1 className='font-onest text-main-blue font-semibold my-10'>Data received from {'<Form/>'} in root path</h1>
      <JSONPretty
        data={{
          ...state,
          gb: (state as FormState).gb === '10.00 TB' ? 'Unlimited' : state.gb
        }}
      />
      <h2 className='font-onest text-main-blue font-semibold my-10'>Hire Me! 😅🤠</h2>
    </div>
  );
}
 
export default FormRedirect;