//firebase
const firebaseConfig = {
  apiKey: "AIzaSyDZhnrgmZVh4l_gOz9XFCdiDMcm0mLN-0o",
  authDomain: "rommel-b1e75.firebaseapp.com",
  projectId: "rommel-b1e75",
  storageBucket: "rommel-b1e75.appspot.com",
  messagingSenderId: "275353446891",
  appId: "1:275353446891:web:d848205741eba04dbc11ae",
  measurementId: "G-N550DXBM19"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


// 📌 Contact Form Submit
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const statusEl = document.createElement("p"); // status element
  statusEl.id = "form-status";
  statusEl.style.marginTop = "10px";
  statusEl.style.display = "none";
  form.parentNode.appendChild(statusEl); // add after form

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());

      try {
        await db.collection("messages").add({
          name: data.name,
          email: data.email,
          message: data.message,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        // ✅ Show success notification
        statusEl.style.display = "block";
        statusEl.style.color = "green";
        statusEl.textContent = `✅ Thanks, ${data.name}! Your message was sent successfully.`;
        form.reset();

        // Hide after 5s
        setTimeout(() => {
          statusEl.style.display = "none";
        }, 5000);

      } catch (error) {
        console.error("Error adding document: ", error);
        statusEl.style.display = "block";
        statusEl.style.color = "red";
        statusEl.textContent = "❌ Oops! Something went wrong. Please try again.";
      }
    });
  }

  // 📌 Real-time listener (for admin viewing)
  const messagesList = document.getElementById("messages-list");
  if (messagesList) {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        messagesList.innerHTML = "";
        snapshot.forEach((doc) => {
          const msg = doc.data();
          const li = document.createElement("li");
          li.textContent = `${msg.name} (${msg.email}): ${msg.message}`;
          messagesList.appendChild(li);
        });
      });
  }
});


// Year badge
document.getElementById('year').textContent = new Date().getFullYear();

// Fake counter animation for prototypes
const nEl = document.getElementById('stat-devices');
let n = 0;
const target = 12;
const step = () => {
  n += 1;
  nEl.textContent = n;
  if (n < target) requestAnimationFrame(step);
};
requestAnimationFrame(step);


// Modal functions
function openModal(event, title, text) {
  event.preventDefault(); // Prevent link jump
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalText").innerText = text;
  document.getElementById("descModal").style.display = "block";
}

function closeModal() {
  document.getElementById("descModal").style.display = "none";
}

// Close when clicking outside content
window.onclick = function(event) {
  const modal = document.getElementById("descModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
}
