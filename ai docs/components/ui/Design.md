`/Users/d.andrews/ai-chatbot/design-system copy.md`:

```md
# Design System Documentation

## Table of Contents
1. [Color System](#color-system)
2. [Typography](#typography)
3. [Spacing & Layout](#spacing--layout)
4. [Animations](#animations)
5. [Components](#components)
6. [Dark Mode](#dark-mode)
7. [Responsive Design](#responsive-design)
8. [Accessibility](#accessibility)

## Color System

### CSS Variables
The application uses HSL color values with CSS variables for dynamic theming:

```css
/ globals.css /
:root {
--background: 0 0% 100%; / White /
--foreground: 240 10% 3.9%; / Almost black /
--card: 0 0% 100%; / White /
--card-foreground: 240 10% 3.9%;
--popover: 0 0% 100%;
--popover-foreground: 240 10% 3.9%;
--primary: 217 100% 45%; / Blue /
--primary-foreground: 0 0% 98%;
--secondary: 213 100% 96%; / Light blue /
--secondary-foreground: 240 5.9% 10%;
--muted: 240 4.8% 95.9%;
--muted-foreground: 240 3.8% 46.1%;
--accent: 240 4.8% 95.9%;
--accent-foreground: 240 5.9% 10%;
--destructive: 0 84.2% 60.2%; / Red /
--destructive-foreground: 0 0% 98%;
--border: 214 32% 91%;
--input: 240 5.9% 90%;
--ring: 240 10% 3.9%;
--radius: 0.5rem;
}
```

```css
.dark {
--background: 240 10% 3.9%; / Almost black /
--foreground: 0 0% 98%; / Almost white /
/ Additional dark mode variables /
--card: 240 10% 3.9%;
--card-foreground: 0 0% 98%;
--popover: 240 10% 3.9%;
--popover-foreground: 0 0% 98%;
--muted: 240 3.7% 15.9%;
--muted-foreground: 240 5% 64.9%;
/ ... other variables ... /
}
```


### Usage in Tailwind CSS

These variables are integrated into Tailwind's configuration for easy use in class names.

```js
// tailwind.config.js
module.exports = {
theme: {
extend: {
colors: {
background: 'hsl(var(--background))',
foreground: 'hsl(var(--foreground))',
primary: {
DEFAULT: 'hsl(var(--primary))',
foreground: 'hsl(var(--primary-foreground))',
},
/ ... other colors ... /
},
},
},
};
```


#### Applying Colors in Components

```tsx
// ExampleComponent.tsx
export const ExampleComponent = () => (
<div className="bg-background text-foreground">
<button className="bg-primary text-primary-foreground hover:bg-primary/90">
Click Me
</button>
</div>
);
```


### Chart Colors

Special colors for data visualization are defined to maintain a consistent look for charts and graphs.

```css
/ globals.css /
:root {
--chart-1: 12 76% 61%; / Orange /
--chart-2: 173 58% 39%; / Green /
--chart-3: 197 37% 24%; / Teal /
--chart-4: 43 74% 66%; / Yellow /
--chart-5: 27 87% 67%; / Peach /
}
```


#### Using Chart Colors

```js
// ChartComponent.js
const chartColors = [
'hsl(var(--chart-1))',
'hsl(var(--chart-2))',
'hsl(var(--chart-3))',
'hsl(var(--chart-4))',
'hsl(var(--chart-5))',
];
// Apply chartColors to your data visualization library
```


---

## Typography

### Font Family

Custom fonts are used for both regular text and monospace text to ensure branding consistency.


```css
/ globals.css /
@font-face {
font-family: 'geist';
font-style: normal;
font-weight: 100 900;
src: url('/fonts/geist.woff2') format('woff2');
}
@font-face {
font-family: 'geist-mono';
font-style: normal;
font-weight: 100 900;
src: url('/fonts/geist-mono.woff2') format('woff2');
}


These fonts are then specified in Tailwind's configuration:

```js
// tailwind.config.js
module.exports = {
theme: {
fontFamily: {
sans: ['geist', 'sans-serif'],
mono: ['geist-mono', 'monospace'],
},
},
};
```


### Text Styles

Consistent heading styles are defined to maintain uniform typography across the application.

