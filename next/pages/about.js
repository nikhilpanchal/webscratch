const About = ({text = "Hello, World !"}) => {
    return (<div>
        <h2>{text} from the about route</h2>
    </div>);
};

export default About;