import React, { FC, useRef } from "react";
import Basket from "@/components/ui/basket";
import { useOnClickOutside } from "usehooks-ts";

export interface BasketPreviewProps {
  closePreview: () => void;
}

const BasketPreview: FC<BasketPreviewProps> = ({ closePreview }) => {
  const previewRef = useRef<null | HTMLDivElement>(null);
  useOnClickOutside(previewRef, closePreview);
  return (
    <div
      className={
        "fixed w-full h-full top-0 left-0 flex items-center justify-center bg-black bg-opacity-40 z-[700]"
      }
      style={{
        backdropFilter: "blur(3px)",
      }}
    >
      <div ref={previewRef}>
        <Basket closePreview={closePreview} />
      </div>
    </div>
  );
};

export default BasketPreview;
