import { useCallback, useMemo, useRef } from "react";
import Card from "./Card";
import DataTable from "./DataTable";
import CustomLink from "./CustomLink";
import useWcaSearch from "../hooks/useWcaSearch";
import { formatCountryDisplay } from "../utils/formatCountryDisplay";

const columns = [
  { header: "#", accessor: "id" },
  {
    header: "Date",
    accessor: "date_range",
    render: (row) => row.date_range || "",
  },
  {
    header: "Name",
    accessor: "name",
    render: (row) => (
      <span className="inline-flex items-center gap-2">
        {row.countryFlag ? <span>{row.countryFlag}</span> : null}
        {row.url ? <CustomLink href={row.url} text={row.name} /> : row.name}
      </span>
    ),
  },
  {
    header: "Location",
    accessor: "location",
    render: (row) => (
      <span>
        <strong>{row.countryName || ""}</strong>
        {row.countryName && row.city ? ", " : ""}
        {row.city}
      </span>
    ),
  },
];

export default function Finder() {
  const {
    rows,
    user,
    loading,
    error,
    handleSearch,
    competitionCount,
    completedSolves,
  } = useWcaSearch();

  const emptyText = useMemo(
    () =>
      loading ? "Loading competitions..." : "No upcoming competitions found.",
    [loading],
  );

  const inputRef = useRef(null);

  const searchInput = useCallback(() => {
    handleSearch((inputRef.current?.value || "").toUpperCase());
  }, [handleSearch]);

  const handleKeyUp = useCallback(
    (event) => {
      if (event.key === "Enter") {
        searchInput();
      }
    },
    [searchInput],
  );

  const handleButtonClick = useCallback(() => {
    searchInput();
  }, [searchInput]);

  return (
    <Card>
      <div className="mb-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold text-slate-900">
          Search Upcoming Competitions
        </h2>
        <div className="flex w-full max-w-xl items-center gap-3">
          <input
            type="text"
            placeholder="WCA ID" // TODO: search by name with autocomplete
            className="flex-1 min-w-0 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
            onKeyUp={handleKeyUp}
            ref={inputRef}
          />
          <button
            type="button"
            className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-700  "
            onClick={handleButtonClick}
            disabled={loading}>
            {loading ? "Loading..." : "Search"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 ring-1 ring-red-200">
          {error}
        </div>
      )}

      {user && (
        <ul className="mb-4 grid gap-3 sm:grid-cols-2 rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-600 ring-1 ring-slate-200">
          <li>
            <strong>Name:</strong> {user.name}
          </li>
          <li>
            <strong>WCA ID:</strong> {user.wca_id}
          </li>
          <li>
            <strong>Region:</strong> {formatCountryDisplay(user.country_iso2)}
          </li>
          <li>
            <strong>Total Competitions:</strong> {competitionCount ?? "-"}
          </li>
          <li>
            <strong>Upcoming Competitions:</strong> {rows.length}
          </li>
          <li>
            <strong>Completed Solves:</strong> {completedSolves ?? "-"}
          </li>
        </ul>
      )}

      <DataTable
        title={
          user ? (
            <span className="inline-flex flex-wrap items-center">
              Upcoming Competitions for {user.name} (
              {user.wca_id ? (
                <CustomLink
                  href={`https://www.worldcubeassociation.org/persons/${user.wca_id}`}
                  text={user.wca_id}
                />
              ) : (
                "N/A"
              )}
              )
            </span>
          ) : (
            "Upcoming Competitions for ..."
          )
        }
        columns={columns}
        rows={rows}
        emptyText={emptyText}
      />

      <div className="mt-8 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200 text-sm text-slate-600">
        Note: Competitions that do not use an internal WCA registration system
        cannot be tracked unless the competitor list is uploaded to the WCA
        website.
      </div>
    </Card>
  );
}
