import "react";

declare module "react" {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    toolparam?: string;
  }
  interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
    toolparam?: string;
  }
  interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
    toolname?: string;
    tooldescription?: string;
  }
}
