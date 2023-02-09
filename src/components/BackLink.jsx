import { Link } from 'react-router-dom';
import { HiArrowLongLeft } from "react-icons/hi2";

export const BackLink = () => {
    return (
        <Link to='/articles' className="back-link">
            <HiArrowLongLeft />
            <span>Back to articles</span>
        </Link>
    )
}