// 路径接口
export interface paramsInterface {
  skillType?:string,
  equipmentType?:string,
  equipmentModel?:string,
  skillLevel?:string,
  compulsory?:string,
  evaluationMethod?:string,
  evaluationResult?:string,
}

// 技能列表数据接口
export interface skillListIterface {
  skillLevel?:string,
  num?:number
}