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
  methods: {
    addTransaction() {
      const newTransaction: Transaction = {
        amount: this.amount,
        description: this.description,
        type: this.transactionType,
      };

      this.transactions.push(newTransaction);
      this.updateBalance(newTransaction);
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
  },
});
</script>

<template>
  <div id="app">
    <h1>Today's Savings and Spending Tracker</h1>
    <div class="container">
      <h2>Current Balance: RM{{ balance.toFixed(2) }}</h2>

      <form @submit.prevent="addTransaction">
        <div class="form-group">
          <label for="amount">Amount (RM)</label>
          <input
            type="number"
            id="amount"
            v-model="amount"
            required
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
            placeholder="Enter description"
          />
        </div>

        <div class="form-group">
          <label for="type">Transaction Type</label>
          <select v-model="transactionType" id="type" required>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <button type="submit">Add Transaction</button>
      </form>

      <h3>Transactions</h3>
      <ul>
        <li v-for="(transaction, index) in transactions" :key="index">
          {{ transaction.description }}: RM{{ transaction.amount.toFixed(2) }} ({{ transaction.type }})
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
#app {
  text-align: center;
  margin-top: 20px;
}

.container {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin: 10px 0;
}

button {
  margin-top: 10px;
}
</style>
