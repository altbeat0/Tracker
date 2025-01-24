// Subjects List
const subjects = ['evidence', 'labour', 'arbitration', 'jurisprudence', 'competition'];

// Function to update attendance
function updateAttendance(subject, type) {
    const attendedElement = document.querySelector(`#${subject} .attended`);
    const totalElement = document.querySelector(`#${subject} .total`);
    const percentageElement = document.querySelector(`#${subject} .percentage`);

    let attendedCount = parseInt(attendedElement.textContent);
    let totalCount = parseInt(totalElement.textContent);

    if (type === 'present') {
        attendedCount++;
        totalCount++;
    } else if (type === 'absent') {
        totalCount++;
    }

    // Update local elements
    attendedElement.textContent = attendedCount;
    totalElement.textContent = totalCount;
    
    // Calculate percentage
    const percentage = totalCount > 0 
        ? Math.round((attendedCount / totalCount) * 100) 
        : 0;
    percentageElement.textContent = percentage;

    // Save to localStorage
    localStorage.setItem(`${subject}_attended`, attendedCount);
    localStorage.setItem(`${subject}_total`, totalCount);
    localStorage.setItem(`${subject}_percentage`, percentage);

    // Update overall attendance
    updateOverallAttendance();
}

// Function to update overall attendance
function updateOverallAttendance() {
    let totalAttended = 0;
    let totalLectures = 0;

    subjects.forEach(subject => {
        const attendedElement = document.querySelector(`#${subject} .attended`);
        const totalElement = document.querySelector(`#${subject} .total`);
        
        totalAttended += parseInt(attendedElement.textContent);
        totalLectures += parseInt(totalElement.textContent);
    });

    const overallPercentage = totalLectures > 0 
        ? Math.round((totalAttended / totalLectures) * 100) 
        : 0;

    document.getElementById('overall-attendance').textContent = 
        `Overall Attendance: ${overallPercentage}%`;
}

// Function to restore attendance from localStorage
function restoreAttendance() {
    subjects.forEach(subject => {
        const savedAttended = localStorage.getItem(`${subject}_attended`);
        const savedTotal = localStorage.getItem(`${subject}_total`);
        const savedPercentage = localStorage.getItem(`${subject}_percentage`);

        if (savedAttended !== null) {
            document.querySelector(`#${subject} .attended`).textContent = savedAttended;
        }

        if (savedTotal !== null) {
            document.querySelector(`#${subject} .total`).textContent = savedTotal;
        }

        if (savedPercentage !== null) {
            document.querySelector(`#${subject} .percentage`).textContent = savedPercentage;
        }
    });

    // Update overall attendance after restoring
    updateOverallAttendance();
}

// Event Listeners for Buttons
subjects.forEach(subject => {
    document.querySelector(`#${subject} .present`).addEventListener('click', () => updateAttendance(subject, 'present'));
    document.querySelector(`#${subject} .absent`).addEventListener('click', () => updateAttendance(subject, 'absent'));
    document.querySelector(`#${subject} .no-lecture`).addEventListener('click', () => updateAttendance(subject, 'no-lecture'));
    
    // Minus buttons for attended
    document.querySelector(`#${subject} .attended-minus`).addEventListener('click', () => {
        const attendedElement = document.querySelector(`#${subject} .attended`);
        let attendedCount = parseInt(attendedElement.textContent);
        if (attendedCount > 0) {
            attendedCount--;
            attendedElement.textContent = attendedCount;
            
            // Update localStorage
            localStorage.setItem(`${subject}_attended`, attendedCount);
            
            updateOverallAttendance();
        }
    });

    // Minus buttons for total
    document.querySelector(`#${subject} .total-minus`).addEventListener('click', () => {
        const totalElement = document.querySelector(`#${subject} .total`);
        let totalCount = parseInt(totalElement.textContent);
        if (totalCount > 0) {
            totalCount--;
            totalElement.textContent = totalCount;
            
            // Update localStorage
            localStorage.setItem(`${subject}_total`, totalCount);
            
            updateOverallAttendance();
        }
    });
});

// Restore attendance on page load
document.addEventListener('DOMContentLoaded', restoreAttendance);
