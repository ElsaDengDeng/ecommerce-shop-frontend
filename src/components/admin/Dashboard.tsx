import React from 'react'

import Layout from "../core/Layout"
import { useIntl } from "react-intl";

const Dashboard = () => {
  const intl = useIntl();
  return <Layout  title={intl.formatMessage({ id: 'userDashboard' })} subTitle="">
    <div>eee</div>
  </Layout>
}

export default Dashboard
