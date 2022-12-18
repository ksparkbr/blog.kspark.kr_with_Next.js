import styled from "styled-components"
import BlogLikePanel from "./BlogLikePanel"
import EditPanel from "./EditPanel"

const Wrapper = styled.div`
    position: relative;
    margin: 0 auto;
    max-width: 1200px;
    background-color: white;
    padding: 1rem;
    box-shadow: 5px 5px 6px 0px rgba(0,0,0,30%);
    margin-bottom: 1rem;
    border-radius: 0 0 1rem 1rem;
    & hr{
        margin-top: 1rem;
        border: 1px solid #eeeeee;
    }
`

const Title = styled.div`
    font-weight: bold;
    font-size: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
`

const Flex = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
`
const PostDate = styled.div`
    font-size: 1rem;
    color: #a0a0a0;
`
const Tag = styled.div`
    background-color: grey;
    border-radius: 10px;
    padding-left: .5rem;
    padding-right: .5rem;
    display: flex;
    align-items: center;
    & span{
        color: white;
        padding-left: .2rem;
        font-weight: bold;
        font-size: .8rem;
    }
`
const TagImg = styled.img`
    width: .7rem;
    height: .7rem;
`
const HashTag = styled.div`
    cursor: pointer;
    color: rgb(20, 134, 214);
    font-weight: bold;
    transition: .3s;
    &:hover{
        color : #9bd5ff;
    }
`
const ContentArea = styled.div`
    & p, & ol, & ul, & pre, & blockquote, & h1, & h2, & h3, & h4, & h5, & h6 {
        margin-block-start : 1em;
        margin-block-end : 1em;
    }
    & p{
        font-size: 1rem;
    }
    & ul{
        margin-left: 1.5rem;
    }
    & code {
        background-color: #23241f;
        color: #f8f8f2;
        overflow: visible;
        border-radius: 3px;
        counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;
        margin: 0;
        white-space: pre-wrap;
        margin-bottom: 5px;
        margin-top: 5px;
        padding: 5px 10px;
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
    }
    & pre.ql-syntax{
        background-color: #23241f;
        color: #f8f8f2;
        overflow: visible;
        border-radius: 3px;
        counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;
        margin: 0;
        white-space: pre-wrap;
        margin-bottom: 5px;
        margin-top: 5px;
        padding: 5px 10px;
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
    }

    & blockquote{
        border-left: 4px solid #ccc;
        margin-bottom: 5px;
        margin-top: 5px;
        padding-left: 16px;
    }

    & *.ql-align-center {
        text-align: -webkit-center;
        text-align: center;
    }
      
    & *.ql-align-right {
        text-align: -webkit-right;
        text-align: right;
    }
`

const LockImg = styled.img`
    width: 2rem;
    height: 2rem;
`

const TitleWrapper = styled.div`
    box-shadow: 5px 5px 6px 0px rgba(0,0,0,30%);
    border-radius: 1rem 1rem 0 0;
    color: white;
    margin: 0 auto;
    max-width: 1200px;
    height: 200px;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    //align-items: center;
    background: linear-gradient(0deg, rgb(0 0 0 / 60%), rgb(0 0 0 / 60%)), url("${(props) => props.src || "/image/avatar.png"}");
    background-position: center;
    background-size: cover;
`

export default function PostView({ post }) {
    const dateformat = Intl.DateTimeFormat('ko-KR', { dateStyle: 'medium', timeStyle: "short" })
    return (<>
        
        <TitleWrapper src={post.THUMBNAIL}>
            <Title>
                {
                    post.WRITE_MODE == "private" && <LockImg src="/image/lock.png" />
                }
                <div>
                    {post.TITLE}
                </div>
            </Title>
            <Flex>
                <PostDate>{dateformat.format(new Date(post.POST_DATE))}</PostDate>
            </Flex>
        </TitleWrapper>
       
        <Wrapper>
            {post.admin && <EditPanel />}
            <Flex>
                <Tag>
                    <TagImg src="/image/tag.png" />
                    <span>Tag</span>
                </Tag>
                <Flex>
                    {JSON.parse(post.HASH_TAGS).length > 0 && JSON.parse(post.HASH_TAGS).map((item, idx) => {
                        return (<HashTag key={idx}>
                            {item}
                        </HashTag>)
                    })}
                </Flex>
            </Flex>
            <hr />
            <ContentArea dangerouslySetInnerHTML={{ __html: post.CONTENT }} />
            <BlogLikePanel postId={post.POST_ID} />
        </Wrapper>
    </>)
}