"use client"

import * as React from "react"
import {
  MessageScroller as MessageScrollerPrimitive,
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
} from "@shadcn/react/message-scroller"

import { cn } from "@/lib/utils"

const ArrowDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M5 12l7 7 7-7" />
  </svg>
)

function MessageScrollerProvider(
  props: React.ComponentProps<typeof MessageScrollerPrimitive.Provider>
) {
  return <MessageScrollerPrimitive.Provider {...props} />
}

function MessageScroller({
  className,
  ...props
}: React.ComponentProps<typeof MessageScrollerPrimitive.Root>) {
  return (
    <MessageScrollerPrimitive.Root
      data-slot="message-scroller"
      className={cn(
        "group/message-scroller relative flex size-full min-h-0 flex-col overflow-hidden",
        className
      )}
      {...props}
    />
  )
}

function MessageScrollerViewport({
  className,
  ...props
}: React.ComponentProps<typeof MessageScrollerPrimitive.Viewport>) {
  return (
    <MessageScrollerPrimitive.Viewport
      data-slot="message-scroller-viewport"
      className={cn(
        "size-full min-h-0 min-w-0 overflow-y-auto overscroll-contain",
        className
      )}
      {...props}
    />
  )
}

function MessageScrollerContent({
  className,
  ...props
}: React.ComponentProps<typeof MessageScrollerPrimitive.Content>) {
  return (
    <MessageScrollerPrimitive.Content
      data-slot="message-scroller-content"
      className={cn("flex h-max min-h-full flex-col", className)}
      {...props}
    />
  )
}

function MessageScrollerItem({
  className,
  scrollAnchor = false,
  ...props
}: React.ComponentProps<typeof MessageScrollerPrimitive.Item>) {
  return (
    <MessageScrollerPrimitive.Item
      data-slot="message-scroller-item"
      scrollAnchor={scrollAnchor}
      className={cn("min-w-0 shrink-0", className)}
      {...props}
    />
  )
}

function MessageScrollerButton({
  direction = "end",
  className,
  children,
  ...props
}: React.ComponentProps<typeof MessageScrollerPrimitive.Button> & {
  direction?: "start" | "end"
}) {
  return (
    <MessageScrollerPrimitive.Button
      data-slot="message-scroller-button"
      direction={direction}
      className={cn(
        // positioning: horizontally centred, sticks to bottom/top edge
        "absolute left-1/2 -translate-x-1/2",
        "data-[direction=end]:bottom-3 data-[direction=start]:top-3",
        // appearance — uses Geist tokens
        "flex h-7 w-7 items-center justify-center rounded-full",
        "border border-gray-300 bg-background-100 text-gray-700 shadow-sm",
        "hover:border-gray-500 hover:text-gray-1000 transition-colors cursor-pointer",
        // show/hide animation driven by primitive's data-[active] attribute
        "transition-[transform,opacity] duration-200",
        "data-[active=false]:pointer-events-none data-[active=false]:opacity-0 data-[active=false]:scale-90",
        "data-[active=true]:opacity-100 data-[active=true]:scale-100",
        "data-[direction=end]:data-[active=false]:translate-y-2",
        "data-[direction=start]:data-[active=false]:-translate-y-2",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          <ArrowDownIcon />
          <span className="sr-only">
            {direction === "end" ? "Scroll to bottom" : "Scroll to top"}
          </span>
        </>
      )}
    </MessageScrollerPrimitive.Button>
  )
}

export {
  MessageScrollerProvider,
  MessageScroller,
  MessageScrollerViewport,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerButton,
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
}
