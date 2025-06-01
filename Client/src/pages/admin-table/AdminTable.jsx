import UserTable from '~/components/user-table/UserTable'

import {
  columns,
  initialFilters,
  initialSort,
  tabsInfo
} from '~/pages/admin-table/constants'
import { UserRoleEnum } from '~/types'

const AdminTable = () => {
  return (
    <UserTable
      columns={columns}
      initialFilters={initialFilters}
      initialSort={initialSort}
      role={UserRoleEnum.Admin}
      tabsInfo={tabsInfo}
    />
  )
}

export default AdminTable
