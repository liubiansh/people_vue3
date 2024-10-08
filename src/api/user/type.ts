// 单项所有技能明细的类型
export interface IskillDetail{
  skillType: string,
  equipmentType: string,
  equipmentModel: string
}

// 登录接口需要携带的参数类型
export interface loginI {
  userid: string,
  password: string
}

// 登录接口返回的数据类型
export interface loginResDataI {
  code: number,
  data: {
    token?:string
    message?:string
  }
}

// 定义服务器返回用户信息相关的数据类型
export interface userResDataI {
  code:number
  data:{
    checkUser?:{
      userId: number,
      avatar: '',
      username: '',
      password: '',
      desc: '',
      roles: string[],
      buttons: string[],
      routes: string[],
      token: '',
    }
  }
}