// A small, unstyled primitive. Visual variants will be added with the UI.
export function Button({ className, type = "button", ...props }) {
  return <button className={className ? `button ${className}` : "button"} type={type} {...props} />;
}
