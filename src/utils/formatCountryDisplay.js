import countries from "../data/countries.json";

export function getCountryFlag(iso2) {
  if (!iso2 || iso2.length !== 2) return "";

  return iso2[0] === "X"
    ? "🌐"
    : String.fromCodePoint(
        0x1f1e6 + iso2.charCodeAt(0) - 65,
        0x1f1e6 + iso2.charCodeAt(1) - 65,
      );
}

export function getCountryName(iso2) {
  if (!iso2 || iso2.length !== 2) return "";

  const country = countries.states_lists[0].states.find(
    (state) => state.iso2 === iso2,
  );
  return country ? country.name : iso2;
}

export function formatCountryDisplay(iso2) {
  const flag = getCountryFlag(iso2);
  const name = getCountryName(iso2);
  return flag && name ? `${flag} ${name}` : name;
}
