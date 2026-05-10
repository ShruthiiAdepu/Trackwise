document.getElementById('budgetForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const budgetInput = document.getElementById('budget').value;
  
    if (budgetInput) {
      const budget = parseFloat(budgetInput);
      localStorage.setItem('currentBudget', budget);  
      localStorage.setItem('remainingBudget', budget);
      alert("Budget set to: ₹" + budget);  
      document.getElementById('budget').value = '';  
    }
  });
  