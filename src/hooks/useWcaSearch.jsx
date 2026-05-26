import { useState, useCallback } from "react";
import { getCountryFlag, getCountryName } from "../utils/formatCountryDisplay";

const WCA_API_BASE = "https://www.worldcubeassociation.org/api/v0";

async function fetchPersonSummary(wcaId) {
  try {
    const response = await fetch(`${WCA_API_BASE}/persons/${wcaId}`);
    if (!response.ok) return null;
    const data = await response.json();
    const competitionCount = data.competition_count ?? null;
    const completedSolves = data.total_solves ?? null;

    if (competitionCount === null && completedSolves === null) {
      return null;
    }

    return [competitionCount, completedSolves];
  } catch {
    return null;
  }
}

function mapCompetitionToRow(item, index) {
  return {
    id: index + 1,
    date_range: item?.date_range || "",
    name: item?.name || "",
    city: item?.city || "",
    countryName: getCountryName(item?.country_iso2),
    countryFlag: getCountryFlag(item?.country_iso2),
    url: item?.url || "",
    hoverText:
      item?.competitionType === "ongoing"
        ? "This competition might still be ongoing or have recently ended."
        : undefined,
    isOngoing: item?.competitionType === "ongoing",
  };
}

export default function useWcaSearch() {
  const [state, setState] = useState({
    rows: [],
    user: null,
    loading: false,
    error: "",
    competitionCount: null,
    completedSolves: null,
  });

  const updateState = useCallback((updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetResults = useCallback(() => {
    updateState({
      rows: [],
      user: null,
      error: "",
      competitionCount: null,
      completedSolves: null,
    });
  }, [updateState]);

  const fetchUpcomingCompetitions = useCallback(
    async (wcaId) => {
      updateState({ loading: true, error: "" });
      resetResults();

      try {
        const response = await fetch(
          `${WCA_API_BASE}/users/${wcaId}?upcoming_competitions=true&ongoing_competitions=true`,
        );

        if (!response.ok) {
          const errorMessage =
            response.status === 404
              ? "User not found."
              : `API error: ${response.status}`;
          throw new Error(errorMessage);
        }

        const data = await response.json();

        const upcoming = Array.isArray(data.upcoming_competitions)
          ? data.upcoming_competitions.map((item) => ({
              ...item,
              competitionType: "upcoming",
            }))
          : [];
        const ongoing = Array.isArray(data.ongoing_competitions)
          ? data.ongoing_competitions.map((item) => ({
              ...item,
              competitionType: "ongoing",
            }))
          : [];

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const rows = [...upcoming, ...ongoing]
          .filter((item) => {
            if (item?.announced_at === null) return false;

            if (item?.registration_open) {
              const registrationOpen = new Date(item.registration_open);
              if (registrationOpen > today) return false;
            }

            return true;
          })
          .sort((a, b) => {
            return (
              new Date(a?.start_date || "9999-12-31") -
              new Date(b?.start_date || "9999-12-31")
            );
          })
          .map(mapCompetitionToRow);

        const [competitionCount, completedSolves] =
          (await fetchPersonSummary(wcaId)) ?? [];

        updateState({
          user: data.user || null,
          rows,
          loading: false,
          competitionCount,
          completedSolves,
        });
      } catch (err) {
        updateState({
          error: err.message || "An unexpected error occurred.",
          loading: false,
        });
      }
    },
    [updateState, resetResults],
  );

  const handleSearch = useCallback(
    (query) => {
      fetchUpcomingCompetitions(query.trim());
    },
    [fetchUpcomingCompetitions],
  );

  return {
    ...state,
    handleSearch,
  };
}
