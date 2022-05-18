import request from "./request";

const getForm = async (params:any) => {
    // console.log(params)
    return await request.post('/api/program/addteam',JSON.stringify(params),{showLoading:false})
}



const getTable = async () => {
    return await request.get('/api/program/selectuser')
}

const getDetail = async (params:any) => {
    //console.log(params)
    return await request.get('/api/program/select?id='+ params )
}

const modifyTable = async (params:any) => {
    //console.log(params)
    return await request.post('/api/program/upd',JSON.stringify(params),{showLoading:false} )
}

const exportPdf = async (params:any) => {
    //console.log(params)
    return await request.get('/api/program/pdf?id=' + params)
}

const changPassword = async (params:any) => {
    //console.log(params)
    return await request.post('/api/program/updatepassword',JSON.stringify(params),{showLoading:false} )
}

const removeData = async (params:any) => {
    //console.log(params)
    return await request.post('/api/program/del4?id=' + params)
}

export {
    getForm,
    getTable,
    getDetail,
    modifyTable,
    exportPdf,
    removeData,
    changPassword
}