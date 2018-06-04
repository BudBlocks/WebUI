import axios from 'axios';

const API_URL = 'https://composer-rest-server-budblocks-network.mybluemix.net/api/';

export function formatMoney(n) {
    let new_n = (Number)(n);
    if (isNaN(new_n)) {
      return n;
    }
    return new_n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

export function inputMoneyFormat(n) {
    let new_n = (Number)(n);
    if (isNaN(new_n)) {
      return n;
    }
    new_n = new_n.toFixed(2);
    if (new_n.length < n.length) {
      return new_n;
    } else {
      return n;
    }
  }

// {
//   "$class": "org.budblocks.Buddy",
//   "username": "",
//   "name": "",
//   "email": "",
//   "notes_received": [],
//   "notes_owed": [],
//   "notes_pending": [],
//   "time_over": [],
//   "amount_over": []
// }
export function createUser(username, email) {
  const data = {
    "$class": 'org.budblocks.Buddy',
    "username": username,
    "name": username,
    "email": email,
    "time_over": [],
    "amount_over": []
  }

  console.log(data);

  axios.post(API_URL + 'buddy', data)
    .then(res => {
    })
    .catch((error) => {
      printErrors(error);
    });
}

export function clampInput(value, min, max){
  if(value < min) value = min;
  else if(value > max) value = max;
  return value;
}

export async function getAllUsers() {
  let response = await axios.get(API_URL + 'buddy');
  return response.data;
}

export async function getAllNotes() {
  let response = await axios.get(API_URL + 'note');
  return response.data;
}

export function sendNote(sender, receiver, amount, expirationDate, message) {
  const data = {
    $class: 'org.budblocks.sendNote',
    sender: sender,
    receiver: receiver,
    amount: amount * 100,
    message: message,
    expiration_date: expirationDate
  }

  axios.post(API_URL + 'sendNote', data)
    .then(res => {
      console.log('Transaction went through.');
    })
    .catch(error => {
      printErrors(error);
    });
}

export function addBalance(username, amount) {
  const data = {
    $class: 'org.budblocks.addBalance',
    buddy: username,
    amount: amount * 100
  }

  axios.post(API_URL + 'addBalance', data)
    .then(res => {
      console.log('Transaction went through.');
    })
    .catch(error => {
      console.log('Transaction failed.');
    });
}

export function removeBalance(username, amount) {
  const data = {
    $class: 'org.budblocks.removeBalance',
    buddy: username,
    amount: amount * 100
  }

  axios.post(API_URL + 'removeBalance', data)
    .then(res => {
      console.log('Transaction went through.');
    })
    .catch(error => {
      console.log('Transaction failed.');
    });
}

export function acceptNote(noteid) {
  const data = {
    $class: 'org.budblocks.acceptNote',
    note: noteid,
  }

  axios.post(API_URL + 'acceptNote', data)
    .then(res => {
      console.log('Note accepted.')
    })
    .catch(error => {
      printErrors(error);
    })
}

export function changeEmail(username, email) {
  const data = {
    email,
  }

  axios.put(API_URL + username, data)
    .then(res => {

    })
}

function printErrors(error) {
  if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }
    console.log(error.config);
}
