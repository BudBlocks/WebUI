import axios from 'axios';

const API_URL = 'http://composer-rest-server-budblocks-network.mybluemix.net/api/';

export function formatMoney(n) {
    if(n == undefined) return;
    return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
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
    "notes_received": [],
    "notes_pending": [],
    "notes_owed": [],
    "time_over": [],
    "amount_over": []
  }

  console.log(data);

  axios.post(API_URL + 'buddy', data)
    .then(res => {
    })
    .catch((error) => {
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
    });
}

export async function getAllUsers() {
  let response = await axios.get(API_URL + 'buddy');
  return response.data;
}

// Amount should be in CENTS
export function sendNote(sender, receiver, amount, expirationDate, message) {
  const data = {
    $class: 'org.budblocks.sendNote',
    sender: sender,
    receiver: receiver,
    amount: amount,
    message: message,
    expiration_date: expirationDate
  }

  axios.post(API_URL + 'sendNote', data)
    .then(res => {
      console.log('Transaction went through.');
    })
    .catch(error => {
      console.log('Transaction failed.');
    });
}

export function changeEmail(username, email) {
  const data = {
    email,
  }

  axios.put('https://budblocks.io/api/buddy/' + username, data)
    .then(res => {

    })
}
