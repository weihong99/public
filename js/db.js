// enable offline data
db.enablePersistence()
  .catch(function(err) {
    if (err.code == 'failed-precondition') {
      // probably multible tabs open at once
      console.log('persistance failed');
    } else if (err.code == 'unimplemented') {
      // lack of browser support for the feature
      console.log('persistance not available');
    }
  });

// real-time listener
db.collection('transactions').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if(change.type === 'added'){
      renderTransaction(change.doc.data(), change.doc.id);
      renderBalance(change.doc.data());
    }
    if(change.type === 'removed'){
      removeTransaction(change.doc.id);
      renderDeleteBalance(change.doc.data());

    }
  });
});

// add new transaction
const form = document.querySelector('form');
form.addEventListener('submit', evt => {
  evt.preventDefault();
  
  const transaction = {
    amount: form.title.value,
    description: form.description.value
  };

  db.collection('transactions').add(transaction)
    .catch(err => console.log(err));

  form.title.value = '';
  form.description.value = '';
});

// remove a transaction
const transactionContainer = document.querySelector('.transactions');
transactionContainer.addEventListener('click', evt => {
  if(evt.target.tagName === 'I'){
    const id = evt.target.getAttribute('data-id');
    //console.log(id);
    db.collection('transactions').doc(id).delete();
  }
})