export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

export function validatePassword(pw, minLen = 6) {
  return String(pw || "").length >= minLen;
}

export function validateRegister({ name, email, password }) {
  const errors = {};
  if (!String(name || "").trim()) errors.name = "Name is required";
  if (!String(email || "").trim()) errors.email = "Email is required";
  else if (!validateEmail(email)) errors.email = "Enter a valid email";
  if (!String(password || "").trim()) errors.password = "Password is required";
  else if (!validatePassword(password)) errors.password = "Password must be at least 6 characters";
  return errors;
}

export function validateLogin({ email, password }) {
  const errors = {};
  if (!String(email || "").trim()) errors.email = "Email is required";
  else if (!validateEmail(email)) errors.email = "Enter a valid email";
  if (!String(password || "").trim()) errors.password = "Password is required";
  return errors;
}

export function validateNote({ title, content, category }) {
  const errors = {};
  if (!String(title || "").trim()) errors.title = "Title is required";
  if (!String(content || "").trim()) errors.content = "Content is required";
  if (!String(category || "").trim()) errors.category = "Category is required";
  return errors;
}
