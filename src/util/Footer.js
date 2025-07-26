const Footer = ({ length }) => {
  return (
    <footer style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      backgroundColor: '#f8f9fa',
      padding: '10px',
      textAlign: 'center',
      borderTop: '1px solid #dee2e6',
      zIndex: 1000
    }}>
      <p>{length} List {length === 1 ? "member" : "members"}</p>
    </footer>
  )
}

export default Footer;