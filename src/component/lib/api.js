import Moment from 'moment';

const url = 'https://sep-backend-inventory.herokuapp.com';

export async function getCheckAvailability(){
    const response = await fetch(`http://localhost:5000/student/checkAvaiability`);
    //const response = await fetch(`${url}/checkAvaiability`);
    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message || 'Could not fetch data');
    }
    const details = [];
    for(const key in data){
        const newObj = {
            keyid:key,
            ...data[key],
        };
        details.push(newObj);
    }
    return details;
}

export async function getBorrowingHistory(dtail){
    //const response = await fetch(`${url}/borrow`);
    const response = await fetch(`http://localhost:5000/student/borrow/${dtail.id}`);
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message || 'Could not fetch data');
    }
    const details = [];
    const months = ['JAN','FEB','March','April','May','June','July','Aug','Sep','Oct','Nov','Des'];
    for(const key in data){
        const newObj = {
            keyid:key,
            date:{
                month:months[parseInt(Moment(data[key]['purchesedDate']).format('MM'),10)-1],
                day: Moment(data[key]['purchesedDate']).format('DD'),
            },
            details:{
                category: data[key]['Category.categoryName'],
                model: data[key]['Model.modelName'],
                storeCode: data[key]['id'],
                labName: data[key]['Lab.labName'],
                imageURL: data[key]['imageURL'],
            }
        };
        details.push(newObj);
    }
    return details;
}

export async function getCategories(detail){
    // const response = await fetch(`${url}/category`);
    const response = await fetch(`http://localhost:5000/student/category`);
    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message || 'Could not fetch');
    }
    const categoryList = [''];
    for(const key in data){
        const category = data[key]['Category.categoryName'];
        categoryList.push(category);
    }
    return categoryList;
}


export async function getModel(detail){
    // const response = await fetch(`${url}/model/${detail.enterCategory}`);
    const response = await fetch(`http://localhost:5000/student/model/${detail.enterCategory}`);
    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message || 'Could not fetch');
    }
    const modelList = [''];
    //console.log(data);
    for(const key in data){
        const model = data[key]['Model.modelName'];
        modelList.push(model);
    }
    return modelList;
}

export async function getLaboratory(detail){
    // const abortController = new AbortController();
    // const signal = abortController.signal;
    // const response = await fetch(`${url}/lab/${detail.category}/${detail.model}`);
    const response = await fetch(`http://localhost:5000/student/lab/${detail.category}/${detail.model}`);
    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message || 'Could not fetch');
    }
    const labList = [''];
    for(const key in data){
        const lab = data[key]['Lab.labName'];
        labList.push(lab);
    }
    return labList;
}

export async function getStoreCode(detail){
    // const abortController = new AbortController();
    // const signal = abortController.signal;
    //const response = await fetch(`${url}/storeCode/${detail.category}/${detail.model}/${detail.lab}`);
    const response = await fetch(`http://localhost:5000/student/storeCode/${detail.category}/${detail.model}/${detail.lab}`);
    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message || 'Could not fetch');
    }
    const storeCodeList = [''];
    for(const key in data){
        const sCode = data[key]['id'];
        storeCodeList.push(sCode);
    }
    return storeCodeList;
}

export async function getAvailableItems(category){
    //const response = await fetch(`${url}/ava`);
    const response = await fetch(`http://localhost:5000/student/ava`);
    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message || 'Could not fetch');
    }
    
    return data;
}

export async function getLecturers(detail){
    //const response = await fetch(`${url}/lecturer/${detail.labId}`);
    const response = await fetch(`http://localhost:5000/student/lecturer/${detail.labId}`);
    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message || 'Could not fetch');
    }
    console.log(data);
    const lecturerList = [[''],['']];
    for(const key in data){
        const lec = data[key]['firstName'];
        const id = data[key]['id'];
        lecturerList[0].push(lec);
        lecturerList[1].push(id);
    }
    return lecturerList;
}

export async function sendStudentNormalBorrowingRequest(detail){

    const response = await fetch(`http://localhost:5000/student/sendNormalRequest`,{
        method:'POST',
        body: JSON.stringify({studentId:detail.studentId,lecId:detail.lecId,equipmentId:detail.equipmentId,requestDate:detail.requestDate,returnDate:detail.returnDate}),
        headers:{
            'Content-Type': 'application/json'
        },
    });
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message||'Could not fetch');
    }
    return data;
}

