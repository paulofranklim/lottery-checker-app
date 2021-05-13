import { Navbar, Form, FormText } from 'react-bootstrap'
import { DiReact, DiMysql, DiGithubBadge, DiBootstrap } from "react-icons/di";
import { SiSpring, SiAmazonaws } from "react-icons/si";

export default function Footer() {
  return (
    <div>
      <Navbar style={{ display: 'flex', justifyContent: 'center' }} variant="secondary" bg="secondary" fixed="bottom">
        <Form inline>
          <FormText style={{ fontSize: 10, padding: 5, fontWeight: 'bold' }}>POWERED WITH</FormText>
          <DiReact size={30} />
          <DiBootstrap size={30} />
          <SiSpring size={20} />
          <DiMysql size={30} />
          <SiAmazonaws size={30} />
          <a style={{ color: 'inherit' }}
            href="https://github.com/paulofranklim"
            target="_blank"
            rel="noopener noreferrer" >
            <DiGithubBadge size={30} />
          </a>
        </Form>
      </Navbar>
    </div>
  )
}