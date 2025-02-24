<script lang="ts">
import { defineComponent } from 'vue';

interface Transaction {
  amount: number;
  description: string;
  type: 'income' | 'expense';
}

export default defineComponent({
  name: 'App',
  data() {
    return {
      amount: 0,
      description: '',
      transactionType: 'income',
      transactions: [] as Transaction[],
      balance: 0,
    };
  },
  created() {
    this.loadTransactions();
  },
  methods: {
    addTransaction() {
      const newTransaction: Transaction = {
        amount: this.amount,
        description: this.description,
        type: this.transactionType,
      };

      this.transactions.push(newTransaction);
      this.updateBalance(newTransaction);
      this.saveTransactions();
      this.resetForm();
    },
    updateBalance(transaction: Transaction) {
      if (transaction.type === 'income') {
        this.balance += transaction.amount;
      } else {
        this.balance -= transaction.amount;
      }
    },
    resetForm() {
      this.amount = 0;
      this.description = '';
      this.transactionType = 'income';
    },
    saveTransactions() {
      localStorage.setItem('transactions', JSON.stringify(this.transactions));
    },
    loadTransactions() {
      const storedTransactions = localStorage.getItem('transactions');
      if (storedTransactions) {
        this.transactions = JSON.parse(storedTransactions);
        this.transactions.forEach(transaction => this.updateBalance(transaction));
      }
    },
  },
});
</script>

<template>
  <div id="app" class="d-flex flex-column align-items-center justify-content-center min-vh-100">
    <h1 class="text-center mb-4">Today's Savings and Spending Tracker</h1>
    <h2 class="text-center mb-4">Current Balance: RM{{ balance.toFixed(2) }}</h2>

    <div class="card" style="width: 100%; max-width: 600px;">
      <div class="card-body">
        <form @submit.prevent="addTransaction">
          <div class="form-group">
            <label for="amount">Amount (RM)</label>
            <input
              type="number"
              id="amount"
              v-model="amount"
              required
              class="form-control"
              placeholder="Enter amount"
            />
          </div>

          <div class="form-group">
            <label for="description">Description</label>
            <input
              type="text"
              id="description"
              v-model="description"
              required
              class="form-control"
              placeholder="Enter description"
            />
          </div>

          <div class="form-group">
            <label for="type">Transaction Type</label>
            <select v-model="transactionType" id="type" required class="form-control">
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <button type="submit" class="btn btn-primary btn-block">Add Transaction</button>
        </form>
      </div>
    </div>

    <h3 class="mt-4">Transactions</h3>
    <ul class="list-group" style="width: 100%; max-width: 600px;">
      <li
        v-for="(transaction, index) in transactions"
        :key="index"
        class="list-group-item d-flex justify-content-between align-items-center"
        :class="transaction.type === 'income' ? 'list-group-item-success' : 'list-group-item-danger'"
      >
        <span>{{ transaction.description }}: RM{{ transaction.amount.toFixed(2) }}</span>
        <span class="badge badge-pill">{{ transaction.type }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
#app {
  text-align: center;
}

.card {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.list-group-item {
  transition: background-color 0.3s;
}

.list-group-item:hover {
  background-color: #f1f1f1;
}
</style>
