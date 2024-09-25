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
  num?:number
  compulsory?:'',
  equipmentModel?:'',
  equipmentType?:'',
  evaluationCount?:'',
  evaluationMethod?:'',
  evaluationResult?:'',
  examiner?:'',
  skillDetail?:'',
  skillType?:'',
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
