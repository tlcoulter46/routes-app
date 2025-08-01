const Header = ({ title }) => {

  return (
    <header style={{
      width: '100%',
      padding: '0 0.25em',
      backgroundColor: 'mediumblue',
      color: 'aliceblue',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h3>{title}</h3>
    </header>
  )
}

Header.defaultProps = {
  title: "Default Title"
}

export default Header;



