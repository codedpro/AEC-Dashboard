import type { NextPage } from 'next'
import { AdminLayout } from '@layout'
import React from 'react'
import VandalismForm from '@components/VandalismForm'

const Vandalism: NextPage = () => (
  <AdminLayout>
    <VandalismForm/>
     </AdminLayout>
)

export default Vandalism
