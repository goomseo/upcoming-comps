import CustomLink from "./CustomLink";

export default function Footer() {
  return (
    <footer className="mb-12 border-t border-slate-300 pt-4 text-xs sm:text-sm text-gray-500 text-center">
      <p className="leading-relaxed">
        Built by{" "}
        <CustomLink href="https://github.com/goomseo" text="Minseo Gu" /> (
        <CustomLink
          href="https://www.worldcubeassociation.org/persons/2014GUMI01"
          text="2014GUMI01"
        />
        ).
      </p>
      <p className="leading-relaxed">
        Source code available on{" "}
        <CustomLink
          href="https://github.com/goomseo/upcoming-comps"
          text="GitHub"
        />
        .
      </p>
    </footer>
  );
}
