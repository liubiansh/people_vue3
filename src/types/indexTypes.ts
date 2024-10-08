// 路径参数接口
export interface IParams {
  skillType?:string,
  equipmentType?:string,
  equipmentModel?:string,
  skillLevel?:string,
  compulsory?:string,
  evaluationMethod?:string,
  evaluationResult?:string,
  skillDetail?:string,
  evaluationCount?:string,
  examiner?:string,
}

// 技能列表数据接口
export interface ISkillList {
  skillLevel?:'',
  compulsory?:'',
  equipmentModel?:'',
  equipmentType?:'',
  evaluationCount?:'',
  evaluationMethod?:'',
  evaluationResult?:'',
  examiner?:'',
  skillDetail?:'',
  skillType:'',
  learnBase:'',
  learnMiddle:'',
  learnHigh:'',
  ratioBase:'',
  ratioHigh:'',
  ratioMiddle:'',
  totalBase:'',
  totalMiddle:'',
  totalHigh:'',
  unlearnBase:'',
  unlearnMiddle:'',
  unlearnHigh:'',
}

// 路由组件的类型
export interface IRoutes {
  name:string,
  path:string,
  component:any
  children?:Array<{
    path:string,
    name:string,
    component:any
  }>
}

// 个人信息数据类型
export interface IPerson {
  userid?: "",
  username?: "",
  sex?: "",
  ziwei?: "",
  zhiwei?: "",
  louceng?: "",
  address?: "",
  nianzi?: "",
  chu?: "",
  bu?: "",
  group1?: "",
  group2?: "",
  group3?: "",
  workdate?: "",
  birthday?: "",
  phone?: "",
  zhanScore?:"",
  rewards?:'',
  date?:'',
  rewardsdata?:'',
  rewardsresult?:'',
  note?:'',
  message?:'',
}

