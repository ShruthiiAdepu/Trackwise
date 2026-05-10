// Retrieve saved goals from localStorage
let goals = JSON.parse(localStorage.getItem('goals')) || [];

// Function to render all goals
function renderGoals() {
    const goalListDiv = document.getElementById('goal-list');
    goalListDiv.innerHTML = '';  // Clear existing list

    // Check if there are no goals
    if (goals.length === 0) {
        goalListDiv.innerHTML = '<p>No goals set yet. Add a new goal above!</p>';
        return;
    }

    goals.forEach((goal, index) => {
        const goalDiv = document.createElement('div');
        goalDiv.classList.add('goal-item');
        goalDiv.innerHTML = `
            <h3>${goal.goalName}</h3>
            <p>Goal Amount: ₹${goal.goalAmount.toFixed(2)}</p>
            <p>Amount Saved: ₹${goal.amountSaved.toFixed(2)}</p>
            <p>Remaining Amount: ₹${(goal.goalAmount - goal.amountSaved).toFixed(2)}</p>
            <button onclick="addSavings(${index})">Add Savings</button>
            <button onclick="deleteGoal(${index})">Delete Goal</button>
        `;
        goalListDiv.appendChild(goalDiv);
    });
}

// Add a new goal
document.getElementById('set-goal').addEventListener('click', () => {
    const goalName = document.getElementById('goal-name').value;
    const goalAmount = parseFloat(document.getElementById('goal-amount').value);

    if (goalName && goalAmount > 0) {
        const newGoal = {
            goalName: goalName,
            goalAmount: goalAmount,
            amountSaved: 0  // Initial savings is 0
        };
        goals.push(newGoal);

        // Save updated goals array to localStorage
        localStorage.setItem('goals', JSON.stringify(goals));

        // Render the updated list of goals
        renderGoals();

        // Clear input fields
        document.getElementById('goal-name').value = '';
        document.getElementById('goal-amount').value = '';
    } else {
        alert('Please enter a valid goal name and amount.');
    }
});

// Add savings to a selected goal
function addSavings(index) {
    const savings = prompt("Enter the amount you want to save:");
    const amountToSave = parseFloat(savings);

    if (amountToSave && amountToSave > 0) {
        goals[index].amountSaved += amountToSave;

        // Check if the goal is achieved
        if (goals[index].amountSaved >= goals[index].goalAmount) {
            showCelebrationMessage(goals[index].goalName);
            goals[index].amountSaved = goals[index].goalAmount; // Ensure it doesn’t exceed the goal
        }

        // Save updated goals array to localStorage
        localStorage.setItem('goals', JSON.stringify(goals));

        // Re-render the updated goals list
        renderGoals();
    } else {
        alert("Please enter a valid amount.");
    }
}

// Delete a goal
function deleteGoal(index) {
    if (confirm("Are you sure you want to delete this goal?")) {
        goals.splice(index, 1);  // Remove the goal from the array

        // Save the updated goals array to localStorage
        localStorage.setItem('goals', JSON.stringify(goals));

        // Re-render the updated goals list
        renderGoals();
    }
}

// Celebration message function
function showCelebrationMessage(goalName) {
    const celebrationBox = document.createElement('div');
    celebrationBox.classList.add('celebration-box');
    celebrationBox.innerHTML = `
        <span>🎉 Congratulations! 🎉</span>
        <p>You've achieved your goal: <strong>${goalName}</strong></p>
        <button onclick="closeCelebration()">Close</button>
    `;
    document.body.appendChild(celebrationBox);
}

// Close the celebration message
function closeCelebration() {
    const celebrationBox = document.querySelector('.celebration-box');
    if (celebrationBox) {
        celebrationBox.remove();
    }
}

// Initially render all goals when the page loads
renderGoals();
