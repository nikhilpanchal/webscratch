import withMui from '../shared/mui/withMui';
import 'isomorphic-fetch';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Link from 'next/link';


const Post = ({title, content}) => {
    return (
        <div>
            <style jsx>
                {`
                .post-link {
                    text-decoration: none;
                    color: #000;
                }
            `}
            </style>
            <Card>
                <CardHeader title={title} />
                <CardText>
                    <div dangerouslySetInnerHTML={{__html: content}}></div>

                    <RaisedButton fullWidth={false}>
                        <Link href='/' as="/blog" >
                            <a className='post-link'>Back</a>
                        </Link>
                    </RaisedButton>
                </CardText>
            </Card>
        </div>
    )
};

Post.getInitialProps = async ({query: {id}}) => {
    const response = await fetch(`${process.env.BLOGGER_URL}/${id}?key=${process.env.API_KEY}`)
    const data = await response.json();

    return {
        title: data.title,
        content: data.content
    };
};

export default withMui(Post);