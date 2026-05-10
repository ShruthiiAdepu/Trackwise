window.onload = function() {
    const currentBudget = parseFloat(localStorage.getItem('currentBudget')) || 0;
    const remainingBudget = parseFloat(localStorage.getItem('remainingBudget')) || currentBudget;
  
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    document.getElementById('budgetDisplay').textContent = `Total Budget: ₹${currentBudget}`;
    document.getElementById('remainingBudgetDisplay').textContent = `Remaining Budget: ₹${remainingBudget}`;
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = ""; 
    if (expenses.length > 0) {
      expenses.forEach(expense => {
        const expenseItem = document.createElement('div');
        expenseItem.classList.add('expense-item');
        
        const categoryDiv = document.createElement('span');
        categoryDiv.classList.add('expense-category');
        categoryDiv.textContent = expense.category;
  
        const amountDiv = document.createElement('span');
        amountDiv.classList.add('expense-amount');
        amountDiv.textContent = `₹${expense.amount}`;
  
        const dateDiv = document.createElement('span');
        dateDiv.classList.add('expense-date');
        dateDiv.textContent = `Date: ${expense.date}`;
  
        expenseItem.appendChild(categoryDiv);
        expenseItem.appendChild(amountDiv);
        expenseItem.appendChild(dateDiv);
        expenseList.appendChild(expenseItem);
      });
    } else {
      expenseList.innerHTML = "<p>No expenses to display.</p>";
    }
  };
  