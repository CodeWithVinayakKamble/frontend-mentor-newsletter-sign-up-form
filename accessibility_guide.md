# Web Accessibility (A11y) Guide - Newsletter Sign-Up Form

This document provides a detailed breakdown of the accessibility attributes, semantic HTML elements, and ARIA attributes implemented in the Newsletter Sign-Up Form to ensure compliance with WCAG guidelines and screen reader compatibility.

---

## 1. Summary of Accessibility Attributes Used

| Attribute | Element Target | Value Type / State | Primary Purpose |
| :--- | :--- | :--- | :--- |
| `novalidate` | `<form>` | Boolean | Disables default browser validation bubbles so screen readers and styles can use custom inline validation formats. |
| `aria-describedby` | `<input>` | ID reference | Links the input field directly to the dynamic error message label for descriptive reading. |
| `aria-live` | `<span>` | `assertive` | Instructs screen readers to interrupt ongoing announcements and immediately read the validation error message when displayed. |
| `aria-invalid` | `<input>` | `true` / `false` | Sets a programmatic state telling assistive technology whether the entered value matches validation rules. |
| `aria-hidden` | `<section>`, `<img>` | `true` / `false` | Hides decorative images or inactive panels from the screen reader's accessibility tree. |

---

## 2. Detailed Attribute Breakdown

### A. `novalidate`
* **Format:** `<form novalidate>`
* **Implementation:**
  ```html
  <form id="newsletter-form" class="signup-form" novalidate>
  ```
* **Use Case:**
  By default, standard HTML5 forms pop up a browser-default tooltip block if validation fails. These tooltips are often unstyled and poorly read by screen readers. Adding `novalidate` blocks these bubbles, allowing us to manage validation states and readouts programmatically through our custom JS and CSS classes.

---

### B. `aria-describedby`
* **Format:** `aria-describedby="[target-element-id]"`
* **Implementation:**
  ```html
  <input 
      type="email" 
      id="email" 
      aria-describedby="error-msg" 
      required
  >
  ```
* **Use Case:**
  This links the text input field to the error message element. When a screen reader user focuses on the input field, the reader does not just say *"Email input box"*; it automatically reads the associated text from the target ID, announcing: *"Email input box. Valid email required"* if the error state is active.

---

### C. `aria-live`
* **Format:** `aria-live="assertive"`
* **Implementation:**
  ```html
  <span id="error-msg" class="signup-form__error" aria-live="assertive">
      Valid email required
  </span>
  ```
* **Use Case:**
  Tells the browser that the content inside this element is dynamic and important.
  * **`assertive`:** The screen reader will immediately interrupt whatever it is currently reading to announce the error the instant it is toggled on (`style.display = "block"`).
  * **`polite`:** (Alternative) The screen reader waits until the user finishes typing or listening to the current block before announcing the update. For critical validation errors, `assertive` is the industry standard.

---

### D. `aria-invalid`
* **Format:** `element.setAttribute("aria-invalid", "true" | "false")`
* **Implementation:**
  ```javascript
  if (!email.validity.valid) {
      email.setAttribute("aria-invalid", "true");
  } else {
      email.removeAttribute("aria-invalid");
  }
  ```
* **Use Case:**
  This is a programmatic state check. When a screen reader user returns to a field they filled out incorrectly, the browser alerts them: *"Invalid Entry. Email Input Box"* so they instantly know which fields need correction.

---

### E. `aria-hidden`
* **Format:** `aria-hidden="true" | "false"`
* **Implementation:**
  ```html
  <!-- Hides a decorative checkmark image -->
  <img src="assets/images/icon-list.svg" alt="" aria-hidden="true">

  <!-- Hides the Success screen until it is active -->
  <section id="success-card" class="card-success hidden" aria-hidden="true">
  ```
* **Use Case:**
  * **Decorative Icons:** Visual icons (like checkmarks or warning circles) are redundant for screen reader users. Adding `aria-hidden="true"` and an empty `alt=""` stops the screen reader from reading *"checkmark image"* next to every single list item, keeping the list reading flow clean.
  * **Inactive Screens:** Because both the Sign-up Card and Success Card are on the same page, we must hide the inactive card from the browser's accessibility tree so users cannot tab into hidden buttons or inputs behind the scenes.
