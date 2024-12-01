let currentID = 1; 
function openModal() {
    document.getElementById('modal').style.display = 'flex';
    resetTable(); 
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function resetTable() {
    const tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; 
    currentID = 1; 
    updateTotalSale(); 
}

function addRow() {
    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const row = table.insertRow();

    for (let i = 0; i < 6; i++) {
        const cell = row.insertCell(i);
        if (i === 0) {
            cell.textContent = currentID++;
            cell.contentEditable = false;
        } else if (i === 4) {
            cell.textContent = '0';
            cell.contentEditable = false;
        } else if (i === 5) {
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete-row';
            deleteButton.onclick = function() { deleteRow(this) };
            cell.appendChild(deleteButton);
        } else {
            cell.textContent = ''; 
            cell.contentEditable = true;
        }
        cell.addEventListener('input', updateTotalSale); 
    }
}

function deleteRow(button) {
    const row = button.closest('tr');
    row.remove();
    updateTotalSale(); 
    adjustIDs(); 
}

function adjustIDs() {
    const rows = document.getElementById('dataTable').getElementsByTagName('tbody')[0].rows;
    currentID = 1; 
    Array.from(rows).forEach(row => {
        row.cells[0].textContent = currentID++; 
    });
}

function updateTotalSale() {
    const rows = document.getElementById('dataTable').getElementsByTagName('tbody')[0].rows;
    let grandTotal = 0;

    Array.from(rows).forEach(row => {
        const cost = parseFloat(row.cells[2]?.textContent || 0);
        const quantity = parseFloat(row.cells[3]?.textContent || 0);
        const total = cost * quantity;
        row.cells[4].textContent = total.toFixed(2);
        grandTotal += total;
    });

    document.getElementById('grandTotal').textContent = grandTotal.toFixed(2);
}

function printData() {
    const rows = document.getElementById('dataTable').getElementsByTagName('tbody')[0].rows;
    Array.from(rows).forEach(row => {
        const itemName = row.cells[1].textContent;
        const quantity = row.cells[3].textContent;
        if (itemName && quantity) {
            fetch('/save_data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ item_name: itemName, quantity: parseInt(quantity) }),
            }).then(response => response.json()).then(data => {
                if (data.status === 'success') {
                    console.log('Data saved successfully');
                } else {
                    console.log('Error saving data:', data.message);
                }
            }).catch(error => console.error('Error:', error));
        }
    });

    document.getElementById('printMessage').style.display = 'block';
    setTimeout(() => {
        document.getElementById('printMessage').style.display = 'none';
    }, 3000);
}

function openChatbot() {
    const chatbotContainer = document.getElementById('chatbotContainer');
    chatbotContainer.classList.remove('hidden');
}

function closeChatbot() {
    const chatbotContainer = document.getElementById('chatbotContainer');
    chatbotContainer.classList.add('hidden');
}

document.addEventListener("DOMContentLoaded", function() {
    fetch('/api/top_products')
        .then(response => response.json())
        .then(data => {
            const labels = data.map(item => item.item_name);
            const quantities = data.map(item => item.total_quantity);

            const ctxBar = document.getElementById('productBarChart').getContext('2d');
            new Chart(ctxBar, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Quantity Sold',
                        data: quantities,
                        backgroundColor: 'rgba(12, 92, 48, 0.6)',
                        borderColor: 'rgba(12, 92, 48, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            beginAtZero: true
                        },
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        });

    fetch('/api/sales_over_time')
        .then(response => response.json())
        .then(data => {
            const labels = data.map(item => item.date);
            const quantities = data.map(item => item.total_quantity);

            const ctxLine = document.getElementById('growthLineChart').getContext('2d');
            new Chart(ctxLine, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Total Products Sold',
                        data: quantities,
                        backgroundColor: 'rgba(12, 92, 48, 0.2)',
                        borderColor: 'rgba(12, 92, 48, 1)',
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            beginAtZero: true
                        },
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        });
});