```tsx
// Typography.tsx
export const headingStyles = {
h1: 'text-3xl font-bold mt-8 mb-4',
h2: 'text-2xl font-semibold mt-6 mb-3',
h3: 'text-xl font-semibold mt-6 mb-2',
h4: 'text-lg font-medium mt-4 mb-2',
h5: 'text-base font-medium mt-3 mb-1',
h6: 'text-sm font-medium mt-2 mb-1',
};
// Usage example
export const Heading = ({ level, children }) => {
const Tag = h${level} as keyof JSX.IntrinsicElements;
return <Tag className={headingStyles[h${level}]}>{children}</Tag>;
};
```


---

## Spacing & Layout

### Spacing Scale

We follow Tailwind's default spacing scale, which allows for consistent padding and margin throughout the application.

```css
/ Example spacing utilities /
.mt-4 {
margin-top: 1rem; / 16px /
}
.px-6 {
padding-left: 1.5rem; / 24px /
padding-right: 1.5rem;
}


### Grid System

We utilize Tailwind's grid system for responsive layouts.

```tsx
// GridExample.tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
{/ Grid items /}
</div>


---

## Animations

### Framer Motion Defaults

Animations enhance the user experience by providing visual feedback and smooth transitions.

#### Fade In Scale Animation

```tsx
// animations.ts
export const fadeInScale = {
initial: { opacity: 0, scale: 0.95 },
animate: { opacity: 1, scale: 1 },
exit: { opacity: 0, scale: 0.95 },
transition: { duration: 0.3 },
};
// Usage in a component
import { motion } from 'framer-motion';
import { fadeInScale } from './animations';
export const Modal = ({ isOpen, children }) => (
<AnimatePresence>
{isOpen && (
<motion.div {...fadeInScale}>
{children}
</motion.div>
)}
</AnimatePresence>
);


#### Slide Up Fade Animation

```tsx
// animations.ts
export const slideUpFade = {
initial: { y: 20, opacity: 0 },
animate: { y: 0, opacity: 1 },
exit: { y: 20, opacity: 0 },
transition: { duration: 0.3 },
};
// Usage in a component
<motion.div {...slideUpFade}>
{/ Content /}
</motion.div>


### Loading States

#### Skeleton Loading

Skeleton components indicate content loading state to the user.

```css
/ globals.css /
.skeleton {
@apply bg-muted animate-pulse rounded-md;
}
@keyframes pulse {
0%, 100% {
opacity: 0.8;
}
50% {
opacity: 0.5;
}
}


Usage:

```tsx
// SkeletonComponent.tsx
export const SkeletonBox = () => (
<div className="skeleton h-6 w-full mb-4"></div>
);


#### Spinner Animation

```css
/ globals.css /
@keyframes spin {
to {
transform: rotate(360deg);
}
}
.animate-spin {
animation: spin 1s linear infinite;
}


Usage:

```tsx
// Spinner.tsx
export const Spinner = () => (
<div className="w-8 h-8 border-4 border-t-transparent border-primary rounded-full animate-spin"></div>
);


---

## Components

### Button Variants

Buttons are designed to be flexible and consistent.

#### Button Component

```tsx
// Button.tsx
import { cn } from '@/lib/utils';
const buttonVariants = {
default: 'bg-primary text-primary-foreground hover:bg-primary/90',
outline: 'border border-input bg-background hover:bg-accent',
ghost: 'bg-transparent hover:bg-accent',
link: 'text-primary underline-offset-4 hover:underline',
};
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
variant?: keyof typeof buttonVariants;
}
export const Button: React.FC<ButtonProps> = ({ variant = 'default', className, ...props }) => (
<button
className={cn(
'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50',
buttonVariants[variant],
className
)}
{...props}
/>
);


#### Usage

```tsx
<Button>Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>


### Card Styling

Cards are used to group related content and actions.

#### Card Component

```tsx
// Card.tsx
export const Card: React.FC = ({ children }) => (
<div className="rounded-lg border bg-card text-card-foreground shadow">
{children}
</div>
);
export const CardHeader: React.FC = ({ children }) => (
<div className="p-4 border-b">
{children}
</div>
);
export const CardBody: React.FC = ({ children }) => (
<div className="p-4">
{children}
</div>
);
export const CardFooter: React.FC = ({ children }) => (
<div className="p-4 border-t">
{children}
</div>
);
```


