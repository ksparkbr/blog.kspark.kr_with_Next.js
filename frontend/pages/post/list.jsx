import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import styled from "styled-components"
import LoadingSpinner from "../../src/component/common/LoadingSpinner";
import PostCard from "../../src/component/post/Post-card";

const Wrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`

const PostListGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    @media screen and (min-width: 992px) and (max-width: 1199px){
        grid-template-columns: repeat(3, 1fr);
    }
    @media screen and (min-width: 992px) and (max-width: 1199px){
        grid-template-columns: repeat(3, 1fr);
    }
    @media screen and (min-width: 768px) and (max-width: 991px){
        grid-template-columns: repeat(3, 1fr);
    }
    @media screen and (max-width: 767px){
        grid-template-columns: repeat(1, 1fr);
    }
`

export default function PostList() {
    const [loading, setLoading] = useState(true);
    const [postList, setPostList] = useState([]);
    const session = useSelector(s => s.session);
    const API_URL = process.env.NEXT_PUBLIC_BACKEND;

    const getPostList = async () => {
        const url = API_URL + "/post/list";
        let param = {
            session: session.session,
        }
        let data = await axios.post(url, param, { withCredentials: true }).then(res => res.data)
        setPostList(data);
        setLoading(false);
    }
    useEffect(() => {
        getPostList();
    }, [session])

    return <>
        <Head>
            <title>홈 | BLOG.KSPARK.KR</title>
        </Head>
        {
            loading ? <LoadingSpinner /> : (
                <Wrapper>
                    <PostListGrid>
                        {
                            postList.length > 0 && postList.map((item, idx) => {
                                return (
                                    <PostCard key={idx} item={item} />
                                )
                            })
                        }
                    </PostListGrid>
                </Wrapper>
            )
        }
    </>
}