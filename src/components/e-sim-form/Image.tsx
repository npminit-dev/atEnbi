import type { ImgHTMLAttributes } from "react";

type Props = Partial<ImgHTMLAttributes<HTMLImageElement>> & { src: string, alt: string }

const Image = (props: Props) => {

  return (
    <div className="relative overflow-hidden flex items-center justify-center max-w-[500px] h-[707px] rounded-[20px]">
      <img className="h-full object-cover" {...props} />
    </div>
  );
}

export default Image;