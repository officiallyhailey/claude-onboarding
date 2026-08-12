import { Link } from "react-router-dom";

// Says so, rather than quietly redirecting home. A shared link that no longer
// works should look like a broken link.

function NotFound() {
    return (
        <div className="hero">
            <div className="kicker">Not found</div>
            <h1>There is no page here.</h1>
            <p>
                The four phases are Understanding Claude, Introducing Yourself, Implementing Your
                Systems, and Working Together. There is also an appendix.
            </p>
            <p className="hint">
                <Link to="/">Back to the four phases</Link>
            </p>
        </div>
    );
}

export default NotFound;
