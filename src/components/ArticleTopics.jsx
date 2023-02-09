import { useState } from "react";

export const ArticleTopics = ({topics, setSelectedTopic}) => {
    const [topic, setTopic] = useState('all')

    const handleSelect = (e) => {
        setSelectedTopic(`?topic=${e.target.value}`)
        setTopic(e.target.value)
    }
    return (
        <section className="select-topic">
            <h1>
                What topic are you interested in?
            </h1>
            <select 
                name="selectedTopic" 
                value={topic}
                onChange={handleSelect}
            >
                <option value='all'>all</option>
                {topics.map(topic => {
                    return <option key={topic.slug} value={topic.slug}>{topic.slug}</option>
                })}
            </select>
        </section>
    )
}