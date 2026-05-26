export default function CustomLink({ href, text }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-blue-600 hover:underline">
      {text}
    </a>
  );
}
