const apiKey = "W8WjrXJh0B4QVZAqYxUuv5rlbpaMaAeGESdynC00"; // Αν έχεις προσωπικό API Key, βάλε το εδώ

const today = new Date().toISOString().split("T")[0];
let currentDate = today;

// Ενημέρωση εικόνας από API
const updateImage = async (date) => {
  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`
    );
    const data = await response.json();

    document.querySelector("#image").src = data.url;
    document.querySelector("#description").textContent = data.explanation;
    document.querySelector("#title").textContent = data.title;

    // Απενεργοποίηση κουμπιού "Next" αν είναι σημερινή ημερομηνία
    document.querySelector("#next").disabled = date === today;
  } catch (error) {
    console.error("Error fetching image:", error);
  }
};

// Διαχείριση κουμπιού "Previous"
document.querySelector("#previous").addEventListener("click", () => {
  const newDate = new Date(currentDate);
  newDate.setDate(newDate.getDate() - 1);
  currentDate = newDate.toISOString().split("T")[0];
  updateImage(currentDate);
});

// Διαχείριση κουμπιού "Next"
document.querySelector("#next").addEventListener("click", () => {
  const newDate = new Date(currentDate);
  newDate.setDate(newDate.getDate() + 1);
  currentDate = newDate.toISOString().split("T")[0];
  updateImage(currentDate);
});

// Διαχείριση αποθήκευσης εικόνας
document.querySelector("#save").addEventListener("click", () => {
  const imageUrl = document.querySelector("#image").src;
  const link = document.createElement("a");
  link.href = imageUrl;
  link.download = "nasa_image.jpg";
  link.click();
});

// Αρχική εμφάνιση εικόνας
updateImage(today);
