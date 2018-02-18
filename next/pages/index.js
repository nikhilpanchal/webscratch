import '../components/header';
import Header from "../components/header";
import withMui from "../shared/mui/withMui";
import 'isomorphic-fetch';
import { Card, CardHeader, CardText } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";

const Index = ({posts}) => {
    return (<div>
        <Header/>
        {
            posts.map((post) => {
                return <Card key={post.id}>
                    <CardHeader title={post.title}/>
                    <CardText>
                        <RaisedButton label={"Click to view full post"} fullWidth={false} primary={true}/>
                    </CardText>
                </Card>
            })
        }
    </div>);
};

/**
 * Play with async awaits a bit
 * @returns {Promise.<void>}
 */
Index.getInitialProps = async () => {

    let url = `${process.env.BLOGGER_URL}?key=${process.env.API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    return {
        posts: data.items
    };
};


export default withMui(Index);