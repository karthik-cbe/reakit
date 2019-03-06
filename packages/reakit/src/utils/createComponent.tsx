import * as React from "react";
import { forwardRef } from "../__utils/forwardRef";
import { As, PropsWithAs } from "../__utils/types";
import { unstable_Portal as Portal } from "../portal/Portal";
import { unstable_useCreateElement } from "./useCreateElement";
import { unstable_splitProps } from "./splitProps";

type Hook<Options> = {
  (
    options: Options,
    props: React.HTMLAttributes<any> & React.RefAttributes<any>
  ): typeof props;
  keys: any[];
};

export function unstable_createComponent<T extends As, O>(
  element: T,
  useHook: Hook<O>,
  portal?: boolean
) {
  return forwardRef(
    <TT extends As = T>(
      { as = (element as unknown) as TT, ...props }: PropsWithAs<O, TT>,
      ref: React.Ref<any>
    ) => {
      const [options, htmlProps] = unstable_splitProps(props, useHook.keys);
      const elementProps = useHook(options, { ref, ...htmlProps });
      const rendered = unstable_useCreateElement(as, elementProps);

      if (portal) {
        return <Portal>{rendered}</Portal>;
      }

      return rendered;
    }
  );
}