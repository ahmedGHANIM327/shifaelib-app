import React, {FC, ReactElement} from 'react';
import {cn} from "@/lib/utils";

type SectionTitleProps = {
  title:string;
  icon?:ReactElement<any, any>;
  className?:string;
  h4_className?: string;
}
export const CardTitle:FC<SectionTitleProps> = (props) => {

  const {
    title,
    icon,
    className,
    h4_className
  } = props;

  return (
    <div className={cn('mb-5 w-[100%] gap-y-2 text-primary flex md:items-center gap-x-2', className)}>
      {icon}
      <h4 className={cn('md:text-2xl text-lg font-semibold text-primary', h4_className)}>{title}</h4>
    </div>
  );
};