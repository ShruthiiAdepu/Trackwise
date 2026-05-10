document.getElementById('expenseForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const date = document.getElementById('date').value;
  
    const currentBudget = parseFloat(localStorage.getItem('currentBudget')) || 0;
    let remainingBudget = parseFloat(localStorage.getItem('remainingBudget')) || currentBudget;
  
    remainingBudget -= amount;
    if (remainingBudget < 0) {
      alert('Warning: You have exceeded your budget!');
    }
  
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  
    expenses.push({ category, amount, date });
  
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('remainingBudget', remainingBudget); 
  
    document.getElementById('expenseForm').reset();
  
    alert('Expense added successfully!');
  });
  