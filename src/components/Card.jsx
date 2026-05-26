export default function Card({ children }) {
  return (
    <div
      className={`w-full min-w-0 bg-white p-6 rounded-xl shadow-sm ring-1 ring-slate-200`}>
      {children}
    </div>
  );
}
