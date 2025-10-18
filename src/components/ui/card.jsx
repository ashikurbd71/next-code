import * as React from "react"

import { cn } from "@/lib/utils"

function Card({
  className,
  variant = "default",
  ...props
}) {
  const variants = {
    default: "bg-white border border-gray-200 shadow-sm hover:shadow-md",
    elevated: "bg-white border-0 shadow-lg hover:shadow-xl",
    outlined: "bg-white border-2 border-gray-200 shadow-none hover:border-gray-300",
    glass: "bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl",
    gradient: "bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-md hover:shadow-lg"
  };

  return (
    <div
      data-slot="card"
      className={cn(
        "text-card-foreground flex flex-col gap-6 rounded-2xl py-6 transition-all duration-300 ease-in-out",
        variants[variant],
        className
      )}
      {...props} />
  );
}

function CardHeader({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-3 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props} />
  );
}

function CardTitle({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-tight font-semibold text-gray-900", className)}
      {...props} />
  );
}

function CardDescription({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-gray-600 text-sm leading-relaxed", className)}
      {...props} />
  );
}

function CardAction({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props} />
  );
}

function CardContent({
  className,
  ...props
}) {
  return (<div data-slot="card-content" className={cn("px-6 flex-1", className)} {...props} />);
}

function CardFooter({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 pt-4 [.border-t]:pt-6", className)}
      {...props} />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