export async function sendNotificationByStudent(detail){
    const response = await fetch(`http://localhost:5000/student/sendNotification`,{
        method: 'POST',
        body: JSON.stringify({studentId:detail.studentId,lecId:detail.lecId,notification:detail.notification}),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const data= await response.json();
    if(!response.ok){
        throw new Error(data.message || 'Could not etch');
    }
    return data;
}

export async function getNotifications(detail){
    // const response = await fetch(`${url}/category`);
    const response = await fetch(`http://localhost:5000/student/getNotification/${detail.id}`);
    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message || 'Could not fetch');
    }
    console.log(data);
    // const categoryList = [''];
    // for(const key in data){
    //     const category = data[key]['Category.categoryName'];
    //     categoryList.push(category);
    // }
    return data;
}

export async function sendLecturerNormalBorrowingRequest(detail){
    const response = await fetch(`http://localhost:5000/lecturer/sendNormalRequest`,{
        method:'POST',
        body: JSON.stringify({lecId:detail.lecId,equipmentId:detail.equipmentId,requestDate:detail.requestDate,returnDate:detail.returnDate}),
        headers:{
            'Content-Type': 'application/json'
        },
    });
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message||'Could not fetch');
    }
    return data;
}

export async function sendStudentTemporyBorrowingRequest(detail){
    const response = await fetch(`http://localhost:5000/student/sendTemporyRequest`,{
        method:'POST',
        body: JSON.stringify({studentId:detail.studentId,equipmentId:detail.equipmentId,reason:detail.reason,requestDate:detail.requestDate,returnDate:detail.returnDate}),
        headers:{
            'Content-Type': 'application/json'
        },
    });
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message||'Could not fetch');
    }
    return data;
}

export async function sendLecturerTemporyBorrowingRequest(detail){
    const response = await fetch(`http://localhost:5000/lecturer/sendTemporyRequest`,{
        method:'POST',
        body: JSON.stringify({lecId:detail.lecId,equipmentId:detail.equipmentId,reason:detail.reason,requestDate:detail.requestDate,returnDate:detail.returnDate}),
        headers:{
            'Content-Type': 'application/json'
        },
    });
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message||'Could not fetch');
    }
    return data;
}



// export async function sendCategory(categoryData){
//     const response = await fetch(`http://localhost:5000/models`,{
//         method:'POST',
//         body: JSON.stringify({user:categoryData}),
//         headers:{
//             'Content-Type': 'application/json'
//         },
//     });
//     const data = await response.json();
//     if(!response.ok){
//         throw new Error(data.message||'Could not fetch');
//     }
//     return data;
// }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getPendingRequests(dtail){
    const response = await fetch(`http://localhost:5000/lecturer/pending/${dtail.id}`);
    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message || 'Could not fetch');
    }
    const pendingList = [];
    for(const key in data){
        const newObj = {
            keyid: key,
            storeCode: data[key]['equipmentId'],
            requestDate: data[key]['requestDate'],
            returnDate: data[key]['returnDate'],
            studentId: data[key]['RequestBorrowings.studentId'],
            requestId: data[key]['id'],
        }
        pendingList.push(newObj);
    }
    return pendingList;
}

export async function getPendingDetails(id){
    const response = await fetch(`http://localhost:5000/lecturer/requestDetail/${id}`);
    const data = await response.json();

    console.log(response);

    if(!response.ok){
        throw new Error(data.message || 'Could not fetch');
    }
    const pendingList = [];
    for(const key in data){
        const newObj = {
            keyid: key,
            storeCode: data[key]['id'],
            requestDate: data[key]['Requests.requestDate'],
            returnDate: data[key]['Requests.returnDate'],
            studentId: data[key]['Requests.RequestBorrowings.studentId'],
            reason: data[key]['Requests.reason'],
            category: data[key]['Category.categoryName'],
            model: data[key]['Model.modelName'],
            labName: data[key]['Lab.labName'],
        }
        pendingList.push(newObj);
    }
    return pendingList;
}

export async function approvePending(id){
    const response = await fetch(`http://localhost:5000/lecturer/approve/${id}`,{
        method:'POST',
        //body: JSON.stringify({user:id}),
        headers:{
            'Content-Type': 'application/json'
        },
    });
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message||'Could not fetch');
    }
    return data;
}

export async function rejectPending(id){
    const response = await fetch(`http://localhost:5000/lecturer/reject/${id}`,{
        method:'POST',
        //body: JSON.stringify({user:id}),
        headers:{
            'Content-Type': 'application/json'
        },
    });
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message||'Could not fetch');
    }
    return data;
}



