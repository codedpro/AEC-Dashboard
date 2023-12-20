import type { NextPage } from 'next'
import { AdminLayout } from '@layout'
import React from 'react'
import CMForm from '@components/CMForm'

const CM: NextPage = () => {
  return (
  <AdminLayout>
    <CMForm/>
  </AdminLayout>)
}

export default CM