#### Usage

```tsx
<Card>
<CardHeader>
<h3 className="text-lg font-semibold">Card Title</h3>
</CardHeader>
<CardBody>
<p>Card content goes here.</p>
</CardBody>
<CardFooter>
<Button variant="primary">Action</Button>
</CardFooter>
</Card>
```


### Input Elements

#### Input Component

```tsx
// Input.tsx
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
({ className, ...props }, ref) => (
<input
ref={ref}
className={cn(
'block w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
className
)}
{...props}
/>
)
);


#### Usage

```tsx
<Input placeholder="Enter your email" />
```


---

## Dark Mode

### Theme Switching

We update the `theme-color` meta tag based on the current theme to ensure the status bar color matches the theme.

```html
<!-- index.html -->
<head>
<!-- Other meta tags -->
<script>
(function() {
var html = document.documentElement;
var meta = document.querySelector('meta[name="theme-color"]');
if (!meta) {
meta = document.createElement('meta');
meta.setAttribute('name', 'theme-color');
document.head.appendChild(meta);
}
function updateThemeColor() {
var isDark = html.classList.contains('dark');
meta.setAttribute('content', isDark ? 'hsl(240deg 10% 3.9%)' : 'hsl(0 0% 100%)');
}
var observer = new MutationObserver(updateThemeColor);
observer.observe(html, { attributes: true, attributeFilter: ['class'] });
updateThemeColor();
})();
</script>
</head>
```


### Dark Mode Variants

Components adjust their styles based on the theme.

```tsx
// Component.tsx
<div className="bg-white dark:bg-gray-800 text-black dark:text-white">
{/ Content /}
</div>
<code className="bg-gray-100 dark:bg-gray-900 p-2 rounded">
{/ Code content /}
</code>
```


---

## Responsive Design

### Breakpoints

We use Tailwind's default breakpoints for a mobile-first approach.

- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

### Mobile-First Approach

Styles are applied from smallest to largest screens.

```tsx
// ResponsiveComponent.tsx
<div className="p-4 md:p-8 lg:p-16">
<div className="text-base md:text-lg lg:text-xl">
Responsive text size
</div>
</div>
```



---

## Accessibility

### Focus States

We ensure focus is visible and distinct for interactive elements.

```css
/ globals.css /
.focus-visible {
@apply outline-none ring-2 ring-offset-2 ring-primary;
}
```


Usage:

```tsx
<button className="focus-visible">
Accessible Button
</button>
```

### Screen Reader Support

Use visually hidden elements for screen readers.

css
/ globals.css /
.sr-only {
position: absolute;
width: 1px;
height: 1px;
padding: 0;
margin: -1px;
overflow: hidden;
clip: rect(0, 0, 0, 0);
white-space: nowrap;
border: 0;
}


Usage:
```tsx
<span className="sr-only">Description for screen readers</span>
```


### Interactive Elements

Ensure all interactive elements are accessible via keyboard and screen readers.

```tsx
// AccessibleButton.tsx
<button
type="button"
aria-label="Close"
className="focus:outline-none focus-visible:ring-2"
onClick={handleClose}
>
<span className="sr-only">Close</span>
{/ Icon or visible content /}
</button>
```


---

## Best Practices

1. **Use CSS Variables**: For theme values, to enable dynamic theming.

2. **Maintain Consistent Spacing**: Stick to a standardized spacing scale.

3. **Semantic HTML Elements**: Enhance accessibility and SEO.

4. **Color Contrast Ratios**: Ensure text is legible against backgrounds.

5. **Smooth Transitions**: Use CSS transitions for UI interactions.

   ```css
   /* globals.css */

   .transition {
     transition: all 0.3s ease;
   }
   ```

6. **Mobile-First Design**: Start with mobile styles and build up.

7. **Consistent Component Patterns**: Promote reusability and maintainability.

8. **Proper ARIA Attributes**: Improve accessibility for assistive technologies.

9. **Loading States and Animations**: Provide visual feedback during async operations.

10. **Support Light and Dark Modes**: Ensure all components adapt to theme changes.

---

## Conclusion

This design system serves as a comprehensive guide to the application's styling, components, and best practices. By adhering to these guidelines, developers can ensure a consistent and high-quality user experience across the entire application.
