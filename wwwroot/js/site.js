const uri = 'api/todoitems';
let todos = [];

function getItems() {
  fetch(uri)
    .then(response => response.json())
    .then(data => _displayItems(data))
    .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
  const addNameTextbox = document.getElementById('add-name');
  const addItemStatusSelect = document.getElementById('add-status');
  const addPersonTextbox = document.getElementById('add-person');
  const addPrioritySelect = document.getElementById('add-priority');

  const item = {
    name: addNameTextbox.value.trim(),
    status: addItemStatusSelect.value,
    personAssigned: addPersonTextbox.value.trim(),
    priority: addPrioritySelect.value
  };

  fetch(uri, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
    .then(response => response.json())
    .then(() => {
      getItems();
      addNameTextbox.value = '';
      addItemStatusSelect.value = 'Not started';
      addPersonTextbox.value = '';
      addPrioritySelect.value = 'Medium';
    })
    .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {
  fetch(`${uri}/${id}`, {
    method: 'DELETE'
  })
  .then(() => getItems())
  .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
  const item = todos.find(item => item.id === id);
  
  document.getElementById('edit-name').value = item.name;
  document.getElementById('edit-id').value = item.id;
  document.getElementById('edit-status').value = item.status;
  document.getElementById('edit-person').value = item.personAssigned; // Set person assigned
  document.getElementById('edit-priority').value = item.priority; // Set priority
  document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
  const itemId = document.getElementById('edit-id').value;
  const item = {
    id: parseInt(itemId, 10),
    name: document.getElementById('edit-name').value.trim(),
    status: document.getElementById('edit-status').value,
    personAssigned: document.getElementById('edit-person').value.trim(), // Get person assigned
    priority: document.getElementById('edit-priority').value // Get priority
  };

  fetch(`${uri}/${itemId}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
  .then(() => getItems())
  .catch(error => console.error('Unable to update item.', error));

  closeInput();
}

function closeInput() {
  document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
  const name = (itemCount === 1) ? 'to-do' : 'to-dos';

  document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
  const tBody = document.getElementById('todos');
  tBody.innerHTML = '';

  _displayCount(data.length);

  data.forEach(item => {
    let statusLabel = document.createElement('label');
    statusLabel.innerHTML = item.status;
    let personAssignedLabel = document.createElement('label');
    personAssignedLabel.innerHTML = item.personAssigned || 'Not assigned'; // Display person assigned
    let priorityLabel = document.createElement('label');
    priorityLabel.innerHTML = item.priority; // Display priority

    let editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

    let tr = tBody.insertRow();
    
    let td1 = tr.insertCell(0);
    td1.appendChild(statusLabel);

    let td2 = tr.insertCell(1);
    td2.appendChild(document.createTextNode(item.name));

    let td3 = tr.insertCell(2);
    td3.appendChild(personAssignedLabel);

    let td4 = tr.insertCell(3);
    td4.appendChild(priorityLabel);

    let td5 = tr.insertCell(4);
    td5.appendChild(editButton);

    let td6 = tr.insertCell(5);
    td6.appendChild(deleteButton);
  });

  todos = data;
}
