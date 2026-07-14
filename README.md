# Frontend Mentor - Newsletter Sign-Up Form with Success Message

This is a clean, accessible, and responsive solution to the [Newsletter sign-up form with success message challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/newsletter-signup-form-with-success-message-3G1W6JAOUI). The application is built using semantic HTML5, component-based CSS (BEM architecture), and vanilla JavaScript.

---

## Table of Contents

- [Overview](#overview)
  - [The Challenge](#the-challenge)
- [My Process](#my-process)
  - [Built With](#built-with)
  - [What I Learned](#what-i-learned)
  - [AI Collaboration & Mentorship](#ai-collaboration--mentorship)

---

## Overview

### The Challenge

Users should be able to:
- View the newsletter sign-up form with a list of user-benefit bullets.
- Submit their email address and see a custom success card displaying their submitted email address in bold.
- Receive immediate, accessible validation feedback (red border, pink background tint, and inline error label) if the input is empty or formatted incorrectly.
- Click the "Dismiss message" button to reset the form and return to the signup screen.
- View a pixel-perfect, responsive layout scaled across mobile (375px), tablet (768px), and desktop (1440px) screen widths.
- Toggle active button states featuring a smooth sliding gradient background transition and box-shadow glow.

---

## My Process

### Built With

- **Semantic HTML5:** `<main>`, `<section>`, `<form>`, `<picture>`, `<source>`, `<label>`, `<input>`, `<button>`
- **CSS Custom Properties (Variables):** Standardized color palettes and typography rules.
- **BEM (Block, Element, Modifier):** Reusable component class architectural styling.
- **CSS Grid & Flexbox:** Dynamic vertical/horizontal alignment, including screen-centered layouts.
- **Dynamic Viewports (`100dvh`):** Enforces full mobile viewport heights without navigation bar clipping.
- **CSS Logical Properties:** Fluid localization support via `inline-size`, `block-size`, and logical padding/margins.
- **Vanilla JavaScript:** Scoped DOM element search, event interception, and class/attribute updates.

---

### What I Learned

During this project, I learned to coordinate visual layout order, media query image swaps, state specificity, and native validation APIs under my mentor's guidance:

#### 1. Option B Visual Inversion (Source vs. Visual Flow)
I learned that for accessibility, screen readers should read primary text heading content (`<h1>`) first. However, on mobile, the illustration image must display at the top of the card. I resolved this by keeping text first in the HTML, and using CSS Flexbox to visually invert the layout on mobile:
```css
.card-signup {
    display: flex;
    flex-direction: column-reverse; /* Flips illustration to the top of the card */
}

@media screen and (min-width: 1024px) {
    .card-signup {
        display: grid; /* Restores side-by-side columns on desktop */
    }
}
```

#### 2. Three-Image Responsive `<picture>` Elements
I learned how to load three different SVG illustrations (mobile, tablet, desktop) dynamically based on viewport widths without utilizing heavy JavaScript resize event listeners:
```html
<picture class="card-signup__image-wrapper">
  <source media="(min-width: 1024px)" srcset="assets/images/illustration-sign-up-desktop.svg">
  <source media="(min-width: 768px)" srcset="assets/images/illustration-sign-up-tablet.svg">
  <img src="assets/images/illustration-sign-up-mobile.svg" alt="" aria-hidden="true" class="card-signup__image">
</picture>
```

#### 3. Native Browser Validity API
I learned that we can tap into the browser's built-in email validation engine via `validity.valid` instead of writing complex regular expressions, keeping our validation pipeline simple and highly performant:
```javascript
if (!emailInput.validity.valid) {
    errorMsg.style.display = "block"; // Trigger error UI
}
```

#### 4. CSS Specificity Over `!important`
I learned that using `!important` is often a stylesheet hack. Instead of overriding display styles forcibly, we can chain classes to naturally increase CSS specificity to hide active layout containers:
```css
/* Specificity: 0-2-0 (double class). Outranks single class layout rules naturally */
.card-signup.hidden,
.card-success.hidden {
    display: none;
}
```

#### 5. Smooth Gradient Sliding Transitions
I learned that browsers cannot animate gradients directly. To create a smooth fade-in gradient on button hover, we make the background double the width of the button, and slide its position smoothly on hover:
```css
.btn {
    background: linear-gradient(90deg, var(--clr-neutral-charcoal) 50%, #ff527b 75%, #ff6a3a 100%);
    background-size: 200% 100%;
    background-position: left bottom;
    transition: background-position 0.4s ease;
}

.btn:hover {
    background-position: right bottom; /* Slides gradient into view smoothly */
}
```

---

### AI Collaboration & Mentorship

This project was built under the guidance of **Antigravity**, a senior AI coding developer. Together, we analyzed design mocks, optimized browser rendering contexts, enforced semantic validation rules, and built clean, modular components.
