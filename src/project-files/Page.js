export default function Page({ children }) {
  return (
    <div className="container">
      <div className="container--setBlur">{children}</div>;
    </div>
  );
}
