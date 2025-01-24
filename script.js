const subjects = ["evidence", "labour", "arbitration", "jurisprudence", "competition"];

let overallAttended = 0;
let overallTotal = 0;

function updateStats(subject) {
  const subjectElement = document.getElementById(subject);
  const attended = parseInt(subjectElement.querySelector(".attended").textContent);
  const total = parseInt(subjectElement.querySelector(".total").textContent);
  const percentage = total > 0 ? ((attended / total) * 100).toFixed(2) : 0;
  subjectElement.querySelector(".percentage").textContent = `${percentage}%`;

  overallAttended = subjects.reduce((sum, subj) => {
    return sum + parseInt(document.getElementById(subj).querySelector(".attended").textContent);
  }, 0);

  overallTotal = subjects.reduce((sum, subj) => {
    return sum + parseInt(document.getElementById(subj).querySelector(".total").textContent);
  }, 0);

  const overallPercentage = overallTotal > 0 ? ((overallAttended / overallTotal) * 100).toFixed(2) : 0;
  document.getElementById("overall-attendance").textContent = `Overall Attendance: ${overallPercentage}%`;
}

function handleButtonClick(event) {
  const button = event.target;
  const subjectElement = button.closest(".subject");
  const attendedElement = subjectElement.querySelector(".attended");
  const totalElement = subjectElement.querySelector(".total");
  let attended = parseInt(attendedElement.textContent);
  let total = parseInt(totalElement.textContent);

  if (button.classList.contains("present")) {
    attended += 1;
    total += 1;
  } else if (button.classList.contains("absent")) {
    total += 1;
  } else if (button.classList.contains("attended-minus") && attended > 0) {
    attended -= 1;
  } else if (button.classList.contains("total-minus") && total > 0) {
    total -= 1;
    if (attended > total) attended = total; // Ensure "attended" is not greater than "total"
  }

  attendedElement.textContent = attended;
  totalElement.textContent = total;

  const subject = subjectElement.id;
  updateStats(subject);
}

document.querySelectorAll("button").forEach(button => {
  button.addEventListener("click", handleButtonClick);
});
