<template>
  <main class="min-h-screen bg-gray-100 p-4 sm:p-6">
    <div class="max-w-6xl mx-auto bg-white p-4 sm:p-6 rounded shadow">
      <h1 class="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-left">Upcoming Comps</h1>
      <p class="text-base sm:text-lg font-medium text-left">Track upcoming competitions of the competitors you’re looking for!</p>
      <p class="text-sm sm:text-base font-normal mb-4 text-left">
        Note: Competitions that use an external registration website cannot be tracked unless the competitor list is uploaded to the WCA website.
      </p>
      <div class="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          v-model="wcaId"
          @input="wcaId = wcaId.toUpperCase()"
          @keyup.enter="fetchUserData"
          type="text"
          maxlength="10"
          placeholder="Enter WCA ID (e.g. 2014GUMI01)"
          class="flex-1 w-full min-w-0 border border-gray-300 rounded px-3 py-2"
        />
        <button
          @click="fetchUserData"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
        >
          Search
        </button>
      </div>

      <div v-if="error" class="text-red-600 mb-2 font-bold">{{ error }}</div>

      <UserInfo v-if="user" :user="user" />
    </div>
    <footer class="mt-12 border-t pt-4 text-xs sm:text-sm text-gray-500 text-center">
      <p>
        Built by <a href="https://github.com/goomseo" target="_blank" class="text-orange-600 hover:underline">Minseo Gu</a> (<a href="https://www.worldcubeassociation.org/persons/2014GUMI01" target="_blank" class="text-orange-600 hover:underline">2014GUMI01</a>).
      </p>
      <p>
        Source code available on <a href="https://github.com/goomseo/upcoming-comps" target="_blank" class="text-orange-600 hover:underline">GitHub</a>.
      </p>
    </footer>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import UserInfo from './components/UserInfo.vue'

const wcaId = ref('')
const user = ref(null)
const error = ref('')

function isValidWcaId(id) {
  return /^\d{4}[A-Z]{4}\d{2}$/.test(id)
}

const fetchUserData = async () => {
  if (!wcaId.value.trim() || !isValidWcaId(wcaId.value)) {
    error.value = 'Please enter a correct WCA ID.'
    user.value = null
    return
  }

  const currentId = wcaId.value
  wcaId.value = ''

  try {
    error.value = ''
    user.value = null
    const res = await fetch(
      `https://www.worldcubeassociation.org/api/v0/users/${currentId}?upcoming_competitions=true`
    )

    if (!res.ok) throw new Error('User not found.')

    const data = await res.json()
    user.value = data
  } catch (err) {
    error.value = err.message
  }
}
</script>