<script lang="ts">
import { defineComponent } from 'vue';

// Define the structure of a Transaction object
interface Transaction {
  amount: number;
  description: string;
  type: 'income' | 'expense'; // Can be either 'income' or 'expense'
}

export default defineComponent({
  name: 'App',
  data() {
    return {
      amount: 0, // Holds the amount for the new transaction
      description: '', // Holds the description for the new transaction
      transactionType: 'income', // Default transaction type
      transactions: [] as Transaction[], // Array to store all transactions
      balance: 0, // Current balance calculated from transactions
    };
  },
  created() {
    // Load transactions from local storage when the component is created
    this.loadTransactions();
  },
  methods: {
    // Add a new transaction to the list
    addTransaction() {
      const newTransaction: Transaction = {
        amount: this.amount,
        description: this.description,
        type: this.transactionType,
      };
      this.transactions.push(newTransaction); // Add to transactions array
      this.updateBalance(newTransaction); // Update the balance
      this.saveTransactions(); // Save transactions to local storage
      this.resetForm(); // Reset the form fields
    },
    // Update the balance based on the transaction type
    updateBalance(transaction: Transaction) {
      this.balance += transaction.type === 'income' ? transaction.amount : -transaction.amount;
    },
    // Reset the form fields to their default values
    resetForm() {
      this.amount = 0;
      this.description = '';
      this.transactionType = 'income';
    },
    // Save the transactions array to local storage
    saveTransactions() {
      localStorage.setItem('transactions', JSON.stringify(this.transactions));
    },
    // Load transactions from local storage and update the balance
    loadTransactions() {
      const storedTransactions = localStorage.getItem('transactions');
      if (storedTransactions) {
        this.transactions = JSON.parse(storedTransactions);
        this.transactions.forEach(this.updateBalance); // Recalculate balance
      }
    },
    // Delete a transaction and update the balance
    deleteTransaction(index: number) {
      const transaction = this.transactions[index];
      this.balance -= transaction.type === 'income' ? transaction.amount : -transaction.amount;
      this.transactions.splice(index, 1); // Remove the transaction from the array
      this.saveTransactions(); // Save the updated transactions to local storage
    },
  },
});
</script>

<template>
  <div id="app" class="container py-5">
    <!-- Header Section -->
    <div class="text-center mb-4">
      <h1>Today's Savings and Spending Tracker</h1>
      <h2>Current Balance: RM{{ balance.toFixed(2) }}</h2>
    </div>

    <div class="row">
      <!-- Form Section for Adding Transactions -->
      <div class="col-md-4 mb-4">
        <div class="card">
          <div class="card-header">Add Transaction</div>
          <div class="card-body">
            <form @submit.prevent="addTransaction">
              <div class="form-group">
                <label for="amount">Amount (RM)</label>
                <input type="number" id="amount" v-model="amount" required class="form-control" />
              </div>
              <div class="form-group">
                <label for="description">Description</label>
                <input type="text" id="description" v-model="description" required class="form-control" />
              </div>
              <div class="form-group">
                <label for="type">Transaction Type</label>
                <select v-model="transactionType" id="type" required class="form-control">
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary w-100">Add Transaction</button>
            </form>
          </div>
        </div>
      </div>

      <!-- Table Section for Displaying Transactions -->
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Transactions</div>
          <div class="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Amount (RM)</th>
                  <th>Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(transaction, index) in transactions" :key="index">
                  <td>{{ transaction.description }}</td>
                  <td>{{ transaction.amount.toFixed(2) }}</td>
                  <td>{{ transaction.type }}</td>
                  <td>
                    <button class="btn btn-danger btn-sm" @click="deleteTransaction(index)">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#app {
  max-width: 800px;
  margin: 0 auto;
}
</style>
