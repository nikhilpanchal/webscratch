import AppBar from 'material-ui/AppBar';

const Header = ({title = "Next.js application"}) =>
    <AppBar title={title} showMenuIconButton={true} />;

export default Header;