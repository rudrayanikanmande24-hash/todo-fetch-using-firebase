const cl = console.log;


const todoForm = document.getElementById('todoForm');
const todoItem = document.getElementById('todoItem');
const todoSubmitBtn = document.getElementById('todoSubmitBtn');
const todoUpdateBtn = document.getElementById('todoUpdateBtn');
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

const templating = arr =>{
    let result=''

    arr.forEach(ele => {
        result += ` <li class="list-group-item d-flex justify-content-between align-items-center d-flex" id="${ele.id}">
                    <strong>${ele.todoItem}</strong>
                    <div>
                       <i  onclick="onEdit(this)" class=" fa-solid fa-pen-to-square fa-2x text-success" role="button"></i>
                       <i onclick="onRemove(this)" class="fa-solid fa-trash  fa-2x text-danger" role="button"></i>
                    </div>
                </li>
        
        
        `
    });
    todoContainer.innerHTML=result;
}




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

makeApiCall('GET', TODO_URL, null)
  .then(data => {
    let todoArr = objToArr(data);
    templating(todoArr);
  });

  

 const ontodo = (eve) =>{
    eve.preventDefault()


    let obj = {
        todoItem:todoItem.value
    }
    cl(obj)

    todoForm.reset()

    spinner.classList.remove('d-none')
    makeApiCall('POST',TODO_URL,obj)
      .then(res=>{
        let data = {...obj, id:res.name}

        cl(res)
        let li = document.createElement('li')
        li.className='list-group-item d-flex justify-content-between align-items-center d-flex'
        li.id=res.id
        li.innerHTML=`<strong>${data.todoItem}</strong>
                    <div>
                       <i onclick="onEdit(this)" class= "fa-solid fa-pen-to-square fa-2x text-success" role="button"></i>
                       <i onclick="onRemove(this)" class="fa-solid fa-trash  fa-2x text-danger" role="button"></i>
                    </div>
        
        
        `
        todoContainer.prepend(li)
      })
      spinner.classList.add('d-none')
      snackBar('Card create succesfully','success')
 }


const onEdit = ele =>{
    let EDIT_ID= ele.closest('li').id
    localStorage.setItem('EDIT_ID',EDIT_ID)
    let EDIT_URL=`${BASE_URL}/todos/${EDIT_ID}.json`
   
    spinner.classList.remove('d-none')
    makeApiCall('GET',EDIT_URL,null)
    .then(res=>{
        cl(res)
        todoItem.value=res.todoItem

        todoSubmitBtn.classList.add('d-none')
        todoUpdateBtn.classList.remove('d-none')
    })
    spinner.classList.add('d-none')
}


const onUpdate = () =>{
    let UPDATE_ID=localStorage.getItem('EDIT_ID')
    let UPDATE_URL=`${BASE_URL}/todos/${UPDATE_ID}.json`

    let UPDATED_OBJ={
        todoItem:todoItem.value
    }
     todoForm.reset()
     spinner.classList.remove('d-none')
    makeApiCall('PATCH',UPDATE_URL,UPDATED_OBJ)
    .then(res=>{

        let li = document.getElementById(UPDATE_ID)
        let strong = document.querySelector('strong')
        strong.innerHTML=UPDATED_OBJ.todoItem
   

        todoSubmitBtn.classList.remove('d-none')
        todoUpdateBtn.classList.add('d-none')
        spinner.classList.add('d-none')
        snackBar('Udated Successfully', 'success')
    })
     
}


todoForm.addEventListener('submit', ontodo);
 todoUpdateBtn.addEventListener('click', onUpdate)
=======
  const onRemove = ele =>{
    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    let REMOVE_ID=ele.closest('li').id
    let REMOVE_URL=`${BSAE_URL}/todos/${REMOVE_ID}.json`
    spinner.classList.remove('d-none')
    makeApiCall('DELETE',REMOVE_URL,null)
    .then(res=>{

        ele.closest('li').remove()
        spinner.classList.add('d-none')
    })
  }
});

    
}
>>>>>>> remove
