import type { NextPage } from 'next'
import { AdminLayout } from '@layout'
import React from 'react'
import UserManagement from '@components/usermanagement'

const usermanagement: NextPage = () => (
  <AdminLayout>
    <UserManagement/>
     </AdminLayout>
)

export default usermanagement
