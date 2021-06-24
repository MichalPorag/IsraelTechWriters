// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { readFile } from 'fs/promises'
import { join } from 'path'

const parseData = async (data) => {
    
    const list = data.split('## List of Writers')[1].split('\n').filter(item=>{
        return item.trim().length
    })

    let mapped = list.map((blog,idx)=>{
        const nameRegex = /\[([^*]*)\]/;
        const urlRegex = /\(([^()]*)\)/;

        return {
            name:blog.match(nameRegex)?.[1],
            url:blog.match(urlRegex)?.[1],
            topics:blog.split(`):`)[1].split(`. W`)[0].split(',').map(item=>item.trim()),
            languages:blog.split('language:')[1].replace('.','').split(',').map(item=>item.trim()),
        }
    })
    return mapped
}

const extractTopics = (blogs) => {
    return blogs.reduce((acc, { topics }) => {
        topics.forEach(topic => {
            if (acc.indexOf(topic) > -1) return acc
            acc = [...acc, topic]

        });
        return acc
    }, [])
}

export default async (req, res) => {
    const fileData = await readFile(join(process.cwd(),'/README.md'), "utf8");
    const parsedData = await parseData(fileData)    


    res.status(200).json({ blogs: parsedData, topics: extractTopics(parsedData) })
}
