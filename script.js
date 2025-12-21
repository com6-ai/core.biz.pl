// Emulator Portfela Bitcoin Core
// Symulacja - nie używać prawdziwych środków

let wallet = {
    address: '',
    balance: 0,
    transactions: []
};

// Załaduj dane z localStorage
function loadWallet() {
    const saved = localStorage.getItem('bitcoinWallet');
    if (saved) {
        wallet = JSON.parse(saved);
        displayWallet();
    }
}

// Zapisz dane do localStorage
function saveWallet() {
    localStorage.setItem('bitcoinWallet', JSON.stringify(wallet));
}

// Wyświetl informacje o portfelu
function displayWallet() {
    document.getElementById('address').textContent = wallet.address;
    document.getElementById('balance').textContent = wallet.balance.toFixed(8) + ' BTC';
    document.getElementById('walletInfo').style.display = 'block';
    displayTransactions();
}

// Generuj nowy portfel
document.getElementById('generateWallet').addEventListener('click', () => {
    wallet.address = 'bc1' + Math.random().toString(36).substr(2, 9) + Math.random().toString(36).substr(2, 9);
    wallet.balance = 0;
    wallet.transactions = [];
    saveWallet();
    displayWallet();
});

// Wyślij BTC
document.getElementById('sendBtn').addEventListener('click', () => {
    const sendAddress = document.getElementById('sendAddress').value;
    const sendAmount = parseFloat(document.getElementById('sendAmount').value);
    if (!sendAddress || isNaN(sendAmount) || sendAmount <= 0 || sendAmount > wallet.balance) {
        alert('Nieprawidłowe dane lub niewystarczające saldo.');
        return;
    }
    wallet.balance -= sendAmount;
    wallet.transactions.push({
        type: 'send',
        address: sendAddress,
        amount: sendAmount,
        date: new Date().toLocaleString()
    });
    saveWallet();
    displayWallet();
    document.getElementById('sendAddress').value = '';
    document.getElementById('sendAmount').value = '';
});

// Generuj adres odbioru
document.getElementById('generateReceiveAddress').addEventListener('click', () => {
    const receiveAddr = 'bc1' + Math.random().toString(36).substr(2, 9) + Math.random().toString(36).substr(2, 9);
    document.getElementById('receiveAddress').textContent = 'Adres odbioru: ' + receiveAddr;
    // W symulacji, użytkownik może "otrzymać" BTC ręcznie, ale dla uproszczenia, dodajmy przycisk do symulacji odbioru
});

// Wyświetl historię transakcji
function displayTransactions() {
    const list = document.getElementById('transactionList');
    list.innerHTML = '';
    wallet.transactions.forEach(tx => {
        const li = document.createElement('li');
        li.textContent = `${tx.date} - ${tx.type === 'send' ? 'Wysłano' : 'Otrzymano'} ${tx.amount} BTC do/z ${tx.address}`;
        list.appendChild(li);
    });
}

// Symuluj odbiór BTC
document.getElementById('receiveBtn').addEventListener('click', () => {
    const receiveAmount = parseFloat(document.getElementById('receiveAmount').value);
    if (isNaN(receiveAmount) || receiveAmount <= 0) {
        alert('Nieprawidłowa kwota.');
        return;
    }
    wallet.balance += receiveAmount;
    wallet.transactions.push({
        type: 'receive',
        address: 'Symulowany nadawca',
        amount: receiveAmount,
        date: new Date().toLocaleString()
    });
    saveWallet();
    displayWallet();
    document.getElementById('receiveAmount').value = '';
});