import React, {FC, useEffect} from 'react';
import { COLORS, colortest } from '@/lib/constants';
import {cn} from "@/lib/utils";
import {Check} from "lucide-react";

type ColorsComponentPropsType = {
  handleChange: (color: string) => void;
  color: string | null;
}

export const ColorsInput:FC<ColorsComponentPropsType> = ({handleChange, color}) => {
  const [selectedColor, setSelectedColor] = React.useState<string|null>(color);

  useEffect(() =>{
    handleChange(selectedColor as string);
  }, [selectedColor]);

  return (
    <>
      <div className='flex gap-4 flex-wrap w-full justify-between'>
        {
          COLORS.map((color) => {
            const bgColor= color.bgColor;
            const textLightColor= color.textLightColor;
            return (<span
              key={color.color}
              className={
                cn(
                  `${bgColor} w-10 h-10 cursor-pointer rounded-md flex justify-center items-center`,
                  selectedColor === color.color && `shadow-accent-foreground font-bold ${textLightColor}`
                )
              }
              onClick={() => setSelectedColor(color.color)}
            >
                        {selectedColor === color.color && <Check size={18} />}
                    </span>)
          })
        }
      </div>
    </>
  );
};