import React, { useEffect } from 'react'
import styles from './index.module.scss'
import Tabs from '@/components/Tabs'
import { useDispatch, useSelector } from 'react-redux'
import { getUserChannels } from '@/store/action/home'
export default function Home() {

  const channels = useSelector(state=>state.home.userChannels)
  const dispatch =  useDispatch()
  useEffect(()=>{
    dispatch(getUserChannels())
  },[dispatch])
  return (
    <div className={styles.root}>
      <Tabs tabs={channels}></Tabs>

    </div>
  )
}
