import { curry } from 'ramda';
import { ComponentType } from 'react';

type Handlers = {
  [key: string]: Function
}

export const withHandlersBase = (handlers: Handlers, Cmp: ComponentType) => function (props) {
  return <Cmp {...props} {...handlers} />;
};

export const withHandlers = curry(withHandlersBase);
