const Footer = ({ length }) => {
  return (
    <footer>
      <p>{length} List {length === 1 ? "member" : "members"}</p>
    </footer>
  )
}

export default Footer;