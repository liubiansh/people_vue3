import axios from "axios";

const axiosApi = axios.create({
  // 上线用
  baseURL:'http://192.168.0.3:80/yang/api',
  // 开发用
  // baseURL:'http://192.168.0.3:80/api',
  timeout:2000,
  headers: {
    'Access-Control-Allow-Origin': 'hly-yyp',
  },
})

// get请求
async function getAPI(path:string) {
  // axios({
  //   method:"GET",b  
  //   url:path,
  // }).then(res => {
  //   return res.data
  // })
  const response = await axios.get(path)
}

// post请求
function postAPI(path:string,data:object) {
  axios({
    method:"post",
    url:path,
    data:data,
  }).then(res => {
    console.log(res);
  })
}

// put请求
function putAPI(path:string,data:object) {
  axios({
    method:"put",
    url:path,
    data:data
  }).then(res => {
    console.log(res);
  })
}

// delete请求
function deleteAPI(path:string) {
  axios({
    method:"delete",
    url:path,
  }).then(res => {
    console.log(res);
  })
}

export {axiosApi}