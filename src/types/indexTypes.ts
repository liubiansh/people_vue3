// 路径接口
export interface IParams {
  skillType?:string,
  equipmentType?:string,
  equipmentModel?:string,
  skillLevel?:string,
  compulsory?:string,
  evaluationMethod?:string,
  evaluationResult?:string,
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
