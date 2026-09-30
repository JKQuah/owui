import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Slot } from "radix-ui";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 button-default",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 button-destructive",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 button-outline",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 button-secondary",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 button-ghost",
        link: "text-primary underline-offset-4 hover:underline button-link",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3 button-default",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3 button-xs",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5 button-sm",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4 button-lg",
        icon: "size-9 button-icon",
        "icon-xs":
          "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3 button-icon-xs",
        "icon-sm": "size-8 button-icon-sm",
        "icon-lg": "size-10 button-icon-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = Omit<React.ComponentProps<"button">, "size"> &
  Omit<VariantProps<typeof buttonVariants>, "variant" | "size"> & {
    /** Colour style. Hook: `[data-variant="outline"]`. */
    variant?: VariantProps<typeof buttonVariants>["variant"];
    /**
     * Height / padding / text size. Each value has an override class:
     * `.button-default|xs|sm|lg|icon|icon-xs|icon-sm|icon-lg`.
     */
    size?: VariantProps<typeof buttonVariants>["size"];
    /** Render as the child element (e.g. `<a>`) instead of a `<button>`. */
    asChild?: boolean;
  };

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
