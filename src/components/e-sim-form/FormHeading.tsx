type Props = {
  title: string,
  caption: string
}

const FormHeading = ({ title, caption }: Props) => {
  return (
    <div className="mb-8">
      <h1 className="mb-2 text-main-blue text-[32px] leading-10 font-medium text-shadowed"> {title} </h1>
      <h2 className="text-light-blue leading-7 text-[18px] text-shadowed"> {caption} </h2>
    </div>
  );
}

export default FormHeading;