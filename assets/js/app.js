const cl = console.log;

const todoContainer = document.getElementById('todoContainer');
const spinner = document.getElementById("spinner");

const BASE_URL = 'https://fir-generic-posts-default-rtdb.asia-southeast1.firebasedatabase.app';
const TODO_URL = `${BASE_URL}/todos.json`;

const snackBar = (msg, icon) => {
  Swal.fire({
    title: msg,
    icon: icon,
    timer: 3000
  })
};

const objToArr = (obj) => {
  let todoArr = [];
  for (const key in obj) {
    obj[key].id = key;
    todoArr.push(obj[key]);
  }
  return todoArr;
};

const templating = (arr) => {
  let result = '';
  arr.forEach(ele => {
    result += `
      <li class="list-group-item d-flex justify-content-between align-items-center" id="${ele.id}">
        <strong>${ele.todoItem}</strong>
      </li>
    `;
  });
  todoContainer.innerHTML = result;
};

const makeApiCall = (methodName, apiUrl, msgBody) => {
  msgBody = msgBody ? JSON.stringify(msgBody) : null;

  const CONFIG_OBJ = {
    method: methodName,
    body: msgBody,
    headers: {
      "Content-type": 'application/json',
    }
  };

  spinner.classList.remove('d-none');
  return fetch(apiUrl, CONFIG_OBJ)
    .then(res => {
      if (!res.ok) {
        throw new Error('Network Error !!!');
      }
      snackBar('Fetched Successfully !!!', 'success');
      return res.json();
    })
    .catch(err => {
      snackBar(err, 'error');
    })
    .finally(() => {
      spinner.classList.add('d-none');
    });
};

// Initial Fetch
makeApiCall('GET', TODO_URL, null)
  .then(data => {
    let todoArr = objToArr(data);
    templating(todoArr);
  });