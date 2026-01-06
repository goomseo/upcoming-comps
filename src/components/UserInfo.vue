<template>
  <div class="border-t pt-4 mt-4">
    <p><strong>Name: </strong>{{ user.user.name }}</p>
    <p><strong>Region: </strong>{{ user.user.country.name }}</p>
    <p>
      <strong>WCA ID: </strong>
      <a
        :href="user.user.url"
        target="_blank"
        class="text-blue-700 hover:underline"
        >{{ user.user.wca_id }}</a
      >
    </p>

    <div v-if="sortedCompetitions.length" class="mt-4">
      <p class="font-semibold">Upcoming Competitions:</p>
      <div class="overflow-x-auto">
        <table class="min-w-full border mt-2 text-left text-xs sm:text-sm">
          <thead>
            <tr class="bg-gray-100">
              <th class="px-2 py-1 border">#</th>
              <th class="px-2 py-1 border">Date</th>
              <th class="px-2 py-1 border">Name</th>
              <th class="px-2 py-1 border">City</th>
              <th class="px-2 py-1 border">Country</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(comp, idx) in sortedCompetitions" :key="comp.id">
              <td class="px-2 py-1 border">{{ idx + 1 }}</td>
              <td class="px-2 py-1 border">{{ comp.start_date }}</td>
              <td class="px-2 py-1 border">
                <a
                  :href="comp.url"
                  target="_blank"
                  class="text-blue-700 hover:underline">
                  {{ comp.name }}
                </a>
              </td>
              <td class="px-2 py-1 border">{{ comp.city }}</td>
              <td class="px-2 py-1 border">
                {{ getCountryName(comp.country_iso2) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-else class="mt-4 text-gray-500">No upcoming competitions...</div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import countries from "../data/countries.json";

const props = defineProps({
  user: Object,
});

const countryMap = {};
for (const country of countries.states_lists[0].states) {
  countryMap[country.iso2] = country.name;
}

const sortedCompetitions = computed(() => {
  const upcoming_competitions = props.user.upcoming_competitions || [];
  return upcoming_competitions
    .filter((c) => c.announced_at !== null)
    .sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
});

function getCountryName(iso2) {
  return countryMap[iso2] || iso2;
}
</script>
