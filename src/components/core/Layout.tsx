import { FC } from "react"
import Navigation from './Navigation'
import { Header } from "antd/es/layout/layout"

interface Props {
  children: React.ReactNode
  title: string
  subTitle: string
}

const Layout: FC<Props> = ({
  children, title, subTitle
}) => {
  return (
    <div>
      <Navigation />
      <Header className="jumbotron" >
        <span className="ant-page-header-heading-title">{title}</span>
        <span className="ant-page-header-heading-sub-title">{subTitle}</span>
      </Header>
      <div style={{width: "85%", margin: "0 auto"}}>
        {children}
      </div>
      
    </div>
  )
}
export default Layout
