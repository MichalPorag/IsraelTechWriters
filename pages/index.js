import React, { useState, useEffect } from 'react'
import { server } from '../config';
import Header from '../components/Header/Header';
import BlogCard from '../components/BlogCard/BlogCard';

const Home = ({ blogs, topics }) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedTopics, setSelectedTopics] = useState([])
    const [filterdBlogs, setFilterdBlogs] = useState(blogs)
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        let filterdBlogs = blogs.filter(filterBySearch).filter(filterBySelectedTopics)
        setFilterdBlogs(filterdBlogs)

    }, [searchQuery, selectedTopics])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            function handleResize() {
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }
            window.addEventListener("resize", handleResize);
            handleResize();
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);

    const filterBySearch = (item) => searchQuery === '' || item.url.toLowerCase().includes(searchQuery.toLowerCase()) || item.name.toLowerCase().includes(searchQuery.toLowerCase())

    const filterBySelectedTopics = (item) => !selectedTopics.length || item.topics.filter(topic => selectedTopics.indexOf(topic) > -1).length

    const handleSelectedTopicsChange = (topic) => {
        if (selectedTopics.indexOf(topic) === -1) {
            setSelectedTopics([...selectedTopics, topic])
        } else {
            let selectedCopied = [...selectedTopics]
            selectedCopied.splice(selectedTopics.indexOf(topic), 1)
            setSelectedTopics(selectedCopied)
        }
    }

    const getColumnRepeat = (windowSize) => {
        if (windowSize.width > 1400) return 4
        else if (windowSize.width > 1050) return 3
        else if (windowSize.width > 700) return 2
        else return 1
    }

    const styles = {
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflow: "overlay",
        },
        gridContainer: {
            display: 'grid',
            gridTemplateColumns: `repeat( ${getColumnRepeat(windowSize)}, 1fr)`,
            gap: 20,
            padding: 20,
        },
    }

    return (
        <div style={styles.root}>
            <Header topics={topics}
                searchQuery={searchQuery}
                onSearchChange={(value) => { setSearchQuery(value) }}
                onSelectedTopicsChange={handleSelectedTopicsChange}
                selectedTopics={selectedTopics} />
            <div style={styles.gridContainer}>
                {filterdBlogs.map(item => (<BlogCard key={item.url} {...item} />))}
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const res = await fetch(`${server}/api/blogs`)
    const data = await res.json()

    if (!data) {
        return {
            notFound: true,
        }
    }
    const { blogs, topics } = data;

    return {
        props: { blogs, topics },
    }
}


export default Home

