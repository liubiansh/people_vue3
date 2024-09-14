import { createRouter, createWebHistory } from 'vue-router'
import PersonView from '@/views/PersonView.vue'
import SkillListView from '@/views/SkillListView.vue'
import PersonSkillView from '@/views/PersonSkillView.vue'
import AddSkillView from '@/views/AddSkillView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name:"person",
      path:"/person",
      component:PersonView
    },
    {
      name:"skillList",
      path:"/skill",
      component:SkillListView
    },
    {
      name:"personSkill",
      path:"/personSkill",
      component:PersonSkillView
    },
    {
      name:"addSkill",
      path:"/addSkill",
      component:AddSkillView
    },
    {
      path:"/",
      redirect:"person"
    }
  ]
})

export default router
