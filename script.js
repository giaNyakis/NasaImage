const apiKey = "W8WjrXJh0B4QVZAqYxUuv5rlbpaMaAeGESdynC00"; // Αν έχεις προσωπικό API Key, βάλε το εδώ

const apiUrl = "https://api.nasa.gov/planetary/apod";
let currentDate = new Date().toISOString().split("T")[0]; // Η σημερινή ημερομηνία

// Φέρνει την εικόνα με βάση την ημερομηνία
async function fetchImageByDate(date) {
  const url = `${apiUrl}?api_key=${apiKey}&date=${date}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch the NASA Image of the Day.");
    }
    const data = await response.json();
    console.log(data);
    displayData(data);
    currentDate = date; // Ενημέρωση της τρέχουσας ημερομηνίας
  } catch (error) {
    console.error(error);
    alert("Something went wrong. Please try again later.");
  }
}

// Εμφάνιση δεδομένων στην οθόνη
function displayData(data) {
  document.getElementById("title").textContent = data.title;
  document.getElementById("description").textContent = data.explanation;
  document.getElementById("image").src = data.url;
  document.getElementById("image").alt = data.title;
}

// Υπολογισμός της προηγούμενης ημερομηνίας
function getPreviousDate(date) {
  const d = new Date(date);
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}

// Υπολογισμός της επόμενης ημερομηνίας
function getNextDate(date) {
  const d = new Date(date);
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

// Event listeners για κουμπιά
document.getElementById("fetch-image").addEventListener("click", () => {
  const date = document.getElementById("date-picker").value || currentDate;
  fetchImageByDate(date);
});

document.getElementById("prev-image").addEventListener("click", () => {
  const prevDate = getPreviousDate(currentDate);
  fetchImageByDate(prevDate);
});

document.getElementById("next-image").addEventListener("click", () => {
  const nextDate = getNextDate(currentDate);
  fetchImageByDate(nextDate);
});

// Φέρνει την εικόνα της σημερινής ημέρας κατά την εκκίνηση
fetchImageByDate(currentDate);
